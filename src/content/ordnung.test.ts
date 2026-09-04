import { describe, it, expect } from 'vitest'
import { allCourses } from '../lib/courseRegistry'
import { examQuestionsFor } from '../data/exams'

describe('Prüfungsordnungen', () => {
  const mitOrdnung = allCourses.filter(k => k.ordnung)

  it('summieren die Gebietsfragen zur Gesamtzahl', () => {
    for (const kurs of mitOrdnung) {
      const summe = kurs.ordnung!.gebiete.reduce((s, g) => s + g.fragen, 0)
      expect(summe, `${kurs.id}`).toBe(kurs.ordnung!.fragen)
    }
  })

  it('ordnen jedes Thema genau einem Gebiet zu', () => {
    for (const kurs of mitOrdnung) {
      const zugeordnet = kurs.ordnung!.gebiete.flatMap(g => g.topics)
      expect(new Set(zugeordnet).size, `${kurs.id}: ein Thema steht in zwei Gebieten`)
        .toBe(zugeordnet.length)
      expect([...kurs.topics].sort(), `${kurs.id}`).toEqual([...zugeordnet].sort())
    }
  })

  it('nennen streng fallende Notengrenzen', () => {
    for (const kurs of mitOrdnung) {
      const grenzen = kurs.ordnung!.noten.map(n => n.ab)
      expect(grenzen, `${kurs.id}`).toEqual([...grenzen].sort((a, b) => b - a))
      expect(new Set(grenzen).size, `${kurs.id}: doppelte Grenze`).toBe(grenzen.length)
    }
  })

  it('tragen nur Fragen mit gültigen Gruppierungen', () => {
    for (const kurs of mitOrdnung) {
      const fragen = examQuestionsFor(kurs.id)
      const validGruppen = new Set(kurs.ordnung!.gebiete.flatMap(g => g.id))
      for (const frage of fragen) {
        // This will be empty initially (no course has an ordnung yet).
        // It checks that every question's gruppe is in the ordnung.
        expect(validGruppen.has(frage.gruppe), `${kurs.id}: frage ${frage.id} hat ungültige gruppe ${frage.gruppe}`).toBe(true)
      }
    }
  })
})
