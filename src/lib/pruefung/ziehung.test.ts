import { describe, it, expect } from 'vitest'
import { ziehePruefung } from './ziehung'
import type { Ordnung } from '../../content/schema'
import type { ExamQuestion } from '../../data/exams'

function frage(id: string, thema: string, gruppe: string): ExamQuestion {
  return {
    id, source: 'Skript', gruppe, topicId: thema, points: 1.6, type: 'mc-single',
    question: id, options: ['a', 'b', 'c', 'd'], correct: 0, explanation: '',
  }
}

const ORDNUNG: Ordnung = {
  titel: 'Prüfung', fragen: 3, punkteJeFrage: 1.6, regel: 'streng', zeitMinuten: 120,
  noten: [],
  gebiete: [
    { id: 'a', titel: 'A', topics: ['t1', 't2'], fragen: 2 },
    { id: 'b', titel: 'B', topics: ['t3'], fragen: 1 },
  ],
}

const BESTAND = [
  frage('a1', 't1', 'a'), frage('a2', 't1', 'a'),
  frage('a3', 't2', 'a'), frage('a4', 't2', 'a'),
  frage('b1', 't3', 'b'), frage('b2', 't3', 'b'),
]

/** Zufall, der immer den ersten Eintrag wählt — macht die Ziehung vorhersagbar. */
const ersterEintrag = () => 0

describe('ziehePruefung', () => {
  it('zieht je Gebiet so viele Fragen, wie die Ordnung vorgibt', () => {
    const { fragen, luecken } = ziehePruefung(ORDNUNG, BESTAND, ersterEintrag)
    expect(fragen).toHaveLength(3)
    expect(fragen.filter(f => f.gruppe === 'a')).toHaveLength(2)
    expect(fragen.filter(f => f.gruppe === 'b')).toHaveLength(1)
    expect(luecken).toEqual([])
  })

  it('nimmt aus einem Kapitel nur eine Frage, solange es andere gibt', () => {
    const { fragen } = ziehePruefung(ORDNUNG, BESTAND, ersterEintrag)
    const themenDesGebietsA = fragen.filter(f => f.gruppe === 'a').map(f => f.topicId)
    expect(new Set(themenDesGebietsA).size).toBe(2)
  })

  it('zieht ein zweites Mal aus demselben Kapitel, wenn das Gebiet nur eines hat', () => {
    const ordnung = { ...ORDNUNG, fragen: 2, gebiete: [{ id: 'b', titel: 'B', topics: ['t3'], fragen: 2 }] }
    const { fragen, luecken } = ziehePruefung(ordnung, BESTAND, ersterEintrag)
    expect(fragen.map(f => f.id).sort()).toEqual(['b1', 'b2'])
    expect(luecken).toEqual([])
  })

  it('meldet die Fehlmenge, statt aus einem anderen Gebiet aufzufüllen', () => {
    const ordnung = { ...ORDNUNG, fragen: 4, gebiete: [
      { id: 'a', titel: 'A', topics: ['t1', 't2'], fragen: 1 },
      { id: 'b', titel: 'B', topics: ['t3'], fragen: 3 },
    ] }
    const { fragen, luecken } = ziehePruefung(ordnung, BESTAND, ersterEintrag)
    expect(fragen.filter(f => f.gruppe === 'b')).toHaveLength(2)
    expect(luecken).toEqual(['B: nur 2 von 3 Fragen'])
  })

  it('liefert bei gleicher Zufallsquelle dasselbe Ergebnis', () => {
    const eins = ziehePruefung(ORDNUNG, BESTAND, ersterEintrag).fragen.map(f => f.id)
    const zwei = ziehePruefung(ORDNUNG, BESTAND, ersterEintrag).fragen.map(f => f.id)
    expect(eins).toEqual(zwei)
  })
})
