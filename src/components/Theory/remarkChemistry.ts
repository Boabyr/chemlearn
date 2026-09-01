import { visit } from 'unist-util-visit'
import { formatChemistry } from './chemFormat'

/**
 * Setzt Summenformeln und Exponenten im Fließtext.
 *
 * Läuft nur über `text`-Knoten. Formeln in `$…$` sind zu dem Zeitpunkt bereits
 * `inlineMath`/`math`, Code ist `inlineCode`/`code` — beide bleiben unberührt.
 */
export default function remarkChemistry() {
  return (tree: unknown) => {
    visit(tree as never, 'text', (node: { value: string }) => {
      node.value = formatChemistry(node.value)
    })
  }
}
