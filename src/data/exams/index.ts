import * as ac1 from './ac1'
import type { ExamQuestion, ExamStructure, QuestionType } from './ac1'

export type { ExamQuestion, ExamStructure, QuestionType }

/** Prüfungsfragen und Prüfungsaufbauten je Kurs. Neuer Kurs: hier eintragen. */
const byCourse: Record<string, { questions: ExamQuestion[]; structures: ExamStructure[] }> = {
  'analytical-chemistry-1': { questions: ac1.questions, structures: ac1.structures },
}

export function examQuestionsFor(courseId: string): ExamQuestion[] {
  return byCourse[courseId]?.questions ?? []
}

export function examStructuresFor(courseId: string): ExamStructure[] {
  return byCourse[courseId]?.structures ?? []
}

export function courseIdsWithExams(): string[] {
  return Object.keys(byCourse).filter(id => byCourse[id].questions.length > 0)
}

/** Prüfer, die in diesem Kurs überhaupt vorkommen. */
export function professorsFor(courseId: string): string[] {
  return [...new Set(examQuestionsFor(courseId).map(q => q.professor))].sort()
}

/** Anzeigename für einen Prüferschlüssel. */
const ANZEIGENAMEN: Record<string, string> = {
  lieberzeit: 'Lieberzeit',
  koellensperger: 'Köllensperger',
  gerner: 'Gerner',
}

export function professorLabel(professor: string): string {
  return ANZEIGENAMEN[professor] ?? professor.charAt(0).toUpperCase() + professor.slice(1)
}
