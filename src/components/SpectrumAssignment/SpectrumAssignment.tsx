import { useState } from 'react'

interface Peak {
  id: string
  position: number   // x-Position in SVG (0-100%)
  yTop: number       // obere y-Position (%)
  yBottom: number    // untere y-Position (%)
  correctLabel: string
  options: string[]
}

interface SpectrumAssignmentProps {
  title: string
  description: string
  xLabel: string
  yLabel: string
  peaks: Peak[]
  hint1?: string
  hint2?: string
  onComplete?: () => void
}

export default function SpectrumAssignment({
  title, description, xLabel, yLabel, peaks, hint1, hint2, onComplete
}: SpectrumAssignmentProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [hints, setHints] = useState(0)

  const results = peaks.map(p => ({
    ...p,
    selected: assignments[p.id],
    correct: assignments[p.id] === p.correctLabel,
  }))

  const allAssigned = peaks.every(p => assignments[p.id])
  const allCorrect = results.every(r => r.correct)

  function check() {
    setChecked(true)
    if (allCorrect) setTimeout(() => onComplete?.(), 900)
  }

  function reset() {
    setAssignments({})
    setChecked(false)
    setHints(0)
  }

  // Sammle alle einzigartigen Optionen
  // allOptions removed

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-white mb-1">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>

      {/* Spektrum SVG */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
        <svg viewBox="0 0 500 220" width="100%" style={{ display: 'block' }}>
          {/* Achsen */}
          <line x1="50" y1="10" x2="50" y2="180" stroke="#475569" strokeWidth="1.5"/>
          <line x1="50" y1="180" x2="490" y2="180" stroke="#475569" strokeWidth="1.5"/>

          {/* Y-Label */}
          <text x="15" y="95" fill="#64748b" fontSize="10" textAnchor="middle"
            transform="rotate(-90, 15, 95)">{yLabel}</text>

          {/* X-Label */}
          <text x="270" y="200" fill="#64748b" fontSize="10" textAnchor="middle">{xLabel}</text>

          {/* Peaks als Gauss-Kurven */}
          {peaks.map((peak, i) => {
            const cx = 50 + (peak.position / 100) * 440
            const peakY = peak.yTop * 1.7
            const color = checked
              ? (assignments[peak.id] === peak.correctLabel ? '#4ade80' : '#f87171')
              : '#60a5fa'

            return (
              <g key={peak.id}>
                {/* Peak-Kurve */}
                <path
                  d={`M ${cx - 30} 180 Q ${cx - 15} ${180 - peakY * 0.3} ${cx} ${180 - peakY} Q ${cx + 15} ${180 - peakY * 0.3} ${cx + 30} 180`}
                  fill={color + '33'} stroke={color} strokeWidth="2"/>
                {/* Peak-Nummer */}
                <circle cx={cx} cy={180 - peakY - 12} r="10" fill={color + '33'} stroke={color} strokeWidth="1.5"/>
                <text x={cx} y={180 - peakY - 8} textAnchor="middle" dominantBaseline="central"
                  fill={color} fontSize="9" fontWeight="600">{i + 1}</text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Zuordnungstabelle */}
      <div className="space-y-2">
        <p className="text-sm text-slate-400">Ordne jedem Peak die richtige Bezeichnung zu:</p>
        {peaks.map((peak, i) => {
          const result = results[i]
          let borderCol = 'border-slate-600'
          if (checked) borderCol = result.correct ? 'border-green-600' : 'border-red-600'
          else if (assignments[peak.id]) borderCol = 'border-blue-500'

          return (
            <div key={peak.id} className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-colors bg-slate-800 ${borderCol}`}>
              <div className="w-7 h-7 rounded-full bg-blue-900/40 border border-blue-500 flex items-center justify-center text-blue-300 text-xs font-bold flex-shrink-0">
                {i + 1}
              </div>
              <select
                value={assignments[peak.id] || ''}
                onChange={e => !checked && setAssignments(a => ({ ...a, [peak.id]: e.target.value }))}
                disabled={checked}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-400">
                <option value="">-- Bitte wählen --</option>
                {peak.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {checked && (
                <span className={`text-sm font-semibold flex-shrink-0 ${result.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {result.correct ? '✓' : `✗ → ${peak.correctLabel}`}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {checked && (
        <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
          allCorrect
            ? 'bg-green-900/20 border border-green-700 text-green-300'
            : 'bg-amber-900/20 border border-amber-700 text-amber-300'
        }`}>
          {allCorrect
            ? '✓ Alle Peaks korrekt zugeordnet!'
            : `${results.filter(r => r.correct).length} von ${peaks.length} richtig. Prüfe die markierten Fehler.`}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {!checked && (
          <button onClick={check} disabled={!allAssigned}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              allAssigned ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}>
            Zuordnung prüfen ✓
          </button>
        )}
        {checked && !allCorrect && (
          <button onClick={reset}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-700 border border-slate-600 text-slate-300">
            ⟳ Nochmal
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
