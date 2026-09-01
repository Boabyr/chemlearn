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

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'

import { kartenId } from './lib/kartenId.mjs'
import { pruefeAusdruck } from '../src/lib/formel/ausdruck.mjs'
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

/** Text in Themen- und Prüfungsabschnitte trennen. */
function teileAuf(text, datei) {
  const themen = []
  const pruefungen = []

  const teile = text.split(/^===\s*(DATEI:\s*[^=]+?|PRÜFUNG|PRUEFUNG)\s*===\s*$/m)
  // teile[0] ist Vorspann, danach abwechselnd Kopf und Inhalt
  for (let i = 1; i < teile.length; i += 2) {
    const kopf = teile[i].trim()
    const inhalt = teile[i + 1] ?? ''
    if (/^DATEI:/i.test(kopf)) {
      const name = kopf.replace(/^DATEI:\s*/i, '').replace(/\.md$/i, '').trim()
      themen.push({ name, inhalt, ort: `${datei} → ${name}` })
    } else {
      pruefungen.push({ inhalt, ort: `${datei} → Prüfung` })
    }
  }
  return { themen, pruefungen }
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
  let interactive = vorhanden.interactive?.art ? vorhanden.interactive : alsParserForm(vorhanden.interactive)
  const ersetzt = !!(interactive && zusatz.interactive && zusatz.interaktivErsetzen)
  if (zusatz.interactive) {
    if (!interactive || zusatz.interaktivErsetzen) interactive = zusatz.interactive
    else warnung(ort, `${vorhanden.id} hat schon einen Interaktivteil — "interaktiv: ersetzen" setzen, um ihn abzulösen`)
  }

  return {
    thema: {
      ...vorhanden,
      interactive,
      quiz: [...vorhanden.quiz, ...neueFragen],
      flashcards: [...bleiben, ...neueKarten],
    },
    bilanz: {
      fragen: neueFragen.length,
      karten: neueKarten.length,
      interaktiv: !vorhanden.interactive && !!zusatz.interactive,
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
    const zeilen = b.split('\n')
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
      const idx = String(kv.richtig ?? '').split(',').map(s => parseInt(s.trim(), 10) - 1)
      if (idx.some(n => !Number.isInteger(n) || n < 0 || n >= optionen.length)) {
        problem(ort, `${nr}: richtig "${kv.richtig}" liegt außerhalb von 1–${optionen.length}`)
      }
      if (typ === 'mc-single') {
        if (idx.length !== 1) problem(ort, `${nr}: mc-single braucht genau eine richtige Antwort`)
        correct = idx[0]
      } else correct = idx
      if (optionen.length < 2) problem(ort, `${nr}: braucht Antwortoptionen`)
    }

    fragen.push({
      id: kv.id || `${(kopf.pruefer ?? 'X')[0].toUpperCase()}${String(i + 1).padStart(3, '0')}`,
      source: kopf.quelle ?? '', examiner: kopf.pruefer ?? '',
      topicId: thema, points: Number(kv.punkte ?? 1), type: typ,
      question: kv.frage ?? '', options: optionen.length ? optionen : undefined,
      correct, explanation: erklaerung.trim(),
      tolerance: kv.toleranz !== undefined ? Number(String(kv.toleranz).replace(',', '.')) : undefined,
      unit: kv.einheit,
    })
  })
  return { kurs: kopf.kurs, fragen, aufbau: leseAufbau(aufbauBlock.trim(), ort) }
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
  zeilen.push(`  theory: ${tpl('\n' + t.theory + '\n')},`)

  const i = t.interactive
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
      examiner: pruefer,
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

function kursIndexAlsTypeScript(vorhanden, kursId, themenIds) {
  const meta = vorhanden ?? {
    id: kursId, title: kursId, subtitle: '', icon: '📘', color: '#3b82f6',
    level: 'Uni', description: '', estimatedHours: themenIds.length * 2,
  }
  const pruefer = (meta.examiners ?? []).length
    ? '  examiners: [\n' + meta.examiners.map(p =>
        `    { id: ${str(p.id)}, label: ${str(p.label)}${p.icon ? `, icon: ${str(p.icon)}` : ''} },`).join('\n') + '\n  ],\n'
    : '  examiners: [],\n'

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
${pruefer}} satisfies Kurs;
`
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
  return {
    id: kursId, title: feld('title', kursId), subtitle: feld('subtitle', ''),
    icon: feld('icon', '📘'), color: feld('color', '#3b82f6'), level: feld('level', 'Uni'),
    description: feld('description', ''), estimatedHours: zahl('estimatedHours', 20),
    examiners: lesePruefer(s),
  }
}

/** Prüferliste aus einem bestehenden Kursindex übernehmen. */
function lesePruefer(quelltext) {
  const block = quelltext.split(/examiners:\s*\[/)[1]
  if (!block) return []
  const bis = block.indexOf(']')
  return [...block.slice(0, bis).matchAll(/\{([^}]*)\}/g)].map(m => {
    const felder = inlineFields(m[1].trim())
    return { id: felder.id, label: felder.label ?? felder.id, icon: felder.icon }
  }).filter(p => p.id)
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
  for (const { datei, text } of quellen) {
    const { themen, pruefungen } = teileAuf(text, datei)
    roheThemen.push(...themen)
    rohePruefungen.push(...pruefungen)
  }

  const alleRohThemen = roheThemen.map(baueThema).sort((a, b) => a.id.localeCompare(b.id))
  const themen = alleRohThemen.filter(t => !t.ergaenzen)
  const ergaenzungen = alleRohThemen.filter(t => t.ergaenzen)
  const themenIds = alleRohThemen.map(t => t.id)

  // Fragen dürfen sich auch auf schon vorhandene Themen beziehen
  const meta = leseKursMeta(kursId)
  const bestehendeThemen = existsSync(join(COURSES_DIR, kursId, 'topics'))
    ? readdirSync(join(COURSES_DIR, kursId, 'topics')).filter(f => f.endsWith('.ts')).map(f => f.replace(/\.ts$/, ''))
    : []
  const alleThemenIds = [...new Set([...bestehendeThemen, ...themenIds])].sort()

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

  if (themen.length > 0) {
    // Kurs- und Prüfungsregister finden sich selbst (import.meta.glob) —
    // hier ist nichts mehr per Regex nachzupflegen.
    writeFileSync(join(COURSES_DIR, kursId, 'index.ts'), kursIndexAlsTypeScript(meta, kursId, alleThemenIds))
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

main()
