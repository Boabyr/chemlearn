import type { Thema } from '../../../content/schema'

export const topic = {
  id: "16-atomspektrometrie",
  title: "Atomspektrometrie",
  subtitle: "AAS, AES (ICP), Flammen, Graphitrohr, Atomisierung",
  icon: "⚛️",
  estimatedMinutes: 75,
  theory: `


## Grundprinzip

Atomspektrometrie: Messung von Absorption oder Emission einzelner Atome.
Voraussetzung: Atomisierung der Probe (Überführung in gasförmige Atome).

## Atomabsorptionsspektrometrie (AAS)

**Prinzip:** Freie Atome absorbieren Licht bei charakteristischer Wellenlänge.
A = ε · N · d  (N = Atomzahldichte statt Konzentration)

**Komponenten:**
1. **Hohlkathodenlampe (HKL):** Lichtquelle → emittiert extrem schmale Linien des zu bestimmenden Elements!
   Warum keine Kontinuumslampe? → Die Atomlinie ist so schmal (~0,002nm), dass eine Kontinuumslampe viel zu wenig Licht genau bei dieser Wellenlänge liefert → schlechtes S/N.
2. **Atomisator:** Flamme oder Graphitrohr
3. **Monochromator**
4. **Detektor**

**Flammen-AAS:**
- Luft/Acetylen: ~2300°C, für viele Elemente
- N₂O/Acetylen: ~2700°C, für refraktäre Elemente (Al, Si, Ti)
- Durchfluss: Probe als Aerosol in Flamme

**Graphitrohr-AAS (GFAAS/ET-AAS):**
- Probe in Graphitrohr → elektrisch auf 2700°C erhitzt
- 100× empfindlicher als Flammen-AAS!
- Alle Atome in optischen Weg → bessere Ausnutzung
- Für Spurenanalytik

## Atomemissionsspektrometrie (AES/OES)

**Prinzip:** Angeregte Atome emittieren charakteristische Linien.

**ICP-AES/ICP-OES (häufigster Aufbau):**
- ICP = Inductively Coupled Plasma
- Plasma: Argon, ~6000-10000°C (höchste Temperatur im Analytikbereich!)
- Zone höchster Temperatur: Induktionsspule / Plasmafackel
- Multielementanalyse in einem Durchgang!

**Aufbau ICP:**
1. Probeneinführung (Zerstäuber)
2. Torch (3 konzentrische Rohre)
3. RF-Spule (Hochfrequenz, ~27 MHz)
4. Plasma (~8000°C)
5. Detektor (polychromator oder CCD)

**Vorteile ICP-AES:**
- Multielement (bis 70 Elemente gleichzeitig)
- Weiter Messbereich
- Hohe Temperatur → wenig chemische Interferenzen

**Nachweisgrenzen:** ICP-MS < GFAAS < ICP-AES < Flammen-AAS

## Vergleich Methoden

| Methode | Temperatur | Elemente | LOD |
|---|---|---|---|
| Flammen-AAS | ~2300°C | 1 | μg/L |
| GFAAS | ~2700°C | 1 | ng/L |
| ICP-OES | ~8000°C | 70+ | μg/L |
| ICP-MS | ~8000°C | 70+ | ng/L–pg/L |

## Störungen und ihre Gegenmittel

**Spektrale Störung:** Eine fremde Linie fällt mit der Analytlinie zusammen. Abhilfe:
andere Linie wählen oder höher auflösen. In der ICP-MS heißt derselbe Fall
**isobare Interferenz** — ⁴⁰Ar¹⁶O⁺ stört auf Masse 56 die Bestimmung von ⁵⁶Fe. Abhilfe
dort: Kollisionszelle mit Helium oder eine störungsfreie Alternativmasse.

**Chemische Störung:** Der Analyt bildet schwerflüchtige Verbindungen und wird nicht
vollständig atomisiert. Klassiker: Phosphat bindet Calcium. Abhilfe: heißere Flamme
(N₂O/Acetylen) oder ein Freisetzungsreagenz wie Lanthan, das das Phosphat abfängt.

**Ionisationsstörung:** Leicht ionisierbare Begleitelemente wie Natrium und Kalium
drücken die Ionisation des Analyten und verändern das Signal. Abhilfe: einen
Ionisationspuffer im Überschuss zugeben, sodass die Störung für alle Proben gleich groß
ist.

**Untergrundabsorption:** Streuung an Partikeln und Molekülbanden täuschen Absorption vor.
Abhilfe: Untergrundkorrektur mit Deuteriumlampe oder nach Zeeman.

## Das Temperaturprogramm des Graphitrohrs

Die Probe wird nicht auf einmal erhitzt, sondern in Stufen:

1. **Trocknen** (~110 °C): Lösungsmittel verdampft, ohne zu spritzen
2. **Veraschen/Pyrolyse** (300–1200 °C): die Matrix wird zerstört und ausgetrieben,
   der Analyt muss dabei noch bleiben
3. **Atomisieren** (~2000–2700 °C): das Messsignal entsteht als kurzer Peak
4. **Ausheizen** (~2700 °C): Reste raus, damit die nächste Probe nicht verschleppt wird

Die Kunst liegt in Schritt 2: möglichst heiß, um die Matrix loszuwerden, aber nicht so
heiß, dass der Analyt mitgeht. Für flüchtige Elemente wie Cd oder Pb setzt man dafür
Matrixmodifier zu, die den Analyten thermisch stabilisieren.


`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "atomabsorption",
      name: "Absorption in der AAS",
      equation: "A = k · N · d",
      variables: [
        { id: "A", label: "Absorption", symbol: "A", unit: "—", description: "Gemessene Extinktion" },
        { id: "k", label: "Atomarer Absorptionskoeffizient", symbol: "k", unit: "cm²", description: "Elementspezifisch, gilt für die gewählte Linie" },
        { id: "N", label: "Atomzahldichte", symbol: "N", unit: "Atome/cm³", description: "Freie Atome im Strahlengang" },
        { id: "d", label: "Absorptionsweg", symbol: "d", unit: "cm", description: "Länge der Flamme oder des Graphitrohrs" },
      ],
      umstellungen: [
        { solveFor: "A", expr: "k * N * d" },
        { solveFor: "N", expr: "A / (k * d)" },
        { solveFor: "d", expr: "A / (k * N)" },
        { solveFor: "k", expr: "A / (N * d)" },
      ],
      hints: ["Formal dasselbe Gesetz wie Lambert-Beer, nur steht die Atomzahldichte N an der Stelle der Konzentration. Deshalb muss die Probe erst atomisiert werden.", "Das Graphitrohr ist rund hundertmal empfindlicher als die Flamme, weil alle Atome gleichzeitig im Strahlengang stehen statt kontinuierlich durchzuströmen — N wird größer, nicht k."],
    },
  },
  quiz: [
    { id: "q1", question: "Warum kann in der AAS keine Kontinuumslampe (z.B. Deuteriumlampe) als Lichtquelle verwendet werden?", options: ["Zu teuer", "Die Atomabsorptionslinie ist extrem schmal (~0,002nm) → Kontinuumslampe liefert zu wenig Licht genau bei dieser Wellenlänge → sehr schlechtes Signal/Rausch-Verhältnis", "Kontinuumslampen funktionieren nur im UV", "Die Wellenlänge stimmt nicht"], correct: 1, explanation: "Atomabsorptionslinien sind extrem schmal (0,002-0,005nm). Eine Kontinuumslampe verteilt ihre Intensität über einen breiten Bereich → nur winziger Bruchteil landet auf der Absorptionslinie → S/N sehr schlecht. Lösung: Hohlkathodenlampe (HKL) des jeweiligen Elements → emittiert nur die schmalen Linien dieses Elements." },
    { id: "q2", question: "Wie hoch ist die Temperatur im ICP-Plasma und warum ist sie für die Analytik vorteilhaft?", options: ["~500°C – für thermisch labile Verbindungen", "~2300°C – wie Acetylen-Flamme", "~6000-10000°C – vollständige Atomisierung, keine chemischen Interferenzen, hohe Anregungsenergie", "~300°C – schonende Methode"], correct: 2, explanation: "ICP: 6000-10000°C (höchste in der Routineanalytik). Vorteile: vollständige Atomisierung und Ionisierung, kaum chemische Interferenzen, breites Energiespektrum für Multielementanalyse. Zone der höchsten Temperatur: im Induktionskern der Plasmafackel." },
    { id: "q3", question: "Welche Atomisierungsmethode hat die niedrigste Nachweisgrenze?", options: ["Flammen-AAS", "ICP-OES", "Graphitrohr-AAS (GFAAS)", "Flammen-OES"], correct: 2, explanation: "Reihe: ICP-MS < GFAAS < ICP-OES < Flammen-AAS. GFAAS: Probe wird vollständig im optischen Weg atomisiert (keine Verdünnung durch Trägergas wie in Flamme) → 100-1000× empfindlicher als Flammen-AAS. Für Spurenanalytik im ng/L-Bereich." },
    { id: "q4", question: "Was ist der Hauptvorteil der ICP-OES gegenüber AAS?", options: ["Niedrigere Nachweisgrenze", "Multielementanalyse: bis zu 70 Elemente gleichzeitig in einem Probelauf", "Einfacherer Aufbau", "Günstigere Betriebskosten"], correct: 1, explanation: "ICP-OES/ICP-AES: polychromatischer Detektor (Echelle-Spektrometer + CCD) erfasst alle Emissionslinien gleichzeitig. Bis zu 70 Elemente in einem 3-Minuten-Lauf! AAS: ein Element pro Messung (Elementwechsel = HKL-Wechsel)." },
    { id: "q5", question: "Warum wird für die Bestimmung von Al in der AAS N₂O/Acetylen-Flamme statt Luft/Acetylen verwendet?", options: ["Billiger", "N₂O/Acetylen ist heißer (~2700°C) und verhindert Bildung von Al₂O₃ (refraktäres Oxid) – Al-AO₃ kann in kühler Flamme nicht dissoziiert werden", "Al absorbiert nur im NIR", "Sicherheitsgründe"], correct: 1, explanation: "Al bildet in Luft/Acetylen (~2300°C) stabiles Al₂O₃ → kaum freie Al-Atome → schlechtes Signal. N₂O/Acetylen: ~2700°C + reduzierende Atmosphäre → Al₂O₃ dissoziiert → freie Al-Atome messbar. Gleiches gilt für Si, Ti, W (refraktäre Elemente)." },
    { id: "q6", question: "Warum benutzt die AAS eine Hohlkathodenlampe und keine Kontinuumsquelle?", options: ["Weil Kontinuumsquellen zu heiß werden", "Weil die Atomlinie nur etwa 0,002 nm breit ist und eine Kontinuumsquelle dort viel zu wenig Licht liefert", "Weil die Hohlkathodenlampe billiger ist", "Weil eine Kontinuumsquelle das Graphitrohr beschädigen würde"], correct: 1, explanation: "Die Absorptionslinie freier Atome ist extrem schmal. Ein Monochromator kann aus einem Kontinuum nur ein deutlich breiteres Band herausschneiden, sodass der absorbierte Anteil im Rauschen untergeht. Die Hohlkathodenlampe emittiert genau die Linie des gesuchten Elements." },
  ],
  flashcards: [
    { id: "0mvkilc", front: "AAS – Warum Hohlkathodenlampe?", back: "Atomlinien extrem schmal (~0,002nm). Kontinuumslampe: zu wenig Licht genau auf der Linie → schlechtes S/N. HKL: emittiert nur die Linien des jeweiligen Elements → perfekte spektrale Überlappung." },
    { id: "02leb1m", front: "GFAAS vs. Flammen-AAS", back: "GFAAS (Graphitrohr): Probe vollständig im optischen Weg → LOD: ng/L. Flamme: Probe verdünnt durch Trägergas → LOD: μg/L. GFAAS: 100-1000× empfindlicher. Nachteile: langsamer, teurer, mehr Matrixeffekte." },
    { id: "1gthgj4", front: "ICP-Plasma", back: "Argon-Plasma, 6000-10000°C, RF-Induktion (~27 MHz). Zone höchster Temperatur: Induktionskern. Multielement (70+). ICP-OES: Emission. ICP-MS: Massenspektrometrie (niedrigste LOD: pg/L)." },
    { id: "1940k5g", front: "Nachweisgrenzen-Reihe", back: "ICP-MS << GFAAS < ICP-OES < Flammen-AAS. ICP-MS: pg/L. GFAAS: ng/L. ICP-OES: μg/L. Flammen-AAS: μg/L. Für Spurenanalytik ppb: GFAAS oder ICP-MS." },
    { id: "1c1lwv3", front: "Warum ist das ICP heißer als jede Flamme", back: "Im induktiv gekoppelten Plasma heizt ein Hochfrequenzfeld (etwa 27 MHz) Argon auf 6000 bis 10000 K. Eine Luft/Acetylen-Flamme erreicht nur rund 2300 °C. Die hohe Temperatur atomisiert vollständig und unterdrückt chemische Interferenzen, und sie erlaubt die gleichzeitige Bestimmung von über 70 Elementen." },
    { id: "1k6063f", front: "Nachweisgrenzen der Atomspektrometrie im Vergleich", back: "ICP-MS ist am empfindlichsten (ng/L bis pg/L), dann Graphitrohr-AAS (ng/L), dann ICP-OES und Flammen-AAS (jeweils µg/L). Die Reihenfolge lautet ICP-MS < GFAAS < ICP-OES < Flammen-AAS, wobei kleiner hier besser heißt." },
  ],
} satisfies Thema;
