import { istLeech } from './sm2'
import { topicMastery, type AttemptLike } from './mastery'
import { ohnePraefix, type LernAufgabe } from './lernItem'

/**
 * Die tägliche Runde über alle Kurse.
 *
 * Bis hierher gab es dafür keinen Einstieg: `useReviews` rechnete `dueCards`
 * aus, und niemand las den Wert. Wer eine fällige Karte wiederholen wollte,
 * musste sich merken, aus welchem Thema sie kam.
 *
 * Reihenfolge: erst was überfällig ist, dann was zuletzt falsch war, dann
 * Neues aus den schwächsten Themen.
 */

export interface PlanZustand {
  itemId: string
  dueAt: string
  lapses: number
  reps: number
}

export interface TagesOptionen {
  vorrat: LernAufgabe[]
  plaene: PlanZustand[]
  attempts: AttemptLike[]
  jetzt?: Date
  /** Höchstzahl fälliger Wiederholungen an einem Tag. */
  maxFaellig?: number
  /** Höchstzahl neuer Elemente an einem Tag. */
  maxNeu?: number
  /** Obergrenze für die ganze Runde. */
  laenge?: number
  /** Wie weit der Fehlerstapel zurückreicht. */
  fehlerTage?: number
}

export const STANDARD_MAX_FAELLIG = 60
export const STANDARD_MAX_NEU = 15
export const STANDARD_LAENGE = 40
const STANDARD_FEHLER_TAGE = 7

export function baueTagessitzung({
  vorrat,
  plaene,
  attempts,
  jetzt = new Date(),
  maxFaellig = STANDARD_MAX_FAELLIG,
  maxNeu = STANDARD_MAX_NEU,
  laenge = STANDARD_LAENGE,
  fehlerTage = STANDARD_FEHLER_TAGE,
}: TagesOptionen): LernAufgabe[] {
  const nachId = new Map(vorrat.map(a => [a.itemId, a]))
  const planNachId = new Map(plaene.map(p => [p.itemId, p]))

  const gewaehlt: LernAufgabe[] = []
  const genommen = new Set<string>()

  const nimm = (aufgabe: LernAufgabe | undefined): boolean => {
    if (!aufgabe || genommen.has(aufgabe.itemId) || gewaehlt.length >= laenge) return false
    genommen.add(aufgabe.itemId)
    gewaehlt.push(aufgabe)
    return true
  }

  // 1. Überfälliges, am längsten überfällig zuerst. Hartnäckiges bleibt liegen.
  const faellig = plaene
    .filter(p => new Date(p.dueAt).getTime() <= jetzt.getTime())
    .filter(p => !istLeech(p))
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())

  let ausFaelligen = 0
  for (const p of faellig) {
    if (ausFaelligen >= maxFaellig) break
    if (nimm(nachId.get(p.itemId))) ausFaelligen += 1
  }

  // 2. Fehlerstapel: zuletzt falsch beantwortet und seither nicht richtig.
  const grenze = jetzt.getTime() - fehlerTage * 86_400_000
  const letzterStand = new Map<string, { korrekt: boolean; zeit: number }>()
  for (const versuch of attempts) {
    const zeit = new Date(versuch.answeredAt).getTime()
    if (zeit < grenze) continue
    const bisher = letzterStand.get(versuch.questionId)
    if (!bisher || zeit > bisher.zeit) letzterStand.set(versuch.questionId, { korrekt: versuch.correct, zeit })
  }

  const fehler = vorrat
    .filter(a => {
      const stand = letzterStand.get(ohnePraefix(a.itemId))
      const plan = planNachId.get(a.itemId)
      return stand !== undefined && !stand.korrekt && !(plan && istLeech(plan))
    })
    .sort((a, b) =>
      (letzterStand.get(ohnePraefix(b.itemId))?.zeit ?? 0) - (letzterStand.get(ohnePraefix(a.itemId))?.zeit ?? 0))
  for (const aufgabe of fehler) nimm(aufgabe)

  // 3. Neues aus den schwächsten Themen.
  const versucheJeThema = new Map<string, AttemptLike[]>()
  for (const versuch of attempts) {
    const liste = versucheJeThema.get(versuch.topicId)
    if (liste) liste.push(versuch)
    else versucheJeThema.set(versuch.topicId, [versuch])
  }
  const staerke = new Map<string, number>()
  const staerkeVon = (topicId: string) => {
    if (!staerke.has(topicId)) {
      staerke.set(topicId, topicMastery(versucheJeThema.get(topicId) ?? [], jetzt).score)
    }
    return staerke.get(topicId)!
  }

  const neu = vorrat
    .filter(a => !genommen.has(a.itemId) && !planNachId.has(a.itemId))
    .sort((a, b) => staerkeVon(a.topicId) - staerkeVon(b.topicId))

  let ausNeuen = 0
  for (const aufgabe of neu) {
    if (ausNeuen >= maxNeu) break
    if (nimm(aufgabe)) ausNeuen += 1
  }

  return gewaehlt
}
