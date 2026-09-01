import { z } from 'zod'
import { pruefeAusdruck } from '../lib/formel/ausdruck'

/**
 * Ein Schema, gegen das Inhalte tatsächlich geprüft werden.
 *
 * `src/types/index.ts` war bis hierher Wunschdenken: Kurs- und Themendateien
 * exportierten untypisierte Objektliterale, und `TopicPage` griff über `as any`
 * darauf zu. Ein falscher `correct`-Index oder ein vertipptes Feld fiel erst
 * beim Lernen auf. Jetzt bricht der Test.
 */

const nichtLeer = z.string().trim().min(1)

export const quizFrageSchema = z.object({
  id: nichtLeer,
  question: nichtLeer,
  options: z.array(nichtLeer).length(4, 'Genau vier Antwortmöglichkeiten'),
  correct: z.number().int().min(0).max(3),
  explanation: nichtLeer,
})

export const karteikarteSchema = z.object({
  /** Aus der Vorderseite abgeleitet, siehe kartenId.ts — nie die Position. */
  id: z.string().regex(/^[0-9a-z]{7}$/, 'Karten-ID kommt aus kartenId()'),
  front: nichtLeer,
  back: nichtLeer,
})

export const formelVariableSchema = z.object({
  id: z.string().regex(/^[A-Za-z_][A-Za-z_0-9]*$/, 'Variablenname wie im Ausdruck'),
  label: nichtLeer,
  symbol: nichtLeer,
  unit: z.string(),
  description: z.string(),
})

export const umstellungSchema = z.object({
  /** Welche Größe der Ausdruck ausrechnet. */
  solveFor: nichtLeer,
  /** Rechenausdruck über den übrigen Variablen, z. B. `A / (eps * d)`. */
  expr: nichtLeer,
})

export const formelSchema = z.object({
  id: nichtLeer,
  name: nichtLeer,
  equation: nichtLeer,
  variables: z.array(formelVariableSchema).min(2),
  umstellungen: z.array(umstellungSchema).min(1),
  hints: z.array(nichtLeer),
}).superRefine((formel, ctx) => {
  const namen = formel.variables.map(v => v.id)

  for (const [i, umstellung] of formel.umstellungen.entries()) {
    if (!namen.includes(umstellung.solveFor)) {
      ctx.addIssue({
        code: 'custom',
        path: ['umstellungen', i, 'solveFor'],
        message: `"${umstellung.solveFor}" ist keine deklarierte Größe (${namen.join(', ')})`,
      })
    }
    // Die gesuchte Größe darf im eigenen Ausdruck nicht vorkommen.
    const erlaubt = namen.filter(name => name !== umstellung.solveFor)
    const beanstandung = pruefeAusdruck(umstellung.expr, erlaubt)
    if (beanstandung) {
      ctx.addIssue({ code: 'custom', path: ['umstellungen', i, 'expr'], message: beanstandung })
    }
  }
})

export const apparaturOptionSchema = z.object({
  /** Schlüssel in src/components/Apparatus/registry.ts */
  id: nichtLeer,
  label: nichtLeer,
  description: z.string(),
})

export const apparaturQuizSchema = z.object({
  type: z.literal('apparatus-quiz'),
  question: nichtLeer,
  targetId: nichtLeer,
  options: z.array(apparaturOptionSchema).min(2),
  explanation: nichtLeer,
  hint1: z.string().optional(),
  hint2: z.string().optional(),
}).refine(
  quiz => quiz.options.some(option => option.id === quiz.targetId),
  { message: 'targetId kommt in den Optionen nicht vor' },
)

export const spektrumPeakSchema = z.object({
  id: nichtLeer,
  position: z.number(),
  yTop: z.number(),
  yBottom: z.number(),
  correctLabel: nichtLeer,
  options: z.array(nichtLeer).min(2),
}).refine(
  peak => peak.options.includes(peak.correctLabel),
  { message: 'correctLabel steht nicht unter den Optionen' },
)

export const spektrumZuordnungSchema = z.object({
  type: z.literal('spectrum-assignment'),
  title: nichtLeer,
  description: z.string(),
  xLabel: nichtLeer,
  yLabel: nichtLeer,
  peaks: z.array(spektrumPeakSchema).min(1),
  hint1: z.string().optional(),
  hint2: z.string().optional(),
})

export const formelRechnerSchema = z.object({
  type: z.literal('formula-calculator'),
  formula: formelSchema,
})

const atomSchema = z.object({
  id: nichtLeer,
  label: nichtLeer,
  x: z.number(),
  y: z.number(),
  color: nichtLeer,
  r: z.number(),
  charge: z.string().optional(),
  sub: z.string().optional(),
})

const bindungSchema = z.object({
  a: nichtLeer,
  b: nichtLeer,
  dash: z.boolean(),
  color: nichtLeer,
})

