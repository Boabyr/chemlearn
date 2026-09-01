import { useId, useState } from 'react'
import type { TagesWert } from '../../lib/learning/statistik'

const ZELLE = 13
const LUECKE = 3

/**
 * Lerntage als Kalender.
 *
 * Eine Farbe, fünf Stufen — sequenziell heißt heller bis dunkler, nie
 * verschiedene Farbtöne. Die Stufen entstehen aus dem Akzentton der App,
 * damit sie in beiden Themen sitzen.
 */
function stufe(anzahl: number, hoechstwert: number): string {
  if (anzahl === 0) return 'var(--c-sunken)'
  const anteil = Math.min(1, anzahl / Math.max(1, hoechstwert))
  const prozent = 25 + Math.round(anteil * 75)
  return `color-mix(in oklab, var(--c-accent) ${prozent}%, var(--c-sunken))`
}

const WOCHENTAGE = ['Mo', '', 'Mi', '', 'Fr', '', 'So']

export default function Lernkalender({ verlauf }: { verlauf: TagesWert[] }) {
  const [aktiv, setAktiv] = useState<TagesWert | null>(null)
  const beschriftung = useId()

  const hoechstwert = Math.max(1, ...verlauf.map(t => t.gesamt))

  // Montag als Wochenanfang, damit die Spalten Wochen sind.
  const ersterTag = new Date(`${verlauf[0]?.datum ?? '2026-01-01'}T00:00:00Z`)
  const versatz = (ersterTag.getUTCDay() + 6) % 7
  const spalten = Math.ceil((verlauf.length + versatz) / 7)
  const breite = spalten * (ZELLE + LUECKE) + 30
  const hoehe = 7 * (ZELLE + LUECKE)

  return (
    <figure className="m-0">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${breite} ${hoehe}`} width={breite} height={hoehe}
          role="img" aria-labelledby={beschriftung} onMouseLeave={() => setAktiv(null)}>
          <title id={beschriftung}>Lerntage der letzten {verlauf.length} Tage</title>

          {WOCHENTAGE.map((tag, i) => tag && (
            <text key={tag} x={0} y={i * (ZELLE + LUECKE) + ZELLE - 2}
              fontSize={9} fill="var(--c-subtle)">{tag}</text>
          ))}

          {verlauf.map((tag, i) => {
            const pos = i + versatz
            return (
              <rect key={tag.datum}
                x={30 + Math.floor(pos / 7) * (ZELLE + LUECKE)}
                y={(pos % 7) * (ZELLE + LUECKE)}
                width={ZELLE} height={ZELLE} rx={3}
                fill={stufe(tag.gesamt, hoechstwert)}
                stroke={aktiv?.datum === tag.datum ? 'var(--c-ink)' : 'var(--c-raised)'}
                strokeWidth={2}
                onMouseEnter={() => setAktiv(tag)}>
                <title>{tag.datum}: {tag.gesamt} Antworten</title>
              </rect>
            )
          })}
        </svg>
      </div>

      <figcaption aria-live="polite" className="mt-2 min-h-5 text-sm text-muted">
        {aktiv
          ? `${aktiv.datum} — ${aktiv.gesamt} ${aktiv.gesamt === 1 ? 'Antwort' : 'Antworten'}`
          : `${verlauf.filter(t => t.gesamt > 0).length} von ${verlauf.length} Tagen gelernt`}
      </figcaption>
    </figure>
  )
}
