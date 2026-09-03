import type { Thema } from '../../../content/schema'

export const topic = {
  id: "05-kirchhoff-und-schaltungen",
  title: "Kirchhoffsche Regeln, Reihen- & Parallelschaltungen, komplexe Netzwerke",
  subtitle: "Grundlagen elektrischer Netzwerke und systematische Analyse",
  icon: "🔀",
  estimatedMinutes: 70,
  theory: `
## Kirchhoffsche Knotenregel

Die Knotenregel folgt aus der Ladungserhaltung: Die Summe der zufließenden Ströme ist gleich der Summe der abfließenden Ströme. An einem Knoten gilt:


\\[
I_\\mathrm{zu} = I_\\mathrm{ab}.
\\]


Beispiel aus der Quelle:


\\[
I_1 = I_2 + I_3.
\\]



## Kirchhoffsche Maschenregel

Die Maschenregel besagt, dass in jeder geschlossenen Masche die Summe aller Spannungen null ist:


\\[
\\sum U_i = 0.
\\]


Die Vorzeichen hängen von der gewählten Durchlaufrichtung ab. Spannungsquellen und Spannungsabfälle werden entsprechend der Orientierung positiv oder negativ gezählt.

## Reihenschaltung

In einer Reihenschaltung fließt durch alle Widerstände derselbe Strom. Der Gesamtwiderstand ist die Summe der Einzelwiderstände:


\\[
R_\\mathrm{ges} = R_1 + R_2 + \\dots.
\\]


Die Spannungen addieren sich:


\\[
U_0 = \\sum U_i.
\\]



## Parallelschaltung

In einer Parallelschaltung liegt an allen Widerständen dieselbe Spannung an. Die Teilströme sind:


\\[
I_i = \\frac{U}{R_i}.
\\]


Der Gesamtstrom ist:


\\[
I = \\sum I_i.
\\]


Der Gesamtwiderstand lautet:


\\[
\\frac{1}{R_\\mathrm{ges}} = \\sum \\frac{1}{R_i}.
\\]


Für zwei Widerstände:


\\[
R_\\mathrm{ges} = \\frac{R_1 R_2}{R_1 + R_2}.
\\]



## Komplexe Netzwerke

Komplexe Schaltungen lassen sich nicht immer durch Reihen- oder Parallelschaltungen vereinfachen. Die Quelle zeigt ein Beispiel mit drei Widerständen und zwei Spannungsquellen. Die Gleichungen lauten:


\\[
U_1 - R_1 I_1 + R_3 I_3 = 0,
\\]




\\[
-U_2 - R_2 I_2 - R_3 I_3 = 0,
\\]




\\[
I_2 = I_1 + I_3.
\\]



Mit konkreten Werten ergeben sich Ströme, deren Vorzeichen zeigen, dass die tatsächliche Stromrichtung von der angenommenen abweichen kann. Die Kirchhoff-Regeln erlauben eine systematische Analyse beliebiger Netzwerke.

## Spannungsteiler

Die Reihenschaltung ist der einfachste Anwendungsfall der Maschenregel. Da durch beide Widerstände derselbe Strom fließt, verteilt sich die Gesamtspannung im Verhältnis der Widerstände:


\\[
\\frac{U_1}{U_2} = \\frac{R_1}{R_2},
\\qquad
U_2 = U_0\\,\\frac{R_2}{R_1 + R_2}.
\\]


Ein belasteter Spannungsteiler liefert eine kleinere Teilspannung als der unbelastete, weil der Lastwiderstand parallel zu $R_2$ liegt.

## Vorgehen bei Netzwerken

Für ein Netzwerk mit $k$ Knoten und $z$ Zweigen liefert die Knotenregel $k-1$ unabhängige Gleichungen; die Maschenregel steuert so viele weitere bei, bis $z$ Gleichungen für $z$ unbekannte Zweigströme vorliegen. Praktisch geht man in vier Schritten vor: Stromrichtungen willkürlich festlegen, Umlaufsinn je Masche festlegen, Gleichungen aufstellen, lösen. Kommt ein Strom negativ heraus, war nur die anfängliche Annahme über die Richtung falsch — der Betrag stimmt. Das Vorzeichen ist also kein Rechenfehler, sondern Teil des Ergebnisses.

## Ersatzwiderstand schrittweise

Viele Netzwerke lassen sich ohne Gleichungssystem lösen, indem man von innen nach außen zusammenfasst: Zuerst werden reine Reihen- und Parallelgruppen durch ihren Ersatzwiderstand ersetzt, bis nur noch ein einziger Widerstand an der Quelle liegt. Aus dem Gesamtstrom rechnet man dann rückwärts die Teilspannungen und Teilströme aus. Wichtig ist dabei die Kontrolle: In der Reihenschaltung ist der Ersatzwiderstand immer größer als der größte Einzelwiderstand, in der Parallelschaltung immer kleiner als der kleinste. Weicht das Ergebnis davon ab, steckt ein Vorzeichen- oder Kehrwertfehler in der Rechnung. Brücken- und Ringschaltungen entziehen sich diesem Verfahren; dort führt nur der Ansatz über die Kirchhoff-Regeln zum Ziel.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "parallel-widerstand",
        name: "Parallelschaltung zweier Widerstände",
        equation: "R_ges = (R1 * R2) / (R1 + R2)",
        variables: [
          { id: "R_ges", label: "Gesamtwiderstand", symbol: "R_\\mathrm{ges}", unit: "ohm", description: "Effektiver Widerstand der Parallelschaltung" },
          { id: "R1", label: "Widerstand 1", symbol: "R_1", unit: "ohm", description: "Erster Einzelwiderstand" },
          { id: "R2", label: "Widerstand 2", symbol: "R_2", unit: "ohm", description: "Zweiter Einzelwiderstand" },
        ],
        umstellungen: [
          { solveFor: "R_ges", expr: "(R1 * R2) / (R1 + R2)" },
          { solveFor: "R1", expr: "(R_ges * R2) / (R2 - R_ges)" },
          { solveFor: "R2", expr: "(R_ges * R1) / (R1 - R_ges)" },
        ],
        hints: ["Der Gesamtwiderstand ist immer kleiner als der kleinste Einzelwiderstand.", "Die Formel gilt nur für genau zwei parallele Widerstände."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Was besagt die Knotenregel?", options: ["Summe der zufließenden gleich der abfließenden Ströme", "Summe aller Spannungen in der Masche ist null", "Summe aller Ströme im Netzwerk ist konstant", "Summe aller Widerstände am Knoten ist konstant"], correct: 0, explanation: "Die Knotenregel folgt aus Ladungserhaltung: Zufluss = Abfluss." },
    { id: "q2", question: "Warum hängt das Vorzeichen der Spannungen von der Durchlaufrichtung ab?", options: ["Weil Widerstände richtungsabhängig sind", "Weil die Orientierung Quelle und Abfall trennt", "Weil Spannungen immer positiv gezählt werden", "Weil die Ströme die Durchlaufrichtung vorgeben"], correct: 1, explanation: "Je nach Orientierung zählt man Spannungsquellen und Spannungsabfälle positiv oder negativ." },
    { id: "q3", question: "Welche Größe ist in einer Reihenschaltung für alle Widerstände gleich?", options: ["Spannung", "Leistung", "Strom", "Widerstand"], correct: 2, explanation: "In der Reihe fließt überall derselbe Strom." },
    { id: "q4", question: "Welche Größe ist in einer Parallelschaltung für alle Widerstände gleich?", options: ["Strom", "Leistung", "Widerstand", "Spannung"], correct: 3, explanation: "In der Parallelschaltung liegt überall dieselbe Spannung an." },
    { id: "q5", question: "Zwei Widerstände: 3 Ω und 7 Ω. Gesamtwiderstand?", options: ["10 Ω", "21 Ω", "4 Ω", "1 Ω"], correct: 0, explanation: "Reihenschaltung: $R_\\mathrm{ges} = 3 + 7 = 10\\,\\Omega$." },
    { id: "q6", question: "Zwei Widerstände: 4 Ω und 4 Ω. Gesamtwiderstand?", options: ["8 Ω", "2 Ω", "4 Ω", "1 Ω"], correct: 1, explanation: "Parallelschaltung: $R_\\mathrm{ges} = (4\\cdot4)/(4+4) = 2\\,\\Omega$." },
  ],
  flashcards: [
    { id: "1ubmlez", front: "Knotenregel", back: "$\\sum I_\\mathrm{zu} = \\sum I_\\mathrm{ab}$. Folgt aus Ladungserhaltung." },
    { id: "1b91853", front: "Maschenregel", back: "$\\sum U_i = 0$. Vorzeichen durch Orientierung bestimmt." },
    { id: "1f76xqt", front: "Reihenschaltung", back: "$R_\\mathrm{ges} = \\sum R_i$. Strom ist überall gleich." },
    { id: "1m06us9", front: "Parallelschaltung", back: "$1/R_\\mathrm{ges} = \\sum 1/R_i$. Spannung ist überall gleich." },
    { id: "1e3puae", front: "Stromrichtung", back: "Negative Lösung eines Stroms zeigt, dass die tatsächliche Richtung anders verläuft als angenommen." },
    { id: "1xxdrkx", front: "Komplexe Netzwerke", back: "Kirchhoff-Regeln liefern lineare Gleichungen für beliebige Netzwerke." },
  ],
} satisfies Thema;
