import { describe, it, expect } from 'vitest'
import { topicMastery, weakestTopics, readinessByProfessor, MIN_ATTEMPTS } from './mastery'
import type { AttemptLike } from './mastery'

const now = new Date('2026-03-01T10:00:00Z')

function versuch(topicId: string, correct: boolean, tageHer = 0, questionId = 'q'): AttemptLike {
  return {
    topicId,
    questionId,
    correct,
    answeredAt: new Date(now.getTime() - tageHer * 86_400_000).toISOString(),
  }
}

describe('topicMastery', () => {
  it('meldet ohne Versuche „ungelernt" bei Punktzahl 0', () => {
    const m = topicMastery([], now)
    expect(m.attempts).toBe(0)
    expect(m.score).toBe(0)
    expect(m.level).toBe('ungelernt')
  })

  it('urteilt erst ab einer Mindestzahl an Versuchen', () => {
    const wenige = Array.from({ length: MIN_ATTEMPTS - 1 }, (_, i) => versuch('t', true, 0, `q${i}`))
    expect(topicMastery(wenige, now).level).toBe('ungelernt')

    const genug = Array.from({ length: MIN_ATTEMPTS }, (_, i) => versuch('t', true, 0, `q${i}`))
    expect(topicMastery(genug, now).level).toBe('sicher')
  })

  it('stuft durchgehend falsche Antworten als ungelernt ein', () => {
    const a = Array.from({ length: 6 }, (_, i) => versuch('t', false, 0, `q${i}`))
    const m = topicMastery(a, now)
    expect(m.score).toBe(0)
    expect(m.level).toBe('ungelernt')
  })

  it('gewichtet junge Versuche stärker als alte', () => {
    // Früher alles falsch, heute alles richtig -> soll gut dastehen
    const besserung = [
      ...Array.from({ length: 5 }, (_, i) => versuch('t', false, 60, `q${i}`)),
      ...Array.from({ length: 5 }, (_, i) => versuch('t', true, 0, `q${i}`)),
    ]
    // Umgekehrter Verlauf mit identischer Trefferquote
    const verschlechterung = [
      ...Array.from({ length: 5 }, (_, i) => versuch('t', true, 60, `q${i}`)),
      ...Array.from({ length: 5 }, (_, i) => versuch('t', false, 0, `q${i}`)),
    ]
    expect(topicMastery(besserung, now).score)
      .toBeGreaterThan(topicMastery(verschlechterung, now).score)
  })
})

describe('weakestTopics', () => {
  const alle = ['01', '02', '03', '04']

  it('nennt nie besuchte Themen zuerst', () => {
    const attempts = Array.from({ length: 6 }, (_, i) => versuch('01', true, 0, `q${i}`))
    const schwach = weakestTopics(attempts, alle, now)
    expect(schwach[0].topicId).not.toBe('01')
    expect(schwach.at(-1)!.topicId).toBe('01')
  })

  it('sortiert aufsteigend nach Punktzahl und hält das Limit ein', () => {
    const attempts = [
      ...Array.from({ length: 6 }, (_, i) => versuch('01', true, 0, `a${i}`)),
      ...Array.from({ length: 6 }, (_, i) => versuch('02', i < 3, 0, `b${i}`)),
    ]
    const schwach = weakestTopics(attempts, ['01', '02'], now, 1)
    expect(schwach).toHaveLength(1)
    expect(schwach[0].topicId).toBe('02')
  })
})

describe('readinessByProfessor', () => {
  const fragen = [
    { id: 'L1', professor: 'lieberzeit', topicId: '01' },
    { id: 'L2', professor: 'lieberzeit', topicId: '02' },
    { id: 'G1', professor: 'gerner', topicId: '03' },
  ]

  it('führt jeden Prüfer auf, auch ohne einen einzigen Versuch', () => {
    const r = readinessByProfessor([], fragen, now)
    expect(r.map(x => x.professor).sort()).toEqual(['gerner', 'lieberzeit'])
    expect(r.every(x => x.level === 'ungelernt')).toBe(true)
  })

  it('rechnet unbeantwortete Fragen als Lücke mit ein', () => {
    // Beide Fragen von Lieberzeit richtig -> volle Abdeckung
    const voll = [versuch('01', true, 0, 'L1'), versuch('02', true, 0, 'L2')]
    // Nur eine von zwei beantwortet -> halbe Abdeckung
    const halb = [versuch('01', true, 0, 'L1')]

    const rVoll = readinessByProfessor(voll, fragen, now).find(x => x.professor === 'lieberzeit')!
    const rHalb = readinessByProfessor(halb, fragen, now).find(x => x.professor === 'lieberzeit')!

    expect(rVoll.coverage).toBe(1)
    expect(rHalb.coverage).toBe(0.5)
    expect(rVoll.score).toBeGreaterThan(rHalb.score)
  })
})
