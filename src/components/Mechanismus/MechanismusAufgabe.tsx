import { useState } from 'react'
import Strukturformel, { type PfeilUrteil as AnzeigeUrteil } from './Strukturformel'
import { befundText, pruefePfeile, type Befund } from './pruefung'
import type { Mechanismus, Pfeil, Stufe, Ziel } from './strukturTypen'

interface Props {
  title: string
  description: string
  stages: Stufe[]
  ergebnis: Mechanismus['ergebnis']
  onComplete?: (korrekt: boolean) => void
}

const gleich = (a: Ziel, b: Ziel) => a.art === b.art && a.id === b.id

/** Ein Pfeil darf nicht dort enden, wo er beginnt. */
const sinnvoll = (von: Ziel, nach: Ziel) => !gleich(von, nach)

function anzeigeUrteil(befund: Befund | null, i: number): AnzeigeUrteil {
  if (!befund) return 'offen'
  return befund.urteile[i] === 'richtig' ? 'richtig' : 'falsch'
}

/**
 * Mechanismus zeichnen statt anklicken.
 *
 * Der Vorgänger nahm genau einen Pfeil je Stufe, nur von Atom zu Atom, und
 * hatte zwei Eingabewege, die sich gegenseitig zurücksetzten — mit der Maus
 * kam nie ein Pfeil zustande. Hier läuft alles über eine Auswahl: Ziel wählen,
 * zweites Ziel wählen, Pfeil steht. Tastatur gleichwertig.
 */
