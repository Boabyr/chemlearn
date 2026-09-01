import { lokalesDatum, tageDazwischen } from '../zeit/datum'

/**
 * Auswertung der Antwort-Historie.
 *
 * `attempts` trägt seit jeher `answered_at`, `ms_taken` und `points_earned` —
 * angezeigt wurde davon nie etwas außer dem Mastery-Schnappschuss. Diese
 * Funktionen sind rein, damit die Zahlen prüfbar sind statt im Diagramm zu
 * entstehen.
 */

export interface StatistikVersuch {
  topicId: string
  questionId: string
  correct: boolean
  answeredAt: string
  msTaken?: number | null
  source?: string
}

export interface TagesWert {
  datum: string
  gesamt: number
  richtig: number
  /** Trefferquote des Tages, oder null an Tagen ohne Antwort. */
  quote: number | null
  sekunden: number
}

/** Zeitzone einmal bestimmen und durchreichen — sonst rechnet jede Zeile neu. */
function tagesreihe(bis: Date, tage: number, zeitzone?: string): string[] {
  const reihe: string[] = []
  for (let i = tage - 1; i >= 0; i--) {
    reihe.push(lokalesDatum(new Date(bis.getTime() - i * 86_400_000), zeitzone))
  }
  return reihe
}

/** Verlauf der letzten `tage` Tage, lückenlos — auch Tage ohne Antwort. */
export function tagesverlauf(
  versuche: StatistikVersuch[],
  tage = 30,
  jetzt = new Date(),
  zeitzone?: string,
): TagesWert[] {
  const leer = () => ({ gesamt: 0, richtig: 0, sekunden: 0 })
  const jeTag = new Map<string, ReturnType<typeof leer>>()

  for (const versuch of versuche) {
    const tag = lokalesDatum(new Date(versuch.answeredAt), zeitzone)
    const eintrag = jeTag.get(tag) ?? leer()
    eintrag.gesamt += 1
    if (versuch.correct) eintrag.richtig += 1
    eintrag.sekunden += Math.min(300, Math.max(0, (versuch.msTaken ?? 0) / 1000))
    jeTag.set(tag, eintrag)
  }

  return tagesreihe(jetzt, tage, zeitzone).map(datum => {
    const eintrag = jeTag.get(datum) ?? leer()
    return {
      datum,
      gesamt: eintrag.gesamt,
      richtig: eintrag.richtig,
      quote: eintrag.gesamt > 0 ? eintrag.richtig / eintrag.gesamt : null,
      sekunden: Math.round(eintrag.sekunden),
    }
  })
}

export interface Eckdaten {
  antworten: number
  richtig: number
  quote: number
  sekunden: number
  lerntage: number
}

export function eckdaten(versuche: StatistikVersuch[], zeitzone?: string): Eckdaten {
  const tage = new Set<string>()
  let richtig = 0
  let sekunden = 0

  for (const versuch of versuche) {
    tage.add(lokalesDatum(new Date(versuch.answeredAt), zeitzone))
    if (versuch.correct) richtig += 1
    sekunden += Math.min(300, Math.max(0, (versuch.msTaken ?? 0) / 1000))
  }

  return {
    antworten: versuche.length,
    richtig,
    quote: versuche.length > 0 ? richtig / versuche.length : 0,
    sekunden: Math.round(sekunden),
    lerntage: tage.size,
  }
}

export interface FaelligTag {
  datum: string
  anzahl: number
  /** Bereits überfällig, nicht erst in Zukunft. */
  ueberfaellig: boolean
}

/**
 * Vorschau auf die kommenden Tage.
 *
 * Alles, was schon überfällig ist, wird auf den ersten Tag gelegt — verteilt
 * über die Vergangenheit sagt es nichts darüber, was heute zu tun ist.
 */
export function faelligkeitsVorschau(
  plaene: { dueAt: string }[],
  tage = 14,
  jetzt = new Date(),
  zeitzone?: string,
): FaelligTag[] {
  const reihe = tagesreihe(new Date(jetzt.getTime() + (tage - 1) * 86_400_000), tage, zeitzone)
  const heute = reihe[0]
  const jeTag = new Map<string, number>()

  for (const plan of plaene) {
    const faellig = new Date(plan.dueAt)
    const tag = faellig.getTime() <= jetzt.getTime() ? heute : lokalesDatum(faellig, zeitzone)
    if (!reihe.includes(tag)) continue
    jeTag.set(tag, (jeTag.get(tag) ?? 0) + 1)
  }

  return reihe.map(datum => ({
    datum,
    anzahl: jeTag.get(datum) ?? 0,
    ueberfaellig: datum === heute,
  }))
}

/**
 * Wann ist die Prüfung geschafft?
 *
 * Reiner Dreisatz auf dem bisherigen Tempo: aus dem Zuwachs der Reife je
 * Lerntag folgt, wie viele Tage bis zur Zielmarke fehlen. Ohne Verlauf oder
 * ohne Fortschritt gibt es keine Aussage — dann lieber nichts sagen als raten.
 */
export function reifePrognose(
  verlauf: TagesWert[],
  reifeJetzt: number,
  ziel = 0.8,
): { tage: number; erreichbar: boolean } | null {
  if (reifeJetzt >= ziel) return { tage: 0, erreichbar: true }

  const lerntage = verlauf.filter(t => t.gesamt > 0)
  if (lerntage.length < 3) return null

  const erste = lerntage.slice(0, Math.ceil(lerntage.length / 2))
  const letzte = lerntage.slice(Math.ceil(lerntage.length / 2))
  const mittel = (tage: TagesWert[]) =>
    tage.reduce((s, t) => s + (t.quote ?? 0), 0) / Math.max(1, tage.length)

  const zuwachsJeTag = (mittel(letzte) - mittel(erste)) / Math.max(1, letzte.length)
  if (zuwachsJeTag <= 0.0005) return { tage: 0, erreichbar: false }

  return { tage: Math.ceil((ziel - reifeJetzt) / zuwachsJeTag), erreichbar: true }
}

/** Tage bis zu einem Termin, negativ wenn er vorbei ist. */
export function tageBis(termin: string, jetzt = new Date(), zeitzone?: string): number {
  return tageDazwischen(lokalesDatum(jetzt, zeitzone), termin)
}
