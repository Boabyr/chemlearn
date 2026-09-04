import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAttempts } from '../hooks/useAttempts'
import { useReviews } from '../hooks/useReviews'
import { frageItemId } from '../lib/learning/lernItem'
import { GRADES } from '../lib/learning/sm2'
import { examQuestionsFor, examStructuresFor, gruppenAnzeige, gruppenFuer, courseIdsWithExams } from '../data/exams'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'
import { stilFuer } from '../components/ExamMode/pruefStil'
import { kursMit } from '../lib/courseRegistry'

type Mode = 'select' | 'exam' | 'result'

/** Fragen je Gruppenabschnitt in der Zufalls-Prüfung. */
const FRAGEN_JE_ABSCHNITT = 5

/**
 * Zeitbudget: eine Minute je Punkt, mindestens eine Viertelstunde.
 *
 * Die Kursseite versprach „ganze Prüfung unter Zeitdruck", es gab aber keinen
 * Timer — der einzige Unterschied zum Übungsmodus fehlte damit ganz.
 */
function minutenFuer(gesamtPunkte: number): number {
  return Math.max(15, gesamtPunkte)
}

function alsUhrzeit(sekunden: number): string {
  const m = Math.floor(Math.max(0, sekunden) / 60)
  const s = Math.max(0, sekunden) % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function ExamSimulator() {
  const { loading } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  // Ohne Kursangabe das erste Fach mit Prüfungsdaten — kein fest verdrahtetes AC1 mehr.
  const courseId = params.get('course') ?? courseIdsWithExams()[0] ?? ''

  const examQuestions = useMemo(() => examQuestionsFor(courseId), [courseId])
  const professoren = useMemo(() => gruppenFuer(courseId), [courseId])
  const kursTitel = kursMit(courseId)?.title ?? 'diesem Kurs'
  const examStructures = useMemo(() => examStructuresFor(courseId), [courseId])
  const { logAttempt, flush } = useAttempts(courseId)
  const { gradeItem } = useReviews(courseId)

  const [mode, setMode] = useState<Mode>('select')
  const [selectedExam, setSelectedExam] = useState(examStructures[0])
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [answered, setAnswered] = useState<Record<string, boolean>>({})
  const [restSekunden, setRestSekunden] = useState(0)
  const [zeitAbgelaufen, setZeitAbgelaufen] = useState(false)

  function startExam(exam: typeof examStructures[0]) {
    setSelectedExam(exam)
    setSectionIdx(0)
    setQIdx(0)
    setScores({})
    setAnswered({})
    setRestSekunden(minutenFuer(exam.totalPoints) * 60)
    setZeitAbgelaufen(false)
    setMode('exam')
  }

  // Countdown. Bei null ist die Prüfung vorbei, wie im Hörsaal.
  useEffect(() => {
    if (mode !== 'exam') return
    const uhr = setInterval(() => {
      setRestSekunden(rest => {
        if (rest <= 1) {
          clearInterval(uhr)
          setZeitAbgelaufen(true)
          setMode('result')
          return 0
        }
        return rest - 1
      })
    }, 1000)
    return () => clearInterval(uhr)
  }, [mode])

  function onAnswer(qId: string, correct: boolean, pts: number) {
    // Teilpunkte zählen mit — vorher fiel eine halb richtige Antwort auf null.
    setScores(s => ({ ...s, [qId]: pts }))
    setAnswered(a => ({ ...a, [qId]: true }))

    const frage = examQuestions.find(q => q.id === qId)
    if (!frage) return

    logAttempt({
      courseId,
      topicId: frage.topicId,
      questionId: frage.id,
      source: 'exam-sim',
      correct,
      pointsEarned: pts,
      pointsPossible: frage.points,
    })

    // Auch der Simulator füttert die Planung. Vorher protokollierte er nur
    // und beeinflusste die Wiederholung mit keinem Wert.
    void gradeItem(
      { itemType: 'question', itemId: frageItemId(frage.id), topicId: frage.topicId, courseId },
      correct ? GRADES.GUT : GRADES.NOCHMAL,
    )
  }

  const alleFragenDerPruefung = useMemo(
    () => selectedExam
      ? selectedExam.sections.flatMap(a => a.questionIds)
        .map(id => examQuestions.find(q => q.id === id))
        .filter((q): q is NonNullable<typeof q> => !!q)
      : [],
    [selectedExam, examQuestions],
  )

  const falscheFragen = alleFragenDerPruefung.filter(q => (scores[q.id] ?? 0) < q.points)

  /** Aus den nicht voll gepunkteten Fragen eine kurze Nachrunde bauen. */
  function falscheWiederholen() {
    if (falscheFragen.length === 0) return
    const jeAbschnitt = new Map<string, typeof falscheFragen>()
    for (const frage of falscheFragen) {
      if (!jeAbschnitt.has(frage.gruppe)) jeAbschnitt.set(frage.gruppe, [])
      jeAbschnitt.get(frage.gruppe)!.push(frage)
    }
    const sections = [...jeAbschnitt.entries()].map(([gruppe, fragen]) => {
      const punkte = fragen.reduce((summe, q) => summe + q.points, 0)
      return { gruppe, points: punkte, passingPoints: Math.ceil(punkte / 2), questionIds: fragen.map(q => q.id) }
    })
    const gesamt = sections.reduce((summe, a) => summe + a.points, 0)
    startExam({
      id: 'nachrunde',
      date: 'Nachrunde',
      title: 'Nur die falschen',
      totalPoints: gesamt,
      passingPoints: Math.ceil(gesamt / 2),
      sections,
    })
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
    gruppe: sec.gruppe,
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
            {gruppenAnzeige(currentSection.gruppe, courseId)} · Frage {qIdx+1}/{currentSection.questionIds.length}
          </div>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* AUSWAHL */}
        {mode === 'select' && (
          <div>
            <h1 className="text-2xl font-light mb-2">Prüfungssimulator</h1>
            {/* Regeln aus der Prüfung selbst, nicht aus einem Kurs abgeschrieben.
                Vorher stand hier fest "AC1", "3 Teile" und "36 Punkte" — auch
                für Kurse, auf die nichts davon zutrifft. */}
            <p className="text-muted text-sm mb-8">
              {examStructures.length > 0
                ? `Nachgestellte Prüfung aus ${kursTitel} mit originalem Aufbau.`
                : `Für ${kursTitel} gibt es noch keine nachgestellte Prüfung — die Zufalls-Prüfung stellt eine Runde aus dem Fragenkatalog zusammen.`}
            </p>

            {examStructures.length > 0 && (
              <div className="bg-warning/10 border border-warning rounded-xl px-5 py-4 mb-6 text-sm text-warning">
                <span className="font-semibold">Prüfungsregeln:</span>{' '}
                {(() => {
                  const erste = examStructures[0]
                  const teile = erste.sections.length
                  return `Alle ${teile} ${teile === 1 ? 'Teil' : 'Teile'} müssen einzeln bestanden werden `
                    + `(mindestens ${erste.sections[0].passingPoints} Punkte) und insgesamt mindestens `
                    + `${erste.passingPoints} von ${erste.totalPoints} Punkten.`
                })()}
              </div>
            )}

            <div className="space-y-4">
              {examStructures.map(exam => (
                <button key={exam.id} type="button"
                  className="w-full text-left bg-raised border border-line hover:border-accent rounded-2xl p-6 transition-all"
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
                      <span key={sec.gruppe} className={`text-xs px-3 py-1 rounded-full ${stilFuer(sec.gruppe).chip}`}>
                        {gruppenAnzeige(sec.gruppe, courseId)} ({sec.points}P)
                      </span>
                    ))}
                  </div>
                </button>
              ))}

              <button type="button"
                className="w-full text-left bg-raised border border-line hover:border-purple-500 rounded-2xl p-6 transition-all"
                onClick={() => {
                  // Punkte aus den tatsächlich gezogenen Fragen summieren.
                  // Vorher standen hier fest 72 Gesamt- und 3x24 Abschnittspunkte —
                  // eine Grenze, die der gezogene Satz gar nicht erreichen konnte.
                  const gemischt = [...examQuestions].sort(() => Math.random() - 0.5)
                  const abschnitte = professoren.map(prof => {
                    const fragen = gemischt.filter(q => q.gruppe === prof).slice(0, FRAGEN_JE_ABSCHNITT)
                    const punkte = fragen.reduce((summe, q) => summe + q.points, 0)
                    return {
                      gruppe: prof,
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
              </button>
            </div>
          </div>
        )}

        {/* PRÜFUNG */}
        {mode === 'exam' && currentQ && (
          <div>
            {/* Abschnitts-Header */}
            <div className={`mb-6 px-5 py-4 rounded-xl border ${stilFuer(currentSection.gruppe).panel}`}>
              <div className="flex items-center justify-between gap-3">
                <p className={`text-sm font-semibold ${stilFuer(currentSection.gruppe).text}`}>
                  {gruppenAnzeige(currentSection.gruppe, courseId)} – Teil {sectionIdx+1} von {selectedExam.sections.length}
                </p>
                <p role="timer" aria-label="Verbleibende Zeit"
                  className={`font-mono text-sm tabular-nums ${restSekunden <= 300 ? 'text-danger' : 'text-muted'}`}>
                  ⏱ {alsUhrzeit(restSekunden)}
                </p>
              </div>
              <div className="mt-2 h-1.5 bg-sunken rounded-full">
                <div className={`h-full ${stilFuer(currentSection.gruppe).bar} rounded-full transition-all`}
                  style={{ width: `${(qIdx/currentSection.questionIds.length)*100}%` }} />
              </div>
            </div>

            <ExamQuestionCard
              courseId={courseId}
              key={currentQId}
              question={currentQ}
              onAnswer={(correct, pts) => onAnswer(currentQId, correct, pts)}
            />

            <button onClick={nextQ}
              disabled={!answered[currentQId]}
              className="mt-4 w-full py-3 bg-sunken border border-line hover:border-subtle disabled:opacity-40 disabled:cursor-not-allowed text-muted font-semibold rounded-xl text-sm transition-colors">
              {qIdx < currentSection.questionIds.length - 1 ? 'Nächste Frage →' :
               sectionIdx < selectedExam.sections.length - 1 ? `Weiter zu ${gruppenAnzeige(selectedExam.sections[sectionIdx+1].gruppe, courseId)} →` :
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
              {zeitAbgelaufen && (
                <p className="mt-3 text-sm text-warning" role="status">
                  ⏱ Zeit abgelaufen — unbeantwortete Fragen zählen als null Punkte.
                </p>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {sectionScores.map(sec => (
                <div key={sec.gruppe} className={`flex items-center justify-between px-5 py-4 rounded-xl border ${
                  sec.passed ? 'border-success bg-success/10' : 'border-danger bg-danger/10'
                }`}>
                  <div>
                    <span className={`font-semibold ${stilFuer(sec.gruppe).text}`}>
                      {gruppenAnzeige(sec.gruppe, courseId)}
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

            {/* Fragenliste statt nur Abschnittssummen: sichtbar machen, was
                schiefging — sonst weiß man nur, dass es schiefging. */}
            <details className="mb-6 rounded-2xl border border-line bg-raised p-5" open={falscheFragen.length > 0}>
              <summary className="cursor-pointer text-sm font-medium text-ink">
                Fragen im Einzelnen ({falscheFragen.length} nicht voll gepunktet)
              </summary>
              <ul className="mt-4 space-y-2">
                {alleFragenDerPruefung.map(frage => {
                  const erreicht = scores[frage.id] ?? 0
                  const voll = erreicht >= frage.points
                  return (
                    <li key={frage.id} className="flex items-start gap-3 border-b border-line pb-2 text-sm last:border-0">
                      <span className={voll ? 'text-success' : 'text-danger'}>{voll ? '✓' : '✗'}</span>
                      <span className="flex-1 text-muted">{frage.question}</span>
                      <span className="font-mono text-xs text-subtle">{erreicht}/{frage.points}P</span>
                    </li>
                  )
                })}
              </ul>
            </details>

            <div className="flex flex-wrap gap-3">
              {falscheFragen.length > 0 && (
                <button onClick={falscheWiederholen}
                  className="flex-1 rounded-xl bg-warning/20 border border-warning py-3 text-sm font-semibold text-warning transition-colors hover:bg-warning/30">
                  Nur die {falscheFragen.length} falschen nochmal
                </button>
              )}
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
