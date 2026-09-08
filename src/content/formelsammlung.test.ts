import { describe, it, expect } from 'vitest'
import { allCourses, loadAllTopics } from '../lib/courseRegistry'
import { formelnAusThemen, gruppiereFormeln } from '../lib/formelsammlung'

/**
 * Die Formelsammlung zeigt nur, was in den Themen schon steht. Diese Wächter
 * halten fest, dass beim Einsammeln nichts unter den Tisch fällt: keine
 * doppelte Kennung, keine Formel außerhalb der Gebiete der Prüfungsordnung.
 */

describe.each(allCourses.map(k => [k.id] as const))('%s: Formelsammlung', (kursId) => {
  it('trägt keine Formelkennung zweimal', async () => {
    const eintraege = formelnAusThemen(await loadAllTopics(kursId))
    const ids = eintraege.map(e => e.formel.id)
    const doppelt = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect([...new Set(doppelt)]).toEqual([])
  })

  it('ordnet jede Formel einem Gebiet der Prüfungsordnung zu', async () => {
    const kurs = allCourses.find(k => k.id === kursId)!
    if (!kurs.ordnung) return

    const eintraege = formelnAusThemen(await loadAllTopics(kursId))
    const gruppen = gruppiereFormeln(eintraege, kurs.ordnung)

    const heimatlos = gruppen.find(g => g.id === 'weitere')?.eintraege.map(e => e.topicId) ?? []
    expect(heimatlos, 'diese Themen stehen in keinem Gebiet').toEqual([])
    expect(gruppen.reduce((s, g) => s + g.eintraege.length, 0)).toBe(eintraege.length)
  })
})

describe('Experimentalphysik 2', () => {
  it('hat zu jedem der 30 Themen eine Formel', async () => {
    const themen = await loadAllTopics('experimentale-physik-2')
    const eintraege = formelnAusThemen(themen)
    const ohneFormel = themen
      .filter(thema => !eintraege.some(e => e.topicId === thema.id))
      .map(thema => thema.id)

    expect(ohneFormel).toEqual([])
    expect(eintraege.length).toBeGreaterThanOrEqual(30)
  })

  it('verteilt die Formeln auf alle acht Gebiete', async () => {
    const kurs = allCourses.find(k => k.id === 'experimentale-physik-2')!
    const gruppen = gruppiereFormeln(formelnAusThemen(await loadAllTopics(kurs.id)), kurs.ordnung)

    expect(gruppen.map(g => g.id)).toEqual(kurs.ordnung!.gebiete.map(g => g.id))
  })
})
