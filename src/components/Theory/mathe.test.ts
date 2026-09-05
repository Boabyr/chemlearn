import { describe, it, expect } from 'vitest'
import { normalisiereMathe } from './mathe'

describe('normalisiereMathe', () => {
  it('macht aus \\[…\\] eine abgesetzte Formel', () => {
    expect(normalisiereMathe('Text\n\n\\[\nE = mc^2\n\\]\n')).toBe('Text\n\n$$\nE = mc^2\n$$\n')
  })

  it('macht aus \\(…\\) eine Formel im Fließtext', () => {
    expect(normalisiereMathe('Länge \\(L\\) des Arms')).toBe('Länge $L$ des Arms')
  })

  it('lässt vorhandene $-Formeln unangetastet', () => {
    expect(normalisiereMathe('Es gilt $n_1 > n_2$ und $$a = b$$')).toBe('Es gilt $n_1 > n_2$ und $$a = b$$')
  })

  it('fasst mehrere Formeln in einem Text', () => {
    expect(normalisiereMathe('\\(a\\) und \\(b\\)')).toBe('$a$ und $b$')
  })

  it('rührt einen unpaarigen Anfang nicht an', () => {
    expect(normalisiereMathe('Klammer \\( ohne Ende')).toBe('Klammer \\( ohne Ende')
  })

  it('lässt maskierte Klammern in Fließtext stehen', () => {
    expect(normalisiereMathe('Ein Wort \\[ohne Formel')).toBe('Ein Wort \\[ohne Formel')
  })
})
