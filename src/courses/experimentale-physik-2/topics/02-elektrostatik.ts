import type { Thema } from '../../../content/schema'

export const topic = {
  id: "02-elektrostatik",
  title: "Elektrostatik",
  subtitle: "Felder, Kräfte und Potentiale im stationären Fall",
  icon: "⚡",
  estimatedMinutes: 75,
  theory: `
## Elektrische Ladung

Die Elektrostatik behandelt elektrische Felder und Kräfte im stationären Fall, also ohne zeitliche Änderung der Ladungsverteilung. Die Quelle beginnt mit der elektrischen Ladung als grundlegender Größe. Es existieren zwei Arten von Ladung: positive und negative. Gleichnamige Ladungen stoßen sich ab, ungleichnamige ziehen sich an. Die Gesamtladung eines abgeschlossenen Systems bleibt erhalten. Die Elementarladung beträgt laut Quelle $e = 1{,}602\\,176\\,634\\cdot10^{-19}\\ \\mathrm{C}$; Elektronen tragen die Ladung $-e$, Protonen die Ladung $+e$. Ladung ist quantisiert: $Q = ne$.

## Leiter, Isolatoren und Influenz

Leiter und Isolatoren unterscheiden sich durch die Beweglichkeit ihrer Ladungsträger. In Leitern können sich Elektronen frei bewegen. Im elektrostatischen Gleichgewicht gilt im Inneren eines idealen Leiters: $\\vec{E}_\\mathrm{innen} = 0$. Überschüssige Ladung befindet sich ausschließlich auf der Oberfläche, das Potential ist im gesamten Leiter konstant. Feldlinien stehen senkrecht auf der Leiteroberfläche.

In Isolatoren sind Ladungen nicht frei beweglich, können sich aber geringfügig verschieben — dieser Vorgang heißt Polarisation. Influenz beschreibt die Ladungsverschiebung in einem Leiter durch ein äußeres elektrisches Feld ohne direkten Kontakt. Die Gesamtladung bleibt dabei unverändert. Eine dauerhafte Aufladung entsteht erst, wenn die Leiterhälften getrennt werden, bevor der geladene Körper entfernt wird.

## Coulomb-Gesetz und Superposition

Das Coulomb-Gesetz beschreibt die Kraft zwischen zwei Punktladungen:


\\[
F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|q_1 q_2|}{r^2}.
\\]


Die Kraft wirkt entlang der Verbindungslinie und nimmt mit $1/r^2$ ab. Gleichnamige Ladungen stoßen sich ab, ungleichnamige ziehen sich an.

Das Superpositionsprinzip besagt, dass sich Kräfte mehrerer Ladungen vektoriell addieren:


\\[
\\vec{F}_\\mathrm{ges} = \\sum_i \\vec{F}_i.
\\]


Für die Berechnung werden Einzelkräfte bestimmt, in Komponenten zerlegt und anschließend addiert.

## Elektrisches Feld und Feldlinien

Das elektrische Feld ist definiert als Kraft pro Probeladung:


\\[
\\vec{E} = \\frac{\\vec{F}}{q}.
\\]


Eine Punktladung $Q$ erzeugt ein radialsymmetrisches Feld:


\\[
\\vec{E}(r) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2}\\hat{\\vec{r}}.
\\]


Positive Ladungen erzeugen Feldlinien nach außen, negative nach innen.

Feldlinien visualisieren Richtung und Stärke des Feldes. Sie beginnen bei positiven und enden bei negativen Ladungen, kreuzen sich nie und stehen auf Leiteroberflächen senkrecht. Eine hohe Feldliniendichte bedeutet ein starkes Feld.

## Elektrischer Fluss und Gaußsches Gesetz

Der elektrische Fluss lautet:


\\[
\\Phi_\\mathrm{el} = \\int_A \\vec{E}\\cdot d\\vec{A}.
\\]


Für ein homogenes Feld gilt $\\Phi_\\mathrm{el} = EA\\cos\\theta$.

Das Gaußsche Gesetz verknüpft den Fluss durch eine geschlossene Oberfläche mit der eingeschlossenen Ladung:


\\[
\\oint \\vec{E}\\cdot d\\vec{A} = \\frac{Q_\\mathrm{innen}}{\\varepsilon_0}.
\\]



Eine unendlich ausgedehnte Platte mit Flächenladungsdichte $\\sigma$ erzeugt ein konstantes Feld:


\\[
E = \\frac{\\sigma}{2\\varepsilon_0}.
\\]


Zwischen zwei entgegengesetzt geladenen Platten gilt:


\\[
E = \\frac{\\sigma}{\\varepsilon_0}.
\\]



## Potential, Laplace- und Poisson-Gleichung

Das elektrische Potential ist ein Skalar und über


\\[
\\vec{E} = -\\nabla\\phi
\\]


mit dem Feld verknüpft. Eine Punktladung besitzt das Potential:


\\[
\\phi(r) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r}.
\\]


Potentiale addieren sich algebraisch.

Die Poisson-Gleichung lautet:


\\[
\\Delta\\phi = -\\frac{\\rho}{\\varepsilon_0},
\\]


in ladungsfreien Bereichen folgt die Laplace-Gleichung:


\\[
\\Delta\\phi = 0.
\\]


Auf einem Gitter entspricht das Potential eines inneren Punktes dem Mittelwert der Nachbarn.

Die Arbeit zum Verschieben einer Ladung ist:


\\[
W = q[\\phi(P_2) - \\phi(P_1)],
\\]


die Spannung ist $U_{21} = \\phi(P_2) - \\phi(P_1)$.

## Leitende Hohlkugel, Spitzenwirkung, Faradayscher Käfig

Eine leitende Hohlkugel besitzt im Inneren kein elektrisches Feld, aber ein konstantes Potential. Außerhalb verhält sie sich wie eine Punktladung. Kleine Krümmungsradien führen zu starker Feldkonzentration (Spitzenwirkung). Ein Faradayscher Käfig ist im Inneren feldfrei.

## Kondensator und Energie

Ein Kondensator speichert Ladung und Energie. Seine Kapazität ist:


\\[
C = \\frac{|Q|}{|U|}.
\\]


Für einen Plattenkondensator gilt:


\\[
C = \\varepsilon_0\\frac{A}{d}.
\\]


Die Energie lautet:


\\[
E_\\mathrm{el} = \\frac{1}{2} C U^2.
\\]


Bei Änderung des Plattenabstands bleibt entweder $Q$ (abgeklemmt) oder $U$ (angeschlossen) konstant.

## Dipol und Dielektrika

Ein Dipol besitzt das Moment:


\\[
\\vec{p} = Q\\vec{d},
\\]


und erfährt im Feld ein Drehmoment:


\\[
\\vec{M} = \\vec{p}\\times\\vec{E}.
\\]



Dielektrika polarisieren im Feld. Die elektrische Verschiebung ist:


\\[
\\vec{D} = \\varepsilon_0\\vec{E} + \\vec{P},
\\]


für lineare isotrope Materialien gilt:


\\[
\\vec{D} = \\varepsilon\\vec{E}.
\\]


Ein Dielektrikum erhöht die Kapazität eines Kondensators auf:


\\[
C = \\varepsilon_r C_0.
\\]
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "coulomb-kraft",
        name: "Coulomb-Kraft",
        equation: "F = k * abs(q1 * q2) / r^2",
        variables: [
          { id: "F", label: "Kraft", symbol: "F", unit: "N", description: "Elektrische Kraft zwischen zwei Punktladungen" },
          { id: "k", label: "Coulomb-Konstante", symbol: "k", unit: "N*m^2/C^2", description: "k = 1/(4*pi*epsilon0)" },
          { id: "q1", label: "Ladung 1", symbol: "q_1", unit: "C", description: "Erste Punktladung" },
          { id: "q2", label: "Ladung 2", symbol: "q_2", unit: "C", description: "Zweite Punktladung" },
          { id: "r", label: "Abstand", symbol: "r", unit: "m", description: "Abstand zwischen den Ladungen" },
        ],
        umstellungen: [
          { solveFor: "F", expr: "k * abs(q1 * q2) / r^2" },
          { solveFor: "k", expr: "F * r^2 / abs(q1 * q2)" },
          { solveFor: "q1", expr: "F * r^2 / (k * q2)" },
          { solveFor: "q2", expr: "F * r^2 / (k * q1)" },
          { solveFor: "r", expr: "sqrt(k * abs(q1 * q2) / F)" },
        ],
        hints: ["Die Kraft nimmt quadratisch mit dem Abstand ab.", "Gleichnamige Ladungen stoßen sich ab, ungleichnamige ziehen sich an."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Welche Aussage trifft die Quelle über die Gesamtladung eines abgeschlossenen Systems?", options: ["Sie kann spontan entstehen.", "Sie bleibt erhalten.", "Sie hängt vom Medium ab.", "Sie ist immer null."], correct: 1, explanation: "Die Quelle betont explizit die Ladungserhaltung: Die Gesamtladung bleibt konstant." },
    { id: "q2", question: "Warum ist im Inneren eines idealen Leiters das elektrische Feld null?", options: ["Weil die Ladungen im Gitter eingefroren sind.", "Weil ein Leiter überhaupt keine Ladungen besitzt.", "Weil sich Ladungen bis zur Kompensation verschieben.", "Weil das Coulomb-Gesetz im Metall nicht gilt."], correct: 2, explanation: "Im elektrostatischen Gleichgewicht ordnen sich die freien Elektronen so an, dass $\\vec{E}_\\mathrm{innen}=0$." },
    { id: "q3", question: "Welche Bedeutung hat die Feldliniendichte laut Quelle?", options: ["Sie zeigt die Richtung der Kraft.", "Sie zeigt die Ladungsmenge.", "Sie zeigt die Geschwindigkeit der Elektronen.", "Sie zeigt die Stärke des Feldes."], correct: 3, explanation: "Hohe Feldliniendichte bedeutet starkes elektrisches Feld." },
    { id: "q4", question: "Wovon hängt der Nettofluss durch eine geschlossene Oberfläche ab?", options: ["Von der eingeschlossenen Ladung.", "Von der Form der Oberfläche.", "Von der Geschwindigkeit der Ladungen.", "Vom Material der Oberfläche."], correct: 0, explanation: "Nach Gauß: $\\oint \\vec{E}\\cdot d\\vec{A} = Q_\\mathrm{innen}/\\varepsilon_0$." },
    { id: "q5", question: "Zwei Punktladungen besitzen $q_1 = 2e$ und $q_2 = 3e$ im Abstand $r$. Wie ändert sich die Kraft, wenn beide Ladungen verdoppelt werden?", options: ["bleibt gleich", "verachtfacht sich", "verdoppelt sich", "vervierfacht sich"], correct: 1, explanation: "Kraft ∝ $q_1 q_2$. Verdoppeln beider Ladungen → Faktor 4 im Produkt → Kraft ×4. Da beide verdoppelt werden: $2\\cdot2 \\cdot 3\\cdot2 = 8$-fach." },
    { id: "q6", question: "Ein Plattenkondensator besitzt Fläche $A$ und Abstand $d$. Wie ändert sich $C$, wenn $A$ verdoppelt wird?", options: ["halbiert sich", "bleibt gleich", "verdoppelt sich", "vervierfacht sich"], correct: 2, explanation: "$C = \\varepsilon_0 A/d$. Verdoppelt man $A$, verdoppelt sich $C$." },
  ],
  flashcards: [
    { id: "1xodxtf", front: "Elementarladung", back: "$e = 1{,}602\\cdot10^{-19}\\ \\mathrm{C}$. Ladung ist quantisiert: $Q = ne$." },
    { id: "0lt2f3p", front: "Coulomb-Gesetz", back: "$F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|q_1 q_2|}{r^2}$. Kraft wirkt entlang der Verbindungslinie und nimmt mit $1/r^2$ ab." },
    { id: "1g3nqhq", front: "Elektrisches Feld", back: "$\\vec{E} = \\vec{F}/q$. Eine Punktladung erzeugt ein radialsymmetrisches Feld mit Betrag $\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2}$." },
    { id: "1buvjx1", front: "Gaußsches Gesetz", back: "$\\oint \\vec{E}\\cdot d\\vec{A} = Q_\\mathrm{innen}/\\varepsilon_0$. Der Fluss hängt nur von der eingeschlossenen Ladung ab." },
    { id: "1jceag9", front: "Kapazität", back: "$C = |Q|/|U|$. Für Plattenkondensatoren gilt $C = \\varepsilon_0 A/d$." },
    { id: "0v22qjv", front: "Dielektrikum", back: "Ein Dielektrikum erhöht die Kapazität: $C = \\varepsilon_r C_0$. Ursache ist Polarisation im Material." },
  ],
} satisfies Thema;
