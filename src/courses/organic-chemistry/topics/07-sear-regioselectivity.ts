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
No N⁺ in resonance structure → less stable
At C-2 or C-4 attack: N⁺ in resonance structure, BUT N already electron-poor (pKa 5.2) → destabilising!

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
    title: "Indole — the exception attacks at C-3",
    description: "Pyrrole prefers C-2, indole prefers C-3. Show the attack that keeps the benzene ring aromatic.",
    stages: [
      {
        id: 0, label: "Electrophilic attack at C-3", description: "Draw the arrow from C-3 of the pyrrole ring to the electrophile.",
        hint1: "Compare the two arenium ions: which one still contains an intact benzene ring?", hint2: "Attack at C-2 would delocalise the positive charge into the benzene ring and destroy its aromaticity. At C-3 the charge stays on nitrogen and the benzo ring is untouched.",
        atoms: [
          { id: "N1", label: "N-H", x: 205, y: 190, color: "#60a5fa", r: 20 },
          { id: "C2", label: "C2", x: 265, y: 150, color: "#e2e8f0", r: 18 },
          { id: "C3", label: "C3", x: 245, y: 80, color: "#e2e8f0", r: 20 },
          { id: "C3a", label: "C3a", x: 170, y: 75, color: "#94a3b8", r: 16 },
          { id: "C7a", label: "C7a", x: 140, y: 150, color: "#94a3b8", r: 16 },
          { id: "E", label: "E⁺", x: 360, y: 60, color: "#4ade80", r: 18, charge: "+" },
        ],
        bonds: [
          { a: "N1", b: "C2", dash: false, color: "#64748b" },
          { a: "C2", b: "C3", dash: false, color: "#64748b" },
          { a: "C3", b: "C3a", dash: false, color: "#64748b" },
          { a: "C3a", b: "C7a", dash: false, color: "#475569" },
          { a: "C7a", b: "N1", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "C3", to: "E" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Why is C-2 (α position) preferred over C-3 in SEAr of furan?", options: ["Steric preference for C-2", "C-2 attack gives 3 resonance structures (incl. O⁺), C-3 attack only 2", "C-2 has higher π density in HOMO", "The O atom is directly adjacent to C-2"], correct: 1, explanation: "Electrophile attack at C-2: 3 resonance structures for arenium ion (incl. O⁺ structure). At C-3: only 2 resonance structures → C-2 intermediate more stable → C-2 preferred (Hammond postulate)." },
    { id: "q2", question: "Indole reacts with Br⁺ at which position?", options: ["C-1 (N)", "C-2", "C-3", "C-7"], correct: 2, explanation: "C-3 is preferred for SEAr at indole. Rationale: attack at C-3 preserves benzene aromaticity; positive charge delocalised onto N without interrupting the benzene ring → most stable arenium ion." },
    { id: "q3", question: "Which position is least deactivated in SEAr at pyridine?", options: ["C-2", "C-3", "C-4", "N-1"], correct: 1, explanation: "C-3 (meta to N) is least deactivated, because the positive charge in the arenium ion CANNOT migrate directly onto the electron-poor N. At C-2 and C-4 (ortho/para to N) N⁺ would form, which is energetically very unfavourable." },
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
