import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loadTopic } from '../lib/courseRegistry'
import type { Topic } from '../types/index'
import MechanismBuilder from '../components/MechanismBuilder/MechanismBuilder'

export default function TopicPage() {
  const { courseId, topicId } = useParams()
  const { user, loading } = useAuth()
  const navigate = useNavigate()
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
        .then(setTopic)
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
    }
  }

  function resetQuiz() {
    setQuizIdx(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setQuizDone(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← Zurück
        </button>
        <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">
          {topic.title}
        </span>
      </nav>

      <div className="bg-slate-800 border-b border-slate-700 px-6 flex gap-1">
        {(['theory', 'quiz', 'flashcards'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t
                ? 'border-teal-400 text-teal-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
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
                if (line.startsWith('## ')) return (
                  <h2 key={i} className="text-xl font-semibold text-white mt-8 mb-3">
                    {line.replace('## ', '')}
                  </h2>
                )
                if (line.startsWith('### ')) return (
                  <h3 key={i} className="text-lg font-medium text-teal-400 mt-6 mb-2">
                    {line.replace('### ', '')}
                  </h3>
                )
                if (line.startsWith('- ')) return (
                  <p key={i} className="text-slate-300 pl-4">
                    <span className="text-teal-400 mr-2">•</span>
                    {line.replace('- ', '')}
                  </p>
                )
                if (line.trim() === '') return <div key={i} className="h-2" />
                return (
                  <p key={i} className="text-slate-300 leading-relaxed">{line}</p>
                )
              })}
            </div>
{topic.mechanism && topic.mechanism.type === 'builder' && topic.mechanism.stages && (
  <div className="mt-10 bg-slate-800 border border-slate-700 rounded-2xl p-6">
    <p className="text-xs text-teal-400 font-mono uppercase tracking-widest mb-4">
      🎬 Interaktiver Mechanismus
    </p>
    <MechanismBuilder
      title={topic.mechanism.title ?? topic.title}
      description={topic.mechanism.description ?? ''}
      stages={topic.mechanism.stages}
    />
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
                <button
                  onClick={resetQuiz}
                  className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
                >
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
                  <div
                    className="h-full bg-teal-400 rounded-full transition-all"
                    style={{ width: `${(quizIdx / topic.quiz.length) * 100}%` }}
                  />
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
                      } else if (i === selected) {
                        cls = 'border-teal-400 bg-teal-900/30 text-teal-300'
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => !answered && setSelected(i)}
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${cls}`}
                        >
                          <span className="opacity-50 mr-2">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {answered && (
                  <div className="bg-teal-900/20 border border-teal-800 rounded-xl px-5 py-4 mb-4 text-sm text-slate-300 leading-relaxed">
                    <span className="text-teal-400 font-semibold">Erklärung: </span>
                    {q.explanation}
                  </div>
                )}
                <div className="flex gap-3">
                  {!answered && selected !== null && (
                    <button
                      onClick={handleAnswer}
                      className="flex-1 bg-teal-500 hover:bg-teal-400 text-black font-semibold py-3 rounded-xl transition-colors"
                    >
                      Antwort prüfen
                    </button>
                  )}
                  {answered && (
                    <button
                      onClick={nextQuestion}
                      className="flex-1 bg-teal-500 hover:bg-teal-400 text-black font-semibold py-3 rounded-xl transition-colors"
                    >
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
            <div
              onClick={() => setFlipped(f => !f)}
              className="cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div style={{
                position: 'relative',
                height: '220px',
                transition: 'transform 0.5s',
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}>
                <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute inset-0 bg-slate-800 border border-teal-500 rounded-2xl flex flex-col items-center justify-center p-8">
                  <p className="text-xs text-teal-400 font-mono uppercase tracking-widest mb-4">Begriff</p>
                  <p className="text-xl font-light text-center">{topic.flashcards[cardIdx].front}</p>
                </div>
                <div style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                  className="absolute inset-0 bg-teal-900/30 border border-teal-500 rounded-2xl flex flex-col items-center justify-center p-8">
                  <p className="text-xs text-teal-400 font-mono uppercase tracking-widest mb-4">Erklärung</p>
                  <p className="text-sm text-slate-300 text-center leading-relaxed">{topic.flashcards[cardIdx].back}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => { setCardIdx(i => Math.max(0, i - 1)); setFlipped(false) }}
                disabled={cardIdx === 0}
                className="px-6 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-sm disabled:opacity-40 hover:border-slate-400 transition-colors"
              >
                ← Zurück
              </button>
              <button
                onClick={() => { setCardIdx(i => Math.min(topic.flashcards.length - 1, i + 1)); setFlipped(false) }}
                disabled={cardIdx === topic.flashcards.length - 1}
                className="px-6 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-sm disabled:opacity-40 hover:border-slate-400 transition-colors"
              >
                Weiter →
              </button>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {topic.flashcards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCardIdx(i); setFlipped(false) }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === cardIdx ? 'bg-teal-400' : 'bg-slate-600'}`}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
