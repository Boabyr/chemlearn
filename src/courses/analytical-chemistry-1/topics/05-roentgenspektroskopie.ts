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
    mode: "name-to-image",
    targetId: "rfa",
    explanation: "Das RFA-Spektrometer besteht aus: Röntgenröhre (erzeugt Primärstrahlung) → Probe (emittiert charakteristische Röntgenstrahlung) → Analysatorkristall (Monochromator via Bragg'sches Gesetz) → Detektor. Der Analysatorkristall ermöglicht die wellenlängenselektive Detektion.",
    hint1: "RFA = Röntgenfluoreszenzanalyse. Röntgenröhre regt Probe an, Probe emittiert charakteristische Röntgenstrahlung, Analysatorkristall selektiert Wellenlängen via Bragg'schem Gesetz.",
    hint2: "Schlüsselelement: Analysatorkristall mit Bragg-Bedingung nλ = 2d·sin(θ). Verschiedene d-Werte für verschiedene Elementbereiche (LiF, PG, PE).",
    options: [
      {
        id: "rfa",
        label: "Röntgenfluoreszenzspektrometer (RFA)",
        description: "Röntgenröhre + Probe + Analysatorkristall + Detektor",
        svg: `<svg viewBox="0 0 320 150" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="5" y="55" width="55" height="40" rx="4" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="32" y="72" textAnchor="middle" fill="#fbbf24" fontSize="7">Röntgen-</text>
          <text x="32" y="82" textAnchor="middle" fill="#fbbf24" fontSize="7">röhre</text>
          <line x1="60" y1="75" x2="110" y2="75" stroke="#f87171" strokeWidth="2" strokeDasharray="3,2"/>
          <rect x="110" y="55" width="50" height="40" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="135" y="72" textAnchor="middle" fill="#60a5fa" fontSize="7">Probe</text>
          <text x="135" y="83" textAnchor="middle" fill="#60a5fa" fontSize="6">(emittiert XFS)</text>
          <line x1="160" y1="75" x2="200" y2="100" stroke="#f87171" strokeWidth="2" strokeDasharray="3,2"/>
          <rect x="200" y="90" width="60" height="35" rx="4" fill="#312e81" stroke="#a78bfa" strokeWidth="1.5"/>
          <text x="230" y="105" textAnchor="middle" fill="#a78bfa" fontSize="7">Kristall</text>
          <text x="230" y="116" textAnchor="middle" fill="#a78bfa" fontSize="6">nλ=2d·sinθ</text>
          <line x1="260" y1="100" x2="295" y2="75" stroke="#f87171" strokeWidth="2" strokeDasharray="3,2"/>
          <rect x="280" y="55" width="35" height="30" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="297" y="72" textAnchor="middle" fill="#f87171" fontSize="7">Det.</text>
        </svg>`
      },
      {
        id: "xrd",
        label: "Röntgendiffraktometer (XRD)",
        description: "Für Kristallstrukturbestimmung, θ-2θ-Geometrie",
        svg: `<svg viewBox="0 0 320 150" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="10" y="55" width="50" height="35" rx="4" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="35" y="75" textAnchor="middle" fill="#fbbf24" fontSize="7">X-Ray</text>
          <line x1="60" y1="72" x2="140" y2="90" stroke="#f87171" strokeWidth="2"/>
          <rect x="135" y="80" width="50" height="35" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="160" y="100" textAnchor="middle" fill="#60a5fa" fontSize="7">Kristall-</text>
          <text x="160" y="110" textAnchor="middle" fill="#60a5fa" fontSize="7">probe</text>
          <line x1="185" y1="90" x2="265" y2="72" stroke="#f87171" strokeWidth="2"/>
          <rect x="255" y="55" width="50" height="35" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="280" y="72" textAnchor="middle" fill="#f87171" fontSize="7">Detektor</text>
          <text x="160" y="135" textAnchor="middle" fill="#64748b" fontSize="7">θ – 2θ Geometrie</text>
        </svg>`
      },
      {
        id: "esca",
        label: "ESCA / XPS Spektrometer",
        description: "Misst kinetische Energie der Photoelektronen",
        svg: `<svg viewBox="0 0 320 150" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="10" y="50" width="55" height="40" rx="4" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="37" y="67" textAnchor="middle" fill="#fbbf24" fontSize="7">Röntgen-</text>
          <text x="37" y="77" textAnchor="middle" fill="#fbbf24" fontSize="7">quelle</text>
          <line x1="65" y1="70" x2="120" y2="70" stroke="#f87171" strokeWidth="2"/>
          <rect x="120" y="50" width="50" height="40" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="145" y="70" textAnchor="middle" fill="#60a5fa" fontSize="7">Probe</text>
          <line x1="145" y1="50" x2="145" y2="15" stroke="#2dd4bf" strokeWidth="2"/>
          <rect x="110" y="5" width="70" height="20" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="145" y="17" textAnchor="middle" fill="#2dd4bf" fontSize="6">e⁻ Analysator</text>
          <text x="145" y="130" textAnchor="middle" fill="#64748b" fontSize="6">E_kin = hν - E_B</text>
        </svg>`
      },
      {
        id: "ftir",
        label: "FT-IR Spektrometer",
        description: "Infrarot, Michelson-Interferometer",
        svg: `<svg viewBox="0 0 320 130" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="10" y="45" width="45" height="35" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="32" y="65" textAnchor="middle" fill="#60a5fa" fontSize="7">IR-Quelle</text>
          <line x1="55" y1="62" x2="90" y2="62" stroke="#f87171" strokeWidth="2"/>
          <rect x="90" y="40" width="70" height="45" rx="4" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="125" y="60" textAnchor="middle" fill="#fbbf24" fontSize="7">Michelson</text>
          <text x="125" y="72" textAnchor="middle" fill="#fbbf24" fontSize="7">Interferometer</text>
          <line x1="160" y1="62" x2="195" y2="62" stroke="#f87171" strokeWidth="2"/>
          <rect x="195" y="45" width="45" height="35" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="217" y="65" textAnchor="middle" fill="#2dd4bf" fontSize="7">Probe</text>
          <line x1="240" y1="62" x2="270" y2="62" stroke="#f87171" strokeWidth="2"/>
          <rect x="270" y="45" width="40" height="35" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="290" y="60" textAnchor="middle" fill="#f87171" fontSize="6">Det.</text>
          <text x="290" y="70" textAnchor="middle" fill="#f87171" fontSize="6">+FT</text>
        </svg>`
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
    { front: "Moseley'sches Gesetz", back: "1/√λ = K(Z−σ). Emissionswellenlänge eindeutig mit Ordnungszahl Z verknüpft → Basis der qualitativen Elementanalyse per RFA. K = Serienkonstante, σ = Abschirmfaktor." },
    { front: "Bragg'sches Gesetz", back: "nλ = 2d·sin(θ). Analysatorkristall im RFA-Spektrometer. d = Netzebenenabstand, θ = Glanzwinkel. Verschiedene Kristalle für verschiedene Elementbereiche: LiF (≥Z=20), PG (P,S,Cl), PE (Al-K)." },
    { front: "RFA – Vor- und Nachteile", back: "✓ Zerstörungsfrei, Multielement, F bis U. ✗ Nicht sehr sensitiv (0.01–100%), leichte Elemente schwierig (Z<23), C/O/N kaum bestimmbar, teure Instrumente." },
    { front: "Matrixeffekte RFA", back: "1. Sekundäranregung durch Matrixstrahlung. 2. Absorption Primärstrahlung durch Matrix. 3. Sekundärabsorption. Kompensation: ähnliche Standards, interner Standard, Verdünnung, math. Modelle." },
    { front: "Röntgenröhre – λmin", back: "λ_min = hc/(eU) = 12.398/U (Å). U = Anodenspannung in kV. Bremsstrahlung überlagert mit charakteristischen Emissionslinien des Anodenmaterials (z.B. Mo, W, Cu)." },
    { front: "Auger vs. Röntgenemission", back: "Beide Folgeprozesse nach Photoionisation. Auger: Energie auf drittes e⁻ übertragen → Augerelektron. Röntgen: Photon emittiert (Kα, Kβ...). Leichte Elemente: Auger dominiert. Schwere Elemente: Röntgenemission dominiert." },
  ],
};