export const mechanismusStufeSchema = z.object({
  id: z.number().int(),
  label: nichtLeer,
  description: z.string(),
  hint1: z.string(),
  hint2: z.string(),
  atoms: z.array(atomSchema).min(2),
  bonds: z.array(bindungSchema),
  correctArrow: z.object({ from: nichtLeer, to: nichtLeer }),
}).superRefine((stufe, ctx) => {
  const ids = stufe.atoms.map(a => a.id)
  for (const [i, bindung] of stufe.bonds.entries()) {
    for (const ende of ['a', 'b'] as const) {
      if (!ids.includes(bindung[ende])) {
        ctx.addIssue({ code: 'custom', path: ['bonds', i, ende], message: `Atom "${bindung[ende]}" gibt es nicht` })
      }
    }
  }
  for (const ende of ['from', 'to'] as const) {
    if (!ids.includes(stufe.correctArrow[ende])) {
      ctx.addIssue({ code: 'custom', path: ['correctArrow', ende], message: `Atom "${stufe.correctArrow[ende]}" gibt es nicht` })
    }
  }
})

export const mechanismusSchema = z.object({
  type: z.literal('mechanism'),
  title: nichtLeer,
  description: z.string(),
  stages: z.array(mechanismusStufeSchema).min(1),
})

export const interaktivSchema = z.discriminatedUnion('type', [
  apparaturQuizSchema,
  spektrumZuordnungSchema,
  formelRechnerSchema,
  mechanismusSchema,
])

export const themaSchema = z.object({
  id: nichtLeer,
  title: nichtLeer,
  subtitle: z.string(),
  icon: z.string(),
  estimatedMinutes: z.number().int().positive(),
  theory: z.string().min(50, 'Theorie ist zu dünn'),
  interactive: z.unknown().optional(),
  quiz: z.array(quizFrageSchema).min(1),
  flashcards: z.array(karteikarteSchema).min(1),
}).superRefine((thema, ctx) => {
  if (thema.interactive !== undefined) {
    const ergebnis = interaktivSchema.safeParse(thema.interactive)
    if (!ergebnis.success) {
      for (const problem of ergebnis.error.issues) {
        ctx.addIssue({ code: 'custom', path: ['interactive', ...problem.path], message: problem.message })
      }
    }
  }

  const kartenIds = thema.flashcards.map(k => k.id)
  if (new Set(kartenIds).size !== kartenIds.length) {
    ctx.addIssue({ code: 'custom', path: ['flashcards'], message: 'Doppelte Karten-ID im Thema' })
  }

  const quizIds = thema.quiz.map(f => f.id)
  if (new Set(quizIds).size !== quizIds.length) {
    ctx.addIssue({ code: 'custom', path: ['quiz'], message: 'Doppelte Frage-ID im Thema' })
  }
})

export const prueferSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'Prüfer-Kennung klein und ohne Umlaute'),
  label: nichtLeer,
  icon: z.string().optional(),
})

export const kursSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: nichtLeer,
  subtitle: z.string(),
  icon: z.string(),
  color: nichtLeer,
  level: z.string(),
  description: z.string(),
  topics: z.array(nichtLeer).min(1),
  totalTopics: z.number().int().positive(),
  estimatedHours: z.number().positive(),
  /** Prüferabschnitte dieses Fachs. Leer heißt: ein gemeinsamer Abschnitt. */
  examiners: z.array(prueferSchema).default([]),
  /**
   * Sprache der Inhalte als BCP-47-Kürzel.
   *
   * Das Dokument ist auf Deutsch gesetzt; englische Kursinhalte darin ohne
   * Auszeichnung liest ein Screenreader mit deutscher Aussprache vor.
   */
  sprache: z.string().default('de'),
}).refine(
  kurs => kurs.totalTopics === kurs.topics.length,
  { message: 'totalTopics passt nicht zur Themenliste', path: ['totalTopics'] },
)

export type QuizFrage = z.infer<typeof quizFrageSchema>
export type Karteikarte = z.infer<typeof karteikarteSchema>
export type Formel = z.infer<typeof formelSchema>
export type ApparaturQuiz = z.infer<typeof apparaturQuizSchema>
export type SpektrumZuordnung = z.infer<typeof spektrumZuordnungSchema>
export type FormelRechner = z.infer<typeof formelRechnerSchema>
export type Mechanismus = z.infer<typeof mechanismusSchema>
export type MechanismusStufe = z.infer<typeof mechanismusStufeSchema>
export type Interaktiv = ApparaturQuiz | SpektrumZuordnung | FormelRechner | Mechanismus
export type Pruefer = z.infer<typeof prueferSchema>

export type Thema = Omit<z.infer<typeof themaSchema>, 'interactive'> & { interactive?: Interaktiv }
export type Kurs = z.infer<typeof kursSchema>
