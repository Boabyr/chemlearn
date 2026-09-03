import type { Thema } from '../../../content/schema'

export const topic = {
  id: "14-elektromagnetische-wellen-in-materie",
  title: "Elektromagnetische Wellen in Materie",
  subtitle: "Brechung, Dispersion, Absorption, Reflexion, Doppelbrechung",
  icon: "🪞",
  estimatedMinutes: 85,
  theory: `
## Ausbreitung elektromagnetischer Wellen in Materie

Während im Vakuum die Lichtgeschwindigkeit durch


\\[
c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}
\\]


festgelegt ist, verändert Materie die Ausbreitungsgeschwindigkeit und damit die Eigenschaften der Welle. Dies führt zu Phänomenen wie Brechung, Reflexion, Dispersion, Absorption, Polarisation und Doppelbrechung.

## Brechungsindex

In einem Medium mit Brechungsindex $n$ ist die Phasengeschwindigkeit:


\\[
v_\\mathrm{ph} = \\frac{c}{n}.
\\]



Für eine ebene Welle:


\\[
E = E_0 e^{i(\\omega t - kz)},
\\]


gilt im Medium:


\\[
k_m = n\\frac{\\omega}{c},
\\qquad
\\lambda_m = \\frac{\\lambda_0}{n}.
\\]



Der Brechungsindex hängt von der Frequenz ab → **Dispersion**.

## Mikroskopisches Modell

Eine elektromagnetische Welle regt Elektronen im Medium zu Schwingungen an. Diese Elektronen wirken wie kleine Hertz‑Dipole und senden Sekundärwellen aus. Die Überlagerung von Primär- und Sekundärwellen führt zu einer veränderten Ausbreitungsgeschwindigkeit.

Elektronenbewegung:


\\[
m\\ddot{x} + b\\dot{x} + Dx = -eE_0 e^{i\\omega t}.
\\]



Dipolmoment:


\\[
p = -ex.
\\]



Polarisierbarkeit:


\\[
\\alpha(\\omega) = \\frac{e^2}{m(\\omega_0^2 - \\omega^2 + i\\gamma\\omega)}.
\\]



Makroskopische Polarisation:


\\[
P = N\\alpha E.
\\]



Brechungsindex:


\\[
n(\\omega) = \\sqrt{1 + \\frac{Ne^2}{\\varepsilon_0 m(\\omega_0^2 - \\omega^2 + i\\gamma\\omega)}}.
\\]



## Dispersion und Absorption

Der Brechungsindex ist komplex:


\\[
n = n_r - ik.
\\]



- $n_r$: Phasengeschwindigkeit  
- $k$: Absorption

Intensität:


\\[
I(z) = I_0 e^{-2k\\omega z/c}.
\\]



Absorptionskoeffizient:


\\[
\\alpha = 2k\\frac{\\omega}{c}.
\\]



**Normale Dispersion:** $n_r$ steigt mit Frequenz.  
**Anomale Dispersion:** $n_r$ sinkt mit Frequenz, oft nahe Resonanzen.

## Reflexion und Brechung

An einer Grenzfläche zwischen Medien mit Brechungsindizes $n_1$ und $n_2$ gilt:

Reflexionsgesetz:


\\[
\\alpha = \\alpha_r.
\\]



Snellius:


\\[
n_1\\sin\\alpha = n_2\\sin\\beta.
\\]



## Fresnel-Formeln

Für senkrechte Polarisation:


\\[
r_\\perp = \\frac{n_1\\cos\\alpha - n_2\\cos\\beta}{n_1\\cos\\alpha + n_2\\cos\\beta}.
\\]



## Spezialfälle

**Totalreflexion:**  
Wenn $n_1 > n_2$ und $\\sin\\alpha > n_2/n_1$.

**Brewster-Winkel:**  
Für parallele Polarisation verschwindet die Reflexion:


\\[
\\tan\\alpha_B = \\frac{n_2}{n_1}.
\\]



**Negativer Brechungsindex:**  
In Metamaterialien möglich → Wellenvektor wird „zurückgebrochen“.

## Anisotropie und Doppelbrechung

In anisotropen Medien ist die Dielektrizitätskonstante ein Tensor:


\\[
\\varepsilon =
\\begin{pmatrix}
\\varepsilon_{11} & 0 & 0\\\\
0 & \\varepsilon_{22} & 0\\\\
0 & 0 & \\varepsilon_{33}
\\end{pmatrix}.
\\]



Optisch einachsige Medien besitzen:
- **Ordentlichen Strahl:** Brechungsindex $n_o$ (richtungsunabhängig)
- **Außerordentlichen Strahl:** Brechungsindex $n_e(\\theta)$ (winkelabhängig)

Doppelbrechung führt zur Aufspaltung eines Lichtstrahls in zwei unterschiedlich polarisierte Strahlen.

## Gruppengeschwindigkeit und Signalverzerrung

Weil $n$ von der Frequenz abhängt, laufen die Spektralanteile eines Wellenpakets im Medium unterschiedlich schnell. Die Einhüllende bewegt sich mit der Gruppengeschwindigkeit


\\[
v_\\mathrm{gr} = \\frac{\\mathrm{d}\\omega}{\\mathrm{d}k},
\\]


die im Bereich normaler Dispersion kleiner ist als die Phasengeschwindigkeit. Ein kurzer Lichtpuls läuft dadurch beim Durchgang durch Glas oder eine Glasfaser auseinander — das begrenzt die Übertragungsrate optischer Nachrichtenverbindungen. In Bereichen anomaler Dispersion kann die Phasengeschwindigkeit sogar größer als $c$ werden, ohne dass damit Information schneller als $c$ übertragen würde: Der Signalanteil bleibt an die Gruppengeschwindigkeit gebunden.

## Anwendungen der Polarisation durch Reflexion

Dass unter dem Brewster-Winkel nur senkrecht polarisiertes Licht reflektiert wird, nutzen Polarisationsfilter vor Kameraobjektiven: Sie unterdrücken die Spiegelung auf Wasser, Glas und nassem Asphalt, weil diese Reflexe weitgehend polarisiert sind. Aus demselben Grund werden Laserfenster im Brewster-Winkel geschnitten — für die gewünschte Polarisationsrichtung ist die Reflexion an ihnen null, es geht also keine Leistung verloren.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "brechungsindex",
        name: "Brechungsindex und Phasengeschwindigkeit",
        equation: "v_ph = c / n",
        variables: [
          { id: "v_ph", label: "Phasengeschwindigkeit", symbol: "v_ph", unit: "m/s", description: "Ausbreitungsgeschwindigkeit im Medium" },
          { id: "c", label: "Lichtgeschwindigkeit", symbol: "c", unit: "m/s", description: "Lichtgeschwindigkeit im Vakuum" },
          { id: "n", label: "Brechungsindex", symbol: "n", unit: "—", description: "Materialabhängiger Brechungsindex" },
        ],
        umstellungen: [
          { solveFor: "v_ph", expr: "c / n" },
          { solveFor: "c", expr: "v_ph * n" },
          { solveFor: "n", expr: "c / v_ph" },
        ],
        hints: ["Der Brechungsindex bestimmt die Geschwindigkeit elektromagnetischer Wellen im Medium.", "Dispersion bedeutet Frequenzabhängigkeit von n."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum ist der Brechungsindex frequenzabhängig?", options: ["Weil die Lichtgeschwindigkeit sich ändert", "Weil die Elektronen unterschiedlich stark schwingen", "Weil das Medium Ladungen verliert", "Weil die Welle reflektiert wird"], correct: 1, explanation: "Elektronenresonanzen führen zu frequenzabhängiger Polarisierbarkeit → Dispersion." },
    { id: "q2", question: "Wie entsteht Absorption in einem Medium?", options: ["Durch Reflexion an der Grenzfläche", "Durch eine zeitlich konstante Feldstärke", "Durch Energieübertrag auf Elektronen", "Durch Totalreflexion im dichteren Medium"], correct: 2, explanation: "Energie wird von Elektronen aufgenommen → Intensität nimmt ab." },
    { id: "q3", question: "Was beschreibt der Imaginärteil des Brechungsindex?", options: ["Die Phasengeschwindigkeit", "Die Polarisation", "Die Reflexion", "Die Absorption"], correct: 3, explanation: "$k$ beschreibt die Dämpfung der Welle im Medium." },
    { id: "q4", question: "Welche Bedingung führt zu Totalreflexion?", options: ["$\\sin\\alpha > n_2/n_1$ bei $n_1 > n_2$", "$n_1 < n_2$ bei senkrechtem Einfall", "$\\alpha = 0$ bei beliebigem Indexsprung", "$n_1 = n_2$ bei streifendem Einfall"], correct: 0, explanation: "Bei großem Einfallswinkel und $n_1 > n_2$ tritt Totalreflexion auf." },
    { id: "q5", question: "Was ist der Brewster-Winkel?", options: ["Winkel maximaler Absorption im Medium", "Winkel ohne Reflexion paralleler Polarisation", "Winkel, bei dem keine Brechung auftritt", "Winkel, bei dem Totalreflexion einsetzt"], correct: 1, explanation: "Für parallele Polarisation verschwindet die Reflexion: $\\tan\\alpha_B = n_2/n_1$." },
    { id: "q6", question: "Warum spaltet anisotrope Materie Licht in zwei Strahlen auf?", options: ["Weil die Frequenz von der Richtung abhängt", "Weil an der Oberfläche zweimal reflektiert wird", "Weil der Brechungsindex von der Polarisation abhängt", "Weil eine der beiden Komponenten absorbiert wird"], correct: 2, explanation: "Tensorielle Dielektrizität führt zu ordentlichem und außerordentlichem Strahl." },
  ],
  flashcards: [
    { id: "1oawuya", front: "Brechungsindex", back: "$n = c/v_\\mathrm{ph}$. Bestimmt die Geschwindigkeit der Welle im Medium." },
    { id: "07lw4ly", front: "Snellius", back: "$n_1\\sin\\alpha = n_2\\sin\\beta$. Gesetz der Brechung." },
    { id: "09jnp5c", front: "Absorption", back: "$I(z) = I_0 e^{-\\alpha z}$. Intensität nimmt exponentiell ab." },
    { id: "0cq63n2", front: "Brewster-Winkel", back: "$\\tan\\alpha_B = n_2/n_1$. Reflexion paralleler Polarisation verschwindet." },
    { id: "0jctjwg", front: "Ordentlicher Strahl", back: "Brechungsindex $n_o$ ist richtungsunabhängig." },
    { id: "08ypn7q", front: "Außerordentlicher Strahl", back: "Brechungsindex $n_e(\\theta)$ hängt vom Winkel zur optischen Achse ab." },
  ],
} satisfies Thema;
