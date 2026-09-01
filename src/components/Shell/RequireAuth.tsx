import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'

/**
 * Routenwache. Ersetzt die fünf handgeschriebenen `useEffect`-Weiterleitungen —
 * eine davon lief mitten im Render und ließ die Seite aufblitzen.
 */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const ort = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-accent" role="status">Laden...</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace state={{ von: ort.pathname }} />
  return <>{children}</>
}
