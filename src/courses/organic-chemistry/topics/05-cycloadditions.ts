import type { Thema } from '../../../content/schema'

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
  interactive: {
    type: "mechanism",
    title: "Huisgen [3+2] — azide meets alkyne",
    description: "The 1,3-dipole and the dipolarophile form two new bonds at once. Show the first of them.",
    stages: [
      {
        id: 0, label: "Terminal nitrogen attacks the alkyne", description: "Draw the arrow from the terminal azide nitrogen to the nearer alkyne carbon.",
        hint1: "In the azide R–N=N⁺=N⁻ the negative charge sits at the terminal nitrogen — that is the nucleophilic end.", hint2: "The reaction is concerted: while N-3 bonds to one alkyne carbon, N-1 bonds to the other. The result is the 1,2,3-triazole ring.",
        atoms: [
          { id: "N1", label: "N1", x: 120, y: 90, color: "#60a5fa", r: 18 },
          { id: "N2", label: "N2", x: 190, y: 70, color: "#60a5fa", r: 18, charge: "+" },
          { id: "N3", label: "N3", x: 260, y: 90, color: "#60a5fa", r: 18, charge: "−" },
          { id: "Ca", label: "C", x: 260, y: 190, color: "#e2e8f0", r: 18 },
          { id: "Cb", label: "C", x: 150, y: 190, color: "#e2e8f0", r: 18 },
        ],
        bonds: [
          { a: "N1", b: "N2", dash: false, color: "#64748b" },
          { a: "N2", b: "N3", dash: false, color: "#64748b" },
          { a: "Ca", b: "Cb", dash: false, color: "#64748b" },
          { a: "N1", b: "Cb", dash: true, color: "#475569" },
        ],
        correctArrow: { from: "N3", to: "Ca" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Which 1,3-dipole reacts regioselectively with a terminal alkyne to give a 1,2,3-triazole?", options: ["Nitrone", "Organic azide", "Nitrile oxide", "Nitrilimines"], correct: 1, explanation: "Organic azides (R-N₃ = R-N=N⁺=N⁻) react with alkynes in [3+2] cycloaddition to give 1,2,3-triazoles. Thermally: mixture of 1,4 and 1,5-isomers. Cu-catalysed: selectively 1,4." },
    { id: "q2", question: "Which regioisomer forms preferentially in the [3+2] CA of an unsymmetrical nitrile oxide with a terminally substituted alkene?", options: ["5-substituted isoxazoline (nitrile oxide-C at C-5)", "4-substituted isoxazoline", "3-substituted isoxazoline (nitrile oxide-C at C-3)", "Both isomers in equal parts"], correct: 0, explanation: "FMO control: HOMO of nitrile oxide and LUMO of alkene. The largest HOMO coefficient is at the nitrile oxide C (terminal), the largest LUMO coefficient at the β-C of the alkene → 5-substituted isoxazoline preferred." },
    { id: "q3", question: "What happens in the Diels-Alder reaction of oxazole with an alkyne (Kondrat'eva)?", options: ["Direct addition without intermediate → isoxazole", "[4+2] cycloaddition → bicyclic intermediate → retro-[4+2] with CO₂ loss → pyridine", "SNAr at oxazole", "Ring opening of oxazole, then recyclisation"], correct: 1, explanation: "Kondrat'eva pyridine synthesis: oxazole (as 1-oxa-1,3-diene) + alkyne → [4+2] → bicyclus → retro-[4+2] with CO₂ loss → aromatic pyridine. The CO₂ loss is the driving force (aromatisation + entropy)." },
    { id: "q4", question: "A furan ring in a product points retrosynthetically to which reaction?", options: ["[4+2] with azadiene", "[3+2] with nitrile oxide or azide", "Paal-Knorr synthesis from 1,4-dicarbonyl", "SNAr"], correct: 2, explanation: "A furan ring is most simply made from 1,4-dicarbonyl compounds via the Paal-Knorr synthesis (acid-catalysed double condensation + dehydration). Paal-Knorr is the most common retrosynthetic approach." },
    { id: "q5", question: "Which reaction gives a dihydropyridinone from a 1-azadiene and a dienophile?", options: ["[2+2]", "[4+2]", "[3+2]", "[2+2+2]"], correct: 1, explanation: "[4+2] Diels-Alder: 1-azadiene (4π) + dienophile (2π) → 6-membered N-containing product (dihydropyridine or, after oxidation, pyridine)." },
    { id: "q6", question: "An azide reacts with a terminal alkyne under Huisgen conditions. What kind of ring results?", options: ["A 1,2,3-triazole", "A pyrazole", "An isoxazole", "A tetrazole"], correct: 0, explanation: "Azide plus alkyne is the classic [3+2] cycloaddition of click chemistry and gives a 1,2,3-triazole. A nitrile oxide would give an isoxazole, a diazoalkane or nitrilimine a pyrazole, and azide plus nitrile a tetrazole. Learn the dipole-product pairs as a table." },
  ],
  flashcards: [
    { id: "1icba6a", front: "Huisgen 1,3-Dipolar Cycloaddition", back: "[3+2]: 1,3-dipole + dipolarophile → 5-membered ring. Thermally: mixture. Cu-catalysed (CuAAC): regioselective 1,4-triazole. Important dipoles: azides, nitrile oxides, nitrones, nitrilimines." },
    { id: "11ru87j", front: "Kondrat'eva Synthesis", back: "Oxazole (azadiene) + alkyne → [4+2] → bicyclus → −CO₂ → pyridine. Azadienes: compounds with C=N or N=N as part of the 4π system." },
    { id: "1cv4imb", front: "Boger Reaction", back: "Triazine (azadiene) + enamine → [4+2] → bicyclus → −N₂ → pyridine. N₂ is the 'XY' that leaves in retro-[4+2]." },
    { id: "0adoh5e", front: "Retrosynthesis 5-membered ring", back: "5-ring → find 1,3-dipole (azide, nitrile oxide, nitrone) + dipolarophile (alkyne/alkene). Cut at the 1,2-bond pair and the 4,5-bond pair." },
    { id: "0i3pq53", front: "Retrosynthesis 6-membered ring", back: "6-ring → diene [4C or 3C+N] + dienophile [2C or 1C+heteroatom]. Cut the 1,6- and 3,4-bonds (product bonds in DA)." },
    { id: "1xgxlfr", front: "Nitrile oxide as 1,3-dipole", back: "R-C≡N⁺-O⁻ ↔ R-C=N=O. Allene structure. Reaction with alkyne → isoxazole. With alkene → isoxazoline. Preparation: hydroxamic acid + base or chloroxime + base." },
  ],
} satisfies Thema;
