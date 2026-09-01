import type { Thema } from '../../../content/schema'

export const topic = {
  id: "06-elektrochemische-grundlagen",
  title: "Elektrochemische Grundlagen",
  subtitle: "Galvanische Zellen, Elektrodenpotentiale, Nernst-Gleichung",
  icon: "⚡",
  estimatedMinutes: 70,
  theory: `
## Elektrochemische Zellen

**Galvanische Zelle:** Spontane Redoxreaktion erzeugt elektrische Energie (ΔG < 0)
**Elektrolysezelle:** Elektrische Energie treibt nicht-spontane Reaktion an (ΔG > 0)

**Standardelektrodenpotentiale E°:**
Gemessen gegen Standardwasserstoffelektrode (SHE/NHE): E° = 0 V per Definition.

**Zellspannung:**
E_Zelle = E_Kathode − E_Anode

## Nernst-Gleichung

Für die Halbzellreaktion: Ox + ne⁻ → Red

**Nernst-Gleichung:**
E = E° − (RT)/(nF) · ln(a_Red/a_Ox)

Bei 25°C: E = E° − (0.05916/n) · log([Red]/[Ox])

| Symbol | Bedeutung |
|---|---|
| E° | Standardelektrodenpotential (V) |
| R | Gaskonstante = 8.314 J/(mol·K) |
| T | Temperatur (K) |
| n | Anzahl übertragener Elektronen |
| F | Faraday-Konstante = 96485 C/mol |

## Referenzelektroden

In der Praxis werden praktischere Referenzelektroden verwendet:

| Elektrode | E° (vs. NHE) | Zusammensetzung |
|---|---|---|
| SHE/NHE | 0.000 V | H₂ (1 bar) / H⁺ (a=1) |
| Kalomel (SCE) | +0.241 V | Hg/Hg₂Cl₂/KCl (ges.) |
| Ag/AgCl | +0.197 V | Ag/AgCl/KCl (ges.) |

## Konzentrationszellen

Zwei Elektroden gleichen Materials, aber unterschiedliche Konzentrationen:
E = (0.05916/n) · log(c₁/c₂)   (bei 25°C)

→ Treibende Kraft: Konzentrationsunterschied!

## Flüssig-Flüssig-Grenzfläche und Diffusionspotential

Zwischen zwei Lösungen verschiedener Konzentration entsteht ein Diffusionspotential (Flüssigkeitspotential), da Ionen unterschiedlich schnell diffundieren.

→ Wird durch Salzbrücke (KCl-Agar) minimiert.

Warum ausgerechnet KCl: K⁺ und Cl⁻ haben nahezu gleiche Ionenbeweglichkeit. Sie wandern
gleich schnell in entgegengesetzte Richtungen, und damit baut sich an der Grenzfläche
kaum eine Ladungstrennung auf. Ein Salz mit ungleichen Beweglichkeiten — etwa HCl, wo H⁺
mehrfach schneller ist als Cl⁻ — würde das Diffusionspotential vergrößern statt es zu
unterdrücken.

## Die Nernst-Gleichung im Gebrauch

E = E° − (0,05916/n) · log([Red]/[Ox])   (bei 25 °C)

Der Vorfaktor 0,05916 V ist 2,303·RT/F bei 298 K. Daraus folgt die Faustregel, die fast
jede Rechenaufgabe trägt: **pro Zehnerpotenz Konzentrationsverhältnis ändert sich das
Potential um 59,16/n Millivolt.** Für n = 1 sind das 59 mV je Dekade, für n = 2 nur noch
30 mV.

Zwei Fehler passieren dabei regelmäßig:
- **Bruch verdreht.** Steht [Ox] im Zähler, dreht sich das Vorzeichen und das Potential
  läuft in die falsche Richtung. Merkhilfe: mehr oxidierte Form heißt höheres Potential.
- **n falsch gewählt.** n ist die Zahl der Elektronen der *Halbreaktion*, nicht die
  Ladung des Ions. Bei Fe³⁺/Fe²⁺ ist n = 1, obwohl dreifach geladene Ionen beteiligt sind.

## Galvanische Zelle und Elektrolysezelle

| | Galvanische Zelle | Elektrolysezelle |
|---|---|---|
| Triebkraft | läuft freiwillig, ΔG < 0 | erzwungen, Energie von außen |
| Anode | negativer Pol | positiver Pol |
| Kathode | positiver Pol | negativer Pol |

Die Pole wechseln, die Definition nicht: **an der Anode läuft immer die Oxidation, an der
Kathode immer die Reduktion.** Wer sich das merkt, kommt ohne die Vorzeichenregel aus.

Die Zellspannung ergibt sich stets als E(Kathode) − E(Anode). Ein positiver Wert heißt:
die Reaktion läuft freiwillig in der angeschriebenen Richtung.
`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "nernst",
      name: "Nernst-Gleichung (25°C)",
      equation: "E = E° − (0.05916/n) · log([Red]/[Ox])",
      variables: [
        { id: "E", label: "Elektrodenpotential", symbol: "E", unit: "V", description: "Gemessenes Potential" },
        { id: "E0", label: "Standardpotential", symbol: "E°", unit: "V", description: "Standardelektrodenpotential" },
        { id: "n", label: "Elektronenzahl", symbol: "n", unit: "—", description: "Anzahl übertragener Elektronen" },
        { id: "ratio", label: "Konzentrationsverhältnis", symbol: "[Red]/[Ox]", unit: "—", description: "c(Red)/c(Ox)" },
      ],
      umstellungen: [
        { solveFor: "E", expr: "E0 - (0.05916 / n) * log(ratio)" },
        { solveFor: "E0", expr: "E + (0.05916 / n) * log(ratio)" },
        { solveFor: "ratio", expr: "(10) ^ ((E0 - E) * n / 0.05916)" },
      ],
      hints: [
        "E = E° − (0.05916/n) · log([Red]/[Ox]). Bei 25°C ist RT/F = 0.02569 V, und 2.303·RT/F = 0.05916 V. Typisch: n = 1 oder 2.",
        "log([Red]/[Ox]): Bei hoher [Red] → positive log → E sinkt. Bei hoher [Ox] → negative log → E steigt. Oxidierte Form bevorzugt höhere Potentiale."
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Was misst die Nernst-Gleichung?", options: ["Den Strom in einer Elektrolysezelle bei fester Spannung", "Das Potential in Abhängigkeit von der Konzentration", "Die Leitfähigkeit einer Elektrolytlösung", "Die Zellspannung bei Standardbedingungen"], correct: 1, explanation: "Die Nernst-Gleichung verknüpft das Elektrodenpotential mit dem Konzentrationsverhältnis von oxidierter und reduzierter Form: E = E° − (0,05916/n)·log([Red]/[Ox]). Bei Standardbedingungen ist das Verhältnis eins, der Logarithmus null und E = E° — der Standardfall ist also nur ein Sonderfall der Gleichung." },
    { id: "q2", question: "Was ist der Vorfaktor bei 25°C in der Nernst-Gleichung (mit log₁₀)?", options: ["0.02569 V", "0.05916 V", "96485 V", "8.314 V"], correct: 1, explanation: "Bei 25°C: 2.303·RT/F = 2.303 × 8.314 × 298 / 96485 = 0.05916 V. Pro Dekade Konzentrationsänderung verschiebt sich E um 0.05916/n Volt." },
    { id: "q3", question: "Welches Potential hat die Standardwasserstoffelektrode (SHE)?", options: ["+0,241 V (gesättigte Kalomelelektrode)", "+0,197 V (gesättigte Ag/AgCl-Elektrode)", "0,000 V (per Definition festgelegt)", "−0,763 V (Zn²⁺/Zn-Halbzelle)"], correct: 2, explanation: "Der Nullpunkt der Spannungsreihe ist eine Festlegung, keine Messung: Die Standardwasserstoffelektrode bekommt per Definition 0,000 V. Alle anderen Potentiale sind Differenzen dazu. Im Labor arbeitet man mit den handlicheren Referenzen Ag/AgCl (+0,197 V) und Kalomel (+0,241 V) und rechnet bei Bedarf um." },
    { id: "q4", question: "Was treibt eine Konzentrationszelle an?", options: ["Zwei verschiedene Elektrodenmaterialien", "Der Konzentrationsunterschied beider Halbzellen", "Eine von außen angelegte Spannungsquelle", "Ein Temperaturunterschied zwischen den Halbzellen"], correct: 1, explanation: "Beide Elektroden sind aus demselben Material, damit ist E° auf beiden Seiten gleich und fällt heraus. Übrig bleibt E = (0,05916/n)·log(c₁/c₂). Die Triebkraft ist der Konzentrationsausgleich; sobald beide Seiten gleich konzentriert sind, ist die Spannung null." },
    { id: "q5", question: "Warum wird eine Salzbrücke in galvanischen Zellen verwendet?", options: ["Um Elektronen zwischen den Halbzellen zu leiten", "Um das Diffusionspotential klein zu halten", "Um die Elektrodenreaktion zu katalysieren", "Um die Temperatur beider Halbzellen anzugleichen"], correct: 1, explanation: "Die Salzbrücke schließt den Stromkreis über Ionen, nicht über Elektronen — die laufen durch den äußeren Draht. Genutzt wird KCl, weil K⁺ und Cl⁻ nahezu gleiche Beweglichkeit haben: Sie wandern gleich schnell in entgegengesetzte Richtungen, sodass sich an der Grenzfläche kaum eine Ladungstrennung aufbaut." },
    { id: "q6", question: "Eine Elektrode mit E° = +0.34 V (Cu²⁺/Cu) wird mit einer Elektrode E° = −0.76 V (Zn²⁺/Zn) kombiniert. Was ist E_Zelle°?", options: ["−0.42 V", "+0.42 V", "+1.10 V", "−1.10 V"], correct: 2, explanation: "E_Zelle = E_Kathode − E_Anode. Cu hat höheres E° → Kathode. Zn → Anode. E_Zelle = 0.34 − (−0.76) = +1.10 V. Positives E_Zelle → spontane Reaktion (ΔG = −nFE < 0). Das ist das Daniell-Element!" },
  ],
  flashcards: [
    { id: "0nj0tc8", front: "Nernst-Gleichung", back: "E = E° − (RT/nF)·ln([Red]/[Ox]). Bei 25°C: E = E° − (0.05916/n)·log([Red]/[Ox]). Pro Dekade Konzentrationsänderung: ΔE = 0.05916/n Volt." },
    { id: "1v93cpk", front: "Standardelektrodenpotential E°", back: "Potential einer Halbzelle bei Standardbedingungen (a=1, T=25°C, p=1 bar) gegen SHE (E°=0 V). Positives E°: starkes Oxidationsmittel. Negatives E°: starkes Reduktionsmittel." },
    { id: "07v04ha", front: "Galvanisch vs. Elektrolytisch", back: "Galvanisch: spontan, ΔG < 0, E_Zelle > 0. Erzeugt Strom. Elektrolytisch: nicht-spontan, ΔG > 0, externe Spannung nötig. Verbraucht Strom. Elektrolyse: E_ext > E_Zelle." },
    { id: "011smjf", front: "Referenzelektroden", back: "SHE: E° = 0.000 V (Standard). Kalomel (SCE, ges.): +0.241 V vs. SHE. Ag/AgCl (ges.): +0.197 V vs. SHE. Praktischer als SHE! Salzbrücke minimiert Diffusionspotential." },
    { id: "01wmd2i", front: "Zellspannung", back: "E_Zelle = E_Kathode − E_Anode. Kathode: höheres Potential, Reduktion. Anode: niedrigeres Potential, Oxidation. E > 0 → spontan (ΔG = −nFE)." },
    { id: "08tel9p", front: "Faraday-Konstante F", back: "F = 96485 C/mol ≈ 96500 C/mol. Ladung eines Mols Elektronen. ΔG = −nFE. n = Elektronen pro Formelumsatz, E = Zellspannung in Volt." },
  ],
} satisfies Thema;
