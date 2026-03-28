export const topic = {
  id: "08-mechanisms",
  title: "Reaktionsmechanismen",
  subtitle: "Detaillierte Mechanismen ausgewählter Transformationen",
  icon: "🔬",
  estimatedMinutes: 90,
  theory: `
## Übersicht: Prüfungsrelevante Mechanismen
 
Die folgenden Mechanismen werden in den Exercises und dem Exam geprüft.
Jeder Mechanismus muss mit korrekten Elektronenfluss-Pfeilen dargestellt werden.
 
## 1. Kondrat'eva-Pyridinsynthese (Oxazol + Alkin)
 
**Reaktion:** Oxazol + DMAD (oder anderes Alkin) → Pyridin
 
**Schritte:**
1. **[4+2]-Cycloaddition:** Oxazol (Azadien, 4π) + Alkin (2π) → Bicyclisches Intermediat (7-Oxabicyclo[2.2.1]heptadien-System)
2. **Retro-[4+2]:** Thermische Spaltung unter CO₂-Abspaltung → aromatisches Pyridin
**Triebkraft:** Aromatisierung + Entropiegewinn (CO₂-Gas)
 
## 2. Boger-Reaktion (Triazin + Enamin → Pyridin + N₂)
 
**Reaktion:** 1,2,4,5-Tetrazin (oder Triazin) + Enamin → Pyridin/Pyridazin + N₂
 
**Schritte:**
1. **[4+2]-Cycloaddition:** Tetrazin (azadien, 4π) + Enamin (2π) → Bicyclus
2. **Retro-[4+2]:** N₂-Abspaltung (analog CO₂ bei Kondrat'eva) → Dihydropyridazin
3. **Oxidation/Tautomerisierung** → aromatisches Pyridin
 
## 3. Methylierung + Cycloaddition (MeOTf + BnMe₃NCN)
 
**Aus Exam/Exercise:**
Oxazol-Derivat → MeOTf → N-methyliertes Azomethin-Ylid → [3+2]-Cycloaddition mit dem Alkin im gleichen Molekül (intramolekular!) → Isoindol-Gerüst
 
**Schritte:**
1. MeOTf methyliert N des Oxazols → kationisches Intermediat
2. BnMe₃NCN deprotoniert → Azomethin-Ylid (1,3-Dipol in situ)
3. Intramolekulare [3+2]-CA mit dem Alkin → bicyclisches Produkt
 
## 4. Paal-Knorr-Mechanismus (1,4-Dicarbonyl → Pyrrol)
 
**Detaillierter Mechanismus:**
1. Protonierung eines Carbonyls → Oxocarbeniom
2. Nucleophiler Angriff des NH₂ → Hemiaminal
3. Dehydratisierung → Imin (erster Ring-N)
4. Tautomerisierung + Cyclisierung des zweiten Amins
5. Zweite Dehydratisierung → Dihydropyrrol
6. Tautomerisierung → Pyrrol (aromatisch!)
 
## 5. Kröhnke-Reaktionsmechanismus
 
**Schritte:**
1. α-Bromketon + Pyridin → Pyridinium-Ylid (Zwitterion)
2. Michael-Addition des Ylids an α,β-unges. Carbonyl → Michael-Addukt
3. Zugabe von NH₄OAc → intramolekulare Aldol-Cyclisierung
4. Dehydratisierung + Oxidation → aromatisches Pyridin
 
## 6. N-Oxidierung + Boekelheide-Umlagerung
 
**Schritte:**
1. 2-Methylpyridin + mCPBA → 2-Methylpyridin-N-Oxid (peracide oxidiert N)
2. + Ac₂O, Δ → [1,2]-Acyl-Wanderung: O-Acylierung + [1,2]-Shift auf CH₃ → 2-(Acetoxymethyl)pyridin
3. Alternativ: Elektrophile Amination möglich an aktivierter 4-Position
 
## 7. Intramolekulare [3+2] mit Münchnon/Oxadiazol
 
**Aus Exercise 1, Aufgabe 3 (drittes Beispiel):**
Indol-Oxadiazol-Derivat + α,β-unges. Carbonylverbindung → Wärme → komplexes Polycyclus
1. Oxadiazol generiert in situ ein Azomethin-Ylid (1,3-Dipol) durch thermische Ringöffnung + CO₂-Verlust
2. [3+2] mit dem Dipolarophil → Cycloaddukt
3. Weitere Cyclisierungen/Umlagerungen → Naturstoff-analoges Gerüst
  `,
  quiz: [
    { id: "q1", question: "Was ist der erste Schritt im Paal-Knorr-Mechanismus zur Pyrrol-Synthese?", options: ["Oxidation des 1,4-Dicarbonyls", "Nucleophiler Angriff des Amins auf ein protoniertes Carbonyl → Hemiaminal", "Diels-Alder-Reaktion", "Radikalische Initiierung"], correct: 1, explanation: "Im Paal-Knorr-Mechanismus greift das primäre Amin (RNH₂) nucleophil das protonierte (Lewis-Säure aktivierte) Carbonyl an → Hemiaminal. Dann Dehydratisierung → Imin. Zweites Imin → Cyclisierung → Dihydropyrrol → Tautomerisierung → Pyrrol." },
    { id: "q2", question: "Wozu dient BnMe₃NCN in der Reaktion mit dem Oxazol-Derivat (Exam Exercise 6)?", options: ["Als Oxidationsmittel", "Als Base zur Deprotonierung → generiert in-situ ein 1,3-Dipol (Azomethin-Ylid)", "Als Alkylierungsmittel", "Als Lösungsmittel"], correct: 1, explanation: "BnMe₃NCN (Benzyl-trimethylammonium-cyanid) ist eine Cyanid-Quelle / Base. Es deprotoniert das durch MeOTf methylierte Oxazolium-Intermediat → Azomethin-Ylid (1,3-Dipol) entsteht in situ → dann [3+2]-Cycloaddition." },
    { id: "q3", question: "Was ist die Triebkraft der Kondrat'eva-Pyridinsynthese?", options: ["Säurekatalyse", "Aromatisierung zum Pyridin + Entropiegewinn durch CO₂-Gasentwicklung", "Reduktion des Azadiens", "Keine – sie ist endotherm"], correct: 1, explanation: "Zwei Triebkräfte: 1. Aromatisierung (Pyridin stabiler als bicyclisches Intermediat, ΔG < 0). 2. Entropiegewinn durch Freisetzung von CO₂ als Gas (TΔS > 0). Zusammen → günstige Thermodynamik." },
    { id: "q4", question: "Welches Intermediat entsteht bei der mCPBA-Oxidation von Pyridin?", options: ["Pyridinon", "Pyridin-N-Oxid", "Hydroxypyridin", "Pyridinium-Ion"], correct: 1, explanation: "mCPBA (meta-Chlorperbenzoesäure) ist ein Peracid, das N-Atome oxidiert. Pyridin + mCPBA → Pyridin-N-Oxid. Das N-Oxid ist wichtig als aktivierter Vorläufer für SNAr (an C-4 aktiviert) und die Boekelheide-Umlagerung." },
    { id: "q5", question: "Im Kröhnke-Mechanismus: Was ist die Rolle des Pyridins im ersten Schritt?", options: ["Pyridin ist das Nucleophil das das α-Bromketon alkyliert → Pyridinium-Ylid", "Pyridin ist der Katalysator", "Pyridin wird als Lösungsmittel verwendet", "Pyridin ist das Oxidationsmittel"], correct: 0, explanation: "Im Kröhnke-Schritt 1 alkyliert das α-Bromketon das Pyridin-N → Pyridinium-Salz. Dieses Salz ist ein aktiviertes Enolat-Äquivalent (Ylid-Charakter am α-C). Das Ylid macht dann die Michael-Addition an das α,β-unges. Carbonyl." },
  ],
  flashcards: [
    { front: "Paal-Knorr-Mechanismus", back: "1,4-Dicarbonyl + RNH₂: 1. Hemiaminal; 2. Dehydratisierung → Imin; 3. Cyclisierung (2. N greift 2. Carbonyl); 4. Dehydratisierung → Dihydropyrrol; 5. Tautomerisierung → Pyrrol." },
    { front: "Kröhnke-Pyridinsynthese – Schritte", back: "1. α-BrCO + Pyridin → Pyridinium-Ylid. 2. Michael-Addition an Enon. 3. + NH₄OAc → Cyclisierung. 4. Dehydratisierung + Aromatisierung → Pyridin." },
    { front: "Azomethin-Ylid (1,3-Dipol)", back: "Form: C=N⁺-C⁻ ↔ C⁻-N=C. Generierung: aus N-Oxiden, Münchnonen, thermisch aus bestimmten Aziridinen, oder durch Deprotonierung von Iminium-Ionen. Reaktion: [3+2] mit Alkenen/Alkinen." },
    { front: "N-Oxid-Chemie (Pyridin)", back: "Pyridin + mCPBA → Pyridin-N-Oxid. N-Oxide sind: a) elektrophiler an C-4 (SNAr); b) Vorstufe für Boekelheide: + Ac₂O,Δ → 2-AcOCH₂-Pyridin. c) können reduziert werden → zurück zu Pyridin." },
    { front: "Mechanismus: [4+2] + Retro-[4+2]", back: "Cycloaddition → bicyclisches Intermediat. Dann thermische Retro-[4+2] eliminiert XY (CO₂, N₂, SO₂, etc.) → neuer Aromat. Triebkraft: Aromatisierung + Gasentwicklung." },
  ],
};
