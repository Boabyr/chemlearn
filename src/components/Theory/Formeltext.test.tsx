import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Formeltext from './Formeltext'

describe('Formeltext', () => {
  it('setzt Inline-Mathematik als KaTeX', () => {
    const { container } = render(<Formeltext text={'Es gilt $\\vec{j} = \\sigma \\vec{E}$.'} />)
    expect(container.querySelector('.katex')).not.toBeNull()
    // KaTeX legt die Quelle als MathML-Annotation ab; sichtbar ist der Satz.
    expect(container.querySelector('.katex-html')).not.toBeNull()
    expect(container.textContent).not.toContain('$')
  })

  it('setzt abgesetzte Formeln mit $$…$$', () => {
    const { container } = render(<Formeltext text={'$$E = mc^2$$'} />)
    expect(container.querySelector('.katex-display')).not.toBeNull()
  })

  it('setzt Summenformeln im Fließtext tief', () => {
    const { container } = render(<Formeltext text="Ca(OH)2 fällt aus." />)
    expect(container.textContent).toBe('Ca(OH)₂ fällt aus.')
  })

  it('lässt den Chemiesatz bei formelsatz="aus" in Ruhe', () => {
    const { container } = render(<Formeltext text="Ca(OH)2" formelsatz="aus" />)
    expect(container.textContent).toBe('Ca(OH)2')
  })

  it('rührt einzelne Dollarzeichen nicht an', () => {
    const { container } = render(<Formeltext text="Kostet 5$ pro Stück." />)
    expect(container.textContent).toBe('Kostet 5$ pro Stück.')
  })

  it('zeigt fehlerhaftes LaTeX an, statt abzustürzen', () => {
    const { container } = render(<Formeltext text={'$\\frac{1$'} />)
    expect(container.textContent).toContain('\\frac{1')
  })

  it('mischt Text, Chemie und Mathematik in einer Zeile', () => {
    const { container } = render(<Formeltext text={'H2SO4 bei 10^-3 mol/l, also $c = 10^{-3}$.'} />)
    expect(container.textContent).toContain('H₂SO₄')
    expect(container.textContent).toContain('10⁻³')
    expect(container.querySelector('.katex')).not.toBeNull()
  })
})
