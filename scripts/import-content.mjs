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

const ROOT = process.cwd()
const COURSES_DIR = join(ROOT, 'src/courses')
const EXAMS_DIR = join(ROOT, 'src/data/exams')
const REGISTRY = join(ROOT, 'src/lib/courseRegistry.ts')

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

const MATH = { log: 'Math.log10', ln: 'Math.log', exp: 'Math.exp', sqrt: 'Math.sqrt', abs: 'Math.abs' }

/**
 * `c = A / (eps * d)` in einen JavaScript-Ausdruck über `inputs` übersetzen.
 * Alles, was danach kein bekannter Bezeichner oder Rechenzeichen ist, gilt als Fehler.
 */
function uebersetzeFormel(zeile, variablen, ort) {
  const m = zeile.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+?)\s*$/)
  if (!m) { problem(ort, `Umstellung nicht lesbar: "${zeile}"`); return null }
  const [, ziel, ausdruck] = m

  if (!variablen.includes(ziel)) {
    problem(ort, `Umstellung löst nach "${ziel}" auf, das keine Variable ist`)
    return null
  }

  let js = ausdruck
  for (const [name, fn] of Object.entries(MATH)) {
    js = js.replace(new RegExp(`\\b${name}\\s*\\(`, 'g'), `${fn}(`)
  }
  // Bezeichner ersetzen, Math.* dabei in Ruhe lassen
  js = js.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (treffer, name, index, ganz) => {
    if (ganz.slice(Math.max(0, index - 5), index).endsWith('Math.')) return treffer
    if (name === 'Math') return treffer
    if (variablen.includes(name)) return `inputs.${name}`
    problem(ort, `Unbekannte Größe "${name}" in Umstellung "${zeile}"`)
    return treffer
  })

  if (!/^[\sA-Za-z0-9_.()*/+\-]+$/.test(js)) {
    problem(ort, `Umstellung enthält unerlaubte Zeichen: "${zeile}"`)
    return null
  }
  return { ziel, js }
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
      question: kv.frage ?? '', mode: kv.modus ?? 'name-to-image', targetId: kv.ziel_id ?? '',
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

function leseQuiz(block, ort) {
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
  if (fragen.length === 0) problem(ort, 'kein Quiz gefunden')
  return fragen
}

function leseFlashcards(block, ort) {
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
  if (karten.length === 0) problem(ort, 'keine Karteikarten gefunden')
  return karten
}

function baueThema(roh) {
  const { name, inhalt, ort } = roh
  sammleMarker(ort, inhalt)
  const s = abschnitte(inhalt)
  const meta = keyValues(s.META ?? '')

  if (!/^\d{2}-[a-z0-9-]+$/.test(name)) problem(ort, `Dateiname "${name}" folgt nicht dem Muster NN-slug`)
  if (!meta.titel) problem(ort, 'META ohne titel')
  if (!s.THEORIE) problem(ort, 'kein Theorieteil')

  return {
    id: name,
    title: meta.titel ?? name,
    subtitle: meta.untertitel ?? '',
    icon: meta.icon ?? '📘',
    estimatedMinutes: Number(meta.dauer_minuten ?? 60),
    theory: s.THEORIE ?? '',
    interactive: leseInteraktiv(s.INTERAKTIV, ort),
    quiz: leseQuiz(s.QUIZ, ort),
    flashcards: leseFlashcards(s.FLASHCARDS, ort),
    ort,
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
  const kopf = keyValues(teile[0] ?? '')

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
      source: kopf.quelle ?? '', professor: kopf.pruefer ?? '',
      topicId: thema, points: Number(kv.punkte ?? 1), type: typ,
      question: kv.frage ?? '', options: optionen.length ? optionen : undefined,
      correct, explanation: erklaerung.trim(),
      tolerance: kv.toleranz !== undefined ? Number(String(kv.toleranz).replace(',', '.')) : undefined,
      unit: kv.einheit,
    })
  })
  return { kurs: kopf.kurs, fragen }
}

// ── Ausgabe erzeugen ──────────────────────────────────────────────────────

