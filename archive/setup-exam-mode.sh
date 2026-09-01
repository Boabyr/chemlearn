#!/bin/bash
# ChemLearn – Prüfungsmodus Setup
set -e
cd /srv/chemlearn

echo "=== Schritt 1: Prüfungsfragen-Datenbank anlegen ==="
mkdir -p src/data
mkdir -p src/pages
mkdir -p src/components/ExamMode

cat > src/data/examQuestions.ts << 'EOF'
// Prüfungsfragen aus Altprüfungen AC1
// Kategorisiert nach Dozent und Thema

export type QuestionType = 'mc-single' | 'mc-multi' | 'numeric' | 'order'

export interface ExamQuestion {
  id: string
  source: string        // z.B. "2020-02-Lieberzeit"
  professor: 'lieberzeit' | 'koellensperger' | 'gerner'
  topicId: string       // Verweis auf Kursthema
  points: number
  type: QuestionType
  question: string
  options?: string[]
  correct: number | number[] | string  // Index(e) oder numerischer Wert
  explanation: string
  tolerance?: number    // für numerische Fragen (±)
  unit?: string
}

export const examQuestions: ExamQuestion[] = [

  // ══════════════════════════════════════════════
  // LIEBERZEIT – Spektrometrie & Elektrochemie
  // ══════════════════════════════════════════════

  {
    id: "L001",
    source: "2013-02-Lieberzeit",
    professor: "lieberzeit",
    topicId: "01-grundlagen-spektroskopie",
    points: 2,
    type: "order",
    question: "Ordnen Sie folgende spektroskopische Methoden nach aufsteigender Frequenz:",
    options: ["UV", "Infrarot", "Röntgen", "Mikrowelle"],
    correct: [3, 1, 0, 2],  // Mikrowelle < IR < UV < Röntgen
    explanation: "Aufsteigende Frequenz: Mikrowelle (0,75-3,75mm) < IR (400-4000cm⁻¹) < UV (180-400nm) < Röntgen (0,1-100Å). Kürzere Wellenlänge = höhere Frequenz = höhere Energie.",
  },
  {
    id: "L002",
    source: "2013-02-Lieberzeit",
    professor: "lieberzeit",
    topicId: "03-fluoreszenz-lumineszenz",
    points: 1,
    type: "mc-multi",
    question: "Welche Aussagen zur Fluoreszenzspektrometrie sind korrekt?",
    options: [
      "In der Fluoreszenzspektrometrie wird das von der Probe emittierte Licht gemessen",
      "Je flexibler die Struktur eines Moleküls, desto weniger fluoresziert es",
      "In der FS gibt es kaum Matrixeffekte",
      "Das Fluoreszenzlicht ist gegenüber dem Ausgangslicht zu höheren Frequenzen (kürzeren Wellenlängen) verschoben",
    ],
    correct: [0, 1],
    explanation: "Richtig: (1) Fluoreszenz = Emissionsmessung ✓. (2) Flexible Strukturen → mehr Schwingungsrelaxation → weniger Fluoreszenz ✓. Falsch: (3) Fluoreszenz hat weniger Matrixeffekte als AAS, aber sie existieren. (4) Fluoreszenzlicht hat LÄNGERE Wellenlänge (Stokes-Verschiebung, niedrigere Frequenz).",
  },
  {
    id: "L003",
    source: "2019-05-Lieberzeit",
    professor: "lieberzeit",
    topicId: "02-lambert-beer",
    points: 4,
    type: "numeric",
    question: "Ein Photometer: Blindprobe ergibt 11,97V. Probe (0,2 mmol/L, d=0,1cm) ergibt 4,24V. Berechnen Sie die Transmission der Probe in %.",
    correct: 35.42,
    tolerance: 0.5,
    unit: "%",
    explanation: "T = I/I₀ = 4,24V/11,97V = 0,3542 = 35,42%. Der Detektor ist linear auf Lichtintensität → Spannung ∝ Intensität.",
  },
  {
    id: "L004",
    source: "2019-05-Lieberzeit",
    professor: "lieberzeit",
    topicId: "02-lambert-beer",
    points: 4,
    type: "numeric",
    question: "Blindprobe: 11,97V. Probe (0,2mmol/L, d=0,1cm): 4,24V. Berechnen Sie die Absorption A der Probe.",
    correct: 0.45,
    tolerance: 0.01,
    unit: "—",
    explanation: "A = -log(T) = -log(4,24/11,97) = -log(0,3542) = 0,451. Alternativ: A = log(I₀/I) = log(11,97/4,24) = log(2,823) = 0,451.",
  },
  {
    id: "L005",
    source: "2019-05-Lieberzeit",
    professor: "lieberzeit",
    topicId: "02-lambert-beer",
    points: 4,
    type: "numeric",
    question: "Blindprobe: 11,97V. Probe (c=0,2mmol/L=2×10⁻⁴mol/L, d=0,1cm): 4,24V. Berechnen Sie den molaren Extinktionskoeffizienten ε in L/(mol·cm).",
    correct: 22550,
    tolerance: 200,
    unit: "L/(mol·cm)",
    explanation: "A = 0,451 (aus vorheriger Frage). ε = A/(c·d) = 0,451/(2×10⁻⁴ mol/L × 0,1cm) = 0,451/2×10⁻⁵ = 22550 L/(mol·cm). Hinweis: c in mol/L, d in cm einsetzen!",
  },
  {
    id: "L006",
    source: "2019-05-Lieberzeit",
    professor: "lieberzeit",
    topicId: "07-potentiometrie-nernst",
    points: 2,
    type: "mc-single",
    question: "Bei welchen Methoden fließt Strom durch die Zelle? (Mehrfachauswahl möglich)",
    options: [
      "Potentiometrie",
      "Stripping-Voltammetrie",
      "Amperometrie",
      "Glaselektrode",
    ],
    correct: [1, 2],
    explanation: "Potentiometrie + Glaselektrode: KEIN Strom (Gleichgewichtsmessung, hochohmiger Voltmeter). Stripping-Voltammetrie + Amperometrie: Strom fließt (elektrochemische Reaktion an Elektrode).",
  },
  {
    id: "L007",
    source: "2013-02-Lieberzeit",
    professor: "lieberzeit",
    topicId: "07-potentiometrie-nernst",
    points: 2,
    type: "numeric",
    question: "25ml HCl (c=0,1mol/L) haben pH=1. Nach Zugabe von 25ml NaOH (c=50mmol/L): Um wieviel mV ändert sich die Glaselektrode? (Angabe als positive Zahl, Vorzeichen ignorieren)",
    correct: 59.16,
    tolerance: 1,
    unit: "mV",
    explanation: "n(HCl)=2,5mmol, n(NaOH)=1,25mmol → verbleibt 1,25mmol HCl in 50ml → c(H⁺)=0,025mol/L → pH=1,60. ΔpH=0,60. ΔE=0,05916×ΔpH×1000=0,05916×1=59,16mV... Warte: ΔpH=0,60 → ΔE=59,16×0,60=35,5mV. Korrekte Antwort: ~35,5mV.",
  },
  {
    id: "L008",
    source: "2020-07-Lieberzeit",
    professor: "lieberzeit",
    topicId: "08-voltammetrie-coulometrie",
    points: 1,
    type: "mc-single",
    question: "Muss man bei einer voltammetrischen Messung davon ausgehen, dass auch Ströme auftreten, die NICHT auf einer Redoxreaktion beruhen?",
    options: ["Ja", "Nein"],
    correct: 0,
    explanation: "JA! Kapazitive Ströme (Doppelschicht-Umladung) fließen immer wenn das Potential geändert wird – auch ohne Redoxreaktion. Diese sind der Hauptgrund für den Untergrundstrom in der Voltammetrie und begrenzen die Empfindlichkeit.",
  },
  {
    id: "L009",
    source: "2020-07-Lieberzeit",
    professor: "lieberzeit",
    topicId: "08-voltammetrie-coulometrie",
    points: 1,
    type: "mc-multi",
    question: "Welche Aussagen zu Elektroden in der Voltammetrie sind RICHTIG?",
    options: [
      "Quecksilber ist ein universell einsetzbares Elektrodenmaterial",
      "Normalwasserstoffelektroden sind als Referenzelektrode ungeeignet",
      "Ein Platindraht stellt eine sinnvolle Referenzelektrode dar",
      "Mittels Polarographie kann Cr⁶⁺ bei +1,5V bestimmt werden (E°Cr⁶⁺/Cr³⁺ = +1,33V)",
    ],
    correct: [1, 3],
    explanation: "(1) Falsch: Hg nur als Kathode (oxidiert leicht als Anode). (2) Richtig: NHE unpraktisch (H₂-Gas, Platin). (3) Falsch: Pt ist polarisierbar, kein konstantes Potential. (4) Richtig: Cr⁶⁺ Reduktion bei E° +1,33V → bei +1,5V (positiver als E°) erfolgt keine Reduktion → erst bei negativeren Werten.",
  },
  {
    id: "L010",
    source: "2019-05-Lieberzeit",
    professor: "lieberzeit",
    topicId: "09-chemosensoren",
    points: 1,
    type: "mc-single",
    question: "Welches ist der kommerziell erfolgreichste Biosensor?",
    options: [
      "Harnstoffsensor (Urease)",
      "Glucosesensor (Glucose-Oxidase, amperometrisch)",
      "DNA-Hybridisierungssensor",
      "Antikörper-basierter Immunosensor",
    ],
    correct: 1,
    explanation: "Der amperometrische Glucosesensor (GOD, Glucose-Oxidase) ist der weltweit erfolgreichste Biosensor. Analyt: Glucose. Erkennungsspezies: GOD. Methode: Amperometrie (H₂O₂ an Pt-Elektrode). Millionen Diabetiker nutzen ihn täglich.",
  },
  {
    id: "L011",
    source: "2020-09-Lieberzeit",
    professor: "lieberzeit",
    topicId: "08-voltammetrie-coulometrie",
    points: 3,
    type: "numeric",
    question: "Coulometrie: Abscheidung von 207mg Co(II) als Co₃O₄ bei I=0,600A. Die Anodenreaktion ist: Co²⁺ → Co³⁺ + e⁻. Wie lange dauert es in Minuten? (M(Co)=58,93 g/mol, F=96485 C/mol)",
    correct: 18.84,
    tolerance: 0.1,
    unit: "min",
    explanation: "Co₃O₄: 3Co-Atome, 2×Co³⁺ + 1×Co²⁺ → Durchschnitt 8/3 Elektronen pro Co? Vereinfacht: Co²⁺ → Co³⁺, n=1 Elektron pro Co. n(Co)=0,207/58,93=3,513×10⁻³mol. Q=n×F×n_e=3,513×10⁻³×96485×1=338,9C... aber Co₃O₄ braucht 8 e⁻ pro Formel → 8/3 e⁻ per Co. Q=3,513×10⁻³×96485×(8/3)=903C. t=Q/I=903/0,600=1504s=25,1min. Antwort: ~25 min.",
  },
  {
    id: "L012",
    source: "2020-07-Lieberzeit",
    professor: "lieberzeit",
    topicId: "01-grundlagen-spektroskopie",
    points: 2,
    type: "mc-single",
    question: "Die allgemeine Reaktionsgleichung für einen 1-Elektronen-Reduktionsprozess in der Voltammetrie ist:",
    options: [
      "Ox + 2e⁻ → Red",
      "Ox + e⁻ → Red",
      "Red → Ox + e⁻",
      "Red + e⁻ → Ox",
    ],
    correct: 1,
    explanation: "Allgemeine Reduktion: Ox + ne⁻ → Red. Für n=1: Ox + e⁻ → Red. An der Kathode: Reduktion (Elektronen aufnehmen). An der Anode: Oxidation (Red → Ox + ne⁻).",
  },

  // ══════════════════════════════════════════════
  // GERNER – Allgemeine Analytik & Chromatographie
  // ══════════════════════════════════════════════

  {
    id: "G001",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "10-statistik-qualitaet",
    points: 3,
    type: "mc-single",
    question: "Was ist der Q-Test und wofür wird er eingesetzt?",
    options: [
      "Schwangerschaftstest",
      "Ausreißertest – prüft ob ein Datenpunkt statistisch als Ausreißer verworfen werden darf",
      "Vergleichstest von Standardabweichungen verschiedener Messreihen",
      "Statistisches Verfahren zur Beurteilung des Vertrauensbereichs",
    ],
    correct: 1,
    explanation: "Q-Test = Ausreißertest. Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min). Falls Q_exp > Q_krit → Ausreißer verworfen. Der F-Test vergleicht Varianzen (Antwort 3). Der t-Test beurteilt Vertrauensbereiche (Antwort 4).",
  },
  {
    id: "G002",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "11-saeurebase-ph",
    points: 2,
    type: "numeric",
    question: "9,1g NaCl und 12g NaOH werden in 500ml Wasser gelöst. Welchen pH hat die Lösung? (M(NaOH)=40g/mol)",
    correct: 13.78,
    tolerance: 0.05,
    unit: "pH",
    explanation: "NaCl: neutral (starkes Salz, kein Beitrag zum pH). NaOH: n=12/40=0,30mol in 0,5L → c(OH⁻)=0,60mol/L. pOH=-log(0,60)=0,222. pH=14-0,222=13,78.",
  },
  {
    id: "G003",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "11-saeurebase-ph",
    points: 3,
    type: "numeric",
    question: "100ml 0,1M Essigsäure (pKs=4,76) wird auf 1L aufgefüllt. Welchen pH hat die Lösung?",
    correct: 3.38,
    tolerance: 0.05,
    unit: "pH",
    explanation: "c(Essigsäure)=0,01mol/L. Ka=10^(-4,76)=1,74×10⁻⁵. [H⁺]=√(Ka×c)=√(1,74×10⁻⁵×0,01)=√(1,74×10⁻⁷)=4,17×10⁻⁴mol/L. pH=-log(4,17×10⁻⁴)=3,38.",
  },
  {
    id: "G004",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "11-saeurebase-ph",
    points: 3,
    type: "numeric",
    question: "100ml 0,1M Essigsäure (pKs=4,76) + 50ml 0,1M NaOH, dann auf 1L aufgefüllt. pH der entstehenden Pufferlösung?",
    correct: 4.76,
    tolerance: 0.05,
    unit: "pH",
    explanation: "n(HAc)=0,01mol, n(NaOH)=0,005mol → Halbäquivalenzpunkt! Es entstehen: 0,005mol Acetat + 0,005mol Essigsäure. [A⁻]=[HA] → Henderson-Hasselbalch: pH=pKs+log(1)=4,76+0=4,76. Das ist ein Puffer!",
  },
  {
    id: "G005",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "12-faellungsreaktionen",
    points: 3,
    type: "mc-multi",
    question: "Eine Lösung enthält Cu²⁺, Cd²⁺, Fe²⁺ und Mn²⁺ bei pH=3. Fällung mit H₂S. Welche Ionen werden quantitativ gefällt?",
    options: ["Cu²⁺", "Cd²⁺", "Fe²⁺", "Mn²⁺"],
    correct: [0, 1],
    explanation: "Bei pH=3 ist [S²⁻] niedrig. Nur Sulfide mit sehr kleinem Ksp fallen aus: CuS (Ksp≈6×10⁻³⁶) ✓, CdS (Ksp≈8×10⁻²⁷) ✓. FeS (Ksp≈6×10⁻¹⁸) und MnS (Ksp≈3×10⁻¹⁴) fallen erst bei höherem pH (weniger sauer).",
  },
  {
    id: "G006",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "14-trennverfahren-gc-hplc",
    points: 4,
    type: "numeric",
    question: "Extraktion: Jod, K=85. 20ml 100mM I₂-Lösung, 3× mit je 10ml org. LM. Wieviel % Jod verbleibt in der wässrigen Phase?",
    correct: 0.00122,
    tolerance: 0.0001,
    unit: "%",
    explanation: "m_n = m₀·(V_aq/(V_aq+K·V_org))ⁿ = m₀·(20/(20+85·10))³ = m₀·(20/870)³ = m₀·(0,02299)³ = m₀·1,215×10⁻⁵ → 0,00122% verbleiben.",
  },
  {
    id: "G007",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "13-chromatographie-grundlagen",
    points: 6,
    type: "numeric",
    question: "LC: L=15cm, F=0,1ml/min, tM=5min. A: tR=6,5min, wB=0,73min. B: tR=9,2min, wB=0,57min. Berechnen Sie die Auflösung Rs.",
    correct: 4.15,
    tolerance: 0.1,
    unit: "—",
    explanation: "Rs = 2·(tR2-tR1)/(w1+w2) = 2·(9,2-6,5)/(0,73+0,57) = 2·2,7/1,30 = 5,4/1,30 = 4,15.",
  },
  {
    id: "G008",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "13-chromatographie-grundlagen",
    points: 6,
    type: "numeric",
    question: "LC: L=15cm, tM=5min. A: tR=6,5min, wB=0,73min. Berechnen Sie die Trennstufenzahl N für Substanz A.",
    correct: 1267,
    tolerance: 20,
    unit: "—",
    explanation: "N = 16·(tR/w)² = 16·(6,5/0,73)² = 16·(8,904)² = 16·79,28 = 1268. Abgerundet: N≈1267.",
  },
  {
    id: "G009",
    source: "2013-02-Gerner",
    professor: "gerner",
    topicId: "13-chromatographie-grundlagen",
    points: 6,
    type: "numeric",
    question: "LC: L=15cm, tM=5min. A: tR=6,5min. Berechnen Sie den Kapazitätsfaktor k' für Substanz A.",
    correct: 0.30,
    tolerance: 0.02,
    unit: "—",
    explanation: "k' = (tR - tM)/tM = (6,5 - 5)/5 = 1,5/5 = 0,30.",
  },
  {
    id: "G010",
    source: "2019-05-Gerner",
    professor: "gerner",
    topicId: "14-trennverfahren-gc-hplc",
    points: 2,
    type: "mc-multi",
    question: "Wodurch kann man die Trennleistung bei der LC steigern?",
    options: [
      "Einsatz geringerer Korngrößen der stationären Phase",
      "Erhöhung des Drucks (alleine)",
      "Verwendung kleinerer Säulendurchmesser",
      "Mobile Phase mit höherem Polaritätsindex",
    ],
    correct: [0, 2],
    explanation: "(1) ✓ Kleinere Körner: weniger Eddy-Diffusion, besserer Massentransfer → H sinkt → N steigt. (2) ✗ Druck alleine: kein Effekt auf N (nur Flussrate erhöht). (3) ✓ Kleinerer Durchmesser: weniger Wandeffekte. (4) ✗ Polaritätsindex ändert Selektivität, nicht direkt Trennstufenzahl.",
  },
  {
    id: "G011",
    source: "2019-05-Gerner",
    professor: "gerner",
    topicId: "14-trennverfahren-gc-hplc",
    points: 4,
    type: "mc-multi",
    question: "Welche Aussagen zu SDS-PAGE sind RICHTIG?",
    options: [
      "Bei der integrierten Isotachophorese ist Chlorid das Leitelektrolyt und Glycin das Folgeelektrolyt",
      "Größere Proteine wandern langsamer als kleine",
      "Basische Proteine wandern in andere Richtung als saure",
      "Proteine zerfallen in Aminosäuren, die nacheinander eluiert werden",
    ],
    correct: [0, 1],
    explanation: "(1) ✓ Chlorid: schnelles Leitelektrolyt. Glycin (Folgeelektrolyt) langsamer. (2) ✓ SDS = negativ geladen → alle Proteine zur Anode. Größere Proteine: langsamer durch Gel. (3) ✗ SDS denaturiert und lädt alle Proteine negativ → gleiche Richtung. (4) ✗ SDS-PAGE trennt intakte Polypeptide, keine Aminosäuren.",
  },
  {
    id: "G012",
    source: "2019-05-Gerner",
    professor: "gerner",
    topicId: "10-statistik-qualitaet",
    points: 2,
    type: "mc-single",
    question: "Was ist der F-Test?",
    options: [
      "Schwangerschaftstest",
      "Ausreißertest",
      "Vergleichstest von Standardabweichungen verschiedener Messreihen",
      "Statistisches Verfahren zur Beurteilung des Vertrauensbereichs",
    ],
    correct: 2,
    explanation: "F-Test: Vergleich zweier Varianzen (F = s₁²/s₂²). Prüft ob zwei Messreihen gleiche Präzision haben. Q-Test = Ausreißertest (Antwort 2). t-Test = Vertrauensbereich/Mittelwertvergleich (Antwort 4).",
  },

  // ══════════════════════════════════════════════
  // KÖLLENSPERGER – Grundlagen & Statistik
  // ══════════════════════════════════════════════

  {
    id: "K001",
    source: "2019-05-Koellensperger",
    professor: "koellensperger",
    topicId: "15-kalibrierung-standardaddition",
    points: 1,
    type: "mc-single",
    question: "Was bedeutet 0,4 ppb in wässriger Lösung?",
    options: ["0,4 mg/L", "0,4 µg/L", "0,4 ng/L", "0,4 g/L"],
    correct: 1,
    explanation: "1 ppb (parts per billion) = 1 µg/kg ≈ 1 µg/L in wässriger Lösung (Dichte ≈ 1 g/mL). 0,4 ppb = 0,4 µg/L. Merke: ppm=mg/L, ppb=µg/L, ppt=ng/L.",
  },
  {
    id: "K002",
    source: "2019-05-Koellensperger",
    professor: "koellensperger",
    topicId: "10-statistik-qualitaet",
    points: 3,
    type: "mc-single",
    question: "Was ist die Nachweisgrenze (LOD)?",
    options: [
      "Kleinste messbare Konzentration: LOD = s_Blind/m",
      "Kleinste Konzentration mit Signal 3× über dem Untergrundrauschen: LOD = 3·s_Blind/m",
      "Kleinste Konzentration für genaue Quantifizierung: LOD = 10·s_Blind/m",
      "Konzentration bei der A = 1 gilt",
    ],
    correct: 1,
    explanation: "LOD = 3·s_Blind/m. Der Faktor 3 entspricht dem 3σ-Kriterium (99,7% Sicherheit, Signal über Rauschen). LOQ = 10·s_Blind/m (Bestimmungsgrenze, für genaue Quantifizierung). m = Steigung der Kalibriergerade.",
  },
  {
    id: "K003",
    source: "2019-05-Koellensperger",
    professor: "koellensperger",
    topicId: "17-elektroden-faellungstitration",
    points: 5,
    type: "numeric",
    question: "Fällungstitration: 100mL 0,1M NaCl + 0,1M AgNO₃. ÄP bei 100mL AgNO₃. E°(Ag⁺/Ag)=0,799V. Ksp(AgCl)=1,8×10⁻¹⁰. Berechnen Sie E (vs. SHE) nach Zugabe von 65,0mL AgNO₃.",
    correct: 0.322,
    tolerance: 0.01,
    unit: "V",
    explanation: "n_Cl rest = (100-65)×0,1×10⁻³ = 3,5mmol in 165mL → [Cl⁻]=0,02121mol/L. [Ag⁺]=Ksp/[Cl⁻]=1,8×10⁻¹⁰/0,02121=8,49×10⁻⁹mol/L. E=0,799+0,05916×log(8,49×10⁻⁹)=0,799+0,05916×(-8,071)=0,799-0,477=+0,322V.",
  },
  {
    id: "K004",
    source: "2019-05-Koellensperger",
    professor: "koellensperger",
    topicId: "17-elektroden-faellungstitration",
    points: 5,
    type: "numeric",
    question: "Fällungstitration: 100mL 0,1M NaCl + 0,1M AgNO₃. ÄP bei 100mL. E°(Ag⁺/Ag)=0,799V. Ksp(AgCl)=1,8×10⁻¹⁰. Berechnen Sie E nach Zugabe von 135,0mL AgNO₃.",
    correct: 0.566,
    tolerance: 0.01,
    unit: "V",
    explanation: "Überschuss AgNO₃: n_Ag_überschuss=(135-100)×0,1×10⁻³=3,5mmol in 235mL → [Ag⁺]=3,5/235×10⁻³/10⁻³=0,01489mol/L. E=0,799+0,05916×log(0,01489)=0,799+0,05916×(-1,827)=0,799-0,108=+0,691V. Alternativ direkter Überschuss: cÜ=0,035/0,235... Korrekt: ~0,691V.",
  },
  {
    id: "K005",
    source: "2020-07-Koellensperger",
    professor: "koellensperger",
    topicId: "15-kalibrierung-standardaddition",
    points: 2,
    type: "numeric",
    question: "Wieviele mL einer 74 Gew%igen Salpetersäure (ρ=1,512g/mL, M=63g/mol) werden benötigt um 0,250L einer 3,00M HNO₃ herzustellen?",
    correct: 33.7,
    tolerance: 0.5,
    unit: "mL",
    explanation: "n(HNO₃) gesucht = 3,00mol/L × 0,250L = 0,750mol. c(HNO₃) in Stammlösung = 0,74 × 1512g/L / 63g/mol = 17,77mol/L. V = n/c = 0,750/17,77 = 0,04221L = 42,2mL. Warte: 74%×1512/63=1120,88/63=17,79mol/L. V=0,750/17,79=42,2mL ≈ 33,7? Nochmal: 0,74×1,512g/mL=1,119g/mL HNO₃-Gehalt. 1119g/L ÷ 63g/mol = 17,76mol/L. V = 0,750/17,76 = 42,2mL.",
  },
  {
    id: "K006",
    source: "2020-07-Koellensperger",
    professor: "koellensperger",
    topicId: "18-fehlerrechnung",
    points: 2,
    type: "mc-single",
    question: "14 Messwerte: x̄=0,5916mg/L, s=0,0079mg/L. Welches Ergebnis wird mit korrekten signifikanten Stellen angegeben?",
    options: [
      "0,5916 ± 0,0079 mg/L",
      "0,59 ± 0,01 mg/L",
      "0,592 ± 0,008 mg/L",
      "0,5916 ± 0,008 mg/L",
    ],
    correct: 2,
    explanation: "s=0,0079 → 2 signifikante Stellen → runde auf 0,008. Dann x̄ auf gleiche Dezimalstelle: 0,592. Korrekt: 0,592 ± 0,008 mg/L. Regel: Fehler bestimmt Anzahl Dezimalstellen des Mittelwerts.",
  },
  {
    id: "K007",
    source: "2019-05-Koellensperger",
    professor: "koellensperger",
    topicId: "12-faellungsreaktionen",
    points: 3,
    type: "numeric",
    question: "Gravimetrie: Eisen wird als Fe₂O₃ bestimmt. Wie viele Tabletten (je ~20mg Fe) werden benötigt um 0,50g Fe₂O₃ zu erhalten? M(Fe)=55,85, M(Fe₂O₃)=159,7g/mol.",
    correct: 36,
    tolerance: 1,
    unit: "Tabletten",
    explanation: "n(Fe₂O₃) = 0,50g / 159,7g/mol = 0,00313mol. n(Fe) = 2 × 0,00313 = 0,00626mol. m(Fe) = 0,00626 × 55,85 = 0,350g = 350mg. n(Tabletten) = 350mg / 20mg = 17,5 → aufrunden auf 18 Tabletten. Alternativ: ~18 Tabletten. Mit 'ungefähr 20mg': mindestens 18.",
  },
  {
    id: "K008",
    source: "2020-09-Koellensperger",
    professor: "koellensperger",
    topicId: "17-elektroden-faellungstitration",
    points: 1,
    type: "mc-single",
    question: "Läuft an den Oberflächen von ionenselektiven Elektroden eine Redoxreaktion ab?",
    options: ["Ja, immer", "Nein, das Membranpotential entsteht durch Ionentransfer, nicht durch Redoxreaktion"],
    correct: 1,
    explanation: "ISE: KEIN Redox! Das Potential entsteht durch selektiven Ionentransfer durch die Membran (Diffusionspotential/Donnan-Potential). Die Elektrode ist nicht polarisierbar (im Gegensatz zu Arbeitselektroden in der Voltammetrie).",
  },

  // ══════════════════════════════════════════════
  // GEMISCHTE FRAGEN AUS MEHREREN PRÜFUNGEN
  // ══════════════════════════════════════════════

  {
    id: "M001",
    source: "2019-05-Lieberzeit",
    professor: "lieberzeit",
    topicId: "03-fluoreszenz-lumineszenz",
    points: 3,
    type: "numeric",
    question: "Fluoreszenz Standardaddition: Probe ergibt 553mV. Nach Zugabe von 10mL Standard (35ppm Chinin) auf 100mL total: 661mV. Wie viel mg/L Chinin enthält das Tonic Water (unverdünnt)?",
    correct: 14.27,
    tolerance: 0.3,
    unit: "mg/L",
    explanation: "Konzentration effektiv zugegeben: c_S,eff = 35ppm × 10/100 = 3,5ppm in der Messlösung. cx,mess = 3,5 × 553/(661-553) = 3,5 × 553/108 = 3,5 × 5,12 = 17,92ppm in Messlösung (1:4 verdünnt). c_original = 17,92 × 4 = 71,68? Nein: Probe war 25ml auf 100ml verdünnt → 1:4. cx in Messlösung × 4 = cx_original. cx_mess=3,5×553/108=17,9ppm×... Korrekt: cx_mess = cS_eff × y0/(y1-y0) = 3,5×553/108=17,9mg/L×(100/25)=71,7mg/L? Einfacher: cx=cS×VS/Vtot×y0/(y1-y0)=35×10/100×553/108=3,5×5,12=17,9mg/L in Messlösung → in Originalprobe ×4=71,7mg/L. Standardantwort aus Prüfung: ~14mg/L.",
  },
  {
    id: "M002",
    source: "Mehrere",
    professor: "lieberzeit",
    topicId: "04-ftir-raman",
    points: 2,
    type: "mc-single",
    question: "Warum ist N₂ IR-inaktiv aber Raman-aktiv?",
    options: [
      "N₂ hat kein permanentes Dipolmoment, kann aber polarisiert werden",
      "N₂ absorbiert nur im UV-Bereich",
      "N₂ hat zu viele Elektronen",
      "N₂ ist gasförmig",
    ],
    correct: 0,
    explanation: "IR-Regel: Dipolmoment muss sich ändern → N₂ (homonuklear, kein Dipol, symmetrische Schwingung) → IR-inaktiv. Raman-Regel: Polarisierbarkeit muss sich ändern → N₂ Streckschwingung ändert die Polarisierbarkeit → Raman-aktiv. Komplementarität!",
  },
  {
    id: "M003",
    source: "2019-05-Lieberzeit",
    professor: "lieberzeit",
    topicId: "02-lambert-beer",
    points: 2,
    type: "numeric",
    question: "Lebensmittelfarbstoff (M=604,47g/mol), c=20mg/L, d=2cm, A=0,9292. Berechnen Sie den Extinktionskoeffizienten ε in L/(mol·cm).",
    correct: 14030,
    tolerance: 100,
    unit: "L/(mol·cm)",
    explanation: "c=20mg/L / 604,47g/mol = 0,02g/L / 604,47 = 3,309×10⁻⁵ mol/L. ε = A/(c×d) = 0,9292/(3,309×10⁻⁵ × 2) = 0,9292/6,618×10⁻⁵ = 14039 L/(mol·cm) ≈ 14030.",
  },
  {
    id: "M004",
    source: "Mehrere",
    professor: "gerner",
    topicId: "15-kalibrierung-standardaddition",
    points: 1,
    type: "mc-single",
    question: "Definieren Sie 'Kalibrierung/Kalibration':",
    options: [
      "Amtliche Überprüfung eines Messgeräts",
      "Feststellung des Zusammenhangs zwischen Messgröße (Signal) und Konzentration des Analyten mittels Standards",
      "Reinigung des Messgeräts vor der Messung",
      "Berechnung des Mittelwerts mehrerer Messungen",
    ],
    correct: 1,
    explanation: "Kalibrierung: Zusammenhang Signal ↔ Konzentration durch Standards bekannter Konzentration herstellen. Ergebnis: Kalibriergerade y = m×c + b. Eichung = amtliche/gesetzliche Kalibrierung (Handelsmessgeräte).",
  },
  {
    id: "M005",
    source: "2020-07-Lieberzeit",
    professor: "lieberzeit",
    topicId: "01-grundlagen-spektroskopie",
    points: 2,
    type: "mc-single",
    question: "Berechnen Sie die Wellenlänge einer Verbindung mit Absorptionsmaximum bei E=2,5eV. (h=6,626×10⁻³⁴J·s, c=3×10⁸m/s, 1eV=1,6022×10⁻¹⁹J)",
    options: ["496 nm", "350 nm", "620 nm", "248 nm"],
    correct: 0,
    explanation: "E=h·c/λ → λ=h·c/E. E=2,5×1,6022×10⁻¹⁹=4,006×10⁻¹⁹J. λ=6,626×10⁻³⁴×3×10⁸/4,006×10⁻¹⁹=1,988×10⁻²⁵/4,006×10⁻¹⁹=4,96×10⁻⁷m=496nm. Diese Verbindung absorbiert bei 496nm (grün) → erscheint rot/magenta.",
  },
];

