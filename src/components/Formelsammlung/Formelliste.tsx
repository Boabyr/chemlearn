import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Formeltext from '../Theory/Formeltext'
import { formelsatzVon } from '../../lib/courseRegistry'
import { passtZuSuche, type Formeleintrag, type Formelgruppe } from '../../lib/formelsammlung'

interface Props {
  courseId: string
  gruppen: Formelgruppe[]
}

/**
 * Nachschlagen statt Rechnen.
 *
 * Der Formelrechner im Thema kann eine Gleichung umstellen und ausrechnen —
 * dafür muss man aber wissen, in welchem Thema sie steht. Diese Liste zeigt
 * alle Gleichungen eines Kurses nebeneinander, mit den Größen und ihren
 * Einheiten, und führt von dort ins Thema zurück.
 */
export default function Formelliste({ courseId, gruppen }: Props) {
  const [suche, setSuche] = useState('')
  const formelsatz = formelsatzVon(courseId)

  const gefiltert = useMemo(
    () => gruppen
      .map(gruppe => ({ ...gruppe, eintraege: gruppe.eintraege.filter(e => passtZuSuche(e, suche)) }))
      .filter(gruppe => gruppe.eintraege.length > 0),
    [gruppen, suche],
  )

  const treffer = gefiltert.reduce((summe, gruppe) => summe + gruppe.eintraege.length, 0)

  return (
    <div className="space-y-8">
      <div>
        <input
          type="search"
          aria-label="Formeln suchen"
          value={suche}
          onChange={e => setSuche(e.target.value)}
          placeholder="Suchen nach Formel, Größe oder Thema…"
          className="w-full bg-raised border border-line rounded-xl px-4 py-3 text-ink text-sm focus:outline-none focus:border-accent"
        />
        <p className="text-subtle text-xs mt-2">
          {treffer} {treffer === 1 ? 'Formel' : 'Formeln'}
        </p>
      </div>

      {gefiltert.length === 0 && (
        <p className="text-muted text-sm">Keine Formel passt zu dieser Suche.</p>
      )}

      {gefiltert.map(gruppe => (
        <section key={gruppe.id} className="space-y-4">
          <h2 className="text-accent font-mono text-xs uppercase tracking-widest">{gruppe.titel}</h2>
          {gruppe.eintraege.map(eintrag => (
            <Formelkarte key={`${eintrag.topicId}/${eintrag.formel.id}`}
              courseId={courseId} eintrag={eintrag} formelsatz={formelsatz} />
          ))}
        </section>
      ))}
    </div>
  )
}

function Formelkarte({ courseId, eintrag, formelsatz }: {
  courseId: string
  eintrag: Formeleintrag
  formelsatz: ReturnType<typeof formelsatzVon>
}) {
  const [hinweiseOffen, setHinweiseOffen] = useState(false)
  const { formel } = eintrag

  return (
    <article className="bg-raised border border-line rounded-xl px-5 py-4 space-y-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h3 className="font-medium">{formel.name}</h3>
        <Link to={`/course/${courseId}/${eintrag.topicId}`}
          className="text-subtle text-xs hover:text-accent transition-colors">
          → {eintrag.topicTitle}
        </Link>
      </div>

      {/* Gleichungen stehen im Kurs als Rechenausdruck, nicht als LaTeX —
          der Formelrechner zeigt sie genauso. */}
      <p aria-label={`Gleichung ${formel.equation}`} className="text-xl font-mono text-ink">{formel.equation}</p>

      <table className="w-full text-sm">
        <tbody>
          {formel.variables.map(v => (
            <tr key={v.id} className="border-t border-line/60">
              <td className="py-1.5 pr-3 font-mono text-blue-300 align-top w-16">{v.symbol}</td>
              <td className="py-1.5 pr-3 text-muted align-top">
                {v.label}
                {v.description && (
                  <span className="block text-subtle text-xs">
                    <Formeltext text={v.description} formelsatz={formelsatz} />
                  </span>
                )}
              </td>
              <td className="py-1.5 text-subtle font-mono text-xs align-top w-20">{v.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {formel.umstellungen.length > 0 && (
        <div>
          <p className="text-subtle text-xs uppercase tracking-widest mb-1">Umstellungen</p>
          <ul className="space-y-1">
            {formel.umstellungen.map(u => (
              <li key={u.solveFor} className="font-mono text-sm text-muted">{u.solveFor} = {u.expr}</li>
            ))}
          </ul>
        </div>
      )}

      {formel.hints.length > 0 && (
        <div>
          <button onClick={() => setHinweiseOffen(offen => !offen)}
            className="text-warning text-xs hover:underline">
            💡 {formel.hints.length === 1 ? 'Hinweis' : `Hinweise (${formel.hints.length})`}
          </button>
          {hinweiseOffen && (
            <ul className="mt-2 space-y-1">
              {formel.hints.map(hinweis => (
                <li key={hinweis} className="text-muted text-xs">
                  <Formeltext text={hinweis} formelsatz={formelsatz} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  )
}
