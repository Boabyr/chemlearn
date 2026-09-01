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
- Linienüberlappungen prüfen (z.B. Fe Kα ≈ Mn Kβ bei 1,94/1,91 Å)
- Intensitätsverhältnisse beachten (Kα ist rund 5- bis 8-mal intensiver als Kβ)

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

## Warum leichte Elemente schwierig sind

Zwei Effekte arbeiten gegen die leichten Elemente. Erstens liegt ihre charakteristische
Strahlung bei niedriger Energie und wird schon von wenigen Zentimetern Luft und vom
Detektorfenster verschluckt — deshalb wird bei leichten Elementen im Vakuum oder unter
Helium gemessen. Zweitens sinkt die Fluoreszenzausbeute mit der Ordnungszahl: die
angeregten Atome geben ihre Energie zunehmend als **Auger-Elektron** ab statt als Photon.
Bei Kohlenstoff geht fast die gesamte Anregung diesen Weg, weshalb praktisch kein
Fluoreszenzsignal übrig bleibt.

## Die drei Röntgenmethoden auseinanderhalten

| Methode | Was angeregt wird | Was gemessen wird | Aussage |
|---|---|---|---|
| RFA | Elektron aus innerer Schale | emittiertes Photon | welches Element, wie viel |
| ESCA/XPS | Elektron aus innerer Schale | kinetische Energie des Elektrons | Element **und** Oxidationsstufe |
| XRD | nichts — elastische Streuung | Beugungswinkel | Kristallstruktur, Phasen |

Der Unterschied zwischen RFA und ESCA ist der springende Punkt: Beide schlagen ein
kernnahes Elektron heraus, aber die RFA misst das nachfolgende Photon, dessen Energie von
der chemischen Bindung fast unbeeinflusst bleibt. ESCA misst das Elektron selbst, und
dessen Bindungsenergie verschiebt sich messbar mit dem Oxidationszustand — die chemische
Verschiebung.

**XRD folgt der Bragg-Gleichung:** n·λ = 2d·sin θ. Aus dem Winkel folgt der
Netzebenenabstand d. Häufigster Rechenfehler in der Prüfung: das Diffraktogramm ist gegen
2θ aufgetragen, in die Gleichung gehört aber θ.
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
    { id: "q1", question: "Was besagt das Moseley'sche Gesetz?", options: ["Die Absorption wächst mit der Schichtdicke", "Die Emissionswellenlänge hängt an der Ordnungszahl", "Röntgenstrahlung wird an Kristallen gebeugt", "Die Grenzwellenlänge folgt der Anodenspannung"], correct: 1, explanation: "Moseley: 1/√λ = K·(Z − σ). Die Wellenlänge der charakteristischen Linien ist eindeutig mit der Ordnungszahl verknüpft und nicht mit der chemischen Bindung. Genau das macht die Röntgenfluoreszenz zur Elementanalyse. Die Beugung am Kristall beschreibt Bragg, die Grenzwellenlänge das Duane-Hunt-Gesetz." },
    { id: "q2", question: "Was beschreibt das Bragg'sche Gesetz?", options: ["Wechselwirkung von Röntgenstrahlung mit freien Elektronen der Probe", "nλ = 2d·sin(θ): Bedingung für konstruktive Interferenz am Kristallgitter", "Emission von Augerelektronen aus kernnahen Schalen", "Zusammenhang zwischen Anodenspannung und minimaler Wellenlänge"], correct: 1, explanation: "nλ = 2d·sin(θ). n = Beugungsordnung, d = Netzebenenabstand des Analysatorkristalls, θ = Glanzwinkel. Der Analysatorkristall im RFA-Spektrometer nutzt dies zur wellenlängenselektiven Messung." },
    { id: "q3", question: "Welcher Vorteil der RFA macht sie besonders für die Kunst- und Archäologie wertvoll?", options: ["Sehr hohe Empfindlichkeit", "Die Methode ist zerstörungsfrei", "Günstige Instrumentierung", "Bestimmung aller Elemente möglich"], correct: 1, explanation: "RFA ist zerstörungsfrei! Man kann Gemälde, archäologische Funde, Münzen, Juwelen direkt messen ohne Material zu entnehmen. Beispiel aus Vorlesung: Raphael's 'Madonna auf der Wiese' – Pigmentbestimmung ohne Beschädigung." },
    { id: "q4", question: "Was ist ein Matrixeffekt in der quantitativen RFA?", options: ["Ein Fehler durch eine falsch aufgenommene Kalibrierung", "Die Begleitelemente verändern das Analytsignal", "Eine Übersteuerung des Detektors", "Die Temperaturabhängigkeit des Signals"], correct: 1, explanation: "Die Matrix wirkt auf zwei Wegen: Sie absorbiert einen Teil der Anregungs- oder Fluoreszenzstrahlung, und sie kann selbst Strahlung aussenden, die den Analyten zusätzlich anregt (Sekundäranregung). Dieselbe Analytkonzentration liefert deshalb in verschiedenen Matrices verschiedene Signale — Abhilfe über matrixangepasste Standards, Verdünnung oder Korrekturmodelle." },
    { id: "q5", question: "Warum ist die Bestimmung von Kohlenstoff (C, Z=6) mit RFA schwierig?", options: ["Kohlenstoff besitzt keine charakteristischen Röntgenlinien", "Die Augerelektronenemission verdrängt die Fluoreszenz", "Kohlenstoff absorbiert die Strahlung völlig", "Die Röntgenröhre liefert zu weiche Strahlung"], correct: 1, explanation: "Bei leichten Elementen gibt das angeregte Atom seine Energie überwiegend als Auger-Elektron ab statt als Photon; die Fluoreszenzausbeute sinkt mit der Ordnungszahl. Dazu kommt, dass die weiche Strahlung leichter Elemente schon in Luft und im Detektorfenster steckenbleibt — deshalb misst man sie unter Vakuum oder Helium." },
    { id: "q6", question: "Welche Detektortypen werden in RFA-Spektrometern eingesetzt?", options: ["Ausschließlich Photodioden hinter einem Filterrad", "Zählrohr, Szintillations- und Halbleiterdetektor", "Ausschließlich CCD-Zeilensensoren", "Thermoelemente und Bolometer"], correct: 1, explanation: "Wellenlängendispersive Geräte arbeiten mit Zählrohr oder Szintillationsdetektor hinter einem Analysatorkristall. Energiedispersive Geräte nutzen Halbleiterdetektoren wie Si(Li) oder Silizium-Driftdetektoren, die die Photonenenergie direkt messen und deshalb ohne Kristall auskommen." },
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
