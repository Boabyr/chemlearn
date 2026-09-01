import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAttempts } from '../hooks/useAttempts'
import { useReviews } from '../hooks/useReviews'
import { useLernVorrat } from '../hooks/useLernVorrat'
import { baueTagessitzung, type PlanZustand } from '../lib/learning/tagessitzung'
import { ohnePraefix, type LernAufgabe } from '../lib/learning/lernItem'
import { GRADES, type Grade } from '../lib/learning/sm2'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'
import ThemeToggle from '../components/Shell/ThemeToggle'
import { ampelText } from '../lib/scoreColor'
import { spracheVon } from '../lib/courseRegistry'

const KNOEPFE: { grade: Grade; label: string; taste: string }[] = [
  { grade: GRADES.NOCHMAL, label: 'Nochmal', taste: '1' },
  { grade: GRADES.SCHWER, label: 'Schwer', taste: '2' },
  { grade: GRADES.GUT, label: 'Gut', taste: '3' },
  { grade: GRADES.LEICHT, label: 'Leicht', taste: '4' },
]

export default function LernSession() {
  const navigate = useNavigate()
  const { vorrat, loading: vorratLaedt } = useLernVorrat()
  const { attempts, logAttempt, flush, loading: versucheLaden } = useAttempts()
  const { reviews, gradeItem, dueCount: faellig, loading: plaeneLaden } = useReviews()

  const [warteschlange, setWarteschlange] = useState<LernAufgabe[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [umgedreht, setUmgedreht] = useState(false)
  const [beantwortet, setBeantwortet] = useState(false)
  const [erledigt, setErledigt] = useState(0)
  const [richtige, setRichtige] = useState(0)
  const [seit, setSeit] = useState(() => Date.now())

  const laedt = vorratLaedt || versucheLaden || plaeneLaden

  const plaene: PlanZustand[] = useMemo(
    () => reviews.map(r => ({ itemId: r.itemId, dueAt: r.dueAt, lapses: r.lapses, reps: r.reps })),
    [reviews],
  )

  /**
   * Runde zusammenstellen.
   *
   * Bewusst auf Knopfdruck statt in einem Effekt: die Reihenfolge soll
   * einmal feststehen und nicht jedes Mal neu würfeln, wenn eine Antwort in
   * den Cache läuft.
   */
  function rundeStarten() {
    setWarteschlange(baueTagessitzung({ vorrat, plaene, attempts }))
    setIdx(0)
    setErledigt(0)
    setRichtige(0)
    setUmgedreht(false)
    setBeantwortet(false)
    setSeit(Date.now())
  }



  const aufgabe = warteschlange?.[idx]

  const weiter = useCallback(() => {
    setUmgedreht(false)
    setBeantwortet(false)
    setSeit(Date.now())
    setIdx(i => i + 1)
  }, [])

  /** Bewerten, planen und je nach Note in dieselbe Runde zurücklegen. */
  const bewerten = useCallback((grade: Grade) => {
    if (!aufgabe) return

    void gradeItem(
      { itemType: aufgabe.art, itemId: aufgabe.itemId, topicId: aufgabe.topicId, courseId: aufgabe.courseId },
      grade,
    )

    if (aufgabe.art === 'card') {
      logAttempt({
        courseId: aufgabe.courseId,
        topicId: aufgabe.topicId,
        questionId: ohnePraefix(aufgabe.itemId),
        source: 'practice',
        correct: grade !== GRADES.NOCHMAL,
        msTaken: Date.now() - seit,
      })
    }

    setErledigt(n => n + 1)
    if (grade !== GRADES.NOCHMAL) setRichtige(n => n + 1)

    // „Nochmal" heißt: noch in dieser Runde wieder vorlegen.
    if (grade === GRADES.NOCHMAL) {
      setWarteschlange(alt => (alt ? [...alt, aufgabe] : alt))
    }
    weiter()
  }, [aufgabe, gradeItem, logAttempt, seit, weiter])

  /** Antwort einer Prüfungsfrage: protokollieren und in die Planung geben. */
  function frageBeantwortet(korrekt: boolean, punkte: number) {
    if (!aufgabe || aufgabe.art !== 'question') return
    setBeantwortet(true)
    logAttempt({
      courseId: aufgabe.courseId,
      topicId: aufgabe.topicId,
      questionId: aufgabe.frage.id,
      source: 'practice',
      correct: korrekt,
      pointsEarned: punkte,
      pointsPossible: aufgabe.frage.points,
      msTaken: Date.now() - seit,
    })
  }

  // Tastatur: Zahlen bewerten, Leertaste dreht die Karte um.
  useEffect(() => {
    function beiTaste(e: KeyboardEvent) {
      if (!aufgabe) return
      const ziel = e.target as HTMLElement | null
      if (ziel && ['INPUT', 'TEXTAREA'].includes(ziel.tagName)) return

      if (aufgabe.art === 'card') {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setUmgedreht(u => !u); return }
        if (umgedreht) {
          const treffer = KNOEPFE.find(k => k.taste === e.key)
          if (treffer) { e.preventDefault(); bewerten(treffer.grade) }
        }
        return
      }

      if (beantwortet && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); weiter() }
    }
    window.addEventListener('keydown', beiTaste)
    return () => window.removeEventListener('keydown', beiTaste)
  }, [aufgabe, umgedreht, beantwortet, bewerten, weiter])

  if (laedt) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-accent" role="status">Lernstand wird geladen...</p>
      </div>
    )
  }

  if (warteschlange === null) {
    return (
      <div className="min-h-screen bg-surface text-ink">
        <Kopf onZurueck={() => navigate('/')} />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="mb-4 text-5xl">{faellig > 0 ? '📚' : '☕'}</p>
          <h1 className="mb-2 text-2xl font-light">
            {faellig > 0
              ? `${faellig} ${faellig === 1 ? 'Element ist' : 'Elemente sind'} fällig`
              : 'Nichts überfällig'}
          </h1>
          <p className="mb-8 text-muted">
            Die Runde nimmt zuerst das Überfällige, dann die letzten Fehler, dann Neues aus
            deinen schwächsten Themen — über alle Kurse hinweg.
          </p>
          <button onClick={rundeStarten}
            className="min-h-11 rounded-xl bg-accent px-8 py-3 font-semibold text-on-accent hover:bg-accent-strong">
            Runde starten
          </button>
        </main>
      </div>
    )
  }

  const gesamt = warteschlange.length

  if (!aufgabe) {
    const quote = erledigt > 0 ? richtige / erledigt : 1
    return (
      <div className="min-h-screen bg-surface text-ink">
        <Kopf onZurueck={() => navigate('/')} />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="mb-4 text-5xl">{erledigt === 0 ? '☕' : '🎉'}</p>
          <h1 className="mb-2 text-2xl font-light">
            {erledigt === 0 ? 'Heute nichts fällig' : 'Runde geschafft'}
          </h1>
          {erledigt === 0 ? (
            <p className="text-muted">
              Alles Fällige ist abgearbeitet. Neuer Stoff kommt, sobald die Intervalle ablaufen —
              oder du übst gezielt ein Thema.
            </p>
          ) : (
            <>
              <p className="mb-6 text-muted">{erledigt} Elemente bearbeitet</p>
              <p className={`mb-8 text-5xl font-bold ${ampelText(quote)}`}>{Math.round(quote * 100)}%</p>
            </>
          )}
          <div className="mt-8 flex justify-center gap-3">
            <button onClick={() => { void flush(); navigate('/') }}
              className="rounded-xl border border-line px-6 py-3 text-sm hover:bg-sunken">
              Zur Übersicht
            </button>
            <button onClick={() => { void flush(); rundeStarten() }}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-on-accent hover:bg-accent-strong">
              Neue Runde
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <Kopf onZurueck={() => { void flush(); navigate('/') }} />

      <div className="mx-auto max-w-3xl px-4 pt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-subtle">
          <span>{idx + 1} von {gesamt}</span>
          <span>{aufgabe.art === 'card' ? '🃏 Karteikarte' : '📝 Frage'} · {aufgabe.topicId}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-sunken" role="progressbar"
          aria-valuenow={idx} aria-valuemin={0} aria-valuemax={gesamt} aria-label="Fortschritt der Runde">
          <div className="h-full bg-accent transition-all" style={{ width: `${(idx / gesamt) * 100}%` }} />
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {aufgabe.art === 'card' ? (
          <section aria-label="Karteikarte" lang={spracheVon(aufgabe.courseId)}>
            <button onClick={() => setUmgedreht(u => !u)}
              aria-expanded={umgedreht}
              className="min-h-64 w-full rounded-2xl border border-line bg-raised p-8 text-left transition-colors hover:border-subtle">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-subtle">
                {umgedreht ? 'Rückseite' : 'Vorderseite — Leertaste dreht um'}
              </p>
              <p className="text-lg leading-relaxed">
                {umgedreht ? aufgabe.karte.back : aufgabe.karte.front}
              </p>
            </button>

            <div aria-live="polite" className="mt-6">
              {umgedreht ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {KNOEPFE.map(k => (
                    <button key={k.grade} onClick={() => bewerten(k.grade)}
                      className="min-h-11 rounded-xl border border-line px-4 py-3 text-sm hover:border-accent hover:text-accent">
                      {k.label}
                      <span className="ml-2 font-mono text-xs text-subtle">{k.taste}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-subtle">Erst überlegen, dann umdrehen.</p>
              )}
            </div>
          </section>
        ) : (
          <section aria-label="Frage">
            <ExamQuestionCard key={aufgabe.itemId} question={aufgabe.frage}
              courseId={aufgabe.courseId} onAnswer={frageBeantwortet} showSource />
            {beantwortet && (
              <div className="mt-6">
                <p className="mb-3 text-center text-sm text-subtle">Wie sicher saß das?</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {KNOEPFE.map(k => (
                    <button key={k.grade} onClick={() => bewerten(k.grade)}
                      className="min-h-11 rounded-xl border border-line px-4 py-3 text-sm hover:border-accent hover:text-accent">
                      {k.label}
                      <span className="ml-2 font-mono text-xs text-subtle">{k.taste}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

function Kopf({ onZurueck }: { onZurueck: () => void }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-raised px-6 py-4">
      <button onClick={onZurueck} className="text-sm text-muted hover:text-ink">← Beenden</button>
      <span className="font-mono text-xs uppercase tracking-widest text-accent">Tagesrunde</span>
      <ThemeToggle />
    </header>
  )
}
