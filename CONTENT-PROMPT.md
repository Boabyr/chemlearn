# Prompt: Studienmaterial → ChemLearn-Zwischenformat

Kopiere zu ChatGPT: **den KERN und genau ein Fach-Profil.** Häng Skript oder
Altprüfung als Datei an. Ausgabe ist Markdown — NICHT TypeScript. Die TS-Dateien
baue ich (Claude) daraus.

| Fach | Profil | Formelsatz |
|---|---|---|
| Chemie (AC, OC, PC, BC) | Chemie | Unicode-Klartext, kein LaTeX |
| Physik | Physik | LaTeX in `$…$` |
| Mathematik | Mathematik | LaTeX in `$…$` |

Drei Modi: **A** Vorlesungsskript → Themen, **B** Altprüfung → Prüfungsfragen,
**C** vorhandenes Thema aufstocken.

Gibt es zu einem Fach **keine Altprüfung**, entstehen die Prüfungsfragen aus dem
Vorlesungsstoff selbst — als Fragenpool, aus dem die Prüfungssimulation nach der
Prüfungsordnung zieht. Dafür gilt ein eigener, selbsttragender Prompt:
[`PRUEFUNGSFRAGEN-PROMPT.md`](PRUEFUNGSFRAGEN-PROMPT.md). Er wird nicht an diesen
Kern gehängt, sondern allein kopiert.

**Ein Skript hat 800 Seiten, eine Antwort hat nicht 800 Seiten.** Arbeite in
Läufen von höchstens drei Themen und gib jede Antwort als eigene `.md`-Datei in
denselben Quellordner. Wie das ohne Dubletten geht, steht im Abschnitt
[Stückweise arbeiten](#stückweise-arbeiten) — lies ihn vor dem ersten Lauf.

---

## PROMPT — KERN (ab hier kopieren)

Du bereitest Lernmaterial für eine Lernplattform auf. Deine Ausgabe wird
maschinell weiterverarbeitet, deshalb ist die **Formatierung verbindlich**.

### Grundregeln (gelten immer)

1. **Keine Erfindungen.** Nur Inhalte aus der Quelle. Wenn du etwas ergänzt, was
   fachlich nötig ist aber nicht in der Quelle steht, markiere es mit `[ERGÄNZT]`.
2. **Unsicheres markieren.** Unleserliches, mehrdeutiges oder geratenes mit
   `[UNSICHER: was genau]` kennzeichnen. Niemals still raten.
3. **Sprache = Sprache der Quelle.** Deutsche Quelle → deutsche Ausgabe.
4. **Formelsatz nach Fach-Profil.** Der Kern legt ihn nicht fest; das Profil am
   Ende dieses Prompts tut es. Halte dich strikt an eine Variante — ein
   gemischter Satz ist schlimmer als jede der beiden.
5. **Keine Code-Blöcke** außer wo unten ausdrücklich verlangt.
6. **Ein Thema = eine Ausgabedatei.** Bei mehreren Themen: nacheinander, jeweils
   getrennt durch eine Zeile `=== DATEI: NN-slug.md ===`.
7. Slug = kleingeschrieben, ASCII, Bindestriche, Umlaute ausgeschrieben
   (ä→ae, ö→oe, ü→ue, ß→ss). Beispiel: `02-lambert-beer`, `11-saeurebase-ph`.
8. **Höchstens drei Themen je Antwort.** Ein Thema sind 400–900 Wörter Theorie,
   sechs Fragen und sechs Karten; mehr reißt die Antwort ab. Siehe „Stückweise
   arbeiten" ganz unten.

### Der Kurskopf

Beim **ersten** Lauf eines neuen Fachs steht ganz oben ein Kurskopf. Er legt an,
was auf der Kurskarte steht; ohne ihn heißt das Fach wie sein Quellordner.

```
=== KURS ===
titel: Physik 1
untertitel: Mechanik und Wärmelehre
icon: 🪐
farbe: #6366f1
niveau: Uni
beschreibung: Kinematik, Dynamik, Erhaltungssätze und Thermodynamik.
sprache: de
formelsatz: aus
entwurf: ja
pruefer:
- id: uebung | label: Übungsfragen | icon: 📝
```

- `formelsatz`: `chemie` stellt Summenformeln tief (H2SO4 → H₂SO₄), `aus` lässt
  den Text in Ruhe. Welcher Wert gilt, steht im Fach-Profil.
- `entwurf: ja`, solange das Fach im Aufbau ist. Das Kennzeichen setzt die
  Vollständigkeitsprüfung aus — ein halb eingespieltes Fach hält den Testlauf
  sonst dauerhaft rot. Wenn der Kurs steht: `entwurf: nein`.
- `pruefer` sind die Abschnitte der Prüfungssimulation. Fragen, die aus keiner
  Altprüfung stammen, laufen unter einem eigenen Prüfer `uebung`.
- Die Stundenzahl wird aus den Themenzeiten gerechnet, nicht angegeben.

**Bei jedem weiteren Lauf lässt du den Kurskopf weg.** Was im Kurs schon steht,
bleibt stehen.

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
 Welche Typen dein Fach kennt, steht im Fach-Profil. Wenn kein Typ wirklich
 passt: `typ: keiner` — das ist völlig in Ordnung und besser als eine
 erzwungene Aufgabe.)

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

