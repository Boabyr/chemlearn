import type { Formel, Ordnung, Thema } from '../content/schema'

/**
 * Die Formelsammlung eines Kurses schreibt niemand von Hand.
 *
 * Jedes Physikthema trägt seinen Formelrechner schon als Interaktivteil — mit
 * Gleichung, Größen samt Einheit, Umstellungen und Hinweisen. Hier werden
 * genau diese Angaben eingesammelt und nach den Gebieten der Prüfungsordnung
 * sortiert. Damit bleibt die Sammlung von selbst aktuell.
 */

export interface Formeleintrag {
  topicId: string
  topicTitle: string
  formel: Formel
}

export interface Formelgruppe {
  id: string
  titel: string
  eintraege: Formeleintrag[]
}

/** Alle Formelrechner der Themen, in Themen- und dann Auftrittsreihenfolge. */
export function formelnAusThemen(themen: Thema[]): Formeleintrag[] {
  return themen.flatMap(thema =>
    (thema.interactives ?? [])
      .filter(teil => teil.type === 'formula-calculator')
      .map(teil => ({ topicId: thema.id, topicTitle: thema.title, formel: teil.formula })),
  )
}

/**
 * Gruppiert nach den Stoffgebieten der Prüfungsordnung.
 *
 * Gebiete ohne Formel fallen weg — eine leere Überschrift hilft niemandem.
 * Formeln ohne Gebiet stehen am Ende unter „Weitere Formeln“, statt still zu
 * verschwinden.
 */
export function gruppiereFormeln(eintraege: Formeleintrag[], ordnung: Ordnung | undefined): Formelgruppe[] {
  if (!ordnung) {
    return eintraege.length ? [{ id: 'alle', titel: 'Alle Formeln', eintraege }] : []
  }

  const offen = new Set(eintraege)
  const gruppen: Formelgruppe[] = []

  for (const gebiet of ordnung.gebiete) {
    const themen = new Set(gebiet.topics)
    const treffer = eintraege.filter(eintrag => themen.has(eintrag.topicId))
    for (const eintrag of treffer) offen.delete(eintrag)
    if (treffer.length) gruppen.push({ id: gebiet.id, titel: gebiet.titel, eintraege: treffer })
  }

  const rest = eintraege.filter(eintrag => offen.has(eintrag))
  if (rest.length) gruppen.push({ id: 'weitere', titel: 'Weitere Formeln', eintraege: rest })

  return gruppen
}

/** Freitextsuche über Formelname, Gleichung, Thema und die Größen. */
export function passtZuSuche(eintrag: Formeleintrag, suche: string): boolean {
  const begriff = suche.trim().toLowerCase()
  if (!begriff) return true

  const felder = [
    eintrag.formel.name,
    eintrag.formel.equation,
    eintrag.topicTitle,
    ...eintrag.formel.variables.flatMap(v => [v.symbol, v.label, v.description]),
  ]
  return felder.some(feld => feld.toLowerCase().includes(begriff))
}
