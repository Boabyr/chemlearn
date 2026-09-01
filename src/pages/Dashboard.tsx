import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/Shell/ThemeToggle'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import { supabase } from '../lib/supabase'
import { allCourses, spracheVon } from '../lib/courseRegistry'
import { useProgress } from '../hooks/useProgress'
import { courseIdsWithExams } from '../data/exams'
import LearningStatus from '../components/Dashboard/LearningStatus'
import Tagesrunde from '../components/Dashboard/Tagesrunde'
import { zuletztLesen } from '../lib/zuletzt'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const { isTutor, isAdmin } = useRole()
  const navigate = useNavigate()
  const [weiter] = useState(zuletztLesen)
  const { streak, progress } = useProgress()

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-accent text-lg">Laden...</div>
    </div>
  )


  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  function courseProgress(courseId: string) {
    const done = progress.filter(p => p.courseId === courseId && p.completed).length
    const course = allCourses.find(c => c.id === courseId)
    const total = course?.totalTopics ?? 1
    return { done, total, pct: Math.round(done / total * 100) }
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <nav className="bg-raised border-b border-line px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚗️</span>
          <span className="text-accent font-bold text-lg">ChemLearn</span>
        </div>
        <div className="flex items-center gap-4">
          {streak.currentStreak > 0 && (
            <div className="flex items-center gap-1 bg-warning/20 border border-warning px-3 py-1 rounded-full">
              <span className="text-sm">🔥</span>
              <span className="text-warning text-xs font-bold">{streak.currentStreak}</span>
            </div>
          )}
          {isTutor && (
            <button onClick={() => navigate('/tutor')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-900/40 border border-purple-700/50 hover:border-purple-500 text-purple-400 text-xs font-medium rounded-xl transition-colors">
              🎓 {isAdmin ? 'Admin' : 'Tutor'}
            </button>
          )}
          <span className="text-muted text-sm hidden sm:block">{user?.email}</span>
          <button onClick={() => navigate('/statistik')}
            className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted hover:text-ink">
            📊 Statistik
          </button>
          <button onClick={() => navigate('/einstellungen')}
            className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted hover:text-ink"
            aria-label="Einstellungen">
            ⚙️
          </button>
          <ThemeToggle />
          <button onClick={handleLogout} className="text-muted hover:text-ink text-sm transition-colors">
            Abmelden
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <p className="text-accent text-xs font-mono uppercase tracking-widest mb-2">Willkommen zurück</p>
          <h1 className="text-3xl font-light">Meine Kurse</h1>
          {streak.currentStreak > 0 && (
            <p className="text-warning text-sm mt-2">
              🔥 {streak.currentStreak} Tage Streak – weiter so!
              {streak.longestStreak > streak.currentStreak && ` (Rekord: ${streak.longestStreak})`}
            </p>
          )}
        </div>

        <Tagesrunde />

        {weiter && (
          <button onClick={() => navigate(`/course/${weiter.courseId}/${weiter.topicId}`)}
            className="mb-8 flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-raised px-5 py-4 text-left hover:border-accent">
            <span>
              <span className="block font-mono text-xs uppercase tracking-widest text-subtle">Weiterlernen</span>
              <span className="text-ink">{weiter.titel}</span>
            </span>
            <span className="text-accent" aria-hidden="true">→</span>
          </button>
        )}

        {/* Lernstand fuer Kurse mit Pruefungsdaten */}
        {courseIdsWithExams().map(id => {
          const kurs = allCourses.find(c => c.id === id)
          if (!kurs) return null
          return <LearningStatus key={id} courseId={id} courseTitle={kurs.title} />
        })}

        <div className="grid gap-4 sm:grid-cols-2">
          {allCourses.map(course => {
            const { done, total, pct } = courseProgress(course.id)
            return (
              <button key={course.id} type="button" lang={spracheVon(course.id)}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-raised border border-line rounded-2xl p-6 text-left w-full hover:border-accent transition-all"
                style={{ borderTopColor: course.color, borderTopWidth: 3 }}>
                <div className="text-3xl mb-3">{course.icon}</div>
                <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
                <p className="text-muted text-sm mb-4">{course.description}</p>
                <div className="flex justify-between text-xs text-subtle mb-2">
                  <span>{done}/{total} abgeschlossen</span>
                  <span>~{course.estimatedHours}h</span>
                </div>
                <div className="h-1.5 bg-sunken rounded-full">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: course.color }} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
