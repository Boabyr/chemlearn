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
`,
  interactive: {
    type: "apparatus-quiz",
    question: "Amperometrischer Glucosesensor (Clark-Elektrode Typ)",
    mode: "image-to-name",
    targetId: "glucose-sensor",
    explanation: "Der amperometrische Glucosesensor: GOD (Glucoseoxidase) oxidiert Glucose mit O₂ → H₂O₂. Das H₂O₂ wird an einer Pt-Elektrode (+0.65 V) oxidiert → messbarer Strom proportional zur Glucosekonzentration. Klassischer Biosensor (1. Generation).",
    hint1: "GOD = Glucoseoxidase. Glucose → Gluconolacton + H₂O₂. H₂O₂ wird elektrochemisch detektiert.",
    hint2: "Amperometrisch: Strom wird gemessen (im Gegensatz zu potentiometrisch = Spannung). Strom ∝ Glucosekonzentration. Wichtig: O₂-Abhängigkeit ist eine Limitation der 1. Generation.",
    options: [
      {
        id: "glucose-sensor",
        label: "Amperometrischer Glucosesensor (1. Generation)",
        description: "GOD-Enzym + Pt-Elektrode, misst H₂O₂",
        svg: `<svg viewBox="0 0 300 170" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="60" y="50" width="180" height="90" rx="6" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="150" y="100" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe (Glucose)</text>
          <rect x="75" y="35" width="50" height="25" rx="3" fill="#312e81" stroke="#a78bfa" strokeWidth="1.5"/>
          <text x="100" y="50" textAnchor="middle" fill="#a78bfa" fontSize="7">GOD-Membran</text>
          <line x1="100" y1="60" x2="100" y2="80" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3,2"/>
          <rect x="155" y="35" width="50" height="25" rx="3" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="180" y="47" textAnchor="middle" fill="#60a5fa" fontSize="6">Pt-Elektrode</text>
          <text x="180" y="57" textAnchor="middle" fill="#60a5fa" fontSize="6">+0.65V</text>
          <line x1="180" y1="60" x2="180" y2="80" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="150" y="130" textAnchor="middle" fill="#fbbf24" fontSize="7">H₂O₂ → 2H⁺ + O₂ + 2e⁻</text>
          <rect x="10" y="70" width="45" height="25" rx="3" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="32" y="85" textAnchor="middle" fill="#f87171" fontSize="7">Strom i</text>
          <line x1="55" y1="82" x2="75" y2="82" stroke="#f87171" strokeWidth="1.5"/>
        </svg>`
      },
      {
        id: "qcm",
        label: "Quarzoszillator (QCM)",
        description: "Massenempfindlich, Frequenzänderung",
        svg: `<svg viewBox="0 0 300 150" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <ellipse cx="150" cy="80" rx="80" ry="40" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2"/>
          <text x="150" y="75" textAnchor="middle" fill="#60a5fa" fontSize="8">Quarz AT-cut</text>
          <text x="150" y="87" textAnchor="middle" fill="#fbbf24" fontSize="7">f₀ = 10 MHz</text>
          <rect x="200" y="30" width="70" height="20" rx="3" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="235" y="43" textAnchor="middle" fill="#fbbf24" fontSize="7">Δf → Δm</text>
          <line x1="220" y1="50" x2="195" y2="65" stroke="#fbbf24" strokeWidth="1"/>
          <text x="150" y="130" textAnchor="middle" fill="#64748b" fontSize="7">Sauerbrey: Δf ∝ -Δm</text>
        </svg>`
      },
      {
        id: "potentiometric-sensor",
        label: "Potentiometrischer Sensor (ISE)",
        description: "Spannungsmessung, Nernst-Gleichung",
        svg: `<svg viewBox="0 0 300 140" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="100" y="40" width="100" height="70" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="150" y="80" textAnchor="middle" fill="#2dd4bf" fontSize="7">Probe</text>
          <rect x="115" y="20" width="40" height="25" rx="3" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="135" y="35" textAnchor="middle" fill="#60a5fa" fontSize="6">ISE-Membran</text>
          <rect x="45" y="55" width="50" height="25" rx="3" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="70" y="70" textAnchor="middle" fill="#f87171" fontSize="7">E messen</text>
          <line x1="95" y1="67" x2="115" y2="67" stroke="#f87171" strokeWidth="1.5"/>
        </svg>`
      },
      {
        id: "optical-sensor",
        label: "Optischer Fasersensor",
        description: "Fluoreszenz oder Absorption am Faserende",
        svg: `<svg viewBox="0 0 300 140" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="10" y="55" width="50" height="30" rx="3" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="35" y="73" textAnchor="middle" fill="#fbbf24" fontSize="7">LED/Laser</text>
          <line x1="60" y1="70" x2="200" y2="70" stroke="#60a5fa" strokeWidth="3" strokeDasharray="5,2"/>
          <circle cx="210" cy="70" r="20" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="210" y="73" textAnchor="middle" fill="#2dd4bf" fontSize="6">Sensor-</text>
          <text x="210" y="82" textAnchor="middle" fill="#2dd4bf" fontSize="6">kopf</text>
          <line x1="60" y1="85" x2="150" y2="85" stroke="#f87171" strokeWidth="2" strokeDasharray="4,3"/>
          <rect x="10" y="80" width="50" height="20" rx="3" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="35" y="93" textAnchor="middle" fill="#f87171" fontSize="6">Detektor</text>
          <text x="150" y="120" textAnchor="middle" fill="#64748b" fontSize="7">Optische Faser (bidirektional)</text>
        </svg>`
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
    { front: "Chemosensor – Aufbau", back: "Rezeptorelement (selektive molekulare Erkennung: Enzym, Antikörper, Ionophor) + Transducer (elektrochemisch, optisch, massensensitiv, thermisch). Miniaturisiert, kontinuierlich, reversibel." },
    { front: "Glucosesensor Generationen", back: "1. Gen.: GOD → H₂O₂ → Pt-Elektrode (O₂-abhängig). 2. Gen.: Mediator (Ferrocen) ersetzt O₂ (O₂-unabhängig). 3. Gen.: Direkter Elektronentransfer (DET) Enzym → Elektrode." },
    { front: "Sauerbrey-Gleichung (QCM)", back: "Δf = −C·Δm (vereinfacht). Massenanlagerung → Frequenzabfall. Empfindlichkeit: ng/cm². Anwendungen: Gassensoren, Biosensoren, Schichtdicke in Vakuumdeposition." },
    { front: "Biosensor (IUPAC)", back: "Chemosensor mit biologischem Rezeptorelement: Enzym, Antikörper, DNA, Rezeptorprotein. Transducer: beliebig. Biosensor ≠ Chemosensor in vivo." },
    { front: "Transducer-Typen", back: "Elektrochemisch (amperometrisch, potentiometrisch, impedimetrisch). Optisch (Absorption, Fluoreszenz, SPR). Massensensitiv (QCM, SAW). Thermisch (Enzymthermistor)." },
    { front: "Point-of-Care Diagnostik", back: "Analyse direkt beim Patienten. Miniaturisierte Sensoren (Lab-on-a-Chip, Microfluidik). Vorteile: schnell (min), wenig Probe (μL), kostengünstig, mobil. Beispiele: Glucose, Troponin, Blutgase, CRP." },
  ],
};
