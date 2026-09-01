export type Theme = 'system' | 'light' | 'dark'
const SPEICHER = 'chemlearn:theme'

export function themaAnwenden(theme: Theme) {
  const wurzel = document.documentElement
  if (theme === 'system') wurzel.removeAttribute('data-theme')
  else wurzel.setAttribute('data-theme', theme)
}

export function gespeichertesThema(): Theme {
  try {
    const wert = localStorage.getItem(SPEICHER)
    return wert === 'light' || wert === 'dark' ? wert : 'system'
  } catch {
    return 'system'
  }
}

export function themaSpeichern(theme: Theme) {
  try { localStorage.setItem(SPEICHER, theme) } catch { /* privater Modus, Speicher gesperrt */ }
}
