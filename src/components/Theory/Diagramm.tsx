import type { Diagramm as DiagrammDaten } from '../../content/schema'
import { FARBE, kurvenFarbe } from './diagrammFarben'

/** Zeichenfläche inklusive Rand für die Achsenbeschriftung. */
const FLAECHE = { breite: 480, hoehe: 300 } as const
const RAND = { links: 56, rechts: 16, oben: 16, unten: 46 } as const

/**
 * Kurvendiagramm für den Theorietext.
 *
 * AC1 erklärt an mehreren Stellen eine Form, die man nicht sieht: die Gerade
 * der Kalibrierung, das Minimum der Van-Deemter-Kurve, den Sprung der
 * Titration. Die Strukturformel-Abbildungen aus der organischen Chemie taugen
 * dafür nicht — dort geht es um Atome, hier um Achsen.
 */
export default function Diagramm({ diagramm }: { diagramm: DiagrammDaten }) {
  const { xAchse, yAchse } = diagramm
  const innen = {
    breite: FLAECHE.breite - RAND.links - RAND.rechts,
    hoehe: FLAECHE.hoehe - RAND.oben - RAND.unten,
  }

  const px = (x: number) => RAND.links + ((x - xAchse.min) / (xAchse.max - xAchse.min)) * innen.breite
  const py = (y: number) => RAND.oben + innen.hoehe - ((y - yAchse.min) / (yAchse.max - yAchse.min)) * innen.hoehe

  // Null-Linien nur zeichnen, wenn sie im Bild liegen — bei der
  // Standardaddition ist die y-Achse bei x = 0 der eigentliche Punkt.
  const nullX = xAchse.min < 0 && xAchse.max > 0 ? px(0) : null
  const nullY = yAchse.min < 0 && yAchse.max > 0 ? py(0) : null

  const farbeVon = (kurve: DiagrammDaten['kurven'][number], i: number) =>
    FARBE[kurve.farbe ?? ''] ?? kurvenFarbe(i)

  return (
    <svg viewBox={`0 0 ${FLAECHE.breite} ${FLAECHE.hoehe}`} className="w-full select-none"
      role="img" aria-label={`${diagramm.titel}. ${xAchse.titel} gegen ${yAchse.titel}.`}>

      {/* Achsen */}
      <line x1={RAND.links} y1={RAND.oben} x2={RAND.links} y2={RAND.oben + innen.hoehe}
        stroke="var(--c-line)" strokeWidth="1.5" />
      <line x1={RAND.links} y1={RAND.oben + innen.hoehe} x2={RAND.links + innen.breite} y2={RAND.oben + innen.hoehe}
        stroke="var(--c-line)" strokeWidth="1.5" />

      {nullX !== null && (
        <line x1={nullX} y1={RAND.oben} x2={nullX} y2={RAND.oben + innen.hoehe}
          stroke="var(--c-line)" strokeWidth="1" strokeDasharray="2 3" />
      )}
      {nullY !== null && (
        <line x1={RAND.links} y1={nullY} x2={RAND.links + innen.breite} y2={nullY}
          stroke="var(--c-line)" strokeWidth="1" strokeDasharray="2 3" />
      )}

      <text x={RAND.links + innen.breite / 2} y={FLAECHE.hoehe - 8}
        textAnchor="middle" fontSize="13" fill="var(--c-muted)">{xAchse.titel}</text>
      <text x={14} y={RAND.oben + innen.hoehe / 2} textAnchor="middle" fontSize="13" fill="var(--c-muted)"
        transform={`rotate(-90 14 ${RAND.oben + innen.hoehe / 2})`}>{yAchse.titel}</text>

      {/* Kurven */}
      {diagramm.kurven.map((kurve, i) => (
        <polyline key={kurve.beschriftung}
          points={kurve.punkte.map(p => `${px(p.x)},${py(p.y)}`).join(' ')}
          fill="none" stroke={farbeVon(kurve, i)} strokeWidth="2.2"
          strokeDasharray={kurve.stil === 'gestrichelt' ? '6 4' : undefined}
          strokeLinecap="round" strokeLinejoin="round" />
      ))}

      {/* Marker mit Hilfslinien auf die Achsen */}
      {diagramm.marker.map(m => (
        <g key={m.beschriftung}>
          {m.hilfslinien && (
            <>
              <line x1={RAND.links} y1={py(m.y)} x2={px(m.x)} y2={py(m.y)}
                stroke="var(--c-subtle)" strokeWidth="1" strokeDasharray="4 3" />
              <line x1={px(m.x)} y1={py(m.y)} x2={px(m.x)} y2={RAND.oben + innen.hoehe}
                stroke="var(--c-subtle)" strokeWidth="1" strokeDasharray="4 3" />
            </>
          )}
          <circle cx={px(m.x)} cy={py(m.y)} r="4" fill="var(--c-ink)" />
          <text x={px(m.x) + 7} y={py(m.y) - 7} fontSize="12" fill="var(--c-ink)">{m.beschriftung}</text>
        </g>
      ))}
    </svg>
  )
}
