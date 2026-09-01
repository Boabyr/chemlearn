import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('VITE_SUPABASE_URL oder VITE_SUPABASE_ANON_KEY fehlt — Anmeldung und Fortschritt bleiben leer.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
