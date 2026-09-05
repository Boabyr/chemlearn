#!/usr/bin/env node
/**
 * Importiert aufbereitetes Lernmaterial in den Kurs-Code.
 *
 *   npm run import -- .source/ac1/ [--dry-run] [--force]
 *
 * Erwartet das Markdown-Zwischenformat aus CONTENT-PROMPT.md und erzeugt
 * daraus Themen-Dateien, Prüfungsfragen und die passenden Registry-Einträge.
 *
 * Der Import bricht ab, wenn etwas nicht stimmt — halbfertige Kursdaten sind
 * schlimmer als gar keine.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync, realpathSync } from 'node:fs'
import { join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { kartenId } from './lib/kartenId.mjs'
import { pruefeAusdruck } from '../src/lib/formel/ausdruck.mjs'
import { verteileFragen } from '../src/lib/pruefung/verteilung.mjs'
const ROOT = process.cwd()
const COURSES_DIR = join(ROOT, 'src/courses')
const EXAMS_DIR = join(ROOT, 'src/data/exams')
const EXAMS_JSON = (kursId) => join(EXAMS_DIR, `${kursId}.json`)

// ── Hilfen ────────────────────────────────────────────────────────────────

const fehler = []
const warnungen = []
const marker = []

function problem(ort, text) { fehler.push(`${ort}: ${text}`) }
function warnung(ort, text) { warnungen.push(`${ort}: ${text}`) }

/**
 * Nur für Tests, die `lesePoolfragen()` & Co. direkt aufrufen, ohne über
 * `main()` zu laufen: die seit dem letzten Aufruf gesammelten Fehler lesen
 * und dabei leeren. Der Importer selbst sammelt Fehler über `problem()` und
 * bricht am Ende in `main()` gebündelt ab, statt bei der ersten Beanstandung
 * zu werfen — ein Test einer einzelnen Leserfunktion braucht denselben Weg,
 * sonst prüft er ein Fehlerverhalten, das es beim echten Lauf gar nicht gibt.
 */
export function nimmFehler() { return fehler.splice(0) }

/** Als TypeScript-Zeichenkette ausgeben. */
function str(s) {
  return JSON.stringify(String(s ?? ''))
}

/** Als Template-Literal ausgeben (mehrzeilige Theorie). */
function tpl(s) {
  return '`' + String(s ?? '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`'
}

function sammleMarker(ort, text) {
  for (const m of String(text).matchAll(/\[(UNSICHER|ERGÄNZT|ERGAENZT|ZUORDNEN)(?::\s*([^\]]*))?\]/g)) {
    marker.push({ ort, art: m[1], hinweis: (m[2] ?? '').trim() })
  }
}

/** Zeilen der Form `schlüssel: wert` einlesen. */
function keyValues(block) {
  const out = {}
  for (const line of block.split('\n')) {
    const m = line.match(/^([a-zA-Zä-üÄ-Ü_][a-zA-Z0-9ä-üÄ-Ü_]*):\s*(.*)$/)
    if (m) out[m[1].toLowerCase()] = m[2].trim()
  }
  return out
}

/** `a: x | b: y` in ein Objekt zerlegen. */
function inlineFields(line) {
  const out = {}
  for (const teil of line.split('|')) {
    const m = teil.match(/^\s*([a-zA-Zä-üÄ-Ü_][a-zA-Z0-9ä-üÄ-Ü_]*):\s*(.*)$/)
    if (m) out[m[1].toLowerCase()] = m[2].trim()
  }
  return out
}

// ── Formeln ───────────────────────────────────────────────────────────────

/**
 * `c = A / (eps * d)` als Datensatz prüfen und ablegen.
 *
 * Geprüft wird mit demselben Parser, den die App zum Rechnen benutzt
 * (src/lib/formel/ausdruck.mjs) — was hier durchgeht, rechnet dort auch.
 */
function uebersetzeFormel(zeile, variablen, ort) {
  const m = zeile.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+?)\s*$/)
  if (!m) { problem(ort, `Umstellung nicht lesbar: "${zeile}"`); return null }
  const [, ziel, ausdruck] = m

  if (!variablen.includes(ziel)) {
    problem(ort, `Umstellung löst nach "${ziel}" auf, das keine Variable ist`)
    return null
  }

  const erlaubt = variablen.filter(name => name !== ziel)
  const beanstandung = pruefeAusdruck(ausdruck, erlaubt)
  if (beanstandung) {
    problem(ort, `Umstellung "${zeile}": ${beanstandung}`)
    return null
  }

  return { solveFor: ziel, expr: ausdruck }
}

// ── Zerlegen ──────────────────────────────────────────────────────────────

function ladeQuelltexte(dir) {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    console.error(`Quellordner nicht gefunden: ${dir}`)
    process.exit(1)
  }
  const dateien = readdirSync(dir)
    .filter(f => /\.(md|txt)$/i.test(f))
    .filter(f => f.toLowerCase() !== 'report.md')
    .sort()
  if (dateien.length === 0) {
    console.error(`Keine .md/.txt-Dateien in ${dir}`)
    process.exit(1)
  }
  return dateien.map(f => ({ datei: f, text: readFileSync(join(dir, f), 'utf8') }))
}

/** Text in Kurskopf-, Themen- und Prüfungsabschnitte trennen. */
function teileAuf(text, datei) {
  const themen = []
  const pruefungen = []
  const kurskoepfe = []
  const ordnungen = []
  const poolBloecke = []

  // `VERGEBEN` und `FORTSETZUNG FOLGT` sind Nachspann für den nächsten
  // Prompt-Lauf, kein Inhalt. Sie werden hier erkannt und fallen gelassen —
  // sonst landen sie im letzten Abschnitt des letzten Themas.
  const teile = text.split(
    /^===\s*(DATEI:\s*[^=]+?|PRÜFUNG|PRUEFUNG|KURS|ORDNUNG|FRAGENPOOL|VERGEBEN|FORTSETZUNG FOLGT)\s*===\s*$/m)
  // teile[0] ist Vorspann, danach abwechselnd Kopf und Inhalt
  for (let i = 1; i < teile.length; i += 2) {
    const kopf = teile[i].trim()
    const inhalt = teile[i + 1] ?? ''
    if (/^DATEI:/i.test(kopf)) {
      const name = kopf.replace(/^DATEI:\s*/i, '').replace(/\.md$/i, '').trim()
      themen.push({ name, inhalt, ort: `${datei} → ${name}` })
    } else if (/^KURS$/i.test(kopf)) {
      kurskoepfe.push({ inhalt, ort: `${datei} → Kurskopf` })
    } else if (/^ORDNUNG$/i.test(kopf)) {
      ordnungen.push({ inhalt, ort: `${datei} → Ordnung` })
    } else if (/^FRAGENPOOL$/i.test(kopf)) {
      poolBloecke.push({ inhalt, ort: `${datei} → Fragenpool` })
    } else if (/^(VERGEBEN|FORTSETZUNG FOLGT)$/i.test(kopf)) {
      continue
    } else {
      pruefungen.push({ inhalt, ort: `${datei} → Prüfung` })
    }
  }
  return { themen, pruefungen, kurskoepfe, ordnungen, poolBloecke }
}

/**
 * Kurskopf aus der Quelle.
 *
 * Vorher stand der Kopf eines Fachs nur im erzeugten `index.ts` und musste dort
 * von Hand nachgezogen werden — ein zweiter Import hat ihn aus sich selbst
 * zurückgelesen und dabei alles verloren, was das Rücklesen nicht kannte.
 * Jetzt ist die Quelle die Quelle.
 */
function baueKursKopf(inhalt, ort) {
  const kv = keyValues(inhalt)
  const kopf = {}
  const text = (quelle, ziel) => {
    if (kv[quelle] !== undefined && kv[quelle] !== '') kopf[ziel] = kv[quelle]
  }
  text('titel', 'title')
  text('untertitel', 'subtitle')
  text('icon', 'icon')
  text('farbe', 'color')
  text('niveau', 'level')
  text('beschreibung', 'description')
  text('sprache', 'sprache')

  if (kv.stunden) {
    const n = Number(kv.stunden.replace(',', '.'))
    if (!Number.isFinite(n) || n <= 0) problem(ort, `stunden: "${kv.stunden}" ist keine Zahl`)
    else kopf.estimatedHours = n
  }
  if (kv.formelsatz) {
    if (!['chemie', 'aus'].includes(kv.formelsatz)) {
      problem(ort, `formelsatz: "${kv.formelsatz}" — erlaubt sind chemie und aus`)
    } else kopf.formelsatz = kv.formelsatz
  }
  if (kv.entwurf) kopf.entwurf = ['ja', 'true', '1'].includes(kv.entwurf.toLowerCase())

  // Gruppenzeilen: `- id: uebung | label: Übungsfragen | icon: 📝`
  const pruefer = [...inhalt.matchAll(/^\s*-\s*(.+)$/gm)]
    .map(m => inlineFields(m[1]))
    .filter(f => f.id)
    .map(f => ({ id: f.id, label: f.label ?? f.id, icon: f.icon }))
  if (pruefer.length) kopf.gruppen = pruefer

  return kopf
}

