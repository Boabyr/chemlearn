import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

/** Liest die eine Sitzung aus dem Provider. Öffnet kein eigenes Abo mehr. */
export function useAuth() {
  return useContext(AuthContext)
}
