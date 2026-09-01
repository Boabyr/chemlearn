const SCHLUESSEL = 'chemlearn:zuletzt'

export interface ZuletztOffen {
  courseId: string
  topicId: string
  titel: string
  zeit: string
}

/**
 * Wo zuletzt gelernt wurde.
 *
 * Bewusst nur im Browser: es ist eine Bequemlichkeit für dieses Gerät, kein
 * Lernstand. Der gehört in die Datenbank.
 */
export function zuletztMerken(eintrag: Omit<ZuletztOffen, 'zeit'>): void {
  try {
    localStorage.setItem(SCHLUESSEL, JSON.stringify({ ...eintrag, zeit: new Date().toISOString() }))
  } catch { /* privater Modus */ }
}

export function zuletztLesen(): ZuletztOffen | null {
  try {
    const roh = localStorage.getItem(SCHLUESSEL)
    if (!roh) return null
    const wert = JSON.parse(roh) as ZuletztOffen
    return wert.courseId && wert.topicId ? wert : null
  } catch {
    return null
  }
}
