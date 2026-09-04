/**
 * Fragen einer Prüfung auf die Stoffgebiete verteilen.
 *
 * Verfahren des größten Rests: jedes Gebiet bekommt seinen abgerundeten
 * Anteil, die übrigen Fragen gehen an die größten Reste. Bei gleichem Rest
 * gewinnt das Gebiet mit mehr Kapiteln, bei Gleichstand die frühere Zeile —
 * ohne diese Regel hinge die Prüfung von der Reihenfolge einer Map ab.
 */
export interface GebietsAnteil {
  id: string
  kapitel: number
  /** Ausdrückliche Vorgabe aus der Quelle; nimmt an der Rechnung nicht teil. */
  fragen?: number
}

export function verteileFragen(gesamt: number, gebiete: GebietsAnteil[]): Map<string, number> {
  const ergebnis = new Map<string, number>()

  const fest = gebiete.filter(g => g.fragen !== undefined)
  const offen = gebiete.filter(g => g.fragen === undefined)
  for (const g of fest) ergebnis.set(g.id, g.fragen!)

  const vergeben = fest.reduce((summe, g) => summe + g.fragen!, 0)
  const rest = gesamt - vergeben
  const kapitelSumme = offen.reduce((summe, g) => summe + g.kapitel, 0)

  if (offen.length === 0 || rest <= 0 || kapitelSumme === 0) {
    for (const g of offen) ergebnis.set(g.id, 0)
    return ergebnis
  }

  const anteile = offen.map((g, position) => {
    const genau = (rest * g.kapitel) / kapitelSumme
    const ganz = Math.floor(genau)
    return { id: g.id, kapitel: g.kapitel, position, ganz, rest: genau - ganz }
  })

  for (const a of anteile) ergebnis.set(a.id, a.ganz)

  let offeneFragen = rest - anteile.reduce((summe, a) => summe + a.ganz, 0)
  const reihenfolge = [...anteile].sort(
    (a, b) => b.rest - a.rest || b.kapitel - a.kapitel || a.position - b.position,
  )
  for (const a of reihenfolge) {
    if (offeneFragen <= 0) break
    ergebnis.set(a.id, ergebnis.get(a.id)! + 1)
    offeneFragen--
  }

  return ergebnis
}
