import { useNavigate } from 'react-router-dom'
import { useMastery } from '../../hooks/useMastery'
import { useReviews } from '../../hooks/useReviews'
import { professorLabel } from '../../data/exams'
import type { Level } from '../../lib/learning/mastery'

/**
 * Lernstand eines Kurses: was heute fällig ist, wo es hakt, wie weit die
 * Prüfungsreife je Prüfer ist.
 */

// Statusfarben tragen nie allein die Aussage — daneben steht immer das Wort.
const LEVEL: Record<Level, { dot: string; bar: string; text: string; word: string }> = {
  sicher:    { dot: 'bg-success', bar: 'var(--c-success)', text: 'text-success', word: 'bereit' },
  wackelig:  { dot: 'bg-warning', bar: 'var(--c-warning)', text: 'text-warning', word: 'wackelig' },
  ungelernt: { dot: 'bg-subtle', bar: 'var(--c-subtle)', text: 'text-muted', word: 'ungelernt' },
}

const PROF_ICONS: Record<string, string> = {
  lieberzeit: '🔭', koellensperger: '📊', gerner: '🧪',
}

function Meter({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 bg-sunken rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all"
        style={{ width: `${Math.max(2, Math.round(value * 100))}%`, background: color }} />
    </div>
  )
}

export default function LearningStatus({ courseId, courseTitle }: {
  courseId: string
  courseTitle: string
}) {
  const navigate = useNavigate()
  const { weakest, readiness, attempts, loading } = useMastery(courseId)
  const { dueCount } = useReviews(courseId)

  if (loading) return null

  // Vor dem ersten Versuch gibt es nichts auszuwerten.
  if (attempts.length === 0 && dueCount === 0) {
    return (
      <div className="bg-raised border border-line rounded-2xl p-6 mb-8">
        <h2 className="font-medium mb-1">Lernstand {courseTitle}</h2>
        <p className="text-muted text-sm mb-4">
          Noch keine Antworten aufgezeichnet. Nach der ersten Übungsrunde stehen hier
          deine schwächsten Themen und die Prüfungsreife.
        </p>
        <button onClick={() => navigate(`/practice?course=${courseId}`)}
          className="px-5 py-2.5 bg-accent hover:bg-accent-strong text-on-accent text-sm font-semibold rounded-xl transition-colors">
          Erste Runde starten
        </button>
      </div>
    )
  }

  return (
    <div className="bg-raised border border-line rounded-2xl p-6 mb-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <h2 className="font-medium">Lernstand {courseTitle}</h2>
        <button onClick={() => navigate(`/practice?course=${courseId}`)}
          className="text-xs px-3 py-1.5 bg-accent hover:bg-accent-strong text-on-accent font-medium rounded-lg transition-colors flex-shrink-0">
          Üben
        </button>
      </div>

      <div className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8">
        {/* Fällige Wiederholungen als Kennzahl, nicht als Diagramm */}
        <div>
          <p className="text-xs text-subtle uppercase tracking-widest mb-1">Heute fällig</p>
          <p className={`text-4xl font-light ${dueCount > 0 ? 'text-accent' : 'text-subtle'}`}>
            {dueCount}
          </p>
          <p className="text-xs text-subtle mt-1">
            {dueCount === 1 ? 'Wiederholung' : 'Wiederholungen'}
          </p>
        </div>

        {/* Prüfungsreife je Prüfer */}
        {readiness.length > 0 && (
          <div>
            <p className="text-xs text-subtle uppercase tracking-widest mb-3">Prüfungsreife</p>
            <div className="space-y-3">
              {readiness.map(r => {
                const stil = LEVEL[r.level]
                return (
                  <div key={r.professor}>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <span className="text-sm text-muted">
                        {PROF_ICONS[r.professor] ?? '📘'} {professorLabel(r.professor)}
                      </span>
                      <span className={`text-xs ${stil.text}`}>
                        {stil.word} · {r.answered}/{r.total} Fragen
                      </span>
                    </div>
                    <Meter value={r.score} color={stil.bar} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Schwächste Themen */}
      {weakest.length > 0 && (
        <div className="mt-6 pt-6 border-t border-line">
          <p className="text-xs text-subtle uppercase tracking-widest mb-3">Wo es hakt</p>
          <div className="space-y-2">
            {weakest.map(t => (
              <button key={t.topicId}
                onClick={() => navigate(`/course/${courseId}/${t.topicId}`)}
                className="w-full flex items-center gap-3 text-left group">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${LEVEL[t.level].dot}`} />
                <span className="text-sm text-muted group-hover:text-ink transition-colors flex-1 min-w-0 truncate">
                  {t.topicId.replace(/^\d+-/, '').replace(/-/g, ' ')}
                </span>
                <span className="text-xs text-subtle flex-shrink-0">
                  {t.attempts === 0 ? 'nie geübt' : `${Math.round(t.score * 100)} %`}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
