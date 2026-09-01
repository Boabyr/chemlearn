import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import type { Einstellungen } from '../lib/database.types'

const SCHLUESSEL = (userId: string) => ['einstellungen', userId] as const
const OERTLICH = 'chemlearn:einstellungen'

/** Rückfall, solange Migration 005 nicht eingespielt ist. */
function oertlichLesen(): Einstellungen {
  try {
    return JSON.parse(localStorage.getItem(OERTLICH) ?? '{}') as Einstellungen
  } catch {
    return {}
  }
}

function oertlichSchreiben(daten: Einstellungen) {
  try { localStorage.setItem(OERTLICH, JSON.stringify(daten)) } catch { /* privater Modus */ }
}

function tabelleFehlt(code?: string): boolean {
  return code === '42P01' || code === 'PGRST205'
}

/**
 * Persönliche Einstellungen, geräteübergreifend.
 *
 * Fehlt die Tabelle noch, bleibt alles im Browser liegen — die Seite soll
 * nicht davon abhängen, dass eine Migration schon gelaufen ist.
 */
export function useEinstellungen() {
  const { user } = useAuth()
  const qc = useQueryClient()
  const userId = user?.id ?? 'anonym'

  const { data: einstellungen = {}, isPending } = useQuery({
    queryKey: SCHLUESSEL(userId),
    queryFn: async (): Promise<Einstellungen> => {
      const { data, error } = await supabase
        .from('user_settings').select('daten').eq('user_id', user!.id).maybeSingle()
      if (error) {
        if (tabelleFehlt(error.code)) return oertlichLesen()
        throw new Error(error.message)
      }
      return data?.daten ?? oertlichLesen()
    },
    enabled: !!user,
    staleTime: 5 * 60_000,
  })

  const speichern = useMutation({
    mutationFn: async (neu: Einstellungen) => {
      oertlichSchreiben(neu)
      if (!user) return
      const { error } = await supabase.from('user_settings')
        .upsert({ user_id: user.id, daten: neu, updated_at: new Date().toISOString() })
      if (error && !tabelleFehlt(error.code)) throw new Error(error.message)
    },
    onMutate: async (neu) => {
      await qc.cancelQueries({ queryKey: SCHLUESSEL(userId) })
      const vorher = qc.getQueryData<Einstellungen>(SCHLUESSEL(userId))
      qc.setQueryData(SCHLUESSEL(userId), neu)
      return { vorher }
    },
    onError: (_fehler, _neu, kontext) => {
      if (kontext?.vorher) qc.setQueryData(SCHLUESSEL(userId), kontext.vorher)
    },
  })

  const setzen = useCallback((teil: Partial<Einstellungen>) => {
    speichern.mutate({ ...einstellungen, ...teil })
  }, [einstellungen, speichern])

  return { einstellungen, setzen, loading: !!user && isPending }
}
