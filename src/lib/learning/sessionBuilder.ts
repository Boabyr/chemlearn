/**
 * Stellt eine Übungssitzung zusammen.
 *
 * Ersetzt das reine Zufallsmischen: erst was fällig ist, dann was schwach
 * sitzt, dann was noch nie drankam.
 */

import { topicMastery, type AttemptLike } from './mastery'

/** Veranschlagte Bearbeitungszeit, wenn der Fragetyp unbekannt ist. */
export const QUESTION_SECONDS = 45

/**
 * Zeitbudget je Fragetyp.
 *
 * Vorher galten für jede Frage 45 Sekunden — eine Vierpunkt-Rechnung mit
 * Zahleneingabe wurde damit genauso veranschlagt wie eine Ankreuzfrage, und
 * eine Runde war entweder zu kurz oder zu lang.
 */
export const SEKUNDEN_JE_TYP: Record<string, number> = {
  'mc-single': 35,
  'mc-multi': 55,
  order: 60,
  numeric: 95,
}

export function sekundenFuer(frage: { type?: string }): number {
  return (frage.type && SEKUNDEN_JE_TYP[frage.type]) || QUESTION_SECONDS
}

export interface SessionQuestion {
  id: string
  topicId: string
  gruppe: string
  type?: string
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
  /** Auf eine Gruppe einschränken. */
  gruppe?: string
}

export function buildSession<Q extends SessionQuestion>({
  questions,
  attempts,
  due,
  minutes,
  now = new Date(),
  gruppe,
}: SessionOptions<Q>): Q[] {
  const pool = gruppe ? questions.filter(q => q.gruppe === gruppe) : questions
  const budget = Math.max(1, minutes) * 60

  const byId = new Map(pool.map(q => [q.id, q]))
  const gewaehlt: Q[] = []
  const genommen = new Set<string>()
  let verplant = 0

  const nimm = (q: Q | undefined) => {
    if (!q || genommen.has(q.id)) return
    const dauer = sekundenFuer(q)
    // Mindestens eine Frage, danach nur, solange das Budget reicht.
    if (gewaehlt.length > 0 && verplant + dauer > budget) return
    genommen.add(q.id)
    gewaehlt.push(q)
    verplant += dauer
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
