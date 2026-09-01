import type { Thema } from '../../../content/schema'

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

Der Faktor t hängt von der Zahl der Freiheitsgrade (n−1) und dem gewählten Niveau ab und
wird aus einer Tabelle abgelesen. Er ist bei kleinem n deutlich größer als der Wert der
Normalverteilung: für n = 3 und 95 % steht dort 4,30 statt 1,96. Genau das ist der Grund,
warum drei Messungen einen so breiten Vertrauensbereich liefern — man bezahlt die
Unkenntnis der wahren Streuung mit einem größeren Faktor.

## Der Vertrauensbereich schrumpft nur mit der Wurzel

Im Nenner steht √n. Vier Messungen halbieren die Breite gegenüber einer, sechzehn
vierteln sie. Der Aufwand wächst quadratisch mit der gewünschten Genauigkeit — deshalb
lohnt sich ab einem gewissen Punkt nicht mehr, öfter zu messen, sondern die Methode
selbst zu verbessern (kleineres s).

## Welcher Test wofür

- **t-Test:** Vergleicht Mittelwerte. Einstichproben: stimmt mein Mittelwert mit dem
  zertifizierten Wert überein? Zweistichproben: liefern zwei Methoden dasselbe?
- **F-Test:** Vergleicht Streuungen. Er kommt **vor** dem Zweistichproben-t-Test, weil
  dieser gleiche Varianzen voraussetzt.
- **Q-Test:** Prüft einen einzelnen verdächtigen Wert. Verworfen werden darf nur, wenn
  Q_exp den Tabellenwert überschreitet — und nur ein Wert je Datensatz.

Wichtig bei allen dreien: Ein nicht signifikantes Ergebnis beweist keine Gleichheit. Es
heißt nur, dass die Daten nicht ausreichen, um einen Unterschied zu zeigen.

## Nachweis- und Bestimmungsgrenze auseinanderhalten

Die Nachweisgrenze beantwortet „ist etwas da?", die Bestimmungsgrenze „wie viel ist da?".
Zwischen beiden liegt der Faktor 3 zu 10 in derselben Formel. Ein Messwert zwischen LOD
und LOQ darf als Nachweis berichtet werden, aber nicht als Zahlenwert.


