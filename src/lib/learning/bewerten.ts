import type { ExamQuestion } from '../../data/exams'

export interface Antwort {
  auswahl?: number[]
  zahl?: string
  reihenfolge?: number[]
}

export interface Bewertung {
  /** Liegt überhaupt eine auswertbare Antwort vor? Sonst ist es kein Versuch. */
  gueltig: boolean
  korrekt: boolean
  punkte: number
}

const UNGUELTIG: Bewertung = { gueltig: false, korrekt: false, punkte: 0 }

/**
 * Zahl aus einer Eingabe lesen — deutsche Kommaschreibweise inklusive.
 *
 * `parseFloat('')` ergab NaN, und `Math.abs(NaN - ziel) <= toleranz` ist
 * `false`: eine leere oder vertippte Eingabe wurde als falsche Antwort
 * gewertet und verdarb den Lernstand.
 */
export function leseZahl(eingabe: string): number | null {
  const bereinigt = eingabe.trim().replace(/\s/g, '').replace(',', '.')
  if (bereinigt === '') return null
  if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(bereinigt)) return null
  const zahl = Number(bereinigt)
  return Number.isFinite(zahl) ? zahl : null
}

export function bewerte(frage: ExamQuestion, antwort: Antwort): Bewertung {
  const treffer = (korrekt: boolean): Bewertung =>
    ({ gueltig: true, korrekt, punkte: korrekt ? frage.points : 0 })

  switch (frage.type) {
    case 'mc-single': {
      const auswahl = antwort.auswahl ?? []
      if (auswahl.length === 0) return UNGUELTIG
      return treffer(auswahl[0] === frage.correct)
    }

    case 'mc-multi': {
      const auswahl = antwort.auswahl ?? []
      if (auswahl.length === 0) return UNGUELTIG
      const richtig = frage.correct as number[]
      return treffer(
        richtig.length === auswahl.length && richtig.every(c => auswahl.includes(c)),
      )
    }

    case 'numeric': {
      const wert = leseZahl(antwort.zahl ?? '')
      if (wert === null) return UNGUELTIG
      const ziel = frage.correct as number
      const toleranz = frage.tolerance ?? Math.abs(ziel) * 0.02
      return treffer(Math.abs(wert - ziel) <= toleranz)
    }

    case 'order': {
      const reihenfolge = antwort.reihenfolge ?? []
      const richtig = frage.correct as number[]
      if (reihenfolge.length !== richtig.length) return UNGUELTIG
      return treffer(reihenfolge.every((v, i) => v === richtig[i]))
    }

    default:
      return UNGUELTIG
  }
}
