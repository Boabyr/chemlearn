import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { apparatusRegistry } from './registry'
import { loadAllTopics } from '../../lib/courseRegistry'

describe('Apparatur-Registry', () => {
  it('rendert jede Apparatur als SVG mit Inhalt', () => {
    for (const [id, Drawing] of Object.entries(apparatusRegistry)) {
      const { container, unmount } = render(<Drawing />)
      const svg = container.querySelector('svg')
      expect(svg, `${id} rendert kein <svg>`).not.toBeNull()
      expect(svg!.getAttribute('viewBox'), `${id} hat keine einheitliche Bühne`).toBe('0 0 200 160')
      expect(svg!.children.length, `${id} ist leer`).toBeGreaterThan(1)
      unmount()
    }
  })

  it('zeichnet Strichstärken als gültige SVG-Attribute, nicht als JSX-camelCase', () => {
    // Der ursprüngliche Fehler: strokeWidth/textAnchor landeten als unbekannte
    // Attribute im DOM, weil die SVGs als Strings eingefügt wurden.
    const UvVis = apparatusRegistry['uv-vis']
    const { container } = render(<UvVis />)
    const html = container.innerHTML
    expect(html).not.toMatch(/strokeWidth=|textAnchor=|fontSize=/)
    expect(html).toMatch(/stroke-width=/)
  })

  it('hat für jede im Kurs verwendete Apparatur-ID eine Zeichnung', async () => {
    const topics = await loadAllTopics('analytical-chemistry-1')
    const used: string[] = []

    for (const topic of topics) {
      for (const teil of topic.interactives ?? []) {
        if (teil.type === 'apparatus-quiz') {
          for (const opt of teil.options) used.push(opt.id)
        }
        if (teil.type === 'apparatus-matching') {
          for (const paar of teil.paare) used.push(paar.apparaturId)
        }
      }
    }

    expect(used.length, 'keine Apparatur-Aufgaben gefunden – Test prüft nichts').toBeGreaterThan(0)

    const fehlend = [...new Set(used)].filter(id => !(id in apparatusRegistry))
    expect(fehlend, `Apparatur-IDs ohne Zeichnung: ${fehlend.join(', ')}`).toEqual([])
  })
})