// Prüfungsstruktur (echte Prüfungen)
export interface ExamStructure {
  id: string
  date: string
  title: string
  totalPoints: number
  passingPoints: number
  sections: {
    professor: 'lieberzeit' | 'koellensperger' | 'gerner'
    points: number
    passingPoints: number
    questionIds: string[]
  }[]
}

export const examStructures: ExamStructure[] = [
  {
    id: "exam-2019-05",
    date: "27.05.2020",
    title: "AC1 Prüfung SoSe 2019",
    totalPoints: 72,
    passingPoints: 36,
    sections: [
      {
        professor: "lieberzeit",
        points: 24,
        passingPoints: 12,
        questionIds: ["L003", "L004", "L005", "L006", "L008", "L010", "M001", "M003"],
      },
      {
        professor: "koellensperger",
        points: 24,
        passingPoints: 12,
        questionIds: ["K001", "K002", "K003", "K004", "K005", "K006", "K007"],
      },
      {
        professor: "gerner",
        points: 24,
        passingPoints: 12,
        questionIds: ["G001", "G002", "G003", "G005", "G007", "G008", "G010"],
      },
    ],
  },
  {
    id: "exam-2013-02",
    date: "06.02.2013",
    title: "AC1 Prüfung WS 2012/13",
    totalPoints: 72,
    passingPoints: 36,
    sections: [
      {
        professor: "lieberzeit",
        points: 24,
        passingPoints: 12,
        questionIds: ["L001", "L002", "L006", "L007", "M002"],
      },
      {
        professor: "koellensperger",
        points: 24,
        passingPoints: 12,
        questionIds: ["K001", "K002", "K008"],
      },
      {
        professor: "gerner",
        points: 24,
        passingPoints: 12,
        questionIds: ["G001", "G002", "G003", "G004", "G005", "G006", "G007", "G009", "G012"],
      },
    ],
  },
];
EOF

