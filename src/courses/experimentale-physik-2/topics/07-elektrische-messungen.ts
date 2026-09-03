import type { Thema } from '../../../content/schema'

export const topic = {
  id: "07-elektrische-messungen",
  title: "Elektrische Messungen, Multimeter, Messfehler, Messbereichserweiterung, Zangenstrommesser",
  subtitle: "Messgeräte, Innenwiderstände, Shunts und digitale Auswertung",
  icon: "📏",
  estimatedMinutes: 70,
  theory: `
## Voltmeter und Amperemeter

Ein Voltmeter wird parallel zum Bauteil angeschlossen und sollte einen sehr großen Innenwiderstand besitzen $(R_i \\to \\infty)$, damit es den Stromkreis kaum beeinflusst. Ein Amperemeter wird in Reihe geschaltet und sollte einen sehr kleinen Innenwiderstand besitzen $(R_i \\to 0)$, damit der Spannungsabfall am Messgerät minimal ist.

Digitale Multimeter messen Spannungen über hochohmiges Abgreifen, gefolgt von einer Analog‑Digital‑Umsetzung. Die Strommessung erfolgt meist über einen Shunt‑Widerstand $R_s$, wobei:


\\[
I \\approx \\frac{U}{R_s}.
\\]


Der Shunt beeinflusst den Stromkreis, weshalb sich der Messwert je nach Messbereich ändern kann.

## Typische Werte

Die Quelle nennt:
- Eingangswiderstand bei Spannungsmessung: ca. $10\\,\\mathrm{M\\Omega}$
- Shunt‑Widerstand bei Strommessung: ca. $0{,}05\\,\\Omega$
- Genauigkeit: ca. $0{,}5\\%$ des Messbereichs bei Strömen unter $400\\,\\mathrm{mA}$

Der Innenwiderstand eines Strommessgeräts kann durch Vergleichsmessungen bestimmt werden. Ein Beispiel zeigt, dass ein Messgerät im $2\\,\\mathrm{mA}$‑Bereich einen Innenwiderstand von etwa $100\\,\\Omega$ besitzt.

## Messbereichserweiterung

Liegt der Strom außerhalb des Messbereichs eines Amperemeters, kann der Messbereich durch einen parallel geschalteten Widerstand erweitert werden. Es gilt:


\\[
I = I_1 + I_2,
\\]


und:


\\[
I_1 R_i = I_2 R.
\\]


Daraus folgt:


\\[
I = I_1 \\frac{R + R_i}{R}.
\\]



## Zangenstrommesser

Ein Zangenstrommesser misst den Strom indirekt über das Magnetfeld um den Leiter. Vorteil: Der Stromkreis muss nicht aufgetrennt werden.

## Analog‑Digital‑Umsetzer

Ein Analog‑Digital‑Umsetzer wandelt analoge Signale in digitale Werte. Wichtige Kenngrößen sind Bittiefe, Abtastrate und Auflösung. Eine Bittiefe von $10$ Bit ermöglicht $1024$ unterscheidbare Werte (≈$0{,}1\\%$ des Messbereichs).

## Spannungsfehler- und Stromfehlerschaltung

Jedes Messgerät verändert die Schaltung, die es misst. Sollen Strom und Spannung an einem Widerstand gleichzeitig gemessen werden, gibt es zwei Anordnungen. In der **stromrichtigen** Schaltung liegt das Amperemeter direkt am Widerstand; das Voltmeter misst zusätzlich den Spannungsabfall am Amperemeter — der Spannungswert ist zu groß. In der **spannungsrichtigen** Schaltung liegt das Voltmeter direkt am Widerstand; das Amperemeter misst zusätzlich den Strom durch das Voltmeter — der Stromwert ist zu groß. Faustregel: kleine Widerstände spannungsrichtig, große stromrichtig messen.

## Vierleitermessung

Bei sehr kleinen Widerständen dominieren Zuleitungs- und Übergangswiderstände. Die Vierleitermessung trennt deshalb Strom- und Spannungspfad: Über zwei Leitungen wird ein bekannter Strom eingeprägt, über zwei weitere, praktisch stromlose Leitungen die Spannung direkt am Objekt abgegriffen. Weil im Spannungspfad kein Strom fließt, fällt an dessen Zuleitungen auch keine Spannung ab.

## Auflösung und Genauigkeit

Auflösung und Genauigkeit sind zu unterscheiden: Die Auflösung folgt aus der Bittiefe des Umsetzers, die Genauigkeit aus Kalibrierung, Rauschen und Temperaturgang. Ein Gerät kann also feiner anzeigen, als es tatsächlich misst.

## Messabweichung und Messbereich

Die Genauigkeitsangabe eines Multimeters bezieht sich meist auf den gewählten Messbereich, nicht auf den angezeigten Wert. Wer im $400\\,\\mathrm{mA}$-Bereich einen Strom von $5\\,\\mathrm{mA}$ misst, trägt die Unsicherheit des vollen Bereichs mit — relativ zum Messwert wird die Abweichung dadurch groß. Deshalb wählt man stets den kleinsten Bereich, in dem der Wert noch darstellbar ist.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "shunt-strom",
        name: "Strommessung über Shunt",
        equation: "I = U / R_s",
        variables: [
          { id: "I", label: "Strom", symbol: "I", unit: "A", description: "Gemessener Strom über den Shunt" },
          { id: "U", label: "Spannungsabfall", symbol: "U", unit: "V", description: "Spannung über dem Shunt" },
          { id: "R_s", label: "Shunt-Widerstand", symbol: "R_s", unit: "ohm", description: "Kleiner Messwiderstand im Amperemeter" },
        ],
        umstellungen: [
          { solveFor: "I", expr: "U / R_s" },
          { solveFor: "U", expr: "I * R_s" },
          { solveFor: "R_s", expr: "U / I" },
        ],
        hints: ["Der Shunt beeinflusst den Stromkreis und verändert den Messwert.", "Kleine Shunt-Widerstände reduzieren Messfehler."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum benötigt ein Voltmeter einen großen Innenwiderstand?", options: ["Damit es große Ströme messen kann", "Damit es als Amperemeter nutzbar ist", "Damit es den Stromkreis kaum belastet", "Damit die Spannung immer konstant bleibt"], correct: 2, explanation: "Ein großer Innenwiderstand verhindert, dass das Voltmeter nennenswert Strom zieht." },
    { id: "q2", question: "Warum benötigt ein Amperemeter einen kleinen Innenwiderstand?", options: ["Damit es hohe Spannungen messen kann", "Damit es den Stromkreis unterbricht", "Damit es als Voltmeter nutzbar ist", "Damit der Spannungsabfall am Messgerät gering bleibt"], correct: 3, explanation: "Ein kleiner Innenwiderstand verhindert zusätzliche Spannungsabfälle." },
    { id: "q3", question: "Warum beeinflusst der Shunt-Widerstand den Stromkreis?", options: ["Weil er einen zusätzlichen Widerstand darstellt", "Weil er die Spannung erhöht", "Weil er den Stromkreis unterbricht", "Weil er die Frequenz ändert"], correct: 0, explanation: "Der Shunt liegt im Strompfad und verändert den Gesamtwiderstand." },
    { id: "q4", question: "Welchen Vorteil bietet ein Zangenstrommesser?", options: ["Er misst besonders hohe Spannungen", "Der Stromkreis muss nicht aufgetrennt werden", "Er benötigt keinen Shunt", "Er misst nur Gleichstrom"], correct: 1, explanation: "Die Messung erfolgt kontaktlos über das Magnetfeld." },
    { id: "q5", question: "Ein Amperemeter hat $R_i = 1\\,\\Omega$, Parallelwiderstand $R = 9\\,\\Omega$. Verhältnis $I/I_1$?", options: ["0,90×", "9,00×", "1,11×", "10,0×"], correct: 2, explanation: "Aus $I_1 R_i = I_2 R$ folgt $I = I_1 (R + R_i)/R = I_1 \\cdot 10/9 \\approx 1{,}11\\,I_1$. Der Messbereich wächst also nur um elf Prozent, weil der Parallelwiderstand neunmal größer ist als der Innenwiderstand." },
    { id: "q6", question: "Ein Shunt hat $R_s = 0{,}05\\,\\Omega$, Spannungsabfall $0{,}1\\,\\mathrm{V}$. Strom?", options: ["0,5 A", "1 A", "5 A", "2 A"], correct: 3, explanation: "$I = U/R_s = 0{,}1/0{,}05 = 2\\,\\mathrm{A}$." },
  ],
  flashcards: [
    { id: "0khm2i3", front: "Voltmeter", back: "Parallel geschaltet, hoher Innenwiderstand (≈10 MΩ), um den Stromkreis nicht zu belasten." },
    { id: "1fdtd1u", front: "Amperemeter", back: "In Reihe geschaltet, kleiner Innenwiderstand, damit der Spannungsabfall minimal bleibt." },
    { id: "1pq32fv", front: "Shunt", back: "Kleiner Widerstand zur Strommessung: $I = U/R_s$." },
    { id: "1ery5n3", front: "Messbereichserweiterung", back: "Durch Parallelwiderstand: $I = I_1 (R + R_i)/R$." },
    { id: "1grdwmw", front: "Zangenstrommesser", back: "Misst Strom über Magnetfeld, ohne den Leiter aufzutrennen." },
    { id: "0yj6h4x", front: "ADC", back: "10 Bit → 1024 Werte. Bittiefe bestimmt die Auflösung." },
  ],
} satisfies Thema;
