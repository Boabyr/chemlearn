export const topic = {
  id: "02-lambert-beer",
  title: "Lambert-Beer-Gesetz",
  subtitle: "Quantitative Absorptionsspektrometrie & Kalibrierung",
  icon: "📐",
  estimatedMinutes: 75,
  theory: `
## Das Lambert-Beer-Gesetz

Das Lambert-Beer-Gesetz ist das Fundament der quantitativen Absorptionsspektrometrie.

**Mathematische Form:**
A = ε · c · d

| Symbol | Größe | Einheit |
|---|---|---|
| A | Absorption (Extinktion) | dimensionslos |
| ε | molarer Extinktionskoeffizient | L·mol⁻¹·cm⁻¹ |
| c | Konzentration | mol/L |
| d | Schichtdicke (Küvettenlänge) | cm |

## Transmission und Absorption

**Transmission T:**
T = I / I₀  (Bereich: 0–1 bzw. 0–100%)

**Absorption A:**
A = -log(T) = -log(I/I₀) = log(I₀/I)

Zusammenhang:
A = ε · c · d = -log(T)

**Wichtig:** Bei A = 1 werden 90% des Lichts absorbiert (T = 0.1 = 10%)!

## Voraussetzungen für Gültigkeit

Das Lambert-Beer-Gesetz gilt exakt nur unter folgenden Bedingungen:
- **Monochromatisches Licht** (eine Wellenlänge)
- **Verdünnte Lösungen** (< 0.01 M) – bei höheren Konzentrationen: Abweichungen
- **Keine Lichtstreuung** in der Probe
- **Keine photochemischen Reaktionen** während der Messung

## Abweichungen vom Lambert-Beer-Gesetz

**Reale Abweichungen (chemische Ursachen):**
- Assoziation oder Dissoziation des Analyten
- Reaktion des Analyten mit dem Lösungsmittel
- Temperaturabhängigkeit von ε

**Instrumentelle Abweichungen:**
- Nicht-monochromatisches Licht (Bandbreite > 0)
- Streulicht (Stray light) im Monochromator

## Kalibrierung

**Kalibriergerade:** A = ε · d · c = m · c + b

- Mehrere Standards bekannter Konzentration messen
- A gegen c auftragen → Gerade durch Ursprung
- Unbekannte Probe: A messen → c aus Kalibrierung ablesen

**Sensitivität:** Steigung der Kalibriergerade = ε · d

**Linearitätsbereich:** Typisch A = 0.1–1.5 (optimal: A ≈ 0.4)

## Messung der optimalen Wellenlänge

λmax: Wellenlänge der maximalen Absorption
- Hier ist ε am größten → maximale Sensitivität
- Hier ist die Kalibriergerade am steilsten
- Kleine Abweichungen in λ haben geringsten Effekt auf A (flaches Maximum)
`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "lambert-beer",
      name: "Lambert-Beer-Gesetz",
      equation: "A = ε · c · d",
      variables: [
        { id: "A", label: "Absorption", symbol: "A", unit: "—", description: "Extinktion (dimensionslos)" },
        { id: "eps", label: "Extinktionskoeffizient", symbol: "ε", unit: "L·mol⁻¹·cm⁻¹", description: "Molarer Extinktionskoeffizient" },
        { id: "c", label: "Konzentration", symbol: "c", unit: "mol/L", description: "Molarität der Lösung" },
        { id: "d", label: "Schichtdicke", symbol: "d", unit: "cm", description: "Küvettenlänge" },
      ],
      solve: (inputs: Record<string, any>) => {
        const sf = inputs.solveFor
        if (sf === 'A') return { A: inputs.eps * inputs.c * inputs.d }
        if (sf === 'c') return { c: inputs.A / (inputs.eps * inputs.d) }
        if (sf === 'd') return { d: inputs.A / (inputs.eps * inputs.c) }
        if (sf === 'eps') return { eps: inputs.A / (inputs.c * inputs.d) }
        return {}
      },
      hints: [
        "A = ε × c × d. Alle drei Faktoren multiplizieren. Typische Werte: ε = 1000–100000 L/(mol·cm), d = 1 cm, c = 10⁻⁵–10⁻³ mol/L.",
        "Umformungen: c = A/(ε·d), d = A/(ε·c), ε = A/(c·d). Denke an die Einheiten: [A] ist dimensionslos, [ε·c·d] = (L/mol/cm)·(mol/L)·cm = 1 ✓"
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Eine Lösung hat A = 0.5 bei ε = 5000 L·mol⁻¹·cm⁻¹ und d = 1 cm. Wie groß ist die Konzentration?", options: ["1×10⁻⁴ mol/L", "2.5×10⁻⁴ mol/L", "1×10⁻³ mol/L", "5×10⁻³ mol/L"], correct: 0, explanation: "c = A/(ε·d) = 0.5/(5000·1) = 1×10⁻⁴ mol/L. Die Formel umstellen: A = ε·c·d → c = A/(ε·d)." },
    { id: "q2", question: "Was bedeutet eine Transmission von T = 0.1 (10%)?", options: ["10% des Lichts wird absorbiert", "90% des Lichts wird absorbiert (A = 1)", "A = 0.1", "Die Küvette ist zu lang"], correct: 1, explanation: "T = 0.1 → A = -log(0.1) = 1. 90% des Lichts wird absorbiert, nur 10% transmittiert. Bei T = 1 (100%) wird nichts absorbiert (A = 0)." },
    { id: "q3", question: "Warum misst man bei der Wellenlänge maximaler Absorption (λmax)?", options: ["Weil das Licht dort am intensivsten ist", "Weil ε dort am größten ist → maximale Sensitivität und Linearität", "Weil andere Wellenlängen gefährlich sind", "Weil der Detektor dort am empfindlichsten ist"], correct: 1, explanation: "Bei λmax ist ε maximal → steilste Kalibriergerade → beste Sensitivität. Außerdem ist das Maximum flach → kleine Wellenlängenabweichungen haben kaum Einfluss auf A." },
    { id: "q4", question: "Bei welchem Absorptionswert ist die Kalibriergerade typischerweise am linearsten?", options: ["A = 0.001–0.01", "A = 0.1–1.5 (optimal ~0.4)", "A = 2–3", "A > 3"], correct: 1, explanation: "Linearer Bereich: A = 0.1–1.5, optimal etwa A = 0.4. Bei sehr kleinen A: schlechte Messgenauigkeit. Bei A > 1.5: Abweichungen vom Lambert-Beer-Gesetz, Streulicht-Effekte." },
    { id: "q5", question: "Was ist eine häufige Ursache für Abweichungen vom Lambert-Beer-Gesetz?", options: ["Zu kurze Messzeit", "Zu hohe Konzentration (>0.01 M) und nicht-monochromatisches Licht", "Zu kleiner Extinktionskoeffizient", "Falsche Küvettenform"], correct: 1, explanation: "Abweichungen entstehen durch: hohe Konzentration (Wechselwirkungen zwischen Molekülen), nicht-monochromatisches Licht (Bandbreite), Streulicht im Monochromator, chemische Gleichgewichte des Analyten." },
    { id: "q6", question: "Wie lautet die Beziehung zwischen Absorption A und Transmission T?", options: ["A = T", "A = 1 - T", "A = -log(T)", "A = log(T)"], correct: 2, explanation: "A = -log(T) = -log(I/I₀) = log(I₀/I). Bei T = 1 (100% Transmission): A = 0. Bei T = 0.01 (1%): A = 2." },
  ],
  flashcards: [
    { front: "Lambert-Beer-Gesetz", back: "A = ε · c · d. A = Absorption, ε = mol. Extinktionskoeffizient [L/(mol·cm)], c = Konzentration [mol/L], d = Schichtdicke [cm]. Gilt für verdünnte Lösungen mit monochromatischem Licht." },
    { front: "Transmission T und Absorption A", back: "T = I/I₀ (Bereich 0–1). A = -log(T) = log(I₀/I). T = 10% → A = 1 (90% absorbiert). T = 1% → A = 2. T = 50% → A = 0.301." },
    { front: "Voraussetzungen Lambert-Beer", back: "1. Monochromatisches Licht. 2. Verdünnte Lösung (<0.01 M). 3. Keine Lichtstreuung. 4. Keine photochemischen Reaktionen. Abweichungen: hohe c, Bandbreite, Streulicht, Assoziation/Dissoziation." },
    { front: "Warum λmax für Messungen?", back: "Bei λmax: ε maximal → steilste Kalibriergerade → beste Sensitivität. Flaches Maximum → geringe Wellenlängenfehler haben kleinen Einfluss auf A. Optimaler Linearitätsbereich: A = 0.1–1.5." },
    { front: "Kalibriergerade", back: "A = ε · d · c → lineare Funktion von c (Steigung = ε·d). Mehrere Standards → A gegen c → Gerade. Unbekannte Probe: A messen → c ablesen. Nur im linearen Bereich gültig!" },
    { front: "Molarer Extinktionskoeffizient ε", back: "Charakteristisch für jeden Stoff bei bestimmter Wellenlänge. Einheit: L·mol⁻¹·cm⁻¹. Kleine ε (<100): wenig absorbierend. Große ε (>100.000): starke Absorber (z.B. Farbstoffe). Temperaturabhängig!" },
  ],
};
