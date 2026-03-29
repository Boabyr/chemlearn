import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { examQuestions } from '../data/examQuestions'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'

type Filter = 'all' | 'lieberzeit' | 'koellensperger' | 'gerner'

export default function PracticeMode() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [queue, setQueue] = useState<typeof examQuestions>([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  const shuffle = useCallback((f: Filter) => {
    const filtered = f === 'all' ? examQuestions : examQuestions.filter(q => q.professor === f)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    setQueue(shuffled)
    setIdx(0)
    setScore(0)
    setTotal(filtered.reduce((s, q) => s + q.points, 0))
    setAnswered(0)
    setSessionDone(false)
  }, [])

  useEffect(() => { shuffle('all') }, [shuffle])

  function onAnswer(correct: boolean, pts: number) {
    if (correct) setScore(s => s + pts)
    setAnswered(a => a + 1)
  }

  function next() {
    if (idx < queue.length - 1) {
      setIdx(i => i + 1)
    } else {
      setSessionDone(true)
    }
  }

  const pct = total > 0 ? Math.round(score / total * 100) : 0

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400">Laden...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition-colors">← Dashboard</button>
          <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">🎯 Übungsmodus</span>
        </div>
        <div className="text-sm text-slate-400">
          {answered}/{queue.length} Fragen · {score}/{total}P
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'lieberzeit', 'koellensperger', 'gerner'] as Filter[]).map(f => (
            <button key={f} onClick={() => { setFilter(f); shuffle(f) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f ? 'bg-teal-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-teal-500'
              }`}>
              {f === 'all' ? 'Alle' : f === 'lieberzeit' ? '🔭 Lieberzeit' : f === 'koellensperger' ? '📊 Köllensperger' : '🧪 Gerner'}
            </button>
          ))}
        </div>

        {/* Fortschritt */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Frage {idx + 1} von {queue.length}</span>
            <span>{score} von {total} Punkten</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full">
            <div className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${(idx / queue.length) * 100}%` }} />
          </div>
        </div>

        {sessionDone ? (
          <div className="text-center py-16 bg-slate-800 border border-slate-700 rounded-2xl">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-light text-teal-400 mb-2">Session abgeschlossen!</h2>
            <p className="text-slate-400 mb-4">{score} von {total} Punkten</p>
            <div className="text-5xl font-bold mb-8" style={{
              color: pct >= 75 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171'
            }}>{pct}%</div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => shuffle(filter)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm transition-colors">
                Neue Runde
              </button>
              <button onClick={() => navigate('/exam-simulator')}
                className="px-6 py-3 bg-slate-700 border border-slate-600 text-slate-300 font-semibold rounded-xl text-sm transition-colors">
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
              className="w-full py-3 bg-slate-700 border border-slate-600 hover:border-slate-400 text-slate-300 font-semibold rounded-xl text-sm transition-colors">
              Nächste Frage →
            </button>
          </div>
        ) : (
          <div className="text-center text-slate-400">Keine Fragen gefunden.</div>
        )}
      </div>
    </div>
  )
}
