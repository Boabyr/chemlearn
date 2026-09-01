import type { Thema } from '../../../content/schema'

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

**0,01M Essigsäure (pKs = 4,76):**
Näherung für schwache Säuren: pH = ½(pKs − log c) = ½(4,76 + 2) = ½(6,76) = 3,38
Gegenprobe über die Konzentration:
[H⁺] = √(Ka · c) = √(1,74×10⁻⁵ · 0,01) = √(1,74×10⁻⁷) = 4,17×10⁻⁴ mol/L → pH = 3,38

## Wann welche Formel gilt

Die drei Formeln werden regelmäßig verwechselt. Sie unterscheiden sich danach, was in der
Lösung vorliegt:

| Situation | Formel | Bedingung |
|---|---|---|
| starke Säure | pH = −log c | vollständig dissoziiert |
| schwache Säure | pH = ½(pKs − log c) | nur die Säure, kein Salz |
| Puffer | pH = pKs + log([A⁻]/[HA]) | Säure **und** konjugierte Base |
| schwache Base | pOH = ½(pKb − log c), pH = 14 − pOH | nur die Base |

Die Näherung für schwache Säuren setzt voraus, dass der Dissoziationsgrad klein bleibt —
faustregelhaft unter 5 %. Bei sehr verdünnten oder relativ starken schwachen Säuren
stimmt sie nicht mehr, dann muss die quadratische Gleichung gelöst werden.

## Was einen Puffer belastbar macht

Ein Puffer hält den pH, weil zugegebene H⁺ von A⁻ und zugegebene OH⁻ von HA abgefangen
werden. Zwei Größen entscheiden über seine Güte:

- **Lage:** Das Optimum liegt bei pH = pKs, dort ist [HA] = [A⁻] und die Kapazität
  maximal. Brauchbar ist der Bereich pKs ± 1 — außerhalb ist eine der beiden Formen
  weitgehend aufgebraucht.
- **Kapazität:** Sie wächst mit der Gesamtkonzentration. Ein Puffer aus 0,1 M Komponenten
  fängt zehnmal mehr Säure ab als einer aus 0,01 M, obwohl beide denselben pH zeigen.