### Wo die richtige Antwort steht

Die App mischt die Antwortoptionen **nicht**. Wo du die Lösung hinschreibst,
dort steht sie in der Prüfung. Im AC1-Quiz lag sie einmal in 87 von 108 Fragen
an zweiter Stelle — wer nichts wusste und immer die zweite ankreuzte, kam auf
80 % richtig.

**Verteile die Lösung gleichmäßig über die vier Plätze.** Kein Platz darf über
40 % der Fragen tragen, keiner unter 12 % bleiben. Bei sechs Fragen heißt das
etwa: zweimal Platz 1, zweimal Platz 2, je einmal Platz 3 und 4 — in gemischter
Reihenfolge, nicht als Muster.

**Und die Ablenker müssen mithalten.** Die richtige Antwort darf nicht die
längste sein — sie trug früher die Begründung mit sich, während die Ablenker
Schlagworte blieben, und war dadurch in vier von fünf Fällen ohne Fachwissen zu
erraten. Die Begründung gehört in `ERKLÄRUNG:`, die Optionen sind knappe
Behauptungen von ähnlicher Länge.

---

### Interaktivteile, die in jedem Fach gehen

**1. `formula-calculator`** — wenn das Thema eine umstellbare Gleichung hat
(Lambert-Beer, Nernst, van-Deemter, Nachweisgrenze, s = v·t, Ohmsches Gesetz …).

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
als einzelne Zeile, in reiner ASCII-Rechenschreibweise (`* / + - ^ ( )` und die
Funktionen `log ln exp sqrt abs min max sin cos tan asin acos atan`;
Winkelfunktionen rechnen im Bogenmaß).
Variablennamen = die `id` von oben. Keine Unicode-Operatoren, **kein LaTeX** —
diese Zeilen rechnet die App wirklich, sie sind kein Satzbild.
Wenn eine Variable nicht analytisch auflösbar ist: weglassen und
`[UNSICHER: x nicht analytisch auflösbar]` dahinter.

**2. `spectrum-assignment`** — wenn Ausschläge einer Messkurve zugeordnet werden
(IR, NMR, MS, Chromatogramm, Spektrallinien …).

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

> **Ein Thema darf mehrere Interaktivteile haben.** Ein Formelrechner schließt eine
> Zuordnungsaufgabe nicht aus. Je Quelldatei steht weiterhin ein `# INTERAKTIV`-Block;
> ein zweiter kommt über eine eigene Ergänzungsdatei dazu. Trägt die META-Zeile
> `interaktiv: ersetzen`, tritt der neue an die Stelle des vorhandenen **gleichen
> Typs**; sonst wird er angehängt.

Weitere Typen gibt es nur in einzelnen Fächern — sie stehen im Fach-Profil.

---

### Abbildungen im Theorietext

Was der Text als *Form* beschreibt, gehört gezeichnet. Abbildungen stehen in
einem eigenen Abschnitt und werden im Theorietext über eine Marke auf eigener
Zeile gerufen:

