import { describe, it, expect } from 'vitest'
import {
  bindungsLinien, freiePaarPunkte, pfeilBahn, zielPunkt, trefferZiel, ladungsPunkt,
} from './geometrie'
import type { Atom, Bindung, Stufe } from './strukturTypen'

const atom = (id: string, x: number, y: number, teil: Partial<Atom> = {}): Atom =>
  ({ id, element: 'C', x, y, ...teil })

const bindung = (id: string, von: string, nach: string, ordnung: 1 | 2 | 3 = 1): Bindung =>
  ({ id, von, nach, ordnung })

const stufe = (atome: Atom[], bindungen: Bindung[]): Stufe => ({
  id: 0, titel: 't', aufgabe: 'a', erklaerung: 'e', hinweise: ['h1', 'h2'],
  atome, bindungen, pfeile: [],
})

describe('bindungsLinien', () => {
  const a = atom('a', 100, 100)
  const b = atom('b', 200, 100)

  it('zeichnet eine Einfachbindung als eine Linie', () => {
    const linien = bindungsLinien(bindung('b1', 'a', 'b'), a, b)
    expect(linien).toHaveLength(1)
    expect(linien[0]).toEqual({ x1: 100, y1: 100, x2: 200, y2: 100 })
  })

  it('legt die zweite Linie einer Doppelbindung parallel daneben', () => {
    const [erste, zweite] = bindungsLinien(bindung('b1', 'a', 'b', 2), a, b)
    expect(erste.y1).not.toBe(zweite.y1)
    expect(erste.y1 - erste.y2).toBe(0)
    expect(zweite.y1 - zweite.y2).toBe(0)
    // gleicher Abstand nach beiden Seiten von der Achse
    expect(erste.y1 - 100).toBeCloseTo(-(zweite.y1 - 100), 6)
  })

  it('zeichnet eine Dreifachbindung als drei Linien, eine davon auf der Achse', () => {
    const linien = bindungsLinien(bindung('b1', 'a', 'b', 3), a, b)
    expect(linien).toHaveLength(3)
    expect(linien.some(l => l.y1 === 100)).toBe(true)
  })

  it('endet vor einem beschrifteten Atom, nicht daran', () => {
    const n = atom('n', 200, 100, { element: 'N' })
    const [linie] = bindungsLinien(bindung('b1', 'a', 'n'), a, n)
    expect(linie.x2).toBeLessThan(200)
    expect(linie.x1).toBe(100)   // Kohlenstoff bleibt eine Ecke
  })

  it('kürzt an beiden Enden, wenn beide beschriftet sind', () => {
    const n = atom('n', 100, 100, { element: 'N' })
    const o = atom('o', 200, 100, { element: 'O' })
    const [linie] = bindungsLinien(bindung('b1', 'n', 'o'), n, o)
    expect(linie.x1).toBeGreaterThan(100)
    expect(linie.x2).toBeLessThan(200)
    expect(linie.x1).toBeLessThan(linie.x2)
  })

  it('dreht sich nicht um, wenn die Atome eng beieinander stehen', () => {
    const n = atom('n', 100, 100, { element: 'N' })
    const o = atom('o', 118, 100, { element: 'O' })
    const [linie] = bindungsLinien(bindung('b1', 'n', 'o'), n, o)
    expect(linie.x1).toBeLessThanOrEqual(linie.x2)
  })
})

describe('freiePaarPunkte', () => {
  it('legt das Paar auf die bindungsfreie Seite', () => {
    // Stickstoff links, ein Nachbar rechts → Paar muss nach links zeigen
    const n = atom('n', 200, 100, { element: 'N', freiePaare: 1 })
    const c = atom('c', 280, 100)
    const punkte = freiePaarPunkte(n, [c])
    expect(punkte).toHaveLength(1)
    expect(punkte[0].mitte.x).toBeLessThan(200)
    expect(punkte[0].mitte.y).toBeCloseTo(100, 0)
  })

  it('gibt für jedes Paar zwei Punkte aus', () => {
    const n = atom('n', 200, 100, { element: 'N', freiePaare: 1 })
    const [paar] = freiePaarPunkte(n, [])
    expect(paar.punkte).toHaveLength(2)
    const abstand = Math.hypot(paar.punkte[0].x - paar.punkte[1].x, paar.punkte[0].y - paar.punkte[1].y)
    expect(abstand).toBeGreaterThan(2)
    expect(abstand).toBeLessThan(12)
  })

  it('verteilt mehrere Paare auf verschiedene Richtungen', () => {
    const o = atom('o', 200, 100, { element: 'O', freiePaare: 2 })
    const c = atom('c', 280, 100)
    const paare = freiePaarPunkte(o, [c])
    expect(paare).toHaveLength(2)
    const abstand = Math.hypot(
      paare[0].mitte.x - paare[1].mitte.x, paare[0].mitte.y - paare[1].mitte.y)
    expect(abstand).toBeGreaterThan(6)
  })

  it('gibt ohne freie Paare nichts aus', () => {
    expect(freiePaarPunkte(atom('c', 0, 0), [])).toEqual([])
  })
})