Beim Verdünnen ändert sich der pH eines Puffers deshalb kaum — das Verhältnis
[A⁻]/[HA] bleibt gleich —, seine Kapazität aber sehr wohl.
`,
  interactives: [
    {
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
        umstellungen: [
          { solveFor: "pH", expr: "pKs + ratio" },
          { solveFor: "pKs", expr: "pH - ratio" },
          { solveFor: "ratio", expr: "pH - pKs" },
        ],
        hints: [
          "Henderson-Hasselbalch: pH = pKs + log([A⁻]/[HA]). Bei gleichen Konzentrationen: log(1)=0 → pH = pKs. Pufferoptimum bei pH = pKs.",
          "Beispiel Acetat-Puffer: pKs(Essigsäure) = 4,76. Gleiche Teile Essigsäure und NaAcetat → pH = 4,76. 10:1 Acetat:Essigsäure → pH = 4,76 + 1 = 5,76."
        ],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie berechnet man den pH einer 0,01 M HCl-Lösung?", options: ["pH = -log(0,01) = 2", "pH = 0,01", "pH = log(0,01) = -2", "pH = 14 - log(0,01) = 12"], correct: 0, explanation: "HCl ist eine starke Säure (vollständige Dissoziation). [H⁺] = c(HCl) = 0,01 mol/L = 10⁻² mol/L. pH = -log(10⁻²) = 2." },
    { id: "q2", question: "Was beschreibt die Henderson-Hasselbalch-Gleichung?", options: ["Den pH einer starken Säure aus ihrer Konzentration", "pH = pKs + log([A⁻]/[HA]) – pH eines Puffersystems", "Das Löslichkeitsprodukt einer Fällungsreaktion", "Die Nernst-Gleichung für Elektrodenpotentiale"], correct: 1, explanation: "Henderson-Hasselbalch: pH = pKs + log([Konjugierte Base]/[Säure]). Gilt für Pufferlösungen. Bei [A⁻]=[HA]: pH = pKs. Pufferwirkung optimal bei pH = pKs ± 1." },
    { id: "q3", question: "9,1g NaCl und 12g NaOH werden in 500ml gelöst. Was bestimmt den pH?", options: ["NaCl, weil davon mehr Gramm eingesetzt sind", "NaOH allein, NaCl reagiert neutral", "Beide Stoffe zu etwa gleichen Teilen", "Das Lösungsmittel Wasser bestimmt den pH"], correct: 1, explanation: "NaCl ist das Salz einer starken Säure und einer starken Base — beide Ionen hydrolysieren nicht und der pH bleibt unbeeinflusst. NaOH ist eine starke Base: n = 12/40 = 0,3 mol in 0,5 L ergeben c = 0,6 mol/L, also pOH = 0,22 und pH = 13,78." },
    { id: "q4", question: "Was ist der isoelektrische Punkt einer Aminosäure?", options: ["Der pH mit der besten Löslichkeit", "Der pH, bei dem die Nettoladung null ist", "Der pH der stärksten sauren Wirkung", "Der pKs-Wert der Aminogruppe"], correct: 1, explanation: "Am isoelektrischen Punkt liegt die Aminosäure als Zwitterion vor: Die positive Ladung der Aminogruppe und die negative der Carboxylgruppe heben sich auf. Für eine Aminosäure ohne geladene Seitenkette gilt pI = ½(pKs1 + pKs2). Dort wandert sie im elektrischen Feld nicht und ist am schlechtesten löslich." },
    { id: "q5", question: "Wie leitet man pKs aus dem Massenwirkungsgesetz her?", options: ["pKs folgt direkt aus der Konzentration", "Aus Ka = [H⁺][A⁻]/[HA] folgt pKs = −log(Ka)", "pKs entspricht dem halben pH-Wert", "pKs ergibt sich als 14 minus pKb"], correct: 1, explanation: "Das Massenwirkungsgesetz für HA ⇌ H⁺ + A⁻ liefert Ka = [H⁺][A⁻]/[HA]. Der negative Zehnerlogarithmus davon ist pKs. Die Beziehung pKs + pKb = 14 gilt zusätzlich für ein konjugiertes Paar, ist aber nicht die Herleitung." },
    { id: "q6", question: "1ml 1M Essigsäure (pKs=4,6) + 0,5ml 1M NaOH auf 1L: Was entsteht?", options: ["Eine reine Essigsäurelösung ganz ohne Acetat", "Ein Puffer aus Essigsäure und Acetat, pH ≈ 4,6", "Eine reine Natriumacetatlösung", "Eine neutrale Lösung mit pH 7"], correct: 1, explanation: "Ein Millimol Essigsäure trifft auf ein halbes Millimol NaOH: die Hälfte wird zu Acetat, die andere Hälfte bleibt Säure. Bei gleichen Konzentrationen ist der Logarithmus in der Henderson-Hasselbalch-Gleichung null, also pH = pKs = 4,6. Das Verdünnen auf einen Liter ändert daran nichts, nur die Pufferkapazität sinkt." },
  ],
  flashcards: [
    { id: "1btyvq4", front: "Henderson-Hasselbalch", back: "pH = pKs + log([A⁻]/[HA]). Puffer: schwache Säure + konjugierte Base. pH = pKs bei gleichen Konzentrationen. Pufferbereich: pKs ± 1. Kapazität maximal bei pH = pKs." },
    { id: "0hppdmo", front: "pH starke Säure/Base", back: "Starke Säure: pH = -log(c). Starke Base: pOH = -log(c), pH = 14-pOH. Vollständige Dissoziation! Beispiel: 0,01M HCl → pH = 2; 0,01M NaOH → pH = 12." },
    { id: "0bbhvc0", front: "pH schwache Säure", back: "[H⁺] = √(Ka·c₀) wenn Ka << c₀. pH = ½(pKs - log c₀). Nur teilweise Dissoziation! Beispiel: 0,01M Essigsäure (pKs=4,76): pH ≈ ½(4,76+2) = 3,38." },
    { id: "0nf98ws", front: "Isoelektrischer Punkt pI", back: "pI = ½(pKs1 + pKs2). Nettoladung = 0 (Zwitterion). Geringste Löslichkeit. Keine elektrophoretische Wanderung. Wichtig: Aminosäuren, Proteine, isoelektrische Fokussierung (IEF)." },
    { id: "18f31up", front: "pKs aus Massenwirkungsgesetz", back: "HA ⇌ H⁺ + A⁻. Ka = [H⁺][A⁻]/[HA]. pKs = -log(Ka). Bei Halbäquivalenzpunkt der Titration: [HA]=[A⁻] → pH = pKs. Direkte Bestimmung aus Titrationskurve!" },
    { id: "11eel07", front: "Ionenprodukt des Wassers", back: "Kw = [H⁺][OH⁻] = 10⁻¹⁴ (bei 25°C). pKw = 14. pH + pOH = 14. Reines Wasser: pH = 7 ([H⁺]=[OH⁻]=10⁻⁷ mol/L)." },
  ],
} satisfies Thema;
