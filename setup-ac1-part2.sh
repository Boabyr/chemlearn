#!/bin/bash
# ChemLearn AC1 Part 2 – Neue Themen + Prüfungsmodus
# Auf dem Debian-Server ausführen: bash setup-ac1-part2.sh
set -e
cd /srv/chemlearn

echo "=== Schritt 1: Ordner anlegen ==="
mkdir -p src/courses/analytical-chemistry-1/topics
mkdir -p src/pages
mkdir -p src/components/ExamMode

echo "=== Schritt 2: course index ==="
cat > src/courses/analytical-chemistry-1/index.ts << 'EOF'
export const course = {
  id: "analytical-chemistry-1",
  title: "Analytische Chemie 1",
  subtitle: "Spektrometrie, Elektrochemie & Sensorik",
  icon: "🔭",
  color: "#3b82f6",
  level: "Uni",
  description: "Spektrometrische und elektrochemische Analysemethoden: Lambert-Beer, FT-IR, Raman, Fluoreszenz, Röntgenspektroskopie, Potentiometrie, Voltammetrie, Chemosensoren, Chromatographie und Statistik.",
  topics: [
    "01-grundlagen-spektroskopie",
    "02-lambert-beer",
    "03-fluoreszenz-lumineszenz",
    "04-ftir-raman",
    "05-roentgenspektroskopie",
    "06-elektrochemische-grundlagen",
    "07-potentiometrie-nernst",
    "08-voltammetrie-coulometrie",
    "09-chemosensoren",
    "10-statistik-qualitaet",
    "11-saeurebase-ph",
    "12-faellungsreaktionen",
    "13-chromatographie-grundlagen",
    "14-trennverfahren-gc-hplc",
    "15-kalibrierung-standardaddition",
    "16-atomspektrometrie",
    "17-elektroden-faellungstitration",
    "18-fehlerrechnung",
  ],
  totalTopics: 18,
  estimatedHours: 40,
};
EOF

echo "=== Schritt 3: Topics 10-18 ==="

cat > src/courses/analytical-chemistry-1/topics/10-statistik-qualitaet.ts << 'EOF'
export const topic = {
  id: "10-statistik-qualitaet",
  title: "Statistik & Qualitätssicherung",
  subtitle: "Normalverteilung, LOD, Präzision, Richtigkeit, Q-Test",
  icon: "📊",
  estimatedMinutes: 70,
  theory: `
## Grundbegriffe der Analytischen Statistik

### Lage- und Streumaße

**Mittelwert (arithmetisch):**
x̄ = (1/n) · Σxᵢ

**Standardabweichung s (Stichprobe):**
s = √[Σ(xᵢ - x̄)² / (n-1)]

**Varianz:** s²

**Relative Standardabweichung (RSD):**
RSD = s/x̄ · 100%

### Normalverteilung (Gauß)

- Symmetrisch um Mittelwert μ
- 68,3% der Werte: μ ± 1σ
- 95,4% der Werte: μ ± 2σ
- 99,7% der Werte: μ ± 3σ

### Präzision vs. Richtigkeit

| | Hohe Präzision | Niedrige Präzision |
|---|---|---|
| Hohe Richtigkeit | ✓ Ideal | Systematisch OK, random schlecht |
| Niedrige Richtigkeit | Systematischer Fehler | Alles schlecht |

**Präzision** = Wiederholbarkeit (zufällige Fehler)
**Richtigkeit** = Übereinstimmung mit wahrem Wert (systematische Fehler)

### Fehlerarten

**Zufällige Fehler (Random errors):**
- Statistisch verteilt
- Durch Wiederholung reduzierbar
- Beeinflussen Präzision

**Systematische Fehler (Systematic errors):**
- Immer gleiche Richtung
- Nicht durch Wiederholung erkennbar
- Beeinflussen Richtigkeit
- Erkennung: Blindwert, zertifizierte Referenzmaterialien

### Q-Test (Ausreißertest)

Dient zum Erkennen von Ausreißern in Datensätzen.

**Berechnung:**
Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min)

Wenn Q_exp > Q_krit (aus Tabelle, abhängig von n und Konfidenzniveau):
→ Ausreißer darf verworfen werden!

### Nachweisgrenze (LOD) und Bestimmungsgrenze (LOQ)

**Nachweisgrenze (LOD):**
c_LOD = 3 · s_Blind / m
(s_Blind = Standardabweichung des Blindwerts, m = Steigung Kalibriergerade)

**Bestimmungsgrenze (LOQ):**
c_LOQ = 10 · s_Blind / m

**Linearer Messbereich:** LOQ bis obere Linearitätsgrenze

### Vertrauensbereich (Konfidenzintervall)

x̄ ± t · s/√n

t = Student-Faktor (abhängig von n und Konfidenzniveau)
`,
  quiz: [
    { id: "q1", question: "Was unterscheidet zufällige von systematischen Fehlern?", options: ["Zufällige Fehler sind größer", "Zufällige Fehler streuen statistisch und beeinflussen die Präzision; systematische Fehler haben immer gleiche Richtung und beeinflussen die Richtigkeit", "Systematische Fehler können durch Wiederholung erkannt werden", "Zufällige Fehler entstehen durch Gerätkalibrierfehler"], correct: 1, explanation: "Zufällige Fehler: statistisch verteilt, beeinflussen Präzision, durch Wiederholung reduzierbar. Systematische Fehler: konstante Abweichung, beeinflussen Richtigkeit, nur durch Blindwerte/Referenzmaterialien erkennbar." },
    { id: "q2", question: "Die Nachweisgrenze LOD berechnet sich als:", options: ["LOD = s_Blind / m", "LOD = 3 · s_Blind / m", "LOD = 10 · s_Blind / m", "LOD = s_Blind · m"], correct: 1, explanation: "LOD = 3 · s_Blind / m. Der Faktor 3 entspricht einem Signal, das 3σ über dem Rauschen liegt (99,7% Sicherheit). LOQ = 10 · s_Blind / m (quantitative Bestimmung möglich)." },
    { id: "q3", question: "Was prüft der Q-Test?", options: ["Ob zwei Messreihen gleiche Varianz haben", "Ob ein Datenpunkt ein statistischer Ausreißer ist und verworfen werden darf", "Ob die Normalverteilung vorliegt", "Ob der Mittelwert signifikant vom Referenzwert abweicht"], correct: 1, explanation: "Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min). Falls Q_exp > Q_krit (Tabellenwert): Ausreißer kann verworfen werden. Q_krit hängt von n und gewähltem Konfidenzniveau ab." },
    { id: "q4", question: "Welcher Prozentsatz aller Messwerte liegt bei einer Normalverteilung im Bereich μ ± 2σ?", options: ["68,3%", "90,0%", "95,4%", "99,7%"], correct: 2, explanation: "μ ± 1σ: 68,3%. μ ± 2σ: 95,4%. μ ± 3σ: 99,7%. Diese Werte sind prüfungsrelevant! Bei A = 0.05 (5% Fehlerrisiko) entspricht das ±2σ." },
    { id: "q5", question: "Ein Messergebnis ist präzise aber nicht richtig. Was bedeutet das?", options: ["Zufällige und systematische Fehler vorhanden", "Hohe Wiederholbarkeit (niedrige Streuung) aber systematischer Fehler – Ergebnisse liegen konsistent daneben", "Niedrige Wiederholbarkeit und zufällige Fehler", "Gar kein Fehler vorhanden"], correct: 1, explanation: "Präzise: niedrige Streuung (gute Präzision/Wiederholbarkeit). Nicht richtig: systematischer Fehler → Ergebnisse liegen konsistent neben dem wahren Wert. Korrektur: Blindwertkorrektur, zertifizierte Referenzmaterialien." },
    { id: "q6", question: "Wie berechnet sich die relative Standardabweichung (RSD)?", options: ["RSD = s²/x̄", "RSD = s/x̄ × 100%", "RSD = x̄/s × 100%", "RSD = √(s/x̄)"], correct: 1, explanation: "RSD = s/x̄ × 100%. Dimensionslos, in Prozent angegeben. Ermöglicht den Vergleich von Präzision bei verschiedenen Konzentrationen. Typische analytische RSD: <5% für gute Methoden." },
  ],
  flashcards: [
    { front: "Standardabweichung s", back: "s = √[Σ(xᵢ-x̄)²/(n-1)]. Maß für Streuung. Beachte: n-1 (nicht n) für Stichproben (Freiheitsgrad). RSD = s/x̄ × 100% (relativ, in %)." },
    { front: "Q-Test (Ausreißertest)", back: "Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min). Falls Q_exp > Q_krit → Ausreißer darf verworfen werden. Q_krit aus Tabelle (abhängig von n und α)." },
    { front: "LOD und LOQ", back: "LOD = 3·s_Blind/m (Nachweisgrenze, 3σ-Kriterium). LOQ = 10·s_Blind/m (Bestimmungsgrenze). m = Steigung Kalibriergerade. Signal muss > LOD für Nachweis, > LOQ für Quantifizierung." },
    { front: "Präzision vs. Richtigkeit", back: "Präzision: Wiederholbarkeit, zufällige Fehler, beeinflusst Streuung. Richtigkeit: Übereinstimmung mit wahrem Wert, systematische Fehler, beeinflusst Mittelwert. Beides zusammen = Genauigkeit (Accuracy)." },
    { front: "Normalverteilung – Kennzahlen", back: "μ ± 1σ: 68,3%. μ ± 2σ: 95,4%. μ ± 3σ: 99,7%. Gauß-Glocke. Voraussetzung für viele statistische Tests (t-Test, F-Test)." },
    { front: "Vertrauensbereich", back: "x̄ ± t·s/√n. t = Student-Faktor (Tabelle, abhängig von n und Konfidenzniveau). Mit mehr Messungen (größeres n): engerer Vertrauensbereich." },
  ],
};
EOF

