import { describe, it, expect } from 'vitest'
import { richtige, prozent } from './quizScore'

describe('Quizstand', () => {
  it('zählt die richtigen Antworten', () => {
    expect(richtige([true, false, true, true])).toBe(3)
    expect(richtige([])).toBe(0)
  })

  it('gibt ein volles Quiz als 100 % aus, nicht als 117 %', () => {
    expect(prozent([true, true, true, true, true, true], 6)).toBe(100)
  })

  it('rundet auf ganze Prozent', () => {
    expect(prozent([true, true, true, true], 6)).toBe(67)
  })

  it('bleibt bei null Fragen bei null', () => {
    expect(prozent([], 0)).toBe(0)
  })
})
