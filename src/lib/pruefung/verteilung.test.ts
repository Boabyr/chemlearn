import { describe, it, expect } from 'vitest'
import { verteileFragen } from './verteilung'

const physik = [
  { id: 'elektrostatik', kapitel: 2 },
  { id: 'gleichstrom', kapitel: 6 },
  { id: 'magnetismus', kapitel: 3 },
  { id: 'wellen', kapitel: 3 },
  { id: 'geometrische-optik', kapitel: 1 },
  { id: 'interferenz', kapitel: 6 },
  { id: 'beugung', kapitel: 5 },
  { id: 'instrumente', kapitel: 4 },
]

describe('verteileFragen', () => {
  it('verteilt die Fragen von Experimentalphysik 2 wie in der Ordnung', () => {
    const v = verteileFragen(20, physik)
    expect(Object.fromEntries(v)).toEqual({
      'elektrostatik': 1, 'gleichstrom': 4, 'magnetismus': 2, 'wellen': 2,
      'geometrische-optik': 1, 'interferenz': 4, 'beugung': 3, 'instrumente': 3,
    })
  })

  it('vergibt genau so viele Fragen, wie gefordert sind', () => {
    for (const gesamt of [7, 12, 20, 25, 33]) {
      const summe = [...verteileFragen(gesamt, physik).values()].reduce((a, b) => a + b, 0)
      expect(summe, `bei ${gesamt} Fragen`).toBe(gesamt)
    }
  })

  it('zieht ausdrückliche Vorgaben vorab ab', () => {
    const v = verteileFragen(20, [
      { id: 'a', kapitel: 1, fragen: 10 },
      { id: 'b', kapitel: 1 },
      { id: 'c', kapitel: 1 },
    ])
    expect(v.get('a')).toBe(10)
    expect(v.get('b')! + v.get('c')!).toBe(10)
  })

  it('gibt bei gleichem Rest dem Gebiet mit mehr Kapiteln den Vorzug', () => {
    // Beide haben Rest 0,5; nur eine Frage ist zu vergeben.
    const v = verteileFragen(2, [{ id: 'klein', kapitel: 1 }, { id: 'gross', kapitel: 3 }])
    expect(v.get('gross')).toBe(2)
    expect(v.get('klein')).toBe(0)
  })
})
