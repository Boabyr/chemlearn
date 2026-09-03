import type { Thema } from '../../../content/schema'

export const topic = {
  id: "17-young-doppelspalt",
  title: "Youngscher Doppelspaltversuch",
  subtitle: "Zweistrahl-Interferenz und Gangunterschied",
  icon: "🟦🟦",
  estimatedMinutes: 75,
  theory: `
## Aufbau des Doppelspaltversuchs

Der Youngsche Doppelspalt ist ein klassisches Interferenzexperiment, das zeigt, dass Licht Wellencharakter besitzt. Eine Punktlichtquelle LQ beleuchtet zwei schmale Spalte S1 und S2 im Abstand \\(d\\). Jeder Spalt wirkt als Ausgangspunkt einer kohärenten Teilwelle. Auf einem weit entfernten Beobachtungsschirm entsteht ein streifenförmiges Interferenzmuster.

Geometrie:

1. Die Spalte liegen parallel zur y‑Achse, Abstand \\(d\\) entlang der x‑Achse.  
2. Der Schirm liegt in der (x,y)-Ebene; die Interferenzstreifen verlaufen parallel zu den Spalten.  
3. Ein Beobachtungspunkt P befindet sich bei Koordinate \\(x\\).  
4. Die optischen Wegstrecken \\(s_1\\) und \\(s_2\\) sind die Abstände von S1 bzw. S2 nach P.

Für einen weit entfernten Schirm (\\(z \\gg d\\)) und kleine Winkel \\(\\theta\\) gilt die Näherung:



\\[
\\Delta s = s_2 - s_1 \\approx d \\sin\\theta \\approx d \\frac{x}{z}.
\\]



Die Phasendifferenz ergibt sich zu:



\\[
\\Delta\\phi = k\\,\\Delta s = k\\,d\\sin\\theta.
\\]



## Bedingungen für Interferenzmaxima und Minima

Die Intensität am Punkt P ist:



\\[
I = I_1 + I_2 + 2\\sqrt{I_1 I_2}\\cos(k\\Delta s + \\Delta\\phi_0),
\\]



wobei \\(\\Delta\\phi_0\\) eine eventuelle zusätzliche Phasendifferenz der Spalte ist. Im symmetrischen Fall ist \\(\\Delta\\phi_0 = 0\\).

### Konstruktive Interferenz



\\[
\\Delta s = m\\lambda, \\quad m \\in \\mathbb{Z}.
\\]



Dies führt zu hellen Streifen (Maxima). Die Winkelpositionen der Maxima sind:



\\[
\\sin\\theta_m = \\frac{m\\lambda}{d}.
\\]



### Destruktive Interferenz



\\[
\\Delta s = (m + \\tfrac{1}{2})\\lambda.
\\]



Dies führt zu dunklen Streifen (Minima).

## Intensitätsverteilung

Für gleiche Intensitäten der beiden Spalte gilt:



\\[
I(\\theta) = 2I_0\\left[1 + \\cos(k d \\sin\\theta)\\right].
\\]



Die Streifen sind äquidistant im Winkelraum. Die Breite der Streifen hängt von der Wellenlänge und dem Spaltabstand ab:

- Größeres \\(d\\) → engerer Streifenabstand  
- Größere \\(\\lambda\\) → breiterer Streifenabstand

## Einfluss der Quellgröße (Zusatzfolie)

Eine ausgedehnte Lichtquelle führt zu einer zusätzlichen Phasendifferenz zwischen S1 und S2, da verschiedene Punkte der Quelle unterschiedliche Weglängen zu den Spalten besitzen.

Der maximale Gangunterschied zwischen Randpunkten der Quelle ist:



\\[
\\Delta s_Q \\approx b \\sin\\theta = \\frac{b d}{2D},
\\]



wobei \\(b\\) die Quellbreite und \\(D\\) der Abstand Quelle–Spalt ist.

Kohärenzbedingung:



\\[
\\Delta s_Q < \\frac{\\lambda}{2}.
\\]



Ist die Quelle zu groß, verschwinden die Interferenzstreifen, da die Phasenbeziehungen zwischen den Spalten nicht mehr stabil sind.

## Zahlenbeispiel

Für einen Spaltabstand $d = 1\\,\\mathrm{mm}$ und die Wellenlänge $\\lambda = 500\\,\\mathrm{nm}$ liegt das erste Maximum bei


\\[
\\sin\\theta_1 = \\frac{\\lambda}{d} = \\frac{500\\cdot10^{-9}}{1\\cdot10^{-3}} = 5\\cdot10^{-4},
\\]


also bei $\\theta_1 \\approx 0{,}0005\\,\\mathrm{rad}$, weil für so kleine Winkel $\\sin\\theta\\approx\\theta$ gilt. Auf einem Schirm im Abstand $z = 2\\,\\mathrm{m}$ entspricht das einem Streifenabstand von $x = z\\lambda/d = 1\\,\\mathrm{mm}$. Die Streifen sind also mit bloßem Auge erkennbar, obwohl die Wellenlänge selbst tausendfach kleiner ist als der Spaltabstand: Der Doppelspalt übersetzt eine mikroskopische Länge in eine messbare.

## Warum das Experiment historisch zählt

Ein Teilchenbild kann das Muster nicht erklären: Öffnet man den zweiten Spalt zusätzlich, wird es an manchen Stellen dunkler als vorher. Mehr Licht ergibt weniger Helligkeit — das ist nur als Überlagerung von Amplituden verständlich, nicht als Addition von Intensitäten. Young lieferte damit 1801 das Argument für die Wellennatur des Lichts.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "doppelspalt-gangunterschied",
        name: "Gangunterschied Doppelspalt",
        equation: "ds = d * sin(theta)",
        variables: [
          { id: "ds", label: "Gangunterschied", symbol: "Δs", unit: "m", description: "Wegdifferenz der beiden Spalte" },
          { id: "d", label: "Spaltabstand", symbol: "d", unit: "m", description: "Abstand der Spalte" },
          { id: "theta", label: "Winkel", symbol: "θ", unit: "rad", description: "Beobachtungswinkel" },
        ],
        umstellungen: [
          { solveFor: "ds", expr: "d * sin(theta)" },
          { solveFor: "d", expr: "ds / sin(theta)" },
          { solveFor: "theta", expr: "asin(ds / d)" },
        ],
        hints: ["Für kleine Winkel gilt sinθ ≈ θ.", "Maxima entstehen bei Δs = mλ."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wann tritt beim Doppelspalt konstruktive Interferenz auf?", options: ["Δs = mλ", "Δs = (m+1/2)λ", "Δs = λ/4", "Δs = 0 nur für m=0"], correct: 0, explanation: "Δs = mλ ist die Bedingung für Maxima." },
    { id: "q2", question: "Ein Doppelspalt hat d = 0.5 mm und λ = 500 nm. Bei welchem Winkel liegt das erste Maximum?", options: ["1×10⁻³ rad", "5×10⁻⁴ rad", "2.5×10⁻⁴ rad", "1×10⁻⁴ rad"], correct: 1, explanation: "sinθ = λ/d = 5×10⁻⁴ → θ ≈ 5×10⁻⁴ rad. (Rechenweg + Ergebnis gemäß B6)" },
    { id: "q3", question: "Was passiert, wenn die Lichtquelle zu groß ist?", options: ["Die Maxima werden heller", "Die Wellenlänge ändert sich", "Die Interferenzstreifen verschwinden", "Der Spaltabstand wird irrelevant"], correct: 2, explanation: "Große Quellen erzeugen variable Phasendifferenzen → Verlust der Kohärenz." },
    { id: "q4", question: "Wovon hängt der Streifenabstand ab?", options: ["Nur von der Intensität", "Nur von der Spaltbreite", "Vom Abstand zum Schirm", "Von d und λ"], correct: 3, explanation: "sinθ_m = mλ/d." },
    { id: "q5", question: "Welche Näherung gilt für kleine Winkel?", options: ["sinθ ≈ θ", "sinθ ≈ θ²", "sinθ ≈ 1/θ", "sinθ ≈ 0"], correct: 0, explanation: "Kleinwinkelnäherung." },
    { id: "q6", question: "Was ist der physikalische Ursprung des Gangunterschieds Δs?", options: ["Unterschiedliche Frequenzen der beiden Spalte", "Unterschiedliche Weglängen der Teilstrahlen zum Punkt", "Unterschiedliche Breiten der beiden Spalte", "Unterschiedliche Kohärenzlängen der Teilstrahlen"], correct: 1, explanation: "Δs = s₂ − s₁ beschreibt die geometrische Wegdifferenz. (B3: umformuliert)" },
  ],
  flashcards: [
    { id: "0efcdzm", front: "Gangunterschied Doppelspalt", back: "Δs = d sinθ. Bestimmt die Phasendifferenz und damit die Interferenzbedingungen." },
    { id: "1cqvuf4", front: "Maxima Doppelspalt", back: "Δs = mλ. Die Winkelpositionen sind sinθ_m = mλ/d." },
    { id: "0nnzetu", front: "Minima Doppelspalt", back: "Δs = (m+1/2)λ. Führt zu dunklen Streifen." },
    { id: "1hq782l", front: "Einfluss der Quellgröße", back: "Große Quellen erzeugen variable Phasen an S1 und S2. Kohärenzbedingung: Δs_Q < λ/2." },
    { id: "0jgc5e3", front: "Kleinwinkelnäherung", back: "Für θ ≪ 1 gilt sinθ ≈ θ. Erlaubt einfache geometrische Beziehungen." },
    { id: "0yfj4o8", front: "Streifenabstand", back: "Abhängig von λ und d. Größeres d → engerer Abstand; größere λ → breiterer Abstand." },
  ],
} satisfies Thema;
