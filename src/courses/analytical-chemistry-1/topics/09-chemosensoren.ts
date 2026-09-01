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
    { id: "q1", question: "Welches sind die zwei Hauptkomponenten eines Chemosensors?", options: ["Lichtquelle und Detektor", "Rezeptorelement (selektive Erkennung) und Transducer (Signal-Umwandlung)", "Kathode und Anode", "Monochromator und Detektor"], correct: 1, explanation: "Chemosensor = Rezeptorelement + Transducer. Rezeptor: selektive molekulare Erkennung des Analyten (Enzym, Antikörper, Ionophor...). Transducer: wandelt chemische Information in elektrisches/optisches Signal um." },
    { id: "q2", question: "Was misst ein Quarzoszillator (QCM) und warum ist er so empfindlich?", options: ["Er misst elektrischen Strom im pA-Bereich", "Er misst Frequenzänderungen durch Massenanlagerung (Sauerbrey-Gleichung), empfindlich bis ng/cm²", "Er misst Fluoreszenzintensität", "Er misst Impedanzänderungen"], correct: 1, explanation: "QCM (Quartz Crystal Microbalance): Quarz schwingt bei Resonanzfrequenz f₀. Massenanlagerung (Δm) → Frequenzabfall (Δf). Sauerbrey: Δf ≈ −C·Δm. Empfindlichkeit: ng/cm² → sehr sensitiv. Anwendung: Gassensoren, Biosensoren, Schichtdicke." },
    { id: "q3", question: "Wie funktioniert ein amperometrischer Glucosesensor der 1. Generation?", options: ["Er misst die Fluoreszenz des Glucosemoleküls", "GOD oxidiert Glucose → H₂O₂, das an Pt-Elektrode oxidiert wird → messbarer Strom", "Er misst den pH-Wert der Lösung", "Er bestimmt die optische Drehung"], correct: 1, explanation: "1. Gen.: Glucose + O₂ → Gluconolacton + H₂O₂ (durch GOD, Glucoseoxidase). H₂O₂ → 2H⁺ + O₂ + 2e⁻ (an Pt-Elektrode, +0.65 V vs. SCE). Strom i ∝ [Glucose]. Limitation: O₂-Abhängigkeit, H₂O₂ kann Enzym schädigen." },
    { id: "q4", question: "Was ist der Vorteil von Mediatoren in Glucosesensoren der 2. Generation?", options: ["Sie erhöhen die Spezifität für Glucose", "Sie ersetzen O₂ als Elektronenakzeptor → O₂-Unabhängigkeit der Messung", "Sie verlängern die Haltbarkeit des Sensors", "Sie machen den Sensor billiger"], correct: 1, explanation: "2. Gen. Glucosesensor: Mediator (z.B. Ferrocen, TMPD) ersetzt O₂. Glucose + Med_ox → Gluconolacton + Med_red. Med_red → Med_ox + ne⁻ (an Elektrode). Vorteil: O₂-unabhängig → auch in O₂-armen Geweben messbar (z.B. implantierbare Sensoren)." },
    { id: "q5", question: "Was unterscheidet einen Biosensor von einem normalen Chemosensor?", options: ["Biosensoren sind immer optisch", "Das Rezeptorelement ist ein biologisches Makromolekül (Enzym, Antikörper, DNA, Rezeptorprotein)", "Biosensoren messen nur Glucose", "Biosensoren sind größer als Chemosensoren"], correct: 1, explanation: "IUPAC-Definition Biosensor: Chemosensor mit biologischem Rezeptorelement. Typen: Enzymsensor (GOD), Immunosensor (Antikörper-Antigen), DNA-Sensor (Hybridisierung), Rezeptorsensor. Transducer kann elektrochemisch, optisch oder massensensitiv sein." },
    { id: "q6", question: "Welche Anwendung hat ein Chemosensor in der Point-of-Care Diagnostik?", options: ["Massenspektrometrie", "Schnelle Patientennahe Analyse ohne Zentrallabor (z.B. Blutglucose, Troponin beim Herzinfarkt)", "Bestimmung von Röntgenstrukturen", "Chromatographische Trennung"], correct: 1, explanation: "Point-of-Care (POC): Analyse direkt beim Patienten ohne Zentrallabor. Miniaturisierte Sensoren (Lab-on-a-Chip). Beispiele: Blutglucose (Diabetes), Troponin (Herzinfarkt-Diagnose in Minuten), Blutgase (O₂, CO₂, pH). Vorteile: schnell, wenig Probe, kostengünstig." },
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
