#!/bin/bash
# Translate Heterocyclic Chemistry course to English
set -e
cd /srv/chemlearn

echo "=== Translating organic-chemistry topics to English ==="
mkdir -p src/courses/organic-chemistry/topics

# ══════════════════════════════════════════════
# course index
# ══════════════════════════════════════════════
cat > src/courses/organic-chemistry/index.ts << 'EOF'
export const course = {
  id: "organic-chemistry",
  title: "Heterocyclic Chemistry & Drug Synthesis",
  subtitle: "Synthesis, Reactivity & Medicinal Chemistry",
  icon: "🧬",
  color: "#8b5cf6",
  level: "Uni",
  description: "Aromatic heterocycles, cycloadditions, cyclocondensations, SEAr regioselectivity, reaction mechanisms, bioisosteres and skeletal editing.",
  topics: [
    "01-introduction",
    "02-pyridines",
    "03-five-ring-one-heteroatom",
    "04-five-ring-two-heteroatoms",
    "05-cycloadditions",
    "06-cyclocondensations",
    "07-sear-regioselectivity",
    "08-mechanisms",
    "09-bioisosteres-skeletal-editing",
  ],
  totalTopics: 9,
  estimatedHours: 25,
};
EOF

# ══════════════════════════════════════════════
# Topic 01 – Introduction
# ══════════════════════════════════════════════
cat > src/courses/organic-chemistry/topics/01-introduction.ts << 'EOF'
export const topic = {
  id: "01-introduction",
  title: "General Introduction",
  subtitle: "Nomenclature, Aromaticity & Acid-Base Properties",
  icon: "📖",
  estimatedMinutes: 60,

  theory: `
## What is a Heterocyclic Compound?

A **heterocycle** is a ring molecule that contains at least one atom other than carbon – typically N, O or S – alongside carbon.

This course covers exclusively **aromatic heterocycles**. Non-aromatic heterocycles (e.g. THF, piperidine) are not part of this lecture.

## Importance in Medicine & Nature

Heterocycles are ubiquitous:
- **L-Tryptophan** – essential amino acid with an indole scaffold
- **L-Histidine** – essential amino acid with an imidazole side chain
- **Thiamine (Vitamin B1)** – key coenzyme (pyrimidine + thiazole)
- **Caffeine** – purine alkaloid
- **Apixaban** – pyrazole-containing drug (anticoagulant)
- **Atorvastatin** – cholesterol-lowering agent (pyrrole scaffold), ~$12 bn/year revenue (2011)
- **Methylene blue** – dye and therapeutic agent
- **HATU** – modern coupling reagent in peptide synthesis

## Hückel Rule & Aromaticity

A heterocycle is aromatic if it:
1. Is **planar**
2. Has **4n+2 π electrons** (n = 0, 1, 2, …)
3. Has a **fully conjugated system**
4. The heteroatom contributes to the π system

**Key distinction:**
- Pyridine-type N (sp²): lone pair perpendicular to ring plane → NOT part of π system → available for basicity
- Pyrrole-type N (sp²): lone pair in the ring plane → part of π system → NOT basic

## Nomenclature – Basic Rules

### Prefixes for heteroatoms:
| Heteroatom | Prefix (saturated) | Prefix (unsaturated) |
|---|---|---|
| O | oxa | ox |
| S | thia | thi |
| N | aza | az |

### Hantzsch-Widman System (3–10-membered rings):
- **3-membered:** -irine (unsat.), -iridine (sat.)
- **5-membered:** -ole (unsat.), -olidine (sat.)
- **6-membered:** -ine (N-containing), -an (O/S-containing)

### Important trivial names (learn by heart!):
| Compound | Trivial name |
|---|---|
| 1-Oxa-2,4-cyclopentadiene | Furan |
| 1-Thia-2,4-cyclopentadiene | Thiophene |
| 1-Aza-2,4-cyclopentadiene | Pyrrole |
| 1,3-Diazacyclopenta-2,4-diene | Imidazole |
| 1,3-Oxazacyclopenta-2,4-diene | Oxazole |
| 1-Azabenzene | Pyridine |
| 1,3-Diazabenzene | Pyrimidine |

## Acid-Base Properties of N-Containing Heterocycles

**General rule:** The more strongly the lone pair is involved in aromaticity, the **less basic** the nitrogen atom.

| Compound | pKa (conjugate acid) | Explanation |
|---|---|---|
| Piperidine (sp³-N) | ~11 | LP not in ring, maximally available |
| Pyridine (sp²-N) | 5.2 | LP in σ system, free |
| Pyrrole (sp²-N) | ~0 (very low) | LP in π system, not available |
| Imidazole | 7.0 | one basic N + one pyrrole-N |

**Structural effects on basicity:**
- Inductive effects (EWG → less basic)
- Steric hindrance (e.g. 2,6-di-tBu-pyridine: pKa = 3.7)
- Additional N atoms (pyrimidine < pyridine, inductive EWG effect)

## FMO Theory & Reactivity

**Koopmans' Theorem:** Ionisation energy ≈ orbital energy of the removed electron

For electrophilic aromatic substitution (SEAr):
- HOMO energy is decisive
- Pyrrole, furan, thiophene: higher HOMO → more reactive than benzene
- Pyridine: lower HOMO → less reactive than benzene (deactivated by N)
`,

  mechanism: {
    type: "builder",
    title: "Pyridine vs. Pyrrole – Basicity explained",
    description: "Lone pair orientation determines basicity",
    stages: [
      {
        id: 0,
        label: "Step 1: Pyridine-N – lone pair available",
        description: "The sp²-N lone pair of pyridine lies in a σ orbital perpendicular to the ring plane. It is NOT part of the π system → available for protonation.",
        atoms: [
          { id: "n", label: "N", x: 240, y: 80, color: "#60a5fa", r: 26 },
          { id: "c2", label: "C", x: 340, y: 130, color: "#e2e8f0", r: 22 },
          { id: "c3", label: "C", x: 340, y: 220, color: "#e2e8f0", r: 22 },
          { id: "c4", label: "C", x: 240, y: 270, color: "#e2e8f0", r: 22 },
          { id: "c5", label: "C", x: 140, y: 220, color: "#e2e8f0", r: 22 },
          { id: "c6", label: "C", x: 140, y: 130, color: "#e2e8f0", r: 22 },
          { id: "lp", label: ":N", x: 240, y: 30, color: "#60a5fa", r: 18 },
        ],
        bonds: [
          { a: "n", b: "c2", dash: false, color: "#60a5fa" },
          { a: "n", b: "c6", dash: false, color: "#60a5fa" },
          { a: "c2", b: "c3", dash: false, color: "#e2e8f0" },
          { a: "c3", b: "c4", dash: false, color: "#e2e8f0" },
          { a: "c4", b: "c5", dash: false, color: "#e2e8f0" },
          { a: "c5", b: "c6", dash: false, color: "#e2e8f0" },
        ],
        correctArrow: { from: "lp", to: "n" },
        hint1: "The lone pair (shown as :N) lies in a σ orbital – outside the π system.",
        hint2: "Draw arrow from the lone pair toward a proton donor.",
      },
    ],
  },

  quiz: [
    {
      id: "q1",
      question: "Which statement about the aromaticity of pyrrole is correct?",
      options: [
        "The lone pair of N is not part of the π system",
        "Pyrrole has 6 π electrons and is therefore aromatic (Hückel: n=1)",
        "Pyrrole is not aromatic because it contains a heteroatom",
        "Pyrrole follows the 4n rule and is antiaromatic",
      ],
      correct: 1,
      explanation: "Pyrrole has 6 π electrons (4 from the two double bonds + 2 from the N lone pair). The sp²-N lone pair lies in the ring plane and is part of the π system → pyrrole is aromatic (Hückel, n=1).",
    },
    {
      id: "q2",
      question: "Why is pyridine (pKa 5.2) significantly more basic than pyrrole (pKa ~0)?",
      options: [
        "Because pyridine has more carbon atoms",
        "Because the N lone pair in pyrrole is delocalised into the π system and not available for protonation",
        "Because pyridine is a 6-membered ring and pyrrole is 5-membered",
        "Because pyridine contains sp³-hybridised N",
      ],
      correct: 1,
      explanation: "In pyrrole the lone pair of N is part of the aromatic π system (6 π e⁻). Protonation would destroy aromaticity → very unfavourable → not basic. In pyridine the LP lies in a σ orbital and is freely available.",
    },
    {
      id: "q3",
      question: "Which of the following heterocycles is least basic?",
      options: ["Piperidine", "Pyridine", "Imidazole", "Pyrrole"],
      correct: 3,
      explanation: "Pyrrole has its N lone pair fully incorporated into the π system (required for aromaticity). Piperidine (sp³-N, pKa~11) > Imidazole (pKa 7.0) > Pyridine (pKa 5.2) > Pyrrole (pKa ~0).",
    },
    {
      id: "q4",
      question: "What is the Hantzsch-Widman system?",
      options: [
        "A nomenclature system for acyclic heterocompounds",
        "A systematic nomenclature system for 3- to 10-membered heterocycles",
        "A method for the synthesis of pyridines",
        "A system for determining aromaticity",
      ],
      correct: 1,
      explanation: "The Hantzsch-Widman system is an IUPAC nomenclature system specifically for small to medium-sized heterocycles (3–10-membered). It combines prefixes for heteroatoms (oxa-, thia-, aza-) with suffixes for ring size and degree of unsaturation (e.g. -ole, -ine).",
    },
    {
      id: "q5",
      question: "What trivial name does 1-azabenzene carry?",
      options: ["Imidazole", "Pyrimidine", "Pyridine", "Pyrrole"],
      correct: 2,
      explanation: "1-Azabenzene = pyridine. The systematic name describes the benzene ring with one CH replaced by N. Pyrimidine would be 1,3-diazabenzene.",
    },
    {
      id: "q6",
      question: "A heterocycle is aromatic when… (choose the best answer)",
      options: [
        "It is planar, has 4n+2 π electrons, and has a fully conjugated system",
        "It contains at least one N atom",
        "It has exactly 6 atoms in the ring",
        "It contains no heteroatom with a lone pair",
      ],
      correct: 0,
      explanation: "Aromaticity in heterocycles requires: planarity + 4n+2 π electrons (Hückel) + continuous conjugation. The heteroatom must contribute either a double bond or its lone pair to the π system.",
    },
  ],

  flashcards: [
    {
      front: "Hückel Rule",
      back: "A molecule is aromatic if it is planar and has 4n+2 π electrons (n = 0,1,2,...). Examples: benzene (6e), pyrrole (6e), furan (6e), pyridine (6e).",
    },
    {
      front: "Pyrrole-N vs. Pyridine-N",
      back: "Pyrrole-N: sp², LP in π system → NOT basic (pKa~0). Pyridine-N: sp², LP in σ system (perpendicular to plane) → BASIC (pKa 5.2).",
    },
    {
      front: "Hantzsch-Widman Nomenclature",
      back: "System for 3–10-membered heterocycles. Prefix: oxa (O), thia (S), aza (N). Suffix: -irine (3-membered unsat.), -ole (5-membered unsat.), -ine (6-membered N).",
    },
    {
      front: "Furan",
      back: "Systematic: 1-oxacyclopenta-2,4-diene. 5-membered ring, O heteroatom, 6 π electrons (4 from C=C + 2 from O lone pair). Aromatic but less stable than benzene.",
    },
    {
      front: "Imidazole – special properties",
      back: "Contains TWO N atoms: one pyrrole-N (LP in π system, not basic) and one pyridine-N (LP free, basic). pKa = 7.0. Tautomerism possible (NH migrates).",
    },
    {
      front: "FMO Theory & Reactivity",
      back: "For SEAr the HOMO is decisive. Electron-rich heteroaromatics (pyrrole, furan, thiophene) have higher HOMO → more reactive than benzene. Pyridine: lower HOMO → less reactive.",
    },
    {
      front: "Koopmans' Theorem",
      back: "Ionisation energy ≈ negative orbital energy of the removed electron (Iᵢ ≈ −εᵢ). Allows estimation of reactivity of heteroaromatics toward electrophiles.",
    },
    {
      front: "Basicity series N-heterocycles",
      back: "Piperidine (sp³, pKa~11) > Imidazole (pKa 7.0) > Pyridine (pKa 5.2) > 2,6-di-tBu-pyridine (pKa 3.7, steric) > Pyrimidine (pKa 2.3, inductive EWG) > Pyrrole (pKa~0)",
    },
  ],
};
EOF

