# ChatGPT-Prompt: Chemie-Material → ChemLearn-Zwischenformat

Kopiere den Block unten zu ChatGPT, häng Skript/Altprüfung als Datei dran.
Zwei Modi: **A** für Vorlesungsskripten, **B** für Altprüfungen.
Ausgabe ist Markdown — NICHT TypeScript. Die TS-Dateien baue ich (Claude) daraus.

---

## PROMPT (ab hier kopieren)

Du bereitest Lernmaterial für eine Chemie-Lernplattform auf. Deine Ausgabe wird
maschinell weiterverarbeitet, deshalb ist die **Formatierung verbindlich**.

### Grundregeln (gelten immer)

1. **Keine Erfindungen.** Nur Inhalte aus der Quelle. Wenn du etwas ergänzt, was
   fachlich nötig ist aber nicht in der Quelle steht, markiere es mit `[ERGÄNZT]`.
2. **Unsicheres markieren.** Unleserliches, mehrdeutiges oder geratenes mit
   `[UNSICHER: was genau]` kennzeichnen. Niemals still raten.
3. **Sprache = Sprache der Quelle.** Deutsche Quelle → deutsche Ausgabe.
4. **Formeln als Unicode-Klartext, kein LaTeX, kein MathML.**
   Richtig: `A = ε · c · d`, `c = 1×10⁻⁴ mol/L`, `λmax`, `H₂O`, `νₐₛ`
   Falsch: `$A = \epsilon c d$`, `A = epsilon*c*d`
   Nutze: · × → ← ⇌ ≈ ≤ ≥ ° ⁻¹ ⁰¹²³⁴⁵⁶⁷⁸⁹ ₀₁₂₃₄₅₆₇₈₉ α β γ δ ε λ ν σ μ Δ Σ Ω
5. **Keine Code-Blöcke** außer wo unten ausdrücklich verlangt.
6. **Ein Thema = eine Ausgabedatei.** Bei mehreren Themen: nacheinander, jeweils
   getrennt durch eine Zeile `=== DATEI: NN-slug.md ===`.
7. Slug = kleingeschrieben, ASCII, Bindestriche, Umlaute ausgeschrieben
   (ä→ae, ö→oe, ü→ue, ß→ss). Beispiel: `02-lambert-beer`, `11-saeurebase-ph`.

---

## MODUS A — Vorlesungsskript → Themen

Zerlege das Skript in **abgeschlossene Lernthemen** (Richtwert 45–90 min Lernzeit,
typisch 8–20 Themen pro Semesterskript). Nicht nach Foliennummer trennen, sondern
nach inhaltlicher Einheit.

Für **jedes** Thema exakt diese Struktur ausgeben:

