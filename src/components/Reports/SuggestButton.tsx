import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

interface Props {
  courseId: string
  topicId: string
}

export default function SuggestButton({ courseId, topicId }: Props) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<'quiz' | 'flashcard'>('quiz')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Quiz fields
  const [question, setQuestion] = useState('')
  const [opts, setOpts] = useState(['', '', '', ''])
  const [correct, setCorrect] = useState(0)
  const [explanation, setExplanation] = useState('')

  // Flashcard fields
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  if (!user) return null

  async function submit() {
    setSubmitting(true)
    const content = type === 'quiz'
      ? { question, options: opts, correct, explanation }
      : { front, back }
    await supabase.from('content_suggestions').insert({
      submitted_by: user!.id,
      course_id: courseId,
      topic_id: topicId,
      suggestion_type: type,
      content,
    })
    setSubmitted(true)
    setSubmitting(false)
    setTimeout(() => { setOpen(false); setSubmitted(false) }, 2500)
  }

  const isValid = type === 'quiz'
    ? question.trim() && opts.every(o => o.trim()) && explanation.trim()
    : front.trim() && back.trim()

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="text-xs text-slate-500 hover:text-teal-400 transition-colors flex items-center gap-1 mt-1">
        <span>💡</span> Frage/Karte vorschlagen
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-lg w-full max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-teal-400 font-medium">Vorschlag eingereicht!</p>
                <p className="text-slate-400 text-sm mt-1">Zwei Tutoren müssen zustimmen.</p>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-white mb-4">Inhalt vorschlagen</h3>
                <div className="flex gap-2 mb-5">
                  {(['quiz', 'flashcard'] as const).map(t => (
                    <button key={t} onClick={() => setType(t)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        type === t ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
                      }`}>
                      {t === 'quiz' ? '✅ Quiz-Frage' : '🃏 Karteikarte'}
                    </button>
                  ))}
                </div>

                {type === 'quiz' && (
                  <div className="space-y-3">
                    <textarea value={question} onChange={e => setQuestion(e.target.value)}
                      placeholder="Frage..." rows={2}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-teal-400" />
                    <p className="text-xs text-slate-400">Antwortoptionen (klick auf ✓ = richtig):</p>
                    {opts.map((o, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <button onClick={() => setCorrect(i)}
                          className={`w-7 h-7 rounded-lg flex-shrink-0 text-sm font-bold transition-colors ${
                            correct === i ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'
                          }`}>{String.fromCharCode(65+i)}</button>
                        <input value={o} onChange={e => { const n=[...opts]; n[i]=e.target.value; setOpts(n) }}
                          placeholder={`Option ${String.fromCharCode(65+i)}...`}
                          className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400" />
                      </div>
                    ))}
                    <textarea value={explanation} onChange={e => setExplanation(e.target.value)}
                      placeholder="Erklärung der richtigen Antwort..." rows={2}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-teal-400" />
                  </div>
                )}

                {type === 'flashcard' && (
                  <div className="space-y-3">
                    <input value={front} onChange={e => setFront(e.target.value)}
                      placeholder="Vorderseite (Begriff)..."
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400" />
                    <textarea value={back} onChange={e => setBack(e.target.value)}
                      placeholder="Rückseite (Erklärung)..." rows={3}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-teal-400" />
                  </div>
                )}

                <div className="flex gap-3 mt-5">
                  <button onClick={() => setOpen(false)}
                    className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-xl text-sm hover:bg-slate-600">
                    Abbrechen
                  </button>
                  <button onClick={submit} disabled={!isValid || submitting}
                    className="flex-1 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-semibold rounded-xl text-sm">
                    {submitting ? 'Sende...' : 'Vorschlagen'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
