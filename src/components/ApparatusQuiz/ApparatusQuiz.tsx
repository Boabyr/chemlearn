import { useState } from 'react'

interface ApparatusOption {
  id: string
  label: string         // Name (versteckt bis nach Antwort)
  svgPath: string       // SVG-Pfad als data-URL oder inline
  description?: string  // Kurzbeschreibung (versteckt)
}

interface Props {
  question: string
  targetId: string
  options: ApparatusOption[]
  explanation: string
  hint1?: string
  hint2?: string
  mode?: 'identify' | 'label'
}

// SVG-Zeichnungen der wichtigsten Apparaturen (vereinfacht, aber erkennbar)
const APPARATUS_SVGS: Record<string, string> = {
  'fluorescence-spectrometer': `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Lampe links -->
    <circle cx="20" cy="80" r="12" fill="none" stroke="#fbbf24" strokeWidth="2"/>
    <text x="20" y="84" textAnchor="middle" fontSize="8" fill="#fbbf24">L</text>
    <!-- Erster Monochromator -->
    <rect x="40" y="60" width="30" height="40" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="45" y1="65" x2="65" y2="95" stroke="#60a5fa" strokeWidth="1.5"/>
    <!-- Küvette (Probe) in der Mitte -->
    <rect x="85" y="65" width="30" height="30" rx="2" fill="#1e3a5f" stroke="#e2e8f0" strokeWidth="2"/>
    <text x="100" y="84" textAnchor="middle" fontSize="7" fill="#e2e8f0">P</text>
    <!-- Zweiter Monochromator (senkrecht!) -->
    <rect x="85" y="110" width="30" height="30" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="90" y1="115" x2="110" y2="135" stroke="#60a5fa" strokeWidth="1.5"/>
    <!-- Detektor unten -->
    <rect x="88" y="148" width="24" height="10" rx="2" fill="none" stroke="#4ade80" strokeWidth="2"/>
    <!-- Strahlen -->
    <line x1="32" y1="80" x2="40" y2="80" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arr)"/>
    <line x1="70" y1="80" x2="85" y2="80" stroke="#818cf8" strokeWidth="1.5"/>
    <line x1="100" y1="95" x2="100" y2="110" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arr)"/>
    <line x1="100" y1="140" x2="100" y2="148" stroke="#4ade80" strokeWidth="1.5"/>
    <!-- Schlüsselmerkmal: 90° Winkel der Detektionsachse -->
    <text x="135" y="85" fontSize="7" fill="#94a3b8">90°</text>
    <path d="M115 80 L115 95 L130 95" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2"/>
    <defs><marker id="arr" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5" fill="#e2e8f0"/></marker></defs>
  </svg>`,

  'uv-vis-spectrometer': `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Deuteriumlampe + Wolframlampe -->
    <circle cx="18" cy="60" r="10" fill="none" stroke="#fbbf24" strokeWidth="2"/>
    <circle cx="18" cy="100" r="10" fill="none" stroke="#f87171" strokeWidth="2"/>
    <text x="18" y="64" textAnchor="middle" fontSize="6" fill="#fbbf24">D₂</text>
    <text x="18" y="104" textAnchor="middle" fontSize="6" fill="#f87171">W</text>
    <!-- Spiegel/Chopper -->
    <ellipse cx="45" cy="80" rx="8" ry="20" fill="none" stroke="#94a3b8" strokeWidth="2" transform="rotate(-20 45 80)"/>
    <!-- Monochromator (Gitter) -->
    <rect x="65" y="55" width="35" height="50" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="72" y1="60" x2="92" y2="100" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="82" y="90" textAnchor="middle" fontSize="6" fill="#60a5fa">⋮</text>
    <!-- Referenz + Probe Strahlengang (geteilt) -->
    <rect x="112" y="55" width="20" height="18" rx="2" fill="#1e3a5f" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="112" y="87" width="20" height="18" rx="2" fill="#0f2f1f" stroke="#e2e8f0" strokeWidth="1.5"/>
    <text x="122" y="67" textAnchor="middle" fontSize="5" fill="#94a3b8">Ref</text>
    <text x="122" y="99" textAnchor="middle" fontSize="5" fill="#e2e8f0">Prob</text>
    <!-- Detektoren -->
    <rect x="142" y="56" width="18" height="16" rx="2" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
    <rect x="142" y="88" width="18" height="16" rx="2" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
    <!-- Strahlen -->
    <line x1="28" y1="80" x2="37" y2="80" stroke="#e2e8f0" strokeWidth="1.5"/>
    <line x1="53" y1="80" x2="65" y2="80" stroke="#818cf8" strokeWidth="1.5"/>
    <line x1="100" y1="64" x2="112" y2="64" stroke="#818cf8" strokeWidth="1"/>
    <line x1="100" y1="96" x2="112" y2="96" stroke="#818cf8" strokeWidth="1"/>
    <line x1="132" y1="64" x2="142" y2="64" stroke="#4ade80" strokeWidth="1"/>
    <line x1="132" y1="96" x2="142" y2="96" stroke="#4ade80" strokeWidth="1"/>
    <!-- Schlüssel: Zwei parallele Strahlengänge -->
    <text x="100" y="140" textAnchor="middle" fontSize="6" fill="#94a3b8">Doppelstrahl-Prinzip</text>
  </svg>`,

  'ftir-spectrometer': `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- IR-Quelle -->
    <circle cx="20" cy="80" r="12" fill="none" stroke="#f87171" strokeWidth="2"/>
    <text x="20" y="84" textAnchor="middle" fontSize="7" fill="#f87171">IR</text>
    <!-- Strahlenteiler (Herzstück FT-IR) -->
    <rect x="80" y="60" width="40" height="40" rx="2" fill="none" stroke="#fbbf24" strokeWidth="2"/>
    <line x1="80" y1="100" x2="120" y2="60" stroke="#fbbf24" strokeWidth="2"/>
    <text x="100" y="88" textAnchor="middle" fontSize="6" fill="#fbbf24">BS</text>
    <!-- Fester Spiegel -->
    <rect x="80" y="25" width="40" height="8" rx="2" fill="#94a3b8" stroke="#94a3b8" strokeWidth="1"/>
    <text x="100" y="22" textAnchor="middle" fontSize="6" fill="#94a3b8">fester M.</text>
    <!-- Beweglicher Spiegel -->
    <rect x="135" y="60" width="40" height="8" rx="2" fill="#60a5fa" stroke="#60a5fa" strokeWidth="1" transform="rotate(90 155 64)"/>
    <text x="175" y="82" textAnchor="middle" fontSize="5" fill="#60a5fa">bew.</text>
    <text x="175" y="90" textAnchor="middle" fontSize="5" fill="#60a5fa">M. ←→</text>
    <!-- Probe -->
    <rect x="40" y="68" width="30" height="24" rx="2" fill="#0f2f1f" stroke="#e2e8f0" strokeWidth="1.5"/>
    <text x="55" y="83" textAnchor="middle" fontSize="6" fill="#e2e8f0">Probe</text>
    <!-- Detektor -->
    <rect x="10" y="118" width="24" height="14" rx="2" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="22" y="128" textAnchor="middle" fontSize="6" fill="#4ade80">Det</text>
    <!-- Strahlen -->
    <line x1="32" y1="80" x2="40" y2="80" stroke="#f87171" strokeWidth="1.5"/>
    <line x1="70" y1="80" x2="80" y2="80" stroke="#f87171" strokeWidth="1.5"/>
    <line x1="100" y1="60" x2="100" y2="33" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3"/>
    <line x1="120" y1="80" x2="155" y2="80" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3"/>
    <line x1="22" y1="100" x2="22" y2="118" stroke="#4ade80" strokeWidth="1.5"/>
    <!-- Label Interferometer -->
    <text x="100" y="150" textAnchor="middle" fontSize="6" fill="#fbbf24">Michelson-Interferometer</text>
  </svg>`,

  'aas-spectrometer': `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- HKL (Hohlkathodenlampe) -->
    <rect x="8" y="65" width="28" height="30" rx="6" fill="none" stroke="#fbbf24" strokeWidth="2"/>
    <circle cx="22" cy="80" r="7" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
    <text x="22" y="100" textAnchor="middle" fontSize="5" fill="#fbbf24">HKL</text>
    <!-- Flamme (Atomisator) -->
    <path d="M 55 100 Q 65 60 75 100 Q 78 70 85 100 Q 78 55 68 95 Q 65 50 62 100" fill="none" stroke="#fb923c" strokeWidth="2"/>
    <rect x="52" y="100" width="36" height="8" rx="2" fill="#64748b" stroke="#94a3b8" strokeWidth="1"/>
    <text x="70" y="118" textAnchor="middle" fontSize="5" fill="#fb923c">Flamme</text>
    <!-- Monochromator -->
    <rect x="98" y="62" width="32" height="36" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="103" y1="67" x2="123" y2="93" stroke="#60a5fa" strokeWidth="1.5"/>
    <!-- Detektor -->
    <rect x="142" y="68" width="24" height="24" rx="3" fill="none" stroke="#4ade80" strokeWidth="2"/>
    <text x="154" y="83" textAnchor="middle" fontSize="6" fill="#4ade80">Det</text>
    <!-- Strahlengang (Einstrahl) -->
    <line x1="36" y1="80" x2="52" y2="80" stroke="#fbbf24" strokeWidth="1.5"/>
    <line x1="88" y1="80" x2="98" y2="80" stroke="#818cf8" strokeWidth="1.5"/>
    <line x1="130" y1="80" x2="142" y2="80" stroke="#4ade80" strokeWidth="1.5"/>
    <!-- Nebulizer/Spray -->
    <path d="M 56 108 L 56 130 L 46 130" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="35" y="140" fontSize="5" fill="#94a3b8">Probe</text>
    <!-- Schlüssel: Einstrahl, HKL -->
    <text x="100" y="150" textAnchor="middle" fontSize="5" fill="#94a3b8">Einstrahl-Prinzip, element-spez. HKL</text>
  </svg>`,
}

