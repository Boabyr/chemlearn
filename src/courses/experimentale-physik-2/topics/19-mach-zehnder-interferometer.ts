import type { Thema } from '../../../content/schema'

export const topic = {
  id: "19-mach-zehnder-interferometer",
  title: "Mach-Zehnder-Interferometer",
  subtitle: "Zweistrahl-Interferenz mit zwei Strahlteilern",
  icon: "🪞",
  estimatedMinutes: 75,
  theory: `
## Aufbau des Mach-Zehnder-Interferometers

Das Mach‑Zehnder‑Interferometer ist ein Zweistrahl‑Interferometer, das im Gegensatz zum Michelson‑Interferometer **zwei Strahlteiler** verwendet. Dadurch verlaufen die beiden Teilstrahlen räumlich getrennt und werden erst am zweiten Strahlteiler wieder vereinigt.

Der Aufbau besteht aus:

1. **Strahlteiler ST1**, der den einfallenden Strahl in einen reflektierten (r) und einen transmittierten (t) Teilstraahl aufspaltet.
2. **Spiegel SP1 und SP2**, die die beiden Strahlen umlenken.
3. **Strahlteiler ST2**, der die beiden Strahlen erneut reflektiert bzw. transmittiert.
4. **Detektoren D1 und D2**, an denen die Interferenz beobachtet wird.

Die beiden Strahlwege sind vollständig getrennt, wodurch sich das Mach‑Zehnder‑Interferometer besonders gut eignet, um **Phasenänderungen in einem der beiden Arme** zu untersuchen.

## Phasenunterschied durch ein Medium

Ein Arm des Interferometers enthält eine Zelle der Länge \\(L\\), die mit einem Medium der Brechungsindex \\(n\\) gefüllt ist. Der andere Arm enthält nur Luft (\\(n \\approx 1\\)). Dadurch entsteht ein optischer Wegunterschied:



\\[
\\Delta s = (n - 1)L.
\\]



Der zugehörige Phasenunterschied ist:



\\[
\\Delta\\phi = \\frac{2\\pi}{\\lambda}(n - 1)L.
\\]



Ändert sich der Brechungsindex um \\(\\Delta n\\), so ändert sich die Phase um:



\\[
\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta n\\,L.
\\]



Dies führt zu einer Verschiebung des Interferenzmusters an den Detektoren.

## Intensität an den Detektoren

Die beiden Strahlen werden an ST2 wieder vereinigt. Je nach Kombination von Reflexion und Transmission entstehen zwei Ausgangsstrahlen:

- **D1 (t‑r)**: zuerst transmittiert, dann reflektiert  
- **D2 (r‑t)**: zuerst reflektiert, dann transmittiert

Die Intensität an einem Detektor hängt vom Phasenunterschied ab:



\\[
I(\\Delta\\phi) = I_0 \\left(1 + \\cos\\Delta\\phi\\right).
\\]



Zwischen zwei aufeinanderfolgenden Maxima gilt:



\\[
\\Delta\\phi = 2\\pi.
\\]



Damit folgt für die Änderung des Brechungsindex:



\\[
\\Delta n = \\frac{\\lambda}{L}.
\\]



## Anwendungen

Das Mach‑Zehnder‑Interferometer ist besonders geeignet für:

- **Brechungsindexmessungen** in Gasen und Flüssigkeiten  
- **Druck‑ und Temperaturmessungen** über optische Wegänderungen  
- **Phasenmodulation** in optischen Systemen  
- **Quantitative Interferometrie** in der Forschung  
- **Visualisierung von Strömungen** (Schlieren‑ und Interferometrie)

Durch die räumliche Trennung der Strahlwege können gezielt optische Elemente in einen Arm eingefügt werden, ohne den anderen zu beeinflussen.

## Energieerhaltung an den beiden Ausgängen

Die beiden Detektoren zeigen nie gleichzeitig ein Maximum. Wegen der unterschiedlichen Zahl von Reflexionen auf den beiden Wegen unterscheiden sich die Phasen der Ausgänge um $\\pi$, sodass


\\[
I_{D1} + I_{D2} = \\mathrm{konst.}
\\]


gilt: Was der eine Ausgang verliert, gewinnt der andere. Interferenz vernichtet also keine Energie, sondern verteilt sie um — eine Kontrolle, die im Experiment sofort auffällt, wenn ein Arm Verluste hat.

## Vergleich mit dem Michelson-Interferometer

Beim Michelson-Aufbau durchläuft jeder Strahl seinen Arm zweimal, beim Mach-Zehnder nur einmal. Daraus folgt: Für dieselbe Phasenänderung braucht der Mach-Zehnder die doppelte Probenlänge, dafür ist die Probe nur einmal zu durchqueren, und das rücklaufende Licht stört die Quelle nicht. Weil beide Wege räumlich vollständig getrennt sind, lässt sich außerdem ein ausgedehntes Objekt — etwa eine Gasströmung im Windkanal — flächig abbilden, statt nur einen Punktwert zu liefern.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "mach-zehnder-phase",
        name: "Phasenverschiebung Mach-Zehnder",
        equation: "dphi = 2 * pi * dn * L / lambda",
        variables: [
          { id: "dphi", label: "Phasenverschiebung", symbol: "Δφ", unit: "rad", description: "Änderung der Phasendifferenz" },
          { id: "dn", label: "Brechungsindexänderung", symbol: "Δn", unit: "—", description: "Änderung des Brechungsindex im Messarm" },
          { id: "L", label: "Länge der Zelle", symbol: "L", unit: "m", description: "Länge des Mediums im Strahlarm" },
          { id: "lambda", label: "Wellenlänge", symbol: "λ", unit: "m", description: "Wellenlänge des Lichts" },
        ],
        umstellungen: [
          { solveFor: "dphi", expr: "2 * pi * dn * L / lambda" },
          { solveFor: "dn", expr: "dphi * lambda / (2 * pi * L)" },
          { solveFor: "L", expr: "dphi * lambda / (2 * pi * dn)" },
          { solveFor: "lambda", expr: "2 * pi * dn * L / dphi" },
        ],
        hints: ["Ein Phasensprung von 2π entspricht einem vollständigen Interferenzzyklus.", "Δn = λ/L für zwei aufeinanderfolgende Maxima."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Was erzeugt im Mach‑Zehnder‑Interferometer den Phasenunterschied?", options: ["Unterschiedliche Spiegelmaterialien", "Unterschiedliche Intensitäten", "Unterschiedliche optische Weglängen", "Unterschiedliche Frequenzen"], correct: 2, explanation: "Ein Medium im Strahlarm erzeugt einen optischen Wegunterschied." },
    { id: "q2", question: "Ein Medium der Länge L erzeugt eine Brechungsindexänderung Δn. Wie groß ist die Phasenverschiebung?", options: ["Δφ = Δn/L", "Δφ = λ/(ΔnL)", "Δφ = Δnλ", "Δφ = 2πΔnL/λ"], correct: 3, explanation: "Δφ = (2π/λ)ΔnL." },
    { id: "q3", question: "Wann tritt ein Intensitätsmaximum auf?", options: ["Δφ = 2πm", "Δφ = π", "Δφ = π/2", "Δφ = 0 nur für m=0"], correct: 0, explanation: "Maxima entstehen bei Δφ = 2πm." },
    { id: "q4", question: "Was passiert bei einer kontinuierlichen Änderung von n?", options: ["Das Muster bleibt konstant", "Das Interferenzmuster wandert", "Die Wellenlänge ändert sich", "Die Spiegel reflektieren anders"], correct: 1, explanation: "Δφ ändert sich → Maxima und Minima verschieben sich." },
    { id: "q5", question: "Welche Beziehung gilt zwischen zwei Maxima?", options: ["Δn = L/λ", "Δn = λ²/L", "Δn = λ/L", "Δn = 1/L"], correct: 2, explanation: "Δφ = 2π → Δn = λ/L." },
    { id: "q6", question: "Was ist die physikalische Bedeutung des optischen Wegunterschieds Δs?", options: ["Unterschiedliche Frequenzen der Strahlen", "Unterschiedliche Spiegelbreiten", "Unterschiedliche Kohärenzlängen", "Unterschiedliche Weglängen der beiden Interferenzarme"], correct: 3, explanation: "Δs beschreibt die geometrische Wegdifferenz zwischen den beiden Strahlarmen." },
  ],
  flashcards: [
    { id: "0bntcvz", front: "Phasenverschiebung Mach‑Zehnder", back: "Δφ = (2π/λ)ΔnL. Bestimmt die Intensität am Detektor." },
    { id: "1yq6ck3", front: "Intensität Mach‑Zehnder", back: "I = I₀(1 + cosΔφ). Maxima bei Δφ = 2πm, Minima bei (2m+1)π." },
    { id: "1uk0cvh", front: "Brechungsindexänderung", back: "Δn = λ/L zwischen zwei Maxima. Grundlage für Messungen." },
    { id: "0i1l5bx", front: "Aufbau Mach‑Zehnder", back: "Zwei Strahlteiler, zwei Spiegel, zwei getrennte Strahlwege, zwei Detektoren." },
    { id: "18bjvtw", front: "Anwendungen des Mach-Zehnder-Interferometers", back: "Messung von Δn, Temperatur‑ und Druckänderungen, Strömungsvisualisierung." },
    { id: "0yvkgyb", front: "Optischer Wegunterschied", back: "Δs = (n−1)L. Führt zu einer messbaren Phasenverschiebung." },
  ],
} satisfies Thema;
