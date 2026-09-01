import { describe, it, expect } from 'vitest'
import { lokalesDatum, istGestern, tageDazwischen } from './datum'

describe('lokalesDatum', () => {
  it('nimmt den Tag der Zeitzone, nicht den UTC-Tag', () => {
    // 23:30 Ortszeit Wien am 14.02. ist in UTC schon der 14.02. 22:30 — noch derselbe Tag.
    expect(lokalesDatum(new Date('2026-02-14T22:30:00Z'), 'Europe/Vienna')).toBe('2026-02-14')
    // 00:30 Ortszeit Wien am 15.02. ist in UTC noch der 14.02. — hier lag der Fehler.
    expect(lokalesDatum(new Date('2026-02-14T23:30:00Z'), 'Europe/Vienna')).toBe('2026-02-15')
  })

  it('rechnet über die Sommerzeitumstellung hinweg richtig', () => {
    // Umstellung Wien: 29.03.2026, 02:00 -> 03:00
    expect(lokalesDatum(new Date('2026-03-29T00:30:00Z'), 'Europe/Vienna')).toBe('2026-03-29')
    expect(lokalesDatum(new Date('2026-03-29T22:30:00Z'), 'Europe/Vienna')).toBe('2026-03-30')
  })
})

describe('tageDazwischen', () => {
  it('zählt Kalendertage, nicht 24-Stunden-Blöcke', () => {
    expect(tageDazwischen('2026-02-14', '2026-02-15')).toBe(1)
    expect(tageDazwischen('2026-02-14', '2026-02-14')).toBe(0)
    expect(tageDazwischen('2026-02-14', '2026-02-20')).toBe(6)
  })

  it('zählt über Monats- und Sommerzeitgrenzen', () => {
    expect(tageDazwischen('2026-02-28', '2026-03-01')).toBe(1)
    expect(tageDazwischen('2026-03-28', '2026-03-30')).toBe(2)
  })
})

describe('istGestern', () => {
  it('erkennt den Vortag', () => {
    expect(istGestern('2026-02-14', '2026-02-15')).toBe(true)
    expect(istGestern('2026-02-13', '2026-02-15')).toBe(false)
    expect(istGestern('2026-02-15', '2026-02-15')).toBe(false)
  })
})
