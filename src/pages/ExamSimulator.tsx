import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { examQuestions, examStructures } from '../data/examQuestions'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'

type Mode = 'select' | 'exam' | 'result'

export default function ExamSimulator() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('select')
  const [selectedExam, setSelectedExam] = useState(examStructures[0])
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

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

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-teal-400">Laden...</div></div>

  const profColors = { lieberzeit: 'teal', koellensperger: 'blue', gerner: 'purple' }
  const profLabels = { lieberzeit: '🔭 Lieberzeit', koellensperger: '📊 Köllensperger', gerner: '🧪 Gerner' }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white">← Dashboard</button>
          <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">📝 Prüfungssimulator</span>
        </div>
        {mode === 'exam' && (
          <div className="text-xs text-slate-400">
            {profLabels[currentSection.professor]} · Frage {qIdx+1}/{currentSection.questionIds.length}
          </div>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* AUSWAHL */}
        {mode === 'select' && (
          <div>
            <h1 className="text-2xl font-light mb-2">Prüfungssimulator</h1>
            <p className="text-slate-400 text-sm mb-8">Simuliere eine echte AC1-Prüfung mit originalem Aufbau.</p>

            <div className="bg-amber-900/20 border border-amber-700 rounded-xl px-5 py-4 mb-6 text-sm text-amber-300">
              <span className="font-semibold">Prüfungsregeln:</span> Alle 3 Teile müssen mit mindestens 12 Punkten bestanden werden UND insgesamt mind. 36 Punkte erreicht werden.
            </div>

            <div className="space-y-4">
              {examStructures.map(exam => (
                <div key={exam.id} className="bg-slate-800 border border-slate-700 hover:border-teal-500 rounded-2xl p-6 cursor-pointer transition-all"
                  onClick={() => startExam(exam)}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{exam.title}</h3>
                      <p className="text-slate-400 text-sm">{exam.date}</p>
                    </div>
                    <span className="text-teal-400 font-mono text-sm">{exam.totalPoints}P</span>
                  </div>
                  <div className="flex gap-2">
                    {exam.sections.map(sec => (
                      <span key={sec.professor} className={`text-xs px-3 py-1 rounded-full bg-${profColors[sec.professor]}-900/40 text-${profColors[sec.professor]}-400`}>
                        {profLabels[sec.professor]} ({sec.points}P)
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-2xl p-6 cursor-pointer transition-all"
                onClick={() => {
                  // Zufällige Prüfung aus allen Fragen
                  const shuffled = [...examQuestions].sort(() => Math.random() - 0.5)
                  const byProf = {
                    lieberzeit: shuffled.filter(q => q.professor === 'lieberzeit').slice(0, 5),
                    koellensperger: shuffled.filter(q => q.professor === 'koellensperger').slice(0, 5),
                    gerner: shuffled.filter(q => q.professor === 'gerner').slice(0, 5),
                  }
                  startExam({
                    id: 'random',
                    date: 'Zufällig generiert',
                    title: 'Zufalls-Prüfung',
                    totalPoints: 72,
                    passingPoints: 36,
                    sections: [
                      { professor: 'lieberzeit', points: 24, passingPoints: 12, questionIds: byProf.lieberzeit.map(q => q.id) },
                      { professor: 'koellensperger', points: 24, passingPoints: 12, questionIds: byProf.koellensperger.map(q => q.id) },
                      { professor: 'gerner', points: 24, passingPoints: 12, questionIds: byProf.gerner.map(q => q.id) },
                    ],
                  })
                }}>
                <h3 className="font-semibold text-purple-300">🎲 Zufalls-Prüfung</h3>
                <p className="text-slate-400 text-sm mt-1">Neue Fragen aus dem Fragenkatalog, original Prüfungsstruktur</p>
              </div>
            </div>
          </div>
        )}

        {/* PRÜFUNG */}
        {mode === 'exam' && currentQ && (
          <div>
            {/* Abschnitts-Header */}
            <div className={`mb-6 px-5 py-4 rounded-xl bg-${profColors[currentSection.professor]}-900/20 border border-${profColors[currentSection.professor]}-800`}>
              <p className={`text-sm font-semibold text-${profColors[currentSection.professor]}-400`}>
                {profLabels[currentSection.professor]} – Teil {sectionIdx+1} von {selectedExam.sections.length}
              </p>
              <div className="mt-2 h-1.5 bg-slate-700 rounded-full">
                <div className={`h-full bg-${profColors[currentSection.professor]}-500 rounded-full transition-all`}
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
              className="mt-4 w-full py-3 bg-slate-700 border border-slate-600 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-semibold rounded-xl text-sm transition-colors">
              {qIdx < currentSection.questionIds.length - 1 ? 'Nächste Frage →' :
               sectionIdx < selectedExam.sections.length - 1 ? `Weiter zu ${profLabels[selectedExam.sections[sectionIdx+1].professor]} →` :
               'Prüfung abschließen →'}
            </button>
          </div>
        )}

        {/* ERGEBNIS */}
        {mode === 'result' && (
          <div>
            <div className={`text-center py-10 rounded-2xl mb-6 ${passed ? 'bg-green-900/20 border border-green-700' : 'bg-red-900/20 border border-red-800'}`}>
              <div className="text-5xl mb-3">{passed ? '🎓' : '📚'}</div>
              <h2 className={`text-2xl font-light mb-1 ${passed ? 'text-green-400' : 'text-red-400'}`}>
                {passed ? 'Bestanden!' : 'Nicht bestanden'}
              </h2>
              <p className="text-4xl font-bold mt-3" style={{ color: passed ? '#4ade80' : '#f87171' }}>
                {totalEarned} / {selectedExam.totalPoints}P
              </p>
              <p className="text-slate-400 text-sm mt-2">
                {Math.round(totalEarned/selectedExam.totalPoints*100)}% – 
                Bestehensgrenze: {selectedExam.passingPoints}P gesamt + {selectedExam.sections[0].passingPoints}P/Teil
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {sectionScores.map(sec => (
                <div key={sec.professor} className={`flex items-center justify-between px-5 py-4 rounded-xl border ${
                  sec.passed ? 'border-green-700 bg-green-900/10' : 'border-red-700 bg-red-900/10'
                }`}>
                  <div>
                    <span className={`font-semibold text-${profColors[sec.professor]}-400`}>
                      {profLabels[sec.professor]}
                    </span>
                    <span className="text-slate-500 text-xs ml-2">(min. {sec.passing}P)</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${sec.passed ? 'text-green-400' : 'text-red-400'}`}>
                      {sec.earned}/{sec.max}P
                    </span>
                    <span className="ml-2 text-lg">{sec.passed ? '✓' : '✗'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setMode('select')}
                className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm transition-colors">
                Neue Prüfung
              </button>
              <button onClick={() => navigate('/practice')}
                className="flex-1 py-3 bg-slate-700 border border-slate-600 text-slate-300 font-semibold rounded-xl text-sm transition-colors">
                Übungsmodus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
