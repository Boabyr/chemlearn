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
1. Electrophile E⁺ attacks the HOMO of the aromatic → arenium ion (sigma complex)
2. Deprotonation → aromatic product

**Regioselectivity = stability of the arenium ion.** Which position reacts is decided by
the cation that forms, not by the ring you started from. That is the whole chapter, and
everything below is an application of it.

Which position each ring prefers is covered where the rings themselves are: the
five-membered rings in the chapter on pyrrole, furan and thiophene, pyridine in the
chapter on six-membered rings. Here we do the part that has to be **drawn**.

## Why the arenium ion decides everything

The electrophile does not choose the position. All positions are attacked; only the one
whose arenium ion is most stable proceeds fast enough to matter, because that step is
rate-determining and its transition state resembles the cation that follows.

Two rules follow:

- **Electron-rich rings** react faster than benzene, because the heteroatom can donate its
  lone pair and take the charge itself.
- **Electron-poor rings** react slower and prefer the position *furthest* from the
  heteroatom, because there the charge never has to sit on it.

## Drawing the structures: pyrrole

Attack at C-2 spreads the positive charge over three atoms. The third structure is the
valuable one — nitrogen carries the charge while every atom keeps a full octet, because
the lone pair moves into the ring.

{{abbildung:pyrrol-c2}}

Attack at C-3 leaves only two structures. The carbon bearing the electrophile cuts the
conjugated chain in a place that isolates C-4 and C-5, so one of the delocalisation paths
disappears.

{{abbildung:pyrrol-c3}}

Three structures against two — that difference in delocalisation is the entire reason for
the α selectivity. Furan and thiophene follow the same count with O and S in place of N.

**How to draw this in an exam:** put the electrophile and the hydrogen on the attacked
carbon, mark it as sp³, then push the remaining π electrons around the ring one position
at a time and note where the positive charge lands. Count the structures. The position
with more of them wins, and a structure that puts the charge on the heteroatom with a
complete octet counts double in the argument.

## Drawing the structures: pyridine

Pyridine turns the argument around. Here the heteroatom does not take the charge — it
refuses it.

{{abbildung:pyridin-c3-gegen-c4}}

In the left structure the nitrogen has only six electrons around it. For the most
electronegative atom in the ring, one that is already withdrawing density, that is very
expensive — the structure destabilises rather than stabilises. Attack at C-3 avoids it
entirely, which is why C-3 is the least bad option. The reaction stays slow either way.

