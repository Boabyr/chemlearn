import { describe, it, expect } from 'vitest'
import { bewerte, leseZahl } from './bewerten'
import type { ExamQuestion } from '../../data/exams'

const frage = (teil: Partial<ExamQuestion>): ExamQuestion => ({
  id: 'T1', source: 'test', examiner: 'lieberzeit', topicId: '01', points: 4,
  type: 'numeric', question: '?', correct: 0, explanation: '', ...teil,
})

describe('leseZahl', () => {
  it('liest Komma und Punkt', () => {
    expect(leseZahl('1,5')).toBe(1.5)
    expect(leseZahl('1.5')).toBe(1.5)
    expect(leseZahl(' -0,25 ')).toBe(-0.25)
    expect(leseZahl('1.5e-3')).toBe(0.0015)
  })

  it('gibt bei leerer oder unlesbarer Eingabe nichts zurück', () => {
    expect(leseZahl('')).toBeNull()
    expect(leseZahl('   ')).toBeNull()
    expect(leseZahl('etwa drei')).toBeNull()
    expect(leseZahl('1,2,3')).toBeNull()
  })
})

describe('bewerte — numerisch', () => {
  const f = frage({ type: 'numeric', correct: 0.5, tolerance: 0.01, points: 4 })

  it('wertet innerhalb der Toleranz als richtig', () => {
    expect(bewerte(f, { zahl: '0,505' })).toEqual({ gueltig: true, korrekt: true, punkte: 4 })
  })

  it('wertet außerhalb der Toleranz als falsch', () => {
    expect(bewerte(f, { zahl: '0,6' })).toEqual({ gueltig: true, korrekt: false, punkte: 0 })
  })

  it('zählt eine leere Eingabe nicht als falsche Antwort', () => {
    expect(bewerte(f, { zahl: '' }).gueltig).toBe(false)
    expect(bewerte(f, { zahl: 'keine Ahnung' }).gueltig).toBe(false)
  })

  it('nimmt zwei Prozent Toleranz, wenn keine angegeben ist', () => {
    const ohne = frage({ type: 'numeric', correct: 100 })
    expect(bewerte(ohne, { zahl: '101' }).korrekt).toBe(true)
    expect(bewerte(ohne, { zahl: '103' }).korrekt).toBe(false)
  })
})

describe('bewerte — Auswahl und Reihenfolge', () => {
  it('prüft Einfachauswahl', () => {
    const f = frage({ type: 'mc-single', correct: 2, points: 2 })
    expect(bewerte(f, { auswahl: [2] })).toEqual({ gueltig: true, korrekt: true, punkte: 2 })
    expect(bewerte(f, { auswahl: [1] }).korrekt).toBe(false)
    expect(bewerte(f, { auswahl: [] }).gueltig).toBe(false)
  })

  it('verlangt bei Mehrfachauswahl genau die richtige Menge', () => {
    const f = frage({ type: 'mc-multi', correct: [0, 2], points: 3 })
    expect(bewerte(f, { auswahl: [2, 0] }).korrekt).toBe(true)
    expect(bewerte(f, { auswahl: [0] }).korrekt).toBe(false)
    expect(bewerte(f, { auswahl: [0, 1, 2] }).korrekt).toBe(false)
    expect(bewerte(f, { auswahl: [] }).gueltig).toBe(false)
  })

  it('prüft die Reihenfolge Platz für Platz', () => {
    const f = frage({ type: 'order', correct: [2, 0, 1], points: 3 })
    expect(bewerte(f, { reihenfolge: [2, 0, 1] }).korrekt).toBe(true)
    expect(bewerte(f, { reihenfolge: [0, 1, 2] }).korrekt).toBe(false)
    expect(bewerte(f, { reihenfolge: [2, 0] }).gueltig).toBe(false)
  })
})
