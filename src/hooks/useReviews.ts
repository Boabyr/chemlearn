import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { schedule, initialState, isDue, type Grade, type ReviewState } from '../lib/learning/sm2'
import type { DueItem } from '../lib/learning/sessionBuilder'

export type ItemType = 'card' | 'question'

export interface ReviewRow extends ReviewState {
  itemType: ItemType
  itemId: string
  topicId: string
}

/** Schlüssel einer Karteikarte in der reviews-Tabelle. */
export function cardItemId(topicId: string, cardIndex: number): string {
  return `${topicId}#${cardIndex}`
}

/**
 * Wiederholungsplanung: hält den SM-2-Zustand aller Elemente eines Kurses
 * und nimmt Bewertungen entgegen.
 */
export function useReviews(courseId?: string) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = useCallback(async () => {
    if (!user) { setReviews([]); setLoading(false); return }
    setLoading(true)
    let query = supabase
      .from('reviews')
      .select('item_type, item_id, topic_id, ease, interval_days, reps, lapses, due_at, last_reviewed_at')
      .eq('user_id', user.id)
    if (courseId) query = query.eq('course_id', courseId)

    const { data, error } = await query
    if (error) console.error('Wiederholungen laden fehlgeschlagen:', error.message)
    if (data) {
      setReviews(data.map(d => ({
        itemType: d.item_type as ItemType,
        itemId: d.item_id,
        topicId: d.topic_id,
        ease: Number(d.ease),
        intervalDays: d.interval_days,
        reps: d.reps,
        lapses: d.lapses,
        dueAt: d.due_at,
        lastReviewedAt: d.last_reviewed_at,
      })))
    }
    setLoading(false)
  }, [user, courseId])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  /**
   * Bewertung eintragen und den nächsten Termin berechnen.
   * Der Zustand liegt bereits im Speicher — kein Lesezugriff nötig.
   */
  const gradeItem = useCallback(async (
    item: { itemType: ItemType; itemId: string; topicId: string; courseId: string },
    grade: Grade,
  ) => {
    if (!user) return
    const now = new Date()
    const vorher = reviews.find(r => r.itemType === item.itemType && r.itemId === item.itemId)
    const nachher = schedule(vorher ?? initialState(now), grade, now)

    setReviews(prev => {
      const rest = prev.filter(r => !(r.itemType === item.itemType && r.itemId === item.itemId))
      return [...rest, { ...nachher, itemType: item.itemType, itemId: item.itemId, topicId: item.topicId }]
    })

    const { error } = await supabase.from('reviews').upsert({
      user_id: user.id,
      item_type: item.itemType,
      item_id: item.itemId,
      course_id: item.courseId,
      topic_id: item.topicId,
      ease: nachher.ease,
      interval_days: nachher.intervalDays,
      reps: nachher.reps,
      lapses: nachher.lapses,
      due_at: nachher.dueAt,
      last_reviewed_at: nachher.lastReviewedAt,
    }, { onConflict: 'user_id,item_type,item_id' })

    if (error) console.error('Wiederholung speichern fehlgeschlagen:', error.message)
    return nachher
  }, [user, reviews])

  const now = new Date()
  const dueNow = reviews.filter(r => isDue(r, now))
  const dueQuestions: DueItem[] = dueNow
    .filter(r => r.itemType === 'question')
    .map(r => ({ itemId: r.itemId, dueAt: r.dueAt }))

  return {
    reviews,
    loading,
    gradeItem,
    dueCount: dueNow.length,
    dueQuestions,
    dueCards: dueNow.filter(r => r.itemType === 'card'),
    refetch: fetchReviews,
  }
}