describe('pfeilBahn', () => {
  it('bleibt gerichtet, auch wenn Anfang und Ende nah beieinander liegen', () => {
    const bahn = pfeilBahn({ x: 100, y: 100 }, { x: 112, y: 100 })
    expect(bahn.start.x).toBeLessThan(bahn.ende.x)
  })

  it('krümmt lange Pfeile stärker als kurze, aber gedeckelt', () => {
    const kurz = pfeilBahn({ x: 0, y: 0 }, { x: 40, y: 0 })
    const lang = pfeilBahn({ x: 0, y: 0 }, { x: 400, y: 0 })
    const bogen = (b: ReturnType<typeof pfeilBahn>) =>
      Math.abs(b.kontrolle.y - (b.start.y + b.ende.y) / 2)
    expect(bogen(lang)).toBeGreaterThan(bogen(kurz))
    expect(bogen(lang)).toBeLessThan(60)
  })

  it('liefert einen gültigen SVG-Pfad', () => {
    const bahn = pfeilBahn({ x: 10, y: 20 }, { x: 90, y: 60 })
    expect(bahn.d).toMatch(/^M [\d.-]+ [\d.-]+ Q [\d.-]+ [\d.-]+ [\d.-]+ [\d.-]+$/)
  })
})

describe('zielPunkt', () => {
  const a = atom('a', 100, 100)
  const b = atom('b', 200, 100)
  const n = atom('n', 100, 200, { element: 'N', freiePaare: 1 })
  const s = stufe([a, b, n], [bindung('b1', 'a', 'b')])

  it('nimmt bei einer Bindung die Mitte', () => {
    expect(zielPunkt({ art: 'bindung', id: 'b1' }, s)).toEqual({ x: 150, y: 100 })
  })

  it('nimmt bei einem Atom dessen Ort', () => {
    expect(zielPunkt({ art: 'atom', id: 'b' }, s)).toEqual({ x: 200, y: 100 })
  })

  it('nimmt beim freien Paar dessen Lage neben dem Atom', () => {
    const punkt = zielPunkt({ art: 'freiesPaar', id: 'n' }, s)!
    expect(punkt).not.toEqual({ x: 100, y: 200 })
    expect(Math.hypot(punkt.x - 100, punkt.y - 200)).toBeLessThan(30)
  })

  it('gibt für Unbekanntes nichts zurück', () => {
    expect(zielPunkt({ art: 'bindung', id: 'gibtsnicht' }, s)).toBeNull()
  })
})

describe('trefferZiel', () => {
  const a = atom('a', 100, 100)
  const b = atom('b', 200, 100)
  const n = atom('n', 300, 100, { element: 'N', freiePaare: 1 })
  const s = stufe([a, b, n], [bindung('b1', 'a', 'b'), bindung('b2', 'b', 'n')])

  it('findet die Bindung, wenn man auf ihre Mitte zeigt', () => {
    expect(trefferZiel(150, 100, s)).toEqual({ art: 'bindung', id: 'b1' })
  })

  it('findet das Atom, wenn man darauf zeigt', () => {
    expect(trefferZiel(202, 102, s)).toEqual({ art: 'atom', id: 'b' })
  })

  it('bevorzugt das freie Paar gegenüber seinem Atom, wenn man es trifft', () => {
    const punkt = zielPunkt({ art: 'freiesPaar', id: 'n' }, s)!
    expect(trefferZiel(punkt.x, punkt.y, s)).toEqual({ art: 'freiesPaar', id: 'n' })
  })

  it('gibt im Leeren nichts zurück', () => {
    expect(trefferZiel(20, 280, s)).toBeNull()
  })

  it('nimmt bei zwei Kandidaten den näheren', () => {
    // knapp rechts der Mitte von b1, aber noch weit von Atom b
    expect(trefferZiel(160, 100, s)).toEqual({ art: 'bindung', id: 'b1' })
  })
})

describe('ladungsPunkt', () => {
  it('setzt die Ladung neben das Symbol, nicht darauf', () => {
    const n = atom('n', 200, 100, { element: 'N', ladung: 1 })
    const punkt = ladungsPunkt(n)
    expect(punkt.x).toBeGreaterThan(200)
    expect(punkt.y).toBeLessThan(100)
  })
})
