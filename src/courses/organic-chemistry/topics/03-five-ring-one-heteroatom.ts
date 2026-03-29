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
