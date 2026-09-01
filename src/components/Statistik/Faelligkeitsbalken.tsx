import { useId, useState } from 'react'
import type { FaelligTag } from '../../lib/learning/statistik'

const B = 720
const H = 180
const RAND = { oben: 12, unten: 30, links: 34, rechts: 8 }

export default function Faelligkeitsbalken({ vorschau }: { vorschau: FaelligTag[] }) {
  const [aktiv, setAktiv] = useState<number | null>(null)
  const beschriftung = useId()

  const hoechstwert = Math.max(1, ...vorschau.map(t => t.anzahl))
  const breite = B - RAND.links - RAND.rechts
  const hoehe = H - RAND.oben - RAND.unten
  const spalte = breite / vorschau.length
  const balken = Math.max(6, spalte - 6)   // 2px Abstand bleibt sichtbar

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${B} ${H}`} className="w-full" role="img" aria-labelledby={beschriftung}
        onMouseLeave={() => setAktiv(null)}>
        <title id={beschriftung}>Fällige Wiederholungen der nächsten {vorschau.length} Tage</title>

        <line x1={RAND.links} x2={B - RAND.rechts} y1={H - RAND.unten} y2={H - RAND.unten}
          stroke="var(--c-line)" strokeWidth={1} />
        <text x={RAND.links - 8} y={RAND.oben + 10} textAnchor="end"
          fontSize={11} fill="var(--c-subtle)">{hoechstwert}</text>

        {vorschau.map((tag, i) => {
          const h = (tag.anzahl / hoechstwert) * hoehe
          const x = RAND.links + i * spalte + (spalte - balken) / 2
          return (
            <g key={tag.datum} onMouseEnter={() => setAktiv(i)}>
              <rect x={x} y={RAND.oben} width={balken} height={hoehe} fill="transparent" />
              {tag.anzahl > 0 && (
                <rect x={x} y={H - RAND.unten - h} width={balken} height={h} rx={4}
                  fill={tag.ueberfaellig ? 'var(--c-warning)' : 'var(--c-accent)'}
                  opacity={aktiv === null || aktiv === i ? 1 : 0.55} />
              )}
              <text x={x + balken / 2} y={H - RAND.unten + 14} textAnchor="middle"
                fontSize={10} fill="var(--c-subtle)">{tag.datum.slice(8, 10)}</text>
            </g>
          )
        })}
      </svg>

      <figcaption aria-live="polite" className="mt-1 min-h-5 text-center text-sm text-muted">
        {aktiv !== null
          ? `${vorschau[aktiv].datum} — ${vorschau[aktiv].anzahl} fällig${vorschau[aktiv].ueberfaellig ? ' (inklusive Überfälligem)' : ''}`
          : 'Der erste Balken enthält alles, was schon überfällig ist'}
      </figcaption>
    </figure>
  )
}
