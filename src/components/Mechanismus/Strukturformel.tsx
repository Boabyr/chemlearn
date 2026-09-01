import { Fragment, useMemo } from 'react'
import {
  atomText, beschriftet, BUEHNE,
  type Atom, type Pfeil, type Stufe, type Ziel,
} from './strukturTypen'
import { bindungsLinien, freiePaarPunkte, ladungsPunkt, pfeilBahn, zielPunkt } from './geometrie'

export type PfeilUrteil = 'offen' | 'richtig' | 'falsch'

interface Props {
  stufe: Stufe
  /** Bereits gesetzte Pfeile. */
  pfeile?: Pfeil[]
  urteile?: PfeilUrteil[]
  /** Erster Anfasser eines noch unfertigen Pfeils. */
  auswahl?: Ziel | null
  /** Gesetzt heißt: die Formel ist bedienbar. */
  onZiel?: (ziel: Ziel) => void
  beschreibung?: string
}

function ladungsZeichen(ladung: number): string {
  const betrag = Math.abs(ladung)
  const zeichen = ladung > 0 ? '+' : '−'
  return betrag === 1 ? zeichen : `${betrag}${zeichen}`
}

const FARBE: Record<PfeilUrteil, string> = {
  offen: 'var(--c-accent)',
  richtig: 'var(--c-success)',
  falsch: 'var(--c-danger)',
}

/**
 * Strukturformel als Skelettformel.
 *
 * Kohlenstoff ist eine Ecke ohne Buchstabe, Heteroatome tragen ihr Symbol,
 * Bindungsordnung sind parallele Striche und freie Elektronenpaare Punktpaare.
 * Der Vorgänger zeichnete beschriftete Kreise — ein Chemiker erkannte das
 * Molekül nicht wieder.
 */
