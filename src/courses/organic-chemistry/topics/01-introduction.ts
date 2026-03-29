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
