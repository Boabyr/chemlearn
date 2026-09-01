import { describe, it, expect } from 'vitest'
import { kartenId } from './kartenId'
import { kartenId as kartenIdImporter } from '../../scripts/lib/kartenId.mjs'

const BEISPIELE = [
  'Was besagt das Lambert-Beer-Gesetz?',
  'Nernst-Gleichung bei 25 °C',
  'pKs von Essigsäure',
  '  Leerzeichen   werden    vereinheitlicht ',
  'Ä Ö Ü ß — Umlaute',
  '',
]

describe('kartenId', () => {
  it('bleibt bei gleicher Vorderseite gleich', () => {
    expect(kartenId('Was besagt das Lambert-Beer-Gesetz?'))
      .toBe(kartenId('Was besagt das Lambert-Beer-Gesetz?'))
  })

  it('ignoriert Rand- und Mehrfach-Leerzeichen', () => {
    expect(kartenId(' Nernst  Gleichung ')).toBe(kartenId('Nernst Gleichung'))
  })

  it('unterscheidet verschiedene Vorderseiten', () => {
    const ids = new Set(BEISPIELE.map(kartenId))
    expect(ids.size).toBe(BEISPIELE.length)
  })

  it('liefert kurze, dateinamentaugliche Kennungen', () => {
    for (const beispiel of BEISPIELE) {
      expect(kartenId(beispiel)).toMatch(/^[0-9a-z]{7}$/)
    }
  })

  it('stimmt mit der Fassung des Importers überein', () => {
    for (const beispiel of BEISPIELE) {
      expect(kartenIdImporter(beispiel)).toBe(kartenId(beispiel))
    }
  })
})
