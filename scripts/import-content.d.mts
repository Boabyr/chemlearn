/**
 * Typen für den Importer, damit `tsc -b` den Test übersetzt.
 *
 * Das Skript bleibt bewusst reines JavaScript (es läuft mit `node`, ohne
 * Bauschritt). Ohne diese Datei brach `npm run build` an `importer.test.ts` ab.
 * Die Signaturen sind absichtlich lose: geprüft wird der Importer im Test,
 * nicht im Typsystem.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

/** Gesammelte Meldungen abholen und die Liste leeren. */
export function nimmFehler(): string[]

export function leseOrdnung(inhalt: string, ort: string): any
export function leseOrdnungAusIndex(quelltext: string): any
export function lesePoolfragen(inhalt: string, ordnung: any, kursId: string, ort: string): any[]
export function standardKursMeta(kursId: string): any
export function kursIndexAlsTypeScript(vorhanden: any, kursId: string, themenIds: string[]): string
