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
