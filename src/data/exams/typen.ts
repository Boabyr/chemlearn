export type QuestionType = 'mc-single' | 'mc-multi' | 'numeric' | 'order'

export interface ExamQuestion {
  id: string
  /** Woher die Frage stammt, z. B. "2020-02-Lieberzeit". */
  source: string
  /** Kennung des Prüfers aus `course.examiners`. */
  examiner: string
  topicId: string
  points: number
  type: QuestionType
  question: string
  options?: string[]
  /** Index, Indexliste oder Zahlenwert — je nach Fragetyp. */
  correct: number | number[] | string
  explanation: string
  tolerance?: number
  unit?: string
}

export interface ExamSection {
  examiner: string
  points: number
  passingPoints: number
  questionIds: string[]
}

export interface ExamStructure {
  id: string
  date: string
  title: string
  totalPoints: number
  passingPoints: number
  sections: ExamSection[]
}

export interface PruefungsDaten {
  questions: ExamQuestion[]
  structures: ExamStructure[]
}
