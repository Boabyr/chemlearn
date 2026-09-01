import { useState } from 'react'
import { getApparatus } from '../Apparatus/registry'

interface ApparatusOption {
  id: string            // Schlüssel in der Apparatur-Registry
  label: string         // Name (versteckt bis nach Antwort)
  description?: string  // Kurzbeschreibung (versteckt)
}

interface Props {
  question: string
  targetId: string
  options: ApparatusOption[]
  explanation: string
  hint1?: string
  hint2?: string
}

/** Fällt ein, wenn eine Apparatur-ID keine Zeichnung hat. Im Dev-Build meldet
 *  die Registry das zusätzlich auf der Konsole. */
function MissingApparatus({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 200 160" width="100%" height="100%" role="img">
      <rect x="20" y="20" width="160" height="120" rx="8" fill="none"
        stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
      <text x="100" y="86" textAnchor="middle" fontSize="10" fill="#64748b">
        Apparatur {index + 1}
      </text>
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
      <p className="text-ink font-medium mb-5">{question}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((opt, i) => {
          const isSelected = selected === opt.id
          const isTarget = opt.id === targetId
          let border = 'border-line hover:border-subtle'
          if (answered) {
            if (isTarget) border = 'border-success bg-success/10'
            else if (isSelected) border = 'border-danger bg-danger/10'
            else border = 'border-line opacity-50'
          } else if (isSelected) border = 'border-accent bg-accent/10'

          const Drawing = getApparatus(opt.id)

          return (
            <button key={opt.id} onClick={() => select(opt.id)}
              className={`border-2 rounded-xl p-3 transition-all cursor-pointer ${border}`}>
              <div className="w-full aspect-video bg-surface rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                <div className="w-full h-full p-1">
                  {Drawing ? <Drawing /> : <MissingApparatus index={i} />}
                </div>
              </div>
              {/* Label NUR nach Antwort zeigen */}
              {answered && (
                <p className={`text-xs text-center font-medium mt-1 ${
                  isTarget ? 'text-success' : isSelected ? 'text-danger' : 'text-subtle'
                }`}>{opt.label}</p>
              )}
              {!answered && (
                <p className="text-xs text-center text-subtle mt-1">Apparatur {String.fromCharCode(65+i)}</p>
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
              className="text-xs text-subtle hover:text-accent transition-colors">
              💡 Hinweis 1 anzeigen
            </button>
          )}
          {hints >= 1 && hint1 && (
            <p className="text-xs text-accent bg-accent/10 px-3 py-2 rounded-lg">💡 {hint1}</p>
          )}
          {hints === 1 && hint2 && (
            <button onClick={() => setHints(2)}
              className="text-xs text-subtle hover:text-accent transition-colors">
              💡 Hinweis 2 anzeigen
            </button>
          )}
          {hints >= 2 && hint2 && (
            <p className="text-xs text-accent bg-accent/10 px-3 py-2 rounded-lg">💡 {hint2}</p>
          )}
        </div>
      )}

      {/* Erklärung */}
      {answered && (
        <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
          correct ? 'bg-success/10 border border-success text-success' : 'bg-danger/10 border border-danger text-danger'
        }`}>
          <span className="font-semibold">{correct ? '✓ Richtig! ' : '✗ Nicht ganz. '}</span>
          {explanation}
        </div>
      )}
    </div>
  )
}