echo "Topic 01 done"

# ══════════════════════════════════════════════
# Topic 02 – Pyridines
# ══════════════════════════════════════════════
cat > src/courses/organic-chemistry/topics/02-pyridines.ts << 'EOF'
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
EOF

echo "Topic 02 done"

# ══════════════════════════════════════════════
# Topic 03 – Five-membered rings, one heteroatom
# ══════════════════════════════════════════════
cat > src/courses/organic-chemistry/topics/03-five-ring-one-heteroatom.ts << 'EOF'
export const topic = {
  id: "03-five-ring-one-heteroatom",
  title: "5-Membered Heteroaromatics (1 Heteroatom)",
  subtitle: "Pyrrole, Furan & Thiophene",
  icon: "🟡",
  estimatedMinutes: 75,

  theory: `
## Overview: Pyrrole, Furan, Thiophene

All three are 5-membered aromatic heterocycles with **6 π electrons**:
- 4 electrons from 2 C=C double bonds
- 2 electrons from the heteroatom lone pair

| Property | Pyrrole | Furan | Thiophene |
|---|---|---|---|
| Heteroatom | N | O | S |
| pKa (N-H acidity) | 17.5 (N-H acidic!) | – | – |
| Aromaticity | high | medium | high |
| SEAr reactivity | very high | high | high |
| Preferred position | C-2 (α) | C-2 (α) | C-2 (α) |

## Electronic Properties

The heteroatom lone pair is incorporated into the π system in all three compounds:
- → System is **electron-rich** → activated for SEAr
- → **Not basic** (lone pair not available for protonation – would destroy aromaticity)
- **Pyrrole**: N-H is acidic! (pKa 17.5) → deprotonatable with strong bases → pyrrolide anion aromatic and stable

## Reactivity: SEAr

All three react more readily than benzene with electrophiles.

**Regioselectivity: always position C-2 (α) preferred!**

**Rationale via resonance structures:**
- Attack at C-2: 3 resonance structures for arenium ion, including one where the **heteroatom is positively charged**
- Attack at C-3: only 2 resonance structures → less stabilised

**Exception:** When C-2 is blocked → reaction at C-3

**Concrete examples:**
- Indole + Br⁺ → bromination at C-3 of the pyrrole ring → 3-bromoindole
- Furan + Br⁺ → 2-bromofuran
- Thiophene + Br⁺ → 2-bromothiophene

## Synthesis of Pyrrole Derivatives

### Paal-Knorr Synthesis:
1,4-Dicarbonyl compound + NH₃ (or primary amine) → pyrrole
Mechanism: double condensation (2× imine formation) + cyclisation + dehydration

### Knorr Pyrrole Synthesis:
α-Aminoketone + β-ketoester → pyrrole (classical)

## Synthesis of Furan Derivatives

### Paal-Knorr Synthesis (O variant):
1,4-Dicarbonyl compound + H⁺ (Lewis acid) → furan
Mechanism: double condensation (hemi-acetal) + cyclisation + dehydration

## Synthesis of Thiophene Derivatives

### Paal-Knorr (S variant):
1,4-Dicarbonyl compound + P₄S₁₀ or H₂S/H⁺ → thiophene

## Special Features

### Indole (benzo[b]pyrrole):
- Bicyclic aromatic: benzene + pyrrole fused
- C-3 is the most reactive position for SEAr (not C-2!)
  → Rationale: attack at C-3 gives arenium ion delocalised onto benzene ring and N; aromaticity of benzene ring is preserved

### Benzofuran, Benzothiophene:
- Analogous to indole, but with O or S
- SEAr preferred at C-2 of the 5-membered ring part
`,

  quiz: [
    {
      id: "q1",
      question: "Why does indole react preferentially at C-3 rather than C-2 in electrophilic aromatic substitution?",
      options: [
        "C-2 is sterically hindered",
        "Attack at C-3 gives an arenium ion that can be delocalised onto the benzene ring and N – aromaticity of the benzene ring is preserved",
        "C-3 has higher π electron density in the ground state",
        "N stabilises the transition state at C-3 by inversion",
      ],
      correct: 1,
      explanation: "Attack at C-3: the arenium ion can be delocalised onto N WITHOUT disturbing the aromaticity of the benzene ring. Attack at C-2 would require the charge to be transferred to the benzene ring → loss of benzene aromaticity → energetically unfavourable.",
    },
    {
      id: "q2",
      question: "Which compound is formed in the Paal-Knorr synthesis from a 1,4-dicarbonyl with a primary amine?",
      options: ["Furan", "Pyrrole", "Thiophene", "Pyridine"],
      correct: 1,
      explanation: "The Paal-Knorr synthesis gives N-substituted pyrroles from 1,4-dicarbonyl compounds + primary amine (R-NH₂). With NH₃ → NH-pyrrole, with H₂O/H⁺ → furan, with H₂S/H⁺ or P₄S₁₀ → thiophene.",
    },
    {
      id: "q3",
      question: "What property fundamentally distinguishes pyrrole from pyridine regarding the N-H bond?",
      options: [
        "Pyrrole has no N-H",
        "Pyrrole N-H is acidic (pKa 17.5) and can be deprotonated, since the pyrrolide anion is aromatic",
        "Pyrrole N-H is strongly basic",
        "Pyrrole N-H cannot be deprotonated",
      ],
      correct: 1,
      explanation: "Pyrrole N-H is acidic (pKa ~17.5) because the resulting pyrrolide anion is aromatic (6 π e⁻). Deprotonation with strong bases (NaH, BuLi) is possible → N-metalation → further reaction with electrophiles.",
    },
    {
      id: "q4",
      question: "Furan + Br⁺: at which position does bromination preferentially occur?",
      options: ["C-2", "C-3", "C-4", "O atom"],
      correct: 0,
      explanation: "Furan is brominated preferentially at C-2 (α position). Attack at C-2 gives 3 resonance structures for the arenium ion (including one with O⁺); attack at C-3 gives only 2 → C-2 energetically favoured.",
    },
    {
      id: "q5",
      question: "Which heteroaromatic is most strongly activated for SEAr (most reactive)?",
      options: ["Benzene", "Thiophene", "Pyrrole", "Furan"],
      correct: 2,
      explanation: "Pyrrole is most reactive for SEAr. The N atom is less electronegative than O or S, so the lone pair in pyrrole-N is more strongly donated into the ring → highest π electron density → highest HOMO.",
    },
    {
      id: "q6",
      question: "Which mechanism explains the α selectivity (C-2) in SEAr of furan?",
      options: [
        "C-2 is more sterically accessible",
        "Attack at C-2 gives more resonance structures for the arenium ion than attack at C-3",
        "The O atom stabilises C-2 inductively",
        "C-2 has a lower LUMO contribution",
      ],
      correct: 1,
      explanation: "Attack at C-2: 3 resonance structures (incl. one with O⁺). Attack at C-3: only 2 resonance structures. More resonance = more stable arenium ion = lower activation energy → C-2 preferred (kinetic control).",
    },
  ],

  flashcards: [
    {
      front: "Paal-Knorr Synthesis",
      back: "1,4-Dicarbonyl + NH₃/RNH₂ → pyrrole. 1,4-Dicarbonyl + H⁺ → furan. 1,4-Dicarbonyl + H₂S/P₄S₁₀ → thiophene. Mechanism: double condensation + cyclisation + dehydration.",
    },
    {
      front: "α Selectivity in 5-Membered Heteroaromatics",
      back: "Pyrrole, furan and thiophene react preferentially at C-2 (α position) with electrophiles. Reason: more resonance structures for arenium ion at α attack than at β attack (C-3).",
    },
    {
      front: "Indole – SEAr Regioselectivity",
      back: "C-3 (not C-2!) is preferred. At C-3 attack benzene aromaticity is preserved, charge is delocalised onto N. At C-2 attack the charge would have to be on the benzene ring.",
    },
    {
      front: "Pyrrole: Acidity vs. Basicity",
      back: "Not basic (LP in π system). BUT: N-H is acidic! pKa = 17.5. Pyrrolide anion is aromatic → stable. Deprotonation with NaH, BuLi possible → N-metalation.",
    },
    {
      front: "Furan vs. Pyrrole vs. Thiophene – Reactivity Series",
      back: "Pyrrole > Furan > Thiophene > Benzene for SEAr reactivity. Reason: N (least electronegative) donates lone pair most strongly → highest HOMO in pyrrole.",
    },
    {
      front: "Knorr Pyrrole Synthesis",
      back: "α-Aminoketone + β-ketoester → pyrrole. Classical method for synthesis of 2,3,4,5-substituted pyrroles (e.g. for porphyrin precursors).",
    },
  ],
};
EOF

