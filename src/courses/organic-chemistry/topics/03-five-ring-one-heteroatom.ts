// src/courses/organic-chemistry/topics/03-five-ring-one-heteroatom.ts
// Quelle: Vorlesung VO 270280 – Pyrrol, Furan, Thiophen

export const topic = {
  id: "03-five-ring-one-heteroatom",
  title: "5-Ring-Heteroaromaten (1 Heteroatom)",
  subtitle: "Pyrrol, Furan & Thiophen",
  icon: "🟡",
  estimatedMinutes: 75,

  theory: `
## Überblick: Pyrrol, Furan, Thiophen

Alle drei sind 5-gliedrige aromatische Heterocyclen mit **6 π-Elektronen**:
- 4 Elektronen aus 2 C=C-Doppelbindungen
- 2 Elektronen vom Heteroatom-Lone-Pair

| Eigenschaft | Pyrrol | Furan | Thiophen |
|---|---|---|---|
| Heteroatom | N | O | S |
| pKa (N-H / O-H) | 17.5 (N-H Acidität!) | – | – |
| Aromatizität | hoch | mittel | hoch |
| Reaktivität SEAr | sehr hoch | hoch | hoch |
| Bevorzugte Position | C-2 (α) | C-2 (α) | C-2 (α) |

## Elektronische Eigenschaften

Das Heteroatom-Lone-Pair ist in allen drei Verbindungen ins π-System eingebunden:
- → System ist **elektronenreich** → aktiviert für SEAr
- → **Nicht basisch** (Lone-Pair nicht verfügbar für Protonierung – würde Aromatizität zerstören)
- **Pyrrol**: N-H ist acide! (pKa 17.5) → deprotonierbar mit starken Basen → Pyrrol-Anion aromatisch und stabil

## Reaktivität: SEAr

Alle drei reagieren leichter als Benzol mit Elektrophilen.

**Regioselektivität: immer Position C-2 (α) bevorzugt!**

**Begründung über Resonanzstrukturen:**
- Angriff an C-2: 3 Resonanzstrukturen für Arenium-Ion, darunter eine, bei der **Heteroatom positiv geladen** (günstig wegen Elektronegativität und Konjugation)
- Angriff an C-3: nur 2 Resonanzstrukturen → weniger stabilisiert

**Ausnahme:** Wenn C-2 blockiert ist → Reaktion an C-3

**Konkretes Beispiel:**
- Indol + Br⁺ → Bromierung an C-3 des Pyrrol-Rings (nicht des Benzol-Rings!) → 3-Brom-indol
- Furan + Br⁺ → 2-Bromfuran
- Thiophen + Br⁺ → 2-Bromthiophen

## Synthese von Pyrrol-Derivaten

### Paal-Knorr-Synthese:
1,4-Dicarbonylverbindung + NH₃ (oder primäres Amin) → Pyrrol
Mechanismus: Doppelkondensation (2× Iminbildung) + Cyclisierung + Dehydratisierung

### Knorr-Pyrrole-Synthese:
α-Aminoketon + β-Ketoester → Pyrrol (klassisch)

## Synthese von Furan-Derivaten

### Paal-Knorr-Synthese (O-Variante):
1,4-Dicarbonylverbindung + H⁺ (Lewis-Säure) → Furan
Mechanismus: Doppelkondensation (Hemi-Acetal) + Cyclisierung + Dehydratisierung

## Synthese von Thiophen-Derivaten

### Paal-Knorr (S-Variante):
1,4-Dicarbonylverbindung + P₄S₁₀ oder H₂S/H⁺ → Thiophen

### Fiesselmann-Synthese:
β-Chloracrylat + Thiodiglykolat → Thiophen-Ester

## Besonderheiten

### Indol (Benzo[b]pyrrol):
- Bicyclischer Aromtat: Benzol + Pyrrol fusioniert
- C-3 ist die reaktivste Position für SEAr (nicht C-2!)
  → Begründung: Angriff an C-3 gibt Arenium-Ion, das auf Benzol-Ring und N delokalisierbar ist; Aromatizität des Benzolrings bleibt erhalten

### Benzofuran, Benzothiophen:
- Analog zu Indol, aber mit O bzw. S
- SEAr bevorzugt an C-2 des 5-Ring-Anteils
  `,

  quiz: [
    {
      id: "q1",
      question:
        "Warum reagiert Indol bei der elektrophilen aromatischen Substitution bevorzugt an C-3 und nicht an C-2?",
      options: [
        "C-2 ist sterisch gehindert",
        "Angriff an C-3 liefert ein Arenium-Ion, das auf den Benzolring und N delokalisierbar ist – Aromatizität des Benzolrings bleibt erhalten",
        "C-3 hat die höhere π-Elektronendichte im Grundzustand",
        "N stabilisiert den Übergangszustand an C-3 durch Inversion",
      ],
      correct: 1,
      explanation:
        "Bei Angriff an C-3: Das Arenium-Ion kann auf N delokalisiert werden, OHNE die Aromatizität des Benzol-Rings zu stören. Bei Angriff an C-2 müsste die Ladung auf den Benzol-Ring übertragen werden → Verlust von Benzol-Aromatizität → energetisch ungünstiger.",
    },
    {
      id: "q2",
      question:
        "Welche Verbindung entsteht bei der Paal-Knorr-Synthese aus einem 1,4-Dicarbonyl mit primärem Amin?",
      options: ["Furan", "Pyrrol", "Thiophen", "Pyridin"],
      correct: 1,
      explanation:
        "Die Paal-Knorr-Synthese liefert aus 1,4-Dicarbonylverbindungen + primärem Amin (R-NH₂) N-substituierte Pyrrole. Mit NH₃ → NH-Pyrrol, mit H₂O/H⁺ → Furan, mit H₂S/H⁺ oder P₄S₁₀ → Thiophen.",
    },
    {
      id: "q3",
      question:
        "Welche Eigenschaft unterscheidet Pyrrol fundamental von Pyridin in Bezug auf die N-H-Bindung?",
      options: [
        "Pyrrol hat kein N-H",
        "Pyrrol-N-H ist acide (pKa 17.5) und kann deprotoniert werden, da das Pyrrolid-Anion aromatisch ist",
        "Pyrrol-N-H ist stark basisch",
        "Pyrrol-N-H kann nicht deprotoniert werden",
      ],
      correct: 1,
      explanation:
        "Das Pyrrol-N-H ist acide (pKa ~17.5), weil das entstehende Pyrrolid-Anion aromatisch ist (6 π-e⁻). Mit starken Basen (NaH, BuLi) kann deprotoniert werden → N-Metallierung → Weiterreaktion mit Elektrophilen möglich.",
    },
    {
      id: "q4",
      question:
        "Furan + Br⁺: An welcher Position erfolgt die Bromierung bevorzugt?",
      options: ["C-2", "C-3", "C-4", "O-Atom"],
      correct: 0,
      explanation:
        "Furan wird bevorzugt an C-2 (α-Position) bromiert. Bei Angriff an C-2 entstehen 3 Resonanzstrukturen für das Arenium-Ion (davon eine mit positivem O), bei Angriff an C-3 nur 2 → C-2 energetisch bevorzugt.",
    },
    {
      id: "q5",
      question:
        "Welcher Heteroaromat ist am stärksten aktiviert für SEAr (reaktivster)?",
      options: ["Benzol", "Thiophen", "Pyrrol", "Furan"],
      correct: 2,
      explanation:
        "Pyrrol ist am reaktivsten für SEAr. Das N-Atom ist weniger elektronegativ als O oder S, daher ist das Lone-Pair im Pyrrol-N besser in den Ring 'hineingeschoben' → höchste π-Elektronen-Dichte im Ring → höchstes HOMO.",
    },
    {
      id: "q6",
      question:
        "Welcher Mechanismus erklärt die α-Selektivität (C-2) bei der SEAr von Furan?",
      options: [
        "C-2 ist sterisch zugänglicher",
        "Angriff an C-2 gibt mehr Resonanzstrukturen für das Arenium-Ion als Angriff an C-3",
        "Das O-Atom stabilisiert C-2 induktiv",
        "C-2 hat einen niedrigeren LUMO-Beitrag",
      ],
      correct: 1,
      explanation:
        "Bei Angriff an C-2: 3 Resonanzstrukturen (inkl. einer mit O⁺). Bei Angriff an C-3: nur 2 Resonanzstrukturen. Mehr Resonanz = stabileres Arenium-Ion = niedrigere Aktivierungsenergie → C-2 bevorzugt (kinetische Kontrolle).",
    },
  ],

  flashcards: [
    {
      front: "Paal-Knorr-Synthese",
      back: "1,4-Dicarbonyl + NH₃/RNH₂ → Pyrrol. 1,4-Dicarbonyl + H⁺ → Furan. 1,4-Dicarbonyl + H₂S/P₄S₁₀ → Thiophen. Mechanismus: Doppelkondensation + Cyclisierung + Dehydratisierung.",
    },
    {
      front: "α-Selektivität bei 5-Ring-Heteroaromaten",
      back: "Pyrrol, Furan und Thiophen reagieren bevorzugt an C-2 (α-Position) mit Elektrophilen. Grund: mehr Resonanzstrukturen für Arenium-Ion bei α-Angriff als bei β-Angriff (C-3).",
    },
    {
      front: "Indol – SEAr-Regioselektivität",
      back: "C-3 (nicht C-2!) ist bevorzugt. Bei C-3-Angriff bleibt Benzol-Aromatizität erhalten, Ladung wird auf N delokalisiert. Bei C-2-Angriff müsste Ladung auf Benzol-Ring.",
    },
    {
      front: "Pyrrol: Acidität vs. Basizität",
      back: "Nicht basisch (LP im π-System). ABER: N-H acide! pKa = 17.5. Pyrrolid-Anion aromatisch → stabil. Deprotonierung mit NaH, BuLi möglich → N-Metallierung.",
    },
    {
      front: "Furan vs. Pyrrol vs. Thiophen – Reaktivitätsreihe",
      back: "Pyrrol > Furan > Thiophen > Benzol für SEAr-Reaktivität. Begründung: N (am wenigsten elektronegativ) gibt Lone-Pair am stärksten ab → höchstes HOMO im Pyrrol.",
    },
    {
      front: "Knorr-Pyrrol-Synthese",
      back: "α-Aminoketon + β-Ketoester → Pyrrol. Klassische Methode zur Synthese von 2,3,4,5-substituierten Pyrrolen (z.B. für Porphyrin-Vorstufen).",
    },
  ],
};
