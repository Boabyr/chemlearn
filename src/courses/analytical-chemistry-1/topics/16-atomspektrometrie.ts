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
A = k · N · d  (N = Atomzahldichte statt Konzentration, k = atomarer Absorptionskoeffizient)

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
  interactives: [
    {
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
      {
      "type": "apparatus-matching",
      "title": "Drei Wege, Atome zu erzeugen",
      "description": "Alle drei atomisieren die Probe — bei sehr verschiedenen Temperaturen.",
      "explanation": "Die Flammen-AAS lässt die Lampe quer durch eine Schlitzflamme von rund 2300 °C strahlen; die Probe strömt kontinuierlich durch. Beim Graphitrohr wird die ganze Probe auf einmal in einem elektrisch geheizten Rohr atomisiert und bleibt im Strahlengang — daher der Faktor hundert an Empfindlichkeit. Das ICP hat gar keine Lampe: das Argonplasma bei 8000 °C regt die Atome selbst zur Emission an, und zwar alle gleichzeitig.",
      "paare": [
        {
          "apparaturId": "flame-aas",
          "label": "Flammen-AAS",
          "hinweis": "Lampe strahlt quer durch die Flamme."
        },
        {
          "apparaturId": "graphite-furnace",
          "label": "Graphitrohr-AAS",
          "hinweis": "Rohr längs im Strahlengang."
        },
        {
          "apparaturId": "icp-oes",
          "label": "ICP-OES",
          "hinweis": "Keine Lampe — das Plasma strahlt selbst."
        }
      ]
    },
  ],
  quiz: [
    { id: "q1", question: "Warum kann in der AAS keine Kontinuumslampe (z.B. Deuteriumlampe) als Lichtquelle verwendet werden?", options: ["Kontinuumslampen sind zu teuer", "Die Atomlinie ist zu schmal für ein Kontinuum", "Kontinuumslampen strahlen nur im UV", "Die Wellenlänge lässt sich nicht einstellen"], correct: 1, explanation: "Die Absorptionslinie freier Atome ist nur etwa 0,002 nm breit. Ein Monochromator schneidet aus einem Kontinuum ein viel breiteres Band heraus, sodass der absorbierte Anteil im Rauschen untergeht. Die Hohlkathodenlampe emittiert genau die Linie des gesuchten Elements — deshalb ein Lampenwechsel je Element." },
    { id: "q2", question: "Wie hoch ist die Temperatur im ICP-Plasma und warum ist sie für die Analytik vorteilhaft?", options: ["Etwa 500 °C, schonend für thermisch labile Stoffe", "Etwa 2300 °C, wie eine Luft/Acetylen-Flamme", "Etwa 6000 bis 10000 °C, vollständige Atomisierung", "Etwa 300 °C, besonders energiesparend im Betrieb"], correct: 2, explanation: "Das Argonplasma wird durch ein Hochfrequenzfeld von etwa 27 MHz geheizt. Bei diesen Temperaturen zerfällt praktisch jede Verbindung, chemische Interferenzen verschwinden, und die Anregungsenergie reicht für über 70 Elemente gleichzeitig. Eine Luft/Acetylen-Flamme bleibt bei rund 2300 °C." },
    { id: "q3", question: "Welche Atomisierungsmethode hat die niedrigste Nachweisgrenze?", options: ["Flammen-AAS mit Luft/Acetylen", "ICP-OES mit Argonplasma", "Graphitrohr-AAS (GFAAS)", "Flammenemission (Flammen-OES)"], correct: 2, explanation: "Die Reihenfolge lautet ICP-MS < GFAAS < ICP-OES < Flammen-AAS, wobei kleiner besser heißt. Unter den hier genannten Atomisierungsmethoden liegt das Graphitrohr vorn: Die gesamte Probe wird auf einmal atomisiert und bleibt im Strahlengang, statt kontinuierlich durchzuströmen — das bringt etwa den Faktor hundert gegenüber der Flamme." },
    { id: "q4", question: "Was ist der Hauptvorteil der ICP-OES gegenüber AAS?", options: ["Die deutlich niedrigere Nachweisgrenze je Element", "Die Multielementanalyse in einem Durchgang", "Der einfachere Geräteaufbau", "Die geringeren Betriebskosten"], correct: 1, explanation: "Das Plasma regt alle Elemente gleichzeitig an, und ein Polychromator oder CCD erfasst die Linien parallel — bis zu 70 Elemente je Probe. Bei den Nachweisgrenzen ist das Graphitrohr besser, und Aufbau wie Argonverbrauch sind beim ICP deutlich aufwendiger." },
    { id: "q5", question: "Warum wird für die Bestimmung von Al in der AAS N₂O/Acetylen-Flamme statt Luft/Acetylen verwendet?", options: ["Lachgas ist im Betrieb billiger", "Die heißere Flamme spaltet das stabile Al₂O₃", "Aluminium absorbiert nur im nahen Infrarot", "Aus Gründen des Arbeitsschutzes"], correct: 1, explanation: "Aluminium bildet in der Flamme sehr stabile Oxide. Luft/Acetylen erreicht rund 2300 °C und schafft die Dissoziation nicht; Distickstoffmonoxid/Acetylen kommt auf etwa 2700 °C und setzt die Atome frei. Dieselbe Überlegung gilt für andere refraktäre Elemente wie Silicium und Titan." },
    { id: "q6", question: "Eine Probe mit viel Natrium liefert für Kalium ein verändertes Signal. Um welche Störung handelt es sich und was hilft?", options: ["Spektrale Störung — eine andere Analysenlinie wählen und nachmessen", "Ionisationsstörung — einen Ionisationspuffer im Überschuss zugeben", "Chemische Störung — heißere Flamme verwenden", "Untergrundabsorption — Deuteriumlampe zuschalten"], correct: 1, explanation: "Leicht ionisierbare Elemente wie Natrium liefern in der Flamme viele freie Elektronen. Diese drücken das Ionisationsgleichgewicht des Analyten zurück, sodass mehr neutrale Atome vorliegen und das Signal steigt. Weil der Effekt von der Probenzusammensetzung abhängt, gibt man allen Proben und Standards denselben Überschuss eines leicht ionisierbaren Salzes zu — dann ist die Störung überall gleich groß und fällt heraus." },
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
