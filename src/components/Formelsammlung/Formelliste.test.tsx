import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Formelliste from './Formelliste'
import type { Formelgruppe } from '../../lib/formelsammlung'

const gruppen: Formelgruppe[] = [
  {
    id: 'gleichstromkreise',
    titel: 'Gleichstromkreise',
    eintraege: [{
      topicId: '04-ohmsches-gesetz',
      topicTitle: 'Ohmsches Gesetz',
      formel: {
        id: 'ohm',
        name: 'Ohmsches Gesetz',
        equation: 'U = R * I',
        variables: [
          { id: 'U', label: 'Spannung', symbol: 'U', unit: 'V', description: 'Abfall am Widerstand' },
          { id: 'R', label: 'Widerstand', symbol: 'R', unit: 'Ohm', description: '' },
          { id: 'I', label: 'Stromstärke', symbol: 'I', unit: 'A', description: '' },
        ],
        umstellungen: [
          { solveFor: 'U', expr: 'R * I' },
          { solveFor: 'R', expr: 'U / I' },
        ],
        hints: ['Gilt nur für ohmsche Widerstände.'],
      },
    }],
  },
  {
    id: 'interferenz',
    titel: 'Interferenz',
    eintraege: [{
      topicId: '17-young-doppelspalt',
      topicTitle: 'Young-Doppelspalt',
      formel: {
        id: 'doppelspalt',
        name: 'Gangunterschied am Doppelspalt',
        equation: 'delta = d * sin(theta)',
        variables: [
          { id: 'delta', label: 'Gangunterschied', symbol: 'delta', unit: 'm', description: '' },
          { id: 'd', label: 'Spaltabstand', symbol: 'd', unit: 'm', description: '' },
          { id: 'theta', label: 'Winkel', symbol: 'theta', unit: 'rad', description: '' },
        ],
        umstellungen: [{ solveFor: 'delta', expr: 'd * sin(theta)' }],
        hints: [],
      },
    }],
  },
]

function aufbauen() {
  render(<MemoryRouter><Formelliste courseId="experimentale-physik-2" gruppen={gruppen} /></MemoryRouter>)
  return userEvent.setup()
}

const suchfeld = () => screen.getByRole('searchbox', { name: /suchen/i })

describe('Formelliste', () => {
  it('zeigt jedes Gebiet mit seinen Formeln', () => {
    aufbauen()
    expect(screen.getByRole('heading', { name: 'Gleichstromkreise' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Interferenz' })).toBeInTheDocument()
    expect(screen.getByLabelText('Gleichung U = R * I')).toBeInTheDocument()
    expect(screen.getByLabelText('Gleichung delta = d * sin(theta)')).toBeInTheDocument()
  })

  it('nennt zu jeder Größe Symbol, Bedeutung und Einheit', () => {
    aufbauen()
    const zeile = screen.getByRole('row', { name: /Spaltabstand/ })
    expect(within(zeile).getByText('d')).toBeInTheDocument()
    expect(within(zeile).getByText('m')).toBeInTheDocument()
  })

  it('zeigt die Umstellungen der Formel', () => {
    aufbauen()
    expect(screen.getByText('R = U / I')).toBeInTheDocument()
  })

  it('verlinkt auf das Thema', () => {
    aufbauen()
    expect(screen.getByRole('link', { name: /Ohmsches Gesetz/ }))
      .toHaveAttribute('href', '/course/experimentale-physik-2/04-ohmsches-gesetz')
  })

  it('blendet beim Suchen die Gebiete ohne Treffer aus', async () => {
    const user = aufbauen()
    await user.type(suchfeld(), 'doppelspalt')

    expect(screen.getByRole('heading', { name: 'Interferenz' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Gleichstromkreise' })).not.toBeInTheDocument()
  })

  it('meldet, wenn die Suche nichts findet', async () => {
    const user = aufbauen()
    await user.type(suchfeld(), 'kernspin')

    expect(screen.getByText(/keine formel/i)).toBeInTheDocument()
  })

  it('zeigt Hinweise erst auf Verlangen', async () => {
    const user = aufbauen()
    expect(screen.queryByText(/ohmsche Widerstände/)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /hinweis/i }))

    expect(screen.getByText(/ohmsche Widerstände/)).toBeInTheDocument()
  })
})
