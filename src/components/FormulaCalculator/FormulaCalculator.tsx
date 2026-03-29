import { useState } from 'react'

interface Variable {
  id: string
  label: string
  symbol: string
  unit: string
  description: string
}

interface Formula {
  id: string
  name: string
  equation: string
  variables: Variable[]
  solve: (inputs: Record<string, number>) => Record<string, number>
  hints: string[]
}

interface FormulaCalculatorProps {
  formula: Formula
  onComplete?: () => void
}

export default function FormulaCalculator({ formula, onComplete }: FormulaCalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [solveFor, setSolveFor] = useState<string>(formula.variables[formula.variables.length - 1].id)
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
    const numInputs: Record<string, number> = {}
    for (const v of inputVars) {
      const val = parseFloat(inputs[v.id] || '')
      if (isNaN(val)) { setError(`Bitte ${v.symbol} eingeben.`); return }
      numInputs[v.id] = val
    }
    try {
      const results = formula.solve({ ...numInputs, solveFor: solveFor as unknown as number })
      setResult(results[solveFor])
    } catch {
      setError('Berechnung fehlgeschlagen. Bitte Werte prüfen.')
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
      <div className="bg-slate-900 border border-blue-800 rounded-xl px-5 py-4 text-center">
        <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-2">{formula.name}</p>
        <p className="text-2xl font-mono text-white">{formula.equation}</p>
      </div>

      {/* Gesucht */}
      <div>
        <p className="text-sm text-slate-400 mb-2">Gesucht:</p>
        <div className="flex gap-2 flex-wrap">
          {formula.variables.map(v => (
            <button key={v.id} onClick={() => { setSolveFor(v.id); reset() }}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                solveFor === v.id
                  ? 'bg-blue-900 border border-blue-400 text-blue-300'
                  : 'bg-slate-800 border border-slate-600 text-slate-400 hover:border-slate-400'
              }`}>
              {v.symbol} ({v.label})
            </button>
          ))}
        </div>
      </div>

      {/* Eingaben */}
      <div className="space-y-3">
        <p className="text-sm text-slate-400">Bekannte Größen eingeben:</p>
        {inputVars.map(v => (
          <div key={v.id} className="flex items-center gap-3">
            <div className="w-28 flex-shrink-0">
              <span className="font-mono text-blue-300 text-sm">{v.symbol}</span>
              <span className="text-slate-500 text-xs ml-1">({v.unit})</span>
            </div>
            <input
              type="number"
              step="any"
              placeholder={v.description}
              value={inputs[v.id] || ''}
              onChange={e => setInputs(i => ({ ...i, [v.id]: e.target.value }))}
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        ))}
      </div>

      <button onClick={calculate}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
        {targetVar.symbol} berechnen
      </button>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
      )}

      {result !== null && (
        <div className="space-y-3">
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl px-5 py-4">
            <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-1">Ergebnis</p>
            <p className="text-2xl font-mono text-white">
              {targetVar.symbol} = <span className="text-blue-300">{result.toPrecision(4)}</span> {targetVar.unit}
            </p>
          </div>

          {/* Selbsttest */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4">
            <p className="text-sm text-slate-400 mb-2">Selbsttest: Hast du das gleiche Ergebnis?</p>
            <div className="flex gap-3">
              <input
                type="number"
                step="any"
                placeholder={`Dein Wert für ${targetVar.symbol}`}
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-400"
              />
              <button onClick={checkAnswer}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-sm transition-colors">
                Prüfen
              </button>
            </div>
            {feedback && (
              <div className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium ${
                feedback === 'correct'
                  ? 'bg-green-900/20 border border-green-700 text-green-400'
                  : 'bg-red-900/20 border border-red-800 text-red-400'
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
            className="px-4 py-2 bg-amber-900/30 border border-amber-700/50 text-amber-400 rounded-lg text-xs">
            💡 Hinweis {showHint + 1}
          </button>
        )}
        <button onClick={reset}
          className="px-4 py-2 bg-slate-800 border border-slate-600 text-slate-400 rounded-lg text-xs">
          ⟳ Reset
        </button>
      </div>
      {formula.hints.slice(0, showHint).map((h, i) => (
        <div key={i} className="px-4 py-2 bg-amber-900/20 border border-amber-800/30 rounded-lg text-xs text-amber-300 leading-relaxed">
          {h}
        </div>
      ))}
    </div>
  )
}
