import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Strukturformel from './Strukturformel'
import { zielPunkt } from './geometrie'
import { BUEHNE } from './strukturTypen'
import { allCourses, loadAllTopics } from '../../lib/courseRegistry'
import type { Mechanismus, Stufe } from './strukturTypen'

/**
 * Prüft die echten Mechanismen, nicht nur ausgedachte.
 *
 * Der Vorgänger hatte ein Atom bei y = 270 auf einer 260 Einheiten hohen
 * Fläche — unsichtbar und unklickbar. Aufgefallen ist das niemandem, weil
 * kein Test je eine Strukturformel gerendert hat.
 */
async function alleMechanismen(): Promise<{ thema: string; mechanismus: Mechanismus }[]> {
  const gefunden: { thema: string; mechanismus: Mechanismus }[] = []
  for (const kurs of allCourses) {
    for (const thema of await loadAllTopics(kurs.id)) {
      for (const teil of thema.interactives ?? []) {
        if (teil.type !== 'mechanism') continue
        gefunden.push({ thema: thema.id, mechanismus: teil })
      }
    }
  }
  return gefunden
}

const alsStufe = (ergebnis: Mechanismus['ergebnis']): Stufe => ({
  id: -1, titel: ergebnis.titel, aufgabe: '', erklaerung: '', hinweise: [],
  atome: ergebnis.atome, bindungen: ergebnis.bindungen, pfeile: [],
})

describe('Mechanismen der Kurse', () => {
  it('werden gefunden', async () => {
    expect((await alleMechanismen()).length).toBeGreaterThan(0)
  })

  it('rendern jede Stufe als SVG mit Bindungen und Beschriftungen', async () => {
    for (const { thema, mechanismus } of await alleMechanismen()) {
      for (const stufe of mechanismus.stages) {
        const { container, unmount } = render(<Strukturformel stufe={stufe} />)
        const svg = container.querySelector('svg')
        expect(svg, `${thema}/${stufe.titel}: kein SVG`).not.toBeNull()
        expect(svg!.getAttribute('viewBox')).toBe(`0 0 ${BUEHNE.breite} ${BUEHNE.hoehe}`)

        // Doppelbindungen ergeben zwei Linien, Dreifachbindungen drei.
        const erwarteteLinien = stufe.bindungen.reduce((s, b) => s + b.ordnung, 0)
        expect(container.querySelectorAll('line').length,
          `${thema}/${stufe.titel}: Linienzahl passt nicht zur Bindungsordnung`).toBe(erwarteteLinien)

        unmount()
      }
    }
  })

  it('halten alles innerhalb der Bühne', async () => {
    const raus: string[] = []
    for (const { thema, mechanismus } of await alleMechanismen()) {
      const bilder = [...mechanismus.stages, alsStufe(mechanismus.ergebnis)]
      for (const stufe of bilder) {
        for (const atom of stufe.atome) {
          // Beschriftung, Ladung und freie Paare brauchen Luft um das Atom herum.
          const luft = 20
          if (atom.x - luft < 0 || atom.x + luft > BUEHNE.breite
            || atom.y - luft < 0 || atom.y + luft > BUEHNE.hoehe) {
            raus.push(`${thema}/${stufe.titel}: ${atom.id} bei (${atom.x}, ${atom.y})`)
          }
        }
      }
    }
    expect(raus).toEqual([])
  })

  it('lösen jeden erwarteten Pfeil auf einen Punkt auf', async () => {
    const blind: string[] = []
    for (const { thema, mechanismus } of await alleMechanismen()) {
      for (const stufe of mechanismus.stages) {
        for (const pfeil of stufe.pfeile) {
          for (const ende of ['von', 'nach'] as const) {
            if (zielPunkt(pfeil[ende], stufe) === null) {
              blind.push(`${thema}/${stufe.titel}: ${ende} ${pfeil[ende].art} ${pfeil[ende].id}`)
            }
          }
        }
      }
    }
    expect(blind).toEqual([])
  })

  it('zeichnen die Musterlösung sichtbar, ohne den Pfeil umzudrehen', async () => {
    for (const { thema, mechanismus } of await alleMechanismen()) {
      for (const stufe of mechanismus.stages) {
        const { container, unmount } = render(
          <Strukturformel stufe={stufe} pfeile={stufe.pfeile} />)
        const pfade = container.querySelectorAll('path[marker-end]')
        expect(pfade.length, `${thema}/${stufe.titel}: Pfeile fehlen`).toBe(stufe.pfeile.length)

        for (const pfad of pfade) {
          const zahlen = (pfad.getAttribute('d') ?? '').match(/-?\d+(\.\d+)?/g)!.map(Number)
          const [x1, y1, , , x2, y2] = zahlen
          // Ein Pfeil, dessen Enden zusammenfallen, wäre nicht zu erkennen.
          expect(Math.hypot(x2 - x1, y2 - y1),
            `${thema}/${stufe.titel}: Pfeil zu kurz`).toBeGreaterThan(12)
        }
        unmount()
      }
    }
  })

  it('bieten in jeder Stufe die Ziele der Musterlösung zum Anklicken an', async () => {
    for (const { thema, mechanismus } of await alleMechanismen()) {
      for (const stufe of mechanismus.stages) {
        const { container, unmount } = render(
          <Strukturformel stufe={stufe} onZiel={() => {}} />)
        const knoepfe = container.querySelectorAll('[role="button"]')
        expect(knoepfe.length, `${thema}/${stufe.titel}: keine Anfasser`).toBeGreaterThan(0)
        unmount()
      }
    }
  })
})
