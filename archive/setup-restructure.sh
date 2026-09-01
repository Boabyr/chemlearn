#!/bin/bash
# ChemLearn – Restructure + Supabase Progress + CoursePage Fix
set -e
cd /srv/chemlearn

echo "=== 1. Dashboard vereinfachen ==="
cat > src/pages/Dashboard.tsx << 'EOF'
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

  if (!user) { navigate('/login'); return null }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚗️</span>
          <span className="text-teal-400 font-bold text-lg">ChemLearn</span>
        </div>
        <div className="flex items-center gap-4">
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {allCourses.map(course => (
            <div key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 cursor-pointer hover:border-teal-500 transition-all"
              style={{ borderTopColor: course.color, borderTopWidth: 3 }}>
              <div className="text-3xl mb-3">{course.icon}</div>
              <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
              <p className="text-slate-400 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{course.totalTopics} Themen</span>
                <span>~{course.estimatedHours}h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
EOF

echo "=== 2. CoursePage mit Thementiteln + Prüfungs-Tab ==="
cat > src/pages/CoursePage.tsx << 'EOF'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { allCourses, loadAllTopics } from '../lib/courseRegistry'
import { examQuestions } from '../data/examQuestions'
import type { Course } from '../types/index'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'

type Tab = 'topics' | 'practice' | 'exam'

export default function CoursePage() {
  const { courseId } = useParams()
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [topicTitles, setTopicTitles] = useState<Record<string, string>>({})
  const [tab, setTab] = useState<Tab>('topics')
  const [practiceFilter, setPracticeFilter] = useState<'all' | 'lieberzeit' | 'koellensperger' | 'gerner'>('all')
  const [practiceIdx, setPracticeIdx] = useState(0)
  const [practiceQueue, setPracticeQueue] = useState<typeof examQuestions>([])
  const [practiceScore, setPracticeScore] = useState(0)
  const [practiceTotal, setPracticeTotal] = useState(0)
  const [practiceAnswered, setPracticeAnswered] = useState(0)
  const [practiceDone, setPracticeDone] = useState(false)
  const [examMode, setExamMode] = useState<'select' | 'running' | 'result'>('select')
  const [examSectionIdx, setExamSectionIdx] = useState(0)
  const [examQIdx, setExamQIdx] = useState(0)
  const [examScores, setExamScores] = useState<Record<string, number>>({})
  const [examAnswered, setExamAnswered] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  useEffect(() => {
    const found = allCourses.find(c => c.id === courseId)
    if (found) setCourse(found)
  }, [courseId])

  // Thementitel laden
  useEffect(() => {
    if (!courseId) return
    loadAllTopics(courseId).then(topics => {
      const titles: Record<string, string> = {}
      topics.forEach((t: any) => { if (t?.id && t?.title) titles[t.id] = t.title })
      setTopicTitles(titles)
    }).catch(() => {})
  }, [courseId])

  // Prüfungsmodus nur für AC1
  const isAC1 = courseId === 'analytical-chemistry-1'
  const courseQuestions = examQuestions // alle AC1-Fragen

  function shufflePractice(filter: typeof practiceFilter) {
    const filtered = filter === 'all' ? courseQuestions : courseQuestions.filter(q => q.professor === filter)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    setPracticeQueue(shuffled)
    setPracticeIdx(0)
    setPracticeScore(0)
    setPracticeTotal(filtered.reduce((s, q) => s + q.points, 0))
    setPracticeAnswered(0)
    setPracticeDone(false)
  }

  useEffect(() => {
    if (tab === 'practice' && isAC1) shufflePractice('all')
  }, [tab])

  // Prüfungs-Strukturen inline
  const examSections = [
    {
      professor: 'lieberzeit' as const,
      label: '🔭 Lieberzeit',
      color: 'teal',
      questions: courseQuestions.filter(q => q.professor === 'lieberzeit').sort(() => Math.random() - 0.5).slice(0, 5),
    },
    {
      professor: 'koellensperger' as const,
      label: '📊 Köllensperger',
      color: 'blue',
      questions: courseQuestions.filter(q => q.professor === 'koellensperger').sort(() => Math.random() - 0.5).slice(0, 4),
    },
    {
      professor: 'gerner' as const,
      label: '🧪 Gerner',
      color: 'purple',
      questions: courseQuestions.filter(q => q.professor === 'gerner').sort(() => Math.random() - 0.5).slice(0, 5),
    },
  ]

  function startExam() {
    setExamSectionIdx(0)
    setExamQIdx(0)
    setExamScores({})
    setExamAnswered({})
    setExamMode('running')
  }

  const currentSection = examSections[examSectionIdx]
  const currentQ = currentSection?.questions[examQIdx]

  function nextExamQ() {
    if (examQIdx < currentSection.questions.length - 1) {
      setExamQIdx(i => i + 1)
    } else if (examSectionIdx < examSections.length - 1) {
      setExamSectionIdx(i => i + 1)
      setExamQIdx(0)
    } else {
      setExamMode('result')
    }
  }

  const sectionResults = examSections.map(sec => {
    const earned = sec.questions.reduce((s, q) => s + (examScores[q.id] ?? 0), 0)
    const max = sec.questions.reduce((s, q) => s + q.points, 0)
    return { ...sec, earned, max, passed: earned >= 12 }
  })
  const totalEarned = sectionResults.reduce((s, r) => s + r.earned, 0)
  const totalMax = sectionResults.reduce((s, r) => s + r.max, 0)

  if (loading || !course) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400 text-lg">Laden...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Nav */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition-colors">← Kurse</button>
        <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">{course.title}</span>
      </nav>

      {/* Tabs */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 flex gap-1">
        <button onClick={() => setTab('topics')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'topics' ? 'border-teal-400 text-teal-400' : 'border-transparent text-slate-400 hover:text-white'}`}>
          📚 Themen
        </button>
        {isAC1 && (
          <>
            <button onClick={() => setTab('practice')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'practice' ? 'border-teal-400 text-teal-400' : 'border-transparent text-slate-400 hover:text-white'}`}>
              🎯 Übungsmodus
            </button>
            <button onClick={() => { setTab('exam'); setExamMode('select') }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'exam' ? 'border-teal-400 text-teal-400' : 'border-transparent text-slate-400 hover:text-white'}`}>
              📝 Prüfungssimulator
            </button>
          </>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* ── THEMEN ── */}
        {tab === 'topics' && (
          <div>
            <div className="mb-8">
              <span className="text-4xl">{course.icon}</span>
              <h1 className="text-2xl font-light mt-3 mb-1">{course.title}</h1>
              <p className="text-slate-400 text-sm">{course.subtitle}</p>
            </div>
            <div className="space-y-2">
              {course.topics.map((topicId, index) => {
                const title = topicTitles[topicId]
                const displayTitle = title || topicId.replace(/-/g, ' ').replace(/^\d+\s/, '')
                return (
                  <div key={topicId}
                    onClick={() => navigate(`/course/${courseId}/${topicId}`)}
                    className="flex items-center gap-4 bg-slate-800 border border-slate-700 hover:border-teal-500 rounded-xl px-5 py-4 cursor-pointer transition-all">
                    <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-sm text-slate-400 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{displayTitle}</p>
                      <p className="text-slate-500 text-xs mt-0.5">Thema {index + 1} von {course.topics.length}</p>
                    </div>
                    <span className="text-slate-600 text-lg flex-shrink-0">→</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── ÜBUNGSMODUS ── */}
        {tab === 'practice' && isAC1 && (
          <div>
            <h2 className="text-xl font-light mb-2">🎯 Übungsmodus</h2>
            <p className="text-slate-400 text-sm mb-6">Altprüfungsfragen zufällig üben – mit sofortigem Feedback.</p>

            {/* Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {([
                ['all', 'Alle'],
                ['lieberzeit', '🔭 Lieberzeit'],
                ['koellensperger', '📊 Köllensperger'],
                ['gerner', '🧪 Gerner'],
              ] as const).map(([f, label]) => (
                <button key={f} onClick={() => { setPracticeFilter(f); shufflePractice(f) }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    practiceFilter === f ? 'bg-teal-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-teal-500'
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Fortschritt */}
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Frage {practiceIdx + 1} von {practiceQueue.length}</span>
              <span>{practiceScore} von {practiceTotal} Punkten</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full mb-6">
              <div className="h-full bg-teal-500 rounded-full transition-all"
                style={{ width: `${practiceQueue.length ? (practiceIdx / practiceQueue.length) * 100 : 0}%` }} />
            </div>

            {practiceDone ? (
              <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-2xl">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl text-teal-400 font-light mb-2">Session abgeschlossen!</h3>
                <p className="text-4xl font-bold mb-6" style={{
                  color: practiceTotal > 0 && practiceScore/practiceTotal >= 0.75 ? '#4ade80' : practiceTotal > 0 && practiceScore/practiceTotal >= 0.5 ? '#fbbf24' : '#f87171'
                }}>
                  {practiceTotal > 0 ? Math.round(practiceScore/practiceTotal*100) : 0}%
                </p>
                <button onClick={() => shufflePractice(practiceFilter)}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm">
                  Neue Runde
                </button>
              </div>
            ) : practiceQueue.length > 0 ? (
              <div className="space-y-4">
                <ExamQuestionCard
                  key={practiceQueue[practiceIdx].id + practiceIdx}
                  question={practiceQueue[practiceIdx]}
                  onAnswer={(correct, pts) => {
                    if (correct) setPracticeScore(s => s + pts)
                    setPracticeAnswered(a => a + 1)
                  }}
                  showSource
                />
                <button onClick={() => {
                  if (practiceIdx < practiceQueue.length - 1) setPracticeIdx(i => i + 1)
                  else setPracticeDone(true)
                }}
                  className="w-full py-3 bg-slate-700 border border-slate-600 hover:border-slate-400 text-slate-300 font-semibold rounded-xl text-sm transition-colors">
                  Nächste Frage →
                </button>
              </div>
            ) : (
              <p className="text-center text-slate-400">Keine Fragen verfügbar.</p>
            )}
          </div>
        )}

        {/* ── PRÜFUNGSSIMULATOR ── */}
        {tab === 'exam' && isAC1 && (
          <div>
            {examMode === 'select' && (
              <div>
                <h2 className="text-xl font-light mb-2">📝 Prüfungssimulator</h2>
                <p className="text-slate-400 text-sm mb-6">Simuliere eine AC1-Prüfung mit originaler Struktur (3 Teile).</p>
                <div className="bg-amber-900/20 border border-amber-700 rounded-xl px-5 py-4 mb-6 text-sm text-amber-300">
                  <span className="font-semibold">Bestehensregeln:</span> Alle 3 Teile ≥ 12P UND gesamt ≥ 36P
                </div>
                <div className="space-y-3">
                  {examSections.map(sec => (
                    <div key={sec.professor} className="flex justify-between items-center bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-sm">
                      <span className={`text-${sec.color}-400 font-medium`}>{sec.label}</span>
                      <span className="text-slate-400">{sec.questions.length} Fragen</span>
                    </div>
                  ))}
                </div>
                <button onClick={startExam}
                  className="mt-6 w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-colors">
                  Prüfung starten →
                </button>
              </div>
            )}

            {examMode === 'running' && currentQ && (
              <div>
                <div className={`mb-6 px-5 py-3 rounded-xl bg-${currentSection.color}-900/20 border border-${currentSection.color}-800`}>
                  <p className={`text-sm font-semibold text-${currentSection.color}-400`}>
                    {currentSection.label} – Frage {examQIdx+1}/{currentSection.questions.length}
                  </p>
                  <div className="mt-2 h-1 bg-slate-700 rounded-full">
                    <div className={`h-full bg-${currentSection.color}-500 rounded-full transition-all`}
                      style={{ width: `${(examQIdx/currentSection.questions.length)*100}%` }} />
                  </div>
                </div>
                <ExamQuestionCard
                  key={currentQ.id + examSectionIdx + examQIdx}
                  question={currentQ}
                  onAnswer={(correct, pts) => {
                    setExamScores(s => ({ ...s, [currentQ.id]: correct ? pts : 0 }))
                    setExamAnswered(a => ({ ...a, [currentQ.id]: true }))
                  }}
                />
                <button onClick={nextExamQ}
                  disabled={!examAnswered[currentQ.id]}
                  className="mt-4 w-full py-3 bg-slate-700 border border-slate-600 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-semibold rounded-xl text-sm transition-colors">
                  {examQIdx < currentSection.questions.length - 1 ? 'Nächste Frage →' :
                   examSectionIdx < examSections.length - 1 ? `Weiter zu ${examSections[examSectionIdx+1].label} →` :
                   'Prüfung abschließen →'}
                </button>
              </div>
            )}

            {examMode === 'result' && (
              <div>
                <div className={`text-center py-10 rounded-2xl mb-6 ${
                  sectionResults.every(r => r.passed) && totalEarned >= 36
                    ? 'bg-green-900/20 border border-green-700'
                    : 'bg-red-900/20 border border-red-800'
                }`}>
                  <div className="text-5xl mb-3">
                    {sectionResults.every(r => r.passed) && totalEarned >= 36 ? '🎓' : '📚'}
                  </div>
                  <h3 className={`text-2xl font-light mb-1 ${sectionResults.every(r => r.passed) && totalEarned >= 36 ? 'text-green-400' : 'text-red-400'}`}>
                    {sectionResults.every(r => r.passed) && totalEarned >= 36 ? 'Bestanden!' : 'Nicht bestanden'}
                  </h3>
                  <p className="text-4xl font-bold mt-3" style={{
                    color: sectionResults.every(r => r.passed) && totalEarned >= 36 ? '#4ade80' : '#f87171'
                  }}>
                    {totalEarned} / {totalMax}P
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  {sectionResults.map(sec => (
                    <div key={sec.professor} className={`flex justify-between items-center px-5 py-4 rounded-xl border ${
                      sec.passed ? 'border-green-700 bg-green-900/10' : 'border-red-700 bg-red-900/10'
                    }`}>
                      <span className={`font-medium text-${sec.color}-400`}>{sec.label}</span>
                      <span className={`font-mono font-bold ${sec.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {sec.earned}/{sec.max}P {sec.passed ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setExamMode('select')}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm">
                  Neue Prüfung
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
EOF

echo "=== 3. main.tsx – alte Routen entfernen ==="
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Dashboard  from './pages/Dashboard'
import LoginPage  from './pages/LoginPage'
import CoursePage from './pages/CoursePage'
import TopicPage  from './pages/TopicPage'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/'                            element={<Dashboard />} />
        <Route path='/login'                       element={<LoginPage />} />
        <Route path='/course/:courseId'            element={<CoursePage />} />
        <Route path='/course/:courseId/:topicId'   element={<TopicPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
EOF

echo "=== 4. Supabase Progress-Hook ==="
cat > src/hooks/useProgress.ts << 'EOF'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface TopicProgress {
  topicId: string
  courseId: string
  completed: boolean
  quizScore: number
  lastSeen: string
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
}

export function useProgress(courseId?: string) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<TopicProgress[]>([])
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastActiveDate: '' })
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      let query = supabase.from('progress').select('*').eq('user_id', user.id)
      if (courseId) query = query.eq('course_id', courseId)
      const { data } = await query
      if (data) {
        setProgress(data.map(d => ({
          topicId: d.topic_id,
          courseId: d.course_id,
          completed: d.completed,
          quizScore: d.quiz_score,
          lastSeen: d.last_seen,
        })))
      }

      const { data: streakData } = await supabase
        .from('streaks').select('*').eq('user_id', user.id).single()
      if (streakData) {
        setStreak({
          currentStreak: streakData.current_streak,
          longestStreak: streakData.longest_streak,
          lastActiveDate: streakData.last_active_date,
        })
      }
    } catch (e) {
      console.error('Progress fetch error:', e)
    }
    setLoading(false)
  }, [user, courseId])

  useEffect(() => { fetchProgress() }, [fetchProgress])

  const markTopicSeen = useCallback(async (topicId: string, cId: string) => {
    if (!user) return
    await supabase.from('progress').upsert({
      user_id: user.id,
      course_id: cId,
      topic_id: topicId,
      last_seen: new Date().toISOString(),
    }, { onConflict: 'user_id,course_id,topic_id' })
    await updateStreak()
    fetchProgress()
  }, [user, fetchProgress])

  const markTopicComplete = useCallback(async (topicId: string, cId: string, quizScore: number) => {
    if (!user) return
    await supabase.from('progress').upsert({
      user_id: user.id,
      course_id: cId,
      topic_id: topicId,
      completed: true,
      quiz_score: quizScore,
      last_seen: new Date().toISOString(),
    }, { onConflict: 'user_id,course_id,topic_id' })
    await updateStreak()
    fetchProgress()
  }, [user, fetchProgress])

  const updateStreak = useCallback(async () => {
    if (!user) return
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase.from('streaks').select('*').eq('user_id', user.id).single()

    if (!data) {
      await supabase.from('streaks').insert({
        user_id: user.id, current_streak: 1, longest_streak: 1, last_active_date: today
      })
      return
    }

    const last = data.last_active_date
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (last === today) return // schon heute aktiv
    const newStreak = last === yesterday ? data.current_streak + 1 : 1
    const longest = Math.max(newStreak, data.longest_streak)

    await supabase.from('streaks').update({
      current_streak: newStreak,
      longest_streak: longest,
      last_active_date: today,
    }).eq('user_id', user.id)
  }, [user])

  return { progress, streak, loading, markTopicSeen, markTopicComplete, refetch: fetchProgress }
}
EOF

