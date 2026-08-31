import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useMastery } from '../hooks/useMastery'
import { useReviews } from '../hooks/useReviews'
import { allCourses, loadAllTopics } from '../lib/courseRegistry'
import { examQuestionsFor } from '../data/exams'
import type { Course } from '../types/index'
import type { Level } from '../lib/learning/mastery'

const LEVEL_STYLE: Record<Level, { dot: string; label: string }> = {
  sicher:    { dot: 'bg-green-400',  label: 'sitzt' },
  wackelig:  { dot: 'bg-amber-400',  label: 'wackelig' },
  ungelernt: { dot: 'bg-slate-600',  label: 'offen' },
}

export default function CoursePage() {
  const { courseId } = useParams()
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [topicTitles, setTopicTitles] = useState<Record<string, string>>({})

  const { topics: mastery } = useMastery(courseId ?? '')
  const { dueCount } = useReviews(courseId)

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  useEffect(() => {
    const found = allCourses.find(c => c.id === courseId)
    if (found) setCourse(found)
  }, [courseId])

  useEffect(() => {
    if (!courseId) return
    loadAllTopics(courseId).then(topics => {
      const titles: Record<string, string> = {}
      for (const t of topics as { id?: string; title?: string }[]) {
        if (t?.id && t?.title) titles[t.id] = t.title
      }
      setTopicTitles(titles)
    }).catch(() => {})
  }, [courseId])

  if (loading || !course) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400">Laden...</div>
    </div>
  )

  const fragenZahl = examQuestionsFor(course.id).length
  const levelOf = (topicId: string): Level =>
    mastery.find(m => m.topicId === topicId)?.level ?? 'ungelernt'

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition-colors">← Kurse</button>
        <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">{course.title}</span>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-4xl">{course.icon}</span>
          <h1 className="text-2xl font-light mt-3 mb-1">{course.title}</h1>
          <p className="text-slate-400 text-sm">{course.subtitle}</p>
        </div>

        {/* Übungswege – beide führen auf die Seiten, die Antworten mitschreiben */}
        {fragenZahl > 0 && (
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <button onClick={() => navigate(`/practice?course=${course.id}`)}
              className="text-left bg-slate-800 border border-slate-700 hover:border-teal-500 rounded-xl px-5 py-4 transition-colors">
              <p className="font-medium">🎯 Übungsmodus</p>
              <p className="text-slate-500 text-xs mt-1">
                {dueCount > 0 ? `${dueCount} Wiederholungen fällig` : `${fragenZahl} Altprüfungsfragen`}
              </p>
            </button>
            <button onClick={() => navigate(`/exam-simulator?course=${course.id}`)}
              className="text-left bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-xl px-5 py-4 transition-colors">
              <p className="font-medium">📝 Prüfungssimulator</p>
              <p className="text-slate-500 text-xs mt-1">Ganze Prüfung unter Zeitdruck</p>
            </button>
          </div>
        )}

        <div className="space-y-2">
          {course.topics.map((topicId, index) => {
            const title = topicTitles[topicId]
            const displayTitle = title || topicId.replace(/-/g, ' ').replace(/^\d+\s/, '')
            const level = levelOf(topicId)
            const stil = LEVEL_STYLE[level]
            return (
              <div key={topicId}
                onClick={() => navigate(`/course/${courseId}/${topicId}`)}
                className="flex items-center gap-4 bg-slate-800 border border-slate-700 hover:border-teal-500 rounded-xl px-5 py-4 cursor-pointer transition-all">
                <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-sm text-slate-400 flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{displayTitle}</p>
                  <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${stil.dot}`} />
                    {stil.label}
                  </p>
                </div>
                <span className="text-slate-600 text-lg flex-shrink-0">→</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
