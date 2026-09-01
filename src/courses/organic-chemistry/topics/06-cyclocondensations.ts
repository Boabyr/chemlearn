import type { Thema } from '../../../content/schema'

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
  interactive: {
    type: "mechanism",
    title: "Pyrazole from a 1,3-diketone and hydrazine",
    description: "A cyclocondensation starts like any carbonyl chemistry — with a nucleophilic attack.",
    stages: [
      {
        id: 0, label: "First attack of the hydrazine", description: "Draw the arrow from the terminal hydrazine nitrogen to one carbonyl carbon.",
        hint1: "Hydrazine has two nucleophilic nitrogens; one attacks each carbonyl, which is why exactly a five-membered ring closes.", hint2: "After the attack comes dehydration to the hydrazone, then the second nitrogen closes the ring and a second molecule of water leaves. Aromatisation drives the whole sequence.",
        atoms: [
          { id: "C1", label: "C=O", x: 150, y: 110, color: "#e2e8f0", r: 20 },
          { id: "O1", label: "O", x: 150, y: 45, color: "#f87171", r: 16 },
          { id: "C2", label: "CH₂", x: 215, y: 150, color: "#e2e8f0", r: 20 },
          { id: "C3", label: "C=O", x: 285, y: 110, color: "#e2e8f0", r: 20 },
          { id: "O3", label: "O", x: 285, y: 45, color: "#f87171", r: 16 },
          { id: "Na", label: "NH₂", x: 100, y: 205, color: "#60a5fa", r: 20 },
          { id: "Nb", label: "NH₂", x: 340, y: 205, color: "#60a5fa", r: 20 },
        ],
        bonds: [
          { a: "C1", b: "O1", dash: false, color: "#64748b" },
          { a: "C1", b: "C2", dash: false, color: "#64748b" },
          { a: "C2", b: "C3", dash: false, color: "#64748b" },
          { a: "C3", b: "O3", dash: false, color: "#64748b" },
          { a: "Na", b: "Nb", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "Na", to: "C1" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Which components does the Hantzsch dihydropyridine synthesis require?", options: ["Azide + alkyne", "Enamine (or aldehyde) + 1,3-dicarbonyl + NH₃", "Diene + dienophile", "Hydrazine + 1,3-dicarbonyl"], correct: 1, explanation: "Hantzsch synthesis [3+3]: enamine (3C unit) + 1,3-dicarbonyl compound (3C unit) + NH₃ (1N unit). Alternative: aldehyde + 2× β-ketoester + NH₃. Product: 1,4-dihydropyridine; after oxidation: pyridine." },
    { id: "q2", question: "How can regioselectivity in the Hantzsch synthesis with unsymmetrical components be ensured?", options: ["By temperature control", "By pre-synthesising the enamine with defined regiochemistry", "By solvent choice", "By excess of one component"], correct: 1, explanation: "When the enamine is prepared separately beforehand (from ketone + primary amine), its regiochemistry is fixed. The subsequent reaction with the 1,3-dicarbonyl then gives regioselectively only one pyridine isomer." },
    { id: "q3", question: "What is the product of the Biginelli reaction?", options: ["Pyrimidine", "1,4-Dihydropyridine", "3,4-Dihydropyrimidin-2(1H)-one (DHPM)", "Pyrazole"], correct: 2, explanation: "The Biginelli reaction (3-component): aldehyde + β-ketoester + urea → 3,4-dihydropyrimidin-2(1H)-one (DHPM). Acid-catalysed. DHPMs are pharmacologically active (Ca channel blockers, hypertension)." },
    { id: "q4", question: "Which components give a pyrazole in cyclocondensation?", options: ["1,3-Dicarbonyl + NH₂OH", "1,3-Dicarbonyl + H₂N-NHR (hydrazine)", "1,4-Dicarbonyl + NH₃", "Enamine + diazonium salt"], correct: 1, explanation: "1,3-Dicarbonyl + hydrazine (H₂N-NH₂ or H₂N-NHR) → pyrazole. With hydrazine itself: mixture of two regioisomers (if 1,3-dicarbonyl unsymmetrical). With monosubstituted hydrazine: defined N-substituted pyrazole." },
    { id: "q5", question: "Which reagent combination gives an isoxazole?", options: ["β-Enolketone + H₂N-OH (hydroxylamine)", "1,4-Dicarbonyl + NH₃", "Azide + alkyne", "Aldehyde + malononitrile"], correct: 0, explanation: "β-Enolketone + hydroxylamine (H₂N-OH) → isoxazole. Mechanism: condensation (oxime formation at ketone), cyclisation (intramolecular Michael addition), dehydration. Regioselective when 1,3-dicarbonyl is unsymmetrical." },
    { id: "q6", question: "What is the van Leusen synthesis and what does it produce?", options: ["Pyridine from triazine", "Imidazole from tosylmethyl isocyanide (TosMIC) + aldehyde + amine", "Furan from 1,4-dicarbonyl", "Oxazole from isocyanide + carbonyl compound"], correct: 1, explanation: "Van Leusen reaction: aldehyde + R-NH₂ → imine, then + TosMIC (tosylmethyl isocyanide, TosCH₂NC) → 4-tosylimidazole (after tosyl elimination → imidazole). Mild conditions, broad applicability." },
  ],
  flashcards: [
    { id: "1bqsez5", front: "Hantzsch Dihydropyridine Synthesis", back: "[3+3] cyclocondensation: enamine + 1,3-dicarbonyl + NH₃ → 1,4-dihydropyridine → [O] → pyridine. Regioselective: use pre-synthesised enamine." },
    { id: "0k94jy7", front: "Biginelli Reaction", back: "3-component reaction: aldehyde + β-ketoester + urea → DHPM (dihydropyrimidinone). Acid-catalysed. Products: calcium channel blockers." },
    { id: "1uvjmpz", front: "Kröhnke Reaction", back: "[3+2+1] cyclocondensation. Steps: 1. α-Br-ketone + pyridine → pyridinium salt. 2. + α,β-unsaturated ketone (Michael). 3. + NH₄OAc → cyclisation + aromatisation → pyridine." },
    { id: "07k6u7x", front: "Pyrazole Synthesis", back: "1,3-Dicarbonyl + H₂N-NH-R → N-substituted pyrazole (regioselective). With H₂N-NH₂ → mixture. Important: 1,3-diketones prefer 3(5)-substituted pyrazole." },
    { id: "08fisvj", front: "Bohlmann-Rahtz Reaction", back: "[3+3] cyclocondensation: enaminone + β-ketoester → pyridine. Regiochemistry dictated by the enaminone. Propargylamine as alternative." },
    { id: "1vwbl7q", front: "Retrosynthesis: Cyclocondensation", back: "Identify: which C-N or C-O bonds were newly formed? Cut them retrosynthetically. Add H₂O (or NH₃, ROH) that was eliminated. That gives A and B." },
  ],
} satisfies Thema;
