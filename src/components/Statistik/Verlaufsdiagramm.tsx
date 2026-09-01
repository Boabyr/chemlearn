import { useId, useState } from 'react'
import type { TagesWert } from '../../lib/learning/statistik'

const B = 720
const H = 220
const RAND = { oben: 16, unten: 28, links: 38, rechts: 12 }

function kurzesDatum(datum: string): string {
  return `${datum.slice(8, 10)}.${datum.slice(5, 7)}.`
}

/**
 * Trefferquote über die Zeit — eine Reihe, eine Farbe, kein Legendenkasten.
 *
 * Tage ohne Antwort haben keine Quote und werden übersprungen statt als Null
 * gezeichnet; eine Lernpause ist kein Einbruch der Trefferquote.
 */
export default function Verlaufsdiagramm({ verlauf }: { verlauf: TagesWert[] }) {
  const [aktiv, setAktiv] = useState<number | null>(null)
  const beschriftung = useId()

  const punkte = verlauf
    .map((tag, i) => ({ tag, i }))
    .filter(({ tag }) => tag.quote !== null)

  const breite = B - RAND.links - RAND.rechts
  const hoehe = H - RAND.oben - RAND.unten
  const x = (i: number) => RAND.links + (verlauf.length <= 1 ? 0 : (i / (verlauf.length - 1)) * breite)
  const y = (quote: number) => RAND.oben + (1 - quote) * hoehe

  if (punkte.length === 0) {
    return <p className="py-10 text-center text-sm text-subtle">Noch keine Antworten aufgezeichnet.</p>
  }

  const pfad = punkte.map(({ tag, i }, n) => `${n === 0 ? 'M' : 'L'} ${x(i)} ${y(tag.quote!)}`).join(' ')
  const gezeigt = aktiv !== null ? verlauf[aktiv] : null

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${B} ${H}`} className="w-full" role="img" aria-labelledby={beschriftung}
        onMouseLeave={() => setAktiv(null)}>
        <title id={beschriftung}>Trefferquote der letzten {verlauf.length} Tage</title>

        {/* Gitter bleibt zurückhaltend */}
        {[0, 0.5, 1].map(wert => (
          <g key={wert}>
            <line x1={RAND.links} x2={B - RAND.rechts} y1={y(wert)} y2={y(wert)}
              stroke="var(--c-line)" strokeWidth={1} />
            <text x={RAND.links - 8} y={y(wert) + 4} textAnchor="end"
              fontSize={11} fill="var(--c-subtle)">{Math.round(wert * 100)}%</text>
          </g>
        ))}

        <path d={pfad} fill="none" stroke="var(--c-accent)" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round" />

        {punkte.map(({ tag, i }) => (
          <circle key={tag.datum} cx={x(i)} cy={y(tag.quote!)} r={aktiv === i ? 6 : 4}
            fill="var(--c-accent)" stroke="var(--c-raised)" strokeWidth={2} />
        ))}

        {/* Trefferflächen sind größer als die Punkte */}
        {verlauf.map((tag, i) => (
          <rect key={tag.datum} x={x(i) - breite / verlauf.length / 2} y={0}
            width={breite / verlauf.length} height={H} fill="transparent"
            onMouseEnter={() => setAktiv(i)} />
        ))}

        {aktiv !== null && (
          <line x1={x(aktiv)} x2={x(aktiv)} y1={RAND.oben} y2={H - RAND.unten}
            stroke="var(--c-subtle)" strokeWidth={1} strokeDasharray="3 3" />
        )}

        <text x={RAND.links} y={H - 8} fontSize={11} fill="var(--c-subtle)">
          {kurzesDatum(verlauf[0].datum)}
        </text>
        <text x={B - RAND.rechts} y={H - 8} textAnchor="end" fontSize={11} fill="var(--c-subtle)">
          {kurzesDatum(verlauf[verlauf.length - 1].datum)}
        </text>
      </svg>

      <figcaption aria-live="polite" className="mt-2 min-h-5 text-center text-sm text-muted">
        {gezeigt
          ? gezeigt.quote === null
            ? `${kurzesDatum(gezeigt.datum)} — nicht gelernt`
            : `${kurzesDatum(gezeigt.datum)} — ${Math.round(gezeigt.quote * 100)} % aus ${gezeigt.gesamt} Antworten`
          : 'Mit dem Zeiger über den Verlauf fahren'}
      </figcaption>
    </figure>
  )
}
