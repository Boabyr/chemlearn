import { describe, it, expect } from 'vitest'
import { allCourses, loadAllTopics } from '../lib/courseRegistry'
import { examQuestionsFor } from '../data/exams'
import { zerlege } from '../components/Theory/mathe'

/**
 * Kurze Felder — Fragen, Antworten, Karteikarten — laufen durch `Formeltext`.
 * Ein einzelnes `$` bliebe dort als Zeichen stehen, ein `\frac` außerhalb von
 * `$…$` als roher Befehl. Beides ist ein Inhaltsfehler, kein Anzeigefehler.
 */

/** Felder, die als kurzer Fließtext angezeigt werden. */
async function kurzeFelder(kursId: string): Promise<[string, string][]> {
  const themen = await loadAllTopics(kursId)
  const felder: [string, string][] = []

  for (const thema of themen) {
    for (const frage of thema.quiz) {
      felder.push([`${thema.id}/${frage.id}/question`, frage.question])
      frage.options.forEach((o, i) => felder.push([`${thema.id}/${frage.id}/options[${i}]`, o]))
      felder.push([`${thema.id}/${frage.id}/explanation`, frage.explanation])
    }
    for (const karte of thema.flashcards) {
      felder.push([`${thema.id}/${karte.id}/front`, karte.front])
      felder.push([`${thema.id}/${karte.id}/back`, karte.back])
    }
  }

  for (const frage of examQuestionsFor(kursId)) {
    felder.push([`Prüfung/${frage.id}/question`, frage.question])
    frage.options?.forEach((o, i) => felder.push([`Prüfung/${frage.id}/options[${i}]`, o]))
    felder.push([`Prüfung/${frage.id}/explanation`, frage.explanation])
  }

  return felder
}

/**
 * Was nach dem Zerlegen an Text übrig bleibt — dort darf kein LaTeX stehen.
 * Ein maskiertes `\\$` ist ein Dollarzeichen und keine Formelgrenze.
 */
function textAnteil(wert: string): string {
  return zerlege(wert).filter(t => t.art === 'text').map(t => t.wert).join('').replace(/\\\$/g, '')
}

describe.each(allCourses.map(k => [k.id] as const))('%s: Formeln im Theorietext', (kursId) => {
  it('lässt nach dem Normalisieren keine Formelreste im Fließtext', async () => {
    const themen = await loadAllTopics(kursId)
    const schief = themen
      .map(thema => [thema.id, textAnteil(thema.theory ?? '')] as const)
      .filter(([, rest]) => /\\[[(]/.test(rest) || /\\[a-zA-Z]{2,}/.test(rest) || rest.includes('$'))
      .map(([id, rest]) => `${id}: ${(rest.match(/\\[a-zA-Z[(]+|\$/g) ?? []).slice(0, 5).join(' ')}`)
    expect(schief, 'diese Stellen zeigen rohes LaTeX').toEqual([])
  })
})

describe.each(allCourses.map(k => [k.id] as const))('%s: Formeln in kurzen Feldern', (kursId) => {
  it('hat keine unpaarigen Dollarzeichen', async () => {
    const schief = (await kurzeFelder(kursId))
      .filter(([, wert]) => textAnteil(wert).includes('$'))
      .map(([wo, wert]) => `${wo}: ${wert}`)
    expect(schief, 'einzelnes $ würde wörtlich angezeigt').toEqual([])
  })

  it('hat keine LaTeX-Befehle außerhalb von $…$', async () => {
    const schief = (await kurzeFelder(kursId))
      .filter(([, wert]) => /\\[a-zA-Z]{2,}/.test(textAnteil(wert)))
      .map(([wo, wert]) => `${wo}: ${wert}`)
    expect(schief, 'Befehl ohne Mathe-Umgebung bliebe roh stehen').toEqual([])
  })
})
