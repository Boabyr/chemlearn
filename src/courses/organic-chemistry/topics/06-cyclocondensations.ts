import type { Thema } from '../../../content/schema'

export const topic = {
  id: "06-cyclocondensations",
  title: "Cyclocondensation Reactions",
  subtitle: "Regioselective Synthesis of Heterocycles",
  icon: "⚡",
  estimatedMinutes: 80,
  theory: `

## What is a Cyclocondensation?

A **cyclocondensation** is a ring-closure reaction with loss of small molecules
(H₂O, ROH, NH₃). Unlike cycloadditions, it involves nucleophilic/electrophilic steps
(not pericyclic).

The practical consequence of that difference: a cyclocondensation runs through discrete
intermediates that can be isolated, interrupted or steered — and it can also combine its
building blocks in more than one way. A cycloaddition cannot, because everything happens
in one step.

## Regioselectivity Problem

With unsymmetrical components A + B → P1 + P2 (regioisomers)

Two carbonyls of different reactivity and a nucleophile with two ends: the nucleophile
attacks the more electrophilic carbonyl first, but "more electrophilic" is often a small
difference, so both products form.

**Strategies for regioselectivity:**
1. **Pre-formed enamines** with defined geometry
2. **Unsymmetrical dicarbonyl** instead of symmetrical
3. **Conjugate addition – conjugate elimination** route

The first strategy is the general one: instead of letting the amine choose which carbonyl
to attack, the C–N bond is made beforehand in a separate step, and the cyclisation then has
only one option left.

## Important Cyclocondensation Reactions (exam-relevant)

### Hantzsch Dihydropyridine [3+3]:
Enamine + 1,3-dicarbonyl (+ NH₃) → 1,4-dihydropyridine → oxidation → pyridine
Regioselective when enamine is pre-synthesised!
The dihydropyridine stage matters in its own right — the calcium channel blockers of the
nifedipine family are 1,4-dihydropyridines and are never oxidised further.

### Bohlmann-Rahtz Reaction [3+3]:
Enaminone + β-ketoester → condensed pyridine
Selective: enaminone dictates regiochemistry

### Guareschi-Thorpe [3+3]:
Cyanoacetamide + 1,3-dicarbonyl → 2-pyridinone-3-carbonitrile

### Kröhnke [3+2+1]:
Pyridinium ylide + α,β-unsaturated ketone + NH₄OAc → pyridine
Mechanism: 1. pyridine alkylates the α-bromoketone → pyridinium salt;
2. deprotonation → ylide; 3. Michael addition to the enone;
4. ring closure with ammonia from NH₄OAc; 5. pyridine leaves, aromatisation

### Synthesis of substituted pyrimidines [3+3]:
1,3-Dicarbonyl + urea/guanidine/amidine → pyrimidines/pyrimidinones
**Biginelli reaction:** Aldehyde + β-ketoester + urea → dihydropyrimidinone (DHPM)
A three-component reaction: all reagents go into one flask, and the order of events is
sorted out by reactivity rather than by the chemist.

### Synthesis of pyrazoles [3+2]:
1,3-Dicarbonyl + hydrazine (H₂N-NH₂) → pyrazole
Regioselectivity: with unsymmetrical dicarbonyls → two possible regioisomers
Solution: monosubstituted hydrazine H₂N-NHR → one isomer preferred, because the more
nucleophilic NH₂ end attacks the more electrophilic carbonyl first

### Synthesis of isoxazoles:
β-Enolketone (or 1,3-dicarbonyl) + NH₂OH (hydroxylamine) → isoxazole (+ H₂O)
Same skeleton as the pyrazole case, with the second nitrogen replaced by oxygen — and the
same regiochemical question, since hydroxylamine also has two different ends.

### Imidazole synthesis:
- **Debus-Radziszewski:** 1,2-dicarbonyl + aldehyde + 2 NH₃ → imidazole
- **van Leusen:** TosMIC + an aldimine → imidazole; TosMIC supplies C-2 and one nitrogen,
  and tosyl sulfinate leaves at the end

These are two different reactions with two different disconnections — worth telling apart,
because the exam question usually asks which fragment ends up where.

`,
  interactive: {
    type: "mechanism",
    title: "Pyrazole from a 1,3-diketone — three condensation steps",
    description: "Eine Cyclokondensation ist gewöhnliche Carbonylchemie, zweimal hintereinander. Zeichne alle drei Schritte.",
    stages: [
      {
        id: 0, titel: "Angriff am ersten Carbonyl",
        aufgabe: "Das erste Stickstoffatom des Hydrazins greift C-1 an. Zeichne beide Pfeile.",
        erklaerung: "Der Carbonylkohlenstoff ist elektrophil, weil der Sauerstoff Elektronendichte abzieht. Das Elektronenpaar des Stickstoffs bildet die neue Bindung, und die π-Elektronen der C=O-Bindung weichen auf den Sauerstoff aus — sonst hätte der Kohlenstoff fünf Bindungen. Es entsteht ein Halbaminal.",
        hinweise: ["Nucleophil greift an, π-Elektronen weichen aus. Dasselbe Muster wie bei jeder Addition an ein Carbonyl.", "Der Sauerstoff nimmt die Elektronen und damit die negative Ladung auf."],
        atome: [
          { id: "c1", element: "C", x: 130, y: 160 },
          { id: "o1", element: "O", x: 130, y: 95, freiePaare: 2 },
          { id: "c2", element: "C", x: 190, y: 200 },
          { id: "c3", element: "C", x: 250, y: 160 },
          { id: "o3", element: "O", x: 250, y: 95, freiePaare: 2 },
          { id: "na", element: "N", x: 350, y: 215, freiePaare: 1, wasserstoffe: 2 },
          { id: "nb", element: "N", x: 410, y: 180, freiePaare: 1, wasserstoffe: 2 },
        ],
        bindungen: [
          { id: "k1", von: "c1", nach: "o1", ordnung: 2 },
          { id: "k2", von: "c1", nach: "c2", ordnung: 1 },
          { id: "k3", von: "c2", nach: "c3", ordnung: 1 },
          { id: "k4", von: "c3", nach: "o3", ordnung: 2 },
          { id: "k5", von: "na", nach: "nb", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "na" }, nach: { art: "atom", id: "c1" } },
          { von: { art: "bindung", id: "k1" }, nach: { art: "atom", id: "o1" } },
        ],
      },
      {
        id: 1, titel: "Wasser tritt aus",
        aufgabe: "Aus dem Halbaminal wird das Hydrazon. Zeichne beide Pfeile: das Elektronenpaar am Stickstoff in die N–C-Bindung, und die C–O-Bindung zum Sauerstoff.",
        erklaerung: "Das Elektronenpaar des Stickstoffs schiebt in die Bindung zum Kohlenstoff und macht daraus eine Doppelbindung. Damit der Kohlenstoff nicht überladen wird, muss die C–O-Bindung brechen — der Sauerstoff geht mit seinen Elektronen als Wasser weg. Diesen Wasseraustritt meint das Wort Kondensation.",
        hinweise: ["Eine C=N-Doppelbindung entsteht. Was muss dafür den Platz räumen?", "Der zweite Pfeil zeigt auf den Sauerstoff, nicht von ihm weg."],
        atome: [
          { id: "c1", element: "C", x: 130, y: 160 },
          { id: "o1", element: "O", x: 90, y: 105, freiePaare: 2, wasserstoffe: 1 },
          { id: "c2", element: "C", x: 190, y: 200 },
          { id: "c3", element: "C", x: 250, y: 160 },
          { id: "o3", element: "O", x: 250, y: 95, freiePaare: 2 },
          { id: "na", element: "N", x: 190, y: 105, freiePaare: 1, wasserstoffe: 1 },
          { id: "nb", element: "N", x: 250, y: 65, freiePaare: 1, wasserstoffe: 2 },
        ],
        bindungen: [
          { id: "k1", von: "c1", nach: "o1", ordnung: 1 },
          { id: "k2", von: "c1", nach: "c2", ordnung: 1 },
          { id: "k3", von: "c2", nach: "c3", ordnung: 1 },
          { id: "k4", von: "c3", nach: "o3", ordnung: 2 },
          { id: "k5", von: "na", nach: "nb", ordnung: 1 },
          { id: "k6", von: "c1", nach: "na", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "na" }, nach: { art: "bindung", id: "k6" } },
          { von: { art: "bindung", id: "k1" }, nach: { art: "atom", id: "o1" } },
        ],
      },
      {
        id: 2, titel: "Ringschluss",
        aufgabe: "Das zweite Stickstoffatom greift das verbliebene Carbonyl an. Zeichne beide Pfeile.",
        erklaerung: "Jetzt schließt sich der Ring: der zweite Stickstoff sitzt genau in Reichweite von C-3. Nach einem weiteren Wasseraustritt und der Tautomerie steht das aromatische Pyrazol da — und die gewonnene Aromatizität ist es, die die ganze Kette antreibt. Ist das Diketon unsymmetrisch, entstehen an dieser Stelle zwei Regioisomere.",
        hinweise: ["Derselbe Angriff wie im ersten Schritt, nur am anderen Ende der Kette.", "Zähle die Ringglieder: N, N, C, C, C — fünf, das passt."],
        atome: [
          { id: "c1", element: "C", x: 130, y: 160 },
          { id: "c2", element: "C", x: 190, y: 200 },
          { id: "c3", element: "C", x: 250, y: 160 },
          { id: "o3", element: "O", x: 300, y: 205, freiePaare: 2 },
          { id: "na", element: "N", x: 130, y: 100 },
          { id: "nb", element: "N", x: 190, y: 60, freiePaare: 1, wasserstoffe: 2 },
        ],
        bindungen: [
          { id: "k2", von: "c1", nach: "c2", ordnung: 1 },
          { id: "k3", von: "c2", nach: "c3", ordnung: 1 },
          { id: "k4", von: "c3", nach: "o3", ordnung: 2 },
          { id: "k5", von: "na", nach: "nb", ordnung: 1 },
          { id: "k6", von: "c1", nach: "na", ordnung: 2 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "nb" }, nach: { art: "atom", id: "c3" } },
          { von: { art: "bindung", id: "k4" }, nach: { art: "atom", id: "o3" } },
        ],
      },
    ],
    ergebnis: {
      titel: "Pyrazol",
      beschreibung: "Nach dem zweiten Wasseraustritt und der Tautomerie ist der Fünfring aromatisch. Zwei Stickstoffatome nebeneinander, sechs π-Elektronen.",
      atome: [
        { id: "nb", element: "N", x: 150, y: 220, wasserstoffe: 1 },
        { id: "na", element: "N", x: 98, y: 182, freiePaare: 1 },
        { id: "c1", element: "C", x: 118, y: 121 },
        { id: "c2", element: "C", x: 182, y: 121 },
        { id: "c3", element: "C", x: 202, y: 182 },
      ],
      bindungen: [
        { id: "p1", von: "nb", nach: "na", ordnung: 1 },
        { id: "p2", von: "na", nach: "c1", ordnung: 2 },
        { id: "p3", von: "c1", nach: "c2", ordnung: 1 },
        { id: "p4", von: "c2", nach: "c3", ordnung: 2 },
        { id: "p5", von: "c3", nach: "nb", ordnung: 1 },
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Which components does the Hantzsch dihydropyridine synthesis require?", options: ["An azide together with a terminal alkyne", "An enamine, a 1,3-dicarbonyl and ammonia", "A conjugated diene and a dienophile", "Hydrazine together with a 1,3-dicarbonyl"], correct: 1, explanation: "Classically all in one pot: aldehyde, two equivalents of β-ketoester and ammonia. The first product is a 1,4-dihydropyridine, which is oxidised to the pyridine — unless the dihydropyridine is the target, as with the nifedipine-type calcium channel blockers. Hydrazine plus 1,3-dicarbonyl gives a pyrazole instead." },
    { id: "q2", question: "How can regioselectivity in the Hantzsch synthesis with unsymmetrical components be ensured?", options: ["By carefully controlling the temperature", "By pre-forming the enamine with defined geometry", "By choosing a suitable solvent", "By using a large excess of one component"], correct: 1, explanation: "Left to itself, the amine has to choose which of two similar carbonyls to attack, and both products form. Making the C–N bond beforehand in a separate step removes that choice: the cyclisation then has only one way left to close. Temperature and solvent shift the ratio at best, they do not fix it." },
    { id: "q3", question: "What is the product of the Biginelli reaction?", options: ["An aromatic pyrimidine after oxidation", "A 1,4-dihydropyridine", "A 3,4-dihydropyrimidin-2(1H)-one", "A substituted pyrazole"], correct: 2, explanation: "Biginelli combines an aldehyde, a β-ketoester and urea in one pot to give a dihydropyrimidinone. Swap the urea for ammonia and the same three-component logic gives the Hantzsch dihydropyridine — the two reactions are worth learning as a pair." },
    { id: "q4", question: "Which components give a pyrazole in cyclocondensation?", options: ["1,3-Dicarbonyl + NH₂OH", "1,3-Dicarbonyl + H₂N-NHR (hydrazine)", "1,4-Dicarbonyl + NH₃", "An enamine together with a diazonium salt"], correct: 1, explanation: "1,3-Dicarbonyl + hydrazine (H₂N-NH₂ or H₂N-NHR) → pyrazole. With hydrazine itself: mixture of two regioisomers (if 1,3-dicarbonyl unsymmetrical). With monosubstituted hydrazine: defined N-substituted pyrazole." },
    { id: "q5", question: "Which reagent combination gives an isoxazole?", options: ["A β-enol ketone with hydroxylamine", "A 1,4-dicarbonyl with ammonia", "An organic azide with an alkyne", "An aldehyde with malononitrile"], correct: 0, explanation: "Hydroxylamine brings both heteroatoms of the isoxazole ring: the nitrogen and the oxygen, already bonded to each other. The 1,3-dicarbonyl supplies the three carbons. Replace hydroxylamine with hydrazine and the same skeleton gives a pyrazole instead." },
    { id: "q6", question: "What is the van Leusen synthesis and what does it produce?", options: ["Pyridine from a triazine precursor", "Imidazole from TosMIC and an aldimine", "Furan from a 1,4-dicarbonyl compound", "Oxazole from an isocyanide and a ketone"], correct: 1, explanation: "TosMIC supplies C-2 and one nitrogen; the aldimine supplies the rest of the ring. The tosyl group leaves as sulfinate at the end, which drives the aromatisation. Do not confuse it with Debus-Radziszewski, which builds imidazoles from a 1,2-dicarbonyl, an aldehyde and two equivalents of ammonia." },
  ],
  flashcards: [
    { id: "1bqsez5", front: "Hantzsch Dihydropyridine Synthesis", back: "[3+3] cyclocondensation: enamine + 1,3-dicarbonyl + NH₃ → 1,4-dihydropyridine → [O] → pyridine. Regioselective: use pre-synthesised enamine." },
    { id: "0k94jy7", front: "Biginelli Reaction", back: "3-component reaction: aldehyde + β-ketoester + urea → DHPM (dihydropyrimidinone). Acid-catalysed. Products: calcium channel blockers." },
    { id: "07k6u7x", front: "Pyrazole Synthesis", back: "1,3-Dicarbonyl + H₂N-NH-R → N-substituted pyrazole (regioselective). With H₂N-NH₂ → mixture. Important: 1,3-diketones prefer 3(5)-substituted pyrazole." },
    { id: "08fisvj", front: "Bohlmann-Rahtz Reaction", back: "[3+3] cyclocondensation: enaminone + β-ketoester → pyridine. Regiochemistry dictated by the enaminone. Propargylamine as alternative." },
    { id: "1vwbl7q", front: "Retrosynthesis: Cyclocondensation", back: "Identify: which C-N or C-O bonds were newly formed? Cut them retrosynthetically. Add H₂O (or NH₃, ROH) that was eliminated. That gives A and B." },
    { id: "1ewll7i", front: "Warum eine Cyclokondensation Regioisomere liefern kann", back: "Anders als eine Cycloaddition läuft sie über einzelne Zwischenstufen. Ein unsymmetrisches 1,3-Diketon bietet zwei verschiedene Carbonylgruppen an, und das Nucleophil kann an beiden zuerst angreifen. Wer die Regiochemie festlegen will, setzt ein vorgefertigtes Enamin oder Enaminon ein, das nur eine Verknüpfung erlaubt." },
  ],
} satisfies Thema;
