import type { Thema } from '../../../content/schema'

export const topic = {
  id: "18-fehlerrechnung",
  title: "Fehlerrechnung & Analytische Kenngrößen",
  subtitle: "Fehlerfortpflanzung, Signifikante Stellen, Qualitätssicherung",
  icon: "🔢",
  estimatedMinutes: 55,
  theory: `


## Signifikante Stellen

**Regeln:**
- Alle Ziffern 1-9 sind signifikant
- Nullen zwischen signifikanten Ziffern: signifikant (1,005 → 4 sig.)
- Führende Nullen: NICHT signifikant (0,005 → 1 sig.)
- Nachfolgende Nullen nach Dezimalpunkt: signifikant (1,500 → 4 sig.)

**Bei Rechnungen:**
- Multiplikation/Division: so viele sig. Stellen wie der Faktor mit den wenigsten
- Addition/Subtraktion: so viele Dezimalstellen wie die Zahl mit den wenigsten

## Fehlerfortpflanzung (Gauß'sches Fehlerfortpflanzungsgesetz)

Für f(x₁, x₂, ...):
Δf = √[(∂f/∂x₁)²·(Δx₁)² + (∂f/∂x₂)²·(Δx₂)² + ...]

**Spezialfälle:**
- f = x + y: Δf = √(Δx² + Δy²)
- f = x · y: Δf/f = √((Δx/x)² + (Δy/y)²)
- f = x/y: Δf/f = √((Δx/x)² + (Δy/y)²)

## Qualitätssicherung in der Analytik

**Maßnahmen gegen Fehler:**
1. Blindversuche (Blindwert): Reagenzien ohne Probe → systematischen Fehler erkennen
2. Mehrfachmessungen (n ≥ 3): zufällige Fehler reduzieren
3. Referenzmaterialien (CRM): zertifizierte Werte → Richtigkeit prüfen
4. Wiederfindungsrate: bekannte Menge Standard zur Probe → Recovery
5. Parallelanalyse: zwei Analytiker/zwei Methoden
6. Ringversuche: externe Qualitätskontrolle

**Wiederfindungsrate (Recovery):**
R = (c_gemessen / c_zugesetzt) × 100%
Ideal: 95-105%

## Analytische Kennzahlen

**Empfindlichkeit:** Steigung der Kalibriergerade m = ΔSignal/Δc

**Selektivität:** Fähigkeit, den Analyten in Anwesenheit von Störsubstanzen zu bestimmen

**Robustheit:** Unempfindlichkeit der Methode gegenüber kleinen Variationen der Parameter

**Linearitätsbereich:** Bereich in dem A = ε·c·d gilt (Lambert-Beer) oder Signal ∝ c

**Messfrequenz und Auflösung:**
Nyquist-Theorem: Abtastfrequenz ≥ 2 × Signalfrequenz für vollständige Rekonstruktion.
In Chromatographie: zu niedrige Messfrequenz → Peak wird nicht richtig erfasst → falsche Integration.

## Statistische Tests (Überblick)

**t-Test:** Vergleich von Mittelwerten (Probe vs. Referenzwert)
**F-Test:** Vergleich von Varianzen/Standardabweichungen zweier Messreihen
**Q-Test:** Ausreißer-Erkennung
**χ²-Test:** Anpassung an Verteilung

**Transformation zur Normalverteilung:** Viele stat. Tests setzen Normalverteilung voraus. Bei schiefer Verteilung: log-Transformation kann Normalverteilung erzeugen → Tests anwendbar.

## Fehlerfortpflanzung in der Praxis

Die Regeln lassen sich auf zwei Sätze eindampfen:

- **Summe und Differenz:** die **absoluten** Fehler addieren sich quadratisch
- **Produkt und Quotient:** die **relativen** Fehler addieren sich quadratisch

Das Quadrieren hat eine praktische Folge, die man ausnutzen sollte: Der größte Einzelfehler
dominiert. Bei 5 % und 0,5 % Unsicherheit ergibt sich √(0,05² + 0,005²) = 0,0502 — der
kleinere Beitrag verschwindet fast vollständig. Wer die Genauigkeit verbessern will, muss
also an der schlechtesten Größe ansetzen; alles andere ist verschenkte Mühe.

**Besonders heikel: die Differenz zweier ähnlicher Zahlen.** Bei 100,0 ± 0,1 minus
99,0 ± 0,1 ist das Ergebnis 1,0 ± 0,14 — aus 0,1 % relativem Fehler in den Ausgangswerten
sind 14 % im Ergebnis geworden. Deshalb ist die Differenzwägung in der Gravimetrie so
empfindlich, und deshalb misst man Blindwerte, statt sie herauszurechnen.

## Signifikante Stellen als Aussage über die Messung

Die Zahl der angegebenen Stellen ist eine Behauptung über die Genauigkeit. „12,3 mg" heißt:
die Unsicherheit liegt in der letzten angegebenen Stelle. „12,300 mg" behauptet tausendmal
mehr — und ist falsch, wenn die Waage das nicht hergibt.

Gerechnet wird mit allen Stellen, **gerundet wird erst am Ende**. Wer zwischendurch rundet,
schleppt einen Rundungsfehler durch die ganze Rechnung.

## Was Qualitätssicherung tatsächlich abfängt

| Maßnahme | Findet | Findet nicht |
|---|---|---|
| Mehrfachmessung | zufällige Fehler | systematische Fehler |
| Blindwert | Verunreinigung aus Reagenzien und Geräten | Verluste des Analyten |
| Referenzmaterial | systematische Fehler der Methode | Fehler bei der Probenahme |
| Wiederfindung | Verluste bei der Aufarbeitung | Fehler der Kalibrierung |

Kein einzelnes Verfahren deckt alles ab — der Grund, warum in der Routineanalytik mehrere
davon nebeneinander laufen.


`,
  interactive: {
    type: "formula-calculator",
    formula: {
      id: "fehlerfortpflanzung-produkt",
      name: "Fehlerfortpflanzung bei Produkt und Quotient",
      equation: "Δf/f = √[(Δx/x)² + (Δy/y)²]",
      variables: [
        { id: "relf", label: "Relativer Fehler des Ergebnisses", symbol: "Δf/f", unit: "—", description: "Als Anteil, nicht in Prozent" },
        { id: "dx", label: "Absoluter Fehler von x", symbol: "Δx", unit: "wie x", description: "Unsicherheit der ersten Größe" },
        { id: "x", label: "Messwert x", symbol: "x", unit: "—", description: "Erste Größe" },
        { id: "dy", label: "Absoluter Fehler von y", symbol: "Δy", unit: "wie y", description: "Unsicherheit der zweiten Größe" },
        { id: "y", label: "Messwert y", symbol: "y", unit: "—", description: "Zweite Größe" },
      ],
      umstellungen: [
        { solveFor: "relf", expr: "sqrt((dx / x) ^ 2 + (dy / y) ^ 2)" },
      ],
      hints: ["Bei Produkt und Quotient addieren sich die relativen Fehler quadratisch, bei Summe und Differenz die absoluten. Nicht verwechseln.", "Weil quadriert wird, dominiert der größte Einzelfehler. Eine Größe mit 5 % Unsicherheit macht eine andere mit 0,5 % praktisch bedeutungslos — dort lohnt das Verbessern."],
    },
  },
  quiz: [
    { id: "q1", question: "Welche statistischen Tests sind in der Analytischen Chemie besonders wichtig?", options: ["Ausschließlich der t-Test", "Q-Test, t-Test und F-Test", "Ausschließlich der F-Test", "Ausschließlich der Chi-Quadrat-Test"], correct: 1, explanation: "Der Q-Test prüft einen einzelnen verdächtigen Wert auf Ausreißer, der t-Test vergleicht Mittelwerte, der F-Test vergleicht Streuungen. Die Reihenfolge ist wichtig: erst Ausreißer prüfen, dann mit dem F-Test die Varianzen vergleichen, und erst dann den passenden t-Test wählen." },
    { id: "q2", question: "Was ist eine Wiederfindungsrate und welcher Wert ist ideal?", options: ["Anteil des gefundenen am eingesetzten Analyten, ideal: 95-105%", "Anteil der wiederholten Messungen im Vertrauensbereich, ideal: 100%", "Anteil der verworfenen Ausreißer, ideal: <5%", "Verhältnis Messwert zu Blindwert, ideal: >10"], correct: 0, explanation: "Recovery = (c_gemessen/c_zugesetzt) × 100%. Zugesetzter Standard: Known addition (Spike). Ideal: 95-105%. Abweichungen zeigen systematische Fehler (Matrix, Verluste bei Aufschluss) an." },
    { id: "q3", question: "Wie viele signifikante Stellen hat 0,00450?", options: ["5", "3", "6", "2"], correct: 1, explanation: "0,00450: führende Nullen (0,00) nicht signifikant. 4, 5, 0 → 3 signifikante Stellen. Die abschließende 0 nach dem Dezimalpunkt ist signifikant (zeigt Präzision der Messung an)." },
    { id: "q4", question: "Wozu dient ein Blindversuch in der Analytik?", options: ["Um die Empfindlichkeit zu steigern", "Um den Untergrund aus Reagenzien zu erfassen", "Um einen Ausreißer im Datensatz zu finden", "Um die Kalibriergerade zu überprüfen"], correct: 1, explanation: "Der Blindversuch durchläuft die ganze Prozedur mit allen Reagenzien, nur ohne Probe. Was dabei gemessen wird, stammt aus Verunreinigungen von Chemikalien und Geräten und wird von jedem Messwert abgezogen. Verluste des Analyten findet er nicht — dafür ist die Wiederfindung da." },
    { id: "q5", question: "Wie beeinflusst die Messfrequenz die chromatographische Auflösung?", options: ["Die Messfrequenz spielt keine Rolle", "Zu selten abgetastet verzerrt Peakform und Fläche", "Höhere Messfrequenz verschlechtert die Auflösung", "Das gilt nur für die NMR-Spektroskopie"], correct: 1, explanation: "Nach Nyquist muss die Abtastrate mindestens doppelt so hoch sein wie die höchste Signalfrequenz. Praktisch braucht ein chromatographischer Peak mindestens zehn bis zwanzig Messpunkte. Zu wenige verzerren Form und Fläche — die Integration liefert dann systematisch falsche Gehalte, besonders bei schmalen UHPLC-Peaks." },
    { id: "q6", question: "Warum wird in der Statistik manchmal eine Transformation zur Normalverteilung durchgeführt?", options: ["Um die Datenmenge für die Auswertung zu verringern", "Weil t- und F-Test Normalverteilung voraussetzen", "Um Ausreißer automatisch zu entfernen", "Aus rein historischen Gründen"], correct: 1, explanation: "t-Test und F-Test setzen näherungsweise normalverteilte Daten voraus. Viele analytische Größen — Konzentrationen im Spurenbereich etwa — sind rechtsschief verteilt. Eine Logarithmierung macht daraus oft eine annähernde Normalverteilung, und die Tests werden anwendbar." },
  ],
  flashcards: [
    { id: "19fahm6", front: "Signifikante Stellen – Regeln", back: "Ziffern 1-9: immer signifikant. Nullen zwischen Ziffern: signifikant. Führende Nullen (0,005): NICHT sig. Abschl. Nullen nach Dezimalpunkt (1,500): signifikant. Multiplikation: min. sig. Stellen aller Faktoren." },
    { id: "0de3zex", front: "Fehlerfortpflanzung", back: "Δf = √[Σ(∂f/∂xᵢ)²·(Δxᵢ)²]. Addition: Δf=√(Δx²+Δy²). Multiplikation: Δf/f=√((Δx/x)²+(Δy/y)²). Relative Fehler addieren sich quadratisch!" },
    { id: "16rrnhr", front: "Qualitätssicherung – Maßnahmen", back: "1. Blindversuche. 2. Mehrfachmessungen. 3. Referenzmaterialien (CRM). 4. Wiederfindungsrate (Recovery, ideal 95-105%). 5. Parallelanalysen. 6. Ringversuche (extern)." },
    { id: "0rn311e", front: "F-Test vs. t-Test", back: "F-Test: Vergleich zweier Varianzen (s₁²/s₂²). Gleiche Präzision? t-Test: Vergleich zweier Mittelwerte. Gleiche Richtigkeit? Beide setzen Normalverteilung voraus. Beide haben Tabellenwerte für verschiedene n und α." },
    { id: "0y3v1cv", front: "Wiederfindungsrate", back: "R = (gemessene Konzentration / zugesetzte Konzentration) · 100 %. Man gibt einer Probe eine bekannte Menge Analyt zu und prüft, wie viel davon die Methode wiederfindet. Als gut gilt der Bereich 95 bis 105 %; niedrigere Werte deuten auf Verluste bei der Probenvorbereitung hin." },
    { id: "0a864p9", front: "t-Test, F-Test und Q-Test auseinanderhalten", back: "Der t-Test vergleicht Mittelwerte (Probe gegen Referenzwert oder zwei Messreihen). Der F-Test vergleicht Varianzen, also die Streuung zweier Messreihen. Der Q-Test prüft einen einzelnen verdächtigen Wert auf Ausreißer. Alle drei setzen näherungsweise Normalverteilung voraus." },
  ],
} satisfies Thema;