export default function MechanismusAufgabe({ title, description, stages, ergebnis, onComplete }: Props) {
  const [stufenIdx, setStufenIdx] = useState(0)
  const [pfeile, setPfeile] = useState<Pfeil[]>([])
  const [auswahl, setAuswahl] = useState<Ziel | null>(null)
  const [befund, setBefund] = useState<Befund | null>(null)
  const [hinweise, setHinweise] = useState(0)
  const [hinweiseGenutzt, setHinweiseGenutzt] = useState(false)
  const [alsErgebnis, setAlsErgebnis] = useState(false)
  const [fertig, setFertig] = useState(false)

  const stufe = stages[stufenIdx]
  const geloest = befund?.vollstaendig ?? false

  function zielGewaehlt(ziel: Ziel) {
    if (geloest) return
    setBefund(null)

    if (!auswahl) { setAuswahl(ziel); return }
    if (gleich(auswahl, ziel)) { setAuswahl(null); return }
    if (!sinnvoll(auswahl, ziel)) { setAuswahl(null); return }

    setPfeile(bisher => [...bisher, { von: auswahl, nach: ziel }])
    setAuswahl(null)
  }

  function pruefen() {
    setBefund(pruefePfeile(pfeile, stufe.pfeile))
  }

  function weiter() {
    if (stufenIdx < stages.length - 1) {
      setStufenIdx(i => i + 1)
      setPfeile([])
      setAuswahl(null)
      setBefund(null)
      setHinweise(0)
      // Die nächste Stufe ist das Ergebnis der eben gezeichneten Pfeile —
      // das wird gesagt, statt wortlos ein anderes Bild zu zeigen.
      setAlsErgebnis(true)
      return
    }
    setFertig(true)
    onComplete?.(!hinweiseGenutzt)
  }

  if (fertig) {
    // Schlussbild: das Produkt, auf das die Pfeile hinausliefen.
    const schluss: Stufe = {
      id: -1, titel: ergebnis.titel, aufgabe: '', erklaerung: '', hinweise: [],
      atome: ergebnis.atome, bindungen: ergebnis.bindungen, pfeile: [],
    }
    return (
      <div className="rounded-2xl border border-success bg-success/10 p-6">
        <p className="mb-1 text-center text-4xl">🧪</p>
        <p className="text-center font-medium text-ink">{ergebnis.titel}</p>
        <p className="mt-1 text-center text-sm text-muted">{ergebnis.beschreibung}</p>
        <div className="mt-4 rounded-2xl border border-line bg-raised p-3">
          <Strukturformel stufe={schluss} beschreibung={`Ergebnis: ${ergebnis.titel}`} />
        </div>
        <p className="mt-3 text-center text-xs text-subtle">
          {stages.length} {stages.length === 1 ? 'Schritt' : 'Schritte'}
          {hinweiseGenutzt ? ' — mit Hinweisen' : ' — ohne Hinweise'}
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-1 text-sm font-medium text-ink">{title}</p>
      <p className="mb-4 text-sm text-muted">{description}</p>

      {/* Schrittanzeige */}
      <ol className="mb-4 flex flex-wrap gap-2" aria-label="Schritte des Mechanismus">
        {stages.map((s, i) => (
          <li key={s.id}>
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
              i === stufenIdx ? 'border-accent text-accent'
                : i < stufenIdx ? 'border-success text-success' : 'border-line text-subtle'
            }`}>
              <span className="font-mono">{i + 1}</span>{s.titel}
            </span>
          </li>
        ))}
      </ol>

      {alsErgebnis && (
        <p className="mb-3 rounded-xl border border-success bg-success/10 px-4 py-2 text-sm text-success"
          role="status">
          Das ist dabei herausgekommen — die Struktur hat sich verändert.
        </p>
      )}

      <p className="mb-3 text-sm text-ink">{stufe.aufgabe}</p>

      <div className="rounded-2xl border border-line bg-raised p-3">
        <Strukturformel
          stufe={stufe}
          pfeile={pfeile}
          urteile={pfeile.map((_, i) => anzeigeUrteil(befund, i))}
          auswahl={auswahl}
          onZiel={zielGewaehlt}
          beschreibung={`${title} — Schritt ${stufenIdx + 1}: ${stufe.titel}`}
        />
      </div>

      <p className="mt-2 text-center text-xs text-subtle">
        {auswahl
          ? 'Jetzt das Ziel wählen — nochmal auf dieselbe Stelle bricht ab.'
          : 'Ausgangspunkt wählen: eine Bindung, ein freies Elektronenpaar oder ein Atom.'}
      </p>

      {/* Gesetzte Pfeile */}
      {pfeile.length > 0 && (
        <ul className="mt-3 space-y-1" aria-label="Gesetzte Pfeile">
          {pfeile.map((pfeil, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded-lg bg-sunken px-3 py-1.5 text-xs">
              <span className="font-mono text-muted">
                {pfeil.von.art === 'freiesPaar' ? 'freies Paar' : pfeil.von.art} {pfeil.von.id}
                {' → '}
                {pfeil.nach.art} {pfeil.nach.id}
              </span>
              {!geloest && (
                <button onClick={() => { setPfeile(p => p.filter((_, j) => j !== i)); setBefund(null) }}
                  aria-label={`Pfeil ${i + 1} entfernen`}
                  className="text-subtle hover:text-danger">entfernen</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite" className="mt-4">
        {befund && (
          <p className={`rounded-xl border px-4 py-3 text-sm ${
            befund.vollstaendig ? 'border-success bg-success/10 text-success'
              : 'border-warning bg-warning/10 text-warning'
          }`}>
            {befundText(befund)}
          </p>
        )}
        {geloest && (
          <p className="mt-3 rounded-xl border border-line bg-sunken px-4 py-3 text-sm text-muted">
            {stufe.erklaerung}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {!geloest && (
          <button onClick={pruefen} disabled={pfeile.length === 0}
            className="min-h-11 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent disabled:opacity-40 hover:bg-accent-strong">
            Prüfen
          </button>
        )}
        {geloest && (
          <button onClick={weiter}
            className="min-h-11 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong">
            {stufenIdx < stages.length - 1 ? 'Weiter zum nächsten Schritt' : 'Abschließen'}
          </button>
        )}
        {!geloest && hinweise < stufe.hinweise.length && (
          <button onClick={() => { setHinweise(h => h + 1); setHinweiseGenutzt(true) }}
            className="min-h-11 rounded-xl border border-line px-5 py-2.5 text-sm text-muted hover:text-ink">
            💡 Hinweis {hinweise + 1}
          </button>
        )}
      </div>

      {stufe.hinweise.slice(0, hinweise).map((hinweis, i) => (
        <p key={i} className="mt-3 rounded-xl border border-warning/50 bg-warning/10 px-4 py-3 text-sm text-muted">
          {hinweis}
        </p>
      ))}
    </div>
  )
}
