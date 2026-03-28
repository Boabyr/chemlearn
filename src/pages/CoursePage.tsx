import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { allCourses } from '../lib/courseRegistry'
import type { Course } from '../types/index'

export default function CoursePage() {
  const { courseId } = useParams()
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  useEffect(() => {
    const found = allCourses.find(c => c.id === courseId)
    if (found) setCourse(found)
  }, [courseId])

  if (loading || !course) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400 text-lg">Laden...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Nav */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← Zurück
        </button>
        <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">
          {course.title}
        </span>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <span className="text-5xl">{course.icon}</span>
          <h1 className="text-3xl font-light mt-4 mb-2">{course.title}</h1>
          <p className="text-slate-400">{course.subtitle}</p>
          <p className="text-slate-500 text-sm mt-2">{course.description}</p>
        </div>

        {/* Topics Liste */}
        <div className="space-y-3">
          {course.topics.map((topicId, index) => (
            <div
              key={topicId}
              onClick={() => navigate(`/course/${courseId}/${topicId}`)}
              className="flex items-center gap-4 bg-slate-800 border border-slate-700 hover:border-teal-500 rounded-xl px-5 py-4 cursor-pointer transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-sm text-slate-400 flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium">{topicId.replace(/-/g, ' ').replace(/^\d+\s/, '')}</p>
                <p className="text-slate-500 text-xs mt-0.5">Thema {index + 1} von {course.topics.length}</p>
              </div>
              <span className="text-slate-600 text-lg">→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
