import { describe, it, expect } from 'vitest'
import { buildSession, sekundenFuer, QUESTION_SECONDS } from './sessionBuilder'
import type { SessionQuestion } from './sessionBuilder'
import type { AttemptLike } from './mastery'

const now = new Date('2026-03-01T10:00:00Z')

const fragen: SessionQuestion[] = [
  { id: 'A1', topicId: '01', gruppe: 'lieberzeit' },
  { id: 'A2', topicId: '01', gruppe: 'lieberzeit' },
  { id: 'B1', topicId: '02', gruppe: 'gerner' },
  { id: 'B2', topicId: '02', gruppe: 'gerner' },
  { id: 'C1', topicId: '03', gruppe: 'gerner' },
]

function faellig(itemId: string, tageUeberfaellig: number) {
  return { itemId, dueAt: new Date(now.getTime() - tageUeberfaellig * 86_400_000).toISOString() }
}

function versuch(topicId: string, questionId: string, correct: boolean): AttemptLike {
  return { topicId, questionId, correct, answeredAt: now.toISOString() }
}

describe('buildSession', () => {
  it('bleibt im Zeitbudget, statt es aufzurunden', () => {
    const minuten = 2
    const s = buildSession({ questions: fragen, attempts: [], due: [], minutes: minuten, now })
    // Ohne Typangabe zählt jede Frage mit dem Standardwert.
    expect(s).toHaveLength(Math.floor((minuten * 60) / QUESTION_SECONDS))
  })

  it('stellt fällige Wiederholungen an den Anfang', () => {
    const s = buildSession({
      questions: fragen,
      attempts: [],
      due: [faellig('C1', 3), faellig('B2', 1)],
      minutes: 10,
      now,
    })
    // Am längsten überfällig zuerst
    expect(s.slice(0, 2).map(q => q.id)).toEqual(['C1', 'B2'])
  })

  it('ignoriert fällige Einträge, zu denen es keine Frage mehr gibt', () => {
    const s = buildSession({
      questions: fragen,
      attempts: [],
      due: [faellig('GIBTESNICHT', 5)],
      minutes: 10,
      now,
    })
    expect(s.map(q => q.id)).not.toContain('GIBTESNICHT')
  })

  it('zieht Fragen aus schwachen Themen den sicheren vor', () => {
    // Thema 01 sitzt, Thema 02 nicht
    const attempts = [
      ...Array.from({ length: 6 }, (_, i) => versuch('01', `A${i}`, true)),
      ...Array.from({ length: 6 }, (_, i) => versuch('02', `B${i}`, false)),
    ]
    const s = buildSession({ questions: fragen, attempts, due: [], minutes: 1.5, now })
    const themen = s.map(q => q.topicId)
    expect(themen.filter(t => t === '02').length)
      .toBeGreaterThan(themen.filter(t => t === '01').length)
  })

  it('nimmt keine Frage doppelt auf', () => {
    const s = buildSession({
      questions: fragen,
      attempts: [],
      due: [faellig('A1', 2), faellig('A1', 1)],
      minutes: 30,
      now,
    })
    expect(new Set(s.map(q => q.id)).size).toBe(s.length)
  })

  it('gibt nie mehr Fragen zurück als vorhanden sind', () => {
    const s = buildSession({ questions: fragen, attempts: [], due: [], minutes: 120, now })
    expect(s).toHaveLength(fragen.length)
  })

  it('beschränkt sich auf die gewählte Gruppe', () => {
    const s = buildSession({
      questions: fragen, attempts: [], due: [], minutes: 30, now, gruppe: 'gerner',
    })
    expect(s.every(q => q.gruppe === 'gerner')).toBe(true)
    expect(s.length).toBeGreaterThan(0)
  })
})

describe('Zeitbudget je Fragetyp', () => {
  const frage = (id: string, type: string) => ({ id, topicId: 't1', gruppe: 'e', type })

  it('veranschlagt eine Rechenfrage höher als eine Ankreuzfrage', () => {
    expect(sekundenFuer({ type: 'numeric' })).toBeGreaterThan(sekundenFuer({ type: 'mc-single' }))
  })

  it('fällt bei unbekanntem Typ auf den Standardwert zurück', () => {
    expect(sekundenFuer({})).toBe(QUESTION_SECONDS)
    expect(sekundenFuer({ type: 'gibtesnicht' })).toBe(QUESTION_SECONDS)
  })

  it('packt mehr Ankreuzfragen als Rechenfragen in dieselbe Zeit', () => {
    const kurz = buildSession({
      questions: Array.from({ length: 30 }, (_, i) => frage(`s${i}`, 'mc-single')),
      attempts: [], due: [], minutes: 10,
    })
    const lang = buildSession({
      questions: Array.from({ length: 30 }, (_, i) => frage(`n${i}`, 'numeric')),
      attempts: [], due: [], minutes: 10,
    })
    expect(kurz.length).toBeGreaterThan(lang.length)
  })

  it('legt bei sehr knapper Zeit trotzdem eine Frage vor', () => {
    const sitzung = buildSession({
      questions: [frage('n1', 'numeric')], attempts: [], due: [], minutes: 1,
    })
    expect(sitzung).toHaveLength(1)
  })
})
