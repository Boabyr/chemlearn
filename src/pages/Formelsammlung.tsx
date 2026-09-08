import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Formelliste from '../components/Formelsammlung/Formelliste'
import { useAuth } from '../hooks/useAuth'
import { kursMit, loadAllTopics, spracheVon } from '../lib/courseRegistry'
import { formelnAusThemen, gruppiereFormeln, type Formeleintrag } from '../lib/formelsammlung'

/** Alle Formeln eines Kurses auf einer Seite, nach Stoffgebieten sortiert. */
export default function Formelsammlung() {
  const { courseId } = useParams()
  const { loading } = useAuth()
  const [eintraege, setEintraege] = useState<Formeleintrag[]>([])

  const course = useMemo(() => (courseId ? kursMit(courseId) ?? null : null), [courseId])

  useEffect(() => {
    if (!courseId) return
    let aktuell = true
    loadAllTopics(courseId)
      .then(themen => { if (aktuell) setEintraege(formelnAusThemen(themen)) })
      .catch(() => {})
    return () => { aktuell = false }
  }, [courseId])

  const gruppen = useMemo(
    () => gruppiereFormeln(eintraege, course?.ordnung),
    [eintraege, course],
  )

  if (loading || !course) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-accent">Laden...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-surface text-ink">
      <nav className="bg-raised border-b border-line px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link to={`/course/${course.id}`} className="text-muted hover:text-ink transition-colors">
          ← Zurück zum Kurs
        </Link>
        <span className="text-accent font-mono text-xs uppercase tracking-widest">Formelsammlung</span>
      </nav>

      <main lang={spracheVon(course.id)} className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-light mb-1">📐 Formelsammlung</h1>
          <p className="text-muted text-sm">{course.title} — alle Gleichungen der Themen auf einen Blick</p>
        </div>

        <Formelliste courseId={course.id} gruppen={gruppen} />
      </main>
    </div>
  )
}
