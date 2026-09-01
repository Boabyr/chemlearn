import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { qk } from '../lib/queryKeys'
import { serieFortschreiben } from '../lib/serie'

/** Die Funktion gibt es in dieser Datenbank (noch) nicht — Migration 002 fehlt. */
function rpcFehlt(code?: string, meldung?: string): boolean {
  return code === 'PGRST202' || code === '42883' ||
    (meldung?.includes('Could not find the function') ?? false)
}

export interface TopicProgress {
  topicId: string
  courseId: string
  completed: boolean
  quizScore: number
  lastSeen: string
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
}

const LEERE_SERIE: StreakData = { currentStreak: 0, longestStreak: 0, lastActiveDate: '' }

async function fortschrittLaden(userId: string, courseId?: string): Promise<TopicProgress[]> {
  let query = supabase.from('progress').select('*').eq('user_id', userId)
  if (courseId) query = query.eq('course_id', courseId)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []).map(d => ({
    topicId: d.topic_id,
    courseId: d.course_id,
    completed: d.completed,
    quizScore: d.quiz_score,
    lastSeen: d.last_seen,
  }))
}

async function serieLaden(userId: string): Promise<StreakData> {
  // maybeSingle: für neue Konten gibt es die Zeile noch nicht, und `single()`
  // warf dafür jedes Mal einen Fehler in die Konsole.
  const { data, error } = await supabase
    .from('streaks').select('*').eq('user_id', userId).maybeSingle()
  if (error) throw new Error(error.message)
  if (!data) return LEERE_SERIE
  return {
    currentStreak: data.current_streak,
    longestStreak: data.longest_streak,
    lastActiveDate: data.last_active_date ?? '',
  }
}

export function useProgress(courseId?: string) {
  const { user } = useAuth()
  const qc = useQueryClient()
  const userId = user?.id ?? 'anonym'

  const progressQuery = useQuery({
    queryKey: qk.progress(userId, courseId),
    queryFn: () => fortschrittLaden(user!.id, courseId),
    enabled: !!user,
  })

  const streakQuery = useQuery({
    queryKey: qk.streak(userId),
    queryFn: () => serieLaden(user!.id),
    enabled: !!user,
  })

  const serieAntippen = useCallback(async () => {
    if (!user) return
    await serieFortschreiben(user.id)
    await qc.invalidateQueries({ queryKey: qk.streak(user.id) })
  }, [user, qc])

  const beruehren = useMutation({
    mutationFn: async (
      { topicId, courseId: cId, completed, quizScore }:
      { topicId: string; courseId: string; completed?: boolean; quizScore?: number },
    ) => {
      const { error } = await supabase.rpc('progress_touch', {
        p_course_id: cId,
        p_topic_id: topicId,
        p_completed: completed ?? false,
        p_quiz_score: quizScore ?? null,
      })
      if (!error) return
      if (!rpcFehlt(error.code, error.message)) throw new Error(error.message)

      // Ohne Migration 002: Bestwert im Client bilden, damit ein schlechterer
      // Durchlauf den gespeicherten Wert wenigstens hier nicht drückt.
      const vorhanden = qc.getQueryData<TopicProgress[]>(qk.progress(userId, cId))
        ?.find(p => p.topicId === topicId && p.courseId === cId)
      const { error: fehler } = await supabase.from('progress').upsert({
        user_id: user!.id,
        course_id: cId,
        topic_id: topicId,
        completed: (vorhanden?.completed ?? false) || (completed ?? false),
        quiz_score: Math.max(vorhanden?.quizScore ?? 0, quizScore ?? 0),
        last_seen: new Date().toISOString(),
      }, { onConflict: 'user_id,course_id,topic_id' })
      if (fehler) throw new Error(fehler.message)
    },
    onSuccess: async (_daten, variablen) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: qk.progress(userId, variablen.courseId) }),
        qc.invalidateQueries({ queryKey: qk.progress(userId, undefined) }),
      ])
      await serieAntippen()
    },
  })

  const beruehrenMutate = beruehren.mutate
  const markTopicSeen = useCallback((topicId: string, cId: string) => {
    if (!user) return
    beruehrenMutate({ topicId, courseId: cId })
  }, [user, beruehrenMutate])

  const markTopicComplete = useCallback((topicId: string, cId: string, quizScore: number) => {
    if (!user) return
    beruehrenMutate({ topicId, courseId: cId, completed: true, quizScore })
  }, [user, beruehrenMutate])

  return {
    progress: progressQuery.data ?? [],
    streak: streakQuery.data ?? LEERE_SERIE,
    loading: !!user && (progressQuery.isPending || streakQuery.isPending),
    markTopicSeen,
    markTopicComplete,
    refetch: () => qc.invalidateQueries({ queryKey: qk.progress(userId, courseId) }),
  }
}
