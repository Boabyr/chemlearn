import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAttempts } from '../hooks/useAttempts'
import { examQuestionsFor, examStructuresFor, professorLabel, professorsFor } from '../data/exams'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'
import { stilFuer } from '../components/ExamMode/pruefStil'

type Mode = 'select' | 'exam' | 'result'

const DEFAULT_COURSE = 'analytical-chemistry-1'

/** Fragen je Prüferabschnitt in der Zufalls-Prüfung. */
const FRAGEN_JE_ABSCHNITT = 5


const PROF_ICONS: Record<string, string> = { lieberzeit: '🔭', koellensperger: '📊', gerner: '🧪' }
const labelFor = (p: string) => `${PROF_ICONS[p] ?? '📘'} ${professorLabel(p)}`

export default function ExamSimulator() {
  const { loading } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const courseId = params.get('course') ?? DEFAULT_COURSE

  const examQuestions = useMemo(() => examQuestionsFor(courseId), [courseId])
  const professoren = useMemo(() => professorsFor(courseId), [courseId])
  const examStructures = useMemo(() => examStructuresFor(courseId), [courseId])
  const { logAttempt, flush } = useAttempts(courseId)

  const [mode, setMode] = useState<Mode>('select')
  const [selectedExam, setSelectedExam] = useState(examStructures[0])
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  function startExam(exam: typeof examStructures[0]) {
    setSelectedExam(exam)
    setSectionIdx(0)
    setQIdx(0)
    setScores({})
    setAnswered({})
    setMode('exam')
  }

  function onAnswer(qId: string, correct: boolean, pts: number) {
    setScores(s => ({ ...s, [qId]: correct ? pts : 0 }))
    setAnswered(a => ({ ...a, [qId]: true }))

    const frage = examQuestions.find(q => q.id === qId)
    if (frage) {
      logAttempt({
        courseId,
        topicId: frage.topicId,
        questionId: frage.id,
        source: 'exam-sim',
        correct,
        pointsEarned: correct ? pts : 0,
        pointsPossible: frage.points,
      })
    }
  }

  const currentSection = selectedExam.sections[sectionIdx]
  const currentQId = currentSection?.questionIds[qIdx]
  const currentQ = examQuestions.find(q => q.id === currentQId)

  function nextQ() {
    if (qIdx < currentSection.questionIds.length - 1) {
      setQIdx(i => i + 1)
    } else if (sectionIdx < selectedExam.sections.length - 1) {
      setSectionIdx(i => i + 1)
      setQIdx(0)
    } else {
      void flush()
      setMode('result')
    }
  }

  // Ergebnisberechnung
  const sectionScores = selectedExam.sections.map(sec => ({
    professor: sec.professor,
    earned: sec.questionIds.reduce((s, id) => s + (scores[id] ?? 0), 0),
    max: sec.points,
    passing: sec.passingPoints,
    passed: sec.questionIds.reduce((s, id) => s + (scores[id] ?? 0), 0) >= sec.passingPoints,
  }))

  const totalEarned = sectionScores.reduce((s, sec) => s + sec.earned, 0)
  const allSectionsPassed = sectionScores.every(s => s.passed)
  const passed = totalEarned >= selectedExam.passingPoints && allSectionsPassed

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center"><div className="text-accent">Laden...</div></div>


  return (
    <div className="min-h-screen bg-surface text-ink">
      <nav className="bg-raised border-b border-line px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-muted hover:text-ink">← Dashboard</button>
          <span className="text-accent font-mono text-xs uppercase tracking-widest">📝 Prüfungssimulator</span>
        </div>
        {mode === 'exam' && (
          <div className="text-xs text-muted">
            {labelFor(currentSection.professor)} · Frage {qIdx+1}/{currentSection.questionIds.length}
          </div>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* AUSWAHL */}
        {mode === 'select' && (
          <div>
            <h1 className="text-2xl font-light mb-2">Prüfungssimulator</h1>
            <p className="text-muted text-sm mb-8">Simuliere eine echte AC1-Prüfung mit originalem Aufbau.</p>

            <div className="bg-warning/10 border border-warning rounded-xl px-5 py-4 mb-6 text-sm text-warning">
              <span className="font-semibold">Prüfungsregeln:</span> Alle 3 Teile müssen mit mindestens 12 Punkten bestanden werden UND insgesamt mind. 36 Punkte erreicht werden.
            </div>

            <div className="space-y-4">
              {examStructures.map(exam => (
                <div key={exam.id} className="bg-raised border border-line hover:border-accent rounded-2xl p-6 cursor-pointer transition-all"
                  onClick={() => startExam(exam)}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{exam.title}</h3>
                      <p className="text-muted text-sm">{exam.date}</p>
                    </div>
                    <span className="text-accent font-mono text-sm">{exam.totalPoints}P</span>
                  </div>
                  <div className="flex gap-2">
                    {exam.sections.map(sec => (
                      <span key={sec.professor} className={`text-xs px-3 py-1 rounded-full ${stilFuer(sec.professor).chip}`}>
                        {labelFor(sec.professor)} ({sec.points}P)
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-raised border border-line hover:border-purple-500 rounded-2xl p-6 cursor-pointer transition-all"
                onClick={() => {
                  // Punkte aus den tatsächlich gezogenen Fragen summieren.
                  // Vorher standen hier fest 72 Gesamt- und 3x24 Abschnittspunkte —
                  // eine Grenze, die der gezogene Satz gar nicht erreichen konnte.
                  const gemischt = [...examQuestions].sort(() => Math.random() - 0.5)
                  const abschnitte = professoren.map(prof => {
                    const fragen = gemischt.filter(q => q.professor === prof).slice(0, FRAGEN_JE_ABSCHNITT)
                    const punkte = fragen.reduce((summe, q) => summe + q.points, 0)
                    return {
                      professor: prof,
                      points: punkte,
                      passingPoints: Math.ceil(punkte / 2),
                      questionIds: fragen.map(q => q.id),
                    }
                  }).filter(a => a.questionIds.length > 0)

                  const gesamt = abschnitte.reduce((summe, a) => summe + a.points, 0)
                  startExam({
                    id: 'random',
                    date: 'Zufällig generiert',
                    title: 'Zufalls-Prüfung',
                    totalPoints: gesamt,
                    passingPoints: Math.ceil(gesamt / 2),
                    sections: abschnitte,
                  })
                }}>
                <h3 className="font-semibold text-purple-300">🎲 Zufalls-Prüfung</h3>
                <p className="text-muted text-sm mt-1">Neue Fragen aus dem Fragenkatalog, original Prüfungsstruktur</p>
              </div>
            </div>
          </div>
        )}

        {/* PRÜFUNG */}
        {mode === 'exam' && currentQ && (
          <div>
            {/* Abschnitts-Header */}
            <div className={`mb-6 px-5 py-4 rounded-xl border ${stilFuer(currentSection.professor).panel}`}>
              <p className={`text-sm font-semibold ${stilFuer(currentSection.professor).text}`}>
                {labelFor(currentSection.professor)} – Teil {sectionIdx+1} von {selectedExam.sections.length}
              </p>
              <div className="mt-2 h-1.5 bg-sunken rounded-full">
                <div className={`h-full ${stilFuer(currentSection.professor).bar} rounded-full transition-all`}
                  style={{ width: `${(qIdx/currentSection.questionIds.length)*100}%` }} />
              </div>
            </div>

            <ExamQuestionCard
              key={currentQId}
              question={currentQ}
              onAnswer={(correct, pts) => onAnswer(currentQId, correct, pts)}
            />

            <button onClick={nextQ}
              disabled={!answered[currentQId]}
              className="mt-4 w-full py-3 bg-sunken border border-line hover:border-subtle disabled:opacity-40 disabled:cursor-not-allowed text-muted font-semibold rounded-xl text-sm transition-colors">
              {qIdx < currentSection.questionIds.length - 1 ? 'Nächste Frage →' :
               sectionIdx < selectedExam.sections.length - 1 ? `Weiter zu ${labelFor(selectedExam.sections[sectionIdx+1].professor)} →` :
               'Prüfung abschließen →'}
            </button>
          </div>
        )}

        {/* ERGEBNIS */}
        {mode === 'result' && (
          <div>
            <div className={`text-center py-10 rounded-2xl mb-6 ${passed ? 'bg-success/10 border border-success' : 'bg-danger/10 border border-danger'}`}>
              <div className="text-5xl mb-3">{passed ? '🎓' : '📚'}</div>
              <h2 className={`text-2xl font-light mb-1 ${passed ? 'text-success' : 'text-danger'}`}>
                {passed ? 'Bestanden!' : 'Nicht bestanden'}
              </h2>
              <p className="text-4xl font-bold mt-3" style={{ color: passed ? 'var(--c-success)' : 'var(--c-danger)' }}>
                {totalEarned} / {selectedExam.totalPoints}P
              </p>
              <p className="text-muted text-sm mt-2">
                {Math.round(totalEarned/selectedExam.totalPoints*100)}% – 
                Bestehensgrenze: {selectedExam.passingPoints}P gesamt + {selectedExam.sections[0].passingPoints}P/Teil
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {sectionScores.map(sec => (
                <div key={sec.professor} className={`flex items-center justify-between px-5 py-4 rounded-xl border ${
                  sec.passed ? 'border-success bg-success/10' : 'border-danger bg-danger/10'
                }`}>
                  <div>
                    <span className={`font-semibold ${stilFuer(sec.professor).text}`}>
                      {labelFor(sec.professor)}
                    </span>
                    <span className="text-subtle text-xs ml-2">(min. {sec.passing}P)</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${sec.passed ? 'text-success' : 'text-danger'}`}>
                      {sec.earned}/{sec.max}P
                    </span>
                    <span className="ml-2 text-lg">{sec.passed ? '✓' : '✗'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setMode('select')}
                className="flex-1 py-3 bg-accent hover:bg-accent-strong text-on-accent font-semibold rounded-xl text-sm transition-colors">
                Neue Prüfung
              </button>
              <button onClick={() => navigate('/practice')}
                className="flex-1 py-3 bg-sunken border border-line text-muted font-semibold rounded-xl text-sm transition-colors">
                Übungsmodus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
