// src/courses/organic-chemistry/topics/02-pyridines.ts
// Quelle: 02-Pyridines: Synthesis and Reactivity (Vorlesung VO 270280)

export const topic = {
  id: "02-pyridines",
  title: "Pyridine",
  subtitle: "Synthese & Reaktivität",
  icon: "🔵",
  estimatedMinutes: 90,

  theory: `
## Bedeutung von Pyridinen in der Pharmazie

Pyridin-Grundgerüste finden sich in zahlreichen FDA-zugelassenen Wirkstoffen (General uses: Base, Lösungsmittel, Synthesebaustein).

## I. Synthese von Pyridin-Derivaten

### A. Cyclocondensation [3+3] – Hantzsch-Dihydropyridin-Synthese
**Reagenzien:** Enamin + 1,3-Dicarbonylverbindung (oder Aldehyd + β-Ketoester + NH₃)

**Problem:** Bei unsymmetrischen Enaminen + unsymmetrischen 1,3-Dicarbonylen entstehen zwei Regioisomere (P1 + P2).

**Lösung für Regioselektivität:** 
- Vorsynthetisiertes Enamin mit definierter Regiochemie verwenden
- Oder: Reaktion über konjugate Addition–konjugate Eliminierung leiten

**Wichtige Reaktionen des [3+3]-Typs:**
- **Guareschi-Thorpe-Reaktion:** Cyanoacetyl-Derivate + 1,3-Dicarbonyl → 2-Pyridinon
- **Bohlmann-Rahtz-Reaktion:** Enaminon + β-Ketoester → Pyridin

### B. Cyclocondensation [5+1]
Reaktion einer 1,5-Dicarbonylverbindung mit NH₃ → Pyridin (nach Oxidation)

### C. Cyclocondensation [3+2+1]
**Kröhnke-Reaktion:** 1,5-Dicarbonylverbindung + NH₃
Mechanismus: Aldol-Kondensation → Michael-Addition → Cyclisierung → Aromatisierung

### D. Cyclocondensation [2+2+1+1]
Kombination verschiedener Baugruppen für funktionalisierte Pyridine

### E. Cycloaddition [4+2] – Diels-Alder-artige Reaktionen
**Azadien + Dienophil:**
- Cyclisches Azadien + Alkin (Dienophil: z.B. CO₂-Reste)
- **Boger-Reaktion:** Triazin als Azadien + Enamin (XY = N₂, Retro-DA eliminiert N₂)
- **Kondrat'eva-Pyridinsynthese:** Oxazol als Azadien + Dienophil → Pyridin

**Mechanismus Kondrat'eva:**
1. [4+2]-Cycloaddition des Oxazols (als 1-Oxa-1,3-butadien) mit Alkin
2. Bicyclischer Übergangszustand
3. Retro-[4+2]: Eliminierung von CO₂
4. Aromatisches Pyridin als Produkt

### F. Cycloaddition [2+2+2]
**Bönnemann-Reppe-Synthese:** Trimerisation eines Nitrils mit zwei Äquivalenten Alkin (Cobalt-Katalyse)

### G. Umlagerungen
**Ciamician-Dennstedt-Umlagerung:** Pyrrol + Cyclopropan → Pyridin-Derivat

## II. Reaktivität von Pyridinen

### Elektrophile aromatische Substitution (SEAr)
Pyridin ist **deaktiviert** gegenüber SEAr (N zieht Elektronendichte ab):
- Reaktion sehr langsam, erfordert harte Bedingungen
- Bevorzugte Position: **C-3** (meta-artig zum N)
- Bromierung nur unter drastischen Bedingungen möglich

### Nucleophile aromatische Substitution (SNAr)
Pyridin ist **aktiviert** gegenüber SNAr:
- Bevorzugte Positionen: **C-2 und C-4** (para/ortho zum N)
- Wichtige Reaktionen:
  - **Chichibabin-Reaktion:** Pyridin + NaNH₂ → 2-Aminopyridin
  - **Meisenheimer-Komplex** als Zwischenstufe

### N-Oxidierung
Pyridin + mCPBA → Pyridin-N-Oxid
- N-Oxide: Aktivierung für SEAr (Position 4) und SNAr
- **Boekelheide-Umlagerung:** N-Oxid + Ac₂O, Δ → 2-Acetoxymethylpyridin

### Seitenkettenreaktionen
2-Methylpyridin: α-Methylen stark acide (analog zu Ketonen)
- Lithiierung möglich → Weiterreaktion mit Elektrophilen
  `,

mechanism: {
    type: 'builder',
    title: 'Kröhnke-Reaktion – Mechanismus',
    description: 'Zeichne die Elektronenfluss-Pfeile Schritt für Schritt.',
    stages: [
      {
        id: 0,
        label: 'Nucleophiler Angriff',
        description: 'Das Pyridinium-Ylid greift nucleophil den β-Kohlenstoff des Enons an (Michael-Addition). Ziehe vom Ylid-C zum β-C des Enons.',
        hint1: 'Das Ylid-C ist nucleophil (carbanionisch). Es greift das elektrophile β-C der α,β-ungesättigten Carbonylverbindung an.',
        hint2: 'Ziehe von C(Ylid) → C(β) des Enons.',
        atoms: [
          { id: 'cyl',  label: 'C⁻',  x: 80,  y: 130, color: '#2dd4bf', r: 24 },
          { id: 'cbeta',label: 'Cβ',  x: 280, y: 130, color: '#e2e8f0', r: 22, sub: 'δ+' },
          { id: 'co',   label: 'C=O', x: 390, y: 130, color: '#f87171', r: 26 },
          { id: 'py',   label: 'Py⁺', x: 80,  y: 60,  color: '#a78bfa', r: 20 },
          { id: 'h1',   label: 'H',   x: 195, y: 90,  color: '#64748b', r: 14 },
          { id: 'h2',   label: 'H',   x: 195, y: 170, color: '#64748b', r: 14 },
        ],
        bonds: [
          { a: 'cyl',  b: 'py',   dash: false, color: '#a78bfa' },
          { a: 'cbeta',b: 'co',   dash: false, color: '#f87171' },
          { a: 'cbeta',b: 'h1',   dash: false, color: '#64748b' },
          { a: 'cbeta',b: 'h2',   dash: false, color: '#64748b' },
        ],
        correctArrow: { from: 'cyl', to: 'cbeta' },
      },
      {
        id: 1,
        label: 'Cyclisierung',
        description: 'Das Stickstoffatom des NH₃ greift intramolekular das Carbonyl-C an. Ziehe von N → C=O.',
        hint1: 'NH₃ (oder NH₄OAc) liefert das Amin. Der nucleophile N greift das elektrophile Carbonyl-C an → Hemiaminal.',
        hint2: 'Ziehe von N(H₃) → C(=O). Das Carbonyl ist δ+ und electrophil.',
        atoms: [
          { id: 'n',   label: 'N',   x: 80,  y: 200, color: '#2dd4bf', r: 22, charge: 'H₃' },
          { id: 'co1', label: 'C=O', x: 200, y: 130, color: '#f87171', r: 26, sub: 'δ+' },
          { id: 'co2', label: 'C=O', x: 380, y: 130, color: '#f87171', r: 26 },
          { id: 'cm',  label: 'C',   x: 290, y: 130, color: '#e2e8f0', r: 20 },
          { id: 'h1',  label: 'H',   x: 290, y: 70,  color: '#64748b', r: 14 },
        ],
        bonds: [
          { a: 'co1', b: 'cm',  dash: false, color: '#e2e8f0' },
          { a: 'cm',  b: 'co2', dash: false, color: '#e2e8f0' },
          { a: 'cm',  b: 'h1',  dash: false, color: '#64748b' },
        ],
        correctArrow: { from: 'n', to: 'co1' },
      },
      {
        id: 2,
        label: 'Aromatisierung',
        description: 'Nach Dehydratisierung wird der Dihydropyridin-Ring aromatisiert. Ziehe vom H zum Oxidationsmittel [O].',
        hint1: 'Aromatisierung = Oxidation des Dihydropyridins. Ein H⁺ und 2 Elektronen werden abgegeben.',
        hint2: 'Ziehe von H(Dihydroring) → [O] (Oxidationsmittel). Das Produkt ist das aromatische Pyridin.',
        atoms: [
          { id: 'h',  label: 'H',   x: 240, y: 60,  color: '#64748b', r: 16 },
          { id: 'c1', label: 'C',   x: 240, y: 130, color: '#e2e8f0', r: 22 },
          { id: 'ox', label: '[O]', x: 390, y: 60,  color: '#f87171', r: 24 },
          { id: 'n',  label: 'N',   x: 130, y: 130, color: '#2dd4bf', r: 22 },
          { id: 'c2', label: 'C',   x: 350, y: 130, color: '#e2e8f0', r: 22 },
        ],
        bonds: [
          { a: 'c1', b: 'h',  dash: false, color: '#64748b' },
          { a: 'n',  b: 'c1', dash: false, color: '#e2e8f0' },
          { a: 'c1', b: 'c2', dash: false, color: '#e2e8f0' },
        ],
        correctArrow: { from: 'h', to: 'ox' },
      },
    ],
  },

  quiz: [
    {
      id: "q1",
      question:
        "Bei der Kondrat'eva-Pyridinsynthese wird welche Verbindung als Azadien eingesetzt?",
      options: ["Triazin", "Oxazol", "Pyrimidin", "Imidazol"],
      correct: 1,
      explanation:
        "In der Kondrat'eva-Synthese fungiert das Oxazol als 1-Oxa-1,3-dien (Azadien). Es reagiert mit einem Dienophil (Alkin) in einer [4+2]-Cycloaddition. Das bicyclische Intermediat verliert dann CO₂ (Retro-[4+2]) zum aromatischen Pyridin.",
    },
    {
      id: "q2",
      question:
        "Welche Position in Pyridin ist bevorzugt für elektrophile aromatische Substitution (SEAr)?",
      options: ["C-2 (ortho zu N)", "C-3 (meta zu N)", "C-4 (para zu N)", "SEAr findet praktisch nicht statt"],
      correct: 1,
      explanation:
        "Falls SEAr am Pyridin überhaupt abläuft (es ist stark deaktiviert), erfolgt sie bevorzugt an C-3. Dies ist die Position, an der der kationische Übergangszustand am wenigsten durch das elektronenarme N destabilisiert wird.",
    },
    {
      id: "q3",
      question:
        "Was ist das Besondere an der Boger-Reaktion zur Pyridin-Synthese?",
      options: [
        "Ein Triazin reagiert als Azadien mit einem Enamin; N₂ wird retro-[4+2] eliminiert",
        "Zwei Alkinmoleküle und ein Nitril trimerisieren katalytisch",
        "Ein Pyrrol lagert über Cyclopropan zum Pyridin um",
        "Ein 1,5-Dicarbonyl reagiert mit NH₃",
      ],
      correct: 0,
      explanation:
        "Bei der Boger-Reaktion fungiert ein Triazin als Aza-Dien und reagiert mit einem elektronenreichen Dienophil (z.B. Enamin) in einer [4+2]-Cycloaddition. Das bicyclische Intermediat zerfällt sofort unter Abspaltung von N₂ (Retro-DA, XY = N₂) zum substituierten Pyridin.",
    },
    {
      id: "q4",
      question:
        "Was versteht man unter der Chichibabin-Reaktion?",
      options: [
        "Bromierung von Pyridin an C-3",
        "Nucleophile Aminierung von Pyridin mit NaNH₂ → 2-Aminopyridin",
        "Oxidation von Pyridin zum N-Oxid",
        "Cycloaddition von Pyridin mit Dienophilen",
      ],
      correct: 1,
      explanation:
        "Die Chichibabin-Reaktion ist eine nucleophile aromatische Substitution: Pyridin + NaNH₂ → 2-Aminopyridin + NaH. Das Amidanion greift C-2 nucleophil an (ortho zu N, aktiviert). Der Meisenheimer-Komplex ist das Zwischenprodukt.",
    },
    {
      id: "q5",
      question:
        "Die Boekelheide-Umlagerung von Pyridin-N-Oxid mit Ac₂O (Δ) liefert...",
      options: [
        "2-Acetoxymethyl-pyridin",
        "4-Acetoxy-pyridin",
        "Pyridin-2-carbonsäure",
        "N-Acetyl-pyridin",
      ],
      correct: 0,
      explanation:
        "Bei der Boekelheide-Umlagerung reagiert ein 2-Methylpyridin-N-Oxid mit Ac₂O unter Hitze. Das Acetat migriert vom aktivierten O zum Benzyl-C der Methylgruppe → 2-(Acetoxymethyl)pyridin. Nützlich zur Funktionalisierung der 2-Position.",
    },
    {
      id: "q6",
      question:
        "Welche Eigenschaft macht die 2- und 4-Positionen von Pyridin bevorzugt für SNAr?",
      options: [
        "Dort ist die π-Elektronendichte am höchsten",
        "Das Stickstoffatom stabilisiert dort den negativen Meisenheimer-Komplex induktiv",
        "Dort finden thermodynamisch kontrollierte Reaktionen statt",
        "Das N-Atom wirkt an diesen Positionen als σ-Donor",
      ],
      correct: 1,
      explanation:
        "Bei SNAr an C-2 oder C-4 des Pyridins kann die negative Ladung des Meisenheimer-Komplexes direkt auf das elektronenarme N-Atom delokalisiert werden → Stabilisierung → niedrigere Aktivierungsenergie. An C-3 ist diese Delokalisierung nicht möglich.",
    },
    {
      id: "q7",
      question:
        "Für die Hantzsch-Dihydropyridin-Synthese ([3+3]) gilt: Welches Problem tritt bei unsymmetrischen Komponenten auf?",
      options: [
        "Die Reaktion läuft gar nicht ab",
        "Es bildet sich ein Gemisch von zwei Regioisomeren (P1 und P2)",
        "Das Produkt ist nicht aromatisch",
        "NH₃ greift an der falschen Position an",
      ],
      correct: 1,
      explanation:
        "Wenn Enamin und 1,3-Dicarbonylverbindung unsymmetrisch sind, können zwei strukturisomere Pyridine entstehen (P1 und P2), da Cyclisierung in beide Richtungen möglich ist. Lösung: Vorsynthese eines definierten Enamins für Regioselektivität.",
    },
  ],

  flashcards: [
    {
      front: "Kondrat'eva-Pyridinsynthese",
      back: "[4+2]-Cycloaddition: Oxazol (als Azadien) + Dienophil (Alkin) → bicyclisches Intermediat → -CO₂ (Retro-[4+2]) → Pyridin. Oxazol dient als 1-Oxa-1,3-dien.",
    },
    {
      front: "Boger-Reaktion",
      back: "Triazin (Azadien) + Enamin (Dienophil) → [4+2]-Cycloaddition → Intermediat verliert N₂ (Retro-DA) → substituiertes Pyridin. Besonderheit: XY = N₂ wird eliminiert.",
    },
    {
      front: "Kröhnke-Reaktion",
      back: "[3+2+1]-Cyclocondensation: 1,5-Dicarbonylverbindung + NH₃ → Pyridin. Mechanismus: Aldol → Michael → Cyclisierung → Aromatisierung.",
    },
    {
      front: "Chichibabin-Reaktion",
      back: "Pyridin + NaNH₂ → 2-Aminopyridin + NaH. SNAr an C-2 (aktiviert durch N). Meisenheimer-Komplex als Zwischenstufe. Klassische Methode zur Aminierung.",
    },
    {
      front: "Guareschi-Thorpe-Reaktion",
      back: "[3+3]-Cyclocondensation: Cyanoacetamid/Cyanoacetylderivat + 1,3-Dicarbonyl (+ NH₃) → 2-Pyridinon mit CN-Gruppe. Bildung von Cyanopyridonen.",
    },
    {
      front: "Bönnemann-Reppe-Synthese",
      back: "[2+2+2]-Cycloaddition: 1 Nitril + 2 Alkine, Cobalt-Katalyse → Pyridin. Trimerisation unter metallikatalysierten Bedingungen.",
    },
    {
      front: "Boekelheide-Umlagerung",
      back: "2-Methylpyridin-N-Oxid + Ac₂O, Δ → 2-(Acetoxymethyl)pyridin. [1,2]-O→C-Acyl-Wanderung. Nützlich zur Einführung von Funktionalität an der 2-Methylgruppe.",
    },
    {
      front: "SEAr vs. SNAr bei Pyridin",
      back: "SEAr: sehr langsam, deaktiviert, bevorzugt C-3. SNAr: aktiviert an C-2 und C-4 (Meisenheimer-Komplex auf N delokalisierbar). Pyridin bevorzugt SNAr!",
    },
  ],
};
