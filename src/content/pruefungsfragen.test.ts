import { describe, it, expect } from 'vitest'
import { allCourses, loadAllTopics } from '../lib/courseRegistry'
import { examQuestionsFor } from '../data/exams'

/**
 * Sechs numerische Prüfungsfragen trugen eine falsche Antwort — bei dreien
 * rechnete die Erklärung selbst das Richtige aus und widersprach dem
 * gespeicherten Wert, mitsamt stehengebliebenen Selbstgesprächen ("Warte:",
 * "Korrekte Antwort: ~35,5mV"). Eine falsche Musterlösung ist schlimmer als
 * eine fehlende: sie sagt dem Lernenden, seine richtige Rechnung sei falsch.
 */

const kursIds = allCourses.map(k => [k.id] as const)

describe('Erklärungen der Prüfungsfragen', () => {
  // Reste lauten Denkens, die es nie in eine Musterlösung schaffen dürfen.
  const SELBSTGESPRAECH = /\b(warte|hmm|nochmal|korrekte antwort|ich denke|vermutlich|müsste wohl)\b/i

  it.each(kursIds)('%s: keine Reste lauten Denkens', (kursId) => {
    const treffer = examQuestionsFor(kursId)
      .filter(f => SELBSTGESPRAECH.test(f.explanation))
      .map(f => `${f.id}: "${f.explanation.slice(0, 60)}…"`)
    expect(treffer).toEqual([])
  })

  it.each(kursIds)('%s: die Antwort kommt in der eigenen Erklärung vor', (kursId) => {
    const widerspruch: string[] = []

    for (const frage of examQuestionsFor(kursId)) {
      if (frage.type !== 'numeric') continue
      const wert = Number(frage.correct)
      if (!Number.isFinite(wert)) continue

      // Zahlen aus der Erklärung, deutsche wie englische Schreibweise.
      const zahlen = [...frage.explanation.matchAll(/-?\d+(?:[.,]\d+)?/g)]
        .map(m => Number(m[0].replace(',', '.')))
      const toleranz = Math.max(frage.tolerance ?? 0, Math.abs(wert) * 0.02)

      if (!zahlen.some(z => Math.abs(z - wert) <= toleranz)) {
        widerspruch.push(`${frage.id}: Antwort ${wert} steht nicht in der Erklärung`)
      }
    }

    expect(widerspruch).toEqual([])
  })

  it.each(kursIds)('%s: auch die Quizerklärungen bleiben sachlich', async (kursId) => {
    // 04-ftir-raman:q5 rechnete 3N−6 = 6 aus, markiert war "7", und die
    // Erklärung stellte den Widerspruch selbst fest, ohne ihn aufzulösen.
    const treffer = (await loadAllTopics(kursId))
      .flatMap(t => t.quiz.map(f => ({ thema: t.id, ...f })))
      .filter(f => SELBSTGESPRAECH.test(f.explanation))
      .map(f => `${f.thema}:${f.id}`)
    expect(treffer).toEqual([])
  })

  it.each(kursIds)('%s: bei reinen Zahlenfragen steht die Antwort in der Erklärung', async (kursId) => {
    const istZahl = (text: string) => /^-?\d+(?:[.,]\d+)?(\s*(%|[a-zA-Zµ°]+(\/[a-zA-Z]+)?))?$/.test(text.trim())
    const widerspruch: string[] = []

    for (const thema of await loadAllTopics(kursId)) {
      for (const frage of thema.quiz) {
        if (!frage.options.every(istZahl)) continue
        const zahl = frage.options[frage.correct].match(/-?\d+(?:[.,]\d+)?/)?.[0]
        if (zahl && !frage.explanation.includes(zahl)) {
          widerspruch.push(`${thema.id}:${frage.id} — "${frage.options[frage.correct]}" fehlt in der Erklärung`)
        }
      }
    }

    expect(widerspruch).toEqual([])
  })

  it.each(kursIds)('%s: jede Frage hat eine erreichbare Antwort', (kursId) => {
    // L006 war als Einfachauswahl angelegt, trug aber zwei richtige Antworten.
    // Das Bauteil vergleicht dort eine Zahl mit einer Liste — die Frage war
    // nicht lösbar, egal was man ankreuzte.
    const kaputt: string[] = []

    for (const frage of examQuestionsFor(kursId)) {
      const anzahl = frage.options?.length ?? 0

      if (frage.type === 'mc-single') {
        if (Array.isArray(frage.correct)) kaputt.push(`${frage.id}: Einfachauswahl mit mehreren Antworten`)
        else if (typeof frage.correct !== 'number' || frage.correct < 0 || frage.correct >= anzahl) {
          kaputt.push(`${frage.id}: Antwortindex ${frage.correct} liegt außerhalb von 0…${anzahl - 1}`)
        }
      }

      if (frage.type === 'mc-multi') {
        if (!Array.isArray(frage.correct)) kaputt.push(`${frage.id}: Mehrfachauswahl ohne Antwortliste`)
        else {
          if (frage.correct.some(i => i < 0 || i >= anzahl)) kaputt.push(`${frage.id}: Antwortindex außerhalb`)
          if (frage.correct.length === 0) kaputt.push(`${frage.id}: keine Antwort markiert`)
          if (frage.correct.length === anzahl) kaputt.push(`${frage.id}: alle Optionen als richtig markiert`)
        }
      }

      if (frage.type === 'order') {
        const soll = [...Array(anzahl).keys()].join(',')
        const ist = Array.isArray(frage.correct) ? [...frage.correct].sort((a, b) => a - b).join(',') : ''
        if (ist !== soll) kaputt.push(`${frage.id}: Reihenfolge ist keine vollständige Permutation`)
      }

      if (frage.type !== 'numeric' && anzahl < 2) kaputt.push(`${frage.id}: weniger als zwei Optionen`)
    }

    expect(kaputt).toEqual([])
  })

  it.each(kursIds)('%s: numerische Fragen haben eine Toleranz und eine Einheit', (kursId) => {
    const unvollstaendig = examQuestionsFor(kursId)
      .filter(f => f.type === 'numeric' && (f.tolerance === undefined || !f.unit))
      .map(f => f.id)
    expect(unvollstaendig).toEqual([])
  })
})