```
# THEORIE
... die Kalibriergerade knickt oberhalb von 1 mmol/L ab.

{{abbildung:kalibriergerade}}

Darüber gilt das Lambert-Beer-Gesetz nicht mehr.

# ABBILDUNGEN
- id: kalibriergerade | art: diagramm | titel: Kalibriergerade und ihre Grenze | beschreibung: ... | x_achse: titel: Konzentration c (mmol/L) | min: 0 | max: 3 | y_achse: titel: Absorption A | min: 0 | max: 3
  kurve: beschriftung: ideal | punkte: 0,0 ; 3,3 | stil: gestrichelt | farbe: subtle
  kurve: beschriftung: real gemessen | punkte: 0,0 ; 0.5,0.445 ; 1,0.796 ; 3,1.597 | farbe: accent
  marker: x: 0.5 | y: 0.445 | beschriftung: unbekannte Probe | hilfslinien: ja
```

Punkte sind Paare `x,y`, getrennt durch Semikolon — **Datenpunkte, kein Code**, dieselbe
Regel wie bei den Umstellungen. Alle Punkte und Marker müssen innerhalb der Achsengrenzen
liegen, sonst bricht der Import ab. `hilfslinien: ja` zieht gestrichelte Linien auf beide
Achsen, für „Signal messen, Wert ablesen". Farben: `accent`, `success`, `warning`,
`danger`, `subtle`.

**Wann du ein Diagramm erzeugen darfst, steht im Fach-Profil.** Die Punktliste
muss entweder in der Quelle stehen oder sich aus einer Formel der Quelle
ausrechnen lassen. Geschätzte Kurven sind wertlos.

Der Importer prüft beides gegeneinander: eine Marke ohne Abbildung und eine
Abbildung, die niemand ruft, brechen den Lauf ab.

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
`quelle` = `JJJJ-MM-Nachname`. `pruefer` = Nachname klein, ASCII. `kurs` = der
Quellordnername, unter dem das Fach eingespielt wird.

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
- Bei `numeric` muss der Zahlenwert der Lösung **auch in der `erklaerung`
  vorkommen** — ein Rechenweg, der auf eine andere Zahl führt als `richtig`,
  wird abgewiesen.
- `thema` = Slug des passenden Kursthemas. Kennst du die Themenliste nicht,
  schreib `thema: [ZUORDNEN: Stichwort]`.
- Bei `order`: Optionen **gemischt** auflisten und `richtig` entsprechend
  setzen. Der Importer mischt nicht — eine Frage mit `richtig: 1,2,3,4` steht
  in der App bereits gelöst da, weil die Eingabemaske mit genau dieser
  Reihenfolge startet. Der Test in `inhalte.test.ts` weist das zurück.
- Bei `mc-single` gilt dieselbe Verteilung wie beim Quiz: die Lösung darf nicht
  überwiegend auf einem Platz liegen.
- Steht keine Lösung in der Angabe: selbst rechnen, Rechenweg in `erklaerung`,
  und `[UNSICHER: Lösung nicht in Angabe, selbst berechnet]` anhängen.
- Handschriftliche/unleserliche Stellen: `[UNSICHER: unleserlich]` statt raten.
- Punkte nicht angegeben: aus dem Aufwand schätzen und `[ERGÄNZT]` dahinter.
- Keine Denkprotokolle in `erklaerung` — kein „warte", „hmm", „ich denke".
  Es steht nur die fertige Begründung da.

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

> **Vorher die vorhandenen Fragen lesen.** Beim ersten Auffüllen wurden Fragen
> aus dem Theorietext geschrieben, ohne ins bestehende Quiz zu schauen — alle
> acht doppelten eine Frage, die schon dastand, teils im selben Thema. Der
> Importer erkennt nur den wortgleichen Fall. Zum Nachsehen:
>
> ```bash
> npm run fragen:aehnlich          # Paare mit hoher Wortüberlappung, kursweit
> ```
>
> Dubletten entstehen besonders leicht über Themengrenzen hinweg: dieselbe
> Regel wird im Grundlagen- und im Anwendungskapitel gefragt. Faustregel: die
> Frage gehört in das Kapitel, dessen Thema sie ist, und dort in der Fassung,
> die nach dem *Warum* fragt statt nach dem *Was*.

Der Importer hängt an, statt zu ersetzen:

- Quizfragen bekommen fortlaufende Kennungen (`q7`, `q8`, …). Eine Frage, deren
  Wortlaut schon im Thema steht, fällt weg.
