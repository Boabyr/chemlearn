import { useRegisterSW } from 'virtual:pwa-register/react'

/**
 * Hinweis, wenn eine neue Fassung bereitliegt.
 *
 * Der alte Service Worker rief `skipWaiting` und `clients.claim` — der Inhalt
 * konnte mitten in einer Lernrunde unter den Füßen wechseln. Jetzt entscheidet
 * die lernende Person, wann neu geladen wird.
 */
export default function Aktualisierung() {
  const {
    offlineReady: [offlineBereit, setOfflineBereit],
    needRefresh: [neueFassung, setNeueFassung],
    updateServiceWorker,
  } = useRegisterSW()

  if (!offlineBereit && !neueFassung) return null

  return (
    <div role="status"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-line bg-raised p-4 shadow-lg">
      <p className="text-sm text-ink">
        {neueFassung ? 'Eine neue Fassung ist bereit.' : 'Die App ist jetzt auch offline nutzbar.'}
      </p>
      <div className="mt-3 flex gap-2">
        {neueFassung && (
          <button onClick={() => void updateServiceWorker(true)}
            className="min-h-11 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong">
            Jetzt laden
          </button>
        )}
        <button onClick={() => { setOfflineBereit(false); setNeueFassung(false) }}
          className="min-h-11 rounded-lg border border-line px-4 py-2 text-sm hover:bg-sunken">
          Später
        </button>
      </div>
    </div>
  )
}
