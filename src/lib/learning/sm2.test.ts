import { describe, it, expect } from 'vitest'
import { schedule, initialState, DEFAULT_EASE, MIN_EASE } from './sm2'

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
    for (let i = 0; i < 3; i++) s = schedule(s, 2, now)
    // 6 Tage × 2.5 = 15
    expect(s.intervalDays).toBe(15)
  })

  it('hebt den Ease-Faktor bei „Leicht" und senkt ihn bei „Schwer"', () => {
    const leicht = schedule(initialState(), 3, now)
    const schwer = schedule(initialState(), 1, now)
    expect(leicht.ease).toBeGreaterThan(DEFAULT_EASE)
    expect(schwer.ease).toBeLessThan(DEFAULT_EASE)
  })

  it('setzt bei „Nochmal" zurück und zählt einen Rückfall', () => {
    let s = initialState()
    for (let i = 0; i < 3; i++) s = schedule(s, 2, now)
    expect(s.intervalDays).toBe(15)

    s = schedule(s, 0, now)
    expect(s.reps).toBe(0)
    expect(s.intervalDays).toBe(1)
    expect(s.lapses).toBe(1)
    expect(tageBisFaellig(s.dueAt)).toBe(1)
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