- Karteikarten mit bereits vorhandener Vorderseite fallen weg. Es lohnt sich
  also, vorher in die Datei zu schauen — sonst schreibst du umsonst.
- Ein Interaktivteil wird nur übernommen, wenn das Thema noch keinen hat.
  Soll ein vorhandener abgelöst werden, steht im META-Block zusätzlich
  `interaktiv: ersetzen` — ausdrücklich, damit nichts versehentlich verschwindet.
- Eine vorhandene Karteikarte lässt sich mit `WEG: <Vorderseite>` im
  FLASHCARDS-Block entfernen. Das ist der einzige Weg, Inhalt wieder
  loszuwerden, ohne die Datei von Hand anzufassen.
- Mehrere Quelldateien dürfen dasselbe Thema ergänzen; sie werden nacheinander
  aufgetragen.

**Vorgabe:** sechs Quizfragen, sechs Karteikarten und ein Interaktivteil je
Thema, dazu mindestens eine Prüfungsfrage. Der Test `src/content/inhalte.test.ts`
besteht darauf, sobald der Kurs nicht mehr `entwurf` ist.

**Arbeitsauftrag für diesen Modus:** „Hier ist die Theorie von Thema X. Schreib
N zusätzliche Quizfragen und M zusätzliche Karteikarten zu dem Stoff, der
bisher nicht abgefragt wird. Keine Wiederholung vorhandener Fragen."

---

### Ausgabe

Nur die Blöcke im obigen Format. Keine Einleitung, kein Fazit, keine Rückfragen
vorab, keine Zusammenfassung am Ende.

Am Ende jeder Antwort — und nur dort — steht die Liste der in diesem Lauf
vergebenen Slugs:

```
=== VERGEBEN ===
- 07-impuls-und-stoss
- 08-arbeit-und-energie
```

Ist das Kapitel noch nicht zu Ende, folgt darunter `=== FORTSETZUNG FOLGT ===`.
Beide Blöcke sind Notizen für den nächsten Lauf; der Importer lässt sie fallen.

### Stückweise arbeiten

Ein Semesterskript passt in keine Antwort. Es wird in Läufen abgearbeitet, und
die Läufe dürfen sich nicht ins Gehege kommen. Fünf Regeln:

1. **Ein Lauf = ein Kapitel, höchstens drei Themen.** Lieber zwei saubere Themen
   als vier abgeschnittene.
2. **Nummernkreis vorgeben.** Der Auftrag nennt die erste Nummer: „Beginne bei
   `07`." Die Nummer im Dateinamen ist die Reihenfolge im Kurs.
3. **Bestand mitgeben.** Der Auftrag listet, was es schon gibt: „bereits
   vorhanden: 01-… bis 06-…". Kein Thema doppelt anlegen, keine Frage
   wiederholen, die dort schon steht.
4. **Kurskopf nur im ersten Lauf.** Danach beginnt die Antwort direkt mit
   `=== DATEI: ===`.
5. **Prüfungen getrennt.** Modus B läuft in eigenen Antworten und eigenen
   Dateien, nie mit Themen gemischt.

Ein Auftrag für einen Folgelauf sieht so aus:

> Kapitel 4 des angehängten Skripts (Seiten 88–121). Beginne bei `07`.
> Bereits vorhanden: 01-groessen-und-einheiten, 02-kinematik, 03-newtonsche-axiome,
> 04-kraefte, 05-reibung, 06-kreisbewegung. Kein Kurskopf.

## PROMPT-KERN-ENDE

---

## FACH-PROFIL CHEMIE (an den Kern anhängen)

Gilt für AC, OC, PC, BC.

### Formelsatz

**Unicode-Klartext, kein LaTeX, kein MathML.**
Richtig: `A = ε · c · d`, `c = 1×10⁻⁴ mol/L`, `λmax`, `H₂O`, `νₐₛ`
Falsch: `$A = \epsilon c d$`, `A = epsilon*c*d`
Nutze: · × → ← ⇌ ≈ ≤ ≥ ° ⁻¹ ⁰¹²³⁴⁵⁶⁷⁸⁹ ₀₁₂₃₄₅₆₇₈₉ α β γ δ ε λ ν σ μ Δ Σ Ω

