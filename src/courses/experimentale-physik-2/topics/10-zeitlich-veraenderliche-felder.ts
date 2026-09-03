import type { Thema } from '../../../content/schema'

export const topic = {
  id: "10-zeitlich-veraenderliche-felder",
  title: "zeitlich veränderliche Felder",
  subtitle: "Induktion, Wirbelströme, Motorprinzip, Maxwell-Gleichungen",
  icon: "🔄",
  estimatedMinutes: 85,
  theory: `
## Induktion durch zeitlich veränderliche Magnetfelder

Ein zeitlich veränderliches Magnetfeld erzeugt ein elektrisches Feld. Dies ist der Kern des Induktionsgesetzes. Wird ein Stabmagnet durch eine Leiterschleife geschoben, entsteht zwischen den Enden der Schleife eine Spannung. Das Induktionsgesetz lautet:


\\[
U_\\mathrm{ind} = \\oint \\vec{E}\\cdot \\mathrm{d}\\vec{s} = -\\frac{\\mathrm{d}\\Phi_m}{\\mathrm{d}t},
\\]


wobei der magnetische Fluss


\\[
\\Phi_m = \\int \\vec{B}\\cdot \\mathrm{d}\\vec{A}
\\]


ist.

Die Spannung entsteht unabhängig davon, ob sich der Magnet bewegt, die Schleife bewegt oder das Magnetfeld selbst zeitlich variiert.

## Mikroskopische Erklärung – Lorentzkraft

Die Lorentzkraft


\\[
F = q(\\vec{v}\\times\\vec{B})
\\]


liefert eine mikroskopische Erklärung: Bewegte Ladungen in einem Magnetfeld erfahren eine Kraft, die zu einer Umladung und damit zu einem elektrischen Feld führt.

Für eine Leiterschleife in einem inhomogenen Magnetfeld ergibt sich ein mittleres elektrisches Feld:


\\[
\\langle E \\rangle = -\\frac{v}{L}(B_1 - B_2),
\\]


und damit ein induzierter Strom:


\\[
I = \\frac{v(B_1 - B_2)}{R}.
\\]



Dieser Ausdruck stimmt exakt mit dem Flussgesetz überein. Das elektrische Feld ist nicht konservativ: Die Spannung hängt vom Weg ab, und es existiert kein Potential, das das Feld vollständig beschreibt.

## Orientierung – Rechte-Faust-Regel

Die Richtung des Normalenvektors in der Flussberechnung wird mit der Rechte‑Faust‑Regel festgelegt. Die Orientierung des Umlaufsinns bestimmt das Vorzeichen der induzierten Spannung.

## Rotierende Leiterschleife

Für eine rotierende Leiterschleife in einem homogenen Magnetfeld ergibt sich ein sinusförmiger Fluss:


\\[
\\Phi_m(t) = AB\\sin(\\omega t),
\\]


und damit eine induzierte Spannung:


\\[
U_\\mathrm{ind}(t) = -AB\\omega\\cos(\\omega t).
\\]



Typische Werte liegen im Bereich weniger Zehntelvolt.

## Lenzsche Regel und Wirbelströme

Die Lenzsche Regel besagt, dass der induzierte Strom der Flussänderung entgegenwirkt. Dies führt zu Wirbelströmen in ausgedehnten Leitern. Beispiele:
- Waltenhofen’sches Pendel
- fallender Magnet im Metallrohr
- Wirbelstrombremsen

Wirbelströme erzeugen Kräfte, die Bewegungen hemmen oder Schweben ermöglichen.

## Induktionsmotor

Wechselströme erzeugen zeitlich veränderliche Magnetfelder, die wiederum Ströme im Rotor induzieren. Dadurch entsteht ein Drehmoment. Die Quelle beschreibt Motoren mit zwei phasenverschobenen Spulen sowie das Tesla‑Ei, das durch drei um $120^\\circ$ phasenverschobene Magnetfelder rotiert.

## Maxwell-Gleichungen

Mit dem Satz von Stokes erhält man:


\\[
\\operatorname{rot}\\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t},
\\]


die erste Maxwell‑Gleichung im Vakuum.

Zusammen mit:


\\[
\\operatorname{rot}\\vec{B} = \\mu_0\\vec{j} + \\mu_0\\varepsilon_0\\frac{\\partial \\vec{E}}{\\partial t},
\\]




\\[
\\operatorname{div}\\vec{E} = \\frac{\\rho}{\\varepsilon_0},
\\]




\\[
\\operatorname{div}\\vec{B} = 0,
\\]


ergibt sich ein vollständiges Gleichungssystem. Der Verschiebungsstromterm wird später ergänzt.

## Erweiterte Maschenregel

Bei zeitlich veränderlichen Magnetfeldern gilt:


\\[
\\sum U_i = -\\frac{\\mathrm{d}}{\\mathrm{d}t}\\int \\vec{B}\\cdot \\mathrm{d}\\vec{A}.
\\]


Nur wenn $B = 0$, reduziert sich die Gleichung auf die klassische Maschenregel.

[UNSICHER: Einige Messaufbauten und Diagramme waren unvollständig extrahiert.]
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "induktionsgesetz",
        name: "Induktionsgesetz",
        equation: "U_ind = - dPhi_m_dt",
        variables: [
          { id: "U_ind", label: "Induzierte Spannung", symbol: "U_ind", unit: "V", description: "Spannung durch zeitliche Flussänderung" },
          { id: "dPhi_m_dt", label: "Flussänderung", symbol: "dPhi_m_dt", unit: "Wb/s", description: "Zeitliche Änderung des magnetischen Flusses" },
        ],
        umstellungen: [
          { solveFor: "U_ind", expr: "- dPhi_m_dt" },
          { solveFor: "dPhi_m_dt", expr: "- U_ind" },
        ],
        hints: ["Die Spannung entsteht durch jede zeitliche Änderung des magnetischen Flusses.", "Die Orientierung wird durch die Rechte‑Faust‑Regel festgelegt."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum entsteht beim Bewegen eines Magneten durch eine Leiterschleife eine Spannung?", options: ["Weil sich die Temperatur ändert", "Weil sich der magnetische Fluss zeitlich ändert", "Weil der Leiter geladen wird", "Weil das Material magnetisch ist"], correct: 1, explanation: "Jede zeitliche Flussänderung erzeugt eine Spannung: $U_\\mathrm{ind} = -\\mathrm{d}\\Phi_m/\\mathrm{d}t$." },
    { id: "q2", question: "Warum ist das induzierte elektrische Feld nicht konservativ?", options: ["Weil im Leiter keine freien Ladungen sind", "Weil es von der Geschwindigkeit abhängt", "Weil es sich nicht aus einem Potential ableitet", "Weil es ausschließlich im Vakuum existiert"], correct: 2, explanation: "Bei Induktion hängt die Spannung vom Weg ab → kein konservatives Feld." },
    { id: "q3", question: "Welche Rolle spielt die Rechte-Faust-Regel bei der Flussberechnung?", options: ["Sie bestimmt die Stärke des Magnetfelds", "Sie misst die Frequenz der Flussänderung", "Sie bestimmt die Temperatur der Leiterschleife", "Sie legt die Orientierung des Normalenvektors fest"], correct: 3, explanation: "Die Regel definiert die Orientierung von Fläche und Umlaufsinn." },
    { id: "q4", question: "Was besagt die Lenzsche Regel?", options: ["Induzierte Ströme wirken der Flussänderung entgegen", "Induzierte Ströme verstärken die Flussänderung", "Induzierte Ströme sind immer null", "Induzierte Ströme hängen nicht vom Feld ab"], correct: 0, explanation: "Die Lenzsche Regel beschreibt die Gegenwirkung des induzierten Stroms." },
    { id: "q5", question: "Wie lautet die induzierte Spannung einer rotierenden Leiterschleife?", options: ["$U_\\mathrm{ind} = AB\\sin(\\omega t)$", "$U_\\mathrm{ind} = -AB\\omega\\cos(\\omega t)$", "$U_\\mathrm{ind} = AB\\omega\\sin(\\omega t)$", "$U_\\mathrm{ind} = B\\omega$"], correct: 1, explanation: "Aus $\\Phi_m = AB\\sin(\\omega t)$ folgt $U_\\mathrm{ind} = -AB\\omega\\cos(\\omega t)$." },
    { id: "q6", question: "Warum muss die Kirchhoffsche Maschenregel bei zeitlich veränderlichen Magnetfeldern erweitert werden?", options: ["Weil sich die Widerstände im Kreis ändern", "Weil die Ströme nicht mehr definiert sind", "Weil durch die Flussänderung ein Term hinzukommt", "Weil die Spannungen im Umlauf verschwinden"], correct: 2, explanation: "Zeitlich veränderliche Felder erzeugen eine zusätzliche induzierte Spannung." },
  ],
  flashcards: [
    { id: "18d6csj", front: "Induktionsgesetz", back: "$U_\\mathrm{ind} = -\\mathrm{d}\\Phi_m/\\mathrm{d}t$. Jede Flussänderung erzeugt eine Spannung." },
    { id: "1d0jfty", front: "Lorentzkraft als Ursache der Induktion", back: "$F = q(\\vec{E} + \\vec{v}\\times\\vec{B})$. Grundlage der Induktion." },
    { id: "00c8zg0", front: "Fluss rotierender Schleife", back: "$\\Phi_m = AB\\sin(\\omega t)$. Spannung: $U_\\mathrm{ind} = -AB\\omega\\cos(\\omega t)$." },
    { id: "0ik6438", front: "Lenzsche Regel", back: "Induzierte Ströme wirken der Flussänderung entgegen → Wirbelströme." },
    { id: "06hd9sj", front: "Nicht-konservatives Feld", back: "Induktionsfelder besitzen kein Potential; Spannung ist wegabhängig." },
    { id: "11q1tto", front: "Induktionsgesetz als Maxwell-Gleichung", back: "$\\operatorname{rot}\\vec{E} = -\\partial\\vec{B}/\\partial t$. Erste Maxwell-Gleichung im Vakuum." },
  ],
} satisfies Thema;
