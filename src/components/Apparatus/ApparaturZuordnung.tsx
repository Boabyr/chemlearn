import { useMemo, useState } from 'react'
import { getApparatus } from './registry'
import { bildReihenfolge, befundText, pruefeZuordnung, type Befund } from './zuordnung'

interface Paar {
  apparaturId: string
  label: string
  hinweis?: string
}

interface Props {
  title: string
  description: string
  paare: Paar[]
  explanation: string
  onComplete?: (korrekt: boolean) => void
}

const RAHMEN: Record<string, string> = {
  richtig: 'border-success bg-success/10',
  falsch: 'border-danger bg-danger/10',
  offen: 'border-line bg-surface',
}

/**
 * Geräte zuordnen: links der Name, rechts das Bild.
 *
 * Der Kurs hat 21 Apparaturzeichnungen; geübt wurden fünf, je eine Frage mit
 * vier Bildern. Hier kommen mehrere auf einmal ins Spiel, und die Rückmeldung
 * kommt je Paar — ein binäres "leider falsch" sagt nicht, welche Zuordnung
 * danebenlag.
 */
export default function ApparaturZuordnung({ title, description, paare, explanation, onComplete }: Props) {
  const [auswahl, setAuswahl] = useState<string | null>(null)
  const [gesetzt, setGesetzt] = useState<Record<string, string>>({})
  const [befund, setBefund] = useState<Befund | null>(null)

  const bilder = useMemo(() => bildReihenfolge(paare.map(p => p.apparaturId)), [paare])
  const nachId = useMemo(() => new Map(paare.map(p => [p.apparaturId, p])), [paare])
  const geloest = befund?.vollstaendig ?? false

  const zugeordnetZu = (apparaturId: string) =>
    Object.entries(gesetzt).find(([, id]) => id === apparaturId)?.[0]

  function nameGewaehlt(label: string) {
    if (geloest) return
    setBefund(null)
    setAuswahl(auswahl === label ? null : label)
  }

  function bildGewaehlt(apparaturId: string) {
    if (geloest) return
    setBefund(null)

    // Ohne gewählten Namen: ein Klick aufs Bild löst dessen Zuordnung wieder.
    const bisher = zugeordnetZu(apparaturId)
    if (!auswahl) {
      if (bisher) setGesetzt(g => { const neu = { ...g }; delete neu[bisher]; return neu })
      return
    }

    setGesetzt(g => {
      const neu = { ...g }
      if (bisher) delete neu[bisher]   // ein Bild gehört zu genau einem Namen
      neu[auswahl] = apparaturId
      return neu
    })
    setAuswahl(null)
  }

  function pruefen() {
    const ergebnis = pruefeZuordnung(gesetzt, paare)
    setBefund(ergebnis)
    if (ergebnis.vollstaendig) onComplete?.(true)
  }

  return (
    <div>
      <p className="mb-1 text-sm font-medium text-ink">{title}</p>
      <p className="mb-4 text-sm text-muted">{description}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Namen */}
        <ul className="space-y-2" aria-label="Geräte">
          {paare.map(paar => {
            const urteil = befund?.urteile[paar.label] ?? 'offen'
            const zugeordnet = gesetzt[paar.label]
            return (
              <li key={paar.label}>
                <button
                  onClick={() => nameGewaehlt(paar.label)}
                  aria-pressed={auswahl === paar.label}
                  className={`min-h-11 w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                    befund ? RAHMEN[urteil]
                      : auswahl === paar.label ? 'border-accent bg-accent/10 text-ink'
                      : 'border-line bg-surface text-muted hover:border-subtle'
                  }`}
                >
                  <span className="text-ink">{paar.label}</span>
                  {zugeordnet && (
                    <span className="mt-0.5 block font-mono text-xs text-subtle">
                      → {nachId.get(zugeordnet)?.label ?? zugeordnet}
                    </span>
                  )}
                  {befund && urteil === 'falsch' && paar.hinweis && (
                    <span className="mt-1 block text-xs text-muted">{paar.hinweis}</span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Bilder */}
        <ul className="grid grid-cols-2 gap-2" aria-label="Abbildungen">
          {bilder.map((apparaturId, i) => {
            const Zeichnung = getApparatus(apparaturId)
            const besetztVon = zugeordnetZu(apparaturId)
            // Buchstabe statt Kennung: die Kennung stünde im DOM und wäre die Antwort.
            const buchstabe = String.fromCharCode(65 + i)
            return (
              <li key={apparaturId}>
                <button
                  onClick={() => bildGewaehlt(apparaturId)}
                  aria-label={besetztVon
                    ? `Abbildung ${buchstabe}, zugeordnet zu ${besetztVon}`
                    : `Abbildung ${buchstabe}, noch nicht zugeordnet`}
                  className={`w-full rounded-xl border p-1 transition-colors ${
                    besetztVon ? 'border-accent bg-accent/10' : 'border-line bg-surface hover:border-subtle'
                  }`}
                >
                  {Zeichnung ? <Zeichnung /> : <span className="text-xs text-danger">fehlt</span>}
                  <span className="mt-0.5 block text-center font-mono text-xs text-subtle">
                    {besetztVon ?? buchstabe}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="mt-2 text-center text-xs text-subtle">
        {auswahl ? 'Jetzt die passende Abbildung wählen.' : 'Ein Gerät wählen, dann seine Abbildung.'}
      </p>

      <div aria-live="polite" className="mt-4">
        {befund && (
          <p className={`rounded-xl border px-4 py-3 text-sm ${
            befund.vollstaendig ? 'border-success bg-success/10 text-success'
              : 'border-warning bg-warning/10 text-warning'
          }`}>
            {befundText(befund, paare.length)}
          </p>
        )}
        {geloest && (
          <p className="mt-3 rounded-xl border border-line bg-sunken px-4 py-3 text-sm text-muted">
            {explanation}
          </p>
        )}
      </div>

      {!geloest && (
        <button onClick={pruefen} disabled={Object.keys(gesetzt).length === 0}
          className="mt-4 min-h-11 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent disabled:opacity-40 hover:bg-accent-strong">
          Prüfen
        </button>
      )}
    </div>
  )
}
