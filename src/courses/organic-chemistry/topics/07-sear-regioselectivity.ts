export const topic = {
  id: "07-sear-regioselectivity",
  title: "SEAr – Regioselektivität",
  subtitle: "Elektrophile Substitution an Heteroaromaten",
  icon: "⚖️",
  estimatedMinutes: 60,
  theory: `
## Elektrophile Aromatische Substitution (SEAr) an Heteroaromaten
 
### Grundprinzip
1. Elektrophil E⁺ greift HOMO des Aromaten an → Arenium-Ion (Sigma-Komplex)
2. Deprotonierung → aromatisches Produkt
 
**Regioselektivität = Stabilität des Arenium-Ions**
→ je mehr Resonanzstrukturen → je stabiler → bevorzugte Position
 
### Elektronenreiche Heteroaromaten (aktiviert)
 
**Pyrrol:**
- C-2 (α) >> C-3 (β)
- Begründung: 3 Resonanzstrukturen bei α-Angriff (inkl. N⁺-Struktur), nur 2 bei β-Angriff
 
**Furan:**
- C-2 >> C-3 (gleiche Logik wie Pyrrol)
- Wichtig: Furan kann bei harten Bedingungen auch 1,2- und 1,4-Addition eingehen (weniger aromatisch als Benzol)
 
**Thiophen:**
- C-2 >> C-3 (gleiche Logik)
- Thiophen ist stabiler als Furan (mehr aromatisch)
 
**Indol:**
- C-3 >> C-2 (AUSNAHME!)
- Begründung: Bei C-3-Angriff bleibt Benzol-Aromatizität erhalten; Ladung auf N ohne Zerstörung des Benzol-π-Systems
 
### Elektronenarme Heteroaromaten (deaktiviert)
 
**Pyridin:**
- SEAr sehr langsam
- Wenn möglich: C-3 bevorzugt (meta zu N)
- C-2 und C-4 sind durch N besonders deaktiviert (N zieht Elektronen ab)
 
**Pyrimidin, Chinolin, Isochinolin:**
- Analoge Logik: Positionen meta zu N-Atomen bevorzugt
 
## Resonanzstrukturen zeichnen (Prüfungsrelevant)
 
**Für SEAr an Pyrrol (C-2-Angriff von Br⁺):**
 
Struktur 1: Br und H an C-2, positive Ladung an C-3
Struktur 2: Ladung an C-5
Struktur 3: Ladung an N (N⁺) → besonders stabil (N kann positive Ladung tragen)
→ 3 Resonanzstrukturen → stabileres Arenium-Ion als bei C-3
 
**Für SEAr an Pyridin (C-3-Angriff):**
Kein N⁺ in Resonanzstruktur → weniger stabil
Bei C-2 oder C-4-Angriff: N⁺ in Resonanzstruktur, ABER N ist bereits elektronenarm (pKa 5.2) → destabilisierend!
 
## Wichtige Reaktionen im Überblick
 
| Substrat | Reagenz | Position | Produkt |
|---|---|---|---|
| Indol | Br⁺ (NBS) | C-3 | 3-Brom-indol |
| Furan | Br⁺ | C-2 | 2-Brom-furan |
| Pyrrol | Br⁺ | C-2 | 2-Brom-pyrrol |
| Thiophen | Br⁺ | C-2 | 2-Brom-thiophen |
| Pyridin | Br₂/sehr hart | C-3 | 3-Brom-pyridin |
  `,
  quiz: [
    { id: "q1", question: "Warum ist C-2 (α-Position) bei der SEAr von Furan bevorzugt gegenüber C-3?", options: ["Sterik bevorzugt C-2", "C-2-Angriff gibt 3 Resonanzstrukturen (incl. O⁺), C-3-Angriff nur 2", "C-2 hat höhere π-Dichte im HOMO", "Das O-Atom ist an C-2 direkt benachbart"], correct: 1, explanation: "Bei Elektrophil-Angriff an C-2: 3 Resonanzstrukturen für Arenium-Ion (inkl. O⁺-Struktur). Bei C-3: nur 2 Resonanzstrukturen → C-2-Intermediat stabiler → C-2 bevorzugt (Hammondpostulat)." },
    { id: "q2", question: "Indol reagiert mit Br⁺ an welcher Position?", options: ["C-1 (N)", "C-2", "C-3", "C-7"], correct: 2, explanation: "C-3 ist bevorzugt für SEAr am Indol. Begründung: Bei C-3-Angriff bleibt die Benzol-Aromatizität erhalten, die positive Ladung wird auf N delokalisiert ohne den Benzol-Ring zu unterbrechen → stabilstes Arenium-Ion." },
    { id: "q3", question: "Welche Position ist bei SEAr an Pyridin am wenigsten deaktiviert?", options: ["C-2", "C-3", "C-4", "N-1"], correct: 1, explanation: "C-3 (meta zu N) ist am wenigsten deaktiviert, weil die positive Ladung im Arenium-Ion NICHT direkt auf den elektronenarmen N wandern kann. An C-2 und C-4 (ortho/para zu N) würde N⁺ gebildet, das energetisch sehr ungünstig ist." },
    { id: "q4", question: "Welche Resonanzstruktur macht den α-Angriff am Pyrrol besonders günstig?", options: ["Eine mit C⁺ am Heteroatom", "Eine mit N⁺ (positiv geladenem Stickstoff)", "Eine mit O⁻", "Keine – SEAr läuft nicht am Pyrrol"], correct: 1, explanation: "Bei α-Angriff am Pyrrol: eine der 3 Resonanzstrukturen des Arenium-Ions zeigt N⁺. Obwohl positiv geladen, ist dieser N-Kation durch die benachbarten C-Atome stabilisiert → günstig. Bei β-Angriff fehlt diese N⁺-Struktur." },
    { id: "q5", question: "Warum ist SEAr an Pyridin so viel langsamer als an Benzol?", options: ["Pyridin ist kleiner", "Der Pyridin-N entzieht Elektronendichte aus dem Ring → niedrigeres HOMO → schlechtere Reaktion mit Elektrophilen", "Pyridin hat keine freien Elektronen", "SEAr an Pyridin ist verboten"], correct: 1, explanation: "Das elektronegative N-Atom in Pyridin (sp²) entzieht induktiv und durch Mesomerie Elektronendichte aus dem Ring → das HOMO liegt energetisch tiefer als bei Benzol → schlechtere Reaktion mit Elektrophilen (E⁺). SEAr ist stark gehemmt, SNAr stattdessen bevorzugt." },
  ],
  flashcards: [
    { front: "SEAr-Regioselektivität – Grundregel", back: "Position mit stabilstem Arenium-Ion wird bevorzugt. Mehr Resonanzstrukturen = stabileres Intermediat = bevorzugte Position. Zeichne alle möglichen Resonanzstrukturen!" },
    { front: "α vs. β bei 5-Ring-Heteroaromaten", back: "α (C-2) >> β (C-3) für Pyrrol, Furan, Thiophen. AUSNAHME: Indol → C-3 bevorzugt (Benzol-Aromatizität bleibt erhalten bei C-3-Angriff)." },
    { front: "SEAr an Pyridin", back: "Stark deaktiviert (N entzieht e⁻). Wenn möglich: C-3 (meta zu N). C-2 und C-4 am stärksten deaktiviert. SNAr an C-2/C-4 stattdessen bevorzugt." },
    { front: "Bromierung von Indol", back: "Indol + NBS (N-Bromsuccinimid) oder Br⁺ → 3-Bromindol. C-3 ist reaktivste Position. Gegebenenfalls N-H schützen (N-Ts, N-Boc) für selektive C-Funktionalisierung." },
    { front: "Arenium-Ion (Sigma-Komplex)", back: "Zwischenprodukt der SEAr. sp³-Kohlenstoff am Angriffspunkt. Positive Ladung über das verbleibende π-System delokalisiert. Stabilität → Regioselektivität." },
  ],
};
