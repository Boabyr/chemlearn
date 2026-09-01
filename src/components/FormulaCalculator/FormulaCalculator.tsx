import { useMemo, useState } from 'react'
import type { Formel } from '../../content/schema'
import { auswerten } from '../../lib/formel/ausdruck'
import { leseZahl } from '../../lib/learning/bewerten'

interface FormulaCalculatorProps {
  formula: Formel
  onComplete?: () => void
}

export default function FormulaCalculator({ formula, onComplete }: FormulaCalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({})
  // Nur nach Größen fragen, für die es auch eine Umstellung gibt.
  const loesbar = useMemo(
    () => formula.variables.filter(v => formula.umstellungen.some(u => u.solveFor === v.id)),
    [formula],
  )
  const [solveFor, setSolveFor] = useState<string>(loesbar[0].id)
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(0)
  // attempts removed
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  const inputVars = formula.variables.filter(v => v.id !== solveFor)
  const targetVar = formula.variables.find(v => v.id === solveFor)!

  function calculate() {
    setError(null)
    const werte: Record<string, number> = {}
    for (const v of inputVars) {
      const zahl = leseZahl(inputs[v.id] ?? '')
      if (zahl === null) { setError(`Bitte ${v.symbol} eingeben.`); return }
      werte[v.id] = zahl
    }

    const umstellung = formula.umstellungen.find(u => u.solveFor === solveFor)
    if (!umstellung) { setError(`Für ${solveFor} ist keine Umstellung hinterlegt.`); return }

    try {
      const wert = auswerten(umstellung.expr, werte)
      if (!Number.isFinite(wert)) { setError('Kein endliches Ergebnis — bitte Werte prüfen.'); return }
      setResult(wert)
    } catch (fehler) {
      setError((fehler as Error).message)
    }
  }

  function checkAnswer() {
    if (!result) return
    const ans = parseFloat(userAnswer)
    const tolerance = Math.abs(result) * 0.02 // 2% Toleranz
    const correct = Math.abs(ans - result) <= Math.max(tolerance, 0.001)
    setFeedback(correct ? 'correct' : 'wrong')
    // attempts
    if (correct) onComplete?.()
  }

  function reset() {
    setInputs({})
    setResult(null)
    setError(null)
    setUserAnswer('')
    setFeedback(null)
    // attempts reset
    setShowHint(0)
  }

  return (
    <div className="space-y-4">
      {/* Formel-Anzeige */}
      <div className="bg-surface border border-blue-800 rounded-xl px-5 py-4 text-center">
        <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-2">{formula.name}</p>
        <p className="text-2xl font-mono text-ink">{formula.equation}</p>
      </div>

      {/* Gesucht */}
      <div>
        <p className="text-sm text-muted mb-2">Gesucht:</p>
        <div className="flex gap-2 flex-wrap">
          {loesbar.map(v => (
            <button key={v.id} onClick={() => { setSolveFor(v.id); reset() }}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                solveFor === v.id
                  ? 'bg-blue-900 border border-blue-400 text-blue-300'
                  : 'bg-raised border border-line text-muted hover:border-subtle'
              }`}>
              {v.symbol} ({v.label})
            </button>
          ))}
        </div>
      </div>

      {/* Eingaben */}
      <div className="space-y-3">
        <p className="text-sm text-muted">Bekannte Größen eingeben:</p>
        {inputVars.map(v => (
          <div key={v.id} className="flex items-center gap-3">
            <div className="w-28 flex-shrink-0">
              <span className="font-mono text-blue-300 text-sm">{v.symbol}</span>
              <span className="text-subtle text-xs ml-1">({v.unit})</span>
            </div>
            <input
              type="number"
              step="any"
              placeholder={v.description}
              value={inputs[v.id] || ''}
              onChange={e => setInputs(i => ({ ...i, [v.id]: e.target.value }))}
              className="flex-1 bg-surface border border-line rounded-lg px-3 py-2 text-ink font-mono text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        ))}
      </div>

      <button onClick={calculate}
        className="w-full bg-blue-600 hover:bg-blue-500 text-ink font-semibold py-3 rounded-xl text-sm transition-colors">
        {targetVar.symbol} berechnen
      </button>

      {error && (
        <div className="bg-danger/10 border border-danger rounded-xl px-4 py-3 text-danger text-sm">{error}</div>
      )}

      {result !== null && (
        <div className="space-y-3">
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl px-5 py-4">
            <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-1">Ergebnis</p>
            <p className="text-2xl font-mono text-ink">
              {targetVar.symbol} = <span className="text-blue-300">{result.toPrecision(4)}</span> {targetVar.unit}
            </p>
          </div>

          {/* Selbsttest */}
          <div className="bg-raised border border-line rounded-xl px-5 py-4">
            <p className="text-sm text-muted mb-2">Selbsttest: Hast du das gleiche Ergebnis?</p>
            <div className="flex gap-3">
              <input
                type="number"
                step="any"
                placeholder={`Dein Wert für ${targetVar.symbol}`}
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className="flex-1 bg-surface border border-line rounded-lg px-3 py-2 text-ink font-mono text-sm focus:outline-none focus:border-blue-400"
              />
              <button onClick={checkAnswer}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-ink font-semibold rounded-lg text-sm transition-colors">
                Prüfen
              </button>
            </div>
            {feedback && (
              <div className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium ${
                feedback === 'correct'
                  ? 'bg-success/10 border border-success text-success'
                  : 'bg-danger/10 border border-danger text-danger'
              }`}>
                {feedback === 'correct'
                  ? '✓ Richtig! Gut gerechnet.'
                  : `✗ Nicht ganz. Korrekt: ${result.toPrecision(4)} ${targetVar.unit}`}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hinweise */}
      <div className="flex gap-2 flex-wrap">
        {showHint < formula.hints.length && (
          <button onClick={() => setShowHint(h => h + 1)}
            className="px-4 py-2 bg-warning/20 border border-warning text-warning rounded-lg text-xs">
            💡 Hinweis {showHint + 1}
          </button>
        )}
        <button onClick={reset}
          className="px-4 py-2 bg-raised border border-line text-muted rounded-lg text-xs">
          ⟳ Reset
        </button>
      </div>
      {formula.hints.slice(0, showHint).map((h, i) => (
        <div key={i} className="px-4 py-2 bg-warning/10 border border-warning rounded-lg text-xs text-warning leading-relaxed">
          {h}
        </div>
      ))}
    </div>
  )
}
