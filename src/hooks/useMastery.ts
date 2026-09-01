import { useMemo } from 'react'
import { useAttempts } from './useAttempts'
import { allCourses } from '../lib/courseRegistry'
import { examQuestionsFor } from '../data/exams'
import { weakestTopics, readinessByExaminer } from '../lib/learning/mastery'

/**
 * Leitet aus der Antwort-Historie ab, wo der Lernende steht:
 * schwächste Themen und Prüfungsreife je Prüfer.
 */
export function useMastery(courseId: string) {
  const { attempts, loading, refetch } = useAttempts(courseId)

  const topicIds = useMemo(
    () => allCourses.find(c => c.id === courseId)?.topics ?? [],
    [courseId],
  )

  const questions = useMemo(
    () => examQuestionsFor(courseId).map(q => ({
      id: q.id,
      examiner: q.examiner,
      topicId: q.topicId,
    })),
    [courseId],
  )

  const topics = useMemo(
    () => weakestTopics(attempts, topicIds),
    [attempts, topicIds],
  )

  const readiness = useMemo(
    () => readinessByExaminer(attempts, questions),
    [attempts, questions],
  )

  return {
    loading,
    attempts,
    /** Alle Themen, aufsteigend nach Beherrschung — die schwächsten zuerst. */
    topics,
    weakest: topics.slice(0, 5),
    readiness,
    refetch,
  }
}