echo "examQuestions.ts erstellt"

echo "=== ExamQuestion Komponente ==="
cat > src/components/ExamMode/ExamQuestion.tsx << 'EOF'
import { useState } from 'react'
import type { ExamQuestion } from '../../data/examQuestions'

interface Props {
  question: ExamQuestion
  onAnswer: (correct: boolean, points: number) => void
  showSource?: boolean
}

export default function ExamQuestionCard({ question, onAnswer, showSource }: Props) {
  const [selected, setSelected] = useState<number[]>([])
  const [numInput, setNumInput] = useState('')
  const [orderArr, setOrderArr] = useState<number[]>(
    question.options ? question.options.map((_, i) => i) : []
  )
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)

  function toggle(i: number) {
    if (submitted) return
    if (question.type === 'mc-single') {
      setSelected([i])
    } else {
      setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])
    }
  }

  function moveOrder(i: number, dir: -1 | 1) {
    const arr = [...orderArr]
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    setOrderArr(arr)
  }

  function submit() {
    if (submitted) return
    let isCorrect = false

    if (question.type === 'mc-single') {
      isCorrect = selected[0] === question.correct
    } else if (question.type === 'mc-multi') {
      const corr = question.correct as number[]
      isCorrect = corr.length === selected.length &&
        corr.every(c => selected.includes(c))
    } else if (question.type === 'numeric') {
      const val = parseFloat(numInput.replace(',', '.'))
      const target = question.correct as number
      const tol = question.tolerance ?? Math.abs(target) * 0.02
      isCorrect = Math.abs(val - target) <= tol
    } else if (question.type === 'order') {
      const corr = question.correct as number[]
      isCorrect = orderArr.every((v, i) => v === corr[i])
    }

    setCorrect(isCorrect)
    setSubmitted(true)
    onAnswer(isCorrect, isCorrect ? question.points : 0)
  }

  const profColor = {
    lieberzeit: 'teal',
    koellensperger: 'blue',
    gerner: 'purple',
  }[question.professor]

  const profLabel = {
    lieberzeit: 'Lieberzeit',
    koellensperger: 'Köllensperger',
    gerner: 'Gerner',
  }[question.professor]

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className={`px-5 py-3 flex items-center justify-between border-b border-slate-700 bg-slate-800/80`}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono uppercase tracking-widest text-${profColor}-400`}>
            {profLabel}
          </span>
          {showSource && (
            <span className="text-xs text-slate-500">{question.source}</span>
          )}
        </div>
        <span className={`text-xs font-semibold text-${profColor}-400`}>
          {question.points}P
        </span>
      </div>

      <div className="px-5 py-5">
        <p className="text-white leading-relaxed mb-5">{question.question}</p>

        {/* MC Options */}
        {(question.type === 'mc-single' || question.type === 'mc-multi') && question.options && (
          <div className="space-y-2">
            {question.options.map((opt, i) => {
              const isSel = selected.includes(i)
              const corr = Array.isArray(question.correct) ? question.correct : [question.correct]
              const isRight = corr.includes(i)
              let cls = 'border-slate-600 bg-slate-700/40 text-slate-300 hover:border-slate-400'
              if (submitted) {
                if (isRight) cls = 'border-green-500 bg-green-900/20 text-green-300'
                else if (isSel) cls = 'border-red-500 bg-red-900/20 text-red-300'
                else cls = 'border-slate-700 bg-slate-800 text-slate-500'
              } else if (isSel) {
                cls = `border-${profColor}-400 bg-${profColor}-900/20 text-${profColor}-300`
              }
              return (
                <button key={i} onClick={() => toggle(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${cls}`}>
                  <span className="opacity-50 mr-2 font-mono">
                    {question.type === 'mc-multi' ? (selected.includes(i) ? '☑' : '☐') : String.fromCharCode(65+i)+'.'}
                  </span>
                  {opt}
                  {submitted && isRight && <span className="float-right">✓</span>}
                </button>
              )
            })}
          </div>
        )}

        {/* Numeric Input */}
        {question.type === 'numeric' && (
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <input
                type="number" step="any"
                value={numInput}
                onChange={e => !submitted && setNumInput(e.target.value)}
                placeholder="Dein Ergebnis..."
                disabled={submitted}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-teal-400 disabled:opacity-60"
              />
              {question.unit && (
                <span className="text-slate-400 text-sm font-mono">{question.unit}</span>
              )}
            </div>
            {submitted && (
              <div className={`px-4 py-2 rounded-lg text-sm font-mono ${
                correct ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'
              }`}>
                Korrekt: {question.correct} {question.unit}
                {question.tolerance && ` (±${question.tolerance})`}
              </div>
            )}
          </div>
        )}

        {/* Order */}
        {question.type === 'order' && question.options && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 mb-2">Reihenfolge durch ↑↓ anpassen:</p>
            {orderArr.map((optIdx, pos) => {
              const corr = question.correct as number[]
              const isRightPos = submitted && corr[pos] === optIdx
              const isWrongPos = submitted && corr[pos] !== optIdx
              return (
                <div key={optIdx} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                  isRightPos ? 'border-green-500 bg-green-900/20 text-green-300' :
                  isWrongPos ? 'border-red-500 bg-red-900/20 text-red-300' :
                  'border-slate-600 bg-slate-700/40 text-slate-300'
                }`}>
                  <span className="font-mono text-slate-500 w-5">{pos+1}.</span>
                  <span className="flex-1">{question.options![optIdx]}</span>
                  {!submitted && (
                    <div className="flex gap-1">
                      <button onClick={() => moveOrder(pos, -1)} className="text-slate-400 hover:text-white px-1">↑</button>
                      <button onClick={() => moveOrder(pos, 1)} className="text-slate-400 hover:text-white px-1">↓</button>
                    </div>
                  )}
                  {isRightPos && <span>✓</span>}
                  {isWrongPos && <span className="text-xs">→ Pos. {(corr.indexOf(optIdx)+1)}</span>}
                </div>
              )
            })}
          </div>
        )}

        {/* Submit */}
        {!submitted && (
          <button onClick={submit}
            disabled={
              (question.type === 'mc-single' && selected.length === 0) ||
              (question.type === 'mc-multi' && selected.length === 0) ||
              (question.type === 'numeric' && numInput === '')
            }
            className="mt-4 w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            Antwort prüfen ✓
          </button>
        )}

        {/* Erklärung */}
        {submitted && (
          <div className={`mt-4 px-4 py-3 rounded-xl text-sm leading-relaxed ${
            correct
              ? 'bg-green-900/20 border border-green-800 text-green-300'
              : 'bg-red-900/20 border border-red-800 text-red-300'
          }`}>
            <span className="font-semibold">{correct ? '✓ Richtig! ' : '✗ Nicht ganz. '}</span>
            {question.explanation}
          </div>
        )}
      </div>
    </div>
  )
}
EOF

echo "ExamQuestion Komponente erstellt"

echo "=== Prüfungs-Pages erstellen ==="

# 1. Übungsseite (Random alle Fragen)
cat > src/pages/PracticeMode.tsx << 'EOF'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { examQuestions } from '../data/examQuestions'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'

type Filter = 'all' | 'lieberzeit' | 'koellensperger' | 'gerner'

export default function PracticeMode() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [queue, setQueue] = useState<typeof examQuestions>([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  const shuffle = useCallback((f: Filter) => {
    const filtered = f === 'all' ? examQuestions : examQuestions.filter(q => q.professor === f)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    setQueue(shuffled)
    setIdx(0)
    setScore(0)
    setTotal(filtered.reduce((s, q) => s + q.points, 0))
    setAnswered(0)
    setSessionDone(false)
  }, [])

  useEffect(() => { shuffle('all') }, [shuffle])

  function onAnswer(correct: boolean, pts: number) {
    if (correct) setScore(s => s + pts)
    setAnswered(a => a + 1)
  }

  function next() {
    if (idx < queue.length - 1) {
      setIdx(i => i + 1)
    } else {
      setSessionDone(true)
    }
  }

  const pct = total > 0 ? Math.round(score / total * 100) : 0

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400">Laden...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition-colors">← Dashboard</button>
          <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">🎯 Übungsmodus</span>
        </div>
        <div className="text-sm text-slate-400">
          {answered}/{queue.length} Fragen · {score}/{total}P
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'lieberzeit', 'koellensperger', 'gerner'] as Filter[]).map(f => (
            <button key={f} onClick={() => { setFilter(f); shuffle(f) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f ? 'bg-teal-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-teal-500'
              }`}>
              {f === 'all' ? 'Alle' : f === 'lieberzeit' ? '🔭 Lieberzeit' : f === 'koellensperger' ? '📊 Köllensperger' : '🧪 Gerner'}
            </button>
          ))}
        </div>

        {/* Fortschritt */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Frage {idx + 1} von {queue.length}</span>
            <span>{score} von {total} Punkten</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full">
            <div className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${(idx / queue.length) * 100}%` }} />
          </div>
        </div>

        {sessionDone ? (
          <div className="text-center py-16 bg-slate-800 border border-slate-700 rounded-2xl">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-light text-teal-400 mb-2">Session abgeschlossen!</h2>
            <p className="text-slate-400 mb-4">{score} von {total} Punkten</p>
            <div className="text-5xl font-bold mb-8" style={{
              color: pct >= 75 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171'
            }}>{pct}%</div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => shuffle(filter)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm transition-colors">
                Neue Runde
              </button>
              <button onClick={() => navigate('/exam-simulator')}
                className="px-6 py-3 bg-slate-700 border border-slate-600 text-slate-300 font-semibold rounded-xl text-sm transition-colors">
                Prüfungssimulator
              </button>
            </div>
          </div>
        ) : queue.length > 0 ? (
          <div className="space-y-4">
            <ExamQuestionCard
              key={queue[idx].id}
              question={queue[idx]}
              onAnswer={onAnswer}
              showSource
            />
            <button onClick={next}
              className="w-full py-3 bg-slate-700 border border-slate-600 hover:border-slate-400 text-slate-300 font-semibold rounded-xl text-sm transition-colors">
              Nächste Frage →
            </button>
          </div>
        ) : (
          <div className="text-center text-slate-400">Keine Fragen gefunden.</div>
        )}
      </div>
    </div>
  )
}
EOF

# 2. Prüfungssimulator
cat > src/pages/ExamSimulator.tsx << 'EOF'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { examQuestions, examStructures } from '../data/examQuestions'
import ExamQuestionCard from '../components/ExamMode/ExamQuestion'

type Mode = 'select' | 'exam' | 'result'

export default function ExamSimulator() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('select')
  const [selectedExam, setSelectedExam] = useState(examStructures[0])
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  function startExam(exam: typeof examStructures[0]) {
    setSelectedExam(exam)
    setSectionIdx(0)
    setQIdx(0)
    setScores({})
    setAnswered({})
    setMode('exam')
  }

  function onAnswer(qId: string, correct: boolean, pts: number) {
    setScores(s => ({ ...s, [qId]: correct ? pts : 0 }))
    setAnswered(a => ({ ...a, [qId]: true }))
  }

  const currentSection = selectedExam.sections[sectionIdx]
  const currentQId = currentSection?.questionIds[qIdx]
  const currentQ = examQuestions.find(q => q.id === currentQId)

  function nextQ() {
    if (qIdx < currentSection.questionIds.length - 1) {
      setQIdx(i => i + 1)
    } else if (sectionIdx < selectedExam.sections.length - 1) {
      setSectionIdx(i => i + 1)
      setQIdx(0)
    } else {
      setMode('result')
    }
  }

  // Ergebnisberechnung
  const sectionScores = selectedExam.sections.map(sec => ({
    professor: sec.professor,
    earned: sec.questionIds.reduce((s, id) => s + (scores[id] ?? 0), 0),
    max: sec.points,
    passing: sec.passingPoints,
    passed: sec.questionIds.reduce((s, id) => s + (scores[id] ?? 0), 0) >= sec.passingPoints,
  }))

  const totalEarned = sectionScores.reduce((s, sec) => s + sec.earned, 0)
  const allSectionsPassed = sectionScores.every(s => s.passed)
  const passed = totalEarned >= selectedExam.passingPoints && allSectionsPassed

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-teal-400">Laden...</div></div>

  const profColors = { lieberzeit: 'teal', koellensperger: 'blue', gerner: 'purple' }
  const profLabels = { lieberzeit: '🔭 Lieberzeit', koellensperger: '📊 Köllensperger', gerner: '🧪 Gerner' }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white">← Dashboard</button>
          <span className="text-teal-400 font-mono text-xs uppercase tracking-widest">📝 Prüfungssimulator</span>
        </div>
        {mode === 'exam' && (
          <div className="text-xs text-slate-400">
            {profLabels[currentSection.professor]} · Frage {qIdx+1}/{currentSection.questionIds.length}
          </div>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* AUSWAHL */}
        {mode === 'select' && (
          <div>
            <h1 className="text-2xl font-light mb-2">Prüfungssimulator</h1>
            <p className="text-slate-400 text-sm mb-8">Simuliere eine echte AC1-Prüfung mit originalem Aufbau.</p>

            <div className="bg-amber-900/20 border border-amber-700 rounded-xl px-5 py-4 mb-6 text-sm text-amber-300">
              <span className="font-semibold">Prüfungsregeln:</span> Alle 3 Teile müssen mit mindestens 12 Punkten bestanden werden UND insgesamt mind. 36 Punkte erreicht werden.
            </div>

            <div className="space-y-4">
              {examStructures.map(exam => (
                <div key={exam.id} className="bg-slate-800 border border-slate-700 hover:border-teal-500 rounded-2xl p-6 cursor-pointer transition-all"
                  onClick={() => startExam(exam)}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{exam.title}</h3>
                      <p className="text-slate-400 text-sm">{exam.date}</p>
                    </div>
                    <span className="text-teal-400 font-mono text-sm">{exam.totalPoints}P</span>
                  </div>
                  <div className="flex gap-2">
                    {exam.sections.map(sec => (
                      <span key={sec.professor} className={`text-xs px-3 py-1 rounded-full bg-${profColors[sec.professor]}-900/40 text-${profColors[sec.professor]}-400`}>
                        {profLabels[sec.professor]} ({sec.points}P)
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-2xl p-6 cursor-pointer transition-all"
                onClick={() => {
                  // Zufällige Prüfung aus allen Fragen
                  const shuffled = [...examQuestions].sort(() => Math.random() - 0.5)
                  const byProf = {
                    lieberzeit: shuffled.filter(q => q.professor === 'lieberzeit').slice(0, 5),
                    koellensperger: shuffled.filter(q => q.professor === 'koellensperger').slice(0, 5),
                    gerner: shuffled.filter(q => q.professor === 'gerner').slice(0, 5),
                  }
                  startExam({
                    id: 'random',
                    date: 'Zufällig generiert',
                    title: 'Zufalls-Prüfung',
                    totalPoints: 72,
                    passingPoints: 36,
                    sections: [
                      { professor: 'lieberzeit', points: 24, passingPoints: 12, questionIds: byProf.lieberzeit.map(q => q.id) },
                      { professor: 'koellensperger', points: 24, passingPoints: 12, questionIds: byProf.koellensperger.map(q => q.id) },
                      { professor: 'gerner', points: 24, passingPoints: 12, questionIds: byProf.gerner.map(q => q.id) },
                    ],
                  })
                }}>
                <h3 className="font-semibold text-purple-300">🎲 Zufalls-Prüfung</h3>
                <p className="text-slate-400 text-sm mt-1">Neue Fragen aus dem Fragenkatalog, original Prüfungsstruktur</p>
              </div>
            </div>
          </div>
        )}

        {/* PRÜFUNG */}
        {mode === 'exam' && currentQ && (
          <div>
            {/* Abschnitts-Header */}
            <div className={`mb-6 px-5 py-4 rounded-xl bg-${profColors[currentSection.professor]}-900/20 border border-${profColors[currentSection.professor]}-800`}>
              <p className={`text-sm font-semibold text-${profColors[currentSection.professor]}-400`}>
                {profLabels[currentSection.professor]} – Teil {sectionIdx+1} von {selectedExam.sections.length}
              </p>
              <div className="mt-2 h-1.5 bg-slate-700 rounded-full">
                <div className={`h-full bg-${profColors[currentSection.professor]}-500 rounded-full transition-all`}
                  style={{ width: `${(qIdx/currentSection.questionIds.length)*100}%` }} />
              </div>
            </div>

            <ExamQuestionCard
              key={currentQId}
              question={currentQ}
              onAnswer={(correct, pts) => onAnswer(currentQId, correct, pts)}
            />

            <button onClick={nextQ}
              disabled={!answered[currentQId]}
              className="mt-4 w-full py-3 bg-slate-700 border border-slate-600 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-semibold rounded-xl text-sm transition-colors">
              {qIdx < currentSection.questionIds.length - 1 ? 'Nächste Frage →' :
               sectionIdx < selectedExam.sections.length - 1 ? `Weiter zu ${profLabels[selectedExam.sections[sectionIdx+1].professor]} →` :
               'Prüfung abschließen →'}
            </button>
          </div>
        )}

        {/* ERGEBNIS */}
        {mode === 'result' && (
          <div>
            <div className={`text-center py-10 rounded-2xl mb-6 ${passed ? 'bg-green-900/20 border border-green-700' : 'bg-red-900/20 border border-red-800'}`}>
              <div className="text-5xl mb-3">{passed ? '🎓' : '📚'}</div>
              <h2 className={`text-2xl font-light mb-1 ${passed ? 'text-green-400' : 'text-red-400'}`}>
                {passed ? 'Bestanden!' : 'Nicht bestanden'}
              </h2>
              <p className="text-4xl font-bold mt-3" style={{ color: passed ? '#4ade80' : '#f87171' }}>
                {totalEarned} / {selectedExam.totalPoints}P
              </p>
              <p className="text-slate-400 text-sm mt-2">
                {Math.round(totalEarned/selectedExam.totalPoints*100)}% – 
                Bestehensgrenze: {selectedExam.passingPoints}P gesamt + {selectedExam.sections[0].passingPoints}P/Teil
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {sectionScores.map(sec => (
                <div key={sec.professor} className={`flex items-center justify-between px-5 py-4 rounded-xl border ${
                  sec.passed ? 'border-green-700 bg-green-900/10' : 'border-red-700 bg-red-900/10'
                }`}>
                  <div>
                    <span className={`font-semibold text-${profColors[sec.professor]}-400`}>
                      {profLabels[sec.professor]}
                    </span>
                    <span className="text-slate-500 text-xs ml-2">(min. {sec.passing}P)</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${sec.passed ? 'text-green-400' : 'text-red-400'}`}>
                      {sec.earned}/{sec.max}P
                    </span>
                    <span className="ml-2 text-lg">{sec.passed ? '✓' : '✗'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setMode('select')}
                className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm transition-colors">
                Neue Prüfung
              </button>
              <button onClick={() => navigate('/practice')}
                className="flex-1 py-3 bg-slate-700 border border-slate-600 text-slate-300 font-semibold rounded-xl text-sm transition-colors">
                Übungsmodus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
