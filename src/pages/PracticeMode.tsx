import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAttempts } from '../hooks/useAttempts'
import { useReviews } from '../hooks/useReviews'
import { examQuestionsFor, professorsFor, professorLabel } from '../data/exams'
import type { ExamQuestion } from '../data/exams'
import { buildSession } from '../lib/learning/sessionBuilder'
import { GRADES } from '../lib/learning/sm2'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'

const DEFAULT_COURSE = 'analytical-chemistry-1'

/** 'adaptive' zieht nach Fälligkeit und Schwäche, sonst wird nach Prüfer gefiltert. */
type Filter = 'adaptive' | 'all' | string

const PROF_ICONS: Record<string, string> = {
  lieberzeit: '🔭', koellensperger: '📊', gerner: '🧪',
}

/** Länge einer adaptiven Runde. */
const SESSION_MINUTES = 15

export default function PracticeMode() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const courseId = params.get('course') ?? DEFAULT_COURSE

  const { attempts, logAttempt, flush } = useAttempts(courseId)
  const { dueQuestions, gradeItem, dueCount } = useReviews(courseId)

  const [filter, setFilter] = useState<Filter>('adaptive')
  const [queue, setQueue] = useState<ExamQuestion[]>([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)
  const [startedAt, setStartedAt] = useState(() => Date.now())

  const alleFragen = useMemo(() => examQuestionsFor(courseId), [courseId])
  const professors = useMemo(() => professorsFor(courseId), [courseId])

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  const build = useCallback((f: Filter) => {
    let next: ExamQuestion[]
    if (f === 'adaptive') {
      next = buildSession({
        questions: alleFragen,
        attempts,
        due: dueQuestions,
        minutes: SESSION_MINUTES,
      })
    } else {
      const gefiltert = f === 'all' ? alleFragen : alleFragen.filter(q => q.professor === f)
      next = [...gefiltert].sort(() => Math.random() - 0.5)
    }
    setQueue(next)
    setIdx(0)
    setScore(0)
    setAnswered(0)
    setSessionDone(false)
    setStartedAt(Date.now())
  }, [alleFragen, attempts, dueQuestions])

  // Erste Runde erst zusammenstellen, wenn die Historie geladen ist.
  const [initialised, setInitialised] = useState(false)
  useEffect(() => {
    if (initialised || !user) return
    build('adaptive')
    setInitialised(true)
  }, [initialised, user, build])

  const total = useMemo(() => queue.reduce((s, q) => s + q.points, 0), [queue])
  const pct = total > 0 ? Math.round((score / total) * 100) : 0

  function onAnswer(correct: boolean, pts: number) {
    const q = queue[idx]
    if (!q) return
    if (correct) setScore(s => s + pts)
    setAnswered(a => a + 1)

    logAttempt({
      courseId,
      topicId: q.topicId,
      questionId: q.id,
      source: 'practice',
      correct,
      pointsEarned: pts,
      pointsPossible: q.points,
      msTaken: Date.now() - startedAt,
    })

    // Richtig beantwortet heisst später wieder vorlegen, falsch heisst bald wieder.
    void gradeItem(
      { itemType: 'question', itemId: q.id, topicId: q.topicId, courseId },
      correct ? GRADES.GUT : GRADES.NOCHMAL,
    )
  }

  function next() {
    setStartedAt(Date.now())
    if (idx < queue.length - 1) setIdx(i => i + 1)
    else { void flush(); setSessionDone(true) }
  }

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-accent">Laden...</div>
    </div>
  )

  const filters: Filter[] = ['adaptive', 'all', ...professors]

  return (
    <div className="min-h-screen bg-surface text-ink">
      <nav className="bg-raised border-b border-line px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-muted hover:text-ink transition-colors">← Dashboard</button>
          <span className="text-accent font-mono text-xs uppercase tracking-widest">🎯 Übungsmodus</span>
        </div>
        <div className="text-sm text-muted">
          {answered}/{queue.length} Fragen · {score}/{total}P
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Auswahl der Runde */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => { setFilter(f); build(f) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f ? 'bg-accent text-on-accent' : 'bg-raised border border-line text-muted hover:border-accent'
              }`}>
              {f === 'adaptive'
                ? `✨ Für mich${dueCount > 0 ? ` (${dueCount} fällig)` : ''}`
                : f === 'all' ? 'Alle'
                : `${PROF_ICONS[f] ?? '📘'} ${professorLabel(f)}`}
            </button>
          ))}
        </div>

        {filter === 'adaptive' && !sessionDone && queue.length > 0 && (
          <p className="text-xs text-subtle mb-4">
            Zusammengestellt aus fälligen Wiederholungen und deinen schwächsten Themen.
          </p>
        )}

        {/* Fortschritt */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-subtle mb-1">
            <span>Frage {Math.min(idx + 1, queue.length)} von {queue.length}</span>
            <span>{score} von {total} Punkten</span>
          </div>
          <div className="h-2 bg-sunken rounded-full">
            <div className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${queue.length ? (idx / queue.length) * 100 : 0}%` }} />
          </div>
        </div>

        {sessionDone ? (
          <div className="text-center py-16 bg-raised border border-line rounded-2xl">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-light text-accent mb-2">Session abgeschlossen!</h2>
            <p className="text-muted mb-4">{score} von {total} Punkten</p>
            <div className="text-5xl font-bold mb-8" style={{
              color: pct >= 75 ? 'var(--c-success)' : pct >= 50 ? 'var(--c-warning)' : 'var(--c-danger)'
            }}>{pct}%</div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => build(filter)}
                className="px-6 py-3 bg-accent hover:bg-accent-strong text-on-accent font-semibold rounded-xl text-sm transition-colors">
                Neue Runde
              </button>
              <button onClick={() => navigate('/exam-simulator')}
                className="px-6 py-3 bg-sunken border border-line text-muted font-semibold rounded-xl text-sm transition-colors">
                Prüfungssimulator
              </button>
            </div>
          </div>
        ) : queue.length > 0 ? (
          <div className="space-y-4">
            <ExamQuestionCard
              key={queue[idx].id}
              question={queue[idx]}
              onAnswer={onAnswer}
              showSource
            />
            <button onClick={next}
              className="w-full py-3 bg-sunken border border-line hover:border-subtle text-muted font-semibold rounded-xl text-sm transition-colors">
              {idx < queue.length - 1 ? 'Nächste Frage →' : 'Runde abschließen'}
            </button>
          </div>
        ) : (
          <div className="text-center text-muted">Keine Fragen gefunden.</div>
        )}
      </div>
    </div>
  )
}
