export const topic = {
  id: "09-bioisosteres-skeletal-editing",
  title: "Bioisostere & Skeletal Editing",
  subtitle: "Moderne Konzepte in der Wirkstoffchemie",
  icon: "💊",
  estimatedMinutes: 60,
  theory: `
## Bioisostere

**Definition:** Atome/Gruppen mit ähnlicher Größe, Gestalt und Elektronenverteilung mit ähnlicher biologischer Aktivität aber unterschiedlichen chemischen Eigenschaften.

### Klassische bioisostere Ersetzungen

| Original | Bioisoster | Vorteil |
|---|---|---|
| -COOH | Tetrazol | Ähnlicher pKa, metabolisch stabiler |
| -COOH | -SO₂NH₂ | Saurer, wasserlöslicher |
| Benzol | Pyridin | Wasserlöslichkeit ↑, Metabolismus ↓ |
| Benzol | Thiophen | Pharmakophor-Erhalt |

## Skeletal Editing

**Definition:** Direkte Transformation des Ring-Grundgerüsts in 1-3 Stufen ohne vollständigen Neuaufbau.

### Ciamician-Dennstedt-Umlagerung
Pyrrol + Dibromcarben (CHBr₃/Base) → 3-Brompyridin
Mechanismus: [2+1] Cyclopropanierung → Ringerweiterung → Pyridin

## Bioisostere in FDA-Wirkstoffen

- **Losartan:** COOH → Tetrazol (AT₁-Antagonist)
- **Atorvastatin:** Pyrrole-Grundgerüst
- **Apixaban:** Pyrazol-Grundgerüst
`,
  mechanism: {
    type: "builder",
    title: "Tetrazol-Synthese – Bioisoster der Carbonsäure",
    description: "[3+2]-Cycloaddition: Nitril + Azidanion → 5-substituiertes Tetrazol.",
    stages: [
      {
        id: 0,
        label: "1,3-Dipol-Angriff",
        description: "Das Azidanion (N₃⁻, 1,3-Dipol) greift das Nitril (Dipolarophil) an. Ziehe von N(terminal, Azid) → C(Nitril).",
        hint1: "Das Azidanion ist der 1,3-Dipol (N=N⁺=N⁻). Das Nitril ist das Dipolarophil (C≡N).",
        hint2: "Ziehe von N(terminal, δ−) → C des Nitrils (δ+). Das ist der erste Bindungsschluss der [3+2]-CA.",
        atoms: [
          { id: "na", label: "N",  x: 80,  y: 130, color: "#2dd4bf", r: 22, charge: "δ−" },
          { id: "nb", label: "N⁺", x: 155, y: 130, color: "#2dd4bf", r: 20 },
          { id: "nc", label: "N",  x: 230, y: 130, color: "#2dd4bf", r: 20 },
          { id: "r",  label: "R",  x: 80,  y: 60,  color: "#64748b", r: 18 },
          { id: "cn", label: "C",  x: 360, y: 130, color: "#fbbf24", r: 22 },
          { id: "nn", label: "N",  x: 440, y: 130, color: "#60a5fa", r: 20 },
          { id: "rr", label: "R'", x: 440, y: 60,  color: "#64748b", r: 18 },
        ],
        bonds: [
          { a: "r",  b: "na", dash: false, color: "#64748b" },
          { a: "na", b: "nb", dash: false, color: "#2dd4bf" },
          { a: "nb", b: "nc", dash: false, color: "#2dd4bf" },
          { a: "cn", b: "nn", dash: false, color: "#fbbf24" },
          { a: "nn", b: "rr", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "na", to: "cn" },
      },
      {
        id: 1,
        label: "Ringschluss → Tetrazol",
        description: "Der zweite Bindungsschluss: N(Azid, Ende) verbindet sich mit N(Nitril) → 5-Ring geschlossen. Ziehe von N(Nitril) → N(Azid, Ende).",
        hint1: "Nach dem ersten Bindungsschluss (Na→CN) folgt der zweite intramolekular: N des Nitrils und N des Azids verbinden sich.",
        hint2: "Ziehe von N(Nitril, blau) → N(Azid, Ende, grün). Der 5-Ring schließt → Dihydrotetrazol → Aromatisierung → Tetrazol.",
        atoms: [
          { id: "na", label: "N",  x: 130, y: 200, color: "#2dd4bf", r: 20 },
          { id: "nb", label: "N⁺", x: 195, y: 130, color: "#2dd4bf", r: 18 },
          { id: "nc", label: "N",  x: 280, y: 130, color: "#2dd4bf", r: 18 },
          { id: "cn", label: "C",  x: 350, y: 200, color: "#fbbf24", r: 22 },
          { id: "nn", label: "N",  x: 290, y: 250, color: "#60a5fa", r: 20 },
          { id: "r",  label: "R",  x: 80,  y: 250, color: "#64748b", r: 18 },
          { id: "rr", label: "R'", x: 410, y: 240, color: "#64748b", r: 18 },
        ],
        bonds: [
          { a: "r",  b: "na", dash: false, color: "#64748b" },
          { a: "na", b: "nb", dash: false, color: "#2dd4bf" },
          { a: "nb", b: "nc", dash: false, color: "#2dd4bf" },
          { a: "nc", b: "cn", dash: true,  color: "#fbbf24" },
          { a: "cn", b: "nn", dash: false, color: "#fbbf24" },
          { a: "cn", b: "rr", dash: false, color: "#64748b" },
          { a: "nn", b: "na", dash: true,  color: "#2dd4bf" },
        ],
        correctArrow: { from: "nn", to: "nc" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Was ist ein Bioisoster und warum ist Tetrazol ein Bioisoster der Carbonsäure?", options: ["Identische Verbindung", "Gruppe mit ähnlicher Größe, Polarität und pKa aber anderen metabolischen Eigenschaften; Tetrazol pKa ~4-5 ≈ COOH, aber metabolisch stabiler", "Verbindung mit gleicher Löslichkeit", "Prodrug das zu COOH hydrolysiert wird"], correct: 1, explanation: "Bioisostere: ähnliche pKa, Sterik, H-Brücken. Tetrazol (pKa ~4-5) ≈ RCOOH, aber resistent gegen Hydrolyse → längere Wirkdauer." },
    { id: "q2", question: "Was ist Skeletal Editing?", options: ["Klassischer Aufbau", "Direkte Transformation des Ringgerüsts (z.B. Pyrrol → Pyridin) in wenigen Schritten", "Schutzgruppenmanipulation", "FGI ohne Ringänderung"], correct: 1, explanation: "Skeletal Editing: direkter Ringumbau. Ciamician-Dennstedt: Pyrrol + CHBr₃/Base → 3-Brompyridin. Modern: Rh-katalysierte N-Insertion in Benzol → Pyridin." },
    { id: "q3", question: "Welches Reagenz ist für die Ciamician-Dennstedt-Umlagerung entscheidend?", options: ["mCPBA", "NaNH₂", "Dibromcarben (CHBr₃/Base)", "BuLi"], correct: 2, explanation: "Dibromcarben (aus CHBr₃ + starke Base) cyclopropaniert Pyrrol-Ring [2+1] → gespanntes Bicyclus → Ringerweiterung → Brompyridin." },
    { id: "q4", question: "Welcher Wirkstoff enthält Tetrazol als bioisosteren COOH-Ersatz?", options: ["Atorvastatin", "Apixaban", "Losartan", "Pindolol"], correct: 2, explanation: "Losartan (AT₁-Rezeptorblocker): COOH durch Tetrazol ersetzt → bessere Bioverfügbarkeit, metabolische Stabilität, ähnliche Affinität." },
    { id: "q5", question: "Welches Heterocyclus-Bioisoster erhöht Wasserlöslichkeit beim Ersatz von Benzol?", options: ["Thiophen", "Furan", "Cyclopentyl", "Pyridin"], correct: 3, explanation: "Benzol → Pyridin: N erhöht Dipolmoment und H-Brücken-Akzeptor-Kapazität → bessere Wasserlöslichkeit. Klassisches Scaffold-Hopping." },
  ],
  flashcards: [
    { front: "Bioisoster – Definition", back: "Atom/Gruppe mit ähnlicher Sterik, Elektronik und physikochemischen Eigenschaften wie Original, aber anderen metabolischen Eigenschaften." },
    { front: "Tetrazol als COOH-Bioisoster", back: "pKa ~4-5 (≈ COOH). Metabolisch stabil. Synthese: R-CN + NaN₃ → [3+2] → 5-R-Tetrazol. Beispiel: Losartan." },
    { front: "Ciamician-Dennstedt", back: "Pyrrol + CHBr₃/Base (Dibromcarben) → 3-Brompyridin. [2+1] + Ringerweiterung. Skeletal Editing: 5-Ring → 6-Ring." },
    { front: "Skeletal Editing", back: "Direkte Ringgerüst-Transformation in 1-3 Stufen. Pyrrol→Pyridin, Indol→Chinolin, Benzol+N→Pyridin (Rh-kat.). Schneller Zugang zu Analoga." },
    { front: "Benzol → Pyridin Scaffold Hop", back: "Erhöht Wasserlöslichkeit (polarer N), metabolische Stabilität. Verändert Basizität (pKa 5.2), H-Brücken. Klassisch im Drug Design." },
    { front: "Nurr1-Ligand Bioisoster (Exam)", back: "Nurr1-Ligand mit COOH → Tetrazol (pKa ähnlich, stabiler). Synthese: Entsprechendes Nitril → + NaN₃/[3+2] → Tetrazol-Derivat." },
  ],
};
