import type { Thema } from '../../../content/schema'

export const topic = {
  id: "09-chemosensoren",
  title: "Chemosensoren & Sensorik",
  subtitle: "Biosensoren, Gassensoren, miniaturisierte Analysesysteme",
  icon: "🔬",
  estimatedMinutes: 60,
  theory: `
## Was ist ein Chemosensor?

**Definition:** Ein Chemosensor ist ein miniaturisiertes Analysegerät, das einen Analyten direkt (ohne oder mit minimalem Probenaufbereitungsschritt) in einem kontinuierlichen und reversiblen Signal misst.

**Komponenten:**
1. **Rezeptorelement:** Selektive Wechselwirkung mit Analyt (molekulares Erkennen)
2. **Transducer:** Umwandlung der chemischen Information in ein elektrisches Signal

## Transducer-Typen

| Transducer | Mesgröße | Beispiel |
|---|---|---|
| Elektrochemisch | Strom, Spannung, Impedanz | Glucosesensor (amperometrisch) |
| Optisch | Absorption, Fluoreszenz | Faseroptischer O₂-Sensor |
| Massensensitiv | Frequenzänderung | Quarzoszillator (QCM) |
| Thermisch | Temperatur | Enzymthermistor |

## Glucosesensor (Amperometrisch)

**Wichtigstes Beispiel!**

**Prinzip (1. Generation):**
Glucose + O₂ → Gluconolacton + H₂O₂  (Glucoseoxidase, GOD)
H₂O₂ → 2H⁺ + O₂ + 2e⁻ (an Platinelektrode, +0.65 V vs. SCE)

**Messung:** Strom proportional zur Glucosekonzentration.

**Problem:** O₂-Abhängigkeit, H₂O₂-Bildung kann Enzym inaktivieren.

**2. Generation:** Mediatoren ersetzen O₂ (z.B. Ferrocen, TMPD):
Glucose + Mediator_ox → Gluconolacton + Mediator_red
Mediator_red → Mediator_ox + ne⁻ (an Elektrode)

**3. Generation:** Direkter Elektronentransfer (DET) Enzym → Elektrode.

## Quarzoszillator (QCM – Quartz Crystal Microbalance)

**Prinzip:** Piezoelektrisch aktiver Quarzkristall schwingt bei Resonanzfrequenz f₀.
Bei Massenanlagerung an Oberfläche: Frequenz nimmt ab!

**Sauerbrey-Gleichung:**
Δf = −2 · f₀² · Δm / (A · √(ρ_q · G_q))

Vereinfacht: Δf ≈ −C · Δm  (C = Empfindlichkeitskonstante)

**Empfindlichkeit:** ng/cm² → sehr sensitiv!

**Anwendungen:**
- Gassensorik (Dämpfe, Gerüche)
- Biosensoren (Antikörper-Antigen)
- Schichtdickenmessung bei Dünnfilmabscheidung

## Miniaturisierung – Lab-on-a-Chip

**Microfluidik:** Kanäle im μm-Bereich, sehr geringe Probenmengen (nL–μL)
**Vorteile:**
- Minimaler Probenbedarf
- Schnelle Analyse
- Parallelisierung (Arrays)
- Tragbare Geräte (Point-of-Care)

**Biosensoren (Definition nach IUPAC):**
Chemosensor bei dem das Rezeptorelement ein biologisches Makromolekül (Enzym, Antikörper, DNA, Rezeptorprotein) ist.

## Wichtige Anwendungsgebiete

- **Medizin:** Glucosemessung (Diabetes), Blutgase, Troponin (Herzinfarkt)
- **Umwelt:** O₃, NO₂, CO in Luft; Schwermetalle in Wasser
- **Lebensmittel:** Frische (Amine), Verderblichkeit, Allergene
- **Industrie:** Prozessüberwachung, Qualitätskontrolle

## Der Glucosesensor als Musterfall

Der Blutzuckersensor zeigt den Aufbau eines Biosensors in Reinform:

1. **Erkennung:** Glucoseoxidase setzt Glucose mit O₂ zu Gluconolacton und H₂O₂ um. Das
   Enzym ist der Grund für die Selektivität — es reagiert mit Glucose und nicht mit den
   übrigen Zuckern im Blut.
2. **Umwandlung:** Der Transducer macht daraus ein elektrisches Signal. In der ersten
   Generation wurde das entstehende H₂O₂ amperometrisch oxidiert.
3. **Auswertung:** Der Strom ist der Glucosekonzentration proportional.

Die zweite Generation ersetzt Sauerstoff durch einen **Mediator** (Ferrocen, Hexacyanoferrat),
der die Elektronen vom Enzym zur Elektrode trägt. Damit hängt das Ergebnis nicht mehr vom
schwankenden Sauerstoffgehalt der Probe ab, und das Arbeitspotential sinkt — bei niedrigerem
Potential stören Ascorbinsäure und Harnsäure weniger.

## Kenngrößen, an denen ein Sensor gemessen wird

- **Selektivität:** Antwortet er nur auf den Analyten? Meist die schwierigste Größe.
- **Empfindlichkeit:** Steigung der Kennlinie, Signal je Konzentrationseinheit
- **Ansprechzeit (t₉₀):** Zeit bis 90 % des Endwerts erreicht sind
- **Reversibilität:** Geht das Signal zurück, wenn der Analyt verschwindet? Ein Sensor,
  der nur einmal anspricht, ist eine Sonde, kein Sensor.
- **Drift und Standzeit:** Wie lange bleibt die Kalibrierung gültig? Enzyme denaturieren,
  Membranen verschmutzen — der Grund, warum Teststreifen Wegwerfartikel sind.
`,
  interactive: {
    type: "apparatus-quiz",
    question: "Amperometrischer Glucosesensor (Clark-Elektrode Typ)",
    targetId: "glucose-sensor",
    explanation: "Der amperometrische Glucosesensor: GOD (Glucoseoxidase) oxidiert Glucose mit O₂ → H₂O₂. Das H₂O₂ wird an einer Pt-Elektrode (+0.65 V) oxidiert → messbarer Strom proportional zur Glucosekonzentration. Klassischer Biosensor (1. Generation).",
    hint1: "GOD = Glucoseoxidase. Glucose → Gluconolacton + H₂O₂. H₂O₂ wird elektrochemisch detektiert.",
    hint2: "Amperometrisch: Strom wird gemessen (im Gegensatz zu potentiometrisch = Spannung). Strom ∝ Glucosekonzentration. Wichtig: O₂-Abhängigkeit ist eine Limitation der 1. Generation.",
    options: [
      {
        id: "glucose-sensor",
        label: "Amperometrischer Glucosesensor (1. Generation)",
        description: "GOD-Enzym + Pt-Elektrode, misst H₂O₂",
      },
      {
        id: "qcm",
        label: "Quarzoszillator (QCM)",
        description: "Massenempfindlich, Frequenzänderung",
      },
      {
        id: "potentiometric-sensor",
        label: "Potentiometrischer Sensor (ISE)",
        description: "Spannungsmessung, Nernst-Gleichung",
      },
      {
        id: "optical-sensor",
        label: "Optischer Fasersensor",
        description: "Fluoreszenz oder Absorption am Faserende",
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Welches sind die zwei Hauptkomponenten eines Chemosensors?", options: ["Lichtquelle und zugehöriger Detektor", "Rezeptorelement und Transducer", "Kathode und Anode einer Messzelle", "Monochromator und Auswerteeinheit"], correct: 1, explanation: "Der Rezeptor erkennt den Analyten selektiv — daher kommt die Spezifität. Der Transducer wandelt dieses Erkennungsereignis in ein elektrisches, optisches oder akustisches Signal um. Alles Weitere ist Auswerteelektronik und gehört nicht zur Definition." },
    { id: "q2", question: "Was misst ein Quarzoszillator (QCM) und warum ist er so empfindlich?", options: ["Er misst Ströme im Pikoampere-Bereich an einer Mikroelektrode", "Er misst die Frequenzänderung durch Massenanlagerung", "Er misst die Intensität der Fluoreszenz", "Er misst Änderungen der Impedanz"], correct: 1, explanation: "Lagert sich Masse auf dem Schwingquarz an, sinkt seine Resonanzfrequenz — der Zusammenhang steht in der Sauerbrey-Gleichung. Weil sich Frequenzen extrem genau messen lassen, reicht die Empfindlichkeit bis in den Nanogramm-pro-Quadratzentimeter-Bereich." },
    { id: "q3", question: "Wie funktioniert ein amperometrischer Glucosesensor der 1. Generation?", options: ["Er misst die Eigenfluoreszenz der Glucose", "Glucoseoxidase liefert H₂O₂, das oxidiert wird", "Er misst den pH-Wert der Probenlösung", "Er bestimmt die optische Drehung der Lösung"], correct: 1, explanation: "Glucoseoxidase setzt Glucose mit Sauerstoff zu Gluconolacton und H₂O₂ um. Das Peroxid wird an einer Platinelektrode oxidiert, und der Strom ist der Glucosekonzentration proportional. Nachteil dieser ersten Generation: Das Ergebnis hängt am Sauerstoffgehalt der Probe." },
    { id: "q4", question: "Was ist der Vorteil von Mediatoren in Glucosesensoren der 2. Generation?", options: ["Sie erhöhen die Spezifität für Glucose", "Sie ersetzen Sauerstoff als Elektronenakzeptor", "Sie verlängern die Haltbarkeit des Sensors", "Sie senken die Herstellungskosten"], correct: 1, explanation: "Der Mediator — etwa Ferrocen oder Hexacyanoferrat — nimmt die Elektronen vom Enzym auf und trägt sie zur Elektrode. Damit hängt das Signal nicht mehr am schwankenden Sauerstoffgehalt, und das nötige Arbeitspotential sinkt, sodass Ascorbinsäure und Harnsäure weniger stören." },
    { id: "q5", question: "Was unterscheidet einen Biosensor von einem normalen Chemosensor?", options: ["Biosensoren arbeiten immer optisch", "Der Rezeptor ist ein biologisches Makromolekül", "Biosensoren messen ausschließlich Glucose", "Biosensoren sind deutlich größer gebaut"], correct: 1, explanation: "Nach IUPAC ist ein Biosensor ein Chemosensor, dessen Rezeptorelement biologischen Ursprungs ist — Enzym, Antikörper, DNA oder Rezeptorprotein. Der Transducer kann elektrochemisch, optisch oder massensensitiv sein; darauf kommt es für die Einordnung nicht an." },
    { id: "q6", question: "Welche Anwendung hat ein Chemosensor in der Point-of-Care Diagnostik?", options: ["Massenspektrometrische Strukturaufklärung", "Patientennahe Schnellanalyse ohne Zentrallabor", "Bestimmung von Kristallstrukturen", "Chromatographische Trennung von Gemischen"], correct: 1, explanation: "Point-of-Care heißt: Messung direkt beim Patienten, Ergebnis in Minuten statt Stunden. Typische Fälle sind Blutzucker beim Diabetes, Blutgase in der Notaufnahme und Troponin beim Verdacht auf Herzinfarkt — überall dort, wo die Zeit bis zum Ergebnis über die Behandlung entscheidet." },
  ],
  flashcards: [
    { id: "05mwoai", front: "Chemosensor – Aufbau", back: "Rezeptorelement (selektive molekulare Erkennung: Enzym, Antikörper, Ionophor) + Transducer (elektrochemisch, optisch, massensensitiv, thermisch). Miniaturisiert, kontinuierlich, reversibel." },
    { id: "1a1gdq6", front: "Glucosesensor Generationen", back: "1. Gen.: GOD → H₂O₂ → Pt-Elektrode (O₂-abhängig). 2. Gen.: Mediator (Ferrocen) ersetzt O₂ (O₂-unabhängig). 3. Gen.: Direkter Elektronentransfer (DET) Enzym → Elektrode." },
    { id: "06cm2gs", front: "Sauerbrey-Gleichung (QCM)", back: "Δf = −C·Δm (vereinfacht). Massenanlagerung → Frequenzabfall. Empfindlichkeit: ng/cm². Anwendungen: Gassensoren, Biosensoren, Schichtdicke in Vakuumdeposition." },
    { id: "1bmz0cm", front: "Biosensor (IUPAC)", back: "Chemosensor mit biologischem Rezeptorelement: Enzym, Antikörper, DNA, Rezeptorprotein. Transducer: beliebig. Biosensor ≠ Chemosensor in vivo." },
    { id: "1y79ufz", front: "Transducer-Typen", back: "Elektrochemisch (amperometrisch, potentiometrisch, impedimetrisch). Optisch (Absorption, Fluoreszenz, SPR). Massensensitiv (QCM, SAW). Thermisch (Enzymthermistor)." },
    { id: "07zvkds", front: "Point-of-Care Diagnostik", back: "Analyse direkt beim Patienten. Miniaturisierte Sensoren (Lab-on-a-Chip, Microfluidik). Vorteile: schnell (min), wenig Probe (μL), kostengünstig, mobil. Beispiele: Glucose, Troponin, Blutgase, CRP." },
  ],
} satisfies Thema;
