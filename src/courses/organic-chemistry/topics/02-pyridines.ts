import type { Thema } from '../../../content/schema'

export const topic = {
  id: "02-pyridines",
  title: "Pyridines",
  subtitle: "Synthesis & Reactivity",
  icon: "🔵",
  estimatedMinutes: 90,
  theory: `
## Importance of Pyridines in Pharmacy

Pyridine scaffolds appear in numerous FDA-approved drugs. The ring is weakly basic
(pKa 5.2 for pyridinium), water-soluble and metabolically robust, which is why it is
one of the most common replacements for benzene in lead optimisation.

## I. Synthesis of Pyridine Derivatives

### A. Cyclocondensation [3+3] – Hantzsch Dihydropyridine Synthesis
**Reagents:** Enamine + 1,3-dicarbonyl compound (or aldehyde + β-ketoester + NH₃)
The primary product is a 1,4-dihydropyridine; an oxidation step (HNO₃, DDQ, air) gives
the aromatic pyridine.

**Problem:** With unsymmetrical enamines + unsymmetrical 1,3-dicarbonyls, two
regioisomers form (P1 + P2).

**Solution for regioselectivity:**
- Use a pre-synthesised enamine with defined regiochemistry
- Or: direct the reaction via conjugate addition–conjugate elimination

**Important [3+3]-type reactions:**
- **Guareschi-Thorpe reaction:** Cyanoacetyl derivatives + 1,3-dicarbonyl → 2-pyridinone
- **Bohlmann-Rahtz reaction:** Enaminone + β-ketoester → pyridine

### B. Cyclocondensation [5+1]
Reaction of a 1,5-dicarbonyl compound with NH₃ → pyridine (after oxidation).
The nitrogen is the single atom; the five carbons come pre-assembled.

### C. Cyclocondensation [3+2+1] – Kröhnke Reaction
**Reagents:** α-bromoketone + pyridine, then an α,β-unsaturated ketone and NH₄OAc.

**Mechanism:**
1. Pyridine alkylates the α-bromoketone → pyridinium salt
2. Deprotonation at the α-carbon → pyridinium ylide
3. Michael addition of the ylide to the enone
4. Ammonia (from NH₄OAc) condenses with both carbonyls → ring closure
5. Pyridine is expelled as the leaving group, aromatisation gives the product

Pyridine is used twice here: first as a nucleophile to activate the bromoketone, then
as the leaving group. That is what makes the reaction regiochemically clean — the
three fragments can only combine in one way.

### D. Cyclocondensation [2+2+1+1]
Combination of various building blocks for functionalised pyridines

### E. Cycloaddition [4+2] – Diels-Alder type reactions
**Azadiene + dienophile:**
- **Boger reaction:** 1,2,4-triazine as azadiene + enamine (retro-DA eliminates N₂)
- **Kondrat'eva pyridine synthesis:** Oxazole as azadiene + dienophile → pyridine

**Kondrat'eva mechanism:**
1. [4+2] cycloaddition of oxazole (as 1-oxa-1,3-butadiene) with alkyne
2. Bicyclic intermediate (7-oxabicyclo[2.2.1] system)
3. Retro-[4+2]: elimination of CO₂
4. Aromatic pyridine as product

### F. Cycloaddition [2+2+2]
**Bönnemann-Reppe synthesis:** Trimerisation of a nitrile with two equivalents of alkyne (cobalt catalysis)

### G. Rearrangements
**Ciamician-Dennstedt rearrangement:** Pyrrole + dihalocarbene (:CCl₂ or :CBr₂,
generated from CHCl₃/CHBr₃ with strong base) → 3-halopyridine.
The carbene adds across a C=C bond of the pyrrole; the resulting cyclopropane-fused
bicycle opens and expands the five-membered ring to a six-membered one.

## II. Reactivity of Pyridines

### Electrophilic Aromatic Substitution (SEAr)
Pyridine is **deactivated** toward SEAr (N withdraws electron density):
- Reaction very slow, requires harsh conditions
- Preferred position: **C-3** (meta-like to N)
- Attack at C-2 or C-4 would place positive charge on the electronegative nitrogen
- Bromination only possible under drastic conditions

### Nucleophilic Aromatic Substitution (SNAr)
Pyridine is **activated** toward SNAr:
- Preferred positions: **C-2 and C-4** (the anionic intermediate delocalises onto N)
- Important reactions:
  - **Chichibabin reaction:** Pyridine + NaNH₂ → 2-aminopyridine, with loss of hydride
  - **Meisenheimer complex** as intermediate

### N-Oxidation
Pyridine + mCPBA → pyridine N-oxide
- N-oxides: activation for SEAr (position 4) and SNAr — the oxide can donate and
  withdraw electron density, so both reaction types become accessible
- **Boekelheide rearrangement:** N-oxide + Ac₂O, Δ → 2-(acetoxymethyl)pyridine

### Side-chain reactions
2-Methylpyridine: α-methylene strongly acidic (analogous to ketones), because the
resulting carbanion is delocalised onto the ring nitrogen
- Lithiation possible → further reaction with electrophiles
`,
  interactives: [
    {
      type: "mechanism",
      title: "Chichibabin amination — nucleophilic attack on pyridine",
      description: "Pyridin ist elektronenarm und lässt Nucleophile an sich heran. Zeichne, warum der Angriff an C-2 gelingt und wie der Ring wieder aromatisch wird.",
      stages: [
        {
          id: 0,
          titel: "Angriff des Amids an C-2",
          aufgabe: "Das Amid-Ion greift C-2 an. Zeichne beide Pfeile: das freie Elektronenpaar des Amids zum Kohlenstoff, und die C2=N1-Bindung zum Stickstoff.",
          erklaerung: "Der Angriff an C-2 lohnt sich, weil die negative Ladung im entstehenden Addukt auf dem Stickstoff landen kann — dem elektronegativsten Ringatom. Bei einem Angriff an C-3 gäbe es diese Grenzstruktur nicht. Genau umgekehrt zur elektrophilen Substitution, wo C-3 bevorzugt wird.",
          hinweise: [
            "Wenn eine neue Bindung an C-2 entsteht, muss dort eine alte weichen — sonst hätte der Kohlenstoff fünf Bindungen.",
            "Schiebe die Elektronen dorthin, wo die negative Ladung am besten aufgehoben ist."
          ],
          atome: [
            {
              id: "n1",
              element: "N",
              x: 72,
              y: 132
            },
            {
              id: "c2",
              element: "C",
              x: 120,
              y: 105
            },
            {
              id: "c3",
              element: "C",
              x: 168,
              y: 132
            },
            {
              id: "c4",
              element: "C",
              x: 168,
              y: 188
            },
            {
              id: "c5",
              element: "C",
              x: 120,
              y: 215
            },
            {
              id: "c6",
              element: "C",
              x: 72,
              y: 188
            },
            {
              id: "nh",
              element: "N",
              x: 300,
              y: 70,
              ladung: -1,
              freiePaare: 2,
              wasserstoffe: 2,
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
            }
          ],
          pfeile: [
            {
              von: {
                art: "freiesPaar",
                id: "nh"
              },
              nach: {
                art: "atom",
                id: "c2"
              }
            },
            {
              von: {
                art: "bindung",
                id: "r1"
              },
              nach: {
                art: "atom",
                id: "n1"
              }
            }
          ]
        },
        {
          id: 1,
          titel: "Rearomatisierung",
          aufgabe: "Das Addukt gibt ein Hydrid ab und wird wieder aromatisch. Zeichne den Pfeil von der C2–H-Bindung zur C2–N1-Bindung.",
          erklaerung: "Das Elektronenpaar der C–H-Bindung klappt in den Ring und stellt die Doppelbindung zum Stickstoff wieder her; der Wasserstoff geht als Hydrid weg und entwickelt mit dem Lösungsmittel Wasserstoffgas. Diese Gasentwicklung treibt die Reaktion und ist im Kolben sichtbar.",
          hinweise: [
            "Aromatizität ist der Preis, den die Reaktion zurückgewinnen will — die Elektronen müssen in den Ring.",
            "Ein Pfeil, der auf eine Bindung zeigt, macht aus einer Einfach- eine Doppelbindung."
          ],
          atome: [
            {
              id: "n1",
              element: "N",
              x: 72,
              y: 132,
              ladung: -1,
              freiePaare: 2
            },
            {
              id: "c2",
              element: "C",
              x: 120,
              y: 105
            },
            {
              id: "c3",
              element: "C",
              x: 168,
              y: 132
            },
            {
              id: "c4",
              element: "C",
              x: 168,
              y: 188
            },
            {
              id: "c5",
              element: "C",
              x: 120,
              y: 215
            },
            {
              id: "c6",
              element: "C",
              x: 72,
              y: 188
            },
            {
              id: "nh",
              element: "N",
              x: 190,
              y: 60,
              wasserstoffe: 2
            },
            {
              id: "h2",
              element: "H",
              x: 90,
              y: 55
            }
          ],
          bindungen: [
            {
              id: "r1",
              von: "n1",
              nach: "c2",
              ordnung: 1
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
              id: "cn",
              von: "c2",
              nach: "nh",
              ordnung: 1
            },
            {
              id: "ch",
              von: "c2",
              nach: "h2",
              ordnung: 1
            }
          ],
          pfeile: [
            {
              von: {
                art: "bindung",
                id: "ch"
              },
              nach: {
                art: "bindung",
                id: "r1"
              }
            }
          ]
        }
      ],
      ergebnis: {
        titel: "2-Aminopyridin",
        beschreibung: "Der Ring ist wieder aromatisch, die Aminogruppe sitzt an C-2. Das abgespaltene Hydrid entweicht als Wasserstoff.",
        atome: [
          {
            id: "n1",
            element: "N",
            x: 100,
            y: 132,
            freiePaare: 1
          },
          {
            id: "c2",
            element: "C",
            x: 148,
            y: 105
          },
          {
            id: "c3",
            element: "C",
            x: 196,
            y: 132
          },
          {
            id: "c4",
            element: "C",
            x: 196,
            y: 188
          },
          {
            id: "c5",
            element: "C",
            x: 148,
            y: 215
          },
          {
            id: "c6",
            element: "C",
            x: 100,
            y: 188
          },
          {
            id: "nh",
            element: "N",
            x: 218,
            y: 60,
            freiePaare: 1,
            wasserstoffe: 2
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
            id: "cn",
            von: "c2",
            nach: "nh",
            ordnung: 1
          }
        ]
      }
    },
  ],
  quiz: [
    { id: "q1", question: "In the Kondrat'eva pyridine synthesis, which compound acts as the azadiene?", options: ["Triazine", "Oxazole", "Pyrimidine", "Imidazole"], correct: 1, explanation: "In the Kondrat'eva synthesis the oxazole acts as a 1-oxa-1,3-diene (azadiene). It reacts with a dienophile (alkyne) in a [4+2] cycloaddition. The bicyclic intermediate then loses CO₂ (retro-[4+2]) to give the aromatic pyridine." },
    { id: "q2", question: "In the Kröhnke synthesis, pyridine plays two roles. Which?", options: ["It serves as solvent and as base","It acts as oxidant and as catalyst","It first alkylates the α-bromoketone, then leaves again","It supplies the ring nitrogen atom of the pyridine product"], correct: 2, explanation: "Pyridine attacks the α-bromoketone and becomes a pyridinium salt whose α-CH is acidic — that gives the ylide. After Michael addition and ring closure, pyridine departs as the leaving group. The ring nitrogen comes from the ammonium acetate, not from the pyridine. Because only one combination of the three fragments is possible, the reaction is regiochemically clean." },
    { id: "q3", question: "What is special about the Boger reaction for pyridine synthesis?", options: ["Two alkyne molecules and a nitrile trimerise under cobalt catalysis to a pyridine","A pyrrole rearranges via cyclopropane to a pyridine","A 1,5-dicarbonyl reacts with NH₃","A triazine reacts as azadiene with an enamine; N₂ is eliminated retro-[4+2]"], correct: 3, explanation: "In the Boger reaction a triazine acts as aza-diene and reacts with an electron-rich dienophile (e.g. enamine) in a [4+2] cycloaddition. The bicyclic intermediate collapses immediately with loss of N₂ (retro-DA, XY = N₂) to give the substituted pyridine." },
    { id: "q4", question: "What is the Chichibabin reaction?", options: ["Nucleophilic amination of pyridine with NaNH₂ → 2-aminopyridine","Bromination of pyridine at C-3","Oxidation of pyridine to the N-oxide","Cycloaddition of pyridine with electron-poor dienophiles under heat"], correct: 0, explanation: "The Chichibabin reaction is a nucleophilic aromatic substitution: pyridine + NaNH₂ → 2-aminopyridine + NaH. The amide anion attacks C-2 nucleophilically (ortho to N, activated). The Meisenheimer complex is the intermediate." },
    { id: "q5", question: "The Boekelheide rearrangement of pyridine N-oxide with Ac₂O (Δ) gives…", options: ["4-Acetoxypyridine","2-(Acetoxymethyl)pyridine","Pyridine-2-carboxylic acid","N-Acetylpyridine"], correct: 1, explanation: "In the Boekelheide rearrangement a 2-methylpyridine N-oxide reacts with Ac₂O under heat. The acetate migrates from the activated O to the benzylic C of the methyl group → 2-(acetoxymethyl)pyridine. Useful for functionalising the 2-position." },
    { id: "q6", question: "Why are the 2- and 4-positions of pyridine preferred for SNAr?", options: ["π electron density is highest at those positions","Reactions under thermodynamic control always occur at those positions","Nitrogen stabilises the anionic Meisenheimer complex from there","The N atom acts as a σ-donor at those positions"], correct: 2, explanation: "In SNAr at C-2 or C-4 of pyridine the negative charge of the Meisenheimer complex can be directly delocalised onto the electron-deficient N atom → stabilisation → lower activation energy. At C-3 this delocalisation is not possible." },
    { id: "q7", question: "Why does a pyridine N-oxide activate the ring for both SEAr and SNAr?", options: ["Because the oxide forces the ring into a strictly planar geometry","Because it removes nitrogen from the ring","Because it destroys the aromatic system","Because the oxide can both donate and withdraw density"], correct: 3, explanation: "The N-oxide is a resonance hybrid. In one structure the negatively charged oxygen pushes density into the ring, which activates position 4 towards electrophiles. In another the positively charged nitrogen pulls density out, which activates the ring towards nucleophiles. That is why the N-oxide is the standard detour when pyridine itself is too unreactive." },
  ],
  flashcards: [
    { id: "02lwqyt", front: "Kondrat'eva Pyridine Synthesis", back: "[4+2] cycloaddition: oxazole (as azadiene) + dienophile (alkyne) → bicyclic intermediate → −CO₂ (retro-[4+2]) → pyridine. Oxazole serves as 1-oxa-1,3-diene." },
    { id: "1cv4imb", front: "Boger Reaction", back: "Triazine (azadiene) + enamine (dienophile) → [4+2] cycloaddition → intermediate loses N₂ (retro-DA) → substituted pyridine. Key feature: XY = N₂ is eliminated." },
    { id: "1uvjmpz", front: "Kröhnke Reaction", back: "[3+2+1] cyclocondensation: 1,5-dicarbonyl compound + NH₃ → pyridine. Mechanism: aldol → Michael → cyclisation → aromatisation." },
    { id: "1yj82fg", front: "Chichibabin Reaction", back: "Pyridine + NaNH₂ → 2-aminopyridine + NaH. SNAr at C-2 (activated by N). Meisenheimer complex as intermediate. Classic method for amination." },
    { id: "08mcu70", front: "Guareschi-Thorpe Reaction", back: "[3+3] cyclocondensation: cyanoacetamide/cyanoacetyl derivative + 1,3-dicarbonyl (+ NH₃) → 2-pyridinone with CN group. Formation of cyanopyridones." },
    { id: "1k1pd51", front: "Bönnemann-Reppe Synthesis", back: "[2+2+2] cycloaddition: 1 nitrile + 2 alkynes, cobalt catalysis → pyridine. Trimerisation under metal-catalysed conditions." },
    { id: "1nr4uj3", front: "Boekelheide Rearrangement", back: "2-Methylpyridine N-oxide + Ac₂O, Δ → 2-(acetoxymethyl)pyridine. [1,2]-O→C acyl migration. Useful for introducing functionality at the 2-methyl group." },
    { id: "0ab3tka", front: "SEAr vs. SNAr at Pyridine", back: "SEAr: very slow, deactivated, preferred C-3. SNAr: activated at C-2 and C-4 (Meisenheimer complex delocalised onto N). Pyridine prefers SNAr!" },
  ],
} satisfies Thema;
