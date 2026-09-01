import Strukturformel from '../Mechanismus/Strukturformel'
import Diagramm from './Diagramm'
import { kurvenFarbe } from './diagrammFarben'
import type { Abbildung as AbbildungDaten, Stufe } from '../Mechanismus/strukturTypen'

/**
 * Gezeichnete Strukturen im Theorietext.
 *
 * Der Kurs hatte kein einziges Bild — Grenzstrukturen standen als Aufzählung
 * da ("Struktur 1: Ladung an C-3, Struktur 2: Ladung an C-5"). Das ist eine
 * Bildunterschrift ohne Bild, ausgerechnet bei dem, was in der Prüfung
 * gezeichnet werden muss.
 *
 * Gerendert wird mit demselben Bauteil wie die Mechanismen; ohne `onZiel`
 * ist es ein reiner Renderer.
 */
export default function Abbildung({ abbildung }: { abbildung: AbbildungDaten }) {
  if (abbildung.art === 'diagramm') {
    return (
      <figure className="my-6 rounded-2xl border border-line bg-raised p-4">
        <figcaption className="mb-3">
          <p className="text-sm font-medium text-ink">{abbildung.titel}</p>
          {abbildung.beschreibung && (
            <p className="mt-1 text-sm text-muted">{abbildung.beschreibung}</p>
          )}
        </figcaption>
        <div className="rounded-xl border border-line bg-surface p-2">
          <Diagramm diagramm={abbildung} />
        </div>
        {abbildung.kurven.length > 1 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {abbildung.kurven.map((kurve, i) => (
              <li key={kurve.beschriftung} className="flex items-center gap-1.5 text-xs text-muted">
                <span aria-hidden="true" className="inline-block h-0.5 w-4 rounded"
                  style={{ background: kurvenFarbe(i) }} />
                {kurve.beschriftung}
              </li>
            ))}
          </ul>
        )}
      </figure>
    )
  }

  const resonanz = abbildung.verknuepfung === 'resonanz'

  return (
    <figure className="my-6 rounded-2xl border border-line bg-raised p-4">
      <figcaption className="mb-3">
        <p className="text-sm font-medium text-ink">{abbildung.titel}</p>
        {abbildung.beschreibung && (
          <p className="mt-1 text-sm text-muted">{abbildung.beschreibung}</p>
        )}
      </figcaption>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {abbildung.strukturen.map((struktur, i) => (
          <div key={struktur.beschriftung} className="flex items-center gap-2">
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`select-none px-1 text-2xl ${resonanz ? 'text-accent' : 'text-subtle'}`}
              >
                {resonanz ? '↔' : '·'}
              </span>
            )}
            <div className="w-56 max-w-full">
              <div className="rounded-xl border border-line bg-surface p-1">
                <Strukturformel
                  stufe={{
                    id: i,
                    titel: struktur.beschriftung,
                    aufgabe: '', erklaerung: '', hinweise: [],
                    atome: struktur.atome,
                    bindungen: struktur.bindungen,
                    pfeile: [],
                  } as Stufe}
                  beschreibung={`${abbildung.titel} — ${struktur.beschriftung}`}
                />
              </div>
              <p className="mt-1 text-center text-xs text-subtle">{struktur.beschriftung}</p>
            </div>
          </div>
        ))}
      </div>

      {resonanz && (
        <p className="mt-3 text-center text-xs text-subtle">
          Ein Molekül, mehrere Grenzstrukturen — der Doppelpfeil ist kein Gleichgewicht.
        </p>
      )}
    </figure>
  )
}
