import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

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

export function useProgress(courseId?: string) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<TopicProgress[]>([])
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastActiveDate: '' })
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      let query = supabase.from('progress').select('*').eq('user_id', user.id)
      if (courseId) query = query.eq('course_id', courseId)
      const { data } = await query
      if (data) {
        setProgress(data.map(d => ({
          topicId: d.topic_id,
          courseId: d.course_id,
          completed: d.completed,
          quizScore: d.quiz_score,
          lastSeen: d.last_seen,
        })))
      }

      const { data: streakData } = await supabase
        .from('streaks').select('*').eq('user_id', user.id).single()
      if (streakData) {
        setStreak({
          currentStreak: streakData.current_streak,
          longestStreak: streakData.longest_streak,
          lastActiveDate: streakData.last_active_date,
        })
      }
    } catch (e) {
      console.error('Progress fetch error:', e)
    }
    setLoading(false)
  }, [user, courseId])

  useEffect(() => { fetchProgress() }, [fetchProgress])

  const markTopicSeen = useCallback(async (topicId: string, cId: string) => {
    if (!user) return
    await supabase.from('progress').upsert({
      user_id: user.id,
      course_id: cId,
      topic_id: topicId,
      last_seen: new Date().toISOString(),
    }, { onConflict: 'user_id,course_id,topic_id' })
    await updateStreak()
    fetchProgress()
  }, [user, fetchProgress])

  const markTopicComplete = useCallback(async (topicId: string, cId: string, quizScore: number) => {
    if (!user) return
    await supabase.from('progress').upsert({
      user_id: user.id,
      course_id: cId,
      topic_id: topicId,
      completed: true,
      quiz_score: quizScore,
      last_seen: new Date().toISOString(),
    }, { onConflict: 'user_id,course_id,topic_id' })
    await updateStreak()
    fetchProgress()
  }, [user, fetchProgress])

  const updateStreak = useCallback(async () => {
    if (!user) return
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase.from('streaks').select('*').eq('user_id', user.id).single()

    if (!data) {
      await supabase.from('streaks').insert({
        user_id: user.id, current_streak: 1, longest_streak: 1, last_active_date: today
      })
      return
    }

    const last = data.last_active_date
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (last === today) return // schon heute aktiv
    const newStreak = last === yesterday ? data.current_streak + 1 : 1
    const longest = Math.max(newStreak, data.longest_streak)

    await supabase.from('streaks').update({
      current_streak: newStreak,
      longest_streak: longest,
      last_active_date: today,
    }).eq('user_id', user.id)
  }, [user])

  return { progress, streak, loading, markTopicSeen, markTopicComplete, refetch: fetchProgress }
}
