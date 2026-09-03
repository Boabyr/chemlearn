# Neue Zahlenfragen AC1 — Aufgabe, Rechenweg, Lösung

Gegengelesen werden sollten die 20 Varianten unten. Jede wurde mit einem
eigenen node-Skript nachgerechnet, unabhängig vom Text der Erklärung. Der Wächter in
`src/content/pruefungsfragen.test.ts` prüft zusätzlich, dass der gespeicherte Antwortwert
in der Erklärung auch wirklich vorkommt.

| ID | Thema | Antwort | Toleranz |
|---|---|---|---|
| G013 | 11-saeurebase-ph | 13.88 pH | ±0.05 |
| G014 | 11-saeurebase-ph | 2.53 pH | ±0.05 |
| G015 | 11-saeurebase-ph | 4.28 pH | ±0.05 |
| G016 | 14-trennverfahren-gc-hplc | 0.0188 % | ±0.002 |
| G017 | 13-chromatographie-grundlagen | 3.56 — | ±0.1 |
| G018 | 13-chromatographie-grundlagen | 3973 — | ±60 |
| G019 | 13-chromatographie-grundlagen | 1.6 — | ±0.05 |
| G020 | 12-faellungsreaktionen | 23 Tabletten | ±1 |
| K009 | 17-elektroden-faellungstitration | 0.338 V | ±0.01 |
| K010 | 17-elektroden-faellungstitration | 0.698 V | ±0.01 |
| K011 | 15-kalibrierung-standardaddition | 55.5 mL | ±0.6 |
| L013 | 02-lambert-beer | 30 % | ±0.5 |
| L014 | 02-lambert-beer | 0.523 — | ±0.01 |
| L015 | 02-lambert-beer | 17430 L/(mol·cm) | ±250 |
| L016 | 02-lambert-beer | 18405 L/(mol·cm) | ±200 |
| L017 | 03-fluoreszenz-lumineszenz | 62.8 mg/L | ±1.5 |
| L018 | 07-potentiometrie-nernst | 41.4 mV | ±1 |
| L019 | 08-voltammetrie-coulometrie | 25.6 min | ±0.3 |
| U010 | 06-elektrochemische-grundlagen | 0.671 V | ±0.005 |
| U011 | 16-atomspektrometrie | 5.2 mg/L | ±0.1 |

---

## G013 — 11-saeurebase-ph (2 Punkte)

**Aufgabe:** 5,8 g NaCl und 7,5 g NaOH werden in 250 mL Wasser gelöst. Welchen pH hat die Lösung? (M(NaOH) = 40 g/mol)

**Lösung:** 13.88 pH (Toleranz ±0.05)

**Rechenweg:** NaCl ist das Salz einer starken Säure mit einer starken Base und trägt nichts zum pH bei. NaOH: n = 7,5/40 = 0,1875 mol in 0,250 L, also c(OH⁻) = 0,75 mol/L. pOH = −log(0,75) = 0,125, damit pH = 14 − 0,125 = 13,88. Die Kochsalzmenge ist Beiwerk — wer sie mitrechnet, sucht einen Beitrag, den es nicht gibt.

## G014 — 11-saeurebase-ph (3 Punkte)

**Aufgabe:** 250 mL 0,2 M Ameisensäure (pKs = 3,75) werden auf 1 L aufgefüllt. Welchen pH hat die Lösung?

**Lösung:** 2.53 pH (Toleranz ±0.05)

**Rechenweg:** Verdünnung zuerst: c = 0,2 mol/L · 0,250 L / 1,0 L = 0,05 mol/L. Ka = 10⁻³·⁷⁵ = 1,778·10⁻⁴. Für eine schwache Säure gilt [H⁺] = √(Ka · c) = √(1,778·10⁻⁴ · 0,05) = √(8,89·10⁻⁶) = 2,98·10⁻³ mol/L. pH = −log(2,98·10⁻³) = 2,53. Wer die Verdünnung vergisst, rechnet mit 0,2 mol/L und kommt auf 2,23.

