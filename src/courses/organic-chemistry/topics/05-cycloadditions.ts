export const topic = {
  id: "05-cycloadditions",
  title: "Cycloadditions-Reaktionen",
  subtitle: "1,3-dipolare CA & Diels-Alder zur Heterocyclensynthese",
  icon: "🔄",
  estimatedMinutes: 75,
  theory: `
## Überblick Cycloadditions-Reaktionen
 
Cycloadditionen sind pericyclische Reaktionen, bei denen **zwei π-Systeme** unter Bildung eines Rings reagieren. Kein Katalysator, kein Intermediat (konzertiert).
 
## [4+2]-Diels-Alder-Reaktion (Aza-Varianten)
 
**Dien + Dienophil → 6-Ring**
 
Für Heterocyclensynthese:
- **Azadien** (mind. 1 N im Dien) + Dienophil → N-haltiger 6-Ring
- **Hetero-Diels-Alder:** C=O oder C=N als Dienophil → Pyrane, Dihydropyrimidine
 
**Wichtige Beispiele aus der Vorlesung:**
| Dien | Dienophil | Produkt |
|---|---|---|
| Oxazol | Alkin | Pyridin (+ CO₂-Abspaltung) → Kondrat'eva |
| Triazin | Enamin | Pyridin (+ N₂-Abspaltung) → Boger |
| 1-Azadien | Dienophil CO₂Me | Dihydropyridin → Pyridin |
| Pyridin-N-Oxid | Alkin | Isoxazol + CO-Abspaltung |
 
## [3+2]-1,3-Dipolare Cycloaddition (Huisgen)
 
**1,3-Dipol + Dipolarophil → 5-Ring-Heterocyclus**
 
### Die wichtigsten 1,3-Dipole:
| 1,3-Dipol | Struktur | Produkt mit Alkin | Produkt mit Alken |
|---|---|---|---|
| Nitriloxid R-C≡N⁺-O⁻ | 3 Atome, Allenstruktur | Isoxazol | Isoxazolin |
| Nitron R-CH=N⁺(R')-O⁻ | | Isoxazolin | |
| Azid R-N=N⁺=N⁻ | | 1,2,3-Triazol | |
| Nitrilimine R-C≡N⁺-N⁻R' | | Pyrazol | Pyrazolin |
| Diazoalkan R₂C=N⁺=N⁻ | | Pyrazol | |
| Oxadiazol-Vorstufen | Münchnone | nach CO₂-Verlust | |
 
### Regioselektivität der [3+2]-CA:
- Elektronische Kontrolle: FMO-Theorie (HOMO-Dipol / LUMO-Dipolarophil)
- Sterik: größere Substituenten bestimmen Orientierung
- Prüfungsrelevant: für jeden Dipol die regioisomeren Produkte kennen!
 
## Retrosynthese P → A + B
 
**Schema für Prüfung:**
1. Identifiziere den Ring im Produkt P
2. Bestimme Ringtyp (5 oder 6 Ring)
3. Erkenne 1,3-Dipol oder Dien/Dienophil-Bindungsmuster
4. Führe retrosynthetischen Schnitt durch
5. Schreibe A und B
 
**Beispiel: Furan A (aus Exercise 2, Exam Ex. 4a):**
MeO₂C-Furan-CO₂Me → 5-Ring mit O → [3+2] → Nitriloxid + Alkin oder Isoxazol-Route?
Tatsächlich: Dien-Charakter des Furans → [4+2] mit DMAD → Bicyclisches Intermediat (nur bei aktiviertem Dienophil!)
 
**Beispiel: 1,2,3-Triazol B (aus Exam Ex. 4a):**
Me-N-haltiges Triazol → Azid + terminales Alkin → [3+2]
  `,
  quiz: [
    {
      id: "q1",
      question: "Welcher 1,3-Dipol reagiert mit einem terminalen Alkin regioselektiv zu einem 1,2,3-Triazol?",
      options: ["Nitron", "Organisches Azid", "Nitriloxid", "Nitrilimine"],
      correct: 1,
      explanation: "Organische Azide (R-N₃ = R-N=N⁺=N⁻) reagieren mit Alkinen in [3+2]-Cycloaddition zum 1,2,3-Triazol. Thermisch: Gemisch aus 1,4 und 1,5-Isomeren. Cu-katalysiert: selektiv 1,4.",
    },
    {
      id: "q2",
      question: "Welches Regioisomer bildet sich bevorzugt bei der [3+2]-CA eines unsymmetrischen Nitriloxids mit einem terminal-substituierten Alken?",
      options: [
        "5-substituiertes Isoxazolin (Nitriloxid-C an C-5)",
        "4-substituiertes Isoxazolin",
        "3-substituiertes Isoxazolin (Nitriloxid-C an C-3)",
        "Beide Isomere zu gleichen Teilen",
      ],
      correct: 0,
      explanation: "FMO-Kontrolle: HOMO des Nitriloxids und LUMO des Alkens. Der größte HOMO-Koeffizient liegt am Nitriloxid-C (endständig), der größte LUMO-Koeffizient am β-C des Alkens → 5-substituiertes Isoxazolin bevorzugt.",
    },
    {
      id: "q3",
      question: "Was passiert beim Diels-Alder des Oxazols mit einem Alkin (Kondrat'eva)?",
      options: [
        "Direkte Addition ohne Zwischenstufe → Isoxazol",
        "[4+2]-Cycloaddition → bicyclisches Intermediat → Retro-[4+2] mit CO₂-Abspaltung → Pyridin",
        "SNAr am Oxazol",
        "Ringöffnung des Oxazols, dann Recyclisierung",
      ],
      correct: 1,
      explanation: "Kondrat'eva-Pyridinsynthese: Oxazol (als 1-Oxa-1,3-dien) + Alkin → [4+2] → Bicyclus → Retro-[4+2] unter CO₂-Abspaltung → aromatisches Pyridin. Der CO₂-Verlust ist die Triebkraft (Aromatisierung + Entropie).",
    },
    {
      id: "q4",
      question: "Ein Furan-Ring in einem Produkt deutet retrosynthetisch auf welche Reaktion hin?",
      options: [
        "[4+2] mit Azadien",
        "[3+2] mit Nitriloxid oder Azid",
        "Paal-Knorr-Synthese aus 1,4-Dicarbonyl",
        "SNAr",
      ],
      correct: 2,
      explanation: "Ein Furan-Ring entsteht am einfachsten aus 1,4-Dicarbonylverbindungen über die Paal-Knorr-Synthese (säurekatalysierte Doppelkondensation + Dehydratisierung). Alternativ: Cycloproducte via Cycloaddition, aber Paal-Knorr ist der häufigste retrosynthetische Zugang.",
    },
    {
      id: "q5",
      question: "Welche Reaktion gibt ein Dihydropyridinon aus einem 1-Azadien und einem Dienophil?",
      options: ["[2+2]", "[4+2]", "[3+2]", "[2+2+2]"],
      correct: 1,
      explanation: "[4+2]-Diels-Alder: 1-Azadien (4π) + Dienophil (2π) → 6-gliedriges N-haltiges Produkt (Dihydropyridin oder nach Oxidation Pyridin).",
    },
  ],
  flashcards: [
    { front: "Huisgen-1,3-Dipolare Cycloaddition", back: "[3+2]: 1,3-Dipol + Dipolarophil → 5-Ring. Thermisch: Gemisch. Cu-katalysiert (CuAAC): regioselektiv 1,4-Triazol. Wichtige Dipole: Azide, Nitriloxide, Nitrone, Nitrilimine." },
    { front: "Kondrat'eva-Synthese", back: "Oxazol (Azadien) + Alkin → [4+2] → Bicyclus → −CO₂ → Pyridin. Azadiene: Verbindungen mit C=N oder N=N als Bestandteil des 4π-Systems." },
    { front: "Boger-Reaktion", back: "Triazin (Azadien) + Enamin → [4+2] → Bicyclus → −N₂ → Pyridin. Das N₂ ist das 'XY' das retro-[4+2] verlässt." },
    { front: "Retrosynthese 5-Ring", back: "5-Ring → suche 1,3-Dipol (Azid, Nitriloxid, Nitron) + Dipolarophil (Alkin/Alken). Trenne am 1,2-Bindungspaar und am 4,5-Bindungspaar." },
    { front: "Retrosynthese 6-Ring", back: "6-Ring → Dien [4C oder 3C+N] + Dienophil [2C oder 1C+Heteroatom]. Schneide die 1,6- und 3,4-Bindungen (Produktbindungen in DA)." },
    { front: "Nitriloxid als 1,3-Dipol", back: "R-C≡N⁺-O⁻ ↔ R-C=N=O. Allenstruktur. Reaktion mit Alkin → Isoxazol. Mit Alken → Isoxazolin. Herstellung: Hydroxamsäure + Base oder Chloroxim + Base." },
  ],
};
