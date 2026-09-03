import type { Thema } from '../../../content/schema'

export const topic = {
  id: "16-interferenz-und-kohaerenz",
  title: "Interferenz und Kohärenz",
  subtitle: "Zeitliche Kohärenz, Interferenzterm und Kohärenzlänge",
  icon: "🌊",
  estimatedMinutes: 75,
  theory: `
## Grundlagen der Interferenz

Interferenz entsteht durch die **Superposition elektromagnetischer Wellen**, die Lösungen der linearen Wellengleichung sind. Aufgrund der Linearität gilt: Die Summe zweier Lösungen ist wieder eine Lösung. Für zwei Teilwellen mit Amplituden \\(A_j\\) und \\(A_k\\) sowie Phasen \\(\\phi_j\\) und \\(\\phi_k\\) ergibt sich das Gesamtfeld zu  



\\[
E_s = A_j e^{i\\phi_j} + A_k e^{i\\phi_k}.
\\]



Die beobachtbare Intensität hängt vom Quadrat der Gesamtamplitude ab. Entscheidend ist der **Phasenunterschied**  



\\[
\\Delta\\phi = \\phi_k - \\phi_j.
\\]



Für gleiche Amplituden \\(A\\) gilt:

- **Konstruktive Interferenz:** \\(\\Delta\\phi = 2\\pi m\\)  
  → Gesamtamplitude \\(2A\\), Intensität \\(4A^2\\).

- **Destruktive Interferenz:** \\(\\Delta\\phi = (2m+1)\\pi\\)  
  → Gesamtamplitude \\(0\\), Intensität \\(0\\).

Damit Interferenz stabil beobachtbar ist, muss die Phasendifferenz während der Beobachtungszeit **konstant** bleiben. Dies führt zum Begriff der **Kohärenz**.

## Zeitliche Kohärenz

Reales Licht besitzt eine endliche **Frequenzbreite** \\(\\Delta\\nu\\) um eine Zentralfrequenz \\(\\nu_0\\). Zwei Teilwellen mit Frequenzen  



\\[
\\nu_1 = \\nu_0 - \\frac{\\Delta\\nu}{2}, \\quad \\nu_2 = \\nu_0 + \\frac{\\Delta\\nu}{2}
\\]



haben eine Frequenzdifferenz \\(\\Delta\\nu\\). Die Phasendifferenz wächst mit der Zeit:



\\[
\\Delta\\phi(t) = 2\\pi \\Delta\\nu (t - t_0).
\\]



Die **Kohärenzzeit** \\( \\Delta t_c \\) ist definiert durch  



\\[
\\Delta\\phi(\\Delta t_c) = 2\\pi \\quad \\Rightarrow \\quad \\Delta t_c = \\frac{1}{\\Delta\\nu}.
\\]



Je größer die Frequenzbreite, desto kürzer die Kohärenzzeit.

### Kohärenzlänge

Während der Kohärenzzeit legt die Welle die Strecke  



\\[
\\Delta s_c = c\\,\\Delta t_c = \\frac{c}{\\Delta\\nu}
\\]



zurück. Dies ist die **Kohärenzlänge**.

Typische Werte:

- Glühbirne: \\(10^{-3}\\,\\mathrm{m}\\)  
- Spektrallampe: \\(10^{-2}\\,\\mathrm{m}\\)  
- Laser: \\(0.2\\) bis \\(10^4\\,\\mathrm{m}\\)

Je größer die Kohärenzlänge, desto stabiler das Interferenzmuster.

## Intensität zweier überlagerter Wellen

Für zwei Wellen mit Amplituden \\(A_1\\) und \\(A_2\\) gilt:



\\[
I = I_1 + I_2 + 2\\sqrt{I_1 I_2}\\cos(\\Delta\\phi).
\\]



Der Interferenzterm  



\\[
I_{\\mathrm{IF}} = 2\\sqrt{I_1 I_2}\\cos(\\Delta\\phi)
\\]



verschwindet, wenn die Phasendifferenz stark schwankt. Dies geschieht bei Laufzeitunterschieden größer als die Kohärenzzeit oder Laufwegunterschieden größer als die Kohärenzlänge.

Damit erklärt sich, warum Interferenzmuster bei inkohärenten Quellen verschwinden: Der Kontrast sinkt, bis keine Streifen mehr sichtbar sind.

## Bedeutung für reale Experimente

Interferenz ist nur sichtbar, wenn:

1. die Quelle eine hinreichend kleine Frequenzbreite besitzt (Laser ideal),
2. die Laufzeitdifferenz der beiden Teilstrahlen kleiner als \\(\\Delta t_c\\) ist,
3. die Laufwegdifferenz kleiner als \\(\\Delta s_c\\) ist.

Dies ist die Grundlage für Interferometer (Michelson, Mach-Zehnder) und für die Beurteilung, ob eine Lichtquelle für Interferenzexperimente geeignet ist.

## Sichtbarkeit als Maß des Kontrasts

Wie deutlich ein Streifenmuster ist, misst man an der Sichtbarkeit


\\[
V = \\frac{I_\\mathrm{max} - I_\\mathrm{min}}{I_\\mathrm{max} + I_\\mathrm{min}}.
\\]


Bei vollständiger Kohärenz und gleichen Teilintensitäten ist $V = 1$, bei völlig inkohärentem Licht $V = 0$. Die Sichtbarkeit fällt allmählich ab, wenn der Gangunterschied an die Kohärenzlänge heranreicht — der Übergang ist kein Schalter, sondern ein Verblassen.

## Räumliche Kohärenz

Die Kohärenzlänge beschreibt nur die zeitliche Kohärenz, also die Folge entlang eines Strahls. Daneben steht die räumliche Kohärenz: Sie fragt, ob zwei Punkte quer zur Ausbreitungsrichtung in fester Phasenbeziehung stehen. Sie wird durch die Ausdehnung der Quelle begrenzt und lässt sich durch eine enge Lochblende verbessern — auf Kosten der Intensität. Beide Kohärenzarten müssen gegeben sein, damit ein Interferometer ein stabiles Muster liefert.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "interferenz-intensitaet",
        name: "Intensität zweier Wellen",
        equation: "I = I1 + I2 + 2 * sqrt(I1 * I2) * cos(dphi)",
        variables: [
          { id: "I", label: "Gesamtintensität", symbol: "I", unit: "—", description: "Resultierende Intensität" },
          { id: "I1", label: "Intensität 1", symbol: "I1", unit: "—", description: "Intensität der ersten Welle" },
          { id: "I2", label: "Intensität 2", symbol: "I2", unit: "—", description: "Intensität der zweiten Welle" },
          { id: "dphi", label: "Phasendifferenz", symbol: "Δφ", unit: "rad", description: "Phasenunterschied der Wellen" },
        ],
        umstellungen: [
          { solveFor: "I", expr: "I1+I2+2*sqrt(I1*I2)*cos(dphi)" },
          { solveFor: "dphi", expr: "acos((I-I1-I2)/(2*sqrt(I1*I2)))" },
        ],
        hints: ["Interferenzterm verschwindet für Δφ = π/2 oder stark schwankende Phasen.", "Für I1 = I2 ergibt sich I = 2I1(1 + cosΔφ)."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Zwei Wellen gleicher Intensität interferieren konstruktiv. Wie groß ist die Gesamtintensität?", options: ["2I", "I", "3I", "4I"], correct: 3, explanation: "Verdoppelte Amplitude → Intensität ∝ Amplitude² → 4I." },
    { id: "q2", question: "Eine Quelle hat eine Frequenzbreite Δν = 5×10⁹ Hz. Wie groß ist die Kohärenzzeit?", options: ["2×10⁻¹⁰ s", "2×10⁻⁹ s", "2×10⁻¹¹ s", "2×10⁻⁸ s"], correct: 0, explanation: "Δt_c = 1/Δν = 1/(5×10⁹) ≈ 2×10⁻¹⁰ s." },
    { id: "q3", question: "Wann verschwindet der Interferenzterm?", options: ["Wenn Δφ konstant bleibt", "Wenn Δφ stark schwankt", "Wenn die Amplituden gleich sind", "Wenn die Frequenzen identisch sind"], correct: 1, explanation: "Schwankende Phasen mitteln den cos-Term zu Null." },
    { id: "q4", question: "Was beschreibt die Kohärenzlänge?", options: ["Die maximale Amplitude einer Lichtwelle", "Die Breite eines einzelnen Interferenzstreifens", "Die während der Kohärenzzeit zurückgelegte Strecke", "Die Frequenzbreite der verwendeten Quelle"], correct: 2, explanation: "Δs_c = cΔt_c." },
    { id: "q5", question: "Welche Quelle hat typischerweise die größte Kohärenzlänge?", options: ["Glühbirne", "Spektrallampe", "LED", "Laser"], correct: 3, explanation: "Laser haben extrem kleine Δν → große Δs_c." },
    { id: "q6", question: "Was passiert bei Δφ = π?", options: ["Minimale Intensität", "Maximale Intensität", "Keine Änderung", "Frequenzverdopplung"], correct: 0, explanation: "Δφ = π → destruktive Interferenz → I = 0." },
  ],
  flashcards: [
    { id: "1ff1frm", front: "Kohärenzzeit", back: "Δt_c = 1/Δν. Kleine Frequenzbreite → große Kohärenzzeit. Bestimmt, wie lange die Phasendifferenz stabil bleibt." },
    { id: "0xsf4d0", front: "Kohärenzlänge", back: "Δs_c = cΔt_c. Reicht von Millimetern (Glühbirne) bis Kilometern (Laser)." },
    { id: "119txwn", front: "Interferenzterm", back: "I_IF = 2√(I1I2)cosΔφ. Verschwindet bei stark schwankender Phasendifferenz oder Δφ = π/2." },
    { id: "0tjouai", front: "Konstruktive Interferenz", back: "Δφ = 2πm. Amplitude verdoppelt sich, Intensität vervierfacht sich." },
    { id: "1og5z0h", front: "Destruktive Interferenz", back: "Δφ = (2m+1)π. Amplitude wird Null, Intensität verschwindet vollständig." },
    { id: "1bafoa8", front: "Frequenzbreite", back: "Δν bestimmt die Kohärenzzeit. Große Δν → kurze Δt_c → geringe Kohärenz." },
  ],
} satisfies Thema;
