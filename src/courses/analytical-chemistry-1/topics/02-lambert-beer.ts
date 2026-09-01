import type { Thema } from '../../../content/schema'

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

{{abbildung:kalibriergerade}}

**Sensitivität:** Steigung der Kalibriergerade = ε · d

**Linearitätsbereich:** Typisch A = 0.1–1.5 (optimal: A ≈ 0.4)

## Messung der optimalen Wellenlänge

λmax: Wellenlänge der maximalen Absorption
- Hier ist ε am größten → maximale Sensitivität
- Hier ist die Kalibriergerade am steilsten
- Kleine Abweichungen in λ haben geringsten Effekt auf A (flaches Maximum)

## Was tun, wenn A außerhalb des Bereichs liegt

**A über 1,5:** Es kommt zu wenig Licht am Detektor an, das Verhältnis I/I₀ wird aus zwei
kleinen Zahlen gebildet und der relative Fehler explodiert. Abhilfe in dieser Reihenfolge:
Probe verdünnen, kürzere Küvette wählen (10 mm auf 1 mm senkt A um den Faktor zehn), oder
auf eine Nebenbande mit kleinerem ε ausweichen.

**A unter 0,1:** Der Unterschied zum Blindwert verschwindet im Rauschen. Abhilfe:
aufkonzentrieren, längere Küvette, oder ein empfindlicheres Verfahren wählen.

## Warum Streulicht die Kurve abknicken lässt

Streulicht ist Licht, das den Detektor erreicht, ohne die Probe passiert zu haben — an
Optikflächen gestreut oder am Monochromator vorbeigelaufen. Es addiert sich zu I und kann
nie kleiner werden, egal wie stark die Probe absorbiert. Damit läuft die gemessene
Absorption gegen einen oberen Grenzwert: die Kalibriergerade biegt bei hohen
Konzentrationen zur Konzentrationsachse hin ab.

Das ist der häufigste Grund für scheinbare Abweichungen vom Lambert-Beer-Gesetz und
zugleich der Grund, warum die obere Linearitätsgrenze ein Gerätemerkmal ist und keine
Eigenschaft des Analyten.

## Additivität der Absorptionen

Absorbieren mehrere Stoffe bei derselben Wellenlänge, addieren sich ihre Beiträge:

A(gesamt) = ε₁·c₁·d + ε₂·c₂·d + …

