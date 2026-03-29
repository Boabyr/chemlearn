import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { allCourses } from '../lib/courseRegistry'
import { useProgress } from '../hooks/useProgress'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const { streak, progress } = useProgress()

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400 text-lg">Laden...</div>
    </div>
  )

  if (!user) { navigate('/login'); return null }

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
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚗️</span>
          <span className="text-teal-400 font-bold text-lg">ChemLearn</span>
        </div>
        <div className="flex items-center gap-4">
          {streak.currentStreak > 0 && (
            <div className="flex items-center gap-1 bg-amber-900/30 border border-amber-700/50 px-3 py-1 rounded-full">
              <span className="text-sm">🔥</span>
              <span className="text-amber-400 text-xs font-bold">{streak.currentStreak}</span>
            </div>
          )}
          <span className="text-slate-400 text-sm hidden sm:block">{user.email}</span>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white text-sm transition-colors">
            Abmelden
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <p className="text-teal-400 text-xs font-mono uppercase tracking-widest mb-2">Willkommen zurück</p>
          <h1 className="text-3xl font-light">Meine Kurse</h1>
          {streak.currentStreak > 0 && (
            <p className="text-amber-400 text-sm mt-2">
              🔥 {streak.currentStreak} Tage Streak – weiter so!
              {streak.longestStreak > streak.currentStreak && ` (Rekord: ${streak.longestStreak})`}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {allCourses.map(course => {
            const { done, total, pct } = courseProgress(course.id)
            return (
              <div key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-6 cursor-pointer hover:border-teal-500 transition-all"
                style={{ borderTopColor: course.color, borderTopWidth: 3 }}>
                <div className="text-3xl mb-3">{course.icon}</div>
                <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
                <p className="text-slate-400 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>{done}/{total} abgeschlossen</span>
                  <span>~{course.estimatedHours}h</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: course.color }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