cat > src/courses/analytical-chemistry-1/topics/11-saeurebase-ph.ts << 'EOF'
export const topic = {
  id: "11-saeurebase-ph",
  title: "Säure-Base-Gleichgewichte & pH",
  subtitle: "pH-Berechnungen, Puffer, Massenwirkungsgesetz",
  icon: "⚗️",
  estimatedMinutes: 75,
  theory: `
## Grundlagen

**pH-Definition:**
pH = -log[H₃O⁺]  (bei verdünnten Lösungen ≈ -log[H⁺])

pOH = -log[OH⁻]
pH + pOH = 14  (bei 25°C)

**Ionenprodukt des Wassers:**
Kw = [H₃O⁺][OH⁻] = 10⁻¹⁴ (bei 25°C)
pKw = 14

## Starke Säuren und Basen

**Starke Säure (vollständige Dissoziation):**
HCl → H⁺ + Cl⁻
pH = -log(c_Säure)  (wenn c > 10⁻⁶ mol/L)

**Starke Base:**
NaOH → Na⁺ + OH⁻
pOH = -log(c_Base)
pH = 14 - pOH

**Beispiel:** 1 ml 1M HCl auf 1L verdünnt:
c(HCl) = 0,001/1 = 10⁻³ mol/L
pH = -log(10⁻³) = 3

## Schwache Säuren

**Dissoziation:** HA ⇌ H⁺ + A⁻

**Massenwirkungsgesetz → pKs:**
Ka = [H⁺][A⁻] / [HA]
pKs = -log(Ka)

**pH-Berechnung (schwache Säure):**
[H⁺] = √(Ka · c₀)  (wenn Ka << c₀)
pH = ½(pKs - log c₀)

## Henderson-Hasselbalch (Pufferlösung)

**Puffer = schwache Säure + konjugierte Base:**
pH = pKs + log([A⁻]/[HA])

**Beispiel (Essigsäure-Acetat-Puffer, pKs = 4,76):**
Gleiche Anteile Essigsäure und Acetat → pH = pKs = 4,76

**Pufferkapazität:** maximal bei pH = pKs
Praktische Pufferwirkung: pH = pKs ± 1

## Herleitung pKs aus Massenwirkungsgesetz

HA ⇌ H⁺ + A⁻
Ka = [H⁺]·[A⁻] / [HA]
-log(Ka) = pKs
-log[H⁺] = pH

Bei halbäquivalenter Zugabe (Titration): [HA] = [A⁻]
→ pH = pKs  (Henderson-Hasselbalch)

## Isoelektrischer Punkt (IEP)

Aminosäuren sind Zwitterionen (beide Ladungen gleich null).
pI = ½(pKs1 + pKs2)
Am IEP: geringste Löslichkeit, keine Wanderung im elektrischen Feld.

## Wichtige Rechenbeispiele (prüfungsrelevant!)

**1 ml 1M HCl + Wasser → 1L:**
c = 10⁻³ mol/L → pH = 3

**9,1g NaCl + 12g NaOH in 500ml:**
NaCl: neutral (starkes Salz)
NaOH: n = 12/40 = 0,3 mol → c = 0,6 mol/L
pH = 14 - pOH = 14 - (-log 0,6) = 14 - 0,22 = 13,78

**0,1M Essigsäure (pKs=4,76) auf 1L:**
pH = ½(4,76 - log 0,01) = ½(4,76 + 2) = ½(6,76) ... 
[H⁺] = √(Ka · c) = √(1,74×10⁻⁵ × 0,01) = √(1,74×10⁻⁷) = 4,17×10⁻⁴
pH = 3,38
`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "henderson-hasselbalch",
      name: "Henderson-Hasselbalch (Puffer)",
      equation: "pH = pKs + log([A⁻]/[HA])",
      variables: [
        { id: "pH", label: "pH-Wert", symbol: "pH", unit: "—", description: "Gesuchter pH-Wert" },
        { id: "pKs", label: "pKs der Säure", symbol: "pKs", unit: "—", description: "z.B. Essigsäure: 4.76" },
        { id: "ratio", label: "log([A⁻]/[HA])", symbol: "log(c_B/c_S)", unit: "—", description: "log(Konzentration Base / Konzentration Säure)" },
      ],
      solve: (inputs: Record<string, any>) => {
        const sf = inputs.solveFor as string;
        if (sf === "pH") return { pH: inputs.pKs + inputs.ratio };
        if (sf === "pKs") return { pKs: inputs.pH - inputs.ratio };
        if (sf === "ratio") return { ratio: inputs.pH - inputs.pKs };
        return {};
      },
      hints: [
        "Henderson-Hasselbalch: pH = pKs + log([A⁻]/[HA]). Bei gleichen Konzentrationen: log(1)=0 → pH = pKs. Pufferoptimum bei pH = pKs.",
        "Beispiel Acetat-Puffer: pKs(Essigsäure) = 4,76. Gleiche Teile Essigsäure und NaAcetat → pH = 4,76. 10:1 Acetat:Essigsäure → pH = 4,76 + 1 = 5,76."
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Wie berechnet man den pH einer 0,01 M HCl-Lösung?", options: ["pH = -log(0,01) = 2", "pH = 0,01", "pH = log(0,01) = -2", "pH = 14 - log(0,01) = 12"], correct: 0, explanation: "HCl ist eine starke Säure (vollständige Dissoziation). [H⁺] = c(HCl) = 0,01 mol/L = 10⁻² mol/L. pH = -log(10⁻²) = 2." },
    { id: "q2", question: "Was beschreibt die Henderson-Hasselbalch-Gleichung?", options: ["pH einer starken Säure", "pH = pKs + log([A⁻]/[HA]) – pH eines Puffersystems", "Löslichkeitsprodukt einer Fällung", "Nernst-Gleichung für Elektroden"], correct: 1, explanation: "Henderson-Hasselbalch: pH = pKs + log([Konjugierte Base]/[Säure]). Gilt für Pufferlösungen. Bei [A⁻]=[HA]: pH = pKs. Pufferwirkung optimal bei pH = pKs ± 1." },
    { id: "q3", question: "9,1g NaCl und 12g NaOH werden in 500ml gelöst. Was bestimmt den pH?", options: ["NaCl (da mehr Gramm)", "NaOH allein (NaCl ist ein Salz einer starken Säure und Base – neutral)", "Beide gemeinsam", "Wasser bestimmt immer den pH"], correct: 1, explanation: "NaCl: Salz aus starker Säure (HCl) und starker Base (NaOH) → neutral, keine pH-Wirkung. NaOH: 12g / 40g/mol = 0,3 mol in 0,5L → c = 0,6 mol/L. pOH = -log(0,6) = 0,22. pH = 14 - 0,22 = 13,78." },
    { id: "q4", question: "Was ist der isoelektrische Punkt einer Aminosäure?", options: ["pH bei dem sie am besten löslich ist", "pH bei dem die Nettoladung null ist (Zwitterion) – pI = ½(pKs1 + pKs2)", "pH bei dem sie am stärksten sauer ist", "pKs-Wert der Aminogruppe"], correct: 1, explanation: "pI = ½(pKs1 + pKs2). Am isoelektrischen Punkt: Zwitterion (beide Ladungen gleich), Nettoladung = 0, geringste Löslichkeit, keine elektrophoretische Wanderung. Wichtig für SDS-PAGE und IEF." },
    { id: "q5", question: "Wie leitet man pKs aus dem Massenwirkungsgesetz her?", options: ["Direkt aus der Konzentration", "Ka = [H⁺][A⁻]/[HA] → pKs = -log(Ka)", "pKs = pH/2", "pKs = 14 - pKb"], correct: 1, explanation: "Herleitung: HA ⇌ H⁺ + A⁻. Ka = [H⁺][A⁻]/[HA] (Massenwirkungsgesetz). pKs = -log(Ka). Bei halbäquivalenter Zugabe: [HA]=[A⁻] → Ka = [H⁺] → pH = pKs." },
    { id: "q6", question: "1ml 1M Essigsäure (pKs=4,6) + 0,5ml 1M NaOH auf 1L: Was entsteht?", options: ["Reine Essigsäurelösung", "Pufferlösung aus Essigsäure und Acetat, pH ≈ pKs = 4,6", "Reine Natriumacetatlösung", "Neutrale Lösung"], correct: 1, explanation: "n(Essigsäure) = 0,001 mol, n(NaOH) = 0,0005 mol. NaOH neutralisiert die Hälfte der Essigsäure: 0,0005 mol Acetat und 0,0005 mol Essigsäure entstehen → Puffer! [A⁻]=[HA] → pH = pKs = 4,6." },
  ],
  flashcards: [
    { front: "Henderson-Hasselbalch", back: "pH = pKs + log([A⁻]/[HA]). Puffer: schwache Säure + konjugierte Base. pH = pKs bei gleichen Konzentrationen. Pufferbereich: pKs ± 1. Kapazität maximal bei pH = pKs." },
    { front: "pH starke Säure/Base", back: "Starke Säure: pH = -log(c). Starke Base: pOH = -log(c), pH = 14-pOH. Vollständige Dissoziation! Beispiel: 0,01M HCl → pH = 2; 0,01M NaOH → pH = 12." },
    { front: "pH schwache Säure", back: "[H⁺] = √(Ka·c₀) wenn Ka << c₀. pH = ½(pKs - log c₀). Nur teilweise Dissoziation! Beispiel: 0,01M Essigsäure (pKs=4,76): pH ≈ ½(4,76+2) = 3,38." },
    { front: "Isoelektrischer Punkt pI", back: "pI = ½(pKs1 + pKs2). Nettoladung = 0 (Zwitterion). Geringste Löslichkeit. Keine elektrophoretische Wanderung. Wichtig: Aminosäuren, Proteine, isoelektrische Fokussierung (IEF)." },
    { front: "pKs aus Massenwirkungsgesetz", back: "HA ⇌ H⁺ + A⁻. Ka = [H⁺][A⁻]/[HA]. pKs = -log(Ka). Bei Halbäquivalenzpunkt der Titration: [HA]=[A⁻] → pH = pKs. Direkte Bestimmung aus Titrationskurve!" },
    { front: "Ionenprodukt des Wassers", back: "Kw = [H⁺][OH⁻] = 10⁻¹⁴ (bei 25°C). pKw = 14. pH + pOH = 14. Reines Wasser: pH = 7 ([H⁺]=[OH⁻]=10⁻⁷ mol/L)." },
  ],
};
EOF

