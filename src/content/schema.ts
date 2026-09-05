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

/*
 * Mechanismen als Strukturformel.
 *
 * Die frühere Form zeichnete beschriftete Kreise: Bindungsordnung stand als
 * Text im Label ("C=O"), freie Elektronenpaare gab es nicht, und ein Pfeil
 * konnte nur von Atom zu Atom laufen — genau ein Pfeil je Stufe. Damit ließ
 * sich kein Mechanismus abbilden. Die Regeln hier verlangen, was damals
 * fehlte, statt nur zu zählen.
 */

const BUEHNE = { breite: 480, hoehe: 300 }
const RAND = 10
const MIN_ABSTAND = 22

const atomSchema = z.object({
  id: nichtLeer,
  /** Elementsymbol oder Gruppe. Ohne Ladungszeichen — die steht im Feld. */
  element: z.string().regex(/^[A-Za-z][A-Za-z0-9']*$/, 'Elementsymbol ohne Ladungszeichen'),
  x: z.number().min(RAND).max(BUEHNE.breite - RAND),
  y: z.number().min(RAND).max(BUEHNE.hoehe - RAND),
  ladung: z.number().int().min(-2).max(2).optional(),
  freiePaare: z.number().int().min(0).max(3).optional(),
  wasserstoffe: z.number().int().min(0).max(4).optional(),
  zeigen: z.boolean().optional(),
  /** Eintretendes Reagenz: darf ohne Bindung dastehen. */
  frei: z.boolean().optional(),
})

const bindungSchema = z.object({
  id: nichtLeer,
  von: nichtLeer,
  nach: nichtLeer,
  ordnung: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  art: z.enum(['normal', 'entsteht', 'bricht']).optional(),
})

const zielSchema = z.object({
  art: z.enum(['bindung', 'freiesPaar', 'atom']),
  id: nichtLeer,
})

const pfeilSchema = z.object({
  von: zielSchema,
  nach: zielSchema,
}).refine(
  pfeil => !(pfeil.von.art === pfeil.nach.art && pfeil.von.id === pfeil.nach.id),
  { message: 'Ein Pfeil endet nicht dort, wo er beginnt' },
).refine(
  pfeil => pfeil.nach.art !== 'freiesPaar',
  { message: 'Ein Pfeil zeigt auf eine Bindung oder ein Atom, nicht auf ein freies Paar' },
)

export const mechanismusStufeSchema = z.object({
  id: z.number().int(),
  titel: nichtLeer,
  /** Was zu tun ist. */
  aufgabe: nichtLeer,
  /** Warum diese Pfeile — nach der Lösung gezeigt. */
  erklaerung: nichtLeer,
  hinweise: z.array(nichtLeer).min(1).max(3),
  atome: z.array(atomSchema).min(2),
  bindungen: z.array(bindungSchema),
  pfeile: z.array(pfeilSchema).min(1),
}).superRefine((stufe, ctx) => {
  const melde = (path: (string | number)[], message: string) =>
    ctx.addIssue({ code: 'custom', path, message })

  const atomIds = stufe.atome.map(a => a.id)
  if (new Set(atomIds).size !== atomIds.length) melde(['atome'], 'Doppelte Atom-Kennung')

  // Atome dürfen einander nicht überlagern — sonst ist nicht zu treffen,
  // was man anklicken soll.
  for (let i = 0; i < stufe.atome.length; i++) {
    for (let j = i + 1; j < stufe.atome.length; j++) {
      const a = stufe.atome[i]
      const b = stufe.atome[j]
      if (Math.hypot(a.x - b.x, a.y - b.y) < MIN_ABSTAND) {
        melde(['atome', j], `"${b.id}" liegt zu dicht an "${a.id}"`)
      }
    }
  }

  const gebunden = new Set<string>()
  const paare = new Set<string>()
  for (const [i, bindung] of stufe.bindungen.entries()) {
    for (const ende of ['von', 'nach'] as const) {
      if (!atomIds.includes(bindung[ende])) melde(['bindungen', i, ende], `Atom "${bindung[ende]}" gibt es nicht`)
    }
    if (bindung.von === bindung.nach) melde(['bindungen', i], 'Bindung auf sich selbst')
    const schluessel = [bindung.von, bindung.nach].sort().join('—')
    if (paare.has(schluessel)) melde(['bindungen', i], `Bindung ${schluessel} steht doppelt`)
    paare.add(schluessel)
    gebunden.add(bindung.von)
    gebunden.add(bindung.nach)
  }

  // Ein Atom ohne Bindung ist entweder ein Reagenz oder ein Versehen.
  for (const [i, atom] of stufe.atome.entries()) {
    if (!gebunden.has(atom.id) && !atom.frei) {
      melde(['atome', i], `"${atom.id}" hängt an keiner Bindung — als Reagenz "frei: true" setzen`)
    }
  }

  const bindungsIds = stufe.bindungen.map(b => b.id)
  for (const [i, pfeil] of stufe.pfeile.entries()) {
    for (const ende of ['von', 'nach'] as const) {
      const ziel = pfeil[ende]
      if (ziel.art === 'bindung' && !bindungsIds.includes(ziel.id)) {
        melde(['pfeile', i, ende], `Bindung "${ziel.id}" gibt es nicht`)
      }
      if (ziel.art !== 'bindung' && !atomIds.includes(ziel.id)) {
        melde(['pfeile', i, ende], `Atom "${ziel.id}" gibt es nicht`)
      }
      if (ziel.art === 'freiesPaar') {
        const atom = stufe.atome.find(a => a.id === ziel.id)
        if (atom && !(atom.freiePaare && atom.freiePaare > 0)) {
          melde(['pfeile', i, ende], `"${ziel.id}" hat kein freies Elektronenpaar`)
        }
      }
    }
  }
})

/**
 * Schlussbild ohne Aufgabe.
 *
 * Jede Stufe ist eine Aufgabe; das Produkt des letzten Schritts hätte damit
 * niemand je gesehen. Hier steht es.
 */
export const mechanismusErgebnisSchema = z.object({
  titel: nichtLeer,
  beschreibung: nichtLeer,
  atome: z.array(atomSchema).min(2),
  bindungen: z.array(bindungSchema),
})

export const mechanismusSchema = z.object({
  type: z.literal('mechanism'),
  title: nichtLeer,
  description: nichtLeer,
  stages: z.array(mechanismusStufeSchema).min(2, 'Ein Mechanismus hat mehr als einen Schritt'),
  ergebnis: mechanismusErgebnisSchema,
}).superRefine((mechanismus, ctx) => {
  /*
   * Die Struktur muss sich wandeln, nicht ausgetauscht werden.
   *
   * Im alten Bestand verschwanden zwischen zwei Stufen einfach Atome und ein
   * Plus tauchte aus dem Nichts auf. Wer eine Stufe löst, soll im nächsten
   * Bild dasselbe Molekül wiedererkennen.
   */
  for (let i = 1; i < mechanismus.stages.length; i++) {
    const vorher = new Set(mechanismus.stages[i - 1].atome.map(a => a.id))
    const jetzt = mechanismus.stages[i].atome.map(a => a.id)
    const gemeinsam = jetzt.filter(id => vorher.has(id)).length
    const anteil = gemeinsam / Math.max(vorher.size, jetzt.length)
    if (anteil <= 0.5) {
      ctx.addIssue({
        code: 'custom',
        path: ['stages', i],
        message: `Schritt ${i + 1} teilt nur ${Math.round(anteil * 100)} % seiner Atome mit dem vorigen — `
          + 'die Struktur wird ausgetauscht statt umgeformt',
      })
    }
  }
})

/**
 * Eine gezeichnete Struktur ohne Aufgabe.
 *
 * Dieselben Atome und Bindungen wie im Mechanismus — ein zweites Datenmodell
 * für dasselbe wäre eine Quelle für zwei Wahrheiten.
 */
export const strukturBildSchema = z.object({
  beschriftung: nichtLeer,
  atome: z.array(atomSchema).min(2),
  bindungen: z.array(bindungSchema),
}).superRefine((bild, ctx) => {
  const melde = (path: (string | number)[], message: string) =>
    ctx.addIssue({ code: 'custom', path, message })

  const atomIds = bild.atome.map(a => a.id)
  if (new Set(atomIds).size !== atomIds.length) melde(['atome'], 'Doppelte Atom-Kennung')

  for (let i = 0; i < bild.atome.length; i++) {
    for (let j = i + 1; j < bild.atome.length; j++) {
      const a = bild.atome[i]
      const b = bild.atome[j]
      if (Math.hypot(a.x - b.x, a.y - b.y) < MIN_ABSTAND) {
        melde(['atome', j], `"${b.id}" liegt zu dicht an "${a.id}"`)
      }
    }
  }

  const gebunden = new Set<string>()
  for (const [i, bindung] of bild.bindungen.entries()) {
    for (const ende of ['von', 'nach'] as const) {
      if (!atomIds.includes(bindung[ende])) melde(['bindungen', i, ende], `Atom "${bindung[ende]}" gibt es nicht`)
    }
    gebunden.add(bindung.von)
    gebunden.add(bindung.nach)
  }
  for (const [i, atom] of bild.atome.entries()) {
    if (!gebunden.has(atom.id) && !atom.frei) {
      melde(['atome', i], `"${atom.id}" hängt an keiner Bindung — als Reagenz "frei: true" setzen`)
    }
  }
})

/**
 * Eine Reihe von Strukturen im Theorietext.
 *
 * `resonanz` setzt den Doppelpfeil zwischen die Bilder: es ist ein Molekül,
 * beschrieben durch mehrere Grenzstrukturen. `reihe` stellt sie nur
 * nebeneinander, etwa zum Vergleich zweier Angriffsorte.
 */
const abbildungsKopf = {
  id: z.string().regex(/^[a-z0-9-]+$/, 'Abbildungs-Kennung klein, ohne Umlaute'),
  titel: nichtLeer,
  beschreibung: z.string().optional(),
}

export const strukturAbbildungSchema = z.object({
  ...abbildungsKopf,
  art: z.literal('strukturen'),
  verknuepfung: z.enum(['resonanz', 'reihe']),
  strukturen: z.array(strukturBildSchema).min(2, 'Eine Abbildung zeigt mindestens zwei Strukturen'),
})

const achsenSchema = z.object({
  titel: nichtLeer,
  min: z.number(),
  max: z.number(),
}).refine(a => a.min < a.max, { message: 'min muss kleiner als max sein' })

const punktSchema = z.object({ x: z.number(), y: z.number() })

const kurveSchema = z.object({
  beschriftung: nichtLeer,
  punkte: z.array(punktSchema).min(2, 'Eine Kurve braucht mindestens zwei Punkte'),
  stil: z.enum(['linie', 'gestrichelt']).optional(),
  farbe: z.enum(['accent', 'success', 'warning', 'danger', 'subtle']).optional(),
})

const markerSchema = z.object({
  x: z.number(),
  y: z.number(),
  beschriftung: nichtLeer,
  /** Gestrichelte Linien auf beide Achsen — für "Signal messen, Wert ablesen". */
  hilfslinien: z.boolean().optional(),
})

/**
 * Kurvendiagramm für den Theorietext.
 *
 * Kurven sind Punktlisten, kein Code — dieselbe Regel wie bei den Formeln:
 * Inhalt bleibt Inhalt. Was der Text als Form beschreibt (die Gerade, das
 * Minimum, der Sprung), steht damit auch als Bild da.
 */
export const diagrammSchema = z.object({
  ...abbildungsKopf,
  art: z.literal('diagramm'),
  xAchse: achsenSchema,
  yAchse: achsenSchema,
  kurven: z.array(kurveSchema).min(1),
  marker: z.array(markerSchema).default([]),
}).superRefine((d, ctx) => {
  const melde = (path: (string | number)[], message: string) =>
    ctx.addIssue({ code: 'custom', path, message })

  const namen = d.kurven.map(k => k.beschriftung)
  if (new Set(namen).size !== namen.length) melde(['kurven'], 'Doppelte Kurvenbeschriftung')

  const drin = (x: number, y: number) =>
    x >= d.xAchse.min && x <= d.xAchse.max && y >= d.yAchse.min && y <= d.yAchse.max

  for (const [i, kurve] of d.kurven.entries()) {
    for (const [j, punkt] of kurve.punkte.entries()) {
      if (!drin(punkt.x, punkt.y)) {
        melde(['kurven', i, 'punkte', j], `Punkt (${punkt.x}, ${punkt.y}) liegt außerhalb der Achsen`)
      }
    }
  }
  for (const [i, m] of d.marker.entries()) {
    if (!drin(m.x, m.y)) melde(['marker', i], `Marker "${m.beschriftung}" liegt außerhalb der Achsen`)
  }
})

export const abbildungSchema = z.discriminatedUnion('art', [
  strukturAbbildungSchema,
  diagrammSchema,
])

/**
 * Geräte zuordnen: links der Name, rechts das Bild.
 *
 * Der Kurs hat 21 Apparaturzeichnungen, geübt wurden bisher fünf — je eine
 * Frage mit vier Bildern. Hier kommen mehrere Geräte auf einmal ins Spiel.
 */
export const apparaturZuordnungSchema = z.object({
  type: z.literal('apparatus-matching'),
  title: nichtLeer,
  description: z.string(),
  explanation: nichtLeer,
  paare: z.array(z.object({
    /** Schlüssel in src/components/Apparatus/registry.ts */
    apparaturId: nichtLeer,
    label: nichtLeer,
    hinweis: z.string().optional(),
  })).min(3, 'Mindestens drei Paare').max(6, 'Höchstens sechs Paare — sonst wird das Bild unlesbar'),
}).superRefine((z2, ctx) => {
  const ids = z2.paare.map(p => p.apparaturId)
  if (new Set(ids).size !== ids.length) {
    ctx.addIssue({ code: 'custom', path: ['paare'], message: 'Dieselbe Apparatur steht zweimal' })
  }
  const namen = z2.paare.map(p => p.label)
  if (new Set(namen).size !== namen.length) {
    ctx.addIssue({ code: 'custom', path: ['paare'], message: 'Doppelte Beschriftung' })
  }
})

export const interaktivSchema = z.discriminatedUnion('type', [
  apparaturQuizSchema,
  spektrumZuordnungSchema,
  formelRechnerSchema,
  mechanismusSchema,
  apparaturZuordnungSchema,
])

export const themaSchema = z.object({
  id: nichtLeer,
  title: nichtLeer,
  subtitle: z.string(),
  icon: z.string(),
  estimatedMinutes: z.number().int().positive(),
  theory: z.string().min(50, 'Theorie ist zu dünn'),
  /** Mehrere Übungen je Thema — ein Formelrechner schließt eine Gerätezuordnung nicht aus. */
  interactives: z.array(z.unknown()).default([]),
  /** Gezeichnete Strukturen, im Theorietext über {{abbildung:id}} gerufen. */
  abbildungen: z.array(abbildungSchema).default([]),
  quiz: z.array(quizFrageSchema).min(1),
  flashcards: z.array(karteikarteSchema).min(1),
}).superRefine((thema, ctx) => {
  for (const [i, teil] of thema.interactives.entries()) {
    const ergebnis = interaktivSchema.safeParse(teil)
    if (!ergebnis.success) {
      for (const problem of ergebnis.error.issues) {
        ctx.addIssue({ code: 'custom', path: ['interactives', i, ...problem.path], message: problem.message })
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

  // Eine Abbildung, die niemand ruft, sieht niemand; eine Marke ohne Abbildung
  // bleibt als roher Text stehen. Beides fällt sonst still unter den Tisch.
  const vorhanden = thema.abbildungen.map(a => a.id)
  if (new Set(vorhanden).size !== vorhanden.length) {
    ctx.addIssue({ code: 'custom', path: ['abbildungen'], message: 'Doppelte Abbildungs-Kennung' })
  }
  const gerufen = [...thema.theory.matchAll(/\{\{abbildung:([a-z0-9-]+)\}\}/g)].map(m => m[1])

  for (const id of gerufen) {
    if (!vorhanden.includes(id)) {
      ctx.addIssue({ code: 'custom', path: ['theory'], message: `{{abbildung:${id}}} — dazu gibt es keine Abbildung` })
    }
  }
  for (const [i, abbildung] of thema.abbildungen.entries()) {
    if (!gerufen.includes(abbildung.id)) {
      ctx.addIssue({ code: 'custom', path: ['abbildungen', i], message: `"${abbildung.id}" wird im Text nirgends gerufen` })
    }
  }
})

export const gruppeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'Gruppen-Kennung klein und ohne Umlaute'),
  label: nichtLeer,
  icon: z.string().optional(),
})

const stoffgebietSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  titel: nichtLeer,
  topics: z.array(nichtLeer).min(1),
  fragen: z.number().int().nonnegative(),
})

