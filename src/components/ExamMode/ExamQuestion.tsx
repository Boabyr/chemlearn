import { useState } from 'react'
import { examinerLabel, type ExamQuestion } from '../../data/exams'
import { stilFuer } from './pruefStil'
import { bewerte, leseZahl } from '../../lib/learning/bewerten'

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
    const bewertung = bewerte(question, {
      auswahl: selected,
      zahl: numInput,
      reihenfolge: orderArr,
    })
    // Ohne auswertbare Eingabe entsteht kein Versuch — sonst verdirbt ein
    // versehentliches Absenden den Lernstand.
    if (!bewertung.gueltig) return

    setCorrect(bewertung.korrekt)
    setSubmitted(true)
    onAnswer(bewertung.korrekt, bewertung.punkte)
  }

  const stil = stilFuer(question.examiner)
  const profLabel = examinerLabel(question.examiner)

  return (
    <div className="bg-raised border border-line rounded-2xl overflow-hidden">
      {/* Header */}
      <div className={`px-5 py-3 flex items-center justify-between border-b border-line bg-raised/80`}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono uppercase tracking-widest ${stil.text}`}>
            {profLabel}
          </span>
          {showSource && (
            <span className="text-xs text-subtle">{question.source}</span>
          )}
        </div>
        <span className={`text-xs font-semibold ${stil.text}`}>
          {question.points}P
        </span>
      </div>

      <div className="px-5 py-5">
        <p className="text-ink leading-relaxed mb-5">{question.question}</p>

        {/* MC Options */}
        {(question.type === 'mc-single' || question.type === 'mc-multi') && question.options && (
          <div className="space-y-2">
            {question.options.map((opt, i) => {
              const isSel = selected.includes(i)
              const corr = Array.isArray(question.correct) ? question.correct : [question.correct]
              const isRight = corr.includes(i)
              let cls = 'border-line bg-sunken/60 text-muted hover:border-subtle'
              if (submitted) {
                if (isRight) cls = 'border-success bg-success/10 text-success'
                else if (isSel) cls = 'border-danger bg-danger/10 text-danger'
                else cls = 'border-line bg-raised text-subtle'
              } else if (isSel) {
                cls = stil.auswahl
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
                className="flex-1 bg-surface border border-line rounded-xl px-4 py-3 text-ink font-mono text-lg focus:outline-none focus:border-accent disabled:opacity-60"
              />
              {question.unit && (
                <span className="text-muted text-sm font-mono">{question.unit}</span>
              )}
            </div>
            {submitted && (
              <div className={`px-4 py-2 rounded-lg text-sm font-mono ${
                correct ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
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
            <p className="text-xs text-subtle mb-2">Reihenfolge durch ↑↓ anpassen:</p>
            {orderArr.map((optIdx, pos) => {
              const corr = question.correct as number[]
              const isRightPos = submitted && corr[pos] === optIdx
              const isWrongPos = submitted && corr[pos] !== optIdx
              return (
                <div key={optIdx} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                  isRightPos ? 'border-success bg-success/10 text-success' :
                  isWrongPos ? 'border-danger bg-danger/10 text-danger' :
                  'border-line bg-sunken/60 text-muted'
                }`}>
                  <span className="font-mono text-subtle w-5">{pos+1}.</span>
                  <span className="flex-1">{question.options![optIdx]}</span>
                  {!submitted && (
                    <div className="flex gap-1">
                      <button onClick={() => moveOrder(pos, -1)} className="text-muted hover:text-ink px-1">↑</button>
                      <button onClick={() => moveOrder(pos, 1)} className="text-muted hover:text-ink px-1">↓</button>
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
              (question.type === 'numeric' && leseZahl(numInput) === null)
            }
            className="mt-4 w-full bg-accent hover:bg-accent-strong disabled:opacity-40 disabled:cursor-not-allowed text-on-accent font-semibold py-3 rounded-xl text-sm transition-colors">
            Antwort prüfen ✓
          </button>
        )}

        {/* Erklärung */}
        {submitted && (
          <div className={`mt-4 px-4 py-3 rounded-xl text-sm leading-relaxed ${
            correct
              ? 'bg-success/10 border border-success text-success'
              : 'bg-danger/10 border border-danger text-danger'
          }`}>
            <span className="font-semibold">{correct ? '✓ Richtig! ' : '✗ Nicht ganz. '}</span>
            {question.explanation}
          </div>
        )}
      </div>
    </div>
  )
}
