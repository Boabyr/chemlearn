import type { Thema } from '../../../content/schema'

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
  interactive: {
    type: "mechanism",
    title: "SEAr on pyrrole — why C-2 wins",
    description: "Follow the electron flow of the electrophilic attack and the rearomatisation.",
    stages: [
      {
        id: 0, label: "Attack at C-2", description: "The electron-rich ring attacks the electrophile. Draw the arrow from the C2=C3 π bond to the bromine.",
        hint1: "The nucleophile here is the ring itself — the arrow starts at the π bond, not at the nitrogen.", hint2: "C-2 is chosen because the resulting arenium ion has three resonance structures, one of them carrying the positive charge on nitrogen.",
        atoms: [
          { id: "N1", label: "N", x: 200, y: 80, color: "#60a5fa", r: 18 },
          { id: "C2", label: "C2", x: 260, y: 125, color: "#e2e8f0", r: 18 },
          { id: "C3", label: "C3", x: 238, y: 195, color: "#e2e8f0", r: 18 },
          { id: "C4", label: "C4", x: 162, y: 195, color: "#e2e8f0", r: 18 },
          { id: "C5", label: "C5", x: 140, y: 125, color: "#e2e8f0", r: 18 },
          { id: "Br", label: "Br⁺", x: 370, y: 125, color: "#4ade80", r: 18 },
        ],
        bonds: [
          { a: "N1", b: "C2", dash: false, color: "#64748b" },
          { a: "C2", b: "C3", dash: false, color: "#64748b" },
          { a: "C3", b: "C4", dash: false, color: "#64748b" },
          { a: "C4", b: "C5", dash: false, color: "#64748b" },
          { a: "C5", b: "N1", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "C2", to: "Br" },
      },
      {
        id: 1, label: "Rearomatisation", description: "A base removes the proton from C-2 and the aromatic sextet is restored. Draw the arrow from the C2–H bond to the base.",
        hint1: "The arenium ion is not the product — the ring is no longer aromatic at this point.", hint2: "Losing H⁺ costs nothing compared with the aromatic stabilisation regained.",
        atoms: [
          { id: "N1", label: "N⁺", x: 200, y: 80, color: "#60a5fa", r: 18, charge: "+" },
          { id: "C2", label: "C2", x: 260, y: 125, color: "#e2e8f0", r: 18 },
          { id: "H2", label: "H", x: 320, y: 90, color: "#cbd5e1", r: 14 },
          { id: "C3", label: "C3", x: 238, y: 195, color: "#e2e8f0", r: 18 },
          { id: "Base", label: "B⁻", x: 390, y: 175, color: "#f87171", r: 18, charge: "−" },
        ],
        bonds: [
          { a: "N1", b: "C2", dash: false, color: "#64748b" },
          { a: "C2", b: "H2", dash: false, color: "#64748b" },
          { a: "C2", b: "C3", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "H2", to: "Base" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Why does indole react preferentially at C-3 rather than C-2 in electrophilic aromatic substitution?", options: ["C-2 is sterically hindered", "Attack at C-3 gives an arenium ion that can be delocalised onto the benzene ring and N – aromaticity of the benzene ring is preserved", "C-3 has higher π electron density in the ground state", "N stabilises the transition state at C-3 by inversion"], correct: 1, explanation: "Attack at C-3: the arenium ion can be delocalised onto N WITHOUT disturbing the aromaticity of the benzene ring. Attack at C-2 would require the charge to be transferred to the benzene ring → loss of benzene aromaticity → energetically unfavourable." },
    { id: "q2", question: "Which compound is formed in the Paal-Knorr synthesis from a 1,4-dicarbonyl with a primary amine?", options: ["Furan", "Pyrrole", "Thiophene", "Pyridine"], correct: 1, explanation: "The Paal-Knorr synthesis gives N-substituted pyrroles from 1,4-dicarbonyl compounds + primary amine (R-NH₂). With NH₃ → NH-pyrrole, with H₂O/H⁺ → furan, with H₂S/H⁺ or P₄S₁₀ → thiophene." },
    { id: "q3", question: "What property fundamentally distinguishes pyrrole from pyridine regarding the N-H bond?", options: ["Pyrrole has no N-H", "Pyrrole N-H is acidic (pKa 17.5) and can be deprotonated, since the pyrrolide anion is aromatic", "Pyrrole N-H is strongly basic", "Pyrrole N-H cannot be deprotonated"], correct: 1, explanation: "Pyrrole N-H is acidic (pKa ~17.5) because the resulting pyrrolide anion is aromatic (6 π e⁻). Deprotonation with strong bases (NaH, BuLi) is possible → N-metalation → further reaction with electrophiles." },
    { id: "q4", question: "Furan + Br⁺: at which position does bromination preferentially occur?", options: ["C-2", "C-3", "C-4", "O atom"], correct: 0, explanation: "Furan is brominated preferentially at C-2 (α position). Attack at C-2 gives 3 resonance structures for the arenium ion (including one with O⁺); attack at C-3 gives only 2 → C-2 energetically favoured." },
    { id: "q5", question: "Which heteroaromatic is most strongly activated for SEAr (most reactive)?", options: ["Benzene", "Thiophene", "Pyrrole", "Furan"], correct: 2, explanation: "Pyrrole is most reactive for SEAr. The N atom is less electronegative than O or S, so the lone pair in pyrrole-N is more strongly donated into the ring → highest π electron density → highest HOMO." },
    { id: "q6", question: "Which mechanism explains the α selectivity (C-2) in SEAr of furan?", options: ["C-2 is more sterically accessible", "Attack at C-2 gives more resonance structures for the arenium ion than attack at C-3", "The O atom stabilises C-2 inductively", "C-2 has a lower LUMO contribution"], correct: 1, explanation: "Attack at C-2: 3 resonance structures (incl. one with O⁺). Attack at C-3: only 2 resonance structures. More resonance = more stable arenium ion = lower activation energy → C-2 preferred (kinetic control)." },
  ],
  flashcards: [
    { id: "057rsia", front: "Paal-Knorr Synthesis", back: "1,4-Dicarbonyl + NH₃/RNH₂ → pyrrole. 1,4-Dicarbonyl + H⁺ → furan. 1,4-Dicarbonyl + H₂S/P₄S₁₀ → thiophene. Mechanism: double condensation + cyclisation + dehydration." },
    { id: "03q12nj", front: "α Selectivity in 5-Membered Heteroaromatics", back: "Pyrrole, furan and thiophene react preferentially at C-2 (α position) with electrophiles. Reason: more resonance structures for arenium ion at α attack than at β attack (C-3)." },
    { id: "0y0jy5n", front: "Indole – SEAr Regioselectivity", back: "C-3 (not C-2!) is preferred. At C-3 attack benzene aromaticity is preserved, charge is delocalised onto N. At C-2 attack the charge would have to be on the benzene ring." },
    { id: "0raujxk", front: "Pyrrole: Acidity vs. Basicity", back: "Not basic (LP in π system). BUT: N-H is acidic! pKa = 17.5. Pyrrolide anion is aromatic → stable. Deprotonation with NaH, BuLi possible → N-metalation." },
    { id: "0w17y2c", front: "Furan vs. Pyrrole vs. Thiophene – Reactivity Series", back: "Pyrrole > Furan > Thiophene > Benzene for SEAr reactivity. Reason: N (least electronegative) donates lone pair most strongly → highest HOMO in pyrrole." },
    { id: "1o6094w", front: "Knorr Pyrrole Synthesis", back: "α-Aminoketone + β-ketoester → pyrrole. Classical method for synthesis of 2,3,4,5-substituted pyrroles (e.g. for porphyrin precursors)." },
  ],
} satisfies Thema;
