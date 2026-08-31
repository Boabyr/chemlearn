import { describe, it, expect } from 'vitest'
import { buildSession, QUESTION_SECONDS } from './sessionBuilder'
import type { SessionQuestion } from './sessionBuilder'
import type { AttemptLike } from './mastery'

const now = new Date('2026-03-01T10:00:00Z')

const fragen: SessionQuestion[] = [
  { id: 'A1', topicId: '01', professor: 'lieberzeit' },
  { id: 'A2', topicId: '01', professor: 'lieberzeit' },
  { id: 'B1', topicId: '02', professor: 'gerner' },
  { id: 'B2', topicId: '02', professor: 'gerner' },
  { id: 'C1', topicId: '03', professor: 'gerner' },
]

function faellig(itemId: string, tageUeberfaellig: number) {
  return { itemId, dueAt: new Date(now.getTime() - tageUeberfaellig * 86_400_000).toISOString() }
}

function versuch(topicId: string, questionId: string, correct: boolean): AttemptLike {
  return { topicId, questionId, correct, answeredAt: now.toISOString() }
}

describe('buildSession', () => {
  it('leitet die Länge aus der verfügbaren Zeit ab', () => {
    const minuten = 2
    const s = buildSession({ questions: fragen, attempts: [], due: [], minutes: minuten, now })
    expect(s).toHaveLength(Math.round((minuten * 60) / QUESTION_SECONDS))
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

  it('beschränkt sich auf den gewählten Prüfer', () => {
    const s = buildSession({
      questions: fragen, attempts: [], due: [], minutes: 30, now, professor: 'gerner',
    })
    expect(s.every(q => q.professor === 'gerner')).toBe(true)
    expect(s.length).toBeGreaterThan(0)
  })
})
