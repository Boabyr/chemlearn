import { describe, it, expect } from 'vitest'
import { mechanismusSchema } from './schema'

/**
 * Gegenproben: genau die Zustände, die im Altbestand steckten, müssen jetzt
 * durchfallen. Ohne diese Tests wäre nicht belegt, dass die neuen Regeln
 * greifen — sie würden nur nicht auffallen.
 */

const atom = (id: string, x: number, y: number, mehr: Record<string, unknown> = {}) =>
  ({ id, element: 'C', x, y, ...mehr })

const stufe = (id: number, mehr: Record<string, unknown> = {}) => ({
  id,
  titel: 'Schritt',
  aufgabe: 'Zeichne den Pfeil.',
  erklaerung: 'Weil es so ist.',
  hinweise: ['Erster Hinweis'],
  atome: [atom('a', 100, 100), atom('b', 200, 100)],
  bindungen: [{ id: 'b1', von: 'a', nach: 'b', ordnung: 1 }],
  pfeile: [{ von: { art: 'bindung', id: 'b1' }, nach: { art: 'atom', id: 'a' } }],
  ...mehr,
})

const mechanismus = (mehr: Record<string, unknown> = {}) => ({
  type: 'mechanism',
  title: 'Titel',
  description: 'Beschreibung',
  stages: [stufe(0), stufe(1)],
  ergebnis: {
    titel: 'Produkt',
    beschreibung: 'Was herauskam.',
    atome: [atom('a', 100, 100), atom('b', 200, 100)],
    bindungen: [{ id: 'b1', von: 'a', nach: 'b', ordnung: 1 }],
  },
  ...mehr,
})

const fehler = (eingabe: unknown) => {
  const ergebnis = mechanismusSchema.safeParse(eingabe)
  return ergebnis.success ? [] : ergebnis.error.issues.map(i => i.message)
}

describe('Mechanismus-Schema', () => {
  it('nimmt einen sauberen zweistufigen Mechanismus an', () => {
    expect(fehler(mechanismus())).toEqual([])
  })

  it('weist einen Mechanismus mit nur einem Schritt ab', () => {
    // Acht von neun Mechanismen des Altbestands sahen so aus.
    expect(fehler(mechanismus({ stages: [stufe(0)] })).join(' ')).toMatch(/mehr als einen Schritt/)
  })

  it('weist ein Atom außerhalb der Bühne ab', () => {
    // In 01-introduction lag ein Atom bei y = 270 auf einer 260 hohen Fläche.
    const raus = stufe(1, { atome: [atom('a', 100, 100), atom('b', 240, 295)] })
    expect(fehler(mechanismus({ stages: [stufe(0), raus] })).length).toBeGreaterThan(0)
  })

  it('weist einander überlagernde Atome ab', () => {
    const eng = stufe(1, {
      atome: [atom('a', 100, 100), atom('b', 108, 100)],
    })
    expect(fehler(mechanismus({ stages: [stufe(0), eng] })).join(' ')).toMatch(/zu dicht/)
  })

  it('weist ein unverbundenes Atom ab, das nicht als Reagenz gilt', () => {
    const lose = stufe(1, { atome: [atom('a', 100, 100), atom('b', 200, 100), atom('c', 300, 100)] })
    expect(fehler(mechanismus({ stages: [stufe(0), lose] })).join(' ')).toMatch(/hängt an keiner Bindung/)
  })

  it('nimmt ein unverbundenes Atom an, das als Reagenz gekennzeichnet ist', () => {
    const reagenz = stufe(1, {
      atome: [atom('a', 100, 100), atom('b', 200, 100), atom('c', 300, 100, { frei: true })],
    })
    expect(fehler(mechanismus({ stages: [stufe(0), reagenz] }))).toEqual([])
  })

  it('weist einen Pfeil ab, der dort endet, wo er beginnt', () => {
    // In 01-introduction zeigte der Pfeil vom Elektronenpaar auf dasselbe Atom.
    const kreis = stufe(1, {
      pfeile: [{ von: { art: 'atom', id: 'a' }, nach: { art: 'atom', id: 'a' } }],
    })
    expect(fehler(mechanismus({ stages: [stufe(0), kreis] })).join(' ')).toMatch(/endet nicht dort/)
  })

  it('weist einen Pfeil auf ein freies Paar ab', () => {
    const falsch = stufe(1, {
      pfeile: [{ von: { art: 'bindung', id: 'b1' }, nach: { art: 'freiesPaar', id: 'a' } }],
    })
    expect(fehler(mechanismus({ stages: [stufe(0), falsch] })).length).toBeGreaterThan(0)
  })

  it('weist ein freies Paar als Ausgangspunkt ab, wenn das Atom keines hat', () => {
    const ohne = stufe(1, {
      pfeile: [{ von: { art: 'freiesPaar', id: 'a' }, nach: { art: 'atom', id: 'b' } }],
    })
    expect(fehler(mechanismus({ stages: [stufe(0), ohne] })).join(' ')).toMatch(/kein freies Elektronenpaar/)
  })

  it('weist eine Ladung im Elementsymbol ab', () => {
    // Vier Atome des Altbestands trugen das Vorzeichen im Label und im Feld —
    // gezeichnet wurde es dadurch doppelt.
    const doppelt = stufe(1, {
      atome: [atom('a', 100, 100, { element: 'N⁺', ladung: 1 }), atom('b', 200, 100)],
    })
    expect(fehler(mechanismus({ stages: [stufe(0), doppelt] })).length).toBeGreaterThan(0)
  })

  it('weist eine Stufe ab, die die Struktur austauscht statt umzuformen', () => {
    // Im Altbestand verschwanden zwischen zwei Stufen einfach Atome.
    const fremd = stufe(1, {
      atome: [atom('x', 100, 100), atom('y', 200, 100)],
      bindungen: [{ id: 'b1', von: 'x', nach: 'y', ordnung: 1 }],
      pfeile: [{ von: { art: 'bindung', id: 'b1' }, nach: { art: 'atom', id: 'x' } }],
    })
    expect(fehler(mechanismus({ stages: [stufe(0), fremd] })).join(' ')).toMatch(/ausgetauscht statt umgeformt/)
  })

  it('verlangt ein Ergebnisbild', () => {
    const ohneErgebnis = mechanismus()
    delete (ohneErgebnis as Record<string, unknown>).ergebnis
    expect(fehler(ohneErgebnis).length).toBeGreaterThan(0)
  })
})
