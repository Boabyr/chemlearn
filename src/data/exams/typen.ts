export type QuestionType = 'mc-single' | 'mc-multi' | 'numeric' | 'order'

export interface ExamQuestion {
  id: string
  /** Woher die Frage stammt, z. B. "2020-02-Lieberzeit" oder "Skript Kap. 15". */
  source: string
  /**
   * Gruppenschlüssel des Abschnitts, in dem die Frage steht.
   *
   * Bei Altprüfungen ist das der Prüfer, bei Prüfungen nach Ordnung das
   * Stoffgebiet. Das Feld hieß `examiner`; in einem Fach ohne Altprüfung
   * stand darin dann ein Stoffgebiet, und der Name log.
   */
  gruppe: string
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
  gruppe: string
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
