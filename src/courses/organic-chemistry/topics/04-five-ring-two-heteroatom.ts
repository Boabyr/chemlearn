export const topic = {
  id: "04-five-ring-two-heteroatoms",
  title: "5-Ring-Heteroaromaten (2+ Heteroatome)",
  subtitle: "Imidazol, Oxazol, Pyrazol, Triazol, Tetrazol",
  icon: "🟠",
  estimatedMinutes: 80,
  theory: `
## Übersicht

| Verbindung | Heteroatome | Besonderheit |
|---|---|---|
| Imidazol | N,N (1,3) | ein Pyrrol-N + ein Pyridin-N; pKa 7.0 |
| Pyrazol | N,N (1,2) | beide N benachbart |
| Oxazol | N,O (1,3) | O an 1, N an 3 |
| Thiazol | N,S (1,3) | Grundgerüst von Penicillin, Vitamin B1 |
| 1,2,3-Triazol | N,N,N | durch CuAAC-Click-Chemie zugänglich |
| Tetrazol | N,N,N,N | Bioisoster der Carbonsäure |

## Imidazol

- **N-1 (Pyrrol-N):** LP im π-System → nicht basisch
- **N-3 (Pyridin-N):** LP im σ-System → basisch (pKa 7.0)
- Tautomerie: NH wandert zwischen N-1 und N-3

## CuAAC – Click-Chemie

R-N₃ + R'-C≡CH + Cu(I) → **1,4-disubst. 1,2,3-Triazol** (regioselektiv)

Ohne Cu (Huisgen): Gemisch aus 1,4- und 1,5-Isomeren.

## Tetrazol als Bioisoster

Tetrazol ersetzt COOH: ähnlicher pKa (~4-5), bessere metabolische Stabilität. Beispiel: **Losartan**.

Synthese: R-CN + NaN₃ → [3+2] → 5-Tetrazol
`,
  mechanism: {
    type: "builder",
    title: "CuAAC Click-Chemie – Triazol-Synthese",
    description: "Zeichne die [3+2]-Cycloaddition: Azid + Alkin → 1,2,3-Triazol.",
    stages: [
      {
        id: 0,
        label: "1,3-Dipol aktivieren",
        description: "Das Azid (1,3-Dipol) nähert sich dem Alkin (Dipolarophil). Cu(I) aktiviert das Alkin. Ziehe von N(terminal) → C(terminal des Alkins).",
        hint1: "Das terminale N des Azids (nucleophil) greift das aktivierte terminale C des Alkins an.",
        hint2: "Ziehe von N(δ−, terminal) → C≡CH (terminal). Cu koordiniert am Alkin-π-System.",
        atoms: [
          { id: "n1", label: "N",  x: 80,  y: 130, color: "#2dd4bf", r: 22, charge: "δ−" },
          { id: "n2", label: "N⁺", x: 160, y: 130, color: "#2dd4bf", r: 22 },
          { id: "n3", label: "N",  x: 240, y: 130, color: "#2dd4bf", r: 22 },
          { id: "r1", label: "R",  x: 80,  y: 60,  color: "#64748b", r: 18 },
          { id: "ca", label: "C",  x: 360, y: 130, color: "#fbbf24", r: 22 },
          { id: "cb", label: "CH", x: 430, y: 130, color: "#fbbf24", r: 22 },
          { id: "cu", label: "Cu", x: 395, y: 60,  color: "#f87171", r: 20 },
        ],
        bonds: [
          { a: "r1", b: "n1", dash: false, color: "#64748b" },
          { a: "n1", b: "n2", dash: false, color: "#2dd4bf" },
          { a: "n2", b: "n3", dash: false, color: "#2dd4bf" },
          { a: "ca", b: "cb", dash: false, color: "#fbbf24" },
          { a: "cu", b: "ca", dash: true,  color: "#f87171" },
        ],
        correctArrow: { from: "n3", to: "cb" },
      },
      {
        id: 1,
        label: "Ringschluss",
        description: "Der zweite Bindungsschluss: N-1 des Azids verbindet sich mit C-4 des Alkins. Ziehe von N(R-N) → C(Cu-gebunden).",
        hint1: "Nach dem ersten Bindungsschluss (N3→C5) erfolgt der zweite: N1 greift C4 an → 5-Ring geschlossen.",
        hint2: "Ziehe von N1 (R-gebunden) → C4 (Cu-Seite). Der Cu-Katalysator ermöglicht Regiokontrolle → 1,4-Produkt.",
        atoms: [
          { id: "n1", label: "N",  x: 130, y: 200, color: "#2dd4bf", r: 22 },
          { id: "n2", label: "N⁺", x: 200, y: 130, color: "#2dd4bf", r: 20 },
          { id: "n3", label: "N",  x: 300, y: 130, color: "#2dd4bf", r: 20 },
          { id: "c4", label: "C",  x: 370, y: 200, color: "#fbbf24", r: 22 },
          { id: "c5", label: "C",  x: 300, y: 240, color: "#fbbf24", r: 20 },
          { id: "r",  label: "R",  x: 80,  y: 240, color: "#64748b", r: 18 },
        ],
        bonds: [
          { a: "r",  b: "n1", dash: false, color: "#64748b" },
          { a: "n1", b: "n2", dash: false, color: "#2dd4bf" },
          { a: "n2", b: "n3", dash: false, color: "#2dd4bf" },
          { a: "n3", b: "c4", dash: true,  color: "#fbbf24" },
          { a: "c4", b: "c5", dash: false, color: "#fbbf24" },
          { a: "c5", b: "n1", dash: true,  color: "#2dd4bf" },
        ],
        correctArrow: { from: "n1", to: "c4" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Warum hat Imidazol einen pKa von 7.0?", options: ["Beide N-Atome sind gleich basisch", "Ein N ist Pyrrol-artig (LP im π) und eines Pyridin-artig (LP frei). pKa 7.0 durch Stabilisierung des Imidazolium-Kations", "Das O-Atom erhöht Basizität", "Imidazol hat 8 π-Elektronen"], correct: 1, explanation: "N-1 (Pyrrol-N): LP im π, nicht basisch. N-3 (Pyridin-N): LP frei, basisch. pKa 7.0 > Pyridin (5.2) weil Imidazolium-Kation durch beide N stabilisiert." },
    { id: "q2", question: "Was ist ein Bioisoster und welches Beispiel findet sich beim Tetrazol?", options: ["Identische Verbindung mit gleichem MW", "Strukturell ähnliche Gruppe mit vergleichbaren Eigenschaften die COOH ersetzen kann (Tetrazol statt COOH in Losartan)", "Radioaktiv markiertes Analogon", "Verbindung mit gleicher Summenformel"], correct: 1, explanation: "Bioisostere: ähnliche Sterik, Elektronik und pKa. Tetrazol (pKa ~4-5) ≈ RCOOH (pKa ~4-5), aber metabolisch stabiler. Einsatz in Losartan." },
    { id: "q3", question: "Was ist das Besondere an der CuAAC-Click-Chemie?", options: ["Gibt immer 1,5-disubst. Triazol", "Gibt regioselektiv 1,4-disubst. 1,2,3-Triazol aus Azid + terminalem Alkin", "Benötigt Hochdruck", "Verläuft über Carben-Mechanismus"], correct: 1, explanation: "CuAAC: Azid + terminales Alkin + Cu(I) → selektiv 1,4-disubst. 1,2,3-Triazol. Ohne Cu (Huisgen): Gemisch. RuAAC → 1,5-Isomer." },
    { id: "q4", question: "In welchem Wirkstoff spielt das Thiazolium-Ion als Coenzym eine Rolle?", options: ["Imidazol", "Thiamin (Vitamin B1)", "Coffein", "Histidin"], correct: 1, explanation: "Thiaminpyrophosphat (Vitamin B1): C-2-H des Thiazoliumions ist acide → nucleophiles Carbenzentrum (NHC-artig) → Acyl-Gruppenübertragung." },
    { id: "q5", question: "Wie wird ein Tetrazol synthetisiert?", options: ["Aldehyd + Hydrazin", "Nitril + NaN₃ → [3+2]-Cycloaddition", "1,3-Dicarbonyl + NH₂OH", "Dien + Dienophil"], correct: 1, explanation: "R-CN + NaN₃ → [3+2]-Cycloaddition → 5-substituiertes Tetrazol. Das Azidanion ist der 1,3-Dipol, das Nitril das Dipolarophil." },
  ],
  flashcards: [
    { front: "Imidazol – zwei N-Atome", back: "N-1 (Pyrrol-N): LP im π → nicht basisch. N-3 (Pyridin-N): LP frei → basisch. pKa = 7.0. Tautomerie. Wichtig in Enzymen (His-Rest)." },
    { front: "CuAAC – Click-Chemie", back: "R-N₃ + R'C≡CH → Cu(I) → 1,4-disubst. 1,2,3-Triazol. Regioselektiv. RuAAC → 1,5-Isomer. Ohne Metall (Huisgen): Gemisch." },
    { front: "Tetrazol als Bioisoster", back: "Ersetzt COOH. Ähnlicher pKa (~4-5), bessere metabolische Stabilität. Synthese: R-CN + NaN₃ → [3+2] → 5-R-Tetrazol. Beispiel: Losartan." },
    { front: "Thiazolium-Chemie (Vitamin B1)", back: "C-2-H des Thiazoliumions acide. Deprotonierung → nucleophiles Carbenzentrum (NHC-artig). Acyl-Übertragung im Stoffwechsel." },
    { front: "Isoxazol – latenter β-Enaminon", back: "Isoxazol: N-O-Bindung schwach → reduktive Spaltung → β-Enaminon. Strategie: Isoxazol als geschütztes β-Enaminon in der Synthese." },
    { front: "1,2,4-Triazol Nomenklatur", back: "N an Positionen 1,2,4. 1H: NH an Position 1. 3-amino: NH₂ an C-3. Trivialname: Amitrole (Herbizid)." },
  ],
};
