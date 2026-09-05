import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Tailwind sieht nur vollständige Klassennamen im Quelltext. `text-${farbe}-400`
 * wird nie erzeugt — die Gruppenfarben fehlten dadurch im Produktionsbuild
 * komplett, während im Entwicklungsserver alles gut aussah.
 */
function dateien(verzeichnis: string): string[] {
  return readdirSync(verzeichnis).flatMap(name => {
    const pfad = join(verzeichnis, name)
    if (statSync(pfad).isDirectory()) return dateien(pfad)
    return /\.tsx?$/.test(name) ? [pfad] : []
  })
}

const PRAEFIXE = 'bg|text|border|ring|fill|stroke|from|to|via|shadow|outline|decoration|divide|placeholder|accent|caret'
const ZUSAMMENGESETZT = new RegExp(`(?:${PRAEFIXE})-\\$\\{|\\$\\{[^}]+\\}-(?:\\d{2,3}|[a-z]+-\\d{2,3})\\b`)

describe('Tailwind-Klassen', () => {
  it('werden nirgends aus Bausteinen zusammengesetzt', () => {
    const treffer: string[] = []

    for (const datei of dateien('src')) {
      if (datei.includes('.test.')) continue
      readFileSync(datei, 'utf8').split('\n').forEach((zeile, i) => {
        if (!zeile.includes('className')&& !zeile.includes('cls =')) return
        if (ZUSAMMENGESETZT.test(zeile)) treffer.push(`${datei}:${i + 1}  ${zeile.trim()}`)
      })
    }

    expect(treffer, `Zusammengesetzte Klassen gefunden:\n${treffer.join('\n')}`).toEqual([])
  })
})
