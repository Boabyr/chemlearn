import type { Thema } from '../../../content/schema'

export const topic = {
  id: "07-sear-regioselectivity",
  title: "SEAr – Regioselectivity",
  subtitle: "Electrophilic Substitution at Heteroaromatics",
  icon: "⚖️",
  estimatedMinutes: 60,
  theory: `



## Electrophilic Aromatic Substitution (SEAr) at Heteroaromatics

### General Principle
1. Electrophile E⁺ attacks HOMO of aromatic → arenium ion (sigma complex)
2. Deprotonation → aromatic product

**Regioselectivity = stability of the arenium ion**
→ more resonance structures → more stable → preferred position

### Electron-rich Heteroaromatics (activated)

**Pyrrole:**
- C-2 (α) >> C-3 (β)
- Rationale: 3 resonance structures at α attack (incl. N⁺ structure), only 2 at β attack

**Furan:**
- C-2 >> C-3 (same logic as pyrrole)
- Note: furan can also undergo 1,2- and 1,4-addition under harsh conditions (less aromatic than benzene)

**Thiophene:**
- C-2 >> C-3 (same logic)
- Thiophene is more stable than furan (more aromatic)

**Indole:**
- C-3 >> C-2 (EXCEPTION!)
- Rationale: attack at C-3 preserves benzene aromaticity; charge on N without destroying the benzene π system

### Electron-poor Heteroaromatics (deactivated)

**Pyridine:**
- SEAr very slow
- If possible: C-3 preferred (meta to N)
- C-2 and C-4 particularly deactivated by N (N withdraws electrons)

## Drawing Resonance Structures (exam-relevant)

**For SEAr at pyrrole (C-2 attack by Br⁺):**
Structure 1: Br and H at C-2, positive charge at C-3
Structure 2: charge at C-5
Structure 3: charge at N (N⁺) → particularly stable
→ 3 resonance structures → more stable arenium ion than at C-3

**For SEAr at pyridine (C-3 attack):**
No resonance structure places the positive charge on nitrogen → this is the **least bad**
option, and therefore the preferred position.

**At C-2 or C-4 attack:** one resonance structure puts the positive charge directly on the
nitrogen. Nitrogen is the most electronegative atom in the ring and is already withdrawing
electron density from it — asking it to carry a formal positive charge as well is
expensive, so those structures do not stabilise, they destabilise. (The pKa of pyridinium
says something about the *basicity* of the free lone pair and has nothing to do with the
stability of the arenium ion.)

## Why the arenium ion decides everything

The electrophile itself does not choose the position. All positions are attacked; only the
one whose arenium ion is most stable proceeds fast enough to matter, because that step is
rate-determining. So the whole question of regioselectivity reduces to drawing the possible
cationic intermediates and counting how well each one spreads the charge.

Two rules follow from that:

- **Electron-rich rings** (pyrrole, furan, thiophene, indole) react faster than benzene,
  because the heteroatom can donate its lone pair into the ring and take the charge itself.
- **Electron-poor rings** (pyridine, pyrimidine) react slower than benzene and prefer the
  position *furthest* from the heteroatom, because there the charge never has to sit on it.

The same reasoning, run backwards, explains why pyridine is the easy substrate for
nucleophilic substitution: an anionic intermediate with the negative charge on nitrogen is
exactly what an electronegative atom likes.

## Important Reactions Summary

| Substrate | Reagent | Position | Product |
|---|---|---|---|
| Indole | Br⁺ (NBS) | C-3 | 3-Bromoindole |
| Furan | Br⁺ | C-2 | 2-Bromofuran |
| Pyrrole | Br⁺ | C-2 | 2-Bromopyrrole |
| Thiophene | Br⁺ | C-2 | 2-Bromothiophene |
| Pyridine | Br₂/very harsh | C-3 | 3-Bromopyridine |



`,
  interactive: {
    type: "mechanism",
    title: "Indole attacks at C-3 — the exception explained",
    description: "Pyrrol bevorzugt C-2, Indol dagegen C-3. Zeichne den Angriff, der den Benzolring unangetastet lässt.",
    stages: [
      {
        id: 0, titel: "Angriff an C-3",
        aufgabe: "Zeichne den Pfeil von der C2=C3-Bindung zum Elektrophil.",
        erklaerung: "Der Angriff an C-3 lässt die positive Ladung am Stickstoff enden, ohne dass der ankondensierte Benzolring seine Aromatizität verliert. Bei einem Angriff an C-2 müsste die Ladung in den Sechsring hinein delokalisiert werden — das kostet dessen Sextett. Deshalb kehrt sich hier die Regel um, die für Pyrrol, Furan und Thiophen gilt.",
        hinweise: ["Der Benzolring ist mitgezeichnet. Frage dich bei jeder Möglichkeit, ob er intakt bleibt.", "Wie beim Pyrrol beginnt der Pfeil an der Doppelbindung des Fünfrings, nicht am Stickstoff."],
        atome: [
          { id: "n1", element: "N", x: 250, y: 215, wasserstoffe: 1 },
          { id: "c2", element: "C", x: 300, y: 180 },
          { id: "c3", element: "C", x: 282, y: 122 },
          { id: "c3a", element: "C", x: 222, y: 122 },
          { id: "c7a", element: "C", x: 204, y: 180 },
          { id: "c4", element: "C", x: 181, y: 77 },
          { id: "c5", element: "C", x: 122, y: 91 },
          { id: "c6", element: "C", x: 104, y: 149 },
          { id: "c7", element: "C", x: 145, y: 193 },
          { id: "e1", element: "E", x: 390, y: 80, ladung: 1, frei: true },
        ],
        bindungen: [
          { id: "f1", von: "n1", nach: "c2", ordnung: 1 },
          { id: "f2", von: "c2", nach: "c3", ordnung: 2 },
          { id: "f3", von: "c3", nach: "c3a", ordnung: 1 },
          { id: "f4", von: "c3a", nach: "c7a", ordnung: 1 },
          { id: "f5", von: "c7a", nach: "n1", ordnung: 1 },
          { id: "b1", von: "c3a", nach: "c4", ordnung: 2 },
          { id: "b2", von: "c4", nach: "c5", ordnung: 1 },
          { id: "b3", von: "c5", nach: "c6", ordnung: 2 },
          { id: "b4", von: "c6", nach: "c7", ordnung: 1 },
          { id: "b5", von: "c7", nach: "c7a", ordnung: 2 },
        ],
        pfeile: [
          { von: { art: "bindung", id: "f2" }, nach: { art: "atom", id: "e1" } },
        ],
      },
      {
        id: 1, titel: "Rearomatisierung",
        aufgabe: "Eine Base nimmt das Proton von C-3 ab. Zeichne beide Pfeile.",
        erklaerung: "Der Benzolring hat die ganze Zeit sein Sextett behalten — nur der Fünfring war kurz gestört. Mit der Deprotonierung kehrt auch dort die Aromatizität zurück, und das Elektrophil bleibt an C-3 stehen. Genau deshalb bromiert Indol zu 3-Bromindol und nicht zu 2-Bromindol.",
        hinweise: ["An C-3 sitzen jetzt vier Bindungspartner. Einer davon muss weichen.", "Das Elektronenpaar der C–H-Bindung geht in den Ring zurück, nicht zur Base."],
        atome: [
          { id: "n1", element: "N", x: 250, y: 215, ladung: 1, wasserstoffe: 1 },
          { id: "c2", element: "C", x: 300, y: 180 },
          { id: "c3", element: "C", x: 282, y: 122 },
          { id: "c3a", element: "C", x: 222, y: 122 },
          { id: "c7a", element: "C", x: 204, y: 180 },
          { id: "c4", element: "C", x: 181, y: 77 },
          { id: "c5", element: "C", x: 122, y: 91 },
          { id: "c6", element: "C", x: 104, y: 149 },
          { id: "c7", element: "C", x: 145, y: 193 },
          { id: "e1", element: "E", x: 340, y: 75 },
          { id: "h3", element: "H", x: 300, y: 55 },
          { id: "base", element: "N", x: 415, y: 175, ladung: -1, freiePaare: 2, wasserstoffe: 2, frei: true },
        ],
        bindungen: [
          { id: "f1", von: "n1", nach: "c2", ordnung: 2 },
          { id: "f2", von: "c2", nach: "c3", ordnung: 1 },
          { id: "f3", von: "c3", nach: "c3a", ordnung: 1 },
          { id: "f4", von: "c3a", nach: "c7a", ordnung: 1 },
          { id: "f5", von: "c7a", nach: "n1", ordnung: 1 },
          { id: "b1", von: "c3a", nach: "c4", ordnung: 2 },
          { id: "b2", von: "c4", nach: "c5", ordnung: 1 },
          { id: "b3", von: "c5", nach: "c6", ordnung: 2 },
          { id: "b4", von: "c6", nach: "c7", ordnung: 1 },
          { id: "b5", von: "c7", nach: "c7a", ordnung: 2 },
          { id: "ce", von: "c3", nach: "e1", ordnung: 1 },
          { id: "ch", von: "c3", nach: "h3", ordnung: 1 },
        ],
        pfeile: [
          { von: { art: "freiesPaar", id: "base" }, nach: { art: "atom", id: "h3" } },
          { von: { art: "bindung", id: "ch" }, nach: { art: "bindung", id: "f2" } },
        ],
      },
    ],
    ergebnis: {
      titel: "3-substituiertes Indol",
      beschreibung: "Beide Ringe sind aromatisch, das Elektrophil sitzt an C-3. Die Ausnahme zur α-Regel, erklärt durch den Benzolring.",
      atome: [
        { id: "n1", element: "N", x: 250, y: 215, wasserstoffe: 1 },
        { id: "c2", element: "C", x: 300, y: 180 },
        { id: "c3", element: "C", x: 282, y: 122 },
        { id: "c3a", element: "C", x: 222, y: 122 },
        { id: "c7a", element: "C", x: 204, y: 180 },
        { id: "c4", element: "C", x: 181, y: 77 },
        { id: "c5", element: "C", x: 122, y: 91 },
        { id: "c6", element: "C", x: 104, y: 149 },
        { id: "c7", element: "C", x: 145, y: 193 },
        { id: "e1", element: "E", x: 340, y: 75 },
      ],
      bindungen: [
        { id: "f1", von: "n1", nach: "c2", ordnung: 1 },
        { id: "f2", von: "c2", nach: "c3", ordnung: 2 },
        { id: "f3", von: "c3", nach: "c3a", ordnung: 1 },
        { id: "f4", von: "c3a", nach: "c7a", ordnung: 1 },
        { id: "f5", von: "c7a", nach: "n1", ordnung: 1 },
        { id: "b1", von: "c3a", nach: "c4", ordnung: 2 },
        { id: "b2", von: "c4", nach: "c5", ordnung: 1 },
        { id: "b3", von: "c5", nach: "c6", ordnung: 2 },
        { id: "b4", von: "c6", nach: "c7", ordnung: 1 },
        { id: "b5", von: "c7", nach: "c7a", ordnung: 2 },
        { id: "ce", von: "c3", nach: "e1", ordnung: 1 },
      ],
    },
  },
  quiz: [
    { id: "q1", question: "Why is C-2 (α position) preferred over C-3 in SEAr of furan?", options: ["Steric preference for C-2", "C-2 attack gives 3 resonance structures (incl. O⁺), C-3 attack only 2", "C-2 has higher π density in HOMO", "The O atom is directly adjacent to C-2"], correct: 1, explanation: "Electrophile attack at C-2: 3 resonance structures for arenium ion (incl. O⁺ structure). At C-3: only 2 resonance structures → C-2 intermediate more stable → C-2 preferred (Hammond postulate)." },
    { id: "q2", question: "Indole reacts with Br⁺ at which position?", options: ["C-1 (N)", "C-2", "C-3", "C-7"], correct: 2, explanation: "C-3 is preferred for SEAr at indole. Rationale: attack at C-3 preserves benzene aromaticity; positive charge delocalised onto N without interrupting the benzene ring → most stable arenium ion." },
    { id: "q3", question: "Warum entscheidet die Stabilität des Areniumions über die Regioselektivität und nicht die Ladungsverteilung im Ausgangsstoff?", options: ["Weil das Areniumion das Endprodukt ist", "Weil der Angriff des Elektrophils der geschwindigkeitsbestimmende Schritt ist und dessen Übergangszustand dem Areniumion ähnelt", "Weil die Deprotonierung am langsamsten ist", "Weil das Elektrophil die Position vorher auswählt"], correct: 1, explanation: "Angegriffen werden alle Positionen. Durchkommt nur die, deren Übergangszustand am niedrigsten liegt — und dieser Übergangszustand ähnelt dem darauf folgenden Areniumion. Die Frage nach der Regioselektivität reduziert sich damit darauf, die möglichen Kationen zu zeichnen und zu vergleichen, wie gut jedes die Ladung verteilt." },
    { id: "q4", question: "Which resonance structure makes α attack at pyrrole particularly favourable?", options: ["One with C⁺ at the heteroatom", "One with N⁺ (positively charged nitrogen)", "One with O⁻", "None – SEAr does not occur at pyrrole"], correct: 1, explanation: "At α attack at pyrrole: one of the 3 resonance structures of the arenium ion shows N⁺. Although positively charged, this N cation is stabilised by the adjacent C atoms → favourable. At β attack this N⁺ structure is absent." },
    { id: "q5", question: "Why is SEAr at pyridine so much slower than at benzene?", options: ["Pyridine is smaller", "The pyridine N withdraws electron density from the ring → lower HOMO → poorer reaction with electrophiles", "Pyridine has no free electrons", "SEAr at pyridine is forbidden"], correct: 1, explanation: "The electronegative N atom in pyridine (sp²) withdraws electron density inductively and by mesomery → the HOMO lies at a lower energy than in benzene → poorer reaction with electrophiles (E⁺). SEAr strongly inhibited; SNAr preferred instead." },
    { id: "q6", question: "Why does electrophilic substitution on pyridine proceed at C-3 rather than C-2 or C-4?", options: ["Because C-3 is sterically least hindered", "Because attack at C-2 or C-4 would place positive charge directly on the electronegative nitrogen", "Because C-3 carries the highest partial positive charge", "Because pyridine reacts through its N-oxide"], correct: 1, explanation: "In the arenium ion from C-2 or C-4 attack, one resonance structure puts the positive charge on nitrogen — expensive, since nitrogen is the most electronegative ring atom. Attack at C-3 avoids that structure. The whole reaction remains slow because the ring is electron-poor to begin with." },
  ],
  flashcards: [
    { id: "17pa0nq", front: "SEAr Regioselectivity – General Rule", back: "Position with most stable arenium ion is preferred. More resonance structures = more stable intermediate = preferred position. Draw all possible resonance structures!" },
    { id: "03v55f7", front: "α vs. β in 5-membered Heteroaromatics", back: "α (C-2) >> β (C-3) for pyrrole, furan, thiophene. EXCEPTION: indole → C-3 preferred (benzene aromaticity preserved at C-3 attack)." },
    { id: "0r3shel", front: "SEAr at Pyridine", back: "Strongly deactivated (N withdraws e⁻). If possible: C-3 (meta to N). C-2 and C-4 most strongly deactivated. SNAr at C-2/C-4 preferred instead." },
    { id: "18mbgop", front: "Bromination of Indole", back: "Indole + NBS (N-bromosuccinimide) or Br⁺ → 3-bromoindole. C-3 is most reactive position. If necessary protect N-H (N-Ts, N-Boc) for selective C-functionalisation." },
    { id: "08p5w0q", front: "Arenium Ion (Sigma Complex)", back: "Intermediate of SEAr. sp³ carbon at attack point. Positive charge delocalised over the remaining π system. Stability → regioselectivity." },
    { id: "0mn0y3r", front: "Pyrrole prefers C-2, indole prefers C-3 — the reason in one sentence", back: "Both attack where the arenium ion is best stabilised. In pyrrole that is C-2, which gives three resonance structures instead of two. In indole, attack at C-3 keeps the fused benzene ring aromatic, whereas C-2 attack would delocalise the charge into it and destroy that aromaticity." },
  ],
} satisfies Thema;
