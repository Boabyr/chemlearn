import type { Thema } from '../../../content/schema'

export const topic = {
  id: "03-five-ring-one-heteroatom",
  title: "5-Membered Heteroaromatics (1 Heteroatom)",
  subtitle: "Pyrrole, Furan & Thiophene",
  icon: "🟡",
  estimatedMinutes: 75,
  theory: `



## Overview: Pyrrole, Furan, Thiophene

All three are 5-membered aromatic heterocycles with **6 π electrons**:
- 4 electrons from 2 C=C double bonds
- 2 electrons from the heteroatom lone pair

| Property | Pyrrole | Furan | Thiophene |
|---|---|---|---|
| Heteroatom | N | O | S |
| pKa (N-H acidity) | 17.5 (N-H acidic!) | – | – |
| Aromaticity | high | medium | high |
| SEAr reactivity | very high | high | high |
| Preferred position | C-2 (α) | C-2 (α) | C-2 (α) |

## Electronic Properties

The heteroatom lone pair is incorporated into the π system in all three compounds:
- → System is **electron-rich** → activated for SEAr
- → **Not basic** (lone pair not available for protonation – would destroy aromaticity)
- **Pyrrole**: N-H is acidic! (pKa 17.5) → deprotonatable with strong bases → pyrrolide anion aromatic and stable

## Reactivity: SEAr

All three react more readily than benzene with electrophiles.

**Regioselectivity: always position C-2 (α) preferred!**

**Rationale via resonance structures:**
- Attack at C-2: 3 resonance structures for arenium ion, including one where the **heteroatom is positively charged**
- Attack at C-3: only 2 resonance structures → less stabilised

**Exception:** When C-2 is blocked → reaction at C-3

**Concrete examples:**
- Indole + Br⁺ → bromination at C-3 of the pyrrole ring → 3-bromoindole
- Furan + Br⁺ → 2-bromofuran
- Thiophene + Br⁺ → 2-bromothiophene

## Synthesis of Pyrrole Derivatives

### Paal-Knorr Synthesis:
1,4-Dicarbonyl compound + NH₃ (or primary amine) → pyrrole
Mechanism: double condensation (2× imine formation) + cyclisation + dehydration

### Knorr Pyrrole Synthesis:
α-Aminoketone + β-ketoester → pyrrole (classical)

## Synthesis of Furan Derivatives

### Paal-Knorr Synthesis (O variant):
1,4-Dicarbonyl compound + H⁺ (Lewis acid) → furan
Mechanism: double condensation (hemi-acetal) + cyclisation + dehydration

## Synthesis of Thiophene Derivatives

### Paal-Knorr (S variant):
1,4-Dicarbonyl compound + P₄S₁₀ or H₂S/H⁺ → thiophene

## Special Features

### Indole (benzo[b]pyrrole):
- Bicyclic aromatic: benzene + pyrrole fused
- C-3 is the most reactive position for SEAr (not C-2!)
  → Rationale: attack at C-3 gives arenium ion delocalised onto benzene ring and N; aromaticity of benzene ring is preserved

### Benzofuran, Benzothiophene:
- Analogous to indole, but with O or S
- SEAr preferred at C-2 of the 5-membered ring part — unlike indole, because there is no
  N–H whose lone pair could stabilise the C-3 adduct as effectively

## One Synthesis, Three Rings

The Paal-Knorr syntheses of pyrrole, furan and thiophene are the same reaction with three
different reagents on the same 1,4-dicarbonyl:

| Target | Reagent | Leaves |
|---|---|---|
| Pyrrole | NH₃ or R-NH₂ | 2 H₂O |
| Furan | acid (H⁺) | 1 H₂O |
| Thiophene | P₄S₁₀ or H₂S/H⁺ | H₂O / oxygen exchanged for sulfur |

Worth remembering as one disconnection rather than three: a five-membered aromatic
heterocycle with substituents at C-2 and C-5 almost always comes from a 1,4-dicarbonyl.
The heteroatom simply says which reagent was used.

## Acidity and Basicity at a Glance

- **Pyrrole is an acid, not a base** (pKa 17.5 for the N–H). The lone pair is in the ring
  and unavailable; what is available is the proton on nitrogen.
- **Furan and thiophene are neither.** Oxygen and sulfur keep a second lone pair in the
  ring plane, but protonating it would still cost aromaticity.
- Deprotonating pyrrole gives the **pyrrolide anion**, which is aromatic, stable and a
  good nucleophile at nitrogen — the entry point to N-substituted pyrroles.



`,
  interactive: {
    type: "mechanism",
    title: "SEAr on pyrrole — why C-2 wins",
    description: "Pyrrol ist elektronenreich und reagiert bereitwillig mit Elektrophilen. Zeichne den Angriff und die Rückkehr zur Aromatizität.",
    stages: [
      {
        id: 0, titel: "Angriff der π-Bindung",
        aufgabe: "Zeichne den Pfeil von der C2=C3-Bindung zum Bromkation.",
        erklaerung: "Der Nucleophil ist hier der Ring selbst — deshalb beginnt der Pfeil an der π-Bindung, nicht am Stickstoff. C-2 wird bevorzugt, weil das entstehende Areniumion drei Grenzstrukturen hat, darunter eine mit der positiven Ladung am Stickstoff, wo jedes Atom ein volles Oktett behält. Ein Angriff an C-3 böte nur zwei.",
        hinweise: ["Wer greift an? Nicht der Stickstoff, sondern die Doppelbindung zwischen C-2 und C-3.", "Zähle für beide Angriffsstellen die Grenzstrukturen des Kations — die Stelle mit mehr gewinnt."],
        atome: [
          { id: "n1", element: "N", x: 150, y: 220, wasserstoffe: 1 },
          { id: "c2", element: "C", x: 202, y: 182 },
          { id: "c3", element: "C", x: 182, y: 121 },
          { id: "c4", element: "C", x: 118, y: 121 },
          { id: "c5", element: "C", x: 98, y: 182 },
          { id: "br", element: "Br", x: 350, y: 150, ladung: 1, frei: true },
        ],
        bindungen: [
          { id: "p1", von: "n1", nach: "c2", ordnung: 1 },
          { id: "p2", von: "c2", nach: "c3", ordnung: 2 },
          { id: "p3", von: "c3", nach: "c4", ordnung: 1 },
          { id: "p4", von: "c4", nach: "c5", ordnung: 2 },
          { id: "p5", von: "c5", nach: "n1", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "bindung", id: "p2" }, nach: { art: "atom", id: "br" } },
        ],
      },
      {
        id: 1, titel: "Rearomatisierung",
        aufgabe: "Eine Base nimmt das Proton von C-2 ab. Zeichne beide Pfeile: das freie Elektronenpaar der Base zum Wasserstoff, und die C2–H-Bindung in den Ring.",
        erklaerung: "Das Areniumion ist nicht das Produkt — an C-2 sitzt jetzt ein sp³-Kohlenstoff, der Ring hat sein Sextett verloren, und die positive Ladung liegt am Stickstoff. Die Deprotonierung kostet fast nichts gegenüber der zurückgewonnenen Aromatizität. Deshalb ist die Substitution und nicht die Addition das Ergebnis.",
        hinweise: ["Am Ende muss C-2 wieder drei Bindungen im Ring haben — der Wasserstoff ist einer zu viel.", "Das Elektronenpaar der C–H-Bindung wandert nicht zur Base, sondern in den Ring."],
        atome: [
          { id: "n1", element: "N", x: 150, y: 220, ladung: 1, wasserstoffe: 1 },
          { id: "c2", element: "C", x: 202, y: 182 },
          { id: "c3", element: "C", x: 182, y: 121 },
          { id: "c4", element: "C", x: 118, y: 121 },
          { id: "c5", element: "C", x: 98, y: 182 },
          { id: "br", element: "Br", x: 268, y: 205 },
          { id: "h2", element: "H", x: 250, y: 145 },
          { id: "base", element: "N", x: 370, y: 90, ladung: -1, freiePaare: 2, wasserstoffe: 2, frei: true },
        ],
        bindungen: [
          { id: "p1", von: "n1", nach: "c2", ordnung: 1 },
          { id: "p2", von: "c2", nach: "c3", ordnung: 1 },
          { id: "p3", von: "c3", nach: "c4", ordnung: 2 },
          { id: "p4", von: "c4", nach: "c5", ordnung: 1 },
          { id: "p5", von: "c5", nach: "n1", ordnung: 2 },
          { id: "cbr", von: "c2", nach: "br", ordnung: 1 },
          { id: "ch", von: "c2", nach: "h2", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "base" }, nach: { art: "atom", id: "h2" } },
          { von: { art: "bindung", id: "ch" }, nach: { art: "bindung", id: "p2" } },
        ],
      },
    ],
    ergebnis: {
      titel: "2-Brompyrrol",
      beschreibung: "Das Brom sitzt an C-2, der Ring ist wieder aromatisch. Substitution, nicht Addition.",
      atome: [
        { id: "n1", element: "N", x: 150, y: 220, wasserstoffe: 1 },
        { id: "c2", element: "C", x: 202, y: 182 },
        { id: "c3", element: "C", x: 182, y: 121 },
        { id: "c4", element: "C", x: 118, y: 121 },
        { id: "c5", element: "C", x: 98, y: 182 },
        { id: "br", element: "Br", x: 268, y: 205 },
      ],
      bindungen: [
        { id: "p1", von: "n1", nach: "c2", ordnung: 1 },
        { id: "p2", von: "c2", nach: "c3", ordnung: 2 },
        { id: "p3", von: "c3", nach: "c4", ordnung: 1 },
        { id: "p4", von: "c4", nach: "c5", ordnung: 2 },
        { id: "p5", von: "c5", nach: "n1", ordnung: 1 },
        { id: "cbr", von: "c2", nach: "br", ordnung: 1 },
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Why does indole react preferentially at C-3 rather than C-2 in electrophilic aromatic substitution?", options: ["C-2 is sterically hindered", "Attack at C-3 gives an arenium ion that can be delocalised onto the benzene ring and N – aromaticity of the benzene ring is preserved", "C-3 has higher π electron density in the ground state", "N stabilises the transition state at C-3 by inversion"], correct: 1, explanation: "Attack at C-3: the arenium ion can be delocalised onto N WITHOUT disturbing the aromaticity of the benzene ring. Attack at C-2 would require the charge to be transferred to the benzene ring → loss of benzene aromaticity → energetically unfavourable." },
    { id: "q2", question: "Which compound is formed in the Paal-Knorr synthesis from a 1,4-dicarbonyl with a primary amine?", options: ["Furan", "Pyrrole", "Thiophene", "Pyridine"], correct: 1, explanation: "The Paal-Knorr synthesis gives N-substituted pyrroles from 1,4-dicarbonyl compounds + primary amine (R-NH₂). With NH₃ → NH-pyrrole, with H₂O/H⁺ → furan, with H₂S/H⁺ or P₄S₁₀ → thiophene." },
    { id: "q3", question: "What property fundamentally distinguishes pyrrole from pyridine regarding the N-H bond?", options: ["Pyrrole has no N-H", "Pyrrole N-H is acidic (pKa 17.5) and can be deprotonated, since the pyrrolide anion is aromatic", "Pyrrole N-H is strongly basic", "Pyrrole N-H cannot be deprotonated"], correct: 1, explanation: "Pyrrole N-H is acidic (pKa ~17.5) because the resulting pyrrolide anion is aromatic (6 π e⁻). Deprotonation with strong bases (NaH, BuLi) is possible → N-metalation → further reaction with electrophiles." },
    { id: "q4", question: "Furan + Br⁺: at which position does bromination preferentially occur?", options: ["C-2", "C-3", "C-4", "O atom"], correct: 0, explanation: "Furan is brominated preferentially at C-2 (α position). Attack at C-2 gives 3 resonance structures for the arenium ion (including one with O⁺); attack at C-3 gives only 2 → C-2 energetically favoured." },
    { id: "q5", question: "Which heteroaromatic is most strongly activated for SEAr (most reactive)?", options: ["Benzene", "Thiophene", "Pyrrole", "Furan"], correct: 2, explanation: "Pyrrole is most reactive for SEAr. The N atom is less electronegative than O or S, so the lone pair in pyrrole-N is more strongly donated into the ring → highest π electron density → highest HOMO." },
    { id: "q6", question: "Which mechanism explains the α selectivity (C-2) in SEAr of furan?", options: ["C-2 is more sterically accessible", "Attack at C-2 gives more resonance structures for the arenium ion than attack at C-3", "The O atom stabilises C-2 inductively", "C-2 has a lower LUMO contribution"], correct: 1, explanation: "Attack at C-2: 3 resonance structures (incl. one with O⁺). Attack at C-3: only 2 resonance structures. More resonance = more stable arenium ion = lower activation energy → C-2 preferred (kinetic control)." },
  ],
  flashcards: [
    { id: "057rsia", front: "Paal-Knorr Synthesis", back: "1,4-Dicarbonyl + NH₃/RNH₂ → pyrrole. 1,4-Dicarbonyl + H⁺ → furan. 1,4-Dicarbonyl + H₂S/P₄S₁₀ → thiophene. Mechanism: double condensation + cyclisation + dehydration." },
    { id: "03q12nj", front: "α Selectivity in 5-Membered Heteroaromatics", back: "Pyrrole, furan and thiophene react preferentially at C-2 (α position) with electrophiles. Reason: more resonance structures for arenium ion at α attack than at β attack (C-3)." },
    { id: "0y0jy5n", front: "Indole – SEAr Regioselectivity", back: "C-3 (not C-2!) is preferred. At C-3 attack benzene aromaticity is preserved, charge is delocalised onto N. At C-2 attack the charge would have to be on the benzene ring." },
    { id: "0raujxk", front: "Pyrrole: Acidity vs. Basicity", back: "Not basic (LP in π system). BUT: N-H is acidic! pKa = 17.5. Pyrrolide anion is aromatic → stable. Deprotonation with NaH, BuLi possible → N-metalation." },
    { id: "0w17y2c", front: "Furan vs. Pyrrole vs. Thiophene – Reactivity Series", back: "Pyrrole > Furan > Thiophene > Benzene for SEAr reactivity. Reason: N (least electronegative) donates lone pair most strongly → highest HOMO in pyrrole." },
    { id: "1o6094w", front: "Knorr Pyrrole Synthesis", back: "α-Aminoketone + β-ketoester → pyrrole. Classical method for synthesis of 2,3,4,5-substituted pyrroles (e.g. for porphyrin precursors)." },
  ],
} satisfies Thema;
