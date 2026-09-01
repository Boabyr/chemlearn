import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { qk } from '../lib/queryKeys'
import { abholen, nachtragen, quittieren } from '../lib/outbox'
import { schedule, initialState, isDue, type Grade, type ReviewState } from '../lib/learning/sm2'
import type { DueItem } from '../lib/learning/sessionBuilder'

export type ItemType = 'card' | 'question'

export interface ReviewRow extends ReviewState {
  itemType: ItemType
  itemId: string
  topicId: string
}

interface ReviewZeile {
  user_id: string
  item_type: ItemType
  item_id: string
  course_id: string
  topic_id: string
  ease: number
  interval_days: number
  reps: number
  lapses: number
  due_at: string
  last_reviewed_at: string
}

/** Schlüssel einer Karteikarte in der reviews-Tabelle. */
export function cardItemId(topicId: string, cardIndex: number): string {
  return `${topicId}#${cardIndex}`
}

async function wiederholungenLaden(userId: string, courseId?: string): Promise<ReviewRow[]> {
  let query = supabase
    .from('reviews')
    .select('item_type, item_id, topic_id, ease, interval_days, reps, lapses, due_at, last_reviewed_at')
    .eq('user_id', userId)
  if (courseId) query = query.eq('course_id', courseId)

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []).map(d => ({
    itemType: d.item_type as ItemType,
    itemId: d.item_id,
    topicId: d.topic_id,
    ease: Number(d.ease),
    intervalDays: d.interval_days,
    reps: d.reps,
    lapses: d.lapses,
    dueAt: d.due_at,
    lastReviewedAt: d.last_reviewed_at,
  }))
}

/** Fälligkeit hängt am Uhrzeigerstand — ohne Takt bliebe die Zahl bis zum nächsten Render stehen. */
function useMinutentakt() {
  const [jetzt, setJetzt] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setJetzt(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  return jetzt
}

/**
 * Wiederholungsplanung: hält den SM-2-Zustand aller Elemente eines Kurses
 * und nimmt Bewertungen entgegen.
 */
export function useReviews(courseId?: string) {
  const { user } = useAuth()
  const qc = useQueryClient()
  const userId = user?.id ?? 'anonym'
  const jetzt = useMinutentakt()

  const { data: reviews = [], isPending } = useQuery({
    queryKey: qk.reviews(userId, courseId),
    queryFn: () => wiederholungenLaden(user!.id, courseId),
    enabled: !!user,
  })

  const korbLeeren = useCallback(async () => {
    const pakete = await abholen<ReviewZeile>('reviews')
    for (const paket of pakete) {
      const { error } = await supabase.from('reviews')
        .upsert(paket.zeilen, { onConflict: 'user_id,item_type,item_id' })
      if (error) return
      await quittieren(paket.id)
    }
  }, [])

  useEffect(() => { if (user) void korbLeeren() }, [user, korbLeeren])

  /**
   * Bewertung eintragen und den nächsten Termin berechnen.
   *
   * Der Ausgangszustand kommt aus dem Cache statt aus einer Render-Kopie —
   * zwei Bewertungen kurz hintereinander rechneten sonst beide vom alten Stand.
   */
  const gradeItem = useCallback(async (
    item: { itemType: ItemType; itemId: string; topicId: string; courseId: string },
    grade: Grade,
  ) => {
    if (!user) return
    const schluessel = qk.reviews(user.id, courseId)
    const aktuell = qc.getQueryData<ReviewRow[]>(schluessel) ?? []
    const vorher = aktuell.find(r => r.itemType === item.itemType && r.itemId === item.itemId)

    const now = new Date()
    const nachher = schedule(vorher ?? initialState(now), grade, now)
    const zeile: ReviewRow = { ...nachher, itemType: item.itemType, itemId: item.itemId, topicId: item.topicId }

    const ersetzen = (alt: ReviewRow[] | undefined) => [
      ...(alt ?? []).filter(r => !(r.itemType === item.itemType && r.itemId === item.itemId)),
      zeile,
    ]
    qc.setQueryData<ReviewRow[]>(schluessel, ersetzen)
    if (courseId) qc.setQueryData<ReviewRow[]>(qk.reviews(user.id, undefined), ersetzen)

    const daten: ReviewZeile = {
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
    }

    const { error } = await supabase.from('reviews')
      .upsert(daten, { onConflict: 'user_id,item_type,item_id' })
    if (error) {
      console.error('Wiederholung speichern fehlgeschlagen, zurückgelegt:', error.message)
      await nachtragen('reviews', [daten])
    }
    return nachher
  }, [user, courseId, qc])

  const dueNow = reviews.filter(r => isDue(r, jetzt))
  const dueQuestions: DueItem[] = dueNow
    .filter(r => r.itemType === 'question')
    .map(r => ({ itemId: r.itemId, dueAt: r.dueAt }))

  return {
    reviews,
    loading: !!user && isPending,
    gradeItem,
    dueCount: dueNow.length,
    dueQuestions,
    dueCards: dueNow.filter(r => r.itemType === 'card'),
    refetch: () => qc.invalidateQueries({ queryKey: qk.reviews(userId, courseId) }),
  }
}
