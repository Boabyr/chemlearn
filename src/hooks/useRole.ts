import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { qk } from '../lib/queryKeys'

export type Role = 'admin' | 'tutor' | 'student'

async function rollenLaden(userId: string): Promise<Role[]> {
  const { data, error } = await supabase.from('user_roles').select('role').eq('user_id', userId)
  if (error) throw new Error(error.message)
  return data && data.length > 0 ? data.map(r => r.role as Role) : ['student']
}

export function useRole() {
  const { user } = useAuth()

  const { data: roles = ['student' as Role], isPending } = useQuery({
    queryKey: qk.rollen(user?.id ?? 'anonym'),
    queryFn: () => rollenLaden(user!.id),
    enabled: !!user,
    staleTime: 5 * 60_000,
  })

  const isAdmin = roles.includes('admin')
  const isTutor = roles.includes('tutor') || isAdmin
  const isStudent = roles.includes('student') || !isTutor

  return { roles, isAdmin, isTutor, isStudent, loading: !!user && isPending }
}
