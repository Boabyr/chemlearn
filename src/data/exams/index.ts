import type { ExamQuestion, ExamStructure, QuestionType } from './typen'
import { kursMit } from '../../lib/courseRegistry'

export type { ExamQuestion, ExamStructure, QuestionType }
export type { ExamSection, PruefungsDaten } from './typen'

interface PruefungsModul {
  questions?: ExamQuestion[]
  structures?: ExamStructure[]
}

/**
 * Prüfungsdaten finden sich selbst: `src/data/exams/<kurs-id>.ts`.
 *
 * Vorher stand hier eine Handliste, und der Importer patchte sie per Regex,
 * verankert an der Zeichenkette `ac1` — ab dem dritten Fach war Schluss.
 */
const module = import.meta.glob<PruefungsModul>('./*.ts', { eager: true })

const jeKurs = new Map<string, { questions: ExamQuestion[]; structures: ExamStructure[] }>()
for (const [pfad, modul] of Object.entries(module)) {
  const kursId = pfad.replace(/^\.\//, '').replace(/\.ts$/, '')
  if (kursId === 'index' || kursId === 'typen') continue
  jeKurs.set(kursId, { questions: modul.questions ?? [], structures: modul.structures ?? [] })
}

export function examQuestionsFor(courseId: string): ExamQuestion[] {
  return jeKurs.get(courseId)?.questions ?? []
}

export function examStructuresFor(courseId: string): ExamStructure[] {
  return jeKurs.get(courseId)?.structures ?? []
}

export function courseIdsWithExams(): string[] {
  return [...jeKurs.entries()].filter(([, daten]) => daten.questions.length > 0).map(([id]) => id)
}

/** Gruppenkennungen dieses Fachs — aus dem Kurskopf, sonst aus den Fragen. */
export function gruppenFuer(courseId: string): string[] {
  const ausKurs = kursMit(courseId)?.gruppen ?? []
  if (ausKurs.length > 0) return ausKurs.map(p => p.id)
  return [...new Set(examQuestionsFor(courseId).map(q => q.gruppe))].sort()
}

function grossAmAnfang(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** Anzeigename. Ohne Kursangabe bleibt nur die Kennung. */
export function gruppenLabel(gruppe: string, courseId?: string): string {
  if (courseId) {
    const treffer = kursMit(courseId)?.gruppen.find(p => p.id === gruppe)
    if (treffer) return treffer.label
  }
  return grossAmAnfang(gruppe)
}

/** Anzeigename mit Symbol, wie ihn die Prüfungsseiten zeigen. */
export function gruppenAnzeige(gruppe: string, courseId: string): string {
  const treffer = kursMit(courseId)?.gruppen.find(p => p.id === gruppe)
  if (!treffer) return grossAmAnfang(gruppe)
  return treffer.icon ? `${treffer.icon} ${treffer.label}` : treffer.label
}
