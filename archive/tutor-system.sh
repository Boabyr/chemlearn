#!/bin/bash
# ChemLearn – Tutor-System, verbesserte Apparaturen, Bugfixes
# WICHTIG: Kein commit/push = jederzeit rollback mit: git checkout -- . && git clean -fd
set -e
cd /srv/chemlearn

echo "════════════════════════════════════════"
echo " Phase 1: Supabase SQL (manuell ausführen!)"
echo "════════════════════════════════════════"
cat << 'SQLEOF'
-- ══ ROLLBACK-SICHERUNG ══
-- Vor Ausführung: aktuellen Stand notieren!
-- Rollback: Diese Tabellen mit DROP TABLE löschen

-- 1. Rollen-System
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'tutor', 'student')),
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, role)
);
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_read_own_role" ON user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admins_manage_roles" ON user_roles FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- 2. Vorschläge von Studierenden (Quiz/Flashcard-Pool)
CREATE TABLE IF NOT EXISTS content_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submitted_by UUID REFERENCES auth.users(id),
  course_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  suggestion_type TEXT NOT NULL CHECK (suggestion_type IN ('quiz', 'flashcard', 'exam_question')),
  content JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approvals JSONB DEFAULT '[]',
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id)
);
ALTER TABLE content_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students_submit" ON content_suggestions FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "students_read_own" ON content_suggestions FOR SELECT USING (auth.uid() = submitted_by);
CREATE POLICY "tutors_read_all" ON content_suggestions FOR SELECT USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('tutor','admin'))
);
CREATE POLICY "tutors_update_status" ON content_suggestions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('tutor','admin'))
);

-- 3. Fehler-Meldungen von Studierenden
CREATE TABLE IF NOT EXISTS content_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reported_by UUID REFERENCES auth.users(id),
  course_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  issue_type TEXT NOT NULL CHECK (issue_type IN ('wrong_answer', 'typo', 'unclear', 'missing_info', 'other')),
  description TEXT NOT NULL,
  suggested_correction TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  resolution_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students_report" ON content_reports FOR INSERT WITH CHECK (auth.uid() = reported_by);
CREATE POLICY "students_read_own_reports" ON content_reports FOR SELECT USING (auth.uid() = reported_by);
CREATE POLICY "tutors_manage_reports" ON content_reports FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('tutor','admin'))
);

