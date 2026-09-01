import type { Thema } from '../../../content/schema'

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
  interactives: [
    {
      type: "mechanism",
      title: "Pyridine as a base — protonation and back",
      description: "Das freie Elektronenpaar am Stickstoff liegt in der Ringebene und steht zur Verfügung. Zeichne die Säure-Base-Reaktion in beide Richtungen.",
      stages: [
        {
          id: 0,
          titel: "Protonierung",
          aufgabe: "Pyridin greift HCl an. Zeichne beide Pfeile: das freie Elektronenpaar zum Wasserstoff, und die H–Cl-Bindung zum Chlor.",
          erklaerung: "Das Elektronenpaar am Stickstoff sitzt in einem sp²-Orbital in der Ringebene und ist nicht Teil des aromatischen Sextetts. Es kann angreifen, ohne die Aromatizität zu zerstören — deshalb ist Pyridin mit pKs 5,2 der konjugierten Säure eine brauchbare Base. Gleichzeitig muss die H–Cl-Bindung brechen, sonst hätte der Wasserstoff fünf Bindungen.",
          hinweise: [
            "Zwei Pfeile: einer bildet die neue Bindung, einer löst die alte. Ohne den zweiten bekäme der Wasserstoff zwei Bindungen.",
            "Der Pfeil zum Wasserstoff startet am freien Elektronenpaar des Stickstoffs, nicht am Ring."
          ],
          atome: [
            {
              id: "n1",
              element: "N",
              x: 100,
              y: 131,
              freiePaare: 1
            },
            {
              id: "c2",
              element: "C",
              x: 150,
              y: 102
            },
            {
              id: "c3",
              element: "C",
              x: 200,
              y: 131
            },
            {
              id: "c4",
              element: "C",
              x: 200,
              y: 189
            },
            {
              id: "c5",
              element: "C",
              x: 150,
              y: 218
            },
            {
              id: "c6",
              element: "C",
              x: 100,
              y: 189
            },
            {
              id: "h1",
              element: "H",
              x: 320,
              y: 120,
              frei: true
            },
            {
              id: "cl1",
              element: "Cl",
              x: 385,
              y: 120,
              freiePaare: 3,
              frei: true
            }
          ],
          bindungen: [
            {
              id: "r1",
              von: "n1",
              nach: "c2",
              ordnung: 2
            },
            {
              id: "r2",
              von: "c2",
              nach: "c3",
              ordnung: 1
            },
            {
              id: "r3",
              von: "c3",
              nach: "c4",
              ordnung: 2
            },
            {
              id: "r4",
              von: "c4",
              nach: "c5",
              ordnung: 1
            },
            {
              id: "r5",
              von: "c5",
              nach: "c6",
              ordnung: 2
            },
            {
              id: "r6",
              von: "c6",
              nach: "n1",
              ordnung: 1
            },
            {
              id: "hcl",
              von: "h1",
              nach: "cl1",
              ordnung: 1
            }
          ],
          pfeile: [
            {
              von: {
                art: "freiesPaar",
                id: "n1"
              },
              nach: {
                art: "atom",
                id: "h1"
              }
            },
            {
              von: {
                art: "bindung",
                id: "hcl"
              },
              nach: {
                art: "atom",
                id: "cl1"
              }
            }
          ]
        },
        {
          id: 1,
          titel: "Rückreaktion",
          aufgabe: "Hydroxid nimmt dem Pyridinium den Wasserstoff wieder ab. Zeichne beide Pfeile.",
          erklaerung: "Die Reaktion ist ein Gleichgewicht. Eine stärkere Base als Chlorid holt den Wasserstoff zurück, und das Elektronenpaar der N–H-Bindung bleibt am Stickstoff — Pyridin ist wieder da. Genau dieses Hin und Her macht den pKs-Wert zur brauchbaren Kennzahl.",
          hinweise: [
            "Das Elektronenpaar des Hydroxids greift den Wasserstoff an; die N–H-Bindung muss dabei zum Stickstoff zurückklappen.",
            "Wohin das Elektronenpaar der brechenden Bindung geht, entscheidet, wer am Ende die Ladung trägt."
          ],
          atome: [
            {
              id: "n1",
              element: "N",
              x: 100,
              y: 131,
              ladung: 1
            },
            {
              id: "c2",
              element: "C",
              x: 150,
              y: 102
            },
            {
              id: "c3",
              element: "C",
              x: 200,
              y: 131
            },
            {
              id: "c4",
              element: "C",
              x: 200,
              y: 189
            },
            {
              id: "c5",
              element: "C",
              x: 150,
              y: 218
            },
            {
              id: "c6",
              element: "C",
              x: 100,
              y: 189
            },
            {
              id: "h1",
              element: "H",
              x: 60,
              y: 90
            },
            {
              id: "o1",
              element: "O",
              x: 300,
              y: 60,
              ladung: -1,
              freiePaare: 3,
              wasserstoffe: 1,
              frei: true
            }
          ],
          bindungen: [
            {
              id: "r1",
              von: "n1",
              nach: "c2",
              ordnung: 2
            },
            {
              id: "r2",
              von: "c2",
              nach: "c3",
              ordnung: 1
            },
            {
              id: "r3",
              von: "c3",
              nach: "c4",
              ordnung: 2
            },
            {
              id: "r4",
              von: "c4",
              nach: "c5",
              ordnung: 1
            },
            {
              id: "r5",
              von: "c5",
              nach: "c6",
              ordnung: 2
            },
            {
              id: "r6",
              von: "c6",
              nach: "n1",
              ordnung: 1
            },
            {
              id: "nh",
              von: "n1",
              nach: "h1",
              ordnung: 1
            }
          ],
          pfeile: [
            {
              von: {
                art: "freiesPaar",
                id: "o1"
              },
              nach: {
                art: "atom",
                id: "h1"
              }
            },
            {
              von: {
                art: "bindung",
                id: "nh"
              },
              nach: {
                art: "atom",
                id: "n1"
              }
            }
          ]
        }
      ],
      ergebnis: {
        titel: "Pyridin, unverändert",
        beschreibung: "Das Gleichgewicht steht wieder auf der Seite der freien Base — der Ring hat nie seine Aromatizität verloren.",
        atome: [
          {
            id: "n1",
            element: "N",
            x: 130,
            y: 131,
            freiePaare: 1
          },
          {
            id: "c2",
            element: "C",
            x: 180,
            y: 102
          },
          {
            id: "c3",
            element: "C",
            x: 230,
            y: 131
          },
          {
            id: "c4",
            element: "C",
            x: 230,
            y: 189
          },
          {
            id: "c5",
            element: "C",
            x: 180,
            y: 218
          },
          {
            id: "c6",
            element: "C",
            x: 130,
            y: 189
          }
        ],
        bindungen: [
          {
            id: "r1",
            von: "n1",
            nach: "c2",
            ordnung: 2
          },
          {
            id: "r2",
            von: "c2",
            nach: "c3",
            ordnung: 1
          },
          {
            id: "r3",
            von: "c3",
            nach: "c4",
            ordnung: 2
          },
          {
            id: "r4",
            von: "c4",
            nach: "c5",
            ordnung: 1
          },
          {
            id: "r5",
            von: "c5",
            nach: "c6",
            ordnung: 2
          },
          {
            id: "r6",
            von: "c6",
            nach: "n1",
            ordnung: 1
          }
        ]
      }
    },
  ],
  quiz: [
    { id: "q1", question: "Which statement about the aromaticity of pyrrole is correct?", options: ["The lone pair of N is not part of the π system", "Pyrrole has 6 π electrons and is therefore aromatic (Hückel: n=1)", "Pyrrole is not aromatic, because a heteroatom interrupts the conjugation", "Pyrrole follows the 4n rule and is antiaromatic"], correct: 1, explanation: "Pyrrole has 6 π electrons (4 from the two double bonds + 2 from the N lone pair). The sp²-N lone pair lies in the ring plane and is part of the π system → pyrrole is aromatic (Hückel, n=1)." },
    { id: "q2", question: "Why is pyridine (pKa 5.2) significantly more basic than pyrrole (pKa ~0)?", options: ["Pyridine simply contains more carbon atoms", "In pyrrole the lone pair sits in the π system", "Pyridine forms a six- and pyrrole a five-ring", "The nitrogen of pyridine is sp³-hybridised"], correct: 1, explanation: "Pyrrole needs its nitrogen lone pair to reach the aromatic sextet. Protonating it would destroy the aromaticity, which is far too costly. In pyridine the lone pair sits in an sp² orbital in the ring plane, outside the π system, and is freely available — hence pKa 5.2 for the conjugate acid." },
    { id: "q3", question: "Which of the following heterocycles is least basic?", options: ["Piperidine", "Pyridine", "Imidazole", "Pyrrole"], correct: 3, explanation: "Pyrrole has its N lone pair fully incorporated into the π system (required for aromaticity). Piperidine (sp³-N, pKa~11) > Imidazole (pKa 7.0) > Pyridine (pKa 5.2) > Pyrrole (pKa ~0)." },
    { id: "q4", question: "What is the Hantzsch-Widman system?", options: ["A nomenclature system for naming acyclic compounds that contain heteroatoms", "A systematic nomenclature system for 3- to 10-membered heterocycles", "A method for the synthesis of pyridines", "A system for determining aromaticity"], correct: 1, explanation: "The Hantzsch-Widman system is an IUPAC nomenclature system specifically for small to medium-sized heterocycles (3–10-membered). It combines prefixes for heteroatoms (oxa-, thia-, aza-) with suffixes for ring size and degree of unsaturation (e.g. -ole, -ine)." },
    { id: "q5", question: "What trivial name does 1-azabenzene carry?", options: ["Imidazole", "Pyrimidine", "Pyridine", "Pyrrole"], correct: 2, explanation: "1-Azabenzene = pyridine. The systematic name describes the benzene ring with one CH replaced by N. Pyrimidine would be 1,3-diazabenzene." },
    { id: "q6", question: "A heterocycle is aromatic when… (choose the best answer)", options: ["It is planar, conjugated and has 4n+2 π electrons", "It contains at least one nitrogen atom", "It has exactly six atoms in the ring", "It has no heteroatom carrying a lone pair"], correct: 0, explanation: "Hückel demands all three at once: a planar ring, an uninterrupted conjugated system, and 4n+2 π electrons. Ring size and the presence of nitrogen are irrelevant — furan has oxygen and is aromatic, cyclobutadiene has four π electrons and is antiaromatic despite being planar and conjugated." },
  ],
  flashcards: [
    { id: "10z74oc", front: "Hückel Rule", back: "A molecule is aromatic if it is planar and has 4n+2 π electrons (n = 0,1,2,...). Examples: benzene (6e), pyrrole (6e), furan (6e), pyridine (6e)." },
    { id: "13x0m4z", front: "Pyrrole-N vs. Pyridine-N", back: "Pyrrole-N: sp², LP in π system → NOT basic (pKa~0). Pyridine-N: sp², LP in σ system (perpendicular to plane) → BASIC (pKa 5.2)." },
    { id: "15q9i2y", front: "Hantzsch-Widman Nomenclature", back: "System for 3–10-membered heterocycles. Prefix: oxa (O), thia (S), aza (N). Suffix: -irine (3-membered unsat.), -ole (5-membered unsat.), -ine (6-membered N)." },
    { id: "07bbr3p", front: "Furan", back: "Systematic: 1-oxacyclopenta-2,4-diene. 5-membered ring, O heteroatom, 6 π electrons (4 from C=C + 2 from O lone pair). Aromatic but less stable than benzene." },
    { id: "0xgsj8o", front: "Imidazole – special properties", back: "Contains TWO N atoms: one pyrrole-N (LP in π system, not basic) and one pyridine-N (LP free, basic). pKa = 7.0. Tautomerism possible (NH migrates)." },
    { id: "1k2wdlg", front: "FMO Theory & Reactivity", back: "For SEAr the HOMO is decisive. Electron-rich heteroaromatics (pyrrole, furan, thiophene) have higher HOMO → more reactive than benzene. Pyridine: lower HOMO → less reactive." },
    { id: "1sndyzy", front: "Koopmans' Theorem", back: "Ionisation energy ≈ negative orbital energy of the removed electron (Iᵢ ≈ −εᵢ). Allows estimation of reactivity of heteroaromatics toward electrophiles." },
    { id: "1mrboe9", front: "Basicity series N-heterocycles", back: "Piperidine (sp³, pKa~11) > Imidazole (pKa 7.0) > Pyridine (pKa 5.2) > 2,6-di-tBu-pyridine (pKa 3.7, steric) > Pyrimidine (pKa 2.3, inductive EWG) > Pyrrole (pKa~0)" },
  ],
} satisfies Thema;