cat > src/courses/analytical-chemistry-1/topics/12-faellungsreaktionen.ts << 'EOF'
export const topic = {
  id: "12-faellungsreaktionen",
  title: "Fällungsreaktionen & Gravimetrie",
  subtitle: "Löslichkeitsprodukt, Fällung, Gravimetrie, Sulfidtrenngang",
  icon: "🧪",
  estimatedMinutes: 65,
  theory: `
## Löslichkeitsprodukt Ksp

Für schwerlösliches Salz AB:
AB(s) ⇌ A⁺(aq) + B⁻(aq)
Ksp = [A⁺][B⁻]

Löslichkeit s: [A⁺] = [B⁻] = s → Ksp = s²

**Beispiel AgCl:** Ksp = 1,8×10⁻¹⁰
s = √(1,8×10⁻¹⁰) = 1,34×10⁻⁵ mol/L

## Fällung und gemeinsamer Ioneneffekt

Zugabe eines gemeinsamen Ions verringert die Löslichkeit!

**Beispiel:** AgNO₃ zu AgCl:
[Ag⁺] erhöht → [Cl⁻] muss sinken → AgCl fällt aus.

**Fällungsbedingung:** [A⁺]·[B⁻] > Ksp

## Sulfidtrenngang (prüfungsrelevant!)

H₂S-Fällung aus saurer Lösung (pH = 3):

**Gruppe 1 (fällen bei pH 3):** Cu²⁺, Cd²⁺, Hg²⁺ → sehr kleines Ksp
**Gruppe 2 (fällen erst bei neutral/basisch):** Mn²⁺, Fe²⁺ → größeres Ksp
**Nicht gefällt:** Mg²⁺, Ca²⁺, Na⁺, K⁺

**Prüfungsaufgabe-Typ:**
Cu, Cd, Fe, Mn in pH 3 + H₂S:
- CuS (Ksp = 6×10⁻³⁶): FÄLLT
- CdS (Ksp = 8×10⁻²⁷): FÄLLT
- FeS (Ksp = 6×10⁻¹⁸): FÄLLT NICHT bei pH 3
- MnS (Ksp = 3×10⁻¹⁴): FÄLLT NICHT bei pH 3

## Gravimetrie

**Prinzip:** Analyt wird als schwerlöslicher Niederschlag gefällt, abfiltriert und als definierte Verbindung gewogen.

**Schritte:**
1. Auflösung der Probe
2. Fällung (gezielt, quantitativ)
3. Verdauen (Kristalle wachsen lassen)
4. Filtrieren + Waschen
5. Glühen (→ definierte Zusammensetzung)
6. Wägen

**Beispiel:** Fe³⁺ → Fe₂O₃
n(Fe) = 2 · n(Fe₂O₃)
m(Fe) = n · M(Fe) = [m(Fe₂O₃)/M(Fe₂O₃)] · 2 · M(Fe)

**Vorteile:** absolutes Verfahren, keine Kalibrierung
**Nachteile:** zeitaufwendig, nur für Hauptbestandteile geeignet

## Löslichkeitsprodukt und analytische Anwendungen

**Fällungstitration (Argentometrie):**
Ag⁺ + Cl⁻ → AgCl↓
Nachweis über Potentiometrie oder Indikator (Mohr, Volhard, Fajans)

**Berechnung der Löslichkeit:**
Ksp(CaF₂) = [Ca²⁺][F⁻]² = s · (2s)² = 4s³
s = ∛(Ksp/4)
`,
  quiz: [
    { id: "q1", question: "Welche Ionen werden aus einer Lösung mit Cu²⁺, Cd²⁺, Fe²⁺, Mn²⁺ bei pH 3 durch H₂S quantitativ gefällt?", options: ["Alle vier Ionen", "Nur Fe²⁺ und Mn²⁺", "Nur Cu²⁺ und Cd²⁺ (sehr kleines Ksp)", "Keiner der Ionen"], correct: 2, explanation: "Bei pH 3: [S²⁻] ist niedrig. Nur Sulfide mit sehr kleinem Ksp (Cu²⁺, Cd²⁺) fallen quantitativ aus. FeS und MnS haben größere Ksp → fallen erst bei höherem pH (weniger sauer). Klassischer Sulfidtrenngang!" },
    { id: "q2", question: "Was ist das Löslichkeitsprodukt Ksp?", options: ["Konzentration eines gesättigten Salzes", "Gleichgewichtskonstante für die Dissoziation eines schwerlöslichen Salzes: Ksp = [Kation]·[Anion]", "Produkt der Fällungsreagenz-Konzentrationen", "pH bei der Fällung"], correct: 1, explanation: "Ksp = [Kation]ˢ·[Anion]ᵗ für AB ⇌ A⁺ + B⁻. Fällt aus wenn Ionenprodukt > Ksp. Löslichkeit s aus Ksp: für AB: s=√Ksp; für CaF₂: s=∛(Ksp/4)." },
    { id: "q3", question: "Welches Verfahren ist die Gravimetrie?", options: ["Elektrochemische Analyse", "Spektroskopische Messung", "Quantitative Analyse durch Fällung, Filtrieren und Wägen einer definierten Verbindung", "Chromatographische Trennung"], correct: 2, explanation: "Gravimetrie: Fällung → Filtrieren → Waschen → Glühen → Wägen. Absolutes Verfahren (keine Kalibrierung). Sehr genau für Hauptbestandteile. Zeitaufwendig." },
    { id: "q4", question: "Wie beeinflusst der gemeinsame Ioneneffekt die Löslichkeit eines Salzes?", options: ["Erhöht sie immer", "Verringert sie: Zugabe eines gemeinsamen Ions verschiebt das Gleichgewicht zur Fällung", "Hat keinen Einfluss", "Hängt von der Temperatur ab"], correct: 1, explanation: "Gemeinsamer Ioneneffekt: Ksp = [Ag⁺][Cl⁻] = konstant. Zugabe von Ag⁺ → [Cl⁻] muss sinken → AgCl fällt aus. Löslichkeit sinkt. Anwendung: quantitative Fällung durch Überschuss des Fällungsreagenzes." },
    { id: "q5", question: "Wie berechnet man aus 0,5g Fe₂O₃ die Masse an Fe?", options: ["m(Fe) = m(Fe₂O₃)", "m(Fe) = m(Fe₂O₃) · 2·M(Fe)/M(Fe₂O₃)", "m(Fe) = m(Fe₂O₃) · M(Fe)/M(Fe₂O₃)", "m(Fe) = m(Fe₂O₃)/2"], correct: 1, explanation: "n(Fe₂O₃) = 0,5/159,7 = 0,00313 mol. n(Fe) = 2 × n(Fe₂O₃) = 0,00626 mol. m(Fe) = 0,00626 × 55,85 = 0,350g. Oder: m(Fe) = m(Fe₂O₃) × 2×55,85/159,7." },
    { id: "q6", question: "Warum ist Gravimetrie ein 'absolutes' Verfahren?", options: ["Weil es immer absolute Genauigkeit hat", "Weil keine Kalibrierung mit Standardlösungen nötig ist – man wiegt direkt die Substanz", "Weil es der absoluteste Fehler ist", "Weil es für alle Elemente gilt"], correct: 1, explanation: "Absolutes Verfahren: die Masse wird direkt gewogen, keine Kalibrierungsgerade nötig. Nur die stöchiometrische Umrechnung ist erforderlich. Voraussetzung: vollständige, saubere Fällung und definierte Zusammensetzung des Niederschlags." },
  ],
  flashcards: [
    { front: "Löslichkeitsprodukt Ksp", back: "AB ⇌ A⁺ + B⁻: Ksp = [A⁺][B⁻]. Fällung wenn [A⁺][B⁻] > Ksp. Löslichkeit: s=√Ksp (für 1:1-Salz). AgCl: Ksp=1,8×10⁻¹⁰, s=1,34×10⁻⁵ mol/L." },
    { front: "Sulfidtrenngang", back: "H₂S bei pH 3: Cu²⁺, Cd²⁺, Hg²⁺ (Ksp sehr klein) → FÄLLT. Fe²⁺, Mn²⁺, Ni²⁺, Co²⁺ (Ksp größer) → fällt NICHT bei pH 3 (erst bei neutral/basisch). Mg²⁺, Ca²⁺, Na⁺ → kein Sulfid." },
    { front: "Gravimetrie – Schritte", back: "1. Auflösung. 2. Fällung. 3. Verdauen (Ostwald-Reifung). 4. Filtrieren+Waschen. 5. Glühen (→ definierte Verbindung). 6. Wägen. Absolutes Verfahren, keine Kalibrierung." },
    { front: "Gemeinsamer Ioneneffekt", back: "Zugabe eines gemeinsamen Ions → Löslichkeit sinkt. Ksp = konstant: [Ag⁺] steigt → [Cl⁻] sinkt → AgCl fällt aus. Anwendung: quantitative Fällung durch Reagenzüberschuss." },
    { front: "Fe gravimetrisch bestimmen", back: "Fe³⁺ → Fe₂O₃ (nach Fällung als Fe(OH)₃ + Glühen). n(Fe) = 2·n(Fe₂O₃). m(Fe) = n·55,85. Umrechnungsfaktor: 2×55,85/159,7 = 0,6994." },
  ],
};
EOF

echo "Topics 10-12 erstellt"

