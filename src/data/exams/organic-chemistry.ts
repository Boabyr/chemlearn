import daten from './organic-chemistry.json'
import type { PruefungsDaten } from './typen'

const { questions, structures } = daten as PruefungsDaten

export { questions, structures }
