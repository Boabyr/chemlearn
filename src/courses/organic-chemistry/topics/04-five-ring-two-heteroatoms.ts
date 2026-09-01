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

## Why More Nitrogens Mean Less Reactivity

Adding a second nitrogen to a five-membered ring changes it in a predictable direction.
The pyrrole-type nitrogen donates its lone pair into the π system and activates the ring;
every additional pyridine-type nitrogen withdraws electron density and deactivates it.

- **Pyrrole** is extremely reactive towards electrophiles
- **Imidazole and pyrazole** are noticeably less so, and their SEAr goes to the position
  furthest from the pyridine-type nitrogen
- **Triazoles and tetrazole** are essentially inert towards electrophiles — which is
  exactly why tetrazole survives in the body where a carboxylic acid would be conjugated
  and excreted

The same trend read backwards gives the acidity: the more pyridine-type nitrogens, the
better the anion is stabilised. Pyrrole has pKa 17.5, imidazole 14.5, 1,2,4-triazole
around 10, and tetrazole about 4.9 — by then it is as acidic as acetic acid, and that is
the property the medicinal chemist is after.



`,
  interactive: {
    type: "mechanism",
    title: "Imidazole — two nitrogens, two roles",
    description: "Nur eines der beiden Stickstoffatome ist basisch. Zeichne die Protonierung und die Tautomerie, die daraus folgt.",
    stages: [
      {
        id: 0, titel: "Protonierung an N-3",
        aufgabe: "HCl protoniert das Imidazol. Zeichne beide Pfeile: das freie Elektronenpaar von N-3 zum Wasserstoff, und die H–Cl-Bindung zum Chlor.",
        erklaerung: "N-1 trägt bereits ein Wasserstoffatom und steckt sein Elektronenpaar ins aromatische System — es steht nicht zur Verfügung. Das Paar von N-3 liegt dagegen in der Ringebene und ist frei. Mit einem pKs von etwa 7 ist Imidazol bei physiologischem pH halb protoniert, und genau deshalb arbeitet Histidin in Enzymen als Säure und als Base.",
        hinweise: ["Zwei Stickstoffatome, aber nur eines hat ein Elektronenpaar zu vergeben. Schau, welches schon ein H trägt.", "Wie bei jeder Protonierung: die neue Bindung entsteht, die alte H–Cl-Bindung muss brechen."],
        atome: [
          { id: "n1", element: "N", x: 150, y: 220, wasserstoffe: 1 },
          { id: "c5", element: "C", x: 98, y: 182 },
          { id: "c4", element: "C", x: 118, y: 121 },
          { id: "n3", element: "N", x: 182, y: 121, freiePaare: 1 },
          { id: "c2", element: "C", x: 202, y: 182 },
          { id: "h1", element: "H", x: 320, y: 90, frei: true },
          { id: "cl1", element: "Cl", x: 385, y: 90, freiePaare: 3, frei: true },
        ],
        bindungen: [
          { id: "i1", von: "n1", nach: "c5", ordnung: 1 },
          { id: "i2", von: "c5", nach: "c4", ordnung: 2 },
          { id: "i3", von: "c4", nach: "n3", ordnung: 1 },
          { id: "i4", von: "n3", nach: "c2", ordnung: 2 },
          { id: "i5", von: "c2", nach: "n1", ordnung: 1 },
          { id: "hcl", von: "h1", nach: "cl1", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "n3" }, nach: { art: "atom", id: "h1" } },
          { von: { art: "bindung", id: "hcl" }, nach: { art: "atom", id: "cl1" } },
        ],
      },
      {
        id: 1, titel: "Tautomerie",
        aufgabe: "Eine Base nimmt dem Imidazolium den Wasserstoff an N-1 ab. Zeichne beide Pfeile.",
        erklaerung: "Das Imidazolium-Kation ist symmetrisch: beide Stickstoffatome tragen jetzt ein Wasserstoffatom und sind gleichwertig. Wird eines abgenommen, entsteht wieder neutrales Imidazol — aber der Wasserstoff kann nun am anderen Stickstoff sitzen. Genau dieser rasche Wechsel macht die beiden Tautomere im unsubstituierten Imidazol ununterscheidbar.",
        hinweise: ["Nimm den Wasserstoff von N-1 weg, nicht den gerade angelagerten.", "Das Elektronenpaar der N–H-Bindung bleibt am Stickstoff — sonst wäre das Ergebnis nicht neutral."],
        atome: [
          { id: "n1", element: "N", x: 150, y: 220 },
          { id: "c5", element: "C", x: 98, y: 182 },
          { id: "c4", element: "C", x: 118, y: 121 },
          { id: "n3", element: "N", x: 182, y: 121, ladung: 1, wasserstoffe: 1 },
          { id: "c2", element: "C", x: 202, y: 182 },
          { id: "h2", element: "H", x: 150, y: 275 },
          { id: "o1", element: "O", x: 330, y: 240, ladung: -1, freiePaare: 3, wasserstoffe: 1, frei: true },
        ],
        bindungen: [
          { id: "i1", von: "n1", nach: "c5", ordnung: 1 },
          { id: "i2", von: "c5", nach: "c4", ordnung: 2 },
          { id: "i3", von: "c4", nach: "n3", ordnung: 1 },
          { id: "i4", von: "n3", nach: "c2", ordnung: 2 },
          { id: "i5", von: "c2", nach: "n1", ordnung: 1 },
          { id: "nh", von: "n1", nach: "h2", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "o1" }, nach: { art: "atom", id: "h2" } },
          { von: { art: "bindung", id: "nh" }, nach: { art: "atom", id: "n1" } },
        ],
      },
    ],
    ergebnis: {
      titel: "Das andere Tautomer",
      beschreibung: "Derselbe Ring, der Wasserstoff sitzt jetzt an N-3. Im unsubstituierten Imidazol sind beide Formen gleichwertig und wandeln sich in Lösung rasch ineinander um.",
      atome: [
        { id: "n1", element: "N", x: 150, y: 220, freiePaare: 1 },
        { id: "c5", element: "C", x: 98, y: 182 },
        { id: "c4", element: "C", x: 118, y: 121 },
        { id: "n3", element: "N", x: 182, y: 121, wasserstoffe: 1 },
        { id: "c2", element: "C", x: 202, y: 182 },
      ],
      bindungen: [
        { id: "i1", von: "n1", nach: "c5", ordnung: 2 },
        { id: "i2", von: "c5", nach: "c4", ordnung: 1 },
        { id: "i3", von: "c4", nach: "n3", ordnung: 2 },
        { id: "i4", von: "n3", nach: "c2", ordnung: 1 },
        { id: "i5", von: "c2", nach: "n1", ordnung: 1 },
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Why does imidazole have a pKa of 7.0 despite containing two N atoms?", options: ["Both N atoms are equally basic", "One N atom is pyrrole-like (LP in π) and one is pyridine-like (LP free). Protonation at pyridine-N → pKa 7.0", "The O atom increases the basicity", "Imidazole has 8 π electrons"], correct: 1, explanation: "In imidazole there is N-1 (pyrrole-N, LP in π, not basic) and N-3 (pyridine-N, LP free → basic). The high pKa of 7.0 (vs. pyridine 5.2) is explained by the stabilisation of the imidazolium cation: positive charge delocalised through both N atoms." },
    { id: "q2", question: "Warum lässt sich ein Isoxazol als maskiertes β-Enaminon auffassen?", options: ["Weil es unter Säure zum Enol tautomerisiert", "Weil die schwache N–O-Bindung reduktiv oder basisch gespalten werden kann und dabei das Enaminon freisetzt", "Weil es bei Erwärmung CO₂ abgibt", "Weil der Ring nicht aromatisch ist"], correct: 1, explanation: "Die N–O-Bindung im Isoxazol ist die schwächste Bindung des Rings. Sie lässt sich gezielt spalten, und dabei entsteht ein β-Enaminon. Der Ring dient damit als Schutzgruppe: Man baut ihn auf, führt Reaktionen durch, die das offene Enaminon nicht überstünde, und öffnet ihn am Ende wieder." },
    { id: "q3", question: "What is special about CuAAC click chemistry for triazole synthesis?", options: ["It always gives 1,5-disubstituted triazole", "It gives regioselectively the 1,4-disubstituted 1,2,3-triazole from azide + terminal alkyne", "It requires high pressure and high temperature", "It proceeds via a carbene mechanism"], correct: 1, explanation: "CuAAC (copper-catalysed azide-alkyne cycloaddition): azide + terminal alkyne + Cu(I) → selectively 1,4-disubst. 1,2,3-triazole. Without Cu (thermally, Huisgen): mixture of 1,4- and 1,5-isomers. RuAAC → 1,5-isomer." },
    { id: "q4", question: "In which drug does the thiazolium ion play a central role as a coenzyme?", options: ["Imidazole", "Thiamine (Vitamin B1)", "Caffeine", "Histidine"], correct: 1, explanation: "Thiamine pyrophosphate (active Vitamin B1) contains a thiazolium ion. The C-2-H is acidic; deprotonation gives a nucleophilic carbanion (similar to an NHC = N-heterocyclic carbene) that can transfer acyl groups (pyruvate decarboxylase)." },
    { id: "q5", question: "Which nomenclature is important for 3-amino-1H-1,2,4-triazole?", options: ["It is a 6-membered ring", "The triazole has 3 N atoms; '1H' indicates the N-H position; '3-amino' shows NH₂ at C-3", "It contains O atoms", "Numbering starts at the sulfur atom"], correct: 1, explanation: "1,2,4-Triazole: N atoms at positions 1,2,4. '1H' = NH at position 1. '3-amino' = NH₂ group at C-3. This nomenclature is exam-relevant." },
    { id: "q6", question: "Unsubstituiertes Imidazol zeigt Tautomerie. Was bedeutet das für seine beiden Stickstoffatome?", options: ["Die beiden N-Atome tauschen ihre Rollen so schnell, dass 4- und 5-Position ununterscheidbar werden", "Der Ring öffnet und schließt sich ständig", "Ein N-Atom verlässt den Ring", "Die Tautomerie hebt die Aromatizität auf"], correct: 0, explanation: "Das N–H-Proton wandert schnell zwischen beiden Stickstoffatomen. Damit wird der Pyrrol-Stickstoff mal zum Pyridin-Stickstoff und umgekehrt, und die Positionen 4 und 5 lassen sich beim unsubstituierten Imidazol nicht mehr auseinanderhalten. Sobald ein Substituent an einem N sitzt, ist die Tautomerie blockiert und die Positionen werden wieder unterscheidbar." },
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
