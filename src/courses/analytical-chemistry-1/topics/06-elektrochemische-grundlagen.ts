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
      solve: (inputs: Record<string, any>) => {
        const sf = inputs.solveFor
        if (sf === 'E') return { E: inputs.E0 - (0.05916 / inputs.n) * Math.log10(inputs.ratio) }
        if (sf === 'E0') return { E0: inputs.E + (0.05916 / inputs.n) * Math.log10(inputs.ratio) }
        if (sf === 'ratio') return { ratio: Math.pow(10, (inputs.E0 - inputs.E) * inputs.n / 0.05916) }
        return {}
      },
      hints: [
        "E = E° − (0.05916/n) · log([Red]/[Ox]). Bei 25°C ist RT/F = 0.02569 V, und 2.303·RT/F = 0.05916 V. Typisch: n = 1 oder 2.",
        "log([Red]/[Ox]): Bei hoher [Red] → positive log → E sinkt. Bei hoher [Ox] → negative log → E steigt. Oxidierte Form bevorzugt höhere Potentiale."
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Was misst die Nernst-Gleichung?", options: ["Den Strom in einer Elektrolysezelle", "Das Elektrodenpotential in Abhängigkeit von der Konzentration der Redoxspezies", "Die Leitfähigkeit einer Lösung", "Die Zellspannung bei Standardbedingungen"], correct: 1, explanation: "Die Nernst-Gleichung beschreibt das Elektrodenpotential E einer Halbzelle in Abhängigkeit von E° und dem Konzentrationsverhältnis der oxidierten und reduzierten Form: E = E° − (RT/nF)·ln([Red]/[Ox])." },
    { id: "q2", question: "Was ist der Vorfaktor bei 25°C in der Nernst-Gleichung (mit log₁₀)?", options: ["0.02569 V", "0.05916 V", "96485 V", "8.314 V"], correct: 1, explanation: "Bei 25°C: 2.303·RT/F = 2.303 × 8.314 × 298 / 96485 = 0.05916 V. Pro Dekade Konzentrationsänderung verschiebt sich E um 0.05916/n Volt." },
    { id: "q3", question: "Welches Potential hat die Standardwasserstoffelektrode (SHE)?", options: ["+0.241 V", "+0.197 V", "0.000 V (per Definition)", "−0.763 V"], correct: 2, explanation: "E°(SHE) = 0.000 V per Definition (internationaler Standard). Alle anderen Standardpotentiale sind relativ zur SHE angegeben. Die SHE ist: Platinelektrode in H⁺-Lösung (a=1) bei H₂-Druck von 1 bar." },
    { id: "q4", question: "Was treibt eine Konzentrationszelle an?", options: ["Verschiedene Elektrodenmaterialien", "Der Konzentrationsunterschied zwischen zwei Halbzellen gleichen Materials", "Eine externe Spannungsquelle", "Unterschiedliche Temperaturen"], correct: 1, explanation: "Konzentrationszelle: beide Elektroden gleich (z.B. Cu/Cu²⁺), aber verschiedene Konzentrationen. E = (0.05916/n) · log(c_hoch/c_niedrig). Triebkraft: chemisches Potential / Aktivitätsunterschied." },
    { id: "q5", question: "Warum wird eine Salzbrücke in galvanischen Zellen verwendet?", options: ["Um Elektronen zu leiten", "Um das Diffusionspotential an der Flüssig-Flüssig-Grenzfläche zu minimieren und den Ionenfluss zu ermöglichen", "Um die Reaktion zu katalysieren", "Um die Temperatur konstant zu halten"], correct: 1, explanation: "Salzbrücke (meist KCl in Agar): K⁺ und Cl⁻ haben ähnliche Wanderungsgeschwindigkeiten → minimiert Diffusionspotential. Schließt den Stromkreis ionisch, ohne die Halbzellen zu vermischen." },
    { id: "q6", question: "Eine Elektrode mit E° = +0.34 V (Cu²⁺/Cu) wird mit einer Elektrode E° = −0.76 V (Zn²⁺/Zn) kombiniert. Was ist E_Zelle°?", options: ["−0.42 V", "+0.42 V", "+1.10 V", "−1.10 V"], correct: 2, explanation: "E_Zelle = E_Kathode − E_Anode. Cu hat höheres E° → Kathode. Zn → Anode. E_Zelle = 0.34 − (−0.76) = +1.10 V. Positives E_Zelle → spontane Reaktion (ΔG = −nFE < 0). Das ist das Daniell-Element!" },
  ],
  flashcards: [
    { front: "Nernst-Gleichung", back: "E = E° − (RT/nF)·ln([Red]/[Ox]). Bei 25°C: E = E° − (0.05916/n)·log([Red]/[Ox]). Pro Dekade Konzentrationsänderung: ΔE = 0.05916/n Volt." },
    { front: "Standardelektrodenpotential E°", back: "Potential einer Halbzelle bei Standardbedingungen (a=1, T=25°C, p=1 bar) gegen SHE (E°=0 V). Positives E°: starkes Oxidationsmittel. Negatives E°: starkes Reduktionsmittel." },
    { front: "Galvanisch vs. Elektrolytisch", back: "Galvanisch: spontan, ΔG < 0, E_Zelle > 0. Erzeugt Strom. Elektrolytisch: nicht-spontan, ΔG > 0, externe Spannung nötig. Verbraucht Strom. Elektrolyse: E_ext > E_Zelle." },
    { front: "Referenzelektroden", back: "SHE: E° = 0.000 V (Standard). Kalomel (SCE, ges.): +0.241 V vs. SHE. Ag/AgCl (ges.): +0.197 V vs. SHE. Praktischer als SHE! Salzbrücke minimiert Diffusionspotential." },
    { front: "Zellspannung", back: "E_Zelle = E_Kathode − E_Anode. Kathode: höheres Potential, Reduktion. Anode: niedrigeres Potential, Oxidation. E > 0 → spontan (ΔG = −nFE)." },
    { front: "Faraday-Konstante F", back: "F = 96485 C/mol ≈ 96500 C/mol. Ladung eines Mols Elektronen. ΔG = −nFE. n = Elektronen pro Formelumsatz, E = Zellspannung in Volt." },
  ],
};
