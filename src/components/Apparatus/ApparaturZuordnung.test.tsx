import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ApparaturZuordnung from './ApparaturZuordnung'
import { loadAllTopics } from '../../lib/courseRegistry'
import { apparatusRegistry } from './registry'
import { bildReihenfolge } from './zuordnung'

const paare = [
  { apparaturId: 'uv-vis', label: 'UV/Vis-Photometer', hinweis: 'Detektor hinter der Probe.' },
  { apparaturId: 'fluorescence', label: 'Fluoreszenzspektrometer' },
  { apparaturId: 'ftir', label: 'FT-IR-Spektrometer' },
]

function aufbauen() {
  const onComplete = vi.fn()
  render(
    <ApparaturZuordnung title="Drei Spektrometer" description="Ordne zu."
      paare={paare} explanation="Der Detektorort entscheidet." onComplete={onComplete} />,
  )
  return { onComplete, user: userEvent.setup() }
}

const bilder = () => within(screen.getByRole('list', { name: 'Abbildungen' })).getAllByRole('button')
const namen = () => within(screen.getByRole('list', { name: 'Geräte' })).getAllByRole('button')

// Die Kennung steht bewusst nicht im DOM — sie wäre die Antwort. Der Test
// rechnet die Reihenfolge mit derselben Funktion nach wie das Bauteil.
const bildVon = (id: string) => bilder()[bildReihenfolge(paare.map(p => p.apparaturId)).indexOf(id)]

describe('Zuordnen', () => {
  it('verbindet Name und Bild mit zwei Klicks', async () => {
    const { user } = aufbauen()
    await user.click(namen()[0])
    await user.click(bildVon('uv-vis'))
    expect(namen()[0].textContent).toContain('UV/Vis-Photometer')
    expect(bildVon('uv-vis').getAttribute('aria-label')).toContain('zugeordnet zu UV/Vis-Photometer')
  })

  it('hebt die Auswahl auf, wenn derselbe Name zweimal getroffen wird', async () => {
    const { user } = aufbauen()
    await user.click(namen()[0])
    await user.click(namen()[0])
    expect(screen.getByText(/Ein Gerät wählen/)).toBeTruthy()
  })

  it('löst eine Zuordnung, wenn das Bild ohne gewählten Namen getroffen wird', async () => {
    const { user } = aufbauen()
    await user.click(namen()[0])
    await user.click(bildVon('uv-vis'))
    await user.click(bildVon('uv-vis'))
    expect(bildVon('uv-vis').getAttribute('aria-label')).toContain('noch nicht zugeordnet')
  })

  it('gibt ein Bild frei, wenn es einem anderen Namen zugeordnet wird', async () => {
    const { user } = aufbauen()
    await user.click(namen()[0])
    await user.click(bildVon('uv-vis'))
    await user.click(namen()[1])
    await user.click(bildVon('uv-vis'))
    expect(namen()[0].textContent).not.toContain('→')
    expect(bildVon('uv-vis').getAttribute('aria-label')).toContain('Fluoreszenzspektrometer')
  })
})

describe('Prüfen', () => {
  it('bleibt gesperrt, solange nichts zugeordnet ist', () => {
    aufbauen()
    expect(screen.getByRole('button', { name: 'Prüfen' })).toBeDisabled()
  })

  it('sagt, wie viele fehlen, statt nur "falsch"', async () => {
    const { user } = aufbauen()
    await user.click(namen()[0])
    await user.click(bildVon('uv-vis'))
    await user.click(screen.getByRole('button', { name: 'Prüfen' }))
    expect(screen.getByText(/fehlen noch/)).toBeTruthy()
  })

  it('zeigt bei einer falschen Zuordnung deren Hinweis', async () => {
    const { user } = aufbauen()
    await user.click(namen()[0])
    await user.click(bildVon('ftir'))
    await user.click(screen.getByRole('button', { name: 'Prüfen' }))
    expect(screen.getByText('Detektor hinter der Probe.')).toBeTruthy()
  })

  it('meldet die vollständige Lösung und zeigt die Erklärung', async () => {
    const { onComplete, user } = aufbauen()
    for (const paar of paare) {
      await user.click(namen().find(n => n.textContent?.includes(paar.label))!)
      await user.click(bildVon(paar.apparaturId))
    }
    await user.click(screen.getByRole('button', { name: 'Prüfen' }))
    expect(screen.getByText(/Alle 3 Zuordnungen sitzen/)).toBeTruthy()
    expect(screen.getByText('Der Detektorort entscheidet.')).toBeTruthy()
    expect(onComplete).toHaveBeenCalledWith(true)
  })
})

describe('Zuordnungen der Kurse', () => {
  it('nennen nur Apparaturen, die gezeichnet sind', async () => {
    let gefunden = 0
    const fehlend: string[] = []
    for (const thema of await loadAllTopics('analytical-chemistry-1')) {
      for (const teil of thema.interactives ?? []) {
        if (teil.type !== 'apparatus-matching') continue
        gefunden++
        for (const paar of teil.paare) {
          if (!(paar.apparaturId in apparatusRegistry)) fehlend.push(`${thema.id}: ${paar.apparaturId}`)
        }
      }
    }
    expect(gefunden, 'keine Zuordnungsaufgabe im Kurs').toBeGreaterThan(0)
    expect(fehlend).toEqual([])
  })

  it('nehmen nahezu alle Zeichnungen in Gebrauch', async () => {
    const benutzt = new Set<string>()
    for (const thema of await loadAllTopics('analytical-chemistry-1')) {
      for (const teil of thema.interactives ?? []) {
        if (teil.type === 'apparatus-matching') teil.paare.forEach(p => benutzt.add(p.apparaturId))
        if (teil.type === 'apparatus-quiz') teil.options.forEach(o => benutzt.add(o.id))
      }
    }
    const brach = Object.keys(apparatusRegistry).filter(id => !benutzt.has(id))
    expect(brach, 'gezeichnet, aber nirgends geübt').toEqual([])
  })
})
