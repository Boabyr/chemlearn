import type { Thema } from '../../../content/schema'

export const topic = {
  id: "24-beugung-kreisfoermiges-objekt",
  title: "Beugung an kreisförmigen Objekten",
  subtitle: "Airy-Muster und Besselfunktion erster Ordnung",
  icon: "⚪",
  estimatedMinutes: 75,
  theory: `
## Beugung an kreisförmigen Objekten

Beugung tritt nicht nur an Spalten oder Kanten auf, sondern auch an **kreisförmigen Objekten** wie Blenden oder Spiegeln. Die Beugungsfigur ist rotationssymmetrisch und wird durch die Überlagerung der Sekundärwellen aus dem kreisförmigen Bereich der Wellenfront erzeugt.

Ein kreisförmiges Objekt mit Radius \\(R = b/2\\) erzeugt eine charakteristische Intensitätsverteilung, das sogenannte **Airy-Muster**.

## Airy-Muster

Die Intensität in Abhängigkeit vom Beugungswinkel \\(\\theta\\) lautet:



\\[
I(\\theta) = I_0 \\left( \\frac{2 J_1(x)}{x} \\right)^2,
\\]



mit



\\[
x = \\frac{2\\pi R}{\\lambda} \\sin\\theta.
\\]



Hier ist \\(J_1(x)\\) die **Besselfunktion erster Ordnung**.  
Diese Funktion beschreibt die radiale Struktur der Beugungsfigur.

### Eigenschaften des Airy-Musters

1. **Rotationssymmetrie**  
   Die Beugungsfigur ist kreisförmig, da das Objekt selbst rotationssymmetrisch ist.

2. **Hauptmaximum**  
   Das zentrale Maximum liegt bei \\(\\theta = 0\\).  
   Die Intensität fällt mit zunehmendem Winkel ab.

3. **Erstes Minimum**  
   Das erste Minimum tritt auf, wenn:

   

\\[
   J_1(x) = 0.
   \\]



   Der erste Nullpunkt von \\(J_1\\) liegt bei \\(x \\approx 3.8317\\).  
   Damit folgt:

   

\\[
   \\sin\\theta_1 = 0.61 \\frac{\\lambda}{R}.
   \\]



   Dies ist eine wichtige Beziehung für das **Auflösungsvermögen optischer Systeme**.

4. **Nebenmaxima**  
   Die Nebenmaxima sind deutlich schwächer als das Hauptmaximum.  
   Die Intensität fällt schnell ab.

## Physikalische Interpretation

Die Beugung entsteht durch die Überlagerung der Sekundärwellen aus dem kreisförmigen Segment der Wellenfront.  
Die Besselfunktion ergibt sich aus der Integration über alle radialen Beiträge.

Die Airy-Struktur ist zentral für:

- Mikroskopie  
- Teleskopoptik  
- Beugungsbegrenzte Auflösung  
- Laserstrahlprofile  
- Optische Messverfahren

## Transmission und Reflexion

Die Folien zeigen, dass die Beugungsfigur bei **Transmission** und **Reflexion** identisch ist, sofern das Objekt dieselbe Form und Größe besitzt.

Beugung ist ein Interferenzphänomen und hängt nicht davon ab, ob die Welle durch das Objekt hindurchgeht oder an ihm reflektiert wird.

## Auflösungsvermögen

Die Beziehung



\\[
\\sin\\theta_1 = 0.61 \\frac{\\lambda}{R}
\\]



ist die Grundlage für das **Rayleigh-Kriterium**:

Zwei Punktquellen sind gerade noch auflösbar, wenn das Maximum der einen Quelle im ersten Minimum der anderen liegt.

Dies bestimmt die Grenzen optischer Instrumente.

## Warum die Besselfunktion auftritt

Beim Spalt läuft die Summation über eine Länge, bei der Kreisblende über eine Fläche. Integriert man die Beiträge in Polarkoordinaten über die Kreisscheibe, führt der Winkelanteil auf ein Integral, das genau die Besselfunktion erster Ordnung definiert. $J_1$ übernimmt für die runde Öffnung dieselbe Rolle wie $\\sin x$ für den Spalt — nur liegen ihre Nullstellen nicht bei ganzzahligen Vielfachen von $\\pi$, sondern bei $3{,}8317$, $7{,}0156$, $10{,}1735$ und so fort. Daher der krumme Faktor $0{,}61$ statt einer runden Zahl.

## Zahlenbeispiel

Ein Teleskop mit $D = 2R = 100\\,\\mathrm{mm}$ Öffnung erreicht bei $\\lambda = 550\\,\\mathrm{nm}$ einen Winkelradius des ersten Minimums von


\\[
\\theta_1 \\approx 1{,}22\\frac{\\lambda}{D} \\approx 6{,}7\\cdot10^{-6}\\,\\mathrm{rad},
\\]


also etwa $1{,}4$ Bogensekunden. Doppelsterne mit geringerem Abstand erscheinen selbst bei perfekter Optik als ein einziger Punkt. Nur eine größere Öffnung — nicht eine stärkere Vergrößerung — verbessert das.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "airy-minimum",
        name: "Erstes Airy-Minimum",
        equation: "sin_theta = 0.61 * lambda / R",
        variables: [
          { id: "sin_theta", label: "Sinus des Winkels", symbol: "sinθ", unit: "—", description: "Winkelposition des ersten Minimums" },
          { id: "lambda", label: "Wellenlänge", symbol: "λ", unit: "m", description: "Wellenlänge des Lichts" },
          { id: "R", label: "Radius des Objekts", symbol: "R", unit: "m", description: "Radius des kreisförmigen Objekts" },
        ],
        umstellungen: [
          { solveFor: "sin_theta", expr: "0.61 * lambda / R" },
          { solveFor: "lambda", expr: "sin_theta * R / 0.61" },
          { solveFor: "R", expr: "0.61 * lambda / sin_theta" },
        ],
        hints: ["Erstes Minimum bei J₁(x) = 0.", "Grundlage des Rayleigh-Kriteriums."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wann tritt das erste Minimum des Airy-Musters auf?", options: ["x = π", "x = 2π", "x = 1", "x ≈ 3.83"], correct: 3, explanation: "Der erste Nullpunkt der Besselfunktion J₁ liegt bei x ≈ 3.83." },
    { id: "q2", question: "Wie lautet die Beziehung für das erste Minimum?", options: ["sinθ = 0.61 λ/R", "sinθ = λ/R", "sinθ = 2λ/R", "sinθ = λ/(2R)"], correct: 0, explanation: "sinθ₁ = 0.61 λ/R." },
    { id: "q3", question: "Warum ist das Airy-Muster rotationssymmetrisch?", options: ["Wegen der Wellenlänge des Lichts", "Wegen der Kreisform des beugenden Objekts", "Wegen der Intensität der Quelle", "Wegen der Kohärenzlänge der Quelle"], correct: 1, explanation: "Kreisförmiges Objekt → rotationssymmetrische Beugung." },
    { id: "q4", question: "Welche Rolle spielt die Besselfunktion J₁(x) im Airy-Muster?", options: ["Sie bestimmt die Spaltbreite", "Sie beschreibt die Kohärenzlänge", "Sie beschreibt die radiale Struktur der Beugungsfigur", "Sie gibt die Intensität des Hauptmaximums direkt an"], correct: 2, explanation: "J₁(x) entsteht aus der Integration der radialen Beiträge." },
    { id: "q5", question: "Wovon hängt die Breite des Airy-Musters ab?", options: ["Nur von R", "Nur von λ", "Nur von der Intensität", "Von λ und R"], correct: 3, explanation: "sinθ₁ = 0.61 λ/R." },
    { id: "q6", question: "Was beschreibt das Rayleigh-Kriterium?", options: ["Bedingung für das Auflösungsvermögen", "Bedingung für konstruktive Interferenz", "Bedingung für Kohärenz", "Bedingung für Transmission"], correct: 0, explanation: "Zwei Punktquellen sind gerade auflösbar, wenn das Maximum der einen im Minimum der anderen liegt." },
  ],
  flashcards: [
    { id: "0en7467", front: "Airy-Muster", back: "I(θ) = I₀ (2J₁(x)/x)². Rotationssymmetrische Beugungsfigur eines kreisförmigen Objekts." },
    { id: "0al45g9", front: "Erstes Airy-Minimum", back: "sinθ₁ = 0.61 λ/R. Nullstelle von J₁(x) bei x ≈ 3.83." },
    { id: "1gyx7z0", front: "Besselfunktion J₁", back: "J₁(x) ist die Besselfunktion erster Ordnung. Beschreibt die radiale Struktur des Airy-Musters." },
    { id: "1fcvaq9", front: "Physikalische Ursache", back: "Interferenz der Sekundärwellen aus dem kreisförmigen Segment der Wellenfront." },
    { id: "19gul6k", front: "Transmission und Reflexion", back: "Beugungsfigur identisch, wenn das Objekt gleiche Form und Größe hat." },
    { id: "0rm0p2j", front: "Bedeutung des Airy-Musters", back: "Zentral für Auflösungsvermögen von Mikroskopen, Teleskopen und optischen Messverfahren." },
  ],
} satisfies Thema;
