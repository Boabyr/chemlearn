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
