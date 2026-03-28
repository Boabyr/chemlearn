export const topic = {
  id: "06-cyclocondensations",
  title: "Cyclocondensations-Reaktionen",
  subtitle: "Regioselektive Synthese von Heterocyclen",
  icon: "⚡",
  estimatedMinutes: 80,
  theory: `
## Was ist eine Cyclocondensation?

Ringschlussreaktion unter Abspaltung kleiner Moleküle (H₂O, ROH, NH₃). Involviert nucleophile/elektrophile Schritte (nicht pericyclisch).

## Wichtige Reaktionen

### Hantzsch-Dihydropyridin [3+3]
Enamin + 1,3-Dicarbonyl + NH₃ → 1,4-Dihydropyridin → Oxidation → Pyridin

### Bohlmann-Rahtz [3+3]
Enaminon + β-Ketoester → Pyridin

### Guareschi-Thorpe [3+3]
Cyanoacetamid + 1,3-Dicarbonyl → 2-Pyridinon-3-carbonitril

### Kröhnke [3+2+1]
Pyridinium-Ylid + α,β-unges. Carbonyl + NH₄OAc → Pyridin

### Biginelli-Reaktion [3-Komponenten]
Aldehyd + β-Ketoester + Harnstoff → DHPM (Dihydropyrimidinon)

### Pyrazol-Synthese
1,3-Dicarbonyl + Hydrazin → Pyrazol

### Isoxazol-Synthese
β-Enolketon + NH₂OH → Isoxazol
`,
  mechanism: {
    type: "builder",
    title: "Hantzsch-Dihydropyridin-Synthese",
    description: "Enamin greift 1,3-Dicarbonyl nucleophil an → Cyclisierung → Dihydropyridin.",
    stages: [
      {
        id: 0,
        label: "Michael-Addition",
        description: "Das nucleophile α-C des Enamins greift den β-C der Dicarbonylverbindung an (Michael-Addition). Ziehe von C(Enamin) → C(β-Dicarbonyl).",
        hint1: "Das α-C des Enamins ist nucleophil (vinyl-amin-aktiviert). Es greift das elektrophile β-C der 1,3-Dicarbonylverbindung an.",
        hint2: "Ziehe von C(α, Enamin) → C(β) des 1,3-Dicarbonyls. Das ist eine 1,4-Addition (Michael).",
        atoms: [
          { id: "n",  label: "N",  x: 80,  y: 80,  color: "#2dd4bf", r: 20 },
          { id: "ce", label: "C",  x: 160, y: 130, color: "#2dd4bf", r: 22, sub: "α" },
          { id: "cb", label: "C",  x: 300, y: 130, color: "#e2e8f0", r: 22, sub: "β" },
          { id: "co", label: "C=O",x: 390, y: 80,  color: "#f87171", r: 24 },
          { id: "co2",label: "C=O",x: 390, y: 180, color: "#f87171", r: 24 },
          { id: "h",  label: "H",  x: 160, y: 60,  color: "#64748b", r: 14 },
        ],
        bonds: [
          { a: "n",  b: "ce", dash: false, color: "#2dd4bf" },
          { a: "ce", b: "h",  dash: false, color: "#64748b" },
          { a: "cb", b: "co", dash: false, color: "#f87171" },
          { a: "cb", b: "co2",dash: false, color: "#f87171" },
        ],
        correctArrow: { from: "ce", to: "cb" },
      },
      {
        id: 1,
        label: "Cyclisierung (NH₃)",
        description: "NH₃ greift eine Carbonylgruppe an → Iminbildung → Ringschluss. Ziehe von N(H₃) → C(=O).",
        hint1: "NH₃ ist der nucleophile N-Lieferant für den Ringschluss. Es greift eine der Carbonylgruppen an.",
        hint2: "Ziehe von N(H₃) → C(=O) links. Nach Kondensation und Dehydratisierung entsteht der Dihydropyridinring.",
        atoms: [
          { id: "nh3",label: "NH₃",x: 80,  y: 200, color: "#2dd4bf", r: 24 },
          { id: "co1",label: "C=O",x: 200, y: 130, color: "#f87171", r: 24, sub: "δ+" },
          { id: "cm", label: "C",  x: 300, y: 130, color: "#e2e8f0", r: 20 },
          { id: "co2",label: "C=O",x: 400, y: 130, color: "#f87171", r: 24 },
          { id: "h1", label: "H",  x: 300, y: 70,  color: "#64748b", r: 14 },
        ],
        bonds: [
          { a: "co1",b: "cm", dash: false, color: "#e2e8f0" },
          { a: "cm", b: "co2",dash: false, color: "#e2e8f0" },
          { a: "cm", b: "h1", dash: false, color: "#64748b" },
        ],
        correctArrow: { from: "nh3", to: "co1" },
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Welche Komponenten braucht die Hantzsch-Dihydropyridin-Synthese?", options: ["Azid + Alkin", "Enamin + 1,3-Dicarbonyl + NH₃", "Dien + Dienophil", "Hydrazin + 1,3-Dicarbonyl"], correct: 1, explanation: "Hantzsch [3+3]: Enamin (3C) + 1,3-Dicarbonyl (3C) + NH₃ (1N) → 1,4-Dihydropyridin → Oxidation → Pyridin." },
    { id: "q2", question: "Wie wird Regioselektivität bei der Hantzsch-Synthese gesichert?", options: ["Temperaturkontrolle", "Vorsynthese des Enamins mit definierter Regiochemie", "Lösungsmittelwahl", "Überschuss einer Komponente"], correct: 1, explanation: "Vorsynthetisiertes Enamin → definierte Regiochemie → regioselektives Pyridin. Sonst: Gemisch zweier Regioisomere." },
    { id: "q3", question: "Was ist das Produkt der Biginelli-Reaktion?", options: ["Pyrimidin", "1,4-Dihydropyridin", "3,4-Dihydropyrimidin-2(1H)-on (DHPM)", "Pyrazol"], correct: 2, explanation: "Biginelli (3 Komponenten): Aldehyd + β-Ketoester + Harnstoff → DHPM. Säurekatalysiert. Pharmakologisch aktiv (Ca-Kanal-Blocker)." },
    { id: "q4", question: "Welche Komponenten liefern ein Pyrazol?", options: ["1,3-Dicarbonyl + NH₂OH", "1,3-Dicarbonyl + H₂N-NHR", "1,4-Dicarbonyl + NH₃", "Enamin + Diazoniumsalz"], correct: 1, explanation: "1,3-Dicarbonyl + Hydrazin → Pyrazol. Mit monosubstit. Hydrazin: definiertes N-subst. Pyrazol (regioselektiv)." },
    { id: "q5", question: "Welches Reagenz liefert ein Isoxazol aus β-Enolketon?", options: ["Hydroxylamin (NH₂OH)", "1,4-Dicarbonyl + NH₃", "Azid + Alkin", "Malonitril"], correct: 0, explanation: "β-Enolketon + NH₂OH → Isoxazol. Mechanismus: Oximbildung → intramolekulare Cyclisierung → Dehydratisierung." },
    { id: "q6", question: "Was ist die van-Leusen-Synthese?", options: ["Pyridin aus Triazin", "Imidazol aus TosMIC + Aldehyd + Amin", "Furan aus 1,4-Dicarbonyl", "Oxazol aus Isocyanid"], correct: 1, explanation: "van Leusen: Aldehyd + RNH₂ → Imin, dann + TosMIC → 4-Tosyl-imidazol → Tosyl-Eliminierung → Imidazol." },
  ],
  flashcards: [
    { front: "Hantzsch-Dihydropyridin", back: "[3+3]: Enamin + 1,3-Dicarbonyl + NH₃ → 1,4-Dihydropyridin → [O] → Pyridin. Regioselektiv durch vorsynthetisiertes Enamin." },
    { front: "Biginelli-Reaktion", back: "Aldehyd + β-Ketoester + Harnstoff → DHPM. Säurekatalysiert. Produkte: Calciumkanalblocker." },
    { front: "Kröhnke-Reaktion", back: "[3+2+1]: α-BrCO + Pyridin → Pyridinium-Ylid → Michael → + NH₄OAc → Cyclisierung → Aromatisierung → Pyridin." },
    { front: "Pyrazol-Synthese", back: "1,3-Dicarbonyl + H₂N-NH-R → N-subst. Pyrazol. Mit H₂N-NH₂ → Gemisch. 1,3-Diketone → 3(5)-subst. Pyrazol." },
    { front: "Bohlmann-Rahtz", back: "[3+3]: Enaminon + β-Ketoester → Pyridin. Regiochemie durch Enaminon definiert." },
    { front: "Retrosynthese Cyclocondensation", back: "Welche Bindungen C-N oder C-O wurden neu geknüpft? Retrosynthetisch schneiden. H₂O/NH₃ ergänzen → A und B." },
  ],
};
