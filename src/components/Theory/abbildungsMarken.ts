/** Marke für eine Abbildung, allein auf einer Zeile. */
const ABBILDUNG = /^[ \t]*\{\{abbildung:([a-z0-9-]+)\}\}[ \t]*$/gm

/**
 * Text an den Abbildungsmarken zerlegen.
 *
 * Der Umweg über die Zerlegung statt über ein Markdown-Plugin ist Absicht:
 * so bleibt die Abbildung eine echte React-Komponente mit eigenem SVG,
 * statt durch den Markdown-Baum gereicht zu werden.
 */
export function zerlegeAnAbbildungen(markdown: string): (string | { abbildung: string })[] {
  const teile: (string | { abbildung: string })[] = []
  let zuletzt = 0
  ABBILDUNG.lastIndex = 0
  for (const treffer of markdown.matchAll(ABBILDUNG)) {
    const davor = markdown.slice(zuletzt, treffer.index)
    if (davor.trim()) teile.push(davor)
    teile.push({ abbildung: treffer[1] })
    zuletzt = treffer.index + treffer[0].length
  }
  const rest = markdown.slice(zuletzt)
  if (rest.trim()) teile.push(rest)
  return teile.length > 0 ? teile : [markdown]
}
