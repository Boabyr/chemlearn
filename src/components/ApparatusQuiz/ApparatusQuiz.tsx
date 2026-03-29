import { useState } from 'react'

interface ApparatusOption {
  id: string
  label: string
  description: string
  svg: string // SVG-Markup als String
}

interface ApparatusQuizProps {
  question: string
  mode: 'name-to-image' | 'image-to-name'
  targetId: string
  options: ApparatusOption[]
  explanation: string
  hint1?: string
  hint2?: string
  onComplete?: () => void
}

export default function ApparatusQuiz({
  question, mode, targetId, options, explanation, hint1, hint2, onComplete
}: ApparatusQuizProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [hints, setHints] = useState(0)

  const target = options.find(o => o.id === targetId)!
  const isCorrect = selected === targetId

  function confirm() {
    if (!selected) return
    setConfirmed(true)
    if (selected === targetId) setTimeout(() => onComplete?.(), 800)
  }

  function reset() {
    setSelected(null)
    setConfirmed(false)
    setHints(0)
  }

  return (
    <div className="space-y-4">
      {/* Frage */}
      {mode === 'name-to-image' && (
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl px-5 py-4">
          <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-2">Welche Apparatur ist das?</p>
          <p className="text-lg font-semibold text-white">{question}</p>
        </div>
      )}

      {mode === 'image-to-name' && (
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl px-5 py-4">
          <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-2">Welche Bezeichnung passt?</p>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: target.svg }} />
        </div>
      )}

      {/* Optionen */}
      <div className="grid grid-cols-1 gap-3">
        {options.map(opt => {
          const isSel = selected === opt.id
          const showRes = confirmed && isSel
          let border = 'border-slate-600'
          let bg = 'bg-slate-800'
          let text = 'text-slate-300'
          if (isSel && !confirmed) { border = 'border-blue-400'; bg = 'bg-blue-900/30'; text = 'text-blue-300' }
          if (showRes && opt.id === targetId) { border = 'border-green-500'; bg = 'bg-green-900/20'; text = 'text-green-400' }
          if (showRes && opt.id !== targetId) { border = 'border-red-600'; bg = 'bg-red-900/20'; text = 'text-red-400' }
          if (confirmed && opt.id === targetId && !isSel) { border = 'border-green-500'; bg = 'bg-green-900/10'; text = 'text-green-400' }

          return (
            <div key={opt.id} onClick={() => !confirmed && setSelected(opt.id)}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${border} ${bg}`}>
              {mode === 'name-to-image' ? (
                <div>
                  <div dangerouslySetInnerHTML={{ __html: opt.svg }} />
                  <p className={`text-xs mt-2 font-mono ${text}`}>{opt.label}</p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {confirmed && opt.id === targetId && <span className="text-green-400 text-lg">✓</span>}
                  {showRes && opt.id !== targetId && <span className="text-red-400 text-lg">✗</span>}
                  <div>
                    <p className={`font-semibold text-sm ${text}`}>{opt.label}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{opt.description}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {confirmed && (
        <div className={`px-5 py-4 rounded-xl border text-sm leading-relaxed ${
          isCorrect
            ? 'bg-green-900/20 border-green-700 text-green-300'
            : 'bg-red-900/20 border-red-800 text-red-300'
        }`}>
          <span className="font-semibold">{isCorrect ? '✓ Richtig! ' : '✗ Nicht ganz. '}</span>
          {explanation}
          {!isCorrect && (
            <button onClick={reset} className="ml-3 px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs">
              Nochmal
            </button>
          )}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {!confirmed && (
          <button onClick={confirm} disabled={!selected}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              selected ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}>
            Bestätigen
          </button>
        )}
        {hints < 2 && hint1 && (
          <button onClick={() => setHints(h => h + 1)}
            className="px-4 py-2 bg-amber-900/30 border border-amber-700/50 text-amber-400 rounded-lg text-xs">
            💡 Hinweis {hints + 1}
          </button>
        )}
      </div>
      {hints >= 1 && hint1 && <div className="px-4 py-2 bg-amber-900/20 border border-amber-800/30 rounded-lg text-xs text-amber-300">{hint1}</div>}
      {hints >= 2 && hint2 && <div className="px-4 py-2 bg-amber-900/20 border border-amber-700/40 rounded-lg text-xs text-amber-300">🔍 {hint2}</div>}
    </div>
  )
}
