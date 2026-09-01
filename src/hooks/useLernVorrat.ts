import { useQuery } from '@tanstack/react-query'
import { allCourses, loadAllTopics } from '../lib/courseRegistry'
import { examQuestionsFor, type ExamQuestion } from '../data/exams'
import { frageItemId, karteItemId, type LernAufgabe } from '../lib/learning/lernItem'

/**
 * Alles Lernbare über alle Kurse: Karteikarten und Prüfungsfragen.
 *
 * Die Themenbündel werden einmal geladen und im Query-Cache gehalten — die
 * Tagessitzung braucht sie vollständig, nicht kursweise.
 */
async function vorratLaden(): Promise<LernAufgabe[]> {
  const aufgaben: LernAufgabe[] = []

  for (const kurs of allCourses) {
    for (const thema of await loadAllTopics(kurs.id)) {
      // Themen-Quizfragen bekommen dieselbe Form wie Prüfungsfragen. Bis
      // hierher landeten sie zwar in der Historie, wurden aber nie zur
      // Wiederholung eingeplant.
      for (const frage of thema.quiz) {
        const alsPruefungsfrage: ExamQuestion = {
          id: `${thema.id}:${frage.id}`,
          source: thema.title,
          examiner: 'thema',
          topicId: thema.id,
          points: 1,
          type: 'mc-single',
          question: frage.question,
          options: frage.options,
          correct: frage.correct,
          explanation: frage.explanation,
        }
        aufgaben.push({
          art: 'question',
          itemId: frageItemId(alsPruefungsfrage.id),
          courseId: kurs.id,
          topicId: thema.id,
          frage: alsPruefungsfrage,
        })
      }

      for (const karte of thema.flashcards) {
        aufgaben.push({
          art: 'card',
          itemId: karteItemId(thema.id, karte.id),
          courseId: kurs.id,
          topicId: thema.id,
          karte,
        })
      }
    }

    for (const frage of examQuestionsFor(kurs.id)) {
      aufgaben.push({
        art: 'question',
        itemId: frageItemId(frage.id),
        courseId: kurs.id,
        topicId: frage.topicId,
        frage,
      })
    }
  }

  return aufgaben
}

export function useLernVorrat() {
  const { data, isPending } = useQuery({
    queryKey: ['lernvorrat'],
    queryFn: vorratLaden,
    staleTime: Infinity,
  })
  return { vorrat: data ?? [], loading: isPending }
}
