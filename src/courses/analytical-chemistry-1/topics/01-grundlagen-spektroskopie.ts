export const topic = {
  id: "01-grundlagen-spektroskopie",
  title: "Grundlagen der Spektroskopie",
  subtitle: "Elektromagnetisches Spektrum, Wechselwirkung Strahlung–Materie",
  icon: "🌈",
  estimatedMinutes: 60,
  theory: `
## Spektroskopie als Rückgrat der Analytik

Spektroskopie, Chromatographie und Elektroanalytik bilden das "Rückgrat" der modernen Analytischen Chemie. Spektroskopische Methoden beruhen auf der Wechselwirkung von elektromagnetischer Strahlung mit Materie.

## Elektromagnetische Strahlung

Elektromagnetische Strahlung lässt sich als Welle oder als Teilchen beschreiben:

- **Wellennatur:** erklärt Wellenlänge (λ), Frequenz (ν), Amplitude, Ausbreitungsgeschwindigkeit
- **Teilchennatur (Photonen):** erklärt Absorption und Emission

Grundlegende Beziehungen:
- c = λ · ν  (c = 3×10⁸ m/s, Lichtgeschwindigkeit)
- E = h · ν  (h = 6.626×10⁻³⁴ J·s, Planck'sches Wirkungsquantum)
- E = h · c / λ

## Das elektromagnetische Spektrum

| Spektroskopieart | Spektralbereich | Art der Anregung |
|---|---|---|
| γ-Strahlenemission | 0,005–1,4 Å | Kern |
| Röntgenspektroskopie | 0,1–100 Å | Elektronen innerer Schalen |
| UV-Spektroskopie | 180–400 nm | Valenzelektronen |
| Sichtbar (Vis) | 400–780 nm | Valenzelektronen |
| NIR | 780–2500 nm | Kombinations-/Oberschwingungen |
| IR (MIR) | 400–4000 cm⁻¹ | Rotationen und Schwingungen |
| Mikrowelle | 0,75–3,75 mm | Rotation von Molekülen |
| ESR | 3 cm | Elektronenspin im Magnetfeld |
| NMR | 0,6–10 m | Kernspin im Magnetfeld |

## Wichtige Fragen bei jeder Spektroskopie

1. In welchem **Wellenlängenbereich** wird gearbeitet?
2. Welchem **Anregungsmechanismus** entspricht das?
3. Wie ist das **Spektrometer aufgebaut**?

## Allgemeiner Aufbau eines Spektrometers

**Dispersives Spektrometer:**
Lichtquelle → Monochromator → Probe → Detektor → Recorder

**FT-Spektrometer (Fourier-Transform):**
Breitbandlichtquelle → Interferometer (Michelson) → Probe → Detektor → Fourier-Transformation → Spektrum

## Wechselwirkung Strahlung–Materie

**Absorption:** Photon wird vom Molekül aufgenommen → Anregung in höheren Energiezustand
**Emission:** Angeregtes Molekül gibt Photon ab → Relaxation
**Streuung:** Strahlung wird in anderen Richtungen abgelenkt (elastisch: Rayleigh; inelastisch: Raman)

**Lambert-Beer'sches Gesetz (Grundlage der Absorptionsspektrometrie):**
A = ε · c · d
(wird in Thema 02 detailliert behandelt)
`,
  interactive: {
    type: "apparatus-quiz",
    question: "Fluoreszenzspektrometer",
    mode: "name-to-image",
    targetId: "fluorescence",
    explanation: "Das Fluoreszenzspektrometer hat einen sehr einfachen Aufbau: Die Probe selbst emittiert Licht nach Anregung. Daher wird nur die Probe und ein Detektor (senkrecht zur Anregungsrichtung) benötigt – kein Referenzstrahl nötig. Das macht die Methode sehr empfindlich (kein Hintergrundsignal).",
    hint1: "Fluoreszenzspektrometer messen emittiertes Licht, nicht transmittiertes. Der Detektor steht daher im 90°-Winkel zur Anregungsquelle.",
    hint2: "Beim Fluoreszenzspektrometer: Lichtquelle → Probe → Detektor (90°). Kein Referenzstrahl nötig, weil kein Licht durch die Probe 'hindurchgeht'.",
    options: [
      {
        id: "fluorescence",
        label: "Fluoreszenzspektrometer",
        description: "Detektor im 90°-Winkel, misst Emission",
        svg: `<svg viewBox="0 0 300 160" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="20" y="65" width="50" height="30" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="45" y="83" textAnchor="middle" fill="#60a5fa" fontSize="8">Quelle</text>
          <line x1="70" y1="80" x2="120" y2="80" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="120" y="60" width="40" height="40" rx="4" fill="#1e3a5f" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="140" y="83" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe</text>
          <line x1="140" y1="60" x2="140" y2="25" stroke="#f87171" strokeWidth="2" strokeDasharray="4,2"/>
          <rect x="110" y="5" width="60" height="20" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="140" y="17" textAnchor="middle" fill="#f87171" fontSize="8">Detektor (90°)</text>
          <text x="155" y="83" fill="#64748b" fontSize="7">→ transmittiert</text>
        </svg>`
      },
      {
        id: "uv-vis",
        label: "UV/Vis-Absorptionsspektrometer",
        description: "Detektor hinter der Probe, misst Transmission",
        svg: `<svg viewBox="0 0 300 120" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="10" y="45" width="50" height="30" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="35" y="63" textAnchor="middle" fill="#60a5fa" fontSize="8">Quelle</text>
          <line x1="60" y1="60" x2="90" y2="60" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="90" y="45" width="40" height="30" rx="4" fill="#312e81" stroke="#a78bfa" strokeWidth="1.5"/>
          <text x="110" y="63" textAnchor="middle" fill="#a78bfa" fontSize="7">Mono-chromator</text>
          <line x1="130" y1="60" x2="160" y2="60" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="160" y="45" width="40" height="30" rx="4" fill="#1e3a5f" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="180" y="63" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe</text>
          <line x1="200" y1="60" x2="230" y2="60" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="230" y="45" width="50" height="30" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="255" y="63" textAnchor="middle" fill="#f87171" fontSize="8">Detektor</text>
        </svg>`
      },
      {
        id: "chemoluminescence",
        label: "Chemolumineszenz-Detektor",
        description: "Einfachster Aufbau: nur Probe und Detektor",
        svg: `<svg viewBox="0 0 300 120" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="100" y="40" width="60" height="40" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="130" y="62" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe+Reagenz</text>
          <text x="130" y="72" textAnchor="middle" fill="#2dd4bf" fontSize="7">(emittiert Licht)</text>
          <line x1="160" y1="60" x2="210" y2="60" stroke="#fbbf24" strokeWidth="2"/>
          <rect x="210" y="45" width="60" height="30" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="240" y="63" textAnchor="middle" fill="#f87171" fontSize="8">Detektor</text>
          <text x="130" y="100" textAnchor="middle" fill="#64748b" fontSize="7">Keine separate Lichtquelle!</text>
        </svg>`
      },
      {
        id: "ftir",
        label: "FT-IR Spektrometer",
        description: "Mit Michelson-Interferometer",
        svg: `<svg viewBox="0 0 300 140" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="10" y="55" width="40" height="30" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="30" y="73" textAnchor="middle" fill="#60a5fa" fontSize="7">IR-Quelle</text>
          <line x1="50" y1="70" x2="80" y2="70" stroke="#f87171" strokeWidth="2"/>
          <rect x="80" y="50" width="60" height="50" rx="4" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="110" y="73" textAnchor="middle" fill="#fbbf24" fontSize="7">Michelson</text>
          <text x="110" y="83" textAnchor="middle" fill="#fbbf24" fontSize="7">Interferometer</text>
          <line x1="140" y1="70" x2="170" y2="70" stroke="#f87171" strokeWidth="2"/>
          <rect x="170" y="55" width="40" height="30" rx="4" fill="#1e3a5f" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="190" y="73" textAnchor="middle" fill="#2dd4bf" fontSize="7">Probe</text>
          <line x1="210" y1="70" x2="240" y2="70" stroke="#f87171" strokeWidth="2"/>
          <rect x="240" y="55" width="50" height="30" rx="4" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="265" y="68" textAnchor="middle" fill="#f87171" fontSize="7">Detektor</text>
          <text x="265" y="78" textAnchor="middle" fill="#f87171" fontSize="7">+ FT</text>
        </svg>`
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Welche Gleichung beschreibt den Zusammenhang zwischen Energie eines Photons und seiner Frequenz?", options: ["E = mc²", "E = h · ν", "E = ε · c · d", "E = λ · ν"], correct: 1, explanation: "E = h · ν (Planck'sche Gleichung). h = 6.626×10⁻³⁴ J·s (Planck'sches Wirkungsquantum), ν = Frequenz. Höhere Frequenz = höhere Energie = kürzere Wellenlänge." },
    { id: "q2", question: "IR-Strahlung regt in Molekülen welche Art von Übergängen an?", options: ["Elektronenübergänge in inneren Schalen", "Kernspinübergänge", "Rotations- und Schwingungsübergänge", "Kernübergänge"], correct: 2, explanation: "IR (400–4000 cm⁻¹) regt Rotations- und Schwingungsübergänge in Molekülen an. UV/Vis regt Valenzelektronen an, Röntgen innere Elektronen, NMR den Kernspin." },
    { id: "q3", question: "Was erklärt die Wellennatur der elektromagnetischen Strahlung?", options: ["Absorption und Emission", "Wellenlänge, Frequenz, Amplitude und Ausbreitungsgeschwindigkeit", "Quantisierung der Energieniveaus", "Photoelektrischen Effekt"], correct: 1, explanation: "Die Wellennatur erklärt Wellenlänge (λ), Frequenz (ν), Amplitude und Ausbreitungsgeschwindigkeit. Die Teilchennatur (Photonen) erklärt Absorption und Emission." },
    { id: "q4", question: "Welchen Wellenlängenbereich deckt die sichtbare Spektroskopie (Vis) ab?", options: ["10–180 nm", "180–400 nm", "400–780 nm", "780–2500 nm"], correct: 2, explanation: "Vis: 400–780 nm. UV: 180–400 nm. NIR: 780–2500 nm. Das sichtbare Licht entspricht den Farben des Regenbogens (400 nm violett bis 780 nm rot)." },
    { id: "q5", question: "Was ist der Hauptunterschied zwischen einem dispersiven Spektrometer und einem FT-Spektrometer?", options: ["FT-Spektrometer braucht keine Lichtquelle", "FT-Spektrometer verwendet ein Interferometer statt eines Monochromators und misst alle Wellenlängen gleichzeitig", "Dispersive Spektrometer sind immer genauer", "FT-Spektrometer kann nur IR messen"], correct: 1, explanation: "FT-Spektrometer: Michelson-Interferometer → Interferogramm → Fourier-Transformation → Spektrum. Alle Wellenlängen gleichzeitig (Multiplex-Vorteil = Fellgett-Vorteil). Dispersive: sequenziell durch Wellenlängen scannen." },
    { id: "q6", question: "Welche der folgenden Spektroskopiearten hat den niedrigsten Energiebedarf pro Photon?", options: ["Röntgenspektroskopie", "UV-Spektroskopie", "IR-Spektroskopie", "NMR-Spektroskopie"], correct: 3, explanation: "NMR arbeitet im Radiowellenbereich (0,6–10 m Wellenlänge) → niedrigste Frequenz → niedrigste Photonenenergie (E = h·ν). Röntgen hat die höchste Energie." },
  ],
  flashcards: [
    { front: "Lambert-Beer-Gesetz (Kurzform)", back: "A = ε · c · d. A = Absorption (dimensionslos), ε = molarer Extinktionskoeffizient (L·mol⁻¹·cm⁻¹), c = Konzentration (mol/L), d = Schichtdicke (cm)." },
    { front: "Elektromagnetisches Spektrum – Reihenfolge", back: "γ-Strahlung → Röntgen → UV → Vis → NIR → IR → Mikrowelle → Radiowellen. Mit zunehmender Wellenlänge nimmt die Energie ab." },
    { front: "c = λ · ν", back: "Lichtgeschwindigkeit c = 3×10⁸ m/s = Wellenlänge λ × Frequenz ν. Kurze Wellenlänge = hohe Frequenz = hohe Energie." },
    { front: "Dispersives vs. FT-Spektrometer", back: "Dispersiv: Monochromator trennt Wellenlängen, sequentielle Messung. FT: Michelson-Interferometer, alle λ gleichzeitig (Multiplex-Vorteil), Fourier-Transformation gibt Spektrum." },
    { front: "Anregungsarten im elektromagnetischen Spektrum", back: "Röntgen: innere Elektronen. UV/Vis: Valenzelektronen. IR: Schwingungen/Rotationen. Mikrowelle: Rotationen. NMR: Kernspin. ESR: Elektronenspin." },
    { front: "Fluoreszenzspektrometer – Aufbau", back: "Lichtquelle → (Monochromator) → Probe → Detektor im 90°-Winkel. Sehr empfindlich (kein Hintergrund). Kein Referenzstrahl nötig, da emittiertes Licht gemessen wird." },
  ],
};
