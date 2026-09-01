import type { ExamQuestion } from '../../data/exams'
import type { Karteikarte } from '../../content/schema'

/**
 * Ein Begriff für alles, was gelernt werden kann.
 *
 * Bisher waren Karteikarten, Themen-Quizfragen und Prüfungsfragen drei
 * getrennte Welten: Karten wurden geplant, Prüfungsfragen auch, Themen-
 * Quizfragen nie. Die Tagessitzung mischt alle drei, deshalb brauchen sie
 * eine gemeinsame Form.
 */
export type LernArt = 'card' | 'question'

export interface LernKarte {
  art: 'card'
  itemId: string
  courseId: string
  topicId: string
  karte: Karteikarte
}

export interface LernFrage {
  art: 'question'
  itemId: string
  courseId: string
  topicId: string
  frage: ExamQuestion
}

export type LernAufgabe = LernKarte | LernFrage

/** Schlüssel einer Karte in der reviews-Tabelle. */
export function karteItemId(topicId: string, kartenId: string): string {
  return `card:${topicId}:${kartenId}`
}

/** Schlüssel einer Frage in der reviews-Tabelle. */
export function frageItemId(fragenId: string): string {
  return `q:${fragenId}`
}

/** Fragen-Kennung ohne Präfix — so steht sie in der attempts-Tabelle. */
export function ohnePraefix(itemId: string): string {
  return itemId.replace(/^(?:q:|card:[^:]+:)/, '')
}
