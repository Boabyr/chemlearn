import type { Thema } from '../../../content/schema'

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

## Die Glaselektrode

Die pH-Glaselektrode ist die verbreitetste ionenselektive Elektrode überhaupt. Gemessen
wird nicht an einem Draht, sondern an einer dünnen Glasmembran: An beiden Oberflächen
bildet sich eine Quellschicht, in der H⁺ gegen Na⁺ des Glases ausgetauscht wird. Innen
liegt eine Pufferlösung mit konstantem pH, außen die Probe — die Potentialdifferenz über
die Membran folgt der Nernst-Gleichung mit z = 1.

**Was daraus folgt:**
- **Steilheit 59,16 mV je pH-Einheit** bei 25 °C. Reale Elektroden erreichen 95 bis 100 %
  davon; sinkt die Steilheit darunter, ist die Elektrode alt.
- **Zwei-Punkt-Kalibrierung** mit Puffern, die den Messbereich einschließen (pH 4 und 7,
  oder 7 und 10). Die Kalibrierung liefert Nullpunkt *und* Steilheit — ein Punkt genügt
  nicht.
- **Hochohmig:** Der Membranwiderstand liegt bei 10⁸ Ω, das Messgerät braucht mindestens
  10¹² Ω Eingangswiderstand.
- **Alkalifehler:** Bei pH über 12 und hoher Na⁺-Konzentration spricht die Membran auch
  auf Na⁺ an, der angezeigte pH liegt zu niedrig.
- **Die Elektrode darf nicht austrocknen**, sonst verschwindet die Quellschicht.

## Selektivität in Zahlen

