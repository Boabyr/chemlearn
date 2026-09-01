import type { Thema } from '../../../content/schema'

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

## Der Sprung am Äquivalenzpunkt

Warum die Kurve dort steil wird, lässt sich an der Nernst-Gleichung ablesen: E hängt vom
**Logarithmus** der Konzentration ab. Kurz vor dem Äquivalenzpunkt ist noch reichlich
Chlorid da und [Ag⁺] bleibt winzig; kurz danach ist das Chlorid verbraucht und jeder
weitere Tropfen erhöht [Ag⁺] um Zehnerpotenzen. Genau dieser Wechsel um mehrere Dekaden
in einem kleinen Volumenbereich erzeugt den Sprung.

Daraus folgt: **Je kleiner Ksp, desto größer der Sprung.** AgI (Ksp = 8,5×10⁻¹⁷) liefert
eine deutlich schärfere Stufe als AgCl (1,8×10⁻¹⁰). Bei zu großem Ksp verschwindet der
Sprung im Rauschen und die Titration wird unbrauchbar.

{{abbildung:titrationskurve}}

## Die drei klassischen Indikatorverfahren

| Verfahren | Prinzip | Bedingung |
|---|---|---|
| **Mohr** | Chromat bildet nach dem ÄP rotes Ag₂CrO₄ | pH 6,5–10, sonst fällt Chromat als Dichromat aus |
| **Volhard** | Rücktitration des Ag⁺-Überschusses mit SCN⁻, Fe³⁺ zeigt rot an | saure Lösung |
| **Fajans** | Adsorptionsindikator (Fluorescein) schlägt an der Niederschlagsoberfläche um | nahe am Ladungsnullpunkt |

Die potentiometrische Variante braucht keinen davon: Sie misst das Potential direkt und
funktioniert auch in trüben und gefärbten Lösungen, in denen kein Farbumschlag zu erkennen
wäre.

## Elektroden erster und zweiter Art

- **Erster Art:** Metall in einer Lösung seiner eigenen Ionen (Ag in Ag⁺). Das Potential
  folgt der Analytkonzentration — brauchbar als **Indikatorelektrode**.
- **Zweiter Art:** Metall, sein schwerlösliches Salz und das zugehörige Anion in
  konstanter Konzentration (Ag/AgCl/KCl gesättigt). Das Potential ist festgenagelt —
  brauchbar als **Referenzelektrode**.

Beide beruhen auf derselben Nernst-Gleichung. Der Unterschied liegt allein darin, ob die
bestimmende Konzentration variabel oder festgehalten ist.


