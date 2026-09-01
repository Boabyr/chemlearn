/**
 * Quizstand aus den Einzelergebnissen.
 *
 * Bisher lief ein Zähler mit, und beim Abschluss wurde die letzte Antwort
 * noch einmal dazugerechnet — ein volles Quiz landete als 117 % in der
 * Datenbank. Aus einer Liste von Ergebnissen lässt sich das nicht mehr
 * doppelt zählen.
 */
export function richtige(ergebnisse: boolean[]): number {
  return ergebnisse.filter(Boolean).length
}

export function prozent(ergebnisse: boolean[], gesamt: number): number {
  if (gesamt <= 0) return 0
  return Math.round((richtige(ergebnisse) / gesamt) * 100)
}