Daraus folgt zweierlei. Erstens stört jede mitabsorbierende Begleitsubstanz die
Bestimmung. Zweitens lässt sich ein Gemisch aus n Komponenten auswerten, wenn man bei n
Wellenlängen misst und die ε-Werte aller Komponenten bei allen Wellenlängen kennt — ein
lineares Gleichungssystem, das die Mehrkomponentenanalyse trägt.
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
      umstellungen: [
        { solveFor: "A", expr: "eps * c * d" },
        { solveFor: "c", expr: "A / (eps * d)" },
        { solveFor: "d", expr: "A / (eps * c)" },
        { solveFor: "eps", expr: "A / (c * d)" },
      ],
      hints: [
        "A = ε × c × d. Alle drei Faktoren multiplizieren. Typische Werte: ε = 1000–100000 L/(mol·cm), d = 1 cm, c = 10⁻⁵–10⁻³ mol/L.",
        "Umformungen: c = A/(ε·d), d = A/(ε·c), ε = A/(c·d). Denke an die Einheiten: [A] ist dimensionslos, [ε·c·d] = (L/mol/cm)·(mol/L)·cm = 1 ✓"
      ],
    },
  },
  abbildungen: [
    {
      "art": "diagramm",
      "id": "kalibriergerade",
      "titel": "Kalibriergerade und ihre Grenze",
      "beschreibung": "Im linearen Bereich fallen Messung und Gerade zusammen. Bei hoher Konzentration biegt die reale Kurve zur Konzentrationsachse ab — Streulicht setzt der Absorption eine Obergrenze.",
      "xAchse": {
        "titel": "Konzentration c (mmol/L)",
        "min": 0,
        "max": 3
      },
      "yAchse": {
        "titel": "Absorption A",
        "min": 0,
        "max": 3
      },
      "kurven": [
        {
          "beschriftung": "ideal: A = ε·c·d",
          "punkte": [
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 1.0,
              "y": 1.0
            },
            {
              "x": 2.0,
              "y": 2.0
            },
            {
              "x": 3.0,
              "y": 3.0
            }
          ],
          "stil": "gestrichelt",
          "farbe": "subtle"
        },
        {
          "beschriftung": "real gemessen",
          "punkte": [
            {
              "x": 0,
              "y": 0.0
            },
            {
              "x": 0.25,
              "y": 0.236
            },
            {
              "x": 0.5,
              "y": 0.445
            },
            {
              "x": 0.75,
              "y": 0.631
            },
            {
              "x": 1.0,
              "y": 0.796
            },
            {
              "x": 1.5,
              "y": 1.072
            },
            {
              "x": 2.0,
              "y": 1.29
            },
            {
              "x": 2.5,
              "y": 1.461
            },
            {
              "x": 3.0,
              "y": 1.597
            }
          ],
          "farbe": "accent"
        }
      ],
      "marker": [
        {
          "x": 0.5,
          "y": 0.445,
          "beschriftung": "unbekannte Probe",
          "hilfslinien": true
        }
      ]
    }
  ],
  quiz: [
    { id: "q1", question: "Eine Lösung hat A = 0.5 bei ε = 5000 L·mol⁻¹·cm⁻¹ und d = 1 cm. Wie groß ist die Konzentration?", options: ["1×10⁻⁴ mol/L", "2.5×10⁻⁴ mol/L", "1×10⁻³ mol/L", "5×10⁻³ mol/L"], correct: 0, explanation: "c = A/(ε·d) = 0.5/(5000·1) = 1×10⁻⁴ mol/L. Die Formel umstellen: A = ε·c·d → c = A/(ε·d)." },
    { id: "q2", question: "Was bedeutet eine Transmission von T = 0.1 (10%)?", options: ["10 % werden absorbiert, A = 0,1", "90 % werden absorbiert, A = 1", "50 % werden absorbiert, A = 0,3", "Die Küvette ist zu lang gewählt"], correct: 1, explanation: "T = I/I₀ = 0,1 heißt: ein Zehntel des Lichts kommt durch, neun Zehntel werden absorbiert. A = −log(0,1) = 1. Der häufigste Fehler ist, die Transmission direkt als Absorptionsanteil zu lesen. Zur Orientierung: T = 0,5 gibt A = 0,30, T = 0,01 gibt A = 2." },
    { id: "q3", question: "Warum misst man bei der Wellenlänge maximaler Absorption (λmax)?", options: ["Weil die Lampe dort die höchste Strahlungsleistung liefert", "Weil ε dort am größten ist → maximale Sensitivität", "Weil andere Wellenlängen gefährlich sind", "Weil der Detektor dort am empfindlichsten ist"], correct: 1, explanation: "Bei λmax ist ε maximal → steilste Kalibriergerade → beste Sensitivität. Außerdem ist das Maximum flach → kleine Wellenlängenabweichungen haben kaum Einfluss auf A." },
    { id: "q4", question: "Bei welchem Absorptionswert ist die Kalibriergerade typischerweise am linearsten?", options: ["A = 0,001–0,01 (Spurenbereich)", "A = 0,1–1,5 (optimal etwa 0,4)", "A = 2–3 (starke Absorption)", "A > 3 (maximale Empfindlichkeit)"], correct: 1, explanation: "Unterhalb von A ≈ 0,1 verschwindet der Unterschied zum Blindwert im Rauschen. Oberhalb von etwa 1,5 kommt so wenig Licht am Detektor an, dass der relative Fehler stark wächst und Streulicht die Gerade abknicken lässt. Das Optimum liegt bei A ≈ 0,4." },
    { id: "q5", question: "Was ist eine häufige Ursache für Abweichungen vom Lambert-Beer-Gesetz?", options: ["Eine zu kurz gewählte Messzeit", "Hohe Konzentration und Streulicht", "Ein zu kleiner Extinktionskoeffizient", "Eine unpassende Küvettenform"], correct: 1, explanation: "Chemische Ursachen: bei hoher Konzentration treten Wechselwirkungen zwischen den Molekülen auf, dazu kommen Assoziation und Dissoziation des Analyten. Instrumentelle Ursachen: nicht-monochromatisches Licht wegen endlicher Bandbreite und Streulicht im Monochromator. Ein kleiner Extinktionskoeffizient macht die Messung unempfindlich, aber nicht nichtlinear." },
    { id: "q6", question: "Wie lautet die Beziehung zwischen Absorption A und Transmission T?", options: ["A = T", "A = 1 - T", "A = -log(T)", "A = log(T)"], correct: 2, explanation: "A = -log(T) = -log(I/I₀) = log(I₀/I). Bei T = 1 (100% Transmission): A = 0. Bei T = 0.01 (1%): A = 2." },
  ],
  flashcards: [
    { id: "1nos00w", front: "Lambert-Beer-Gesetz", back: "A = ε · c · d. A = Absorption, ε = mol. Extinktionskoeffizient [L/(mol·cm)], c = Konzentration [mol/L], d = Schichtdicke [cm]. Gilt für verdünnte Lösungen mit monochromatischem Licht." },
    { id: "10hw68u", front: "Transmission T und Absorption A", back: "T = I/I₀ (Bereich 0–1). A = -log(T) = log(I₀/I). T = 10% → A = 1 (90% absorbiert). T = 1% → A = 2. T = 50% → A = 0.301." },
    { id: "04dacye", front: "Voraussetzungen Lambert-Beer", back: "1. Monochromatisches Licht. 2. Verdünnte Lösung (<0.01 M). 3. Keine Lichtstreuung. 4. Keine photochemischen Reaktionen. Abweichungen: hohe c, Bandbreite, Streulicht, Assoziation/Dissoziation." },
    { id: "0vxol5c", front: "Warum λmax für Messungen?", back: "Bei λmax: ε maximal → steilste Kalibriergerade → beste Sensitivität. Flaches Maximum → geringe Wellenlängenfehler haben kleinen Einfluss auf A. Optimaler Linearitätsbereich: A = 0.1–1.5." },
    { id: "0at6mqo", front: "Kalibriergerade", back: "A = ε · d · c → lineare Funktion von c (Steigung = ε·d). Mehrere Standards → A gegen c → Gerade. Unbekannte Probe: A messen → c ablesen. Nur im linearen Bereich gültig!" },
    { id: "0hlta5g", front: "Molarer Extinktionskoeffizient ε", back: "Charakteristisch für jeden Stoff bei bestimmter Wellenlänge. Einheit: L·mol⁻¹·cm⁻¹. Kleine ε (<100): wenig absorbierend. Große ε (>100.000): starke Absorber (z.B. Farbstoffe). Temperaturabhängig!" },
  ],
} satisfies Thema;
