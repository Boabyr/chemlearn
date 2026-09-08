import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Formelsammlung from './Formelsammlung'
import { kursMit } from '../lib/courseRegistry'

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({ user: { id: 'nutzer-1' }, loading: false }),
}))

function aufbauen(courseId: string) {
  render(
    <MemoryRouter initialEntries={[`/course/${courseId}/formeln`]}>
      <Routes>
        <Route path='/course/:courseId/formeln' element={<Formelsammlung />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Formelsammlung-Seite', () => {
  it('zeigt die Gebiete des Kurses, sobald die Themen geladen sind', async () => {
    aufbauen('experimentale-physik-2')

    const gebiete = kursMit('experimentale-physik-2')!.ordnung!.gebiete
    for (const gebiet of gebiete) {
      expect(await screen.findByRole('heading', { name: gebiet.titel })).toBeInTheDocument()
    }
  })

  it('führt zurück auf die Kursseite', async () => {
    aufbauen('experimentale-physik-2')

    expect(await screen.findByRole('link', { name: /zurück zum kurs/i }))
      .toHaveAttribute('href', '/course/experimentale-physik-2')
  })
})