## G015 — 11-saeurebase-ph (3 Punkte)

**Aufgabe:** 200 mL 0,1 M Essigsäure (pKs = 4,76) werden mit 50 mL 0,1 M NaOH versetzt und auf 1 L aufgefüllt. Welchen pH hat die Pufferlösung?

**Lösung:** 4.28 pH (Toleranz ±0.05)

**Rechenweg:** n(HAc) = 0,020 mol, n(NaOH) = 0,005 mol. Die Lauge verbraucht 0,005 mol Essigsäure zu Acetat: es bleiben 0,015 mol HAc neben 0,005 mol Ac⁻. Henderson-Hasselbalch: pH = pKs + log([A⁻]/[HA]) = 4,76 + log(0,005/0,015) = 4,76 − 0,48 = 4,28. Das Auffüllen auf 1 L ändert nichts, weil im Logarithmus nur das Verhältnis steht. Anders als am Halbäquivalenzpunkt liegt der pH hier unter dem pKs, weil die Säure im Überschuss ist.

## G016 — 14-trennverfahren-gc-hplc (4 Punkte)

**Aufgabe:** Extraktion von Jod, Verteilungskoeffizient K = 120. 25 mL wässrige Lösung werden zweimal mit je 15 mL organischem Lösungsmittel ausgeschüttelt. Wie viel Prozent des Jods verbleiben in der wässrigen Phase?

**Lösung:** 0.0188 % (Toleranz ±0.002)

**Rechenweg:** Nach n gleichen Extraktionsschritten bleibt m_n = m₀ · (V_aq/(V_aq + K·V_org))ⁿ. Hier: (25/(25 + 120·15))² = (25/1825)² = (0,013699)² = 1,877·10⁻⁴, also 0,0188 % der Ausgangsmenge. Zweimal mit 15 mL trennt deutlich besser als einmal mit 30 mL — das ist der ganze Grund für die mehrfache Extraktion.

## G017 — 13-chromatographie-grundlagen (6 Punkte)

**Aufgabe:** LC-Trennung, tM = 4,0 min. Substanz A: tR = 7,8 min, wB = 0,80 min. Substanz B: tR = 10,4 min, wB = 0,66 min. Berechnen Sie die Auflösung Rs.

**Lösung:** 3.56  (Toleranz ±0.1)

**Rechenweg:** Rs = 2·(tR2 − tR1)/(w1 + w2) = 2·(10,4 − 7,8)/(0,80 + 0,66) = 5,2/1,46 = 3,56. Ab Rs = 1,5 gelten zwei Peaks als basisliniengetrennt, hier ist die Trennung also reichlich. Die Totzeit tM geht in die Auflösung nicht ein — sie wird für k' gebraucht, nicht für Rs.

## G018 — 13-chromatographie-grundlagen (6 Punkte)

**Aufgabe:** LC-Trennung, tM = 4,0 min. Substanz B: tR = 10,4 min, wB = 0,66 min. Berechnen Sie die Trennstufenzahl N für Substanz B.

**Lösung:** 3973  (Toleranz ±60)

**Rechenweg:** N = 16·(tR/wB)² = 16·(10,4/0,66)² = 16·(15,758)² = 16·248,3 = 3973. Die Basisbreite wB wird durch die Wendetangenten bestimmt; mit der Halbwertsbreite lautet die Formel N = 5,54·(tR/w½)² — die beiden Formeln dürfen nicht gemischt werden.

## G019 — 13-chromatographie-grundlagen (6 Punkte)

**Aufgabe:** LC-Trennung, tM = 4,0 min. Substanz B eluiert bei tR = 10,4 min. Berechnen Sie den Kapazitätsfaktor (Retentionsfaktor) k' für Substanz B.

**Lösung:** 1.6  (Toleranz ±0.05)

