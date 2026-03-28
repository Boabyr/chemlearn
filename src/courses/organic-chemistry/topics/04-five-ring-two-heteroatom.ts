// src/courses/organic-chemistry/topics/04-five-ring-two-heteroatoms.ts

export const topic = {
  id: "04-five-ring-two-heteroatoms",
  title: "5-Ring-Heteroaromaten (2+ Heteroatome)",
  subtitle: "Imidazol, Oxazol, Pyrazol, Triazol, Tetrazol",
  icon: "🟠",
  estimatedMinutes: 80,

  theory: `
## Übersicht: 5-Ringe mit zwei oder mehr Heteroatomen

| Verbindung | Heteroatome | Besonderheit |
|---|---|---|
| Imidazol | N,N (1,3) | ein Pyrrol-N + ein Pyridin-N; pKa 7.0 |
| Pyrazol | N,N (1,2) | beide N benachbart; pKa ~2.5 |
| Oxazol | N,O (1,3) | O an 1, N an 3 |
| Isoxazol | N,O (1,2) | N und O benachbart |
| Thiazol | N,S (1,3) | Grundgerüst von Penicillin, Vitamin B1 |
| 1,2,3-Triazol | N,N,N | durch CuAAC-Click-Chemie zugänglich |
| 1,2,4-Triazol | N,N,N | 3 N-Atome, wichtig in Pharma |
| Tetrazol | N,N,N,N | Bioisoster der Carbonsäure! |
| Oxadiazol | N,N,O | verschiedene Isomere |

## Imidazol – Besonderheiten

**Zwei verschiedene N-Atome:**
- **N-1 (Pyrrol-N):** LP im π-System → nicht basisch
- **N-3 (Pyridin-N):** LP im σ-System → basisch (pKa 7.0)

**Tautomerie:** N-H kann zwischen beiden N wandern (Azomethin-N / Pyrrol-N-Tautomerie)
Schnelle Protonenwanderung in Lösung → beide Tautomere equivalent wenn unsubstituiert.

**Biologische Bedeutung:**
- L-Histidin enthält Imidazol → Schlüsselreste in Enzymen (Serinproteasen, Carboanhydrase)
- pKa ~7.0: ideal als Säure/Base-Katalysator bei physiologischem pH

**Reaktionen mit Metallionen und Lewis-Säuren:**
Imidazol koordiniert gerne an Metallzentren → wichtig in Bioanorganik.

## Oxazol & Isoxazol

**Oxazol** (1-Oxa-3-aza-2,4-cyclopentadien):
- Dient in der Kondrat'eva-Synthese als Azadien!
- C-2 (zwischen O und N) am reaktivsten für nucleophile Reaktionen
- Einsatz als 1,3-Dipol-Vorläufer

**Isoxazol** (1-Oxa-2-aza):
- O und N benachbart → N-O-Bindung schwach → leicht spaltbar unter reduktiven/basischen Bedingungen
- Strategie: Isoxazol als maskierter β-Enaminon

## Thiazol

Grundgerüst in:
- **Penicillinen** (β-Lactam + Thiazolan)
- **Thiamin (Vitamin B1)** (Thiazoliumion als Coenzym – deprotoniertes C-2 als Nucleophil!)

**Thiazolium-Chemie:**
C-2-H des Thiazoliumions ist acide (ähnlich Imidazolium) → Deprotonierung → Thiazol-2-yliden (NHC-Analogon!) → nucleophile Katalyse (Thiaminpyrophosphat)

## 1,2,3-Triazol (Click-Chemie)

**CuAAC-Reaktion (Copper-catalyzed Azide-Alkyne Cycloaddition):**
R-N₃ + R'-C≡CH → 1,4-disubstituiertes 1,2,3-Triazol (regioselektiv!)
- Mild, hohe Ausbeute, breite Anwendbarkeit (Biokonjugation, PET-Chemie, Pharma)
- Ohne Cu: thermisch → Gemisch aus 1,4- und 1,5-Regioisomeren (Huisgen-Cycloaddition)

**RuAAC:** Gibt 1,5-disubstituiertes Triazol

## Tetrazol – Bioisoster

Tetrazol ist ein wichtiger **Bioisoster der Carbonsäure:**
- Ähnliche Größe, Geometrie und pKa (~4-5 vs. ~4-5 für RCOOH)
- Aber: bessere metabolische Stabilität, verbesserte Membranpermeabilität
- **Beispiel:** Losartan (Antihypertensivum) enthält Tetrazol statt COOH

**Synthese von Tetrazolen:**
Nitril + NaN₃ (Azid) → [3+2]-Cycloaddition → 5-substituiertes Tetrazol

## Azomethine-Ylide und 1,3-Dipole

Diese Verbindungsklassen sind wichtige 1,3-Dipole für Cycloadditions-Synthesen:
- **Münchnone** (mesoionische Verbindungen) als reaktive Intermediate
- **Oxadiazole** als Vorstufen für Nitrile (Thermolyt mit CO₂-Abspaltung)
- **Nitrile-Oxide, Nitrilimine, Nitrone** als 1,3-Dipole
  `,

  quiz: [
    {
      id: "q1",
      question: "Warum hat Imidazol einen pKa von 7.0, obwohl es zwei N-Atome enthält?",
      options: [
        "Beide N-Atome sind gleich basisch",
        "Ein N-Atom ist Pyrrol-artig (LP im π) und eines Pyridin-artig (LP frei). Protonierung am Pyridin-N → pKa 7.0",
        "Das O-Atom erhöht die Basizität",
        "Imidazol hat 8 π-Elektronen",
      ],
      correct: 1,
      explanation:
        "Im Imidazol gibt es N-1 (Pyrrol-N, LP ins π eingebunden, nicht basisch) und N-3 (Pyridin-N, LP frei → basisch). Der hohe pKa von 7.0 (vs. Pyridin 5.2) erklärt sich durch die Stabilisierung des Imidazolium-Kations: positive Ladung durch beide N delokalisierbar.",
    },
    {
      id: "q2",
      question: "Was versteht man unter einem Bioisoster und welches klassische Beispiel findet sich beim Tetrazol?",
      options: [
        "Eine identische Verbindung mit gleichem Molekulargewicht",
        "Eine strukturell ähnliche Gruppe mit vergleichbaren physikalisch-chemischen Eigenschaften, die COOH ersetzen kann (Tetrazol statt COOH in Losartan)",
        "Ein radioaktiv markiertes Analogon",
        "Eine Verbindung mit gleicher Summenformel aber anderer Struktur",
      ],
      correct: 1,
      explanation:
        "Bioisostere haben ähnliche Sterik, Elektronik und pKa wie die Zielgruppe, aber andere metabolische oder physikochemische Eigenschaften. Tetrazol (pKa ~4-5) ist ein Bioisoster der Carbonsäure: ähnlicher pKa, aber höhere metabolische Stabilität. Einsatz z.B. im Losartan (Angiotensin-Rezeptor-Blocker).",
    },
    {
      id: "q3",
      question: "Was ist das Besondere an der CuAAC-Click-Chemie für die Triazol-Synthese?",
      options: [
        "Sie liefert immer 1,5-disubstituiertes Triazol",
        "Sie liefert regioselektiv das 1,4-disubstituierte 1,2,3-Triazol aus Azid + terminalen Alkin",
        "Sie benötigt Hochdruck und Hochtemperatur",
        "Sie verläuft über einen Carben-Mechanismus",
      ],
      correct: 1,
      explanation:
        "CuAAC (Copper-catalyzed Azide-Alkyne Cycloaddition): Azid + terminales Alkin + Cu(I) → selektiv 1,4-disubst. 1,2,3-Triazol. Ohne Cu (thermisch, Huisgen): Gemisch aus 1,4- und 1,5-Isomeren. RuAAC → 1,5-Isomer.",
    },
    {
      id: "q4",
      question: "In welchem Wirkstoff spielt das Thiazolium-Ion als Coenzym eine zentrale Rolle?",
      options: ["Imidazol", "Thiamin (Vitamin B1)", "Coffeein", "Histidin"],
      correct: 1,
      explanation:
        "Thiaminpyrophosphat (aktives Vitamin B1) enthält ein Thiazoliumion. Das C-2-H ist acide; nach Deprotonierung entsteht ein nucleophiles Carbanion (ähnlich einem NHC = N-Heterocyclisches Carben), das Acyl-Gruppen übertragen kann (Pyruvat-Decarboxylase).",
    },
    {
      id: "q5",
      question: "Welche Reaktion von 3-Amino-1H-1,2,4-Triazol ist aus der Namenskonventionen wichtig?",
      options: [
        "Es ist ein 6-gliedriger Ring",
        "Das Triazol hat 3 N-Atome; '1H' gibt die Position des N-H an; '3-amino' zeigt NH₂ an C-3",
        "Es enthält O-Atome",
        "Die Nummerierung beginnt am Schwefelatom",
      ],
      correct: 1,
      explanation:
        "1,2,4-Triazol: N-Atome an 1,2,4-Positionen. '1H' = NH an Position 1. '3-amino' = NH₂-Gruppe an C-3. Diese Nomenklatur ist Prüfungsrelevant (Exercises, Exam Aufgabe 5).",
    },
  ],

  flashcards: [
    {
      front: "Imidazol – zwei N-Atome",
      back: "N-1 (Pyrrol-N): LP im π-System → nicht basisch. N-3 (Pyridin-N): LP frei → basisch. pKa = 7.0 (Imidazolium). Tautomerie möglich. Wichtig in Enzymen (His-Rest).",
    },
    {
      front: "CuAAC – Click-Chemie",
      back: "R-N₃ + R'C≡CH → Cu(I) → 1,4-disubstituiertes 1,2,3-Triazol. Regioselektiv. Mild, biokompatibel. RuAAC → 1,5-Isomer. Ohne Metall (Huisgen): Gemisch.",
    },
    {
      front: "Tetrazol als Bioisoster",
      back: "Ersetzt COOH in Wirkstoffen. Ähnlicher pKa (~4-5), bessere Metabolisierungsstabilität, gute Membranpermeabilität. Synthese: R-CN + NaN₃ → [3+2] → 5-R-Tetrazol. Beispiel: Losartan.",
    },
    {
      front: "Thiazolium-Chemie (Vitamin B1)",
      back: "C-2-H des Thiazoliumions ist acide. Deprotonierung → nucleophiles Carbenzentrum (NHC-artig). Übertragung von Acyl-Gruppen im Stoffwechsel (Pyruvat-Decarboxylase, Transketolase).",
    },
    {
      front: "Isoxazol – latenter β-Enaminon",
      back: "Isoxazol enthält N-O-Bindung (schwach). Hydrogenolytische oder reduktive Spaltung → β-Enaminon oder β-Aminoenol. Strategie: Isoxazol als geschütztes β-Enaminon in der Synthese.",
    },
    {
      front: "Nomenklatur: 3-Amino-1H-1,2,4-Triazol",
      back: "1,2,4-Triazol: N an Positionen 1,2,4. 1H: NH an Position 1. 3-amino: NH₂ an C-3. Trivialname: Amitrole (Herbizid). 5 Ringmoleküle mit 3 N-Atomen.",
    },
  ],
};