/** Kennung aus einem Anzeigenamen: "Optische Instrumente" → "optische-instrumente". */
function kennung(text) {
  return String(text).toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/**
 * Prüfungsordnung aus der Quelle.
 *
 * `gebiet:` und `noten:` trennen gleichartige Einträge mit dem senkrechten
 * Strich, nicht `schlüssel: wert`-Paare — `inlineFields()` würde sie zerlegen.
 */
export function leseOrdnung(inhalt, ort) {
  const kv = keyValues(inhalt)
  const zahl = (feld, pflicht) => {
    const roh = kv[feld]
    if (roh === undefined) {
      if (pflicht) problem(ort, `ORDNUNG ohne ${feld}`)
      return undefined
    }
    const n = Number(String(roh).replace(',', '.'))
    if (!Number.isFinite(n) || n <= 0) { problem(ort, `${feld}: "${roh}" ist keine Zahl`); return undefined }
    return n
  }

  const noten = (kv.noten ?? '').split('|').map(s => s.trim()).filter(Boolean)
    .map(eintrag => {
      const m = eintrag.match(/^(\d+)\s+(.+)$/)
      if (!m) { problem(ort, `noten: "${eintrag}" — erwartet "Punkte Notenname"`); return null }
      return { ab: Number(m[1]), note: m[2].trim() }
    })
    .filter(Boolean)

  for (let i = 1; i < noten.length; i++) {
    if (noten[i].ab >= noten[i - 1].ab) problem(ort, 'noten: Grenzen müssen streng fallen')
  }

  const roheGebiete = [...String(inhalt).matchAll(/^gebiet:\s*(.+)$/gm)].map(m => {
    const stuecke = m[1].split('|').map(s => s.trim())
    const titel = stuecke[0]
    const topics = (stuecke[1] ?? '').split(',').map(s => s.trim()).filter(Boolean)
    const vorgabe = stuecke.slice(2).map(s => s.match(/^fragen:\s*(\d+)$/)).find(Boolean)
    if (topics.length === 0) problem(ort, `gebiet "${titel}" ohne Kapitel`)
    return { id: kennung(titel), titel, topics, fragen: vorgabe ? Number(vorgabe[1]) : undefined }
  })
  if (roheGebiete.length === 0) problem(ort, 'ORDNUNG ohne gebiet-Zeile')

  const gesamt = zahl('fragen', true) ?? 0
  const verteilung = verteileFragen(
    gesamt,
    roheGebiete.map(g => ({ id: g.id, kapitel: g.topics.length, fragen: g.fragen })),
  )

  const regel = kv.regel ?? 'teilpunkte'
  if (!['streng', 'teilpunkte'].includes(regel)) {
    problem(ort, `regel: "${regel}" — erlaubt sind streng und teilpunkte`)
  }

  const punkteJeFrage = zahl('punkte_je_frage', true) ?? 1
  return {
    titel: kv.titel || 'Prüfung',
    fragen: gesamt,
    punkteJeFrage,
    regel,
    zeitMinuten: zahl('zeit_minuten', false) ?? Math.max(15, Math.round(gesamt * punkteJeFrage)),
    noten,
    gebiete: roheGebiete.map(g => ({
      id: g.id, titel: g.titel, topics: g.topics, fragen: verteilung.get(g.id) ?? 0,
    })),
  }
}

/**
 * Prüft eine gelesene Ordnung gegen die Themenliste des Kurses.
 *
 * Das kann `leseOrdnung()` selbst noch nicht: ihr fehlt die Themenliste. Die
 * Prüfung fängt auch den Fall, dass ausdrückliche `fragen:`-Vorgaben in den
 * Gebieten zusammen schon mehr ergeben als die Ordnung insgesamt nennt —
 * `verteileFragen()` verteilt dann nichts mehr, und die Summe stimmt nicht.
 */
function pruefeOrdnungGegenThemen(ordnung, themenIds, ort) {
  const zugeordnet = ordnung.gebiete.flatMap(g => g.topics)

  for (const id of zugeordnet) {
    if (!themenIds.includes(id)) problem(ort, `gebiet nennt unbekanntes Thema "${id}"`)
  }
  for (const id of themenIds) {
    const treffer = ordnung.gebiete.filter(g => g.topics.includes(id))
    if (treffer.length === 0) problem(ort, `Thema "${id}" steht in keinem Gebiet`)
    if (treffer.length > 1) {
      problem(ort, `Thema "${id}" steht in mehreren Gebieten: ${treffer.map(g => g.titel).join(', ')}`)
    }
  }

  const fest = ordnung.gebiete.reduce((summe, g) => summe + g.fragen, 0)
  if (fest !== ordnung.fragen) {
    problem(ort, `Gebietsfragen ergeben ${fest}, die Ordnung nennt ${ordnung.fragen}`)
  }
}

/** Abschnitte einer Themendatei (`# META`, `# THEORIE`, …). */
function abschnitte(inhalt) {
  const out = {}
  const teile = inhalt.split(/^#\s+([A-ZÄÖÜ]+)\s*$/m)
  for (let i = 1; i < teile.length; i += 2) {
    out[teile[i].toUpperCase()] = (teile[i + 1] ?? '').trim()
  }
  return out
}

// ── Themen ────────────────────────────────────────────────────────────────

/** `von: freiesPaar n1` → { art: "freiesPaar", id: "n1" } */
function leseZiel(text, ort) {
  const teile = String(text ?? '').trim().split(/\s+/)
  if (teile.length !== 2) { problem(ort, `Pfeilziel nicht lesbar: "${text}"`); return null }
  const [art, id] = teile
  if (!['bindung', 'freiesPaar', 'atom'].includes(art)) {
    problem(ort, `Unbekannte Zielart "${art}" — erlaubt sind bindung, freiesPaar, atom`)
    return null
  }
  return { art, id }
}

function leseAtom(text) {
  const f = inlineFields(text)
  const atom = { id: f.id, element: f.element ?? 'C', x: Number(f.x), y: Number(f.y) }
  if (f.ladung !== undefined) atom.ladung = Number(f.ladung)
  if (f.paare !== undefined) atom.freiePaare = Number(f.paare)
  if (f.h !== undefined) atom.wasserstoffe = Number(f.h)
  if (f.zeigen !== undefined) atom.zeigen = String(f.zeigen) === 'ja'
  if (f.frei !== undefined) atom.frei = String(f.frei) === 'ja'
  return atom
}

function leseBindung(text) {
  const f = inlineFields(text)
  const bindung = { id: f.id, von: f.von, nach: f.nach, ordnung: Number(f.ordnung ?? 1) }
  if (f.art) bindung.art = f.art
  return bindung
}

/**
 * Abbildungen im Theorietext lesen.
 *
 * Dieselben Atome und Bindungen wie im Mechanismus — nur ohne Pfeile und ohne
 * Aufgabe. Koordinaten bleiben Handarbeit.
 */
/** `titel: Konzentration c | min: 0 | max: 3` */
function leseAchse(text, ort, id) {
  if (!text) return null
  const f = inlineFields(text)
  const achse = { titel: f.titel ?? '', min: Number(f.min), max: Number(f.max) }
  if (!Number.isFinite(achse.min) || !Number.isFinite(achse.max) || achse.min >= achse.max) {
    problem(ort, `Diagramm "${id}": Achse "${achse.titel}" braucht min < max`)
    return null
  }
  return achse
}

function leseAbbildungen(block, ort) {
  if (!block) return []
  const abbildungen = []
  let aktuell = null
  let struktur = null

  const schliesseStruktur = () => {
    if (struktur && aktuell) aktuell.strukturen.push(struktur)
    struktur = null
  }
  const schliesseAbbildung = () => {
    schliesseStruktur()
    if (aktuell) abbildungen.push(aktuell)
    aktuell = null
  }

  for (const zeile of block.split('\n')) {
    const kopf = zeile.match(/^-\s*id:\s*(.+)$/)
    if (kopf) {
      schliesseAbbildung()
      const f = inlineFields('id: ' + kopf[1])
      const istDiagramm = f.art === 'diagramm'
      aktuell = istDiagramm
        ? {
            art: 'diagramm', id: f.id, titel: f.titel ?? f.id, beschreibung: f.beschreibung,
            xAchse: leseAchse(f.x_achse, ort, f.id),
            yAchse: leseAchse(f.y_achse, ort, f.id),
            kurven: [], marker: [],
          }
        : {
            art: 'strukturen', id: f.id, titel: f.titel ?? f.id, beschreibung: f.beschreibung,
            verknuepfung: f.verknuepfung === 'reihe' ? 'reihe' : 'resonanz',
            strukturen: [],
          }
      continue
    }
    if (!aktuell) continue

    if (aktuell.art === 'diagramm') {
      const kurve = zeile.match(/^\s{2,}kurve:\s*(.+)$/)
      if (kurve) {
        const f = inlineFields(kurve[1])
        const punkte = (f.punkte ?? '').split(';').map(paar => {
          const [x, y] = paar.split(',').map(t => Number(t.trim()))
          return { x, y }
        }).filter(pk => Number.isFinite(pk.x) && Number.isFinite(pk.y))
        const eintrag = { beschriftung: f.beschriftung ?? 'Kurve', punkte }
        if (f.stil) eintrag.stil = f.stil
        if (f.farbe) eintrag.farbe = f.farbe
        aktuell.kurven.push(eintrag)
        continue
      }
      const marker = zeile.match(/^\s{2,}marker:\s*(.+)$/)
      if (marker) {
        const f = inlineFields(marker[1])
        const eintrag = { x: Number(f.x), y: Number(f.y), beschriftung: f.beschriftung ?? '' }
        if (String(f.hilfslinien ?? '') === 'ja') eintrag.hilfslinien = true
        aktuell.marker.push(eintrag)
      }
      continue
    }

    const s = zeile.match(/^\s{2,}struktur:\s*(.+)$/)
    if (s) {
      schliesseStruktur()
      struktur = { beschriftung: inlineFields(s[1]).beschriftung ?? s[1].trim(), atome: [], bindungen: [] }
      continue
    }
    if (!struktur) continue

    const atom = zeile.match(/^\s{4,}atom:\s*(.+)$/)
    if (atom) { struktur.atome.push(leseAtom(atom[1])); continue }
    const bindung = zeile.match(/^\s{4,}bindung:\s*(.+)$/)
    if (bindung) struktur.bindungen.push(leseBindung(bindung[1]))
  }
  schliesseAbbildung()

  for (const a of abbildungen) {
    if (!a.id || !/^[a-z0-9-]+$/.test(a.id)) { problem(ort, `Abbildungs-Kennung "${a.id}" muss klein und ohne Umlaute sein`); return [] }

    if (a.art === 'diagramm') {
      if (!a.xAchse || !a.yAchse) { problem(ort, `Diagramm "${a.id}" ohne x_achse oder y_achse`); return [] }
      if (a.kurven.length === 0) { problem(ort, `Diagramm "${a.id}" ohne Kurve`); return [] }
      const drin = (pk) => pk.x >= a.xAchse.min && pk.x <= a.xAchse.max && pk.y >= a.yAchse.min && pk.y <= a.yAchse.max
      for (const k of a.kurven) {
        if (k.punkte.length < 2) { problem(ort, `Diagramm "${a.id}": Kurve "${k.beschriftung}" hat weniger als zwei Punkte`); return [] }
        for (const pk of k.punkte) {
          if (!drin(pk)) { problem(ort, `Diagramm "${a.id}": Punkt (${pk.x}, ${pk.y}) liegt außerhalb der Achsen`); return [] }
        }
      }
      for (const mk of a.marker) {
        if (!drin(mk)) { problem(ort, `Diagramm "${a.id}": Marker "${mk.beschriftung}" liegt außerhalb der Achsen`); return [] }
      }
      continue
    }

    if (a.strukturen.length < 2) { problem(ort, `Abbildung "${a.id}" zeigt weniger als zwei Strukturen`); return [] }
    for (const st of a.strukturen) {
      if (st.atome.length < 2) { problem(ort, `Abbildung "${a.id}": Struktur "${st.beschriftung}" ohne Atome`); return [] }
      const ids = st.atome.map(x => x.id)
      for (const b of st.bindungen) {
        for (const ende of ['von', 'nach']) {
          if (!ids.includes(b[ende])) {
            problem(ort, `Abbildung "${a.id}": Bindung ${b.id} nennt Atom "${b[ende]}", das es nicht gibt`)
            return []
          }
        }
      }
    }
  }
  return abbildungen
}

/**
 * Mechanismus im Strukturformel-Format lesen.
 *
 * Koordinaten bleiben Handarbeit — daran ändert sich nichts. Neu ist, dass
 * eine Stufe mehrere Pfeile tragen kann und ein Pfeil an einer Bindung oder
 * einem freien Elektronenpaar ansetzen darf.
 */
function leseMechanismus(block, ort) {
  const kv = keyValues(block.split(/^schritte:\s*$/m)[0] ?? '')
  const rest = block.split(/^schritte:\s*$/m)[1] ?? ''
  const [schrittTeil, ergebnisTeil] = rest.split(/^ergebnis:\s*/m)

  const stufen = []
  let aktuell = null

  for (const zeile of (schrittTeil ?? '').split('\n')) {
    const kopf = zeile.match(/^-\s*nr:\s*(.+)$/)
    if (kopf) {
      if (aktuell) stufen.push(aktuell)
      const f = inlineFields('nr: ' + kopf[1])
      aktuell = {
        id: Number(f.nr) - 1,
        titel: f.titel ?? `Schritt ${f.nr}`,
        aufgabe: f.aufgabe ?? '',
        erklaerung: f.erklaerung ?? '',
        hinweise: [], atome: [], bindungen: [], pfeile: [],
      }
      continue
    }
    if (!aktuell) continue

    const hinweis = zeile.match(/^\s{2,}hinweis:\s*(.+)$/)
    if (hinweis) { aktuell.hinweise.push(hinweis[1].trim()); continue }

    const atom = zeile.match(/^\s{2,}atom:\s*(.+)$/)
    if (atom) { aktuell.atome.push(leseAtom(atom[1])); continue }

    const bindung = zeile.match(/^\s{2,}bindung:\s*(.+)$/)
    if (bindung) { aktuell.bindungen.push(leseBindung(bindung[1])); continue }

    const pfeil = zeile.match(/^\s{2,}pfeil:\s*(.+)$/)
    if (pfeil) {
      const f = inlineFields(pfeil[1])
      const von = leseZiel(f.von, ort)
      const nach = leseZiel(f.nach, ort)
      if (von && nach) aktuell.pfeile.push({ von, nach })
    }
  }
  if (aktuell) stufen.push(aktuell)

  if (stufen.length < 2) {
    problem(ort, `Mechanismus "${kv.titel ?? ''}" hat ${stufen.length} Schritt(e) — mindestens zwei`)
    return null
  }

  for (const stufe of stufen) {
    if (stufe.atome.length < 2) { problem(ort, `Schritt "${stufe.titel}" ohne Atome`); return null }
    if (stufe.pfeile.length === 0) { problem(ort, `Schritt "${stufe.titel}" ohne Pfeil`); return null }
    if (stufe.hinweise.length === 0) { problem(ort, `Schritt "${stufe.titel}" ohne Hinweis`); return null }
    if (!stufe.erklaerung) { problem(ort, `Schritt "${stufe.titel}" ohne Erklärung`); return null }

    const atomIds = stufe.atome.map(a => a.id)
    const bindungsIds = stufe.bindungen.map(b => b.id)
    for (const bindung of stufe.bindungen) {
      for (const ende of ['von', 'nach']) {
        if (!atomIds.includes(bindung[ende])) {
          problem(ort, `Schritt "${stufe.titel}": Bindung ${bindung.id} nennt Atom "${bindung[ende]}", das es nicht gibt`)
          return null
        }
      }
    }
    for (const pfeil of stufe.pfeile) {
      for (const ende of ['von', 'nach']) {
        const ziel = pfeil[ende]
        const bekannt = ziel.art === 'bindung' ? bindungsIds.includes(ziel.id) : atomIds.includes(ziel.id)
        if (!bekannt) {
          problem(ort, `Schritt "${stufe.titel}": Pfeil zeigt auf ${ziel.art} "${ziel.id}", das es nicht gibt`)
          return null
        }
      }
    }
  }

  // Ergebnisbild
  if (!ergebnisTeil) { problem(ort, `Mechanismus "${kv.titel ?? ''}" ohne Ergebnisbild`); return null }
  const ergebnisKopf = inlineFields((ergebnisTeil.split('\n')[0] ?? '').trim())
  const ergebnis = {
    titel: ergebnisKopf.titel ?? 'Produkt',
    beschreibung: ergebnisKopf.beschreibung ?? '',
    atome: [], bindungen: [],
  }
  for (const zeile of ergebnisTeil.split('\n').slice(1)) {
    const atom = zeile.match(/^\s{2,}atom:\s*(.+)$/)
    if (atom) { ergebnis.atome.push(leseAtom(atom[1])); continue }
    const bindung = zeile.match(/^\s{2,}bindung:\s*(.+)$/)
    if (bindung) ergebnis.bindungen.push(leseBindung(bindung[1]))
  }
  if (ergebnis.atome.length < 2) { problem(ort, 'Ergebnisbild ohne Atome'); return null }

  return {
    art: 'mechanism',
    title: kv.titel ?? '',
    description: kv.beschreibung ?? '',
    stufen,
    ergebnis,
  }
}

function leseInteraktiv(block, ort) {
  if (!block) return null
  const kv = keyValues(block)
  const typ = kv.typ
  if (!typ || typ === 'keiner') return null

  if (typ === 'formula-calculator') {
    const variablen = []
    for (const line of block.split('\n')) {
      if (!/^-\s*id:/.test(line.trim())) continue
      const f = inlineFields(line.replace(/^\s*-\s*/, ''))
      if (!f.id) continue
      variablen.push({
        id: f.id, label: f.label ?? f.id, symbol: f.symbol ?? f.id,
        unit: f.einheit ?? '—', description: f.beschreibung ?? '',
      })
    }
    if (variablen.length === 0) { problem(ort, 'formula-calculator ohne Variablen'); return null }

    const ids = variablen.map(v => v.id)
    const abschnitt = block.split(/^umstellungen:\s*$/m)[1] ?? ''
    const zeilen = abschnitt.split('\n')
      .map(l => l.trim()).filter(l => l.startsWith('-'))
      .map(l => l.replace(/^-\s*/, ''))
      .filter(l => l && !/^\[/.test(l))
    if (zeilen.length === 0) problem(ort, 'formula-calculator ohne Umstellungen')

    const umstellungen = zeilen.map(z => uebersetzeFormel(z, ids, ort)).filter(Boolean)

    return {
      art: 'formula-calculator',
      formel: {
        id: kv.formel_id ?? 'formel', name: kv.formel_name ?? '', equation: kv.gleichung ?? '',
        variablen, umstellungen,
        hints: [kv.hinweis1, kv.hinweis2].filter(Boolean),
      },
    }
  }

  if (typ === 'apparatus-quiz') {
    const optionen = []
    for (const line of block.split('\n')) {
      if (!/^-\s*id:/.test(line.trim())) continue
      const f = inlineFields(line.replace(/^\s*-\s*/, ''))
      if (f.id) optionen.push({ id: f.id, label: f.label ?? f.id, description: f.beschreibung ?? '' })
    }
    if (optionen.length !== 4) problem(ort, `apparatus-quiz braucht genau 4 Optionen, hat ${optionen.length}`)
    if (kv.ziel_id && !optionen.some(o => o.id === kv.ziel_id)) {
      problem(ort, `ziel_id "${kv.ziel_id}" kommt in den Optionen nicht vor`)
    }
    for (const o of optionen) warnungPruefeApparatur(o.id, ort)
    return {
      art: 'apparatus-quiz',
      question: kv.frage ?? '', targetId: kv.ziel_id ?? '',
      optionen, explanation: kv.erklaerung ?? '', hint1: kv.hinweis1, hint2: kv.hinweis2,
    }
  }

  if (typ === 'spectrum-assignment') {
    const HOEHE = { klein: { yTop: 70, yBottom: 10 }, mittel: { yTop: 82, yBottom: 10 }, gross: { yTop: 95, yBottom: 10 } }
    const peaks = []
    for (const line of block.split('\n')) {
      if (!/^-\s*id:/.test(line.trim())) continue
      const f = inlineFields(line.replace(/^\s*-\s*/, ''))
      const optionen = (f.optionen ?? '').split(';').map(s => s.trim()).filter(Boolean)
      if (optionen.length !== 4) problem(ort, `Peak ${f.id}: braucht genau 4 Optionen, hat ${optionen.length}`)
      if (f.richtig && !optionen.includes(f.richtig)) {
        problem(ort, `Peak ${f.id}: richtige Antwort steht nicht in den Optionen`)
      }
      const h = HOEHE[(f.hoehe ?? 'mittel').toLowerCase()] ?? HOEHE.mittel
      peaks.push({ id: f.id, position: Number(f.position ?? 50), ...h, correctLabel: f.richtig ?? '', options: optionen })
    }
    if (peaks.length < 3) warnung(ort, `spectrum-assignment hat nur ${peaks.length} Peaks (empfohlen 3–5)`)
    return {
      art: 'spectrum-assignment',
      title: kv.titel ?? '', description: kv.beschreibung ?? '',
      xLabel: kv.x_achse ?? '', yLabel: kv.y_achse ?? '',
      peaks, hint1: kv.hinweis1, hint2: kv.hinweis2,
    }
  }

  if (typ === 'apparatus-matching') {
    const paare = []
    for (const line of block.split('\n')) {
      if (!/^-\s*apparatur:/.test(line.trim())) continue
      const f = inlineFields(line.replace(/^\s*-\s*/, ''))
      if (f.apparatur) paare.push({ apparaturId: f.apparatur, label: f.label ?? f.apparatur, hinweis: f.hinweis })
    }
    if (paare.length < 3 || paare.length > 6) {
      problem(ort, `apparatus-matching braucht drei bis sechs Paare, hat ${paare.length}`)
      return null
    }
    for (const p2 of paare) warnungPruefeApparatur(p2.apparaturId, ort)
    return {
      art: 'apparatus-matching',
      title: kv.titel ?? '', description: kv.beschreibung ?? '',
      explanation: kv.erklaerung ?? '', paare,
    }
  }

  if (typ === 'mechanism') {
    return leseMechanismus(block, ort)
  }

  warnung(ort, `Unbekannter Interaktiv-Typ "${typ}" — wird übersprungen`)
  return null
}

let bekannteApparaturen = null
function warnungPruefeApparatur(id, ort) {
  if (bekannteApparaturen === null) {
    const p = join(ROOT, 'src/components/Apparatus/registry.ts')
    bekannteApparaturen = existsSync(p)
      ? [...readFileSync(p, 'utf8').matchAll(/^\s*'([a-z0-9-]+)':/gm)].map(m => m[1])
      : []
  }
  if (bekannteApparaturen.length && !bekannteApparaturen.includes(id)) {
    problem(ort, `Apparatur "${id}" hat keine Zeichnung in src/components/Apparatus/registry.ts`)
  }
}

function leseQuiz(block, ort, opt = {}) {
  if (!block) return []
  const fragen = []
  const bloecke = block.split(/^F\d+:\s*/m).slice(1)
  bloecke.forEach((b, i) => {
    const zeilen = b.split('\n')
    const frage = zeilen[0].trim()
    const optionen = []
    let richtig = null, erklaerung = ''
    for (const z of zeilen.slice(1)) {
      const t = z.trim()
      if (t.startsWith('- ')) optionen.push(t.slice(2).trim())
      else if (/^RICHTIG:/i.test(t)) richtig = parseInt(t.split(':')[1], 10)
      else if (/^ERKLÄRUNG:|^ERKLAERUNG:/i.test(t)) erklaerung = t.replace(/^[^:]*:\s*/, '')
      else if (erklaerung && t) erklaerung += ' ' + t
    }
    const nr = `Quiz F${i + 1}`
    if (optionen.length !== 4) problem(ort, `${nr}: braucht genau 4 Optionen, hat ${optionen.length}`)
    if (!Number.isInteger(richtig) || richtig < 1 || richtig > optionen.length) {
      problem(ort, `${nr}: RICHTIG ist "${richtig}", erlaubt ist 1–${optionen.length || 4}`)
    }
    if (!erklaerung) warnung(ort, `${nr}: ohne Erklärung`)
    fragen.push({ id: `q${i + 1}`, question: frage, options: optionen, correct: (richtig ?? 1) - 1, explanation: erklaerung })
  })
  if (fragen.length === 0 && !opt.optional) problem(ort, 'kein Quiz gefunden')
  return fragen
}

/** `WEG: <Vorderseite>` im FLASHCARDS-Block: diese Karte soll verschwinden. */
function leseKartenWeg(block) {
  if (!block) return []
  return block.split('\n')
    .map(z => z.match(/^WEG:\s*(.+)$/))
    .filter(Boolean)
    .map(m => m[1].trim())
}

function leseFlashcards(block, ort, opt = {}) {
  if (!block) return []
  const karten = []
  let aktuell = null
  for (const z of block.split('\n')) {
    const v = z.match(/^V:\s*(.*)$/)
    const r = z.match(/^R:\s*(.*)$/)
    if (v) { if (aktuell) karten.push(aktuell); aktuell = { front: v[1].trim(), back: '' } }
    else if (r && aktuell) aktuell.back = r[1].trim()
    else if (aktuell && aktuell.back && z.trim()) aktuell.back += ' ' + z.trim()
  }
  if (aktuell) karten.push(aktuell)
  const ohneRueckseite = karten.filter(k => !k.back)
  if (ohneRueckseite.length) problem(ort, `${ohneRueckseite.length} Karteikarte(n) ohne Rückseite`)
  if (karten.length === 0 && !opt.optional) problem(ort, 'keine Karteikarten gefunden')
  return karten
}

function baueThema(roh) {
  const { name, inhalt, ort } = roh
  sammleMarker(ort, inhalt)
  const s = abschnitte(inhalt)
  const meta = keyValues(s.META ?? '')
  const ergaenzen = String(meta.modus ?? '').trim() === 'ergaenzen'
  // Ausdrückliche Erlaubnis, einen vorhandenen Interaktivteil zu ersetzen.
  // Ohne sie bleibt der alte stehen — versehentliches Überschreiben wäre
  // schlimmer als eine Warnung.
  const interaktivErsetzen = String(meta.interaktiv ?? '').trim() === 'ersetzen'

  if (!/^\d{2}-[a-z0-9-]+$/.test(name)) problem(ort, `Dateiname "${name}" folgt nicht dem Muster NN-slug`)
  if (!ergaenzen) {
    if (!meta.titel) problem(ort, 'META ohne titel')
    if (!s.THEORIE) problem(ort, 'kein Theorieteil')
  }

  const gerufen = [...(s.THEORIE ?? '').matchAll(/\{\{abbildung:([a-z0-9-]+)\}\}/g)].map(m => m[1])
  const abbildungen = leseAbbildungen(s.ABBILDUNGEN, ort)
  if (!ergaenzen) {
    for (const id of gerufen) {
      if (!abbildungen.some(a => a.id === id)) problem(ort, `{{abbildung:${id}}} — dazu gibt es keine Abbildung`)
    }
    for (const a of abbildungen) {
      if (!gerufen.includes(a.id)) problem(ort, `Abbildung "${a.id}" wird im Text nirgends gerufen`)
    }
  }

  return {
    ergaenzen,
    interaktivErsetzen,
    id: name,
    title: meta.titel ?? name,
    subtitle: meta.untertitel ?? '',
    icon: meta.icon ?? '📘',
    estimatedMinutes: Number(meta.dauer_minuten ?? 60),
    theory: s.THEORIE ?? '',
    interactive: leseInteraktiv(s.INTERAKTIV, ort),
    abbildungen,
    quiz: leseQuiz(s.QUIZ, ort, { optional: ergaenzen }),
    flashcards: leseFlashcards(s.FLASHCARDS, ort, { optional: ergaenzen }),
    kartenWeg: leseKartenWeg(s.FLASHCARDS),
    ort,
  }
}

/**
 * Ein vorhandenes Thema zurücklesen.
 *
 * Seit Phase 3 sind Themendateien reine Daten — kein `solve` mehr, keine
 * Funktion. Deshalb lässt sich das Objektliteral wieder auswerten, statt die
 * Datei beim Ergänzen neu erfinden zu müssen. So bleibt die Theorie Zeichen
 * für Zeichen erhalten.
 */
function leseVorhandenesThema(kursId, themaId) {
  const pfad = join(COURSES_DIR, kursId, 'topics', `${themaId}.ts`)
  if (!existsSync(pfad)) return null
  const quelltext = readFileSync(pfad, 'utf8')
  const start = quelltext.indexOf('export const topic =')
  if (start < 0) return null
  const literal = quelltext
    .slice(quelltext.indexOf('{', start))
    .replace(/\s*satisfies\s+Thema\s*;?\s*$/, '')
    .replace(/;\s*$/, '')
  try {
    return new Function(`return ${literal}`)()
  } catch (fehler) {
    problem(`${kursId}/${themaId}`, `vorhandenes Thema nicht lesbar: ${fehler.message}`)
    return null
  }
}

/**
 * Einen gespeicherten Interaktivteil in die Form bringen, die der Erzeuger
 * erwartet.
 *
 * Die Datei trägt die Endform (`type`, `variables`, `options`, `stages`), der
 * Erzeuger arbeitet mit der Parserform (`art`, `variablen`, `optionen`,
 * `stufen`). Ohne diese Übersetzung fällt beim Ergänzen jeder vorhandene
 * Interaktivteil stillschweigend heraus.
 */
function alsParserForm(interaktiv) {
  if (!interaktiv) return null
  switch (interaktiv.type) {
    case 'formula-calculator':
      return {
        art: 'formula-calculator',
        formel: {
          id: interaktiv.formula.id,
          name: interaktiv.formula.name,
          equation: interaktiv.formula.equation,
          variablen: interaktiv.formula.variables,
          umstellungen: interaktiv.formula.umstellungen,
          hints: interaktiv.formula.hints,
        },
      }
    case 'apparatus-quiz':
      return {
        art: 'apparatus-quiz',
        question: interaktiv.question, targetId: interaktiv.targetId,
        optionen: interaktiv.options, explanation: interaktiv.explanation,
        hint1: interaktiv.hint1, hint2: interaktiv.hint2,
      }
    case 'spectrum-assignment':
      return {
        art: 'spectrum-assignment',
        title: interaktiv.title, description: interaktiv.description,
        xLabel: interaktiv.xLabel, yLabel: interaktiv.yLabel,
        peaks: interaktiv.peaks, hint1: interaktiv.hint1, hint2: interaktiv.hint2,
      }
    case 'mechanism':
      return {
        art: 'mechanism',
        title: interaktiv.title, description: interaktiv.description,
        stufen: interaktiv.stages, ergebnis: interaktiv.ergebnis,
      }
    default:
      return null
  }
}

/**
 * Rückweg: Parserform → Endform, wie sie in der Themendatei steht.
 *
 * Seit ein Thema mehrere Interaktivteile trägt, wird die Liste zusammengeführt
 * und danach als Ganzes geschrieben — dafür müssen alle Einträge in derselben
 * Form vorliegen.
 */
/**
 * Wert als TypeScript-Literal ausgeben — Schlüssel ohne Anführungszeichen.
 *
 * JSON.stringify liefert `"type": ...` und passt damit nicht zum übrigen
 * erzeugten Bestand; der Unterschied wäre in jedem Diff zu sehen.
 */
function alsLiteral(wert, einzug) {
  const tiefer = einzug + '  '
  if (Array.isArray(wert)) {
    if (wert.length === 0) return '[]'
    return '[\n' + wert.map(w => tiefer + alsLiteral(w, tiefer)).join(',\n') + '\n' + einzug + ']'
  }
  if (wert && typeof wert === 'object') {
    const paare = Object.entries(wert).filter(([, v]) => v !== undefined)
    if (paare.length === 0) return '{}'
    return '{\n' + paare.map(([k, v]) => {
      const schluessel = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : str(k)
      return tiefer + schluessel + ': ' + alsLiteral(v, tiefer)
    }).join(',\n') + '\n' + einzug + '}'
  }
  if (typeof wert === 'string') return str(wert)
  return String(wert)
}

function alsEndForm(teil) {
  if (!teil) return null
  switch (teil.art) {
    case 'formula-calculator':
      return {
        type: 'formula-calculator',
        formula: {
          id: teil.formel.id, name: teil.formel.name, equation: teil.formel.equation,
          variables: teil.formel.variablen, umstellungen: teil.formel.umstellungen,
          hints: teil.formel.hints,
        },
      }
    case 'apparatus-quiz':
      return {
        type: 'apparatus-quiz',
        question: teil.question, targetId: teil.targetId, options: teil.optionen,
        explanation: teil.explanation, hint1: teil.hint1, hint2: teil.hint2,
      }
    case 'apparatus-matching':
      return {
        type: 'apparatus-matching',
        title: teil.title, description: teil.description,
        explanation: teil.explanation, paare: teil.paare,
      }
    case 'spectrum-assignment':
      return {
        type: 'spectrum-assignment',
        title: teil.title, description: teil.description,
        xLabel: teil.xLabel, yLabel: teil.yLabel,
        peaks: teil.peaks, hint1: teil.hint1, hint2: teil.hint2,
      }
    case 'mechanism':
      return {
        type: 'mechanism', title: teil.title, description: teil.description,
        stages: teil.stufen, ergebnis: teil.ergebnis,
      }
    default:
      return null
  }
}

/**
 * Neue Fragen und Karten an ein vorhandenes Thema anhängen.
 * Doppelte Karten (gleiche Vorderseite) und doppelte Fragen fallen weg.
 */
function ergaenzeThema(vorhanden, zusatz, ort) {
  const quizIds = new Set(vorhanden.quiz.map(f => f.id))
  const bekannteFragen = new Set(vorhanden.quiz.map(f => f.question.trim()))
  let naechste = vorhanden.quiz.length

  const neueFragen = []
  for (const frage of zusatz.quiz) {
    if (bekannteFragen.has(frage.question.trim())) continue
    let id = frage.id
    while (!id || quizIds.has(id)) { naechste += 1; id = `q${naechste}` }
    quizIds.add(id)
    neueFragen.push({ ...frage, id })
  }

  // Erst Wegfallendes streichen, dann Neues anhängen — sonst könnte eine
  // ersetzte Karte an ihrer eigenen Kennung scheitern.
  const wegIds = new Set((zusatz.kartenWeg ?? []).map(kartenId))
  const bleiben = vorhanden.flashcards.filter(k => !wegIds.has(k.id))
  const entfernt = vorhanden.flashcards.length - bleiben.length

  const bekannteKarten = new Set(bleiben.map(k => kartenId(k.front)))
  const neueKarten = zusatz.flashcards.filter(k => !bekannteKarten.has(kartenId(k.front)))

  // Nach dem ersten Auftrag liegt der Interaktivteil bereits in Parserform vor.
  // Ein Thema trägt mehrere Interaktivteile. Ein neuer kommt dazu; trägt die
  // Quelle "interaktiv: ersetzen", tritt er an die Stelle des gleichen Typs.
  const bestehende = [...(vorhanden.interactives ?? [])]
  const neuerTeil = zusatz.interactive ? alsEndForm(zusatz.interactive) : null
  let ersetzt = false
  if (neuerTeil) {
    const gleicherTyp = bestehende.findIndex(x => x.type === neuerTeil.type)
    if (gleicherTyp >= 0 && zusatz.interaktivErsetzen) {
      bestehende[gleicherTyp] = neuerTeil
      ersetzt = true
    } else if (gleicherTyp < 0) {
      bestehende.push(neuerTeil)
    }
  }

  const bekannteAbbildungen = new Set((vorhanden.abbildungen ?? []).map(a => a.id))
  const neueAbbildungen = (zusatz.abbildungen ?? []).filter(a => !bekannteAbbildungen.has(a.id))

  return {
    thema: {
      ...vorhanden,
      abbildungen: [...(vorhanden.abbildungen ?? []), ...neueAbbildungen],
      interactive: null,
      interactives: bestehende,
      quiz: [...vorhanden.quiz, ...neueFragen],
      flashcards: [...bleiben, ...neueKarten],
    },
    bilanz: {
      fragen: neueFragen.length,
      karten: neueKarten.length,
      interaktiv: bestehende.length > (vorhanden.interactives ?? []).length,
      ersetzt,
      entfernt,
    },
  }
}

// ── Prüfungsfragen ────────────────────────────────────────────────────────

/** Themen-Slugs eines Kurses aus dem Dateisystem. */
function themenDesKurses(kursId) {
  const dir = join(COURSES_DIR, kursId, 'topics')
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter(f => f.endsWith('.ts')).map(f => f.replace(/\.ts$/, ''))
}

/**
 * Ein einzelner `--- FRAGE ---`-Block: Kennwerte, Optionen und Erklärung
 * heraustrennen. Sowohl Prüfungsfragen (`baueFragen()`) als auch Poolfragen
 * (`lesePoolfragen()`) zerlegen ihre Blöcke damit — ein zweiter Leser daneben
 * würde beide Formate irgendwann auseinanderlaufen lassen.
 */
function leseFrageBlock(block) {
  const zeilen = block.split('\n')
  const optionen = []
  const kv = {}
  let erklaerung = ''
  let inErklaerung = false

  for (const z of zeilen) {
    const t = z.trim()
    if (t.startsWith('- ')) { optionen.push(t.slice(2).trim()); inErklaerung = false; continue }
    const m = t.match(/^([a-zA-Zä-üÄ-Ü_][a-zA-Z0-9ä-üÄ-Ü_]*):\s*(.*)$/)
    if (m) {
      const k = m[1].toLowerCase()
      if (k === 'erklaerung' || k === 'erklärung') { erklaerung = m[2]; inErklaerung = true }
      else { kv[k] = m[2]; inErklaerung = false }
    } else if (inErklaerung && t) erklaerung += ' ' + t
  }
  return { kv, optionen, erklaerung: erklaerung.trim() }
}

/** `richtig:` in einen (Mehrfach-)Index auflösen — mc-single/mc-multi/order teilen sich das. */
function leseRichtigIndex(kv, optionen, typ, nr, ort) {
  const idx = String(kv.richtig ?? '').split(',').map(s => parseInt(s.trim(), 10) - 1)
  if (idx.some(n => !Number.isInteger(n) || n < 0 || n >= optionen.length)) {
    problem(ort, `${nr}: richtig "${kv.richtig}" liegt außerhalb von 1–${optionen.length}`)
  }
  let correct
  if (typ === 'mc-single') {
    if (idx.length !== 1) problem(ort, `${nr}: mc-single braucht genau eine richtige Antwort`)
    correct = idx[0]
  } else correct = idx
  if (optionen.length < 2) problem(ort, `${nr}: braucht Antwortoptionen`)
  return correct
}

function baueFragen(roh, themenIds) {
  const { inhalt, ort } = roh
  sammleMarker(ort, inhalt)
  const teile = inhalt.split(/^---\s*FRAGE\s*---\s*$/m)
  const kopfRoh = teile[0] ?? ''
  const aufbauBlock = kopfRoh.split(/^#\s+AUFBAU\s*$/m)[1] ?? ''
  const kopf = keyValues(kopfRoh.split(/^#\s+AUFBAU\s*$/m)[0])

  if (!kopf.quelle) problem(ort, 'Prüfungskopf ohne quelle')
  if (!kopf.pruefer) problem(ort, 'Prüfungskopf ohne pruefer')

  // Nennt der Kopf einen anderen Kurs, gelten dessen Themen.
  if (kopf.kurs) {
    const fremde = themenDesKurses(kopf.kurs)
    if (fremde.length === 0) {
      problem(ort, `Prüfungskopf nennt Kurs "${kopf.kurs}", zu dem es keine Themen gibt`)
    } else {
      themenIds = [...new Set([...themenIds, ...fremde])]
    }
  }

  const fragen = []
  teile.slice(1).forEach((b, i) => {
    const nr = `${kopf.quelle ?? '?'} Frage ${i + 1}`
    const { kv, optionen, erklaerung } = leseFrageBlock(b)

    const typ = kv.typ
    if (!['mc-single', 'mc-multi', 'numeric', 'order'].includes(typ)) {
      problem(ort, `${nr}: unbekannter typ "${typ}"`)
      return
    }
    if (!kv.frage) problem(ort, `${nr}: ohne Fragetext`)

    const thema = kv.thema ?? ''
    if (/^\[/.test(thema)) {
      warnung(ort, `${nr}: Thema noch nicht zugeordnet (${thema})`)
    } else if (themenIds.length && !themenIds.includes(thema)) {
      problem(ort, `${nr}: thema "${thema}" gibt es im Kurs nicht`)
    }

    let correct
    if (typ === 'numeric') {
      correct = Number(String(kv.richtig).replace(',', '.'))
      if (!Number.isFinite(correct)) problem(ort, `${nr}: richtig "${kv.richtig}" ist keine Zahl`)
    } else {
      correct = leseRichtigIndex(kv, optionen, typ, nr, ort)
    }

    fragen.push({
      id: kv.id || `${(kopf.pruefer ?? 'X')[0].toUpperCase()}${String(i + 1).padStart(3, '0')}`,
      source: kopf.quelle ?? '', gruppe: kopf.pruefer ?? '',
      topicId: thema, points: Number(kv.punkte ?? 1), type: typ,
      question: kv.frage ?? '', options: optionen.length ? optionen : undefined,
      correct, explanation: erklaerung,
      tolerance: kv.toleranz !== undefined ? Number(String(kv.toleranz).replace(',', '.')) : undefined,
      unit: kv.einheit,
    })
  })
  return { kurs: kopf.kurs, fragen, aufbau: leseAufbau(aufbauBlock.trim(), ort) }
}

/**
 * Fragenpool: `--- FRAGE ---`-Blöcke ohne eigenen Prüfungskopf. Anders als bei
 * einer Altprüfung kommen Punkte und Gebiet nicht aus der Quelle, sondern aus
 * der Ordnung — der Pool ist selbst geschrieben, nicht abgeschrieben, und
 * kennt deshalb weder Prüfer noch eigene Punktezahl je Frage.
 *
 * `id` wird als `pool-<thema>-<laufnummer>` gebildet: Thema und Position der
 * Frage innerhalb ihres Themas ändern sich zwischen zwei Importläufen
 * derselben Quelle nicht, solange die Quelle selbst gleich bleibt — die
 * Kennung ist also über Importläufe hinweg stabil, und `mischePruefungsdaten()`
 * ersetzt die Frage statt sie zu verdoppeln.
 */
export function lesePoolfragen(inhalt, ordnung, kursId, ort) {
  const teile = inhalt.split(/^---\s*FRAGE\s*---\s*$/m)
  const fragen = []
  const laufnummern = new Map()

  teile.slice(1).forEach((b, i) => {
    const nr = `${kursId} Poolfrage ${i + 1}`
    const { kv, optionen, erklaerung } = leseFrageBlock(b)

    const typ = kv.typ
    if (!['mc-single', 'mc-multi'].includes(typ)) {
      problem(ort, `${nr}: typ "${typ}" — im Fragenpool sind nur mc-single und mc-multi erlaubt`)
      return
    }
    if (kv.punkte !== undefined) {
      problem(ort, `${nr}: eigenes Feld "punkte" — im Fragenpool kommen die Punkte aus der Ordnung`)
      return
    }
    if (!kv.frage) problem(ort, `${nr}: ohne Fragetext`)

    const thema = kv.thema ?? ''
    const gebiet = ordnung.gebiete.find(g => g.topics.includes(thema))
    if (!gebiet) {
      problem(ort, `${nr}: thema "${thema}" steht in keinem Gebiet der Ordnung`)
      return
    }

    const correct = leseRichtigIndex(kv, optionen, typ, nr, ort)
    if (typ === 'mc-multi') {
      const anzahl = Array.isArray(correct) ? correct.length : 0
      // Alle Optionen richtig wäre ohne Wissen zu erraten.
      if (anzahl < 2 || anzahl > optionen.length - 1) {
        problem(ort, `${nr}: mc-multi braucht mindestens zwei und höchstens ${optionen.length - 1} richtige Antworten, hat ${anzahl}`)
      }
    }

    const laufnummer = (laufnummern.get(thema) ?? 0) + 1
    laufnummern.set(thema, laufnummer)

    fragen.push({
      id: `pool-${thema}-${laufnummer}`,
      source: kv.quelle ?? '', gruppe: gebiet.id,
      topicId: thema, points: ordnung.punkteJeFrage, type: typ,
      question: kv.frage ?? '', options: optionen.length ? optionen : undefined,
      correct, explanation: erklaerung,
    })
  })

  return fragen
}

// ── Ausgabe erzeugen ──────────────────────────────────────────────────────

function themaAlsTypeScript(t) {
  const zeilen = []
  zeilen.push("import type { Thema } from '../../../content/schema'")
  zeilen.push('')
  zeilen.push('export const topic = {')
  zeilen.push(`  id: ${str(t.id)},`)
  zeilen.push(`  title: ${str(t.title)},`)
  zeilen.push(`  subtitle: ${str(t.subtitle)},`)
  zeilen.push(`  icon: ${str(t.icon)},`)
  zeilen.push(`  estimatedMinutes: ${t.estimatedMinutes},`)
  // Ohne trim() wächst der Theorietext bei jedem Lauf um eine Leerzeile:
  // die gespeicherte Fassung trägt die Umbrüche des vorigen schon.
  zeilen.push(`  theory: ${tpl('\n' + t.theory.trim() + '\n')},`)

  const i = t.interactive
  const vorInteraktiv = zeilen.length
  if (i?.art === 'formula-calculator') {
    const f = i.formel
    zeilen.push('  interactive: {')
    zeilen.push('    type: "formula-calculator",')
    zeilen.push('    formula: {')
    zeilen.push(`      id: ${str(f.id)},`)
    zeilen.push(`      name: ${str(f.name)},`)
    zeilen.push(`      equation: ${str(f.equation)},`)
    zeilen.push('      variables: [')
    for (const v of f.variablen) {
      zeilen.push(`        { id: ${str(v.id)}, label: ${str(v.label)}, symbol: ${str(v.symbol)}, unit: ${str(v.unit)}, description: ${str(v.description)} },`)
    }
    zeilen.push('      ],')
    zeilen.push('      umstellungen: [')
    for (const u of f.umstellungen) {
      zeilen.push(`        { solveFor: ${str(u.solveFor)}, expr: ${str(u.expr)} },`)
    }
    zeilen.push('      ],')
    zeilen.push(`      hints: [${f.hints.map(str).join(', ')}],`)
    zeilen.push('    },')
    zeilen.push('  },')
  } else if (i?.art === 'apparatus-quiz') {
    zeilen.push('  interactive: {')
    zeilen.push('    type: "apparatus-quiz",')
    zeilen.push(`    question: ${str(i.question)},`)
    zeilen.push(`    targetId: ${str(i.targetId)},`)
    zeilen.push(`    explanation: ${str(i.explanation)},`)
    if (i.hint1) zeilen.push(`    hint1: ${str(i.hint1)},`)
    if (i.hint2) zeilen.push(`    hint2: ${str(i.hint2)},`)
    zeilen.push('    options: [')
    for (const o of i.optionen) {
      zeilen.push(`      { id: ${str(o.id)}, label: ${str(o.label)}, description: ${str(o.description)} },`)
    }
    zeilen.push('    ],')
    zeilen.push('  },')
  } else if (i?.art === 'mechanism') {
    const atomZeile = (a, einzug) => {
      const felder = [`id: ${str(a.id)}`, `element: ${str(a.element)}`, `x: ${a.x}`, `y: ${a.y}`]
      if (a.ladung !== undefined) felder.push(`ladung: ${a.ladung}`)
      if (a.freiePaare !== undefined) felder.push(`freiePaare: ${a.freiePaare}`)
      if (a.wasserstoffe !== undefined) felder.push(`wasserstoffe: ${a.wasserstoffe}`)
      if (a.zeigen !== undefined) felder.push(`zeigen: ${a.zeigen}`)
      if (a.frei !== undefined) felder.push(`frei: ${a.frei}`)
      return `${einzug}{ ${felder.join(', ')} },`
    }
    const bindungsZeile = (b, einzug) => {
      const felder = [`id: ${str(b.id)}`, `von: ${str(b.von)}`, `nach: ${str(b.nach)}`, `ordnung: ${b.ordnung}`]
      if (b.art) felder.push(`art: ${str(b.art)}`)
      return `${einzug}{ ${felder.join(', ')} },`
    }

    zeilen.push('  interactive: {')
    zeilen.push('    type: "mechanism",')
    zeilen.push(`    title: ${str(i.title)},`)
    zeilen.push(`    description: ${str(i.description)},`)
    zeilen.push('    stages: [')
    for (const st of i.stufen) {
      zeilen.push('      {')
      zeilen.push(`        id: ${st.id}, titel: ${str(st.titel)},`)
      zeilen.push(`        aufgabe: ${str(st.aufgabe)},`)
      zeilen.push(`        erklaerung: ${str(st.erklaerung)},`)
      zeilen.push(`        hinweise: [${st.hinweise.map(str).join(', ')}],`)
      zeilen.push('        atome: [')
      for (const a of st.atome) zeilen.push(atomZeile(a, '          '))
      zeilen.push('        ],')
      zeilen.push('        bindungen: [')
      for (const b of st.bindungen) zeilen.push(bindungsZeile(b, '          '))
      zeilen.push('        ],')
      zeilen.push('        pfeile: [')
      for (const pf of st.pfeile) {
        zeilen.push(`          { von: { art: ${str(pf.von.art)}, id: ${str(pf.von.id)} }, `
          + `nach: { art: ${str(pf.nach.art)}, id: ${str(pf.nach.id)} } },`)
      }
      zeilen.push('        ],')
      zeilen.push('      },')
    }
    zeilen.push('    ],')
    zeilen.push('    ergebnis: {')
    zeilen.push(`      titel: ${str(i.ergebnis.titel)},`)
    zeilen.push(`      beschreibung: ${str(i.ergebnis.beschreibung)},`)
    zeilen.push('      atome: [')
    for (const a of i.ergebnis.atome) zeilen.push(atomZeile(a, '        '))
    zeilen.push('      ],')
    zeilen.push('      bindungen: [')
    for (const b of i.ergebnis.bindungen) zeilen.push(bindungsZeile(b, '        '))
    zeilen.push('      ],')
    zeilen.push('    },')
    zeilen.push('  },')
  } else if (i?.art === 'spectrum-assignment') {
    zeilen.push('  interactive: {')
    zeilen.push('    type: "spectrum-assignment",')
    zeilen.push(`    title: ${str(i.title)},`)
    zeilen.push(`    description: ${str(i.description)},`)
    zeilen.push(`    xLabel: ${str(i.xLabel)},`)
    zeilen.push(`    yLabel: ${str(i.yLabel)},`)
    if (i.hint1) zeilen.push(`    hint1: ${str(i.hint1)},`)
    if (i.hint2) zeilen.push(`    hint2: ${str(i.hint2)},`)
    zeilen.push('    peaks: [')
    for (const p of i.peaks) {
      zeilen.push(`      { id: ${str(p.id)}, position: ${p.position}, yTop: ${p.yTop}, yBottom: ${p.yBottom}, correctLabel: ${str(p.correctLabel)}, options: [${p.options.map(str).join(', ')}] },`)
    }
    zeilen.push('    ],')
    zeilen.push('  },')
  }

  // Aus dem einen Interaktivteil des Quellformats wird ein Eintrag der Liste.
  if (zeilen.length > vorInteraktiv) {
    const teil = zeilen.splice(vorInteraktiv).map(z => '  ' + z)
    teil[0] = '    {'
    zeilen.push('  interactives: [', ...teil, '  ],')
  } else if (t.interactives?.length) {
    zeilen.push('  interactives: [')
    for (const vorhandenerTeil of t.interactives) {
      zeilen.push('    ' + alsLiteral(vorhandenerTeil, '    ') + ',')
    }
    zeilen.push('  ],')
  }

  if (t.abbildungen?.length) {
    zeilen.push('  abbildungen: [')
    for (const a of t.abbildungen) {
      zeilen.push('    {')
      zeilen.push(`      art: ${str(a.art ?? 'strukturen')},`)
      zeilen.push(`      id: ${str(a.id)},`)
      zeilen.push(`      titel: ${str(a.titel)},`)
      if (a.beschreibung) zeilen.push(`      beschreibung: ${str(a.beschreibung)},`)
      if (a.art === 'diagramm') {
        const achse = (na) => `{ titel: ${str(na.titel)}, min: ${na.min}, max: ${na.max} }`
        zeilen.push(`      xAchse: ${achse(a.xAchse)},`)
        zeilen.push(`      yAchse: ${achse(a.yAchse)},`)
        zeilen.push('      kurven: [')
        for (const k of a.kurven) {
          const punkte = k.punkte.map(pk => `{ x: ${pk.x}, y: ${pk.y} }`).join(', ')
          const zusatz = (k.stil ? `, stil: ${str(k.stil)}` : '') + (k.farbe ? `, farbe: ${str(k.farbe)}` : '')
          zeilen.push(`        { beschriftung: ${str(k.beschriftung)}, punkte: [${punkte}]${zusatz} },`)
        }
        zeilen.push('      ],')
        if (a.marker.length) {
          zeilen.push('      marker: [')
          for (const mk of a.marker) {
            zeilen.push(`        { x: ${mk.x}, y: ${mk.y}, beschriftung: ${str(mk.beschriftung)}${mk.hilfslinien ? ', hilfslinien: true' : ''} },`)
          }
          zeilen.push('      ],')
        }
        zeilen.push('    },')
        continue
      }
      zeilen.push(`      verknuepfung: ${str(a.verknuepfung)},`)
      zeilen.push('      strukturen: [')
      for (const st of a.strukturen) {
        zeilen.push('        {')
        zeilen.push(`          beschriftung: ${str(st.beschriftung)},`)
        zeilen.push('          atome: [')
        for (const at of st.atome) {
          const zusatz = ['ladung', 'freiePaare', 'wasserstoffe'].filter(k => at[k] !== undefined)
            .map(k => `, ${k}: ${at[k]}`).join('')
            + (at.zeigen ? ', zeigen: true' : '') + (at.frei ? ', frei: true' : '')
          zeilen.push(`            { id: ${str(at.id)}, element: ${str(at.element)}, x: ${at.x}, y: ${at.y}${zusatz} },`)
        }
        zeilen.push('          ],')
        zeilen.push('          bindungen: [')
        for (const b of st.bindungen) {
          zeilen.push(`            { id: ${str(b.id)}, von: ${str(b.von)}, nach: ${str(b.nach)}, ordnung: ${b.ordnung}${b.art ? `, art: ${str(b.art)}` : ''} },`)
        }
        zeilen.push('          ],')
        zeilen.push('        },')
      }
      zeilen.push('      ],')
      zeilen.push('    },')
    }
    zeilen.push('  ],')
  }

  zeilen.push('  quiz: [')
  for (const q of t.quiz) {
    zeilen.push(`    { id: ${str(q.id)}, question: ${str(q.question)}, options: [${q.options.map(str).join(', ')}], correct: ${q.correct}, explanation: ${str(q.explanation)} },`)
  }
  zeilen.push('  ],')
  zeilen.push('  flashcards: [')
  for (const c of t.flashcards) {
    zeilen.push(`    { id: ${str(kartenId(c.front))}, front: ${str(c.front)}, back: ${str(c.back)} },`)
  }
  zeilen.push('  ],')
  zeilen.push('} satisfies Thema;')
  return zeilen.join('\n') + '\n'
}

/** Prüfungsaufbau aus einem `# AUFBAU`-Block lesen. Optional. */
function leseAufbau(block, ort) {
  if (!block) return null
  const kv = keyValues(block)
  if (!kv.id) { problem(ort, 'Prüfungsaufbau ohne id'); return null }

  const sections = []
  for (const zeile of block.split('\n')) {
    const m = zeile.match(/^abschnitt:\s*(.+)$/)
    if (!m) continue
    const teile = m[1].split('|').map(t => t.trim())
    if (teile.length !== 4) { problem(ort, `Abschnitt braucht 4 Felder: "${zeile}"`); continue }
    const [pruefer, punkte, bestehen, ids] = teile
    sections.push({
      gruppe: pruefer,
      points: Number(punkte),
      passingPoints: Number(bestehen),
      questionIds: ids.split(',').map(t => t.trim()).filter(Boolean),
    })
  }
  if (sections.length === 0) { problem(ort, `Prüfungsaufbau ${kv.id} ohne Abschnitte`); return null }

  const gesamt = sections.reduce((summe, a) => summe + a.points, 0)
  return {
    id: kv.id,
    date: kv.datum ?? '',
    title: kv.titel ?? kv.id,
    totalPoints: Number(kv.punkte ?? gesamt),
    passingPoints: Number(kv.bestehen ?? Math.ceil(gesamt / 2)),
    sections,
  }
}

/**
 * Neue Fragen und Aufbauten nach Kennung einmischen.
 *
 * Vorher erzeugte der Importer die ganze Prüfungsdatei neu — bei leerem
 * Quellordner hätte ein Lauf die handkuratierten Altprüfungsfragen und beide
 * echten Prüfungsaufbauten gelöscht. Jetzt wird nur ergänzt und ersetzt.
 */
function stabil(objekt) {
  // Schlüsselreihenfolge darf keinen Unterschied vortäuschen.
  return JSON.stringify(objekt, Object.keys(objekt).sort())
}

function mischePruefungsdaten(kursId, neueFragen, neueAufbauten) {
  const pfad = EXAMS_JSON(kursId)
  const vorhanden = existsSync(pfad)
    ? JSON.parse(readFileSync(pfad, 'utf8'))
    : { questions: [], structures: [] }

  const bilanz = { neu: [], geaendert: [], unveraendert: [], behalten: vorhanden.questions.length }

  const fragen = new Map(vorhanden.questions.map(q => [q.id, q]))
  for (const frage of neueFragen) {
    const alt = fragen.get(frage.id)
    if (!alt) bilanz.neu.push(frage.id)
    else if (stabil(alt) !== stabil(frage)) bilanz.geaendert.push(frage.id)
    else bilanz.unveraendert.push(frage.id)
    fragen.set(frage.id, frage)
  }

  const aufbauten = new Map((vorhanden.structures ?? []).map(a => [a.id, a]))
  for (const aufbau of neueAufbauten) aufbauten.set(aufbau.id, aufbau)

  return {
    daten: {
      questions: [...fragen.values()].sort((a, b) => a.id.localeCompare(b.id)),
      structures: [...aufbauten.values()].sort((a, b) => a.id.localeCompare(b.id)),
    },
    bilanz,
  }
}

/** Dünner TypeScript-Mantel um die JSON-Daten. Wird nur angelegt, nie überschrieben. */
function pruefungsMantel(kursId) {
  return `import daten from './${kursId}.json'
import type { PruefungsDaten } from './typen'

const { questions, structures } = daten as PruefungsDaten

export { questions, structures }
`
}

/** Voreinstellung für ein Fach, das es noch nicht gibt. */
export function standardKursMeta(kursId) {
  return {
    id: kursId, title: kursId, subtitle: '', icon: '📘', color: '#3b82f6',
    level: 'Uni', description: '', sprache: 'de', formelsatz: 'chemie',
    entwurf: false, gruppen: [],
  }
}

/**
 * Stundenangabe aus den Themen auf der Platte.
 *
 * `inhalte.test.ts` verlangt, dass sie auf eine Stunde genau zur Summe der
 * Themenzeiten passt. Ein Fach wächst stückweise — eine fortgeschriebene Zahl
 * wäre nach dem zweiten Lauf falsch, also wird sie jedes Mal neu gerechnet.
 */
function stundenAusThemen(kursId, themenIds) {
  let minuten = 0
  for (const id of themenIds) {
    const thema = leseVorhandenesThema(kursId, id)
    if (thema) minuten += Number(thema.estimatedMinutes) || 0
  }
  return Math.round(minuten / 60 * 10) / 10
}

/** Ordnung als TypeScript ausgeben — von Hand, wie die übrigen Felder. */
function ordnungAlsTypeScript(o) {
  if (!o) return ''
  const gebiete = o.gebiete.map(g =>
    `      { id: ${str(g.id)}, titel: ${str(g.titel)}, fragen: ${g.fragen},\n`
    + `        topics: [${g.topics.map(str).join(', ')}] },`).join('\n')
  const noten = o.noten.map(n => `{ ab: ${n.ab}, note: ${str(n.note)} }`).join(', ')
  return '  ordnung: {\n'
    + `    titel: ${str(o.titel)},\n`
    + `    fragen: ${o.fragen},\n`
    + `    punkteJeFrage: ${o.punkteJeFrage},\n`
    + `    regel: ${str(o.regel)},\n`
    + `    zeitMinuten: ${o.zeitMinuten},\n`
    + `    noten: [${noten}],\n`
    + `    gebiete: [\n${gebiete}\n    ],\n`
    + '  },\n'
}

/**
 * Zweite, maschinenlesbare Fassung der Ordnung — als einzeilige JSON-Zeile
 * hinter einer Kommentarmarke.
 *
 * `leseOrdnungAusIndex()` liest nicht aus dem TypeScript-Objekt oben zurück:
 * Titel, Gebietsnamen und Notennamen sind freier Text aus der Quelle und
 * können zufällig wie Syntax aussehen — ein Titel mit dem Teilstring
 * `"gebiete:"`, ein Gebietsname mit `{` oder `}`. Ein Rückleser, der auf
 * solche Zeichenketten im generierten Code sucht, liest dann leise falsch
 * oder stürzt ab. Die JSON-Zeile ist dagegen ein einziges, in sich
 * geschlossenes, escapetes Feld: `JSON.stringify()` kann nie eine
 * echte Zeile umbrechen oder die Markierung selbst erzeugen, also gibt es
 * nichts, worin sich Nutzertext mit der Suche nach der Marke verwechseln
 * ließe.
 */
function ordnungAlsKommentar(o) {
  return o ? `// ORDNUNG-JSON: ${JSON.stringify(o)}\n` : ''
}

export function kursIndexAlsTypeScript(vorhanden, kursId, themenIds) {
  const meta = vorhanden ?? { ...standardKursMeta(kursId), estimatedHours: themenIds.length * 2 }
  const pruefer = (meta.gruppen ?? []).length
    ? '  gruppen: [\n' + meta.gruppen.map(p =>
        `    { id: ${str(p.id)}, label: ${str(p.label)}${p.icon ? `, icon: ${str(p.icon)}` : ''} },`).join('\n') + '\n  ],\n'
    : '  gruppen: [],\n'

  return `import type { Kurs } from '../../content/schema'

export const course = {
  id: ${str(meta.id)},
  title: ${str(meta.title)},
  subtitle: ${str(meta.subtitle)},
  icon: ${str(meta.icon)},
  color: ${str(meta.color)},
  level: ${str(meta.level)},
  description: ${str(meta.description)},
  topics: [
${themenIds.map(t => `    ${str(t)},`).join('\n')}
  ],
  totalTopics: ${themenIds.length},
  estimatedHours: ${meta.estimatedHours},
  sprache: ${str(meta.sprache ?? 'de')},
  formelsatz: ${str(meta.formelsatz ?? 'chemie')},
  entwurf: ${meta.entwurf ? 'true' : 'false'},
${pruefer}${ordnungAlsTypeScript(meta.ordnung)}} satisfies Kurs;
${ordnungAlsKommentar(meta.ordnung)}`
}

/** Bestehende Kurs-Metadaten auslesen, damit sie beim Import erhalten bleiben. */
function leseKursMeta(kursId) {
  const p = join(COURSES_DIR, kursId, 'index.ts')
  if (!existsSync(p)) return null
  const s = readFileSync(p, 'utf8')
  const feld = (name, fallback) => {
    const m = s.match(new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`))
    return m ? JSON.parse(`"${m[1]}"`) : fallback
  }
  const zahl = (name, fallback) => {
    const m = s.match(new RegExp(`${name}:\\s*(\\d+)`))
    return m ? Number(m[1]) : fallback
  }
  // `sprache` fehlte hier: ein Vollimport in organic-chemistry hat das
  // englische Fach still auf Deutsch zurückgestellt. Was der Index trägt, muss
  // hier stehen — sonst geht es beim nächsten Lauf verloren.
  return {
    id: kursId, title: feld('title', kursId), subtitle: feld('subtitle', ''),
    icon: feld('icon', '📘'), color: feld('color', '#3b82f6'), level: feld('level', 'Uni'),
    description: feld('description', ''), estimatedHours: zahl('estimatedHours', 20),
    sprache: feld('sprache', 'de'), formelsatz: feld('formelsatz', 'chemie'),
    entwurf: /\bentwurf:\s*true\b/.test(s),
    gruppen: leseGruppen(s),
    ordnung: leseOrdnungAusIndex(s),
  }
}

/**
 * Gruppenliste aus einem bestehenden Kursindex übernehmen.
 *
 * Hier stand `inlineFields`, das an `|` trennt — im erzeugten Index sind die
 * Felder aber mit Komma getrennt und in Anführungszeichen gesetzt. Aus
 * `{ id: "uebung", label: "Übungsfragen" }` wurde deshalb eine einzige Gruppe
 * namens `"uebung", label: "Übungsfragen"`. Ein Vollimport hätte die
 * Gruppenabschnitte jedes Fachs zerlegt.
 */
function leseGruppen(quelltext) {
  const block = quelltext.split(/gruppen:\s*\[/)[1]
  if (!block) return []
  const bis = block.indexOf(']')
  return [...block.slice(0, bis).matchAll(/\{([^}]*)\}/g)].map(m => {
    const felder = {}
    for (const f of m[1].matchAll(/([a-zA-Z]+)\s*:\s*"((?:[^"\\]|\\.)*)"/g)) {
      felder[f[1].toLowerCase()] = JSON.parse(`"${f[2]}"`)
    }
    return { id: felder.id, label: felder.label ?? felder.id, icon: felder.icon }
  }).filter(p => p.id)
}

/**
 * Ordnung aus einem vorhandenen Index zurücklesen.
 *
 * Ohne dieses Gegenstück zu `ordnungAlsTypeScript()` löscht der nächste
 * Import ohne `=== ORDNUNG ===`-Block die Ordnung wieder — derselbe Fehler,
 * der beim Rücklesen der Gruppen (`leseGruppen()`) schon einmal auftrat.
 *
 * Gelesen wird nicht aus dem hübsch formatierten TypeScript-Objekt, sondern
 * aus der einzeiligen JSON-Marke, die `ordnungAlsKommentar()` daneben
 * schreibt — siehe dort für die Begründung: Freitext aus der Quelle (Titel,
 * Gebiets- und Notennamen) kann sonst wie Syntax aussehen und den Leser in
 * die Irre führen oder abstürzen lassen.
 */
export function leseOrdnungAusIndex(quelltext) {
  const m = quelltext.match(/^\/\/ ORDNUNG-JSON: (.+)$/m)
  return m ? JSON.parse(m[1]) : undefined
}

// ── Bericht ───────────────────────────────────────────────────────────────

function schreibeBericht(quellDir, themen, fragen) {
  const z = []
  z.push('# Importbericht')
  z.push('')
  z.push(`Erzeugt: ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`)
  z.push('')
  z.push(`- Themen: ${themen.length}`)
  z.push(`- Prüfungsfragen: ${fragen.length}`)
  z.push(`- Fehler: ${fehler.length}`)
  z.push(`- Warnungen: ${warnungen.length}`)
  z.push(`- Markierungen der Quell-LLM: ${marker.length}`)
  z.push('')

  if (fehler.length) {
    z.push('## Fehler — Import abgebrochen')
    z.push('')
    for (const f of fehler) z.push(`- ${f}`)
    z.push('')
  }
  if (marker.length) {
    z.push('## Nachprüfen')
    z.push('')
    z.push('Diese Stellen hat die Quell-LLM selbst als unsicher markiert.')
    z.push('')
    for (const m of marker) z.push(`- **${m.art}** ${m.ort}${m.hinweis ? ` — ${m.hinweis}` : ''}`)
    z.push('')
  }
  if (warnungen.length) {
    z.push('## Warnungen')
    z.push('')
    for (const w of warnungen) z.push(`- ${w}`)
    z.push('')
  }
  const p = join(quellDir, 'report.md')
  writeFileSync(p, z.join('\n'))
  return p
}

// ── Hauptlauf ─────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const force = args.includes('--force')
  const dir = args.find(a => !a.startsWith('--'))

  if (!dir) {
    console.error('Aufruf: npm run import -- <quellordner> [--dry-run] [--force]')
    process.exit(1)
  }

  const quellDir = join(ROOT, dir)
  // Ordnername ist die Kurs-Kennung. Kein Sonderfall mehr für ein einzelnes Fach.
  const kursId = basename(quellDir.replace(/\/$/, ''))

  console.log(`Quelle:  ${dir}`)
  console.log(`Kurs:    ${kursId}${dryRun ? '   [Probelauf]' : ''}`)
  console.log('')

  const quellen = ladeQuelltexte(quellDir)
  const roheThemen = []
  const rohePruefungen = []
  const roheKurskoepfe = []
  const roheOrdnungen = []
  const rohePoolBloecke = []
  // Je Datei mitschreiben, was herauskam. Eine Datei, die nichts hergibt,
  // fiel früher niemandem auf — Kapitel 15 der Physik fehlte ohne ein Wort,
  // weil ihr Kopf `=== DATEI: ... ===` fehlte.
  const jeDatei = []
  for (const { datei, text } of quellen) {
    const { themen, pruefungen, kurskoepfe, ordnungen, poolBloecke } = teileAuf(text, datei)
    roheThemen.push(...themen)
    rohePruefungen.push(...pruefungen)
    roheKurskoepfe.push(...kurskoepfe)
    roheOrdnungen.push(...ordnungen)
    rohePoolBloecke.push(...poolBloecke)
    jeDatei.push({
      datei, themen: themen.length, pruefungen: pruefungen.length,
      kurskopf: kurskoepfe.length, poolBloecke: poolBloecke.length,
    })
  }

  for (const d of jeDatei) {
    if (d.themen || d.pruefungen || d.kurskopf || d.poolBloecke) continue
    warnung(d.datei, 'nichts erkannt — fehlt der Kopf "=== DATEI: <slug>.md ==="?')
  }

  if (roheKurskoepfe.length > 1) {
    problem('Kurskopf', `${roheKurskoepfe.length} mal "=== KURS ===" im Ordner — es darf nur einen geben`)
  }
  let kursKopf = roheKurskoepfe.length
    ? baueKursKopf(roheKurskoepfe[0].inhalt, roheKurskoepfe[0].ort)
    : null

  if (roheOrdnungen.length > 1) {
    problem('Ordnung', `${roheOrdnungen.length} mal "=== ORDNUNG ===" im Ordner — es darf nur einen geben`)
  }
  const ordnungOrt = roheOrdnungen[0]?.ort ?? 'Ordnung'
  const ordnungGelesen = roheOrdnungen.length ? leseOrdnung(roheOrdnungen[0].inhalt, roheOrdnungen[0].ort) : undefined
  // Dieselbe Vorrangregel wie beim KURS-Block: eine Quelle ohne ORDNUNG darf
  // eine schon eingespielte Ordnung nicht überschreiben — der Schlüssel wird
  // deshalb nur gesetzt, wenn diese Quelle tatsächlich einen Block mitbringt.
  if (ordnungGelesen) {
    if (kursKopf) kursKopf.ordnung = ordnungGelesen
    else kursKopf = { ordnung: ordnungGelesen }
  }

  const alleRohThemen = roheThemen.map(baueThema).sort((a, b) => a.id.localeCompare(b.id))
  // Sollstärke aus CONTENT-PROMPT.md schon hier prüfen: sechs Quizfragen,
  // sechs Karten, ein Interaktivteil, 400 Wörter Theorie. Sonst merkt man den
  // Mangel erst, wenn die Tests der App über den geschriebenen Inhalt fallen.
  for (const t of alleRohThemen.filter(t => !t.ergaenzen)) {
    const mangel = []
    if (t.quiz.length === 0) mangel.push('keine Quizfragen')
    else if (t.quiz.length < 6) mangel.push(`nur ${t.quiz.length} Quizfragen`)
    if (t.flashcards.length === 0) mangel.push('keine Karteikarten')
    else if (t.flashcards.length < 6) mangel.push(`nur ${t.flashcards.length} Karteikarten`)
    if (!t.interactive) mangel.push('kein Interaktivteil')
    const woerter = t.theory.split(/\s+/).filter(Boolean).length
    if (woerter < 400) mangel.push(`nur ${woerter} Wörter Theorie`)
    if (mangel.length) warnung(t.ort, `unter der Sollstärke: ${mangel.join(', ')}`)
  }

  const themen = alleRohThemen.filter(t => !t.ergaenzen)
  const ergaenzungen = alleRohThemen.filter(t => t.ergaenzen)
  const themenIds = alleRohThemen.map(t => t.id)

  // Fragen dürfen sich auch auf schon vorhandene Themen beziehen.
  // Reihenfolge: Voreinstellung, dann was im Index steht, zuletzt die Quelle —
  // ein `=== KURS ===`-Block schlägt beides.
  const meta = { ...standardKursMeta(kursId), ...(leseKursMeta(kursId) ?? {}), ...(kursKopf ?? {}) }
  const bestehendeThemen = existsSync(join(COURSES_DIR, kursId, 'topics'))
    ? readdirSync(join(COURSES_DIR, kursId, 'topics')).filter(f => f.endsWith('.ts')).map(f => f.replace(/\.ts$/, ''))
    : []
  const alleThemenIds = [...new Set([...bestehendeThemen, ...themenIds])].sort()

  // Erst jetzt steht die Themenliste des Kurses fest — vorher konnte
  // `leseOrdnung()` die Gebiete nicht gegen sie prüfen.
  if (meta.ordnung) pruefeOrdnungGegenThemen(meta.ordnung, alleThemenIds, ordnungOrt)

  // Ein Prüfungsblock darf über `kurs:` ein anderes Fach ansprechen — dann
  // gehören seine Fragen auch dorthin und nicht in den Quellordner-Kurs.
  const nachKurs = new Map()
  const eintrag = (id) => {
    if (!nachKurs.has(id)) nachKurs.set(id, { fragen: [], aufbauten: [] })
    return nachKurs.get(id)
  }
  for (const roh of rohePruefungen) {
    const { kurs, fragen, aufbau } = baueFragen(roh, alleThemenIds)
    const ziel = eintrag(kurs || kursId)
    ziel.fragen.push(...fragen)
    if (aufbau) ziel.aufbauten.push(aufbau)
  }
  // Der Fragenpool hat keinen eigenen Kopf mit `kurs:` — er gehört immer zum
  // Quellordner, aus dem er kommt, und braucht dessen Ordnung für Punkte und
  // Gebietszuordnung.
  for (const roh of rohePoolBloecke) {
    if (!meta.ordnung) {
      problem(roh.ort, 'Fragenpool ohne "=== ORDNUNG ===" — Punkte und Gebiete sind unbekannt')
      continue
    }
    eintrag(kursId).fragen.push(...lesePoolfragen(roh.inhalt, meta.ordnung, kursId, roh.ort))
  }
  const alleFragen = [...nachKurs.values()].flatMap(e => e.fragen)
  const alleAufbauten = [...nachKurs.values()].flatMap(e => e.aufbauten)

  const doppelt = alleFragen.map(f => f.id).filter((id, i, a) => a.indexOf(id) !== i)
  if (doppelt.length) problem('Prüfungsfragen', `doppelte IDs: ${[...new Set(doppelt)].join(', ')}`)

  // Ergänzungen gegen das vorhandene Thema legen. Mehrere Quelldateien dürfen
  // dasselbe Thema ergänzen — sie werden nacheinander aufgetragen, sonst
  // überschriebe die zweite die Arbeit der ersten.
  const ergaenzt = []
  const jeThema = new Map()
  for (const zusatz of ergaenzungen) {
    if (!jeThema.has(zusatz.id)) jeThema.set(zusatz.id, [])
    jeThema.get(zusatz.id).push(zusatz)
  }

  for (const [themaId, stapel] of jeThema) {
    let stand = leseVorhandenesThema(kursId, themaId)
    if (!stand) { problem(stapel[0].ort, `Ergänzung für "${themaId}", das es noch nicht gibt`); continue }

    const summe = { fragen: 0, karten: 0, entfernt: 0, interaktiv: false, ersetzt: false }
    for (const zusatz of stapel) {
      const { thema, bilanz } = ergaenzeThema(stand, zusatz, zusatz.ort)
      stand = thema
      summe.fragen += bilanz.fragen
      summe.karten += bilanz.karten
      summe.entfernt += bilanz.entfernt
      summe.interaktiv = summe.interaktiv || bilanz.interaktiv
      summe.ersetzt = summe.ersetzt || bilanz.ersetzt
    }
    ergaenzt.push({ thema: stand, bilanz: summe, id: themaId })
  }

  console.log('Quelldateien:')
  for (const d of jeDatei) {
    const teile = []
    if (d.kurskopf) teile.push(d.kurskopf === 1 ? 'Kurskopf' : `${d.kurskopf} Kursköpfe`)
    if (d.themen) teile.push(d.themen === 1 ? '1 Thema' : `${d.themen} Themen`)
    if (d.pruefungen) teile.push(d.pruefungen === 1 ? '1 Prüfungsblock' : `${d.pruefungen} Prüfungsblöcke`)
    if (d.poolBloecke) teile.push(d.poolBloecke === 1 ? '1 Fragenpool' : `${d.poolBloecke} Fragenpools`)
    const befund = teile.length ? teile.join(', ') : 'nichts erkannt'
    console.log(`  ${d.datei.padEnd(34)} ${befund}`)
  }
  console.log('')

  console.log(`${themen.length} Themen geparst${ergaenzungen.length ? `, ${ergaenzungen.length} Ergänzungen` : ''}`)
  console.log(`${alleFragen.length} Prüfungsfragen geparst`)

  const berichtPfad = schreibeBericht(quellDir, themen, alleFragen)

  if (marker.length) console.log(`${marker.length} Stellen zum Nachprüfen markiert`)
  for (const w of warnungen) console.log(`  Warnung: ${w}`)

  if (fehler.length) {
    console.log('')
    for (const f of fehler) console.log(`  Fehler: ${f}`)
    console.log('')
    console.log(`Abgebrochen, nichts geschrieben. Einzelheiten: ${berichtPfad}`)
    process.exit(1)
  }

  // Ausdrückliche Entwarnung: wer nur auf Fehler schaut, kann Schweigen nicht
  // von Erfolg unterscheiden. Steht die Zeile nicht da, war etwas.
  if (warnungen.length === 0 && marker.length === 0) {
    console.log('')
    console.log(`Alles geprüft: ${quellen.length} Quelldateien, ${themen.length + ergaenzungen.length} Themen, ${alleFragen.length} Prüfungsfragen — keine Beanstandungen.`)
  } else {
    console.log('')
    const teile = []
    if (warnungen.length) teile.push(`${warnungen.length} Warnung${warnungen.length === 1 ? '' : 'en'}`)
    if (marker.length) teile.push(`${marker.length} Markierung${marker.length === 1 ? '' : 'en'} der Quell-LLM`)
    console.log(`Geprüft: ${quellen.length} Quelldateien, ${themen.length + ergaenzungen.length} Themen, ${alleFragen.length} Prüfungsfragen — ${teile.join(', ')} oben.`)
  }

  const zusammengefuehrt = [...nachKurs.entries()].map(([zielKurs, e]) => ({
    kursId: zielKurs,
    ...mischePruefungsdaten(zielKurs, e.fragen, e.aufbauten),
  }))
  const themenNeu = themen.filter(t => !existsSync(join(COURSES_DIR, kursId, 'topics', `${t.id}.ts`)))
  const themenVorhanden = themen.filter(t => existsSync(join(COURSES_DIR, kursId, 'topics', `${t.id}.ts`)))

  console.log('')
  console.log('Unterschied:')
  console.log(`  Themen      neu ${themenNeu.length}${themenNeu.length ? ' (' + themenNeu.map(t => t.id).join(', ') + ')' : ''}`)
  console.log(`              vorhanden ${themenVorhanden.length}${force ? ' — werden überschrieben' : ' — bleiben unberührt'}`)
  for (const e of ergaenzt) {
    const teile = [`${e.bilanz.fragen} Fragen`, `${e.bilanz.karten} Karten`]
    if (e.bilanz.entfernt) teile.push(`${e.bilanz.entfernt} Karten entfernt`)
    if (e.bilanz.interaktiv) teile.push('Interaktivteil')
    if (e.bilanz.ersetzt) teile.push('Interaktivteil ersetzt')
    console.log(`  Ergänzung   ${e.id}: +${teile.join(', +')}`)
  }
  for (const z of zusammengefuehrt) {
    console.log(`  Fragen      ${z.kursId}: neu ${z.bilanz.neu.length}, geändert ${z.bilanz.geaendert.length}, unverändert ${z.bilanz.unveraendert.length}`)
    console.log(`              ${z.bilanz.behalten} bereits vorhandene bleiben erhalten`)
    console.log(`  Aufbauten   ${z.kursId}: ${z.daten.structures.length} insgesamt`)
  }

  if (dryRun) {
    console.log('')
    console.log(`Probelauf, nichts geschrieben. Bericht: ${berichtPfad}`)
    return
  }

  // ── Schreiben ──
  const topicsDir = join(COURSES_DIR, kursId, 'topics')
  mkdirSync(topicsDir, { recursive: true })

  const geschrieben = []
  const uebersprungen = []
  for (const t of themen) {
    const p = join(topicsDir, `${t.id}.ts`)
    if (existsSync(p) && !force) { uebersprungen.push(t.id); continue }
    writeFileSync(p, themaAlsTypeScript(t))
    geschrieben.push(t.id)
  }

  for (const e of ergaenzt) {
    const text = themaAlsTypeScript(e.thema)
    // Notbremse: ein Ergänzungslauf darf nie Inhalt verlieren.
    if (e.thema.interactive && !text.includes('  interactive: {')) {
      console.error(`Abbruch: Interaktivteil von ${e.id} würde verloren gehen.`)
      process.exit(1)
    }
    writeFileSync(join(topicsDir, `${e.id}.ts`), text)
  }
  if (ergaenzt.length) console.log(`ergänzt: ${ergaenzt.length} Themen`)

  if ((themen.length > 0 || kursKopf) && alleThemenIds.length > 0) {
    // Kurs- und Prüfungsregister finden sich selbst (import.meta.glob) —
    // hier ist nichts mehr per Regex nachzupflegen.
    //
    // Die Stundenzahl kommt aus den Themen auf der Platte, nicht aus dem alten
    // Index. Nur ein ausdrückliches `stunden:` im Kurskopf schlägt die Rechnung.
    const gerechnet = stundenAusThemen(kursId, alleThemenIds)
    const stunden = kursKopf?.estimatedHours ?? (gerechnet > 0 ? gerechnet : meta.estimatedHours ?? 1)
    writeFileSync(
      join(COURSES_DIR, kursId, 'index.ts'),
      kursIndexAlsTypeScript({ ...meta, estimatedHours: stunden }, kursId, alleThemenIds),
    )
  }

  for (const z of zusammengefuehrt) {
    if (z.daten.questions.length === 0 && z.daten.structures.length === 0) continue
    mkdirSync(EXAMS_DIR, { recursive: true })
    writeFileSync(EXAMS_JSON(z.kursId), JSON.stringify(z.daten, null, 2) + '\n')
    const mantel = join(EXAMS_DIR, `${z.kursId}.ts`)
    if (!existsSync(mantel)) writeFileSync(mantel, pruefungsMantel(z.kursId))
  }

  console.log('')
  if (geschrieben.length) console.log(`geschrieben: ${geschrieben.length} Themen`)
  if (uebersprungen.length) {
    console.log(`übersprungen (existiert schon, --force zum Überschreiben): ${uebersprungen.join(', ')}`)
  }
  for (const z of zusammengefuehrt) {
    if (z.daten.questions.length) console.log(`geschrieben: ${basename(EXAMS_JSON(z.kursId))} mit ${z.daten.questions.length} Fragen`)
  }
  console.log(`Bericht: ${berichtPfad}`)
  console.log('')
  console.log('Jetzt prüfen: npm run build && npm run test')
}

/**
 * Läuft die Datei gerade als Kommandozeilenwerkzeug, nicht als Import?
 *
 * `leseOrdnung()` & Co. werden von `src/content/importer.test.ts` auch direkt
 * importiert — ein Import darf keinen echten Lauf auslösen. Ein einfacher
 * Vergleich mit `process.argv[1]` reicht nicht: `fileURLToPath(import.meta.url)`
 * liefert den Realpath, `process.argv[1]` bei einem Aufruf über einen Symlink
 * aber den Symlink-Pfad selbst — der Vergleich wäre dann immer falsch, und
 * `main()` liefe wortlos nie. `realpathSync()` löst auch `process.argv[1]` auf.
 */
function istDirekterAufruf() {
  if (!process.argv[1]) return false
  try {
    return fileURLToPath(import.meta.url) === realpathSync(process.argv[1])
  } catch {
    return false
  }
}

if (istDirekterAufruf()) {
  main()
}