echo "Topic 03 done"

# ══════════════════════════════════════════════
# Topics 04-09 in one go
# ══════════════════════════════════════════════
cat > src/courses/organic-chemistry/topics/04-five-ring-two-heteroatom.ts << 'EOF'
export const topic = {
  id: "04-five-ring-two-heteroatoms",
  title: "5-Membered Heteroaromatics (2+ Heteroatoms)",
  subtitle: "Imidazole, Oxazole, Pyrazole, Triazole, Tetrazole",
  icon: "🟠",
  estimatedMinutes: 80,
  theory: `
## Overview: 5-Membered Rings with Two or More Heteroatoms

| Compound | Heteroatoms | Special feature |
|---|---|---|
| Imidazole | N,N (1,3) | one pyrrole-N + one pyridine-N; pKa 7.0 |
| Pyrazole | N,N (1,2) | both N adjacent; pKa ~2.5 |
| Oxazole | N,O (1,3) | O at 1, N at 3 |
| Isoxazole | N,O (1,2) | N and O adjacent |
| Thiazole | N,S (1,3) | scaffold of penicillin, Vitamin B1 |
| 1,2,3-Triazole | N,N,N | accessible via CuAAC click chemistry |
| 1,2,4-Triazole | N,N,N | 3 N atoms, important in pharma |
| Tetrazole | N,N,N,N | bioisostere of carboxylic acid! |
| Oxadiazole | N,N,O | various isomers |

## Imidazole – Special Features

**Two different N atoms:**
- **N-1 (pyrrole-N):** LP in π system → not basic
- **N-3 (pyridine-N):** LP in σ system → basic (pKa 7.0)

**Tautomerism:** N-H can migrate between both N atoms. Rapid proton transfer in solution → both tautomers equivalent when unsubstituted.

**Biological importance:**
- L-Histidine contains imidazole → key residues in enzymes (serine proteases, carbonic anhydrase)
- pKa ~7.0: ideal as acid/base catalyst at physiological pH

## Oxazole & Isoxazole

**Oxazole** (1-oxa-3-aza-2,4-cyclopentadiene):
- Acts as azadiene in the Kondrat'eva synthesis!
- C-2 (between O and N) most reactive for nucleophilic reactions

**Isoxazole** (1-oxa-2-aza):
- N-O bond weak → easily cleaved under reductive/basic conditions
- Strategy: isoxazole as masked β-enaminone

## Thiazole

Core scaffold in:
- **Penicillins** (β-lactam + thiazolidine)
- **Thiamine (Vitamin B1)** (thiazolium ion as coenzyme – deprotonated C-2 as nucleophile!)

**Thiazolium chemistry:**
C-2-H of the thiazolium ion is acidic (similar to imidazolium) → deprotonation → thiazol-2-ylidene (NHC analogue!) → nucleophilic catalysis (thiamine pyrophosphate)

## 1,2,3-Triazole (Click Chemistry)

**CuAAC Reaction (Copper-catalysed Azide-Alkyne Cycloaddition):**
R-N₃ + R'-C≡CH → 1,4-disubstituted 1,2,3-triazole (regioselective!)
- Mild, high yield, broad applicability (bioconjugation, PET chemistry, pharma)
- Without Cu: thermally → mixture of 1,4- and 1,5-regioisomers (Huisgen cycloaddition)

**RuAAC:** Gives 1,5-disubstituted triazole

## Tetrazole – Bioisostere

Tetrazole is an important **bioisostere of the carboxylic acid:**
- Similar size, geometry and pKa (~4-5 vs. ~4-5 for RCOOH)
- But: better metabolic stability, improved membrane permeability
- **Example:** Losartan (antihypertensive) contains tetrazole instead of COOH

**Synthesis of tetrazoles:**
Nitrile + NaN₃ (azide) → [3+2] cycloaddition → 5-substituted tetrazole
`,
  quiz: [
    {
      id: "q1",
      question: "Why does imidazole have a pKa of 7.0 despite containing two N atoms?",
      options: [
        "Both N atoms are equally basic",
        "One N atom is pyrrole-like (LP in π) and one is pyridine-like (LP free). Protonation at pyridine-N → pKa 7.0",
        "The O atom increases the basicity",
        "Imidazole has 8 π electrons",
      ],
      correct: 1,
      explanation: "In imidazole there is N-1 (pyrrole-N, LP in π, not basic) and N-3 (pyridine-N, LP free → basic). The high pKa of 7.0 (vs. pyridine 5.2) is explained by the stabilisation of the imidazolium cation: positive charge delocalised through both N atoms.",
    },
    {
      id: "q2",
      question: "What is a bioisostere and what is the classic example with tetrazole?",
      options: [
        "An identical compound with the same molecular weight",
        "A structurally similar group with comparable physicochemical properties that can replace COOH (tetrazole instead of COOH in losartan)",
        "A radiolabelled analogue",
        "A compound with the same molecular formula but different structure",
      ],
      correct: 1,
      explanation: "Bioisosteres have similar sterics, electronics and pKa to the target group, but different metabolic or physicochemical properties. Tetrazole (pKa ~4-5) is a bioisostere of carboxylic acid: similar pKa, but higher metabolic stability. Used e.g. in losartan (angiotensin receptor blocker).",
    },
    {
      id: "q3",
      question: "What is special about CuAAC click chemistry for triazole synthesis?",
      options: [
        "It always gives 1,5-disubstituted triazole",
        "It gives regioselectively the 1,4-disubstituted 1,2,3-triazole from azide + terminal alkyne",
        "It requires high pressure and high temperature",
        "It proceeds via a carbene mechanism",
      ],
      correct: 1,
      explanation: "CuAAC (copper-catalysed azide-alkyne cycloaddition): azide + terminal alkyne + Cu(I) → selectively 1,4-disubst. 1,2,3-triazole. Without Cu (thermally, Huisgen): mixture of 1,4- and 1,5-isomers. RuAAC → 1,5-isomer.",
    },
    {
      id: "q4",
      question: "In which drug does the thiazolium ion play a central role as a coenzyme?",
      options: ["Imidazole", "Thiamine (Vitamin B1)", "Caffeine", "Histidine"],
      correct: 1,
      explanation: "Thiamine pyrophosphate (active Vitamin B1) contains a thiazolium ion. The C-2-H is acidic; deprotonation gives a nucleophilic carbanion (similar to an NHC = N-heterocyclic carbene) that can transfer acyl groups (pyruvate decarboxylase).",
    },
    {
      id: "q5",
      question: "Which nomenclature is important for 3-amino-1H-1,2,4-triazole?",
      options: [
        "It is a 6-membered ring",
        "The triazole has 3 N atoms; '1H' indicates the N-H position; '3-amino' shows NH₂ at C-3",
        "It contains O atoms",
        "Numbering starts at the sulfur atom",
      ],
      correct: 1,
      explanation: "1,2,4-Triazole: N atoms at positions 1,2,4. '1H' = NH at position 1. '3-amino' = NH₂ group at C-3. This nomenclature is exam-relevant.",
    },
  ],
  flashcards: [
    { front: "Imidazole – two N atoms", back: "N-1 (pyrrole-N): LP in π system → not basic. N-3 (pyridine-N): LP free → basic. pKa = 7.0 (imidazolium). Tautomerism possible. Important in enzymes (His residue)." },
    { front: "CuAAC – Click Chemistry", back: "R-N₃ + R'C≡CH → Cu(I) → 1,4-disubstituted 1,2,3-triazole. Regioselective. Mild, biocompatible. RuAAC → 1,5-isomer. Without metal (Huisgen): mixture." },
    { front: "Tetrazole as Bioisostere", back: "Replaces COOH in drugs. Similar pKa (~4-5), better metabolic stability, good membrane permeability. Synthesis: R-CN + NaN₃ → [3+2] → 5-R-tetrazole. Example: losartan." },
    { front: "Thiazolium Chemistry (Vitamin B1)", back: "C-2-H of thiazolium ion is acidic. Deprotonation → nucleophilic carbene centre (NHC-like). Transfer of acyl groups in metabolism (pyruvate decarboxylase, transketolase)." },
    { front: "Isoxazole – latent β-enaminone", back: "Isoxazole contains N-O bond (weak). Hydrogenolytic or reductive cleavage → β-enaminone or β-aminoenol. Strategy: isoxazole as protected β-enaminone in synthesis." },
    { front: "Nomenclature: 3-Amino-1H-1,2,4-Triazole", back: "1,2,4-Triazole: N at positions 1,2,4. 1H: NH at position 1. 3-amino: NH₂ at C-3. Trivial name: amitrole (herbicide). 5-membered ring with 3 N atoms." },
  ],
};
EOF