const notenstufeSchema = z.object({
  ab: z.number().int().nonnegative(),
  note: nichtLeer,
})

/**
 * Prüfungsordnung eines Fachs.
 *
 * Jedes Fach hat eine eigene: Fragenzahl, Punkte, Bewertungsregel, Dauer und
 * Notengrenzen stehen anders in der jeweiligen Studienordnung. Sie gehören
 * deshalb zum Kurs und nicht in den Programmablauf.
 */
export const ordnungSchema = z.object({
  titel: nichtLeer,
  fragen: z.number().int().positive(),
  punkteJeFrage: z.number().positive(),
  /**
   * Wie Mehrfachauswahl gerechnet wird.
   *
   * `teilpunkte` zieht falsche Kreuze von richtigen ab. `streng` gibt für die
   * ganze Frage null Punkte, sobald ein falsches Kreuz dabeisteht — so steht
   * es in der Ordnung von Experimentalphysik 2.
   */
  regel: z.enum(['streng', 'teilpunkte']).default('teilpunkte'),
  zeitMinuten: z.number().int().positive(),
  noten: z.array(notenstufeSchema).default([]),
  gebiete: z.array(stoffgebietSchema).min(1),
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
  /** Gruppenabschnitte dieses Fachs. Leer heißt: ein gemeinsamer Abschnitt. */
  gruppen: z.array(gruppeSchema).default([]),
  /**
   * Sprache der Inhalte als BCP-47-Kürzel.
   *
   * Das Dokument ist auf Deutsch gesetzt; englische Kursinhalte darin ohne
   * Auszeichnung liest ein Screenreader mit deutscher Aussprache vor.
   */
  sprache: z.string().default('de'),
  /**
   * Wie Formeln im Fließtext gesetzt werden.
   *
   * `chemie` stellt Summenformeln tief (H2SO4 → H₂SO₄). In einem Physik- oder
   * Mathematiktext ist V2 aber ein zweites Volumen und N2 eine Stichprobe —
   * dort gehört der Satz aus. LaTeX in `$…$` läuft unabhängig davon.
   */
  formelsatz: z.enum(['chemie', 'aus']).default('chemie'),
  /**
   * Kurs im Aufbau.
   *
   * Solange ein Fach stückweise eingespielt wird, kann kein Thema die
   * Sollstärke erfüllen. Das Kennzeichen setzt genau diese eine Prüfung aus —
   * alle übrigen gelten weiter.
   */
  entwurf: z.boolean().default(false),
  /** Prüfungsordnung des Fachs. Fehlt sie, gibt es nur Altprüfungen. */
  ordnung: ordnungSchema.optional(),
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
export type StrukturBild = z.infer<typeof strukturBildSchema>
export type StrukturAbbildung = z.infer<typeof strukturAbbildungSchema>
export type Diagramm = z.infer<typeof diagrammSchema>
export type Abbildung = z.infer<typeof abbildungSchema>
export type ApparaturZuordnung = z.infer<typeof apparaturZuordnungSchema>
export type Mechanismus = z.infer<typeof mechanismusSchema>
export type MechanismusStufe = z.infer<typeof mechanismusStufeSchema>
export type MechanismusAtom = z.infer<typeof atomSchema>
export type MechanismusBindung = z.infer<typeof bindungSchema>
export type MechanismusPfeil = z.infer<typeof pfeilSchema>
export type Interaktiv = ApparaturQuiz | SpektrumZuordnung | FormelRechner | Mechanismus | ApparaturZuordnung
export type Gruppe = z.infer<typeof gruppeSchema>
export type Formelsatz = Kurs['formelsatz']

export type Thema = Omit<z.infer<typeof themaSchema>, 'interactives' | 'abbildungen'>
  & { interactives?: Interaktiv[]; abbildungen?: Abbildung[] }
export type Kurs = z.infer<typeof kursSchema>
export type Ordnung = z.infer<typeof ordnungSchema>
export type Stoffgebiet = z.infer<typeof stoffgebietSchema>
export type Notenstufe = z.infer<typeof notenstufeSchema>