`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "silberpotential",
        name: "Silberelektrode in der Fällungstitration",
        equation: "E = E° + 0,05916 · log[Ag⁺]",
        variables: [
          { id: "E", label: "Gemessenes Potential", symbol: "E", unit: "V", description: "Gegen die Standardwasserstoffelektrode" },
          { id: "E0", label: "Standardpotential", symbol: "E°", unit: "V", description: "Für Ag⁺/Ag sind das +0,799 V" },
          { id: "cAg", label: "Silberionenkonzentration", symbol: "[Ag⁺]", unit: "mol/L", description: "Freie Ag⁺-Ionen in der Lösung" },
        ],
        umstellungen: [
          { solveFor: "E", expr: "E0 + 0.05916 * log(cAg)" },
          { solveFor: "E0", expr: "E - 0.05916 * log(cAg)" },
          { solveFor: "cAg", expr: "10 ^ ((E - E0) / 0.05916)" },
        ],
        hints: ["Vor dem Äquivalenzpunkt bekommst du [Ag⁺] nicht direkt, sondern über das Löslichkeitsprodukt: [Ag⁺] = Ksp/[Cl⁻] mit Ksp(AgCl) = 1,8·10⁻¹⁰.", "Am Äquivalenzpunkt ist [Ag⁺] = [Cl⁻] = √Ksp. Eingesetzt ergibt das E = E° + 0,05916/2 · log(Ksp) — der Wendepunkt der Titrationskurve."],
      },
    },
  ],
  abbildungen: [
    {
      "art": "diagramm",
      "id": "titrationskurve",
      "titel": "Fällungstitration: die Sprunghöhe hängt an Ksp",
      "beschreibung": "Beide Male 100 mL 0,1 M Halogenid, titriert mit 0,1 M AgNO₃. Das kleinere Löslichkeitsprodukt des Silberiodids drückt [Ag⁺] vor dem Äquivalenzpunkt viel tiefer — der Sprung wird entsprechend höher.",
      "xAchse": {
        "titel": "zugesetztes AgNO₃ (mL)",
        "min": 0,
        "max": 200
      },
      "yAchse": {
        "titel": "E gegen SHE (V)",
        "min": -0.2,
        "max": 0.85
      },
      "kurven": [
        {
          "beschriftung": "Chlorid, Ksp = 1,8·10⁻¹⁰",
          "punkte": [
            {
              "x": 0.0,
              "y": 0.2817
            },
            {
              "x": 5.0,
              "y": 0.2842
            },
            {
              "x": 10.0,
              "y": 0.2868
            },
            {
              "x": 15.0,
              "y": 0.2894
            },
            {
              "x": 20.0,
              "y": 0.2921
            },
            {
              "x": 25.0,
              "y": 0.2948
            },
            {
              "x": 30.0,
              "y": 0.2976
            },
            {
              "x": 35.0,
              "y": 0.3004
            },
            {
              "x": 40.0,
              "y": 0.3034
            },
            {
              "x": 45.0,
              "y": 0.3066
            },
            {
              "x": 50.0,
              "y": 0.3099
            },
            {
              "x": 55.0,
              "y": 0.3134
            },
            {
              "x": 60.0,
              "y": 0.3173
            },
            {
              "x": 65.0,
              "y": 0.3215
            },
            {
              "x": 70.0,
              "y": 0.3262
            },
            {
              "x": 75.0,
              "y": 0.3317
            },
            {
              "x": 80.0,
              "y": 0.3381
            },
            {
              "x": 85.0,
              "y": 0.3462
            },
            {
              "x": 90.0,
              "y": 0.3573
            },
            {
              "x": 95.0,
              "y": 0.3758
            },
            {
              "x": 100.0,
              "y": 0.5108
            },
            {
              "x": 105.0,
              "y": 0.6444
            },
            {
              "x": 110.0,
              "y": 0.6616
            },
            {
              "x": 115.0,
              "y": 0.6714
            },
            {
              "x": 120.0,
              "y": 0.6782
            },
            {
              "x": 125.0,
              "y": 0.6834
            },
            {
              "x": 130.0,
              "y": 0.6875
            },
            {
              "x": 135.0,
              "y": 0.6909
            },
            {
              "x": 140.0,
              "y": 0.6938
            },
            {
              "x": 145.0,
              "y": 0.6963
            },
            {
              "x": 150.0,
              "y": 0.6985
            },
            {
              "x": 155.0,
              "y": 0.7004
            },
            {
              "x": 160.0,
              "y": 0.7022
            },
            {
              "x": 165.0,
              "y": 0.7037
            },
            {
              "x": 170.0,
              "y": 0.7052
            },
            {
              "x": 175.0,
              "y": 0.7065
            },
            {
              "x": 180.0,
              "y": 0.7077
            },
            {
              "x": 185.0,
              "y": 0.7088
            },
            {
              "x": 190.0,
              "y": 0.7098
            },
            {
              "x": 195.0,
              "y": 0.7107
            },
            {
              "x": 200.0,
              "y": 0.7116
            }
          ],
          "farbe": "accent"
        },
        {
          "beschriftung": "Iodid, Ksp = 8,5·10⁻¹⁷",
          "punkte": [
            {
              "x": 0.0,
              "y": -0.0926
            },
            {
              "x": 5.0,
              "y": -0.09
            },
            {
              "x": 10.0,
              "y": -0.0874
            },
            {
              "x": 15.0,
              "y": -0.0848
            },
            {
              "x": 20.0,
              "y": -0.0822
            },
            {
              "x": 25.0,
              "y": -0.0795
            },
            {
              "x": 30.0,
              "y": -0.0767
            },
            {
              "x": 35.0,
              "y": -0.0738
            },
            {
              "x": 40.0,
              "y": -0.0708
            },
            {
              "x": 45.0,
              "y": -0.0677
            },
            {
              "x": 50.0,
              "y": -0.0643
            },
            {
              "x": 55.0,
              "y": -0.0608
            },
            {
              "x": 60.0,
              "y": -0.057
            },
            {
              "x": 65.0,
              "y": -0.0527
            },
            {
              "x": 70.0,
              "y": -0.048
            },
            {
              "x": 75.0,
              "y": -0.0426
            },
            {
              "x": 80.0,
              "y": -0.0361
            },
            {
              "x": 85.0,
              "y": -0.028
            },
            {
              "x": 90.0,
              "y": -0.0169
            },
            {
              "x": 95.0,
              "y": 0.0016
            },
            {
              "x": 100.0,
              "y": 0.3236
            },
            {
              "x": 105.0,
              "y": 0.6444
            },
            {
              "x": 110.0,
              "y": 0.6616
            },
            {
              "x": 115.0,
              "y": 0.6714
            },
            {
              "x": 120.0,
              "y": 0.6782
            },
            {
              "x": 125.0,
              "y": 0.6834
            },
            {
              "x": 130.0,
              "y": 0.6875
            },
            {
              "x": 135.0,
              "y": 0.6909
            },
            {
              "x": 140.0,
              "y": 0.6938
            },
            {
              "x": 145.0,
              "y": 0.6963
            },
            {
              "x": 150.0,
              "y": 0.6985
            },
            {
              "x": 155.0,
              "y": 0.7004
            },
            {
              "x": 160.0,
              "y": 0.7022
            },
            {
              "x": 165.0,
              "y": 0.7037
            },
            {
              "x": 170.0,
              "y": 0.7052
            },
            {
              "x": 175.0,
              "y": 0.7065
            },
            {
              "x": 180.0,
              "y": 0.7077
            },
            {
              "x": 185.0,
              "y": 0.7088
            },
            {
              "x": 190.0,
              "y": 0.7098
            },
            {
              "x": 195.0,
              "y": 0.7107
            },
            {
              "x": 200.0,
              "y": 0.7116
            }
          ],
          "farbe": "warning"
        }
      ],
      "marker": [
        {
          "x": 100,
          "y": 0.511,
          "beschriftung": "ÄP Chlorid",
          "hilfslinien": true
        },
        {
          "x": 100,
          "y": 0.324,
          "beschriftung": "ÄP Iodid",
          "hilfslinien": true
        }
      ]
    }
  ],
  quiz: [
    { id: "q1", question: "Was ist eine Elektrode 2. Art und warum wird sie als Referenzelektrode verwendet?", options: ["Eine Elektrode aus zwei verschiedenen Metallen", "Metall, schwerlösliches Salz und dessen Anion", "Eine leicht polarisierbare Elektrode", "Eine Elektrode, die nur Anionen misst"], correct: 1, explanation: "Beispiel Ag/AgCl/KCl: Das Potential folgt E = E° − 0,05916·log[Cl⁻]. Weil die gesättigte KCl-Lösung die Chloridkonzentration festhält, bleibt E konstant und reproduzierbar. Eine Elektrode erster Art (Ag in Ag⁺-Lösung) folgt dagegen der Analytkonzentration und taugt als Indikatorelektrode." },
    { id: "q2", question: "Wie berechnet man die Zellspannung bei 65% Titration von 100mL 0,1M NaCl mit 0,1M AgNO₃ (Ksp=1,8×10⁻¹⁰, E°Ag=0,799V)?", options: ["Unmittelbar aus dem Standardpotential E° = 0,799 V", "Über Ksp zu [Ag⁺], dann Nernst: rund +0,32 V", "Am Äquivalenzpunkt gilt stets E = 0 V", "Über E = 0,799 − 0,05916/2·log(Ksp)"], correct: 1, explanation: "Nach 65 % der Titration bleiben 3,5 mmol Chlorid in 165 mL, also [Cl⁻] = 0,021 mol/L. Daraus [Ag⁺] = Ksp/[Cl⁻] = 8,5·10⁻⁹ mol/L und mit Nernst E = 0,799 + 0,05916·log(8,5·10⁻⁹) = +0,32 V. Die letzte Formel gilt erst am Äquivalenzpunkt selbst." },
    { id: "q3", question: "Was ist 0,4 ppb in μg/L?", options: ["0,4 μg/L", "400 μg/L", "0,0004 μg/L", "0,4 mg/L"], correct: 0, explanation: "ppb = parts per billion = μg/kg ≈ μg/L (wässrige Lösung). 0,4 ppb = 0,4 μg/L. Reihe: 1 ppm = 1 mg/L; 1 ppb = 1 μg/L; 1 ppt = 1 ng/L." },
    { id: "q4", question: "Wie berechnet sich das Potential am Äquivalenzpunkt einer Redoxtitration (Fe²⁺ mit Ce⁴⁺)?", options: ["Es gilt E = E°(Fe³⁺/Fe²⁺)", "Der Mittelwert beider Standardpotentiale", "Am Äquivalenzpunkt ist E stets null", "Es gilt E = E°(Ce⁴⁺/Ce³⁺)"], correct: 1, explanation: "Weil beide Halbreaktionen ein Elektron übertragen, liegt das Potential am Äquivalenzpunkt genau in der Mitte: E_ÄP = (E°Fe + E°Ce)/2. Bei ungleicher Elektronenzahl wird gewichtet: E_ÄP = (n₁E°₁ + n₂E°₂)/(n₁+n₂). Vor dem Punkt rechnet man mit dem Paar der Probe, danach mit dem des Titranten." },
    { id: "q5", question: "Warum ist die gesättigte KCl-Lösung in Referenzelektroden wichtig?", options: ["Wegen ihrer besonders hohen elektrischen Leitfähigkeit", "Sie hält [Cl⁻] fest und das Diffusionspotential klein", "Sie puffert die Lösung gegen pH-Änderungen", "Sie verhindert die Oxidation des Elektrodenmetalls"], correct: 1, explanation: "Zwei Aufgaben in einem Salz. Erstens legt die konstante Chloridkonzentration das Potential der Elektrode fest. Zweitens haben K⁺ und Cl⁻ nahezu gleiche Ionenbeweglichkeit, sodass an der Grenzfläche zur Probe kaum ein Diffusionspotential entsteht." },
    { id: "q6", question: "Warum liefert die Titration von Iodid mit Ag⁺ einen schärferen Potentialsprung als die von Chlorid?", options: ["Weil Iodid die größere Molmasse hat", "Weil AgI ein viel kleineres Ksp hat", "Weil Iodid deutlich schneller reagiert", "Weil bei Iodid kein Niederschlag entsteht"], correct: 1, explanation: "Das Potential hängt vom Logarithmus der Silberionenkonzentration ab. Wie hoch der Sprung ausfällt, entscheidet sich daran, über wie viele Zehnerpotenzen [Ag⁺] am Äquivalenzpunkt springt — und das bestimmt Ksp. AgI liegt bei 8,5·10⁻¹⁷, AgCl bei 1,8·10⁻¹⁰: gut sechs Dekaden Unterschied." },
  ],
  flashcards: [
    { id: "0uzyeji", front: "Ag/AgCl Elektrode", back: "AgCl + e⁻ ⇌ Ag + Cl⁻. E = 0,222 - 0,05916·log[Cl⁻]. In ges. KCl: E = +0,197V vs. SHE. Robust, einfach, häufigste Referenzelektrode. Potential konstant durch [Cl⁻] = konstant." },
    { id: "0r86tgg", front: "Kalomel-Elektrode (SCE)", back: "Hg₂Cl₂ + 2e⁻ ⇌ 2Hg + 2Cl⁻. Ges. SCE: +0,241V vs. SHE. Häufig in älteren Geräten. Enthält Hg → weniger umweltfreundlich. Klassische Referenzelektrode." },
    { id: "0a1s9cy", front: "Potential-Berechnung Fällungstitration", back: "Vor ÄP: [Ag⁺] = Ksp/[Cl⁻], dann Nernst. Am ÄP: [Ag⁺]=[Cl⁻]=√Ksp → E_ÄP = E°+0,05916/2·log(Ksp). Nach ÄP: [Ag⁺] = cÜberschuss." },
    { id: "1cbvcf0", front: "ppm, ppb, Molarität", back: "1 ppm = 1 mg/L (wässrig). 1 ppb = 1 μg/L. 1 ppt = 1 ng/L. Umrechnung: c[mol/L] = c[mg/L] / M[g/mol] × 10⁻³. Beispiel: 68ppb C₂₉H₆₀ (M=409): c = 68×10⁻⁶/409 = 166nmol/L." },
    { id: "17wuf8x", front: "Äquivalenzpunkt einer Redoxtitration", back: "Bei einer Titration mit gleicher Elektronenzahl auf beiden Seiten liegt das Potential am Äquivalenzpunkt im Mittel der beiden Standardpotentiale: E_ÄP = (E°(Fe³⁺/Fe²⁺) + E°(Ce⁴⁺/Ce³⁺))/2. Vor dem Punkt rechnet man mit dem Redoxpaar der Probe, danach mit dem des Titranten." },
    { id: "0sldftl", front: "ppm und ppb in Molarität umrechnen", back: "1 ppm entspricht in wässriger Lösung 1 mg/L, 1 ppb entspricht 1 µg/L (Dichte ≈ 1). Molarität: c[mol/L] = c[mg/L] / M[g/mol] · 10⁻³. Beispiel: 68 ppb einer Substanz mit M = 408,8 g/mol ergeben 1,66·10⁻⁷ mol/L." },
  ],
} satisfies Thema;
