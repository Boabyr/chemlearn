/**
 * Übersetzt LaTeX-Klammern in die Dollar-Schreibweise.
 *
 * Die Physik-Inhalte kommen aus Vorlesungsunterlagen und setzen Formeln als
 * `\[ … \]` bzw. `\( … \)`. `remark-math` kennt nur `$…$` und `$$…$$` — die
 * Klammern standen deshalb wörtlich auf der Seite, samt `\frac{…}{…}`
 * dahinter. Statt hunderte Inhaltsstellen umzuschreiben (und beim nächsten
 * Import wieder zu verlieren), normalisiert der Renderer beim Anzeigen.
 *
 * Nur vollständige Paare werden umgesetzt; ein einzelnes `\[` bleibt stehen.
 */
const ABGESETZT = /\\\[([\s\S]*?)\\\]/g
const IM_TEXT = /\\\(([\s\S]*?)\\\)/g

export function normalisiereMathe(text: string): string {
  return text
    .replace(ABGESETZT, (_, formel: string) => `$$${formel}$$`)
    .replace(IM_TEXT, (_, formel: string) => `$${formel}$`)
}

/** `$$…$$` zuerst, damit abgesetzte Formeln nicht als zwei leere Inline-Formeln zerfallen. */
const MATHE = /\$\$([^$]+?)\$\$|\$([^$\n]+?)\$/g

type Teil =
  | { art: 'text'; wert: string }
  | { art: 'mathe'; wert: string; abgesetzt: boolean }

export function zerlege(roh: string): Teil[] {
  const text = normalisiereMathe(roh)
  const teile: Teil[] = []
  let zuletzt = 0

  for (const treffer of text.matchAll(MATHE)) {
    const start = treffer.index
    if (start > zuletzt) teile.push({ art: 'text', wert: text.slice(zuletzt, start) })
    teile.push({
      art: 'mathe',
      wert: treffer[1] ?? treffer[2],
      abgesetzt: treffer[1] !== undefined,
    })
    zuletzt = start + treffer[0].length
  }

  if (zuletzt < text.length) teile.push({ art: 'text', wert: text.slice(zuletzt) })
  return teile
}
