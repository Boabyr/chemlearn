import type { Thema } from '../../../content/schema'

export const topic = {
  id: "05-roentgenspektroskopie",
  title: "Röntgenspektroskopie (RFA)",
  subtitle: "Röntgenfluoreszenzanalyse, Absorptions- und Emissionsmechanismen",
  icon: "⚡",
  estimatedMinutes: 70,
  theory: `
## Grundlagen der Röntgenstrahlung

Röntgenstrahlung: 0.1–100 Å Wellenlänge, wechselwirkt mit Elektronen innerer Schalen.

**Wechselwirkung Röntgenstrahlung–Materie:**
I(λ₀) = I₀ · e^(−μρd)
(μ = Massenschwächungskoeffizient, ρ = Dichte, d = Dicke)

**Drei Wechselwirkungsarten:**
1. Absorption (Photoeffekt)
2. Emission (Röntgenfluoreszenz, Augerelektronen)
3. Streuung (Rayleigh elastisch, Compton inelastisch)

## Absorptions-/Emissionsmechanismen

**Anregung:** Primärstrahlung schlägt kernnahes Elektron (K- oder L-Schale) heraus → Photoelektron
**Folgeprozess 1 – Röntgenemission (XFS/RFA):**
Elektron aus höherer Schale fällt in Lücke → Emission charakteristischer Röntgenstrahlung (Kα, Kβ, Lα...)

**Folgeprozess 2 – Augerelektronenemission:**
Energie wird auf drittes Elektron übertragen → Augerelektron wird emittiert

**Photoelektron:** E_kin = hν − E_B (E_B = Bindungsenergie)
**Augerelektron:** E_kin = E_K − E_LI − E_LIII

## Moseley'sches Gesetz

1/√λ = K(Z − σ)
K = serienabhängige Proportionalitätskonstante
σ = Abschirmfaktor

→ Eindeutige Zuordnung Emissionslinie ↔ Element (Grundlage der qualitativen RFA!)

## Aufbau eines RFA-Spektrometers

**Komponenten:**
1. **Röntgenröhre** (Lichtquelle): Energien 1–250 keV
   - λ_min = hc/(eU) = 12.398/U (Å, U in kV)
   - Bremsstrahlung + charakteristische Emissionslinien des Anodenmaterials
2. **Monochromator**: Analysatorkristall → Bragg'sches Gesetz: nλ = 2d·sin(θ)
3. **Detektoren**: Zählrohr, Szintillationsdetektor, Halbleiterdetektor (PIN-Prinzip)

**Bragg'sches Gesetz:**
nλ = 2d · sin(θ)
n = Beugungsordnung, d = Netzebenenabstand, θ = Glanzwinkel

## Qualitative RFA-Analyse

- Elemente über ihre typischen Emissionslinien identifizieren
- Minimum: intensivste Linie finden (Kα oder Lα1)
- Linien höherer Ordnung (2. Ordnung) beachten!
- Linienüberlappungen prüfen (z.B. Fe Kβ ≈ Mn Kα bei 1.94/1.91 Å)
- Intensitätsverhältnisse beachten (z.B. Fe Kα : Kβ = 4:1)

## Quantitative RFA – Matrixeffekte

**Problem:** Matrixeffekte stören die quantitative Auswertung:
1. Gewünschte Anregung durch Primärstrahl
2. Sekundäranregung durch Matrixelemente
3. Absorption der Primärstrahlung durch Matrix
4. Sekundärabsorption

**Quantitative Auswertung:**
N_A/N_A100 = (μ_A · c_A)/(μ_A · c_A + μ_M · c_M)

**Kompensationsstrategien:**
- Standards ähnlicher Matrix
- Interne Standards
- Verdünnung (niedrige Z-Materialien: Wasser, org. Lsm., Borsäure)
- Mathematische Korrekturmodelle

## Vor- und Nachteile RFA

**Vorteile (+):**
- Zerstörungsfrei (ideal für Kunstwerke, archäologische Funde)
- Multielement-Analyse in Minuten
- Sehr gute Präzision und Richtigkeit
- Elemente F (Z=9) bis U (Z=92)

**Nachteile (−):**
- Nicht sehr sensitiv (0.01–100%)
- Leichte Elemente (Z<23) schwierig
- C, O, N praktisch nicht bestimmbar
- Teure Instrumentierung
`,
  interactive: {
    type: "apparatus-quiz",
    question: "Röntgenfluoreszenzspektrometer (RFA/XFS)",
    targetId: "rfa",
    explanation: "Das RFA-Spektrometer besteht aus: Röntgenröhre (erzeugt Primärstrahlung) → Probe (emittiert charakteristische Röntgenstrahlung) → Analysatorkristall (Monochromator via Bragg'sches Gesetz) → Detektor. Der Analysatorkristall ermöglicht die wellenlängenselektive Detektion.",
    hint1: "RFA = Röntgenfluoreszenzanalyse. Röntgenröhre regt Probe an, Probe emittiert charakteristische Röntgenstrahlung, Analysatorkristall selektiert Wellenlängen via Bragg'schem Gesetz.",
    hint2: "Schlüsselelement: Analysatorkristall mit Bragg-Bedingung nλ = 2d·sin(θ). Verschiedene d-Werte für verschiedene Elementbereiche (LiF, PG, PE).",
    options: [
      {
        id: "rfa",
        label: "Röntgenfluoreszenzspektrometer (RFA)",
        description: "Röntgenröhre + Probe + Analysatorkristall + Detektor",
      },
      {
        id: "xrd",
        label: "Röntgendiffraktometer (XRD)",
        description: "Für Kristallstrukturbestimmung, θ-2θ-Geometrie",
      },
      {
        id: "esca",
        label: "ESCA / XPS Spektrometer",
        description: "Misst kinetische Energie der Photoelektronen",
      },
      {
        id: "ftir",
        label: "FT-IR Spektrometer",
        description: "Infrarot, Michelson-Interferometer",
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Was besagt das Moseley'sche Gesetz?", options: ["Röntgenabsorption ist proportional zur Schichtdicke", "1/√λ = K(Z−σ): Die Emissionswellenlänge ist eindeutig mit der Ordnungszahl Z des Elements verknüpft", "Röntgenstrahlung wird an Kristallen gebeugt", "Die Mindest-Wellenlänge hängt von der Anodenspannung ab"], correct: 1, explanation: "Moseley'sches Gesetz: 1/√λ = K(Z−σ). Jedes Element hat charakteristische Emissionslinien (Kα, Kβ, Lα...) die eindeutig seiner Ordnungszahl Z zugeordnet werden können → Basis der qualitativen RFA." },
    { id: "q2", question: "Was beschreibt das Bragg'sche Gesetz?", options: ["Wechselwirkung von Röntgenstrahlung mit freien Elektronen", "nλ = 2d·sin(θ): Bedingung für konstruktive Interferenz bei Beugung an Kristallgitter", "Emission von Augerelektronen", "Zusammenhang zwischen Anodenspannung und minimaler Wellenlänge"], correct: 1, explanation: "nλ = 2d·sin(θ). n = Beugungsordnung, d = Netzebenenabstand des Analysatorkristalls, θ = Glanzwinkel. Der Analysatorkristall im RFA-Spektrometer nutzt dies zur wellenlängenselektiven Messung." },
    { id: "q3", question: "Welcher Vorteil der RFA macht sie besonders für die Kunst- und Archäologie wertvoll?", options: ["Sehr hohe Empfindlichkeit", "Die Methode ist zerstörungsfrei", "Günstige Instrumentierung", "Bestimmung aller Elemente möglich"], correct: 1, explanation: "RFA ist zerstörungsfrei! Man kann Gemälde, archäologische Funde, Münzen, Juwelen direkt messen ohne Material zu entnehmen. Beispiel aus Vorlesung: Raphael's 'Madonna auf der Wiese' – Pigmentbestimmung ohne Beschädigung." },
    { id: "q4", question: "Was ist ein Matrixeffekt in der quantitativen RFA?", options: ["Fehler durch falsche Kalibrierung", "Beeinflussung des Messsignals durch die Probenmatrix (Sekundäranregung, Absorption durch Matrix)", "Übersteuerung des Detektors", "Temperaturabhängigkeit des Signals"], correct: 1, explanation: "Matrixeffekte: Die Matrix (alles außer dem Analyten) beeinflusst das Signal durch: Sekundäranregung von Analytelementen durch Matrixstrahlung, Absorption der Primärstrahlung durch Matrix, Sekundärabsorption der Fluoreszenzstrahlung." },
    { id: "q5", question: "Warum ist die Bestimmung von Kohlenstoff (C, Z=6) mit RFA schwierig?", options: ["C hat keine Röntgenemissionslinien", "Für leichte Elemente (Z<23) konkurriert die Augerelektronenemission stark mit der Röntgenemission", "C absorbiert alle Röntgenstrahlung", "Die Röntgenröhre erzeugt keine ausreichend harte Strahlung"], correct: 1, explanation: "Bei leichten Elementen (niedrige Z): Augerelektronenemissionswahrscheinlichkeit >> Röntgenemissionswahrscheinlichkeit. Außerdem: die charakteristischen Röntgenlinien von C liegen im weichen Röntgenbereich (>44 Å) → starke Absorption durch Luft und Geräteteile." },
    { id: "q6", question: "Welche Detektortypen werden in RFA-Spektrometern eingesetzt?", options: ["Nur Photodioden", "Zählrohr, Szintillationsdetektor (NaI(Tl)) und Halbleiterdetektor (Si(Li), PIN-Prinzip)", "Nur CCD-Arrays", "Thermoelemente"], correct: 1, explanation: "Drei Typen: 1. Proportionalzählrohr (gasgefüllt). 2. Szintillationsdetektor (NaI(Tl) + Photomultiplier). 3. Halbleiterdetektor (Si(Li) oder reines Si, PIN-Prinzip, gekühlt für beste Auflösung)." },
  ],
  flashcards: [
    { id: "0jltk3e", front: "Moseley'sches Gesetz", back: "1/√λ = K(Z−σ). Emissionswellenlänge eindeutig mit Ordnungszahl Z verknüpft → Basis der qualitativen Elementanalyse per RFA. K = Serienkonstante, σ = Abschirmfaktor." },
    { id: "1juva7r", front: "Bragg'sches Gesetz", back: "nλ = 2d·sin(θ). Analysatorkristall im RFA-Spektrometer. d = Netzebenenabstand, θ = Glanzwinkel. Verschiedene Kristalle für verschiedene Elementbereiche: LiF (≥Z=20), PG (P,S,Cl), PE (Al-K)." },
    { id: "1g4r1bj", front: "RFA – Vor- und Nachteile", back: "✓ Zerstörungsfrei, Multielement, F bis U. ✗ Nicht sehr sensitiv (0.01–100%), leichte Elemente schwierig (Z<23), C/O/N kaum bestimmbar, teure Instrumente." },
    { id: "083w12j", front: "Matrixeffekte RFA", back: "1. Sekundäranregung durch Matrixstrahlung. 2. Absorption Primärstrahlung durch Matrix. 3. Sekundärabsorption. Kompensation: ähnliche Standards, interner Standard, Verdünnung, math. Modelle." },
    { id: "0bd8kdk", front: "Röntgenröhre – λmin", back: "λ_min = hc/(eU) = 12.398/U (Å). U = Anodenspannung in kV. Bremsstrahlung überlagert mit charakteristischen Emissionslinien des Anodenmaterials (z.B. Mo, W, Cu)." },
    { id: "0mb1d4z", front: "Auger vs. Röntgenemission", back: "Beide Folgeprozesse nach Photoionisation. Auger: Energie auf drittes e⁻ übertragen → Augerelektron. Röntgen: Photon emittiert (Kα, Kβ...). Leichte Elemente: Auger dominiert. Schwere Elemente: Röntgenemission dominiert." },
  ],
} satisfies Thema;