echo "Topic 04 done"

cat > src/courses/organic-chemistry/topics/05-cycloadditions.ts << 'EOF'
export const topic = {
  id: "05-cycloadditions",
  title: "Cycloaddition Reactions",
  subtitle: "1,3-Dipolar CA & Diels-Alder for Heterocycle Synthesis",
  icon: "🔄",
  estimatedMinutes: 75,
  theory: `
## Overview of Cycloaddition Reactions

Cycloadditions are pericyclic reactions in which **two π systems** react to form a ring. No catalyst, no intermediate (concerted).

## [4+2] Diels-Alder Reaction (Aza Variants)

**Diene + dienophile → 6-membered ring**

For heterocycle synthesis:
- **Azadiene** (at least 1 N in the diene) + dienophile → N-containing 6-membered ring
- **Hetero-Diels-Alder:** C=O or C=N as dienophile → pyrans, dihydropyrimidines

**Important examples:**
| Diene | Dienophile | Product |
|---|---|---|
| Oxazole | Alkyne | Pyridine (+ CO₂ loss) → Kondrat'eva |
| Triazine | Enamine | Pyridine (+ N₂ loss) → Boger |
| 1-Azadiene | Dienophile CO₂Me | Dihydropyridine → pyridine |
| Pyridine N-oxide | Alkyne | Isoxazole + CO loss |

## [3+2] 1,3-Dipolar Cycloaddition (Huisgen)

**1,3-Dipole + dipolarophile → 5-membered heterocycle**

### The most important 1,3-dipoles:
| 1,3-Dipole | Structure | Product with alkyne | Product with alkene |
|---|---|---|---|
| Nitrile oxide R-C≡N⁺-O⁻ | 3 atoms, allene structure | Isoxazole | Isoxazoline |
| Nitrone R-CH=N⁺(R')-O⁻ | | Isoxazoline | |
| Azide R-N=N⁺=N⁻ | | 1,2,3-Triazole | |
| Nitrilimines R-C≡N⁺-N⁻R' | | Pyrazole | Pyrazoline |
| Diazoalkane R₂C=N⁺=N⁻ | | Pyrazole | |

### Regioselectivity of [3+2] CA:
- Electronic control: FMO theory (HOMO-dipole / LUMO-dipolarophile)
- Steric: larger substituents determine orientation
- Exam-relevant: know the regioisomeric products for each dipole!

## Retrosynthesis P → A + B

**Scheme for exam:**
1. Identify the ring in product P
2. Determine ring type (5- or 6-membered)
3. Recognise 1,3-dipole or diene/dienophile bonding pattern
4. Perform retrosynthetic cut
5. Write A and B
`,
  quiz: [
    { id: "q1", question: "Which 1,3-dipole reacts regioselectively with a terminal alkyne to give a 1,2,3-triazole?", options: ["Nitrone", "Organic azide", "Nitrile oxide", "Nitrilimines"], correct: 1, explanation: "Organic azides (R-N₃ = R-N=N⁺=N⁻) react with alkynes in [3+2] cycloaddition to give 1,2,3-triazoles. Thermally: mixture of 1,4 and 1,5-isomers. Cu-catalysed: selectively 1,4." },
    { id: "q2", question: "Which regioisomer forms preferentially in the [3+2] CA of an unsymmetrical nitrile oxide with a terminally substituted alkene?", options: ["5-substituted isoxazoline (nitrile oxide-C at C-5)", "4-substituted isoxazoline", "3-substituted isoxazoline (nitrile oxide-C at C-3)", "Both isomers in equal parts"], correct: 0, explanation: "FMO control: HOMO of nitrile oxide and LUMO of alkene. The largest HOMO coefficient is at the nitrile oxide C (terminal), the largest LUMO coefficient at the β-C of the alkene → 5-substituted isoxazoline preferred." },
    { id: "q3", question: "What happens in the Diels-Alder reaction of oxazole with an alkyne (Kondrat'eva)?", options: ["Direct addition without intermediate → isoxazole", "[4+2] cycloaddition → bicyclic intermediate → retro-[4+2] with CO₂ loss → pyridine", "SNAr at oxazole", "Ring opening of oxazole, then recyclisation"], correct: 1, explanation: "Kondrat'eva pyridine synthesis: oxazole (as 1-oxa-1,3-diene) + alkyne → [4+2] → bicyclus → retro-[4+2] with CO₂ loss → aromatic pyridine. The CO₂ loss is the driving force (aromatisation + entropy)." },
    { id: "q4", question: "A furan ring in a product points retrosynthetically to which reaction?", options: ["[4+2] with azadiene", "[3+2] with nitrile oxide or azide", "Paal-Knorr synthesis from 1,4-dicarbonyl", "SNAr"], correct: 2, explanation: "A furan ring is most simply made from 1,4-dicarbonyl compounds via the Paal-Knorr synthesis (acid-catalysed double condensation + dehydration). Paal-Knorr is the most common retrosynthetic approach." },
    { id: "q5", question: "Which reaction gives a dihydropyridinone from a 1-azadiene and a dienophile?", options: ["[2+2]", "[4+2]", "[3+2]", "[2+2+2]"], correct: 1, explanation: "[4+2] Diels-Alder: 1-azadiene (4π) + dienophile (2π) → 6-membered N-containing product (dihydropyridine or, after oxidation, pyridine)." },
  ],
  flashcards: [
    { front: "Huisgen 1,3-Dipolar Cycloaddition", back: "[3+2]: 1,3-dipole + dipolarophile → 5-membered ring. Thermally: mixture. Cu-catalysed (CuAAC): regioselective 1,4-triazole. Important dipoles: azides, nitrile oxides, nitrones, nitrilimines." },
    { front: "Kondrat'eva Synthesis", back: "Oxazole (azadiene) + alkyne → [4+2] → bicyclus → −CO₂ → pyridine. Azadienes: compounds with C=N or N=N as part of the 4π system." },
    { front: "Boger Reaction", back: "Triazine (azadiene) + enamine → [4+2] → bicyclus → −N₂ → pyridine. N₂ is the 'XY' that leaves in retro-[4+2]." },
    { front: "Retrosynthesis 5-membered ring", back: "5-ring → find 1,3-dipole (azide, nitrile oxide, nitrone) + dipolarophile (alkyne/alkene). Cut at the 1,2-bond pair and the 4,5-bond pair." },
    { front: "Retrosynthesis 6-membered ring", back: "6-ring → diene [4C or 3C+N] + dienophile [2C or 1C+heteroatom]. Cut the 1,6- and 3,4-bonds (product bonds in DA)." },
    { front: "Nitrile oxide as 1,3-dipole", back: "R-C≡N⁺-O⁻ ↔ R-C=N=O. Allene structure. Reaction with alkyne → isoxazole. With alkene → isoxazoline. Preparation: hydroxamic acid + base or chloroxime + base." },
  ],
};
EOF

