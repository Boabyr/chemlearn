import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import ExamQuestionCard from './ExamQuestion'
import type { ExamQuestion } from '../../data/exams'

const frage: ExamQuestion = {
  id: 'f1',
  topicId: '04-ohmsches-gesetz',
  gruppe: 'A',
  type: 'mc-single',
  question: 'Welche Beziehung gilt zwischen $\\vec{j}$ und $\\vec{E}$?',
  options: ['$\\vec{j} = \\sigma \\vec{E}$', '$\\vec{E} = \\sigma \\vec{j}$', '$\\vec{j} = \\rho \\vec{E}$', 'keine'],
  correct: 0,
  explanation: 'Das lokale Ohm’sche Gesetz lautet $\\vec{j} = \\sigma \\vec{E}$.',
  points: 2,
  source: 'Test',
}

describe('Prüfungsfrage', () => {
  it('setzt Formeln in Frage und Antworten, statt rohes LaTeX zu zeigen', () => {
    const { container } = render(<ExamQuestionCard question={frage} onAnswer={vi.fn()} courseId="experimentale-physik-2" />)
    expect(container.querySelectorAll('.katex').length).toBeGreaterThan(2)
    expect(container.textContent).not.toContain('$')
  })
})
