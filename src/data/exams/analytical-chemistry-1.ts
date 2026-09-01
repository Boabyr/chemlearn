import daten from './analytical-chemistry-1.json'
import type { PruefungsDaten } from './typen'

/**
 * Die Fragen liegen als JSON daneben, damit der Importer sie nach Kennung
 * zusammenführen kann. Vorher regenerierte er die ganze Datei — ein Import
 * hätte die handkuratierten Altprüfungsfragen weggeworfen.
 */
const { questions, structures } = daten as PruefungsDaten

export { questions, structures }
