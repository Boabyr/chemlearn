import type { Thema } from '../../../content/schema'

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

## Die drei Stellschrauben der Auflösung

Rs = (√N/4) · ((α−1)/α) · (k'/(1+k'))

Die Gleichung zerfällt in drei Faktoren, die sich unabhängig voneinander verändern lassen
— und die sehr unterschiedlich viel bringen:

- **Trennstufenzahl N** wirkt nur mit der Wurzel. Die Säulenlänge zu verdoppeln bringt den
  Faktor √2 ≈ 1,41 an Auflösung, kostet aber die doppelte Analysenzeit und den doppelten
  Druck. Der teuerste Weg.
- **Selektivität α** wirkt am stärksten. Sie ändert sich über die stationäre oder mobile
  Phase, über pH oder Temperatur. Schon α von 1,05 auf 1,10 verdoppelt den mittleren
  Term. Der erste Weg, den man versucht.
- **Retentionsfaktor k'** wirkt nur bis etwa k' = 5; darüber läuft der Term gegen 1 und
  längeres Warten bringt nichts mehr. Der Zielbereich liegt bei k' = 2 bis 10.

**Faustregel zur Bewertung:** Rs = 1,0 trennt zu etwa 98 %, Rs = 1,5 heißt Basislinientrennung.
Alles darüber ist verschenkte Zeit.

## Van-Deemter: warum es eine optimale Flussrate gibt

H = A + B/u + C·u

- **A (Eddy-Diffusion):** verschiedene Wege durch die Packung. Hängt von der Korngröße ab,
  nicht von der Geschwindigkeit — bei Kapillarsäulen ohne Packung fällt der Term weg.
- **B (Longitudinaldiffusion):** Verbreiterung entlang der Säule. Wirkt sich vor allem bei
  langsamem Fluss aus, weil dann viel Zeit zum Diffundieren bleibt.
- **C (Stoffaustausch):** Verzögerung beim Übergang zwischen den Phasen. Wächst mit der
  Geschwindigkeit, weil das Gleichgewicht nicht mehr eingestellt wird.

Weil B mit 1/u fällt und C mit u steigt, hat H ein Minimum — die optimale Flussrate. In
der GC liegt sie höher als in der HPLC, weil Gase deutlich schneller diffundieren.

