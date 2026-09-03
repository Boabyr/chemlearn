import { formatChemistry } from './chemFormat'
import type { Formelsatz } from '../../content/schema'

/** Überschrift → Ankername. Muss in Renderer und Inhaltsübersicht gleich laufen. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

/** Sammelt die `##`-Abschnitte — außerhalb von Code-Blöcken. */
export function abschnitte(
  markdown: string,
  formelsatz: Formelsatz = 'chemie',
): { titel: string; anker: string }[] {
  const zeilen = markdown.split('\n')
  const gefunden: { titel: string; anker: string }[] = []
  let imCodeBlock = false

  for (const zeile of zeilen) {
    if (zeile.trimStart().startsWith('```')) { imCodeBlock = !imCodeBlock; continue }
    if (imCodeBlock) continue
    const treffer = /^##\s+(.+?)\s*$/.exec(zeile)
    if (treffer) {
      const roh = treffer[1].replace(/\*\*/g, '')
      const titel = formelsatz === 'chemie' ? formatChemistry(roh) : roh
      gefunden.push({ titel, anker: slugify(titel) })
    }
  }
  return gefunden
}