(The pKa of pyridinium says something about the basicity of the free lone pair and has
nothing to do with the stability of the arenium ion — a popular but wrong justification.)

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
  abbildungen: [
    {
      art: "strukturen",
      id: "pyrrol-c2",
      titel: "Arenium ion from attack at C-2 of pyrrole",
      beschreibung: "Three resonance structures. In the third one the nitrogen carries the charge and every atom has a full octet.",
      verknuepfung: "resonanz",
      strukturen: [
        {
          beschriftung: "charge at C-3",
          atome: [
            { id: "n1", element: "N", x: 240, y: 80, wasserstoffe: 1, freiePaare: 1 },
            { id: "c2", element: "C", x: 307, y: 128, zeigen: true, wasserstoffe: 1 },
            { id: "c3", element: "C", x: 281, y: 207, zeigen: true, wasserstoffe: 1, ladung: 1 },
            { id: "c4", element: "C", x: 199, y: 207 },
            { id: "c5", element: "C", x: 173, y: 128 },
            { id: "br", element: "Br", x: 392, y: 96 },
          ],
          bindungen: [
            { id: "b1", von: "n1", nach: "c2", ordnung: 1 },
            { id: "b2", von: "c2", nach: "c3", ordnung: 1 },
            { id: "b3", von: "c3", nach: "c4", ordnung: 1 },
            { id: "b4", von: "c4", nach: "c5", ordnung: 2 },
            { id: "b5", von: "c5", nach: "n1", ordnung: 1 },
            { id: "b6", von: "c2", nach: "br", ordnung: 1 },
          ],
        },
        {
          beschriftung: "charge at C-5",
          atome: [
            { id: "n1", element: "N", x: 240, y: 80, wasserstoffe: 1, freiePaare: 1 },
            { id: "c2", element: "C", x: 307, y: 128, zeigen: true, wasserstoffe: 1 },
            { id: "c3", element: "C", x: 281, y: 207 },
            { id: "c4", element: "C", x: 199, y: 207 },
            { id: "c5", element: "C", x: 173, y: 128, zeigen: true, wasserstoffe: 1, ladung: 1 },
            { id: "br", element: "Br", x: 392, y: 96 },
          ],
          bindungen: [
            { id: "b1", von: "n1", nach: "c2", ordnung: 1 },
            { id: "b2", von: "c2", nach: "c3", ordnung: 1 },
            { id: "b3", von: "c3", nach: "c4", ordnung: 2 },
            { id: "b4", von: "c4", nach: "c5", ordnung: 1 },
            { id: "b5", von: "c5", nach: "n1", ordnung: 1 },
            { id: "b6", von: "c2", nach: "br", ordnung: 1 },
          ],
        },
        {
          beschriftung: "charge at N — full octet",
          atome: [
            { id: "n1", element: "N", x: 240, y: 80, wasserstoffe: 1, ladung: 1 },
            { id: "c2", element: "C", x: 307, y: 128, zeigen: true, wasserstoffe: 1 },
            { id: "c3", element: "C", x: 281, y: 207 },
            { id: "c4", element: "C", x: 199, y: 207 },
            { id: "c5", element: "C", x: 173, y: 128 },
            { id: "br", element: "Br", x: 392, y: 96 },
          ],
          bindungen: [
            { id: "b1", von: "n1", nach: "c2", ordnung: 1 },
            { id: "b2", von: "c2", nach: "c3", ordnung: 1 },
            { id: "b3", von: "c3", nach: "c4", ordnung: 2 },
            { id: "b4", von: "c4", nach: "c5", ordnung: 1 },
            { id: "b5", von: "c5", nach: "n1", ordnung: 2 },
            { id: "b6", von: "c2", nach: "br", ordnung: 1 },
          ],
        },
      ],
    },
    {
      art: "strukturen",
      id: "pyrrol-c3",
      titel: "Arenium ion from attack at C-3 of pyrrole",
      beschreibung: "Only two structures: C-4 and C-5 stay outside the delocalised system.",
      verknuepfung: "resonanz",
      strukturen: [
        {
          beschriftung: "charge at C-2",
          atome: [
            { id: "n1", element: "N", x: 240, y: 80, wasserstoffe: 1, freiePaare: 1 },
            { id: "c2", element: "C", x: 307, y: 128, zeigen: true, wasserstoffe: 1, ladung: 1 },
            { id: "c3", element: "C", x: 281, y: 207, zeigen: true, wasserstoffe: 1 },
            { id: "c4", element: "C", x: 199, y: 207 },
            { id: "c5", element: "C", x: 173, y: 128 },
            { id: "br", element: "Br", x: 366, y: 262 },
          ],
          bindungen: [
            { id: "b1", von: "n1", nach: "c2", ordnung: 1 },
            { id: "b2", von: "c2", nach: "c3", ordnung: 1 },
            { id: "b3", von: "c3", nach: "c4", ordnung: 1 },
            { id: "b4", von: "c4", nach: "c5", ordnung: 2 },
            { id: "b5", von: "c5", nach: "n1", ordnung: 1 },
            { id: "b6", von: "c3", nach: "br", ordnung: 1 },
          ],
        },
        {
          beschriftung: "charge at N",
          atome: [
            { id: "n1", element: "N", x: 240, y: 80, wasserstoffe: 1, ladung: 1 },
            { id: "c2", element: "C", x: 307, y: 128 },
            { id: "c3", element: "C", x: 281, y: 207, zeigen: true, wasserstoffe: 1 },
            { id: "c4", element: "C", x: 199, y: 207 },
            { id: "c5", element: "C", x: 173, y: 128 },
            { id: "br", element: "Br", x: 366, y: 262 },
          ],
          bindungen: [
            { id: "b1", von: "n1", nach: "c2", ordnung: 2 },
            { id: "b2", von: "c2", nach: "c3", ordnung: 1 },
            { id: "b3", von: "c3", nach: "c4", ordnung: 1 },
            { id: "b4", von: "c4", nach: "c5", ordnung: 2 },
            { id: "b5", von: "c5", nach: "n1", ordnung: 1 },
            { id: "b6", von: "c3", nach: "br", ordnung: 1 },
          ],
        },
      ],
    },
    {
      art: "strukturen",
      id: "pyridin-c3-gegen-c4",
      titel: "Pyridine: where the charge is allowed to go",
      beschreibung: "Left: attack at C-4 forces a structure with an electron-deficient nitrogen. Right: attack at C-3 never does.",
      verknuepfung: "reihe",
      strukturen: [
        {
          beschriftung: "C-4 attack — charge on N",
          atome: [
            { id: "n1", element: "N", x: 240, y: 75, ladung: 1 },
            { id: "c2", element: "C", x: 305, y: 113 },
            { id: "c3", element: "C", x: 305, y: 188 },
            { id: "c4", element: "C", x: 240, y: 225, zeigen: true, wasserstoffe: 1 },
            { id: "c5", element: "C", x: 175, y: 188 },
            { id: "c6", element: "C", x: 175, y: 113 },
            { id: "br", element: "Br", x: 240, y: 285 },
          ],
          bindungen: [
            { id: "b1", von: "n1", nach: "c2", ordnung: 2 },
            { id: "b2", von: "c2", nach: "c3", ordnung: 1 },
            { id: "b3", von: "c3", nach: "c4", ordnung: 1 },
            { id: "b4", von: "c4", nach: "c5", ordnung: 1 },
            { id: "b5", von: "c5", nach: "c6", ordnung: 2 },
            { id: "b6", von: "c6", nach: "n1", ordnung: 1 },
            { id: "b7", von: "c4", nach: "br", ordnung: 1 },
          ],
        },
        {
          beschriftung: "C-3 attack — charge stays on carbon",
          atome: [
            { id: "n1", element: "N", x: 240, y: 75, freiePaare: 1 },
            { id: "c2", element: "C", x: 305, y: 113, zeigen: true, wasserstoffe: 1, ladung: 1 },
            { id: "c3", element: "C", x: 305, y: 188, zeigen: true, wasserstoffe: 1 },
            { id: "c4", element: "C", x: 240, y: 225 },
            { id: "c5", element: "C", x: 175, y: 188 },
            { id: "c6", element: "C", x: 175, y: 113 },
            { id: "br", element: "Br", x: 388, y: 225 },
          ],
          bindungen: [
            { id: "b1", von: "n1", nach: "c2", ordnung: 1 },
            { id: "b2", von: "c2", nach: "c3", ordnung: 1 },
            { id: "b3", von: "c3", nach: "c4", ordnung: 1 },
            { id: "b4", von: "c4", nach: "c5", ordnung: 2 },
            { id: "b5", von: "c5", nach: "c6", ordnung: 1 },
            { id: "b6", von: "c6", nach: "n1", ordnung: 2 },
            { id: "b7", von: "c3", nach: "br", ordnung: 1 },
          ],
        },
      ],
    },
  ],
  quiz: [
    { id: "q1", question: "Why is C-2 (α position) preferred over C-3 in SEAr of furan?", options: ["C-2 is the sterically easier position", "C-2 attack gives three resonance structures", "C-2 carries more density in the HOMO", "The oxygen sits right next to C-2"], correct: 1, explanation: "Attack at C-2 delocalises the positive charge over three structures, one of which places it on oxygen with a full octet everywhere. Attack at C-3 offers only two. Proximity to the heteroatom is not the argument by itself — indole sits next to nitrogen at C-2 and still reacts at C-3." },
    { id: "q2", question: "Indole reacts with Br⁺ at which position?", options: ["C-1 (N)", "C-2", "C-3", "C-7"], correct: 2, explanation: "C-3 is preferred for SEAr at indole. Rationale: attack at C-3 preserves benzene aromaticity; positive charge delocalised onto N without interrupting the benzene ring → most stable arenium ion." },
    { id: "q3", question: "Why does the stability of the arenium ion decide regioselectivity, rather than the charge distribution in the starting material?", options: ["Because the arenium ion is the final product", "Because the electrophilic attack is rate-determining", "Because the deprotonation is the slowest step", "Because the electrophile picks its position first"], correct: 1, explanation: "Every position gets attacked. Only the one with the lowest transition state proceeds fast enough to matter — and that transition state resembles the arenium ion that follows. Regioselectivity therefore reduces to drawing the possible cations and comparing how well each spreads the charge." },
    { id: "q4", question: "Which resonance structure makes α attack at pyrrole particularly favourable?", options: ["One with C⁺ at the heteroatom", "One with N⁺ (positively charged nitrogen)", "One with O⁻", "None – SEAr does not occur at pyrrole"], correct: 1, explanation: "At α attack at pyrrole: one of the 3 resonance structures of the arenium ion shows N⁺. Although positively charged, this N cation is stabilised by the adjacent C atoms → favourable. At β attack this N⁺ structure is absent." },
    { id: "q5", question: "Why is SEAr at pyridine so much slower than at benzene?", options: ["Pyridine is the smaller aromatic ring", "Nitrogen withdraws density and lowers the HOMO", "Pyridine has no free electrons at all", "Electrophilic substitution there is forbidden"], correct: 1, explanation: "The electronegative nitrogen pulls π density out of the ring, so the HOMO sits lower and interacts less well with an electrophile. Pyridine therefore reacts roughly a million times slower than benzene and needs forcing conditions. The same property makes it an excellent substrate for nucleophiles." },
    { id: "q6", question: "Why does electrophilic substitution on pyridine proceed at C-3 rather than C-2 or C-4?", options: ["Because C-3 is the least hindered position", "Because C-2 or C-4 would put the charge on nitrogen", "Because C-3 carries the highest partial charge", "Because pyridine reacts through its N-oxide"], correct: 1, explanation: "In the arenium ion from C-2 or C-4 attack, one resonance structure places the positive charge on the nitrogen — the most electronegative atom in the ring, and one that is already withdrawing density. Attack at C-3 avoids that structure entirely. The reaction stays slow either way, because the ring is electron-poor to begin with." },
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
