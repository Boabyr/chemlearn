import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin]   = useState(true)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">⚗️</span>
          <h1 className="text-3xl font-bold text-teal-400 mt-2">ChemLearn</h1>
          <p className="text-slate-400 mt-1">Heterocyclische Chemie interaktiv lernen</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-6">
            {isLogin ? 'Einloggen' : 'Registrieren'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-black font-semibold rounded-lg px-4 py-3 transition-colors"
            >
              {loading ? 'Laden...' : isLogin ? 'Einloggen' : 'Registrieren'}
            </button>
          </form>

          <button
            onClick={() => setIsLogin(l => !l)}
            className="w-full mt-4 text-slate-400 hover:text-teal-400 text-sm transition-colors"
          >
            {isLogin ? 'Noch kein Konto? Registrieren' : 'Bereits registriert? Einloggen'}
          </button>
        </div>
      </div>
    </div>
  )
}
