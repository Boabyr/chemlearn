import type { Thema } from '../../../content/schema'

export const topic = {
  id: "13-elektromagnetische-wellen-im-vakuum",
  title: "Elektromagnetische Wellen im Vakuum",
  subtitle: "Maxwell-Gleichungen, Wellengleichung, Polarisation, Energie und Spektrum",
  icon: "🌐",
  estimatedMinutes: 85,
  theory: `
## Maxwell-Gleichungen im Vakuum

Im ladungs- und stromfreien Raum gelten:


\\[
\\operatorname{rot}E = -\\frac{\\partial B}{\\partial t},\\qquad
\\operatorname{rot}B = \\mu_0\\varepsilon_0\\frac{\\partial E}{\\partial t},\\qquad
\\operatorname{div}E = 0,\\qquad
\\operatorname{div}B = 0.
\\]



Durch Anwendung des Nabla-Operators erhält man die Wellengleichungen:


\\[
\\Delta E = \\mu_0\\varepsilon_0\\frac{\\partial^2 E}{\\partial t^2},\\qquad
\\Delta B = \\mu_0\\varepsilon_0\\frac{\\partial^2 B}{\\partial t^2}.
\\]



Dies sind klassische Wellengleichungen mit der Phasengeschwindigkeit:


\\[
c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}},
\\]


also der Lichtgeschwindigkeit. Damit folgt: **Licht ist eine elektromagnetische Welle.**

## Lösungen der Wellengleichung

Eine allgemeine Lösung lautet:


\\[
E(z,t) = g(z - ct) + h(z + ct),
\\]


also Überlagerungen von Wellen in beide Richtungen.

Für periodische Wellen:


\\[
E(z,t) = E_0\\sin(kz - \\omega t),
\\]


mit Wellenzahl $k = 2\\pi/\\lambda$ und Kreisfrequenz $\\omega = 2\\pi f$.

Phasengeschwindigkeit:


\\[
v_\\mathrm{ph} = \\frac{\\omega}{k} = c.
\\]



## Transversalität

Aus $\\operatorname{div}E = 0$ folgt: Das elektrische Feld steht senkrecht zur Ausbreitungsrichtung. Ebenso gilt für das magnetische Feld.

Elektromagnetische Wellen im Vakuum sind Transversalwellen:
- $E \\perp B$,
- $E \\perp k$,
- $B \\perp k$.

## Allgemeine ebene Wellen

Für beliebige Ausbreitungsrichtung:


\\[
E(r,t) = E_0 e^{i(k\\cdot r - \\omega t)}.
\\]



Phasenflächen $k\\cdot r = \\mathrm{konst.}$ bewegen sich mit Lichtgeschwindigkeit.

## Polarisation

### Lineare Polarisation


\\[
E(z,t)=
\\begin{pmatrix}
E_{0x}\\cos(\\omega t - kz)\\\\
E_{0y}\\cos(\\omega t - kz)\\\\
0
\\end{pmatrix}.
\\]



### Zirkulare Polarisation


\\[
E(z,t)=
\\begin{pmatrix}
E_0\\cos(\\omega t - kz)\\\\
E_0\\sin(\\omega t - kz)\\\\
0
\\end{pmatrix}.
\\]



### Elliptische Polarisation
Allgemeiner Fall mit unterschiedlichen Amplituden und Phasenverschiebungen.

## Zusammenhang zwischen E- und B-Feld

Für Ausbreitung in z‑Richtung:


\\[
E=(E_x,0,0),\\qquad B=(0,B_y,0),
\\]


und:


\\[
B = \\frac{1}{c}(\\hat{k}\\times E).
\\]



Der Betrag des Magnetfelds ist um den Faktor $1/c$ kleiner als der des elektrischen Felds.

## Energie und Impuls elektromagnetischer Wellen

Energiedichte:


\\[
w_\\mathrm{em} = \\frac{1}{2}\\varepsilon_0E^2 + \\frac{1}{2\\mu_0}B^2 = \\varepsilon_0E^2.
\\]



Intensität:


\\[
I = c\\varepsilon_0E^2.
\\]



Poynting-Vektor:


\\[
S = E\\times H.
\\]



Impuls:


\\[
p = \\frac{E}{c},\\qquad g = \\frac{I}{c^2}.
\\]



Strahlungsdruck entsteht durch Impulsübertrag — relevant z. B. für Sonnensegel.

## Stehende Wellen

Reflexion an einem Leiter erzeugt stehende Wellen:


\\[
E(z,t)=2E_0\\sin(kz)\\sin(\\omega t),
\\]




\\[
B(z,t)=2B_0\\cos(kz)\\cos(\\omega t).
\\]



## Elektromagnetisches Spektrum

Das Spektrum umfasst:
- Radiowellen  
- Mikrowellen  
- Infrarot  
- Sichtbares Licht  
- UV  
- Röntgenstrahlung  
- Gammastrahlung  

Mit:


\\[
E = h\\nu,\\qquad p = \\frac{h}{\\lambda},\\qquad k = \\frac{2\\pi}{\\lambda}.
\\]

## Der historische Nachweis

Maxwell sagte die Wellen 1865 rein rechnerisch voraus; erst Heinrich Hertz wies sie 1886 experimentell nach. Er erzeugte mit einem Funkeninduktor Schwingungen in einem offenen Dipol und empfing sie in einiger Entfernung mit einer Ringantenne, an deren Spalt ein zweiter Funke übersprang. Weil er an den empfangenen Wellen Reflexion, Brechung, Polarisation und stehende Wellen zeigen konnte, war klar, dass es sich um dieselbe Erscheinung wie Licht handelt — nur bei sehr viel größerer Wellenlänge.

## Phasen- und Gruppengeschwindigkeit

Im Vakuum fallen beide zusammen: Eine einzelne Phasenfläche und die Einhüllende eines Wellenpakets bewegen sich beide mit $c$. Das gilt, weil die Dispersionsrelation $\\omega = ck$ linear ist. Sobald ein Medium ins Spiel kommt, ist das nicht mehr so, und man muss zwischen der Geschwindigkeit einer Phase, $v_\\mathrm{ph} = \\omega/k$, und der Geschwindigkeit des Signals, $v_\\mathrm{gr} = \\mathrm{d}\\omega/\\mathrm{d}k$, unterscheiden. Nur letztere transportiert Energie und Information.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "wellengleichung",
        name: "Wellengleichung elektromagnetischer Wellen",
        equation: "c = 1 / sqrt(mu0 * eps0)",
        variables: [
          { id: "c", label: "Lichtgeschwindigkeit", symbol: "c", unit: "m/s", description: "Ausbreitungsgeschwindigkeit elektromagnetischer Wellen" },
          { id: "mu0", label: "magnetische Feldkonstante", symbol: "mu_0", unit: "N/A^2", description: "Permeabilität des Vakuums" },
          { id: "eps0", label: "elektrische Feldkonstante", symbol: "eps_0", unit: "F/m", description: "Permittivität des Vakuums" },
        ],
        umstellungen: [
          { solveFor: "c", expr: "1 / sqrt(mu0 * eps0)" },
          { solveFor: "mu0", expr: "1 / (c^2 * eps0)" },
          { solveFor: "eps0", expr: "1 / (c^2 * mu0)" },
        ],
        hints: ["Die Maxwell-Gleichungen führen direkt zur Wellengleichung.", "Licht ist eine elektromagnetische Welle mit Geschwindigkeit c."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie lautet die Wellengleichung für das elektrische Feld im Vakuum?", options: ["$\\Delta E = \\mu_0\\varepsilon_0\\,\\partial^2E/\\partial t^2$", "$\\Delta E = \\mu_0\\varepsilon_0\\,\\partial E/\\partial t$", "$\\Delta E = -\\mu_0\\varepsilon_0\\,\\partial^2E/\\partial t$", "$\\partial^2E/\\partial t^2 = \\mu_0\\varepsilon_0\\,\\Delta^2E$"], correct: 0, explanation: "Aus den Maxwell-Gleichungen folgt die Wellengleichung mit $\\mu_0\\varepsilon_0$." },
    { id: "q2", question: "Warum sind elektromagnetische Wellen Transversalwellen?", options: ["Weil sie nur im Leiter existieren können", "Weil $E$ und $B$ senkrecht zur Ausbreitung stehen", "Weil ihre Frequenz zeitlich konstant bleibt", "Weil sie überhaupt keine Energie transportieren"], correct: 1, explanation: "Aus $\\operatorname{div}E=0$ und $\\operatorname{div}B=0$ folgt Transversalität." },
    { id: "q3", question: "Wie hängen Wellenzahl, Frequenz und Phasengeschwindigkeit zusammen?", options: ["$v_\\mathrm{ph}=k/\\omega$", "$v_\\mathrm{ph}=\\omega k$", "$v_\\mathrm{ph}=\\omega/k$", "$v_\\mathrm{ph}=1/(\\omega k)$"], correct: 2, explanation: "Für ebene Wellen gilt $v_\\mathrm{ph}=\\omega/k=c$." },
    { id: "q4", question: "Was unterscheidet lineare, zirkulare und elliptische Polarisation?", options: ["Die Frequenz", "Die Richtung der Ausbreitung", "Die zeitliche Änderung der Amplituden", "Die Orientierung und Form der Feldvektoren"], correct: 3, explanation: "Polarisation beschreibt die Bahn des E‑Feldvektors." },
    { id: "q5", question: "Wie lautet der Zusammenhang zwischen E- und B-Feld einer ebenen Welle?", options: ["$B = (1/c)(\\hat{k}\\times E)$", "$B = (1/c^2)(\\hat{k}\\times E)$", "$E = (1/c)(\\hat{k}\\times B)$", "$B = c\\,(\\hat{k}\\times E)$"], correct: 0, explanation: "Für ebene Wellen gilt $B = (1/c)(\\hat{k}\\times E)$." },
    { id: "q6", question: "Warum entsteht Strahlungsdruck bei elektromagnetischen Wellen?", options: ["Wegen der Temperaturänderung der Fläche", "Wegen Impulsübertrag durch das Feld", "Wegen der Reflexion an der Oberfläche", "Wegen der Ladungen im bestrahlten Medium"], correct: 1, explanation: "EM‑Wellen tragen Impuls → Druck bei Absorption oder Reflexion." },
  ],
  flashcards: [
    { id: "0df2jr0", front: "Wellengleichung", back: "$\\Delta E = \\mu_0\\varepsilon_0\\,\\partial^2E/\\partial t^2$. Grundlage der EM‑Wellen." },
    { id: "1kbjw6f", front: "Phasengeschwindigkeit", back: "$c = 1/\\sqrt{\\mu_0\\varepsilon_0}$. Geschwindigkeit elektromagnetischer Wellen." },
    { id: "12cbujk", front: "Polarisation", back: "Linear, zirkular, elliptisch — unterschiedliche Bahnen des E‑Feldvektors." },
    { id: "0eu3y81", front: "E‑B‑Beziehung", back: "$B = (1/c)(\\hat{k}\\times E)$. B‑Feld senkrecht zu E und Ausbreitung." },
    { id: "18l9687", front: "Intensität", back: "$I = c\\varepsilon_0E^2$. Energiestromdichte einer EM‑Welle." },
    { id: "0oewnhh", front: "Strahlungsdruck", back: "$p = I/c$. Druck durch Impulsübertrag." },
  ],
} satisfies Thema;
