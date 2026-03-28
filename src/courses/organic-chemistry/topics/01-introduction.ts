// src/courses/organic-chemistry/topics/01-introduction.ts
// Quelle: 01-General_Introduction (Vorlesung VO 270280)

export const topic = {
  id: "01-introduction",
  title: "Allgemeine Einführung",
  subtitle: "Nomenklatur, Aromatizität & Säure-Base-Eigenschaften",
  icon: "📖",
  estimatedMinutes: 60,

  theory: `
## Was ist ein heterocyclischer Compound?

Ein **Heterocyclus** ist ein Ringmolekül, das neben Kohlenstoff mindestens ein weiteres Atom (Heteroatom) enthält – typischerweise N, O oder S.

In diesem Kurs werden ausschließlich **aromatische Heterocyclen** behandelt. Nicht-aromatische Heterocyclen (z.B. THF, Piperidin) sind nicht Gegenstand der Vorlesung.

## Bedeutung in Medizin & Natur

Heterocyclen sind allgegenwärtig:
- **L-Tryptophan** – essentielle Aminosäure mit Indol-Gerüst
- **L-Histidin** – essentielle Aminosäure mit Imidazol-Seitenkette
- **Thiamin (Vitamin B1)** – wichtiges Coenzym (Pyrimidin + Thiazol)
- **Coffein** – Purin-Alkaloid
- **Apixaban** – Pyrazol-haltiger Wirkstoff (Antikoagulans)
- **Atorvastatin** – Cholesterinsenker (Pyrrole-Grundgerüst), Jahresumsatz ~12 Mrd. $ (2011)
- **Methylenblau** – Farbstoff und Therapeutikum
- **HATU** – modernes Kupplungsreagenz in der Peptidsynthese

## Hückel-Regel & Aromatizität

Ein Heterocyclus ist aromatisch, wenn er:
1. **Planar** ist
2. **4n+2 π-Elektronen** besitzt (n = 0, 1, 2, …)
3. Ein **durchgängig konjugiertes System** aufweist
4. Das Heteroatom seinen Beitrag zum π-System liefert

**Wichtige Unterscheidung:**
- Pyridin-artiger N (sp²): das freie Elektronenpaar steht **senkrecht** zur Ringebene → gehört NICHT zum π-System → verfügbar für Basizität
- Pyrrol-artiger N (sp²): das freie Elektronenpaar liegt **in der Ringebene** → Teil des π-Systems → NICHT basisch

## Nomenklatur – Grundregeln

### Präfixe für Heteroatome:
| Heteroatom | Präfix (gesättigt) | Präfix (ungesättigt) |
|---|---|---|
| O | oxa | ox |
| S | thia | thi |
| N | aza | az |

### Hantzsch-Widman-System (3–10-Ring):
- **3-Ring:** -irine (unges.), -iridine (ges.)
- **5-Ring:** -ole (unges.), -olidine (ges.)
- **6-Ring:** -ine (N-haltig), -an (O/S-haltig)

### Wichtige Trivialnamen (auswendig lernen!):
| Verbindung | Trivialname |
|---|---|
| 1-Oxa-2,4-cyclopentadien | Furan |
| 1-Thia-2,4-cyclopentadien | Thiophen |
| 1-Aza-2,4-cyclopentadien | Pyrrol |
| 1,3-Diazacyclopenta-2,4-dien | Imidazol |
| 1,3-Oxazacyclopenta-2,4-dien | Oxazol |
| 1-Azabenzol | Pyridin |
| 1,3-Diazabenzol | Pyrimidin |

## Säure-Base-Eigenschaften N-haltiger Heterocyclen

**Grundregel:** Je stärker das freie Elektronenpaar in die Aromatizität eingebunden ist, desto **weniger basisch** ist das Stickstoffatom.

| Verbindung | pKa (konjug. Säure) | Erklärung |
|---|---|---|
| Piperidin (sp³-N) | ~11 | LP nicht im Ring, maximal verfügbar |
| Pyridin (sp²-N) | 5.2 | LP im σ-System, frei |
| Pyrrol (sp²-N) | ~0 (sehr wenig) | LP im π-System, nicht verfügbar |
| Imidazol | 7.0 | ein basischer + ein Pyrrol-N |

**Strukturelle Einflüsse auf Basizität:**
- Induktive Effekte (EWG → weniger basisch)
- Sterische Hinderung (z.B. 2,6-Di-tBu-Pyridin: pKa = 3.7)
- Zusätzliche N-Atome (Pyrimidazin < Pyridin, da induktiver EWG-Effekt)

## FMO-Theorie & Reaktivität

**Koopmans-Theorem:** Ionisationsenergie ≈ Orbital-Energie des entfernten Elektrons

Für elektrophile aromatische Substitution (SEAr):
- HOMO-Energie entscheidend
- Pyrrol, Furan, Thiophen: höheres HOMO → reaktiver als Benzol
- Pyridin: niedrigeres HOMO → weniger reaktiv als Benzol (deaktiviert durch N)

**Energiediagramm für SEAr:**
Hammond-Postulate: Bei endergonen Reaktionen ähnelt der ÜZ dem Produkt strukturell.
  `,

  mechanism: {
    type: "static",
    description:
      "Elektronenverteilung in Pyridin vs. Pyrrol – Basizität erklärt",
    stages: [
      {
        label: "Pyridin – basischer N",
        description:
          "Das freie Elektronenpaar des sp²-Stickstoffs liegt in einem σ-Orbital senkrecht zur Ringebene. Es ist NICHT Teil des π-Systems → verfügbar für Protonierung.",
        atoms: [
          { id: "n", label: "N", x: 240, y: 80, color: "#60a5fa", r: 26 },
          { id: "c2", label: "C", x: 340, y: 130, color: "#e2e8f0", r: 22 },
          { id: "c3", label: "C", x: 340, y: 220, color: "#e2e8f0", r: 22 },
          { id: "c4", label: "C", x: 240, y: 270, color: "#e2e8f0", r: 22 },
          { id: "c5", label: "C", x: 140, y: 220, color: "#e2e8f0", r: 22 },
          { id: "c6", label: "C", x: 140, y: 130, color: "#e2e8f0", r: 22 },
          { id: "lp", label: ":N", x: 240, y: 30, color: "#60a5fa", r: 18 },
        ],
        bonds: [
          { a: "n", b: "c2", dash: false, color: "#60a5fa" },
          { a: "n", b: "c6", dash: false, color: "#60a5fa" },
          { a: "c2", b: "c3", dash: false, color: "#e2e8f0" },
          { a: "c3", b: "c4", dash: false, color: "#e2e8f0" },
          { a: "c4", b: "c5", dash: false, color: "#e2e8f0" },
          { a: "c5", b: "c6", dash: false, color: "#e2e8f0" },
        ],
      },
    ],
  },

  quiz: [
    {
      id: "q1",
      question:
        "Welche Aussage zur Aromatizität von Pyrrol ist korrekt?",
      options: [
        "Das freie Elektronenpaar des N ist nicht Teil des π-Systems",
        "Pyrrol hat 6 π-Elektronen und ist daher aromatisch (Hückel: n=1)",
        "Pyrrol ist nicht aromatisch weil es ein Heteroatom enthält",
        "Pyrrol folgt der 4n-Regel und ist damit antiaromatisch",
      ],
      correct: 1,
      explanation:
        "Pyrrol hat 6 π-Elektronen (4 aus den zwei Doppelbindungen + 2 vom N-Lone-Pair). Das freie Elektronenpaar des sp²-N liegt in der Ringebene und ist Teil des π-Systems → Pyrrol ist aromatisch (Hückel, n=1).",
    },
    {
      id: "q2",
      question:
        "Warum ist Pyridin (pKa 5.2) deutlich basischer als Pyrrol (pKa ~0)?",
      options: [
        "Weil Pyridin mehr Kohlenstoffatome hat",
        "Weil das N-Lone-Pair im Pyrrol im π-System delokalisiert ist und nicht für Protonierung zur Verfügung steht",
        "Weil Pyridin ein 6-Ring und Pyrrol ein 5-Ring ist",
        "Weil Pyridin sp³-hybridisiertes N enthält",
      ],
      correct: 1,
      explanation:
        "Im Pyrrol ist das Lone-Pair des N Teil des aromatischen π-Systems (6 π-e⁻). Protonierung würde die Aromatizität zerstören → sehr ungünstig → nicht basisch. Im Pyridin liegt das LP in einem σ-Orbital und ist frei verfügbar.",
    },
    {
      id: "q3",
      question:
        "Welches der folgenden Heterocyclen ist am wenigsten basisch?",
      options: ["Piperidin", "Pyridin", "Imidazol", "Pyrrol"],
      correct: 3,
      explanation:
        "Pyrrol hat das Lone-Pair des N vollständig ins π-System eingebunden (notwendig für Aromatizität). Piperidin (sp³-N, pKa~11) > Imidazol (pKa 7.0) > Pyridin (pKa 5.2) > Pyrrol (pKa ~0).",
    },
    {
      id: "q4",
      question:
        "Was versteht man unter dem 'Hantzsch-Widman-System'?",
      options: [
        "Ein Nomenklaturssystem für acyclische Heteroverbindungen",
        "Ein systematisches Nomenklaturssystem für 3- bis 10-gliedrige Heterocyclen",
        "Eine Methode zur Synthese von Pyridinen",
        "Ein System zur Bestimmung der Aromatizität",
      ],
      correct: 1,
      explanation:
        "Das Hantzsch-Widman-System ist ein IUPAC-Nomenklaturssystem speziell für kleine bis mittelgroße Heterocyclen (3–10-gliedrig). Es kombiniert Präfixe für Heteroatome (oxa-, thia-, aza-) mit Endungen für Ringgröße und Sättigungsgrad (z.B. -ol, -ine).",
    },
    {
      id: "q5",
      question:
        "Welchen Trivialname trägt 1-Azabenzol?",
      options: ["Imidazol", "Pyrimidin", "Pyridin", "Pyrrol"],
      correct: 2,
      explanation:
        "1-Azabenzol = Pyridin. Der systematische Name beschreibt den Benzolring, bei dem ein CH durch N ersetzt wurde. Pyrimidin wäre 1,3-Diazabenzol.",
    },
    {
      id: "q6",
      question:
        "Ein Heterocyclus ist aromatisch, wenn er… (wähle alle zutreffenden Kriterien – hier: beste Antwort)",
      options: [
        "planar ist, 4n+2 π-Elektronen besitzt und ein durchgängig konjugiertes System hat",
        "mindestens ein N-Atom enthält",
        "genau 6 Atome im Ring hat",
        "kein Heteroatom mit freiem Elektronenpaar enthält",
      ],
      correct: 0,
      explanation:
        "Aromatizität bei Heterocyclen erfordert: Planarität + 4n+2 π-Elektronen (Hückel) + durchgängige Konjugation. Das Heteroatom muss entweder eine Doppelbindung oder sein Lone-Pair zum π-System beitragen.",
    },
  ],

  flashcards: [
    {
      front: "Hückel-Regel",
      back: "Ein Molekül ist aromatisch wenn es planar ist und 4n+2 π-Elektronen besitzt (n = 0,1,2,...). Beispiele: Benzol (6e), Pyrrol (6e), Furan (6e), Pyridin (6e).",
    },
    {
      front: "Pyrrol-Stickstoff vs. Pyridin-Stickstoff",
      back: "Pyrrol-N: sp², LP im π-System → NICHT basisch (pKa~0). Pyridin-N: sp², LP im σ-System (senkrecht zur Ebene) → BASISCH (pKa 5.2).",
    },
    {
      front: "Hantzsch-Widman-Nomenklatur",
      back: "Systematik für 3–10-Ring-Heterocyclen. Präfix: oxa (O), thia (S), aza (N). Endung: -irine (3-Ring unges.), -ole (5-Ring unges.), -ine (6-Ring N).",
    },
    {
      front: "Furan",
      back: "Systematisch: 1-Oxacyclopenta-2,4-dien. 5-Ring, O-Heteroatom, 6 π-Elektronen (4 C=C + 2 vom O-LP). Aromatisch, aber weniger stabil als Benzol.",
    },
    {
      front: "Imidazol – besondere Eigenschaften",
      back: "Enthält ZWEI N-Atome: ein Pyrrol-N (LP im π-System, nicht basisch) und ein Pyridin-N (LP frei, basisch). pKa = 7.0. Tautomerie möglich (NH wandert).",
    },
    {
      front: "FMO-Theorie & Reaktivität",
      back: "Für SEAr ist das HOMO entscheidend. Elektronenreiche Heteroaromaten (Pyrrol, Furan, Thiophen) haben höheres HOMO → reaktiver als Benzol. Pyridin: niedrigeres HOMO → weniger reaktiv.",
    },
    {
      front: "Koopmans-Theorem",
      back: "Ionisationsenergie ≈ negative Orbital-Energie des entfernten Elektrons (Ii ≈ -εi). Ermöglicht Abschätzung der Reaktivität von Heteroaromaten gegenüber Elektrophilen.",
    },
    {
      front: "Basizitätsreihe N-Heterocyclen",
      back: "Piperidin (sp³, pKa~11) > Imidazol (pKa 7.0) > Pyridin (pKa 5.2) > 2,6-di-tBu-Pyridin (pKa 3.7, sterisch) > Pyrimidin (pKa 2.3, induktiv EWG) > Pyrrol (pKa~0)",
    },
  ],
};
