export const topic = {
  id: "10-statistik-qualitaet",
  title: "Statistik & Qualitätssicherung",
  subtitle: "Normalverteilung, LOD, Präzision, Richtigkeit, Q-Test",
  icon: "📊",
  estimatedMinutes: 70,
  theory: `
## Grundbegriffe der Analytischen Statistik

### Lage- und Streumaße

**Mittelwert (arithmetisch):**
x̄ = (1/n) · Σxᵢ

**Standardabweichung s (Stichprobe):**
s = √[Σ(xᵢ - x̄)² / (n-1)]

**Varianz:** s²

**Relative Standardabweichung (RSD):**
RSD = s/x̄ · 100%

### Normalverteilung (Gauß)

- Symmetrisch um Mittelwert μ
- 68,3% der Werte: μ ± 1σ
- 95,4% der Werte: μ ± 2σ
- 99,7% der Werte: μ ± 3σ

### Präzision vs. Richtigkeit

| | Hohe Präzision | Niedrige Präzision |
|---|---|---|
| Hohe Richtigkeit | ✓ Ideal | Systematisch OK, random schlecht |
| Niedrige Richtigkeit | Systematischer Fehler | Alles schlecht |

**Präzision** = Wiederholbarkeit (zufällige Fehler)
**Richtigkeit** = Übereinstimmung mit wahrem Wert (systematische Fehler)

### Fehlerarten

**Zufällige Fehler (Random errors):**
- Statistisch verteilt
- Durch Wiederholung reduzierbar
- Beeinflussen Präzision

**Systematische Fehler (Systematic errors):**
- Immer gleiche Richtung
- Nicht durch Wiederholung erkennbar
- Beeinflussen Richtigkeit
- Erkennung: Blindwert, zertifizierte Referenzmaterialien

### Q-Test (Ausreißertest)

Dient zum Erkennen von Ausreißern in Datensätzen.

**Berechnung:**
Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min)

Wenn Q_exp > Q_krit (aus Tabelle, abhängig von n und Konfidenzniveau):
→ Ausreißer darf verworfen werden!

### Nachweisgrenze (LOD) und Bestimmungsgrenze (LOQ)

**Nachweisgrenze (LOD):**
c_LOD = 3 · s_Blind / m
(s_Blind = Standardabweichung des Blindwerts, m = Steigung Kalibriergerade)

**Bestimmungsgrenze (LOQ):**
c_LOQ = 10 · s_Blind / m

**Linearer Messbereich:** LOQ bis obere Linearitätsgrenze

### Vertrauensbereich (Konfidenzintervall)

x̄ ± t · s/√n

t = Student-Faktor (abhängig von n und Konfidenzniveau)
`,
  quiz: [
    { id: "q1", question: "Was unterscheidet zufällige von systematischen Fehlern?", options: ["Zufällige Fehler sind größer", "Zufällige Fehler streuen statistisch und beeinflussen die Präzision; systematische Fehler haben immer gleiche Richtung und beeinflussen die Richtigkeit", "Systematische Fehler können durch Wiederholung erkannt werden", "Zufällige Fehler entstehen durch Gerätkalibrierfehler"], correct: 1, explanation: "Zufällige Fehler: statistisch verteilt, beeinflussen Präzision, durch Wiederholung reduzierbar. Systematische Fehler: konstante Abweichung, beeinflussen Richtigkeit, nur durch Blindwerte/Referenzmaterialien erkennbar." },
    { id: "q2", question: "Die Nachweisgrenze LOD berechnet sich als:", options: ["LOD = s_Blind / m", "LOD = 3 · s_Blind / m", "LOD = 10 · s_Blind / m", "LOD = s_Blind · m"], correct: 1, explanation: "LOD = 3 · s_Blind / m. Der Faktor 3 entspricht einem Signal, das 3σ über dem Rauschen liegt (99,7% Sicherheit). LOQ = 10 · s_Blind / m (quantitative Bestimmung möglich)." },
    { id: "q3", question: "Was prüft der Q-Test?", options: ["Ob zwei Messreihen gleiche Varianz haben", "Ob ein Datenpunkt ein statistischer Ausreißer ist und verworfen werden darf", "Ob die Normalverteilung vorliegt", "Ob der Mittelwert signifikant vom Referenzwert abweicht"], correct: 1, explanation: "Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min). Falls Q_exp > Q_krit (Tabellenwert): Ausreißer kann verworfen werden. Q_krit hängt von n und gewähltem Konfidenzniveau ab." },
    { id: "q4", question: "Welcher Prozentsatz aller Messwerte liegt bei einer Normalverteilung im Bereich μ ± 2σ?", options: ["68,3%", "90,0%", "95,4%", "99,7%"], correct: 2, explanation: "μ ± 1σ: 68,3%. μ ± 2σ: 95,4%. μ ± 3σ: 99,7%. Diese Werte sind prüfungsrelevant! Bei A = 0.05 (5% Fehlerrisiko) entspricht das ±2σ." },
    { id: "q5", question: "Ein Messergebnis ist präzise aber nicht richtig. Was bedeutet das?", options: ["Zufällige und systematische Fehler vorhanden", "Hohe Wiederholbarkeit (niedrige Streuung) aber systematischer Fehler – Ergebnisse liegen konsistent daneben", "Niedrige Wiederholbarkeit und zufällige Fehler", "Gar kein Fehler vorhanden"], correct: 1, explanation: "Präzise: niedrige Streuung (gute Präzision/Wiederholbarkeit). Nicht richtig: systematischer Fehler → Ergebnisse liegen konsistent neben dem wahren Wert. Korrektur: Blindwertkorrektur, zertifizierte Referenzmaterialien." },
    { id: "q6", question: "Wie berechnet sich die relative Standardabweichung (RSD)?", options: ["RSD = s²/x̄", "RSD = s/x̄ × 100%", "RSD = x̄/s × 100%", "RSD = √(s/x̄)"], correct: 1, explanation: "RSD = s/x̄ × 100%. Dimensionslos, in Prozent angegeben. Ermöglicht den Vergleich von Präzision bei verschiedenen Konzentrationen. Typische analytische RSD: <5% für gute Methoden." },
  ],
  flashcards: [
    { front: "Standardabweichung s", back: "s = √[Σ(xᵢ-x̄)²/(n-1)]. Maß für Streuung. Beachte: n-1 (nicht n) für Stichproben (Freiheitsgrad). RSD = s/x̄ × 100% (relativ, in %)." },
    { front: "Q-Test (Ausreißertest)", back: "Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min). Falls Q_exp > Q_krit → Ausreißer darf verworfen werden. Q_krit aus Tabelle (abhängig von n und α)." },
    { front: "LOD und LOQ", back: "LOD = 3·s_Blind/m (Nachweisgrenze, 3σ-Kriterium). LOQ = 10·s_Blind/m (Bestimmungsgrenze). m = Steigung Kalibriergerade. Signal muss > LOD für Nachweis, > LOQ für Quantifizierung." },
    { front: "Präzision vs. Richtigkeit", back: "Präzision: Wiederholbarkeit, zufällige Fehler, beeinflusst Streuung. Richtigkeit: Übereinstimmung mit wahrem Wert, systematische Fehler, beeinflusst Mittelwert. Beides zusammen = Genauigkeit (Accuracy)." },
    { front: "Normalverteilung – Kennzahlen", back: "μ ± 1σ: 68,3%. μ ± 2σ: 95,4%. μ ± 3σ: 99,7%. Gauß-Glocke. Voraussetzung für viele statistische Tests (t-Test, F-Test)." },
    { front: "Vertrauensbereich", back: "x̄ ± t·s/√n. t = Student-Faktor (Tabelle, abhängig von n und Konfidenzniveau). Mit mehr Messungen (größeres n): engerer Vertrauensbereich." },
  ],
};
