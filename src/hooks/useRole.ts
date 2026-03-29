import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export type Role = 'admin' | 'tutor' | 'student'

export function useRole() {
  const { user } = useAuth()
  const [roles, setRoles] = useState<Role[]>(['student'])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setRoles(['student']); setLoading(false); return }
    supabase.from('user_roles').select('role').eq('user_id', user.id)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setRoles(data.map(r => r.role as Role))
        } else {
          setRoles(['student'])
        }
        setLoading(false)
      })
  }, [user])

  const isAdmin = roles.includes('admin')
  const isTutor = roles.includes('tutor') || roles.includes('admin')
  const isStudent = roles.includes('student') || !isTutor

  return { roles, isAdmin, isTutor, isStudent, loading }
}
