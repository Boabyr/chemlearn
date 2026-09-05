import type { Formelsatz, Kurs, Thema } from '../content/schema'

/**
 * Kurse und Themen finden sich selbst.
 *
 * Vorher stand hier je Thema eine Zeile von Hand — inklusive eines
 * Tippfehlers (`04-five-ring-two-heteroatoms` gegen die Datei
 * `04-five-ring-two-heteroatom.ts`), und der Importer musste diese Datei per
 * Regex umschreiben, um ein neues Fach anzulegen. Ein Fach anlegen heißt
 * jetzt: Ordner mit `index.ts` und `topics/` hinlegen.
 *
 * Themen bleiben eigene Bündel (`import()` je Datei), Kursköpfe kommen
 * sofort mit — sie sind klein und werden überall gebraucht.
 */

interface ThemenModul { topic?: Thema; default?: Thema }
interface KursModul { course?: Kurs; default?: Kurs }

const kursModule = import.meta.glob<KursModul>('../courses/*/index.ts', { eager: true })
const themenModule = import.meta.glob<ThemenModul>('../courses/*/topics/*.ts')

/** `../courses/<kurs>/topics/<thema>.ts` → [kurs, thema] */
function zerlegePfad(pfad: string): [string, string] {
  const teile = pfad.split('/')
  return [teile[2], teile[4].replace(/\.ts$/, '')]
}

const themenLader = new Map<string, Map<string, () => Promise<ThemenModul>>>()
for (const [pfad, lader] of Object.entries(themenModule)) {
  const [kursId, themaId] = zerlegePfad(pfad)
  if (!themenLader.has(kursId)) themenLader.set(kursId, new Map())
  themenLader.get(kursId)!.set(themaId, lader)
}

export const allCourses: Kurs[] = Object.entries(kursModule)
  .map(([, modul]) => modul.course ?? modul.default)
  .filter((kurs): kurs is Kurs => !!kurs)
  .sort((a, b) => a.title.localeCompare(b.title, 'de'))

export function kursMit(courseId: string): Kurs | undefined {
  return allCourses.find(kurs => kurs.id === courseId)
}

/**
 * Sprache der Inhalte eines Kurses.
 *
 * Das Feld gab es schon, ausgewertet wurde es an genau einer Stelle. Überall
 * sonst wurden englische Texte unter `lang="de"` vorgelesen.
 */
export function spracheVon(courseId: string | undefined): string {
  return (courseId && kursMit(courseId)?.sprache) || 'de'
}

/** Formelsatz eines Kurses — steuert, ob Summenformeln tiefgestellt werden. */
export function formelsatzVon(courseId: string | undefined): Formelsatz {
  return (courseId && kursMit(courseId)?.formelsatz) || 'chemie'
}

/** Themen-Kennungen, die als Datei vorliegen — unabhängig von der Kursliste. */
export function vorhandeneThemen(courseId: string): string[] {
  return [...(themenLader.get(courseId)?.keys() ?? [])].sort()
}

export async function loadTopic(courseId: string, topicId: string): Promise<Thema> {
  const lader = themenLader.get(courseId)?.get(topicId)
  if (!lader) throw new Error(`Thema nicht gefunden: ${courseId}/${topicId}`)
  const modul = await lader()
  const thema = modul.topic ?? modul.default
  if (!thema) throw new Error(`Thema ohne Inhalt: ${courseId}/${topicId}`)
  return thema
}

/** Alle Themen eines Kurses in der Reihenfolge der Kursliste. */
export async function loadAllTopics(courseId: string): Promise<Thema[]> {
  const kurs = kursMit(courseId)
  const reihenfolge = kurs?.topics ?? vorhandeneThemen(courseId)
  const geladen = await Promise.all(
    reihenfolge
      .filter(themaId => themenLader.get(courseId)?.has(themaId))
      .map(themaId => loadTopic(courseId, themaId)),
  )
  return geladen
}
