import type { Thema } from '../../../content/schema'

export const topic = {
  id: "06-cyclocondensations",
  title: "Cyclocondensation Reactions",
  subtitle: "Regioselective Synthesis of Heterocycles",
  icon: "⚡",
  estimatedMinutes: 80,
  theory: `



## What is a Cyclocondensation?

A **cyclocondensation** is a ring-closure reaction with loss of small molecules (H₂O, ROH, NH₃). Unlike cycloadditions, it involves nucleophilic/electrophilic steps (not pericyclic).

## Regioselectivity Problem

With unsymmetrical components A + B → P1 + P2 (regioisomers)

**Strategies for regioselectivity:**
1. **Pre-formed enamines** with defined geometry
2. **Unsymmetrical dicarbonyl** instead of symmetrical
3. **Conjugate addition – conjugate elimination** route

## Important Cyclocondensation Reactions (exam-relevant)

### Hantzsch Dihydropyridine [3+3]:
Enamine + 1,3-dicarbonyl (+ NH₃) → 1,4-dihydropyridine → oxidation → pyridine
Regioselective when enamine is pre-synthesised!

### Bohlmann-Rahtz Reaction [3+3]:
Enaminone + β-ketoester → condensed pyridine
Selective: enaminone dictates regiochemistry

### Guareschi-Thorpe [3+3]:
Cyanoacetamide + 1,3-dicarbonyl → 2-pyridinone-3-carbonitrile

### Kröhnke [3+2+1]:
Pyridinium ylide + unsaturated dicarbonyl + NH₄OAc → pyridine
Mechanism: 1. Alkylation → pyridinium salt; 2. Knoevenagel + Michael; 3. cyclisation; 4. aromatisation

### Synthesis of substituted pyrimidines [3+3]:
1,3-Dicarbonyl + urea/guanidine/amidinate → pyrimidines/pyrimidinones
**Biginelli reaction:** Aldehyde + β-ketoester + urea → dihydropyrimidinone (DHPM)

### Synthesis of pyrazoles [3+2]:
1,3-Dicarbonyl + hydrazine (H₂N-NH₂) → pyrazole
Regioselectivity: with unsymmetrical dicarbonyls → two possible regioisomers
Solution: monosubstituted hydrazine H₂N-NHR → one isomer preferred

### Synthesis of isoxazoles:
β-Enolketone + NH₂OH (hydroxylamine) → isoxazole (+ H₂O)

### Imidazole synthesis:
1,2-Dicarbonyl + NH₃ + aldehyde → imidazole (van Leusen: TosMIC)



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
    { id: "q1", question: "Which components does the Hantzsch dihydropyridine synthesis require?", options: ["Azide + alkyne", "Enamine (or aldehyde) + 1,3-dicarbonyl + NH₃", "Diene + dienophile", "Hydrazine + 1,3-dicarbonyl"], correct: 1, explanation: "Hantzsch synthesis [3+3]: enamine (3C unit) + 1,3-dicarbonyl compound (3C unit) + NH₃ (1N unit). Alternative: aldehyde + 2× β-ketoester + NH₃. Product: 1,4-dihydropyridine; after oxidation: pyridine." },
    { id: "q2", question: "How can regioselectivity in the Hantzsch synthesis with unsymmetrical components be ensured?", options: ["By temperature control", "By pre-synthesising the enamine with defined regiochemistry", "By solvent choice", "By excess of one component"], correct: 1, explanation: "When the enamine is prepared separately beforehand (from ketone + primary amine), its regiochemistry is fixed. The subsequent reaction with the 1,3-dicarbonyl then gives regioselectively only one pyridine isomer." },
    { id: "q3", question: "What is the product of the Biginelli reaction?", options: ["Pyrimidine", "1,4-Dihydropyridine", "3,4-Dihydropyrimidin-2(1H)-one (DHPM)", "Pyrazole"], correct: 2, explanation: "The Biginelli reaction (3-component): aldehyde + β-ketoester + urea → 3,4-dihydropyrimidin-2(1H)-one (DHPM). Acid-catalysed. DHPMs are pharmacologically active (Ca channel blockers, hypertension)." },
    { id: "q4", question: "Which components give a pyrazole in cyclocondensation?", options: ["1,3-Dicarbonyl + NH₂OH", "1,3-Dicarbonyl + H₂N-NHR (hydrazine)", "1,4-Dicarbonyl + NH₃", "Enamine + diazonium salt"], correct: 1, explanation: "1,3-Dicarbonyl + hydrazine (H₂N-NH₂ or H₂N-NHR) → pyrazole. With hydrazine itself: mixture of two regioisomers (if 1,3-dicarbonyl unsymmetrical). With monosubstituted hydrazine: defined N-substituted pyrazole." },
    { id: "q5", question: "Which reagent combination gives an isoxazole?", options: ["β-Enolketone + H₂N-OH (hydroxylamine)", "1,4-Dicarbonyl + NH₃", "Azide + alkyne", "Aldehyde + malononitrile"], correct: 0, explanation: "β-Enolketone + hydroxylamine (H₂N-OH) → isoxazole. Mechanism: condensation (oxime formation at ketone), cyclisation (intramolecular Michael addition), dehydration. Regioselective when 1,3-dicarbonyl is unsymmetrical." },
    { id: "q6", question: "What is the van Leusen synthesis and what does it produce?", options: ["Pyridine from triazine", "Imidazole from tosylmethyl isocyanide (TosMIC) + aldehyde + amine", "Furan from 1,4-dicarbonyl", "Oxazole from isocyanide + carbonyl compound"], correct: 1, explanation: "Van Leusen reaction: aldehyde + R-NH₂ → imine, then + TosMIC (tosylmethyl isocyanide, TosCH₂NC) → 4-tosylimidazole (after tosyl elimination → imidazole). Mild conditions, broad applicability." },
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
