/**
 * Stellt eine Übungssitzung zusammen.
 *
 * Ersetzt das reine Zufallsmischen: erst was fällig ist, dann was schwach
 * sitzt, dann was noch nie drankam.
 */

import { topicMastery, type AttemptLike } from './mastery'

/** Veranschlagte Bearbeitungszeit je Frage. */
export const QUESTION_SECONDS = 45

export interface SessionQuestion {
  id: string
  topicId: string
  examiner: string
}

export interface DueItem {
  itemId: string
  dueAt: string
}

export interface SessionOptions<Q extends SessionQuestion> {
  questions: Q[]
  attempts: AttemptLike[]
  due: DueItem[]
  minutes: number
  now?: Date
  /** Auf einen Prüfer einschränken. */
  examiner?: string
}

export function buildSession<Q extends SessionQuestion>({
  questions,
  attempts,
  due,
  minutes,
  now = new Date(),
  examiner,
}: SessionOptions<Q>): Q[] {
  const pool = examiner ? questions.filter(q => q.examiner === examiner) : questions
  const wanted = Math.min(pool.length, Math.max(1, Math.round((minutes * 60) / QUESTION_SECONDS)))

  const byId = new Map(pool.map(q => [q.id, q]))
  const gewaehlt: Q[] = []
  const genommen = new Set<string>()

  const nimm = (q: Q | undefined) => {
    if (!q || genommen.has(q.id) || gewaehlt.length >= wanted) return
    genommen.add(q.id)
    gewaehlt.push(q)
  }

  // 1. Fällige Wiederholungen, am längsten überfällig zuerst.
  const faellig = due
    .filter(d => new Date(d.dueAt).getTime() <= now.getTime())
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
  for (const d of faellig) nimm(byId.get(d.itemId))

  // 2. Beherrschung je Thema — schwache Themen zuerst bedienen.
  const attemptsByTopic = new Map<string, AttemptLike[]>()
  for (const a of attempts) {
    const list = attemptsByTopic.get(a.topicId)
    if (list) list.push(a)
    else attemptsByTopic.set(a.topicId, [a])
  }
  const scoreOf = new Map<string, number>()
  for (const q of pool) {
    if (scoreOf.has(q.topicId)) continue
    scoreOf.set(q.topicId, topicMastery(attemptsByTopic.get(q.topicId) ?? [], now).score)
  }

  const beantwortet = new Set(attempts.map(a => a.questionId))

  // Schon beantwortete Fragen aus schwachen Themen.
  const schwach = pool
    .filter(q => !genommen.has(q.id) && beantwortet.has(q.id))
    .sort((a, b) => (scoreOf.get(a.topicId) ?? 0) - (scoreOf.get(b.topicId) ?? 0))
  for (const q of schwach) nimm(q)

  // 3. Noch nie gestellte Fragen, ebenfalls schwache Themen zuerst.
  const neu = pool
    .filter(q => !genommen.has(q.id) && !beantwortet.has(q.id))
    .sort((a, b) => (scoreOf.get(a.topicId) ?? 0) - (scoreOf.get(b.topicId) ?? 0))
  for (const q of neu) nimm(q)

  return gewaehlt
}
