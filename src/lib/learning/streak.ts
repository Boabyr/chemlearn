import { istGestern } from '../zeit/datum'

export interface StreakZustand {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
}

/**
 * Nächster Serienstand — oder `null`, wenn nichts zu schreiben ist.
 *
 * Rein, damit die Regel prüfbar ist. Das atomare Schreiben übernimmt die
 * RPC `streak_touch` in der Datenbank; zwei offene Tabs haben sonst je einen
 * Lese-dann-Schreib-Durchlauf und zählen doppelt.
 */
export function naechsterStreak(
  bisher: StreakZustand | null,
  heute: string,
): StreakZustand | null {
  if (!bisher) return { currentStreak: 1, longestStreak: 1, lastActiveDate: heute }
  if (bisher.lastActiveDate >= heute) return null

  const current = istGestern(bisher.lastActiveDate, heute) ? bisher.currentStreak + 1 : 1
  return {
    currentStreak: current,
    longestStreak: Math.max(current, bisher.longestStreak),
    lastActiveDate: heute,
  }
}
