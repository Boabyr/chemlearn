import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TheoryRenderer from './TheoryRenderer'

describe('TheoryRenderer', () => {
  it('rendert Fettschrift als <strong> statt als Sternchen', () => {
    const { container } = render(<TheoryRenderer markdown="Das **Lambert-Beer-Gesetz** gilt." />)
    expect(container.querySelector('strong')?.textContent).toBe('Lambert-Beer-Gesetz')
    expect(container.textContent).not.toContain('**')
  })

  it('rendert Tabellen als echte Tabelle', () => {
    const md = ['| Methode | Bereich |', '| --- | --- |', '| UV/Vis | 200–800 nm |'].join('\n')
    const { container } = render(<TheoryRenderer markdown={md} />)
    expect(container.querySelector('table')).not.toBeNull()
    expect(container.querySelectorAll('th')).toHaveLength(2)
    expect(container.querySelectorAll('tbody tr')).toHaveLength(1)
  })

  it('setzt Formeln mit KaTeX', () => {
    const { container } = render(<TheoryRenderer markdown={'Es gilt $A = \\varepsilon \\cdot c \\cdot d$.'} />)
    expect(container.querySelector('.katex')).not.toBeNull()
  })

  it('setzt Summenformeln im Fließtext tief', () => {
    const { container } = render(<TheoryRenderer markdown="Wir titrieren H2SO4 gegen NaOH." />)
    expect(container.textContent).toContain('H₂SO₄')
  })

  it('lässt Formeln in Code-Auszeichnung unangetastet', () => {
    const { container } = render(<TheoryRenderer markdown="Der Schlüssel `H2SO4` bleibt roh." />)
    expect(container.querySelector('code')?.textContent).toBe('H2SO4')
  })

  it('gibt Überschriften eine ID zum Verlinken', () => {
    const { container } = render(<TheoryRenderer markdown={'## Lambert-Beer\n\nText'} />)
    expect(container.querySelector('h2')?.id).toBe('lambert-beer')
  })

  it('rendert Listen als Liste', () => {
    const { container } = render(<TheoryRenderer markdown={'- eins\n- zwei'} />)
    expect(container.querySelectorAll('li')).toHaveLength(2)
  })

  it('rendert keine rohen HTML-Tags aus dem Inhalt', () => {
    const { container } = render(<TheoryRenderer markdown={'<img src=x onerror="alert(1)">'} />)
    expect(container.querySelector('img')).toBeNull()
  })
})

describe('Inhaltsübersicht', () => {
  it('listet die Abschnitte eines Themas', () => {
    const md = ['## Grundlagen', 'Text', '## Anwendung', 'Text'].join('\n\n')
    render(<TheoryRenderer markdown={md} showToc />)
    const toc = screen.getByRole('navigation', { name: /inhalt/i })
    expect(toc.querySelectorAll('a')).toHaveLength(2)
    expect(toc.querySelector('a')?.getAttribute('href')).toBe('#grundlagen')
  })

  it('bleibt bei einem einzigen Abschnitt weg', () => {
    render(<TheoryRenderer markdown={'## Nur eins\n\nText'} showToc />)
    expect(screen.queryByRole('navigation', { name: /inhalt/i })).toBeNull()
  })
})
