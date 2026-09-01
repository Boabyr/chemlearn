import type { Pfeil, Ziel } from './strukturTypen'

/**
 * Gesetzte Pfeile gegen die erwarteten prüfen.
 *
 * Der Vorgänger verglich genau einen Pfeil und sagte „richtig" oder
 * „Falscher Pfeil" — ohne zu verraten, was daran falsch war. Hier bekommt
 * jeder Pfeil ein eigenes Urteil, und die Reihenfolge spielt keine Rolle:
 * bei einer konzertierten Reaktion gibt es keine erste und zweite Bewegung.
 */

export type PfeilUrteil = 'richtig' | 'zielVerfehlt' | 'unerwartet'

export interface Befund {
  /** Urteil je gesetztem Pfeil, in derselben Reihenfolge. */
  urteile: PfeilUrteil[]
  /** Erwartete Pfeile, die gar nicht gesetzt wurden. */
  fehlend: Pfeil[]
  vollstaendig: boolean
}

const gleich = (a: Ziel, b: Ziel) => a.art === b.art && a.id === b.id
const gleicherPfeil = (a: Pfeil, b: Pfeil) => gleich(a.von, b.von) && gleich(a.nach, b.nach)

export function pruefePfeile(gesetzt: Pfeil[], erwartet: Pfeil[]): Befund {
  const offen = erwartet.map((pfeil, i) => ({ pfeil, i }))
  const vergeben = new Set<number>()
  const urteile: PfeilUrteil[] = []

  for (const pfeil of gesetzt) {
    // Erst nach einem vollen Treffer suchen …
    const treffer = offen.find(k => !vergeben.has(k.i) && gleicherPfeil(pfeil, k.pfeil))
    if (treffer) {
      vergeben.add(treffer.i)
      urteile.push('richtig')
      continue
    }

    // … dann nach demselben Ausgangspunkt: der Gedanke stimmte, das Ziel nicht.
    const knapp = offen.find(k => !vergeben.has(k.i) && gleich(pfeil.von, k.pfeil.von))
    if (knapp) {
      vergeben.add(knapp.i)
      urteile.push('zielVerfehlt')
      continue
    }

    urteile.push('unerwartet')
  }

  const fehlend = offen.filter(k => !vergeben.has(k.i)).map(k => k.pfeil)
  const vollstaendig = fehlend.length === 0 && urteile.every(u => u === 'richtig')

  return { urteile, fehlend, vollstaendig }
}

/** Ein Satz zur Rückmeldung, der sagt was los ist statt nur richtig/falsch. */
export function befundText(befund: Befund): string {
  if (befund.vollstaendig) return 'Alle Pfeile sitzen.'

  const teile: string[] = []
  const verfehlt = befund.urteile.filter(u => u === 'zielVerfehlt').length
  const unerwartet = befund.urteile.filter(u => u === 'unerwartet').length

  if (verfehlt > 0) {
    teile.push(verfehlt === 1
      ? 'Ein Pfeil beginnt richtig, zeigt aber auf das falsche Ziel.'
      : `${verfehlt} Pfeile beginnen richtig, zeigen aber auf das falsche Ziel.`)
  }
  if (unerwartet > 0) {
    teile.push(unerwartet === 1
      ? 'Ein Pfeil gehört hier nicht hin.'
      : `${unerwartet} Pfeile gehören hier nicht hin.`)
  }
  if (befund.fehlend.length > 0) {
    teile.push(befund.fehlend.length === 1
      ? 'Ein Pfeil fehlt noch.'
      : `${befund.fehlend.length} Pfeile fehlen noch.`)
  }

  return teile.join(' ')
}
