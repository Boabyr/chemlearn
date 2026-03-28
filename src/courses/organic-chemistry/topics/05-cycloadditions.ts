export const topic = {
  id: "05-cycloadditions",
  title: "Cycloadditions-Reaktionen",
  subtitle: "1,3-dipolare CA & Diels-Alder zur Heterocyclensynthese",
  icon: "🔄",
  estimatedMinutes: 75,
  theory: `
## Überblick

Cycloadditionen sind pericyclische Reaktionen bei denen zwei π-Systeme unter Bildung eines Rings reagieren. Konzertiert, kein Intermediat.

## [4+2] Diels-Alder (Aza-Varianten)

- **Kondrat'eva:** Oxazol (Azadien) + Alkin → [4+2] → -CO₂ → Pyridin
- **Boger:** Triazin + Enamin → [4+2] → -N₂ → Pyridin

## [3+2] 1,3-Dipolare Cycloaddition

| 1,3-Dipol | Produkt mit Alkin | Produkt mit Alken |
|---|---|---|
| Azid R-N₃ | 1,2,3-Triazol | – |
| Nitriloxid R-C≡N⁺-O⁻ | Isoxazol | Isoxazolin |
| Nitron R-CH=N⁺(R')-O⁻ | – | Isoxazolin |
| Nitrilimine | Pyrazol | Pyrazolin |

## Retrosynthese

- 5-Ring → [3+2]: schneide 1,2 und 4,5-Bindung → 1,3-Dipol + Dipolarophil
- 6-Ring → [4+2]: schneide 1,6 und 3,4-Bindung → Dien + Dienophil
`,
  mechanism: {
    type: "builder",
    title: "Kondrat'eva-Pyridinsynthese",
    description: "Oxazol als Azadien + Alkin → [4+2] → Bicyclus → -CO₂ → Pyridin.",
    stages: [
      {
        id: 0,
        label: "[4+2] Cycloaddition",
        description: "Das Oxazol (als 1-Oxa-1,3-dien, 4π) greift das Alkin (2π) an. Ziehe vom O des Oxazols zum terminalen C des Alkins.",
        hint1: "Im Diels-Alder reagiert das terminale Atom des Diens mit dem terminalen Atom des Dienophils.",
        hint2: "Ziehe von O(Oxazol, Position 1) → C(terminal des Alkins). Das ist der erste neue C-O-Bindungsschluss.",
        atoms: [
          { id: "o",  label: "O",  x: 80,  y: 130, color: "#f87171", r: 22 },
          { id: "c2", label: "C",  x: 150, y: 80,  color: "#e2e8f0", r: 20 },
          { id: "n",  label: "N",  x: 230, y: 80,  color: "#60a5fa", r: 20 },
          { id: "c4", label: "C",  x: 280, y: 130, color: "#e2e8f0", r: 20 },
          { id: "c5", label: "C",  x: 230, y: 180, color: "#e2e8f0", r: 20 },
          { id: "ca", label: "C",  x: 380, y: 100, color: "#fbbf24", r: 22 },
          { id: "cb", label: "C",  x: 450, y: 100, color: "#fbbf24", r: 22 },
        ],
        bonds: [
          { a: "o",  b: "c2", dash: false, color: "#f87171" },
          { a: "c2", b: "n",  dash: false, color: "#e2e8f0" },
          { a: "n",  b: "c4", dash: false, color: "#60a5fa" },
          { a: "c4", b: "c5", dash: false, color: "#e2e8f0" },
          { a: "c5", b: "o",  dash: false, color: "#f87171" },
          { a: "ca", b: "cb", dash: false, color: "#fbbf24" },
        ],
        correctArrow: { from: "o", to: "ca" },
      },
      {
        id: 1,
        label: "Retro-[4+2]: CO₂-Abspaltung",
        description: "Das bicyclische Intermediat verliert CO₂ in einer Retro-[4+2]. Ziehe von der C-O-Bindung zum CO₂ (Abspaltung).",
        hint1: "Triebkraft: Aromatisierung zum Pyridin + Entropiegewinn durch CO₂-Gasentwicklung.",
        hint2: "Ziehe von C(Ring) → O(CO₂). Die C-O-Bindung des Brücken-O bricht → CO₂ verlässt als Gas → Pyridin entsteht.",
        atoms: [
          { id: "c1", label: "C",   x: 160, y: 180, color: "#e2e8f0", r: 20 },
          { id: "o",  label: "O",   x: 240, y: 240, color: "#f87171", r: 20 },
          { id: "c2", label: "C",   x: 320, y: 180, color: "#e2e8f0", r: 20 },
          { id: "n",  label: "N",   x: 240, y: 100, color: "#60a5fa", r: 20 },
          { id: "co2",label: "CO₂", x: 420, y: 240, color: "#f87171", r: 26 },
        ],
        bonds: [
          { a: "c1", b: "n",  dash: false, color: "#e2e8f0" },
          { a: "n",  b: "c2", dash: false, color: "#60a5fa" },
          { a: "c1", b: "o",  dash: false, color: "#f87171" },
          { a: "o",  b: "c2", dash: false, color: "#f87171" },
        ],
        correctArrow: { from: "c2", to: "co2" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Welcher 1,3-Dipol reagiert mit terminalem Alkin zu 1,2,3-Triazol?", options: ["Nitron", "Organisches Azid", "Nitriloxid", "Nitrilimine"], correct: 1, explanation: "Organische Azide (R-N₃) reagieren mit Alkinen in [3+2] zum 1,2,3-Triazol. Cu-katalysiert: selektiv 1,4; thermisch: Gemisch." },
    { id: "q2", question: "Welches Regioisomer bildet sich bevorzugt bei [3+2]-CA eines Nitriloxids mit terminal-substit. Alken?", options: ["5-substituiertes Isoxazolin (bevorzugt)", "4-substituiertes Isoxazolin", "3-substituiertes Isoxazolin", "Beide zu gleichen Teilen"], correct: 0, explanation: "FMO-Kontrolle: größter HOMO-Koeffizient am Nitriloxid-C, größter LUMO-Koeffizient am β-C des Alkens → 5-substituiertes Isoxazolin bevorzugt." },
    { id: "q3", question: "Was passiert beim Diels-Alder des Oxazols mit einem Alkin (Kondrat'eva)?", options: ["Direkte Addition ohne Zwischenstufe", "[4+2] → Bicyclus → Retro-[4+2] mit CO₂-Abspaltung → Pyridin", "SNAr am Oxazol", "Ringöffnung des Oxazols"], correct: 1, explanation: "Kondrat'eva: Oxazol (1-Oxa-1,3-dien) + Alkin → [4+2] → Bicyclus → Retro-[4+2] mit CO₂ → Pyridin. CO₂-Abspaltung ist Triebkraft." },
    { id: "q4", question: "Was ist die Triebkraft der Kondrat'eva-Pyridinsynthese?", options: ["Säurekatalyse", "Aromatisierung + Entropiegewinn durch CO₂-Gasentwicklung", "Reduktion des Azadiens", "Keine – sie ist endotherm"], correct: 1, explanation: "Zwei Triebkräfte: Aromatisierung (Pyridin stabil) + Entropiegewinn durch CO₂-Gas (TΔS > 0)." },
    { id: "q5", question: "Welche Reaktion gibt Dihydropyridinon aus 1-Azadien + Dienophil?", options: ["[2+2]", "[4+2]", "[3+2]", "[2+2+2]"], correct: 1, explanation: "[4+2]-Diels-Alder: 1-Azadien (4π) + Dienophil (2π) → 6-gliedriges N-haltiges Produkt." },
  ],
  flashcards: [
    { front: "Huisgen 1,3-Dipolare Cycloaddition", back: "[3+2]: 1,3-Dipol + Dipolarophil → 5-Ring. Thermisch: Gemisch. CuAAC: regioselektiv 1,4-Triazol. Dipole: Azide, Nitriloxide, Nitrone." },
    { front: "Kondrat'eva-Synthese", back: "Oxazol (Azadien) + Alkin → [4+2] → Bicyclus → −CO₂ → Pyridin. Triebkraft: Aromatisierung + Entropie." },
    { front: "Boger-Reaktion", back: "Triazin (Azadien) + Enamin → [4+2] → Bicyclus → −N₂ → Pyridin." },
    { front: "Retrosynthese 5-Ring", back: "→ 1,3-Dipol + Dipolarophil. Schneide 1,2- und 4,5-Bindung." },
    { front: "Retrosynthese 6-Ring", back: "→ Dien + Dienophil. Schneide 1,6- und 3,4-Bindung." },
    { front: "Nitriloxid als 1,3-Dipol", back: "R-C≡N⁺-O⁻. Mit Alkin → Isoxazol. Mit Alken → Isoxazolin. Herstellung: Hydroxamsäure + Base oder Chloroxim + Base." },
  ],
};
