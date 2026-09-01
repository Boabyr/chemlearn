/**
 * Formen einer Strukturformel.
 *
 * Der Vorgänger zeichnete beschriftete Kreise: Bindungsordnung steckte als
 * Text im Label ("C=O"), freie Elektronenpaare gab es nicht, und ein Pfeil
 * konnte nur von Atom zu Atom gehen. Damit ließ sich kein Mechanismus
 * darstellen, sondern nur ein Bild mit einer Quizfrage daran.
 */

/** Bühne der Strukturformel. Alles muss hier hineinpassen. */
export const BUEHNE = { breite: 480, hoehe: 300 } as const

/*
 * Die Formen selbst stehen im Schema (src/content/schema.ts) — dort werden
 * sie auch geprüft. Hier nur die Namen und das Rechnen darum herum, damit
 * Renderer und Inhalt nicht auseinanderlaufen können.
 */
export type {
  Abbildung,
  StrukturBild,
  MechanismusAtom as Atom,
  MechanismusBindung as Bindung,
  MechanismusPfeil as Pfeil,
  MechanismusStufe as Stufe,
  Mechanismus,
} from '../../content/schema'

import type {
  MechanismusAtom, MechanismusPfeil,
} from '../../content/schema'

export type Bindungsordnung = 1 | 2 | 3
export type Bindungsart = 'normal' | 'entsteht' | 'bricht'
export type Ziel = MechanismusPfeil['von']
export type ZielArt = Ziel['art']

/** Wird das Symbol gezeichnet? Kohlenstoff bleibt im Skelett stumm. */
export function beschriftet(atom: MechanismusAtom): boolean {
  return atom.zeigen ?? atom.element !== 'C'
}

/** Text am Atom, inklusive impliziter Wasserstoffe. */
export function atomText(atom: MechanismusAtom): string {
  if (!beschriftet(atom)) return ''
  const h = atom.wasserstoffe ?? 0
  if (h === 0) return atom.element
  return h === 1 ? `${atom.element}H` : `${atom.element}H${h}`
}

/** Wie weit eine Bindung vor dem Symbol enden muss. */
export function labelRadius(atom: MechanismusAtom): number {
  if (!beschriftet(atom)) return 0
  return 7 + atomText(atom).length * 3.2
}
