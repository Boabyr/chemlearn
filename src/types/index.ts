export interface Course {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  level: string
  description: string
  topics: string[]
  totalTopics: number
  estimatedHours: number
}

export interface MechanismStage {
  id: number
  label: string
  description: string
  hint1: string
  hint2: string
  atoms: {
    id: string
    label: string
    x: number
    y: number
    color: string
    r: number
    charge?: string
    sub?: string
  }[]
  bonds: {
    a: string
    b: string
    dash: boolean
    color: string
  }[]
  correctArrow: { from: string; to: string }
}

export interface Mechanism {
  type: 'builder' | 'static' | 'animation' | 'video'
  title?: string
  description?: string
  stages?: MechanismStage[]
}

export interface Topic {
  id: string
  title: string
  subtitle: string
  icon: string
  estimatedMinutes: number
  theory: string
  mechanism?: Mechanism
  quiz: QuizQuestion[]
  flashcards: Flashcard[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Flashcard {
  front: string
  back: string
}

export interface Progress {
  courseId: string
  topicId: string
  completed: boolean
  quizScore: number
  lastSeen: string
}

export interface FormulaVariable {
  id: string
  label: string
  symbol: string
  unit: string
  description: string
}

export interface FormulaData {
  id: string
  name: string
  equation: string
  variables: FormulaVariable[]
  solve: (inputs: Record<string, number>) => Record<string, number>
  hints: string[]
}

export interface ApparatusOption {
  id: string
  label: string
  description: string
  svg: string
}

export interface ApparatusQuizData {
  type: 'apparatus-quiz'
  question: string
  mode: 'name-to-image' | 'image-to-name'
  targetId: string
  options: ApparatusOption[]
  explanation: string
  hint1?: string
  hint2?: string
}

export interface FormulaCalculatorData {
  type: 'formula-calculator'
  formula: FormulaData
}

export interface SpectrumPeak {
  id: string
  position: number
  yTop: number
  yBottom: number
  correctLabel: string
  options: string[]
}

export interface SpectrumAssignmentData {
  type: 'spectrum-assignment'
  title: string
  description: string
  xLabel: string
  yLabel: string
  peaks: SpectrumPeak[]
  hint1?: string
  hint2?: string
}

export type InteractiveElement =
  | ApparatusQuizData
  | FormulaCalculatorData
  | SpectrumAssignmentData
