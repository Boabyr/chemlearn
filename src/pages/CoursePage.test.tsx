import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CoursePage from './CoursePage'

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({ user: { id: 'nutzer-1' }, loading: false }),
}))
vi.mock('../hooks/useMastery', () => ({
  useMastery: () => ({ topics: [], loading: false }),
}))
vi.mock('../hooks/useReviews', () => ({
  useReviews: () => ({ dueCount: 0 }),
}))

function aufbauen(courseId: string) {
  render(
    <MemoryRouter initialEntries={[`/course/${courseId}`]}>
      <Routes>
        <Route path='/course/:courseId' element={<CoursePage />} />
        <Route path='/course/:courseId/formeln' element={<p>Formelsammlung geöffnet</p>} />
      </Routes>
    </MemoryRouter>,
  )
  return userEvent.setup()
}

const formelKnopf = () => screen.queryByRole('button', { name: /formelsammlung/i })

describe('Kursseite', () => {
  it('bietet die Formelsammlung an, wenn der Kurs Formeln hat', async () => {
    const user = aufbauen('experimentale-physik-2')

    await screen.findByRole('button', { name: /formelsammlung/i })
    await user.click(formelKnopf()!)

    expect(screen.getByText('Formelsammlung geöffnet')).toBeInTheDocument()
  })

  it('nennt die Zahl der Formeln', async () => {
    aufbauen('experimentale-physik-2')

    expect(await screen.findByText(/30 Formeln/)).toBeInTheDocument()
  })

  it('lässt die Formelsammlung weg, wo der Kurs keine Formeln hat', async () => {
    aufbauen('organic-chemistry')

    // Erst warten, bis die Themen geladen sind — sonst prüft der Test nur, dass
    // beim ersten Bild noch nichts da ist.
    await screen.findByRole('button', { name: /General Introduction/ })
    expect(formelKnopf()).not.toBeInTheDocument()
  })
})