cat > src/courses/organic-chemistry/topics/06-cyclocondensations.ts << 'EOF'
export const topic = {
  id: "06-cyclocondensations",
  title: "Cyclocondensation Reactions",
  subtitle: "Regioselective Synthesis of Heterocycles",
  icon: "⚡",
  estimatedMinutes: 80,
  theory: `
## What is a Cyclocondensation?

A **cyclocondensation** is a ring-closure reaction with loss of small molecules (H₂O, ROH, NH₃). Unlike cycloadditions, it involves nucleophilic/electrophilic steps (not pericyclic).

## Regioselectivity Problem

With unsymmetrical components A + B → P1 + P2 (regioisomers)

**Strategies for regioselectivity:**
1. **Pre-formed enamines** with defined geometry
2. **Unsymmetrical dicarbonyl** instead of symmetrical
3. **Conjugate addition – conjugate elimination** route

## Important Cyclocondensation Reactions (exam-relevant)

### Hantzsch Dihydropyridine [3+3]:
Enamine + 1,3-dicarbonyl (+ NH₃) → 1,4-dihydropyridine → oxidation → pyridine
Regioselective when enamine is pre-synthesised!

### Bohlmann-Rahtz Reaction [3+3]:
Enaminone + β-ketoester → condensed pyridine
Selective: enaminone dictates regiochemistry

### Guareschi-Thorpe [3+3]:
Cyanoacetamide + 1,3-dicarbonyl → 2-pyridinone-3-carbonitrile

### Kröhnke [3+2+1]:
Pyridinium ylide + unsaturated dicarbonyl + NH₄OAc → pyridine
Mechanism: 1. Alkylation → pyridinium salt; 2. Knoevenagel + Michael; 3. cyclisation; 4. aromatisation

### Synthesis of substituted pyrimidines [3+3]:
1,3-Dicarbonyl + urea/guanidine/amidinate → pyrimidines/pyrimidinones
**Biginelli reaction:** Aldehyde + β-ketoester + urea → dihydropyrimidinone (DHPM)

### Synthesis of pyrazoles [3+2]:
1,3-Dicarbonyl + hydrazine (H₂N-NH₂) → pyrazole
Regioselectivity: with unsymmetrical dicarbonyls → two possible regioisomers
Solution: monosubstituted hydrazine H₂N-NHR → one isomer preferred

### Synthesis of isoxazoles:
β-Enolketone + NH₂OH (hydroxylamine) → isoxazole (+ H₂O)

### Imidazole synthesis:
1,2-Dicarbonyl + NH₃ + aldehyde → imidazole (van Leusen: TosMIC)
`,
  quiz: [
    { id: "q1", question: "Which components does the Hantzsch dihydropyridine synthesis require?", options: ["Azide + alkyne", "Enamine (or aldehyde) + 1,3-dicarbonyl + NH₃", "Diene + dienophile", "Hydrazine + 1,3-dicarbonyl"], correct: 1, explanation: "Hantzsch synthesis [3+3]: enamine (3C unit) + 1,3-dicarbonyl compound (3C unit) + NH₃ (1N unit). Alternative: aldehyde + 2× β-ketoester + NH₃. Product: 1,4-dihydropyridine; after oxidation: pyridine." },
    { id: "q2", question: "How can regioselectivity in the Hantzsch synthesis with unsymmetrical components be ensured?", options: ["By temperature control", "By pre-synthesising the enamine with defined regiochemistry", "By solvent choice", "By excess of one component"], correct: 1, explanation: "When the enamine is prepared separately beforehand (from ketone + primary amine), its regiochemistry is fixed. The subsequent reaction with the 1,3-dicarbonyl then gives regioselectively only one pyridine isomer." },
    { id: "q3", question: "What is the product of the Biginelli reaction?", options: ["Pyrimidine", "1,4-Dihydropyridine", "3,4-Dihydropyrimidin-2(1H)-one (DHPM)", "Pyrazole"], correct: 2, explanation: "The Biginelli reaction (3-component): aldehyde + β-ketoester + urea → 3,4-dihydropyrimidin-2(1H)-one (DHPM). Acid-catalysed. DHPMs are pharmacologically active (Ca channel blockers, hypertension)." },
    { id: "q4", question: "Which components give a pyrazole in cyclocondensation?", options: ["1,3-Dicarbonyl + NH₂OH", "1,3-Dicarbonyl + H₂N-NHR (hydrazine)", "1,4-Dicarbonyl + NH₃", "Enamine + diazonium salt"], correct: 1, explanation: "1,3-Dicarbonyl + hydrazine (H₂N-NH₂ or H₂N-NHR) → pyrazole. With hydrazine itself: mixture of two regioisomers (if 1,3-dicarbonyl unsymmetrical). With monosubstituted hydrazine: defined N-substituted pyrazole." },
    { id: "q5", question: "Which reagent combination gives an isoxazole?", options: ["β-Enolketone + H₂N-OH (hydroxylamine)", "1,4-Dicarbonyl + NH₃", "Azide + alkyne", "Aldehyde + malononitrile"], correct: 0, explanation: "β-Enolketone + hydroxylamine (H₂N-OH) → isoxazole. Mechanism: condensation (oxime formation at ketone), cyclisation (intramolecular Michael addition), dehydration. Regioselective when 1,3-dicarbonyl is unsymmetrical." },
    { id: "q6", question: "What is the van Leusen synthesis and what does it produce?", options: ["Pyridine from triazine", "Imidazole from tosylmethyl isocyanide (TosMIC) + aldehyde + amine", "Furan from 1,4-dicarbonyl", "Oxazole from isocyanide + carbonyl compound"], correct: 1, explanation: "Van Leusen reaction: aldehyde + R-NH₂ → imine, then + TosMIC (tosylmethyl isocyanide, TosCH₂NC) → 4-tosylimidazole (after tosyl elimination → imidazole). Mild conditions, broad applicability." },
  ],
  flashcards: [
    { front: "Hantzsch Dihydropyridine Synthesis", back: "[3+3] cyclocondensation: enamine + 1,3-dicarbonyl + NH₃ → 1,4-dihydropyridine → [O] → pyridine. Regioselective: use pre-synthesised enamine." },
    { front: "Biginelli Reaction", back: "3-component reaction: aldehyde + β-ketoester + urea → DHPM (dihydropyrimidinone). Acid-catalysed. Products: calcium channel blockers." },
    { front: "Kröhnke Reaction", back: "[3+2+1] cyclocondensation. Steps: 1. α-Br-ketone + pyridine → pyridinium salt. 2. + α,β-unsaturated ketone (Michael). 3. + NH₄OAc → cyclisation + aromatisation → pyridine." },
    { front: "Pyrazole Synthesis", back: "1,3-Dicarbonyl + H₂N-NH-R → N-substituted pyrazole (regioselective). With H₂N-NH₂ → mixture. Important: 1,3-diketones prefer 3(5)-substituted pyrazole." },
    { front: "Bohlmann-Rahtz Reaction", back: "[3+3] cyclocondensation: enaminone + β-ketoester → pyridine. Regiochemistry dictated by the enaminone. Propargylamine as alternative." },
    { front: "Retrosynthesis: Cyclocondensation", back: "Identify: which C-N or C-O bonds were newly formed? Cut them retrosynthetically. Add H₂O (or NH₃, ROH) that was eliminated. That gives A and B." },
  ],
};
EOF

