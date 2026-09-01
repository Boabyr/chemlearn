import type { Thema } from '../../../content/schema'

export const topic = {
  id: "05-cycloadditions",
  title: "Cycloaddition Reactions",
  subtitle: "1,3-Dipolar CA & Diels-Alder for Heterocycle Synthesis",
  icon: "🔄",
  estimatedMinutes: 75,
  theory: `
## Overview of Cycloaddition Reactions

Cycloadditions are pericyclic reactions in which **two π systems** react to form a ring.
No catalyst, no intermediate — the bonds break and form in one concerted step. That is
what separates them from the cyclocondensations of the previous chapter, which run
through discrete ionic intermediates and lose water on the way.

## [4+2] Diels-Alder Reaction (Aza Variants)

**Diene + dienophile → 6-membered ring**

For heterocycle synthesis:
- **Azadiene** (at least 1 N in the diene) + dienophile → N-containing 6-membered ring
- **Hetero-Diels-Alder:** C=O or C=N as dienophile → pyrans, dihydropyrimidines

**Important examples:**
| Diene | Dienophile | Product |
|---|---|---|
| Oxazole | Alkyne | Pyridine (+ CO₂ loss) → Kondrat'eva |
| 1,2,4-Triazine | Enamine | Pyridine (+ N₂ loss) → Boger |
| 1,2,4,5-Tetrazine | Alkene/alkyne | Pyridazine (+ N₂ loss) |
| 1-Azadiene | Dienophile CO₂Me | Dihydropyridine → pyridine |
| 2H-Pyran-2-one | Alkyne | Benzene ring (+ CO₂ loss) |

The last three rows share one idea: the first cycloaddition builds a bridged bicycle,
and a **retro-[4+2]** then expels a small stable molecule — N₂ or CO₂. The gas leaving
the solution plus the aromatisation of the product make that second step irreversible.

## [3+2] 1,3-Dipolar Cycloaddition (Huisgen)

**1,3-Dipole + dipolarophile → 5-membered heterocycle**

A 1,3-dipole is a three-atom unit with four π electrons delocalised over it, drawn with
formal plus and minus charges at the ends. Both ends attack at once.

### The most important 1,3-dipoles:
| 1,3-Dipole | Product with alkyne | Product with alkene |
|---|---|---|
| Nitrile oxide R-C≡N⁺-O⁻ | Isoxazole | Isoxazoline (4,5-dihydroisoxazole) |
| Nitrone R-CH=N⁺(R')-O⁻ | 4-Isoxazoline | Isoxazolidine |
| Azide R-N=N⁺=N⁻ | 1,2,3-Triazole | Triazoline |
| Nitrilimine R-C≡N⁺-N⁻R' | Pyrazole | Pyrazoline |
| Diazoalkane R₂C=N⁺=N⁻ | Pyrazole | Pyrazoline |

The pattern is worth memorising as a rule rather than a table: an alkyne gives the fully
unsaturated aromatic ring, an alkene gives the ring with one saturated bond more. Which
heteroatoms end up in the ring is decided entirely by the dipole.

**Click chemistry:** the azide/alkyne case becomes regiospecific under Cu(I) catalysis
(CuAAC) and then gives only the 1,4-disubstituted triazole. The uncatalysed thermal
reaction gives a mixture of the 1,4 and 1,5 isomers.

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

A five-membered ring with two or three adjacent heteroatoms almost always points to a
[3+2]; a six-membered ring with one nitrogen and no obvious carbonyl origin points to an
aza-Diels-Alder with loss of N₂ or CO₂.
`,
  interactives: [
    {
      type: "mechanism",
      title: "Nitrile oxide — making the dipole, then using it",
      description: "Eine [3+2]-Cycloaddition braucht erst einmal ein 1,3-Dipol. Zeichne, wie es entsteht und wie es zuschlägt.",
      stages: [
        {
          id: 0,
          titel: "Das Dipol entsteht",
          aufgabe: "Eine Base nimmt dem Hydroximoylchlorid den Wasserstoff ab und Chlorid geht weg. Zeichne alle drei Pfeile.",
          erklaerung: "Das 1,3-Dipol fällt nicht vom Himmel. Aus R–CCl=N–OH macht eine Base in einem Zug das Nitriloxid R–C≡N⁺–O⁻: der Wasserstoff geht an die Base, das Elektronenpaar der O–H-Bindung wandert in die C=N-Bindung, und das Chlorid tritt aus. Danach liegen drei Atome mit vier Elektronen in einer Reihe — genau das, was eine [3+2]-Addition braucht.",
          hinweise: [
            "Drei Pfeile in einer Kette: Base holt den Wasserstoff, dessen Bindungselektronen schieben weiter, und am Ende muss etwas den Platz räumen.",
            "Was am Kohlenstoff wegmuss, damit dort eine Dreifachbindung Platz hat, ist das Chlorid."
          ],
          atome: [
            {
              id: "cc",
              element: "C",
              x: 150,
              y: 170
            },
            {
              id: "nn",
              element: "N",
              x: 215,
              y: 140
            },
            {
              id: "oo",
              element: "O",
              x: 280,
              y: 170,
              freiePaare: 2,
              wasserstoffe: 1
            },
            {
              id: "ho",
              element: "H",
              x: 330,
              y: 210
            },
            {
              id: "cl1",
              element: "Cl",
              x: 100,
              y: 235,
              freiePaare: 3
            },
            {
              id: "rr",
              element: "R",
              x: 90,
              y: 120
            },
            {
              id: "base",
              element: "N",
              x: 390,
              y: 100,
              ladung: -1,
              freiePaare: 2,
              wasserstoffe: 2,
              frei: true
            }
          ],
          bindungen: [
            {
              id: "d1",
              von: "cc",
              nach: "nn",
              ordnung: 2
            },
            {
              id: "d2",
              von: "nn",
              nach: "oo",
              ordnung: 1
            },
            {
              id: "d3",
              von: "oo",
              nach: "ho",
              ordnung: 1
            },
            {
              id: "d4",
              von: "cc",
              nach: "cl1",
              ordnung: 1
            },
            {
              id: "d5",
              von: "cc",
              nach: "rr",
              ordnung: 1
            }
          ],
          pfeile: [
            {
              von: {
                art: "freiesPaar",
                id: "base"
              },
              nach: {
                art: "atom",
                id: "ho"
              }
            },
            {
              von: {
                art: "bindung",
                id: "d3"
              },
              nach: {
                art: "bindung",
                id: "d1"
              }
            },
            {
              von: {
                art: "bindung",
                id: "d4"
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
          titel: "Die Cycloaddition",
          aufgabe: "Das Nitriloxid trifft auf ein Alken. Zeichne die drei Pfeile, die den Fünfring in einem Zug schließen.",
          erklaerung: "Beide neuen Bindungen entstehen gleichzeitig — es gibt kein Zwischenprodukt und keine Ladung unterwegs. Der Sauerstoff des Dipols bindet an das eine Alken-Kohlenstoffatom, der Kohlenstoff des Dipols an das andere. Aus C≡N wird C=N, und der Ring ist geschlossen. Mit einem Alkin an dieser Stelle entstünde statt des Isoxazolins ein Isoxazol.",
          hinweise: [
            "Drei Pfeile im Kreis: Dipol-Ende, Alken-Doppelbindung, Dipol-Mitte. Reihenfolge egal.",
            "Der Sauerstoff trägt die negative Ladung — er ist das nucleophile Ende des Dipols."
          ],
          atome: [
            {
              id: "cc",
              element: "C",
              x: 150,
              y: 120
            },
            {
              id: "nn",
              element: "N",
              x: 210,
              y: 100,
              ladung: 1
            },
            {
              id: "oo",
              element: "O",
              x: 270,
              y: 120,
              ladung: -1,
              freiePaare: 3
            },
            {
              id: "rr",
              element: "R",
              x: 100,
              y: 85
            },
            {
              id: "ca",
              element: "C",
              x: 160,
              y: 215
            },
            {
              id: "cb",
              element: "C",
              x: 265,
              y: 215
            }
          ],
          bindungen: [
            {
              id: "d1",
              von: "cc",
              nach: "nn",
              ordnung: 3
            },
            {
              id: "d2",
              von: "nn",
              nach: "oo",
              ordnung: 1
            },
            {
              id: "d5",
              von: "cc",
              nach: "rr",
              ordnung: 1
            },
            {
              id: "alken",
              von: "ca",
              nach: "cb",
              ordnung: 2
            }
          ],
          pfeile: [
            {
              von: {
                art: "freiesPaar",
                id: "oo"
              },
              nach: {
                art: "atom",
                id: "cb"
              }
            },
            {
              von: {
                art: "bindung",
                id: "alken"
              },
              nach: {
                art: "atom",
                id: "ca"
              }
            },
            {
              von: {
                art: "bindung",
                id: "d1"
              },
              nach: {
                art: "atom",
                id: "cc"
              }
            }
          ]
        }
      ],
      ergebnis: {
        titel: "Isoxazolin",
        beschreibung: "Der Fünfring mit Sauerstoff und Stickstoff nebeneinander. Die schwache N–O-Bindung lässt sich später reduktiv spalten — deshalb dient das Isoxazolin oft als maskiertes β-Hydroxyketon.",
        atome: [
          {
            id: "oo",
            element: "O",
            x: 150,
            y: 220,
            freiePaare: 2
          },
          {
            id: "nn",
            element: "N",
            x: 202,
            y: 182
          },
          {
            id: "cc",
            element: "C",
            x: 182,
            y: 121
          },
          {
            id: "ca",
            element: "C",
            x: 118,
            y: 121
          },
          {
            id: "cb",
            element: "C",
            x: 98,
            y: 182
          },
          {
            id: "rr",
            element: "R",
            x: 215,
            y: 65
          }
        ],
        bindungen: [
          {
            id: "e1",
            von: "oo",
            nach: "nn",
            ordnung: 1
          },
          {
            id: "e2",
            von: "nn",
            nach: "cc",
            ordnung: 2
          },
          {
            id: "e3",
            von: "cc",
            nach: "ca",
            ordnung: 1
          },
          {
            id: "e4",
            von: "ca",
            nach: "cb",
            ordnung: 1
          },
          {
            id: "e5",
            von: "cb",
            nach: "oo",
            ordnung: 1
          },
          {
            id: "e6",
            von: "cc",
            nach: "rr",
            ordnung: 1
          }
        ]
      }
    },
  ],
  quiz: [
    { id: "q1", question: "Which 1,3-dipole reacts regioselectively with a terminal alkyne to give a 1,2,3-triazole?", options: ["Nitrone", "Organic azide", "Nitrile oxide", "Nitrilimines"], correct: 1, explanation: "Organic azides (R-N₃ = R-N=N⁺=N⁻) react with alkynes in [3+2] cycloaddition to give 1,2,3-triazoles. Thermally: mixture of 1,4 and 1,5-isomers. Cu-catalysed: selectively 1,4." },
    { id: "q2", question: "Which regioisomer forms preferentially in the [3+2] CA of an unsymmetrical nitrile oxide with a terminally substituted alkene?", options: ["5-substituted isoxazoline (nitrile oxide-C at C-5)", "4-substituted isoxazoline", "3-substituted isoxazoline (nitrile oxide-C at C-3)", "Both isomers in equal parts"], correct: 0, explanation: "FMO control: HOMO of nitrile oxide and LUMO of alkene. The largest HOMO coefficient is at the nitrile oxide C (terminal), the largest LUMO coefficient at the β-C of the alkene → 5-substituted isoxazoline preferred." },
    { id: "q3", question: "What happens in the Diels-Alder reaction of oxazole with an alkyne (Kondrat'eva)?", options: ["Direct addition without any intermediate", "Cycloaddition, then retro-[4+2] with loss of CO₂", "Nucleophilic aromatic substitution at the oxazole", "Ring opening of the oxazole, then recyclisation"], correct: 1, explanation: "The oxazole acts as the 4π azadiene and the alkyne as the 2π dienophile. The bridged bicycle that forms is never isolated: it fragments thermally, expelling CO₂ and leaving an aromatic pyridine. Gas evolution plus aromatisation make that second step irreversible." },
    { id: "q4", question: "A furan ring in a product points retrosynthetically to which reaction?", options: ["A [4+2] cycloaddition with an azadiene", "A [3+2] with a nitrile oxide or azide", "A Paal-Knorr synthesis from a 1,4-dicarbonyl", "A nucleophilic aromatic substitution"], correct: 2, explanation: "A furan carries one oxygen and no nitrogen, which rules out the nitrogen-delivering dipoles. Substituents at C-2 and C-5 are the signature of a 1,4-dicarbonyl closed under acid. As a rule: count the heteroatoms first, then ask which building block could have brought them in." },
    { id: "q5", question: "Which reaction gives a dihydropyridinone from a 1-azadiene and a dienophile?", options: ["[2+2]", "[4+2]", "[3+2]", "[2+2+2]"], correct: 1, explanation: "[4+2] Diels-Alder: 1-azadiene (4π) + dienophile (2π) → 6-membered N-containing product (dihydropyridine or, after oxidation, pyridine)." },
    { id: "q6", question: "A nitrile oxide reacts once with an alkyne and once with an alkene. How do the products differ?", options: ["The alkyne gives the aromatic isoxazole, the alkene the isoxazoline", "Both give exactly the same product", "The alkene gives a six-membered ring instead", "Only the alkene reacts; alkynes are too unreactive as dipolarophiles"], correct: 0, explanation: "The dipole decides which heteroatoms enter the ring; the dipolarophile decides how saturated it ends up. An alkyne leaves the ring fully unsaturated and therefore aromatic, an alkene leaves one bond more saturated. The same rule holds for every 1,3-dipole: azide plus alkyne gives a triazole, azide plus alkene a triazoline." },
  ],
  flashcards: [
    { id: "1icba6a", front: "Huisgen 1,3-Dipolar Cycloaddition", back: "[3+2]: 1,3-dipole + dipolarophile → 5-membered ring. Thermally: mixture. Cu-catalysed (CuAAC): regioselective 1,4-triazole. Important dipoles: azides, nitrile oxides, nitrones, nitrilimines." },
    { id: "11ru87j", front: "Kondrat'eva Synthesis", back: "Oxazole (azadiene) + alkyne → [4+2] → bicyclus → −CO₂ → pyridine. Azadienes: compounds with C=N or N=N as part of the 4π system." },
    { id: "0adoh5e", front: "Retrosynthesis 5-membered ring", back: "5-ring → find 1,3-dipole (azide, nitrile oxide, nitrone) + dipolarophile (alkyne/alkene). Cut at the 1,2-bond pair and the 4,5-bond pair." },
    { id: "0i3pq53", front: "Retrosynthesis 6-membered ring", back: "6-ring → diene [4C or 3C+N] + dienophile [2C or 1C+heteroatom]. Cut the 1,6- and 3,4-bonds (product bonds in DA)." },
    { id: "1xgxlfr", front: "Nitrile oxide as 1,3-dipole", back: "R-C≡N⁺-O⁻ ↔ R-C=N=O. Allene structure. Reaction with alkyne → isoxazole. With alkene → isoxazoline. Preparation: hydroxamic acid + base or chloroxime + base." },
    { id: "1rhpkuz", front: "Wo das 1,3-Dipol herkommt", back: "Ein Nitriloxid entsteht in situ aus einem Hydroximoylchlorid: eine Base nimmt das Proton der Oximgruppe ab, und Chlorid tritt aus. Dipole dieser Art sind meist zu reaktiv, um sie zu isolieren — sie werden im selben Kolben erzeugt und sofort abgefangen." },
  ],
} satisfies Thema;
