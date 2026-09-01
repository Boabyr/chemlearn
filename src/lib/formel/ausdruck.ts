/**
 * Der Auswerter selbst liegt als reines JavaScript daneben
 * (`ausdruck.mjs`), damit `scripts/import-content.mjs` denselben Parser
 * benutzt wie die App. Zwei Fassungen wären zwei Wahrheiten.
 */
export { auswerten, variablenIn, pruefeAusdruck } from './ausdruck.mjs'
