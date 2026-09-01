/**
 * Kalendertage in der Zeitzone der lernenden Person.
 *
 * Vorher lief das über `new Date().toISOString().split('T')[0]` — also über
 * UTC. Wer um 23:30 in Wien lernt, bekam den Folgetag gutgeschrieben und
 * verlor damit seine Serie.
 */

/** Zeitzone des Geräts, mit Rückfall auf UTC. */
export function geraeteZeitzone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

/** Datum als `YYYY-MM-DD` in der angegebenen Zeitzone. */
export function lokalesDatum(zeitpunkt: Date = new Date(), zeitzone = geraeteZeitzone()): string {
  // 'en-CA' liefert ISO-Reihenfolge (YYYY-MM-DD) ohne eigenes Zusammenstückeln.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: zeitzone,
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(zeitpunkt)
}

/** Abstand zweier Kalendertage in Tagen. Ignoriert Zeitzonen und Sommerzeit. */
export function tageDazwischen(von: string, bis: string): number {
  const alsZahl = (d: string) => Date.UTC(
    Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)),
  )
  return Math.round((alsZahl(bis) - alsZahl(von)) / 86_400_000)
}

export function istGestern(datum: string, bezug: string): boolean {
  return tageDazwischen(datum, bezug) === 1
}
