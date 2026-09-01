import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAttempts } from '../hooks/useAttempts'
import { useReviews } from '../hooks/useReviews'
import { useProgress } from '../hooks/useProgress'
import { useEinstellungen } from '../hooks/useEinstellungen'
import { useMastery } from '../hooks/useMastery'
import { allCourses } from '../lib/courseRegistry'
import { courseIdsWithExams } from '../data/exams'
import {
  eckdaten, faelligkeitsVorschau, reifePrognose, tagesverlauf, tageBis,
} from '../lib/learning/statistik'
import Kennzahl from '../components/Statistik/Kennzahl'
import Verlaufsdiagramm from '../components/Statistik/Verlaufsdiagramm'
import Lernkalender from '../components/Statistik/Lernkalender'
import Faelligkeitsbalken from '../components/Statistik/Faelligkeitsbalken'
import ThemeToggle from '../components/Shell/ThemeToggle'

function alsDauer(sekunden: number): string {
  const stunden = Math.floor(sekunden / 3600)
  const minuten = Math.round((sekunden % 3600) / 60)
  return stunden > 0 ? `${stunden} h ${minuten} min` : `${minuten} min`
}

export default function Statistik() {
  const navigate = useNavigate()
  const { attempts, loading: versucheLaden } = useAttempts()
  const { reviews, loading: plaeneLaden } = useReviews()
  const { streak } = useProgress()
  const { einstellungen } = useEinstellungen()

  const verlauf30 = useMemo(() => tagesverlauf(attempts, 30), [attempts])
  const verlauf84 = useMemo(() => tagesverlauf(attempts, 84), [attempts])
  const werte = useMemo(() => eckdaten(attempts), [attempts])
  const vorschau = useMemo(() => faelligkeitsVorschau(reviews, 14), [reviews])

  if (versucheLaden || plaeneLaden) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-accent" role="status">Statistik wird gerechnet...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-raised px-6 py-4">
        <button onClick={() => navigate('/')} className="text-sm text-muted hover:text-ink">← Übersicht</button>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Statistik</span>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-light">Was bisher zusammenkam</h1>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kennzahl titel="Antworten" wert={String(werte.antworten)}
            zusatz={`${werte.richtig} davon richtig`} />
          <Kennzahl titel="Trefferquote" wert={`${Math.round(werte.quote * 100)} %`}
            zusatz="über die ganze Historie" />
          <Kennzahl titel="Lernzeit" wert={alsDauer(werte.sekunden)}
            zusatz="gemessen je Frage" />
          <Kennzahl titel="Serie" wert={`${streak.currentStreak} Tage`}
            zusatz={`Rekord: ${streak.longestStreak}`} />
        </div>

        <section className="mb-10">
          <h2 className="mb-1 text-lg font-medium">Trefferquote der letzten 30 Tage</h2>
          <p className="mb-4 text-sm text-subtle">Tage ohne Antwort bleiben leer statt als Null zu erscheinen.</p>
          <div className="rounded-2xl border border-line bg-raised p-5">
            <Verlaufsdiagramm verlauf={verlauf30} />
          </div>
          <Tabellenansicht
            kopf={['Tag', 'Antworten', 'Richtig', 'Quote']}
            zeilen={verlauf30.filter(t => t.gesamt > 0).map(t => [
              t.datum, String(t.gesamt), String(t.richtig),
              t.quote === null ? '—' : `${Math.round(t.quote * 100)} %`,
            ])}
          />
        </section>

        <section className="mb-10">
          <h2 className="mb-1 text-lg font-medium">Lerntage</h2>
          <p className="mb-4 text-sm text-subtle">
            {werte.lerntage} Tage mit mindestens einer Antwort.
          </p>
          <div className="rounded-2xl border border-line bg-raised p-5">
            <Lernkalender verlauf={verlauf84} />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-1 text-lg font-medium">Was in den nächsten 14 Tagen ansteht</h2>
          <p className="mb-4 text-sm text-subtle">
            Aus den geplanten Terminen — noch ohne das, was du bis dahin neu lernst.
          </p>
          <div className="rounded-2xl border border-line bg-raised p-5">
            <Faelligkeitsbalken vorschau={vorschau} />
          </div>
          <Tabellenansicht
            kopf={['Tag', 'Fällig']}
            zeilen={vorschau.map(t => [t.datum, String(t.anzahl)])}
          />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium">Prüfungsreife</h2>
          {courseIdsWithExams().map(kursId => (
            <Reifekarte key={kursId} kursId={kursId} verlauf={verlauf30}
              termin={einstellungen.pruefungstermine?.[kursId]} />
          ))}
          <button onClick={() => navigate('/einstellungen')}
            className="mt-4 text-sm text-accent underline underline-offset-2">
            Prüfungstermine eintragen
          </button>
        </section>
      </main>
    </div>
  )
}

/** Zahlen zum Nachlesen — Diagramme allein sind nicht für jeden zugänglich. */
function Tabellenansicht({ kopf, zeilen }: { kopf: string[]; zeilen: string[][] }) {
  if (zeilen.length === 0) return null
  return (
    <details className="mt-3">
      <summary className="cursor-pointer text-sm text-subtle hover:text-ink">Als Tabelle</summary>
      <div className="mt-2 overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-sunken">
            <tr>{kopf.map(t => <th key={t} className="border-b border-line px-3 py-2 text-left font-medium text-ink">{t}</th>)}</tr>
          </thead>
          <tbody>
            {zeilen.map(zeile => (
              <tr key={zeile[0]}>
                {zeile.map((wert, i) => (
                  <td key={i} className="border-b border-line px-3 py-1.5 text-muted tabular-nums">{wert}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

function Reifekarte({ kursId, verlauf, termin }: {
  kursId: string
  verlauf: ReturnType<typeof tagesverlauf>
  termin?: string
}) {
  const { readiness } = useMastery(kursId)
  const kurs = allCourses.find(k => k.id === kursId)
  if (!kurs || readiness.length === 0) return null

  const mittel = readiness.reduce((s, r) => s + r.score, 0) / readiness.length
  const prognose = reifePrognose(verlauf, mittel)
  const restTage = termin ? tageBis(termin) : null

  return (
    <div className="mb-3 rounded-2xl border border-line bg-raised p-5">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-medium">{kurs.title}</h3>
        <span className="font-mono text-sm text-accent tabular-nums">{Math.round(mittel * 100)} % reif</span>
      </div>

      <p className="text-sm text-muted">
        {prognose === null
          ? 'Noch zu wenig Verlauf für eine Prognose — dafür braucht es ein paar Lerntage.'
          : prognose.tage === 0 && prognose.erreichbar
            ? 'Die Zielmarke von 80 % ist erreicht.'
            : !prognose.erreichbar
              ? 'Beim derzeitigen Tempo bewegt sich die Reife nicht — mehr Wiederholung als neuer Stoff.'
              : `Bei diesem Tempo etwa ${prognose.tage} Lerntage bis 80 %.`}
      </p>

      {restTage !== null && (
        <p className={`mt-2 text-sm ${restTage < 0 ? 'text-subtle' : restTage < 14 ? 'text-warning' : 'text-muted'}`}>
          {restTage < 0
            ? 'Der eingetragene Termin liegt zurück.'
            : restTage === 0
              ? 'Die Prüfung ist heute.'
              : `Noch ${restTage} Tage bis zur Prüfung${
                prognose?.erreichbar && prognose.tage > restTage ? ' — das wird knapp.' : '.'}`}
        </p>
      )}
    </div>
  )
}
