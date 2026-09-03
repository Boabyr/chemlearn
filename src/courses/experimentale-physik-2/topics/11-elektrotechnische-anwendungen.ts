import type { Thema } from '../../../content/schema'

export const topic = {
  id: "11-elektrotechnische-anwendungen",
  title: "Elektrotechnische Anwendungen",
  subtitle: "Wechselstrom, Impedanzen, Leistungen, Resonanz und praktische Beispiele",
  icon: "🔌",
  estimatedMinutes: 85,
  theory: `
## Wechselstrom – Motivation und Grundlagen

Über 95 % der weltweit erzeugten elektrischen Energie werden als Wechselstrom bereitgestellt. Gründe:
- effiziente Übertragung über große Entfernungen,
- einfache Spannungsanpassung mittels Transformatoren,
- gute Kompatibilität mit Motoren und Netzsystemen.

Wechselstrom ist zeitlich veränderlicher Strom, meist sinusförmig. Nicht‑sinusförmige Verläufe lassen sich mittels Fourier‑Analyse in Sinuskomponenten zerlegen.

## Ohm’scher Widerstand im Wechselstromkreis

Liegt eine Wechselspannung


\\[
U_e = U_0\\cos(\\omega t)
\\]


an einem reinen Widerstand, so fließt ein Strom:


\\[
I(t) = \\frac{U_0}{R}\\cos(\\omega t).
\\]


Spannung und Strom sind **in Phase**.

## Spule im Wechselstromkreis

Für eine Spule gilt:


\\[
U_\\mathrm{ind} = -L\\frac{\\mathrm{d}I}{\\mathrm{d}t}.
\\]



Mit angelegter Spannung:


\\[
U_0\\cos(\\omega t) - L\\frac{\\mathrm{d}I}{\\mathrm{d}t} = 0,
\\]


ergibt sich:


\\[
I(t) = \\frac{U_0}{L\\omega}\\sin(\\omega t).
\\]



Der Strom **eilt der Spannung um 90° nach**.

Komplexe Impedanz:


\\[
Z_L = i\\omega L,
\\qquad
X_L = \\omega L.
\\]


Der Scheinwiderstand wächst mit der Frequenz.

## Kondensator im Wechselstromkreis

Für den Kondensator gilt:


\\[
U_C = \\frac{Q}{C},
\\qquad
I(t) = C\\frac{\\mathrm{d}U_C}{\\mathrm{d}t}.
\\]



Mit Wechselspannung:


\\[
I(t) = \\omega C U_0\\sin(\\omega t) = \\omega C U_0\\cos(\\omega t + 90^\\circ).
\\]



Der Strom **eilt der Spannung um 90° voraus**.

Komplexe Impedanz:


\\[
Z_C = \\frac{1}{i\\omega C},
\\qquad
X_C = \\frac{1}{\\omega C}.
\\]


Der Scheinwiderstand sinkt mit der Frequenz.

## Rechenregeln für Impedanzen

Serienschaltung:


\\[
Z_\\mathrm{ges} = \\sum_i Z_i.
\\]



Parallelschaltung:


\\[
\\frac{1}{Z_\\mathrm{ges}} = \\sum_i \\frac{1}{Z_i}.
\\]



## Leistungen im Wechselstromkreis

Momentanleistung:


\\[
P(t) = U(t)I(t).
\\]



Wirkleistung:


\\[
P = U_\\mathrm{eff} I_\\mathrm{eff}\\cos\\varphi.
\\]



Blindleistung:


\\[
Q = U_\\mathrm{eff} I_\\mathrm{eff}\\sin\\varphi.
\\]



Scheinleistung:


\\[
S = U_\\mathrm{eff} I_\\mathrm{eff}.
\\]



Blindleistung belastet das Netz, obwohl sie keine Wirkarbeit liefert. Großverbraucher müssen Blindenergie bezahlen, wenn der Leistungsfaktor unter 0,9 liegt.

## Beispiel: Blindwiderstand einer Spule

Für eine Spule mit $R = 1\\,\\Omega$ und $L = 0{,}3\\,\\mathrm{H}$:

Gleichspannung: $X_L = 0$, daher $I = 230\\,\\mathrm{A}$.

Wechselspannung bei 50 Hz:


\\[
X_L = \\omega L = 2\\pi\\cdot50\\cdot0{,}3 \\approx 94\\,\\Omega,
\\qquad
I_\\mathrm{eff} = \\frac{230}{94} \\approx 2{,}4\\,\\mathrm{A}.
\\]



## RLC-Kreis und Resonanz

Für einen RLC‑Kreis gilt:


\\[
Z = R + i\\left(\\omega L - \\frac{1}{\\omega C}\\right).
\\]



Wirkleistung:


\\[
P = \\frac{U_0^2 R}{(\\omega L - 1/(\\omega C))^2 + R^2}.
\\]



Maximale Leistung tritt bei der Resonanzfrequenz auf:


\\[
\\omega_0 = \\frac{1}{\\sqrt{LC}}.
\\]



## Einspeisung einer PV-Anlage

Ein Wechselrichter liefert $I_\\mathrm{eff} = 30\\,\\mathrm{A}$, Netzinnenwiderstand $R_i = 0{,}3\\,\\Omega$:


\\[
U_s = U_\\mathrm{eff} + R_i I_\\mathrm{eff} = 230 + 0{,}3\\cdot30 = 239\\,\\mathrm{V}.
\\]



Leistung:


\\[
P = I_\\mathrm{eff} U_s = 7{,}17\\,\\mathrm{kW}.
\\]




## Scheinwiderstand und Phasenlage

Für Wechselstromkreise fasst man die frequenzabhängigen Widerstände als Scheinwiderstände zusammen. Ihre Beträge sind


\\[
|Z_L| = \\omega L,
\\qquad
|Z_C| = \\frac{1}{\\omega C},
\\qquad
Z_R = R.
\\]


Die Spule sperrt also hohe Frequenzen, der Kondensator niedrige. Dazu gehört jeweils eine Phasenlage: Am Widerstand laufen Strom und Spannung im Gleichtakt, an der Spule eilt die Spannung dem Strom um $90^\\circ$ voraus, am Kondensator hinkt sie um $90^\\circ$ nach. Weil die Blindwiderstände von Spule und Kondensator gegenläufig wirken, heben sie sich bei einer bestimmten Frequenz gerade auf — das ist der Resonanzfall, in dem der Schwingkreis nur noch den ohmschen Anteil zeigt.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "impedanz-spule",
        name: "Scheinwiderstand einer Spule",
        equation: "Z_L = omega * L",
        variables: [
          { id: "Z_L", label: "Scheinwiderstand", symbol: "Z_L", unit: "ohm", description: "Betrag der Impedanz der Spule" },
          { id: "omega", label: "Kreisfrequenz", symbol: "omega", unit: "1/s", description: "Kreisfrequenz des Wechselstroms" },
          { id: "L", label: "Induktivität", symbol: "L", unit: "H", description: "Induktivität der Spule" },
        ],
        umstellungen: [
          { solveFor: "Z_L", expr: "omega * L" },
          { solveFor: "omega", expr: "Z_L / L" },
          { solveFor: "L", expr: "Z_L / omega" },
        ],
        hints: ["Gerechnet wird mit dem Betrag; die Phasenverschiebung von 90° steckt im komplexen Faktor i und wird hier nicht mitgeführt.", "Der Scheinwiderstand der Spule wächst linear mit der Frequenz."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum sind Spannung und Strom im Widerstand nicht phasenverschoben?", options: ["Weil der Widerstand Energie speichert", "Weil die Frequenz sehr hoch gewählt ist", "Weil er weder Induktivität noch Kapazität hat", "Weil der Strom zeitlich konstant bleibt"], correct: 2, explanation: "Ein reiner Widerstand speichert keine Energie → keine Phasenverschiebung." },
    { id: "q2", question: "Wie lautet die Impedanz einer Spule im Wechselstromkreis?", options: ["$Z_L = 1/(i\\omega L)$", "$Z_L = R + i\\omega L$", "$Z_L = \\omega/L$", "$Z_L = i\\omega L$"], correct: 3, explanation: "Für eine ideale Spule gilt $Z_L = i\\omega L$." },
    { id: "q3", question: "Warum sinkt der Scheinwiderstand eines Kondensators mit steigender Frequenz?", options: ["Weil $X_C = 1/(\\omega C)$", "Weil die Kapazität kleiner wird", "Weil die Spannung steigt", "Weil der Strom kleiner wird"], correct: 0, explanation: "Der Blindwiderstand des Kondensators ist invers proportional zur Frequenz." },
    { id: "q4", question: "Was beschreibt die Wirkleistung im Wechselstromkreis?", options: ["Die gesamte aufgenommene Scheinleistung", "Die tatsächlich in Arbeit umgesetzte Leistung", "Die im Feld gespeicherte Blindenergie", "Die maximale Momentanleistung im Zyklus"], correct: 1, explanation: "Wirkleistung ist der Mittelwert der Momentanleistung und beschreibt die nutzbare Arbeit." },
    { id: "q5", question: "Wann tritt im RLC-Kreis maximale Wirkleistung auf?", options: ["Bei $\\omega = 0$", "Bei sehr großen Frequenzen", "Bei $\\omega = \\omega_0 = 1/\\sqrt{LC}$", "Bei sehr kleinen Widerständen"], correct: 2, explanation: "Resonanz → maximale Wirkleistung." },
    { id: "q6", question: "Warum steigt die Spannung einer PV-Anlage bei Einspeisung in ein Netz mit Innenwiderstand?", options: ["Weil der Wechselrichter die Frequenz erhöht", "Weil Blindleistung entsteht", "Weil die PV-Anlage eine höhere Spannung erzeugt", "Weil der Innenwiderstand einen Spannungsabfall erzeugt"], correct: 3, explanation: "$U_s = U_\\mathrm{eff} + R_i I_\\mathrm{eff}$ → zusätzlicher Spannungsabfall am Netzinnenwiderstand." },
  ],
  flashcards: [
    { id: "1up8tg6", front: "Impedanz Spule", back: "$Z_L = i\\omega L$. Strom eilt Spannung um 90° nach." },
    { id: "1isag6j", front: "Impedanz Kondensator", back: "$Z_C = 1/(i\\omega C)$. Strom eilt Spannung um 90° voraus." },
    { id: "11708fl", front: "Wirkleistung", back: "$P = U_\\mathrm{eff} I_\\mathrm{eff}\\cos\\varphi$. Nutztbare Leistung." },
    { id: "02tsqdr", front: "Blindleistung", back: "$Q = U_\\mathrm{eff} I_\\mathrm{eff}\\sin\\varphi$. Belastet das Netz ohne Wirkarbeit." },
    { id: "19eyl6a", front: "Resonanzfrequenz des Schwingkreises", back: "$\\omega_0 = 1/\\sqrt{LC}$. Maximum der Wirkleistung." },
    { id: "0hziqmg", front: "Scheinleistung", back: "$S = U_\\mathrm{eff} I_\\mathrm{eff}$. Gesamtleistung im Wechselstromkreis." },
  ],
} satisfies Thema;
