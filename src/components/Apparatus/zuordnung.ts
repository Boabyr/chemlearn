/**
 * Zuordnung prüfen: welcher Name gehört zu welchem Bild.
 *
 * Rein, damit das Urteil ohne DOM prüfbar ist — und je Paar statt als Ganzes.
 * Ein binäres "leider falsch" sagt nicht, welche der fünf Zuordnungen daneben
 * lag; das ist der Unterschied zwischen Rückmeldung und Note.
 */
export type PaarUrteil = 'richtig' | 'falsch' | 'offen'

export interface Befund {
  /** Urteil je Name, in der Reihenfolge der Paare. */
  urteile: Record<string, PaarUrteil>
  richtig: number
  falsch: number
  offen: number
  vollstaendig: boolean
}

export function pruefeZuordnung(
  gesetzt: Record<string, string>,
  erwartet: { label: string; apparaturId: string }[],
): Befund {
  const urteile: Record<string, PaarUrteil> = {}
  let richtig = 0
  let falsch = 0
  let offen = 0

  for (const paar of erwartet) {
    const gewaehlt = gesetzt[paar.label]
    if (gewaehlt === undefined) { urteile[paar.label] = 'offen'; offen++; continue }
    if (gewaehlt === paar.apparaturId) { urteile[paar.label] = 'richtig'; richtig++; continue }
    urteile[paar.label] = 'falsch'
    falsch++
  }

  return { urteile, richtig, falsch, offen, vollstaendig: richtig === erwartet.length }
}

export function befundText(befund: Befund, gesamt: number): string {
  if (befund.vollstaendig) return `Alle ${gesamt} Zuordnungen sitzen.`
  const teile: string[] = []
  if (befund.richtig > 0) teile.push(`${befund.richtig} richtig`)
  if (befund.falsch > 0) {
    teile.push(befund.falsch === 1 ? 'eine Zuordnung stimmt nicht' : `${befund.falsch} Zuordnungen stimmen nicht`)
  }
  if (befund.offen > 0) {
    teile.push(befund.offen === 1 ? 'eine fehlt noch' : `${befund.offen} fehlen noch`)
  }
  return teile.join(', ') + '.'
}

/**
 * Feste, aber gemischte Reihenfolge der Bilder.
 *
 * Aus den Kennungen abgeleitet statt zufällig: sonst springen die Bilder bei
 * jedem Rendern, und die Aufgabe wäre nach dem ersten Prüfen eine andere.
 */
export function bildReihenfolge(ids: string[]): string[] {
  const wert = (id: string) => {
    let h = 0
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
    return h
  }
  return [...ids].sort((a, b) => wert(a) - wert(b))
}
