import type { Ordnung } from '../../content/schema'
import type { ExamQuestion } from '../../data/exams'

export interface Ziehung {
  fragen: ExamQuestion[]
  /** Gebiete, für die der Bestand nicht reichte — als Klartext für die Anzeige. */
  luecken: string[]
}

/** Mischen mit übergebener Zufallsquelle, damit ein Test das Ergebnis festlegen kann. */
function gemischt<T>(liste: T[], zufall: () => number): T[] {
  const a = [...liste]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(zufall() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Prüfung nach der Ordnung ziehen.
 *
 * Je Gebiet wird zuerst aus möglichst verschiedenen Kapiteln gezogen; erst
 * wenn ein Gebiet weniger Kapitel als Fragen hat, kommt ein zweites Mal
 * dasselbe Kapitel an die Reihe. Reicht der Bestand nicht, wird die Fehlmenge
 * gemeldet und **nicht** aus einem anderen Gebiet ersetzt — ein zu dünner
 * Bestand soll auffallen, nicht den Zuschnitt der Prüfung still verschieben.
 */
export function ziehePruefung(
  ordnung: Ordnung,
  bestand: ExamQuestion[],
  zufall: () => number = Math.random,
): Ziehung {
  const gezogen: ExamQuestion[] = []
  const luecken: string[] = []
  // Gebietsübergreifend: Überschneiden sich die Kapitel zweier Gebiete, darf
  // dieselbe Frage trotzdem nur einmal in der ganzen Prüfung landen.
  const verbraucht = new Set<string>()

  for (const gebiet of ordnung.gebiete) {
    const ausGebiet: ExamQuestion[] = []

    while (ausGebiet.length < gebiet.fragen) {
      const genutzteThemen = new Set(ausGebiet.map(f => f.topicId))
      const offen = bestand.filter(f =>
        gebiet.topics.includes(f.topicId) && !verbraucht.has(f.id))
      const bevorzugt = offen.filter(f => !genutzteThemen.has(f.topicId))
      const auswahl = bevorzugt.length > 0 ? bevorzugt : offen
      if (auswahl.length === 0) break

      const gewaehlt = gemischt(auswahl, zufall)[0]
      verbraucht.add(gewaehlt.id)
      ausGebiet.push(gewaehlt)
    }

    if (ausGebiet.length < gebiet.fragen) {
      luecken.push(`${gebiet.titel}: nur ${ausGebiet.length} von ${gebiet.fragen} Fragen`)
    }
    gezogen.push(...ausGebiet)
  }

  return { fragen: gemischt(gezogen, zufall), luecken }
}
