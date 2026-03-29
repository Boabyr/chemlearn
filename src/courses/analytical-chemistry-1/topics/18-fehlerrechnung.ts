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
`,
  quiz: [
    { id: "q1", question: "Welche statistischen Tests sind in der Analytischen Chemie besonders wichtig?", options: ["Nur der t-Test", "Q-Test (Ausreißer), t-Test (Mittelwertvergleich), F-Test (Varianzvergleich)", "Nur F-Test", "Chi-Quadrat-Test ist der einzige relevante"], correct: 1, explanation: "Q-Test: Ausreißer erkennen. t-Test: Mittelwert vs. Sollwert oder zwei Mittelwerte vergleichen. F-Test: Vergleich von Standardabweichungen zweier Methoden/Messreihen. Alle drei prüfungsrelevant!" },
    { id: "q2", question: "Was ist eine Wiederfindungsrate und welcher Wert ist ideal?", options: ["Anteil des gefundenen am eingesetzten Analyten, ideal: 95-105%", "Anteil der wiederholten Messungen, ideal: 100%", "Anteil der verworfenen Ausreißer, ideal: <5%", "Verhältnis Messwert zu Blindwert, ideal: >10"], correct: 0, explanation: "Recovery = (c_gemessen/c_zugesetzt) × 100%. Zugesetzter Standard: Known addition (Spike). Ideal: 95-105%. Abweichungen zeigen systematische Fehler (Matrix, Verluste bei Aufschluss) an." },
    { id: "q3", question: "Wie viele signifikante Stellen hat 0,00450?", options: ["5", "3", "6", "2"], correct: 1, explanation: "0,00450: führende Nullen (0,00) nicht signifikant. 4, 5, 0 → 3 signifikante Stellen. Die abschließende 0 nach dem Dezimalpunkt ist signifikant (zeigt Präzision der Messung an)." },
    { id: "q4", question: "Wozu dient ein Blindversuch in der Analytik?", options: ["Um die Empfindlichkeit zu erhöhen", "Um den Untergrund (Reagenzien ohne Probe) zu bestimmen und systematische Fehler durch Verunreinigungen zu erkennen", "Um den Ausreißer zu finden", "Um die Kalibrierung zu überprüfen"], correct: 1, explanation: "Blindversuch: alle Reagenzien und Schritte wie Probe, aber ohne Analyt. Blindwert = Signal durch Reagenzien/Verunreinigungen. Probe - Blindwert = Nettosignal. Erkennt systematische Fehler durch Kontamination." },
    { id: "q5", question: "Wie beeinflusst die Messfrequenz die chromatographische Auflösung?", options: ["Kein Einfluss", "Zu niedrige Messfrequenz → Peak wird nicht korrekt abgetastet → falsche Peakform und Integration (Nyquist-Theorem)", "Höhere Messfrequenz verschlechtert immer die Auflösung", "Nur wichtig bei NMR"], correct: 1, explanation: "Nyquist: Abtastfrequenz ≥ 2× Signalfrequenz. Bei chromatographischen Peaks: mind. 10-20 Datenpunkte pro Peak für genaue Integration. Zu niedrige Frequenz: schlechte Peakform, falsche Fläche → falsches Ergebnis." },
    { id: "q6", question: "Warum wird in der Statistik manchmal eine Transformation zur Normalverteilung durchgeführt?", options: ["Um die Datenmenge zu reduzieren", "Viele statistische Tests (t-Test, F-Test) setzen Normalverteilung voraus – log-Transformation kann schiefe Verteilungen normalisieren", "Um Ausreißer zu entfernen", "Aus historischen Gründen"], correct: 1, explanation: "Viele parametrische Tests setzen Normalverteilung voraus. Biologische/Umweltdaten oft log-normal-verteilt → log-Transformation → Normalverteilung → t-Test, F-Test anwendbar. Alternative: nicht-parametrische Tests (Mann-Whitney etc.)." },
  ],
  flashcards: [
    { front: "Signifikante Stellen – Regeln", back: "Ziffern 1-9: immer signifikant. Nullen zwischen Ziffern: signifikant. Führende Nullen (0,005): NICHT sig. Abschl. Nullen nach Dezimalpunkt (1,500): signifikant. Multiplikation: min. sig. Stellen aller Faktoren." },
    { front: "Fehlerfortpflanzung", back: "Δf = √[Σ(∂f/∂xᵢ)²·(Δxᵢ)²]. Addition: Δf=√(Δx²+Δy²). Multiplikation: Δf/f=√((Δx/x)²+(Δy/y)²). Relative Fehler addieren sich quadratisch!" },
    { front: "Qualitätssicherung – Maßnahmen", back: "1. Blindversuche. 2. Mehrfachmessungen. 3. Referenzmaterialien (CRM). 4. Wiederfindungsrate (Recovery, ideal 95-105%). 5. Parallelanalysen. 6. Ringversuche (extern)." },
    { front: "F-Test vs. t-Test", back: "F-Test: Vergleich zweier Varianzen (s₁²/s₂²). Gleiche Präzision? t-Test: Vergleich zweier Mittelwerte. Gleiche Richtigkeit? Beide setzen Normalverteilung voraus. Beide haben Tabellenwerte für verschiedene n und α." },
  ],
};
