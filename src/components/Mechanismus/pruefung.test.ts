import { describe, it, expect } from 'vitest'
import { pruefePfeile, befundText } from './pruefung'
import type { Pfeil } from './strukturTypen'

const p = (vonArt: 'bindung' | 'atom' | 'freiesPaar', vonId: string,
  nachArt: 'bindung' | 'atom', nachId: string): Pfeil =>
  ({ von: { art: vonArt, id: vonId }, nach: { art: nachArt, id: nachId } })

const erwartet = [p('bindung', 'b1', 'atom', 'a3'), p('freiesPaar', 'n1', 'atom', 'c2')]

describe('pruefePfeile', () => {
  it('erkennt eine vollständig richtige Lösung', () => {
    const befund = pruefePfeile([...erwartet], erwartet)
    expect(befund.urteile).toEqual(['richtig', 'richtig'])
    expect(befund.fehlend).toEqual([])
    expect(befund.vollstaendig).toBe(true)
  })

  it('lässt die Reihenfolge offen', () => {
    const befund = pruefePfeile([erwartet[1], erwartet[0]], erwartet)
    expect(befund.vollstaendig).toBe(true)
  })

  it('meldet einen fehlenden Pfeil, ohne den richtigen abzuwerten', () => {
    const befund = pruefePfeile([erwartet[0]], erwartet)
    expect(befund.urteile).toEqual(['richtig'])
    expect(befund.fehlend).toHaveLength(1)
    expect(befund.vollstaendig).toBe(false)
  })

  it('unterscheidet verfehltes Ziel von unsinnigem Pfeil', () => {
    const befund = pruefePfeile([
      p('bindung', 'b1', 'atom', 'falsch'),
      p('atom', 'x9', 'atom', 'y9'),
    ], erwartet)
    expect(befund.urteile).toEqual(['zielVerfehlt', 'unerwartet'])
  })

  it('wertet einen Pfeil zu viel als unerwartet', () => {
    const befund = pruefePfeile([...erwartet, p('atom', 'z', 'atom', 'q')], erwartet)
    expect(befund.urteile).toEqual(['richtig', 'richtig', 'unerwartet'])
    expect(befund.vollstaendig).toBe(false)
  })

  it('verbraucht einen erwarteten Pfeil nur einmal', () => {
    const befund = pruefePfeile([erwartet[0], erwartet[0]], erwartet)
    expect(befund.urteile[0]).toBe('richtig')
    expect(befund.urteile[1]).not.toBe('richtig')
  })

  it('ist ohne gesetzte Pfeile nicht vollständig', () => {
    const befund = pruefePfeile([], erwartet)
    expect(befund.fehlend).toHaveLength(2)
    expect(befund.vollstaendig).toBe(false)
  })
})

describe('befundText', () => {
  it('lobt die vollständige Lösung knapp', () => {
    expect(befundText(pruefePfeile([...erwartet], erwartet))).toBe('Alle Pfeile sitzen.')
  })

  it('sagt, was fehlt', () => {
    expect(befundText(pruefePfeile([erwartet[0]], erwartet))).toMatch(/fehlt/)
  })

  it('sagt, wenn der Ausgangspunkt stimmte', () => {
    const text = befundText(pruefePfeile([p('bindung', 'b1', 'atom', 'falsch')], erwartet))
    expect(text).toMatch(/beginnt richtig/)
  })
})