`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "nachweisgrenze",
      name: "Nachweisgrenze aus der Kalibriergerade",
      equation: "LOD = 3 · s_Blind / m",
      variables: [
        { id: "LOD", label: "Nachweisgrenze", symbol: "LOD", unit: "mg/L", description: "Kleinste sicher nachweisbare Konzentration" },
        { id: "sBlind", label: "Streuung des Blindwerts", symbol: "s_Blind", unit: "Signaleinheit", description: "Standardabweichung des Blindwertsignals" },
        { id: "m", label: "Steigung", symbol: "m", unit: "Signal je mg/L", description: "Steigung der Kalibriergerade" },
      ],
      umstellungen: [
        { solveFor: "LOD", expr: "3 * sBlind / m" },
        { solveFor: "sBlind", expr: "LOD * m / 3" },
        { solveFor: "m", expr: "3 * sBlind / LOD" },
      ],
      hints: ["Die Bestimmungsgrenze LOQ benutzt denselben Bruch mit dem Faktor 10 statt 3. LOQ liegt also immer gut dreimal höher als LOD.", "Eine steilere Kalibriergerade (großes m) drückt die Nachweisgrenze — deshalb misst man bei λmax, wo ε und damit m am größten sind."],
    },
  },
  quiz: [
    { id: "q1", question: "Was unterscheidet zufällige von systematischen Fehlern?", options: ["Zufällige Fehler sind grundsätzlich größer als systematische", "Zufällige streuen, systematische zeigen in eine Richtung", "Systematische Fehler zeigt die Wiederholung an", "Zufällige Fehler stammen aus der Kalibrierung"], correct: 1, explanation: "Zufällige Fehler streuen um den Mittelwert und lassen sich durch Mehrfachmessung verkleinern; sie bestimmen die Präzision. Systematische Fehler verschieben alle Werte in dieselbe Richtung, bleiben bei Wiederholung unentdeckt und bestimmen die Richtigkeit. Erkennen lassen sie sich nur über Blindwerte und zertifizierte Referenzmaterialien." },
    { id: "q2", question: "Die Nachweisgrenze LOD berechnet sich als:", options: ["LOD = s_Blind / m", "LOD = 3 · s_Blind / m", "LOD = 10 · s_Blind / m", "LOD = s_Blind · m"], correct: 1, explanation: "LOD = 3 · s_Blind / m. Der Faktor 3 entspricht einem Signal, das 3σ über dem Rauschen liegt (99,7% Sicherheit). LOQ = 10 · s_Blind / m (quantitative Bestimmung möglich)." },
    { id: "q3", question: "Was prüft der Q-Test?", options: ["Ob zwei Messreihen dieselbe Varianz aufweisen", "Ob ein Datenpunkt ein Ausreißer ist und verworfen werden darf", "Ob die Messwerte normalverteilt vorliegen", "Ob der Mittelwert signifikant vom Referenzwert abweicht und wie stark"], correct: 1, explanation: "Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min). Falls Q_exp > Q_krit (Tabellenwert): Ausreißer kann verworfen werden. Q_krit hängt von n und gewähltem Konfidenzniveau ab." },
    { id: "q4", question: "Welcher Prozentsatz aller Messwerte liegt bei einer Normalverteilung im Bereich μ ± 2σ?", options: ["68,3%", "90,0%", "95,4%", "99,7%"], correct: 2, explanation: "μ ± 1σ: 68,3%. μ ± 2σ: 95,4%. μ ± 3σ: 99,7%. Diese Werte sind prüfungsrelevant! Bei A = 0.05 (5% Fehlerrisiko) entspricht das ±2σ." },
    { id: "q5", question: "Ein Messergebnis ist präzise aber nicht richtig. Was bedeutet das?", options: ["Es liegen zufällige und systematische Fehler zugleich vor", "Die Werte streuen wenig, liegen aber daneben", "Die Werte streuen stark um den wahren Wert", "Es liegt überhaupt kein Fehler vor"], correct: 1, explanation: "Präzise heißt: die Wiederholmessungen liegen eng beieinander. Richtig heißt: der Mittelwert trifft den wahren Wert. Beides ist unabhängig — eine falsch kalibrierte Waage liefert hochpräzise falsche Werte. Genau deshalb reicht Mehrfachmessung allein als Qualitätsnachweis nicht aus." },
    { id: "q6", question: "Wie berechnet sich die relative Standardabweichung (RSD)?", options: ["RSD = s²/x̄", "RSD = s/x̄ × 100%", "RSD = x̄/s × 100%", "RSD = √(s/x̄)"], correct: 1, explanation: "RSD = s/x̄ × 100%. Dimensionslos, in Prozent angegeben. Ermöglicht den Vergleich von Präzision bei verschiedenen Konzentrationen. Typische analytische RSD: <5% für gute Methoden." },
  ],
  flashcards: [
    { id: "10cf2d6", front: "Standardabweichung s", back: "s = √[Σ(xᵢ-x̄)²/(n-1)]. Maß für Streuung. Beachte: n-1 (nicht n) für Stichproben (Freiheitsgrad). RSD = s/x̄ × 100% (relativ, in %)." },
    { id: "1bv0eb7", front: "Q-Test (Ausreißertest)", back: "Q_exp = |x_Ausreißer - x_Nachbar| / (x_max - x_min). Falls Q_exp > Q_krit → Ausreißer darf verworfen werden. Q_krit aus Tabelle (abhängig von n und α)." },
    { id: "01mo26p", front: "LOD und LOQ", back: "LOD = 3·s_Blind/m (Nachweisgrenze, 3σ-Kriterium). LOQ = 10·s_Blind/m (Bestimmungsgrenze). m = Steigung Kalibriergerade. Signal muss > LOD für Nachweis, > LOQ für Quantifizierung." },
    { id: "10ms8qx", front: "Präzision vs. Richtigkeit", back: "Präzision: Wiederholbarkeit, zufällige Fehler, beeinflusst Streuung. Richtigkeit: Übereinstimmung mit wahrem Wert, systematische Fehler, beeinflusst Mittelwert. Beides zusammen = Genauigkeit (Accuracy)." },
    { id: "1d7zg4o", front: "Normalverteilung – Kennzahlen", back: "μ ± 1σ: 68,3%. μ ± 2σ: 95,4%. μ ± 3σ: 99,7%. Gauß-Glocke. Voraussetzung für viele statistische Tests (t-Test, F-Test)." },
    { id: "0jzrm0y", front: "Vertrauensbereich", back: "x̄ ± t·s/√n. t = Student-Faktor (Tabelle, abhängig von n und Konfidenzniveau). Mit mehr Messungen (größeres n): engerer Vertrauensbereich." },
  ],
} satisfies Thema;