Der Selektivitätskoeffizient K_ij sagt, wie stark ein Störion im Vergleich zum Zielion
wirkt. K_ij = 10⁻³ heißt: das Störion muss tausendfach konzentrierter vorliegen, um
denselben Beitrag zu leisten. Bei einer Natrium-Elektrode mit K(Na,K) = 10⁻² und
hundertfachem Kaliumüberschuss ist der Messwert bereits um die Hälfte verfälscht — der
Grund, warum zu jeder ISE die Matrix mit angegeben werden muss.
`,
  interactives: [
    {
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
        umstellungen: [
          { solveFor: "E", expr: "const + (0.05916 / z) * logA" },
          { solveFor: "logA", expr: "(E - const) * z / 0.05916" },
          { solveFor: "const", expr: "E - (0.05916 / z) * logA" },
        ],
        hints: [
          "Für Kationen (z > 0): E steigt mit steigender Konzentration. Für Anionen (z < 0): E sinkt mit steigender Konzentration. Steigung bei 25°C: 59.16/z mV pro Dekade.",
          "pH-Elektrode: z = +1 (H⁺). E = const − 0.05916·pH. Pro pH-Einheit: 59.16 mV Änderung. Kalibrierung mit Puffern pH 4 und 7 (oder 7 und 10)."
        ],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum wird bei der Potentiometrie kein Strom durch die Zelle geleitet?", options: ["Weil durch die Zelle kein Strom fließen kann", "Damit das Gleichgewicht an der Elektrode bleibt", "Um den Innenwiderstand der Lösung zu messen", "Aus Gründen des Arbeitsschutzes"], correct: 1, explanation: "Gemessen wird das Gleichgewichtspotential. Sobald nennenswert Strom fließt, läuft Elektrolyse ab, die Konzentrationen an der Phasengrenze verschieben sich und das Potential wandert. Deshalb ein Voltmeter mit über 10¹² Ω Eingangswiderstand — besonders bei der hochohmigen Glaselektrode." },
    { id: "q2", question: "Was versteht man unter dem Alkalifehler der Glaselektrode?", options: ["Die Glasmembran löst sich in Laugen auf", "Über pH 12 stört Na⁺, der Messwert ist zu niedrig", "Die Kalibrierung verliert schneller ihre Gültigkeit", "Die Glasmembran wird für Ionen undurchlässig"], correct: 1, explanation: "Die Quellschicht tauscht H⁺ gegen Na⁺ aus dem Glas. Bei sehr kleiner H⁺-Konzentration und hohem Natriumangebot spricht die Membran auch auf Na⁺ an und meldet mehr Protonen, als da sind — der angezeigte pH liegt zu niedrig. Abhilfe: Spezialgläser mit Lithium statt Natrium." },
    { id: "q3", question: "Welche Steigung hat die Kalibriergerade einer monovalenten ISE (z=1) bei 25°C?", options: ["29.58 mV/Dekade", "59.16 mV/Dekade", "96485 mV/Dekade", "0.05916 mV/Dekade"], correct: 1, explanation: "Nernst'sche Steigung: 0.05916/z V = 59.16/z mV pro Dekade. Bei z=1: 59.16 mV/Dekade. Bei z=2 (Ca²⁺): 29.58 mV/Dekade. Bei z=-1 (F⁻): −59.16 mV/Dekade (E sinkt bei steigender [F⁻])." },
    { id: "q4", question: "Welche Membran wird in der Fluorid-ISE verwendet?", options: ["Glasmembran", "Lanthanfluorid (LaF₃)-Einkristall", "Flüssigmembran mit Ionophor", "Polymermembran mit Silber"], correct: 1, explanation: "F⁻-ISE: LaF₃-Einkristallmembran. LaF₃ leitet F⁻-Ionen selektiv. Sehr selektiv für F⁻. Störungen hauptsächlich durch OH⁻ bei hohem pH. Wichtige Anwendung: F⁻ in Trinkwasser (Zahngesundheit)." },
    { id: "q5", question: "Wie findet man den Äquivalenzpunkt bei der potentiometrischen Titration?", options: ["Am Maximum der E-V-Kurve selbst", "Am Maximum der ersten Ableitung dE/dV", "Am Minimum der E-V-Kurve selbst", "Am Nulldurchgang der Spannung"], correct: 1, explanation: "Die E-V-Kurve hat am Äquivalenzpunkt keinen Extremwert, sondern einen Wendepunkt — dort ist sie am steilsten. Der Wendepunkt wird zum Maximum, sobald man ableitet. Noch schärfer wird er in der zweiten Ableitung, die dort durch null geht." },
    { id: "q6", question: "Was beschreibt der Selektivitätskoeffizient K_ij einer ISE?", options: ["Die Empfindlichkeit der Elektrode für das Primärion", "Wie stark ein Störion gegenüber dem Zielion wirkt", "Die Temperaturabhängigkeit der Elektrode", "Den linearen Messbereich der Elektrode"], correct: 1, explanation: "K_ij = 10⁻³ heißt: Das Störion muss tausendfach konzentrierter vorliegen, um denselben Signalbeitrag zu leisten wie das Zielion. Bei K = 10⁻² und hundertfachem Überschuss des Störions ist der Messwert bereits um die Hälfte verfälscht — deshalb gehört zu jeder ISE die Angabe der Matrix." },
  ],
  flashcards: [
    { id: "1adsfli", front: "Potentiometrie – Prinzip", back: "Messung der EMK zwischen Mess- und Referenzelektrode bei I=0 (kein Strom!). E_Zelle = E_Mess − E_Ref + E_D. Nernst-Gleichung verknüpft E mit Konzentration." },
    { id: "085mres", front: "Glaselektrode – Aufbau", back: "Dünne Glasmembran (Li₂O·BaO·SiO₂). Innenpuffer pH 7 + Ag/AgCl intern. Externe Ag/AgCl-Referenz. E_Glas = const − 59.16·pH (mV, 25°C). Kalibrierung mit pH-Puffern." },
    { id: "0aqggm7", front: "ISE Nernst-Steigung", back: "S = 0.05916/z V = 59.16/z mV pro Dekade (25°C). z=+1 (Na⁺, K⁺): +59.16 mV. z=+2 (Ca²⁺): +29.58 mV. z=−1 (F⁻, Cl⁻): −59.16 mV." },
    { id: "1ujiprb", front: "Alkalifehler Glaselektrode", back: "pH > 12: Na⁺ interferiert (K_H,Na ≈ 10⁻¹¹ aber [Na⁺] >> [H⁺]). Gemessener pH zu niedrig. Säurefehler: pH < 1, gemessener pH zu hoch. Linearitätsbereich: pH 1–12." },
    { id: "0m4gkvv", front: "Potentiometrische Titration", back: "E wird während Titration gemessen. Äquivalenzpunkt = Maximum in dE/dV. Vorteile: objektiv, in trüben Lösungen, mehrere Stufen erkennbar. Beispiele: Säure-Base, Fällung, Komplexometrie, Redox." },
    { id: "0s5g3zz", front: "Selektivitätskoeffizient K_ij", back: "Maß für Störung von Ion j auf ISE für Ion i. Kleiner K_ij = bessere Selektivität. Nikolski-Gleichung: E = const + (S/z_i)·log(a_i + Σ K_ij·a_j^(zi/zj))." },
  ],
} satisfies Thema;
