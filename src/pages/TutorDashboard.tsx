import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import { supabase } from '../lib/supabase'

type Tab = 'reports' | 'suggestions' | 'content'

export default function TutorDashboard() {
  const { user } = useAuth()
  const { isTutor, isAdmin, loading: roleLoading } = useRole()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('reports')
  const [reports, setReports] = useState<any[]>([])
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [resolveNote, setResolveNote] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!roleLoading && !isTutor) navigate('/')
  }, [isTutor, roleLoading])

  useEffect(() => {
    if (!isTutor) return
    // Offene Berichte laden
    supabase.from('content_reports').select('*').eq('status', 'open').order('created_at', { ascending: false })
      .then(({ data }) => setReports(data ?? []))
    // Ausstehende Vorschläge laden
    supabase.from('content_suggestions').select('*').eq('status', 'pending').order('created_at', { ascending: false })
      .then(({ data }) => setSuggestions(data ?? []))
  }, [isTutor])

  async function resolveReport(id: string, status: 'resolved' | 'dismissed') {
    await supabase.from('content_reports').update({
      status,
      resolved_by: user!.id,
      resolved_at: new Date().toISOString(),
      resolution_note: resolveNote[id] || null,
    }).eq('id', id)
    setReports(r => r.filter(x => x.id !== id))
  }

  async function approveSuggestion(id: string) {
    const suggestion = suggestions.find(s => s.id === id)
    if (!suggestion) return
    const approvals: string[] = suggestion.approvals ?? []
    if (approvals.includes(user!.id)) return // schon abgestimmt

    const newApprovals = [...approvals, user!.id]
    const needed = isAdmin ? 1 : 2 // Admin braucht nur 1 Zustimmung

    if (newApprovals.length >= needed) {
      await supabase.from('content_suggestions').update({
        status: 'approved',
        approvals: newApprovals,
        reviewed_by: user!.id,
        reviewed_at: new Date().toISOString(),
      }).eq('id', id)
    } else {
      await supabase.from('content_suggestions').update({ approvals: newApprovals }).eq('id', id)
    }
    setSuggestions(s => s.map(x => x.id === id ? { ...x, approvals: newApprovals } : x))
  }

  async function rejectSuggestion(id: string) {
    await supabase.from('content_suggestions').update({
      status: 'rejected',
      reviewed_by: user!.id,
      reviewed_at: new Date().toISOString(),
    }).eq('id', id)
    setSuggestions(s => s.filter(x => x.id !== id))
  }

  const ISSUE_LABELS: Record<string, string> = {
    wrong_answer: '❌ Falsche Antwort', typo: '✏️ Tippfehler',
    unclear: '🤔 Unklar', missing_info: '📋 Info fehlt', other: '💬 Sonstiges'
  }

  if (roleLoading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-teal-400">Lade...</div></div>

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white">← Dashboard</button>
        <span className="text-purple-400 font-mono text-xs uppercase tracking-widest">
          🎓 {isAdmin ? 'Admin' : 'Tutor'} Dashboard
        </span>
        <span className="ml-auto text-xs text-slate-500">
          {reports.length} offene Berichte · {suggestions.length} Vorschläge
        </span>
      </nav>

      {/* Tabs */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 flex gap-1">
        {([
          ['reports', `⚑ Fehler-Berichte (${reports.length})`],
          ['suggestions', `💡 Vorschläge (${suggestions.length})`],
        ] as [Tab, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-purple-400 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}>
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">

        {/* ── FEHLER-BERICHTE ── */}
        {tab === 'reports' && (
          reports.length === 0
            ? <div className="text-center py-16 text-slate-400">✅ Keine offenen Berichte</div>
            : reports.map(r => (
              <div key={r.id} className="bg-slate-800 border border-amber-800/50 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs px-2 py-1 bg-amber-900/40 text-amber-400 rounded-full">
                      {ISSUE_LABELS[r.issue_type] || r.issue_type}
                    </span>
                    <span className="text-xs text-slate-500 ml-2">{r.course_id} › {r.topic_id} › {r.content_type}:{r.content_id}</span>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(r.created_at).toLocaleDateString('de')}</span>
                </div>
                <p className="text-sm text-white mb-2"><span className="text-slate-400">Problem: </span>{r.description}</p>
                {r.suggested_correction && (
                  <p className="text-sm text-teal-300 mb-3"><span className="text-slate-400">Vorschlag: </span>{r.suggested_correction}</p>
                )}
                <input value={resolveNote[r.id] || ''} onChange={e => setResolveNote(n => ({...n, [r.id]: e.target.value}))}
                  placeholder="Notiz zur Entscheidung (optional)..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400 mb-3" />
                <div className="flex gap-2">
                  <button onClick={() => resolveReport(r.id, 'resolved')}
                    className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-sm rounded-xl font-medium">
                    ✓ Erledigt
                  </button>
                  <button onClick={() => resolveReport(r.id, 'dismissed')}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-xl">
                    Schließen
                  </button>
                </div>
              </div>
            ))
        )}

        {/* ── VORSCHLÄGE ── */}
        {tab === 'suggestions' && (
          suggestions.length === 0
            ? <div className="text-center py-16 text-slate-400">✅ Keine offenen Vorschläge</div>
            : suggestions.map(s => {
              const approvals: string[] = s.approvals ?? []
              const alreadyVoted = approvals.includes(user!.id)
              const needed = isAdmin ? 1 : 2
              return (
                <div key={s.id} className="bg-slate-800 border border-teal-800/50 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-2 py-1 bg-teal-900/40 text-teal-400 rounded-full">
                      {s.suggestion_type === 'quiz' ? '✅ Quiz-Frage' : '🃏 Karteikarte'}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-slate-500">{s.topic_id}</span>
                      <div className="text-xs text-teal-400 mt-1">{approvals.length}/{needed} Zustimmungen</div>
                    </div>
                  </div>

                  {s.suggestion_type === 'quiz' && s.content && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-white mb-2">{s.content.question}</p>
                      {s.content.options?.map((opt: string, i: number) => (
                        <div key={i} className={`text-xs px-3 py-1.5 rounded-lg mb-1 ${
                          i === s.content.correct ? 'bg-green-900/30 text-green-400' : 'text-slate-400'
                        }`}>
                          {String.fromCharCode(65+i)}. {opt}
                        </div>
                      ))}
                      {s.content.explanation && (
                        <p className="text-xs text-slate-400 mt-2 italic">{s.content.explanation}</p>
                      )}
                    </div>
                  )}

                  {s.suggestion_type === 'flashcard' && s.content && (
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <div className="bg-slate-700 rounded-xl p-3">
                        <p className="text-xs text-slate-400 mb-1">Vorderseite</p>
                        <p className="text-sm text-white">{s.content.front}</p>
                      </div>
                      <div className="bg-teal-900/20 rounded-xl p-3">
                        <p className="text-xs text-slate-400 mb-1">Rückseite</p>
                        <p className="text-sm text-white">{s.content.back}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => approveSuggestion(s.id)} disabled={alreadyVoted}
                      className="px-4 py-2 bg-teal-700 hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm rounded-xl font-medium">
                      {alreadyVoted ? '✓ Zugestimmt' : '✓ Zustimmen'}
                    </button>
                    <button onClick={() => rejectSuggestion(s.id)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-xl">
                      Ablehnen
                    </button>
                  </div>
                </div>
              )
            })
        )}
      </div>
    </div>
  )
}
