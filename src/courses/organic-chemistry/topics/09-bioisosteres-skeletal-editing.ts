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
