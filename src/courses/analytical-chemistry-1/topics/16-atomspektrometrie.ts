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
`,
  quiz: [
    { id: "q1", question: "Warum kann in der AAS keine Kontinuumslampe (z.B. Deuteriumlampe) als Lichtquelle verwendet werden?", options: ["Zu teuer", "Die Atomabsorptionslinie ist extrem schmal (~0,002nm) → Kontinuumslampe liefert zu wenig Licht genau bei dieser Wellenlänge → sehr schlechtes Signal/Rausch-Verhältnis", "Kontinuumslampen funktionieren nur im UV", "Die Wellenlänge stimmt nicht"], correct: 1, explanation: "Atomabsorptionslinien sind extrem schmal (0,002-0,005nm). Eine Kontinuumslampe verteilt ihre Intensität über einen breiten Bereich → nur winziger Bruchteil landet auf der Absorptionslinie → S/N sehr schlecht. Lösung: Hohlkathodenlampe (HKL) des jeweiligen Elements → emittiert nur die schmalen Linien dieses Elements." },
    { id: "q2", question: "Wie hoch ist die Temperatur im ICP-Plasma und warum ist sie für die Analytik vorteilhaft?", options: ["~500°C – für thermisch labile Verbindungen", "~2300°C – wie Acetylen-Flamme", "~6000-10000°C – vollständige Atomisierung, keine chemischen Interferenzen, hohe Anregungsenergie", "~300°C – schonende Methode"], correct: 2, explanation: "ICP: 6000-10000°C (höchste in der Routineanalytik). Vorteile: vollständige Atomisierung und Ionisierung, kaum chemische Interferenzen, breites Energiespektrum für Multielementanalyse. Zone der höchsten Temperatur: im Induktionskern der Plasmafackel." },
    { id: "q3", question: "Welche Atomisierungsmethode hat die niedrigste Nachweisgrenze?", options: ["Flammen-AAS", "ICP-OES", "Graphitrohr-AAS (GFAAS)", "Flammen-OES"], correct: 2, explanation: "Reihe: ICP-MS < GFAAS < ICP-OES < Flammen-AAS. GFAAS: Probe wird vollständig im optischen Weg atomisiert (keine Verdünnung durch Trägergas wie in Flamme) → 100-1000× empfindlicher als Flammen-AAS. Für Spurenanalytik im ng/L-Bereich." },
    { id: "q4", question: "Was ist der Hauptvorteil der ICP-OES gegenüber AAS?", options: ["Niedrigere Nachweisgrenze", "Multielementanalyse: bis zu 70 Elemente gleichzeitig in einem Probelauf", "Einfacherer Aufbau", "Günstigere Betriebskosten"], correct: 1, explanation: "ICP-OES/ICP-AES: polychromatischer Detektor (Echelle-Spektrometer + CCD) erfasst alle Emissionslinien gleichzeitig. Bis zu 70 Elemente in einem 3-Minuten-Lauf! AAS: ein Element pro Messung (Elementwechsel = HKL-Wechsel)." },
    { id: "q5", question: "Warum wird für die Bestimmung von Al in der AAS N₂O/Acetylen-Flamme statt Luft/Acetylen verwendet?", options: ["Billiger", "N₂O/Acetylen ist heißer (~2700°C) und verhindert Bildung von Al₂O₃ (refraktäres Oxid) – Al-AO₃ kann in kühler Flamme nicht dissoziiert werden", "Al absorbiert nur im NIR", "Sicherheitsgründe"], correct: 1, explanation: "Al bildet in Luft/Acetylen (~2300°C) stabiles Al₂O₃ → kaum freie Al-Atome → schlechtes Signal. N₂O/Acetylen: ~2700°C + reduzierende Atmosphäre → Al₂O₃ dissoziiert → freie Al-Atome messbar. Gleiches gilt für Si, Ti, W (refraktäre Elemente)." },
  ],
  flashcards: [
    { front: "AAS – Warum Hohlkathodenlampe?", back: "Atomlinien extrem schmal (~0,002nm). Kontinuumslampe: zu wenig Licht genau auf der Linie → schlechtes S/N. HKL: emittiert nur die Linien des jeweiligen Elements → perfekte spektrale Überlappung." },
    { front: "GFAAS vs. Flammen-AAS", back: "GFAAS (Graphitrohr): Probe vollständig im optischen Weg → LOD: ng/L. Flamme: Probe verdünnt durch Trägergas → LOD: μg/L. GFAAS: 100-1000× empfindlicher. Nachteile: langsamer, teurer, mehr Matrixeffekte." },
    { front: "ICP-Plasma", back: "Argon-Plasma, 6000-10000°C, RF-Induktion (~27 MHz). Zone höchster Temperatur: Induktionskern. Multielement (70+). ICP-OES: Emission. ICP-MS: Massenspektrometrie (niedrigste LOD: pg/L)." },
    { front: "Nachweisgrenzen-Reihe", back: "ICP-MS << GFAAS < ICP-OES < Flammen-AAS. ICP-MS: pg/L. GFAAS: ng/L. ICP-OES: μg/L. Flammen-AAS: μg/L. Für Spurenanalytik ppb: GFAAS oder ICP-MS." },
  ],
};
