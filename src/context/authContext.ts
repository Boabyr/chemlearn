import { createContext } from 'react'
import type { User } from '@supabase/supabase-js'

export interface AuthWert {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthWert>({ user: null, loading: true })
