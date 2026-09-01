import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Fokus beim Seitenwechsel an den Anfang setzen.
 *
 * Ohne das bleibt der Fokus auf dem angeklickten Element, während der ganze
 * Inhalt darunter ausgetauscht wird — mit Tastatur oder Screenreader landet
 * man dann irgendwo mitten im neuen Dokument.
 */
export default function FokusWechsel() {
  const ort = useLocation()

  useEffect(() => {
    const ziel = document.querySelector<HTMLElement>('main, h1')
    if (!ziel) return
    ziel.setAttribute('tabindex', '-1')
    ziel.focus({ preventScroll: true })
    ziel.removeAttribute('tabindex')
    window.scrollTo({ top: 0 })
  }, [ort.pathname])

  return null
}