echo "Topics 05-06 done"

cat > src/courses/organic-chemistry/topics/07-sear-regioselectivity.ts << 'EOF'
export const topic = {
  id: "07-sear-regioselectivity",
  title: "SEAr – Regioselectivity",
  subtitle: "Electrophilic Substitution at Heteroaromatics",
  icon: "⚖️",
  estimatedMinutes: 60,
  theory: `
## Electrophilic Aromatic Substitution (SEAr) at Heteroaromatics

### General Principle
1. Electrophile E⁺ attacks HOMO of aromatic → arenium ion (sigma complex)
2. Deprotonation → aromatic product

**Regioselectivity = stability of the arenium ion**
→ more resonance structures → more stable → preferred position

### Electron-rich Heteroaromatics (activated)

**Pyrrole:**
- C-2 (α) >> C-3 (β)
- Rationale: 3 resonance structures at α attack (incl. N⁺ structure), only 2 at β attack

**Furan:**
- C-2 >> C-3 (same logic as pyrrole)
- Note: furan can also undergo 1,2- and 1,4-addition under harsh conditions (less aromatic than benzene)

**Thiophene:**
- C-2 >> C-3 (same logic)
- Thiophene is more stable than furan (more aromatic)

**Indole:**
- C-3 >> C-2 (EXCEPTION!)
- Rationale: attack at C-3 preserves benzene aromaticity; charge on N without destroying the benzene π system

### Electron-poor Heteroaromatics (deactivated)

**Pyridine:**
- SEAr very slow
- If possible: C-3 preferred (meta to N)
- C-2 and C-4 particularly deactivated by N (N withdraws electrons)

## Drawing Resonance Structures (exam-relevant)

**For SEAr at pyrrole (C-2 attack by Br⁺):**
Structure 1: Br and H at C-2, positive charge at C-3
Structure 2: charge at C-5
Structure 3: charge at N (N⁺) → particularly stable
→ 3 resonance structures → more stable arenium ion than at C-3

**For SEAr at pyridine (C-3 attack):**
No N⁺ in resonance structure → less stable
At C-2 or C-4 attack: N⁺ in resonance structure, BUT N already electron-poor (pKa 5.2) → destabilising!

## Important Reactions Summary

| Substrate | Reagent | Position | Product |
|---|---|---|---|
| Indole | Br⁺ (NBS) | C-3 | 3-Bromoindole |
| Furan | Br⁺ | C-2 | 2-Bromofuran |
| Pyrrole | Br⁺ | C-2 | 2-Bromopyrrole |
| Thiophene | Br⁺ | C-2 | 2-Bromothiophene |
| Pyridine | Br₂/very harsh | C-3 | 3-Bromopyridine |
`,
  quiz: [
    { id: "q1", question: "Why is C-2 (α position) preferred over C-3 in SEAr of furan?", options: ["Steric preference for C-2", "C-2 attack gives 3 resonance structures (incl. O⁺), C-3 attack only 2", "C-2 has higher π density in HOMO", "The O atom is directly adjacent to C-2"], correct: 1, explanation: "Electrophile attack at C-2: 3 resonance structures for arenium ion (incl. O⁺ structure). At C-3: only 2 resonance structures → C-2 intermediate more stable → C-2 preferred (Hammond postulate)." },
    { id: "q2", question: "Indole reacts with Br⁺ at which position?", options: ["C-1 (N)", "C-2", "C-3", "C-7"], correct: 2, explanation: "C-3 is preferred for SEAr at indole. Rationale: attack at C-3 preserves benzene aromaticity; positive charge delocalised onto N without interrupting the benzene ring → most stable arenium ion." },
    { id: "q3", question: "Which position is least deactivated in SEAr at pyridine?", options: ["C-2", "C-3", "C-4", "N-1"], correct: 1, explanation: "C-3 (meta to N) is least deactivated, because the positive charge in the arenium ion CANNOT migrate directly onto the electron-poor N. At C-2 and C-4 (ortho/para to N) N⁺ would form, which is energetically very unfavourable." },
    { id: "q4", question: "Which resonance structure makes α attack at pyrrole particularly favourable?", options: ["One with C⁺ at the heteroatom", "One with N⁺ (positively charged nitrogen)", "One with O⁻", "None – SEAr does not occur at pyrrole"], correct: 1, explanation: "At α attack at pyrrole: one of the 3 resonance structures of the arenium ion shows N⁺. Although positively charged, this N cation is stabilised by the adjacent C atoms → favourable. At β attack this N⁺ structure is absent." },
    { id: "q5", question: "Why is SEAr at pyridine so much slower than at benzene?", options: ["Pyridine is smaller", "The pyridine N withdraws electron density from the ring → lower HOMO → poorer reaction with electrophiles", "Pyridine has no free electrons", "SEAr at pyridine is forbidden"], correct: 1, explanation: "The electronegative N atom in pyridine (sp²) withdraws electron density inductively and by mesomery → the HOMO lies at a lower energy than in benzene → poorer reaction with electrophiles (E⁺). SEAr strongly inhibited; SNAr preferred instead." },
  ],
  flashcards: [
    { front: "SEAr Regioselectivity – General Rule", back: "Position with most stable arenium ion is preferred. More resonance structures = more stable intermediate = preferred position. Draw all possible resonance structures!" },
    { front: "α vs. β in 5-membered Heteroaromatics", back: "α (C-2) >> β (C-3) for pyrrole, furan, thiophene. EXCEPTION: indole → C-3 preferred (benzene aromaticity preserved at C-3 attack)." },
    { front: "SEAr at Pyridine", back: "Strongly deactivated (N withdraws e⁻). If possible: C-3 (meta to N). C-2 and C-4 most strongly deactivated. SNAr at C-2/C-4 preferred instead." },
    { front: "Bromination of Indole", back: "Indole + NBS (N-bromosuccinimide) or Br⁺ → 3-bromoindole. C-3 is most reactive position. If necessary protect N-H (N-Ts, N-Boc) for selective C-functionalisation." },
    { front: "Arenium Ion (Sigma Complex)", back: "Intermediate of SEAr. sp³ carbon at attack point. Positive charge delocalised over the remaining π system. Stability → regioselectivity." },
  ],
};
EOF