{{abbildung:van-deemter}}
`,
  interactives: [
    {
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
        umstellungen: [
          { solveFor: "Rs", expr: "2 * dtR / wsum" },
          { solveFor: "dtR", expr: "Rs * wsum / 2" },
          { solveFor: "wsum", expr: "2 * dtR / Rs" },
        ],
        hints: [
          "Rs = 2·ΔtR/(w1+w2). Rs < 1.0: ungenügend. Rs = 1.0: ~98%. Rs = 1.5: Basislinie. Peakbreiten w in gleichen Einheiten wie Retentionszeiten!",
          "Trennstufenzahl: N = 16·(tR/w)². Trennstufenhöhe H = L/N. Rs ∝ √N ∝ √L. Säule verdoppeln → Rs×√2 = 1.41×Rs."
        ],
      },
    },
  ],
  abbildungen: [
    {
      "art": "diagramm",
      "id": "van-deemter",
      "titel": "Van-Deemter: warum es eine optimale Flussrate gibt",
      "beschreibung": "H ist die Summe dreier Beiträge. B/u fällt, C·u steigt, A bleibt gleich — dazwischen liegt das Minimum.",
      "xAchse": {
        "titel": "Fließgeschwindigkeit u (mm/s)",
        "min": 0,
        "max": 4.2
      },
      "yAchse": {
        "titel": "Trennstufenhöhe H (µm)",
        "min": 0,
        "max": 34
      },
      "kurven": [
        {
          "beschriftung": "H gesamt",
          "punkte": [
            {
              "x": 0.2,
              "y": 34
            },
            {
              "x": 0.35,
              "y": 26.368
            },
            {
              "x": 0.5,
              "y": 21.75
            },
            {
              "x": 0.65,
              "y": 19.506
            },
            {
              "x": 0.8,
              "y": 18.3
            },
            {
              "x": 0.95,
              "y": 17.641
            },
            {
              "x": 1.1,
              "y": 17.305
            },
            {
              "x": 1.25,
              "y": 17.175
            },
            {
              "x": 1.4,
              "y": 17.186
            },
            {
              "x": 1.55,
              "y": 17.296
            },
            {
              "x": 1.7,
              "y": 17.479
            },
            {
              "x": 1.85,
              "y": 17.718
            },
            {
              "x": 2.0,
              "y": 18.0
            },
            {
              "x": 2.15,
              "y": 18.316
            },
            {
              "x": 2.3,
              "y": 18.659
            },
            {
              "x": 2.45,
              "y": 19.024
            },
            {
              "x": 2.6,
              "y": 19.408
            },
            {
              "x": 2.75,
              "y": 19.807
            },
            {
              "x": 2.9,
              "y": 20.219
            },
            {
              "x": 3.05,
              "y": 20.642
            },
            {
              "x": 3.2,
              "y": 21.075
            },
            {
              "x": 3.35,
              "y": 21.516
            },
            {
              "x": 3.5,
              "y": 21.964
            },
            {
              "x": 3.65,
              "y": 22.419
            },
            {
              "x": 3.8,
              "y": 22.879
            },
            {
              "x": 3.95,
              "y": 23.344
            },
            {
              "x": 4.1,
              "y": 23.813
            }
          ],
          "farbe": "accent"
        },
        {
          "beschriftung": "A — Eddy-Diffusion",
          "punkte": [
            {
              "x": 0.2,
              "y": 8.0
            },
            {
              "x": 0.35,
              "y": 8.0
            },
            {
              "x": 0.5,
              "y": 8.0
            },
            {
              "x": 0.65,
              "y": 8.0
            },
            {
              "x": 0.8,
              "y": 8.0
            },
            {
              "x": 0.95,
              "y": 8.0
            },
            {
              "x": 1.1,
              "y": 8.0
            },
            {
              "x": 1.25,
              "y": 8.0
            },
            {
              "x": 1.4,
              "y": 8.0
            },
            {
              "x": 1.55,
              "y": 8.0
            },
            {
              "x": 1.7,
              "y": 8.0
            },
            {
              "x": 1.85,
              "y": 8.0
            },
            {
              "x": 2.0,
              "y": 8.0
            },
            {
              "x": 2.15,
              "y": 8.0
            },
            {
              "x": 2.3,
              "y": 8.0
            },
            {
              "x": 2.45,
              "y": 8.0
            },
            {
              "x": 2.6,
              "y": 8.0
            },
            {
              "x": 2.75,
              "y": 8.0
            },
            {
              "x": 2.9,
              "y": 8.0
            },
            {
              "x": 3.05,
              "y": 8.0
            },
            {
              "x": 3.2,
              "y": 8.0
            },
            {
              "x": 3.35,
              "y": 8.0
            },
            {
              "x": 3.5,
              "y": 8.0
            },
            {
              "x": 3.65,
              "y": 8.0
            },
            {
              "x": 3.8,
              "y": 8.0
            },
            {
              "x": 3.95,
              "y": 8.0
            },
            {
              "x": 4.1,
              "y": 8.0
            }
          ],
          "stil": "gestrichelt",
          "farbe": "subtle"
        },
        {
          "beschriftung": "B/u — Längsdiffusion",
          "punkte": [
            {
              "x": 0.2,
              "y": 30.0
            },
            {
              "x": 0.35,
              "y": 17.143
            },
            {
              "x": 0.5,
              "y": 12.0
            },
            {
              "x": 0.65,
              "y": 9.231
            },
            {
              "x": 0.8,
              "y": 7.5
            },
            {
              "x": 0.95,
              "y": 6.316
            },
            {
              "x": 1.1,
              "y": 5.455
            },
            {
              "x": 1.25,
              "y": 4.8
            },
            {
              "x": 1.4,
              "y": 4.286
            },
            {
              "x": 1.55,
              "y": 3.871
            },
            {
              "x": 1.7,
              "y": 3.529
            },
            {
              "x": 1.85,
              "y": 3.243
            },
            {
              "x": 2.0,
              "y": 3.0
            },
            {
              "x": 2.15,
              "y": 2.791
            },
            {
              "x": 2.3,
              "y": 2.609
            },
            {
              "x": 2.45,
              "y": 2.449
            },
            {
              "x": 2.6,
              "y": 2.308
            },
            {
              "x": 2.75,
              "y": 2.182
            },
            {
              "x": 2.9,
              "y": 2.069
            },
            {
              "x": 3.05,
              "y": 1.967
            },
            {
              "x": 3.2,
              "y": 1.875
            },
            {
              "x": 3.35,
              "y": 1.791
            },
            {
              "x": 3.5,
              "y": 1.714
            },
            {
              "x": 3.65,
              "y": 1.644
            },
            {
              "x": 3.8,
              "y": 1.579
            },
            {
              "x": 3.95,
              "y": 1.519
            },
            {
              "x": 4.1,
              "y": 1.463
            }
          ],
          "stil": "gestrichelt",
          "farbe": "warning"
        },
        {
          "beschriftung": "C·u — Stoffaustausch",
          "punkte": [
            {
              "x": 0.2,
              "y": 0.7
            },
            {
              "x": 0.35,
              "y": 1.225
            },
            {
              "x": 0.5,
              "y": 1.75
            },
            {
              "x": 0.65,
              "y": 2.275
            },
            {
              "x": 0.8,
              "y": 2.8
            },
            {
              "x": 0.95,
              "y": 3.325
            },
            {
              "x": 1.1,
              "y": 3.85
            },
            {
              "x": 1.25,
              "y": 4.375
            },
            {
              "x": 1.4,
              "y": 4.9
            },
            {
              "x": 1.55,
              "y": 5.425
            },
            {
              "x": 1.7,
              "y": 5.95
            },
            {
              "x": 1.85,
              "y": 6.475
            },
            {
              "x": 2.0,
              "y": 7.0
            },
            {
              "x": 2.15,
              "y": 7.525
            },
            {
              "x": 2.3,
              "y": 8.05
            },
            {
              "x": 2.45,
              "y": 8.575
            },
            {
              "x": 2.6,
              "y": 9.1
            },
            {
              "x": 2.75,
              "y": 9.625
            },
            {
              "x": 2.9,
              "y": 10.15
            },
            {
              "x": 3.05,
              "y": 10.675
            },
            {
              "x": 3.2,
              "y": 11.2
            },
            {
              "x": 3.35,
              "y": 11.725
            },
            {
              "x": 3.5,
              "y": 12.25
            },
            {
              "x": 3.65,
              "y": 12.775
            },
            {
              "x": 3.8,
              "y": 13.3
            },
            {
              "x": 3.95,
              "y": 13.825
            },
            {
              "x": 4.1,
              "y": 14.35
            }
          ],
          "stil": "gestrichelt",
          "farbe": "success"
        }
      ],
      "marker": [
        {
          "x": 1.31,
          "y": 17.17,
          "beschriftung": "u optimal",
          "hilfslinien": true
        }
      ]
    }
  ],
  quiz: [
    { id: "q1", question: "Ein Rf-Wert von 0,9 bei der DC bedeutet:", options: ["Die Substanz bleibt am Startpunkt liegen", "Sie läuft fast mit der Front, kaum Retention", "Die Trennung verläuft optimal", "Die Substanz löst sich in der mobilen Phase nicht"], correct: 1, explanation: "Rf ist die Laufstrecke der Substanz geteilt durch die der Front. Rf = 0,9 heißt: fast keine Wechselwirkung mit der stationären Phase. Der brauchbare Bereich liegt bei 0,3 bis 0,7. Abhilfe: polarere stationäre oder weniger polare mobile Phase." },
    { id: "q2", question: "Was sagt der Retentionsfaktor k' über die Elutionsreihenfolge aus?", options: ["Große k'-Werte eluieren zuerst", "Kleine k'-Werte eluieren zuerst", "k' sagt nichts über die Reihenfolge", "k' hängt nur von der Molmasse ab"], correct: 1, explanation: "k' = (tR − tM)/tM misst, wie lange eine Substanz im Verhältnis zur Totzeit auf der Säule festgehalten wird. Kleines k' heißt geringe Affinität zur stationären Phase und damit frühe Elution. Bei k' = 0 läuft die Substanz mit der Totzeit durch, ist also gar nicht getrennt." },
    { id: "q3", question: "Was beschreibt der Term A in der van-Deemter-Gleichung H = A + B/u + Cu?", options: ["Die Diffusion entlang der Säulenachse", "Die Eddy-Diffusion durch verschiedene Wege", "Die Kinetik des Stoffaustauschs", "Die Temperaturabhängigkeit der Trennung"], correct: 1, explanation: "Der A-Term erfasst, dass es durch eine gepackte Säule viele verschieden lange Wege gibt. Er hängt an der Korngröße und der Gleichmäßigkeit der Packung, nicht an der Flussgeschwindigkeit — deshalb steht kein u dabei. Bei Kapillarsäulen ohne Packung fällt er ganz weg." },
    { id: "q4", question: "Retentionszeiten A=14,3min, B=17,1min, Peakbreiten 1,05 und 1,27min. Wie groß ist die Auflösung?", options: ["Rs = 1,2", "Rs = 2,3", "Rs = 4,2", "Rs = 0,8"], correct: 1, explanation: "Rs = 2·(17,1-14,3)/(1,05+1,27) = 2·2,8/2,32 = 5,6/2,32 = 2,41 ≈ 2,3. Sehr gute Trennung (Basislinie = 1,5)." },
    { id: "q5", question: "Wie beeinflusst die Partikelgröße der stationären Phase die Trennleistung?", options: ["Kleinere Partikel verschlechtern die Trennung", "Kleinere Partikel erhöhen N, aber auch den Druck", "Die Partikelgröße spielt keine Rolle", "Größere Partikel erhöhen die Trennstufenzahl"], correct: 1, explanation: "Kleinere Partikel verkürzen die Diffusionswege, senken die Trennstufenhöhe H und erhöhen damit N. Der Preis steht im Gesetz von Darcy: Der Druckabfall wächst mit dem Quadrat der Korngröße im Nenner. Genau deshalb braucht UHPLC mit Sub-2-µm-Material Geräte für 1000 bar." },
    { id: "q6", question: "Eine Säule (L=25cm) liefert Rs=1,2. Wie lang muss sie sein für Rs=1,5?", options: ["31,25 cm", "39,06 cm", "45,00 cm", "50,00 cm"], correct: 1, explanation: "Rs ∝ √L. L_neu = L_alt × (Rs_neu/Rs_alt)² = 25 × (1,5/1,2)² = 25 × 1,5625 = 39,06 cm. Quadratische Abhängigkeit! Auflösung verdoppeln: Säule 4× länger." },
  ],
  flashcards: [
    { id: "0klzclp", front: "Kapazitätsfaktor k'", back: "k' = (tR - tM) / tM. Dimensionslos. k'=0: nicht retardiert. k'=1: gleich viel Zeit in mob. und stat. Phase. Eluierungsreihenfolge: kleinstes k' zuerst. Ideal: k' = 2-10." },
    { id: "0a4h4go", front: "Van-Deemter-Gleichung", back: "H = A + B/u + Cu. A: Eddy-Diffusion (Partikelgröße). B/u: Longitudinale Diffusion (langsam → viel Diffusion). Cu: Massentransfer (schnell → keine Zeit für Gleichgewicht). Optimum: u_opt = √(B/C)." },
    { id: "0yst425", front: "Auflösung Rs", back: "Rs = 2·(tR2-tR1)/(w1+w2). Rs < 1.0: ungenügend. Rs ≥ 1.5: Basislinienstrennung. Rs ∝ √N ∝ √L. Für Rs = 1,5 nötige Länge: L = L_alt · (1,5/Rs_alt)²." },
    { id: "0d7xu3n", front: "Trennstufenzahl N und H", back: "N = 16·(tR/w)² (Basispeakbreite). H = L/N. Dimensionsloses Maß für Säuleneffizienz. HPLC: N = 5.000-100.000. GC: N > 100.000. Mehr N = schärfere Peaks = bessere Trennung." },
    { id: "0xtqwn2", front: "Rf-Wert (DC)", back: "Rf = Wanderstrecke Substanz / Wanderstrecke Lösungsmittelfront. 0 ≤ Rf ≤ 1. Ideal: 0,3-0,7. Rf ≈ 1/( 1 + k'). Größeres Rf = mehr Zeit in mobiler Phase." },
    { id: "0j0ttvc", front: "Selektivitätsfaktor α", back: "α = k'B/k'A (k'B > k'A > 0). α = 1: keine Selektivität. α > 1: Trennung möglich. α = tR2-tM / tR1-tM. Steigern durch Änderung stationärer Phase oder Lösungsmittel." },
  ],
} satisfies Thema;
