/**
 * SM-2 Terminplanung für Karteikarten und Prüfungsfragen.
 *
 * Reine Rechenlogik ohne Datenbank: der aufrufende Hook lädt den Zustand,
 * reicht ihn hier durch und schreibt das Ergebnis zurück.
 */

/** Bewertung durch den Lernenden. */
export const GRADES = {
  NOCHMAL: 0,
  SCHWER: 1,
  GUT: 2,
  LEICHT: 3,
} as const

export type Grade = 0 | 1 | 2 | 3

export const DEFAULT_EASE = 2.5
export const MIN_EASE = 1.3

/**
 * Wie lange „Nochmal" ein Element wegschiebt.
 *
 * Vorher war das ein ganzer Tag — wer eine Karte nicht konnte, sah sie in
 * derselben Sitzung nie wieder und musste bis morgen warten. Zehn Minuten
 * holen sie in dieselbe Runde zurück.
 */
export const RELERN_MINUTEN = 10

/** Ab wie vielen Rückfällen ein Element als hartnäckig gilt. */
export const LEECH_GRENZE = 8

/** Ab dieser Länge werden Intervalle gestreut, damit keine Stapel-Berge entstehen. */
const STREUUNG_AB_TAGEN = 4
const STREUUNG = 0.05

export interface ReviewState {
  ease: number
  intervalDays: number
  reps: number
  lapses: number
  dueAt: string
  lastReviewedAt: string
}

export function initialState(now: Date = new Date()): ReviewState {
  return {
    ease: DEFAULT_EASE,
    intervalDays: 0,
    reps: 0,
    lapses: 0,
    dueAt: now.toISOString(),
    lastReviewedAt: now.toISOString(),
  }
}

/** Die vier Knöpfe auf die Qualitätsskala 0–5 des Originalverfahrens abbilden. */
const QUALITY: Record<Grade, number> = { 0: 2, 1: 3, 2: 4, 3: 5 }

function nextEase(ease: number, grade: Grade): number {
  const q = QUALITY[grade]
  const delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
  return Math.max(MIN_EASE, Number((ease + delta).toFixed(4)))
}

function addDays(from: Date, days: number): string {
  return new Date(from.getTime() + days * 86_400_000).toISOString()
}

function addMinutes(from: Date, minutes: number): string {
  return new Date(from.getTime() + minutes * 60_000).toISOString()
}

/**
 * Intervall leicht streuen.
 *
 * Ohne Streuung landen alle Elemente einer Lernrunde für immer am selben Tag,
 * und ein Jahr später steht ein Berg von hundert Karten an einem Tag.
 */
function streue(tage: number, zufall: () => number): number {
  if (tage < STREUUNG_AB_TAGEN) return tage
  const spanne = tage * STREUUNG
  return Math.max(1, Math.round(tage + (zufall() * 2 - 1) * spanne))
}

/** Hartnäckiges Element: fällt immer wieder durch und blockiert die Sitzung. */
export function istLeech(state: Pick<ReviewState, 'lapses'>): boolean {
  return state.lapses >= LEECH_GRENZE
}

/**
 * Berechnet den nächsten Wiederholungstermin.
 * Der übergebene Zustand bleibt unverändert.
 */
export interface PlanungsOptionen {
  /** Quelle für die Intervall-Streuung. Für Tests einsetzbar. */
  zufall?: () => number
}

export function schedule(
  state: ReviewState,
  grade: Grade,
  now: Date = new Date(),
  { zufall = Math.random }: PlanungsOptionen = {},
): ReviewState {
  const ease = nextEase(state.ease, grade)

  // „Nochmal": in dieselbe Sitzung zurückholen, Rückfall vermerken.
  if (grade === GRADES.NOCHMAL) {
    return {
      ease,
      intervalDays: 0,
      reps: 0,
      lapses: state.lapses + 1,
      dueAt: addMinutes(now, RELERN_MINUTEN),
      lastReviewedAt: now.toISOString(),
    }
  }

  const reps = state.reps + 1
  let intervalDays: number
  if (reps === 1) intervalDays = 1
  else if (reps === 2) intervalDays = 6
  else intervalDays = streue(Math.round(state.intervalDays * ease), zufall)

  return {
    ease,
    intervalDays,
    reps,
    lapses: state.lapses,
    dueAt: addDays(now, intervalDays),
    lastReviewedAt: now.toISOString(),
  }
}

/** Ist das Element jetzt zur Wiederholung fällig? */
export function isDue(state: Pick<ReviewState, 'dueAt'>, now: Date = new Date()): boolean {
  return new Date(state.dueAt).getTime() <= now.getTime()
}
