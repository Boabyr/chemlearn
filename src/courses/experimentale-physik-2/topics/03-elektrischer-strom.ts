import type { Thema } from '../../../content/schema'

export const topic = {
  id: "03-elektrischer-strom",
  title: "Elektrischer Strom, Stromstärke, Stromdichte, Driftgeschwindigkeit",
  subtitle: "Ladungstransport, Definitionen und mikroskopische Modelle",
  icon: "🔌",
  estimatedMinutes: 60,
  theory: `
## Elektrischer Strom und Stromstärke

Elektrischer Strom ist der Transport elektrischer Ladung durch einen Leiter. Die Stromstärke ist definiert als Ladung pro Zeit, die durch einen Leiterquerschnitt fließt:


\\[
I = \\frac{\\mathrm{d}Q}{\\mathrm{d}t}.
\\]


Die Einheit ist Ampere. Die technische Stromrichtung verläuft von Plus nach Minus, während sich Elektronen in metallischen Leitern entgegengesetzt bewegen.

Seit 2019 basiert die Definition des Ampere auf der Elementarladung: Ein Ampere entspricht dem Transport von


\\[
\\frac{1}{1{,}602\\,176\\,634\\cdot10^{-19}}
\\]


Elementarladungen pro Sekunde.

## Stromdichte

Die Stromdichte $\\vec{j}$ ist ein Vektorfeld, dessen Richtung der Bewegung positiver Ladungen entspricht. Der Strom durch eine Fläche ergibt sich aus:


\\[
I = \\int_A \\vec{j}\\cdot \\mathrm{d}\\vec{A}.
\\]


Bei homogener Verteilung gilt $I = jA$.

## Driftgeschwindigkeit

Die Driftgeschwindigkeit beschreibt die mittlere Geschwindigkeit der Ladungsträger. Die Quelle gibt:


\\[
\\vec{j} = q n v_d.
\\]


Damit folgt:


\\[
v_d = \\frac{I}{q n A}.
\\]



In Metallen ist die Driftgeschwindigkeit sehr klein, typischerweise im Bereich von Millimetern pro Sekunde. Ein Beispiel aus der Quelle zeigt für einen Kupferdraht mit $1\\,\\mathrm{A}$ Strom eine Driftgeschwindigkeit von etwa $-3{,}5\\cdot10^{-2}\\,\\mathrm{mm/s}$. Das negative Vorzeichen zeigt die Elektronenbewegung entgegen der technischen Stromrichtung.

Trotz der geringen Driftgeschwindigkeit reagiert ein Stromkreis nahezu sofort, weil sich das elektrische Feld im Leiter mit annähernd Lichtgeschwindigkeit ausbreitet. Die Quelle vergleicht dies mit einem gefüllten Gartenschlauch: Wird das Ventil geöffnet, tritt sofort Wasser aus, obwohl die einzelnen Wassermoleküle langsam fließen.

## Kontinuitätsgleichung

Ladung kann weder erzeugt noch vernichtet werden. Fließt aus einem geschlossenen Volumen mehr Strom ab als zu, so muss die eingeschlossene Ladung abnehmen:


\\[
\\oint_A \\vec{j}\\cdot\\mathrm{d}\\vec{A} = -\\frac{\\mathrm{d}Q}{\\mathrm{d}t}.
\\]


Im stationären Fall ändert sich die Ladung an keiner Stelle des Leiters, die rechte Seite verschwindet, und der Strom ist entlang eines unverzweigten Leiters überall gleich groß. Genau diese Aussage steckt später in der Knotenregel.

## Ladungsträger in verschiedenen Medien

Welche Teilchen den Strom tragen, hängt vom Material ab. In Metallen sind es die frei beweglichen Leitungselektronen, in Elektrolyten wandern positive und negative Ionen gleichzeitig in entgegengesetzte Richtungen, in Halbleitern tragen Elektronen und Löcher bei, im Vakuum bewegen sich freie Ladungsträger ohne Gitter. Die Stromstärke zählt in allen Fällen nur die transportierte Ladung pro Zeit, unabhängig vom Vorzeichen des Trägers: negative Ladung nach links ergibt denselben technischen Strom wie positive Ladung nach rechts.

## Größenordnungen

Ein Kupferdraht enthält etwa $n = 8{,}5\\cdot10^{28}$ freie Elektronen pro Kubikmeter. Bei einem Querschnitt von $1{,}5\\,\\mathrm{mm^2}$ und einem Strom von $1\\,\\mathrm{A}$ folgt aus $v_d = I/(qnA)$ eine Driftgeschwindigkeit von wenigen Hundertstel Millimetern pro Sekunde — ein Elektron braucht für einen Meter Draht mehrere Stunden. Die thermische Geschwindigkeit der Elektronen liegt dagegen bei rund $10^6\\,\\mathrm{m/s}$. Die Drift ist nur eine kleine gerichtete Verschiebung, die sich der ungeordneten Bewegung überlagert.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "driftgeschwindigkeit",
        name: "Driftgeschwindigkeit",
        equation: "v_d = I / (q * n * A)",
        variables: [
          { id: "v_d", label: "Driftgeschwindigkeit", symbol: "v_d", unit: "m/s", description: "Mittlere Geschwindigkeit der Ladungsträger" },
          { id: "I", label: "Stromstärke", symbol: "I", unit: "A", description: "Durch den Leiter fließender Strom" },
          { id: "q", label: "Ladung", symbol: "q", unit: "C", description: "Ladung eines einzelnen Ladungsträgers" },
          { id: "n", label: "Teilchendichte", symbol: "n", unit: "1/m^3", description: "Anzahl der Ladungsträger pro Volumen" },
          { id: "A", label: "Querschnittsfläche", symbol: "A", unit: "m^2", description: "Leiterquerschnitt" },
        ],
        umstellungen: [
          { solveFor: "v_d", expr: "I / (q * n * A)" },
          { solveFor: "I", expr: "v_d * q * n * A" },
          { solveFor: "q", expr: "I / (v_d * n * A)" },
          { solveFor: "n", expr: "I / (v_d * q * A)" },
          { solveFor: "A", expr: "I / (v_d * q * n)" },
        ],
        hints: ["Die Driftgeschwindigkeit ist proportional zum Strom und umgekehrt proportional zur Querschnittsfläche.", "Elektronen bewegen sich entgegen der technischen Stromrichtung."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie definiert die Quelle die Stromstärke?", options: ["Als Kraft pro Ladung", "Als Spannung pro Widerstand", "Als Ladung pro Zeit", "Als Energie pro Zeit"], correct: 2, explanation: "Die Quelle definiert $I = \\mathrm{d}Q/\\mathrm{d}t$." },
    { id: "q2", question: "Warum bewegen sich Elektronen entgegen der technischen Stromrichtung?", options: ["Weil sie positiv geladen sind", "Weil die technische Richtung historisch festgelegt wurde", "Weil Leiter keine Elektronen enthalten", "Weil Elektronen negativ geladen sind"], correct: 3, explanation: "Elektronen tragen negative Ladung und bewegen sich daher entgegengesetzt zur technischen Richtung." },
    { id: "q3", question: "Welche Bedeutung hat die Stromdichte laut Quelle?", options: ["Sie gibt Strom pro Fläche an", "Sie misst die Feldstärke", "Sie beschreibt die Geschwindigkeit der Elektronen", "Sie gibt die Spannung pro Länge an"], correct: 0, explanation: "Stromdichte ist Strom pro Querschnittsfläche und ein Vektorfeld." },
    { id: "q4", question: "Warum ist die Driftgeschwindigkeit so klein?", options: ["Weil Elektronen sehr schwer sind", "Weil viele Elektronen gleichzeitig transportiert werden", "Weil die Feldstärke im Leiter gering ist", "Weil der Leiter isoliert ist"], correct: 1, explanation: "Der Strom entsteht durch viele Ladungsträger; jeder einzelne bewegt sich nur langsam." },
    { id: "q5", question: "Wie ändert sich $v_d$, wenn die Querschnittsfläche verdoppelt wird?", options: ["verdoppelt sich", "bleibt gleich", "halbiert sich", "wird null"], correct: 2, explanation: "$v_d = I/(q n A)$ → Verdoppelt man $A$, halbiert sich $v_d$." },
    { id: "q6", question: "Ein Leiter führt $2\\,\\mathrm{A}$ bei homogener Verteilung und Querschnitt $A$. Wie groß ist $j$?", options: ["$2A$", "$A/2$", "$1/(2A)$", "$2/A$"], correct: 3, explanation: "Bei homogener Verteilung gilt $j = I/A = 2/A$." },
  ],
  flashcards: [
    { id: "0ykkwoh", front: "Stromstärke", back: "$I = \\mathrm{d}Q/\\mathrm{d}t$. Einheit: Ampere. Technische Richtung: Plus → Minus." },
    { id: "1ykzohr", front: "Stromdichte", back: "$I = \\int_A \\vec{j}\\cdot \\mathrm{d}\\vec{A}$, bei homogener Verteilung $j = I/A$." },
    { id: "01nt2pd", front: "Driftgeschwindigkeit", back: "$v_d = I/(q n A)$. In Metallen sehr klein, typischerweise mm/s." },
    { id: "06cwhwk", front: "Technische Stromrichtung", back: "Elektronen bewegen sich wegen ihrer negativen Ladung entgegen der technischen Stromrichtung." },
    { id: "1c8xdgp", front: "Ampere-Definition", back: "1 A = Transport von $1/(1{,}602\\cdot10^{-19})$ Elementarladungen pro Sekunde." },
    { id: "1ra8dap", front: "Feldgeschwindigkeit", back: "Das elektrische Feld breitet sich nahezu mit Lichtgeschwindigkeit aus, obwohl die Driftgeschwindigkeit klein ist." },
  ],
} satisfies Thema;
