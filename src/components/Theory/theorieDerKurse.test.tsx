import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import TheoryRenderer from './TheoryRenderer'
import { loadAllTopics } from '../../lib/courseRegistry'

/**
 * Wacht darüber, dass Auszeichnung im echten Kursinhalt auch ankommt.
 * Bis hierher standen 722 `**fett**`-Marker als Sternchen auf dem Schirm.
 */
describe('Theorie aller Kurse', () => {
  it('rendert Fettschrift aus dem AC1-Kurs, statt Sternchen zu zeigen', async () => {
    const themen = await loadAllTopics('analytical-chemistry-1')
    const mitFett = themen.filter(t => t.theory.includes('**'))
    expect(mitFett.length).toBeGreaterThan(0)

    for (const thema of mitFett) {
      const { container, unmount } = render(<TheoryRenderer markdown={thema.theory} />)
      expect(container.querySelector('strong'), `${thema.id}: kein <strong>`).not.toBeNull()
      expect(container.textContent, `${thema.id}: Sternchen sichtbar`).not.toContain('**')
      unmount()
    }
  })

  it('rendert Tabellen aus dem Kursinhalt als Tabelle', async () => {
    const themen = await loadAllTopics('analytical-chemistry-1')
    const mitTabelle = themen.filter(t => /^\|.+\|/m.test(t.theory))
    expect(mitTabelle.length).toBeGreaterThan(0)

    for (const thema of mitTabelle) {
      const { container, unmount } = render(<TheoryRenderer markdown={thema.theory} />)
      expect(container.querySelector('table'), `${thema.id}: keine <table>`).not.toBeNull()
      unmount()
    }
  })

  it('lässt kein Thema beim Rendern abstürzen', async () => {
    for (const kurs of ['analytical-chemistry-1', 'organic-chemistry']) {
      const themen = await loadAllTopics(kurs)
      expect(themen.length).toBeGreaterThan(0)
      for (const thema of themen) {
        const { unmount } = render(<TheoryRenderer markdown={thema.theory} showToc />)
        unmount()
      }
    }
  })
})
