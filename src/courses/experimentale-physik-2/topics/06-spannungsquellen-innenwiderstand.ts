import type { Thema } from '../../../content/schema'

export const topic = {
  id: "06-spannungsquellen-innenwiderstand",
  title: "Spannungsquellen, Innenwiderstand, reale Quellen, maximale Leistungsübertragung",
  subtitle: "Ideale und reale Quellen, Lastverhalten und Leistungsoptimierung",
  icon: "🔋",
  estimatedMinutes: 70,
  theory: `
## Spannungsquellen und historische Experimente

Eine Spannungsquelle erzeugt eine elektrische Potentialdifferenz. Die Quelle erwähnt die Experimente von Galvani und Volta. Volta erkannte, dass die Spannung durch den Kontakt verschiedener Metalle und eines Elektrolyten entsteht. Ein galvanisches Element besteht typischerweise aus einer Zinkelektrode, einer Kupferelektrode und einem Elektrolyten. Eine solche Zelle liefert etwa $1{,}1\\,\\mathrm{V}$ im unbelasteten Zustand. Eine Zitronenbatterie liefert etwa $0{,}5\\,\\mathrm{V}$ pro Zitrone und etwa $4\\,\\mathrm{mA}$ Kurzschlussstrom.

## Ideale Spannungsquelle

Eine ideale Spannungsquelle besitzt eine feste Spannung $U_0$, unabhängig vom Strom. Für einen Widerstand $R$ gilt:


\\[
I = \\frac{U_0}{R}.
\\]


Die Stromrichtung kann zunächst beliebig angenommen werden; ein negatives Ergebnis zeigt eine entgegengesetzte tatsächliche Richtung.

## Reale Spannungsquelle und Innenwiderstand

Reale Spannungsquellen besitzen einen Innenwiderstand $R_\\mathrm{in}$. Das Ersatzschaltbild besteht aus einer idealen Quelle $U_Q$ und einem Serienwiderstand $R_\\mathrm{in}$. Für einen Lastwiderstand $R$ gilt:


\\[
I = \\frac{U_Q}{R_\\mathrm{in} + R}.
\\]



Die Klemmenspannung ist:


\\[
U_K = U_Q - R_\\mathrm{in} I,
\\]


oder äquivalent:


\\[
U_K = U_Q \\frac{R}{R_\\mathrm{in} + R}.
\\]



Unter Last ist die Klemmenspannung kleiner als die Quellenspannung, da ein Teil der Spannung am Innenwiderstand abfällt.

## Kurzschlussstrom

Beim Kurzschluss $(R = 0)$ ergibt sich:


\\[
I_\\mathrm{max} = \\frac{U_Q}{R_\\mathrm{in}}.
\\]


Ein kleiner Innenwiderstand ermöglicht hohe Kurzschlussströme.

## Verhalten realer Batterien

Die Quelle beschreibt das Verhalten einer Autobatterie: Eine Batterie kann im unbelasteten Zustand eine normale Spannung anzeigen, aber unter Last stark einbrechen. Ein deutlicher Spannungsabfall beim Starten deutet auf einen erhöhten Innenwiderstand und einen möglichen Defekt hin.

## Maximale Leistungsübertragung

Die maximale Leistungsabgabe an einen Lastwiderstand ergibt sich aus:


\\[
P_R = R I^2 = R\\left(\\frac{U_Q}{R_\\mathrm{in} + R}\\right)^2.
\\]



Die Leistung wird maximal, wenn:


\\[
R = R_\\mathrm{in}.
\\]



Dies ist der Satz der maximalen Leistungsübertragung. Der Wirkungsgrad beträgt dabei nur $50\\%$, da die gleiche Leistung im Innenwiderstand umgesetzt wird.

## Kennlinie und Kapazität

Trägt man die Klemmenspannung über dem entnommenen Strom auf, ergibt sich für eine reale Quelle eine fallende Gerade: Der Achsenabschnitt ist die Leerlaufspannung $U_Q$, die Steigung ist $-R_\\mathrm{in}$, der Schnittpunkt mit der Stromachse der Kurzschlussstrom. Zwei Messpunkte unter verschiedenen Lasten genügen daher, um beide Kenngrößen einer Quelle zu bestimmen.

Die auf Batterien angegebene Kapazität in Amperestunden ist keine Kapazität im Sinne eines Kondensators, sondern die entnehmbare Ladung: $1\\,\\mathrm{Ah} = 3600\\,\\mathrm{C}$. Mit der Zellspannung multipliziert ergibt sich der Energieinhalt. Der Innenwiderstand wächst über die Lebensdauer und bei Kälte — deshalb sieht eine alte Batterie im Leerlauf noch gut aus und bricht unter Last ein.

## Reale Quellen im Betrieb

Ob eine Quelle als ideal behandelt werden darf, entscheidet das Verhältnis $R_\\mathrm{in}/R$. Ist der Lastwiderstand groß gegen den Innenwiderstand, weicht die Klemmenspannung nur wenig von der Quellenspannung ab, und die Rechnung mit der idealen Quelle ist zulässig. Bei kleinen Lastwiderständen — Anlasser, Kurzschluss, Schweißgerät — bestimmt dagegen der Innenwiderstand das Verhalten. Neben Spannungsquellen gibt es das duale Modell der Stromquelle, die einen festen Strom einprägt und deren Innenwiderstand parallel liegt; beide Ersatzschaltbilder lassen sich ineinander umrechnen und beschreiben dasselbe Klemmenverhalten.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "klemmenspannung",
        name: "Klemmenspannung realer Spannungsquelle",
        equation: "U_K = U_Q - R_in * I",
        variables: [
          { id: "U_K", label: "Klemmenspannung", symbol: "U_K", unit: "V", description: "Spannung an den Klemmen der Quelle unter Last" },
          { id: "U_Q", label: "Quellenspannung", symbol: "U_Q", unit: "V", description: "Ideale Spannung der Quelle" },
          { id: "R_in", label: "Innenwiderstand", symbol: "R_in", unit: "ohm", description: "Innenwiderstand der Quelle" },
          { id: "I", label: "Strom", symbol: "I", unit: "A", description: "Strom durch die Last" },
        ],
        umstellungen: [
          { solveFor: "U_K", expr: "U_Q - R_in * I" },
          { solveFor: "U_Q", expr: "U_K + R_in * I" },
          { solveFor: "R_in", expr: "(U_Q - U_K) / I" },
          { solveFor: "I", expr: "(U_Q - U_K) / R_in" },
        ],
        hints: ["Unter Last fällt ein Teil der Spannung am Innenwiderstand ab.", "Je kleiner der Innenwiderstand, desto höher die Klemmenspannung unter Last."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum ist die Klemmenspannung einer realen Spannungsquelle kleiner als die Quellenspannung?", options: ["Weil die Quelle keine Spannung liefern kann", "Weil ein Teil der Spannung am Innenwiderstand abfällt", "Weil der Lastwiderstand immer größer ist als der Innenwiderstand", "Weil der Strom immer null ist"], correct: 1, explanation: "Reale Quellen besitzen $R_\\mathrm{in}$, an dem Spannung abfällt." },
    { id: "q2", question: "Wovon hängt der maximale Kurzschlussstrom ab?", options: ["Vom Lastwiderstand", "Von der Temperatur", "Vom Innenwiderstand", "Von der Klemmenspannung"], correct: 2, explanation: "$I_\\mathrm{max} = U_Q / R_\\mathrm{in}$ → je kleiner $R_\\mathrm{in}$, desto größer der Kurzschlussstrom." },
    { id: "q3", question: "Was deutet laut Quelle auf einen erhöhten Innenwiderstand einer Batterie hin?", options: ["Hohe Spannung im Leerlauf", "Konstante Spannung bei Belastung", "Hoher Kurzschlussstrom", "Starker Spannungsabfall unter Last"], correct: 3, explanation: "Ein Spannungszusammenbruch beim Starten zeigt erhöhten Innenwiderstand." },
    { id: "q4", question: "Wann liefert eine Spannungsquelle die maximale Leistung an eine Last?", options: ["Wenn $R = R_\\mathrm{in}$", "Wenn $R = 0$", "Wenn $R$ sehr groß ist", "Wenn $R = 2 R_\\mathrm{in}$"], correct: 0, explanation: "Satz der maximalen Leistungsübertragung: Maximum bei $R = R_\\mathrm{in}$." },
    { id: "q5", question: "Quelle: $U_Q = 12\\,\\mathrm{V}$, $R_\\mathrm{in} = 2\\,\\Omega$, Last $R = 2\\,\\Omega$. Klemmenspannung?", options: ["12 V", "6 V", "4 V", "3 V"], correct: 1, explanation: "$I = 12/(2+2) = 3\\,\\mathrm{A}$, $U_K = 12 - 2\\cdot3 = 6\\,\\mathrm{V}$." },
    { id: "q6", question: "Quelle: $U_Q = 9\\,\\mathrm{V}$, $R_\\mathrm{in} = 3\\,\\Omega$. Kurzschlussstrom?", options: ["1 A", "2 A", "3 A", "4 A"], correct: 2, explanation: "Kurzschluss: $I_\\mathrm{max} = 9/3 = 3\\,\\mathrm{A}$." },
  ],
  flashcards: [
    { id: "1rjccyg", front: "Reale Quelle", back: "$I = U_Q/(R_\\mathrm{in} + R)$. Innenwiderstand reduziert den Strom." },
    { id: "027sypm", front: "Klemmenspannung", back: "$U_K = U_Q - R_\\mathrm{in} I$. Unter Last kleiner als Quellenspannung." },
    { id: "17xe8kb", front: "Kurzschlussstrom", back: "$I_\\mathrm{max} = U_Q/R_\\mathrm{in}$. Kleiner Innenwiderstand → großer Strom." },
    { id: "15mvch8", front: "Maximale Leistung", back: "Maximum bei $R = R_\\mathrm{in}$. Wirkungsgrad 50 %." },
    { id: "0rwk6pc", front: "Zitronenbatterie", back: "Etwa $0{,}5\\,\\mathrm{V}$ pro Zitrone, ca. $4\\,\\mathrm{mA}$ Kurzschlussstrom." },
    { id: "1axld5q", front: "Autobatterie", back: "Spannungsabfall unter Last deutet auf erhöhten Innenwiderstand." },
  ],
} satisfies Thema;
