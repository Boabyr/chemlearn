import { useState } from 'react'
import type { ExamQuestion } from '../../data/examQuestions'

interface Props {
  question: ExamQuestion
  onAnswer: (correct: boolean, points: number) => void
  showSource?: boolean
}

export default function ExamQuestionCard({ question, onAnswer, showSource }: Props) {
  const [selected, setSelected] = useState<number[]>([])
  const [numInput, setNumInput] = useState('')
  const [orderArr, setOrderArr] = useState<number[]>(
    question.options ? question.options.map((_, i) => i) : []
  )
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)

  function toggle(i: number) {
    if (submitted) return
    if (question.type === 'mc-single') {
      setSelected([i])
    } else {
      setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])
    }
  }

  function moveOrder(i: number, dir: -1 | 1) {
    const arr = [...orderArr]
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    setOrderArr(arr)
  }

  function submit() {
    if (submitted) return
    let isCorrect = false

    if (question.type === 'mc-single') {
      isCorrect = selected[0] === question.correct
    } else if (question.type === 'mc-multi') {
      const corr = question.correct as number[]
      isCorrect = corr.length === selected.length &&
        corr.every(c => selected.includes(c))
    } else if (question.type === 'numeric') {
      const val = parseFloat(numInput.replace(',', '.'))
      const target = question.correct as number
      const tol = question.tolerance ?? Math.abs(target) * 0.02
      isCorrect = Math.abs(val - target) <= tol
    } else if (question.type === 'order') {
      const corr = question.correct as number[]
      isCorrect = orderArr.every((v, i) => v === corr[i])
    }

    setCorrect(isCorrect)
    setSubmitted(true)
    onAnswer(isCorrect, isCorrect ? question.points : 0)
  }

  const profColor = {
    lieberzeit: 'teal',
    koellensperger: 'blue',
    gerner: 'purple',
  }[question.professor]

  const profLabel = {
    lieberzeit: 'Lieberzeit',
    koellensperger: 'Köllensperger',
    gerner: 'Gerner',
  }[question.professor]

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className={`px-5 py-3 flex items-center justify-between border-b border-slate-700 bg-slate-800/80`}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono uppercase tracking-widest text-${profColor}-400`}>
            {profLabel}
          </span>
          {showSource && (
            <span className="text-xs text-slate-500">{question.source}</span>
          )}
        </div>
        <span className={`text-xs font-semibold text-${profColor}-400`}>
          {question.points}P
        </span>
      </div>

      <div className="px-5 py-5">
        <p className="text-white leading-relaxed mb-5">{question.question}</p>

        {/* MC Options */}
        {(question.type === 'mc-single' || question.type === 'mc-multi') && question.options && (
          <div className="space-y-2">
            {question.options.map((opt, i) => {
              const isSel = selected.includes(i)
              const corr = Array.isArray(question.correct) ? question.correct : [question.correct]
              const isRight = corr.includes(i)
              let cls = 'border-slate-600 bg-slate-700/40 text-slate-300 hover:border-slate-400'
              if (submitted) {
                if (isRight) cls = 'border-green-500 bg-green-900/20 text-green-300'
                else if (isSel) cls = 'border-red-500 bg-red-900/20 text-red-300'
                else cls = 'border-slate-700 bg-slate-800 text-slate-500'
              } else if (isSel) {
                cls = `border-${profColor}-400 bg-${profColor}-900/20 text-${profColor}-300`
              }
              return (
                <button key={i} onClick={() => toggle(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${cls}`}>
                  <span className="opacity-50 mr-2 font-mono">
                    {question.type === 'mc-multi' ? (selected.includes(i) ? '☑' : '☐') : String.fromCharCode(65+i)+'.'}
                  </span>
                  {opt}
                  {submitted && isRight && <span className="float-right">✓</span>}
                </button>
              )
            })}
          </div>
        )}

        {/* Numeric Input */}
        {question.type === 'numeric' && (
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <input
                type="number" step="any"
                value={numInput}
                onChange={e => !submitted && setNumInput(e.target.value)}
                placeholder="Dein Ergebnis..."
                disabled={submitted}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-teal-400 disabled:opacity-60"
              />
              {question.unit && (
                <span className="text-slate-400 text-sm font-mono">{question.unit}</span>
              )}
            </div>
            {submitted && (
              <div className={`px-4 py-2 rounded-lg text-sm font-mono ${
                correct ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'
              }`}>
                Korrekt: {question.correct} {question.unit}
                {question.tolerance && ` (±${question.tolerance})`}
              </div>
            )}
          </div>
        )}

        {/* Order */}
        {question.type === 'order' && question.options && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 mb-2">Reihenfolge durch ↑↓ anpassen:</p>
            {orderArr.map((optIdx, pos) => {
              const corr = question.correct as number[]
              const isRightPos = submitted && corr[pos] === optIdx
              const isWrongPos = submitted && corr[pos] !== optIdx
              return (
                <div key={optIdx} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                  isRightPos ? 'border-green-500 bg-green-900/20 text-green-300' :
                  isWrongPos ? 'border-red-500 bg-red-900/20 text-red-300' :
                  'border-slate-600 bg-slate-700/40 text-slate-300'
                }`}>
                  <span className="font-mono text-slate-500 w-5">{pos+1}.</span>
                  <span className="flex-1">{question.options![optIdx]}</span>
                  {!submitted && (
                    <div className="flex gap-1">
                      <button onClick={() => moveOrder(pos, -1)} className="text-slate-400 hover:text-white px-1">↑</button>
                      <button onClick={() => moveOrder(pos, 1)} className="text-slate-400 hover:text-white px-1">↓</button>
                    </div>
                  )}
                  {isRightPos && <span>✓</span>}
                  {isWrongPos && <span className="text-xs">→ Pos. {(corr.indexOf(optIdx)+1)}</span>}
                </div>
              )
            })}
          </div>
        )}

        {/* Submit */}
        {!submitted && (
          <button onClick={submit}
            disabled={
              (question.type === 'mc-single' && selected.length === 0) ||
              (question.type === 'mc-multi' && selected.length === 0) ||
              (question.type === 'numeric' && numInput === '')
            }
            className="mt-4 w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            Antwort prüfen ✓
          </button>
        )}

        {/* Erklärung */}
        {submitted && (
          <div className={`mt-4 px-4 py-3 rounded-xl text-sm leading-relaxed ${
            correct
              ? 'bg-green-900/20 border border-green-800 text-green-300'
              : 'bg-red-900/20 border border-red-800 text-red-300'
          }`}>
            <span className="font-semibold">{correct ? '✓ Richtig! ' : '✗ Nicht ganz. '}</span>
            {question.explanation}
          </div>
        )}
      </div>
    </div>
  )
}
