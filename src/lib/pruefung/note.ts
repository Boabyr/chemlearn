import type { Notenstufe } from '../../content/schema'

export interface Notenstand {
  /** Aufgerundete Punkte, wie die Ordnung sie zählt. */
  punkte: number
  note: string
  bestanden: boolean
}

/**
 * Note aus erreichten Punkten.
 *
 * Aufgerundet wird vor dem Vergleich, nicht danach: 20,1 Punkte sind nach der
 * Ordnung 21 und damit befriedigend. Wer erst vergleicht und dann rundet,
 * verschenkt eine Note.
 */
export function noteFuer(punkte: number, noten: Notenstufe[]): Notenstand {
  const ganz = Math.ceil(punkte)
  if (noten.length === 0) return { punkte: ganz, note: '', bestanden: true }

  const treffer = noten.find(stufe => ganz >= stufe.ab)
  if (!treffer) return { punkte: ganz, note: 'nicht genügend', bestanden: false }
  return { punkte: ganz, note: treffer.note, bestanden: true }
}