echo "Topic 07 done"

cat > src/courses/organic-chemistry/topics/08-mechanisms.ts << 'EOF'
export const topic = {
  id: "08-mechanisms",
  title: "Reaction Mechanisms",
  subtitle: "Detailed Mechanisms of Selected Transformations",
  icon: "🔬",
  estimatedMinutes: 90,
  theory: `
## Overview: Exam-Relevant Mechanisms

The following mechanisms are tested in exercises and the exam.
Each mechanism must be represented with correct electron-flow arrows (curly arrows).

## 1. Kondrat'eva Pyridine Synthesis (Oxazole + Alkyne)

**Reaction:** Oxazole + DMAD (or other alkyne) → pyridine

**Steps:**
1. **[4+2] cycloaddition:** Oxazole (azadiene, 4π) + alkyne (2π) → bicyclic intermediate (7-oxabicyclo[2.2.1]heptadiene system)
2. **Retro-[4+2]:** Thermal cleavage with CO₂ loss → aromatic pyridine
**Driving force:** Aromatisation + entropy gain (CO₂ gas)

## 2. Boger Reaction (Triazine + Enamine → Pyridine + N₂)

**Reaction:** 1,2,4,5-Tetrazine (or triazine) + enamine → pyridine/pyridazine + N₂

**Steps:**
1. **[4+2] cycloaddition:** Tetrazine (azadiene, 4π) + enamine (2π) → bicyclus
2. **Retro-[4+2]:** N₂ loss (analogous to CO₂ in Kondrat'eva) → dihydropyridazine
3. **Oxidation/tautomerisation** → aromatic pyridine

## 3. Paal-Knorr Mechanism (1,4-Dicarbonyl → Pyrrole)

**Detailed mechanism:**
1. Protonation of a carbonyl → oxocarbenium
2. Nucleophilic attack of NH₂ → hemiaminal
3. Dehydration → imine (first ring N)
4. Tautomerisation + cyclisation of the second amine
5. Second dehydration → dihydropyrrole
6. Tautomerisation → pyrrole (aromatic!)

## 4. Kröhnke Reaction Mechanism

**Steps:**
1. α-Bromoketone + pyridine → pyridinium ylide (zwitterion)
2. Michael addition of ylide to α,β-unsaturated carbonyl → Michael adduct
3. Addition of NH₄OAc → intramolecular aldol cyclisation
4. Dehydration + oxidation → aromatic pyridine

## 5. N-Oxidation + Boekelheide Rearrangement

**Steps:**
1. 2-Methylpyridine + mCPBA → 2-methylpyridine N-oxide (peracid oxidises N)
2. + Ac₂O, Δ → [1,2]-acyl migration: O-acylation + [1,2]-shift onto CH₃ → 2-(acetoxymethyl)pyridine
3. Alternative: electrophilic amination possible at activated 4-position

## 6. N-oxide Chemistry Summary

N-oxides can be:
a) More electrophilic at C-4 (SNAr activated)
b) Boekelheide precursor: + Ac₂O, Δ → 2-AcOCH₂-pyridine
c) Reduced back to pyridine

## 7. Mechanism: [4+2] + Retro-[4+2]

Cycloaddition → bicyclic intermediate. Then thermal retro-[4+2] eliminates XY (CO₂, N₂, SO₂, etc.) → new aromatic compound. Driving force: aromatisation + gas evolution.
`,
  quiz: [
    { id: "q1", question: "What is the first step in the Paal-Knorr mechanism for pyrrole synthesis?", options: ["Oxidation of the 1,4-dicarbonyl", "Nucleophilic attack of the amine on a protonated carbonyl → hemiaminal", "Diels-Alder reaction", "Radical initiation"], correct: 1, explanation: "In the Paal-Knorr mechanism the primary amine (RNH₂) attacks the protonated (Lewis-acid-activated) carbonyl nucleophilically → hemiaminal. Then dehydration → imine. Second imine → cyclisation → dihydropyrrole → tautomerisation → pyrrole." },
    { id: "q2", question: "What is the driving force of the Kondrat'eva pyridine synthesis?", options: ["Acid catalysis", "Aromatisation to pyridine + entropy gain from CO₂ gas evolution", "Reduction of the azadiene", "None – it is endothermic"], correct: 1, explanation: "Two driving forces: 1. Aromatisation (pyridine more stable than bicyclic intermediate, ΔG < 0). 2. Entropy gain from release of CO₂ as gas (TΔS > 0). Together → favourable thermodynamics." },
    { id: "q3", question: "Which intermediate forms in the mCPBA oxidation of pyridine?", options: ["Pyridinone", "Pyridine N-oxide", "Hydroxypyridine", "Pyridinium ion"], correct: 1, explanation: "mCPBA (meta-chloroperoxybenzoic acid) is a peracid that oxidises N atoms. Pyridine + mCPBA → pyridine N-oxide. The N-oxide is important as an activated precursor for SNAr (activated at C-4) and the Boekelheide rearrangement." },
    { id: "q4", question: "In the Kröhnke mechanism: what is the role of pyridine in the first step?", options: ["Pyridine is the nucleophile that alkylates the α-bromoketone → pyridinium ylide", "Pyridine is the catalyst", "Pyridine is used as solvent", "Pyridine is the oxidant"], correct: 0, explanation: "In Kröhnke step 1 the α-bromoketone alkylates the pyridine N → pyridinium salt. This salt is an activated enolate equivalent (ylide character at α-C). The ylide then performs the Michael addition to the α,β-unsaturated carbonyl." },
    { id: "q5", question: "What makes the [4+2] + retro-[4+2] sequence so useful for heterocycle synthesis?", options: ["It requires no reagents", "It allows loss of a small stable molecule (CO₂, N₂) driving formation of a new aromatic ring", "It only works at room temperature", "It always gives 5-membered rings"], correct: 1, explanation: "The retro-[4+2] step releases a stable gas (CO₂, N₂, SO₂) – this entropy gain plus the aromatisation energy makes the overall transformation thermodynamically highly favourable. The approach is used in Kondrat'eva (CO₂) and Boger (N₂) syntheses." },
  ],
  flashcards: [
    { front: "Paal-Knorr Mechanism", back: "1,4-Dicarbonyl + RNH₂: 1. Hemiaminal; 2. Dehydration → imine; 3. Cyclisation (2nd N attacks 2nd carbonyl); 4. Dehydration → dihydropyrrole; 5. Tautomerisation → pyrrole." },
    { front: "Kröhnke Pyridine Synthesis – Steps", back: "1. α-BrCO + pyridine → pyridinium ylide. 2. Michael addition to enone. 3. + NH₄OAc → cyclisation. 4. Dehydration + aromatisation → pyridine." },
    { front: "Azomethine Ylide (1,3-Dipole)", back: "Form: C=N⁺-C⁻ ↔ C⁻-N=C. Generation: from N-oxides, münchnones, thermally from certain aziridines, or by deprotonation of iminium ions. Reaction: [3+2] with alkenes/alkynes." },
    { front: "N-oxide Chemistry (Pyridine)", back: "Pyridine + mCPBA → pyridine N-oxide. N-oxides: a) more electrophilic at C-4 (SNAr); b) Boekelheide precursor: + Ac₂O, Δ → 2-AcOCH₂-pyridine; c) can be reduced back to pyridine." },
    { front: "Mechanism: [4+2] + Retro-[4+2]", back: "Cycloaddition → bicyclic intermediate. Thermal retro-[4+2] eliminates XY (CO₂, N₂, SO₂ etc.) → new aromatic. Driving force: aromatisation + gas evolution." },
  ],
};
EOF