cat > src/courses/analytical-chemistry-1/topics/13-chromatographie-grundlagen.ts << 'EOF'
export const topic = {
  id: "13-chromatographie-grundlagen",
  title: "Chromatographie – Grundlagen",
  subtitle: "Rf-Wert, Kapazitätsfaktor, Auflösung, van-Deemter, Trennstufenzahl",
  icon: "📈",
  estimatedMinutes: 90,
  theory: `
## Grundprinzip der Chromatographie

Trennung durch unterschiedliche Verteilung zwischen stationärer und mobiler Phase.

**Wichtige Begriffe:**

| Begriff | Symbol | Definition |
|---|---|---|
| Retentionszeit | tR | Zeit bis zum Elutionsmaximum |
| Totzeit | tM | Zeit für nicht-retardiertes Molekül |
| Kapazitätsfaktor | k' | (tR - tM) / tM |
| Rf-Wert (DC) | Rf | Laufstrecke Substanz / Laufstrecke Lösungsmittel |
| Selektivitätsfaktor | α | k'B / k'A (k'B > k'A) |
| Auflösung | Rs | 2(tR2-tR1) / (w1+w2) |

## Dünnschichtchromatographie (DC)

**Rf-Wert:**
Rf = Laufstrecke Substanz / Laufstrecke Lösungsmittelfront
(0 ≤ Rf ≤ 1)

**Rf = 0:** Substanz bleibt am Start (zu stark an stationärer Phase)
**Rf = 1:** Substanz läuft mit Lösungsmittelfront (zu schwach retardiert)
**Ideal:** Rf = 0,3 - 0,7

## Kapazitätsfaktor k'

k' = (tR - tM) / tM = (Masse in stat. Phase) / (Masse in mob. Phase)

Eluierungsreihenfolge: Substanz mit kleinstem k' eluiert zuerst!

**Verteilungskoeffizient K:** k' = K · VS/VM

## Auflösung Rs

Rs = 2(tR2 - tR1) / (w1 + w2)

Rs < 1.0: Peaks überlappen (ungenügende Trennung)
Rs = 1.0: ~98% Trennung
Rs = 1.5: Basislinienstrennung

## Trennstufenzahl N

N = 16 · (tR/w)²  (Basispeakbreite)
N = 5.545 · (tR/w₁/₂)²  (Halbwertsbreite)

**Trennstufenhöhe H:**
H = L/N  (L = Säulenlänge)

## Van-Deemter-Gleichung (prüfungsrelevant!)

H = A + B/u + C·u

| Term | Bezeichnung | Ursache |
|---|---|---|
| A | Eddy-Diffusion | Mehrwegigkeit (Partikelgröße!) |
| B/u | Longitudinale Diffusion | Diffusion in Fließrichtung |
| C·u | Massentransfer | Kinetik der Verteilung |

**Optimale Fließgeschwindigkeit u_opt:** Minimum der van-Deemter-Kurve

**Wie Trennleistung steigern?**
- Kleinere Partikelgröße (A sinkt, H sinkt, N steigt)
- Längere Säule (N ∝ L)
- Optimalere Fließgeschwindigkeit
- NICHT: Erhöhung des Drucks alleine

## Auflösung und Säulenlänge

Rs ∝ √N ∝ √L

Für Rs = 1,5 benötigte Länge:
L_neu = L_alt · (Rs_gewünscht / Rs_gemessen)²

## Praktische Rechenaufgabe (Prüfungsformat)

LC-Experiment: L=15cm, F=1ml/min, tM=5min
A: tR=6,5min, wB=0,73min
B: tR=9,2min, wB=0,57min

1. k'A = (6,5-5)/5 = 0,3; k'B = (9,2-5)/5 = 0,84
2. α = k'B/k'A = 0,84/0,3 = 2,8
3. Rs = 2(9,2-6,5)/(0,73+0,57) = 2·2,7/1,30 = 4,15
4. N_A = 16·(6,5/0,73)² = 16·79,2 = 1267
5. H = 15cm/1267 = 0,0118cm = 118μm
`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "aufloesung",
      name: "Chromatographische Auflösung",
      equation: "Rs = 2·(tR2 - tR1) / (w1 + w2)",
      variables: [
        { id: "Rs", label: "Auflösung", symbol: "Rs", unit: "—", description: "Chromatographische Auflösung" },
        { id: "dtR", label: "Δ Retentionszeit", symbol: "tR2-tR1", unit: "min", description: "Differenz der Retentionszeiten" },
        { id: "wsum", label: "Summe Peakbreiten", symbol: "w1+w2", unit: "min", description: "Summe der Basispeakbreiten" },
      ],
      solve: (inputs: Record<string, any>) => {
        const sf = inputs.solveFor as string;
        if (sf === "Rs") return { Rs: 2 * inputs.dtR / inputs.wsum };
        if (sf === "dtR") return { dtR: inputs.Rs * inputs.wsum / 2 };
        if (sf === "wsum") return { wsum: 2 * inputs.dtR / inputs.Rs };
        return {};
      },
      hints: [
        "Rs = 2·ΔtR/(w1+w2). Rs < 1.0: ungenügend. Rs = 1.0: ~98%. Rs = 1.5: Basislinie. Peakbreiten w in gleichen Einheiten wie Retentionszeiten!",
        "Trennstufenzahl: N = 16·(tR/w)². Trennstufenhöhe H = L/N. Rs ∝ √N ∝ √L. Säule verdoppeln → Rs×√2 = 1.41×Rs."
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Ein Rf-Wert von 0,9 bei der DC bedeutet:", options: ["Die Substanz bleibt am Start", "Die Substanz läuft fast mit der Lösungsmittelfront – zu wenig Retention an stationärer Phase", "Ideale Trennung", "Die Substanz ist in der mobilen Phase unlöslich"], correct: 1, explanation: "Rf = 0,9: Substanz läuft fast mit der Lösungsmittelfront → sehr wenig Retention. Ideal: Rf = 0,3-0,7. Lösung: polarere stationäre Phase oder weniger polare mobile Phase verwenden." },
    { id: "q2", question: "Welche Substanz eluiert bei der HPLC zuerst?", options: ["Die mit dem größten k'", "Die mit dem kleinsten k' (geringste Affinität zur stationären Phase)", "Die schwerste", "Die mit dem kleinsten Rf-Wert"], correct: 1, explanation: "k' = (tR-tM)/tM. Kleines k': kurze Retentionszeit, eluiert zuerst. Großes k': lange Retentionszeit, eluiert zuletzt. k'=0: Totzeit (Totvolumen, nicht retardiert)." },
    { id: "q3", question: "Was beschreibt der Term A in der van-Deemter-Gleichung H = A + B/u + Cu?", options: ["Longitudinale Diffusion", "Eddy-Diffusion (Mehrwegigkeit) – hängt von der Partikelgröße der stationären Phase ab", "Massentransfer-Kinetik", "Temperaturabhängigkeit"], correct: 1, explanation: "A = Eddy-Diffusion: Moleküle nehmen verschiedene Wege durch das Säulenbett → Bandenverbreiterung. A ∝ dp (Partikelgröße). Kleinere Partikel → kleineres A → bessere Trennleistung. Unabhängig von u!" },
    { id: "q4", question: "Retentionszeiten A=14,3min, B=17,1min, Peakbreiten 1,05 und 1,27min. Wie groß ist die Auflösung?", options: ["Rs = 1,2", "Rs = 2,3", "Rs = 4,2", "Rs = 0,8"], correct: 1, explanation: "Rs = 2·(17,1-14,3)/(1,05+1,27) = 2·2,8/2,32 = 5,6/2,32 = 2,41 ≈ 2,3. Sehr gute Trennung (Basislinie = 1,5)." },
    { id: "q5", question: "Wie beeinflusst die Partikelgröße der stationären Phase die Trennleistung?", options: ["Kleinere Partikel verschlechtern die Trennung", "Kleinere Partikel verbessern die Trennleistung (N steigt, H sinkt) – aber Druckabfall steigt!", "Partikelgröße hat keinen Einfluss", "Größere Partikel erhöhen N"], correct: 1, explanation: "Kleinere Partikel: A sinkt (weniger Mehrwegigkeit), C sinkt (schnellerer Massentransfer) → H sinkt → N = L/H steigt → bessere Trennung. Nachteil: höherer Druckabfall → braucht UHPLC (>400 bar)." },
    { id: "q6", question: "Eine Säule (L=25cm) liefert Rs=1,2. Wie lang muss sie sein für Rs=1,5?", options: ["31,25 cm", "39,06 cm", "45,00 cm", "50,00 cm"], correct: 1, explanation: "Rs ∝ √L. L_neu = L_alt × (Rs_neu/Rs_alt)² = 25 × (1,5/1,2)² = 25 × 1,5625 = 39,06 cm. Quadratische Abhängigkeit! Auflösung verdoppeln: Säule 4× länger." },
  ],
  flashcards: [
    { front: "Kapazitätsfaktor k'", back: "k' = (tR - tM) / tM. Dimensionslos. k'=0: nicht retardiert. k'=1: gleich viel Zeit in mob. und stat. Phase. Eluierungsreihenfolge: kleinstes k' zuerst. Ideal: k' = 2-10." },
    { front: "Van-Deemter-Gleichung", back: "H = A + B/u + Cu. A: Eddy-Diffusion (Partikelgröße). B/u: Longitudinale Diffusion (langsam → viel Diffusion). Cu: Massentransfer (schnell → keine Zeit für Gleichgewicht). Optimum: u_opt = √(B/C)." },
    { front: "Auflösung Rs", back: "Rs = 2·(tR2-tR1)/(w1+w2). Rs < 1.0: ungenügend. Rs ≥ 1.5: Basislinienstrennung. Rs ∝ √N ∝ √L. Für Rs = 1,5 nötige Länge: L = L_alt · (1,5/Rs_alt)²." },
    { front: "Trennstufenzahl N und H", back: "N = 16·(tR/w)² (Basispeakbreite). H = L/N. Dimensionsloses Maß für Säuleneffizienz. HPLC: N = 5.000-100.000. GC: N > 100.000. Mehr N = schärfere Peaks = bessere Trennung." },
    { front: "Rf-Wert (DC)", back: "Rf = Wanderstrecke Substanz / Wanderstrecke Lösungsmittelfront. 0 ≤ Rf ≤ 1. Ideal: 0,3-0,7. Rf ≈ 1/( 1 + k'). Größeres Rf = mehr Zeit in mobiler Phase." },
    { front: "Selektivitätsfaktor α", back: "α = k'B/k'A (k'B > k'A > 0). α = 1: keine Selektivität. α > 1: Trennung möglich. α = tR2-tM / tR1-tM. Steigern durch Änderung stationärer Phase oder Lösungsmittel." },
  ],
};
EOF

