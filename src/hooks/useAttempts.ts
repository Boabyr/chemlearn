import { useCallback, useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { qk } from '../lib/queryKeys'
import { abholen, nachtragen, quittieren } from '../lib/outbox'
import { serieFortschreiben } from '../lib/serie'
import { qk as schluessel } from '../lib/queryKeys'
import type { StatistikVersuch } from '../lib/learning/statistik'

export type AttemptSource = 'topic-quiz' | 'practice' | 'exam-sim'

export interface AttemptInput {
  courseId: string
  topicId: string
  questionId: string
  source: AttemptSource
  correct: boolean
  pointsEarned?: number
  pointsPossible?: number
  msTaken?: number
}

interface AttemptZeile {
  user_id: string
  course_id: string
  topic_id: string
  question_id: string
  source: AttemptSource
  correct: boolean
  points_earned: number
  points_possible: number
  ms_taken: number | null
  answered_at?: string
}

/** Wartezeit, bevor gepufferte Versuche geschrieben werden. */
const FLUSH_MS = 1500

function alsZeile(userId: string, a: AttemptInput): AttemptZeile {
  return {
    user_id: userId,
    course_id: a.courseId,
    topic_id: a.topicId,
    question_id: a.questionId,
    source: a.source,
    correct: a.correct,
    points_earned: a.pointsEarned ?? (a.correct ? 1 : 0),
    points_possible: a.pointsPossible ?? 1,
    ms_taken: a.msTaken ?? null,
    answered_at: new Date().toISOString(),
  }
}

async function versucheLaden(userId: string, courseId?: string): Promise<StatistikVersuch[]> {
  let query = supabase
    .from('attempts')
    .select('topic_id, question_id, correct, answered_at, ms_taken, source')
    .eq('user_id', userId)
    .order('answered_at', { ascending: false })
    .limit(5000)
  if (courseId) query = query.eq('course_id', courseId)

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []).map(d => ({
    topicId: d.topic_id,
    questionId: d.question_id,
    correct: d.correct,
    answeredAt: d.answered_at,
    msTaken: d.ms_taken,
    source: d.source,
  }))
}

/**
 * Antwort-Historie: liest die Versuche des Kurses und nimmt neue entgegen.
 *
 * Geschrieben wird gebündelt — beim Durchklicken eines Quiz entstünde sonst ein
 * Netzwerkaufruf je Frage. Was nicht durchgeht, wandert in den Ausgangskorb
 * und wird beim nächsten Mal mitgeschickt, statt verloren zu gehen.
 */
export function useAttempts(courseId?: string) {
  const { user } = useAuth()
  const qc = useQueryClient()
  const userId = user?.id ?? 'anonym'

  const puffer = useRef<AttemptInput[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data: attempts = [], isPending } = useQuery<StatistikVersuch[]>({
    queryKey: qk.attempts(userId, courseId),
    queryFn: () => versucheLaden(user!.id, courseId),
    enabled: !!user,
  })

  /** Liegengebliebenes aus früheren Sitzungen nachreichen. */
  const korbLeeren = useCallback(async () => {
    const pakete = await abholen<AttemptZeile>('attempts')
    for (const paket of pakete) {
      const { error } = await supabase.from('attempts').insert(paket.zeilen)
      if (error) return false          // weiterhin kein Netz — beim nächsten Mal erneut
      await quittieren(paket.id)
    }
    return pakete.length > 0
  }, [])

  const flush = useCallback(async () => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null }
    if (!user) return

    const offen = puffer.current
    puffer.current = []
    const zeilen = offen.map(a => alsZeile(user.id, a))

    if (zeilen.length > 0) {
      const { error } = await supabase.from('attempts').insert(zeilen)
      if (error) {
        console.error('Versuche speichern fehlgeschlagen, zurückgelegt:', error.message)
        await nachtragen('attempts', zeilen)
        return
      }
    }

    const nachgereicht = await korbLeeren()
    if (zeilen.length > 0 || nachgereicht) {
      await qc.invalidateQueries({ queryKey: qk.attempts(user.id, courseId) })
      await qc.invalidateQueries({ queryKey: qk.attempts(user.id, undefined) })

      // Gelernt ist gelernt: auch eine Übungsrunde hält die Serie am Leben.
      await serieFortschreiben(user.id)
      await qc.invalidateQueries({ queryKey: schluessel.streak(user.id) })
    }
  }, [user, courseId, qc, korbLeeren])

  /** Einen Versuch vormerken. Die Anzeige aktualisiert sich sofort. */
  const logAttempt = useCallback((input: AttemptInput) => {
    if (!user) return
    puffer.current.push(input)

    qc.setQueryData<StatistikVersuch[]>(qk.attempts(user.id, courseId), alt => [{
      topicId: input.topicId,
      questionId: input.questionId,
      correct: input.correct,
      answeredAt: new Date().toISOString(),
      msTaken: input.msTaken ?? null,
      source: input.source,
    }, ...(alt ?? [])])

    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { void flush() }, FLUSH_MS)
  }, [user, courseId, qc, flush])

  useEffect(() => { if (user) void korbLeeren() }, [user, korbLeeren])

  // Zurück im Netz: sofort nachreichen, nicht erst bei der nächsten Antwort.
  useEffect(() => {
    const wiederDa = () => { void flush() }
    window.addEventListener('online', wiederDa)
    return () => window.removeEventListener('online', wiederDa)
  }, [flush])

  useEffect(() => {
    // `visibilitychange` kommt früh genug, dass ein Netzaufruf noch durchgeht.
    const beimVerbergen = () => { if (document.visibilityState === 'hidden') void flush() }
    // Beim endgültigen Verlassen kein Netz mehr versuchen, sondern zurücklegen.
    const beimVerlassen = () => {
      if (!user || puffer.current.length === 0) return
      const zeilen = puffer.current.map(a => alsZeile(user.id, a))
      puffer.current = []
      void nachtragen('attempts', zeilen)
    }

    document.addEventListener('visibilitychange', beimVerbergen)
    window.addEventListener('pagehide', beimVerlassen)
    return () => {
      document.removeEventListener('visibilitychange', beimVerbergen)
      window.removeEventListener('pagehide', beimVerlassen)
      void flush()
    }
  }, [flush, user])

  return {
    attempts,
    loading: !!user && isPending,
    logAttempt,
    flush,
    refetch: () => qc.invalidateQueries({ queryKey: qk.attempts(userId, courseId) }),
  }
}
