import { describe, it, expect } from 'vitest'
import type { Formel, Ordnung, Thema } from '../content/schema'
import { formelnAusThemen, gruppiereFormeln, passtZuSuche } from './formelsammlung'

const formel = (id: string, name = id): Formel => ({
  id,
  name,
  equation: 'a = b * c',
  variables: [
    { id: 'a', label: 'Ergebnis', symbol: 'a', unit: 'm', description: '' },
    { id: 'b', label: 'Faktor', symbol: 'b', unit: 'm', description: '' },
    { id: 'c', label: 'Zahl', symbol: 'c', unit: '', description: '' },
  ],
  umstellungen: [{ solveFor: 'a', expr: 'b * c' }],
  hints: [],
})

const thema = (id: string, title: string, teile: Thema['interactives'] = []): Thema => ({
  id,
  title,
  subtitle: '',
  icon: '',
  estimatedMinutes: 10,
  theory: 'x'.repeat(60),
  interactives: teile,
  abbildungen: [],
  quiz: [{ id: 'q1', question: 'f', options: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'e' }],
  flashcards: [{ id: 'abcdefg', front: 'v', back: 'r' }],
})

const ordnungMit = (gebiete: Ordnung['gebiete']): Ordnung => ({
  titel: 'Prüfung',
  fragen: gebiete.reduce((s, g) => s + g.fragen, 0),
  punkteJeFrage: 1,
  regel: 'streng',
  zeitMinuten: 60,
  noten: [{ ab: 1, note: 'genügend' }],
  gebiete,
})

describe('formelnAusThemen', () => {
  it('nimmt nur die Formelrechner unter den Interaktivteilen', () => {
    const themen = [
      thema('01-eins', 'Eins', [
        { type: 'apparatus-quiz', question: 'w', targetId: 'x', options: [
          { id: 'x', label: 'X', description: '' },
          { id: 'y', label: 'Y', description: '' },
        ], explanation: 'e' },
        { type: 'formula-calculator', formula: formel('f1') },
      ]),
    ]

    const eintraege = formelnAusThemen(themen)

    expect(eintraege).toEqual([{ topicId: '01-eins', topicTitle: 'Eins', formel: formel('f1') }])
  })

  it('nimmt mehrere Formeln eines Themas in Reihenfolge mit', () => {
    const themen = [
      thema('01-eins', 'Eins', [
        { type: 'formula-calculator', formula: formel('f1') },
        { type: 'formula-calculator', formula: formel('f2') },
      ]),
      thema('02-zwei', 'Zwei', []),
    ]

    expect(formelnAusThemen(themen).map(e => e.formel.id)).toEqual(['f1', 'f2'])
  })
})

describe('gruppiereFormeln', () => {
  const eintraege = [
    { topicId: '01-eins', topicTitle: 'Eins', formel: formel('f1') },
    { topicId: '02-zwei', topicTitle: 'Zwei', formel: formel('f2') },
  ]

  it('gruppiert nach den Gebieten der Prüfungsordnung', () => {
    const ordnung = ordnungMit([
      { id: 'g-b', titel: 'Gebiet B', fragen: 1, topics: ['02-zwei'] },
      { id: 'g-a', titel: 'Gebiet A', fragen: 1, topics: ['01-eins'] },
    ])

    expect(gruppiereFormeln(eintraege, ordnung)).toEqual([
      { id: 'g-b', titel: 'Gebiet B', eintraege: [eintraege[1]] },
      { id: 'g-a', titel: 'Gebiet A', eintraege: [eintraege[0]] },
    ])
  })

  it('lässt Gebiete ohne Formel weg', () => {
    const ordnung = ordnungMit([
      { id: 'g-a', titel: 'Gebiet A', fragen: 1, topics: ['01-eins', '02-zwei'] },
      { id: 'g-leer', titel: 'Leer', fragen: 1, topics: ['03-drei'] },
    ])

    expect(gruppiereFormeln(eintraege, ordnung).map(g => g.id)).toEqual(['g-a'])
  })

  it('sammelt Formeln ohne Gebiet am Ende, statt sie fallen zu lassen', () => {
    const ordnung = ordnungMit([
      { id: 'g-a', titel: 'Gebiet A', fragen: 1, topics: ['01-eins'] },
    ])

    const gruppen = gruppiereFormeln(eintraege, ordnung)

    expect(gruppen.map(g => g.id)).toEqual(['g-a', 'weitere'])
    expect(gruppen[1].eintraege).toEqual([eintraege[1]])
  })

  it('gibt ohne Prüfungsordnung eine einzige Gruppe zurück', () => {
    expect(gruppiereFormeln(eintraege, undefined)).toEqual([
      { id: 'alle', titel: 'Alle Formeln', eintraege },
    ])
  })
})

describe('passtZuSuche', () => {
  const eintrag = {
    topicId: '17-young-doppelspalt',
    topicTitle: 'Young-Doppelspalt',
    formel: formel('gangunterschied', 'Gangunterschied am Doppelspalt'),
  }

  it('findet über den Formelnamen, ohne auf Groß- und Kleinschreibung zu achten', () => {
    expect(passtZuSuche(eintrag, 'doppelspalt')).toBe(true)
  })

  it('findet über das Symbol einer Größe', () => {
    expect(passtZuSuche(eintrag, 'b')).toBe(true)
  })

  it('findet über den Themennamen', () => {
    expect(passtZuSuche(eintrag, 'young')).toBe(true)
  })

  it('verneint, was nirgends vorkommt', () => {
    expect(passtZuSuche(eintrag, 'mikroskop')).toBe(false)
  })

  it('lässt bei leerer Suche alles durch', () => {
    expect(passtZuSuche(eintrag, '   ')).toBe(true)
  })
})