```
=== DATEI: 02-lambert-beer.md ===

# META
titel: Lambert-Beer-Gesetz
untertitel: Quantitative Absorptionsspektrometrie & Kalibrierung
icon: 📐
dauer_minuten: 75
quelle: Skript Kap. 3.2, Folien 41–58

# THEORIE

## Das Lambert-Beer-Gesetz

Fließtext in Markdown. Überschriften nur ## und ###, niemals #.
**Fett** für Schlüsselbegriffe. Tabellen für Größen/Einheiten:

| Symbol | Größe | Einheit |
|---|---|---|
| A | Absorption | dimensionslos |
| ε | molarer Extinktionskoeffizient | L·mol⁻¹·cm⁻¹ |

Aufzählungen für Bedingungen, Ausnahmen, Merkregeln.
Länge: 400–900 Wörter. Vollständig genug zum Lernen ohne Skript,
aber keine Wiederholung von Verwaltungsfolien, Literaturlisten, Organisatorischem.

# INTERAKTIV

typ: formula-calculator

(Genau EIN Typ pro Thema, oder `typ: keiner`. Wähle den fachlich passendsten.
 Details je Typ siehe unten. Wenn kein Typ wirklich passt: `typ: keiner` —
 das ist völlig in Ordnung und besser als eine erzwungene Aufgabe.)

# QUIZ

Genau 6 Fragen. Jede Frage: genau 4 Antwortoptionen, genau eine richtig.
Mischung: 2 Rechenfragen (wenn das Thema Formeln hat), 4 Verständnisfragen.
Keine reinen Auswendig-Definitionsfragen. Distraktoren müssen plausibel sein —
typische Denkfehler, nicht offensichtlicher Unsinn.

F1: Eine Lösung hat A = 0.5 bei ε = 5000 L·mol⁻¹·cm⁻¹ und d = 1 cm. Wie groß ist c?
- 1×10⁻⁴ mol/L
- 2.5×10⁻⁴ mol/L
- 1×10⁻³ mol/L
- 5×10⁻³ mol/L
RICHTIG: 1
ERKLÄRUNG: c = A/(ε·d) = 0.5/(5000·1) = 1×10⁻⁴ mol/L. Formel umstellen: A = ε·c·d → c = A/(ε·d).

F2: ...

(RICHTIG = Nummer der richtigen Option, 1–4. ERKLÄRUNG = 1–3 Sätze, erklärt
 WARUM richtig, und wo der häufigste Fehler liegt. Nicht nur die Lösung wiederholen.)

# FLASHCARDS

Genau 6 Karten. Vorderseite = Begriff/Frage, kurz. Rückseite = dichte,
vollständige Antwort mit Zahlen und Einheiten (2–4 Sätze).

V: Lambert-Beer-Gesetz
R: A = ε · c · d. A = Absorption, ε = molarer Extinktionskoeffizient [L/(mol·cm)], c = Konzentration [mol/L], d = Schichtdicke [cm]. Gilt für verdünnte Lösungen (<0.01 M) mit monochromatischem Licht.

V: ...
```

### Die vier INTERAKTIV-Typen

Wähle pro Thema den passendsten — oder `typ: keiner`.

**1. `formula-calculator`** — wenn das Thema eine umstellbare Gleichung hat
(Lambert-Beer, Nernst, van-Deemter, Nachweisgrenze …).

```
typ: formula-calculator
formel_id: lambert-beer
formel_name: Lambert-Beer-Gesetz
gleichung: A = ε · c · d
variablen:
- id: A | label: Absorption | symbol: A | einheit: — | beschreibung: Extinktion (dimensionslos)
- id: eps | label: Extinktionskoeffizient | symbol: ε | einheit: L·mol⁻¹·cm⁻¹ | beschreibung: Molarer Extinktionskoeffizient
- id: c | label: Konzentration | symbol: c | einheit: mol/L | beschreibung: Molarität der Lösung
- id: d | label: Schichtdicke | symbol: d | einheit: cm | beschreibung: Küvettenlänge
umstellungen:
- A = eps * c * d
- c = A / (eps * d)
- d = A / (eps * c)
- eps = A / (c * d)
hinweis1: A = ε × c × d. Typische Werte: ε = 1000–100000 L/(mol·cm), d = 1 cm, c = 10⁻⁵–10⁻³ mol/L.
hinweis2: Einheitenprobe: (L/mol/cm)·(mol/L)·cm = 1 ✓ — A ist dimensionslos.
```
Wichtig bei `umstellungen`: **jede** Variable nach der aufgelöst werden kann,
als einzelne Zeile, in reiner ASCII-Rechenschreibweise (`* / + - ( ) log exp sqrt`).
Variablennamen = die `id` von oben. Keine Unicode-Operatoren hier.
Wenn eine Variable nicht analytisch auflösbar ist: weglassen und
`[UNSICHER: x nicht analytisch auflösbar]` dahinter.

**2. `apparatus-quiz`** — wenn Geräteaufbauten unterschieden werden müssen
(Photometer vs. Fluoreszenzspektrometer vs. Chemolumineszenz-Detektor …).

