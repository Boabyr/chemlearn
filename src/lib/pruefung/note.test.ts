import { describe, it, expect } from 'vitest'
import { noteFuer } from './note'

const PHYSIK = [
  { ab: 29, note: 'sehr gut' }, { ab: 25, note: 'gut' },
  { ab: 21, note: 'befriedigend' }, { ab: 17, note: 'genügend' },
]

describe('noteFuer', () => {
  it('rundet auf die nächsthöhere ganze Zahl auf', () => {
    // 20,1 Punkte werden 21 — und damit befriedigend statt genügend.
    const stand = noteFuer(20.1, PHYSIK)
    expect(stand.punkte).toBe(21)
    expect(stand.note).toBe('befriedigend')
  })

  it('trifft jede Grenze der Ordnung', () => {
    expect(noteFuer(32, PHYSIK).note).toBe('sehr gut')
    expect(noteFuer(29, PHYSIK).note).toBe('sehr gut')
    expect(noteFuer(28, PHYSIK).note).toBe('gut')
    expect(noteFuer(25, PHYSIK).note).toBe('gut')
    expect(noteFuer(24, PHYSIK).note).toBe('befriedigend')
    expect(noteFuer(21, PHYSIK).note).toBe('befriedigend')
    expect(noteFuer(20, PHYSIK).note).toBe('genügend')
    expect(noteFuer(17, PHYSIK).note).toBe('genügend')
    expect(noteFuer(16, PHYSIK).note).toBe('nicht genügend')
    expect(noteFuer(0, PHYSIK).note).toBe('nicht genügend')
  })

  it('meldet Bestehen ab der untersten Grenze', () => {
    expect(noteFuer(17, PHYSIK).bestanden).toBe(true)
    expect(noteFuer(16.4, PHYSIK).bestanden).toBe(true) // rundet auf 17
    expect(noteFuer(15.2, PHYSIK).bestanden).toBe(false)
  })

  it('nennt ohne Notengrenzen nur die Punkte', () => {
    expect(noteFuer(12.3, [])).toEqual({ punkte: 13, note: '', bestanden: true })
  })
})
