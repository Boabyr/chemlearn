import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { kursSchema, themaSchema } from './schema'
import { kartenId } from './kartenId'
import { allCourses, loadAllTopics, loadTopic, vorhandeneThemen } from '../lib/courseRegistry'
import { apparatusRegistry } from '../components/Apparatus/registry'
import { examQuestionsFor, examStructuresFor } from '../data/exams'

/** Zod-Fehler lesbar machen, sonst sucht man den Pfad im Rauschen. */
function beanstandungen(fehler: z.ZodError): string {
  return fehler.issues.map(i => `  ${i.path.join('.') || '(Wurzel)'}: ${i.message}`).join('\n')
}

describe('Kursköpfe', () => {
  it('werden von allein gefunden', () => {
    // Kein Handregister mehr: ein Ordner unter src/courses reicht.
    expect(allCourses.length).toBeGreaterThan(0)
    expect(allCourses.map(k => k.id)).toContain('analytical-chemistry-1')
  })

  it.each(allCourses.map(k => [k.id, k] as const))('%s entspricht dem Schema', (_id, kurs) => {
    const ergebnis = kursSchema.safeParse(kurs)
    expect(ergebnis.success, ergebnis.success ? '' : `\n${beanstandungen(ergebnis.error)}`).toBe(true)
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: Themenliste und Dateien decken sich', async (kursId) => {
    const kurs = allCourses.find(k => k.id === kursId)!
    const dateien = vorhandeneThemen(kursId)

    const fehlendeDateien = kurs.topics.filter(t => !dateien.includes(t))
    expect(fehlendeDateien, 'in der Kursliste, aber ohne Datei').toEqual([])

    const verwaisteDateien = dateien.filter(t => !kurs.topics.includes(t))
    expect(verwaisteDateien, 'Datei vorhanden, aber nicht in der Kursliste').toEqual([])
  })
})

describe('Themen', () => {
  it.each(allCourses.flatMap(k => k.topics.map(t => [k.id, t] as const)))(
    '%s/%s entspricht dem Schema',
    async (kursId, themaId) => {
      const thema = await loadTopic(kursId, themaId)
      const ergebnis = themaSchema.safeParse(thema)
      expect(ergebnis.success, ergebnis.success ? '' : `\n${beanstandungen(ergebnis.error)}`).toBe(true)
      expect(thema.id, 'Themen-Kennung muss dem Dateinamen entsprechen').toBe(themaId)
    },
  )

  it('haben Karten-Kennungen, die aus der Vorderseite stammen', async () => {
    const falsch: string[] = []
    for (const kurs of allCourses) {
      for (const thema of await loadAllTopics(kurs.id)) {
        for (const karte of thema.flashcards) {
          const erwartet = kartenId(karte.front)
          if (karte.id !== erwartet) falsch.push(`${thema.id}: "${karte.front.slice(0, 40)}" hat ${karte.id}, erwartet ${erwartet}`)
        }
      }
    }
    expect(falsch).toEqual([])
  })

  it('verweisen nur auf gezeichnete Apparaturen', async () => {
    const unbekannt: string[] = []
    for (const kurs of allCourses) {
      for (const thema of await loadAllTopics(kurs.id)) {
        if (thema.interactive?.type !== 'apparatus-quiz') continue
        for (const option of thema.interactive.options) {
          if (!(option.id in apparatusRegistry)) unbekannt.push(`${thema.id}: ${option.id}`)
        }
      }
    }
    expect(unbekannt).toEqual([])
  })
})

describe('Prüfungsdaten', () => {
  it.each(allCourses.map(k => [k.id] as const))('%s: Fragen zeigen auf vorhandene Themen', async (kursId) => {
    const kurs = allCourses.find(k => k.id === kursId)!
    const unbekannt = examQuestionsFor(kursId)
      .filter(frage => !kurs.topics.includes(frage.topicId))
      .map(frage => `${frage.id} -> ${frage.topicId}`)
    expect(unbekannt).toEqual([])
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: Fragen nennen bekannte Prüfer', async (kursId) => {
    const kurs = allCourses.find(k => k.id === kursId)!
    if (kurs.examiners.length === 0) return
    const bekannt = kurs.examiners.map(p => p.id)
    const unbekannt = [...new Set(examQuestionsFor(kursId).map(f => f.examiner))]
      .filter(p => !bekannt.includes(p))
    expect(unbekannt).toEqual([])
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: Prüfungsstrukturen verweisen auf vorhandene Fragen', async (kursId) => {
    const ids = new Set(examQuestionsFor(kursId).map(f => f.id))
    const fehlend: string[] = []
    for (const struktur of examStructuresFor(kursId)) {
      for (const abschnitt of struktur.sections) {
        for (const fragenId of abschnitt.questionIds) {
          if (!ids.has(fragenId)) fehlend.push(`${struktur.id}/${abschnitt.examiner}: ${fragenId}`)
        }
      }
    }
    expect(fehlend).toEqual([])
  })

  it('hat keine doppelten Fragen-Kennungen', () => {
    for (const kurs of allCourses) {
      const ids = examQuestionsFor(kurs.id).map(f => f.id)
      expect(new Set(ids).size, `${kurs.id}: doppelte Fragen-ID`).toBe(ids.length)
    }
  })
})
