import { describe, it, expect } from 'vitest'
import { baueTagessitzung, type PlanZustand } from './tagessitzung'
import type { LernAufgabe } from './lernItem'
import type { ExamQuestion } from '../../data/exams'

const jetzt = new Date('2026-03-10T08:00:00Z')
const tage = (n: number) => new Date(jetzt.getTime() + n * 86_400_000).toISOString()

const frage = (id: string, topicId: string): ExamQuestion => ({
  id, source: 't', examiner: 'uebung', topicId, points: 1,
  type: 'mc-single', question: id, correct: 0, explanation: '',
})

const karte = (kartenId: string, topicId: string, courseId = 'ac1'): LernAufgabe => ({
  art: 'card', itemId: `card:${topicId}:${kartenId}`, courseId, topicId,
  karte: { id: kartenId, front: kartenId, back: 'r' },
})

const aufgabe = (id: string, topicId: string, courseId = 'ac1'): LernAufgabe => ({
  art: 'question', itemId: `q:${id}`, courseId, topicId, frage: frage(id, topicId),
})

const plan = (itemId: string, dueAt: string, extra: Partial<PlanZustand> = {}): PlanZustand =>
  ({ itemId, dueAt, lapses: 0, reps: 3, ...extra })

describe('Tagessitzung', () => {
  it('nimmt Fälliges zuerst, am längsten überfällig voran', () => {
    const vorrat = [aufgabe('A', 't1'), aufgabe('B', 't1'), aufgabe('C', 't1')]
    const sitzung = baueTagessitzung({
      vorrat,
      plaene: [plan('q:B', tage(-5)), plan('q:A', tage(-1))],
      attempts: [], jetzt,
    })
    expect(sitzung.slice(0, 2).map(a => a.itemId)).toEqual(['q:B', 'q:A'])
  })

  it('mischt Karten und Fragen aus mehreren Kursen', () => {
    const sitzung = baueTagessitzung({
      vorrat: [karte('k1', 't1', 'ac1'), aufgabe('A', 't9', 'oc')],
      plaene: [plan('card:t1:k1', tage(-1)), plan('q:A', tage(-2))],
      attempts: [], jetzt,
    })
    expect(sitzung.map(a => a.art).sort()).toEqual(['card', 'question'])
    expect(new Set(sitzung.map(a => a.courseId))).toEqual(new Set(['ac1', 'oc']))
  })

  it('lässt Nicht-Fälliges liegen', () => {
    const sitzung = baueTagessitzung({
      vorrat: [aufgabe('A', 't1')],
      plaene: [plan('q:A', tage(3))],
      attempts: [], jetzt, maxNeu: 0,
    })
    expect(sitzung).toEqual([])
  })

  it('übergeht hartnäckige Elemente', () => {
    const sitzung = baueTagessitzung({
      vorrat: [aufgabe('A', 't1'), aufgabe('B', 't1')],
      plaene: [plan('q:A', tage(-1), { lapses: 9 }), plan('q:B', tage(-1))],
      attempts: [], jetzt, maxNeu: 0,
    })
    expect(sitzung.map(a => a.itemId)).toEqual(['q:B'])
  })

  it('holt zuletzt falsch Beantwortetes nach, auch wenn es nicht fällig ist', () => {
    const sitzung = baueTagessitzung({
      vorrat: [aufgabe('A', 't1'), aufgabe('B', 't1')],
      plaene: [plan('q:A', tage(30))],
      attempts: [{ topicId: 't1', questionId: 'A', correct: false, answeredAt: tage(-1) }],
      jetzt, maxNeu: 0,
    })
    expect(sitzung.map(a => a.itemId)).toEqual(['q:A'])
  })

  it('nimmt zuletzt richtig Beantwortetes nicht in den Fehlerstapel', () => {
    const sitzung = baueTagessitzung({
      vorrat: [aufgabe('A', 't1')],
      plaene: [plan('q:A', tage(30))],
      attempts: [
        { topicId: 't1', questionId: 'A', correct: false, answeredAt: tage(-3) },
        { topicId: 't1', questionId: 'A', correct: true, answeredAt: tage(-1) },
      ],
      jetzt, maxNeu: 0,
    })
    expect(sitzung).toEqual([])
  })

  it('füllt mit Ungesehenem aus schwachen Themen auf', () => {
    const vorrat = [aufgabe('stark', 'gut'), aufgabe('schwach', 'schlecht')]
    const attempts = [
      ...Array.from({ length: 6 }, (_, i) => ({ topicId: 'gut', questionId: `g${i}`, correct: true, answeredAt: tage(-1) })),
      ...Array.from({ length: 6 }, (_, i) => ({ topicId: 'schlecht', questionId: `s${i}`, correct: false, answeredAt: tage(-1) })),
    ]
    const sitzung = baueTagessitzung({ vorrat, plaene: [], attempts, jetzt, maxNeu: 1 })
    expect(sitzung.map(a => a.itemId)).toEqual(['q:schwach'])
  })

  it('hält die Tagesobergrenzen ein', () => {
    const vorrat = Array.from({ length: 30 }, (_, i) => aufgabe(`A${i}`, 't1'))
    const plaene = vorrat.slice(0, 20).map(a => plan(a.itemId, tage(-1)))
    const sitzung = baueTagessitzung({
      vorrat, plaene, attempts: [], jetzt, maxFaellig: 5, maxNeu: 3,
    })
    expect(sitzung).toHaveLength(8)
  })

  it('deckelt die Gesamtlänge', () => {
    const vorrat = Array.from({ length: 30 }, (_, i) => aufgabe(`A${i}`, 't1'))
    const plaene = vorrat.map(a => plan(a.itemId, tage(-1)))
    const sitzung = baueTagessitzung({ vorrat, plaene, attempts: [], jetzt, laenge: 7 })
    expect(sitzung).toHaveLength(7)
  })

  it('nennt jedes Element nur einmal', () => {
    const sitzung = baueTagessitzung({
      vorrat: [aufgabe('A', 't1')],
      plaene: [plan('q:A', tage(-1))],
      attempts: [{ topicId: 't1', questionId: 'A', correct: false, answeredAt: tage(-1) }],
      jetzt,
    })
    expect(sitzung).toHaveLength(1)
  })
})
