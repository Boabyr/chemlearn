import { describe, it, expect } from 'vitest'
import { formatChemistry } from './chemFormat'

describe('formatChemistry — Indizes', () => {
  it('setzt Summenformeln tief', () => {
    expect(formatChemistry('H2SO4 ist stark')).toBe('H₂SO₄ ist stark')
    expect(formatChemistry('CO2 und H2O')).toBe('CO₂ und H₂O')
  })

  it('versteht Klammern', () => {
    expect(formatChemistry('Ca(OH)2')).toBe('Ca(OH)₂')
  })

  it('lässt bereits gesetzte Formeln in Ruhe', () => {
    expect(formatChemistry('H₂SO₄')).toBe('H₂SO₄')
  })

  it('fasst Kurskürzel nicht an', () => {
    expect(formatChemistry('AC1 und OC2 im Studium')).toBe('AC1 und OC2 im Studium')
  })

  it('fasst gewöhnliche Wörter und Zahlen nicht an', () => {
    expect(formatChemistry('Kapitel 2 auf Seite 14')).toBe('Kapitel 2 auf Seite 14')
    expect(formatChemistry('SM2 Algorithmus')).toBe('SM2 Algorithmus')
    expect(formatChemistry('UV/Vis bei 254 nm')).toBe('UV/Vis bei 254 nm')
  })

  it('fasst einzelne Elementsymbole ohne Zahl nicht an', () => {
    expect(formatChemistry('Na und Cl')).toBe('Na und Cl')
  })
})

describe('formatChemistry — Hochzahlen', () => {
  it('setzt Exponenten hoch', () => {
    expect(formatChemistry('10^-3 mol/L')).toBe('10⁻³ mol/L')
    expect(formatChemistry('10^6')).toBe('10⁶')
  })

  it('setzt Ladungen hoch', () => {
    expect(formatChemistry('Cu^2+ und SO4^2-')).toBe('Cu²⁺ und SO₄²⁻')
  })

  it('lässt ein einzelnes Dach ohne Zahl stehen', () => {
    expect(formatChemistry('a ^ b')).toBe('a ^ b')
  })
})
