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
    <main className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">⚗️</span>
          <h1 className="text-3xl font-bold text-accent mt-2">ChemLearn</h1>
          <p className="text-muted mt-1">Heterocyclische Chemie interaktiv lernen</p>
        </div>

        <div className="bg-raised rounded-2xl p-8 border border-line">
          <h2 className="text-xl font-semibold text-ink mb-6">
            {isLogin ? 'Einloggen' : 'Registrieren'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-surface border border-line rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-accent"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface border border-line rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-accent"
                required
              />
            </div>

            {error && (
              <p className="text-danger text-sm bg-danger/10 border border-danger rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-strong disabled:opacity-50 text-on-accent font-semibold rounded-lg px-4 py-3 transition-colors"
            >
              {loading ? 'Laden...' : isLogin ? 'Einloggen' : 'Registrieren'}
            </button>
          </form>

          <button
            onClick={() => setIsLogin(l => !l)}
            className="w-full mt-4 text-muted hover:text-accent text-sm transition-colors"
          >
            {isLogin ? 'Noch kein Konto? Registrieren' : 'Bereits registriert? Einloggen'}
          </button>
        </div>
      </div>
    </main>
  )
}
