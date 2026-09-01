import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useEinstellungen } from '../hooks/useEinstellungen'
import { useAttempts } from '../hooks/useAttempts'
import { useReviews } from '../hooks/useReviews'
import { allCourses } from '../lib/courseRegistry'
import { courseIdsWithExams } from '../data/exams'
import { geraeteZeitzone } from '../lib/zeit/datum'
import ThemeToggle from '../components/Shell/ThemeToggle'

export default function Einstellungen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { einstellungen, setzen } = useEinstellungen()
  const { attempts } = useAttempts()
  const { reviews } = useReviews()

  const [passwort, setPasswort] = useState('')
  const [meldung, setMeldung] = useState<string | null>(null)

  async function passwortAendern() {
    if (passwort.length < 8) { setMeldung('Mindestens acht Zeichen.'); return }
    const { error } = await supabase.auth.updateUser({ password: passwort })
    setMeldung(error ? `Fehlgeschlagen: ${error.message}` : 'Passwort geändert.')
    if (!error) setPasswort('')
  }

  /** Alles, was über einen gespeichert ist, als eine Datei. */
  function datenExportieren() {
    const inhalt = JSON.stringify({
      exportiertAm: new Date().toISOString(),
      konto: user?.email,
      einstellungen,
      versuche: attempts,
      wiederholungen: reviews,
    }, null, 2)
    const url = URL.createObjectURL(new Blob([inhalt], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `chemlearn-daten-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-raised px-6 py-4">
        <button onClick={() => navigate('/')} className="text-sm text-muted hover:text-ink">← Übersicht</button>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Einstellungen</span>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-2xl space-y-8 px-4 py-8">
        <Abschnitt titel="Darstellung"
          hinweis="Ohne eigene Wahl folgt die App der Einstellung des Geräts.">
          <ThemeToggle />
        </Abschnitt>

        <Abschnitt titel="Tagesziel"
          hinweis="Wie viele Karten und Fragen du dir am Tag vornimmst.">
          <label className="flex items-center gap-3 text-sm">
            <input type="number" min={5} max={200} step={5}
              value={einstellungen.tagesziel ?? 40}
              onChange={e => setzen({ tagesziel: Number(e.target.value) })}
              className="w-24 rounded-lg border border-line bg-surface px-3 py-2 text-ink tabular-nums" />
            <span className="text-muted">Elemente pro Tag</span>
          </label>
        </Abschnitt>

        <Abschnitt titel="Prüfungstermine"
          hinweis="Aus dem Termin und deinem Tempo rechnet die Statistik, ob es reicht.">
          <div className="space-y-3">
            {courseIdsWithExams().map(kursId => {
              const kurs = allCourses.find(k => k.id === kursId)
              if (!kurs) return null
              return (
                <label key={kursId} className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-muted">{kurs.title}</span>
                  <input type="date"
                    value={einstellungen.pruefungstermine?.[kursId] ?? ''}
                    onChange={e => setzen({
                      pruefungstermine: { ...einstellungen.pruefungstermine, [kursId]: e.target.value },
                    })}
                    className="rounded-lg border border-line bg-surface px-3 py-2 text-ink" />
                </label>
              )
            })}
          </div>
        </Abschnitt>

        <Abschnitt titel="Zeitzone"
          hinweis="Bestimmt, wann ein Lerntag endet — wichtig für die Serie.">
          <label className="flex items-center gap-3 text-sm">
            <input type="text" placeholder={geraeteZeitzone()}
              value={einstellungen.zeitzone ?? ''}
              onChange={e => setzen({ zeitzone: e.target.value })}
              className="flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-ink" />
          </label>
          <p className="mt-2 text-xs text-subtle">Leer lassen heißt: die des Geräts ({geraeteZeitzone()}).</p>
        </Abschnitt>

        <Abschnitt titel="Passwort ändern">
          <div className="flex flex-wrap gap-3">
            <input type="password" value={passwort} onChange={e => setPasswort(e.target.value)}
              placeholder="Neues Passwort" autoComplete="new-password"
              className="flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-ink" />
            <button onClick={passwortAendern}
              className="min-h-11 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong">
              Ändern
            </button>
          </div>
          {meldung && <p className="mt-2 text-sm text-muted" role="status">{meldung}</p>}
        </Abschnitt>

        <Abschnitt titel="Deine Daten"
          hinweis="Antworten, Wiederholungspläne und Einstellungen als JSON-Datei.">
          <button onClick={datenExportieren}
            className="min-h-11 rounded-lg border border-line px-4 py-2 text-sm hover:bg-sunken">
            Daten herunterladen
          </button>
          <p className="mt-3 text-xs text-subtle">
            Das Konto vollständig zu löschen geht von hier aus noch nicht — dafür fehlen die
            Rechte im Browser. Sag Bescheid, dann wird es serverseitig eingerichtet.
          </p>
        </Abschnitt>
      </main>
    </div>
  )
}

function Abschnitt({ titel, hinweis, children }: {
  titel: string
  hinweis?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-line bg-raised p-5">
      <h2 className="mb-1 font-medium">{titel}</h2>
      {hinweis && <p className="mb-4 text-sm text-subtle">{hinweis}</p>}
      {children}
    </section>
  )
}
