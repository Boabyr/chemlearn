import { describe, it, expect } from 'vitest'
import { naechsterStreak, type StreakZustand } from './streak'

const zustand = (current: number, longest: number, last: string): StreakZustand =>
  ({ currentStreak: current, longestStreak: longest, lastActiveDate: last })

describe('naechsterStreak', () => {
  it('startet bei eins, wenn es noch keinen Zustand gibt', () => {
    expect(naechsterStreak(null, '2026-02-15')).toEqual(zustand(1, 1, '2026-02-15'))
  })

  it('zählt am Folgetag weiter', () => {
    expect(naechsterStreak(zustand(4, 9, '2026-02-14'), '2026-02-15')).toEqual(zustand(5, 9, '2026-02-15'))
  })

  it('hebt den Bestwert an, wenn die Serie ihn überholt', () => {
    expect(naechsterStreak(zustand(9, 9, '2026-02-14'), '2026-02-15')).toEqual(zustand(10, 10, '2026-02-15'))
  })

  it('fängt nach einer längeren Lücke wieder bei eins an', () => {
    expect(naechsterStreak(zustand(7, 12, '2026-02-10'), '2026-02-15')).toEqual(zustand(1, 12, '2026-02-15'))
  })

  it('übersteht einen einzelnen verpassten Tag', () => {
    expect(naechsterStreak(zustand(7, 12, '2026-02-13'), '2026-02-15')).toEqual(zustand(8, 12, '2026-02-15'))
  })

  it('bricht nach zwei verpassten Tagen ab', () => {
    expect(naechsterStreak(zustand(7, 12, '2026-02-12'), '2026-02-15')).toEqual(zustand(1, 12, '2026-02-15'))
  })

  it('ändert nichts, wenn heute schon gezählt wurde', () => {
    const heute = zustand(5, 9, '2026-02-15')
    expect(naechsterStreak(heute, '2026-02-15')).toBeNull()
  })

  it('ändert nichts bei einem Datum aus der Vergangenheit', () => {
    expect(naechsterStreak(zustand(5, 9, '2026-02-15'), '2026-02-14')).toBeNull()
  })
})
