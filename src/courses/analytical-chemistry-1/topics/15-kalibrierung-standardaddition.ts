export const topic = {
  id: "15-kalibrierung-standardaddition",
  title: "Kalibrierung & Standardaddition",
  subtitle: "Kalibriergerade, Standardaddition, interne Standards, Definitionen",
  icon: "📏",
  estimatedMinutes: 60,
  theory: `
## Grundbegriffe (prüfungsrelevant!)

**Kalibrierung/Kalibration:**
Feststellung des Zusammenhangs zwischen Messgröße (Signal) und Konzentration des Analyten mittels Standards bekannter Konzentration.

**Eichung:** Amtliche Kalibrierung (gesetzlich geregelt), z.B. Waagen, Messgeräte.

**Kalibriergerade:** y = m·c + b
y = Messsignal, m = Steigung, b = Achsenabschnitt

## Methoden der Kalibrierung

### 1. Externe Kalibrierung
Standardlösungen bekannter Konzentration → Messsignal → Gerade → Unbekannte Probe einlesen.

**Voraussetzung:** Matrix der Standards ≈ Matrix der Probe (Matrixeffekte!)

### 2. Standardaddition
**Einsatz:** Wenn Probenmatrix das Signal beeinflusst (Matrixeffekte)!

**Prinzip:**
- Signal der Probe: y₀
- Signal nach Zugabe bekannter Menge Standard c_S: y₁
- Konzentration: c_x = c_S · y₀/(y₁ - y₀)

**Fluoreszenz-Beispiel (Quinin in Tonic Water):**
25ml Probe auf 100ml → Signal 553mV
+ 10ml Standard (35 ppm) → Signal 661mV

c_x = c_s · V_s/V_total · y₀/(y₁-y₀)

### 3. Interner Standard
Bekannte Menge einer Referenzsubstanz wird zur Probe zugegeben.
Verhältnis Analyt/Standard kompensiert Probenvorbereitung und Injektionsvolumen-Schwankungen.
→ Wichtig in GC und HPLC bei variablen Injektionsmengen.

## Verdünnungsreihe

Ausgehend von Stammstandard c₀ → Verdünnungsreihe:
c₁ · V₁ = c₂ · V₂

**Beispiel:** 1000 mg/L Blei-Stock auf 2-10 ppb für Kalibrierung:
Stufe 1: 1000 mg/L → 10 mg/L (Faktor 100): 0,1ml auf 10ml
Stufe 2: 10 mg/L → 0,1 mg/L = 100ppb (Faktor 100): 0,1ml auf 10ml
Stufe 3: 100ppb → 10ppb: 1ml auf 10ml

## Nachweisgrenze aus Kalibrierung

LOD = 3·s_y0 / m  (s_y0 = Standardabweichung des Signals bei c=0, m = Steigung)
LOQ = 10·s_y0 / m

## Additionsstandard – Berechnung

c_x / (c_x + c_S·V_S/V_total) = y₀/y₁

c_x = (c_S · V_S · y₀) / (V_total · (y₁ - y₀))
`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "standardaddition",
      name: "Standardaddition (einfach)",
      equation: "cx = cS · y0 / (y1 - y0)",
      variables: [
        { id: "cx", label: "Konzentration Probe", symbol: "cx", unit: "ppb", description: "Gesuchte Konzentration" },
        { id: "cS", label: "Zugabe-Konzentration", symbol: "cS", unit: "ppb", description: "Konzentration des zugefügten Standards" },
        { id: "y0", label: "Signal ohne Standard", symbol: "y0", unit: "mV", description: "Messsignal der Originalprobe" },
        { id: "y1", label: "Signal mit Standard", symbol: "y1", unit: "mV", description: "Messsignal nach Standardzugabe" },
      ],
      solve: (inputs: Record<string, any>) => {
        const sf = inputs.solveFor as string;
        if (sf === "cx") return { cx: inputs.cS * inputs.y0 / (inputs.y1 - inputs.y0) };
        if (sf === "cS") return { cS: inputs.cx * (inputs.y1 - inputs.y0) / inputs.y0 };
        return {};
      },
      hints: [
        "Standardaddition: cx = cS · y0/(y1-y0). Voraussetzung: lineares Signal. Matrixeffekte werden kompensiert!",
        "Achtung Volumenverhältnisse: Wenn Standardvolumen VS zu Probenvolumen VP zugefügt: cx = cS·VS/(VP+VS) · y0/(y1-y0)."
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Was ist der Unterschied zwischen Kalibrierung und Eichung?", options: ["Beide bedeuten dasselbe", "Kalibrierung = allgemeiner Begriff (Zusammenhang Signal-Konzentration); Eichung = amtliche/gesetzliche Kalibrierung", "Eichung ist genauer als Kalibrierung", "Kalibrierung gilt nur für Spektroskopie"], correct: 1, explanation: "Kalibrierung (Kalibration): Feststellung des Zusammenhangs Messsignal-Konzentration, allgemeiner Begriff. Eichung: gesetzlich vorgeschriebene Kalibrierung, z.B. für Handelsmessgeräte (Waagen, Füllmengen). Beide führen zum gleichen mathematischen Ergebnis." },
    { id: "q2", question: "Wann verwendet man Standardaddition statt externer Kalibrierung?", options: ["Immer, da genauer", "Wenn die Probenmatrix das Signal beeinflusst (Matrixeffekte) – Standards und Probe haben unterschiedliche Matrix", "Nur bei sehr niedrigen Konzentrationen", "Nur in der Atomspektrometrie"], correct: 1, explanation: "Standardaddition kompensiert Matrixeffekte: Signal wird durch Begleitstoffe in der Probe beeinflusst (z.B. Untergrundabsorption, Ionisierungsunterdrückung in ICP-MS). Standard wird direkt in die Probe zugegeben → gleiche Matrix für Signal und Standard." },
    { id: "q3", question: "Signal der Probe: 553mV. Nach Zugabe von 35ppm Standard: 661mV. Verhältnis cS/cProbe beträgt (vereinfacht)?", options: ["553/661", "35·553/(661-553)", "553/(661-553)", "661/553-1"], correct: 2, explanation: "cx = cS · y0/(y1-y0) = cS · 553/(661-553) = cS · 553/108 = cS · 5,12. Also: wenn cS dem effektiven Beitrag entspricht, gilt cx ≈ cS · 5,12. Exakte Berechnung braucht Volumenverhältnisse." },
    { id: "q4", question: "Wie stellt man 10 ppb aus einer 1000 ppm Stammlösung her (2 Schritte)?", options: ["Direkte Verdünnung 1:100000", "Schritt 1: 1000ppm → 100ppb (Faktor 1:10000); Schritt 2: 100ppb → 10ppb (Faktor 1:10)", "Schritt 1: 1:100 → 10ppm; Schritt 2: 1:1000 → 10ppb", "Zwei Schritte je 1:316 (√100000)"], correct: 2, explanation: "1000 ppm = 1000 mg/L. Schritt 1: 0,01ml auf 1000ml → 1:100000 direkt, oder: 1ml auf 100ml → 10ppm; dann 1ml auf 1000ml → 10ppb. Wichtig: intermediäre Verdünnung vermeidet zu kleine Volumina!" },
    { id: "q5", question: "Was kompensiert ein interner Standard?", options: ["Matrixeffekte in der Probe", "Schwankungen in Injektionsvolumen und Probenvorbereitung durch konstantes Verhältnis Analyt/Standard", "Temperatureffekte", "Kalibrierungsfehler"], correct: 1, explanation: "Interner Standard: bekannte Menge einer Referenzsubstanz (ähnlich dem Analyten aber unterschiedliche tR) wird zur Probe zugegeben. Verhältnis Analyt/IS-Signal wird ausgewertet → kompensiert Injektionsschwankungen, Verluste bei Probenvorbereitung. Standard in GC und HPLC." },
  ],
  flashcards: [
    { front: "Kalibrierung vs. Eichung", back: "Kalibrierung: allgemeiner Begriff, Zusammenhang Signal-Konzentration. Eichung: amtliche/gesetzliche Kalibrierung (Handelsmessgeräte). Beide mathematisch gleich: y = m·c + b." },
    { front: "Standardaddition", back: "cx = cS · y0/(y1-y0). Kompensiert Matrixeffekte! Anwendung: wenn Probenmatrix das Signal beeinflusst. Standard wird direkt in Probe zugegeben. Voraussetzung: lineares Signal." },
    { front: "Interner Standard", back: "Bekannte Menge Referenzsubstanz zur Probe zugeben. Verhältnis Analyt/IS kompensiert: Injektionsschwankungen, Verdampfungsverluste, Probenaufbereitungsverluste. Häufig in GC, HPLC, ICP-MS." },
    { front: "Verdünnungsreihe", back: "c1·V1 = c2·V2. Schrittweise Verdünnung aus Stammstandard. Nie zu kleine Volumina (Pipettierfehler). Konzentration der Kalibrierlösungen: LOQ bis obere Linearitätsgrenze, Probenkonzentration muss im Bereich liegen." },
  ],
};
