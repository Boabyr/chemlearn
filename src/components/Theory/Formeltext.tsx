import { Fragment, useMemo } from 'react'
import katex from 'katex'
import { formatChemistry } from './chemFormat'
import { zerlege } from './mathe'
import type { Formelsatz } from '../../content/schema'
import 'katex/dist/katex.min.css'

/**
 * Kurzer Fließtext mit Formeln — für Fragen, Antworten, Karteikarten.
 *
 * Der Theorietext läuft durch `TheoryRenderer` (Markdown + KaTeX). Quiz,
 * Karteikarten und Prüfungsfragen zeigten ihre Felder dagegen als rohen String,
 * also stand dort `$\vec{j} = \sigma \vec{E}$` wörtlich auf dem Bildschirm.
 * Diese Komponente setzt dieselben beiden Sätze wie die Theorie, aber ohne
 * Markdown: `$…$` bzw. `$$…$$` geht an KaTeX, der Rest an den Chemiesatz.
 */

interface Props {
  text: string
  /** Formelsatz des Kurses. `aus` lässt V2 und N2 in Ruhe. */
  formelsatz?: Formelsatz
}

export default function Formeltext({ text, formelsatz = 'chemie' }: Props) {
  const teile = useMemo(() => zerlege(text), [text])

  return (
    <>
      {teile.map((teil, i) => {
        if (teil.art === 'text') {
          return (
            <Fragment key={i}>
              {formelsatz === 'chemie' ? formatChemistry(teil.wert) : teil.wert}
            </Fragment>
          )
        }
        // Fehlerhaftes LaTeX bleibt lesbar stehen, statt die Seite zu werfen.
        const html = katex.renderToString(teil.wert, {
          displayMode: teil.abgesetzt,
          throwOnError: false,
          strict: false,
        })
        return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
      })}
    </>
  )
}
