import { useEffect, useState } from 'react'
import { type Theme, themaAnwenden, themaSpeichern, gespeichertesThema } from './theme'

const REIHE: Theme[] = ['system', 'light', 'dark']
const BESCHRIFTUNG: Record<Theme, string> = { system: '🖥️ System', light: '☀️ Hell', dark: '🌙 Dunkel' }

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(gespeichertesThema)

  useEffect(() => {
    themaAnwenden(theme)
    themaSpeichern(theme)
  }, [theme])

  const naechstes = REIHE[(REIHE.indexOf(theme) + 1) % REIHE.length]

  return (
    <button
      onClick={() => setTheme(naechstes)}
      aria-label={`Darstellung: ${BESCHRIFTUNG[theme]}. Weiter zu ${BESCHRIFTUNG[naechstes]}`}
      className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted hover:text-ink"
    >
      {BESCHRIFTUNG[theme]}
    </button>
  )
}
