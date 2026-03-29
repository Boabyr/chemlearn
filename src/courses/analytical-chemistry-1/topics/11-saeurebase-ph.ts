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
