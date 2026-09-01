/**
 * Stabile Kennung einer Karteikarte, abgeleitet aus ihrer Vorderseite.
 *
 * Vorher war die Kennung die Position im Themenfile (`thema#3`). Eine Karte
 * oben einfügen verschob damit still den Lernplan aller folgenden Karten.
 *
 * Dieselbe Funktion liegt für den Importer noch einmal als
 * `scripts/lib/kartenId.mjs`; ein Test hält beide auf demselben Ergebnis.
 */
export function kartenId(vorderseite: string): string {
  const text = vorderseite.trim().replace(/\s+/g, ' ')

  // FNV-1a, 32 Bit — kurz, stabil, ohne Abhängigkeit.
  let hash = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }

  return hash.toString(36).padStart(7, '0')
}
