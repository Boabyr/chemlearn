import { beschriftet, labelRadius, type Atom, type Bindung, type Stufe, type Ziel } from './strukturTypen'

/**
 * Rechnen für die Strukturformel — ohne DOM, damit es prüfbar bleibt.
 *
 * Der alte Bau hatte die Geometrie im JSX verstreut, mit einem festen
 * Krümmungsversatz von 30 Einheiten unabhängig vom Abstand. Kurze Pfeile
 * wurden dadurch rückwärts gezeichnet.
 */

export interface Punkt { x: number; y: number }
export interface Linie { x1: number; y1: number; x2: number; y2: number }

/** Abstand paralleler Linien einer Mehrfachbindung. */
const VERSATZ = 3.2
/** Abstand der beiden Punkte eines freien Elektronenpaars. */
const PAAR_ABSTAND = 5
/** Wie weit das Paar vom Atomsymbol wegsteht. */
const PAAR_RADIUS = 13

function richtung(von: Punkt, nach: Punkt): { dx: number; dy: number; laenge: number } {
  const dx = nach.x - von.x
  const dy = nach.y - von.y
  const laenge = Math.hypot(dx, dy) || 1
  return { dx: dx / laenge, dy: dy / laenge, laenge }
}

/**
 * Linien einer Bindung: eine je Bindungsordnung, an beschrifteten Atomen
 * gekürzt, damit der Strich nicht ins Symbol läuft.
 */
export function bindungsLinien(bindung: Bindung, von: Atom, nach: Atom): Linie[] {
  const { dx, dy, laenge } = richtung(von, nach)

  let vorne = labelRadius(von)
  let hinten = labelRadius(nach)
  // Bei sehr kurzen Bindungen bliebe sonst nichts übrig — oder die Linie
  // kehrte sich um, wie im alten Bau.
  if (vorne + hinten > laenge - 4) {
    const faktor = Math.max(0, (laenge - 4) / (vorne + hinten || 1))
    vorne *= faktor
    hinten *= faktor
  }

  const x1 = von.x + dx * vorne
  const y1 = von.y + dy * vorne
  const x2 = nach.x - dx * hinten
  const y2 = nach.y - dy * hinten

  const nx = -dy
  const ny = dx

  const versaetze =
    bindung.ordnung === 1 ? [0]
      : bindung.ordnung === 2 ? [-VERSATZ, VERSATZ]
        : [-2 * VERSATZ, 0, 2 * VERSATZ]

  return versaetze.map(v => ({
    x1: x1 + nx * v, y1: y1 + ny * v,
    x2: x2 + nx * v, y2: y2 + ny * v,
  }))
}

export interface FreiesPaar {
  /** Mitte des Paars, auch der Anfasser für einen Pfeil. */
  mitte: Punkt
  punkte: [Punkt, Punkt]
}

/**
 * Freie Elektronenpaare auf die bindungsfreie Seite legen.
 *
 * Bisher gab es dafür kein Mittel — Thema 01 behalf sich mit einem
 * zusätzlichen Atom namens ":N", das an nichts gebunden war und den Pfeil
 * auf sich selbst zeigen ließ.
 */
