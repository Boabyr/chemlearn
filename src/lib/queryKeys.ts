/**
 * Alle Query-Schlüssel an einer Stelle. Vorher zog jede Seite, die
 * `useMastery` einhängte, die komplette Versuchshistorie neu — auf dem
 * Dashboard mehrfach dieselbe Abfrage.
 */
export const qk = {
  rollen:   (userId: string) => ['rollen', userId] as const,
  progress: (userId: string, courseId?: string) => ['progress', userId, courseId ?? 'alle'] as const,
  streak:   (userId: string) => ['streak', userId] as const,
  attempts: (userId: string, courseId?: string) => ['attempts', userId, courseId ?? 'alle'] as const,
  reviews:  (userId: string, courseId?: string) => ['reviews', userId, courseId ?? 'alle'] as const,
}
