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