**Rechenweg:** k' = (tR − tM)/tM = (10,4 − 4,0)/4,0 = 6,4/4,0 = 1,60. Der Wert sagt: die Substanz hält sich 1,6-mal so lange in der stationären wie in der mobilen Phase. Gut trennbare Peaks liegen im Bereich k' = 1 bis 10.

## G020 — 12-faellungsreaktionen (3 Punkte)

**Aufgabe:** Eisen wird gravimetrisch als Fe₂O₃ bestimmt. Wie viele Tabletten mit je 25 mg Eisen werden gebraucht, um 0,80 g Fe₂O₃ zu erhalten? (M(Fe) = 55,85 g/mol, M(Fe₂O₃) = 159,7 g/mol)

**Lösung:** 23 Tabletten (Toleranz ±1)

**Rechenweg:** n(Fe₂O₃) = 0,80 g / 159,7 g/mol = 5,01·10⁻³ mol. Jede Formeleinheit enthält zwei Eisenatome: n(Fe) = 1,002·10⁻² mol, also m(Fe) = 0,560 g = 560 mg. Bei 25 mg je Tablette sind das 22,4 — aufgerundet 23 Tabletten, denn eine halbe Tablette liefert die fehlende Menge nicht sicher. Wer den Faktor 2 vergisst, landet bei 12.

## K009 — 17-elektroden-faellungstitration (5 Punkte)

**Aufgabe:** Fällungstitration: 100 mL 0,1 M NaCl werden mit 0,1 M AgNO₃ titriert, der Äquivalenzpunkt liegt bei 100 mL. E°(Ag⁺/Ag) = 0,799 V, Ksp(AgCl) = 1,8·10⁻¹⁰. Berechnen Sie das Potential gegen SHE nach Zugabe von 80,0 mL AgNO₃.

**Lösung:** 0.338 V (Toleranz ±0.01)

**Rechenweg:** Vor dem Äquivalenzpunkt bestimmt das übrige Chlorid die Silberkonzentration. Rest: (100 − 80) mL · 0,1 mol/L = 2,0 mmol in 180 mL Gesamtvolumen, also [Cl⁻] = 0,01111 mol/L. Über das Löslichkeitsprodukt: [Ag⁺] = 1,8·10⁻¹⁰/0,01111 = 1,62·10⁻⁸ mol/L. Nernst: E = 0,799 + 0,05916·log(1,62·10⁻⁸) = 0,799 − 0,461 = +0,338 V.

## K010 — 17-elektroden-faellungstitration (5 Punkte)

**Aufgabe:** Dieselbe Titration (100 mL 0,1 M NaCl mit 0,1 M AgNO₃, ÄP bei 100 mL, E°(Ag⁺/Ag) = 0,799 V). Berechnen Sie das Potential nach Zugabe von 150,0 mL AgNO₃.

**Lösung:** 0.698 V (Toleranz ±0.01)

**Rechenweg:** Nach dem Äquivalenzpunkt zählt nur noch der Silberüberschuss: (150 − 100) mL · 0,1 mol/L = 5,0 mmol in 250 mL, also [Ag⁺] = 0,020 mol/L. Nernst: E = 0,799 + 0,05916·log(0,020) = 0,799 − 0,101 = +0,698 V. Das Löslichkeitsprodukt wird hier nicht mehr gebraucht; es zählt nur, solange Chlorid im Überschuss ist.

## K011 — 15-kalibrierung-standardaddition (2 Punkte)

**Aufgabe:** Wie viele mL einer 96 gew%igen Schwefelsäure (ρ = 1,84 g/mL, M = 98 g/mol) werden gebraucht, um 0,500 L einer 2,00 M H₂SO₄ herzustellen?

**Lösung:** 55.5 mL (Toleranz ±0.6)

