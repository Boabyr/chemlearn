export const topic = {
  id: "07-sear-regioselectivity",
  title: "SEAr – Regioselektivität",
  subtitle: "Elektrophile Substitution an Heteroaromaten",
  icon: "⚖️",
  estimatedMinutes: 60,
  theory: `
## Grundprinzip SEAr

1. E⁺ greift HOMO des Aromaten an → Arenium-Ion (Sigma-Komplex)
2. Deprotonierung → aromatisches Produkt

Regioselektivität = Stabilität des Arenium-Ions → mehr Resonanzstrukturen = stabiler = bevorzugt.

## Elektronenreiche Heteroaromaten (aktiviert)

- **Pyrrol:** C-2 >> C-3 (3 vs. 2 Resonanzstrukturen bei α-Angriff)
- **Furan:** C-2 >> C-3 (gleiche Logik)
- **Thiophen:** C-2 >> C-3
- **Indol:** C-3 >> C-2 (AUSNAHME! Benzol-Aromatizität bleibt bei C-3 erhalten)

## Elektronenarme Heteroaromaten (deaktiviert)

- **Pyridin:** SEAr sehr langsam; wenn möglich C-3 (meta zu N)
- C-2 und C-4 besonders deaktiviert (N zieht Elektronen ab)

## Wichtige Reaktionen

| Substrat | Reagenz | Position | Produkt |
|---|---|---|---|
| Indol | NBS | C-3 | 3-Bromindol |
| Furan | Br⁺ | C-2 | 2-Bromfuran |
| Thiophen | Br⁺ | C-2 | 2-Bromthiophen |
| Pyridin | Br₂/hart | C-3 | 3-Brompyridin |
`,
  mechanism: {
    type: "builder",
    title: "SEAr an Indol – Bromierung an C-3",
    description: "Br⁺ greift Indol an C-3 an. Zeige den Elektronenfluss im Arenium-Ion.",
    stages: [
      {
        id: 0,
        label: "Elektrophiler Angriff an C-3",
        description: "Br⁺ (Elektrophil) greift C-3 des Indols an. Das π-System des Pyrrol-Rings liefert Elektronen. Ziehe von C-3(Indol) → Br⁺.",
        hint1: "C-3 ist die reaktivste Position des Indols. Das π-System des Pyrrol-Rings greift das Elektrophil Br⁺ an.",
        hint2: "Ziehe von C-3 (Indol, π-Elektronen) → Br⁺. Es entsteht das Arenium-Ion mit Br an C-3.",
        atoms: [
          { id: "n",  label: "N",  x: 180, y: 130, color: "#2dd4bf", r: 20 },
          { id: "c2", label: "C2", x: 240, y: 80,  color: "#e2e8f0", r: 20 },
          { id: "c3", label: "C3", x: 320, y: 80,  color: "#e2e8f0", r: 22 },
          { id: "c3a",label: "C",  x: 330, y: 160, color: "#e2e8f0", r: 18 },
          { id: "c7a",label: "C",  x: 170, y: 200, color: "#e2e8f0", r: 18 },
          { id: "br", label: "Br⁺",x: 390, y: 40,  color: "#fbbf24", r: 24 },
          { id: "bz", label: "Bz", x: 260, y: 220, color: "#64748b", r: 28 },
        ],
        bonds: [
          { a: "n",  b: "c2",  dash: false, color: "#2dd4bf" },
          { a: "c2", b: "c3",  dash: false, color: "#e2e8f0" },
          { a: "c3", b: "c3a", dash: false, color: "#e2e8f0" },
          { a: "n",  b: "c7a", dash: false, color: "#2dd4bf" },
          { a: "c7a",b: "bz",  dash: false, color: "#64748b" },
          { a: "c3a",b: "bz",  dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "c3", to: "br" },
      },
      {
        id: 1,
        label: "Deprotonierung → Aromatisierung",
        description: "Eine Base (B⁻) abstrahiert das H an C-3 → Aromatizität wird wiederhergestellt. Ziehe von H(C-3) → B⁻.",
        hint1: "Nach Br-Angriff an C-3 ist C-3 sp³. Deprotonierung stellt Aromatizität wieder her.",
        hint2: "Ziehe von H(an C-3) → B⁻ (Base). Das Proton wird abgegeben → aromatisches 3-Bromindol entsteht.",
        atoms: [
          { id: "h",  label: "H",  x: 340, y: 40,  color: "#e2e8f0", r: 16 },
          { id: "c3", label: "C3", x: 310, y: 100, color: "#e2e8f0", r: 22 },
          { id: "br", label: "Br", x: 400, y: 100, color: "#fbbf24", r: 22 },
          { id: "n",  label: "N",  x: 180, y: 130, color: "#2dd4bf", r: 20 },
          { id: "b",  label: "B⁻", x: 420, y: 40,  color: "#f87171", r: 22 },
          { id: "bz", label: "Bz", x: 240, y: 200, color: "#64748b", r: 28 },
        ],
        bonds: [
          { a: "c3", b: "h",  dash: false, color: "#e2e8f0" },
          { a: "c3", b: "br", dash: false, color: "#fbbf24" },
          { a: "c3", b: "n",  dash: false, color: "#2dd4bf" },
          { a: "n",  b: "bz", dash: false, color: "#64748b" },
          { a: "c3", b: "bz", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "h", to: "b" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Warum ist C-2 (α) bei SEAr von Furan bevorzugt gegenüber C-3?", options: ["Sterik bevorzugt C-2", "C-2-Angriff gibt 3 Resonanzstrukturen (inkl. O⁺), C-3-Angriff nur 2", "C-2 hat höhere π-Dichte", "O-Atom ist an C-2 direkt benachbart"], correct: 1, explanation: "C-2: 3 Resonanzstrukturen für Arenium-Ion (inkl. O⁺). C-3: 2 Resonanzstrukturen → C-2 stabiler → bevorzugt." },
    { id: "q2", question: "Indol reagiert mit Br⁺ an welcher Position?", options: ["C-1 (N)", "C-2", "C-3", "C-7"], correct: 2, explanation: "C-3 bevorzugt. Bei C-3-Angriff bleibt Benzol-Aromatizität erhalten, Ladung auf N delokalisiert." },
    { id: "q3", question: "Welche Position ist bei SEAr an Pyridin am wenigsten deaktiviert?", options: ["C-2", "C-3", "C-4", "N-1"], correct: 1, explanation: "C-3 (meta zu N) am wenigsten deaktiviert, weil positive Ladung im ÜZ nicht auf elektronenarmes N wandert." },
    { id: "q4", question: "Welche Resonanzstruktur macht den α-Angriff am Pyrrol besonders günstig?", options: ["Eine mit C⁺ am Heteroatom", "Eine mit N⁺ (positivem Stickstoff)", "Eine mit O⁻", "Keine – SEAr läuft nicht am Pyrrol"], correct: 1, explanation: "Bei α-Angriff: eine der 3 Resonanzstrukturen zeigt N⁺ → zusätzliche Stabilisierung → günstiger als β-Angriff." },
    { id: "q5", question: "Warum ist SEAr an Pyridin so viel langsamer als an Benzol?", options: ["Pyridin ist kleiner", "N entzieht Elektronendichte → niedrigeres HOMO → schlechtere Reaktion mit E⁺", "Pyridin hat keine freien Elektronen", "SEAr an Pyridin ist verboten"], correct: 1, explanation: "Elektronegatives N (sp²) entzieht induktiv und mesomer Elektronendichte → niedrigeres HOMO → deaktiviert für SEAr." },
  ],
  flashcards: [
    { front: "SEAr-Regioselektivität – Grundregel", back: "Position mit stabilstem Arenium-Ion wird bevorzugt. Mehr Resonanzstrukturen = stabiler. Zeichne alle Resonanzstrukturen!" },
    { front: "α vs. β bei 5-Ring-Heteroaromaten", back: "α (C-2) >> β (C-3) für Pyrrol, Furan, Thiophen. AUSNAHME: Indol → C-3 bevorzugt." },
    { front: "SEAr an Pyridin", back: "Stark deaktiviert. C-3 (meta zu N) am wenigsten deaktiviert. SNAr an C-2/C-4 stattdessen bevorzugt." },
    { front: "Bromierung von Indol", back: "Indol + NBS → 3-Bromindol. C-3 ist reaktivste Position. N-H schützen für selektive C-Funktionalisierung." },
    { front: "Arenium-Ion (Sigma-Komplex)", back: "Zwischenprodukt der SEAr. sp³-C am Angriffspunkt. Positive Ladung über π-System delokalisiert. Stabilität → Regioselektivität." },
  ],
};
