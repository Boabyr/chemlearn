import { describe, it, expect } from 'vitest'
import { vorschlaegeAlsQuelle } from './vorschlaegeAlsQuelle'
import type { ContentSuggestionRow } from './database.types'

const vorschlag = (teil: Partial<ContentSuggestionRow>): ContentSuggestionRow => ({
  id: 'x', submitted_by: 'u', course_id: 'ac1', topic_id: '02-lambert-beer',
  suggestion_type: 'quiz', content: {}, approvals: [], status: 'approved',
  reviewed_by: null, reviewed_at: null, created_at: '', ...teil,
})

describe('vorschlaegeAlsQuelle', () => {
  it('lässt Nichtfreigegebenes weg', () => {
    const text = vorschlaegeAlsQuelle([vorschlag({ status: 'pending', content: { front: 'A', back: 'B' }, suggestion_type: 'flashcard' })])
    expect(text).toBe('')
  })

  it('schreibt eine Quizfrage im Quellformat', () => {
    const text = vorschlaegeAlsQuelle([vorschlag({
      content: { question: 'Was ist A?', options: ['a', 'b', 'c', 'd'], correct: 2, explanation: 'Weil c.' },
    })])
    expect(text).toContain('=== DATEI: 02-lambert-beer.md ===')
    expect(text).toContain('modus: ergaenzen')
    expect(text).toContain('F1: Was ist A?')
    expect(text).toContain('- c')
    expect(text).toContain('RICHTIG: 3')
    expect(text).toContain('ERKLÄRUNG: Weil c.')
  })

  it('schreibt Karteikarten mit V und R', () => {
    const text = vorschlaegeAlsQuelle([vorschlag({
      suggestion_type: 'flashcard', content: { front: 'Vorderseite', back: 'Rückseite' },
    })])
    expect(text).toContain('# FLASHCARDS')
    expect(text).toContain('V: Vorderseite')
    expect(text).toContain('R: Rückseite')
  })

  it('bündelt mehrere Vorschläge je Thema', () => {
    const text = vorschlaegeAlsQuelle([
      vorschlag({ id: '1', content: { question: 'F1?', options: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'e' } }),
      vorschlag({ id: '2', content: { question: 'F2?', options: ['a', 'b', 'c', 'd'], correct: 1, explanation: 'e' } }),
      vorschlag({ id: '3', topic_id: '03-fluoreszenz', content: { question: 'F3?', options: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'e' } }),
    ])
    expect(text.match(/=== DATEI:/g)).toHaveLength(2)
    expect(text).toContain('F1: F1?')
    expect(text).toContain('F2: F2?')
  })

  it('faltet Zeilenumbrüche zusammen, damit das Format hält', () => {
    const text = vorschlaegeAlsQuelle([vorschlag({
      suggestion_type: 'flashcard', content: { front: 'Vorn', back: 'Zeile eins\nZeile zwei' },
    })])
    expect(text).toContain('R: Zeile eins Zeile zwei')
    expect(text.split('\n').filter(z => z.startsWith('R: '))).toHaveLength(1)
  })
})
