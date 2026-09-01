import { useNavigate } from 'react-router-dom'
import { useReviews } from '../../hooks/useReviews'

/**
 * Einstieg in die tägliche Runde.
 *
 * Die Zahl der fälligen Wiederholungen wurde schon immer berechnet — bis
 * hierher führte sie nirgendwo hin. Das ist der Knopf, der gefehlt hat.
 */
export default function Tagesrunde() {
  const navigate = useNavigate()
  const { dueCount, loading } = useReviews()

  return (
    <section className="mb-8 rounded-2xl border border-accent bg-accent/10 p-6"
      aria-label="Tägliche Wiederholung">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Tagesrunde</p>
          <p className="text-2xl font-light text-ink">
            {loading
              ? 'Wird geprüft...'
              : dueCount > 0
                ? `${dueCount} ${dueCount === 1 ? 'Element ist' : 'Elemente sind'} fällig`
                : 'Nichts überfällig'}
          </p>
          <p className="mt-1 text-sm text-muted">
            Karten und Fragen aus allen Kursen, zuerst das Überfällige, dann die letzten Fehler.
          </p>
        </div>
        <button onClick={() => navigate('/lernen')}
          className="min-h-11 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-on-accent hover:bg-accent-strong">
          {dueCount > 0 ? 'Runde starten' : 'Trotzdem lernen'}
        </button>
      </div>
    </section>
  )
}
