export const topic = {
  id: "06-cyclocondensations",
  title: "Cyclocondensations-Reaktionen",
  subtitle: "Regioselektive Synthese von Heterocyclen",
  icon: "⚡",
  estimatedMinutes: 80,
  theory: `
## Was ist eine Cyclocondensation?
 
Eine **Cyclocondensation** ist eine Ringschlussreaktion unter Abspaltung kleiner Moleküle (H₂O, ROH, NH₃). Im Gegensatz zur Cycloaddition involviert sie nucleophile/elektrophile Schritte (nicht pericyclisch).
 
## Regioselektivitäts-Problem
 
Bei unsymmetrischen Komponenten A + B → P1 + P2 (Regioisomere)
 
**Strategien für Regioselektivität:**
1. **Vorgeformte Enamine** mit definierter Geometrie
2. **Unsymmetrisches Dicarbonyl** statt symmetrischem
3. **Konjugat-Addition – konjugat-Eliminierung**-Weg
 
## Wichtige Cyclocondensations-Reaktionen (Prüfungsrelevant)
 
### Hantzsch-Dihydropyridin [3+3]:
Enamin + 1,3-Dicarbonyl (+ NH₃) → 1,4-Dihydropyridin → Oxidation → Pyridin
Regioselektiv wenn Enamin vorsynthetisiert!
 
### Bohlmann-Rahtz-Reaktion [3+3]:
Enaminon + β-Ketoester → kondensiertes Pyridin
Selektiv: Enaminon gibt Regiochemie vor
 
### Guareschi-Thorpe [3+3]:
Cyanoacetamid + 1,3-Dicarbonyl → 2-Pyridinon-3-carbonitril
 
### Kröhnke [3+2+1]:
Pyridinium-Ylid + unges. Dicarbonyl + NH₄OAc → Pyridin
Mechanismus: 1. Alkylierung → Pyridinium-Salz; 2. Knoevenagel + Michael; 3. Cyclisierung; 4. Aromatisierung
 
### Synthese substituierter Pyrimidine [3+3]:
1,3-Dicarbonyl + Harnstoff/Guanidin/Amidinat → Pyrimidine/Pyrimidinone
**Biginelli-Reaktion:** Aldehyd + β-Ketoester + Harnstoff → Dihydropyrimidinon (DHPM)
 
### Synthese von Pyrazolen [3+2]:
1,3-Dicarbonyl + Hydrazin (H₂N-NH₂) → Pyrazol
Regioselektivität: Bei unsymmetrischen Dicarbonylen → zwei mögliche Regioisomere
Lösung: Monosubstituiertes Hydrazin H₂N-NHR → ein Isomer bevorzugt
 
### Synthese von Isoxazolen:
β-Enolketon + NH₂OH (Hydroxylamin) → Isoxazol (+ H₂O)
 
### Imidazol-Synthese:
1,2-Dicarbonyl + NH₃ + Aldehyd → Imidazol (van Leusen: TosMIC)
 
## Schema A + B → P für Prüfung
 
Für jedes Produkt:
1. Ring-Typ identifizieren (5/6, welche Heteroatome)
2. Retrosynthetisch zerlegen: Welche Bindungen wurden geknüpft?
3. Komponenten A und B formulieren
4. Reaktionstyp benennen (Hantzsch, Biginelli, etc.)
  `,
  quiz: [
    {
      id: "q1",
      question: "Welche Komponenten braucht die Hantzsch-Dihydropyridin-Synthese?",
      options: [
        "Azid + Alkin",
        "Enamin (oder Aldehyd) + 1,3-Dicarbonyl + NH₃",
        "Dien + Dienophil",
        "Hydrazin + 1,3-Dicarbonyl",
      ],
      correct: 1,
      explanation: "Hantzsch-Synthese [3+3]: Enamin (3C-Einheit) + 1,3-Dicarbonylverbindung (3C-Einheit) + NH₃ (1N-Einheit). Alternativ: Aldehyd + 2× β-Ketoester + NH₃. Produkt: 1,4-Dihydropyridin; nach Oxidation: Pyridin.",
    },
    {
      id: "q2",
      question: "Wie kann die Regioselektivität bei der Hantzsch-Synthese mit unsymmetrischen Komponenten gesichert werden?",
      options: [
        "Durch Temperaturkontrolle",
        "Durch Vorsynthese des Enamins mit definierter Regiochemie",
        "Durch Lösungsmittelwahl",
        "Durch Überschuss einer Komponente",
      ],
      correct: 1,
      explanation: "Wenn man das Enamin vorher separat herstellt (aus Keton + primäres Amin), ist seine Regiochemie festgelegt. Die anschließende Reaktion mit dem 1,3-Dicarbonyl liefert dann regioselektiv nur ein Pyridin-Isomer.",
    },
    {
      id: "q3",
      question: "Was ist das Produkt der Biginelli-Reaktion?",
      options: [
        "Pyrimidin",
        "1,4-Dihydropyridin",
        "3,4-Dihydropyrimidin-2(1H)-on (DHPM)",
        "Pyrazol",
      ],
      correct: 2,
      explanation: "Die Biginelli-Reaktion (3-Komponenten): Aldehyd + β-Ketoester + Harnstoff → 3,4-Dihydropyrimidin-2(1H)-on (DHPM). Säurekatalysiert. DHPMs sind pharmakologisch aktiv (Ca-Kanal-Blocker, Hypertonie).",
    },
    {
      id: "q4",
      question: "Welche Komponenten liefern ein Pyrazol in der Cyclocondensation?",
      options: [
        "1,3-Dicarbonyl + NH₂OH",
        "1,3-Dicarbonyl + H₂N-NHR (Hydrazin)",
        "1,4-Dicarbonyl + NH₃",
        "Enamin + Diazoniumsalz",
      ],
      correct: 1,
      explanation: "1,3-Dicarbonyl + Hydrazin (H₂N-NH₂ oder H₂N-NHR) → Pyrazol. Mit Hydrazin selbst: Gemisch von zwei Regioisomeren (wenn 1,3-Dicarbonyl unsymmetrisch). Mit monosubstituiertem Hydrazin: definiertes N-substituiertes Pyrazol.",
    },
    {
      id: "q5",
      question: "Welche Reagenz-Kombination liefert ein Isoxazol?",
      options: [
        "β-Enolketon + H₂N-OH (Hydroxylamin)",
        "1,4-Dicarbonyl + NH₃",
        "Azid + Alkin",
        "Aldehyd + Malonitril",
      ],
      correct: 0,
      explanation: "β-Enolketon + Hydroxylamin (H₂N-OH) → Isoxazol. Mechanismus: Kondensation (Oximbildung am Keton), dann Cyclisierung (intramolekulare Michael-Addition), dann Dehydratisierung. Regioselektiv wenn 1,3-Dicarbonyl unsymmetrisch.",
    },
    {
      id: "q6",
      question: "Was ist die van-Leusen-Synthese und was produziert sie?",
      options: [
        "Pyridin aus Triazin",
        "Imidazol aus Tosylmethylisocyanid (TosMIC) + Aldehyd + Amin",
        "Furan aus 1,4-Dicarbonyl",
        "Oxazol aus Isocyanid + Carbonylverbindung",
      ],
      correct: 1,
      explanation: "Van Leusen-Reaktion: Aldehyd + R-NH₂ → Imin, dann + TosMIC (Tosylmethylisocyanid, TosCH₂NC) → 4-Tosyl-imidazol (nach Tosyl-Eliminierung → Imidazol). Milde Bedingungen, breite Anwendbarkeit.",
    },
  ],
  flashcards: [
    { front: "Hantzsch-Dihydropyridin-Synthese", back: "[3+3]-Cyclocondensation: Enamin + 1,3-Dicarbonyl + NH₃ → 1,4-Dihydropyridin → [O] → Pyridin. Regioselektiv: vorsynthetisiertes Enamin verwenden." },
    { front: "Biginelli-Reaktion", back: "3-Komponenten-Reaktion: Aldehyd + β-Ketoester + Harnstoff → DHPM (Dihydropyrimidinon). Säurekatalysiert. Produkte: Calciumkanalblocker." },
    { front: "Kröhnke-Reaktion", back: "[3+2+1]-Cyclocondensation. Schritte: 1. α-Br-Keton + Pyridin → Pyridinium-Salz. 2. + α,β-unges. Keton (Michael). 3. + NH₄OAc → Cyclisierung + Aromatisierung → Pyridin." },
    { front: "Pyrazol-Synthese", back: "1,3-Dicarbonyl + H₂N-NH-R → N-substituiertes Pyrazol (regioselektiv). Mit H₂N-NH₂ → Gemisch. Wichtig: 1,3-Diketone bevorzugen 3(5)-substituiertes Pyrazol." },
    { front: "Bohlmann-Rahtz-Reaktion", back: "[3+3]-Cyclocondensation: Enaminon + β-Ketoester → Pyridin. Regiochemie wird durch das Enaminon diktiert. Propargylamin als Alternative." },
    { front: "Retrosynthese: Cyclocondensation", back: "Identifiziere: Welche Bindungen C-N oder C-O wurden neu geknüpft? Schneide sie retrosynthetisch. Ergänze H₂O (oder NH₃, ROH) die eliminiert wurden. Das gibt A und B." },
  ],
};