// Fallback generischer Apparate-Platzhalter
function GenericApparatus({ index }: { label: string, index: number }) {
  const colors = ['#60a5fa', '#f59e0b', '#10b981', '#8b5cf6']
  const c = colors[index % colors.length]
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="160" height="120" rx="8" fill="none" stroke={c} strokeWidth="2"/>
      <circle cx="60" cy="70" r="20" fill="none" stroke={c} strokeWidth="2"/>
      <rect x="90" y="50" width="70" height="40" rx="4" fill="none" stroke={c} strokeWidth="2"/>
      <line x1="80" y1="70" x2="90" y2="70" stroke={c} strokeWidth="2"/>
      <rect x="95" y="100" width="60" height="20" rx="3" fill="none" stroke={c} strokeWidth="1.5"/>
      <text x="100" y="148" textAnchor="middle" fontSize="8" fill={c}>Apparatur {index+1}</text>
    </svg>
  )
}

export default function ApparatusQuiz({ question, targetId, options, explanation, hint1, hint2 }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [hints, setHints] = useState(0)
  const [answered, setAnswered] = useState(false)

  function select(id: string) {
    if (answered) return
    setSelected(id)
    setAnswered(true)
  }

  const correct = selected === targetId

  return (
    <div>
      <p className="text-white font-medium mb-5">{question}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((opt, i) => {
          const isSelected = selected === opt.id
          const isTarget = opt.id === targetId
          let border = 'border-slate-600 hover:border-slate-400'
          if (answered) {
            if (isTarget) border = 'border-green-500 bg-green-900/20'
            else if (isSelected) border = 'border-red-500 bg-red-900/20'
            else border = 'border-slate-700 opacity-50'
          } else if (isSelected) border = 'border-teal-400 bg-teal-900/20'

          const svgContent = APPARATUS_SVGS[opt.id]

          return (
            <button key={opt.id} onClick={() => select(opt.id)}
              className={`border-2 rounded-xl p-3 transition-all cursor-pointer ${border}`}>
              <div className="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                {svgContent
                  ? <div dangerouslySetInnerHTML={{ __html: svgContent }} className="w-full h-full p-1" />
                  : <GenericApparatus label={opt.label} index={i} />
                }
              </div>
              {/* Label NUR nach Antwort zeigen */}
              {answered && (
                <p className={`text-xs text-center font-medium mt-1 ${
                  isTarget ? 'text-green-400' : isSelected ? 'text-red-400' : 'text-slate-500'
                }`}>{opt.label}</p>
              )}
              {!answered && (
                <p className="text-xs text-center text-slate-500 mt-1">Apparatur {String.fromCharCode(65+i)}</p>
              )}
            </button>
          )
        })}
      </div>

      {/* Hinweise (vor Antwort) */}
      {!answered && (
        <div className="space-y-2 mb-4">
          {hints < 1 && hint1 && (
            <button onClick={() => setHints(1)}
              className="text-xs text-slate-500 hover:text-teal-400 transition-colors">
              💡 Hinweis 1 anzeigen
            </button>
          )}
          {hints >= 1 && hint1 && (
            <p className="text-xs text-teal-300 bg-teal-900/20 px-3 py-2 rounded-lg">💡 {hint1}</p>
          )}
          {hints === 1 && hint2 && (
            <button onClick={() => setHints(2)}
              className="text-xs text-slate-500 hover:text-teal-400 transition-colors">
              💡 Hinweis 2 anzeigen
            </button>
          )}
          {hints >= 2 && hint2 && (
            <p className="text-xs text-teal-300 bg-teal-900/20 px-3 py-2 rounded-lg">💡 {hint2}</p>
          )}
        </div>
      )}

      {/* Erklärung */}
      {answered && (
        <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
          correct ? 'bg-green-900/20 border border-green-800 text-green-300' : 'bg-red-900/20 border border-red-800 text-red-300'
        }`}>
          <span className="font-semibold">{correct ? '✓ Richtig! ' : '✗ Nicht ganz. '}</span>
          {explanation}
        </div>
      )}
    </div>
  )
}