cat > src/courses/organic-chemistry/topics/09-bioisosteres-skeletal-editing.ts << 'EOF'
export const topic = {
  id: "09-bioisosteres-skeletal-editing",
  title: "Bioisosteres & Skeletal Editing",
  subtitle: "Modern Concepts in Medicinal Chemistry",
  icon: "💊",
  estimatedMinutes: 60,
  theory: `
## Bioisosteres

**Definition:** Bioisosteres are atoms, ions or molecules with similar size, shape and electron distribution that exhibit similar biological activity but different chemical properties.

**Goals of bioisosteric replacement:**
- Improved metabolic stability
- Altered solubility / lipophilicity
- Altered pKa values
- Better membrane permeability
- Improved selectivity

### Classic bioisosteric replacements:

| Original | Bioisostere | Advantage |
|---|---|---|
| -COOH | Tetrazole | Similar pKa, metabolically more stable |
| -COOH | -SO₂NH₂ (sulfonamide) | More acidic, more water-soluble |
| -COOH | -P(O)(OH)₂ | Phosphonic acid mimetic |
| -COOH | Isoxazol-3-ol | Planar, H-bond donor/acceptor |
| -OH | -NH₂, -CH₂OH, F | Polarity, metabolism |
| Benzene | Pyridine | Water solubility ↑, metabolism ↓ |
| Benzene | Thiophene, furan | Pharmacophore retention |

**Exam example:**
Nurr1 ligand with COOH → propose bioisostere:
- Tetrazole: similar pKa (~4-5), bioisosteric to COOH
- Synthesis: nitrile (from R-CN) + NaN₃ → [3+2] cycloaddition → 5-tetrazole

## Skeletal Editing

**Definition:** Direct transformation of the carbon or heteroatom skeleton of a molecule in one or a few steps – without classical multi-step construction.

**Concept:** Instead of re-synthesising a target molecule from scratch, the skeleton of a similar, easily accessible molecule is directly modified.

### Most important reactions:

**Ciamician-Dennstedt Rearrangement:**
Pyrrole + dibromocarbene (from CHBr₃/base) → 3-bromopyridine
Mechanism:
1. Cyclopropanation of pyrrole with carbene → 2H-azirine intermediate (strained 3-membered ring)
2. Ring opening + ring expansion → chloro/bromopyridine

**Exam example – Pindolol:**
Indole → 3-chloroquinoline derivative:
- Reaction: Ciamician-Dennstedt-type or Beckmann rearrangement + CHCl₃/base
- Mechanism: indole-N attacks dibromocarbene → strained intermediate → ring opening of pyrrole part → quinoline scaffold

**Further skeletal editing concepts:**
- **Nitrogen insertion into benzene:** Rh-catalysed, gives pyridine directly
- **Carbon excision:** Removal of a C atom from the ring
- **Ring expansion/contraction**

## Modern Drug Design Concepts

**Bioisosteres in approved drugs:**
- **Losartan:** COOH → tetrazole (angiotensin II antagonist)
- **Atorvastatin:** Pyrrole scaffold (bioisostere of the acrylate side chain)
- **Apixaban:** Pyrazole scaffold

**Skeletal editing in medicinal chemistry:**
- Scaffold hopping: scaffold exchange without loss of activity
- Bioisosteric ring replacement: e.g. benzene → pyridine increases water solubility
`,
  quiz: [
    { id: "q1", question: "What is a bioisostere and why is tetrazole a classic bioisostere of carboxylic acid?", options: ["An identical compound; tetrazole has the same molecular formula as COOH", "A group with similar size, polarity and pKa but different metabolic properties; tetrazole has pKa ~4-5 similar to COOH, but is metabolically more stable", "A compound with the same solubility; tetrazole is equally water-soluble", "A prodrug; tetrazole is hydrolysed to COOH in the body"], correct: 1, explanation: "Bioisosteres: similar physicochemical properties (size, geometry, pKa, H-bonds) → similar biological activity. Tetrazole pKa ~4-5 ≈ RCOOH pKa ~4-5. Advantage: tetrazole resistant to hydrolysis/oxidation → longer duration of action, better oral bioavailability." },
    { id: "q2", question: "What is 'skeletal editing' in modern synthetic chemistry?", options: ["Classical multi-step construction of a scaffold", "Direct transformation of the ring skeleton of an existing molecule (e.g. pyrrole → pyridine) in few steps without complete rebuilding", "Protecting group manipulation", "Functional group interconversion (FGI) without ring change"], correct: 1, explanation: "Skeletal editing enables direct ring modification. Example: Ciamician-Dennstedt: pyrrole + CHBr₃/base → 3-bromopyridine. The indole scaffold can be directly edited to quinoline. Modern: Rh-catalysed N-insertion into benzene → pyridine without retrosynthesis." },
    { id: "q3", question: "Which reagent is decisive for the Ciamician-Dennstedt rearrangement (pyrrole → pyridine)?", options: ["mCPBA", "NaNH₂", "Dibromocarbene (from CHBr₃ + base)", "BuLi"], correct: 2, explanation: "Dibromocarbene (generated from CHBr₃ + strong base) cyclopropanates the pyrrole ring → strained bicyclic intermediate. Ring opening + rearrangement → pyridine with halogen substituent at C-3. Mechanism: electron-poor carbene + π system → [2+1] cycloaddition." },
    { id: "q4", question: "Which FDA-approved drug contains a tetrazole as bioisosteric replacement for COOH?", options: ["Atorvastatin", "Apixaban", "Losartan", "Pindolol"], correct: 2, explanation: "Losartan (Cozaar) is an angiotensin II AT₁ receptor blocker. The COOH group of the original candidate was replaced by tetrazole → better oral bioavailability, metabolic stability, similar affinity. First sartan on the market (1995)." },
    { id: "q5", question: "Which heterocycle bioisostere typically increases water solubility when replacing a benzene ring?", options: ["Thiophene", "Furan", "Cyclopentyl", "Pyridine"], correct: 3, explanation: "Benzene → pyridine: The N atom increases the dipole moment and H-bond acceptor capacity → better water solubility. Simultaneously: pyridine metabolically more stable toward CYP oxidation (N makes ring electron-poor → oxidised more slowly). Classic scaffold hop." },
  ],
  flashcards: [
    { front: "Bioisostere – Definition", back: "Atom/group with similar sterics, electronics and physicochemical properties to the original, but different metabolic/pharmacokinetic properties. Goal: improvement of stability, solubility, selectivity." },
    { front: "Tetrazole as COOH Bioisostere", back: "pKa ~4-5 (similar to COOH). Metabolically stable (no ester/amide hydrolysis). Synthesis: R-CN + NaN₃ → [3+2] → 5-R-tetrazole. Example: losartan. Planar, H-bond donor + acceptor." },
    { front: "Ciamician-Dennstedt Rearrangement", back: "Pyrrole + dibromocarbene (CHBr₃/base) → 3-bromopyridine. Skeletal editing: pyrrole (5-ring) → pyridine (6-ring). Mechanism: [2+1] + ring expansion. Important for exam (pindolol → chloroquinoline)." },
    { front: "Skeletal Editing", back: "Direct transformation of ring skeleton in 1-3 steps. Examples: pyrrole→pyridine, indole→quinoline, benzene+N-source→pyridine (Rh-cat.). Advantage: rapid access to analogues, library synthesis." },
    { front: "Benzene → Pyridine Scaffold Hop", back: "Increases: water solubility (polar N), metabolic stability (electron-poor). Changes: basicity (N, pKa 5.2), H-bond capacity. Classic trick in drug design. Example: many kinase inhibitors." },
    { front: "Nurr1 Ligand – Bioisostere Example (Exam)", back: "Nurr1 ligand A has COOH. Bioisosteric replacement: tetrazole (similar pKa, more stable). Synthesis of tetrazole analogue: prepare corresponding nitrile (R-CN), then + NaN₃/[3+2] → tetrazole derivative." },
  ],
};
EOF

echo "Topics 08-09 done"

echo "=== Updating course index ==="
cat > src/courses/organic-chemistry/index.ts << 'EOF'
export const course = {
  id: "organic-chemistry",
  title: "Heterocyclic Chemistry & Drug Synthesis",
  subtitle: "Synthesis, Reactivity & Medicinal Chemistry",
  icon: "🧬",
  color: "#8b5cf6",
  level: "Uni",
  description: "Aromatic heterocycles, cycloadditions, cyclocondensations, SEAr regioselectivity, reaction mechanisms, bioisosteres and skeletal editing.",
  topics: [
    "01-introduction",
    "02-pyridines",
    "03-five-ring-one-heteroatom",
    "04-five-ring-two-heteroatoms",
    "05-cycloadditions",
    "06-cyclocondensations",
    "07-sear-regioselectivity",
    "08-mechanisms",
    "09-bioisosteres-skeletal-editing",
  ],
  totalTopics: 9,
  estimatedHours: 25,
};
EOF

echo "=== Build ==="
npm run build

echo ""
echo "✅ Done! Deploy:"
echo "git add ."
echo 'git commit -m "feat: translate heterocyclic chemistry course to English"'
echo "git push"
echo "vercel --prod"