function themaAlsTypeScript(t) {
  const zeilen = []
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
    zeilen.push('      solve: (inputs: Record<string, any>) => {')
    zeilen.push('        const sf = inputs.solveFor')
    for (const u of f.umstellungen) {
      zeilen.push(`        if (sf === ${str(u.ziel)}) return { ${u.ziel}: ${u.js} }`)
    }
    zeilen.push('        return {}')
    zeilen.push('      },')
    zeilen.push(`      hints: [${f.hints.map(str).join(', ')}],`)
    zeilen.push('    },')
    zeilen.push('  },')
  } else if (i?.art === 'apparatus-quiz') {
    zeilen.push('  interactive: {')
    zeilen.push('    type: "apparatus-quiz",')
    zeilen.push(`    question: ${str(i.question)},`)
    zeilen.push(`    mode: ${str(i.mode)},`)
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
    zeilen.push(`    { front: ${str(c.front)}, back: ${str(c.back)} },`)
  }
  zeilen.push('  ],')
  zeilen.push('};')
  return zeilen.join('\n') + '\n'
}

function fragenAlsTypeScript(fragen, kursId) {
  const kopf = `// Prüfungsfragen für ${kursId}
// Erzeugt von scripts/import-content.mjs — Änderungen hier gehen beim nächsten
// Import verloren. Stattdessen die Quelldateien in .source/ anpassen.

export type QuestionType = 'mc-single' | 'mc-multi' | 'numeric' | 'order'

export interface ExamQuestion {
  id: string
  source: string
  professor: string
  topicId: string
  points: number
  type: QuestionType
  question: string
  options?: string[]
  correct: number | number[] | string
  explanation: string
  tolerance?: number
  unit?: string
}

export interface ExamStructure {
  id: string
  date: string
  title: string
  totalPoints: number
  passingPoints: number
  sections: { professor: string; points: number; passingPoints: number; questionIds: string[] }[]
}

export const questions: ExamQuestion[] = [
`
  const koerper = fragen.map(q => {
    const felder = [
      `    id: ${str(q.id)}`,
      `    source: ${str(q.source)}`,
      `    professor: ${str(q.professor)}`,
      `    topicId: ${str(q.topicId)}`,
      `    points: ${q.points}`,
      `    type: ${str(q.type)}`,
      `    question: ${str(q.question)}`,
    ]
    if (q.options) felder.push(`    options: [${q.options.map(str).join(', ')}]`)
    felder.push(`    correct: ${Array.isArray(q.correct) ? `[${q.correct.join(', ')}]` : JSON.stringify(q.correct)}`)
    felder.push(`    explanation: ${str(q.explanation)}`)
    if (q.tolerance !== undefined && Number.isFinite(q.tolerance)) felder.push(`    tolerance: ${q.tolerance}`)
    if (q.unit) felder.push(`    unit: ${str(q.unit)}`)
    return '  {\n' + felder.join(',\n') + ',\n  },'
  }).join('\n')

  // Je Prüfung ein Aufbau, Abschnitte nach Prüfer
  const nachQuelle = new Map()
  for (const q of fragen) {
    if (!nachQuelle.has(q.source)) nachQuelle.set(q.source, [])
    nachQuelle.get(q.source).push(q)
  }
  const aufbauten = [...nachQuelle.entries()].map(([quelle, qs]) => {
    const nachProf = new Map()
    for (const q of qs) {
      if (!nachProf.has(q.professor)) nachProf.set(q.professor, [])
      nachProf.get(q.professor).push(q)
    }
    const sections = [...nachProf.entries()].map(([prof, pqs]) => {
      const punkte = pqs.reduce((s, q) => s + q.points, 0)
      return `      { professor: ${str(prof)}, points: ${punkte}, passingPoints: ${Math.ceil(punkte / 2)}, questionIds: [${pqs.map(q => str(q.id)).join(', ')}] },`
    }).join('\n')
    const gesamt = qs.reduce((s, q) => s + q.points, 0)
    return `  {
    id: ${str('exam-' + quelle)},
    date: ${str(quelle)},
    title: ${str('Prüfung ' + quelle)},
    totalPoints: ${gesamt},
    passingPoints: ${Math.ceil(gesamt / 2)},
    sections: [
${sections}
    ],
  },`
  }).join('\n')

  return kopf + koerper + '\n]\n\nexport const structures: ExamStructure[] = [\n' + aufbauten + '\n]\n'
}