cat > src/courses/analytical-chemistry-1/topics/14-trennverfahren-gc-hplc.ts << 'EOF'
export const topic = {
  id: "14-trennverfahren-gc-hplc",
  title: "Trennverfahren: GC, HPLC, Elektrophorese",
  subtitle: "Gaschromatographie, Flüssigchromatographie, Kapillarelektrophorese",
  icon: "🔬",
  estimatedMinutes: 80,
  theory: `
## Gaschromatographie (GC)

**Einsatz:** Flüchtige, thermisch stabile Verbindungen
**Mobile Phase:** Trägergas (He, N₂, H₂)
**Stationäre Phase:** Flüssigfilm auf Kapillare oder Festbett

**Detektoren:**
- FID (Flammenionisationsdetektor): C-haltige Verbindungen, sehr empfindlich
- TCD (Wärmeleitfähigkeitsdetektor): universell, weniger empfindlich
- ECD (Elektroneneinfangdetektor): halogenierte Verbindungen, sehr selektiv
- MS (Massenspektrometer): Strukturidentifizierung

**Split-Injection:** Probe wird geteilt → nur Bruchteil gelangt auf Säule
→ Vorteil: scharfe Peaks, verhindert Überlastung

**Kapillarsäulen:** Innendurchmesser 0,1-0,5mm, Länge 10-100m, N > 100.000

## Hochleistungsflüssigchromatographie (HPLC)

**Einsatz:** Nicht-flüchtige, thermisch labile Verbindungen, Biomoleküle

**Normalphase:** Polare stat. Phase (SiO₂) + unpolare mobile Phase
→ unpolare Substanzen eluieren zuerst

**Umkehrphase (RP-HPLC, am häufigsten!):**
Unpolare stat. Phase (C18) + polare mobile Phase (Wasser/Acetonitril)
→ polare Substanzen eluieren zuerst

**Kieselgel deaktivieren:** OH-Gruppen der Oberfläche reagieren mit Silanreagenz → Silan-Gruppen
→ Verhindert unerwünschte Adsorption polarer Gruppen

**Pumpen:** isokratisch (konstante Zusammensetzung) oder Gradient

**UV-Detektor:** häufigster Detektor, Absorption bei definierter λ
**Dioden-Array-Detektor (DAD):** alle Wellenlängen gleichzeitig!

## Ionenaustauschchromatographie

Trennung geladener Moleküle durch Affinität zu entgegengesetzt geladener stationärer Phase.
- Kationentauscher: trennungsfähig für Kationen (z.B. Na⁺, K⁺, Aminosäuren)
- Anionentauscher: trennungsfähig für Anionen

## Kapillarelektrophorese (CE)

**Antrieb:** Elektroosmotischer Fluss (EOF) durch elektrisches Feld
**Trennung:** Wanderungsgeschwindigkeit abhängig von Ladung/Masse-Verhältnis

EOF tritt auf weil Kapillarwand bei pH > 3 negativ geladen → Wasserfilm wandert zur Kathode.

**Vorteil gegenüber HPLC:** keine mobile Phase nötig, hohe Auflösung, klein Probenmengen

## Western Blot

1. SDS-PAGE: Proteine nach Größe trennen (SDS = negativ geladen → wandern alle zur Anode)
2. Transfer auf Membran
3. Blockieren (BSA, Milchpulver)
4. Primärantikörper (spezifisch für Zielprotein)
5. Sekundärantikörper (mit Enzym/Fluoreszenz markiert)
6. Detektion

**Spezifität:** durch Antikörper-Antigen-Wechselwirkung

## Extraktion

**Nernstscher Verteilungskoeffizient K:**
K = c_org / c_aq

**Nach n Extraktionen verbleibt in wässriger Phase:**
m_n = m₀ · (V_aq / (V_aq + K·V_org))ⁿ

**Wichtig:** Mehrfache Extraktion mit kleinen Volumina ist effizienter als eine einmalige Extraktion mit großem Volumen!

**Prüfungsaufgabe:** Jod, K=85: 20ml 100mM Jod-Lösung, 3× mit je 10ml org. LM:
m_3 = m₀ · (20/(20+85×10))³ = m₀ · (20/870)³ = m₀ · 0,02299³ = m₀ · 1,22×10⁻⁵
`,
  quiz: [
    { id: "q1", question: "Warum muss Kieselgel für die RP-HPLC deaktiviert werden?", options: ["Um die Partikelgröße zu verringern", "Um polare OH-Gruppen der SiO₂-Oberfläche durch Reaktion mit Silanen zu blockieren – verhindert unerwünschte Adsorption", "Um die Säule stabiler zu machen", "Kieselgel wird gar nicht deaktiviert"], correct: 1, explanation: "Kieselgel hat viele OH-Gruppen (Silanole) an der Oberfläche → polare Wechselwirkungen mit polaren Gruppen → schlechte Peaks, Tailing. Deaktivierung: Reaktion mit Chlorsilanen (z.B. C18-Silane) → hydrophobe C18-Gruppen. Restliche OH-Gruppen: End-Capping." },
    { id: "q2", question: "In der Umkehrphasen-HPLC (RP-HPLC) mit C18-Säule und Wasser/Acetonitril: Welche Substanz eluiert zuerst?", options: ["Die unpolarste Substanz", "Die polarste Substanz (geringste Affinität zur unpolaren C18-Phase)", "Die schwerste Substanz", "Die Substanz mit höchstem Rf-Wert"], correct: 1, explanation: "RP-HPLC: unpolare stat. Phase (C18) + polare mob. Phase (Wasser/MeCN). Polare Substanzen: geringe Affinität zu C18 → kleines k' → eluieren zuerst. Unpolare Substanzen: hohe Affinität → großes k' → eluieren zuletzt." },
    { id: "q3", question: "Was ist Split-Injection in der GC?", options: ["Probe wird durch ein Ventil geteilt und zweimal injiziert", "Probe wird aufgeteilt: nur Bruchteil (Split ratio 1:10 bis 1:1000) gelangt auf die Säule", "Zwei verschiedene Proben werden gleichzeitig injiziert", "Probe wird bei verschiedenen Temperaturen injiziert"], correct: 1, explanation: "Split-Injection: Trägergas + Probe → Injektor → Split: z.B. 1/100 geht auf Säule, Rest wird abgelassen. Vorteile: scharfe Peaks (keine Bandenverbreiterung durch Injektion), verhindert Überlastung der Kapillarsäule. Nachteil: Empfindlichkeit sinkt." },
    { id: "q4", question: "Wie viel von 20ml 100mM Jod-Lösung (K=85) bleibt nach 3 Extraktionen mit je 10ml org. LM übrig?", options: ["~0,001% (vernachlässigbar wenig)", "~2,3% der ursprünglichen Menge", "~50%", "~85%"], correct: 0, explanation: "m_n = m₀·(V_aq/(V_aq+K·V_org))ⁿ = m₀·(20/(20+85·10))³ = m₀·(20/870)³ = m₀·(0,023)³ = m₀·1,22×10⁻⁵ ≈ 0,001%. Fast vollständige Extraktion! 3× kleine Portionen >> 1× große Portion." },
    { id: "q5", question: "Worin besteht der Unterschied zwischen Normal- und Umkehrphasenchromatographie?", options: ["Normalphase: höhere Temperatur; Umkehrphase: Raumtemperatur", "Normalphase: polare stat. Phase, unpolare mob. Phase (unpolare Substanzen zuerst); Umkehrphase: umgekehrt (polare zuerst)", "Normalphase ist für GC, Umkehrphase für HPLC", "Kein wesentlicher Unterschied"], correct: 1, explanation: "Normalphase: polare stat. Phase (SiO₂), unpolare mob. Phase (Hexan) → polare Substanzen retardiert → unpolare eluieren zuerst. Umkehrphase: unpolare stat. (C18), polare mob. (Wasser/MeCN) → polare eluieren zuerst. RP > 80% aller HPLC-Anwendungen." },
    { id: "q6", question: "Was treibt den Fluss in der Kapillarelektrophorese an?", options: ["Pumpe wie in der HPLC", "Elektroosmotischer Fluss (EOF) durch elektrisches Feld – negativ geladene Kapillarwand zieht Wasserfilm mit", "Schwerkraft", "Temperaturunterschied"], correct: 1, explanation: "CE: Kapillarwand bei pH>3 negativ geladen (Si-O⁻-Gruppen) → diffuse Doppelschicht aus Kationen → elektrisches Feld treibt diese zur Kathode → nimmt gesamtes Lösungsmittel mit (EOF). Kein mechanischer Pumpe nötig!" },
  ],
  flashcards: [
    { front: "GC-Detektoren", back: "FID: C-haltige Substanzen, sehr empfindlich, zerstörend. TCD: universell, weniger empfindlich. ECD: Halogene, sehr selektiv. MS: Strukturidentifizierung (Goldstandard). FID am häufigsten." },
    { front: "RP-HPLC", back: "Umkehrphase: unpolare stat. Phase (C18, C8) + polare mob. Phase (H₂O/MeCN oder H₂O/MeOH). Polare Substanzen eluieren zuerst. >80% aller HPLC-Anwendungen. Kieselgel-Deaktivierung mit C18-Silanen." },
    { front: "Extraktion – Mehrfachextraktion", back: "m_n = m₀·(Vaq/(Vaq+K·Vorg))ⁿ. K = c_org/c_aq. n× mit V_klein >> 1× mit n·V_klein. Beispiel: K=85, 3×10ml aus 20ml: verbleiben 0,001% in wässriger Phase." },
    { front: "Kapillarelektrophorese (CE)", back: "Trennung: Ladung/Größe-Verhältnis. Antrieb: EOF (elektroosmotischer Fluss, Kapillarwand negativ → zieht Lösung zur Kathode). Vorteil: kein Lösungsmittelverbrauch, hohe Auflösung. Anwendung: DNA, Proteine, Ionen." },
    { front: "Western Blot", back: "1. SDS-PAGE (Größentrennung). 2. Transfer auf Membran. 3. Blockieren. 4. Primär-AK (spezifisch). 5. Sekundär-AK (markiert). 6. Detektion. Spezifität: Antikörper-Antigen. Anwendung: Proteinnachweis." },
    { front: "Ionenaustauschchromatographie", back: "Trennung geladener Moleküle. Kationentauscher: -SO₃H, trennungsfähig für Kationen. Anionentauscher: -N(CH₃)₃⁺, trennungsfähig für Anionen. Anwendung: Aminosäuren, Zucker, Ionen in Wasser." },
  ],
};
EOF

echo "Topics 13-14 erstellt"

