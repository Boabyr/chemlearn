import { describe, it, expect } from 'vitest'
import { abbildungSchema, themaSchema } from './schema'

/**
 * Eine Abbildung, die niemand ruft, sieht niemand; eine Marke ohne Abbildung
 * bleibt als roher Text im Fließtext stehen. Beides fiel bisher unter den Tisch,
 * weil es die Fähigkeit gar nicht gab.
 */

const struktur = (teil: Record<string, unknown> = {}) => ({
  beschriftung: 'Grenzstruktur A',
  atome: [
    { id: 'n1', element: 'N', x: 240, y: 80, wasserstoffe: 1 },
    { id: 'c2', element: 'C', x: 307, y: 128 },
  ],
  bindungen: [{ id: 'b1', von: 'n1', nach: 'c2', ordnung: 1 }],
  ...teil,
})

const abbildung = (teil: Record<string, unknown> = {}) => ({
  art: 'strukturen',
  id: 'pyrrol-c2',
  titel: 'Areniumion',
  verknuepfung: 'resonanz',
  strukturen: [struktur(), struktur({ beschriftung: 'Grenzstruktur B' })],
  ...teil,
})

const thema = (teil: Record<string, unknown> = {}) => ({
  id: '07-test', title: 'Test', subtitle: '', icon: '🧪', estimatedMinutes: 30,
  theory: 'Ein hinreichend langer Theorietext, damit das Schema nicht schon an der Länge scheitert. '.repeat(2),
  quiz: [{ id: 'q1', question: 'F?', options: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'e' }],
  flashcards: [{ id: 'abcdefg', front: 'V', back: 'R' }],
  ...teil,
})

describe('Abbildung', () => {
  it('nimmt eine saubere Reihe an', () => {
    expect(abbildungSchema.safeParse(abbildung()).success).toBe(true)
  })

  it('verlangt mindestens zwei Strukturen', () => {
    const ergebnis = abbildungSchema.safeParse(abbildung({ strukturen: [struktur()] }))
    expect(ergebnis.success).toBe(false)
  })

  it('weist eine Bindung auf ein Atom ab, das es nicht gibt', () => {
    const kaputt = struktur({ bindungen: [{ id: 'b1', von: 'n1', nach: 'gibtsnicht', ordnung: 1 }] })
    expect(abbildungSchema.safeParse(abbildung({ strukturen: [kaputt, struktur()] })).success).toBe(false)
  })

  it('weist einander überlagernde Atome ab', () => {
    const kaputt = struktur({
      atome: [
        { id: 'n1', element: 'N', x: 240, y: 80 },
        { id: 'c2', element: 'C', x: 242, y: 82 },
      ],
    })
    expect(abbildungSchema.safeParse(abbildung({ strukturen: [kaputt, struktur()] })).success).toBe(false)
  })

  it('weist ein Atom außerhalb der Bühne ab', () => {
    const kaputt = struktur({
      atome: [
        { id: 'n1', element: 'N', x: 240, y: 80 },
        { id: 'c2', element: 'C', x: 307, y: 999 },
      ],
    })
    expect(abbildungSchema.safeParse(abbildung({ strukturen: [kaputt, struktur()] })).success).toBe(false)
  })

  it('weist ein unverbundenes Atom ab, das nicht als Reagenz gilt', () => {
    const kaputt = struktur({
      atome: [
        { id: 'n1', element: 'N', x: 240, y: 80 },
        { id: 'c2', element: 'C', x: 307, y: 128 },
        { id: 'x', element: 'Br', x: 400, y: 250 },
      ],
    })
    expect(abbildungSchema.safeParse(abbildung({ strukturen: [kaputt, struktur()] })).success).toBe(false)
  })
})

describe('Abbildungen im Thema', () => {
  it('nimmt Marke und Abbildung im Gleichklang an', () => {
    const ergebnis = themaSchema.safeParse(thema({
      theory: 'Text lang genug für das Schema, damit es nicht daran scheitert. {{abbildung:pyrrol-c2}} Und weiter im Text.',
      abbildungen: [abbildung()],
    }))
    expect(ergebnis.success, JSON.stringify(ergebnis.error?.issues)).toBe(true)
  })

  it('meldet eine Marke ohne zugehörige Abbildung', () => {
    const ergebnis = themaSchema.safeParse(thema({
      theory: 'Text lang genug für das Schema, damit es nicht daran scheitert. {{abbildung:gibtsnicht}} Weiter.',
      abbildungen: [abbildung()],
    }))
    expect(ergebnis.success).toBe(false)
    expect(JSON.stringify(ergebnis.error?.issues)).toContain('gibtsnicht')
  })

  it('meldet eine Abbildung, die im Text nirgends gerufen wird', () => {
    const ergebnis = themaSchema.safeParse(thema({ abbildungen: [abbildung()] }))
    expect(ergebnis.success).toBe(false)
    expect(JSON.stringify(ergebnis.error?.issues)).toContain('pyrrol-c2')
  })

  it('kommt ohne Abbildungen aus', () => {
    expect(themaSchema.safeParse(thema()).success).toBe(true)
  })
})

describe('Diagramm', () => {
  const diagramm = (teil: Record<string, unknown> = {}) => ({
    art: 'diagramm',
    id: 'kalibriergerade',
    titel: 'Kalibriergerade',
    xAchse: { titel: 'c', min: 0, max: 3 },
    yAchse: { titel: 'A', min: 0, max: 3 },
    kurven: [{ beschriftung: 'ideal', punkte: [{ x: 0, y: 0 }, { x: 3, y: 3 }] }],
    ...teil,
  })

  it('nimmt ein sauberes Diagramm an', () => {
    const ergebnis = abbildungSchema.safeParse(diagramm())
    expect(ergebnis.success, JSON.stringify(ergebnis.error?.issues)).toBe(true)
  })

  it('verlangt mindestens zwei Punkte je Kurve', () => {
    expect(abbildungSchema.safeParse(diagramm({
      kurven: [{ beschriftung: 'k', punkte: [{ x: 0, y: 0 }] }],
    })).success).toBe(false)
  })

  it('weist einen Punkt außerhalb der Achsen ab', () => {
    expect(abbildungSchema.safeParse(diagramm({
      kurven: [{ beschriftung: 'k', punkte: [{ x: 0, y: 0 }, { x: 99, y: 1 }] }],
    })).success).toBe(false)
  })

  it('weist einen Marker außerhalb der Achsen ab', () => {
    expect(abbildungSchema.safeParse(diagramm({
      marker: [{ x: 0, y: 99, beschriftung: 'daneben' }],
    })).success).toBe(false)
  })

  it('weist eine Achse mit min über max ab', () => {
    expect(abbildungSchema.safeParse(diagramm({
      xAchse: { titel: 'c', min: 5, max: 1 },
    })).success).toBe(false)
  })

  it('weist doppelte Kurvenbeschriftungen ab', () => {
    expect(abbildungSchema.safeParse(diagramm({
      kurven: [
        { beschriftung: 'gleich', punkte: [{ x: 0, y: 0 }, { x: 1, y: 1 }] },
        { beschriftung: 'gleich', punkte: [{ x: 0, y: 1 }, { x: 1, y: 2 }] },
      ],
    })).success).toBe(false)
  })
})