function kursIndexAlsTypeScript(vorhanden, kursId, themenIds) {
  const meta = vorhanden ?? {
    id: kursId, title: kursId, subtitle: '', icon: '📘', color: '#3b82f6',
    level: 'Uni', description: '', estimatedHours: themenIds.length * 2,
  }
  return `export const course = {
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
};
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
  }
}

function aktualisiereRegistry(kursId, themenIds) {
  let s = readFileSync(REGISTRY, 'utf8')
  const breite = Math.max(...themenIds.map(t => t.length)) + 3
  const eintraege = themenIds
    .map(t => `    ${(str(t) + ':').padEnd(breite + 2)} () => import("../courses/${kursId}/topics/${t}"),`)
    .join('\n')
  const block = `  ${str(kursId)}: {\n${eintraege}\n  },`

  const vorhanden = new RegExp(`^  "${kursId}":\\s*\\{[\\s\\S]*?^  \\},$`, 'm')
  if (vorhanden.test(s)) {
    s = s.replace(vorhanden, block)
  } else {
    s = s.replace(
      /(const courseTopicLoaders[^{]*\{\n)/,
      `$1${block}\n`,
    )
    if (!s.includes(`courses/${kursId}/index`)) {
      const varName = kursId.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
      s = `import { course as ${varName} } from "../courses/${kursId}/index"\n` + s
      s = s.replace(/export const allCourses = \[([^\]]*)\]/, (_, inhalt) =>
        `export const allCourses = [${inhalt.trim().replace(/,$/, '')}, ${varName}]`)
    }
  }
  return s
}

function aktualisiereExamIndex(kursId) {
  const p = join(EXAMS_DIR, 'index.ts')
  let s = readFileSync(p, 'utf8')
  const modul = kursId === 'analytical-chemistry-1' ? 'ac1' : kursId
  if (s.includes(`'${kursId}':`)) return s
  s = s.replace(/^import \* as ac1 from '\.\/ac1'$/m, m => `${m}\nimport * as ${modul} from './${modul}'`)
  s = s.replace(/(\{ questions: ac1\.questions, structures: ac1\.structures \},\n)/,
    `$1  '${kursId}': { questions: ${modul}.questions, structures: ${modul}.structures },\n`)
  return s
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
  const kursId = basename(quellDir.replace(/\/$/, '')) === 'ac1'
    ? 'analytical-chemistry-1'
    : basename(quellDir.replace(/\/$/, ''))

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

  const themen = roheThemen.map(baueThema).sort((a, b) => a.id.localeCompare(b.id))
  const themenIds = themen.map(t => t.id)

  // Fragen dürfen sich auch auf schon vorhandene Themen beziehen
  const meta = leseKursMeta(kursId)
  const bestehendeThemen = existsSync(join(COURSES_DIR, kursId, 'topics'))
    ? readdirSync(join(COURSES_DIR, kursId, 'topics')).filter(f => f.endsWith('.ts')).map(f => f.replace(/\.ts$/, ''))
    : []
  const alleThemenIds = [...new Set([...bestehendeThemen, ...themenIds])].sort()

  const alleFragen = []
  for (const roh of rohePruefungen) {
    const { fragen } = baueFragen(roh, alleThemenIds)
    alleFragen.push(...fragen)
  }

  const doppelt = alleFragen.map(f => f.id).filter((id, i, a) => a.indexOf(id) !== i)
  if (doppelt.length) problem('Prüfungsfragen', `doppelte IDs: ${[...new Set(doppelt)].join(', ')}`)

  console.log(`${themen.length} Themen geparst`)
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

  if (dryRun) {
    console.log('')
    console.log(`Probelauf in Ordnung, nichts geschrieben. Bericht: ${berichtPfad}`)
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

  if (themen.length > 0) {
    writeFileSync(join(COURSES_DIR, kursId, 'index.ts'), kursIndexAlsTypeScript(meta, kursId, alleThemenIds))
    writeFileSync(REGISTRY, aktualisiereRegistry(kursId, alleThemenIds))
  }

  if (alleFragen.length > 0) {
    const modul = kursId === 'analytical-chemistry-1' ? 'ac1' : kursId
    mkdirSync(EXAMS_DIR, { recursive: true })
    writeFileSync(join(EXAMS_DIR, `${modul}.ts`), fragenAlsTypeScript(alleFragen, kursId))
    writeFileSync(join(EXAMS_DIR, 'index.ts'), aktualisiereExamIndex(kursId))
  }

  console.log('')
  if (geschrieben.length) console.log(`geschrieben: ${geschrieben.length} Themen`)
  if (uebersprungen.length) {
    console.log(`übersprungen (existiert schon, --force zum Überschreiben): ${uebersprungen.join(', ')}`)
  }
  if (alleFragen.length) console.log(`geschrieben: src/data/exams/ mit ${alleFragen.length} Fragen`)
  console.log(`Bericht: ${berichtPfad}`)
  console.log('')
  console.log('Jetzt prüfen: npm run build && npm run test')
}

main()