cat > src/courses/analytical-chemistry-1/topics/15-kalibrierung-standardaddition.ts << 'EOF'
export const topic = {
  id: "15-kalibrierung-standardaddition",
  title: "Kalibrierung & Standardaddition",
  subtitle: "Kalibriergerade, Standardaddition, interne Standards, Definitionen",
  icon: "📏",
  estimatedMinutes: 60,
  theory: `
## Grundbegriffe (prüfungsrelevant!)

**Kalibrierung/Kalibration:**
Feststellung des Zusammenhangs zwischen Messgröße (Signal) und Konzentration des Analyten mittels Standards bekannter Konzentration.

**Eichung:** Amtliche Kalibrierung (gesetzlich geregelt), z.B. Waagen, Messgeräte.

**Kalibriergerade:** y = m·c + b
y = Messsignal, m = Steigung, b = Achsenabschnitt

## Methoden der Kalibrierung

### 1. Externe Kalibrierung
Standardlösungen bekannter Konzentration → Messsignal → Gerade → Unbekannte Probe einlesen.

**Voraussetzung:** Matrix der Standards ≈ Matrix der Probe (Matrixeffekte!)

### 2. Standardaddition
**Einsatz:** Wenn Probenmatrix das Signal beeinflusst (Matrixeffekte)!

**Prinzip:**
- Signal der Probe: y₀
- Signal nach Zugabe bekannter Menge Standard c_S: y₁
- Konzentration: c_x = c_S · y₀/(y₁ - y₀)

**Fluoreszenz-Beispiel (Quinin in Tonic Water):**
25ml Probe auf 100ml → Signal 553mV
+ 10ml Standard (35 ppm) → Signal 661mV

c_x = c_s · V_s/V_total · y₀/(y₁-y₀)

### 3. Interner Standard
Bekannte Menge einer Referenzsubstanz wird zur Probe zugegeben.
Verhältnis Analyt/Standard kompensiert Probenvorbereitung und Injektionsvolumen-Schwankungen.
→ Wichtig in GC und HPLC bei variablen Injektionsmengen.

## Verdünnungsreihe

Ausgehend von Stammstandard c₀ → Verdünnungsreihe:
c₁ · V₁ = c₂ · V₂

**Beispiel:** 1000 mg/L Blei-Stock auf 2-10 ppb für Kalibrierung:
Stufe 1: 1000 mg/L → 10 mg/L (Faktor 100): 0,1ml auf 10ml
Stufe 2: 10 mg/L → 0,1 mg/L = 100ppb (Faktor 100): 0,1ml auf 10ml
Stufe 3: 100ppb → 10ppb: 1ml auf 10ml

## Nachweisgrenze aus Kalibrierung

LOD = 3·s_y0 / m  (s_y0 = Standardabweichung des Signals bei c=0, m = Steigung)
LOQ = 10·s_y0 / m

## Additionsstandard – Berechnung

c_x / (c_x + c_S·V_S/V_total) = y₀/y₁

c_x = (c_S · V_S · y₀) / (V_total · (y₁ - y₀))
`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "standardaddition",
      name: "Standardaddition (einfach)",
      equation: "cx = cS · y0 / (y1 - y0)",
      variables: [
        { id: "cx", label: "Konzentration Probe", symbol: "cx", unit: "ppb", description: "Gesuchte Konzentration" },
        { id: "cS", label: "Zugabe-Konzentration", symbol: "cS", unit: "ppb", description: "Konzentration des zugefügten Standards" },
        { id: "y0", label: "Signal ohne Standard", symbol: "y0", unit: "mV", description: "Messsignal der Originalprobe" },
        { id: "y1", label: "Signal mit Standard", symbol: "y1", unit: "mV", description: "Messsignal nach Standardzugabe" },
      ],
      solve: (inputs: Record<string, any>) => {
        const sf = inputs.solveFor as string;
        if (sf === "cx") return { cx: inputs.cS * inputs.y0 / (inputs.y1 - inputs.y0) };
        if (sf === "cS") return { cS: inputs.cx * (inputs.y1 - inputs.y0) / inputs.y0 };
        return {};
      },
      hints: [
        "Standardaddition: cx = cS · y0/(y1-y0). Voraussetzung: lineares Signal. Matrixeffekte werden kompensiert!",
        "Achtung Volumenverhältnisse: Wenn Standardvolumen VS zu Probenvolumen VP zugefügt: cx = cS·VS/(VP+VS) · y0/(y1-y0)."
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Was ist der Unterschied zwischen Kalibrierung und Eichung?", options: ["Beide bedeuten dasselbe", "Kalibrierung = allgemeiner Begriff (Zusammenhang Signal-Konzentration); Eichung = amtliche/gesetzliche Kalibrierung", "Eichung ist genauer als Kalibrierung", "Kalibrierung gilt nur für Spektroskopie"], correct: 1, explanation: "Kalibrierung (Kalibration): Feststellung des Zusammenhangs Messsignal-Konzentration, allgemeiner Begriff. Eichung: gesetzlich vorgeschriebene Kalibrierung, z.B. für Handelsmessgeräte (Waagen, Füllmengen). Beide führen zum gleichen mathematischen Ergebnis." },
    { id: "q2", question: "Wann verwendet man Standardaddition statt externer Kalibrierung?", options: ["Immer, da genauer", "Wenn die Probenmatrix das Signal beeinflusst (Matrixeffekte) – Standards und Probe haben unterschiedliche Matrix", "Nur bei sehr niedrigen Konzentrationen", "Nur in der Atomspektrometrie"], correct: 1, explanation: "Standardaddition kompensiert Matrixeffekte: Signal wird durch Begleitstoffe in der Probe beeinflusst (z.B. Untergrundabsorption, Ionisierungsunterdrückung in ICP-MS). Standard wird direkt in die Probe zugegeben → gleiche Matrix für Signal und Standard." },
    { id: "q3", question: "Signal der Probe: 553mV. Nach Zugabe von 35ppm Standard: 661mV. Verhältnis cS/cProbe beträgt (vereinfacht)?", options: ["553/661", "35·553/(661-553)", "553/(661-553)", "661/553-1"], correct: 2, explanation: "cx = cS · y0/(y1-y0) = cS · 553/(661-553) = cS · 553/108 = cS · 5,12. Also: wenn cS dem effektiven Beitrag entspricht, gilt cx ≈ cS · 5,12. Exakte Berechnung braucht Volumenverhältnisse." },
    { id: "q4", question: "Wie stellt man 10 ppb aus einer 1000 ppm Stammlösung her (2 Schritte)?", options: ["Direkte Verdünnung 1:100000", "Schritt 1: 1000ppm → 100ppb (Faktor 1:10000); Schritt 2: 100ppb → 10ppb (Faktor 1:10)", "Schritt 1: 1:100 → 10ppm; Schritt 2: 1:1000 → 10ppb", "Zwei Schritte je 1:316 (√100000)"], correct: 2, explanation: "1000 ppm = 1000 mg/L. Schritt 1: 0,01ml auf 1000ml → 1:100000 direkt, oder: 1ml auf 100ml → 10ppm; dann 1ml auf 1000ml → 10ppb. Wichtig: intermediäre Verdünnung vermeidet zu kleine Volumina!" },
    { id: "q5", question: "Was kompensiert ein interner Standard?", options: ["Matrixeffekte in der Probe", "Schwankungen in Injektionsvolumen und Probenvorbereitung durch konstantes Verhältnis Analyt/Standard", "Temperatureffekte", "Kalibrierungsfehler"], correct: 1, explanation: "Interner Standard: bekannte Menge einer Referenzsubstanz (ähnlich dem Analyten aber unterschiedliche tR) wird zur Probe zugegeben. Verhältnis Analyt/IS-Signal wird ausgewertet → kompensiert Injektionsschwankungen, Verluste bei Probenvorbereitung. Standard in GC und HPLC." },
  ],
  flashcards: [
    { front: "Kalibrierung vs. Eichung", back: "Kalibrierung: allgemeiner Begriff, Zusammenhang Signal-Konzentration. Eichung: amtliche/gesetzliche Kalibrierung (Handelsmessgeräte). Beide mathematisch gleich: y = m·c + b." },
    { front: "Standardaddition", back: "cx = cS · y0/(y1-y0). Kompensiert Matrixeffekte! Anwendung: wenn Probenmatrix das Signal beeinflusst. Standard wird direkt in Probe zugegeben. Voraussetzung: lineares Signal." },
    { front: "Interner Standard", back: "Bekannte Menge Referenzsubstanz zur Probe zugeben. Verhältnis Analyt/IS kompensiert: Injektionsschwankungen, Verdampfungsverluste, Probenaufbereitungsverluste. Häufig in GC, HPLC, ICP-MS." },
    { front: "Verdünnungsreihe", back: "c1·V1 = c2·V2. Schrittweise Verdünnung aus Stammstandard. Nie zu kleine Volumina (Pipettierfehler). Konzentration der Kalibrierlösungen: LOQ bis obere Linearitätsgrenze, Probenkonzentration muss im Bereich liegen." },
  ],
};
EOF

cat > src/courses/analytical-chemistry-1/topics/16-atomspektrometrie.ts << 'EOF'
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
EOF