**Rechenweg:** Gesucht ist n = 2,00 mol/L · 0,500 L = 1,00 mol. Die Stammlösung enthält c = 0,96 · 1840 g/L / 98 g/mol = 18,0 mol/L. Daraus V = n/c = 1,00/18,0 = 0,0555 L = 55,5 mL. Der häufigste Fehler ist, den Massenanteil zu vergessen: ohne ihn käme man auf 53 mL.

## L013 — 02-lambert-beer (4 Punkte)

**Aufgabe:** Ein Photometer liefert für die Blindprobe 10,50 V, für die Probe (0,15 mmol/L, d = 0,2 cm) 3,15 V. Berechnen Sie die Transmission in %.

**Lösung:** 30 % (Toleranz ±0.5)

**Rechenweg:** T = I/I₀ = 3,15 V / 10,50 V = 0,300 = 30,0 %. Der Detektor ist linear in der Lichtintensität, die Spannung ist ihr also proportional — Konzentration und Schichtdicke werden für die Transmission nicht gebraucht.

## L014 — 02-lambert-beer (4 Punkte)

**Aufgabe:** Blindprobe 10,50 V, Probe (0,15 mmol/L, d = 0,2 cm) 3,15 V. Berechnen Sie die Absorption A.

**Lösung:** 0.523  (Toleranz ±0.01)

**Rechenweg:** A = −log(T) = −log(0,300) = 0,523. Gleichwertig: A = log(I₀/I) = log(10,50/3,15) = log(3,333) = 0,523. Eine Absorption von 0,3 entspricht einer Transmission von 50 %, eine von 1 genau 10 %.

## L015 — 02-lambert-beer (4 Punkte)

**Aufgabe:** Blindprobe 10,50 V, Probe (c = 0,15 mmol/L, d = 0,2 cm) 3,15 V. Berechnen Sie den molaren Extinktionskoeffizienten ε in L/(mol·cm).

**Lösung:** 17430 L/(mol·cm) (Toleranz ±250)

**Rechenweg:** Aus A = 0,523 folgt ε = A/(c·d). Die Konzentration muss in mol/L stehen: 0,15 mmol/L = 1,5·10⁻⁴ mol/L. ε = 0,523/(1,5·10⁻⁴ · 0,2) = 0,523/3,0·10⁻⁵ = 17430 L/(mol·cm). Wer mmol/L einsetzt, verfehlt das Ergebnis um den Faktor 1000.

## L016 — 02-lambert-beer (2 Punkte)

**Aufgabe:** Ein Farbstoff (M = 792,85 g/mol) liegt mit 35 mg/L vor und zeigt bei d = 1 cm die Absorption A = 0,8125. Berechnen Sie ε in L/(mol·cm).

**Lösung:** 18405 L/(mol·cm) (Toleranz ±200)

**Rechenweg:** Erst die Massenkonzentration in eine Stoffmengenkonzentration umrechnen: c = 0,035 g/L / 792,85 g/mol = 4,414·10⁻⁵ mol/L. Dann ε = A/(c·d) = 0,8125/(4,414·10⁻⁵ · 1) = 18405 L/(mol·cm). Die Umrechnung über die Molmasse ist der eigentliche Rechenschritt — Lambert-Beer selbst ist eine Zeile.

## L017 — 03-fluoreszenz-lumineszenz (3 Punkte)

**Aufgabe:** Standardaddition mit Fluoreszenz: 20 mL Fruchtsaft werden auf 100 mL verdünnt und ergeben 480 mV. Nach Zugabe von 10 mL Standard (50 mg/L), Gesamtvolumen 110 mL, werden 610 mV gemessen. Wie viel mg/L enthält der unverdünnte Saft?

**Lösung:** 62.8 mg/L (Toleranz ±1.5)

