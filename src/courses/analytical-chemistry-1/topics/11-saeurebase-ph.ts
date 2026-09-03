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
          {
            id: "pH",
            label: "pH-Wert",
            symbol: "pH",
            unit: "—",
            description: "Gesuchter pH-Wert"
          },
          {
            id: "pKs",
            label: "pKs der Säure",
            symbol: "pKs",
            unit: "—",
            description: "z.B. Essigsäure: 4.76"
          },
          {
            id: "ratio",
            label: "log([A⁻]/[HA])",
            symbol: "log(c_B/c_S)",
            unit: "—",
            description: "log(Konzentration Base / Konzentration Säure)"
          }
        ],
        umstellungen: [
          {
            solveFor: "pH",
            expr: "pKs + ratio"
          },
          {
            solveFor: "pKs",
            expr: "pH - ratio"
          },
          {
            solveFor: "ratio",
            expr: "pH - pKs"
          }
        ],
        hints: [
          "Henderson-Hasselbalch: pH = pKs + log([A⁻]/[HA]). Bei gleichen Konzentrationen: log(1)=0 → pH = pKs. Pufferoptimum bei pH = pKs.",
          "Beispiel Acetat-Puffer: pKs(Essigsäure) = 4,76. Gleiche Teile Essigsäure und NaAcetat → pH = 4,76. 10:1 Acetat:Essigsäure → pH = 4,76 + 1 = 5,76."
        ]
      }
    },
  ],
  quiz: [
    { id: "q1", question: "Wie berechnet man den pH einer 0,01 M HCl-Lösung?", options: ["pH = 0,01", "pH = log(0,01) = -2", "pH = -log(0,01) = 2", "pH = 14 - log(0,01) = 12"], correct: 2, explanation: "HCl ist eine starke Säure (vollständige Dissoziation). [H⁺] = c(HCl) = 0,01 mol/L = 10⁻² mol/L. pH = -log(10⁻²) = 2." },
    { id: "q2", question: "Was beschreibt die Henderson-Hasselbalch-Gleichung?", options: ["Den pH einer starken Säure aus ihrer Konzentration", "Das Löslichkeitsprodukt einer Fällungsreaktion", "Die Nernst-Gleichung für Elektrodenpotentiale", "pH = pKs + log([A⁻]/[HA]) – pH eines Puffersystems"], correct: 3, explanation: "Henderson-Hasselbalch: pH = pKs + log([Konjugierte Base]/[Säure]). Gilt für Pufferlösungen. Bei [A⁻]=[HA]: pH = pKs. Pufferwirkung optimal bei pH = pKs ± 1." },
    { id: "q3", question: "9,1g NaCl und 12g NaOH werden in 500ml gelöst. Was bestimmt den pH?", options: ["NaOH allein, NaCl reagiert neutral", "NaCl, weil davon mehr Gramm eingesetzt sind", "Beide Stoffe zu etwa gleichen Teilen", "Das Lösungsmittel Wasser bestimmt den pH"], correct: 0, explanation: "NaCl ist das Salz einer starken Säure und einer starken Base — beide Ionen hydrolysieren nicht und der pH bleibt unbeeinflusst. NaOH ist eine starke Base: n = 12/40 = 0,3 mol in 0,5 L ergeben c = 0,6 mol/L, also pOH = 0,22 und pH = 13,78." },
    { id: "q4", question: "Was ist der isoelektrische Punkt einer Aminosäure?", options: ["Der pH mit der besten Löslichkeit", "Der pH, bei dem die Nettoladung null ist", "Der pH der stärksten sauren Wirkung", "Der pKs-Wert der Aminogruppe"], correct: 1, explanation: "Am isoelektrischen Punkt liegt die Aminosäure als Zwitterion vor: Die positive Ladung der Aminogruppe und die negative der Carboxylgruppe heben sich auf. Für eine Aminosäure ohne geladene Seitenkette gilt pI = ½(pKs1 + pKs2). Dort wandert sie im elektrischen Feld nicht und ist am schlechtesten löslich." },
    { id: "q5", question: "Wie leitet man pKs aus dem Massenwirkungsgesetz her?", options: ["pKs folgt direkt aus der Konzentration", "pKs entspricht dem halben pH-Wert", "Aus Ka = [H⁺][A⁻]/[HA] folgt pKs = −log(Ka)", "pKs ergibt sich als 14 minus pKb"], correct: 2, explanation: "Das Massenwirkungsgesetz für HA ⇌ H⁺ + A⁻ liefert Ka = [H⁺][A⁻]/[HA]. Der negative Zehnerlogarithmus davon ist pKs. Die Beziehung pKs + pKb = 14 gilt zusätzlich für ein konjugiertes Paar, ist aber nicht die Herleitung." },
    { id: "q6", question: "1ml 1M Essigsäure (pKs=4,6) + 0,5ml 1M NaOH auf 1L: Was entsteht?", options: ["Eine reine Essigsäurelösung ganz ohne Acetat", "Eine reine Natriumacetatlösung", "Eine neutrale Lösung mit pH 7", "Ein Puffer aus Essigsäure und Acetat, pH ≈ 4,6"], correct: 3, explanation: "Ein Millimol Essigsäure trifft auf ein halbes Millimol NaOH: die Hälfte wird zu Acetat, die andere Hälfte bleibt Säure. Bei gleichen Konzentrationen ist der Logarithmus in der Henderson-Hasselbalch-Gleichung null, also pH = pKs = 4,6. Das Verdünnen auf einen Liter ändert daran nichts, nur die Pufferkapazität sinkt." },
    { id: "q7", question: "Welchen pH hat eine 0,01 M NaOH-Lösung bei 25 °C?", options: ["2", "7", "10", "12"], correct: 3, explanation: "pOH = −log(0,01) = 2, damit pH = 14 − 2 = 12. Der häufigste Fehler ist, den Rechenweg der Säure zu übernehmen und bei pH 2 zu landen — bei einer starken Base führt der Weg immer über pOH." },
    { id: "q8", question: "Welchen pH hat ein Puffer aus gleichen Stoffmengen NH₄⁺ und NH₃ (pKs(NH₄⁺) = 9,25)?", options: ["4,75", "7,00", "9,25", "11,50"], correct: 2, explanation: "Am Halbäquivalenzpunkt sind Säure und korrespondierende Base gleich konzentriert, der Logarithmus wird null und pH = pKs = 9,25. Ein Ammoniakpuffer liegt also im Alkalischen — 4,75 wäre der pKb-Wert und gehört nicht in die Henderson-Hasselbalch-Gleichung." },
    { id: "q9", question: "Was geschieht mit dem pH eines Puffers beim Verdünnen mit Wasser um den Faktor 10?", options: ["Er steigt um eine Einheit", "Er bleibt in guter Näherung gleich", "Er fällt um eine Einheit", "Er nähert sich sofort dem Wert 7"], correct: 1, explanation: "In Henderson-Hasselbalch steht nur das Verhältnis von Base zu Säure, und beide werden gleichermaßen verdünnt. Der pH bleibt deshalb erhalten, während die Pufferkapazität sinkt — die verdünnte Lösung hält denselben pH, aber sie hält ihn schlechter." },
    { id: "q10", question: "Wann ist die Pufferkapazität am größten?", options: ["Am Äquivalenzpunkt", "Bei pH 7", "Wenn ausschließlich die freie Säure vorliegt", "Wenn Säure und Base gleiche Anteile haben"], correct: 3, explanation: "Bei gleichen Anteilen kann der Puffer Säure- wie Basezugabe gleich gut abfangen; nutzbar ist etwa der Bereich pKs ± 1. Am Äquivalenzpunkt ist die Säure vollständig umgesetzt, dort springt der pH gerade am stärksten." },
    { id: "q11", question: "Warum liegt der Äquivalenzpunkt bei der Titration von Essigsäure mit NaOH im Basischen?", options: ["Weil die Lauge im Überschuss vorliegt", "Weil das gebildete Acetat als schwache Base mit Wasser reagiert", "Weil Essigsäure eine starke Säure ist", "Weil der Indikator den Wert verschiebt"], correct: 1, explanation: "Am Äquivalenzpunkt liegt nur noch Acetat vor, und dieses nimmt aus dem Wasser ein Proton auf — es entsteht ein Überschuss an OH⁻, der pH liegt bei etwa 8,7. Deshalb wird mit Phenolphthalein und nicht mit Methylorange titriert; bei einer starken Säure läge der Punkt dagegen bei 7." },
    { id: "q12", question: "Wie ändert sich der pH von reinem Wasser beim Erwärmen auf 50 °C?", options: ["Er bleibt bei genau 7,00", "Er steigt über 7, das Wasser wird basisch", "Er sinkt unter 7, das Wasser bleibt aber neutral", "Er sinkt unter 7 und das Wasser wird sauer"], correct: 2, explanation: "Das Ionenprodukt Kw wächst mit der Temperatur, deshalb steigen [H⁺] und [OH⁻] gemeinsam und der Neutralpunkt rutscht auf etwa 6,6. Neutral heißt [H⁺] = [OH⁻], nicht pH 7 — das gilt nur bei 25 °C. Aus demselben Grund brauchen pH-Meter eine Temperaturkompensation." },
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