Summenformeln dürfen auch flach geschrieben werden (`H2SO4`) — die App stellt
sie selbst tief. Im Kurskopf steht deshalb `formelsatz: chemie`.

### Zusätzliche Interaktivteile

**`apparatus-quiz`** — wenn Geräteaufbauten unterschieden werden müssen
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

**`apparatus-matching`** — Geräte ihren Skizzen zuordnen. Links der Name,
rechts das Bild.

```
typ: apparatus-matching
titel: Drei Wege, Atome zu erzeugen
beschreibung: Alle drei atomisieren die Probe — bei sehr verschiedenen Temperaturen.
erklaerung: Die Flammen-AAS lässt die Lampe quer durch die Flamme strahlen ...
- apparatur: flame-aas | label: Flammen-AAS | hinweis: Lampe strahlt quer durch die Flamme.
- apparatur: graphite-furnace | label: Graphitrohr-AAS | hinweis: Rohr längs im Strahlengang.
- apparatur: icp-oes | label: ICP-OES | hinweis: Keine Lampe — das Plasma strahlt selbst.
```

Drei bis sechs Paare; darüber wird das Bild unlesbar. `apparatur` ist der Schlüssel
aus der Zeichnungs-Registry — gibt es dazu keine Zeichnung, bricht der Import ab.
Der `hinweis` erscheint erst nach dem Prüfen, und nur bei einer falschen Zuordnung.

### Was du in Chemie nicht erzeugst

**`mechanism`** — Reaktionsmechanismen mit Elektronenpfeilen.

**Erzeuge diesen Typ nicht.** Ein Mechanismus ist eine Strukturformel mit
gesetzten Koordinaten; aus einer Textbeschreibung lässt sich das nicht
ableiten. Der Importer weist ihn ohne Koordinaten ausdrücklich zurück, statt
ihn still zu verwerfen. Wenn ein Thema nach einem Mechanismus verlangt:
`typ: keiner` schreiben und im Bericht vermerken — die Strukturzeichnung
entsteht von Hand.

Zur Einordnung, wie das Format aussieht (Bühne 480 × 300, Ursprung links oben):

```
typ: mechanism
titel: Chichibabin amination
beschreibung: Warum Nucleophile an C-2 angreifen.
schritte:
- nr: 1 | titel: Angriff | aufgabe: Zeichne beide Pfeile. | erklaerung: Weil ...
  hinweis: Erster Hinweis.
  hinweis: Zweiter Hinweis.
  atom: id: n1 | element: N | x: 72 | y: 132 | paare: 1
  atom: id: c2 | element: C | x: 120 | y: 105
  atom: id: nh | element: N | x: 300 | y: 70 | ladung: -1 | h: 2 | paare: 2 | frei: ja
  bindung: id: r1 | von: n1 | nach: c2 | ordnung: 2
  pfeil: von: freiesPaar nh | nach: atom c2
  pfeil: von: bindung r1 | nach: atom n1
- nr: 2 | ...
ergebnis: titel: 2-Aminopyridin | beschreibung: Der Ring ist wieder aromatisch.
  atom: ...
  bindung: ...
```

Regeln, auf denen der Importer besteht:

- **mindestens zwei Schritte** je Mechanismus, jeder mit mindestens einem Pfeil,
  einem Hinweis und einer Erklärung
- aufeinanderfolgende Schritte teilen mehr als die Hälfte ihrer Atom-IDs — die
  Struktur wird umgeformt, nicht ausgetauscht
- Atome liegen auf der Bühne und nicht übereinander (Mindestabstand 22)
- ein Atom ohne Bindung braucht `frei: ja`, sonst gilt es als Versehen
- die Ladung steht im Feld `ladung`, nie im Elementsymbol
- Kohlenstoff bleibt eine Ecke ohne Buchstabe; `zeigen: ja` erzwingt das Symbol
- ein Pfeil beginnt an `bindung`, `freiesPaar` oder `atom` und endet an
  `bindung` oder `atom` — nie dort, wo er beginnt
- `ergebnis` ist Pflicht: das Produktbild ohne Aufgabe

