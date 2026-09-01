import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { AuthContext } from './authContext'

/**
 * Eine Sitzung, ein Abo.
 *
 * Vorher rief jede Seite `useAuth()` selbst auf — auf dem Dashboard liefen
 * dadurch fünf `getSession()`-Anfragen und fünf `onAuthStateChange`-Abos
 * nebeneinander.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let abgemeldet = false

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (abgemeldet) return
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_ereignis, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => { abgemeldet = true; subscription.unsubscribe() }
  }, [])

  const wert = useMemo(() => ({ user, loading }), [user, loading])
  return <AuthContext.Provider value={wert}>{children}</AuthContext.Provider>
}
