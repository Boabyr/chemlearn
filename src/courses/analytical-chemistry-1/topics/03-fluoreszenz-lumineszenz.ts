export const topic = {
  id: "03-fluoreszenz-lumineszenz",
  title: "Fluoreszenz & Lumineszenz",
  subtitle: "Chemolumineszenz, Fluoreszenzspektrometrie, Biolumineszenz",
  icon: "✨",
  estimatedMinutes: 60,
  theory: `
## Lumineszenz – Überblick

**Lumineszenz** bezeichnet die Emission von Licht aus einem elektronisch angeregten Zustand, das nicht direkt durch Wärme (Temperatur) erzeugt wird.

**Arten der Lumineszenz:**
- **Photolumineszenz:** Anregung durch Lichtabsorption
  - Fluoreszenz: Emission aus Singulett-Zustand (schnell, 10⁻⁸–10⁻¹⁰ s)
  - Phosphoreszenz: Emission aus Triplett-Zustand (langsam, ms–s)
- **Chemolumineszenz:** Anregung durch chemische Reaktion
- **Biolumineszenz:** Chemolumineszenz in biologischen Systemen
- **Elektrolumineszenz:** Anregung durch elektrischen Strom

## Fluoreszenzspektrometrie

**Prinzip:**
A + hν → A* (Anregung)
A* → A + hν' (Emission, λ > λ_Anregung, Stokes-Verschiebung!)

**Jablonski-Diagramm:**
S₀ (Grundzustand) → S₁ (1. Singulett, Anregung) → Schwingungsrelaxation → Fluoreszenz
→ S₀ (oder via T₁ → Phosphoreszenz)

**Aufbau Fluoreszenzspektrometer:**
Lichtquelle → Anregungsmonochromator → Probe → Emissionsmonochromator → Detektor (90°!)

Warum 90°? → Um direkte Transmission der Anregungsstrahlung zu vermeiden!

**Vorteile der Fluoreszenz:**
- Sehr empfindlich (Nachweisgrenzen 10–1000× besser als Absorption)
- Kein Hintergrundsignal (misst bei anderen λ als Anregung)
- Selektiv (nur fluoreszierende Verbindungen)

**Nachteil:** Nur für fluoreszierende Verbindungen anwendbar

## Chemolumineszenz

**Prinzip:**
A + B → C* + D  (C* = elektronisch angeregt)
C* → C + hν

**Eigenschaften:**
- Sehr einfacher Geräteaufbau (nur Probe + Detektor, keine Lichtquelle!)
- Extrem empfindlich (kein Hintergrundrauschen)
- Zeitabhängiges Signal → Integration über Zeitraum = Messwert

**Wichtiges Beispiel – Stickstoffmonoxid-Analyse:**
NO + O₃ → NO₂* + O₂
NO₂* → NO₂ + hν

Anwendung: Messung von NO und NO₂ in der Umweltanalytik (Luft)!

**Luminol-Reaktion:**
Luminol + H₂O₂ + 2 Na⁺ + 2 OH⁻ → Dicarboxylat-Na₂ + N₂ + 2 H₂O
→ Blaues Licht (λ ≈ 425 nm)
Anwendung: H₂O₂ in Atemluft, forensische Blutspuren

## Biolumineszenz

Chemolumineszenz in biologischen Systemen:
- **Glühwürmchen:** Luciferin + O₂ + ATP → Oxyluciferin + hν (gelb-grün)
- **Bakterien:** FMNH₂ + RCHO + O₂ → FMN + RCOOH + H₂O + hν
- **Quallen:** GFP (Green Fluorescent Protein) – Biotechnologie!
`,
  interactive: {
    type: "apparatus-quiz",
    question: "Chemolumineszenz-Detektor",
    mode: "name-to-image",
    targetId: "chemoluminescence",
    explanation: "Der Chemolumineszenz-Detektor hat den einfachsten Aufbau aller Spektrometer: Da das Licht durch eine chemische Reaktion in der Probe selbst erzeugt wird, ist keine externe Lichtquelle nötig. Nur Probe (Reaktionskammer) und Detektor sind erforderlich.",
    hint1: "Chemolumineszenz erzeugt Licht durch eine chemische Reaktion (A + B → C*). Daher braucht man keine Lichtquelle von außen.",
    hint2: "Aufbau: nur Probenmischer + Detektor. Das macht die Methode so empfindlich – de facto kein Hintergrundrauschen.",
    options: [
      {
        id: "chemoluminescence",
        label: "Chemolumineszenz-Detektor",
        description: "Keine externe Lichtquelle, nur Probe und Detektor",
        svg: `<svg viewBox="0 0 300 130" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="80" y="35" width="80" height="60" rx="6" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="2"/>
          <text x="120" y="58" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe+</text>
          <text x="120" y="70" textAnchor="middle" fill="#2dd4bf" fontSize="8">Reagenz</text>
          <text x="120" y="83" textAnchor="middle" fill="#fbbf24" fontSize="7">→ hν ←</text>
          <line x1="160" y1="65" x2="200" y2="65" stroke="#fbbf24" strokeWidth="2.5"/>
          <rect x="200" y="48" width="60" height="34" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="230" y="68" textAnchor="middle" fill="#f87171" fontSize="9">Detektor</text>
          <text x="120" y="110" textAnchor="middle" fill="#64748b" fontSize="7">Keine externe Lichtquelle!</text>
        </svg>`
      },
      {
        id: "fluorescence",
        label: "Fluoreszenzspektrometer",
        description: "Mit externer Lichtquelle, Detektor im 90°-Winkel",
        svg: `<svg viewBox="0 0 300 160" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="20" y="65" width="50" height="30" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="45" y="83" textAnchor="middle" fill="#60a5fa" fontSize="8">Lichtquelle</text>
          <line x1="70" y1="80" x2="115" y2="80" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="115" y="60" width="40" height="40" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="135" y="83" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe</text>
          <line x1="135" y1="60" x2="135" y2="25" stroke="#f87171" strokeWidth="2" strokeDasharray="4,2"/>
          <rect x="105" y="5" width="60" height="20" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="135" y="17" textAnchor="middle" fill="#f87171" fontSize="7">Detektor (90°)</text>
        </svg>`
      },
      {
        id: "uv-vis",
        label: "UV/Vis-Spektrometer",
        description: "Detektor in Transmissionsrichtung",
        svg: `<svg viewBox="0 0 300 100" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="10" y="35" width="45" height="30" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="32" y="53" textAnchor="middle" fill="#60a5fa" fontSize="7">Quelle</text>
          <line x1="55" y1="50" x2="80" y2="50" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="80" y="35" width="40" height="30" rx="4" fill="#312e81" stroke="#a78bfa" strokeWidth="1.5"/>
          <text x="100" y="53" textAnchor="middle" fill="#a78bfa" fontSize="7">Mono</text>
          <line x1="120" y1="50" x2="150" y2="50" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="150" y="35" width="40" height="30" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="170" y="53" textAnchor="middle" fill="#2dd4bf" fontSize="7">Probe</text>
          <line x1="190" y1="50" x2="220" y2="50" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="220" y="35" width="60" height="30" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="250" y="53" textAnchor="middle" fill="#f87171" fontSize="8">Detektor</text>
        </svg>`
      },
      {
        id: "rfa",
        label: "Röntgenfluoreszenz (RFA)",
        description: "Röntgenröhre + Analysatorkristall + Detektor",
        svg: `<svg viewBox="0 0 300 120" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="10" y="40" width="55" height="40" rx="4" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="37" y="58" textAnchor="middle" fill="#fbbf24" fontSize="7">Röntgen-</text>
          <text x="37" y="68" textAnchor="middle" fill="#fbbf24" fontSize="7">röhre</text>
          <line x1="65" y1="60" x2="120" y2="60" stroke="#f87171" strokeWidth="2" strokeDasharray="3,2"/>
          <rect x="120" y="40" width="60" height="40" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="150" y="63" textAnchor="middle" fill="#60a5fa" fontSize="7">Probe</text>
          <line x1="180" y1="60" x2="230" y2="60" stroke="#f87171" strokeWidth="2" strokeDasharray="3,2"/>
          <rect x="230" y="40" width="60" height="40" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="260" y="58" textAnchor="middle" fill="#f87171" fontSize="7">Kristall+</text>
          <text x="260" y="68" textAnchor="middle" fill="#f87171" fontSize="7">Detektor</text>
        </svg>`
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Was ist der Unterschied zwischen Fluoreszenz und Phosphoreszenz?", options: ["Fluoreszenz ist intensiver", "Fluoreszenz: Emission aus Singulett (schnell, ~10⁻⁸s); Phosphoreszenz: aus Triplett-Zustand (langsam, ms–s)", "Phosphoreszenz benötigt UV-Licht", "Es gibt keinen Unterschied"], correct: 1, explanation: "Fluoreszenz: Anregung → Singulett S₁ → schnelle Emission (ns). Phosphoreszenz: intersystem crossing S₁ → T₁ (Triplett) → langsame Emission (ms bis s). Bei Phosphoreszenz leuchten Stoffe noch nach Abschalten der Lichtquelle." },
    { id: "q2", question: "Warum steht der Detektor beim Fluoreszenzspektrometer im 90°-Winkel zur Anregungsquelle?", options: ["Um mehr Licht zu sammeln", "Um die direkte Transmission der Anregungsstrahlung zu vermeiden und nur das emittierte Fluoreszenzlicht zu messen", "Weil 90° die stärkste Emission zeigt", "Aus konstruktiven Gründen"], correct: 1, explanation: "Bei 0° (Transmission) würde der Detektor die starke Anregungsstrahlung messen, die das schwache Fluoreszenzsignal überwältigt. Bei 90° sieht der Detektor fast nur das emittierte Licht → viel besseres Signal/Rausch-Verhältnis." },
    { id: "q3", question: "Welche Reaktion wird zur Messung von NO in der Luft mittels Chemolumineszenz verwendet?", options: ["NO + H₂O₂ → NO₂ + H₂O + hν", "NO + O₃ → NO₂* + O₂, dann NO₂* → NO₂ + hν", "NO + Luminol → NO₂ + hν", "NO + O₂ → NO₃ + hν"], correct: 1, explanation: "NO + O₃ → NO₂* + O₂ (angeregtes NO₂*). NO₂* → NO₂ + hν (Emission). Für NO₂-Messung: NO₂ wird zuerst zu NO reduziert, dann gleiche Reaktion. Wichtige Umweltanalytik-Anwendung!" },
    { id: "q4", question: "Was macht Chemolumineszenz so besonders empfindlich?", options: ["Sie verwendet sehr intensive Lichtquellen", "De facto kein Hintergrundrauschen, da keine externe Lichtquelle benötigt wird", "Die Konzentration des Analyten ist höher", "Die Reaktion ist sehr schnell"], correct: 1, explanation: "Da keine externe Lichtquelle benötigt wird (das Licht wird in der Probe selbst erzeugt), gibt es kein Hintergrundlicht und kein Streulicht. Das Rauschen ist minimal → extrem niedrige Nachweisgrenzen möglich." },
    { id: "q5", question: "Was ist die Stokes-Verschiebung?", options: ["Die Differenz zwischen Anregungs- und Emissionswellenlänge", "Die Verschiebung des Maximums bei höheren Konzentrationen", "Ein Fehler bei der Kalibrierung", "Die Rotverschiebung bei Bewegung"], correct: 0, explanation: "Stokes-Verschiebung: λ_Emission > λ_Anregung (das emittierte Licht hat niedrigere Energie/längere Wellenlänge als das absorbierte). Grund: Schwingungsrelaxation vor Emission. Wichtig: ermöglicht spektrale Trennung von Anregung und Emission." },
    { id: "q6", question: "Welche Anwendung hat die Luminol-Chemolumineszenz?", options: ["Messung von CO₂", "Nachweis von H₂O₂ in Atemluft und forensischer Blutnachweis", "Bestimmung von pH-Werten", "Elementaranalyse von Metallen"], correct: 1, explanation: "Luminol + H₂O₂ → Licht (blau, ~425 nm). Anwendungen: H₂O₂ in Atemluft (medizinische Diagnostik), forensischer Blutnachweis (Hämoglobin katalysiert die Reaktion). Sehr empfindlich – Blutspuren noch nach Reinigung nachweisbar." },
  ],
  flashcards: [
    { front: "Fluoreszenz vs. Phosphoreszenz", back: "Fluoreszenz: S₁→S₀, ~10⁻⁸–10⁻¹⁰ s (sehr schnell). Phosphoreszenz: S₁→T₁ (ISC)→S₀, ms bis s (langsam). Phosphoreszenz: Nachleuchten nach Lichtabschalten." },
    { front: "Chemolumineszenz – Prinzip", back: "A + B → C* + D. C* → C + hν. Keine externe Lichtquelle nötig. Sehr empfindlich (kein Hintergrund). Signal zeitabhängig → Integration. Beispiel: NO + O₃ → NO₂* → hν." },
    { front: "Fluoreszenzspektrometer – Aufbau", back: "Lichtquelle → Anregungsmonochromator → Probe → Emissionsmonochromator → Detektor (90°). 90°-Winkel: verhindert direkte Transmission. Misst λ_em > λ_ex (Stokes-Verschiebung)." },
    { front: "Stokes-Verschiebung", back: "λ_Emission > λ_Anregung. Grund: Schwingungsrelaxation im angeregten Zustand kostet Energie. Vorher Relaxation in niedrigstes Schwingungsniveau von S₁, dann Emission." },
    { front: "Fluoreszenz – Sensitivität", back: "10–1000× empfindlicher als Absorptionsmessungen. Grund: misst Emission auf dunklem Hintergrund (vs. kleiner Differenz zweier großer Signale bei Absorption). Nachteile: nur für fluoreszierende Verbindungen." },
    { front: "Biolumineszenz – Beispiele", back: "Glühwürmchen: Luciferin + O₂ + ATP → hν (gelb-grün). GFP (grünes Fluoreszenzprotein): Biomarker in der Molekularbiologie. Bakterien: FMNH₂ + RCHO + O₂ → hν. Quallen: Aequorin + Ca²⁺ → hν." },
  ],
};
