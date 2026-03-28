export const topic = {
  id: "01-introduction",
  title: "Allgemeine Einführung",
  subtitle: "Nomenklatur, Aromatizität & Säure-Base-Eigenschaften",
  icon: "📖",
  estimatedMinutes: 60,
  theory: `
## Was ist ein heterocyclischer Compound?

Ein **Heterocyclus** ist ein Ringmolekül, das neben Kohlenstoff mindestens ein weiteres Atom (Heteroatom) enthält – typischerweise N, O oder S.

In diesem Kurs werden ausschließlich **aromatische Heterocyclen** behandelt.

## Bedeutung in Medizin & Natur

- **L-Tryptophan** – essentielle Aminosäure mit Indol-Gerüst
- **L-Histidin** – essentielle Aminosäure mit Imidazol-Seitenkette
- **Thiamin (Vitamin B1)** – wichtiges Coenzym
- **Coffein** – Purin-Alkaloid
- **Losartan** – Tetrazol-haltiger Wirkstoff (Antihypertensivum)
- **Atorvastatin** – Pyrrole-Grundgerüst, Cholesterinsenker

## Hückel-Regel & Aromatizität

Ein Heterocyclus ist aromatisch wenn er:
- Planar ist
- 4n+2 π-Elektronen besitzt (n = 0, 1, 2, …)
- Ein durchgängig konjugiertes System aufweist

## Pyridin-N vs. Pyrrol-N

- **Pyridin-N (sp²):** Lone-Pair im σ-System → BASISCH (pKa 5.2)
- **Pyrrol-N (sp²):** Lone-Pair im π-System → NICHT basisch, aber N-H acide (pKa 17.5)

## Säure-Base-Eigenschaften

| Verbindung | pKa | Erklärung |
|---|---|---|
| Piperidin | ~11 | sp³-N, LP frei |
| Imidazol | 7.0 | ein Pyridin-N + ein Pyrrol-N |
| Pyridin | 5.2 | sp²-N, LP im σ |
| Pyrrol | ~0 | LP im π-System |
`,
  mechanism: {
    type: "builder",
    title: "Protonierung – Pyridin vs. Pyrrol",
    description: "Zeige wo das Proton (H⁺) angreift – am Stickstoff oder am Kohlenstoff?",
    stages: [
      {
        id: 0,
        label: "Pyridin protonieren",
        description: "Pyridin ist basisch. Das Proton H⁺ greift das freie Elektronenpaar des N-Atoms an. Ziehe von N → H⁺.",
        hint1: "Das Lone-Pair des Pyridin-N liegt im σ-System und ist frei verfügbar für Protonierung.",
        hint2: "Ziehe von N(Pyridin) → H⁺. Das Lone-Pair des N greift das Proton an.",
        atoms: [
          { id: "n",  label: "N",  x: 240, y: 100, color: "#60a5fa", r: 24 },
          { id: "h",  label: "H⁺", x: 380, y: 60,  color: "#fbbf24", r: 20 },
          { id: "c2", label: "C",  x: 340, y: 150, color: "#e2e8f0", r: 18 },
          { id: "c3", label: "C",  x: 320, y: 230, color: "#e2e8f0", r: 18 },
          { id: "c4", label: "C",  x: 240, y: 260, color: "#e2e8f0", r: 18 },
          { id: "c5", label: "C",  x: 160, y: 230, color: "#e2e8f0", r: 18 },
          { id: "c6", label: "C",  x: 140, y: 150, color: "#e2e8f0", r: 18 },
        ],
        bonds: [
          { a: "n",  b: "c2", dash: false, color: "#60a5fa" },
          { a: "n",  b: "c6", dash: false, color: "#60a5fa" },
          { a: "c2", b: "c3", dash: false, color: "#e2e8f0" },
          { a: "c3", b: "c4", dash: false, color: "#e2e8f0" },
          { a: "c4", b: "c5", dash: false, color: "#e2e8f0" },
          { a: "c5", b: "c6", dash: false, color: "#e2e8f0" },
        ],
        correctArrow: { from: "n", to: "h" },
      },
      {
        id: 1,
        label: "Pyrrol – N-H Acidität",
        description: "Pyrrol-N-H ist acide. Eine Base (B⁻) abstrahiert das N-H Proton. Ziehe von H(N) → B⁻.",
        hint1: "Das Pyrrolid-Anion ist aromatisch (6 π-e⁻) → Deprotonierung begünstigt.",
        hint2: "Ziehe von H(am N) → B⁻ (die Base). Das N-H ist acide weil das entstehende Anion aromatisch ist.",
        atoms: [
          { id: "nh", label: "H",  x: 240, y: 55,  color: "#e2e8f0", r: 16 },
          { id: "n",  label: "N",  x: 240, y: 110, color: "#2dd4bf", r: 22 },
          { id: "b",  label: "B⁻", x: 390, y: 55,  color: "#f87171", r: 22 },
          { id: "c2", label: "C",  x: 330, y: 170, color: "#e2e8f0", r: 18 },
          { id: "c3", label: "C",  x: 290, y: 240, color: "#e2e8f0", r: 18 },
          { id: "c4", label: "C",  x: 190, y: 240, color: "#e2e8f0", r: 18 },
          { id: "c5", label: "C",  x: 150, y: 170, color: "#e2e8f0", r: 18 },
        ],
        bonds: [
          { a: "n",  b: "nh", dash: false, color: "#e2e8f0" },
          { a: "n",  b: "c2", dash: false, color: "#2dd4bf" },
          { a: "n",  b: "c5", dash: false, color: "#2dd4bf" },
          { a: "c2", b: "c3", dash: false, color: "#e2e8f0" },
          { a: "c3", b: "c4", dash: false, color: "#e2e8f0" },
          { a: "c4", b: "c5", dash: false, color: "#e2e8f0" },
        ],
        correctArrow: { from: "nh", to: "b" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Welche Aussage zur Aromatizität von Pyrrol ist korrekt?", options: ["Das freie Elektronenpaar des N ist nicht Teil des π-Systems", "Pyrrol hat 6 π-Elektronen und ist daher aromatisch (Hückel: n=1)", "Pyrrol ist nicht aromatisch weil es ein Heteroatom enthält", "Pyrrol folgt der 4n-Regel"], correct: 1, explanation: "Pyrrol hat 6 π-Elektronen (4 aus C=C + 2 vom N-Lone-Pair). Das LP des sp²-N liegt in der Ringebene → Teil des π-Systems → aromatisch." },
    { id: "q2", question: "Warum ist Pyridin (pKa 5.2) deutlich basischer als Pyrrol (pKa ~0)?", options: ["Weil Pyridin mehr C-Atome hat", "Weil das N-Lone-Pair im Pyrrol im π-System delokalisiert ist", "Weil Pyridin ein 6-Ring ist", "Weil Pyridin sp³-N enthält"], correct: 1, explanation: "Im Pyrrol ist das LP des N Teil des aromatischen π-Systems. Protonierung würde Aromatizität zerstören → sehr ungünstig → nicht basisch." },
    { id: "q3", question: "Welcher Heterocyclus ist am wenigsten basisch?", options: ["Piperidin", "Pyridin", "Imidazol", "Pyrrol"], correct: 3, explanation: "Pyrrol: LP vollständig ins π-System eingebunden. Reihe: Piperidin (pKa~11) > Imidazol (7.0) > Pyridin (5.2) > Pyrrol (~0)." },
    { id: "q4", question: "Was versteht man unter dem Hantzsch-Widman-System?", options: ["Nomenklatur für acyclische Heteroverbindungen", "Systematisches Nomenklaturssystem für 3-10-gliedrige Heterocyclen", "Methode zur Synthese von Pyridinen", "System zur Bestimmung der Aromatizität"], correct: 1, explanation: "Das Hantzsch-Widman-System ist ein IUPAC-Nomenklaturssystem für kleine bis mittelgroße Heterocyclen (3–10-gliedrig)." },
    { id: "q5", question: "Welchen Trivialnamen trägt 1-Azabenzol?", options: ["Imidazol", "Pyrimidin", "Pyridin", "Pyrrol"], correct: 2, explanation: "1-Azabenzol = Pyridin. Systematisch: Benzolring mit N statt CH an Position 1." },
    { id: "q6", question: "Ein Heterocyclus ist aromatisch wenn er…", options: ["planar ist, 4n+2 π-Elektronen besitzt und durchgängig konjugiert ist", "mindestens ein N-Atom enthält", "genau 6 Atome im Ring hat", "kein Lone-Pair am Heteroatom hat"], correct: 0, explanation: "Aromatizität: Planarität + 4n+2 π-Elektronen (Hückel) + durchgängige Konjugation." },
  ],
  flashcards: [
    { front: "Hückel-Regel", back: "4n+2 π-Elektronen, planar, durchgängig konjugiert. Beispiele: Benzol (6e), Pyrrol (6e), Furan (6e), Pyridin (6e)." },
    { front: "Pyrrol-N vs. Pyridin-N", back: "Pyrrol-N: LP im π-System → NICHT basisch (pKa~0), aber N-H acide (pKa 17.5). Pyridin-N: LP im σ → BASISCH (pKa 5.2)." },
    { front: "Hantzsch-Widman-Nomenklatur", back: "3–10-Ring-Heterocyclen. Präfix: oxa (O), thia (S), aza (N). Endung: -ole (5-Ring unges.), -ine (6-Ring N)." },
    { front: "Imidazol – besondere Eigenschaften", back: "Zwei N-Atome: Pyrrol-N (LP im π, nicht basisch) + Pyridin-N (LP frei, basisch). pKa = 7.0. Tautomerie möglich." },
    { front: "FMO-Theorie & Reaktivität", back: "Für SEAr ist das HOMO entscheidend. Pyrrol/Furan/Thiophen: höheres HOMO → reaktiver als Benzol. Pyridin: niedrigeres HOMO → weniger reaktiv." },
    { front: "Basizitätsreihe N-Heterocyclen", back: "Piperidin (sp³, pKa~11) > Imidazol (pKa 7.0) > Pyridin (pKa 5.2) > Pyrrol (pKa~0)" },
    { front: "Furan", back: "1-Oxacyclopenta-2,4-dien. 5-Ring, O-Heteroatom, 6 π-Elektronen. Aromatisch aber weniger stabil als Benzol." },
    { front: "Koopmans-Theorem", back: "Ionisationsenergie ≈ negative Orbital-Energie des entfernten Elektrons. Ermöglicht Abschätzung der SEAr-Reaktivität." },
  ],
};
