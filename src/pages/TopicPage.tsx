import { Suspense, lazy, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { kursMit, loadTopic } from '../lib/courseRegistry'
import { zuletztMerken } from '../lib/zuletzt'
import { useProgress } from '../hooks/useProgress'
import { useAttempts } from '../hooks/useAttempts'
import { useReviews, cardItemId } from '../hooks/useReviews'
import { frageItemId } from '../lib/learning/lernItem'
import { GRADES, type Grade } from '../lib/learning/sm2'
import type { Thema } from '../content/schema'
import MechanismusAufgabe from '../components/Mechanismus/MechanismusAufgabe'
import FormulaCalculator from '../components/FormulaCalculator/FormulaCalculator'
import ApparatusQuiz from '../components/ApparatusQuiz/ApparatusQuiz'
import ApparaturZuordnung from '../components/Apparatus/ApparaturZuordnung'
import Formeltext from '../components/Theory/Formeltext'
import ReportButton from '../components/Reports/ReportButton'
import SuggestButton from '../components/Reports/SuggestButton'
import SpectrumAssignment from '../components/SpectrumAssignment/SpectrumAssignment'
import { ampelText } from '../lib/scoreColor'
import { richtige, prozent } from '../lib/learning/quizScore'

// Markdown- und Formelsatz wiegen schwer und werden nur im Theorie-Reiter gebraucht.
const TheoryRenderer = lazy(() => import('../components/Theory/TheoryRenderer'))

export default function TopicPage() {
  const { courseId, topicId } = useParams()
  const { loading } = useAuth()
  const navigate = useNavigate()
  const { markTopicSeen, markTopicComplete } = useProgress(courseId)
  const kurs = kursMit(courseId ?? '')
  const sprache = kurs?.sprache ?? 'de'
  const formelsatz = kurs?.formelsatz ?? 'chemie'
  const { logAttempt, flush } = useAttempts(courseId)
  const { gradeItem } = useReviews(courseId)
  const [topic, setTopic] = useState<Thema | null>(null)
  const [tab, setTab] = useState<'theory' | 'quiz' | 'flashcards'>('theory')
  const [quizIdx, setQuizIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [ergebnisse, setErgebnisse] = useState<boolean[]>([])
  const [quizDone, setQuizDone] = useState(false)
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [gradedCards, setGradedCards] = useState<Record<number, Grade>>({})
  const [questionStart, setQuestionStart] = useState(() => Date.now())

  useEffect(() => {
    if (courseId && topicId) {
      loadTopic(courseId, topicId)
        .then(t => {
          setTopic(t)
          markTopicSeen(topicId, courseId)
          zuletztMerken({ courseId, topicId, titel: t.title })
        })
        .catch(() => navigate(`/course/${courseId}`))
    }
  }, [courseId, topicId, markTopicSeen, navigate])

  // Quizantwort per Zahlentaste wählen.
  useEffect(() => {
    function beiTaste(e: KeyboardEvent) {
      const frage = topic?.quiz[quizIdx]
      if (tab !== 'quiz' || answered || quizDone || !frage) return
      const ziel = e.target as HTMLElement | null
      if (ziel && ['INPUT', 'TEXTAREA'].includes(ziel.tagName)) return
      const nummer = Number(e.key)
      if (!Number.isInteger(nummer) || nummer < 1 || nummer > frage.options.length) return
      e.preventDefault()
      setSelected(nummer - 1)
    }
    window.addEventListener('keydown', beiTaste)
    return () => window.removeEventListener('keydown', beiTaste)
  })


  if (loading || !topic) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-accent text-lg">Laden...</div>
    </div>
  )

  const q = topic.quiz[quizIdx]

  function handleAnswer() {
    if (selected === null || !courseId || !topicId) return
    const richtig = selected === q.correct
    setAnswered(true)
    setErgebnisse(bisher => [...bisher, richtig])

    logAttempt({
      courseId,
      topicId,
      questionId: `${topicId}:${q.id}`,
      source: 'topic-quiz',
      correct: richtig,
      msTaken: Date.now() - questionStart,
    })

    // Auch Quizfragen kommen in die Wiederholungsplanung, damit sie in der
    // Tagesrunde auftauchen können.
    void gradeItem(
      { itemType: 'question', itemId: frageItemId(`${topicId}:${q.id}`), topicId, courseId },
      richtig ? GRADES.GUT : GRADES.NOCHMAL,
    )
  }

  function nextQuestion() {
    if (topic && quizIdx < topic.quiz.length - 1) {
      setQuizIdx(i => i + 1)
      setSelected(null)
      setAnswered(false)
      setQuestionStart(Date.now())
    } else {
      setQuizDone(true)
      void flush()
      if (courseId && topicId && topic) {
        markTopicComplete(topicId, courseId, prozent(ergebnisse, topic.quiz.length))
      }
    }
  }

  function resetQuiz() {
    setQuizIdx(0)
    setSelected(null)
    setAnswered(false)
    setErgebnisse([])
    setQuizDone(false)
    setQuestionStart(Date.now())
  }

  /**
   * Ergebnis eines Interaktivteils festhalten.
   *
   * Bis hierher zeichneten Apparaturquiz, Formelrechner, Spektren und
   * Mechanismen gar nichts auf — die Übung war für den Lernstand unsichtbar.
   */
  function interaktivFertig(index: number, typ: string, korrekt: boolean) {
    if (!courseId || !topicId) return
    logAttempt({
      courseId,
      topicId,
      // Die Position gehört in die Kennung: ein Thema darf zweimal denselben
      // Typ tragen, und zwei Übungen dürfen sich nicht überschreiben.
      questionId: `${topicId}:interaktiv:${index}:${typ}`,
      source: 'topic-quiz',
      correct: korrekt,
    })
  }

  /** Karteikarte bewerten und die naechste aufschlagen. */
  function gradeCard(grade: Grade) {
    if (!courseId || !topicId || !topic) return
    const karte = topic.flashcards[cardIdx]
    setGradedCards(g => ({ ...g, [cardIdx]: grade }))
    void gradeItem(
      { itemType: 'card', itemId: cardItemId(topicId, karte.id), topicId, courseId },
      grade,
    )
    if (cardIdx < topic.flashcards.length - 1) {
      setCardIdx(i => i + 1)
      setFlipped(false)
    }
  }

  const interaktivteile = topic.interactives ?? []

  return (
    <div className="min-h-screen bg-surface text-ink">
      <nav className="bg-raised border-b border-line px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate(`/course/${courseId}`)} className="text-muted hover:text-ink transition-colors">
          ← Zurück
        </button>
        <span className="text-accent font-mono text-xs uppercase tracking-widest">{topic.title}</span>
      </nav>

      <div className="bg-raised border-b border-line px-6 flex gap-1">
        {(['theory', 'quiz', 'flashcards'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink'
            }`}>
            {t === 'theory' ? '📖 Theorie' : t === 'quiz' ? '✅ Quiz' : '🃏 Karteikarten'}
          </button>
        ))}
      </div>

      <main lang={sprache} className="max-w-3xl mx-auto px-4 py-8">

        {tab === 'theory' && (
          <div>
            <h1 className="text-2xl font-light mb-2">{topic.title}</h1>
            <p className="text-muted text-sm mb-8">{topic.subtitle}</p>
            <Suspense fallback={<p className="text-muted">Theorie wird gesetzt...</p>}>
              <TheoryRenderer markdown={topic.theory} showToc abbildungen={topic.abbildungen}
                formelsatz={formelsatz} />
            </Suspense>

            {interaktivteile.map((interactive, i) => {
              const fertig = (korrekt: boolean) => interaktivFertig(i, interactive.type, korrekt)
              return (
                <div key={`${interactive.type}-${i}`} className="mt-10 bg-raised border border-line rounded-2xl p-6">
                  <p className="text-xs text-accent font-mono uppercase tracking-widest mb-4">🎬 Interaktiv</p>
                  {interactive.type === 'mechanism' && (
                    <MechanismusAufgabe title={interactive.title} description={interactive.description}
                      stages={interactive.stages} ergebnis={interactive.ergebnis}
                      onComplete={fertig} />
                  )}
                  {interactive.type === 'formula-calculator' && (
                    <FormulaCalculator formula={interactive.formula} onComplete={() => fertig(true)} />
                  )}
                  {interactive.type === 'apparatus-quiz' && (
                    <ApparatusQuiz question={interactive.question} targetId={interactive.targetId}
                      options={interactive.options} explanation={interactive.explanation}
                      hint1={interactive.hint1} hint2={interactive.hint2}
                      onComplete={fertig} />
                  )}
                  {interactive.type === 'apparatus-matching' && (
                    <ApparaturZuordnung title={interactive.title} description={interactive.description}
                      paare={interactive.paare} explanation={interactive.explanation}
                      onComplete={fertig} />
                  )}
                  {interactive.type === 'spectrum-assignment' && (
                    <SpectrumAssignment title={interactive.title} description={interactive.description}
                      xLabel={interactive.xLabel} yLabel={interactive.yLabel} peaks={interactive.peaks}
                      hint1={interactive.hint1} hint2={interactive.hint2}
                      onComplete={() => fertig(true)} />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {tab === 'quiz' && (
          <div>
            {quizDone ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-light text-accent mb-2">Quiz abgeschlossen!</h2>
                <p className="text-muted mb-6">{richtige(ergebnisse)} von {topic.quiz.length} Fragen richtig</p>
                <div className={`text-5xl font-bold mb-8 ${ampelText(richtige(ergebnisse) / topic.quiz.length)}`}>
                  {prozent(ergebnisse, topic.quiz.length)}%
                </div>
                <p className="text-accent text-sm mb-6">✓ Fortschritt gespeichert!</p>
                <button onClick={resetQuiz} className="bg-accent hover:bg-accent-strong text-on-accent font-semibold px-6 py-3 rounded-xl transition-colors">
                  Nochmal versuchen
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-xs text-subtle mb-2">
                  <span>Frage {quizIdx + 1} von {topic.quiz.length}</span>
                  <span>{richtige(ergebnisse)} richtig</span>
                </div>
                <div className="h-1.5 bg-sunken rounded-full mb-8">
                  <div className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${(quizIdx / topic.quiz.length) * 100}%` }} />
                </div>
                <div className="bg-raised border border-line rounded-2xl p-6 mb-4">
                  <h2 className="text-lg font-light leading-relaxed mb-6"><Formeltext text={q.question} formelsatz={formelsatz} /></h2>
                  <div className="space-y-3">
                    {q.options.map((opt, i) => {
                      let cls = 'border-line bg-sunken/50 text-muted hover:border-accent'
                      if (answered) {
                        if (i === q.correct) cls = 'border-success bg-success/20 text-success'
                        else if (i === selected) cls = 'border-danger bg-danger/20 text-danger'
                        else cls = 'border-line bg-raised text-subtle'
                      } else if (i === selected) cls = 'border-accent bg-accent/20 text-accent'
                      return (
                        <button key={i} onClick={() => !answered && setSelected(i)}
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${cls}`}>
                          <span className="opacity-50 mr-2">{String.fromCharCode(65+i)}.</span><Formeltext text={opt} formelsatz={formelsatz} />
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div aria-live="polite" className="sr-only">
                  {answered ? (selected === q.correct ? 'Richtig.' : 'Falsch.') : ''}
                </div>
                {answered && (
                  <div className="bg-accent/10 border border-accent rounded-xl px-5 py-4 mb-4 text-sm text-muted leading-relaxed">
                    <span className="text-accent font-semibold">Erklärung: </span><Formeltext text={q.explanation} formelsatz={formelsatz} />
                  </div>
                )}
                <div className="flex gap-3">
                  {!answered && selected !== null && (
                    <button onClick={handleAnswer} className="flex-1 bg-accent hover:bg-accent-strong text-on-accent font-semibold py-3 rounded-xl transition-colors">
                      Antwort prüfen
                    </button>
                  )}
                  {answered && (
                    <button onClick={nextQuestion} className="flex-1 bg-accent hover:bg-accent-strong text-on-accent font-semibold py-3 rounded-xl transition-colors">
                      {quizIdx < topic.quiz.length - 1 ? 'Nächste Frage →' : 'Ergebnis anzeigen'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'flashcards' && (
          <div>
            <div className="mb-6 text-center text-sm text-subtle">
              Karte {cardIdx + 1} von {topic.flashcards.length} – antippen zum Umdrehen
            </div>
            <button type="button" onClick={() => setFlipped(f => !f)}
              aria-expanded={flipped} aria-label="Karteikarte umdrehen"
              className="block w-full text-left" style={{ perspective: '1000px' }}>
              <div style={{ position: 'relative', height: '220px', transition: 'transform 0.5s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute inset-0 bg-raised border border-accent rounded-2xl flex flex-col items-center justify-center p-8">
                  <p className="text-xs text-accent font-mono uppercase tracking-widest mb-4">Begriff</p>
                  <p className="text-xl font-light text-center"><Formeltext text={topic.flashcards[cardIdx].front} formelsatz={formelsatz} /></p>
                </div>
                <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  className="absolute inset-0 bg-accent/20 border border-accent rounded-2xl flex flex-col items-center justify-center p-8">
                  <p className="text-xs text-accent font-mono uppercase tracking-widest mb-4">Erklärung</p>
                  <p className="text-sm text-muted text-center leading-relaxed"><Formeltext text={topic.flashcards[cardIdx].back} formelsatz={formelsatz} /></p>
                </div>
              </div>
            </button>
            {/* Bewertung steuert, wann die Karte wiederkommt */}
            {flipped ? (
              <div className="mt-8">
                <p className="text-center text-xs text-subtle mb-3">Wie gut saß das?</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {([
                    [GRADES.NOCHMAL, 'Nochmal', 'border-danger text-danger hover:bg-danger/20'],
                    [GRADES.SCHWER, 'Schwer', 'border-warning text-warning hover:bg-warning/20'],
                    [GRADES.GUT, 'Gut', 'border-accent text-accent hover:bg-accent/20'],
                    [GRADES.LEICHT, 'Leicht', 'border-success text-success hover:bg-success/20'],
                  ] as const).map(([grade, label, cls]) => (
                    <button key={label} onClick={() => gradeCard(grade)}
                      className={`min-h-11 bg-raised border rounded-xl px-3 py-3 text-sm font-medium transition-colors ${cls}`}>
                      {label}
                    </button>
                  ))}
                </div>
                {gradedCards[cardIdx] !== undefined && (
                  <p className="text-center text-xs text-subtle mt-3">
                    Bewertet – nächster Termin gespeichert.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-center text-xs text-subtle mt-8">
                Karte umdrehen, um zu bewerten
              </p>
            )}

            <div className="flex justify-center gap-4 mt-6">
              <button onClick={() => { setCardIdx(i => Math.max(0, i-1)); setFlipped(false) }} disabled={cardIdx === 0}
                className="px-6 py-2.5 bg-raised border border-line rounded-xl text-sm disabled:opacity-40 hover:border-subtle transition-colors">
                ← Zurück
              </button>
              <button onClick={() => { setCardIdx(i => Math.min(topic.flashcards.length-1, i+1)); setFlipped(false) }}
                disabled={cardIdx === topic.flashcards.length-1}
                className="px-6 py-2.5 bg-raised border border-line rounded-xl text-sm disabled:opacity-40 hover:border-subtle transition-colors">
                Weiter →
              </button>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {topic.flashcards.map((_, i) => (
                <button key={i} onClick={() => { setCardIdx(i); setFlipped(false) }}
                  aria-label={`Zu Karte ${i + 1}`}
                  className={`h-11 w-6 rounded-full bg-clip-content py-4 transition-colors ${
                    i === cardIdx ? 'bg-accent'
                    : gradedCards[i] !== undefined ? 'bg-accent/40'
                    : 'bg-sunken'
                  }`} />
              ))}
            </div>
          </div>
        )}

        {courseId && topicId && (
          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <span className="text-xs text-subtle">Etwas stimmt nicht oder fehlt?</span>
            <ReportButton
              courseId={courseId} topicId={topicId}
              contentType={tab === 'quiz' ? 'quiz' : tab === 'flashcards' ? 'flashcard' : 'theory'}
              contentId={tab === 'quiz' ? (q?.id ?? '') : tab === 'flashcards' ? (topic.flashcards[cardIdx]?.id ?? '') : topic.id}
              contentPreview={tab === 'quiz' ? q?.question : tab === 'flashcards' ? topic.flashcards[cardIdx]?.front : topic.title}
            />
            <SuggestButton courseId={courseId} topicId={topicId} />
          </div>
        )}
      </main>
    </div>
  )
}
