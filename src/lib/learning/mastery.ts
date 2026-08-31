/**
 * Beherrschungsgrad aus der Antwort-Historie.
 *
 * Reine Rechenlogik: bekommt Versuche herein, gibt Urteile heraus.
 * Junge Versuche wiegen schwerer als alte — wer ein Thema vor zwei Monaten
 * nicht konnte, es heute aber trifft, gilt als sicher.
 */

export interface AttemptLike {
  topicId: string
  questionId: string
  correct: boolean
  answeredAt: string
}

export type Level = 'ungelernt' | 'wackelig' | 'sicher'

/** So viele Versuche braucht es, bevor überhaupt geurteilt wird. */
export const MIN_ATTEMPTS = 4

/** Nach so vielen Tagen zählt ein Versuch nur noch halb. */
export const HALF_LIFE_DAYS = 21

const SICHER_AB = 0.8
const WACKELIG_AB = 0.5

export interface Mastery {
  score: number
  level: Level
  attempts: number
}

function weight(answeredAt: string, now: Date): number {
  const ageDays = (now.getTime() - new Date(answeredAt).getTime()) / 86_400_000
  return Math.pow(0.5, Math.max(0, ageDays) / HALF_LIFE_DAYS)
}

function levelFor(score: number, attempts: number): Level {
  if (attempts < MIN_ATTEMPTS) return 'ungelernt'
  if (score >= SICHER_AB) return 'sicher'
  if (score >= WACKELIG_AB) return 'wackelig'
  return 'ungelernt'
}

/** Beherrschung über die übergebenen Versuche (üblicherweise die eines Themas). */
export function topicMastery(attempts: AttemptLike[], now: Date = new Date()): Mastery {
  if (attempts.length === 0) return { score: 0, level: 'ungelernt', attempts: 0 }

  let gewichtetRichtig = 0
  let gewichtetGesamt = 0
  for (const a of attempts) {
    const w = weight(a.answeredAt, now)
    gewichtetGesamt += w
    if (a.correct) gewichtetRichtig += w
  }

  const score = gewichtetGesamt > 0 ? gewichtetRichtig / gewichtetGesamt : 0
  return { score, level: levelFor(score, attempts.length), attempts: attempts.length }
}

export interface TopicMastery extends Mastery {
  topicId: string
}

/** Alle Themen des Kurses, aufsteigend nach Beherrschung. Nie besuchte zuerst. */
export function weakestTopics(
  attempts: AttemptLike[],
  allTopicIds: string[],
  now: Date = new Date(),
  limit = allTopicIds.length,
): TopicMastery[] {
  const byTopic = new Map<string, AttemptLike[]>()
  for (const a of attempts) {
    const list = byTopic.get(a.topicId)
    if (list) list.push(a)
    else byTopic.set(a.topicId, [a])
  }

  return allTopicIds
    .map(topicId => ({ topicId, ...topicMastery(byTopic.get(topicId) ?? [], now) }))
    .sort((a, b) => a.score - b.score || a.attempts - b.attempts)
    .slice(0, limit)
}

export interface QuestionRef {
  id: string
  professor: string
  topicId: string
}

export interface Readiness {
  professor: string
  /** Trefferquote × Abdeckung — unbeantwortete Fragen zählen als Lücke. */
  score: number
  /** Anteil der Fragen dieses Prüfers, die schon einmal beantwortet wurden. */
  coverage: number
  level: Level
  answered: number
  total: number
}

/**
 * Prüfungsreife je Prüfer. Eine hohe Trefferquote auf drei von dreißig Fragen
 * ist keine Reife — deshalb geht die Abdeckung in die Punktzahl ein.
 */
export function readinessByProfessor(
  attempts: AttemptLike[],
  questions: QuestionRef[],
  now: Date = new Date(),
): Readiness[] {
  const byQuestion = new Map<string, AttemptLike[]>()
  for (const a of attempts) {
    const list = byQuestion.get(a.questionId)
    if (list) list.push(a)
    else byQuestion.set(a.questionId, [a])
  }

  const professors = [...new Set(questions.map(q => q.professor))].sort()

  return professors.map(professor => {
    const own = questions.filter(q => q.professor === professor)
    const relevant = attempts.filter(a => own.some(q => q.id === a.questionId))
    const answered = own.filter(q => byQuestion.has(q.id)).length
    const coverage = own.length > 0 ? answered / own.length : 0

    const { score: hitRate } = topicMastery(relevant, now)
    const score = hitRate * coverage

    return {
      professor,
      score,
      coverage,
      level: levelFor(score, relevant.length),
      answered,
      total: own.length,
    }
  })
}
