export const topic = {
  id: "02-pyridines",
  title: "Pyridines",
  subtitle: "Synthesis & Reactivity",
  icon: "🔵",
  estimatedMinutes: 90,

  theory: `
## Importance of Pyridines in Pharmacy

Pyridine scaffolds are found in numerous FDA-approved drugs (general uses: base, solvent, synthetic building block).

## I. Synthesis of Pyridine Derivatives

### A. Cyclocondensation [3+3] – Hantzsch Dihydropyridine Synthesis
**Reagents:** Enamine + 1,3-dicarbonyl compound (or aldehyde + β-ketoester + NH₃)

**Problem:** With unsymmetrical enamines + unsymmetrical 1,3-dicarbonyls, two regioisomers form (P1 + P2).

**Solution for regioselectivity:**
- Use a pre-synthesised enamine with defined regiochemistry
- Or: direct the reaction via conjugate addition–conjugate elimination

**Important [3+3]-type reactions:**
- **Guareschi-Thorpe reaction:** Cyanoacetyl derivatives + 1,3-dicarbonyl → 2-pyridinone
- **Bohlmann-Rahtz reaction:** Enaminone + β-ketoester → pyridine

### B. Cyclocondensation [5+1]
Reaction of a 1,5-dicarbonyl compound with NH₃ → pyridine (after oxidation)

### C. Cyclocondensation [3+2+1]
**Kröhnke reaction:** 1,5-dicarbonyl compound + NH₃
Mechanism: aldol condensation → Michael addition → cyclisation → aromatisation

### D. Cyclocondensation [2+2+1+1]
Combination of various building blocks for functionalised pyridines

### E. Cycloaddition [4+2] – Diels-Alder type reactions
**Azadiene + dienophile:**
- **Boger reaction:** Triazine as azadiene + enamine (XY = N₂, retro-DA eliminates N₂)
- **Kondrat'eva pyridine synthesis:** Oxazole as azadiene + dienophile → pyridine

**Kondrat'eva mechanism:**
1. [4+2] cycloaddition of oxazole (as 1-oxa-1,3-butadiene) with alkyne
2. Bicyclic transition state
3. Retro-[4+2]: elimination of CO₂
4. Aromatic pyridine as product

### F. Cycloaddition [2+2+2]
**Bönnemann-Reppe synthesis:** Trimerisation of a nitrile with two equivalents of alkyne (cobalt catalysis)

### G. Rearrangements
**Ciamician-Dennstedt rearrangement:** Pyrrole + cyclopropane → pyridine derivative

## II. Reactivity of Pyridines

### Electrophilic Aromatic Substitution (SEAr)
Pyridine is **deactivated** toward SEAr (N withdraws electron density):
- Reaction very slow, requires harsh conditions
- Preferred position: **C-3** (meta-like to N)
- Bromination only possible under drastic conditions

### Nucleophilic Aromatic Substitution (SNAr)
Pyridine is **activated** toward SNAr:
- Preferred positions: **C-2 and C-4** (para/ortho to N)
- Important reactions:
  - **Chichibabin reaction:** Pyridine + NaNH₂ → 2-aminopyridine
  - **Meisenheimer complex** as intermediate

### N-Oxidation
Pyridine + mCPBA → pyridine N-oxide
- N-oxides: activation for SEAr (position 4) and SNAr
- **Boekelheide rearrangement:** N-oxide + Ac₂O, Δ → 2-(acetoxymethyl)pyridine

### Side-chain reactions
2-Methylpyridine: α-methylene strongly acidic (analogous to ketones)
- Lithiation possible → further reaction with electrophiles
`,

  mechanism: {
    type: "builder",
    title: "Kröhnke Reaction – Mechanism",
    description: "Show the electron flow during cyclisation to the pyridine ring",
    stages: [
      {
        id: 0,
        label: "Step 1: Aldol Condensation",
        description: "The activated CH₂ of the pyridinium salt attacks the aldehyde nucleophilically (Knoevenagel-type).",
        atoms: [
          { id: "c1", label: "C", x: 80, y: 130, color: "#2dd4bf", r: 22, sub: "δ−" },
          { id: "c2", label: "C=O", x: 280, y: 130, color: "#f87171", r: 28, sub: "δ+" },
          { id: "c3", label: "C", x: 400, y: 130, color: "#e2e8f0", r: 20 },
        ],
        bonds: [
          { a: "c2", b: "c3", dash: false, color: "#e2e8f0" },
        ],
        correctArrow: { from: "c1", to: "c2" },
        hint1: "The nucleophilic carbon attacks the electrophilic carbonyl carbon.",
        hint2: "Draw arrow from C(δ−) → C=O(δ+).",
      },
    ],
  },

  quiz: [
    {
      id: "q1",
      question: "In the Kondrat'eva pyridine synthesis, which compound acts as the azadiene?",
      options: ["Triazine", "Oxazole", "Pyrimidine", "Imidazole"],
      correct: 1,
      explanation: "In the Kondrat'eva synthesis the oxazole acts as a 1-oxa-1,3-diene (azadiene). It reacts with a dienophile (alkyne) in a [4+2] cycloaddition. The bicyclic intermediate then loses CO₂ (retro-[4+2]) to give the aromatic pyridine.",
    },
    {
      id: "q2",
      question: "Which position in pyridine is preferred for electrophilic aromatic substitution (SEAr)?",
      options: ["C-2 (ortho to N)", "C-3 (meta to N)", "C-4 (para to N)", "SEAr barely occurs"],
      correct: 1,
      explanation: "If SEAr occurs on pyridine at all (it is strongly deactivated), it proceeds preferentially at C-3. This is the position where the cationic transition state is least destabilised by the electron-deficient N.",
    },
    {
      id: "q3",
      question: "What is special about the Boger reaction for pyridine synthesis?",
      options: [
        "A triazine reacts as azadiene with an enamine; N₂ is eliminated retro-[4+2]",
        "Two alkyne molecules and a nitrile trimerise catalytically",
        "A pyrrole rearranges via cyclopropane to a pyridine",
        "A 1,5-dicarbonyl reacts with NH₃",
      ],
      correct: 0,
      explanation: "In the Boger reaction a triazine acts as aza-diene and reacts with an electron-rich dienophile (e.g. enamine) in a [4+2] cycloaddition. The bicyclic intermediate collapses immediately with loss of N₂ (retro-DA, XY = N₂) to give the substituted pyridine.",
    },
    {
      id: "q4",
      question: "What is the Chichibabin reaction?",
      options: [
        "Bromination of pyridine at C-3",
        "Nucleophilic amination of pyridine with NaNH₂ → 2-aminopyridine",
        "Oxidation of pyridine to the N-oxide",
        "Cycloaddition of pyridine with dienophiles",
      ],
      correct: 1,
      explanation: "The Chichibabin reaction is a nucleophilic aromatic substitution: pyridine + NaNH₂ → 2-aminopyridine + NaH. The amide anion attacks C-2 nucleophilically (ortho to N, activated). The Meisenheimer complex is the intermediate.",
    },
    {
      id: "q5",
      question: "The Boekelheide rearrangement of pyridine N-oxide with Ac₂O (Δ) gives…",
      options: [
        "2-(Acetoxymethyl)pyridine",
        "4-Acetoxypyridine",
        "Pyridine-2-carboxylic acid",
        "N-Acetylpyridine",
      ],
      correct: 0,
      explanation: "In the Boekelheide rearrangement a 2-methylpyridine N-oxide reacts with Ac₂O under heat. The acetate migrates from the activated O to the benzylic C of the methyl group → 2-(acetoxymethyl)pyridine. Useful for functionalising the 2-position.",
    },
    {
      id: "q6",
      question: "Why are the 2- and 4-positions of pyridine preferred for SNAr?",
      options: [
        "π electron density is highest there",
        "The nitrogen atom stabilises the negative Meisenheimer complex inductively there",
        "Thermodynamically controlled reactions occur at those positions",
        "The N atom acts as a σ-donor at those positions",
      ],
      correct: 1,
      explanation: "In SNAr at C-2 or C-4 of pyridine the negative charge of the Meisenheimer complex can be directly delocalised onto the electron-deficient N atom → stabilisation → lower activation energy. At C-3 this delocalisation is not possible.",
    },
    {
      id: "q7",
      question: "For the Hantzsch dihydropyridine synthesis ([3+3]): what problem arises with unsymmetrical components?",
      options: [
        "The reaction does not proceed",
        "A mixture of two regioisomers (P1 and P2) forms",
        "The product is not aromatic",
        "NH₃ attacks at the wrong position",
      ],
      correct: 1,
      explanation: "When enamine and 1,3-dicarbonyl compound are unsymmetrical, two structural isomers (P1 and P2) can form since cyclisation is possible in both directions. Solution: pre-synthesise a defined enamine for regioselectivity.",
    },
  ],

  flashcards: [
    {
      front: "Kondrat'eva Pyridine Synthesis",
      back: "[4+2] cycloaddition: oxazole (as azadiene) + dienophile (alkyne) → bicyclic intermediate → −CO₂ (retro-[4+2]) → pyridine. Oxazole serves as 1-oxa-1,3-diene.",
    },
    {
      front: "Boger Reaction",
      back: "Triazine (azadiene) + enamine (dienophile) → [4+2] cycloaddition → intermediate loses N₂ (retro-DA) → substituted pyridine. Key feature: XY = N₂ is eliminated.",
    },
    {
      front: "Kröhnke Reaction",
      back: "[3+2+1] cyclocondensation: 1,5-dicarbonyl compound + NH₃ → pyridine. Mechanism: aldol → Michael → cyclisation → aromatisation.",
    },
    {
      front: "Chichibabin Reaction",
      back: "Pyridine + NaNH₂ → 2-aminopyridine + NaH. SNAr at C-2 (activated by N). Meisenheimer complex as intermediate. Classic method for amination.",
    },
    {
      front: "Guareschi-Thorpe Reaction",
      back: "[3+3] cyclocondensation: cyanoacetamide/cyanoacetyl derivative + 1,3-dicarbonyl (+ NH₃) → 2-pyridinone with CN group. Formation of cyanopyridones.",
    },
    {
      front: "Bönnemann-Reppe Synthesis",
      back: "[2+2+2] cycloaddition: 1 nitrile + 2 alkynes, cobalt catalysis → pyridine. Trimerisation under metal-catalysed conditions.",
    },
    {
      front: "Boekelheide Rearrangement",
      back: "2-Methylpyridine N-oxide + Ac₂O, Δ → 2-(acetoxymethyl)pyridine. [1,2]-O→C acyl migration. Useful for introducing functionality at the 2-methyl group.",
    },
    {
      front: "SEAr vs. SNAr at Pyridine",
      back: "SEAr: very slow, deactivated, preferred C-3. SNAr: activated at C-2 and C-4 (Meisenheimer complex delocalised onto N). Pyridine prefers SNAr!",
    },
  ],
};