export default function Strukturformel({
  stufe, pfeile = [], urteile = [], auswahl = null, onZiel, beschreibung,
}: Props) {
  const nachAtom = useMemo(
    () => new Map(stufe.atome.map(a => [a.id, a])),
    [stufe],
  )

  const nachbarn = useMemo(() => {
    const karte = new Map<string, Atom[]>()
    for (const atom of stufe.atome) {
      const ids = stufe.bindungen
        .filter(b => b.von === atom.id || b.nach === atom.id)
        .map(b => (b.von === atom.id ? b.nach : b.von))
      karte.set(atom.id, ids.map(id => nachAtom.get(id)).filter((a): a is Atom => !!a))
    }
    return karte
  }, [stufe, nachAtom])

  const bedienbar = !!onZiel
  const istGewaehlt = (art: Ziel['art'], id: string) => auswahl?.art === art && auswahl.id === id

  return (
    <svg viewBox={`0 0 ${BUEHNE.breite} ${BUEHNE.hoehe}`} className="w-full select-none"
      role="img" aria-label={beschreibung ?? stufe.titel}>
      <defs>
        {(['offen', 'richtig', 'falsch'] as PfeilUrteil[]).map(urteil => (
          <marker key={urteil} id={`spitze-${urteil}`} markerWidth="7" markerHeight="7"
            refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill={FARBE[urteil]} />
          </marker>
        ))}
      </defs>

      {/* Bindungen */}
      {stufe.bindungen.map(bindung => {
        const von = nachAtom.get(bindung.von)
        const nach = nachAtom.get(bindung.nach)
        if (!von || !nach) return null
        const art = bindung.art ?? 'normal'
        const farbe = art === 'bricht' ? 'var(--c-danger)' : art === 'entsteht' ? 'var(--c-success)' : 'var(--c-ink)'
        return (
          <g key={bindung.id}>
            {bindungsLinien(bindung, von, nach).map((linie, i) => (
              <line key={i} {...linie} stroke={farbe} strokeWidth={2} strokeLinecap="round"
                strokeDasharray={art === 'normal' ? undefined : '6 4'} />
            ))}
          </g>
        )
      })}

      {/* Freie Elektronenpaare */}
      {stufe.atome.map(atom =>
        freiePaarPunkte(atom, nachbarn.get(atom.id) ?? []).map((paar, i) => (
          <Fragment key={`${atom.id}-paar-${i}`}>
            {paar.punkte.map((punkt, j) => (
              <circle key={j} cx={punkt.x} cy={punkt.y} r={1.9} fill="var(--c-ink)" />
            ))}
          </Fragment>
        )),
      )}

      {/* Atomsymbole und Ladungen */}
      {stufe.atome.map(atom => (
        <Fragment key={atom.id}>
          {beschriftet(atom) && (
            <>
              <circle cx={atom.x} cy={atom.y} r={10} fill="var(--c-raised)" />
              <text x={atom.x} y={atom.y} textAnchor="middle" dominantBaseline="central"
                fontSize={14} fontFamily="ui-sans-serif, system-ui" fill="var(--c-ink)">
                {atomText(atom)}
              </text>
            </>
          )}
          {atom.ladung !== undefined && atom.ladung !== 0 && (
            <text {...ladungsPunkt(atom)} textAnchor="middle" dominantBaseline="central"
              fontSize={11} fill="var(--c-accent)">
              {ladungsZeichen(atom.ladung)}
            </text>
          )}
        </Fragment>
      ))}

      {/* Gesetzte Pfeile */}
      {pfeile.map((pfeil, i) => {
        const start = zielPunkt(pfeil.von, stufe)
        const ende = zielPunkt(pfeil.nach, stufe)
        if (!start || !ende) return null
        const urteil = urteile[i] ?? 'offen'
        const bahn = pfeilBahn(start, ende, i % 2 === 0 ? 1 : -1)
        return (
          <path key={i} d={bahn.d} fill="none" stroke={FARBE[urteil]} strokeWidth={2.2}
            markerEnd={`url(#spitze-${urteil})`} />
        )
      })}

      {/* Anfasser — nur wenn die Formel bedient werden soll */}
      {bedienbar && (
        <g>
          {stufe.bindungen.map(bindung => {
            const punkt = zielPunkt({ art: 'bindung', id: bindung.id }, stufe)
            if (!punkt) return null
            return (
              <circle key={`ziel-b-${bindung.id}`} cx={punkt.x} cy={punkt.y} r={11}
                role="button" tabIndex={0}
                aria-label={`Bindung ${bindung.von}–${bindung.nach}`}
                aria-pressed={istGewaehlt('bindung', bindung.id)}
                fill={istGewaehlt('bindung', bindung.id) ? 'var(--c-accent)' : 'transparent'}
                fillOpacity={istGewaehlt('bindung', bindung.id) ? 0.25 : 1}
                className="cursor-pointer"
                onClick={() => onZiel({ art: 'bindung', id: bindung.id })}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onZiel({ art: 'bindung', id: bindung.id }) }
                }} />
            )
          })}

          {stufe.atome.map(atom => {
            const paar = freiePaarPunkte(atom, nachbarn.get(atom.id) ?? [])[0]
            return (
              <Fragment key={`ziel-a-${atom.id}`}>
                <circle cx={atom.x} cy={atom.y} r={11}
                  role="button" tabIndex={0}
                  aria-label={`Atom ${atomText(atom) || 'C'}`}
                  aria-pressed={istGewaehlt('atom', atom.id)}
                  fill={istGewaehlt('atom', atom.id) ? 'var(--c-accent)' : 'transparent'}
                  fillOpacity={istGewaehlt('atom', atom.id) ? 0.25 : 1}
                  className="cursor-pointer"
                  onClick={() => onZiel({ art: 'atom', id: atom.id })}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onZiel({ art: 'atom', id: atom.id }) }
                  }} />
                {paar && (
                  <circle cx={paar.mitte.x} cy={paar.mitte.y} r={9}
                    role="button" tabIndex={0}
                    aria-label={`Freies Elektronenpaar an ${atomText(atom) || 'C'}`}
                    aria-pressed={istGewaehlt('freiesPaar', atom.id)}
                    fill={istGewaehlt('freiesPaar', atom.id) ? 'var(--c-accent)' : 'transparent'}
                    fillOpacity={istGewaehlt('freiesPaar', atom.id) ? 0.25 : 1}
                    className="cursor-pointer"
                    onClick={() => onZiel({ art: 'freiesPaar', id: atom.id })}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onZiel({ art: 'freiesPaar', id: atom.id }) }
                    }} />
                )}
              </Fragment>
            )
          })}
        </g>
      )}
    </svg>
  )
}
