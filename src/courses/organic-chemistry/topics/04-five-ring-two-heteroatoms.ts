import type { Thema } from '../../../content/schema'

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
  interactive: {
    type: "mechanism",
    title: "Imidazole — which nitrogen is basic?",
    description: "Only one of the two nitrogens can pick up a proton. Show which lone pair does the work.",
    stages: [
      {
        id: 0, label: "Protonation at N-3", description: "Draw the arrow from the lone pair of the pyridine-type nitrogen to the proton.",
        hint1: "N-1 carries the N–H and donates its lone pair to the aromatic π system — it is not available.", hint2: "The lone pair of N-3 sits in an sp² orbital in the ring plane, perpendicular to the π system. Using it costs no aromaticity, which is why the pKa is around 7.",
        atoms: [
          { id: "N1", label: "N1-H", x: 150, y: 90, color: "#60a5fa", r: 20 },
          { id: "C2", label: "C2", x: 215, y: 65, color: "#e2e8f0", r: 18 },
          { id: "N3", label: "N3", x: 265, y: 120, color: "#60a5fa", r: 20 },
          { id: "C4", label: "C4", x: 225, y: 185, color: "#e2e8f0", r: 18 },
          { id: "C5", label: "C5", x: 155, y: 165, color: "#e2e8f0", r: 18 },
          { id: "H", label: "H⁺", x: 380, y: 120, color: "#cbd5e1", r: 16, charge: "+" },
        ],
        bonds: [
          { a: "N1", b: "C2", dash: false, color: "#64748b" },
          { a: "C2", b: "N3", dash: false, color: "#64748b" },
          { a: "N3", b: "C4", dash: false, color: "#64748b" },
          { a: "C4", b: "C5", dash: false, color: "#64748b" },
          { a: "C5", b: "N1", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "N3", to: "H" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Why does imidazole have a pKa of 7.0 despite containing two N atoms?", options: ["Both N atoms are equally basic", "One N atom is pyrrole-like (LP in π) and one is pyridine-like (LP free). Protonation at pyridine-N → pKa 7.0", "The O atom increases the basicity", "Imidazole has 8 π electrons"], correct: 1, explanation: "In imidazole there is N-1 (pyrrole-N, LP in π, not basic) and N-3 (pyridine-N, LP free → basic). The high pKa of 7.0 (vs. pyridine 5.2) is explained by the stabilisation of the imidazolium cation: positive charge delocalised through both N atoms." },
    { id: "q2", question: "What is a bioisostere and what is the classic example with tetrazole?", options: ["An identical compound with the same molecular weight", "A structurally similar group with comparable physicochemical properties that can replace COOH (tetrazole instead of COOH in losartan)", "A radiolabelled analogue", "A compound with the same molecular formula but different structure"], correct: 1, explanation: "Bioisosteres have similar sterics, electronics and pKa to the target group, but different metabolic or physicochemical properties. Tetrazole (pKa ~4-5) is a bioisostere of carboxylic acid: similar pKa, but higher metabolic stability. Used e.g. in losartan (angiotensin receptor blocker)." },
    { id: "q3", question: "What is special about CuAAC click chemistry for triazole synthesis?", options: ["It always gives 1,5-disubstituted triazole", "It gives regioselectively the 1,4-disubstituted 1,2,3-triazole from azide + terminal alkyne", "It requires high pressure and high temperature", "It proceeds via a carbene mechanism"], correct: 1, explanation: "CuAAC (copper-catalysed azide-alkyne cycloaddition): azide + terminal alkyne + Cu(I) → selectively 1,4-disubst. 1,2,3-triazole. Without Cu (thermally, Huisgen): mixture of 1,4- and 1,5-isomers. RuAAC → 1,5-isomer." },
    { id: "q4", question: "In which drug does the thiazolium ion play a central role as a coenzyme?", options: ["Imidazole", "Thiamine (Vitamin B1)", "Caffeine", "Histidine"], correct: 1, explanation: "Thiamine pyrophosphate (active Vitamin B1) contains a thiazolium ion. The C-2-H is acidic; deprotonation gives a nucleophilic carbanion (similar to an NHC = N-heterocyclic carbene) that can transfer acyl groups (pyruvate decarboxylase)." },
    { id: "q5", question: "Which nomenclature is important for 3-amino-1H-1,2,4-triazole?", options: ["It is a 6-membered ring", "The triazole has 3 N atoms; '1H' indicates the N-H position; '3-amino' shows NH₂ at C-3", "It contains O atoms", "Numbering starts at the sulfur atom"], correct: 1, explanation: "1,2,4-Triazole: N atoms at positions 1,2,4. '1H' = NH at position 1. '3-amino' = NH₂ group at C-3. This nomenclature is exam-relevant." },
    { id: "q6", question: "Why is tetrazole a useful bioisostere for a carboxylic acid?", options: ["It is much more basic than COOH", "It has a similar pKa of about 4 to 5, comparable acidity and planarity, but is more resistant to metabolism", "It is smaller than COOH", "It cannot form hydrogen bonds and therefore binds more tightly"], correct: 1, explanation: "Tetrazole is deprotonated at physiological pH just like a carboxylic acid, it is flat and offers a similar hydrogen-bonding pattern. Unlike COOH it is not conjugated by glucuronidation, so the metabolic half-life improves while the binding mode stays." },
  ],
  flashcards: [
    { id: "0lzzg26", front: "Imidazole – two N atoms", back: "N-1 (pyrrole-N): LP in π system → not basic. N-3 (pyridine-N): LP free → basic. pKa = 7.0 (imidazolium). Tautomerism possible. Important in enzymes (His residue)." },
    { id: "1lxpmi3", front: "CuAAC – Click Chemistry", back: "R-N₃ + R'C≡CH → Cu(I) → 1,4-disubstituted 1,2,3-triazole. Regioselective. Mild, biocompatible. RuAAC → 1,5-isomer. Without metal (Huisgen): mixture." },
    { id: "0sijthb", front: "Tetrazole as Bioisostere", back: "Replaces COOH in drugs. Similar pKa (~4-5), better metabolic stability, good membrane permeability. Synthesis: R-CN + NaN₃ → [3+2] → 5-R-tetrazole. Example: losartan." },
    { id: "1mvgf0v", front: "Thiazolium Chemistry (Vitamin B1)", back: "C-2-H of thiazolium ion is acidic. Deprotonation → nucleophilic carbene centre (NHC-like). Transfer of acyl groups in metabolism (pyruvate decarboxylase, transketolase)." },
    { id: "08d9i0z", front: "Isoxazole – latent β-enaminone", back: "Isoxazole contains N-O bond (weak). Hydrogenolytic or reductive cleavage → β-enaminone or β-aminoenol. Strategy: isoxazole as protected β-enaminone in synthesis." },
    { id: "0qh8cjr", front: "Nomenclature: 3-Amino-1H-1,2,4-Triazole", back: "1,2,4-Triazole: N at positions 1,2,4. 1H: NH at position 1. 3-amino: NH₂ at C-3. Trivial name: amitrole (herbicide). 5-membered ring with 3 N atoms." },
  ],
} satisfies Thema;
