/**
 * Farben je Prüfer als vollständige Klassennamen.
 *
 * Zusammengesetzte Klassen (`text-${farbe}-400`) sieht der Tailwind-Scanner
 * nicht — sie wurden nie erzeugt, und im Produktionsbuild fehlte jede
 * Prüferfarbe. In `ExamSimulator` war das schon gelöst, in `ExamQuestion` nicht.
 */
export interface PruefStil {
  chip: string
  panel: string
  text: string
  bar: string
  auswahl: string
}

const STIL: Record<string, PruefStil> = {
  lieberzeit: {
    chip: 'bg-accent/20 text-accent', panel: 'bg-accent/10 border-accent',
    text: 'text-accent', bar: 'bg-accent', auswahl: 'border-accent bg-accent/20 text-accent',
  },
  koellensperger: {
    chip: 'bg-blue-900/40 text-blue-400', panel: 'bg-blue-900/20 border-blue-800',
    text: 'text-blue-400', bar: 'bg-blue-500', auswahl: 'border-blue-400 bg-blue-900/20 text-blue-300',
  },
  gerner: {
    chip: 'bg-purple-900/40 text-purple-400', panel: 'bg-purple-900/20 border-purple-800',
    text: 'text-purple-400', bar: 'bg-purple-500', auswahl: 'border-purple-400 bg-purple-900/20 text-purple-300',
  },
}

const RUECKFALL: PruefStil = {
  chip: 'bg-sunken text-muted', panel: 'bg-raised border-line',
  text: 'text-muted', bar: 'bg-subtle', auswahl: 'border-accent bg-accent/20 text-accent',
}

export const stilFuer = (pruefer: string): PruefStil => STIL[pruefer] ?? RUECKFALL
