export const topic = {
  id: "08-mechanisms",
  title: "Reaktionsmechanismen",
  subtitle: "Detaillierte Mechanismen ausgewählter Transformationen",
  icon: "🔬",
  estimatedMinutes: 90,
  theory: `
## Prüfungsrelevante Mechanismen

Alle folgenden Mechanismen werden mit korrekten Elektronenfluss-Pfeilen geprüft.

## 1. Paal-Knorr (1,4-Dicarbonyl → Pyrrol)

1. NH₂ greift Carbonyl-C → Hemiaminal
2. Dehydratisierung → Imin
3. Zweite Kondensation (intramolekular)
4. Dehydratisierung → Dihydropyrrol
5. Tautomerisierung → Pyrrol (aromatisch)

## 2. Kröhnke-Mechanismus

1. α-Bromketon + Pyridin → Pyridinium-Ylid
2. Michael-Addition an α,β-unges. Carbonyl
3. + NH₄OAc → Cyclisierung
4. Dehydratisierung + Aromatisierung → Pyridin

## 3. N-Oxidierung + Boekelheide

1. 2-Methylpyridin + mCPBA → N-Oxid
2. + Ac₂O, Δ → [1,2]-Acyl-Wanderung → 2-(Acetoxymethyl)pyridin

## 4. Kondrat'eva (Oxazol + Alkin)

1. [4+2]-Cycloaddition → Bicyclus
2. Retro-[4+2] → CO₂-Abspaltung → Pyridin

## 5. Intramolekulare [3+2]

Oxadiazol generiert Azomethin-Ylid in situ → intramolekulare [3+2] mit Alkin → bicyclisches Produkt
`,
  mechanism: {
    type: "builder",
    title: "N-Oxidierung & Boekelheide-Umlagerung",
    description: "2-Methylpyridin → N-Oxid → Boekelheide → 2-(Acetoxymethyl)pyridin.",
    stages: [
      {
        id: 0,
        label: "N-Oxidierung",
        description: "mCPBA oxidiert den Pyridin-N. Das Sauerstoffatom der Persäure überträgt sich auf N. Ziehe von O(mCPBA) → N(Pyridin).",
        hint1: "Peracide sind elektrophile O-Überträger. Das nucleophile N-Lone-Pair greift das elektrophile O der Persäure an.",
        hint2: "Ziehe von N(Pyridin, nucleophil) → O(mCPBA, elektrophil). Es entsteht das N-Oxid (N→O).",
        atoms: [
          { id: "n",  label: "N",    x: 200, y: 130, color: "#60a5fa", r: 24 },
          { id: "o",  label: "O",    x: 340, y: 100, color: "#f87171", r: 22, sub: "mCPBA" },
          { id: "c2", label: "C",    x: 290, y: 170, color: "#e2e8f0", r: 20 },
          { id: "c6", label: "C",    x: 110, y: 170, color: "#e2e8f0", r: 20 },
          { id: "me", label: "CH₃",  x: 290, y: 240, color: "#64748b", r: 22 },
        ],
        bonds: [
          { a: "n",  b: "c2", dash: false, color: "#60a5fa" },
          { a: "n",  b: "c6", dash: false, color: "#60a5fa" },
          { a: "c2", b: "me", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "n", to: "o" },
      },
      {
        id: 1,
        label: "Boekelheide: Acylierung",
        description: "Ac₂O aktiviert das N-Oxid. Das O des N-Oxids greift Ac₂O an → O-Acetylierung. Ziehe von O(N-Oxid) → C(Ac₂O).",
        hint1: "Das N-Oxid-O ist nucleophil und greift das Essigsäureanhydrid (Ac₂O) an → O-acyliertes Intermediat.",
        hint2: "Ziehe von O(N-Oxid) → C(=O) des Ac₂O. Es entsteht ein aktiviertes N-Oxid-Acetat-Intermediat.",
        atoms: [
          { id: "no", label: "N→O", x: 160, y: 130, color: "#60a5fa", r: 28 },
          { id: "ac", label: "Ac₂O",x: 340, y: 100, color: "#fbbf24", r: 28 },
          { id: "me", label: "CH₃", x: 200, y: 220, color: "#64748b", r: 22 },
          { id: "c2", label: "C",   x: 240, y: 170, color: "#e2e8f0", r: 18 },
        ],
        bonds: [
          { a: "no", b: "c2", dash: false, color: "#60a5fa" },
          { a: "c2", b: "me", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "no", to: "ac" },
      },
      {
        id: 2,
        label: "Boekelheide: [1,2]-Shift",
        description: "Das Acetat wandert vom O auf das CH₃ der 2-Methylgruppe ([1,2]-O→C-Shift). Ziehe von C(CH₃) → O(Acetat).",
        hint1: "Der [1,2]-Shift: Das Acetat wandert vom aktivierten N-O auf das benzylische CH₂ der Methylgruppe.",
        hint2: "Ziehe von C(CH₂, benzylisch) → O(Acetat). Das Acetat migiert → 2-(Acetoxymethyl)pyridin entsteht.",
        atoms: [
          { id: "ch2",label: "CH₂", x: 160, y: 220, color: "#64748b", r: 22 },
          { id: "oac",label: "OAc", x: 290, y: 100, color: "#fbbf24", r: 24 },
          { id: "n",  label: "N",   x: 200, y: 140, color: "#60a5fa", r: 22 },
          { id: "c2", label: "C",   x: 270, y: 180, color: "#e2e8f0", r: 18 },
        ],
        bonds: [
          { a: "n",   b: "oac", dash: true,  color: "#fbbf24" },
          { a: "n",   b: "c2",  dash: false, color: "#60a5fa" },
          { a: "c2",  b: "ch2", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "ch2", to: "oac" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Was ist der erste Schritt im Paal-Knorr-Mechanismus?", options: ["Oxidation des 1,4-Dicarbonyls", "Nucleophiler Angriff des Amins auf Carbonyl-C → Hemiaminal", "Diels-Alder-Reaktion", "Radikalische Initiierung"], correct: 1, explanation: "Paal-Knorr: RNH₂ greift Carbonyl-C (Lewis-Säure aktiviert) an → Hemiaminal. Dann Dehydratisierung → Imin → Cyclisierung → Pyrrol." },
    { id: "q2", question: "Welches Intermediat entsteht bei mCPBA-Oxidation von Pyridin?", options: ["Pyridinon", "Pyridin-N-Oxid", "Hydroxypyridin", "Pyridinium-Ion"], correct: 1, explanation: "mCPBA (Peracid) oxidiert N → Pyridin-N-Oxid (N→O). Wichtig für SNAr (C-4 aktiviert) und Boekelheide-Umlagerung." },
    { id: "q3", question: "Was ist die Triebkraft der Kondrat'eva-Pyridinsynthese?", options: ["Säurekatalyse", "Aromatisierung + Entropiegewinn durch CO₂-Gasentwicklung", "Reduktion", "Keine – endotherm"], correct: 1, explanation: "Zwei Triebkräfte: Aromatisierung (Pyridin stabil) + Entropiegewinn durch CO₂-Gas (TΔS > 0)." },
    { id: "q4", question: "Im Kröhnke-Mechanismus: Was ist die Rolle des Pyridins im ersten Schritt?", options: ["Pyridin ist Nucleophil → alkyliert α-Bromketon → Pyridinium-Ylid", "Pyridin ist Katalysator", "Pyridin ist Lösungsmittel", "Pyridin ist Oxidationsmittel"], correct: 0, explanation: "Schritt 1: α-Bromketon + Pyridin-N → Pyridinium-Salz. Dieses hat Ylid-Charakter am α-C → Michael-Addition an Enon." },
    { id: "q5", question: "Was ist die Boekelheide-Umlagerung?", options: ["Pyrrol → Pyridin", "2-Methylpyridin-N-Oxid + Ac₂O → 2-(Acetoxymethyl)pyridin durch [1,2]-O→C-Acyl-Wanderung", "Indol → Chinolin", "Cyclopropan → Pyrrol"], correct: 1, explanation: "Boekelheide: N-Oxid + Ac₂O, Δ → Acetat-Migration vom O auf CH₂ der 2-Methylgruppe → 2-(AcOCH₂)pyridin." },
  ],
  flashcards: [
    { front: "Paal-Knorr-Mechanismus", back: "1,4-Dicarbonyl + RNH₂: 1. Hemiaminal; 2. -H₂O → Imin; 3. Cyclisierung (2. Carbonyl); 4. -H₂O → Dihydropyrrol; 5. Tautomerisierung → Pyrrol." },
    { front: "Kröhnke-Schritte", back: "1. α-BrCO + Py → Pyridinium-Ylid. 2. Michael an Enon. 3. + NH₄OAc → Cyclisierung. 4. -H₂O + Aromatisierung → Pyridin." },
    { front: "Azomethin-Ylid", back: "C=N⁺-C⁻ ↔ C⁻-N=C. Generierung: N-Oxide, Münchnone, thermisch aus Aziridinen, Deprotonierung von Iminium-Ionen. [3+2] mit Alkenen/Alkinen." },
    { front: "N-Oxid-Chemie", back: "Pyridin + mCPBA → N-Oxid. Aktiviert C-4 für SNAr. Boekelheide: + Ac₂O, Δ → 2-AcOCH₂-Pyridin. Reduzierbar → zurück zu Pyridin." },
    { front: "[4+2] + Retro-[4+2]", back: "Cycloaddition → Bicyclus → thermische Retro-[4+2] eliminiert XY (CO₂, N₂, SO₂) → Aromat. Triebkraft: Aromatisierung + Gas." },
  ],
};