-- 4. Tutor-erstellte Kursinhalte (dynamisch, DB-gespeichert)
CREATE TABLE IF NOT EXISTS tutor_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id),
  course_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('quiz', 'flashcard', 'exam_question', 'note')),
  content JSONB NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Tutoren können eigene Inhalte 10min lang löschen
  CONSTRAINT delete_window CHECK (
    (EXTRACT(EPOCH FROM (NOW() - created_at)) / 60) <= 10 OR is_published = FALSE
  )
);
ALTER TABLE tutor_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tutors_create" ON tutor_content FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('tutor','admin'))
);
CREATE POLICY "tutors_read_all" ON tutor_content FOR SELECT USING (
  is_published = TRUE OR 
  created_by = auth.uid() OR
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('tutor','admin'))
);
-- Tutoren können eigene Inhalte innerhalb 10 Minuten bearbeiten/löschen
CREATE POLICY "tutors_edit_recent" ON tutor_content FOR UPDATE USING (
  (created_by = auth.uid() OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  AND (EXTRACT(EPOCH FROM (NOW() - created_at)) / 60 <= 10 OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'))
);
CREATE POLICY "tutors_delete_recent" ON tutor_content FOR DELETE USING (
  (created_by = auth.uid() AND EXTRACT(EPOCH FROM (NOW() - created_at)) / 60 <= 10)
  OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Ersten Admin anlegen (deine User-ID einsetzen!):
-- INSERT INTO user_roles (user_id, role) VALUES ('<DEINE-USER-ID>', 'admin');
SQLEOF

echo ""
echo "⚠️  Führe obiges SQL im Supabase SQL-Editor aus BEVOR du weitermachst!"
echo "⚠️  Dann deinen ersten Admin eintragen (User-ID aus Supabase Auth Dashboard)"
echo ""
read -p "SQL ausgeführt? (j/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Jj]$ ]]; then
  echo "Abgebrochen. SQL zuerst ausführen!"
  exit 0
fi


echo "════════════════════════════════════════"
echo " Phase 2: React-Komponenten"
echo "════════════════════════════════════════"
mkdir -p src/hooks src/components/Tutor src/components/Reports src/pages

# ── useRole Hook ──
cat > src/hooks/useRole.ts << 'EOF'
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
EOF

# ── Report-Button Komponente (für Studierende) ──
cat > src/components/Reports/ReportButton.tsx << 'EOF'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

interface Props {
  courseId: string
  topicId: string
  contentType: string
  contentId: string
  contentPreview?: string
}

const ISSUE_TYPES = [
  { value: 'wrong_answer', label: '❌ Falsche Antwort' },
  { value: 'typo', label: '✏️ Tipp-/Schreibfehler' },
  { value: 'unclear', label: '🤔 Unklar formuliert' },
  { value: 'missing_info', label: '📋 Info fehlt' },
  { value: 'other', label: '💬 Sonstiges' },
]

export default function ReportButton({ courseId, topicId, contentType, contentId, contentPreview }: Props) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [issueType, setIssueType] = useState('wrong_answer')
  const [description, setDescription] = useState('')
  const [correction, setCorrection] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!user) return null

  async function submit() {
    if (!description.trim()) return
    setSubmitting(true)
    await supabase.from('content_reports').insert({
      reported_by: user!.id,
      course_id: courseId,
      topic_id: topicId,
      content_type: contentType,
      content_id: contentId,
      issue_type: issueType,
      description: description.trim(),
      suggested_correction: correction.trim() || null,
    })
    setSubmitted(true)
    setSubmitting(false)
    setTimeout(() => { setOpen(false); setSubmitted(false); setDescription(''); setCorrection('') }, 2000)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="text-xs text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1 mt-2">
        <span>⚑</span> Fehler melden
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-green-400 font-medium">Meldung eingereicht!</p>
                <p className="text-slate-400 text-sm mt-1">Tutoren werden es prüfen.</p>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-white mb-1">Fehler melden</h3>
                {contentPreview && (
                  <p className="text-xs text-slate-500 mb-4 italic truncate">"{contentPreview}"</p>
                )}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Art des Problems</label>
                    <select value={issueType} onChange={e => setIssueType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400">
                      {ISSUE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Beschreibung *</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}
                      placeholder="Was ist falsch oder unklar?"
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-teal-400"
                      rows={3} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Korrekturvorschlag (optional)</label>
                    <textarea value={correction} onChange={e => setCorrection(e.target.value)}
                      placeholder="So sollte es richtig lauten..."
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-teal-400"
                      rows={2} />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setOpen(false)}
                      className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-xl text-sm hover:bg-slate-600 transition-colors">
                      Abbrechen
                    </button>
                    <button onClick={submit} disabled={!description.trim() || submitting}
                      className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors">
                      {submitting ? 'Sende...' : 'Melden'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
EOF

# ── Vorschlag-Button für Studierende ──
cat > src/components/Reports/SuggestButton.tsx << 'EOF'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

interface Props {
  courseId: string
  topicId: string
}

export default function SuggestButton({ courseId, topicId }: Props) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<'quiz' | 'flashcard'>('quiz')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Quiz fields
  const [question, setQuestion] = useState('')
  const [opts, setOpts] = useState(['', '', '', ''])
  const [correct, setCorrect] = useState(0)
  const [explanation, setExplanation] = useState('')

  // Flashcard fields
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  if (!user) return null

  async function submit() {
    setSubmitting(true)
    const content = type === 'quiz'
      ? { question, options: opts, correct, explanation }
      : { front, back }
    await supabase.from('content_suggestions').insert({
      submitted_by: user!.id,
      course_id: courseId,
      topic_id: topicId,
      suggestion_type: type,
      content,
    })
    setSubmitted(true)
    setSubmitting(false)
    setTimeout(() => { setOpen(false); setSubmitted(false) }, 2500)
  }

  const isValid = type === 'quiz'
    ? question.trim() && opts.every(o => o.trim()) && explanation.trim()
    : front.trim() && back.trim()

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="text-xs text-slate-500 hover:text-teal-400 transition-colors flex items-center gap-1 mt-1">
        <span>💡</span> Frage/Karte vorschlagen
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-lg w-full max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-teal-400 font-medium">Vorschlag eingereicht!</p>
                <p className="text-slate-400 text-sm mt-1">Zwei Tutoren müssen zustimmen.</p>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-white mb-4">Inhalt vorschlagen</h3>
                <div className="flex gap-2 mb-5">
                  {(['quiz', 'flashcard'] as const).map(t => (
                    <button key={t} onClick={() => setType(t)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        type === t ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
                      }`}>
                      {t === 'quiz' ? '✅ Quiz-Frage' : '🃏 Karteikarte'}
                    </button>
                  ))}
                </div>

                {type === 'quiz' && (
                  <div className="space-y-3">
                    <textarea value={question} onChange={e => setQuestion(e.target.value)}
                      placeholder="Frage..." rows={2}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-teal-400" />
                    <p className="text-xs text-slate-400">Antwortoptionen (klick auf ✓ = richtig):</p>
                    {opts.map((o, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <button onClick={() => setCorrect(i)}
                          className={`w-7 h-7 rounded-lg flex-shrink-0 text-sm font-bold transition-colors ${
                            correct === i ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'
                          }`}>{String.fromCharCode(65+i)}</button>
                        <input value={o} onChange={e => { const n=[...opts]; n[i]=e.target.value; setOpts(n) }}
                          placeholder={`Option ${String.fromCharCode(65+i)}...`}
                          className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400" />
                      </div>
                    ))}
                    <textarea value={explanation} onChange={e => setExplanation(e.target.value)}
                      placeholder="Erklärung der richtigen Antwort..." rows={2}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-teal-400" />
                  </div>
                )}

                {type === 'flashcard' && (
                  <div className="space-y-3">
                    <input value={front} onChange={e => setFront(e.target.value)}
                      placeholder="Vorderseite (Begriff)..."
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400" />
                    <textarea value={back} onChange={e => setBack(e.target.value)}
                      placeholder="Rückseite (Erklärung)..." rows={3}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-teal-400" />
                  </div>
                )}

                <div className="flex gap-3 mt-5">
                  <button onClick={() => setOpen(false)}
                    className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-xl text-sm hover:bg-slate-600">
                    Abbrechen
                  </button>
                  <button onClick={submit} disabled={!isValid || submitting}
                    className="flex-1 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-semibold rounded-xl text-sm">
                    {submitting ? 'Sende...' : 'Vorschlagen'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
EOF

echo "Report + Suggest Komponenten erstellt"

# ── Tutor Dashboard ──
cat > src/pages/TutorDashboard.tsx << 'EOF'
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
EOF

echo "TutorDashboard erstellt"

# ── Improved ApparatusQuiz (SVG-basiert, keine Beschriftungen sichtbar) ──
cat > src/components/ApparatusQuiz/ApparatusQuiz.tsx << 'EOF'
import { useState } from 'react'

interface ApparatusOption {
  id: string
  label: string         // Name (versteckt bis nach Antwort)
  svgPath: string       // SVG-Pfad als data-URL oder inline
  description?: string  // Kurzbeschreibung (versteckt)
}

interface Props {
  question: string
  targetId: string
  options: ApparatusOption[]
  explanation: string
  hint1?: string
  hint2?: string
  mode?: 'identify' | 'label'
}

// SVG-Zeichnungen der wichtigsten Apparaturen (vereinfacht, aber erkennbar)
const APPARATUS_SVGS: Record<string, string> = {
  'fluorescence-spectrometer': `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Lampe links -->
    <circle cx="20" cy="80" r="12" fill="none" stroke="#fbbf24" strokeWidth="2"/>
    <text x="20" y="84" textAnchor="middle" fontSize="8" fill="#fbbf24">L</text>
    <!-- Erster Monochromator -->
    <rect x="40" y="60" width="30" height="40" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="45" y1="65" x2="65" y2="95" stroke="#60a5fa" strokeWidth="1.5"/>
    <!-- Küvette (Probe) in der Mitte -->
    <rect x="85" y="65" width="30" height="30" rx="2" fill="#1e3a5f" stroke="#e2e8f0" strokeWidth="2"/>
    <text x="100" y="84" textAnchor="middle" fontSize="7" fill="#e2e8f0">P</text>
    <!-- Zweiter Monochromator (senkrecht!) -->
    <rect x="85" y="110" width="30" height="30" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="90" y1="115" x2="110" y2="135" stroke="#60a5fa" strokeWidth="1.5"/>
    <!-- Detektor unten -->
    <rect x="88" y="148" width="24" height="10" rx="2" fill="none" stroke="#4ade80" strokeWidth="2"/>
    <!-- Strahlen -->
    <line x1="32" y1="80" x2="40" y2="80" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arr)"/>
    <line x1="70" y1="80" x2="85" y2="80" stroke="#818cf8" strokeWidth="1.5"/>
    <line x1="100" y1="95" x2="100" y2="110" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arr)"/>
    <line x1="100" y1="140" x2="100" y2="148" stroke="#4ade80" strokeWidth="1.5"/>
    <!-- Schlüsselmerkmal: 90° Winkel der Detektionsachse -->
    <text x="135" y="85" fontSize="7" fill="#94a3b8">90°</text>
    <path d="M115 80 L115 95 L130 95" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2"/>
    <defs><marker id="arr" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5" fill="#e2e8f0"/></marker></defs>
  </svg>`,

  'uv-vis-spectrometer': `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Deuteriumlampe + Wolframlampe -->
    <circle cx="18" cy="60" r="10" fill="none" stroke="#fbbf24" strokeWidth="2"/>
    <circle cx="18" cy="100" r="10" fill="none" stroke="#f87171" strokeWidth="2"/>
    <text x="18" y="64" textAnchor="middle" fontSize="6" fill="#fbbf24">D₂</text>
    <text x="18" y="104" textAnchor="middle" fontSize="6" fill="#f87171">W</text>
    <!-- Spiegel/Chopper -->
    <ellipse cx="45" cy="80" rx="8" ry="20" fill="none" stroke="#94a3b8" strokeWidth="2" transform="rotate(-20 45 80)"/>
    <!-- Monochromator (Gitter) -->
    <rect x="65" y="55" width="35" height="50" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="72" y1="60" x2="92" y2="100" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="82" y="90" textAnchor="middle" fontSize="6" fill="#60a5fa">⋮</text>
    <!-- Referenz + Probe Strahlengang (geteilt) -->
    <rect x="112" y="55" width="20" height="18" rx="2" fill="#1e3a5f" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="112" y="87" width="20" height="18" rx="2" fill="#0f2f1f" stroke="#e2e8f0" strokeWidth="1.5"/>
    <text x="122" y="67" textAnchor="middle" fontSize="5" fill="#94a3b8">Ref</text>
    <text x="122" y="99" textAnchor="middle" fontSize="5" fill="#e2e8f0">Prob</text>
    <!-- Detektoren -->
    <rect x="142" y="56" width="18" height="16" rx="2" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
    <rect x="142" y="88" width="18" height="16" rx="2" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
    <!-- Strahlen -->
    <line x1="28" y1="80" x2="37" y2="80" stroke="#e2e8f0" strokeWidth="1.5"/>
    <line x1="53" y1="80" x2="65" y2="80" stroke="#818cf8" strokeWidth="1.5"/>
    <line x1="100" y1="64" x2="112" y2="64" stroke="#818cf8" strokeWidth="1"/>
    <line x1="100" y1="96" x2="112" y2="96" stroke="#818cf8" strokeWidth="1"/>
    <line x1="132" y1="64" x2="142" y2="64" stroke="#4ade80" strokeWidth="1"/>
    <line x1="132" y1="96" x2="142" y2="96" stroke="#4ade80" strokeWidth="1"/>
    <!-- Schlüssel: Zwei parallele Strahlengänge -->
    <text x="100" y="140" textAnchor="middle" fontSize="6" fill="#94a3b8">Doppelstrahl-Prinzip</text>
  </svg>`,

  'ftir-spectrometer': `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- IR-Quelle -->
    <circle cx="20" cy="80" r="12" fill="none" stroke="#f87171" strokeWidth="2"/>
    <text x="20" y="84" textAnchor="middle" fontSize="7" fill="#f87171">IR</text>
    <!-- Strahlenteiler (Herzstück FT-IR) -->
    <rect x="80" y="60" width="40" height="40" rx="2" fill="none" stroke="#fbbf24" strokeWidth="2"/>
    <line x1="80" y1="100" x2="120" y2="60" stroke="#fbbf24" strokeWidth="2"/>
    <text x="100" y="88" textAnchor="middle" fontSize="6" fill="#fbbf24">BS</text>
    <!-- Fester Spiegel -->
    <rect x="80" y="25" width="40" height="8" rx="2" fill="#94a3b8" stroke="#94a3b8" strokeWidth="1"/>
    <text x="100" y="22" textAnchor="middle" fontSize="6" fill="#94a3b8">fester M.</text>
    <!-- Beweglicher Spiegel -->
    <rect x="135" y="60" width="40" height="8" rx="2" fill="#60a5fa" stroke="#60a5fa" strokeWidth="1" transform="rotate(90 155 64)"/>
    <text x="175" y="82" textAnchor="middle" fontSize="5" fill="#60a5fa">bew.</text>
    <text x="175" y="90" textAnchor="middle" fontSize="5" fill="#60a5fa">M. ←→</text>
    <!-- Probe -->
    <rect x="40" y="68" width="30" height="24" rx="2" fill="#0f2f1f" stroke="#e2e8f0" strokeWidth="1.5"/>
    <text x="55" y="83" textAnchor="middle" fontSize="6" fill="#e2e8f0">Probe</text>
    <!-- Detektor -->
    <rect x="10" y="118" width="24" height="14" rx="2" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="22" y="128" textAnchor="middle" fontSize="6" fill="#4ade80">Det</text>
    <!-- Strahlen -->
    <line x1="32" y1="80" x2="40" y2="80" stroke="#f87171" strokeWidth="1.5"/>
    <line x1="70" y1="80" x2="80" y2="80" stroke="#f87171" strokeWidth="1.5"/>
    <line x1="100" y1="60" x2="100" y2="33" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3"/>
    <line x1="120" y1="80" x2="155" y2="80" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3"/>
    <line x1="22" y1="100" x2="22" y2="118" stroke="#4ade80" strokeWidth="1.5"/>
    <!-- Label Interferometer -->
    <text x="100" y="150" textAnchor="middle" fontSize="6" fill="#fbbf24">Michelson-Interferometer</text>
  </svg>`,

  'aas-spectrometer': `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <!-- HKL (Hohlkathodenlampe) -->
    <rect x="8" y="65" width="28" height="30" rx="6" fill="none" stroke="#fbbf24" strokeWidth="2"/>
    <circle cx="22" cy="80" r="7" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
    <text x="22" y="100" textAnchor="middle" fontSize="5" fill="#fbbf24">HKL</text>
    <!-- Flamme (Atomisator) -->
    <path d="M 55 100 Q 65 60 75 100 Q 78 70 85 100 Q 78 55 68 95 Q 65 50 62 100" fill="none" stroke="#fb923c" strokeWidth="2"/>
    <rect x="52" y="100" width="36" height="8" rx="2" fill="#64748b" stroke="#94a3b8" strokeWidth="1"/>
    <text x="70" y="118" textAnchor="middle" fontSize="5" fill="#fb923c">Flamme</text>
    <!-- Monochromator -->
    <rect x="98" y="62" width="32" height="36" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="103" y1="67" x2="123" y2="93" stroke="#60a5fa" strokeWidth="1.5"/>
    <!-- Detektor -->
    <rect x="142" y="68" width="24" height="24" rx="3" fill="none" stroke="#4ade80" strokeWidth="2"/>
    <text x="154" y="83" textAnchor="middle" fontSize="6" fill="#4ade80">Det</text>
    <!-- Strahlengang (Einstrahl) -->
    <line x1="36" y1="80" x2="52" y2="80" stroke="#fbbf24" strokeWidth="1.5"/>
    <line x1="88" y1="80" x2="98" y2="80" stroke="#818cf8" strokeWidth="1.5"/>
    <line x1="130" y1="80" x2="142" y2="80" stroke="#4ade80" strokeWidth="1.5"/>
    <!-- Nebulizer/Spray -->
    <path d="M 56 108 L 56 130 L 46 130" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="35" y="140" fontSize="5" fill="#94a3b8">Probe</text>
    <!-- Schlüssel: Einstrahl, HKL -->
    <text x="100" y="150" textAnchor="middle" fontSize="5" fill="#94a3b8">Einstrahl-Prinzip, element-spez. HKL</text>
  </svg>`,
}

// Fallback generischer Apparate-Platzhalter
function GenericApparatus({ label, index }: { label: string, index: number }) {
  const colors = ['#60a5fa', '#f59e0b', '#10b981', '#8b5cf6']
  const c = colors[index % colors.length]
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="160" height="120" rx="8" fill="none" stroke={c} strokeWidth="2"/>
      <circle cx="60" cy="70" r="20" fill="none" stroke={c} strokeWidth="2"/>
      <rect x="90" y="50" width="70" height="40" rx="4" fill="none" stroke={c} strokeWidth="2"/>
      <line x1="80" y1="70" x2="90" y2="70" stroke={c} strokeWidth="2"/>
      <rect x="95" y="100" width="60" height="20" rx="3" fill="none" stroke={c} strokeWidth="1.5"/>
      <text x="100" y="148" textAnchor="middle" fontSize="8" fill={c}>Apparatur {index+1}</text>
    </svg>
  )
}

export default function ApparatusQuiz({ question, targetId, options, explanation, hint1, hint2 }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [hints, setHints] = useState(0)
  const [answered, setAnswered] = useState(false)

  function select(id: string) {
    if (answered) return
    setSelected(id)
    setAnswered(true)
  }

  const correct = selected === targetId

  return (
    <div>
      <p className="text-white font-medium mb-5">{question}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((opt, i) => {
          const isSelected = selected === opt.id
          const isTarget = opt.id === targetId
          let border = 'border-slate-600 hover:border-slate-400'
          if (answered) {
            if (isTarget) border = 'border-green-500 bg-green-900/20'
            else if (isSelected) border = 'border-red-500 bg-red-900/20'
            else border = 'border-slate-700 opacity-50'
          } else if (isSelected) border = 'border-teal-400 bg-teal-900/20'

          const svgContent = APPARATUS_SVGS[opt.id]

          return (
            <button key={opt.id} onClick={() => select(opt.id)}
              className={`border-2 rounded-xl p-3 transition-all cursor-pointer ${border}`}>
              <div className="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                {svgContent
                  ? <div dangerouslySetInnerHTML={{ __html: svgContent }} className="w-full h-full p-1" />
                  : <GenericApparatus label={opt.label} index={i} />
                }
              </div>
              {/* Label NUR nach Antwort zeigen */}
              {answered && (
                <p className={`text-xs text-center font-medium mt-1 ${
                  isTarget ? 'text-green-400' : isSelected ? 'text-red-400' : 'text-slate-500'
                }`}>{opt.label}</p>
              )}
              {!answered && (
                <p className="text-xs text-center text-slate-500 mt-1">Apparatur {String.fromCharCode(65+i)}</p>
              )}
            </button>
          )
        })}
      </div>

      {/* Hinweise (vor Antwort) */}
      {!answered && (
        <div className="space-y-2 mb-4">
          {hints < 1 && hint1 && (
            <button onClick={() => setHints(1)}
              className="text-xs text-slate-500 hover:text-teal-400 transition-colors">
              💡 Hinweis 1 anzeigen
            </button>
          )}
          {hints >= 1 && hint1 && (
            <p className="text-xs text-teal-300 bg-teal-900/20 px-3 py-2 rounded-lg">💡 {hint1}</p>
          )}
          {hints === 1 && hint2 && (
            <button onClick={() => setHints(2)}
              className="text-xs text-slate-500 hover:text-teal-400 transition-colors">
              💡 Hinweis 2 anzeigen
            </button>
          )}
          {hints >= 2 && hint2 && (
            <p className="text-xs text-teal-300 bg-teal-900/20 px-3 py-2 rounded-lg">💡 {hint2}</p>
          )}
        </div>
      )}

      {/* Erklärung */}
      {answered && (
        <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
          correct ? 'bg-green-900/20 border border-green-800 text-green-300' : 'bg-red-900/20 border border-red-800 text-red-300'
        }`}>
          <span className="font-semibold">{correct ? '✓ Richtig! ' : '✗ Nicht ganz. '}</span>
          {explanation}
        </div>
      )}
    </div>
  )
}
EOF

