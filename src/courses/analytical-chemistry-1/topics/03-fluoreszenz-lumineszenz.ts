import type { Thema } from '../../../content/schema'

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

## Warum Fluoreszenz empfindlicher ist als Absorption

Die Absorptionsmessung sucht einen kleinen Unterschied zwischen zwei großen Signalen:
I₀ und I. Bei sehr kleinen Konzentrationen sind beide fast gleich groß, und der
Unterschied verschwindet im Rauschen der Lampe.

Die Fluoreszenzmessung sucht ein kleines Signal vor schwarzem Hintergrund. Der Detektor
steht im 90°-Winkel und sieht ohne Probe idealerweise nichts. Jedes Photon ist damit ein
Zugewinn statt eines fehlenden Anteils — daher die 10- bis 1000-fach besseren
Nachweisgrenzen.

Der Preis: Das Signal hängt an der Anregungsintensität. Eine doppelt so starke Lampe
verdoppelt die Fluoreszenz, während die Absorption unverändert bliebe. Fluoreszenzwerte
sind deshalb Relativwerte und verlangen Kalibrierung am selben Gerät und derselben
Einstellung.

## Quantenausbeute und Löschung

**Quantenausbeute Φ** = emittierte Photonen / absorbierte Photonen. Sie liegt zwischen 0
und 1 und entscheidet zusammen mit ε darüber, ob ein Stoff überhaupt fluoreszenztauglich
ist. Starre, ebene, konjugierte Moleküle (Chinin, Fluorescein, PAK) haben hohe Werte,
weil ihnen die Wege zur strahlungslosen Relaxation fehlen.

**Löschung (Quenching)** senkt Φ:
- **Stoßlöschung:** O₂, Halogenide, Schwermetallionen nehmen Energie im Stoß auf.
  Deshalb wird für genaue Messungen entgast.
- **Innerer Filtereffekt:** bei hoher Konzentration absorbiert die Probe ihr eigenes
  Emissionslicht. Die Kalibriergerade biegt ab — Fluoreszenz ist nur bei kleinen
  Konzentrationen linear, anders als die Absorption, die bei kleinen Werten Probleme hat.
- **Temperatur:** höhere Temperatur bedeutet mehr Stöße und damit weniger Fluoreszenz.

## Stokes-Verschiebung

Zwischen Absorptions- und Emissionsmaximum liegen typisch 20 bis 100 nm. Der Grund ist
die Schwingungsrelaxation im angeregten Zustand: ein Teil der aufgenommenen Energie geht
als Wärme verloren, bevor das Photon abgegeben wird. Praktisch ist das der Grund, warum
sich Anregungs- und Emissionslicht optisch trennen lassen.
`,
  interactive: {
    type: "apparatus-quiz",
    question: "Chemolumineszenz-Detektor",
    targetId: "chemoluminescence",
    explanation: "Der Chemolumineszenz-Detektor hat den einfachsten Aufbau aller Spektrometer: Da das Licht durch eine chemische Reaktion in der Probe selbst erzeugt wird, ist keine externe Lichtquelle nötig. Nur Probe (Reaktionskammer) und Detektor sind erforderlich.",
    hint1: "Chemolumineszenz erzeugt Licht durch eine chemische Reaktion (A + B → C*). Daher braucht man keine Lichtquelle von außen.",
    hint2: "Aufbau: nur Probenmischer + Detektor. Das macht die Methode so empfindlich – de facto kein Hintergrundrauschen.",
    options: [
      {
        id: "chemoluminescence",
        label: "Chemolumineszenz-Detektor",
        description: "Keine externe Lichtquelle, nur Probe und Detektor",
      },
      {
        id: "fluorescence",
        label: "Fluoreszenzspektrometer",
        description: "Mit externer Lichtquelle, Detektor im 90°-Winkel",
      },
      {
        id: "uv-vis",
        label: "UV/Vis-Spektrometer",
        description: "Detektor in Transmissionsrichtung",
      },
      {
        id: "rfa",
        label: "Röntgenfluoreszenz (RFA)",
        description: "Röntgenröhre + Analysatorkristall + Detektor",
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
    { id: "0522g49", front: "Fluoreszenz vs. Phosphoreszenz", back: "Fluoreszenz: S₁→S₀, ~10⁻⁸–10⁻¹⁰ s (sehr schnell). Phosphoreszenz: S₁→T₁ (ISC)→S₀, ms bis s (langsam). Phosphoreszenz: Nachleuchten nach Lichtabschalten." },
    { id: "1d9ei56", front: "Chemolumineszenz – Prinzip", back: "A + B → C* + D. C* → C + hν. Keine externe Lichtquelle nötig. Sehr empfindlich (kein Hintergrund). Signal zeitabhängig → Integration. Beispiel: NO + O₃ → NO₂* → hν." },
    { id: "0usyg74", front: "Fluoreszenzspektrometer – Aufbau", back: "Lichtquelle → Anregungsmonochromator → Probe → Emissionsmonochromator → Detektor (90°). 90°-Winkel: verhindert direkte Transmission. Misst λ_em > λ_ex (Stokes-Verschiebung)." },
    { id: "1feba0a", front: "Stokes-Verschiebung", back: "λ_Emission > λ_Anregung. Grund: Schwingungsrelaxation im angeregten Zustand kostet Energie. Vorher Relaxation in niedrigstes Schwingungsniveau von S₁, dann Emission." },
    { id: "1ao8eit", front: "Fluoreszenz – Sensitivität", back: "10–1000× empfindlicher als Absorptionsmessungen. Grund: misst Emission auf dunklem Hintergrund (vs. kleiner Differenz zweier großer Signale bei Absorption). Nachteile: nur für fluoreszierende Verbindungen." },
    { id: "12cad58", front: "Biolumineszenz – Beispiele", back: "Glühwürmchen: Luciferin + O₂ + ATP → hν (gelb-grün). GFP (grünes Fluoreszenzprotein): Biomarker in der Molekularbiologie. Bakterien: FMNH₂ + RCHO + O₂ → hν. Quallen: Aequorin + Ca²⁺ → hν." },
  ],
} satisfies Thema;
