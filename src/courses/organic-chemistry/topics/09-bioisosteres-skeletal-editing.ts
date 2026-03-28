export const topic = {
  id: "09-bioisosteres-skeletal-editing",
  title: "Bioisostere & Skeletal Editing",
  subtitle: "Moderne Konzepte in der Wirkstoffchemie",
  icon: "💊",
  estimatedMinutes: 60,
  theory: `
## Bioisostere
 
**Definition:** Bioisostere sind Atome, Ionen oder Moleküle mit ähnlicher Größe, Gestalt und Elektronenverteilung, die ähnliche biologische Aktivität aufweisen, aber unterschiedliche chemische Eigenschaften haben.
 
**Ziele des bioisosteren Ersatzes:**
- Verbesserte metabolische Stabilität
- Veränderte Löslichkeit / Lipophilie
- Veränderte pKa-Werte
- Bessere Membranpermeabilität
- Verbesserte Selektivität
 
### Klassische bioisostere Ersetzungen:
 
| Original | Bioisoster | Vorteil |
|---|---|---|
| -COOH | Tetrazol | Ähnlicher pKa, metabolisch stabiler |
| -COOH | -SO₂NH₂ (Sulfonamid) | Saurer, wasserlöslicher |
| -COOH | -P(O)(OH)₂ | Phosphonsäure-Mimetikum |
| -COOH | Isoxazol-3-ol | Planar, H-Brücken-Donor/-Akzeptor |
| -COOH | Hydroxythiazol | |
| -OH | -NH₂, -CH₂OH, F | Polarität, Metabolismus |
| Benzol | Pyridin | Wasserlöslichkeit ↑, Metabolismus ↓ |
| Benzol | Thiophen, Furan | Pharmakophor-Erhalt |
 
**Prüfungsbeispiel (Exam Ex. 7):**
Nurr1-Ligand mit COOH → Bioisoster vorschlagen:
- Tetrazol: Ähnlicher pKa (~4-5), bioisoster zu COOH
- Synthese: Nitril (aus R-CN) + NaN₃ → [3+2]-Cycloaddition → 5-Tetrazol
 
## Skeletal Editing
 
**Definition:** Direkte Transformation des Kohlenstoff- oder Heteroatom-Grundgerüsts eines Moleküls in einer oder wenigen Stufen – ohne klassischen mehrstufigen Aufbau.
 
**Konzept:** Anstatt ein Zielmolekül neu zu synthetisieren, wird das Grundgerüst eines ähnlichen, leicht zugänglichen Moleküls direkt umgebaut.
 
### Wichtigste Reaktionen:
 
**Ciamician-Dennstedt-Umlagerung:**
Pyrrol + Dibromcarben (aus CHBr₃/Base) → 3-Bromopyridin
Mechanismus:
1. Cyclopropanierung des Pyrrols mit Carben → 2H-Azirin-Intermediat (mit gespanntem 3-Ring)
2. Ringöffnung + Ringerweiterung → Chlorpyridin/Brompyridin
 
**Prüfungsbeispiel (Exam Ex. 8) – Pindolol:**
Indol → 3-Chlorchinolin-Derivat:
- Reaktion: **Ciamician-Dennstedt-artig** oder Beckmann-Umlagerung + CHCl₃/Base
- Alternativ: Reimer-Tiemann-ähnliche Ringexpansion
- Mechanismus: Indol-N greift Dibromcarben an → gespannte Zwischenstufe → Ringöffnung des Pyrrol-Teils → Chinolin-Grundgerüst
 
**Weitere Skeletal-Editing-Konzepte:**
- **Stickstoff-Insertion in Benzol:** Rh-katalysiert, gibt direkt Pyridin
- **Kohlenstoff-Excision:** Entfernung eines C-Atoms aus dem Ring
- **Ring-Expansion/-Kontraktion**
 
## Moderne Drug Design Konzepte
 
**Bioisostere in zugelassenen Drugs:**
- **Losartan:** COOH → Tetrazol (Angiotensin-II-Antagonist)
- **Atorvastatin:** Pyrrole-Grundgerüst (Bioisoster der Acrylat-Seitenkette)
- **Apixaban:** Pyrazol-Grundgerüst
 
**Skeletal Editing in der Medizinalchemie:**
- Scaffold-Hopping: Gerüstaustausch ohne Aktivitätsverlust
- Bioisosterer Ringersatz: z.B. Benzol → Pyridin erhöht Wasserlöslichkeit
  `,
  quiz: [
    { id: "q1", question: "Was ist ein Bioisoster und warum ist Tetrazol ein klassisches Bioisoster der Carbonsäure?", options: ["Eine identische Verbindung; Tetrazol hat gleiche Summenformel wie COOH", "Eine Gruppe mit ähnlicher Größe, Polarität und pKa aber unterschiedlichen metabolischen Eigenschaften; Tetrazol hat pKa ~4-5 ähnlich COOH, ist aber metabolisch stabiler", "Eine Verbindung mit gleicher Löslichkeit; Tetrazol ist genauso gut wasserlöslich", "Ein Prodrug; Tetrazol wird im Körper zu COOH hydrolysiert"], correct: 1, explanation: "Bioisostere: ähnliche physikochemische Eigenschaften (Größe, Geometrie, pKa, H-Brücken) → ähnliche biologische Aktivität. Tetrazol-pKa ~4-5 ≈ RCOOH-pKa ~4-5. Vorteil: Tetrazol resistent gegen Hydrolyse/Oxidation → längere Wirkdauer, bessere orale Bioverfügbarkeit." },
    { id: "q2", question: "Was ist 'Skeletal Editing' in der modernen Synthesechemie?", options: ["Klassischer mehrstufiger Aufbau eines Grundgerüsts", "Direkte Transformation des Ringgerüsts eines vorhandenen Moleküls (z.B. Pyrrol → Pyridin) in wenigen Schritten ohne kompletten Neuaufbau", "Schutzgruppenmanipulation", "Funktionsgruppeninterkonversion (FGI) ohne Ringänderung"], correct: 1, explanation: "Skeletal Editing ermöglicht direkten Ringumbau. Beispiel: Ciamician-Dennstedt: Pyrrol + CHBr₃/Base → 3-Brompyridin. Das Indol-Gerüst kann direkt zum Chinolin editiert werden. Modern: Rh-katalysierte N-Insertion in Benzol → Pyridin ohne Retrosynthese." },
    { id: "q3", question: "Welches Reagenz ist für die Ciamician-Dennstedt-Umlagerung (Pyrrol → Pyridin) entscheidend?", options: ["mCPBA", "NaNH₂", "Dibromcarben (aus CHBr₃ + Base)", "BuLi"], correct: 2, explanation: "Dibromcarben (generiert aus CHBr₃ + starke Base) cyclopropaniert den Pyrrol-Ring → gespanntes bicyclisches Intermediat. Ringöffnung + Umlagerung → Pyridin mit Halogen-Substituent an C-3. Mechanismus: Elektronen-armes Carben + π-System → [2+1]-Cycloaddition." },
    { id: "q4", question: "Welcher FDA-zugelassene Wirkstoff enthält ein Tetrazol als bioisosteren Ersatz für COOH?", options: ["Atorvastatin", "Apixaban", "Losartan", "Pindolol"], correct: 2, explanation: "Losartan (Cozaar) ist ein Angiotensin-II-AT₁-Rezeptor-Blocker. Die COOH-Gruppe des ursprünglichen Kandidaten wurde durch Tetrazol ersetzt → bessere orale Bioverfügbarkeit, metabolische Stabilität, ähnliche Affinität. Erstes Sartan auf dem Markt (1995)." },
    { id: "q5", question: "Welches Heterocyclus-Bioisoster erhöht typischerweise die Wasserlöslichkeit beim Ersatz eines Benzol-Rings?", options: ["Thiophen", "Furan", "Cyclopentyl", "Pyridin"], correct: 3, explanation: "Benzol → Pyridin: Das N-Atom erhöht den Dipolmoment und die H-Brücken-Akzeptor-Kapazität → bessere Wasserlöslichkeit. Gleichzeitig: Pyridin metabolisch stabiler gegenüber CYP-Oxidation (N macht den Ring elektronenarm → langsamer oxidiert). Klassisches Scaffold-Hopping." },
  ],
  flashcards: [
    { front: "Bioisoster – Definition", back: "Atom/Gruppe mit ähnlicher Sterik, Elektronik und physikochemischen Eigenschaften wie das Original, aber unterschiedlichen metabolischen/pharmakokinetischen Eigenschaften. Ziel: Verbesserung von Stabilität, Löslichkeit, Selektivität." },
    { front: "Tetrazol als COOH-Bioisoster", back: "pKa ~4-5 (ähnlich COOH). Metabolisch stabil (kein Ester/Amidhydrolyse). Synthese: R-CN + NaN₃ → [3+2] → 5-R-Tetrazol. Beispiel: Losartan. Planar, H-Brücken-Donor + Akzeptor." },
    { front: "Ciamician-Dennstedt-Umlagerung", back: "Pyrrol + Dibromcarben (CHBr₃/Base) → 3-Brompyridin. Skeletal Editing: Pyrrol (5-Ring) → Pyridin (6-Ring). Mechanismus: [2+1] + Ringerweiterung. Wichtig für Exam Ex. 8 (Pindolol → Chlorchinolin)." },
    { front: "Skeletal Editing", back: "Direkte Transformation des Ringgerüsts in 1-3 Stufen. Beispiele: Pyrrol→Pyridin, Indol→Chinolin, Benzol+N-Quelle→Pyridin (Rh-kat.). Vorteil: schneller Zugang zu Analoga, Bibliothekssynthese." },
    { front: "Benzol → Pyridin Scaffold Hop", back: "Erhöht: Wasserlöslichkeit (polarer N), metabolische Stabilität (elektronenarm). Verändert: Basizität (N, pKa 5.2), H-Brücken-Kapazität. Klassischer Trick im Drug Design. Beispiel: Viele Kinase-Inhibitoren." },
    { front: "Nurr1-Ligand – Bioisosterbeispiel (Exam)", back: "Nurr1-Ligand A hat COOH. Bioisosterer Ersatz: Tetrazol (pKa ähnlich, stabiler). Synthese des Tetrazol-Analogons: Entsprechendes Nitril (R-CN) herstellen, dann + NaN₃/[3+2] → Tetrazol-Derivat." },
  ],
};
