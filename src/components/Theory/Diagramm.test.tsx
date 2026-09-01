import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Diagramm from './Diagramm'
import Abbildung from './Abbildung'
import { loadAllTopics } from '../../lib/courseRegistry'
import type { Diagramm as DiagrammDaten } from '../../content/schema'

const daten: DiagrammDaten = {
  art: 'diagramm',
  id: 'kalibriergerade',
  titel: 'Kalibriergerade',
  beschreibung: 'Signal gegen Konzentration.',
  xAchse: { titel: 'Konzentration c (mmol/L)', min: 0, max: 3 },
  yAchse: { titel: 'Absorption A', min: 0, max: 3 },
  kurven: [
    { beschriftung: 'ideal', punkte: [{ x: 0, y: 0 }, { x: 3, y: 3 }], stil: 'gestrichelt' },
    { beschriftung: 'real', punkte: [{ x: 0, y: 0 }, { x: 1, y: 0.8 }, { x: 3, y: 1.6 }] },
  ],
  marker: [{ x: 1, y: 0.8, beschriftung: 'Probe', hilfslinien: true }],
}

describe('Diagramm', () => {
  it('zeichnet je Kurve einen Linienzug', () => {
    const { container } = render(<Diagramm diagramm={daten} />)
    expect(container.querySelectorAll('polyline')).toHaveLength(2)
  })

  it('beschriftet beide Achsen', () => {
    render(<Diagramm diagramm={daten} />)
    expect(screen.getByText('Konzentration c (mmol/L)')).toBeTruthy()
    expect(screen.getByText('Absorption A')).toBeTruthy()
  })

  it('setzt den Marker mit Hilfslinien auf beide Achsen', () => {
    const { container } = render(<Diagramm diagramm={daten} />)
    expect(screen.getByText('Probe')).toBeTruthy()
    const gestrichelt = [...container.querySelectorAll('line')]
      .filter(l => l.getAttribute('stroke-dasharray') === '4 3')
    expect(gestrichelt).toHaveLength(2)
  })

  it('lässt die Hilfslinien weg, wenn sie nicht verlangt sind', () => {
    const ohne = { ...daten, marker: [{ x: 1, y: 0.8, beschriftung: 'Probe' }] }
    const { container } = render(<Diagramm diagramm={ohne} />)
    expect([...container.querySelectorAll('line')].filter(l => l.getAttribute('stroke-dasharray') === '4 3')).toHaveLength(0)
  })

  it('zeichnet die Nulllinie nur, wenn null im Bild liegt', () => {
    const { container: mit } = render(
      <Diagramm diagramm={{ ...daten, xAchse: { ...daten.xAchse, min: -2 } }} />,
    )
    const { container: ohne } = render(<Diagramm diagramm={daten} />)
    const zaehle = (c: HTMLElement) =>
      [...c.querySelectorAll('line')].filter(l => l.getAttribute('stroke-dasharray') === '2 3').length
    expect(zaehle(mit)).toBe(1)
    expect(zaehle(ohne)).toBe(0)
  })

  it('nennt im Alternativtext beide Achsen', () => {
    render(<Diagramm diagramm={daten} />)
    const bild = screen.getByRole('img')
    expect(bild.getAttribute('aria-label')).toContain('Konzentration')
    expect(bild.getAttribute('aria-label')).toContain('Absorption')
  })
})

describe('Diagramm in der Abbildung', () => {
  it('zeigt bei mehreren Kurven eine Legende', () => {
    render(<Abbildung abbildung={daten} />)
    expect(screen.getByText('ideal')).toBeTruthy()
    expect(screen.getByText('real')).toBeTruthy()
  })

  it('lässt die Legende bei einer einzigen Kurve weg', () => {
    const eine = { ...daten, kurven: [daten.kurven[0]] }
    render(<Abbildung abbildung={eine} />)
    expect(screen.queryByText('ideal')).toBeNull()
  })
})

describe('Diagramme der Kurse', () => {
  it('halten alle Punkte innerhalb ihrer Achsen', async () => {
    const draussen: string[] = []
    let gefunden = 0
    for (const kurs of ['analytical-chemistry-1', 'organic-chemistry']) {
      for (const thema of await loadAllTopics(kurs)) {
        for (const abbildung of thema.abbildungen ?? []) {
          if (abbildung.art !== 'diagramm') continue
          gefunden++
          const punkte = abbildung.kurven.flatMap(k => k.punkte).concat(abbildung.marker)
          for (const punkt of punkte) {
            const drin = punkt.x >= abbildung.xAchse.min && punkt.x <= abbildung.xAchse.max
              && punkt.y >= abbildung.yAchse.min && punkt.y <= abbildung.yAchse.max
            if (!drin) draussen.push(`${thema.id}/${abbildung.id}: (${punkt.x}, ${punkt.y})`)
          }
        }
      }
    }
    expect(gefunden, 'kein einziges Diagramm im Kurs gefunden').toBeGreaterThan(0)
    expect(draussen).toEqual([])
  })

  it('lassen sich alle zeichnen', async () => {
    for (const thema of await loadAllTopics('analytical-chemistry-1')) {
      for (const abbildung of thema.abbildungen ?? []) {
        if (abbildung.art !== 'diagramm') continue
        const { container, unmount } = render(<Abbildung abbildung={abbildung} />)
        expect(container.querySelectorAll('polyline')).toHaveLength(abbildung.kurven.length)
        unmount()
      }
    }
  })
})
