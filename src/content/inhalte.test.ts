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
        for (const teil of thema.interactives ?? []) {
          if (teil.type === 'apparatus-quiz') {
            for (const option of teil.options) {
              if (!(option.id in apparatusRegistry)) unbekannt.push(`${thema.id}: ${option.id}`)
            }
          }
          if (teil.type === 'apparatus-matching') {
            for (const paar of teil.paare) {
              if (!(paar.apparaturId in apparatusRegistry)) unbekannt.push(`${thema.id}: ${paar.apparaturId}`)
            }
          }
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
        .flatMap(t => t.interactives ?? [])
        .filter(i => i.type === 'mechanism')
        .map(i => (i as { title: string }).title)
      expect(new Set(titel).size, `${kurs.id}: doppelter Mechanismus-Titel`).toBe(titel.length)
    }
  })

  it('haben mehrere Schritte und ein Ergebnisbild', async () => {
    const duenn: string[] = []
    for (const kurs of allCourses) {
      for (const thema of await loadAllTopics(kurs.id)) {
        for (const teil of thema.interactives ?? []) {
          if (teil.type !== 'mechanism') continue
          if (teil.stages.length < 2) duenn.push(`${thema.id}: nur ein Schritt`)
          if (!teil.ergebnis) duenn.push(`${thema.id}: kein Ergebnisbild`)
        }
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
  //
  // Ein Fach entsteht stückweise: erst die Themen, dann die Prüfungsfragen.
  // Ein Kurs mit `entwurf: true` wird deshalb nur berichtet, nicht abgewiesen —
  // alle anderen Prüfungen dieser Datei gelten für ihn unverändert.
  it.each(allCourses.map(k => [k.id] as const))('%s: kein Thema bleibt unter der Vorgabe', async (kursId) => {
    const kurs = allCourses.find(k => k.id === kursId)!
    const themen = await loadAllTopics(kursId)
    const fragenJeThema = new Map<string, number>()
    for (const frage of examQuestionsFor(kursId)) {
      fragenJeThema.set(frage.topicId, (fragenJeThema.get(frage.topicId) ?? 0) + 1)
    }

    const duenn = themen.flatMap(thema => {
      const mangel: string[] = []
      if (thema.quiz.length < 6) mangel.push(`nur ${thema.quiz.length} Quizfragen`)
      if (thema.flashcards.length < 6) mangel.push(`nur ${thema.flashcards.length} Karten`)
      if ((thema.interactives ?? []).length === 0) mangel.push('kein Interaktivteil')
      if (!fragenJeThema.get(thema.id)) mangel.push('keine Prüfungsfrage')
      return mangel.length ? [`${thema.id}: ${mangel.join(', ')}`] : []
    })

    if (kurs.entwurf) {
      if (duenn.length) console.info(`${kursId} (Entwurf) — noch offen:\n  ${duenn.join('\n  ')}`)
      return
    }
    expect(duenn).toEqual([])
  })
})

describe('Quizfragen', () => {
  // Beim Auffüllen in Phase 4 wurden Fragen aus dem Theorietext geschrieben, ohne
  // das vorhandene Quiz zu lesen — alle acht doppelten eine bestehende Frage.
  //
  // Dieser Test fängt nur die wortgleiche Kopie. Sinnverwandte Dubletten lassen
  // sich nicht zuverlässig automatisch erkennen: echte Fälle lagen bei 67 bis
  // 100 % Wortüberlappung, Fehlalarme bei 60 bis 71 % — die Bereiche überlappen.
  // Zum Nachsehen dient `npm run fragen:aehnlich`, geurteilt wird von Hand.
  const normalisiert = (text: string) =>
    text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

  it.each(allCourses.map(k => [k.id] as const))('%s: kein Fragetext steht zweimal im Kurs', async (kursId) => {
    const gesehen = new Map<string, string>()
    const doppelt: string[] = []

    for (const thema of await loadAllTopics(kursId)) {
      for (const frage of thema.quiz) {
        const schluessel = normalisiert(frage.question)
        const vorher = gesehen.get(schluessel)
        if (vorher) doppelt.push(`"${frage.question.slice(0, 50)}…" in ${vorher} und ${thema.id}`)
        else gesehen.set(schluessel, `${thema.id}:${frage.id}`)
      }
    }

    expect(doppelt).toEqual([])
  })
})

describe('Antwortlängen', () => {
  // Die richtige Antwort trug früher die Begründung mit sich, die Ablenker waren
  // knappe Schlagworte: in 75 bis 80 % der Fragen war die richtige die längste
  // Option, im Mittel 2,3- bis 2,6-mal so lang. Wer die Chemie nicht kann, wählt
  // die ausführlichste und liegt in vier von fünf Fällen richtig.
  //
  // Die Begründung steht jetzt in `explanation`, die Optionen sind knappe
  // Behauptungen von ähnlicher Länge. Zufall wären 25 %; gemessen sind 31 %.
  const HOECHSTENS_LAENGSTE = 0.45
  const HOECHSTENS_FAKTOR = 1.35
  const HOECHSTENS_JE_FRAGE = 2.0
  // Wie bei den Antwortpositionen: unter einem Dutzend Fragen misst man Rauschen.
  // Ein Kurs im Aufbau hat anfangs zwei, drei Themen — die Schlagseite eines
  // Bestands lässt sich daran nicht ablesen, die Ausreißerprüfung je Frage schon.
  const AUSSAGEKRAEFTIG = 12

  const laengen = (frage: { options: string[] }) => frage.options.map(o => o.length)
  const ablenkerSchnitt = (l: number[], richtig: number) =>
    (l.reduce((a, b) => a + b, 0) - l[richtig]) / (l.length - 1)

  it.each(allCourses.map(k => [k.id] as const))('%s: die richtige Antwort ist selten die längste', async (kursId) => {
    const alle = (await loadAllTopics(kursId)).flatMap(t => t.quiz)
    if (alle.length < AUSSAGEKRAEFTIG) return
    const laengste = alle.filter(f => {
      const l = laengen(f)
      const max = Math.max(...l)
      return l[f.correct] === max && l.filter(x => x === max).length === 1
    })
    const anteil = laengste.length / alle.length
    expect(anteil, `${laengste.length} von ${alle.length} Fragen`).toBeLessThanOrEqual(HOECHSTENS_LAENGSTE)
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: richtige und falsche Optionen sind ähnlich lang', async (kursId) => {
    const alle = (await loadAllTopics(kursId)).flatMap(t => t.quiz)
    if (alle.length < AUSSAGEKRAEFTIG) return
    const richtig = alle.reduce((s, f) => s + laengen(f)[f.correct], 0)
    const ablenker = alle.reduce((s, f) => s + ablenkerSchnitt(laengen(f), f.correct), 0)
    expect(richtig / ablenker).toBeLessThanOrEqual(HOECHSTENS_FAKTOR)
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: keine einzelne Frage verrät sich über die Länge', async (kursId) => {
    const ausreisser: string[] = []
    for (const thema of await loadAllTopics(kursId)) {
      for (const frage of thema.quiz) {
        const l = laengen(frage)
        const faktor = l[frage.correct] / ablenkerSchnitt(l, frage.correct)
        if (faktor > HOECHSTENS_JE_FRAGE) {
          ausreisser.push(`${thema.id}:${frage.id} — Faktor ${faktor.toFixed(1)}`)
        }
      }
    }
    expect(ausreisser).toEqual([])
  })
})

describe('Länge der Theorietexte', () => {
  // CONTENT-PROMPT.md gibt 400 bis 900 Wörter je Thema vor. Sechs Themen der
  // organischen Chemie lagen darunter, eines bei der Hälfte — das fiel nur auf,
  // weil jemand nachgezählt hat. Jetzt zählt der Test.
  const MINDESTLAENGE = 400

  const woerter = (text: string) => text.split(/\s+/).filter(Boolean).length

  it.each(allCourses.map(k => [k.id] as const))('%s: kein Thema unter der Vorgabe', async (kursId) => {
    const themen = await loadAllTopics(kursId)
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

  it.each(allCourses.map(k => [k.id] as const))('%s: Fragen nennen bekannte Gruppen', async (kursId) => {
    const kurs = allCourses.find(k => k.id === kursId)!
    if (kurs.gruppen.length === 0) return
    const bekannt = kurs.gruppen.map(p => p.id)
    const unbekannt = [...new Set(examQuestionsFor(kursId).map(f => f.gruppe))]
      .filter(p => !bekannt.includes(p))
    expect(unbekannt).toEqual([])
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: Prüfungsstrukturen verweisen auf vorhandene Fragen', async (kursId) => {
    const ids = new Set(examQuestionsFor(kursId).map(f => f.id))
    const fehlend: string[] = []
    for (const struktur of examStructuresFor(kursId)) {
      for (const abschnitt of struktur.sections) {
        for (const fragenId of abschnitt.questionIds) {
          if (!ids.has(fragenId)) fehlend.push(`${struktur.id}/${abschnitt.gruppe}: ${fragenId}`)
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

describe('Antwortpositionen', () => {
  // Gemischt wird nur die Fragenreihenfolge (PracticeMode, ExamSimulator) — die
  // Optionen rendert ExamQuestion.tsx unverändert. Die Position der richtigen
  // Antwort ist damit Teil der Daten, und sie war verräterisch: im AC1-Quiz lag
  // die Lösung in 87 von 108 Fragen an zweiter Stelle (80,6 %), bei den
  // Prüfungsfragen in 11 von 16. Wer nichts weiß und immer die zweite Antwort
  // ankreuzt, kam so auf 80 % richtig.
  //
  // Zufall wären 25 %. Die Schranken lassen Luft für kleine Bestände, schlagen
  // aber bei jeder Schlagseite an, die sich auswendig lernen lässt.
  const HOECHSTENS = 0.4
  const MINDESTENS = 0.12
  // Erst ab dieser Zahl ist eine Verteilung überhaupt aussagekräftig.
  const AUSSAGEKRAEFTIG = 12

  const verteilung = (positionen: number[]) => {
    const zaehler = [0, 0, 0, 0]
    for (const p of positionen) zaehler[p]++
    return zaehler.map(n => n / positionen.length)
  }

  it.each(allCourses.map(k => [k.id] as const))('%s: die Quizlösung verteilt sich über alle vier Plätze', async (kursId) => {
    const positionen = (await loadAllTopics(kursId)).flatMap(t => t.quiz.map(f => f.correct))
    if (positionen.length < AUSSAGEKRAEFTIG) return

    const anteile = verteilung(positionen)
    const befund = anteile.map((a, i) => `Platz ${i + 1}: ${(a * 100).toFixed(1)} %`).join(', ')
    expect(Math.max(...anteile), befund).toBeLessThanOrEqual(HOECHSTENS)
    expect(Math.min(...anteile), befund).toBeGreaterThanOrEqual(MINDESTENS)
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: auch bei den Prüfungsfragen', (kursId) => {
    const positionen = examQuestionsFor(kursId)
      .filter(f => f.type === 'mc-single' && f.options?.length === 4)
      .map(f => Number(f.correct))
    if (positionen.length < AUSSAGEKRAEFTIG) return

    const anteile = verteilung(positionen)
    const befund = anteile.map((a, i) => `Platz ${i + 1}: ${(a * 100).toFixed(1)} %`).join(', ')
    expect(Math.max(...anteile), befund).toBeLessThanOrEqual(HOECHSTENS)
    expect(Math.min(...anteile), befund).toBeGreaterThanOrEqual(MINDESTENS)
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: kein Thema häuft die Lösung auf einem Platz', async (kursId) => {
    // Über den Kurs kann die Verteilung stimmen und in einem Thema trotzdem
    // jede Frage dieselbe Lösung tragen. Innerhalb eines Themas wird geübt.
    const schlagseite: string[] = []
    for (const thema of await loadAllTopics(kursId)) {
      const zaehler = [0, 0, 0, 0]
      for (const frage of thema.quiz) zaehler[frage.correct]++
      const haeufigster = Math.max(...zaehler)
      const erlaubt = Math.max(3, Math.ceil(thema.quiz.length * 0.5))
      if (haeufigster > erlaubt) {
        schlagseite.push(`${thema.id}: ${haeufigster} von ${thema.quiz.length} auf Platz ${zaehler.indexOf(haeufigster) + 1}`)
      }
    }
    expect(schlagseite).toEqual([])
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: bei Mehrfachauswahl ist jeder Platz einmal richtig', (kursId) => {
    const fragen = examQuestionsFor(kursId).filter(f => f.type === 'mc-multi' && f.options?.length === 4)
    if (fragen.length < 5) return

    const nieRichtig = [0, 1, 2, 3].filter(
      platz => !fragen.some(f => (f.correct as number[]).includes(platz)),
    )
    expect(nieRichtig, 'diese Plätze sind in keiner Frage Teil der Lösung').toEqual([])
  })

  it.each(allCourses.map(k => [k.id] as const))('%s: keine Reihenfolgefrage ist beim Öffnen schon gelöst', (kursId) => {
    // ExamQuestion.tsx startet mit der Identität [0,1,2,…]. Wer die als Lösung
    // hinterlegt, verschenkt die Frage: sie steht fertig da.
    const geloest = examQuestionsFor(kursId)
      .filter(f => f.type === 'order')
      .filter(f => (f.correct as number[]).every((wert, i) => wert === i))
      .map(f => f.id)
    expect(geloest).toEqual([])
  })
})
