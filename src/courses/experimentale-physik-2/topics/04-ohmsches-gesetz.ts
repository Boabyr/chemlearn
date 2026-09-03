import type { Thema } from '../../../content/schema'

export const topic = {
  id: "04-ohmsches-gesetz",
  title: "Ohm’sches Gesetz, Leitfähigkeit, Widerstand, Temperaturabhängigkeit",
  subtitle: "Zusammenhang zwischen Feld, Strom und Materialeigenschaften",
  icon: "🔧",
  estimatedMinutes: 60,
  theory: `
## Lokales Ohm’sches Gesetz

Das Ohm’sche Gesetz beschreibt den Zusammenhang zwischen Stromdichte und elektrischer Feldstärke:


\\[
\\vec{j} = \\sigma \\vec{E}.
\\]


Die Leitfähigkeit $\\sigma$ hat die Einheit $\\mathrm{S/m}$. Der spezifische Widerstand ist der Kehrwert:


\\[
\\rho_\\mathrm{el} = \\frac{1}{\\sigma}.
\\]



## Widerstand eines Leiters

Für einen homogenen Leiter mit Länge $L$ und Querschnitt $A$ gilt:


\\[
R = \\rho_\\mathrm{el}\\frac{L}{A}
\\quad\\text{oder}\\quad
R = \\frac{L}{\\sigma A}.
\\]



Das klassische Ohm’sche Gesetz lautet:


\\[
U = RI,
\\]


bzw.


\\[
I = \\frac{U}{R}.
\\]



Der Widerstand steigt mit zunehmender Länge und spezifischem Widerstand und sinkt mit größerer Querschnittsfläche oder höherer Leitfähigkeit.

## Leitfähigkeiten verschiedener Materialien

Die Quelle listet typische Leitfähigkeiten:
- Silber: $62{,}5\\cdot10^6\\,\\mathrm{S/m}$
- Kupfer: $59\\cdot10^6\\,\\mathrm{S/m}$
- Aluminium: $37\\cdot10^6\\,\\mathrm{S/m}$
- Eisen: $10{,}2\\cdot10^6\\,\\mathrm{S/m}$
- Kohle: $0{,}01\\cdot10^6\\,\\mathrm{S/m}$
- Quarz: $10^{-18}\\,\\mathrm{S/m}$

Dies zeigt die enorme Spannweite zwischen Leitern und Isolatoren. Ursache sind die unterschiedlichen Elektronenbindungen und Bandstrukturen der Materialien.

## Widerstandsfarbcode

Widerstände werden oft durch Farbringe gekennzeichnet. Ein vierfarbiger Widerstand enthält zwei Ziffern, einen Multiplikator und eine Toleranz. Ein Beispiel aus der Quelle ergibt:


\\[
R = 30\\,\\mathrm{M\\Omega} \\pm 10\\%.
\\]



## Temperaturabhängigkeit

Der spezifische Widerstand vieler Metalle steigt mit der Temperatur. Für einen linearen Bereich gilt:


\\[
\\alpha = \\frac{(\\rho_{T1}-\\rho_{T0})/\\rho_{T0}}{T1 - T0}.
\\]



Metalle besitzen typischerweise positive Temperaturkoeffizienten, Halbleiter oft negative.

## Temperaturmodell

Für einen begrenzten Temperaturbereich schreibt man den spezifischen Widerstand linear:


\\[
\\rho(T) = \\rho_0\\left(1 + \\alpha\\,(T - T_0)\\right).
\\]


Kupfer hat $\\alpha \\approx 3{,}9\\cdot10^{-3}\\,\\mathrm{K^{-1}}$: Eine Erwärmung um $100\\,\\mathrm{K}$ erhöht den Widerstand um knapp $40\\%$. Ursache ist die stärkere Gitterschwingung, an der die Elektronen häufiger gestreut werden. Bei Halbleitern überwiegt der gegenläufige Effekt, dass mit steigender Temperatur mehr Ladungsträger frei werden — der Widerstand sinkt, der Temperaturkoeffizient ist negativ.

## Rechenbeispiel

Ein Kupferdraht von $L = 10\\,\\mathrm{m}$ Länge und $A = 1\\,\\mathrm{mm^2}$ Querschnitt hat mit $\\sigma = 59\\cdot10^6\\,\\mathrm{S/m}$ den Widerstand


\\[
R = \\frac{L}{\\sigma A} = \\frac{10}{59\\cdot10^6\\cdot10^{-6}}\\,\\Omega \\approx 0{,}17\\,\\Omega.
\\]


An diesem Draht fallen bei $10\\,\\mathrm{A}$ rund $1{,}7\\,\\mathrm{V}$ ab. Verdoppelt man den Querschnitt, halbiert sich der Widerstand — deshalb werden Zuleitungen für große Ströme dick ausgeführt.

## Grenzen des Ohm'schen Gesetzes

Ohm'sches Verhalten ist keine Naturnotwendigkeit, sondern eine Eigenschaft bestimmter Materialien in bestimmten Bereichen. Bauteile mit gekrümmter Kennlinie — Dioden, Glühlampen, Gasentladungen — heißen nichtohmsch: Bei ihnen hängt $R = U/I$ vom Arbeitspunkt ab. Man unterscheidet dann den Gleichstromwiderstand $U/I$ vom differentiellen Widerstand $\\mathrm{d}U/\\mathrm{d}I$.

## Supraleitung

Unterhalb einer materialabhängigen Sprungtemperatur verschwindet der elektrische Widerstand mancher Materialien vollständig. Ein einmal angeworfener Strom fließt dann ohne Spannungsquelle weiter, weil kein Spannungsabfall mehr nötig ist, um ihn aufrechtzuerhalten. Technisch genutzt wird das in supraleitenden Magnetspulen, etwa in Kernspintomographen: Erst der widerstandslose Leiter erlaubt die hohen Dauerströme, die für starke Felder gebraucht werden. Supraleitung ist der Grenzfall $\\rho_\\mathrm{el} = 0$, in dem das lokale Ohm'sche Gesetz $\\vec{j} = \\sigma\\vec{E}$ seine Aussagekraft verliert: Eine endliche Stromdichte kommt dort ohne Feld aus.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "ohm-widerstand",
        name: "Widerstand eines Leiters",
        equation: "R = rho * L / A",
        variables: [
          { id: "R", label: "Widerstand", symbol: "R", unit: "ohm", description: "Elektrischer Widerstand des Leiters" },
          { id: "rho", label: "spezifischer Widerstand", symbol: "rho", unit: "ohm*m", description: "Materialabhängiger Widerstand" },
          { id: "L", label: "Länge", symbol: "L", unit: "m", description: "Leiterlänge" },
          { id: "A", label: "Querschnittsfläche", symbol: "A", unit: "m^2", description: "Leiterquerschnitt" },
        ],
        umstellungen: [
          { solveFor: "R", expr: "rho * L / A" },
          { solveFor: "rho", expr: "R * A / L" },
          { solveFor: "L", expr: "R * A / rho" },
          { solveFor: "A", expr: "rho * L / R" },
        ],
        hints: ["Der Widerstand ist proportional zur Länge und umgekehrt proportional zur Fläche.", "Materialien mit hoher Leitfähigkeit besitzen kleinen spezifischen Widerstand."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Welche Beziehung stellt die Quelle zwischen Stromdichte und Feldstärke her?", options: ["$\\vec{j} = \\rho \\vec{E}$", "$\\vec{E} = \\sigma \\vec{j}$", "$\\vec{j} = \\vec{E}/\\sigma$", "$\\vec{j} = \\sigma \\vec{E}$"], correct: 3, explanation: "Das lokale Ohm’sche Gesetz lautet $\\vec{j} = \\sigma \\vec{E}$." },
    { id: "q2", question: "Wie hängt der Widerstand eines Leiters von Länge und Querschnitt ab?", options: ["$R$ steigt mit Länge und sinkt mit Fläche", "$R$ sinkt mit Länge und steigt mit Fläche", "$R$ ist unabhängig von Länge und Fläche", "$R$ steigt mit Fläche und sinkt mit Länge"], correct: 0, explanation: "$R = \\rho L/A$ → proportional zu $L$, invers proportional zu $A$." },
    { id: "q3", question: "Warum unterscheiden sich die Leitfähigkeiten verschiedener Materialien so stark?", options: ["Wegen unterschiedlicher Dichte", "Wegen unterschiedlicher Elektronenbeweglichkeit", "Wegen unterschiedlicher Wärmeleitfähigkeit", "Wegen unterschiedlicher Farbe"], correct: 1, explanation: "Leitfähigkeit hängt von der Bindung und Beweglichkeit der Elektronen ab." },
    { id: "q4", question: "Was bedeutet ein positiver Temperaturkoeffizient?", options: ["Widerstand sinkt mit Temperatur", "Widerstand bleibt konstant", "Widerstand steigt mit Temperatur", "Widerstand wird null"], correct: 2, explanation: "Metalle besitzen positive Temperaturkoeffizienten → $\\rho$ steigt mit $T$." },
    { id: "q5", question: "Verdoppelt man die Länge eines Leiters, wie ändert sich $R$?", options: ["halbiert sich", "bleibt gleich", "vervierfacht sich", "verdoppelt sich"], correct: 3, explanation: "$R \\propto L$ → Verdoppeln von $L$ verdoppelt $R$." },
    { id: "q6", question: "Verdoppelt man die Fläche $A$, wie ändert sich $R$?", options: ["halbiert sich", "bleibt gleich", "verdoppelt sich", "wird null"], correct: 0, explanation: "$R \\propto 1/A$ → Verdoppeln von $A$ halbiert $R$." },
  ],
  flashcards: [
    { id: "1ddpjq6", front: "Ohm lokal", back: "$\\vec{j} = \\sigma \\vec{E}$. Zusammenhang zwischen Feld und Stromdichte." },
    { id: "0taslso", front: "Widerstand", back: "$R = \\rho L/A$. Proportional zu Länge, invers proportional zur Fläche." },
    { id: "1y6zigc", front: "Ohm’sches Gesetz", back: "$U = RI$. Strom und Spannung sind proportional." },
    { id: "1mw2my6", front: "Leitfähigkeit", back: "$\\sigma$ in $\\mathrm{S/m}$. Kehrwert des spezifischen Widerstands." },
    { id: "0s4l1nw", front: "Temperaturkoeffizient", back: "$\\alpha$ positiv bei Metallen → Widerstand steigt mit Temperatur." },
    { id: "034wuvl", front: "Farbcode", back: "Vier Ringe: Ziffer, Ziffer, Multiplikator, Toleranz." },
  ],
} satisfies Thema;