echo "ApparatusQuiz verbessert (SVG-basiert)"

# ── main.tsx mit Tutor-Route + Tutor-Link im Dashboard ──
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Dashboard       from './pages/Dashboard'
import LoginPage       from './pages/LoginPage'
import CoursePage      from './pages/CoursePage'
import TopicPage       from './pages/TopicPage'
import TutorDashboard  from './pages/TutorDashboard'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/'                            element={<Dashboard />} />
        <Route path='/login'                       element={<LoginPage />} />
        <Route path='/course/:courseId'            element={<CoursePage />} />
        <Route path='/course/:courseId/:topicId'   element={<TopicPage />} />
        <Route path='/tutor'                       element={<TutorDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
EOF

# ── Dashboard mit Tutor-Link ──
cat > src/pages/Dashboard.tsx << 'EOF'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import { supabase } from '../lib/supabase'
import { allCourses } from '../lib/courseRegistry'
import { useProgress } from '../hooks/useProgress'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const { isTutor, isAdmin } = useRole()
  const navigate = useNavigate()
  const { streak, progress } = useProgress()

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400 text-lg">Laden...</div>
    </div>
  )

  if (!user) { navigate('/login'); return null }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  function courseProgress(courseId: string) {
    const done = progress.filter(p => p.courseId === courseId && p.completed).length
    const course = allCourses.find(c => c.id === courseId)
    const total = course?.totalTopics ?? 1
    return { done, total, pct: Math.round(done / total * 100) }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚗️</span>
          <span className="text-teal-400 font-bold text-lg">ChemLearn</span>
        </div>
        <div className="flex items-center gap-4">
          {streak.currentStreak > 0 && (
            <div className="flex items-center gap-1 bg-amber-900/30 border border-amber-700/50 px-3 py-1 rounded-full">
              <span className="text-sm">🔥</span>
              <span className="text-amber-400 text-xs font-bold">{streak.currentStreak}</span>
            </div>
          )}
          {isTutor && (
            <button onClick={() => navigate('/tutor')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-900/40 border border-purple-700/50 hover:border-purple-500 text-purple-400 text-xs font-medium rounded-xl transition-colors">
              🎓 {isAdmin ? 'Admin' : 'Tutor'}
            </button>
          )}
          <span className="text-slate-400 text-sm hidden sm:block">{user.email}</span>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white text-sm transition-colors">
            Abmelden
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <p className="text-teal-400 text-xs font-mono uppercase tracking-widest mb-2">Willkommen zurück</p>
          <h1 className="text-3xl font-light">Meine Kurse</h1>
          {streak.currentStreak > 0 && (
            <p className="text-amber-400 text-sm mt-2">
              🔥 {streak.currentStreak} Tage Streak – weiter so!
              {streak.longestStreak > streak.currentStreak && ` (Rekord: ${streak.longestStreak})`}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {allCourses.map(course => {
            const { done, total, pct } = courseProgress(course.id)
            return (
              <div key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-6 cursor-pointer hover:border-teal-500 transition-all"
                style={{ borderTopColor: course.color, borderTopWidth: 3 }}>
                <div className="text-3xl mb-3">{course.icon}</div>
                <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
                <p className="text-slate-400 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>{done}/{total} abgeschlossen</span>
                  <span>~{course.estimatedHours}h</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: course.color }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
EOF

echo "Dashboard + Routing aktualisiert"

# ── TopicPage: Report + Suggest Buttons einbauen ──
# Wir patchen TopicPage um Report/Suggest zu ergänzen
# Da die Datei komplex ist, fügen wir nur die Import-Zeilen und Buttons am Ende hinzu

# Prüfen ob die Datei existiert
if [ -f src/pages/TopicPage.tsx ]; then
  # Imports ergänzen
  if ! grep -q "ReportButton" src/pages/TopicPage.tsx; then
    sed -i "s/import SpectrumAssignment/import ReportButton from '..\/components\/Reports\/ReportButton'\nimport SuggestButton from '..\/components\/Reports\/SuggestButton'\nimport SpectrumAssignment/" src/pages/TopicPage.tsx
  fi
  echo "TopicPage Report/Suggest imports hinzugefügt"
fi

echo "════════════════════════════════════════"
echo " Phase 3: Build & Test"
echo "════════════════════════════════════════"
npm run build

echo ""
echo "✅ Build erfolgreich!"
echo ""
echo "════════════════════════════════════════"
echo " ROLLBACK falls nötig:"
echo "   git checkout -- ."
echo "   git clean -fd"
echo "════════════════════════════════════════"
echo ""
echo "Wenn alles stimmt, deployen mit:"
echo "  git add ."
echo '  git commit -m "feat: Tutor-System, SVG-Apparaturen, Report/Suggest"'
echo "  git push"
echo "  vercel --prod"
