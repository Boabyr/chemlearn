import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import type { ContentReportRow, ContentSuggestionRow } from '../lib/database.types'
import { supabase } from '../lib/supabase'

type Tab = 'reports' | 'suggestions' | 'content'

export default function TutorDashboard() {
  const { user } = useAuth()
  const { isTutor, isAdmin, loading: roleLoading } = useRole()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('reports')
  const [reports, setReports] = useState<ContentReportRow[]>([])
  const [suggestions, setSuggestions] = useState<ContentSuggestionRow[]>([])
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

  if (roleLoading) return <div className="min-h-screen bg-surface flex items-center justify-center"><div className="text-accent">Lade...</div></div>

  return (
    <div className="min-h-screen bg-surface text-ink">
      <nav className="bg-raised border-b border-line px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-muted hover:text-ink">← Dashboard</button>
        <span className="text-purple-400 font-mono text-xs uppercase tracking-widest">
          🎓 {isAdmin ? 'Admin' : 'Tutor'} Dashboard
        </span>
        <span className="ml-auto text-xs text-subtle">
          {reports.length} offene Berichte · {suggestions.length} Vorschläge
        </span>
      </nav>

      {/* Tabs */}
      <div className="bg-raised border-b border-line px-6 flex gap-1">
        {([
          ['reports', `⚑ Fehler-Berichte (${reports.length})`],
          ['suggestions', `💡 Vorschläge (${suggestions.length})`],
        ] as [Tab, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-purple-400 text-purple-400' : 'border-transparent text-muted hover:text-ink'
            }`}>
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">

        {/* ── FEHLER-BERICHTE ── */}
        {tab === 'reports' && (
          reports.length === 0
            ? <div className="text-center py-16 text-muted">✅ Keine offenen Berichte</div>
            : reports.map(r => (
              <div key={r.id} className="bg-raised border border-warning rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs px-2 py-1 bg-warning/20 text-warning rounded-full">
                      {ISSUE_LABELS[r.issue_type] || r.issue_type}
                    </span>
                    <span className="text-xs text-subtle ml-2">{r.course_id} › {r.topic_id} › {r.content_type}:{r.content_id}</span>
                  </div>
                  <span className="text-xs text-subtle">{new Date(r.created_at).toLocaleDateString('de')}</span>
                </div>
                <p className="text-sm text-ink mb-2"><span className="text-muted">Problem: </span>{r.description}</p>
                {r.suggested_correction && (
                  <p className="text-sm text-accent mb-3"><span className="text-muted">Vorschlag: </span>{r.suggested_correction}</p>
                )}
                <input value={resolveNote[r.id] || ''} onChange={e => setResolveNote(n => ({...n, [r.id]: e.target.value}))}
                  placeholder="Notiz zur Entscheidung (optional)..."
                  className="w-full bg-surface border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-accent mb-3" />
                <div className="flex gap-2">
                  <button onClick={() => resolveReport(r.id, 'resolved')}
                    className="px-4 py-2 bg-success hover:bg-success/80 text-on-accent text-sm rounded-xl font-medium">
                    ✓ Erledigt
                  </button>
                  <button onClick={() => resolveReport(r.id, 'dismissed')}
                    className="px-4 py-2 bg-sunken hover:bg-sunken text-muted text-sm rounded-xl">
                    Schließen
                  </button>
                </div>
              </div>
            ))
        )}

        {/* ── VORSCHLÄGE ── */}
        {tab === 'suggestions' && (
          suggestions.length === 0
            ? <div className="text-center py-16 text-muted">✅ Keine offenen Vorschläge</div>
            : suggestions.map(s => {
              const approvals: string[] = s.approvals ?? []
              const alreadyVoted = approvals.includes(user!.id)
              const needed = isAdmin ? 1 : 2
              return (
                <div key={s.id} className="bg-raised border border-accent/50 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
                      {s.suggestion_type === 'quiz' ? '✅ Quiz-Frage' : '🃏 Karteikarte'}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-subtle">{s.topic_id}</span>
                      <div className="text-xs text-accent mt-1">{approvals.length}/{needed} Zustimmungen</div>
                    </div>
                  </div>

                  {s.suggestion_type === 'quiz' && s.content && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-ink mb-2">{s.content.question}</p>
                      {s.content.options?.map((opt: string, i: number) => (
                        <div key={i} className={`text-xs px-3 py-1.5 rounded-lg mb-1 ${
                          i === s.content.correct ? 'bg-success/20 text-success' : 'text-muted'
                        }`}>
                          {String.fromCharCode(65+i)}. {opt}
                        </div>
                      ))}
                      {s.content.explanation && (
                        <p className="text-xs text-muted mt-2 italic">{s.content.explanation}</p>
                      )}
                    </div>
                  )}

                  {s.suggestion_type === 'flashcard' && s.content && (
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <div className="bg-sunken rounded-xl p-3">
                        <p className="text-xs text-muted mb-1">Vorderseite</p>
                        <p className="text-sm text-ink">{s.content.front}</p>
                      </div>
                      <div className="bg-accent/10 rounded-xl p-3">
                        <p className="text-xs text-muted mb-1">Rückseite</p>
                        <p className="text-sm text-ink">{s.content.back}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => approveSuggestion(s.id)} disabled={alreadyVoted}
                      className="px-4 py-2 bg-accent hover:bg-accent-strong text-on-accent disabled:opacity-40 disabled:cursor-not-allowed text-sm rounded-xl font-medium">
                      {alreadyVoted ? '✓ Zugestimmt' : '✓ Zustimmen'}
                    </button>
                    <button onClick={() => rejectSuggestion(s.id)}
                      className="px-4 py-2 bg-sunken hover:bg-sunken text-muted text-sm rounded-xl">
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
