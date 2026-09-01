import type { ContentSuggestionRow } from './database.types'

/**
 * Freigegebene Vorschläge in das Quellformat des Importers gießen.
 *
 * Bisher endete ein freigegebener Vorschlag als Zeile in der Datenbank —
 * gelesen hat sie nie jemand, in den Kurs kam er nie. Der erzeugte Text geht
 * nach `.source/<kurs>/vorschlaege.md` und von dort über `npm run import`
 * denselben Weg wie jeder andere Inhalt.
 */
export function vorschlaegeAlsQuelle(vorschlaege: ContentSuggestionRow[]): string {
  const freigegeben = vorschlaege.filter(v => v.status === 'approved')
  if (freigegeben.length === 0) return ''

  const jeThema = new Map<string, ContentSuggestionRow[]>()
  for (const v of freigegeben) {
    const schluessel = `${v.course_id}//${v.topic_id}`
    if (!jeThema.has(schluessel)) jeThema.set(schluessel, [])
    jeThema.get(schluessel)!.push(v)
  }

  const bloecke: string[] = []
  for (const [schluessel, gruppe] of [...jeThema.entries()].sort()) {
    const themaId = schluessel.split('//')[1]
    const zeilen = [`=== DATEI: ${themaId}.md ===`, '', '# META', 'modus: ergaenzen', '']

    const quiz = gruppe.filter(v => v.suggestion_type === 'quiz' && v.content?.question)
    if (quiz.length > 0) {
      zeilen.push('# QUIZ')
      quiz.forEach((v, i) => {
        const inhalt = v.content
        zeilen.push(`F${i + 1}: ${einzeilig(inhalt.question ?? '')}`)
        for (const option of inhalt.options ?? []) zeilen.push(`- ${einzeilig(option)}`)
        zeilen.push(`RICHTIG: ${(inhalt.correct ?? 0) + 1}`)
        zeilen.push(`ERKLÄRUNG: ${einzeilig(inhalt.explanation ?? '')}`)
        zeilen.push('')
      })
    }

    const karten = gruppe.filter(v => v.suggestion_type === 'flashcard' && v.content?.front)
    if (karten.length > 0) {
      zeilen.push('# FLASHCARDS')
      for (const v of karten) {
        zeilen.push(`V: ${einzeilig(v.content.front ?? '')}`)
        zeilen.push(`R: ${einzeilig(v.content.back ?? '')}`)
      }
      zeilen.push('')
    }

    if (quiz.length > 0 || karten.length > 0) bloecke.push(zeilen.join('\n').trimEnd())
  }

  return bloecke.length > 0 ? bloecke.join('\n\n') + '\n' : ''
}

/** Zeilenumbrüche würden das Quellformat zerreißen. */
function einzeilig(text: string): string {
  return text.replace(/\s*\n+\s*/g, ' ').trim()
}