export function freiePaarPunkte(atom: Atom, nachbarn: Atom[]): FreiesPaar[] {
  const anzahl = atom.freiePaare ?? 0
  if (anzahl <= 0) return []

  const belegt = nachbarn.map(n => Math.atan2(n.y - atom.y, n.x - atom.x))

  /** Wie frei ist diese Richtung? Größer heißt weiter weg von jeder Bindung. */
  const freiheit = (winkel: number) => {
    if (belegt.length === 0) return Math.PI
    return Math.min(...belegt.map(b => {
      const d = Math.abs(((winkel - b + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI)
      return d
    }))
  }

  // Kandidatenrichtungen abtasten und die freiesten nehmen, mit Mindestabstand
  // untereinander, damit zwei Paare nicht übereinanderliegen.
  const schritte = 72
  const kandidaten = Array.from({ length: schritte }, (_, i) => {
    const winkel = (i / schritte) * 2 * Math.PI - Math.PI
    return { winkel, frei: freiheit(winkel) }
  }).sort((a, b) => b.frei - a.frei)

  const gewaehlt: number[] = []
  for (const kandidat of kandidaten) {
    if (gewaehlt.length >= anzahl) break
    const zuNah = gewaehlt.some(w => {
      const d = Math.abs(((kandidat.winkel - w + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI)
      return d < Math.PI / 3
    })
    if (!zuNah) gewaehlt.push(kandidat.winkel)
  }

  return gewaehlt.map(winkel => {
    const mitte = {
      x: atom.x + Math.cos(winkel) * PAAR_RADIUS,
      y: atom.y + Math.sin(winkel) * PAAR_RADIUS,
    }
    // Punkte quer zur Richtung, damit das Paar wie ein Doppelpunkt aussieht
    const qx = -Math.sin(winkel) * (PAAR_ABSTAND / 2)
    const qy = Math.cos(winkel) * (PAAR_ABSTAND / 2)
    return {
      mitte,
      punkte: [
        { x: mitte.x + qx, y: mitte.y + qy },
        { x: mitte.x - qx, y: mitte.y - qy },
      ] as [Punkt, Punkt],
    }
  })
}

export interface Bahn {
  start: Punkt
  ende: Punkt
  kontrolle: Punkt
  d: string
}

/** Höchste Auslenkung eines Pfeilbogens. */
const MAX_BOGEN = 55

/**
 * Gekrümmte Bahn von einem Ziel zum anderen.
 * Die Krümmung wächst mit der Länge statt fest bei 30 zu stehen.
 */
export function pfeilBahn(start: Punkt, ende: Punkt, seite: 1 | -1 = 1): Bahn {
  const { dx, dy, laenge } = richtung(start, ende)
  const bogen = Math.min(MAX_BOGEN, 12 + laenge * 0.22) * seite

  const mitte = { x: (start.x + ende.x) / 2, y: (start.y + ende.y) / 2 }
  const kontrolle = { x: mitte.x - dy * bogen, y: mitte.y + dx * bogen }

  const r = (n: number) => Math.round(n * 10) / 10
  return {
    start, ende, kontrolle,
    d: `M ${r(start.x)} ${r(start.y)} Q ${r(kontrolle.x)} ${r(kontrolle.y)} ${r(ende.x)} ${r(ende.y)}`,
  }
}

function nachbarnVon(atom: Atom, stufe: Stufe): Atom[] {
  const nachbarIds = stufe.bindungen
    .filter(b => b.von === atom.id || b.nach === atom.id)
    .map(b => (b.von === atom.id ? b.nach : b.von))
  return stufe.atome.filter(a => nachbarIds.includes(a.id))
}

/** Anfasser eines Ziels: Bindungsmitte, Paarmitte oder Atomort. */
export function zielPunkt(ziel: Ziel, stufe: Stufe): Punkt | null {
  if (ziel.art === 'atom') {
    const atom = stufe.atome.find(a => a.id === ziel.id)
    return atom ? { x: atom.x, y: atom.y } : null
  }

  if (ziel.art === 'bindung') {
    const bindung = stufe.bindungen.find(b => b.id === ziel.id)
    if (!bindung) return null
    const von = stufe.atome.find(a => a.id === bindung.von)
    const nach = stufe.atome.find(a => a.id === bindung.nach)
    if (!von || !nach) return null
    return { x: (von.x + nach.x) / 2, y: (von.y + nach.y) / 2 }
  }

  const atom = stufe.atome.find(a => a.id === ziel.id)
  if (!atom) return null
  const paare = freiePaarPunkte(atom, nachbarnVon(atom, stufe))
  return paare[0]?.mitte ?? null
}

/** Trefferfläche je Zielart. Kleiner heißt: genauer zeigen. */
const RADIUS = { freiesPaar: 11, bindung: 14, atom: 13 } as const

/**
 * Nächstes Ziel unter dem Zeiger.
 *
 * Freie Paare haben Vorrang vor ihrem Atom, sonst wäre das Paar nie
 * erreichbar. Bei gleichem Rang entscheidet der Abstand.
 */
export function trefferZiel(x: number, y: number, stufe: Stufe): Ziel | null {
  const kandidaten: { ziel: Ziel; abstand: number; rang: number }[] = []

  for (const atom of stufe.atome) {
    for (const paar of freiePaarPunkte(atom, nachbarnVon(atom, stufe))) {
      const abstand = Math.hypot(paar.mitte.x - x, paar.mitte.y - y)
      if (abstand <= RADIUS.freiesPaar) kandidaten.push({ ziel: { art: 'freiesPaar', id: atom.id }, abstand, rang: 0 })
      break   // ein Anfasser je Atom genügt
    }
  }

  for (const bindung of stufe.bindungen) {
    const punkt = zielPunkt({ art: 'bindung', id: bindung.id }, stufe)
    if (!punkt) continue
    const abstand = Math.hypot(punkt.x - x, punkt.y - y)
    if (abstand <= RADIUS.bindung) kandidaten.push({ ziel: { art: 'bindung', id: bindung.id }, abstand, rang: 1 })
  }

  for (const atom of stufe.atome) {
    const abstand = Math.hypot(atom.x - x, atom.y - y)
    if (abstand <= RADIUS.atom) kandidaten.push({ ziel: { art: 'atom', id: atom.id }, abstand, rang: 1 })
  }

  if (kandidaten.length === 0) return null
  kandidaten.sort((a, b) => a.rang - b.rang || a.abstand - b.abstand)
  return kandidaten[0].ziel
}

/** Wo die Ladung neben dem Symbol sitzt. */
export function ladungsPunkt(atom: Atom): Punkt {
  const versatz = beschriftet(atom) ? labelRadius(atom) : 6
  return { x: atom.x + versatz, y: atom.y - versatz }
}
