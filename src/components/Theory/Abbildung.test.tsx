import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Abbildung from './Abbildung'
import TheoryRenderer from './TheoryRenderer'
import { zerlegeAnAbbildungen } from './abbildungsMarken'
import { loadAllTopics } from '../../lib/courseRegistry'
import { BUEHNE } from '../Mechanismus/strukturTypen'
import type { StrukturAbbildung } from '../../content/schema'

const daten: StrukturAbbildung = {
  art: 'strukturen',
  id: 'pyrrol-c2',
  titel: 'Areniumion aus dem Angriff an C-2',
  beschreibung: 'Drei Grenzstrukturen.',
  verknuepfung: 'resonanz',
  strukturen: [
    {
      beschriftung: 'Ladung an C-3',
      atome: [
        { id: 'n1', element: 'N', x: 240, y: 80, wasserstoffe: 1 },
        { id: 'c2', element: 'C', x: 307, y: 128 },
      ],
      bindungen: [{ id: 'b1', von: 'n1', nach: 'c2', ordnung: 1 }],
    },
    {
      beschriftung: 'Ladung am N',
      atome: [
        { id: 'n1', element: 'N', x: 240, y: 80, wasserstoffe: 1, ladung: 1 },
        { id: 'c2', element: 'C', x: 307, y: 128 },
      ],
      bindungen: [{ id: 'b1', von: 'n1', nach: 'c2', ordnung: 2 }],
    },
  ],
}

describe('Abbildung', () => {
  it('zeichnet jede Struktur mit ihrer Beschriftung', () => {
    const { container } = render(<Abbildung abbildung={daten} />)
    expect(container.querySelectorAll('svg')).toHaveLength(2)
    expect(screen.getByText('Ladung an C-3')).toBeTruthy()
    expect(screen.getByText('Ladung am N')).toBeTruthy()
    expect(screen.getByText(daten.titel)).toBeTruthy()
  })

  it('setzt bei Resonanz den Doppelpfeil zwischen die Strukturen', () => {
    const { container } = render(<Abbildung abbildung={daten} />)
    const pfeile = [...container.querySelectorAll('span')].filter(s => s.textContent === '↔')
    expect(pfeile).toHaveLength(1)
    expect(screen.getByText(/kein Gleichgewicht/)).toBeTruthy()
  })

  it('setzt bei einer Reihe keinen Doppelpfeil', () => {
    const { container } = render(<Abbildung abbildung={{ ...daten, verknuepfung: 'reihe' }} />)
    expect([...container.querySelectorAll('span')].filter(s => s.textContent === '↔')).toHaveLength(0)
    expect(screen.queryByText(/kein Gleichgewicht/)).toBeNull()
  })

  it('ist nicht bedienbar — Abbildungen sind keine Aufgabe', () => {
    const { container } = render(<Abbildung abbildung={daten} />)
    expect(container.querySelectorAll('[role="button"]')).toHaveLength(0)
  })
})

describe('Abbildungsmarken im Text', () => {
  it('zerlegt den Text an den Marken', () => {
    const teile = zerlegeAnAbbildungen('Davor.\n\n{{abbildung:eins}}\n\nDanach.')
    expect(teile).toHaveLength(3)
    expect(teile[1]).toEqual({ abbildung: 'eins' })
  })

  it('lässt Text ohne Marke unangetastet', () => {
    expect(zerlegeAnAbbildungen('Nur Text.')).toEqual(['Nur Text.'])
  })

  it('rendert die gerufene Abbildung an ihrer Stelle', () => {
    const { container } = render(
      <TheoryRenderer markdown={'## Kopf\n\n{{abbildung:pyrrol-c2}}\n\nText danach.'} abbildungen={[daten]} />,
    )
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
    expect(screen.getByText('Text danach.')).toBeTruthy()
    expect(container.textContent).not.toContain('{{abbildung')
  })

  it('zeigt keine rohe Marke, wenn die Abbildung fehlt', () => {
    const { container } = render(<TheoryRenderer markdown={'{{abbildung:gibtsnicht}}\n\nText.'} abbildungen={[]} />)
    expect(container.textContent).not.toContain('{{abbildung')
  })
})

describe('Abbildungen der Kurse', () => {
  it('halten alles innerhalb der Bühne', async () => {
    const draussen: string[] = []
    for (const kurs of ['organic-chemistry', 'analytical-chemistry-1']) {
      for (const thema of await loadAllTopics(kurs)) {
        for (const abbildung of thema.abbildungen ?? []) {
          if (abbildung.art !== 'strukturen') continue
          for (const struktur of abbildung.strukturen) {
            for (const atom of struktur.atome) {
              if (atom.x < 0 || atom.x > BUEHNE.breite || atom.y < 0 || atom.y > BUEHNE.hoehe) {
                draussen.push(`${thema.id}/${abbildung.id}: ${atom.id}`)
              }
            }
          }
        }
      }
    }
    expect(draussen).toEqual([])
  })

  it('lassen sich alle zeichnen', async () => {
    let gezeichnet = 0
    for (const thema of await loadAllTopics('organic-chemistry')) {
      for (const abbildung of thema.abbildungen ?? []) {
        if (abbildung.art !== 'strukturen') continue
        const { container, unmount } = render(<Abbildung abbildung={abbildung} />)
        expect(container.querySelectorAll('svg')).toHaveLength(abbildung.strukturen.length)
        gezeichnet++
        unmount()
      }
    }
    expect(gezeichnet, 'keine einzige Abbildung im Kurs gefunden').toBeGreaterThan(0)
  })
})
