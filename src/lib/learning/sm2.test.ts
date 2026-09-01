import { describe, it, expect } from 'vitest'
import { schedule, initialState, istLeech, DEFAULT_EASE, MIN_EASE, RELERN_MINUTEN, LEECH_GRENZE } from './sm2'

/** Ohne Streuung rechnet es sich in Tests leichter. */
const ohneStreuung = { zufall: () => 0.5 }

const now = new Date('2026-03-01T10:00:00Z')

/** Tage zwischen Fälligkeit und Bezugszeitpunkt. */
function tageBisFaellig(dueAt: string, from = now) {
  return Math.round((new Date(dueAt).getTime() - from.getTime()) / 86_400_000)
}

describe('SM-2 Terminplanung', () => {
  it('setzt beim ersten „Gut" ein Intervall von einem Tag', () => {
    const s = schedule(initialState(), 2, now)
    expect(s.reps).toBe(1)
    expect(s.intervalDays).toBe(1)
    expect(s.ease).toBe(DEFAULT_EASE)
    expect(tageBisFaellig(s.dueAt)).toBe(1)
  })

  it('geht bei der zweiten richtigen Antwort auf sechs Tage', () => {
    let s = schedule(initialState(), 2, now)
    s = schedule(s, 2, now)
    expect(s.reps).toBe(2)
    expect(s.intervalDays).toBe(6)
  })

  it('multipliziert ab der dritten Wiederholung mit dem Ease-Faktor', () => {
    let s = initialState()
    for (let i = 0; i < 3; i++) s = schedule(s, 2, now, ohneStreuung)
    // 6 Tage × 2.5 = 15
    expect(s.intervalDays).toBe(15)
  })

  it('hebt den Ease-Faktor bei „Leicht" und senkt ihn bei „Schwer"', () => {
    const leicht = schedule(initialState(), 3, now)
    const schwer = schedule(initialState(), 1, now)
    expect(leicht.ease).toBeGreaterThan(DEFAULT_EASE)
    expect(schwer.ease).toBeLessThan(DEFAULT_EASE)
  })

  it('holt „Nochmal" in dieselbe Sitzung zurück und zählt einen Rückfall', () => {
    let s = initialState()
    for (let i = 0; i < 3; i++) s = schedule(s, 2, now, ohneStreuung)
    expect(s.intervalDays).toBe(15)

    s = schedule(s, 0, now)
    expect(s.reps).toBe(0)
    expect(s.intervalDays).toBe(0)
    expect(s.lapses).toBe(1)
    const minuten = (new Date(s.dueAt).getTime() - now.getTime()) / 60_000
    expect(minuten).toBe(RELERN_MINUTEN)
  })

  it('streut lange Intervalle, ohne sie zu verdrehen', () => {
    let basis = initialState()
    for (let i = 0; i < 3; i++) basis = schedule(basis, 2, now, ohneStreuung)

    const kurz = schedule(basis, 2, now, { zufall: () => 0 })
    const lang = schedule(basis, 2, now, { zufall: () => 1 })
    const mitte = schedule(basis, 2, now, ohneStreuung)

    expect(kurz.intervalDays).toBeLessThan(mitte.intervalDays)
    expect(lang.intervalDays).toBeGreaterThan(mitte.intervalDays)
    expect(kurz.intervalDays).toBeGreaterThan(mitte.intervalDays * 0.9)
    expect(lang.intervalDays).toBeLessThan(mitte.intervalDays * 1.1)
  })

  it('lässt kurze Intervalle in Ruhe', () => {
    const erst = schedule(initialState(), 2, now, { zufall: () => 0 })
    expect(erst.intervalDays).toBe(1)
    const zweit = schedule(erst, 2, now, { zufall: () => 1 })
    expect(zweit.intervalDays).toBe(6)
  })

  it('erkennt hartnäckige Elemente an der Zahl der Rückfälle', () => {
    expect(istLeech({ lapses: LEECH_GRENZE - 1 })).toBe(false)
    expect(istLeech({ lapses: LEECH_GRENZE })).toBe(true)
  })

  it('lässt den Ease-Faktor nie unter die Untergrenze fallen', () => {
    let s = initialState()
    for (let i = 0; i < 20; i++) s = schedule(s, 1, now)
    expect(s.ease).toBe(MIN_EASE)
  })

  it('merkt sich den Zeitpunkt der Wiederholung', () => {
    const s = schedule(initialState(), 2, now)
    expect(s.lastReviewedAt).toBe(now.toISOString())
  })

  it('verändert den übergebenen Zustand nicht', () => {
    const vorher = initialState()
    const kopie = { ...vorher }
    schedule(vorher, 0, now)
    expect(vorher).toEqual(kopie)
  })
})
