export const topic = {
  id: "03-five-ring-one-heteroatom",
  title: "5-Ring-Heteroaromaten (1 Heteroatom)",
  subtitle: "Pyrrol, Furan & Thiophen",
  icon: "🟡",
  estimatedMinutes: 75,
  theory: `
## Überblick: Pyrrol, Furan, Thiophen

Alle drei sind 5-gliedrige aromatische Heterocyclen mit 6 π-Elektronen.

| Eigenschaft | Pyrrol | Furan | Thiophen |
|---|---|---|---|
| Heteroatom | N | O | S |
| Reaktivität SEAr | sehr hoch | hoch | hoch |
| Bevorzugte Position | C-2 (α) | C-2 (α) | C-2 (α) |

## Elektronische Eigenschaften

Das Heteroatom-Lone-Pair ist ins π-System eingebunden → System ist elektronenreich → aktiviert für SEAr.

## Reaktivität: SEAr – immer C-2 (α) bevorzugt!

**Begründung:** Angriff an C-2 gibt 3 Resonanzstrukturen (inkl. Heteroatom⁺), Angriff an C-3 nur 2.

**Ausnahme Indol:** C-3 bevorzugt (Benzol-Aromatizität bleibt erhalten).

## Paal-Knorr-Synthese

- 1,4-Dicarbonyl + RNH₂ → **Pyrrol**
- 1,4-Dicarbonyl + H⁺ → **Furan**
- 1,4-Dicarbonyl + P₄S₁₀ → **Thiophen**

Mechanismus: Doppelkondensation → Cyclisierung → Dehydratisierung → Aromat
`,
  mechanism: {
    type: "builder",
    title: "Paal-Knorr-Synthese – Pyrrol aus 1,4-Dicarbonyl",
    description: "Zeichne die Elektronenfluss-Pfeile der Paal-Knorr-Synthese Schritt für Schritt.",
    stages: [
      {
        id: 0,
        label: "1. Kondensation",
        description: "Das primäre Amin (NH₂) greift nucleophil das erste Carbonyl-C an (Hemiaminal-Bildung). Ziehe von N → C=O.",
        hint1: "Der nucleophile N des Amins greift das elektrophile Carbonyl-C (δ+) an.",
        hint2: "Ziehe von N(H₂) → C(=O). Es entsteht ein Hemiaminal als Zwischenstufe.",
        atoms: [
          { id: "n",  label: "NH₂", x: 80,  y: 130, color: "#2dd4bf", r: 24 },
          { id: "c1", label: "C=O", x: 240, y: 130, color: "#f87171", r: 26, sub: "δ+" },
          { id: "c2", label: "C",   x: 350, y: 130, color: "#e2e8f0", r: 20 },
          { id: "c3", label: "C=O", x: 420, y: 130, color: "#f87171", r: 26 },
          { id: "h1", label: "H",   x: 240, y: 60,  color: "#64748b", r: 14 },
          { id: "h2", label: "H",   x: 350, y: 60,  color: "#64748b", r: 14 },
        ],
        bonds: [
          { a: "c1", b: "c2", dash: false, color: "#e2e8f0" },
          { a: "c2", b: "c3", dash: false, color: "#e2e8f0" },
          { a: "c1", b: "h1", dash: false, color: "#64748b" },
          { a: "c2", b: "h2", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "n", to: "c1" },
      },
      {
        id: 1,
        label: "2. Dehydratisierung",
        description: "Das Hemiaminal verliert Wasser. Ziehe vom O-H des Hemiaminals zum Proton-Akzeptor (H₂O als Base).",
        hint1: "Das OH des Hemiaminals wird protoniert und verlässt als Wasser → Iminiumion.",
        hint2: "Ziehe von O(H) → H⁺ Akzeptor. Das O verlässt als H₂O, es entsteht C=N (Imin).",
        atoms: [
          { id: "oh", label: "OH", x: 240, y: 60,  color: "#f87171", r: 20 },
          { id: "c1", label: "C",  x: 240, y: 130, color: "#e2e8f0", r: 22 },
          { id: "n",  label: "N",  x: 120, y: 130, color: "#2dd4bf", r: 22 },
          { id: "w",  label: "H₂O",x: 390, y: 60,  color: "#64748b", r: 22 },
          { id: "c2", label: "C",  x: 360, y: 130, color: "#e2e8f0", r: 20 },
        ],
        bonds: [
          { a: "c1", b: "oh", dash: false, color: "#f87171" },
          { a: "c1", b: "n",  dash: false, color: "#2dd4bf" },
          { a: "c1", b: "c2", dash: false, color: "#e2e8f0" },
        ],
        correctArrow: { from: "oh", to: "w" },
      },
      {
        id: 2,
        label: "3. Cyclisierung",
        description: "Das zweite N-Lone-Pair greift das zweite Carbonyl-C an → Ringschluss. Ziehe von N → C=O.",
        hint1: "Der N des Imins hat noch ein freies Elektronenpaar das intramolekular das zweite Carbonyl angreifen kann.",
        hint2: "Ziehe von N → C(=O) rechts. Ringschluss bildet den 5-Ring.",
        atoms: [
          { id: "n",  label: "N",   x: 130, y: 180, color: "#2dd4bf", r: 22 },
          { id: "c1", label: "C",   x: 200, y: 120, color: "#e2e8f0", r: 20 },
          { id: "c2", label: "C",   x: 300, y: 120, color: "#e2e8f0", r: 20 },
          { id: "c3", label: "C=O", x: 370, y: 180, color: "#f87171", r: 24, sub: "δ+" },
          { id: "h1", label: "H",   x: 200, y: 60,  color: "#64748b", r: 14 },
          { id: "h2", label: "H",   x: 300, y: 60,  color: "#64748b", r: 14 },
        ],
        bonds: [
          { a: "n",  b: "c1", dash: false, color: "#e2e8f0" },
          { a: "c1", b: "c2", dash: false, color: "#e2e8f0" },
          { a: "c2", b: "c3", dash: false, color: "#e2e8f0" },
          { a: "c1", b: "h1", dash: false, color: "#64748b" },
          { a: "c2", b: "h2", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "n", to: "c3" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Warum reagiert Indol bei der SEAr bevorzugt an C-3?", options: ["C-2 ist sterisch gehindert", "Angriff an C-3 liefert Arenium-Ion das auf Benzolring und N delokalisierbar ist – Benzol-Aromatizität bleibt erhalten", "C-3 hat höhere π-Elektronendichte", "N stabilisiert C-3 induktiv"], correct: 1, explanation: "Bei C-3-Angriff bleibt Benzol-Aromatizität erhalten, Ladung auf N delokalisiert. Bei C-2-Angriff müsste Ladung auf Benzolring → ungünstiger." },
    { id: "q2", question: "Welche Verbindung entsteht bei Paal-Knorr aus 1,4-Dicarbonyl + primärem Amin?", options: ["Furan", "Pyrrol", "Thiophen", "Pyridin"], correct: 1, explanation: "Paal-Knorr: 1,4-Dicarbonyl + RNH₂ → N-substituiertes Pyrrol. Mit H₂O/H⁺ → Furan, mit H₂S → Thiophen." },
    { id: "q3", question: "Pyrrol-N-H ist acide (pKa 17.5) weil…", options: ["N-H ist generell acide", "Das Pyrrolid-Anion aromatisch ist (6 π-e⁻)", "Pyrrol kein Lone-Pair hat", "Die Acidität durch Induktion erhöht wird"], correct: 1, explanation: "Das Pyrrolid-Anion hat 6 π-e⁻ und ist aromatisch → stabil → Deprotonierung begünstigt." },
    { id: "q4", question: "Furan + Br⁺: Welche Position wird bevorzugt bromiert?", options: ["C-2", "C-3", "C-4", "O-Atom"], correct: 0, explanation: "C-2 (α): 3 Resonanzstrukturen für Arenium-Ion (inkl. O⁺). C-3: nur 2 → C-2 bevorzugt." },
    { id: "q5", question: "Welcher Heteroaromat ist am reaktivsten für SEAr?", options: ["Benzol", "Thiophen", "Pyrrol", "Furan"], correct: 2, explanation: "Pyrrol: N am wenigsten elektronegativ → LP am stärksten in Ring → höchstes HOMO → reaktivster." },
    { id: "q6", question: "α-Selektivität bei 5-Ring-Heteroaromaten erklärt sich durch…", options: ["Sterik bevorzugt C-2", "Mehr Resonanzstrukturen bei α-Angriff als bei β-Angriff", "O/N/S stabilisiert C-2 induktiv", "C-2 hat niedrigeren LUMO-Beitrag"], correct: 1, explanation: "α-Angriff (C-2): 3 Resonanzstrukturen. β-Angriff (C-3): 2 Resonanzstrukturen → α bevorzugt." },
  ],
  flashcards: [
    { front: "Paal-Knorr-Synthese", back: "1,4-Dicarbonyl + NH₃/RNH₂ → Pyrrol. + H⁺ → Furan. + H₂S/P₄S₁₀ → Thiophen. Mechanismus: Doppelkondensation + Cyclisierung + Dehydratisierung." },
    { front: "α-Selektivität bei 5-Ring-Heteroaromaten", back: "C-2 (α) bevorzugt für SEAr. Mehr Resonanzstrukturen bei α-Angriff (inkl. Heteroatom⁺). Ausnahme: Indol → C-3." },
    { front: "Indol – SEAr-Regioselektivität", back: "C-3 bevorzugt. Bei C-3-Angriff bleibt Benzol-Aromatizität erhalten. Ladung auf N delokalisiert ohne Benzol-Ring zu stören." },
    { front: "Pyrrol: Acidität vs. Basizität", back: "Nicht basisch (LP im π). N-H acide! pKa = 17.5. Pyrrolid-Anion aromatisch → stabil. Deprotonierung mit NaH, BuLi." },
    { front: "Furan vs. Pyrrol vs. Thiophen – Reaktivitätsreihe", back: "Pyrrol > Furan > Thiophen > Benzol für SEAr. N am wenigsten elektronegativ → gibt LP am stärksten ab → höchstes HOMO." },
    { front: "Knorr-Pyrrol-Synthese", back: "α-Aminoketon + β-Ketoester → Pyrrol. Klassisch für 2,3,4,5-substituierte Pyrrole (z.B. Porphyrin-Vorstufen)." },
  ],
};
