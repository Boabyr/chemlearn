import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import type { AttemptLike } from '../lib/learning/mastery'

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

/** Wartezeit, bevor gepufferte Versuche geschrieben werden. */
const FLUSH_MS = 1500

/**
 * Antwort-Historie: liest die Versuche des Kurses und nimmt neue entgegen.
 *
 * Geschrieben wird gebündelt — beim Durchklicken eines Quiz entsteht sonst
 * ein Netzwerkaufruf je Frage.
 */
export function useAttempts(courseId?: string) {
  const { user } = useAuth()
  const [attempts, setAttempts] = useState<AttemptLike[]>([])
  const [loading, setLoading] = useState(true)

  const buffer = useRef<AttemptInput[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchAttempts = useCallback(async () => {
    if (!user) { setAttempts([]); setLoading(false); return }
    setLoading(true)
    let query = supabase
      .from('attempts')
      .select('topic_id, question_id, correct, answered_at')
      .eq('user_id', user.id)
      .order('answered_at', { ascending: false })
      .limit(5000)
    if (courseId) query = query.eq('course_id', courseId)

    const { data, error } = await query
    if (error) console.error('Versuche laden fehlgeschlagen:', error.message)
    if (data) {
      setAttempts(data.map(d => ({
        topicId: d.topic_id,
        questionId: d.question_id,
        correct: d.correct,
        answeredAt: d.answered_at,
      })))
    }
    setLoading(false)
  }, [user, courseId])

  useEffect(() => { fetchAttempts() }, [fetchAttempts])

  const flush = useCallback(async () => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null }
    const pending = buffer.current
    if (!user || pending.length === 0) return
    buffer.current = []

    const { error } = await supabase.from('attempts').insert(
      pending.map(a => ({
        user_id: user.id,
        course_id: a.courseId,
        topic_id: a.topicId,
        question_id: a.questionId,
        source: a.source,
        correct: a.correct,
        points_earned: a.pointsEarned ?? (a.correct ? 1 : 0),
        points_possible: a.pointsPossible ?? 1,
        ms_taken: a.msTaken ?? null,
      }))
    )
    if (error) console.error('Versuche speichern fehlgeschlagen:', error.message)
  }, [user])

  /** Einen Versuch vormerken. Die Anzeige aktualisiert sich sofort. */
  const logAttempt = useCallback((input: AttemptInput) => {
    if (!user) return
    buffer.current.push(input)
    setAttempts(prev => [{
      topicId: input.topicId,
      questionId: input.questionId,
      correct: input.correct,
      answeredAt: new Date().toISOString(),
    }, ...prev])

    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { void flush() }, FLUSH_MS)
  }, [user, flush])

  // Offene Versuche nicht verlieren, wenn die Seite verlassen wird.
  useEffect(() => {
    const onLeave = () => { void flush() }
    window.addEventListener('pagehide', onLeave)
    return () => {
      window.removeEventListener('pagehide', onLeave)
      void flush()
    }
  }, [flush])

  return { attempts, loading, logAttempt, flush, refetch: fetchAttempts }
}
