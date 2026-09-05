import { describe, it, expect } from 'vitest'
import { verteileFragen } from './verteilung'
// @ts-expect-error — der Zwilling für den Importer trägt keine Typen
import { verteileFragen as zwilling } from './verteilung.mjs'

describe('Zwilling der Verteilung', () => {
  it('rechnet wie das TypeScript-Modul', () => {
    const gebiete = [
      { id: 'a', kapitel: 2 }, { id: 'b', kapitel: 6 }, { id: 'c', kapitel: 3 },
      { id: 'd', kapitel: 3 }, { id: 'e', kapitel: 1 }, { id: 'f', kapitel: 6 },
      { id: 'g', kapitel: 5 }, { id: 'h', kapitel: 4 },
    ]
    for (const gesamt of [5, 20, 37]) {
      expect(Object.fromEntries(zwilling(gesamt, gebiete)))
        .toEqual(Object.fromEntries(verteileFragen(gesamt, gebiete)))
    }
  })
})
