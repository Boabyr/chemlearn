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
