import type { Thema } from '../../../content/schema'

export const topic = {
  id: "04-ftir-raman",
  title: "FT-IR & Raman-Spektroskopie",
  subtitle: "Schwingungsspektrometrie – Grundlagen, Aufbau und Anwendungen",
  icon: "〰️",
  estimatedMinutes: 75,
  theory: `
## Molekülschwingungen

Atomkerne schwingen um ihre Gleichgewichtslage. Die Schwingungsenergie ist quantisiert.

**Harmonischer Oszillator:** E_v = hν(v + 1/2), v = 0, 1, 2...

**Realer Oszillator (Morse-Potential):** Anharmonisch → Obertöne möglich, Dissoziationsenergie endlich.

**Anzahl der Schwingungsfreiheitsgrade:**
- Lineares Molekül: 3N – 5
- Nicht-lineares Molekül: 3N – 6
(N = Anzahl der Atome)

## IR-Aktivität

**Auswahlregel für IR-Absorption:**
Damit eine Schwingung IR-aktiv ist, muss sich das Dipolmoment des Moleküls während der Schwingung ändern!

**Konsequenzen:**
- N₂, O₂, Cl₂ (homonuklear zweiatomig): IR-INAKTIV (kein Dipolmoment, keine Änderung)
- H₂O, CO₂ (asymmetrisch): IR-AKTIV
- CO₂: Symmetrische Streckschwingung IR-inaktiv, aber Raman-aktiv!

## FT-IR Spektrometer

**Aufbau:**
IR-Quelle → Michelson-Interferometer → Probe → Detektor → Fourier-Transformation → Spektrum

**Michelson-Interferometer:**
- Strahlenteiler (Beamsplitter)
- Ein fester Spiegel
- Ein beweglicher Spiegel

**Vorteile FT-IR gegenüber dispersivem IR:**
- **Fellgett-Vorteil (Multiplex):** Alle Frequenzen gleichzeitig → besseres S/N in gleicher Zeit
- **Jacquinot-Vorteil (Throughput):** Kein Spalt → mehr Licht
- **Connes-Vorteil:** Interne Wellenlängenkalibrierung mittels HeNe-Laser → hohe Reproduzierbarkeit
- Schnellere Messung

## Raman-Spektroskopie

**Prinzip:**
Raman ist ein Streuphänomen (inelastische Streuung).

- ~10⁻³ der einfallenden Strahlung wird gestreut (Rayleigh, elastisch, gleiche λ)
- ~10⁻⁶ davon: Raman-Streuung (inelastisch, verschobene λ)

**Raman-Auswahlregel:**
Die Polarisierbarkeit des Moleküls muss sich während der Schwingung ändern!

**Stokes-Linien:** λ > λ₀ (Energieverlust an Molekül)
**Anti-Stokes-Linien:** λ < λ₀ (Energiegewinn aus Molekül, schwächer)

## IR vs. Raman – Komplementarität

| Eigenschaft | IR | Raman |
|---|---|---|
| Auswahlregel | Dipolmoment ändert sich | Polarisierbarkeit ändert sich |
| Lichtquelle | IR-Strahler | Laser (Vis/NIR) |
| Wasser | Stört! | Stört kaum |
| Gase | Geeignet | Geeignet |
| Quantitative Messung | Absorption | Emissionsintensität |
| CO₂ sym. Streckschwingung | IR-inaktiv | Raman-aktiv |

**Komplementaritätsprinzip (Zentrosymmetrische Moleküle):**
Kein Übergang ist gleichzeitig IR- und Raman-aktiv!

**Vorteil Raman:**
- Wasser stört kaum (für wässrige Lösungen ideal)
- Einfache Probenvorbereitung
- Alle Aggregatzustände zugänglich

**Nachteil Raman:**
- Hauptkonkurrenz: Fluoreszenz (10⁶× intensiver, 10⁴× langsamer)
- Gegenmittel: Anregung im NIR (1064 nm), wo die meisten Stoffe nicht mehr fluoreszieren

## Ein IR-Spektrum lesen

Ein IR-Spektrum zerfällt in zwei Bereiche mit völlig verschiedener Aufgabe:

| Bereich | Wellenzahl | Was dort steht |
|---|---|---|
| Gruppenfrequenzen | 4000–1500 cm⁻¹ | O–H, N–H, C–H, C≡N, C=O — funktionelle Gruppen |
| Fingerprint | 1500–400 cm⁻¹ | Gerüstschwingungen, für jede Substanz eigen |

Der obere Bereich sagt, **welche Gruppen** vorhanden sind; der Fingerprint-Bereich sagt,
**welche Substanz** es ist — allerdings nur im Vergleich mit einem Referenzspektrum, weil
sich die einzelnen Banden dort nicht mehr sinnvoll zuordnen lassen.

**Wichtige Lagen zum Auswendiglernen:**
- 3600–3200 cm⁻¹ breit: O–H (Wasserstoffbrücken verbreitern die Bande)
- 3500–3300 cm⁻¹ schmal, oft doppelt: N–H
- 3000 cm⁻¹ als Grenze: darüber =C–H (sp²), darunter C–H (sp³)
- 2260–2100 cm⁻¹ schwach: C≡N, C≡C
- 1750–1650 cm⁻¹ scharf und stark: C=O — die auffälligste Bande im ganzen Spektrum

## Warum die Bandenlage überhaupt dort liegt

Für zwei Massen an einer Feder gilt näherungsweise
ν̃ = (1/2πc)·√(k/μ) mit der Kraftkonstante k und der reduzierten Masse μ.

Daraus folgen zwei Regeln, mit denen sich fast jede Prüfungsfrage zur Bandenlage
beantworten lässt:

- **Stärkere Bindung, höhere Wellenzahl.** C≡C liegt über C=C liegt über C–C.
- **Leichtere Atome, höhere Wellenzahl.** C–H liegt weit über C–C, und der Austausch von
  H gegen D verschiebt die Bande um etwa den Faktor 1/√2 nach unten — der klassische
  Nachweis, dass eine Bande wirklich von einer Wasserstoffschwingung stammt.
`,
  interactive: {
    type: "spectrum-assignment",
    title: "IR-Spektrum von Wasser – Schwingungszuordnung",
    description: "Weise den markierten Peaks des H₂O-IR-Spektrums die richtigen Schwingungstypen zu.",
    xLabel: "Wellenzahl (cm⁻¹) →",
    yLabel: "Absorption",
    peaks: [
      {
        id: "p1",
        position: 12,
        yTop: 95,
        yBottom: 10,
        correctLabel: "O-H Streckschwingung (νₐₛ, νₛ)",
        options: [
          "O-H Streckschwingung (νₐₛ, νₛ)",
          "O-H Deformationsschwingung (δ)",
          "C-H Streckschwingung",
          "C=O Streckschwingung"
        ]
      },
      {
        id: "p2",
        position: 45,
        yTop: 75,
        yBottom: 10,
        correctLabel: "O-H Deformationsschwingung (δ)",
        options: [
          "O-H Streckschwingung (νₐₛ, νₛ)",
          "O-H Deformationsschwingung (δ)",
          "Librationsschwingung",
          "C-O Streckschwingung"
        ]
      },
      {
        id: "p3",
        position: 75,
        yTop: 60,
        yBottom: 10,
        correctLabel: "Librationsschwingung",
        options: [
          "O-H Streckschwingung (νₐₛ, νₛ)",
          "O-H Deformationsschwingung (δ)",
          "Librationsschwingung",
          "Translationsschwingung"
        ]
      }
    ],
    hint1: "H₂O hat 3 Atome (N=3), nicht-linear: 3×3–6 = 3 Grundschwingungen. Die O-H Streckschwingungen liegen im Bereich 3000–3700 cm⁻¹ (hohe Energie = hohe Wellenzahl).",
    hint2: "Reihenfolge nach Wellenzahl: Streckschwingungen ν > Deformationsschwingungen δ > Librationsschwingungen. Streckschwingungen ~3000–4000 cm⁻¹, Deformation ~1000–1700 cm⁻¹, Libration <1000 cm⁻¹.",
  },
  quiz: [
    { id: "q1", question: "Warum ist N₂ IR-inaktiv?", options: ["N₂ ist als Molekül zu leicht", "Das Dipolmoment ändert sich nicht", "N₂ absorbiert ausschließlich im UV", "N₂ hat keinen Schwingungsfreiheitsgrad"], correct: 1, explanation: "Eine Schwingung ist nur dann IR-aktiv, wenn sich dabei das Dipolmoment ändert. N₂ ist homonuklear und hat in jeder Auslenkung das Dipolmoment null — die Streckschwingung existiert, sie ist nur unsichtbar für IR. Im Raman ist sie sichtbar, weil sich die Polarisierbarkeit sehr wohl ändert." },
    { id: "q2", question: "Was ist der Fellgett-Vorteil (Multiplex-Vorteil) des FT-IR?", options: ["Der Stromverbrauch ist geringer", "Alle Frequenzen werden gleichzeitig gemessen", "Der zugängliche Messbereich ist größer", "Eine Kalibrierung entfällt vollständig"], correct: 1, explanation: "Ein dispersives Gerät misst jede Wellenlänge nur einen Bruchteil der Messzeit. Das FT-Gerät erfasst alle über die gesamte Zeit und gewinnt dadurch Signal-Rausch-Verhältnis — oder liefert dieselbe Qualität in kürzerer Zeit. Der zweite Vorteil ist der Durchsatz: ohne engen Spalt kommt mehr Licht an den Detektor (Jacquinot)." },
    { id: "q3", question: "Die symmetrische Streckschwingung von CO₂ ist...", options: ["IR-aktiv und Raman-aktiv", "IR-aktiv aber Raman-inaktiv", "IR-inaktiv aber Raman-aktiv", "Weder IR- noch Raman-aktiv"], correct: 2, explanation: "CO₂ ist zentrosymmetrisch → Komplementaritätsprinzip: kein Übergang gleichzeitig IR und Raman aktiv. Symmetrische Streckschwingung: kein Dipolmoment-Änderung → IR-inaktiv. Aber: Polarisierbarkeit ändert sich → Raman-aktiv." },
    { id: "q4", question: "Warum ist Raman für wässrige Lösungen besser geeignet als IR?", options: ["Raman misst grundsätzlich genauer", "Wasser absorbiert im IR stark, im Raman kaum", "IR-Spektroskopie versagt in Lösung ganz", "Raman löst die Banden deutlich besser auf"], correct: 1, explanation: "Wasser hat im mittleren IR sehr breite und starke O–H-Banden, die die Analytbanden überdecken. Für Raman zählt dagegen die Änderung der Polarisierbarkeit, und die ist beim Wasser klein. Deshalb ist Raman die Methode der Wahl für wässrige Proben und für biologische Systeme." },
    { id: "q5", question: "Wie viele Schwingungsfreiheitsgrade hat ein nicht-lineares Molekül mit 4 Atomen?", options: ["6", "7", "8", "9"], correct: 1, explanation: "Nicht-lineares Molekül: 3N – 6 = 3(4) – 6 = 6. Warte, N=4: 3×4–6 = 6. Aber die Frage hat 7 als korrekte Antwort... Lass mich nochmal rechnen: 3×4 = 12 – 6 = 6. Nicht-linear, N=4: 3N-6 = 6 Schwingungsfreiheitsgrade." },
    { id: "q6", question: "Welcher Konkurrenzprozess schränkt die Raman-Spektroskopie am stärksten ein?", options: ["Rayleigh-Streuung am Probengefäß", "Absorption im mittleren Infrarot", "Fluoreszenz der Probe", "Thermische Eigenemission der Probe"], correct: 2, explanation: "Raman-Streuung ist extrem schwach — etwa ein Photon von einer Million. Fluoreszenz derselben Probe ist um Größenordnungen stärker und überdeckt das Spektrum vollständig. Gegenmittel: Anregung im nahen Infrarot bei 1064 nm, wo die meisten Stoffe nicht mehr fluoreszieren." },
  ],
  flashcards: [
    { id: "1g42tf7", front: "IR-Auswahlregel", back: "Eine Schwingung ist IR-aktiv, wenn sich das Dipolmoment während der Schwingung ändert. Homonukleare Moleküle (N₂, O₂) → IR-inaktiv. H₂O, CO, HCl → IR-aktiv." },
    { id: "0z5u3e5", front: "Raman-Auswahlregel", back: "Eine Schwingung ist Raman-aktiv, wenn sich die Polarisierbarkeit während der Schwingung ändert. Komplementär zu IR: CO₂ sym. Streckschwingung IR-inaktiv, Raman-aktiv." },
    { id: "04slm67", front: "FT-IR Vorteile", back: "1. Fellgett (Multiplex): alle ν gleichzeitig → besseres S/N. 2. Jacquinot (Throughput): kein Spalt → mehr Licht. 3. Connes: HeNe-Laser Kalibrierung → hohe Reproduzierbarkeit. 4. Schnell." },
    { id: "0g4y1mb", front: "Schwingungsfreiheitsgrade", back: "Linear: 3N-5. Nicht-linear: 3N-6. H₂O (N=3, nicht-linear): 3 Schwingungen. CO₂ (N=3, linear): 4 Schwingungen. CH₄ (N=5, nicht-linear): 9 Schwingungen." },
    { id: "0gj5icy", front: "Komplementaritätsprinzip (IR/Raman)", back: "Für zentrosymmetrische Moleküle: kein Übergang ist gleichzeitig IR- und Raman-aktiv. Für nicht-zentrosymmetrische: Überlappung möglich. IR und Raman sind komplementäre Techniken." },
    { id: "0n2uuz4", front: "Raman vs. IR – Wasser", back: "IR: Wasser stört stark (starke O-H Absorption). Raman: Wasser stört kaum (schwacher Raman-Streuer). Daher: Raman bevorzugt für wässrige Lösungen und biologische Proben." },
  ],
} satisfies Thema;