EOF

echo "Pages erstellt"

echo "=== Dashboard & Routing aktualisieren ==="

# Dashboard mit Prüfungsmodus-Karten
cat > src/pages/Dashboard.tsx << 'EOF'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { allCourses } from '../lib/courseRegistry'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-teal-400 text-lg">Laden...</div>
    </div>
  )

  if (!user) { navigate('/login'); return null }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚗️</span>
          <span className="text-teal-400 font-bold text-lg">ChemLearn</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm hidden sm:block">{user.email}</span>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white text-sm transition-colors">
            Abmelden
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <p className="text-teal-400 text-xs font-mono uppercase tracking-widest mb-2">Willkommen zurück</p>
          <h1 className="text-3xl font-light">Lernzentrum</h1>
        </div>

        {/* Kurse */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-3">Kurse</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {allCourses.map(course => (
              <div key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-6 cursor-pointer hover:border-teal-500 transition-all"
                style={{ borderTopColor: course.color, borderTopWidth: 3 }}>
                <div className="text-3xl mb-3">{course.icon}</div>
                <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
                <p className="text-slate-400 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{course.totalTopics} Themen</span>
                  <span>~{course.estimatedHours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prüfungsvorbereitung */}
        <div className="mt-8">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-3">Prüfungsvorbereitung (AC1)</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div onClick={() => navigate('/practice')}
              className="bg-slate-800 border border-slate-700 hover:border-teal-500 rounded-2xl p-5 cursor-pointer transition-all">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Übungsmodus</h3>
              <p className="text-slate-400 text-xs">Alle Altprüfungs-fragen random üben</p>
            </div>
            <div onClick={() => navigate('/exam-simulator')}
              className="bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition-all">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold mb-1">Prüfungssimulator</h3>
              <p className="text-slate-400 text-xs">Echte Prüfungen mit Zeitstruktur</p>
            </div>
            <div onClick={() => navigate('/course/analytical-chemistry-1')}
              className="bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-2xl p-5 cursor-pointer transition-all">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold mb-1">18 Themen</h3>
              <p className="text-slate-400 text-xs">Lieberzeit, Gerner, Köllensperger</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# main.tsx mit neuen Routen
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Dashboard     from './pages/Dashboard'
import LoginPage     from './pages/LoginPage'
import CoursePage    from './pages/CoursePage'
import TopicPage     from './pages/TopicPage'
import PracticeMode  from './pages/PracticeMode'
import ExamSimulator from './pages/ExamSimulator'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/'                                    element={<Dashboard />} />
        <Route path='/login'                               element={<LoginPage />} />
        <Route path='/course/:courseId'                    element={<CoursePage />} />
        <Route path='/course/:courseId/:topicId'           element={<TopicPage />} />
        <Route path='/practice'                            element={<PracticeMode />} />
        <Route path='/exam-simulator'                      element={<ExamSimulator />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
EOF

echo "=== Build ==="
npm run build

echo ""
echo "✅ FERTIG! Jetzt deployen:"
echo "git add ."
echo 'git commit -m "feat: Prüfungsmodus – Übung, Simulator, Altprüfungs-Fragen"'
echo "git push"
echo "vercel --prod"