cat > src/courses/analytical-chemistry-1/topics/17-elektroden-faellungstitration.ts << 'EOF'
export const topic = {
  id: "17-elektroden-faellungstitration",
  title: "Elektroden 2. Art & Fällungstitration",
  subtitle: "Referenzelektroden, Ag/AgCl, Kalomel, potentiometrische Titration",
  icon: "⚗️",
  estimatedMinutes: 65,
  theory: `
## Elektroden 2. Art

Elektroden 2. Art: Metall in Kontakt mit seinem schwerlöslichen Salz und dem Anion des Salzes.
→ Dienen als Referenzelektroden (stabiles, reproduzierbares Potential)!

**Ag/AgCl-Elektrode:**
AgCl(s) + e⁻ ⇌ Ag(s) + Cl⁻
E = E° - (0,05916/1)·log[Cl⁻]
E° = +0,222 V (vs. SHE)
Pot. in ges. KCl: E = +0,197 V (vs. SHE)

**Kalomel-Elektrode (SCE):**
Hg₂Cl₂(s) + 2e⁻ ⇌ 2Hg(l) + 2Cl⁻
E° = +0,268 V (gesättigte SCE: +0,241 V vs. SHE)

**Wie wird das Potential konstant gehalten?**
Durch gesättigte KCl-Lösung: [Cl⁻] konstant → E konstant.

## Potentiometrische Fällungstitration

**Beispiel:** 100mL 0,1M NaCl + 0,1M AgNO₃

**Vor Äquivalenzpunkt:** [Ag⁺] durch Ksp bestimmt:
[Ag⁺] = Ksp(AgCl) / [Cl⁻]
E = E°(Ag⁺/Ag) + 0,05916·log[Ag⁺]

**Am Äquivalenzpunkt:** [Ag⁺] = [Cl⁻] = √Ksp
E_ÄP = E° + 0,05916·log(√Ksp) = E° + 0,05916/2·log(Ksp)

**Nach Äquivalenzpunkt:** [Ag⁺] durch Überschuss AgNO₃ bestimmt

**Berechnung der Spannung:**

Bei 65% Titration (V_Ag = 65mL bei V_ÄP = 100mL):
n_Cl verbleibend = 0,1×100 - 0,1×65 = 3,5 mmol in 165mL
[Cl⁻] = 3,5/165 = 0,0212 mol/L
[Ag⁺] = Ksp/[Cl⁻] = 1,8×10⁻¹⁰/0,0212 = 8,5×10⁻⁹ mol/L
E = 0,799 + 0,05916·log(8,5×10⁻⁹) = 0,799 + 0,05916·(-8,07) = 0,799 - 0,477 = +0,322V vs. SHE

## Potentiometrische Redoxtitration

**Beispiel:** Fe²⁺ mit Ce⁴⁺ (Cerimetrie):
Ce⁴⁺ + Fe²⁺ → Ce³⁺ + Fe³⁺

Am Äquivalenzpunkt:
E_ÄP = (E°Fe3+/Fe2+ + E°Ce4+/Ce3+) / 2

Vor ÄP: Nernst für Fe³⁺/Fe²⁺
Nach ÄP: Nernst für Ce⁴⁺/Ce³⁺

## Konzentrationsberechnung

**Berechnung ppm, ppb, Molarität:**
1 ppm = 1 mg/kg ≈ 1 mg/L (wässrige Lösung, ρ≈1)
1 ppb = 1 μg/kg ≈ 1 μg/L
Molarität M: c [mol/L] = c [mg/L] / M [g/mol] × 10⁻³

**Beispiel: 68 ppb C₂₉H₆₀ (M = 408,8 g/mol) in Wasser:**
c = 68×10⁻⁶ g/L / 408,8 g/mol = 1,66×10⁻⁷ mol/L = 166 nmol/L
`,
  quiz: [
    { id: "q1", question: "Was ist eine Elektrode 2. Art und warum wird sie als Referenzelektrode verwendet?", options: ["Eine Elektrode aus zwei Metallen", "Metall + schwerlösliches Salz + Anion: stabiles Potential durch konstante [Anion] in ges. KCl → ideal als Referenz", "Eine polarisierbare Elektrode", "Eine Elektrode für Anionen"], correct: 1, explanation: "Elektrode 2. Art: Ag/AgCl oder Kalomel (Hg/Hg₂Cl₂). Potential konstant durch: AgCl(s) + KCl(ges.) → [Cl⁻] = konstant → E = konstant. Ideal als Referenz: robust, einfach, kein H₂ nötig wie SHE." },
    { id: "q2", question: "Wie berechnet man die Zellspannung bei 65% Titration von 100mL 0,1M NaCl mit 0,1M AgNO₃ (Ksp=1,8×10⁻¹⁰, E°Ag=0,799V)?", options: ["Direkt aus E° = 0,799V", "E ≈ +0,32V: [Cl⁻] = 0,021mol/L → [Ag⁺] = Ksp/[Cl⁻] → Nernst", "E = 0V am Äquivalenzpunkt", "E = 0,799 - 0,05916/2·log(Ksp)"], correct: 1, explanation: "n_Cl rest = (100-65)×0,1mmol/mL = 3,5mmol in 165mL → [Cl⁻] = 0,0212mol/L → [Ag⁺] = 1,8×10⁻¹⁰/0,0212 = 8,5×10⁻⁹ → E = 0,799+0,05916·log(8,5×10⁻⁹) = 0,799-0,477 ≈ +0,32V vs. SHE." },
    { id: "q3", question: "Was ist 0,4 ppb in μg/L?", options: ["0,4 μg/L", "400 μg/L", "0,0004 μg/L", "0,4 mg/L"], correct: 0, explanation: "ppb = parts per billion = μg/kg ≈ μg/L (wässrige Lösung). 0,4 ppb = 0,4 μg/L. Reihe: 1 ppm = 1 mg/L; 1 ppb = 1 μg/L; 1 ppt = 1 ng/L." },
    { id: "q4", question: "Wie berechnet sich das Potential am Äquivalenzpunkt einer Redoxtitration (Fe²⁺ mit Ce⁴⁺)?", options: ["E = E°(Fe³⁺/Fe²⁺)", "E_ÄP = (E°(Fe³⁺/Fe²⁺) + E°(Ce⁴⁺/Ce³⁺)) / 2", "E_ÄP = 0V", "E = E°(Ce⁴⁺/Ce³⁺)"], correct: 1, explanation: "Am ÄP: genau so viel Ce⁴⁺ zugegeben wie Fe²⁺ vorhanden → [Fe³⁺]=[Ce³⁺] und [Fe²⁺]=[Ce⁴⁺] sehr klein. E_ÄP = (E°₁ + E°₂)/2 (gilt für n=1 für beide Halbzellen). Allgemein: E_ÄP = (n₁E°₁ + n₂E°₂)/(n₁+n₂)." },
    { id: "q5", question: "Warum ist die gesättigte KCl-Lösung in Referenzelektroden wichtig?", options: ["Wegen der hohen Leitfähigkeit", "Hält [Cl⁻] konstant → konstantes Elektrodenpotential + minimiert Diffusionspotential durch gleiche K⁺ und Cl⁻ Beweglichkeiten", "Als Puffer gegen pH-Änderungen", "Verhindert Oxidation der Elektrode"], correct: 1, explanation: "KCl ges.: Zwei Funktionen: 1. [Cl⁻] konstant → E(Ag/AgCl) oder E(Kalomel) konstant. 2. K⁺ und Cl⁻ haben fast gleiche Ionenbeweglichkeit → minimales Diffusionspotential an der Salzbrücke." },
  ],
  flashcards: [
    { front: "Ag/AgCl Elektrode", back: "AgCl + e⁻ ⇌ Ag + Cl⁻. E = 0,222 - 0,05916·log[Cl⁻]. In ges. KCl: E = +0,197V vs. SHE. Robust, einfach, häufigste Referenzelektrode. Potential konstant durch [Cl⁻] = konstant." },
    { front: "Kalomel-Elektrode (SCE)", back: "Hg₂Cl₂ + 2e⁻ ⇌ 2Hg + 2Cl⁻. Ges. SCE: +0,241V vs. SHE. Häufig in älteren Geräten. Enthält Hg → weniger umweltfreundlich. Klassische Referenzelektrode." },
    { front: "Potential-Berechnung Fällungstitration", back: "Vor ÄP: [Ag⁺] = Ksp/[Cl⁻], dann Nernst. Am ÄP: [Ag⁺]=[Cl⁻]=√Ksp → E_ÄP = E°+0,05916/2·log(Ksp). Nach ÄP: [Ag⁺] = cÜberschuss." },
    { front: "ppm, ppb, Molarität", back: "1 ppm = 1 mg/L (wässrig). 1 ppb = 1 μg/L. 1 ppt = 1 ng/L. Umrechnung: c[mol/L] = c[mg/L] / M[g/mol] × 10⁻³. Beispiel: 68ppb C₂₉H₆₀ (M=409): c = 68×10⁻⁶/409 = 166nmol/L." },
  ],
};
EOF

