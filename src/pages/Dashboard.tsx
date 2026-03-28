import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { allCourses } from '../lib/courseRegistry'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400 text-lg">Laden...</div>
    </div>
  )

  if (!user) {
    navigate('/login')
    return null
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Nav */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚗️</span>
          <span className="text-teal-400 font-bold text-lg">ChemLearn</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Abmelden
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <p className="text-teal-400 text-xs font-mono uppercase tracking-widest mb-2">Willkommen zurück</p>
          <h1 className="text-3xl font-light">Deine Kurse</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {allCourses.map(course => (
            <div
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 cursor-pointer hover:border-teal-500 transition-all"
              style={{ borderTopColor: course.color, borderTopWidth: 3 }}
            >
              <div className="text-3xl mb-3">{course.icon}</div>
              <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
              <p className="text-slate-400 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{course.totalTopics} Themen</span>
                <span>~{course.estimatedHours}h</span>
              </div>
              <div className="mt-3 h-1.5 bg-slate-700 rounded-full">
                <div className="h-full w-0 rounded-full" style={{ background: course.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
