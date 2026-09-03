import type { Thema } from '../../../content/schema'

export const topic = {
  id: "20-planparallele-platte-zweistrahl",
  title: "Planparallele Platte – Zweistrahlinterferenz",
  subtitle: "Interferenz in Reflexion und Transmission",
  icon: "🪟",
  estimatedMinutes: 75,
  theory: `
## Interferenz an der planparallelen Platte

Eine planparallele Platte mit Brechungsindex \\(n\\) und Dicke \\(d\\) erzeugt Interferenzerscheinungen sowohl im **reflektierten** als auch im **transmittierten** Licht. Ursache ist der **optische Wegunterschied** zwischen zwei Teilstrahlen, die an den Grenzflächen reflektiert bzw. gebrochen werden.

### Strahlenverlauf

1. **Strahl 1:** Einfall → Reflexion an der oberen Fläche (o.F.)  
2. **Strahl 2:** Einfall → Brechung an o.F. → Reflexion an der unteren Fläche (u.F.) → Brechung an o.F.

Beide Strahlen verlaufen parallel, aber mit unterschiedlicher optischer Weglänge.

## Optischer Wegunterschied

Der geometrische Wegunterschied ergibt sich aus der Dicke der Platte und dem Brechungswinkel \\(\\beta\\). Mit dem Brechungsgesetz



\\[
\\sin\\alpha = n \\sin\\beta
\\]



folgt für den optischen Wegunterschied:



\\[
\\Delta s = 2n d \\cos\\beta - 2d \\tan\\beta \\sin\\alpha.
\\]



Durch Einsetzen von \\(\\sin\\alpha = n\\sin\\beta\\) ergibt sich:



\\[
\\Delta s = 2d n \\cos\\beta.
\\]



Damit gilt:



\\[
\\Delta s = 2d\\sqrt{n^2 - \\sin^2\\alpha}.
\\]



## Phasensprung an der Grenzfläche

Bei Reflexion an einem optisch dichteren Medium (Luft → Glas) tritt ein **Phasensprung von \\(\\pi\\)** auf. Dieser betrifft Strahl 1.

Damit ist der Phasenunterschied:



\\[
\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\Delta s - \\pi.
\\]



Für Transmission entfällt der Phasensprung:



\\[
\\Delta\\phi_{\\mathrm{trans}} = \\frac{2\\pi}{\\lambda}\\Delta s.
\\]



## Bedingungen für Maxima und Minima

### Reflexion

Maxima:



\\[
\\Delta s = (m + \\tfrac{1}{2})\\lambda.
\\]



Minima:



\\[
\\Delta s = m\\lambda.
\\]



### Transmission

Maxima:



\\[
\\Delta s = m\\lambda.
\\]



Minima:



\\[
\\Delta s = (m + \\tfrac{1}{2})\\lambda.
\\]



## Physikalische Bedeutung

Die planparallele Platte erzeugt Interferenzstreifen, die von:

- Dicke \\(d\\)
- Brechungsindex \\(n\\)
- Einfallswinkel \\(\\alpha\\)
- Wellenlänge \\(\\lambda\\)

abhängen.

Diese Erscheinung ist Grundlage für:

- **Interferenzfilter**
- **Antireflexbeschichtungen**
- **Fabry‑Perot‑Interferometer**

## Warum der Phasensprung entscheidet

Ohne den Phasensprung von $\\pi$ an der oberen Grenzfläche wären die Bedingungen für Reflexion und Transmission identisch — die Platte würde in beide Richtungen zugleich ein Maximum liefern, was die Energieerhaltung verletzt. Der Sprung sorgt dafür, dass die Bedingungen gerade vertauscht sind: Wo das reflektierte Licht ein Minimum hat, hat das durchgelassene ein Maximum. Der Phasensprung tritt nur beim Übergang vom optisch dünneren zum dichteren Medium auf; die Reflexion an der Unterseite (Glas → Luft) erfolgt ohne Sprung.

## Farben dünner Schichten

Weil $\\Delta s$ von der Wellenlänge abhängt, erfüllt bei weißem Licht jede Farbe die Maximumbedingung unter einem anderen Winkel. Das erzeugt die bekannten Farbmuster von Ölfilmen auf Wasser und von Seifenblasen. Nimmt die Schichtdicke ab, wandern die Farben; wird sie sehr viel kleiner als $\\lambda$, dominiert der Phasensprung, und die Schicht erscheint im reflektierten Licht dunkel.

## Antireflexschicht

Trägt man auf Glas eine Schicht mit $n_\\mathrm{S} = \\sqrt{n_\\mathrm{Glas}}$ und der Dicke $d = \\lambda/(4 n_\\mathrm{S})$ auf, so löschen sich die an Ober- und Unterseite reflektierten Wellen bei senkrechtem Einfall weitgehend aus. Genau das ist die Vergütung von Brillengläsern und Objektiven. Sie wirkt exakt nur für eine Wellenlänge — deshalb der grünliche oder violette Restschimmer vergüteter Optik.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "planplatte-gangunterschied",
        name: "Gangunterschied planparallele Platte",
        equation: "ds = 2 * d * sqrt(n*n - sin(alpha)*sin(alpha))",
        variables: [
          { id: "ds", label: "Gangunterschied", symbol: "Δs", unit: "m", description: "Optischer Wegunterschied" },
          { id: "d", label: "Plattendicke", symbol: "d", unit: "m", description: "Dicke der Platte" },
          { id: "n", label: "Brechungsindex", symbol: "n", unit: "—", description: "Brechungsindex des Materials" },
          { id: "alpha", label: "Einfallswinkel", symbol: "α", unit: "rad", description: "Winkel des einfallenden Strahls" },
        ],
        umstellungen: [
          { solveFor: "ds", expr: "2 * d * sqrt(n*n - sin(alpha)*sin(alpha))" },
          { solveFor: "d", expr: "ds / (2 * sqrt(n*n - sin(alpha)*sin(alpha)))" },
          { solveFor: "n", expr: "sqrt((ds/(2*d))*(ds/(2*d)) + sin(alpha)*sin(alpha))" },
          { solveFor: "alpha", expr: "asin(sqrt(n*n - (ds/(2*d))*(ds/(2*d))))" },
        ],
        hints: ["Für senkrechten Einfall gilt Δs = 2nd.", "Reflexion enthält einen zusätzlichen Phasensprung von π."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wann tritt im reflektierten Licht ein Maximum auf?", options: ["Δs = mλ mit ganzem m", "Δs = λ/4 mit festem m", "Δs = 2λ unabhängig von m", "Δs = (m + 1/2)λ"], correct: 3, explanation: "Der Phasensprung verschiebt die Bedingung um λ/2." },
    { id: "q2", question: "Für senkrechten Einfall gilt Δs = 2nd. Welche Größe beeinflusst Δs nicht?", options: ["α", "d", "n", "λ"], correct: 0, explanation: "Bei α = 0 ist Δs unabhängig vom Winkel." },
    { id: "q3", question: "Was verursacht den Phasensprung von π?", options: ["Transmission durch die Platte", "Reflexion am optisch dichteren Medium", "Reflexion am optisch dünneren Medium", "Absorption im Material"], correct: 1, explanation: "Reflexion Luft → Glas erzeugt Phasensprung." },
    { id: "q4", question: "Wann tritt im transmittierten Licht ein Minimum auf?", options: ["Δs = mλ mit ganzem m", "Δs = λ unabhängig von m", "Δs = (m + 1/2)λ", "Δs = 0 für jeden Winkel"], correct: 2, explanation: "Ohne Phasensprung gelten die Standardbedingungen." },
    { id: "q5", question: "Wovon hängt Δs ab?", options: ["Nur von d", "Nur von n", "Nur von λ", "Von d, n und α"], correct: 3, explanation: "Δs = 2d√(n² − sin²α)." },
    { id: "q6", question: "Was ist die physikalische Bedeutung des optischen Gangunterschieds Δs?", options: ["Unterschiedliche Weglängen der Teilstrahlen", "Unterschiedliche Frequenzen der Teilstrahlen", "Unterschiedliche Breiten der Grenzflächen", "Unterschiedliche Kohärenzlängen der Quelle"], correct: 0, explanation: "Δs beschreibt die geometrische Wegdifferenz der beiden Strahlen." },
  ],
  flashcards: [
    { id: "0k641hj", front: "Gangunterschied planparallele Platte", back: "Δs = 2d√(n² − sin²α). Für α = 0 gilt Δs = 2nd." },
    { id: "0rqemtf", front: "Phasensprung", back: "Reflexion am dichteren Medium erzeugt Δφ = π. Verschiebt Maxima/Minima." },
    { id: "1h6u6i2", front: "Maxima Reflexion", back: "Δs = (m+1/2)λ. Durch Phasensprung um λ/2 verschoben." },
    { id: "0336mty", front: "Maxima Transmission", back: "Δs = mλ. Keine Phasenverschiebung." },
    { id: "04mgpkj", front: "Einfluss des Einfallswinkels", back: "Größere α → kleineres cosβ → veränderte Weglänge." },
    { id: "1md1mmy", front: "Bedeutung der planparallelen Platte", back: "Grundlage für Interferenzfilter, Antireflexschichten, Fabry‑Perot‑Interferometer." },
  ],
} satisfies Thema;
