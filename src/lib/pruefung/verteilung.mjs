// Zwilling von verteilung.ts — src/lib/pruefung/verteilungZwilling.test.ts hält beide gleich.
export function verteileFragen(gesamt, gebiete) {
  const ergebnis = new Map()

  const fest = gebiete.filter(g => g.fragen !== undefined)
  const offen = gebiete.filter(g => g.fragen === undefined)
  for (const g of fest) ergebnis.set(g.id, g.fragen)

  const vergeben = fest.reduce((summe, g) => summe + g.fragen, 0)
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
    ergebnis.set(a.id, ergebnis.get(a.id) + 1)
    offeneFragen--
  }

  return ergebnis
}
