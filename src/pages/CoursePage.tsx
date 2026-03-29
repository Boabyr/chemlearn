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
  // practiceAnswered removed
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
    // answered reset
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
                    // answered
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