cat > src/courses/analytical-chemistry-1/topics/18-fehlerrechnung.ts << 'EOF'
export const topic = {
  id: "18-fehlerrechnung",
  title: "Fehlerrechnung & Analytische Kenngrößen",
  subtitle: "Fehlerfortpflanzung, Signifikante Stellen, Qualitätssicherung",
  icon: "🔢",
  estimatedMinutes: 55,
  theory: `
## Signifikante Stellen

**Regeln:**
- Alle Ziffern 1-9 sind signifikant
- Nullen zwischen signifikanten Ziffern: signifikant (1,005 → 4 sig.)
- Führende Nullen: NICHT signifikant (0,005 → 1 sig.)
- Nachfolgende Nullen nach Dezimalpunkt: signifikant (1,500 → 4 sig.)

**Bei Rechnungen:**
- Multiplikation/Division: so viele sig. Stellen wie der Faktor mit den wenigsten
- Addition/Subtraktion: so viele Dezimalstellen wie die Zahl mit den wenigsten

## Fehlerfortpflanzung (Gauß'sches Fehlerfortpflanzungsgesetz)

Für f(x₁, x₂, ...):
Δf = √[(∂f/∂x₁)²·(Δx₁)² + (∂f/∂x₂)²·(Δx₂)² + ...]

**Spezialfälle:**
- f = x + y: Δf = √(Δx² + Δy²)
- f = x · y: Δf/f = √((Δx/x)² + (Δy/y)²)
- f = x/y: Δf/f = √((Δx/x)² + (Δy/y)²)

## Qualitätssicherung in der Analytik

**Maßnahmen gegen Fehler:**
1. Blindversuche (Blindwert): Reagenzien ohne Probe → systematischen Fehler erkennen
2. Mehrfachmessungen (n ≥ 3): zufällige Fehler reduzieren
3. Referenzmaterialien (CRM): zertifizierte Werte → Richtigkeit prüfen
4. Wiederfindungsrate: bekannte Menge Standard zur Probe → Recovery
5. Parallelanalyse: zwei Analytiker/zwei Methoden
6. Ringversuche: externe Qualitätskontrolle

**Wiederfindungsrate (Recovery):**
R = (c_gemessen / c_zugesetzt) × 100%
Ideal: 95-105%

## Analytische Kennzahlen

**Empfindlichkeit:** Steigung der Kalibriergerade m = ΔSignal/Δc

**Selektivität:** Fähigkeit, den Analyten in Anwesenheit von Störsubstanzen zu bestimmen

**Robustheit:** Unempfindlichkeit der Methode gegenüber kleinen Variationen der Parameter

**Linearitätsbereich:** Bereich in dem A = ε·c·d gilt (Lambert-Beer) oder Signal ∝ c

**Messfrequenz und Auflösung:**
Nyquist-Theorem: Abtastfrequenz ≥ 2 × Signalfrequenz für vollständige Rekonstruktion.
In Chromatographie: zu niedrige Messfrequenz → Peak wird nicht richtig erfasst → falsche Integration.

## Statistische Tests (Überblick)

**t-Test:** Vergleich von Mittelwerten (Probe vs. Referenzwert)
**F-Test:** Vergleich von Varianzen/Standardabweichungen zweier Messreihen
**Q-Test:** Ausreißer-Erkennung
**χ²-Test:** Anpassung an Verteilung

**Transformation zur Normalverteilung:** Viele stat. Tests setzen Normalverteilung voraus. Bei schiefer Verteilung: log-Transformation kann Normalverteilung erzeugen → Tests anwendbar.
`,
  quiz: [
    { id: "q1", question: "Welche statistischen Tests sind in der Analytischen Chemie besonders wichtig?", options: ["Nur der t-Test", "Q-Test (Ausreißer), t-Test (Mittelwertvergleich), F-Test (Varianzvergleich)", "Nur F-Test", "Chi-Quadrat-Test ist der einzige relevante"], correct: 1, explanation: "Q-Test: Ausreißer erkennen. t-Test: Mittelwert vs. Sollwert oder zwei Mittelwerte vergleichen. F-Test: Vergleich von Standardabweichungen zweier Methoden/Messreihen. Alle drei prüfungsrelevant!" },
    { id: "q2", question: "Was ist eine Wiederfindungsrate und welcher Wert ist ideal?", options: ["Anteil des gefundenen am eingesetzten Analyten, ideal: 95-105%", "Anteil der wiederholten Messungen, ideal: 100%", "Anteil der verworfenen Ausreißer, ideal: <5%", "Verhältnis Messwert zu Blindwert, ideal: >10"], correct: 0, explanation: "Recovery = (c_gemessen/c_zugesetzt) × 100%. Zugesetzter Standard: Known addition (Spike). Ideal: 95-105%. Abweichungen zeigen systematische Fehler (Matrix, Verluste bei Aufschluss) an." },
    { id: "q3", question: "Wie viele signifikante Stellen hat 0,00450?", options: ["5", "3", "6", "2"], correct: 1, explanation: "0,00450: führende Nullen (0,00) nicht signifikant. 4, 5, 0 → 3 signifikante Stellen. Die abschließende 0 nach dem Dezimalpunkt ist signifikant (zeigt Präzision der Messung an)." },
    { id: "q4", question: "Wozu dient ein Blindversuch in der Analytik?", options: ["Um die Empfindlichkeit zu erhöhen", "Um den Untergrund (Reagenzien ohne Probe) zu bestimmen und systematische Fehler durch Verunreinigungen zu erkennen", "Um den Ausreißer zu finden", "Um die Kalibrierung zu überprüfen"], correct: 1, explanation: "Blindversuch: alle Reagenzien und Schritte wie Probe, aber ohne Analyt. Blindwert = Signal durch Reagenzien/Verunreinigungen. Probe - Blindwert = Nettosignal. Erkennt systematische Fehler durch Kontamination." },
    { id: "q5", question: "Wie beeinflusst die Messfrequenz die chromatographische Auflösung?", options: ["Kein Einfluss", "Zu niedrige Messfrequenz → Peak wird nicht korrekt abgetastet → falsche Peakform und Integration (Nyquist-Theorem)", "Höhere Messfrequenz verschlechtert immer die Auflösung", "Nur wichtig bei NMR"], correct: 1, explanation: "Nyquist: Abtastfrequenz ≥ 2× Signalfrequenz. Bei chromatographischen Peaks: mind. 10-20 Datenpunkte pro Peak für genaue Integration. Zu niedrige Frequenz: schlechte Peakform, falsche Fläche → falsches Ergebnis." },
    { id: "q6", question: "Warum wird in der Statistik manchmal eine Transformation zur Normalverteilung durchgeführt?", options: ["Um die Datenmenge zu reduzieren", "Viele statistische Tests (t-Test, F-Test) setzen Normalverteilung voraus – log-Transformation kann schiefe Verteilungen normalisieren", "Um Ausreißer zu entfernen", "Aus historischen Gründen"], correct: 1, explanation: "Viele parametrische Tests setzen Normalverteilung voraus. Biologische/Umweltdaten oft log-normal-verteilt → log-Transformation → Normalverteilung → t-Test, F-Test anwendbar. Alternative: nicht-parametrische Tests (Mann-Whitney etc.)." },
  ],
  flashcards: [
    { front: "Signifikante Stellen – Regeln", back: "Ziffern 1-9: immer signifikant. Nullen zwischen Ziffern: signifikant. Führende Nullen (0,005): NICHT sig. Abschl. Nullen nach Dezimalpunkt (1,500): signifikant. Multiplikation: min. sig. Stellen aller Faktoren." },
    { front: "Fehlerfortpflanzung", back: "Δf = √[Σ(∂f/∂xᵢ)²·(Δxᵢ)²]. Addition: Δf=√(Δx²+Δy²). Multiplikation: Δf/f=√((Δx/x)²+(Δy/y)²). Relative Fehler addieren sich quadratisch!" },
    { front: "Qualitätssicherung – Maßnahmen", back: "1. Blindversuche. 2. Mehrfachmessungen. 3. Referenzmaterialien (CRM). 4. Wiederfindungsrate (Recovery, ideal 95-105%). 5. Parallelanalysen. 6. Ringversuche (extern)." },
    { front: "F-Test vs. t-Test", back: "F-Test: Vergleich zweier Varianzen (s₁²/s₂²). Gleiche Präzision? t-Test: Vergleich zweier Mittelwerte. Gleiche Richtigkeit? Beide setzen Normalverteilung voraus. Beide haben Tabellenwerte für verschiedene n und α." },
  ],
};
EOF

echo "Topics 15-18 erstellt"

echo "=== Schritt 4: courseRegistry.ts aktualisieren ==="
cat > src/lib/courseRegistry.ts << 'EOF'
import { course as heterocyclicChemistry } from "../courses/organic-chemistry/index";
import { course as analyticalChemistry1 } from "../courses/analytical-chemistry-1/index";

const courseTopicLoaders: Record<string, Record<string, () => Promise<any>>> = {
  "organic-chemistry": {
    "01-introduction":               () => import("../courses/organic-chemistry/topics/01-introduction"),
    "02-pyridines":                  () => import("../courses/organic-chemistry/topics/02-pyridines"),
    "03-five-ring-one-heteroatom":   () => import("../courses/organic-chemistry/topics/03-five-ring-one-heteroatom"),
    "04-five-ring-two-heteroatoms":  () => import("../courses/organic-chemistry/topics/04-five-ring-two-heteroatom"),
    "05-cycloadditions":             () => import("../courses/organic-chemistry/topics/05-cycloadditions"),
    "06-cyclocondensations":         () => import("../courses/organic-chemistry/topics/06-cyclocondensations"),
    "07-sear-regioselectivity":      () => import("../courses/organic-chemistry/topics/07-sear-regioselectivity"),
    "08-mechanisms":                 () => import("../courses/organic-chemistry/topics/08-mechanisms"),
    "09-bioisosteres-skeletal-editing": () => import("../courses/organic-chemistry/topics/09-bioisosteres-skeletal-editing"),
  },
  "analytical-chemistry-1": {
    "01-grundlagen-spektroskopie":    () => import("../courses/analytical-chemistry-1/topics/01-grundlagen-spektroskopie"),
    "02-lambert-beer":                () => import("../courses/analytical-chemistry-1/topics/02-lambert-beer"),
    "03-fluoreszenz-lumineszenz":     () => import("../courses/analytical-chemistry-1/topics/03-fluoreszenz-lumineszenz"),
    "04-ftir-raman":                  () => import("../courses/analytical-chemistry-1/topics/04-ftir-raman"),
    "05-roentgenspektroskopie":       () => import("../courses/analytical-chemistry-1/topics/05-roentgenspektroskopie"),
    "06-elektrochemische-grundlagen": () => import("../courses/analytical-chemistry-1/topics/06-elektrochemische-grundlagen"),
    "07-potentiometrie-nernst":       () => import("../courses/analytical-chemistry-1/topics/07-potentiometrie-nernst"),
    "08-voltammetrie-coulometrie":    () => import("../courses/analytical-chemistry-1/topics/08-voltammetrie-coulometrie"),
    "09-chemosensoren":               () => import("../courses/analytical-chemistry-1/topics/09-chemosensoren"),
    "10-statistik-qualitaet":         () => import("../courses/analytical-chemistry-1/topics/10-statistik-qualitaet"),
    "11-saeurebase-ph":               () => import("../courses/analytical-chemistry-1/topics/11-saeurebase-ph"),
    "12-faellungsreaktionen":         () => import("../courses/analytical-chemistry-1/topics/12-faellungsreaktionen"),
    "13-chromatographie-grundlagen":  () => import("../courses/analytical-chemistry-1/topics/13-chromatographie-grundlagen"),
    "14-trennverfahren-gc-hplc":      () => import("../courses/analytical-chemistry-1/topics/14-trennverfahren-gc-hplc"),
    "15-kalibrierung-standardaddition": () => import("../courses/analytical-chemistry-1/topics/15-kalibrierung-standardaddition"),
    "16-atomspektrometrie":           () => import("../courses/analytical-chemistry-1/topics/16-atomspektrometrie"),
    "17-elektroden-faellungstitration": () => import("../courses/analytical-chemistry-1/topics/17-elektroden-faellungstitration"),
    "18-fehlerrechnung":              () => import("../courses/analytical-chemistry-1/topics/18-fehlerrechnung"),
  },
};

export const allCourses = [heterocyclicChemistry, analyticalChemistry1];

export async function loadTopic(courseId: string, topicId: string) {
  const loaders = courseTopicLoaders[courseId];
  if (!loaders) throw new Error(`Kurs nicht gefunden: ${courseId}`);
  const loader = loaders[topicId];
  if (!loader) throw new Error(`Thema nicht gefunden: ${topicId}`);
  const module = await loader();
  return module.topic ?? module.default;
}

export async function loadAllTopics(courseId: string) {
  const loaders = courseTopicLoaders[courseId];
  if (!loaders) throw new Error(`Kurs nicht gefunden: ${courseId}`);
  const topics = await Promise.all(
    Object.entries(loaders).map(async ([_id, loader]) => {
      const module = await loader();
      return module.topic ?? module.default;
    })
  );
  return topics;
}
EOF

echo "=== Schritt 5: Supabase Progress-Tabellen ==="
echo "Füge folgendes SQL in Supabase SQL Editor aus:"
echo ""
echo "-- Quiz-Ergebnisse speichern"
echo "ALTER TABLE progress ADD COLUMN IF NOT EXISTS quiz_answers JSONB DEFAULT '{}';"
echo "ALTER TABLE progress ADD COLUMN IF NOT EXISTS exam_scores JSONB DEFAULT '[]';"
echo ""
echo "-- Streak-Tabelle bereits vorhanden aus Setup"

echo "=== Schritt 6: Build ==="
npm run build

echo ""
echo "✅ FERTIG! Jetzt deployen:"
echo "git add ."
echo 'git commit -m "feat: AC1 Topics 10-18 (Gerner+Köllensperger)"'
echo "git push"
echo "vercel --prod"
