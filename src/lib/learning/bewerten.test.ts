import { describe, it, expect } from 'vitest'
import { bewerte, leseZahl } from './bewerten'
import type { ExamQuestion } from '../../data/exams'

const frage = (teil: Partial<ExamQuestion>): ExamQuestion => ({
  id: 'T1', source: 'test', gruppe: 'lieberzeit', topicId: '01', points: 4,
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

  it('gibt bei Mehrfachauswahl Teilpunkte', () => {
    const f = frage({ type: 'mc-multi', correct: [0, 2], points: 4 })
    expect(bewerte(f, { auswahl: [0, 2] }).punkte).toBe(4)
    // eine von zwei getroffen, nichts falsch angekreuzt
    expect(bewerte(f, { auswahl: [0] }).punkte).toBe(2)
    // eine getroffen, eine daneben — hebt sich auf
    expect(bewerte(f, { auswahl: [0, 1] }).punkte).toBe(0)
    // zwei getroffen, eine daneben
    expect(bewerte(f, { auswahl: [0, 1, 2] }).punkte).toBe(2)
    expect(bewerte(f, { auswahl: [1, 3] }).punkte).toBe(0)
  })

  it('gibt bei der Reihenfolge Punkte je richtiger Position', () => {
    const f = frage({ type: 'order', correct: [2, 0, 1, 3], points: 4 })
    expect(bewerte(f, { reihenfolge: [2, 0, 1, 3] }).punkte).toBe(4)
    expect(bewerte(f, { reihenfolge: [2, 0, 3, 1] }).punkte).toBe(2)
    expect(bewerte(f, { reihenfolge: [3, 1, 0, 2] }).punkte).toBe(0)
    expect(bewerte(f, { reihenfolge: [2, 0, 3, 1] }).korrekt).toBe(false)
  })

  it('prüft die Reihenfolge Platz für Platz', () => {
    const f = frage({ type: 'order', correct: [2, 0, 1], points: 3 })
    expect(bewerte(f, { reihenfolge: [2, 0, 1] }).korrekt).toBe(true)
    expect(bewerte(f, { reihenfolge: [0, 1, 2] }).korrekt).toBe(false)
    expect(bewerte(f, { reihenfolge: [2, 0] }).gueltig).toBe(false)
  })
})

describe('Punkteregel streng', () => {
  const frage = {
    id: 'f1', source: 'Skript', gruppe: 'optik', topicId: 't1', points: 1.6,
    type: 'mc-multi' as const, question: 'F',
    options: ['a', 'b', 'c', 'd'], correct: [0, 1, 2], explanation: '',
  }

  it('gibt volle Punkte für alle richtigen ohne falsches Kreuz', () => {
    expect(bewerte(frage, { auswahl: [0, 1, 2] }, 'streng').punkte).toBe(1.6)
  })

  it('gibt anteilige Punkte, wenn ein richtiges Kreuz fehlt', () => {
    expect(bewerte(frage, { auswahl: [0, 1] }, 'streng').punkte).toBeCloseTo(1.07, 2)
  })

  it('gibt null Punkte, sobald ein falsches Kreuz dabeisteht', () => {
    expect(bewerte(frage, { auswahl: [0, 1, 3] }, 'streng').punkte).toBe(0)
    expect(bewerte(frage, { auswahl: [0, 1, 2, 3] }, 'streng').punkte).toBe(0)
  })

  it('lässt teilpunkte unverändert', () => {
    // Zwei Treffer, ein Fehlgriff: (2 − 1) / 3 der Punkte, wie bisher.
    expect(bewerte(frage, { auswahl: [0, 1, 3] }, 'teilpunkte').punkte).toBeCloseTo(0.53, 2)
    expect(bewerte(frage, { auswahl: [0, 1, 3] }).punkte).toBeCloseTo(0.53, 2)
  })
})