```
typ: apparatus-quiz
frage: Chemolumineszenz-Detektor
ziel_id: chemoluminescence
optionen:
- id: chemoluminescence | label: Chemolumineszenz-Detektor | beschreibung: Keine externe Lichtquelle, nur Probe und Detektor | bauteile: Probe+Reagenz → Detektor
- id: fluorescence | label: Fluoreszenzspektrometer | beschreibung: Detektor im 90°-Winkel zur Anregung | bauteile: Lichtquelle → Probe → Detektor (90°)
- id: photometer | label: Einstrahl-Photometer | beschreibung: Licht durchstrahlt die Probe | bauteile: Lichtquelle → Monochromator → Probe → Detektor
- id: double-beam | label: Zweistrahl-Photometer | beschreibung: Referenzstrahl parallel zur Probe | bauteile: Lichtquelle → Strahlteiler → Probe/Referenz → Detektor
erklaerung: Der Chemolumineszenz-Detektor hat den einfachsten Aufbau: Licht entsteht durch chemische Reaktion in der Probe selbst, keine externe Lichtquelle nötig.
hinweis1: Chemolumineszenz erzeugt Licht durch Reaktion (A + B → C*). Keine Lichtquelle von außen.
hinweis2: Aufbau: nur Probenmischer + Detektor. Daher praktisch kein Hintergrundrauschen.
```
Genau 4 Optionen, eine davon ist `ziel_id`. **Zeichne keine SVGs** — schreib nur
`bauteile:` als Kette der Komponenten mit `→`. Die Grafik erzeuge ich.

**3. `spectrum-assignment`** — wenn Peaks/Banden zugeordnet werden
(IR, NMR, MS, Chromatogramm …).

```
typ: spectrum-assignment
titel: IR-Spektrum von Wasser – Schwingungszuordnung
beschreibung: Weise den markierten Peaks des H₂O-IR-Spektrums die richtigen Schwingungstypen zu.
x_achse: Wellenzahl (cm⁻¹) →
y_achse: Absorption
peaks:
- id: p1 | position: 12 | hoehe: gross | richtig: O-H Streckschwingung (νₐₛ, νₛ) | optionen: O-H Streckschwingung (νₐₛ, νₛ) ; O-H Deformationsschwingung (δ) ; C-H Streckschwingung ; C=O Streckschwingung
- id: p2 | position: 45 | hoehe: mittel | richtig: O-H Deformationsschwingung (δ) | optionen: O-H Streckschwingung (νₐₛ, νₛ) ; O-H Deformationsschwingung (δ) ; Librationsschwingung ; C-O Streckschwingung
hinweis1: ...
hinweis2: ...
```
`position` = 0–100, Position auf der x-Achse von links. `hoehe`: `klein`|`mittel`|`gross`.
3–5 Peaks. Jeder Peak: 4 Optionen, `richtig` muss wörtlich in `optionen` vorkommen.

**4. `mechanism`** — Reaktionsmechanismen mit Elektronenpfeilen.

**Erzeuge diesen Typ nicht.** Ein Mechanismus braucht gesetzte Atomkoordinaten
(x/y je Atom, Bindungen zwischen Atom-IDs); aus einer Textbeschreibung lässt
sich das nicht ableiten. Der Importer weist einen Mechanismus ohne Koordinaten
ausdrücklich zurück, statt ihn still zu verwerfen.

Wenn ein Thema nach einem Mechanismus verlangt: `typ: keiner` schreiben und im
Bericht vermerken — die Strukturzeichnung entsteht von Hand.

---

> **Karten-IDs schreibst du nicht.** Der Importer leitet sie aus der
> Vorderseite ab, damit ein Umsortieren den Lernplan nicht verschiebt.

---

## MODUS B — Altprüfung → Prüfungsfragen

