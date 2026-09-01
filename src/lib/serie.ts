import { supabase } from './supabase'
import { lokalesDatum } from './zeit/datum'
import { naechsterStreak, type StreakZustand } from './learning/streak'

/**
 * Serie fortschreiben.
 *
 * Liegt hier und nicht in `useProgress`, weil sie von zwei Stellen kommt:
 * beim Öffnen eines Themas und bei jeder aufgezeichneten Antwort. Vorher zählte
 * nur der erste Weg — eine ganze Übungsrunde verlängerte die Serie nicht.
 */

function rpcFehlt(code?: string, meldung?: string): boolean {
  return code === 'PGRST202' || code === '42883' ||
    (meldung?.includes('Could not find the function') ?? false)
}

export async function serieFortschreiben(userId: string): Promise<void> {
  const heute = lokalesDatum()

  const { error } = await supabase.rpc('streak_touch', { p_today: heute })
  if (!error) return
  if (!rpcFehlt(error.code, error.message)) {
    console.error('Serie fortschreiben fehlgeschlagen:', error.message)
    return
  }

  // Ohne Migration 002/004: der alte Weg über zwei Anweisungen.
  const { data } = await supabase.from('streaks').select('*').eq('user_id', userId).maybeSingle()
  const bisher: StreakZustand | null = data
    ? {
      currentStreak: data.current_streak,
      longestStreak: data.longest_streak,
      lastActiveDate: data.last_active_date ?? '',
    }
    : null

  const naechster = naechsterStreak(bisher?.lastActiveDate ? bisher : null, heute)
  if (!naechster) return

  await supabase.from('streaks').upsert({
    user_id: userId,
    current_streak: naechster.currentStreak,
    longest_streak: naechster.longestStreak,
    last_active_date: naechster.lastActiveDate,
  })
}