**Rechenweg:** Zwei Verdünnungen nacheinander. In der ersten Messlösung ist c₁ = c_Saft · 20/100. Die Zugabe verdünnt sie ein zweites Mal: c₂ = (c₁·100 + 50·10)/110. Weil das Signal der Konzentration proportional ist, gilt 610/480 = c₂/c₁. Einsetzen: 610·110·c₁ = 480·(100·c₁ + 500), also 19100·c₁ = 240000 und c₁ = 12,6 mg/L. Rückgerechnet auf den Saft: c = 12,6 / 0,20 = 62,8 mg/L. Wer die Verdünnung durch die Zugabe übersieht, kommt auf einen deutlich zu kleinen Gehalt.

## L018 — 07-potentiometrie-nernst (2 Punkte)

**Aufgabe:** 20 mL HCl (c = 0,05 mol/L) werden mit 20 mL NaOH (c = 0,03 mol/L) versetzt. Um wie viele mV ändert sich die Anzeige der Glaselektrode bei 25 °C? (Betrag angeben)

**Lösung:** 41.4 mV (Toleranz ±1)

**Rechenweg:** Vorher: c(H⁺) = 0,05 mol/L, pH = 1,30. n(HCl) = 1,00 mmol, n(NaOH) = 0,60 mmol, es bleiben 0,40 mmol H⁺ in 40 mL, also c(H⁺) = 0,010 mol/L und pH = 2,00. ΔpH = 0,699, und die Glaselektrode liefert bei 25 °C 59,16 mV je pH-Einheit: ΔE = 0,699 · 59,16 = 41,4 mV. Die vollen 59,16 mV gäbe es nur bei einer Verzehnfachung der H⁺-Konzentration.

## L019 — 08-voltammetrie-coulometrie (3 Punkte)

**Aufgabe:** Coulometrische Abscheidung von 350 mg Nickel aus einer Ni²⁺-Lösung (Ni²⁺ + 2e⁻ → Ni) bei I = 0,750 A. Wie lange dauert das in Minuten? (M(Ni) = 58,69 g/mol, F = 96485 C/mol)

**Lösung:** 25.6 min (Toleranz ±0.3)

**Rechenweg:** n(Ni) = 0,350 g / 58,69 g/mol = 5,963·10⁻³ mol. Je Nickelatom werden zwei Elektronen gebraucht: Q = z·n·F = 2 · 5,963·10⁻³ · 96485 = 1151 C. Aus Q = I·t folgt t = 1151/0,750 = 1534 s = 25,6 min. Wer die Ladungszahl z = 2 vergisst, halbiert die Zeit.

## U010 — 06-elektrochemische-grundlagen (4 Punkte)

**Aufgabe:** Eine Halbzelle Fe³⁺/Fe²⁺ (E° = +0,771 V, n = 1) enthält das Konzentrationsverhältnis [Red]/[Ox] = 50. Welches Potential stellt sich bei 25 °C ein?

**Lösung:** 0.671 V (Toleranz ±0.005)

**Rechenweg:** E = E° − (0,05916/n)·log([Red]/[Ox]) = 0,771 − 0,05916·log(50) = 0,771 − 0,05916·1,699 = 0,771 − 0,101 = 0,671 V. Ein Überschuss der reduzierten Form drückt das Potential, und zwar um 59,16/n Millivolt je Zehnerpotenz — bei n = 1 also fast doppelt so stark wie beim Kupferpaar mit n = 2.

## U011 — 16-atomspektrometrie (4 Punkte)

**Aufgabe:** Eine Flammen-AAS liefert für einen 8,0 mg/L-Standard die Absorption 0,320, für die Probe 0,208. Welche Konzentration hat die Probe? Linearer Bereich vorausgesetzt.

**Lösung:** 5.2 mg/L (Toleranz ±0.1)

**Rechenweg:** Im linearen Bereich ist A proportional zu c: c = 8,0 mg/L · 0,208/0,320 = 5,2 mg/L. Vorausgesetzt ist, dass beide Messwerte im linearen Bereich liegen und die Matrix gleich ist — sonst führt nur die Standardaddition zum richtigen Gehalt.

