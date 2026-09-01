import { useEffect, useState } from 'react'

/**
 * Zeigt an, wenn gerade kein Netz da ist.
 *
 * Wichtig, weil Antworten dann in den Ausgangskorb wandern statt verloren zu
 * gehen — ohne Hinweis sieht das aus wie ein stiller Fehler.
 */
export default function Verbindungshinweis() {
  const [offline, setOffline] = useState(() => typeof navigator !== 'undefined' && !navigator.onLine)

  useEffect(() => {
    const an = () => setOffline(false)
    const aus = () => setOffline(true)
    window.addEventListener('online', an)
    window.addEventListener('offline', aus)
    return () => {
      window.removeEventListener('online', an)
      window.removeEventListener('offline', aus)
    }
  }, [])

  if (!offline) return null

  return (
    <div role="status"
      className="sticky top-0 z-50 bg-warning/20 px-4 py-2 text-center text-sm text-warning">
      Offline — deine Antworten werden gemerkt und später übertragen.
    </div>
  )
}
