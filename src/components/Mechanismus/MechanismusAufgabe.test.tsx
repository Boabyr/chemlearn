import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MechanismusAufgabe from './MechanismusAufgabe'
import type { Mechanismus, Stufe } from './strukturTypen'

/**
 * Der Vorgänger hatte einen Zieh- und einen Klickpfad, die sich gegenseitig
 * zurücksetzten — mit der Maus kam nie ein Pfeil zustande, und niemand hat es
 * gemerkt, weil kein Test die Bedienung angefasst hat. Diese Tests fassen sie an.
 */

const stufe = (teil: Partial<Stufe>): Stufe => ({
  id: 0,
  titel: 'Angriff',
  aufgabe: 'Zeichne den Pfeil.',
  erklaerung: 'Das freie Paar bildet die neue Bindung.',
  hinweise: ['Erster Hinweis.', 'Zweiter Hinweis.'],
  atome: [
    { id: 'n1', element: 'N', x: 100, y: 120, freiePaare: 1 },
    { id: 'h1', element: 'H', x: 220, y: 120 },
    { id: 'cl1', element: 'Cl', x: 320, y: 120 },
  ],
  bindungen: [{ id: 'b1', von: 'h1', nach: 'cl1', ordnung: 1 }],
  pfeile: [
    { von: { art: 'freiesPaar', id: 'n1' }, nach: { art: 'atom', id: 'h1' } },
    { von: { art: 'bindung', id: 'b1' }, nach: { art: 'atom', id: 'cl1' } },
  ],
  ...teil,
})

const ergebnis: Mechanismus['ergebnis'] = {
  titel: 'Pyridinium',
  beschreibung: 'Protoniert.',
  atome: [
    { id: 'n1', element: 'N', x: 100, y: 120, ladung: 1 },
    { id: 'h1', element: 'H', x: 220, y: 120 },
  ],
  bindungen: [{ id: 'b2', von: 'n1', nach: 'h1', ordnung: 1 }],
}

function aufbauen(stufen: Stufe[] = [stufe({}), stufe({ id: 1, titel: 'Rückreaktion' })]) {
  const onComplete = vi.fn()
  render(
    <MechanismusAufgabe
      title="Testmechanismus" description="Beschreibung"
      stages={stufen} ergebnis={ergebnis} onComplete={onComplete}
    />,
  )
  return { onComplete, user: userEvent.setup() }
}

const ziel = (name: RegExp) => screen.getByRole('button', { name })

describe('Pfeile setzen', () => {
  it('erzeugt mit zwei Klicks einen Pfeil — ohne Ziehen', async () => {
    const { user } = aufbauen()

    await user.click(ziel(/Freies Elektronenpaar an N/))
    await user.click(ziel(/^Atom H$/))

    const liste = screen.getByRole('list', { name: /Gesetzte Pfeile/ })
    expect(within(liste).getAllByRole('listitem')).toHaveLength(1)
    expect(liste.textContent).toContain('freies Paar n1')
    expect(liste.textContent).toContain('atom h1')
  })

  it('setzt einen Pfeil auch über die Tastatur', async () => {
    const { user } = aufbauen()

    ziel(/Freies Elektronenpaar an N/).focus()
    await user.keyboard('{Enter}')
    ziel(/^Atom H$/).focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('list', { name: /Gesetzte Pfeile/ })).toBeTruthy()
  })

  it('bricht die Auswahl ab, wenn dieselbe Stelle zweimal getroffen wird', async () => {
    const { user } = aufbauen()

    await user.click(ziel(/Freies Elektronenpaar an N/))
    await user.click(ziel(/Freies Elektronenpaar an N/))

    expect(screen.queryByRole('list', { name: /Gesetzte Pfeile/ })).toBeNull()
    expect(screen.getByText(/Ausgangspunkt wählen/)).toBeTruthy()
  })

  it('nimmt einen gesetzten Pfeil wieder zurück', async () => {
    const { user } = aufbauen()

    await user.click(ziel(/Freies Elektronenpaar an N/))
    await user.click(ziel(/^Atom H$/))
    await user.click(screen.getByRole('button', { name: /Pfeil 1 entfernen/ }))

    expect(screen.queryByRole('list', { name: /Gesetzte Pfeile/ })).toBeNull()
  })
})

describe('Prüfen', () => {
  it('bleibt gesperrt, solange kein Pfeil steht', () => {
    aufbauen()
    expect(screen.getByRole('button', { name: 'Prüfen' })).toBeDisabled()
  })

  it('sagt bei einem fehlenden Pfeil, dass noch einer fehlt', async () => {
    const { user } = aufbauen()

    await user.click(ziel(/Freies Elektronenpaar an N/))
    await user.click(ziel(/^Atom H$/))
    await user.click(screen.getByRole('button', { name: 'Prüfen' }))

    expect(screen.getByText(/fehlt|fehlen/i)).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Weiter zum nächsten Schritt/ })).toBeNull()
  })

  it('nimmt beide Pfeile an, egal in welcher Reihenfolge sie gesetzt wurden', async () => {
    const { user } = aufbauen()

    await user.click(ziel(/Bindung h1–cl1/))
    await user.click(ziel(/^Atom Cl$/))
    await user.click(ziel(/Freies Elektronenpaar an N/))
    await user.click(ziel(/^Atom H$/))
    await user.click(screen.getByRole('button', { name: 'Prüfen' }))

    expect(screen.getByRole('button', { name: /Weiter zum nächsten Schritt/ })).toBeTruthy()
    // Nach der Lösung steht die Begründung da, nicht nur ein Häkchen.
    expect(screen.getByText(/Das freie Paar bildet die neue Bindung/)).toBeTruthy()
  })
})

describe('Ablauf über mehrere Stufen', () => {
  it('sagt beim Übergang, dass die Struktur sich verändert hat', async () => {
    const { user } = aufbauen()

    await user.click(ziel(/Freies Elektronenpaar an N/))
    await user.click(ziel(/^Atom H$/))
    await user.click(ziel(/Bindung h1–cl1/))
    await user.click(ziel(/^Atom Cl$/))
    await user.click(screen.getByRole('button', { name: 'Prüfen' }))
    await user.click(screen.getByRole('button', { name: /Weiter zum nächsten Schritt/ }))

    expect(screen.getByText(/Die Struktur hat sich verändert|herausgekommen/i)).toBeTruthy()
  })

  it('meldet am Ende, ob ohne Hinweise gelöst wurde', async () => {
    const { onComplete, user } = aufbauen([stufe({})])

    await user.click(screen.getByRole('button', { name: /Hinweis 1/ }))
    await user.click(ziel(/Freies Elektronenpaar an N/))
    await user.click(ziel(/^Atom H$/))
    await user.click(ziel(/Bindung h1–cl1/))
    await user.click(ziel(/^Atom Cl$/))
    await user.click(screen.getByRole('button', { name: 'Prüfen' }))
    await user.click(screen.getByRole('button', { name: /Abschließen/ }))

    expect(onComplete).toHaveBeenCalledWith(false)
    expect(screen.getByText(/mit Hinweisen/)).toBeTruthy()
  })
})
