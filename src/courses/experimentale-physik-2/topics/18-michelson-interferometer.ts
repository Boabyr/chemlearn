import type { Thema } from '../../../content/schema'

export const topic = {
  id: "18-michelson-interferometer",
  title: "Michelson-Interferometer",
  subtitle: "Zweistrahl-Interferenz durch Laufwegdifferenzen",
  icon: "🔭",
  estimatedMinutes: 75,
  theory: `
## Aufbau des Michelson-Interferometers

Das Michelson-Interferometer ist ein klassisches Zweistrahl-Interferenzgerät. Ein einfallender Lichtstrahl trifft auf einen **Strahlteiler (ST)**, der ihn in zwei Teilstrahlen aufspaltet:

- **Strahl 1:** wird reflektiert und läuft zu Spiegel M1  
- **Strahl 2:** wird transmittiert und läuft zu Spiegel M2  

Beide Strahlen werden an den Spiegeln zurückgeworfen und am Strahlteiler wieder vereinigt. Die Überlagerung der beiden Teilwellen erzeugt ein Interferenzmuster, das am Detektor D beobachtet wird.

Der entscheidende Parameter ist der **Laufwegunterschied**:



\\[
\\Delta s = 2s_1 - 2s_2 = 2(\\mathrm{STM}_1 - \\mathrm{STM}_2).
\\]



Die doppelte Weglänge entsteht, weil jeder Strahl den Weg zum Spiegel und zurück durchläuft.

## Feldstärken und Intensität

Für eine einfallende Welle



\\[
E = A \\cos(\\omega t - kz)
\\]



ergibt sich für die beiden Teilwellen (Index \\(i = 1,2\\)):



\\[
E_i = \\sqrt{RT}\\, A \\cos(\\omega t + \\phi_i),
\\]



wobei \\(R\\) und \\(T\\) Reflexions- bzw. Transmissionsvermögen des Strahlteilers sind.

Die Gesamtintensität ist proportional zu \\((E_1 + E_2)^2\\). Nach trigonometrischer Umformung ergibt sich die zeitlich gemittelte Intensität:



\\[
\\langle I \\rangle = RT\\, 2 I_e \\left(1 + \\cos\\Delta\\phi\\right),
\\]



mit



\\[
\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta s.
\\]



Für einen halbdurchlässigen Strahlteiler gilt \\(R = T = 0.5\\). Dann folgt:



\\[
\\langle I \\rangle = \\frac{1}{2} I_e (1 + \\cos\\Delta\\phi).
\\]



## Interferenzmuster

Das Interferenzmuster besteht aus hellen und dunklen Bereichen:

- **Maxima:** \\(\\Delta\\phi = 2\\pi m\\)  
- **Minima:** \\(\\Delta\\phi = (2m+1)\\pi\\)

Die Intensität oszilliert mit dem Laufwegunterschied:



\\[
\\langle I \\rangle = \\frac{1}{2} I_e \\left(1 + \\cos\\left(\\frac{2\\pi}{\\lambda}\\Delta s\\right)\\right).
\\]



Durch Verschieben eines Spiegels (typisch M1) kann man \\(\\Delta s\\) kontrolliert ändern. Jede Verschiebung um \\(\\lambda/2\\) führt zu einem Wechsel zwischen Maximum und Minimum.

## Anwendungen

Das Michelson-Interferometer ist eines der wichtigsten Instrumente der Optik:

- **Längenmessung:** extrem präzise Bestimmung kleiner Wegänderungen  
- **Spektralanalyse:** Bestimmung von Frequenzbreiten über die Sichtbarkeit der Interferenz  
- **Brechungsindexmessung:** Einfügen eines Mediums in einen Strahlarm erzeugt zusätzliche Phasenverschiebung  
- **Fundamentale Experimente:** Michelson-Morley-Experiment zur Ätherhypothese

Die Empfindlichkeit hängt direkt von der Kohärenzlänge der Lichtquelle ab. Laser ermöglichen Interferenz über große Wegdifferenzen, während thermische Quellen nur geringe Unterschiede tolerieren.

## Zahlenbeispiel zur Empfindlichkeit

Wird ein Spiegel um $\\Delta x$ verschoben, ändert sich der Laufwegunterschied um $2\\Delta x$. Ein voller Streifendurchgang entspricht daher


\\[
\\Delta x = \\frac{\\lambda}{2}.
\\]


Bei $\\lambda = 633\\,\\mathrm{nm}$ sind das rund $317\\,\\mathrm{nm}$ pro Streifen. Zählt man die Streifen beim Verfahren des Spiegels, misst man eine Strecke in Einheiten der Lichtwellenlänge — daher die Eignung als Längennormal.

## Michelson-Morley und LIGO

Das berühmteste Experiment mit diesem Aufbau suchte 1887 nach der Bewegung der Erde gegen den vermuteten Lichtäther. Ein Ätherwind hätte die Laufzeit in den beiden Armen unterschiedlich beeinflussen müssen; die erwartete Streifenverschiebung blieb aus. Dieses Nullergebnis wurde zu einem der Ausgangspunkte der speziellen Relativitätstheorie. Dasselbe Grundprinzip arbeitet heute in Gravitationswellendetektoren: Dort sind die Arme kilometerlang, und gemessen werden Längenänderungen von weniger als einem Tausendstel eines Protondurchmessers.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "michelson-intensitaet",
        name: "Intensität Michelson-Interferometer",
        equation: "I = Ie * (1 + cos(2 * pi * ds / lambda)) / 2",
        variables: [
          { id: "I", label: "Intensität", symbol: "I", unit: "—", description: "Beobachtete Intensität" },
          { id: "Ie", label: "Einfallsintensität", symbol: "I_e", unit: "—", description: "Intensität des einfallenden Strahls" },
          { id: "ds", label: "Laufwegdifferenz", symbol: "Δs", unit: "m", description: "Wegunterschied der beiden Strahlarme" },
          { id: "lambda", label: "Wellenlänge", symbol: "λ", unit: "m", description: "Wellenlänge des Lichts" },
        ],
        umstellungen: [
          { solveFor: "I", expr: "Ie * (1 + cos(2 * pi * ds / lambda)) / 2" },
          { solveFor: "ds", expr: "(lambda / (2 * pi)) * acos(2 * I / Ie - 1)" },
          { solveFor: "lambda", expr: "(2 * pi * ds) / acos(2 * I / Ie - 1)" },
        ],
        hints: ["Maxima bei Δs = mλ, Minima bei Δs = (m+1/2)λ.", "Spiegelverschiebung um λ/2 erzeugt einen vollständigen Intensitätswechsel."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wann tritt beim Michelson-Interferometer ein Intensitätsmaximum auf?", options: ["Δφ = π", "Δφ = 2πm", "Δφ = π/2", "Δφ = 0 nur für m=0"], correct: 1, explanation: "Maxima entstehen bei Δφ = 2πm." },
    { id: "q2", question: "Ein Spiegel wird um λ/4 verschoben. Wie stark ändert sich Δs?", options: ["λ/4", "λ", "λ/2", "2λ"], correct: 2, explanation: "Der Strahl läuft zum Spiegel und zurück → Wegdifferenz verdoppelt sich → Δs = 2·(λ/4) = λ/2." },
    { id: "q3", question: "Was ist die physikalische Bedeutung des Laufwegunterschieds Δs?", options: ["Unterschiedliche Frequenzen der Strahlen", "Unterschiedliche Spiegelbreiten", "Unterschiedliche Kohärenzlängen", "Unterschiedliche Weglängen der beiden Strahlarme"], correct: 3, explanation: "Δs beschreibt die geometrische Wegdifferenz zwischen den beiden Interferenzarmen." },
    { id: "q4", question: "Welche Bedingung führt zu einem Minimum?", options: ["Δφ = (2m+1)π", "Δφ = 2πm", "Δφ = 0", "Δφ = π/4"], correct: 0, explanation: "Minima entstehen bei ungeraden Vielfachen von π." },
    { id: "q5", question: "Wovon hängt die Sichtbarkeit des Interferenzmusters ab?", options: ["Nur von der Intensität", "Von der Kohärenzlänge der Quelle", "Vom Spiegelmaterial", "Vom Strahlteilerwinkel"], correct: 1, explanation: "Große Kohärenzlänge → stabile Interferenz." },
    { id: "q6", question: "Was passiert bei R = T = 0.5?", options: ["Vollständiger Verlust der Interferenz", "Verdopplung der Lichtfrequenz", "Symmetrische Aufteilung des Strahls", "Maximale Intensität in beiden Armen"], correct: 2, explanation: "Ein halbdurchlässiger Strahlteiler erzeugt zwei gleich starke Teilstrahlen." },
  ],
  flashcards: [
    { id: "0t65xhl", front: "Laufwegdifferenz Michelson", back: "Δs = 2(s1 − s2). Verdoppelt sich durch Hin- und Rückweg." },
    { id: "0jt97tr", front: "Intensität Michelson", back: "I = ½ I_e (1 + cosΔφ). Maxima bei Δφ = 2πm, Minima bei (2m+1)π." },
    { id: "05oow75", front: "Spiegelverschiebung", back: "Verschiebung um λ/2 erzeugt einen vollständigen Wechsel zwischen Maximum und Minimum." },
    { id: "0emr0qi", front: "Strahlteiler", back: "R = T = 0.5 erzeugt zwei gleich starke Teilstrahlen. Wichtig für symmetrische Interferenz." },
    { id: "08p6ots", front: "Anwendung Michelson", back: "Präzise Längenmessung, Spektralanalyse, Brechungsindexbestimmung." },
    { id: "12oea3d", front: "Kohärenzanforderung", back: "Interferenz nur sichtbar, wenn Δs kleiner als die Kohärenzlänge der Quelle ist." },
  ],
} satisfies Thema;
