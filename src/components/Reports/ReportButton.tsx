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
