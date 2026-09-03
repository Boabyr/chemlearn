import { describe, it, expect } from 'vitest'
import { auswerten, pruefeAusdruck, variablenIn } from './ausdruck'

const nah = (wert: number, ziel: number) => expect(wert).toBeCloseTo(ziel, 9)

describe('auswerten — Grundrechenarten', () => {
  it('rechnet Punkt vor Strich', () => {
    nah(auswerten('2 + 3 * 4', {}), 14)
    nah(auswerten('(2 + 3) * 4', {}), 20)
  })

  it('kennt Minus als Vorzeichen', () => {
    nah(auswerten('-3 + 5', {}), 2)
    nah(auswerten('2 * -3', {}), -6)
  })

  it('rechnet Potenzen rechtsassoziativ', () => {
    nah(auswerten('2 ^ 3', {}), 8)
    nah(auswerten('2 ^ 3 ^ 2', {}), 512)
    nah(auswerten('10 ^ -3', {}), 0.001)
  })

  it('liest Dezimal- und Exponentialschreibweise', () => {
    nah(auswerten('0.05916', {}), 0.05916)
    nah(auswerten('1.5e-3', {}), 0.0015)
  })
})

describe('auswerten — Variablen und Funktionen', () => {
  it('setzt Variablen ein', () => {
    nah(auswerten('eps * c * d', { eps: 5000, c: 1e-4, d: 1 }), 0.5)
    nah(auswerten('A / (eps * d)', { A: 0.5, eps: 5000, d: 1 }), 1e-4)
  })

  it('kennt log, ln, exp, sqrt und abs', () => {
    nah(auswerten('log(100)', {}), 2)
    nah(auswerten('ln(exp(1))', {}), 1)
    nah(auswerten('sqrt(16)', {}), 4)
    nah(auswerten('abs(0 - 3)', {}), 3)
  })

  it('kennt die Winkelfunktionen', () => {
    nah(auswerten('cos(0)', {}), 1)
    nah(auswerten('sin(0)', {}), 0)
    nah(auswerten('tan(0)', {}), 0)
    nah(auswerten('acos(1)', {}), 0)
    nah(auswerten('asin(0)', {}), 0)
    nah(auswerten('atan(0)', {}), 0)
  })

  it('rechnet die Interferenz zweier Wellen', () => {
    nah(auswerten('I1 + I2 + 2 * sqrt(I1 * I2) * cos(dphi)', { I1: 1, I2: 1, dphi: 0 }), 4)
    nah(auswerten('acos((I - I1 - I2) / (2 * sqrt(I1 * I2)))', { I: 4, I1: 1, I2: 1 }), 0)
  })

  it('kennt pi als Konstante', () => {
    nah(auswerten('cos(pi)', {}), -1)
    nah(auswerten('2 * pi * r', { r: 2 }), 4 * Math.PI)
  })

  it('lässt eine deklarierte Größe die Konstante schlagen', () => {
    nah(auswerten('pi', { pi: 3 }), 3)
  })

  it('zählt pi nicht als Größe, die eingegeben werden muss', () => {
    expect(variablenIn('2 * pi * dn * L / lambda').sort()).toEqual(['L', 'dn', 'lambda'])
    expect(pruefeAusdruck('2 * pi * dn * L / lambda', ['dn', 'L', 'lambda'])).toBeNull()
  })

  it('rechnet die Nernst-Gleichung', () => {
    nah(auswerten('E0 - (0.05916 / n) * log(ratio)', { E0: 0.34, n: 2, ratio: 100 }), 0.34 - 0.05916)
  })
})

describe('auswerten — Fehler', () => {
  it('weist unbekannte Namen ab', () => {
    expect(() => auswerten('a + b', { a: 1 })).toThrow(/b/)
  })

  it('weist unbekannte Funktionen ab', () => {
    expect(() => auswerten('cot(1)', {})).toThrow(/cot/)
  })

  it('weist unvollständige Ausdrücke ab', () => {
    expect(() => auswerten('2 +', {})).toThrow()
    expect(() => auswerten('(2 + 3', {})).toThrow()
    expect(() => auswerten('2 3', {})).toThrow()
  })

  it('lässt keine fremden Zeichen durch', () => {
    expect(() => auswerten('process.exit(1)', {})).toThrow()
    expect(() => auswerten('1; alert(1)', {})).toThrow()
  })

  it('gibt bei Division durch null keine Zahl zurück', () => {
    expect(Number.isFinite(auswerten('1 / 0', {}))).toBe(false)
  })
})

describe('variablenIn', () => {
  it('nennt die benutzten Namen ohne Funktionen', () => {
    expect(variablenIn('A / (eps * d)').sort()).toEqual(['A', 'd', 'eps'])
    expect(variablenIn('log(ratio) * n').sort()).toEqual(['n', 'ratio'])
  })
})

describe('pruefeAusdruck', () => {
  it('nimmt einen Ausdruck über erlaubten Variablen an', () => {
    expect(pruefeAusdruck('A / (eps * d)', ['A', 'eps', 'd', 'c'])).toBeNull()
  })

  it('meldet unerlaubte Variablen namentlich', () => {
    expect(pruefeAusdruck('A / x', ['A'])).toMatch(/x/)
  })

  it('meldet kaputte Klammern', () => {
    expect(pruefeAusdruck('A / (eps', ['A', 'eps'])).toBeTruthy()
  })
})
