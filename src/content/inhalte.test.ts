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

describe('Kursangaben', () => {
  it.each(allCourses.map(k => [k.id] as const))('%s: die Stundenangabe stimmt mit den Themen überein', async (kursId) => {
    // 40 h angegeben gegen 20,7 h aus den Themenzeiten — eine erfundene Zahl
    // auf der Kurskarte ist schlimmer als gar keine.
    const kurs = allCourses.find(k => k.id === kursId)!
    const minuten = (await loadAllTopics(kursId)).reduce((s, t) => s + t.estimatedMinutes, 0)
    const stunden = minuten / 60
    expect(Math.abs(kurs.estimatedHours - stunden),
      `${kursId}: ${kurs.estimatedHours} h angegeben, ${stunden.toFixed(1)} h in den Themen`).toBeLessThan(1)
  })
})

describe('Mechanismen', () => {
  it('tragen jeder einen eigenen Titel — kein Mechanismus steht zweimal im Kurs', async () => {
    // 05 und 09 zeigten dieselbe Azid-Cycloaddition, nur mit anderem Partner.
    for (const kurs of allCourses) {
      const titel = (await loadAllTopics(kurs.id))
        .map(t => t.interactive)
        .filter(i => i?.type === 'mechanism')
        .map(i => (i as { title: string }).title)
      expect(new Set(titel).size, `${kurs.id}: doppelter Mechanismus-Titel`).toBe(titel.length)
    }
  })

  it('haben mehrere Schritte und ein Ergebnisbild', async () => {
    const duenn: string[] = []
    for (const kurs of allCourses) {
      for (const thema of await loadAllTopics(kurs.id)) {
        if (thema.interactive?.type !== 'mechanism') continue
        if (thema.interactive.stages.length < 2) duenn.push(`${thema.id}: nur ein Schritt`)
        if (!thema.interactive.ergebnis) duenn.push(`${thema.id}: kein Ergebnisbild`)
      }
    }
    expect(duenn).toEqual([])
  })
})

describe('Karteikarten über den ganzen Kurs', () => {
  it.each(allCourses.map(k => [k.id] as const))('%s: keine Karte steht zweimal', async (kursId) => {
    // Das Schema verbietet Dubletten nur innerhalb eines Themas — "Boger
    // Reaction" stand deshalb in zwei Themen.
    const gesehen = new Map<string, string>()
    const doppelt: string[] = []
    for (const thema of await loadAllTopics(kursId)) {
      for (const karte of thema.flashcards) {
        const vorher = gesehen.get(karte.id)
        if (vorher) doppelt.push(`"${karte.front.slice(0, 40)}" in ${vorher} und ${thema.id}`)
        else gesehen.set(karte.id, thema.id)
      }
    }
    expect(doppelt).toEqual([])
  })
})

describe('Sollstärke der Themen', () => {
  // Die Vorgabe aus CONTENT-PROMPT.md: sechs Quizfragen, sechs Karten,
  // ein Interaktivteil. Dazu mindestens eine Prüfungsfrage je Thema, sonst
  // kann das Thema in einer Übungsrunde nie vorkommen.
  it.each(allCourses.map(k => [k.id] as const))('%s: kein Thema bleibt unter der Vorgabe', async (kursId) => {
    const themen = await loadAllTopics(kursId)
    const fragenJeThema = new Map<string, number>()
    for (const frage of examQuestionsFor(kursId)) {
      fragenJeThema.set(frage.topicId, (fragenJeThema.get(frage.topicId) ?? 0) + 1)
    }

    const duenn = themen.flatMap(thema => {
      const mangel: string[] = []
      if (thema.quiz.length < 6) mangel.push(`nur ${thema.quiz.length} Quizfragen`)
      if (thema.flashcards.length < 6) mangel.push(`nur ${thema.flashcards.length} Karten`)
      if (!thema.interactive) mangel.push('kein Interaktivteil')
      if (!fragenJeThema.get(thema.id)) mangel.push('keine Prüfungsfrage')
      return mangel.length ? [`${thema.id}: ${mangel.join(', ')}`] : []
    })

    expect(duenn).toEqual([])
  })
})

describe('Länge der Theorietexte', () => {
  // CONTENT-PROMPT.md gibt 400 bis 900 Wörter je Thema vor. Sechs Themen der
  // organischen Chemie lagen darunter, eines bei der Hälfte — das fiel nur auf,
  // weil jemand nachgezählt hat. Jetzt zählt der Test.
  const MINDESTLAENGE = 400

  // Analytische Chemie 1 liegt durchgehend darunter (204 bis 373 Wörter) und
  // bekommt dafür eine eigene Runde. Die Zeile verschwindet, wenn sie durch ist —
  // sie steht hier, damit die Ausnahme sichtbar bleibt statt vergessen zu werden.
  const NOCH_NICHT_NACHGEZOGEN = new Set(['analytical-chemistry-1'])

  const woerter = (text: string) => text.split(/\s+/).filter(Boolean).length

  it.each(allCourses.map(k => [k.id] as const))('%s: kein Thema unter der Vorgabe', async (kursId) => {
    const themen = await loadAllTopics(kursId)

    if (NOCH_NICHT_NACHGEZOGEN.has(kursId)) {
      // Wenigstens nicht schlechter werden, solange die Runde aussteht.
      const leer = themen.filter(t => woerter(t.theory) < 150).map(t => t.id)
      expect(leer, 'Theorie praktisch leer').toEqual([])
      return
    }

    const duenn = themen
      .filter(t => woerter(t.theory) < MINDESTLAENGE)
      .map(t => `${t.id}: ${woerter(t.theory)} Wörter`)
    expect(duenn).toEqual([])
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
