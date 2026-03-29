export const topic = {
  id: "07-potentiometrie-nernst",
  title: "Potentiometrie",
  subtitle: "Ionenselektive Elektroden, pH-Messung, Nernst-Gleichung in der Analytik",
  icon: "🔌",
  estimatedMinutes: 65,
  theory: `
## Potentiometrie – Grundprinzip

Potentiometrie misst die Spannung (EMK) zwischen einer Mess- und einer Referenzelektrode im Gleichgewicht (kein Strom!).

**Messzelle:**
Referenzelektrode | Probe | Messelektrode

**Zellspannung:**
E_Zelle = E_Mess − E_Ref + E_D
(E_D = Diffusionspotential, minimiert durch Salzbrücke)

## Die Glaselektrode (pH-Messung)

**Aufbau:**
- Dünne Glasmembran (spezielle Zusammensetzung)
- Innenpuffer (pH 7) + Ag/AgCl-Referenz innen
- Externe Referenzelektrode (meist Ag/AgCl oder Kalomel)

**Membranpotential:**
E_Glas = const − 0.05916 · pH (bei 25°C)

**Praktische pH-Messung:**
E_Zelle = const − 0.05916 · pH
→ Kalibrierung mit Pufferlösungen bekannten pH nötig (pH 4, 7, 10)

**Wichtig: Alkalifehler und Säurefehler**
- Alkalifehler: pH > 12, Na⁺ interferiert → gemessener pH zu niedrig
- Säurefehler: pH < 1 → gemessener pH zu hoch

## Ionenselektive Elektroden (ISE)

**Prinzip:** Membran selektiv permeabel für ein Ion → Nernst'sches Potential

**Nernst-Gleichung für ISE:**
E = const + (0.05916/z) · log(a_Ion)
(z = Ionenladung, + für Kationen, − für Anionen)

**Wichtige ISEs:**

| Ion | Membrantyp | Beispiel |
|---|---|---|
| H⁺ | Glasmembran | pH-Elektrode |
| F⁻ | Lanthanfluorid (LaF₃) | Fluoridbestimmung |
| Ca²⁺ | Flüssigmembran | Calciumbestimmung |
| NO₃⁻ | Flüssigmembran | Nitrat in Wasser |
| NH₄⁺ | Nichtactin-Ionophor | Ammonium |

**Selektivitätskoeffizient K_ij:**
Störung durch Ion j auf Messung von Ion i:
E = const + (0.05916/z_i) · log(a_i + K_ij · a_j^(z_i/z_j))

## Potentiometrische Titration

Die Spannung wird während einer Titration gemessen.
Äquivalenzpunkt: steilster Anstieg der E-V-Kurve (= Maximum in dE/dV-Kurve).

**Vorteile vs. Indikator:**
- Objektiv (kein Farburteil)
- Auch in trüben/gefärbten Lösungen
- Mehrere Stufen erkennbar
`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "ise-nernst",
      name: "Nernst-Gleichung für ISE (25°C)",
      equation: "E = const + (0.05916/z) · log(a_Ion)",
      variables: [
        { id: "E", label: "Elektrodenpotential", symbol: "E", unit: "V", description: "Gemessene EMK" },
        { id: "z", label: "Ionenladung", symbol: "z", unit: "—", description: "Ladungszahl (z.B. 1 für Na⁺, 2 für Ca²⁺, -1 für Cl⁻)" },
        { id: "logA", label: "log(Aktivität)", symbol: "log(a)", unit: "—", description: "Dekadischer Logarithmus der Ionenaktivität" },
        { id: "const", label: "Konstante", symbol: "E_const", unit: "V", description: "Gerätekonstante (aus Kalibrierung)" },
      ],
      solve: (inputs: Record<string, any>) => {
        const sf = inputs.solveFor
        if (sf === 'E') return { E: inputs.const + (0.05916 / inputs.z) * inputs.logA }
        if (sf === 'logA') return { logA: (inputs.E - inputs.const) * inputs.z / 0.05916 }
        if (sf === 'const') return { const: inputs.E - (0.05916 / inputs.z) * inputs.logA }
        return {}
      },
      hints: [
        "Für Kationen (z > 0): E steigt mit steigender Konzentration. Für Anionen (z < 0): E sinkt mit steigender Konzentration. Steigung bei 25°C: 59.16/z mV pro Dekade.",
        "pH-Elektrode: z = +1 (H⁺). E = const − 0.05916·pH. Pro pH-Einheit: 59.16 mV Änderung. Kalibrierung mit Puffern pH 4 und 7 (oder 7 und 10)."
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Warum wird bei der Potentiometrie kein Strom durch die Zelle geleitet?", options: ["Weil kein Strom fließen kann", "Um das elektrochemische Gleichgewicht nicht zu stören und eine konzentrationsunabhängige Messung zu ermöglichen", "Um den Widerstand zu messen", "Aus Sicherheitsgründen"], correct: 1, explanation: "Potentiometrie misst das Gleichgewichtspotential. Wenn Strom fließt, verändert sich die Zusammensetzung an der Elektrode (Elektrolyse) → Konzentration ändert sich → verfälschtes Ergebnis. Daher: hochohmiger Voltmeter (>10¹² Ω)." },
    { id: "q2", question: "Was versteht man unter dem Alkalifehler der Glaselektrode?", options: ["Die Elektrode löst sich in Laugen auf", "Bei pH > 12 interferieren Na⁺-Ionen → der gemessene pH-Wert ist zu niedrig", "Die Kalibrierung muss häufiger wiederholt werden", "Die Glasmembran wird undurchlässig"], correct: 1, explanation: "Bei sehr hohem pH (>12) ist die [H⁺] sehr klein, aber [Na⁺] groß. Die Glasmembran ist auch etwas für Na⁺ sensitiv → Na⁺ 'täuscht' H⁺ vor → gemessener pH ist kleiner als echter pH (Alkalifehler)." },
    { id: "q3", question: "Welche Steigung hat die Kalibriergerade einer monovalenten ISE (z=1) bei 25°C?", options: ["29.58 mV/Dekade", "59.16 mV/Dekade", "96485 mV/Dekade", "0.05916 mV/Dekade"], correct: 1, explanation: "Nernst'sche Steigung: 0.05916/z V = 59.16/z mV pro Dekade. Bei z=1: 59.16 mV/Dekade. Bei z=2 (Ca²⁺): 29.58 mV/Dekade. Bei z=-1 (F⁻): −59.16 mV/Dekade (E sinkt bei steigender [F⁻])." },
    { id: "q4", question: "Welche Membran wird in der Fluorid-ISE verwendet?", options: ["Glasmembran", "Lanthanfluorid (LaF₃)-Einkristall", "Flüssigmembran mit Ionophor", "Polymermembran mit Silber"], correct: 1, explanation: "F⁻-ISE: LaF₃-Einkristallmembran. LaF₃ leitet F⁻-Ionen selektiv. Sehr selektiv für F⁻. Störungen hauptsächlich durch OH⁻ bei hohem pH. Wichtige Anwendung: F⁻ in Trinkwasser (Zahngesundheit)." },
    { id: "q5", question: "Wie findet man den Äquivalenzpunkt bei der potentiometrischen Titration?", options: ["Beim Maximum der E-V-Kurve", "Beim Maximum der dE/dV-Kurve (steilster Anstieg von E)", "Beim Minimum der E-V-Kurve", "Wenn E = 0 V"], correct: 1, explanation: "Am Äquivalenzpunkt: steilster Anstieg der E-V-Kurve → Maximum in der 1. Ableitung dE/dV. Die 2. Ableitung d²E/dV² wechselt das Vorzeichen (Nullstelle = genauer Äquivalenzpunkt)." },
    { id: "q6", question: "Was beschreibt der Selektivitätskoeffizient K_ij einer ISE?", options: ["Die Empfindlichkeit für das Primärion i", "Das Verhältnis der Störung durch Ion j gegenüber dem primären Ion i", "Die Temperaturabhängigkeit", "Den linearen Messbereich"], correct: 1, explanation: "K_ij = Selektivitätskoeffizient. Je kleiner K_ij, desto besser die Selektivität: K_ij = 10⁻³ bedeutet, dass Ion j 1000× schlechter detektiert wird als Ion i. In der Nernst-Gleichung: Gesamt-E hängt von a_i + K_ij · a_j^(zi/zj) ab." },
  ],
  flashcards: [
    { front: "Potentiometrie – Prinzip", back: "Messung der EMK zwischen Mess- und Referenzelektrode bei I=0 (kein Strom!). E_Zelle = E_Mess − E_Ref + E_D. Nernst-Gleichung verknüpft E mit Konzentration." },
    { front: "Glaselektrode – Aufbau", back: "Dünne Glasmembran (Li₂O·BaO·SiO₂). Innenpuffer pH 7 + Ag/AgCl intern. Externe Ag/AgCl-Referenz. E_Glas = const − 59.16·pH (mV, 25°C). Kalibrierung mit pH-Puffern." },
    { front: "ISE Nernst-Steigung", back: "S = 0.05916/z V = 59.16/z mV pro Dekade (25°C). z=+1 (Na⁺, K⁺): +59.16 mV. z=+2 (Ca²⁺): +29.58 mV. z=−1 (F⁻, Cl⁻): −59.16 mV." },
    { front: "Alkalifehler Glaselektrode", back: "pH > 12: Na⁺ interferiert (K_H,Na ≈ 10⁻¹¹ aber [Na⁺] >> [H⁺]). Gemessener pH zu niedrig. Säurefehler: pH < 1, gemessener pH zu hoch. Linearitätsbereich: pH 1–12." },
    { front: "Potentiometrische Titration", back: "E wird während Titration gemessen. Äquivalenzpunkt = Maximum in dE/dV. Vorteile: objektiv, in trüben Lösungen, mehrere Stufen erkennbar. Beispiele: Säure-Base, Fällung, Komplexometrie, Redox." },
    { front: "Selektivitätskoeffizient K_ij", back: "Maß für Störung von Ion j auf ISE für Ion i. Kleiner K_ij = bessere Selektivität. Nikolski-Gleichung: E = const + (S/z_i)·log(a_i + Σ K_ij·a_j^(zi/zj))." },
  ],
};