**Strukturabbildungen** (`art: strukturen`) — Grenzstrukturen und Skelettformeln
im Theorietext. **Erzeuge das ebenfalls nicht**; die Koordinaten sind dieselbe
Handarbeit. Wenn eine Stelle nach einem Bild verlangt, vermerke das im Bericht.
Zur Einordnung:

```
# ABBILDUNGEN
- id: pyrrol-c2 | titel: Areniumion aus dem Angriff an C-2 | beschreibung: Drei Grenzstrukturen. | verknuepfung: resonanz
  struktur: beschriftung: Ladung an C-3
    atom: id: n1 | element: N | x: 240 | y: 80 | h: 1 | paare: 1
    atom: id: c2 | element: C | x: 307 | y: 128 | zeigen: ja | h: 1
    bindung: id: b1 | von: n1 | nach: c2 | ordnung: 1
  struktur: beschriftung: Ladung am N
    atom: id: n1 | element: N | x: 240 | y: 80 | h: 1 | ladung: 1
    atom: id: c2 | element: C | x: 307 | y: 128 | zeigen: ja | h: 1
    bindung: id: b1 | von: n1 | nach: c2 | ordnung: 2
```

`verknuepfung: resonanz` setzt den Doppelpfeil ↔ zwischen die Bilder — ein
Molekül, mehrere Grenzstrukturen. `reihe` stellt sie nur nebeneinander.

**Diagramme** (`art: diagramm`) erzeugst du in Chemie ebenfalls nicht: die
Punktlisten kommen aus Messwerten, nicht aus einer Textquelle. Vermerke die
Stelle im Bericht.

---

## FACH-PROFIL PHYSIK (an den Kern anhängen)

### Formelsatz

**LaTeX in `$…$`**, im Fließtext eingebettet. Abgesetzte Gleichungen in `$$…$$`
auf eigenen Zeilen. Im Kurskopf steht `formelsatz: aus`.

Richtig: `Es gilt $s = \frac{1}{2} a t^2$ und daraus $v^2 = 2 a s$.`
Falsch: `Es gilt s = ½at²` (Unicode-Bruchzeichen), `$$s = ...$$` mitten im Satz.

Warum nicht Unicode wie in der Chemie: die App stellt in Chemiekursen alles
tief, was sich als Summenformel lesen lässt. In einem Physiktext wären `V2`,
`N2`, `F2` und `B1` genau das — deshalb `formelsatz: aus`, und deshalb LaTeX
für alles, was wirklich eine Formel ist.

Weitere Regeln:
- **Einheiten** in `\mathrm{}`: `$9{,}81\ \mathrm{m/s^2}$`. Zwischen Zahl und
  Einheit ein `\ `.
- **Dezimalkomma** als `{,}`, sonst setzt KaTeX einen Abstand dahinter.
- Vektoren als `$\vec{v}$`, Mittelwerte als `$\bar{x}$`.
- In `umstellungen:` beim Formelrechner steht **kein LaTeX** — dort gilt reine
  ASCII-Rechenschreibweise, die die App wirklich ausrechnet.

### Interaktivteile

- **`formula-calculator` ist der Regelfall.** Fast jedes Physikthema hat eine
  umstellbare Gleichung; nimm sie, mit allen Einheiten in den Variablen.
- **`spectrum-assignment`** nur bei echten Messkurven (Spektrallinien,
  Beugungsmuster, Frequenzspektren).
- `apparatus-quiz`, `apparatus-matching` und `mechanism` gibt es hier **nicht** —
  die Zeichnungen dafür sind chemische Geräte und Strukturformeln.

### Abbildungen

**Diagramme darfst du erzeugen**, wenn die Kurve aus einer Formel der Quelle
folgt und du die Punkte ausrechnest: das Weg-Zeit-Gesetz, die gedämpfte
Schwingung, die Kennlinie eines Widerstands. Rechne mindestens fünf Punkte aus,
schreib sie mit höchstens drei Nachkommastellen, und halte alle innerhalb der
Achsengrenzen.

Geschätzte oder „ungefähr so aussehende" Kurven erzeugst du nicht — dann lieber
kein Bild. `art: strukturen` gibt es hier nicht.

### Quiz in Physik

Die Mischung aus dem Kern gilt: zwei Rechenfragen, vier Verständnisfragen.
Rechenfragen tragen Zahlen **mit Einheiten** in den Optionen; ein häufiger
Denkfehler ist die falsche Zehnerpotenz, ein anderer das vergessene Quadrat.
Genau solche Ablenker sind gute Ablenker.