echo "=== 5. Dashboard mit Streak ==="
cat > src/pages/Dashboard.tsx << 'EOF'
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
EOF

echo "=== 6. TopicPage mit Fortschritt speichern ==="
cat > src/pages/TopicPage.tsx << 'EOF'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loadTopic } from '../lib/courseRegistry'
import { useProgress } from '../hooks/useProgress'
import type { Topic } from '../types/index'
import MechanismBuilder from '../components/MechanismBuilder/MechanismBuilder'
import FormulaCalculator from '../components/FormulaCalculator/FormulaCalculator'
import ApparatusQuiz from '../components/ApparatusQuiz/ApparatusQuiz'
import SpectrumAssignment from '../components/SpectrumAssignment/SpectrumAssignment'

export default function TopicPage() {
  const { courseId, topicId } = useParams()
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const { markTopicSeen, markTopicComplete } = useProgress(courseId)
  const [topic, setTopic] = useState<Topic | null>(null)
  const [tab, setTab] = useState<'theory' | 'quiz' | 'flashcards'>('theory')
  const [quizIdx, setQuizIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  useEffect(() => {
    if (courseId && topicId) {
      loadTopic(courseId, topicId)
        .then(t => {
          setTopic(t)
          markTopicSeen(topicId, courseId)
        })
        .catch(() => navigate(`/course/${courseId}`))
    }
  }, [courseId, topicId])

  if (loading || !topic) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400 text-lg">Laden...</div>
    </div>
  )

  const q = topic.quiz[quizIdx]

  function handleAnswer() {
    if (selected === null) return
    setAnswered(true)
    if (selected === q.correct) setScore(s => s + 1)
  }

  function nextQuestion() {
    if (topic && quizIdx < topic.quiz.length - 1) {
      setQuizIdx(i => i + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setQuizDone(true)
      if (courseId && topicId) {
        const finalScore = (score + (selected === q.correct ? 1 : 0))
        markTopicComplete(topicId, courseId, Math.round(finalScore / topic.quiz.length * 100))
      }
    }
  }

  function resetQuiz() {
    setQuizIdx(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setQuizDone(false)
  }

  const interactive = (topic as any).interactive

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate(`/course/${courseId}`)} className="text-slate-400 hover:text-white transition-colors">
          ← Zurück
        </button>
        <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">{topic.title}</span>
      </nav>

      <div className="bg-slate-800 border-b border-slate-700 px-6 flex gap-1">
        {(['theory', 'quiz', 'flashcards'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-teal-400 text-teal-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}>
            {t === 'theory' ? '📖 Theorie' : t === 'quiz' ? '✅ Quiz' : '🃏 Karteikarten'}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {tab === 'theory' && (
          <div>
            <h1 className="text-2xl font-light mb-2">{topic.title}</h1>
            <p className="text-slate-400 text-sm mb-8">{topic.subtitle}</p>
            <div className="space-y-2">
              {topic.theory.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-white mt-8 mb-3">{line.replace('## ', '')}</h2>
                if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-medium text-teal-400 mt-6 mb-2">{line.replace('### ', '')}</h3>
                if (line.startsWith('| ')) return <p key={i} className="text-slate-300 text-sm font-mono pl-2">{line}</p>
                if (line.startsWith('- ')) return (
                  <p key={i} className="text-slate-300 pl-4">
                    <span className="text-teal-400 mr-2">•</span>{line.replace('- ', '')}
                  </p>
                )
                if (line.trim() === '') return <div key={i} className="h-2" />
                return <p key={i} className="text-slate-300 leading-relaxed">{line}</p>
              })}
            </div>

            {interactive && (
              <div className="mt-10 bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <p className="text-xs text-teal-400 font-mono uppercase tracking-widest mb-4">🎬 Interaktiv</p>
                {interactive.type === 'builder' && interactive.stages && (
                  <MechanismBuilder title={interactive.title ?? topic.title} description={interactive.description ?? ''} stages={interactive.stages} />
                )}
                {interactive.type === 'formula-calculator' && interactive.formula && (
                  <FormulaCalculator formula={interactive.formula} />
                )}
                {interactive.type === 'apparatus-quiz' && (
                  <ApparatusQuiz question={interactive.question} mode={interactive.mode} targetId={interactive.targetId}
                    options={interactive.options} explanation={interactive.explanation} hint1={interactive.hint1} hint2={interactive.hint2} />
                )}
                {interactive.type === 'spectrum-assignment' && (
                  <SpectrumAssignment title={interactive.title} description={interactive.description}
                    xLabel={interactive.xLabel} yLabel={interactive.yLabel} peaks={interactive.peaks}
                    hint1={interactive.hint1} hint2={interactive.hint2} />
                )}
              </div>
            )}

            {(topic as any).mechanism?.type === 'builder' && (topic as any).mechanism?.stages && (
              <div className="mt-10 bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <p className="text-xs text-teal-400 font-mono uppercase tracking-widest mb-4">🎬 Interaktiver Mechanismus</p>
                <MechanismBuilder title={(topic as any).mechanism.title ?? topic.title}
                  description={(topic as any).mechanism.description ?? ''} stages={(topic as any).mechanism.stages} />
              </div>
            )}
          </div>
        )}

        {tab === 'quiz' && (
          <div>
            {quizDone ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-light text-teal-400 mb-2">Quiz abgeschlossen!</h2>
                <p className="text-slate-400 mb-6">{score} von {topic.quiz.length} Fragen richtig</p>
                <div className="text-5xl font-bold mb-8" style={{
                  color: score === topic.quiz.length ? '#4ade80' : score >= topic.quiz.length * 0.6 ? '#fbbf24' : '#f87171'
                }}>
                  {Math.round(score / topic.quiz.length * 100)}%
                </div>
                <p className="text-teal-400 text-sm mb-6">✓ Fortschritt gespeichert!</p>
                <button onClick={resetQuiz} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors">
                  Nochmal versuchen
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>Frage {quizIdx + 1} von {topic.quiz.length}</span>
                  <span>{score} richtig</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full mb-8">
                  <div className="h-full bg-teal-400 rounded-full transition-all"
                    style={{ width: `${(quizIdx / topic.quiz.length) * 100}%` }} />
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-4">
                  <h2 className="text-lg font-light leading-relaxed mb-6">{q.question}</h2>
                  <div className="space-y-3">
                    {q.options.map((opt, i) => {
                      let cls = 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-teal-500'
                      if (answered) {
                        if (i === q.correct) cls = 'border-green-500 bg-green-900/30 text-green-400'
                        else if (i === selected) cls = 'border-red-500 bg-red-900/30 text-red-400'
                        else cls = 'border-slate-700 bg-slate-800 text-slate-500'
                      } else if (i === selected) cls = 'border-teal-400 bg-teal-900/30 text-teal-300'
                      return (
                        <button key={i} onClick={() => !answered && setSelected(i)}
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${cls}`}>
                          <span className="opacity-50 mr-2">{String.fromCharCode(65+i)}.</span>{opt}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {answered && (
                  <div className="bg-teal-900/20 border border-teal-800 rounded-xl px-5 py-4 mb-4 text-sm text-slate-300 leading-relaxed">
                    <span className="text-teal-400 font-semibold">Erklärung: </span>{q.explanation}
                  </div>
                )}
                <div className="flex gap-3">
                  {!answered && selected !== null && (
                    <button onClick={handleAnswer} className="flex-1 bg-teal-500 hover:bg-teal-400 text-black font-semibold py-3 rounded-xl transition-colors">
                      Antwort prüfen
                    </button>
                  )}
                  {answered && (
                    <button onClick={nextQuestion} className="flex-1 bg-teal-500 hover:bg-teal-400 text-black font-semibold py-3 rounded-xl transition-colors">
                      {quizIdx < topic.quiz.length - 1 ? 'Nächste Frage →' : 'Ergebnis anzeigen'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'flashcards' && (
          <div>
            <div className="mb-6 text-center text-sm text-slate-500">
              Karte {cardIdx + 1} von {topic.flashcards.length} – antippen zum Umdrehen
            </div>
            <div onClick={() => setFlipped(f => !f)} className="cursor-pointer" style={{ perspective: '1000px' }}>
              <div style={{ position: 'relative', height: '220px', transition: 'transform 0.5s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute inset-0 bg-slate-800 border border-teal-500 rounded-2xl flex flex-col items-center justify-center p-8">
                  <p className="text-xs text-teal-400 font-mono uppercase tracking-widest mb-4">Begriff</p>
                  <p className="text-xl font-light text-center">{topic.flashcards[cardIdx].front}</p>
                </div>
                <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  className="absolute inset-0 bg-teal-900/30 border border-teal-500 rounded-2xl flex flex-col items-center justify-center p-8">
                  <p className="text-xs text-teal-400 font-mono uppercase tracking-widest mb-4">Erklärung</p>
                  <p className="text-sm text-slate-300 text-center leading-relaxed">{topic.flashcards[cardIdx].back}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => { setCardIdx(i => Math.max(0, i-1)); setFlipped(false) }} disabled={cardIdx === 0}
                className="px-6 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-sm disabled:opacity-40 hover:border-slate-400 transition-colors">
                ← Zurück
              </button>
              <button onClick={() => { setCardIdx(i => Math.min(topic.flashcards.length-1, i+1)); setFlipped(false) }}
                disabled={cardIdx === topic.flashcards.length-1}
                className="px-6 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-sm disabled:opacity-40 hover:border-slate-400 transition-colors">
                Weiter →
              </button>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {topic.flashcards.map((_, i) => (
                <button key={i} onClick={() => { setCardIdx(i); setFlipped(false) }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === cardIdx ? 'bg-teal-400' : 'bg-slate-600'}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
EOF

echo "=== 7. Build ==="
npm run build

echo ""
echo "✅ FERTIG! Deployen:"
echo "git add ."
echo 'git commit -m "feat: Prüfungsmodus in CoursePage, Streak, Fortschritt in Supabase"'
echo "git push"
echo "vercel --prod"