Extrahiere **jede** Frage aus der Altprüfung. Nichts zusammenfassen, nichts
weglassen, Formulierung möglichst nah am Original.

Kopf einmal pro Prüfung:

```
=== PRÜFUNG ===
quelle: 2019-05-Lieberzeit
pruefer: lieberzeit
kurs: analytical-chemistry-1
```
`quelle` = `JJJJ-MM-Nachname`. `pruefer` = Nachname klein, ASCII.

Wenn die Altprüfung als **ganze Prüfung** nachgestellt werden soll (Simulator),
kommt vor die erste Frage ein Aufbau-Block:

```
# AUFBAU
id: exam-2019-05
datum: 2019-05-24
titel: Prüfung Mai 2019
bestehen: 36
abschnitt: lieberzeit | 24 | 12 | L001, L002, L003
abschnitt: koellensperger | 24 | 12 | K001, K002
abschnitt: gerner | 24 | 12 | G001, G002
```

Felder je Abschnitt: `prüfer | Punkte | Punkte zum Bestehen | Fragen-IDs`.
Ohne diesen Block werden nur die Fragen übernommen; bestehende Prüfungsaufbauten
bleiben unangetastet.

Dann pro Frage einen Block. Vier Fragetypen:

```
--- FRAGE ---
typ: mc-single
punkte: 2
thema: 02-lambert-beer
frage: Wie lautet die Beziehung zwischen Absorption A und Transmission T?
- A = T
- A = 1 - T
- A = -log(T)
- A = log(T)
richtig: 3
erklaerung: A = -log(T) = log(I₀/I). Bei T = 1: A = 0. Bei T = 0.01: A = 2.

--- FRAGE ---
typ: mc-multi
punkte: 1
thema: 03-fluoreszenz-lumineszenz
frage: Welche Aussagen über Fluoreszenz treffen zu?
- Emission erfolgt bei längerer Wellenlänge als die Anregung
- Der Detektor steht typisch im 90°-Winkel
- Fluoreszenz benötigt keine Lichtquelle
- Die Lebensdauer liegt im Nanosekundenbereich
richtig: 1,2,4
erklaerung: Stokes-Verschiebung → längere Wellenlänge. 90°-Geometrie vermeidet Streulicht. Anregungslichtquelle ist zwingend nötig (im Gegensatz zu Chemolumineszenz). τ ≈ 1–100 ns.

--- FRAGE ---
typ: numeric
punkte: 4
thema: 02-lambert-beer
frage: Ein Photometer: Blindprobe ergibt 11,97 V. Probe (0,2 mmol/L, d = 0,1 cm) ergibt 4,24 V. Berechnen Sie die Transmission in %.
richtig: 35.42
toleranz: 0.5
einheit: %
erklaerung: T = I/I₀ = 4,24 V / 11,97 V = 0,3542 = 35,42 %. Der Detektor ist linear in der Lichtintensität, Spannung ∝ Intensität.

--- FRAGE ---
typ: order
punkte: 2
thema: 01-grundlagen-spektroskopie
frage: Ordne die Strahlungsarten nach steigender Energie.
- Radiowellen
- Infrarot
- Sichtbares Licht
- Röntgenstrahlung
richtig: 1,2,3,4
erklaerung: E = h·ν, Energie steigt mit der Frequenz: Radio < IR < VIS < Röntgen.
```

Regeln Modus B:
- `richtig` bei `mc-single`: eine Zahl (1-basiert). Bei `mc-multi` und `order`:
  kommagetrennte Zahlen. Bei `numeric`: Zahl mit **Punkt** als Dezimaltrenner.
- `toleranz` und `einheit` nur bei `numeric`. Toleranz sinnvoll wählen
  (Rundungsspielraum, typ. 1–2 % des Werts). `einheit: —` wenn dimensionslos.
- `thema` = Slug des passenden Kursthemas. Kennst du die Themenliste nicht,
  schreib `thema: [ZUORDNEN: Stichwort]`.
