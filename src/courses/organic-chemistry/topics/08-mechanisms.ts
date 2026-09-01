import type { Thema } from '../../../content/schema'

export const topic = {
  id: "08-mechanisms",
  title: "Reaction Mechanisms",
  subtitle: "Detailed Mechanisms of Selected Transformations",
  icon: "🔬",
  estimatedMinutes: 90,
  theory: `



## Overview: Exam-Relevant Mechanisms

The following mechanisms are tested in exercises and the exam.
Each mechanism must be represented with correct electron-flow arrows (curly arrows).

## 1. Kondrat'eva Pyridine Synthesis (Oxazole + Alkyne)

**Reaction:** Oxazole + DMAD (or other alkyne) → pyridine

**Steps:**
1. **[4+2] cycloaddition:** Oxazole (azadiene, 4π) + alkyne (2π) → bicyclic intermediate (7-oxabicyclo[2.2.1]heptadiene system)
2. **Retro-[4+2]:** Thermal cleavage with CO₂ loss → aromatic pyridine
**Driving force:** Aromatisation + entropy gain (CO₂ gas)

## 2. Boger Reaction (Azine + Enamine, with loss of N₂)

Two azines are used here, and they give **different rings**. Keeping them apart is the
whole point of the section.

**a) 1,2,4-Triazine + enamine → pyridine + N₂**
1. **[4+2] cycloaddition:** the triazine acts as azadiene (4π), the enamine as
   dienophile (2π) → bridged bicycle
2. **Retro-[4+2]:** N₂ leaves (analogous to CO₂ in Kondrat'eva) → dihydropyridine
3. **Elimination of the amine** from the enamine + aromatisation → pyridine

**b) 1,2,4,5-Tetrazine + alkene or alkyne → pyridazine + N₂**
1. **[4+2] cycloaddition** onto the tetrazine
2. **Retro-[4+2]:** N₂ leaves → 4,5-dihydropyridazine
3. **Oxidation/tautomerisation** → aromatic **pyridazine** — two nitrogens stay in the
   ring, because the tetrazine brought four and only two leave as N₂

Counting nitrogens is the quickest check: triazine has three, one pair leaves as N₂, one
remains → pyridine. Tetrazine has four, one pair leaves → pyridazine.

## 3. Paal-Knorr Mechanism (1,4-Dicarbonyl → Pyrrole)

**Detailed mechanism:**
1. Protonation of a carbonyl → oxocarbenium
2. Nucleophilic attack of NH₂ → hemiaminal
3. Dehydration → imine (first ring N)
4. Tautomerisation + cyclisation of the second amine
5. Second dehydration → dihydropyrrole
6. Tautomerisation → pyrrole (aromatic!)

## 4. Kröhnke Reaction Mechanism

**Steps:**
1. α-Bromoketone + pyridine → pyridinium ylide (zwitterion)
2. Michael addition of ylide to α,β-unsaturated carbonyl → Michael adduct
3. Addition of NH₄OAc → intramolecular aldol cyclisation
4. Dehydration + oxidation → aromatic pyridine

## 5. N-Oxidation + Boekelheide Rearrangement

**Steps:**
1. 2-Methylpyridine + mCPBA → 2-methylpyridine N-oxide (peracid oxidises N)
2. + Ac₂O, Δ → [1,2]-acyl migration: O-acylation + [1,2]-shift onto CH₃ → 2-(acetoxymethyl)pyridine
3. Alternative: electrophilic amination possible at activated 4-position

## 6. N-oxide Chemistry Summary

N-oxides can be:
a) More electrophilic at C-4 (SNAr activated)
b) Boekelheide precursor: + Ac₂O, Δ → 2-AcOCH₂-pyridine
c) Reduced back to pyridine

## 7. Mechanism: [4+2] + Retro-[4+2]

Cycloaddition → bicyclic intermediate. Then thermal retro-[4+2] eliminates XY (CO₂, N₂, SO₂, etc.) → new aromatic compound. Driving force: aromatisation + gas evolution.

This two-step pattern is the single most reusable idea in the chapter. Whenever a synthesis
produces an aromatic ring and a gas, look for the bridged bicycle in between: it is never
isolated, but it explains where every atom came from. The bridge is always the part that
leaves — the oxygen bridge of the oxazole adduct leaves as CO₂, the N=N bridge of the
triazine and tetrazine adducts leaves as N₂.



`,
  interactive: {
    type: "mechanism",
    title: "Kröhnke pyridine synthesis — the full sequence",
    description: "Drei Schritte vom Bromketon zum Pyridinium-Ylid und zur Michael-Addition. Pyridin ist hier Reagenz, nicht Produkt.",
    stages: [
      {
        id: 0, titel: "Alkylierung des Pyridins",
        aufgabe: "Pyridin greift das α-Bromketon an. Zeichne beide Pfeile.",
        erklaerung: "Pyridin wirkt hier als Nucleophil, nicht als Base — sein Elektronenpaar liegt in der Ringebene und ist ungehindert. Der Angriff verläuft nach Sₙ2 am Kohlenstoff neben der Carbonylgruppe; Bromid geht mit dem Bindungselektronenpaar ab. Es entsteht ein Pyridiniumsalz.",
        hinweise: ["Zwei Pfeile: einer bildet die C–N-Bindung, einer schiebt das Bromid weg.", "Der Kohlenstoff darf nie fünf Bindungen haben — deshalb geht Brom im selben Zug."],
        atome: [
          { id: "n1", element: "N", x: 72, y: 132, freiePaare: 1 },
          { id: "c2", element: "C", x: 120, y: 105 },
          { id: "c3", element: "C", x: 168, y: 132 },
          { id: "c4", element: "C", x: 168, y: 188 },
          { id: "c5", element: "C", x: 120, y: 215 },
          { id: "c6", element: "C", x: 72, y: 188 },
          { id: "ca", element: "C", x: 265, y: 105 },
          { id: "br", element: "Br", x: 265, y: 45, freiePaare: 3 },
          { id: "ck", element: "C", x: 325, y: 140 },
          { id: "ok", element: "O", x: 325, y: 200, freiePaare: 2 },
          { id: "rr", element: "R", x: 385, y: 105 },
        ],
        bindungen: [
          { id: "r1", von: "n1", nach: "c2", ordnung: 2 },
          { id: "r2", von: "c2", nach: "c3", ordnung: 1 },
          { id: "r3", von: "c3", nach: "c4", ordnung: 2 },
          { id: "r4", von: "c4", nach: "c5", ordnung: 1 },
          { id: "r5", von: "c5", nach: "c6", ordnung: 2 },
          { id: "r6", von: "c6", nach: "n1", ordnung: 1 },
          { id: "cbr", von: "ca", nach: "br", ordnung: 1 },
          { id: "cc", von: "ca", nach: "ck", ordnung: 1 },
          { id: "co", von: "ck", nach: "ok", ordnung: 2 },
          { id: "cr", von: "ck", nach: "rr", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "n1" }, nach: { art: "atom", id: "ca" } },
          { von: { art: "bindung", id: "cbr" }, nach: { art: "atom", id: "br" } },
        ],
      },
      {
        id: 1, titel: "Das Ylid entsteht",
        aufgabe: "Eine Base nimmt dem α-Kohlenstoff den Wasserstoff ab. Zeichne beide Pfeile.",
        erklaerung: "Der Wasserstoff am α-Kohlenstoff ist sauer, weil die entstehende negative Ladung gleich zweifach stabilisiert wird: vom Carbonyl daneben und vom positiv geladenen Pyridiniumstickstoff. Das Ergebnis ist ein Ylid — ein Molekül mit benachbarter positiver und negativer Ladung, und genau das ist das Nucleophil für den nächsten Schritt.",
        hinweise: ["Warum ist gerade dieser Wasserstoff sauer? Schau, was rechts und links vom Kohlenstoff sitzt.", "Die Elektronen der C–H-Bindung bleiben am Kohlenstoff zurück."],
        atome: [
          { id: "n1", element: "N", x: 72, y: 132, ladung: 1 },
          { id: "c2", element: "C", x: 120, y: 105 },
          { id: "c3", element: "C", x: 168, y: 132 },
          { id: "c4", element: "C", x: 168, y: 188 },
          { id: "c5", element: "C", x: 120, y: 215 },
          { id: "c6", element: "C", x: 72, y: 188 },
          { id: "ca", element: "C", x: 140, y: 60 },
          { id: "ha", element: "H", x: 140, y: 20 },
          { id: "ck", element: "C", x: 205, y: 45 },
          { id: "ok", element: "O", x: 205, y: 100, freiePaare: 2 },
          { id: "rr", element: "R", x: 262, y: 20 },
          { id: "base", element: "O", x: 380, y: 210, ladung: -1, freiePaare: 3, wasserstoffe: 1, frei: true },
        ],
        bindungen: [
          { id: "r1", von: "n1", nach: "c2", ordnung: 2 },
          { id: "r2", von: "c2", nach: "c3", ordnung: 1 },
          { id: "r3", von: "c3", nach: "c4", ordnung: 2 },
          { id: "r4", von: "c4", nach: "c5", ordnung: 1 },
          { id: "r5", von: "c5", nach: "c6", ordnung: 2 },
          { id: "r6", von: "c6", nach: "n1", ordnung: 1 },
          { id: "nc", von: "n1", nach: "ca", ordnung: 1 },
          { id: "cha", von: "ca", nach: "ha", ordnung: 1 },
          { id: "cc", von: "ca", nach: "ck", ordnung: 1 },
          { id: "co", von: "ck", nach: "ok", ordnung: 2 },
          { id: "cr", von: "ck", nach: "rr", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "base" }, nach: { art: "atom", id: "ha" } },
          { von: { art: "bindung", id: "cha" }, nach: { art: "atom", id: "ca" } },
        ],
      },
      {
        id: 2, titel: "Michael-Addition",
        aufgabe: "Das Ylid greift den β-Kohlenstoff des Enons an. Zeichne beide Pfeile.",
        erklaerung: "Das Carbanion addiert sich an das β-Kohlenstoffatom des α,β-ungesättigten Ketons — konjugate Addition, nicht Angriff am Carbonyl. Damit stehen alle fünf Kohlenstoffatome des künftigen Pyridinrings in einer Kette. Ammoniumacetat liefert danach den Ringstickstoff, und die Oxidation zum Aromaten schließt die Synthese ab.",
        hinweise: ["Nicht das Carbonyl angreifen — beim Michael-System ist das β-Kohlenstoffatom die elektrophile Stelle.", "Die π-Elektronen der C=C-Bindung weichen zum α-Kohlenstoff aus."],
        atome: [
          { id: "n1", element: "N", x: 72, y: 132, ladung: 1 },
          { id: "c2", element: "C", x: 120, y: 105 },
          { id: "c3", element: "C", x: 168, y: 132 },
          { id: "c4", element: "C", x: 168, y: 188 },
          { id: "c5", element: "C", x: 120, y: 215 },
          { id: "c6", element: "C", x: 72, y: 188 },
          { id: "ca", element: "C", x: 140, y: 60, ladung: -1, freiePaare: 1 },
          { id: "ck", element: "C", x: 205, y: 45 },
          { id: "ok", element: "O", x: 205, y: 100, freiePaare: 2 },
          { id: "rr", element: "R", x: 262, y: 20 },
          { id: "cbeta", element: "C", x: 300, y: 150 },
          { id: "calpha", element: "C", x: 360, y: 185 },
          { id: "ckk", element: "C", x: 420, y: 150 },
          { id: "okk", element: "O", x: 420, y: 90, freiePaare: 2 },
        ],
        bindungen: [
          { id: "r1", von: "n1", nach: "c2", ordnung: 2 },
          { id: "r2", von: "c2", nach: "c3", ordnung: 1 },
          { id: "r3", von: "c3", nach: "c4", ordnung: 2 },
          { id: "r4", von: "c4", nach: "c5", ordnung: 1 },
          { id: "r5", von: "c5", nach: "c6", ordnung: 2 },
          { id: "r6", von: "c6", nach: "n1", ordnung: 1 },
          { id: "nc", von: "n1", nach: "ca", ordnung: 1 },
          { id: "cc", von: "ca", nach: "ck", ordnung: 1 },
          { id: "co", von: "ck", nach: "ok", ordnung: 2 },
          { id: "cr", von: "ck", nach: "rr", ordnung: 1 },
          { id: "en", von: "cbeta", nach: "calpha", ordnung: 2 },
          { id: "ec", von: "calpha", nach: "ckk", ordnung: 1 },
          { id: "eo", von: "ckk", nach: "okk", ordnung: 2 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "ca" }, nach: { art: "atom", id: "cbeta" } },
          { von: { art: "bindung", id: "en" }, nach: { art: "atom", id: "calpha" } },
        ],
      },
    ],
    ergebnis: {
      titel: "1,5-Diketon am Pyridiniumsalz",
      beschreibung: "Fünf Kohlenstoffatome in Reihe, zwei Carbonylgruppen an den Enden. Ammoniumacetat bringt den Stickstoff, dann wird zum Pyridin aromatisiert — und das eingesetzte Pyridin geht wieder ab.",
      atome: [
        { id: "ck", element: "C", x: 90, y: 120 },
        { id: "ok", element: "O", x: 90, y: 60, freiePaare: 2 },
        { id: "ca", element: "C", x: 150, y: 160 },
        { id: "cbeta", element: "C", x: 215, y: 125 },
        { id: "calpha", element: "C", x: 280, y: 160 },
        { id: "ckk", element: "C", x: 345, y: 125 },
        { id: "okk", element: "O", x: 345, y: 65, freiePaare: 2 },
        { id: "rr", element: "R", x: 40, y: 160 },
      ],
      bindungen: [
        { id: "co", von: "ck", nach: "ok", ordnung: 2 },
        { id: "cr", von: "ck", nach: "rr", ordnung: 1 },
        { id: "cc", von: "ck", nach: "ca", ordnung: 1 },
        { id: "c1", von: "ca", nach: "cbeta", ordnung: 1 },
        { id: "c2", von: "cbeta", nach: "calpha", ordnung: 1 },
        { id: "c3", von: "calpha", nach: "ckk", ordnung: 1 },
        { id: "eo", von: "ckk", nach: "okk", ordnung: 2 },
      ],
    },
  },
  quiz: [
    { id: "q1", question: "What is the first step in the Paal-Knorr mechanism for pyrrole synthesis?", options: ["Oxidation of the 1,4-dicarbonyl", "Nucleophilic attack of the amine on a protonated carbonyl → hemiaminal", "Diels-Alder reaction", "Radical initiation"], correct: 1, explanation: "In the Paal-Knorr mechanism the primary amine (RNH₂) attacks the protonated (Lewis-acid-activated) carbonyl nucleophilically → hemiaminal. Then dehydration → imine. Second imine → cyclisation → dihydropyrrole → tautomerisation → pyrrole." },
    { id: "q2", question: "What is the driving force of the Kondrat'eva pyridine synthesis?", options: ["Acid catalysis", "Aromatisation to pyridine + entropy gain from CO₂ gas evolution", "Reduction of the azadiene", "None – it is endothermic"], correct: 1, explanation: "Two driving forces: 1. Aromatisation (pyridine more stable than bicyclic intermediate, ΔG < 0). 2. Entropy gain from release of CO₂ as gas (TΔS > 0). Together → favourable thermodynamics." },
    { id: "q3", question: "Which intermediate forms in the mCPBA oxidation of pyridine?", options: ["Pyridinone", "Pyridine N-oxide", "Hydroxypyridine", "Pyridinium ion"], correct: 1, explanation: "mCPBA (meta-chloroperoxybenzoic acid) is a peracid that oxidises N atoms. Pyridine + mCPBA → pyridine N-oxide. The N-oxide is important as an activated precursor for SNAr (activated at C-4) and the Boekelheide rearrangement." },
    { id: "q4", question: "In the Kröhnke mechanism: what is the role of pyridine in the first step?", options: ["Pyridine is the nucleophile that alkylates the α-bromoketone → pyridinium ylide", "Pyridine is the catalyst", "Pyridine is used as solvent", "Pyridine is the oxidant"], correct: 0, explanation: "In Kröhnke step 1 the α-bromoketone alkylates the pyridine N → pyridinium salt. This salt is an activated enolate equivalent (ylide character at α-C). The ylide then performs the Michael addition to the α,β-unsaturated carbonyl." },
    { id: "q5", question: "What makes the [4+2] + retro-[4+2] sequence so useful for heterocycle synthesis?", options: ["It requires no reagents", "It allows loss of a small stable molecule (CO₂, N₂) driving formation of a new aromatic ring", "It only works at room temperature", "It always gives 5-membered rings"], correct: 1, explanation: "The retro-[4+2] step releases a stable gas (CO₂, N₂, SO₂) – this entropy gain plus the aromatisation energy makes the overall transformation thermodynamically highly favourable. The approach is used in Kondrat'eva (CO₂) and Boger (N₂) syntheses." },
    { id: "q6", question: "In the Kondrat'eva and Boger reactions, what makes the retro-[4+2] step irreversible?", options: ["The high reaction temperature", "A small stable molecule leaves the ring (CO₂ or N₂) and the product aromatises", "The catalyst is consumed", "The bicyclic intermediate is charged"], correct: 1, explanation: "Both reactions build a bicyclic adduct first, then fragment it. Kondrat'eva expels CO₂, Boger expels N₂. A gas leaving the solution plus the aromatisation of the resulting pyridine make the step effectively irreversible — the same driving force in two different syntheses." },
  ],
  flashcards: [
    { id: "1cr1y11", front: "Paal-Knorr Mechanism", back: "1,4-Dicarbonyl + RNH₂: 1. Hemiaminal; 2. Dehydration → imine; 3. Cyclisation (2nd N attacks 2nd carbonyl); 4. Dehydration → dihydropyrrole; 5. Tautomerisation → pyrrole." },
    { id: "161hm3o", front: "Kröhnke Pyridine Synthesis – Steps", back: "1. α-BrCO + pyridine → pyridinium ylide. 2. Michael addition to enone. 3. + NH₄OAc → cyclisation. 4. Dehydration + aromatisation → pyridine." },
    { id: "0q1ls99", front: "Azomethine Ylide (1,3-Dipole)", back: "Form: C=N⁺-C⁻ ↔ C⁻-N=C. Generation: from N-oxides, münchnones, thermally from certain aziridines, or by deprotonation of iminium ions. Reaction: [3+2] with alkenes/alkynes." },
    { id: "103q59m", front: "N-oxide Chemistry (Pyridine)", back: "Pyridine + mCPBA → pyridine N-oxide. N-oxides: a) more electrophilic at C-4 (SNAr); b) Boekelheide precursor: + Ac₂O, Δ → 2-AcOCH₂-pyridine; c) can be reduced back to pyridine." },
    { id: "1mh0qak", front: "Mechanism: [4+2] + Retro-[4+2]", back: "Cycloaddition → bicyclic intermediate. Thermal retro-[4+2] eliminates XY (CO₂, N₂, SO₂ etc.) → new aromatic. Driving force: aromatisation + gas evolution." },
    { id: "0su4aep", front: "Paal-Knorr — why does the ring close at all?", back: "A 1,4-dicarbonyl places the two carbonyl carbons exactly five atoms apart once the nitrogen sits between them. The amine attacks one carbonyl, water leaves to give the imine, then the same nitrogen reaches the second carbonyl and closes a five-membered ring. Final tautomerisation delivers the aromatic pyrrole, and aromaticity is what pays for the whole sequence." },
  ],
} satisfies Thema;