---

## FACH-PROFIL MATHEMATIK (an den Kern anhängen)

### Formelsatz

**LaTeX in `$…$`**, wie in Physik. Im Kurskopf `formelsatz: aus`.
Alles, was Symbol ist, steht in `$…$` — auch ein einzelnes `$n$` im Fließtext.
Abgesetzte Gleichungen und Umformungsketten in `$$…$$`:

```
$$\int_0^1 x^2\,\mathrm{d}x = \left[\frac{x^3}{3}\right]_0^1 = \frac{1}{3}$$
```

Mengen als `$\mathbb{R}$`, `$\mathbb{N}$`. Quantoren als `$\forall$`, `$\exists$`.
Dezimalkomma als `{,}`.

### Theorie in Mathematik

Die 400–900 Wörter verteilen sich anders als in einem Sachfach: **Definition,
Satz, Beweisidee, Beispiel, typischer Fehler.** Ein vollständiger Beweis gehört
nur dann hinein, wenn ihn die Quelle führt und er kurz ist; sonst die Beweisidee
in zwei bis drei Sätzen und der Hinweis, worauf sie beruht.

Jeder Satz braucht seine Voraussetzungen. Ein Satz ohne Voraussetzungen ist in
der Prüfung eine falsche Antwort.

### Interaktivteile

- **`formula-calculator`** überall dort, wo eine Gleichung nach mehreren Größen
  auflösbar ist: Zinseszins, Ableitungsregeln in Anwendungsform, Lösungsformel.
  Einheit dann `einheit: —`.
- **`spectrum-assignment`** gibt es hier nicht, ebensowenig die chemischen Typen.
- Wenn kein Typ passt: `typ: keiner`. In Mathematik ist das häufig und richtig.

### Abbildungen

**Diagramme darfst du erzeugen**, wenn du die Punkte aus der Funktionsvorschrift
ausrechnest: Funktionsgraphen, Konvergenz einer Folge, Vergleich zweier
Wachstumsordnungen. Mindestens fünf Punkte je Kurve, höchstens drei
Nachkommastellen, alles innerhalb der Achsengrenzen. Nichts skizzieren.

### Quiz in Mathematik

Keine reinen Definitionsfragen („Was ist eine Cauchy-Folge?"). Frag nach dem
Schritt, an dem es klemmt: welche Voraussetzung fehlt, welcher Umformungsschritt
ist falsch, welches Gegenbeispiel widerlegt die Behauptung. Gute Ablenker sind
Umkehrungen ohne Gültigkeit, vergessene Randfälle und der verwechselte Quantor.

---

## Import in die App

Jede Antwort als eigene `.md` in **einen** Ordner unter `.source/` legen — der
Ordnername ist die Kurs-Kennung. Dann:

```bash
npm run import -- .source/<kurs>/ --dry-run   # nur prüfen, nichts schreiben
npm run import -- .source/<kurs>/             # schreiben
npm run import -- .source/<kurs>/ --force     # bestehende Themen überschreiben
```

**Vor jedem echten Lauf den Probelauf lesen.** Der Unterschied-Block zeigt, was
passieren würde. Steht bei „Fragen … geändert" eine Zahl, die nicht zu dem passt,
was du gerade geschrieben hast, greift der Lauf den Bestand an — dann erst
klären, warum.

Der Importer bricht ab, sobald etwas nicht stimmt (falsche Optionszahl,
`RICHTIG` außerhalb des Bereichs, unbekanntes Thema, nicht auflösbare
Umstellung, Apparatur ohne Zeichnung). Er schreibt dann nichts.

Alles, was die Quell-LLM mit `[UNSICHER]`, `[ERGÄNZT]` oder `[ZUORDNEN]`
markiert hat, landet in `<quellordner>/report.md` — diese Liste abarbeiten.

Zwei versionierte Beispielquellen zum Rauchtest:

```bash
npm run import -- .source/beispiel --dry-run          # Chemie
npm run import -- .source/beispiel-physik --dry-run   # Physik, mit Kurskopf und LaTeX
```

Danach immer:

```bash
npm run lint && npm test && npm run build
```