- Bei `order`: Optionen bereits in der **richtigen** Reihenfolge auflisten,
  `richtig: 1,2,3,4`. Ich mische sie später.
- Steht keine Lösung in der Angabe: selbst rechnen, Rechenweg in `erklaerung`,
  und `[UNSICHER: Lösung nicht in Angabe, selbst berechnet]` anhängen.
- Handschriftliche/unleserliche Stellen: `[UNSICHER: unleserlich]` statt raten.
- Punkte nicht angegeben: aus dem Aufwand schätzen und `[ERGÄNZT]` dahinter.

---

## MODUS C — vorhandenes Thema aufstocken

Der häufigste Fall, sobald ein Kurs steht: die Theorie ist da, der Übungsteil
ist zu dünn. Dann wird **kein ganzes Thema neu geschrieben**, sondern nur das
Fehlende nachgereicht.

Kopf der Datei:

```
=== DATEI: 16-atomspektrometrie.md ===

# META
modus: ergaenzen
```

`modus: ergaenzen` heißt: **kein THEORIE-Abschnitt, kein titel, kein icon.**
Das steht schon in der Datei und bleibt Zeichen für Zeichen erhalten. Danach
folgen nur die Abschnitte, die dazukommen sollen — `# QUIZ`, `# FLASHCARDS`,
`# INTERAKTIV`, einzeln oder zusammen.

Der Importer hängt an, statt zu ersetzen:

- Quizfragen bekommen fortlaufende Kennungen (`q7`, `q8`, …). Eine Frage, deren
  Wortlaut schon im Thema steht, fällt weg.
- Karteikarten mit bereits vorhandener Vorderseite fallen weg. Es lohnt sich
  also, vorher in die Datei zu schauen — sonst schreibst du umsonst.
- Ein Interaktivteil wird nur übernommen, wenn das Thema noch keinen hat.
- Mehrere Quelldateien dürfen dasselbe Thema ergänzen; sie werden nacheinander
  aufgetragen.

**Vorgabe:** sechs Quizfragen, sechs Karteikarten und ein Interaktivteil je
Thema. Der Test `src/content/inhalte.test.ts` besteht darauf.

**Arbeitsauftrag für diesen Modus:** „Hier ist die Theorie von Thema X. Schreib
N zusätzliche Quizfragen und M zusätzliche Karteikarten zu dem Stoff, der
bisher nicht abgefragt wird. Keine Wiederholung vorhandener Fragen."

---

### Ausgabe

Nur die Blöcke im obigen Format. Keine Einleitung, kein Fazit, keine Rückfragen
vorab, keine Zusammenfassung am Ende. Bei sehr langen Skripten: der Reihe nach
abarbeiten und am Ende `=== FORTSETZUNG FOLGT ===` schreiben, dann auf
"weiter" warten.

## PROMPT-ENDE

---

## Import in die App

Ausgabe von ChatGPT als `.md` in einen Ordner unter `.source/` legen, dann:

```bash
npm run import -- .source/<kurs>/ --dry-run   # nur prüfen, nichts schreiben
npm run import -- .source/<kurs>/             # schreiben
npm run import -- .source/<kurs>/ --force     # bestehende Themen überschreiben
```

Der Importer bricht ab, sobald etwas nicht stimmt (falsche Optionszahl,
`RICHTIG` außerhalb des Bereichs, unbekanntes Thema, nicht auflösbare
Umstellung, Apparatur ohne Zeichnung). Er schreibt dann nichts.

Alles, was die Quell-LLM mit `[UNSICHER]`, `[ERGÄNZT]` oder `[ZUORDNEN]`
markiert hat, landet in `<quellordner>/report.md` — diese Liste abarbeiten.

`.source/beispiel/` enthält eine gültige Beispieldatei. Rauchtest:

```bash
npm run import -- .source/beispiel --dry-run
```
