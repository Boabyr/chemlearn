import type { Thema } from '../../../content/schema'

export const topic = {
  id: "22-beugung-einzelspalt",
  title: "Beugung am Einzelspalt",
  subtitle: "Interferenz als Ursache der Spaltbeugung",
  icon: "📘",
  estimatedMinutes: 75,
  theory: `
## Grundprinzip der Beugung am Spalt

Beugung ist ein Interferenzphänomen: Licht breitet sich nicht nur geradlinig aus, sondern wird an Hindernissen und Öffnungen in andere Richtungen gelenkt. Ein Spalt begrenzt die Wellenfront einer einfallenden ebenen Welle. Nach dem Huygens’schen Prinzip sendet jeder Punkt der Wellenfront **Sekundärwellen** aus. Da nur der freie Bereich des Spalts Sekundärwellen erzeugt, fehlt ein Teil der ursprünglichen Wellenfront. Die Superposition dieser Sekundärwellen führt zur charakteristischen Beugungsfigur.

Die Intensitätsverteilung hängt vom Winkel \\(\\theta\\) ab, unter dem die Sekundärwellen beobachtet werden.

## Modell: Diskrete Punktquellen

Zur Herleitung wird der Spalt der Breite \\(b\\) in \\(N\\) kleine Bereiche der Breite \\(\\Delta b\\) unterteilt. Jeder Bereich wirkt wie eine Punktquelle. Der Abstand zwischen den Quellen ist \\(d = \\Delta b\\). Für den Laufwegunterschied zwischen benachbarten Quellen gilt:



\\[
\\Delta s = d \\sin\\theta.
\\]



Die Phasendifferenz ist:



\\[
\\Delta\\phi = \\frac{2\\pi}{\\lambda} d \\sin\\theta.
\\]



Die Gesamtamplitude ergibt sich aus der Summe der Beiträge aller Quellen:



\\[
E = A \\sum_{j=1}^{N} e^{i(j-1)\\Delta\\phi}.
\\]



Dies ist eine geometrische Reihe, deren Betrag zu:



\\[
|E| = A \\frac{\\sin(N\\Delta\\phi/2)}{\\sin(\\Delta\\phi/2)}
\\]



führt.

Die Intensität ist proportional zu \\(|E|^2\\):



\\[
I(\\theta) = I_0 \\frac{\\sin^2(N\\Delta\\phi/2)}{\\sin^2(\\Delta\\phi/2)}.
\\]



## Übergang zum kontinuierlichen Spalt

Für \\(N \\to \\infty\\) und \\(\\Delta b \\to 0\\) gilt:



\\[
N\\Delta b = b.
\\]



Damit folgt:



\\[
I(\\theta) = I_0 \\left(\\frac{\\sin x}{x}\\right)^2,
\\]



mit



\\[
x = \\frac{\\pi b}{\\lambda}\\sin\\theta.
\\]



Dies ist die klassische **Einzelspalt-Beugungsformel**.

## Eigenschaften der Beugungsfigur

### Hauptmaximum

Das Hauptmaximum liegt bei \\(\\theta = 0\\):



\\[
I(0) = I_0.
\\]



### Minima

Minima treten auf, wenn:



\\[
x = m\\pi \\quad \\Rightarrow \\quad \\sin\\theta_m = \\frac{m\\lambda}{b}, \\quad m = \\pm 1, \\pm 2, \\dots
\\]



Physikalisch bedeutet dies: Für bestimmte Winkel löschen sich die Beiträge der Sekundärwellen vollständig aus.

### Nebenmaxima

Zwischen den Minima liegen Nebenmaxima, deren Intensität deutlich kleiner ist als die des Hauptmaximums.

### Reziprozitätsprinzip

Die Breite des Hauptmaximums ist:

- **indirekt proportional zur Spaltbreite \\(b\\)**  
- **direkt proportional zur Wellenlänge \\(\\lambda\\)**

Das bedeutet:

- großer Spalt → schmale Beugungsfigur  
- kleine Wellenlänge → schmale Beugungsfigur

## Physikalische Interpretation

Ein breiter Spalt enthält viele Sekundärquellen → starke Auslöschung in seitlichen Richtungen → schmale Hauptmaxima.

Ein schmaler Spalt enthält wenige Sekundärquellen → geringe Auslöschung → breite Beugungsfigur.

Die Einzelspaltbeugung ist Grundlage für:

- Auflösungsvermögen optischer Instrumente  
- Beugungsgitter (Überlagerung von Einzelspalt und Vielstrahlinterferenz)  
- Fourieroptik  
- Bestimmung von Spaltbreiten und Wellenlängen

## Grenzübergang zur kontinuierlichen Verteilung

Lässt man die Zahl der Teilquellen gegen unendlich und ihre Breite gegen null gehen, während $N\\Delta b = b$ festbleibt, geht die Summe in ein Integral über und die Intensitätsverteilung nimmt die geschlossene Form


\\[
I(\\theta) = I_0\\left(\\frac{\\sin x}{x}\\right)^2,
\\qquad
x = \\frac{\\pi b}{\\lambda}\\sin\\theta
\\]


an. Die Funktion $\\sin x / x$ heißt Spaltfunktion; ihr Wert bei $x = 0$ ist $1$, das zentrale Maximum liegt also stets in Vorwärtsrichtung.

## Minima und Breite des Hauptmaximums

Minima liegen dort, wo $\\sin x = 0$ bei $x \\neq 0$ ist, also bei


\\[
b\\sin\\theta_m = m\\lambda,\\qquad m = \\pm1, \\pm2, \\dots
\\]


Anschaulich zerfällt der Spalt dann in Paare von Teilquellen, deren Beiträge sich paarweise auslöschen. Das Hauptmaximum reicht vom ersten Minimum links bis zum ersten rechts, hat also die Winkelbreite $2\\lambda/b$, und enthält den weitaus größten Teil der Leistung: Das erste Nebenmaximum erreicht nur etwa $4{,}7\\%$ der zentralen Intensität. Für $b \\gg \\lambda$ wird das Hauptmaximum so schmal, dass das Licht praktisch geradlinig weiterläuft — so geht die Wellenoptik in die geometrische Optik über.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "einzelspalt-intensitaet",
        name: "Intensität Einzelspalt",
        equation: "I = I0 * (sin(x) / x) * (sin(x) / x)",
        variables: [
          { id: "I", label: "Intensität", symbol: "I", unit: "—", description: "Winkelabhängige Intensität" },
          { id: "I0", label: "Maximalintensität", symbol: "I0", unit: "—", description: "Intensität bei θ = 0" },
          { id: "x", label: "Argument", symbol: "x", unit: "—", description: "x = pi * b * sin(theta) / lambda" },
          { id: "b", label: "Spaltbreite", symbol: "b", unit: "m", description: "Breite des Spalts" },
          { id: "theta", label: "Winkel", symbol: "θ", unit: "rad", description: "Beugungswinkel" },
          { id: "lambda", label: "Wellenlänge", symbol: "λ", unit: "m", description: "Wellenlänge des Lichts" },
        ],
        umstellungen: [
          { solveFor: "I", expr: "I0 * (sin(x) / x) * (sin(x) / x)" },
          { solveFor: "x", expr: "pi * b * sin(theta) / lambda" },
          { solveFor: "b", expr: "x * lambda / (pi * sin(theta))" },
          { solveFor: "theta", expr: "asin(x * lambda / (pi * b))" },
          { solveFor: "lambda", expr: "x * b / (pi * sin(theta))" },
        ],
        hints: ["Minima bei x = mπ.", "Hauptmaximum bei θ = 0."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wann tritt beim Einzelspalt ein Minimum auf?", options: ["x = π/2", "x = mπ", "x = 2πm", "x = 0"], correct: 1, explanation: "Minima entstehen bei x = mπ." },
    { id: "q2", question: "Ein Spalt hat b = 0.2 mm und λ = 500 nm. Wo liegt das erste Minimum?", options: ["sinθ = 0.005", "sinθ = 0.001", "sinθ = 0.0025", "sinθ = 0.01"], correct: 2, explanation: "sinθ = λ/b = 5×10⁻⁷ / 2×10⁻⁴ = 2.5×10⁻³." },
    { id: "q3", question: "Was passiert bei größerer Spaltbreite?", options: ["Das Hauptmaximum wird breiter", "Die Intensität verschwindet", "Die Wellenlänge ändert sich", "Das Hauptmaximum wird schmaler"], correct: 3, explanation: "Große b → starke Auslöschung → schmale Beugungsfigur." },
    { id: "q4", question: "Welche physikalische Größe steckt im Argument x der Einzelspaltformel?", options: ["Verhältnis von Spaltbreite und Wellenlänge", "Frequenz des einfallenden Laserlichts", "Kohärenzlänge der verwendeten Quelle", "Intensität im Zentrum der Figur"], correct: 0, explanation: "x = πb sinθ / λ enthält b, λ und den Winkel → bestimmt die Phasenlage der Beiträge." },
    { id: "q5", question: "Was ist I(0)?", options: ["0", "I0", "2I0", "I0/2"], correct: 1, explanation: "Hauptmaximum bei θ = 0 → I(0) = I0." },
    { id: "q6", question: "Warum entsteht Beugung?", options: ["Durch Absorption an der Spaltkante", "Durch Reflexion an der Spaltkante", "Durch Interferenz der Sekundärwellen", "Durch Dispersion im Spaltmaterial"], correct: 2, explanation: "Beugung ist ein Interferenzphänomen nach Huygens." },
  ],
  flashcards: [
    { id: "1p3gcmj", front: "Einzelspaltformel", back: "I(θ) = I0 (sin x / x)² mit x = πb sinθ / λ. Beschreibt die Winkelabhängigkeit der Beugung." },
    { id: "0qs47fb", front: "Minima Einzelspalt", back: "sinθ_m = mλ/b. Bei diesen Winkeln löschen sich die Beiträge vollständig aus." },
    { id: "0zw5ibp", front: "Reziprozität der Beugungsbreite", back: "Große b → schmale Beugungsfigur; große λ → breite Beugungsfigur. Zusammenhang zwischen Spaltbreite und Auflösung." },
    { id: "0egtdsn", front: "Hauptmaximum des Einzelspalts", back: "Bei θ = 0. Intensität I0. Zentrum der Beugungsfigur." },
    { id: "1bg7bld", front: "Physikalische Ursache der Beugung", back: "Interferenz der Sekundärwellen nach Huygens. Begrenzte Wellenfront erzeugt Winkelverteilung." },
    { id: "0u8wq0p", front: "Bedeutung der Einzelspaltbeugung", back: "Grundlage für Auflösungsvermögen, Fourieroptik, Beugungsgitter und Spaltmessungen." },
  ],
} satisfies Thema;
