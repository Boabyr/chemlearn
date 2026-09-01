import { describe, it, expect } from 'vitest'
import { pruefeZuordnung, befundText, bildReihenfolge } from './zuordnung'

const erwartet = [
  { label: 'UV/Vis-Photometer', apparaturId: 'uv-vis' },
  { label: 'Fluoreszenzspektrometer', apparaturId: 'fluorescence' },
  { label: 'FT-IR-Spektrometer', apparaturId: 'ftir' },
]

describe('pruefeZuordnung', () => {
  it('erkennt eine vollständig richtige Zuordnung', () => {
    const befund = pruefeZuordnung({
      'UV/Vis-Photometer': 'uv-vis',
      'Fluoreszenzspektrometer': 'fluorescence',
      'FT-IR-Spektrometer': 'ftir',
    }, erwartet)
    expect(befund.vollstaendig).toBe(true)
    expect(befund.richtig).toBe(3)
    expect(befundText(befund, 3)).toMatch(/sitzen/)
  })

  it('urteilt je Paar statt als Ganzes', () => {
    const befund = pruefeZuordnung({
      'UV/Vis-Photometer': 'uv-vis',
      'Fluoreszenzspektrometer': 'ftir',
      'FT-IR-Spektrometer': 'fluorescence',
    }, erwartet)
    expect(befund.urteile['UV/Vis-Photometer']).toBe('richtig')
    expect(befund.urteile['Fluoreszenzspektrometer']).toBe('falsch')
    expect(befund.vollstaendig).toBe(false)
    expect(befund.richtig).toBe(1)
    expect(befund.falsch).toBe(2)
  })

  it('zählt fehlende Zuordnungen getrennt von falschen', () => {
    const befund = pruefeZuordnung({ 'UV/Vis-Photometer': 'ftir' }, erwartet)
    expect(befund.falsch).toBe(1)
    expect(befund.offen).toBe(2)
    expect(befundText(befund, 3)).toMatch(/fehlen noch/)
  })

  it('nennt eine einzelne Lücke im Singular', () => {
    const befund = pruefeZuordnung({
      'UV/Vis-Photometer': 'uv-vis',
      'Fluoreszenzspektrometer': 'fluorescence',
    }, erwartet)
    expect(befundText(befund, 3)).toMatch(/eine fehlt noch/)
  })

  it('ist von der Reihenfolge der Eingabe unabhängig', () => {
    const a = pruefeZuordnung({ 'FT-IR-Spektrometer': 'ftir', 'UV/Vis-Photometer': 'uv-vis' }, erwartet)
    const b = pruefeZuordnung({ 'UV/Vis-Photometer': 'uv-vis', 'FT-IR-Spektrometer': 'ftir' }, erwartet)
    expect(a).toEqual(b)
  })
})

describe('bildReihenfolge', () => {
  it('mischt gegenüber der Namensreihenfolge', () => {
    const ids = ['uv-vis', 'fluorescence', 'ftir', 'chemoluminescence']
    expect(bildReihenfolge(ids)).not.toEqual(ids)
  })

  it('bleibt über Aufrufe hinweg gleich', () => {
    const ids = ['uv-vis', 'fluorescence', 'ftir']
    expect(bildReihenfolge(ids)).toEqual(bildReihenfolge(ids))
  })

  it('verliert und erfindet nichts', () => {
    const ids = ['a', 'b', 'c', 'd', 'e']
    expect([...bildReihenfolge(ids)].sort()).toEqual(ids)
  })
})
