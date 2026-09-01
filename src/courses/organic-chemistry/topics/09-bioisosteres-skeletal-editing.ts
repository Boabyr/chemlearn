import type { Thema } from '../../../content/schema'

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
  interactive: {
    type: "mechanism",
    title: "Ciamician-Dennstedt — turning a pyrrole into a pyridine",
    description: "Skeletal editing heißt: das Gerüst selbst umbauen. Hier wird aus einem Fünfring ein Sechsring — in zwei Schritten.",
    stages: [
      {
        id: 0, titel: "Das Carben addiert sich",
        aufgabe: "Dichlorcarben lagert sich an die C2=C3-Bindung an. Zeichne beide Pfeile: die Doppelbindung zum Carbenkohlenstoff, und dessen freies Elektronenpaar zurück zu C-3.",
        erklaerung: "Ein Carben hat sowohl ein freies Elektronenpaar als auch ein leeres Orbital — deshalb zwei Pfeile in entgegengesetzte Richtungen. Die π-Elektronen des elektronenreichen Pyrrols füllen das leere Orbital, das Elektronenpaar des Carbens bildet die zweite neue Bindung. Es entsteht ein an den Fünfring ankondensierter Cyclopropanring.",
        hinweise: ["Der Angriff geht von der C2=C3-Doppelbindung aus, nicht vom Stickstoff.", "Ein Carben kann gleichzeitig Elektronen aufnehmen und abgeben — daher zwei Pfeile."],
        atome: [
          { id: "n1", element: "N", x: 150, y: 220, wasserstoffe: 1 },
          { id: "c2", element: "C", x: 202, y: 182 },
          { id: "c3", element: "C", x: 182, y: 121 },
          { id: "c4", element: "C", x: 118, y: 121 },
          { id: "c5", element: "C", x: 98, y: 182 },
          { id: "cc", element: "C", x: 310, y: 130, freiePaare: 1, frei: true },
          { id: "cl1", element: "Cl", x: 370, y: 90, freiePaare: 3 },
          { id: "cl2", element: "Cl", x: 370, y: 180, freiePaare: 3 },
        ],
        bindungen: [
          { id: "p1", von: "n1", nach: "c2", ordnung: 1 },
          { id: "p2", von: "c2", nach: "c3", ordnung: 2 },
          { id: "p3", von: "c3", nach: "c4", ordnung: 1 },
          { id: "p4", von: "c4", nach: "c5", ordnung: 2 },
          { id: "p5", von: "c5", nach: "n1", ordnung: 1 },
          { id: "q1", von: "cc", nach: "cl1", ordnung: 1 },
          { id: "q2", von: "cc", nach: "cl2", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "bindung", id: "p2" }, nach: { art: "atom", id: "cc" } },
          { von: { art: "freiesPaar", id: "cc" }, nach: { art: "atom", id: "c3" } },
        ],
      },
      {
        id: 1, titel: "Der Ring wird größer",
        aufgabe: "Chlorid tritt aus, und die C2–C3-Bindung wandert an den entstehenden Kohlenstoff. Zeichne beide Pfeile.",
        erklaerung: "Sobald das Chlorid weg ist, sitzt am Cyclopropan-Kohlenstoff eine positive Ladung. Die gespannte C2–C3-Bindung wandert dorthin — aus dem Dreiring plus Fünfring wird ein Sechsring. Nach der Deprotonierung steht ein aromatisches 3-Chlorpyridin da. Ein Ringatom mehr, ohne die Substanz von Grund auf neu aufzubauen: das ist der ganze Gedanke des skeletal editing.",
        hinweise: ["Zuerst muss Platz für die positive Ladung entstehen — ein Chlorid geht mit seinem Bindungselektronenpaar ab.", "Die wandernde Bindung ist die gespannte zwischen C-2 und C-3."],
        atome: [
          { id: "n1", element: "N", x: 150, y: 220, wasserstoffe: 1 },
          { id: "c2", element: "C", x: 202, y: 182 },
          { id: "c3", element: "C", x: 182, y: 121 },
          { id: "c4", element: "C", x: 118, y: 121 },
          { id: "c5", element: "C", x: 98, y: 182 },
          { id: "cc", element: "C", x: 255, y: 140 },
          { id: "cl1", element: "Cl", x: 320, y: 100, freiePaare: 3 },
          { id: "cl2", element: "Cl", x: 300, y: 195, freiePaare: 3 },
        ],
        bindungen: [
          { id: "p1", von: "n1", nach: "c2", ordnung: 1 },
          { id: "p2", von: "c2", nach: "c3", ordnung: 1 },
          { id: "p3", von: "c3", nach: "c4", ordnung: 1 },
          { id: "p4", von: "c4", nach: "c5", ordnung: 2 },
          { id: "p5", von: "c5", nach: "n1", ordnung: 1 },
          { id: "s1", von: "c2", nach: "cc", ordnung: 1 },
          { id: "s2", von: "c3", nach: "cc", ordnung: 1 },
          { id: "q1", von: "cc", nach: "cl1", ordnung: 1 },
          { id: "q2", von: "cc", nach: "cl2", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "bindung", id: "q1" }, nach: { art: "atom", id: "cl1" } },
          { von: { art: "bindung", id: "p2" }, nach: { art: "atom", id: "cc" } },
        ],
      },
    ],
    ergebnis: {
      titel: "3-Chlorpyridin",
      beschreibung: "Aus dem Fünfring ist ein Sechsring geworden, der Stickstoff ist geblieben, und das Chlor sitzt an C-3. Ein Ringatom mehr in zwei Schritten statt einer neuen Synthese.",
      atome: [
        { id: "n1", element: "N", x: 100, y: 131, freiePaare: 1 },
        { id: "c2", element: "C", x: 150, y: 102 },
        { id: "c3", element: "C", x: 200, y: 131 },
        { id: "c4", element: "C", x: 200, y: 189 },
        { id: "c5", element: "C", x: 150, y: 218 },
        { id: "c6", element: "C", x: 100, y: 189 },
        { id: "cl1", element: "Cl", x: 262, y: 100, freiePaare: 3 },
      ],
      bindungen: [
        { id: "r1", von: "n1", nach: "c2", ordnung: 2 },
        { id: "r2", von: "c2", nach: "c3", ordnung: 1 },
        { id: "r3", von: "c3", nach: "c4", ordnung: 2 },
        { id: "r4", von: "c4", nach: "c5", ordnung: 1 },
        { id: "r5", von: "c5", nach: "c6", ordnung: 2 },
        { id: "r6", von: "c6", nach: "n1", ordnung: 1 },
        { id: "ccl", von: "c3", nach: "cl1", ordnung: 1 },
      ],
    },
  },
  quiz: [
    { id: "q1", question: "What is a bioisostere and why is tetrazole a classic bioisostere of carboxylic acid?", options: ["An identical compound; tetrazole has the same molecular formula as COOH", "A group with similar size, polarity and pKa but different metabolic properties; tetrazole has pKa ~4-5 similar to COOH, but is metabolically more stable", "A compound with the same solubility; tetrazole is equally water-soluble", "A prodrug; tetrazole is hydrolysed to COOH in the body"], correct: 1, explanation: "Bioisosteres: similar physicochemical properties (size, geometry, pKa, H-bonds) → similar biological activity. Tetrazole pKa ~4-5 ≈ RCOOH pKa ~4-5. Advantage: tetrazole resistant to hydrolysis/oxidation → longer duration of action, better oral bioavailability." },
    { id: "q2", question: "What is 'skeletal editing' in modern synthetic chemistry?", options: ["Classical multi-step construction of a scaffold", "Direct transformation of the ring skeleton of an existing molecule (e.g. pyrrole → pyridine) in few steps without complete rebuilding", "Protecting group manipulation", "Functional group interconversion (FGI) without ring change"], correct: 1, explanation: "Skeletal editing enables direct ring modification. Example: Ciamician-Dennstedt: pyrrole + CHBr₃/base → 3-bromopyridine. The indole scaffold can be directly edited to quinoline. Modern: Rh-catalysed N-insertion into benzene → pyridine without retrosynthesis." },
    { id: "q3", question: "Which reagent is decisive for the Ciamician-Dennstedt rearrangement (pyrrole → pyridine)?", options: ["mCPBA", "NaNH₂", "Dibromocarbene (from CHBr₃ + base)", "BuLi"], correct: 2, explanation: "Dibromocarbene (generated from CHBr₃ + strong base) cyclopropanates the pyrrole ring → strained bicyclic intermediate. Ring opening + rearrangement → pyridine with halogen substituent at C-3. Mechanism: electron-poor carbene + π system → [2+1] cycloaddition." },
    { id: "q4", question: "Which FDA-approved drug contains a tetrazole as bioisosteric replacement for COOH?", options: ["Atorvastatin", "Apixaban", "Losartan", "Pindolol"], correct: 2, explanation: "Losartan (Cozaar) is an angiotensin II AT₁ receptor blocker. The COOH group of the original candidate was replaced by tetrazole → better oral bioavailability, metabolic stability, similar affinity. First sartan on the market (1995)." },
    { id: "q5", question: "Which heterocycle bioisostere typically increases water solubility when replacing a benzene ring?", options: ["Thiophene", "Furan", "Cyclopentyl", "Pyridine"], correct: 3, explanation: "Benzene → pyridine: The N atom increases the dipole moment and H-bond acceptor capacity → better water solubility. Simultaneously: pyridine metabolically more stable toward CYP oxidation (N makes ring electron-poor → oxidised more slowly). Classic scaffold hop." },
    { id: "q6", question: "What is meant by skeletal editing?", options: ["Replacing a side chain by a bioisostere", "Directly changing the ring skeleton of an existing molecule in one or a few steps, instead of rebuilding the target from scratch", "Purifying a crude product by recrystallisation", "Rotating a molecule around a single bond"], correct: 1, explanation: "Skeletal editing changes the framework itself — inserting, deleting or swapping a ring atom. The Ciamician-Dennstedt rearrangement, which turns pyrrole into a pyridine by carbene insertion, is a textbook case. It saves the whole classical synthetic sequence to the new scaffold." },
  ],
  flashcards: [
    { id: "04ux8hd", front: "Bioisostere – Definition", back: "Atom/group with similar sterics, electronics and physicochemical properties to the original, but different metabolic/pharmacokinetic properties. Goal: improvement of stability, solubility, selectivity." },
    { id: "1214770", front: "Tetrazole as COOH Bioisostere", back: "pKa ~4-5 (similar to COOH). Metabolically stable (no ester/amide hydrolysis). Synthesis: R-CN + NaN₃ → [3+2] → 5-R-tetrazole. Example: losartan. Planar, H-bond donor + acceptor." },
    { id: "02q2ia4", front: "Ciamician-Dennstedt Rearrangement", back: "Pyrrole + dibromocarbene (CHBr₃/base) → 3-bromopyridine. Skeletal editing: pyrrole (5-ring) → pyridine (6-ring). Mechanism: [2+1] + ring expansion. Important for exam (pindolol → chloroquinoline)." },
    { id: "1plx016", front: "Skeletal Editing", back: "Direct transformation of ring skeleton in 1-3 steps. Examples: pyrrole→pyridine, indole→quinoline, benzene+N-source→pyridine (Rh-cat.). Advantage: rapid access to analogues, library synthesis." },
    { id: "0834fjd", front: "Benzene → Pyridine Scaffold Hop", back: "Increases: water solubility (polar N), metabolic stability (electron-poor). Changes: basicity (N, pKa 5.2), H-bond capacity. Classic trick in drug design. Example: many kinase inhibitors." },
    { id: "0b8rkzl", front: "Nurr1 Ligand – Bioisostere Example (Exam)", back: "Nurr1 ligand A has COOH. Bioisosteric replacement: tetrazole (similar pKa, more stable). Synthesis of tetrazole analogue: prepare corresponding nitrile (R-CN), then + NaN₃/[3+2] → tetrazole derivative." },
  ],
} satisfies Thema;
