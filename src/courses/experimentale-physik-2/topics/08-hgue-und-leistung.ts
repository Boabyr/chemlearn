import type { Thema } from '../../../content/schema'

export const topic = {
  id: "08-hgue-und-leistung",
  title: "Hochspannungs-Gleichstromübertragung (HGÜ), Leistung, Verluste",
  subtitle: "Leistung, Strom, Verluste und Gründe für HGÜ",
  icon: "⚡",
  estimatedMinutes: 60,
  theory: `
## Elektrische Leistung

Die elektrische Leistung ist definiert als Arbeit pro Zeit:


\\[
P = \\frac{\\mathrm{d}W}{\\mathrm{d}t}.
\\]


Mit $\\mathrm{d}W = U\\,\\mathrm{d}Q$ und $I = \\mathrm{d}Q/\\mathrm{d}t$ folgt:


\\[
P = UI.
\\]



Für ohmsche Widerstände gelten zusätzlich:


\\[
P = RI^2,
\\qquad
P = \\frac{U^2}{R}.
\\]



## Strom und Verluste bei Energieübertragung

Für die Energieübertragung gilt:


\\[
I = \\frac{P}{U}.
\\]


Eine höhere Spannung führt bei gleicher Leistung zu einem kleineren Strom. Die Leitungsverluste betragen:


\\[
P_V = I^2 R_L.
\\]


Da die Verluste quadratisch mit dem Strom steigen, reduziert eine hohe Spannung die Verluste deutlich.

## HGÜ – typische Werte und Eigenschaften

Die Quelle nennt typische HGÜ‑Werte:
- Einsatz bei sehr langen Leitungen (ab ca. $750\\,\\mathrm{km}$)
- relative Verluste etwa $6{,}4\\%$ pro $1000\\,\\mathrm{km}$
- Spannungen um $450\\,\\mathrm{kV}$

Diese Werte sind beispielhafte Größenordnungen und hängen von den konkreten Betriebsbedingungen ab. Eine Begrenzung der Spannung kann durch Koronaentladungen entstehen.

HGÜ wird eingesetzt, weil Gleichstrom über lange Strecken geringere Verluste verursacht und keine Blindleistung entsteht. Außerdem ermöglicht HGÜ die Kopplung von Netzen unterschiedlicher Frequenz.

## Wirkungsgrad

Nicht jede zugeführte Leistung erscheint als Nutzleistung. Der Wirkungsgrad ist


\\[
\\eta = \\frac{P_\\mathrm{nutz}}{P_\\mathrm{zu}}.
\\]


An einem ohmschen Widerstand wird die gesamte aufgenommene Leistung in Wärme umgesetzt — beim Heizgerät ist das der Nutzen, in der Leitung der Verlust. Dieselbe Formel beschreibt beide Fälle; erst die Anwendung entscheidet, was als Nutzleistung zählt.

## Wechselstrom und Effektivwerte

Bei Wechselspannung schwankt die Momentanleistung. Damit die bekannten Formeln weiter gelten, rechnet man mit Effektivwerten: Der Effektivwert ist derjenige Gleichwert, der an einem Widerstand dieselbe mittlere Leistung umsetzt. Für den Sinusverlauf gilt


\\[
U_\\mathrm{eff} = \\frac{\\hat{U}}{\\sqrt{2}}.
\\]


Die Netzspannung von $230\\,\\mathrm{V}$ ist ein Effektivwert, der Scheitelwert liegt bei etwa $325\\,\\mathrm{V}$. Die mittlere Wirkleistung ist dann $P = U_\\mathrm{eff} I_\\mathrm{eff}\\cos\\varphi$ mit der Phasenverschiebung $\\varphi$ zwischen Strom und Spannung.

## Größenordnungen im Haushalt

Ein Wasserkocher nimmt rund $2\\,\\mathrm{kW}$ auf und zieht am $230\\,\\mathrm{V}$-Netz knapp $9\\,\\mathrm{A}$. Eine übliche Haushaltssicherung von $16\\,\\mathrm{A}$ erlaubt an einem Stromkreis somit etwa $3{,}7\\,\\mathrm{kW}$. Sie schützt nicht das Gerät, sondern die Leitung: Sie löst aus, bevor die Leitung durch $P_V = I^2 R_L$ so warm wird, dass die Isolierung Schaden nimmt.

## Energie und Abrechnung

Die Leistung sagt, wie schnell Energie umgesetzt wird; abgerechnet wird die Energie selbst:


\\[
W = \\int P\\,\\mathrm{d}t = U I t
\\]


bei konstanten Werten. Die im Haushalt übliche Einheit ist die Kilowattstunde: $1\\,\\mathrm{kWh} = 3{,}6\\cdot10^6\\,\\mathrm{J}$. Ein Gerät mit $2\\,\\mathrm{kW}$ verbraucht in einer halben Stunde also genau $1\\,\\mathrm{kWh}$. Für die Bewertung von Standby-Verlusten zählt nicht die kleine Leistung, sondern ihre lange Einschaltdauer: $2\\,\\mathrm{W}$ über ein ganzes Jahr ergeben rund $17{,}5\\,\\mathrm{kWh}$.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "leistung-ui",
        name: "Elektrische Leistung",
        equation: "P = U * I",
        variables: [
          { id: "P", label: "Leistung", symbol: "P", unit: "W", description: "Elektrische Leistung" },
          { id: "U", label: "Spannung", symbol: "U", unit: "V", description: "Anliegende Spannung" },
          { id: "I", label: "Strom", symbol: "I", unit: "A", description: "Fließender Strom" },
        ],
        umstellungen: [
          { solveFor: "P", expr: "U * I" },
          { solveFor: "U", expr: "P / I" },
          { solveFor: "I", expr: "P / U" },
        ],
        hints: ["Hohe Spannung reduziert den Strom und damit die Leitungsverluste.", "Für ohmsche Lasten gilt zusätzlich $P = RI^2$ und $P = U^2/R$."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum reduziert eine hohe Spannung die Leitungsverluste?", options: ["Weil die Leitung dadurch kürzer wird", "Weil der Widerstand sinkt", "Weil die Leistung kleiner wird", "Weil der Strom kleiner wird"], correct: 3, explanation: "Bei gleicher Leistung gilt $I = P/U$. Höhere Spannung → kleinerer Strom → kleinere Verluste." },
    { id: "q2", question: "Wie lautet die Definition der elektrischen Leistung?", options: ["$P = \\mathrm{d}W/\\mathrm{d}t$", "$P = \\mathrm{d}Q/\\mathrm{d}t$", "$P = \\mathrm{d}W/\\mathrm{d}Q$", "$P = \\mathrm{d}I/\\mathrm{d}t$"], correct: 0, explanation: "Leistung ist Arbeit pro Zeit: $P = \\mathrm{d}W/\\mathrm{d}t$." },
    { id: "q3", question: "Warum verursacht ein kleiner Strom geringere Verluste?", options: ["Weil der Widerstand kleiner wird", "Weil die Verluste proportional zu $I^2$ sind", "Weil die Spannung kleiner wird", "Weil die Leitung kälter bleibt"], correct: 1, explanation: "Leitungsverluste: $P_V = I^2 R_L$. Kleine Ströme → deutlich kleinere Verluste." },
    { id: "q4", question: "Was begrenzt laut Quelle die maximal nutzbare Spannung?", options: ["Leitungsdicke", "Temperatur", "Koronaentladungen", "Frequenz"], correct: 2, explanation: "Hohe elektrische Feldstärken können Koronaentladungen verursachen." },
    { id: "q5", question: "Eine Leitung überträgt $1000\\,\\mathrm{MW}$ bei $500\\,\\mathrm{kV}$. Strom?", options: ["1000 A", "500 A", "2 A", "2000 A"], correct: 3, explanation: "$I = P/U = 1000\\cdot10^6 / 500\\cdot10^3 = 2000\\,\\mathrm{A}$." },
    { id: "q6", question: "Leitung: $I = 1000\\,\\mathrm{A}$, $R_L = 1\\,\\Omega$. Verlustleistung?", options: ["1 MW", "1 kW", "100 kW", "10 MW"], correct: 0, explanation: "$P_V = I^2 R_L = 1000^2 \\cdot 1 = 1\\,\\mathrm{MW}$." },
  ],
  flashcards: [
    { id: "083dau6", front: "Leistung", back: "$P = UI$. Für ohmsche Lasten auch $P = RI^2$ oder $P = U^2/R$." },
    { id: "14okp19", front: "Verluste", back: "$P_V = I^2 R_L$. Kleine Ströme reduzieren die Verluste stark." },
    { id: "17hw9y1", front: "HGÜ-Spannung", back: "Hohe Spannung → kleiner Strom → geringere Verluste." },
    { id: "1yfjzwv", front: "HGÜ-Verluste", back: "Beispielwerte: ca. $6{,}4\\%$ pro $1000\\,\\mathrm{km}$." },
    { id: "0d9m2bt", front: "Korona", back: "Koronaentladungen begrenzen die maximal nutzbare Spannung." },
    { id: "0qudhq0", front: "DC-Vorteil", back: "Keine Blindleistung, geringere Verluste, Kopplung unterschiedlicher Netze möglich." },
  ],
} satisfies Thema;
