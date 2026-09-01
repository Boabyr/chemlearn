import { tageDazwischen } from '../zeit/datum'

export interface StreakZustand {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
}

/**
 * Ein Tag Nachsicht.
 *
 * Eine Serie, die beim ersten verpassten Tag zerbricht, bestraft einen
 * Klausurtag oder eine Zugfahrt härter als das Nichtlernen selbst. Nach zwei
 * verpassten Tagen fängt sie neu an.
 */
export const GNADENTAGE = 1

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

  const luecke = tageDazwischen(bisher.lastActiveDate, heute)
  const current = luecke <= 1 + GNADENTAGE ? bisher.currentStreak + 1 : 1
  return {
    currentStreak: current,
    longestStreak: Math.max(current, bisher.longestStreak),
    lastActiveDate: heute,
  }
}
