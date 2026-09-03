/**
 * Kleiner Ausdrucks-Auswerter für Formel-Umstellungen.
 *
 * Bisher trug jede Themendatei eine generierte `solve`-Funktion — deshalb
 * konnte Inhalt nie reine Daten sein, und der Importer musste Code schreiben.
 * Jetzt steht in den Daten `A / (eps * d)`, und das hier rechnet es aus:
 * eigener Parser mit fester Zeichenliste, kein `eval`, kein `new Function`.
 */

const FUNKTIONEN = {
  log: Math.log10,
  ln: Math.log,
  exp: Math.exp,
  sqrt: Math.sqrt,
  abs: Math.abs,
  // Winkelfunktionen rechnen im Bogenmaß — Physik-Formeln geben Winkel in rad.
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  min: Math.min,
  max: Math.max,
}

/**
 * Feste Größen, die keine Eingabe brauchen. Bewusst nur `pi`: `e` bleibt
 * frei, weil Physik-Themen damit die Elementarladung bezeichnen.
 * Eine deklarierte Größe gleichen Namens hat trotzdem Vorrang.
 */
const KONSTANTEN = {
  pi: Math.PI,
}

const ZEICHEN = new Set(['+', '-', '*', '/', '^', '(', ')', ','])

function zerlegen(eingabe) {
  const marken = []
  let i = 0

  while (i < eingabe.length) {
    const c = eingabe[i]

    if (/\s/.test(c)) { i++; continue }

    if (/[0-9.]/.test(c)) {
      const rest = eingabe.slice(i)
      const treffer = /^\d*\.?\d+([eE][+-]?\d+)?/.exec(rest)
      if (!treffer) throw new Error(`Ungültige Zahl an Position ${i}`)
      marken.push({ art: 'zahl', wert: treffer[0], pos: i })
      i += treffer[0].length
      continue
    }

    if (/[A-Za-z_]/.test(c)) {
      const treffer = /^[A-Za-z_][A-Za-z_0-9]*/.exec(eingabe.slice(i))
      marken.push({ art: 'name', wert: treffer[0], pos: i })
      i += treffer[0].length
      continue
    }

    if (ZEICHEN.has(c)) { marken.push({ art: 'zeichen', wert: c, pos: i }); i++; continue }

    throw new Error(`Unerlaubtes Zeichen "${c}" an Position ${i}`)
  }

  return marken
}

class Parser {
  constructor(marken, werte) {
    this.i = 0
    this.marken = marken
    this.werte = werte
  }

  auswerten() {
    const wert = this.summe()
    if (this.i < this.marken.length) {
      throw new Error(`Unerwartetes "${this.marken[this.i].wert}" an Position ${this.marken[this.i].pos}`)
    }
    return wert
  }

  schau() { return this.marken[this.i] }

  nimm(wert) {
    const marke = this.schau()
    if (marke && marke.art === 'zeichen' && marke.wert === wert) { this.i++; return true }
    return false
  }

  /** Addition und Subtraktion, linksassoziativ. */
  summe() {
    let links = this.produkt()
    for (;;) {
      if (this.nimm('+')) links += this.produkt()
      else if (this.nimm('-')) links -= this.produkt()
      else return links
    }
  }

  /** Multiplikation und Division, linksassoziativ. */
  produkt() {
    let links = this.vorzeichen()
    for (;;) {
      if (this.nimm('*')) links *= this.vorzeichen()
      else if (this.nimm('/')) links /= this.vorzeichen()
      else return links
    }
  }

  vorzeichen() {
    if (this.nimm('-')) return -this.vorzeichen()
    if (this.nimm('+')) return this.vorzeichen()
    return this.potenz()
  }

  /** Potenz, rechtsassoziativ: 2^3^2 ist 2^(3^2). */
  potenz() {
    const basis = this.grundwert()
    if (this.nimm('^')) return Math.pow(basis, this.vorzeichen())
    return basis
  }

  grundwert() {
    const marke = this.schau()
    if (!marke) throw new Error('Ausdruck endet zu früh')

    if (marke.art === 'zahl') { this.i++; return Number(marke.wert) }

    if (marke.art === 'name') {
      this.i++
      if (this.nimm('(')) {
        const funktion = FUNKTIONEN[marke.wert]
        if (!funktion) throw new Error(`Unbekannte Funktion "${marke.wert}"`)
        const argumente = [this.summe()]
        while (this.nimm(',')) argumente.push(this.summe())
        if (!this.nimm(')')) throw new Error(`Klammer nach "${marke.wert}(" nicht geschlossen`)
        return funktion(...argumente)
      }
      if (marke.wert in this.werte) return this.werte[marke.wert]
      if (marke.wert in KONSTANTEN) return KONSTANTEN[marke.wert]
      throw new Error(`Unbekannte Größe "${marke.wert}"`)
    }

    if (this.nimm('(')) {
      const wert = this.summe()
      if (!this.nimm(')')) throw new Error('Klammer nicht geschlossen')
      return wert
    }

    throw new Error(`Unerwartetes "${marke.wert}" an Position ${marke.pos}`)
  }
}

export function auswerten(ausdruck, werte) {
  return new Parser(zerlegen(ausdruck), werte).auswerten()
}

/** Namen im Ausdruck, ohne Funktionsaufrufe. */
export function variablenIn(ausdruck) {
  const marken = zerlegen(ausdruck)
  const namen = new Set()

  marken.forEach((marke, index) => {
    if (marke.art !== 'name') return
    const naechste = marken[index + 1]
    const istAufruf = naechste?.art === 'zeichen' && naechste.wert === '('
    if (!istAufruf && !(marke.wert in KONSTANTEN)) namen.add(marke.wert)
  })

  return [...namen]
}

/**
 * Prüft einen Ausdruck vor dem Import. Gibt die Beanstandung zurück
 * oder `null`, wenn alles passt.
 */
export function pruefeAusdruck(ausdruck, erlaubteVariablen) {
  let benutzte
  try {
    benutzte = variablenIn(ausdruck)
  } catch (fehler) {
    return fehler.message
  }

  const unbekannte = benutzte.filter(name => !erlaubteVariablen.includes(name))
  if (unbekannte.length > 0) {
    return `Unbekannte Größen: ${unbekannte.join(', ')}. Erlaubt sind: ${erlaubteVariablen.join(', ')}`
  }

  // Probelauf mit Einsen deckt Syntaxfehler auf, ohne echte Werte zu brauchen.
  const probe = Object.fromEntries(erlaubteVariablen.map(name => [name, 1]))
  try {
    auswerten(ausdruck, probe)
  } catch (fehler) {
    return fehler.message
  }
  return null
}
