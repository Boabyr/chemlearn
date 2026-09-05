# Prompt: Folien → Prüfungsfragen (Fragenpool)

Für den Fall **ohne Altprüfung**: Prüfungsfragen werden aus dem Vorlesungsstoff
selbst geschrieben. Sie landen im Fragenpool des Kurses, aus dem die
Prüfungssimulation nach der Prüfungsordnung zieht.

Für Themen, Theorietexte, Karteikarten und Interaktivteile gilt weiterhin
`CONTENT-PROMPT.md`. Diese Datei hier ist **selbsttragend** — du kopierst nur
den Abschnitt „PROMPT", nichts aus dem anderen Dokument.

| Du hast | Nimm |
|---|---|
| Vorlesungsskript, noch kein Kurs | `CONTENT-PROMPT.md`, Modus A |
| Altprüfung als PDF/Scan | `CONTENT-PROMPT.md`, Modus B |
| Kurs steht, Übungsteil zu dünn | `CONTENT-PROMPT.md`, Modus C |
| **Kurs steht, keine Altprüfung** | **diese Datei** |

---

## Vorbereitung (für dich, nicht zum Kopieren)

### Was in den Chat geht

1. Der Abschnitt **PROMPT** aus dieser Datei, vollständig.
2. Der **Auftrag** (Vorlage unten), ausgefüllt — darin steht deine
   `=== ORDNUNG ===` wörtlich.
3. Die **Folien** als Datei-Anhang.

Die Prüfungsordnung schreibt das Modell **nie selbst**. Punkte, Bewertungsregel,
Dauer und Notenschlüssel stehen je Fach anders; geraten sind sie wertlos. Das
Modell bekommt sie nur, damit es Gebiete und Themen-Slugs richtig trifft.

### Die Themenliste holen

```bash
ls src/courses/<kurs>/topics/        # Slugs ohne .ts
```

Die Ordnung steht im ersten Quelltext des Kurses (`grep -A 20 'ORDNUNG' .source/<kurs>/*.md`)
oder als Kommentar unter `src/courses/<kurs>/index.ts`.

### Ein Thema gehört in genau eine Pool-Datei

Der Importer vergibt die Kennung `pool-<thema>-<laufnummer>` und zählt die
Laufnummer **je Block ab 1**. Steht dasselbe Thema in zwei Pool-Dateien, tragen
beide ersten Fragen dieselbe Kennung und der Import bricht mit „doppelte IDs" ab.

Teile die Läufe deshalb nach Themen, nicht nach Fragenzahl: Lauf 1 nimmt
`01`–`08`, Lauf 2 nimmt `09`–`16`. Ein Thema, das in Lauf 1 vorkam, kommt in
Lauf 2 nicht mehr vor.

### Auftragsvorlage

> Kurs: `experimentale-physik-2`
> Folien: Anhang, Kapitel 9–14.
> Themen für diesen Lauf (nur diese, exakt so schreiben):
> `09-statische-magnetfelder`, `10-zeitlich-veraenderliche-felder`,
> `11-elektrotechnische-anwendungen`, `12-elektromagnetische-wellen`,
> `13-elektromagnetische-wellen-im-vakuum`, `14-elektromagnetische-wellen-in-materie`
> Drei Fragen je Thema, davon höchstens eine `mc-multi`.
> Fach-Profil: Physik.
> Schon vergeben (nicht wiederholen): 01–08 aus dem vorigen Lauf.
>
> Die Prüfungsordnung des Kurses — nur zur Orientierung, nicht ausgeben:
>
> ```
> === ORDNUNG ===
> titel: Schriftliche Prüfung
> fragen: 20
> punkte_je_frage: 1.6
> regel: streng
> zeit_minuten: 120
> noten: 29 sehr gut | 25 gut | 21 befriedigend | 17 genügend
> gebiet: Magnetfelder und Induktion | 09-statische-magnetfelder, 10-zeitlich-veraenderliche-felder, 11-elektrotechnische-anwendungen
> gebiet: Elektromagnetische Wellen | 12-elektromagnetische-wellen, 13-elektromagnetische-wellen-im-vakuum, 14-elektromagnetische-wellen-in-materie
> ```

---

## PROMPT (ab hier kopieren)

Du schreibst Prüfungsfragen für eine Lernplattform. Deine Ausgabe wird maschinell
eingelesen, deshalb ist die **Formatierung verbindlich**. Ein Formfehler bricht
den Import ab, und dann wird nichts geschrieben.

### Was du ausgibst

Genau einen `=== FRAGENPOOL ===`-Block, darunter die Fragen, darunter den
Nachspann. Keine Einleitung, kein Fazit, keine Zusammenfassung, keine Rückfrage
vorab. Keine Code-Zäune um die Ausgabe.

**Was du nicht ausgibst:** keinen `=== KURS ===`-Block, keinen `=== ORDNUNG ===`-Block,
keine `=== DATEI: ===`-Abschnitte, keine Theorietexte, keine Karteikarten. Der
Fragenpool rührt weder den Kurs noch die Themen an.

### Der Block

```
=== FRAGENPOOL ===

--- FRAGE ---
thema: 02-elektrostatik
typ: mc-single
frage: Der Abstand zwischen zwei Punktladungen wird verdoppelt, alle anderen Größen bleiben gleich. Wie verändert sich die Coulombkraft zwischen ihnen?
- Sie halbiert sich
- Sie bleibt unverändert
- Sie sinkt auf ein Viertel
- Sie vervierfacht sich
richtig: 3
quelle: Skript Kap. 2
erklaerung: Die Coulombkraft ist F = (1/4πε₀)·|q₁q₂|/r², also umgekehrt proportional zu r². Eine Verdopplung von r ergibt den Faktor 1/2² = 1/4. „Halbiert sich" verwechselt eine lineare mit einer quadratischen Abhängigkeit; „vervierfacht sich" wäre die Folge einer Halbierung des Abstands.

--- FRAGE ---
thema: 05-kirchhoff-und-schaltungen
typ: mc-multi
frage: Welche Aussagen zu Reihen- und Parallelschaltung von Widerständen sind richtig?
- In der Reihenschaltung ist der Gesamtwiderstand größer als jeder Einzelwiderstand
- In der Parallelschaltung ist der Gesamtwiderstand größer als der kleinste Einzelwiderstand
- In der Parallelschaltung liegt an allen Widerständen dieselbe Spannung an
- In der Reihenschaltung ist der Strom in den Widerständen unterschiedlich groß
richtig: 1,3
quelle: Skript Kap. 5
erklaerung: In der Reihenschaltung addieren sich die Einzelwiderstände, die Summe ist größer als jeder Summand. In der Parallelschaltung liegt an allen Zweigen dieselbe Spannung an. Falsch ist die zweite Aussage: Der Ersatzwiderstand einer Parallelschaltung ist stets kleiner als der kleinste Einzelwiderstand. Falsch ist auch die vierte: In der Reihenschaltung fließt überall derselbe Strom.
```

### Die Felder

| Feld | Regel |
|---|---|
| `thema` | Ein Slug aus der Liste im Auftrag, **zeichengenau**. Nichts erfinden, nichts abkürzen. |
| `typ` | Nur `mc-single` oder `mc-multi`. Jeder andere Wert bricht den Import ab. |
| `frage` | Eine Zeile. Vollständiger Satz oder Aufgabenstellung. |
| Optionen | Genau **vier** Zeilen, jede beginnt mit `- `. |
| `richtig` | 1-basiert. `mc-single`: genau eine Zahl. `mc-multi`: kommagetrennt, mindestens zwei und höchstens drei — alle vier richtig wird abgewiesen. |
| `quelle` | Optional, Folien- oder Kapitelangabe (`Folien 41–58`). |
| `erklaerung` | Eine Zeile, 2–4 Sätze. Letztes Feld im Block. |

**Nicht schreiben:** kein `punkte:` (die Punkte kommen aus der Prüfungsordnung,
ein eigenes Feld wird abgewiesen), kein `id:` (vergibt der Importer), kein
`pruefer:`, kein `toleranz:`, kein `einheit:`.

**Alles einzeilig.** Der Leser geht Zeile für Zeile: Eine Fortsetzungszeile, die
mit `- ` beginnt, wird zur fünften Antwortoption; eine, die mit `wort:` beginnt,
wird zu einem Feld. Umbrich weder die Frage noch die Erklärung.

### Wo die richtige Antwort steht

Die App mischt die Antwortoptionen **nicht**. Wo du die Lösung hinschreibst,
dort steht sie in der Prüfung. Im AC1-Bestand lag sie einmal in 87 von 108
Fragen an zweiter Stelle — wer nichts wusste und immer die zweite ankreuzte, kam
auf 80 % richtig.

**Verteile die Lösung über alle vier Plätze.** Kein Platz trägt mehr als 40 %,
keiner weniger als 12 % der Fragen. Bei 18 Fragen heißt das 3 bis 7 je Platz.
Gemischt, nicht als Muster — nicht 1,2,3,4,1,2,3,4.

Bei `mc-multi` muss über den ganzen Lauf **jeder der vier Plätze in mindestens
einer Frage Teil der Lösung** sein.

### Wie lang die Optionen sind

Die richtige Antwort darf nicht die längste sein. Sie trug früher die Begründung
mit sich, während die Ablenker Schlagworte blieben, und war dadurch in vier von
fünf Fällen ohne Fachwissen zu erraten.

Die Optionen sind **knappe Behauptungen von ähnlicher Länge**. Die Begründung
gehört in `erklaerung`, nirgendwo sonst.

### Woraus gute Fragen bestehen

- **Nur Stoff aus den Folien.** Nichts dazuerfinden. Was fachlich nötig ist, aber
  nicht in der Quelle steht: `[ERGÄNZT]` dahinter. Unleserliches, Mehrdeutiges,
  Geratenes: `[UNSICHER: was genau]`. Niemals still raten.
- **Nach dem Warum fragen, nicht nach dem Was.** Keine reinen Definitionsfragen
  („Was ist die Kapazität?"). Frag nach dem Schritt, an dem es klemmt: welche
  Voraussetzung fehlt, was ändert sich, wenn eine Größe verdoppelt wird, welcher
  Denkfehler steckt in einer Behauptung.
- **Ablenker sind typische Denkfehler**, nicht offensichtlicher Unsinn: die
  falsche Zehnerpotenz, das vergessene Quadrat, die verwechselte lineare und
  quadratische Abhängigkeit, die Umkehrung eines Satzes ohne seine Gültigkeit,
  der vergessene Randfall.
- **Prüfungsniveau, nicht Quizniveau.** Diese Fragen stehen in der
  Prüfungssimulation. Eine Frage, die sich aus einer einzigen Folie ablesen
  lässt, gehört ins Quiz, nicht hierher.
- **Keine Wiederholung.** Keine zwei Fragen mit demselben Kern, auch nicht über
  Themengrenzen hinweg. Wenn dieselbe Regel im Grundlagen- und im
  Anwendungskapitel vorkommt, wird sie einmal gefragt — in dem Kapitel, dessen
  Thema sie ist.

### Was in der Erklärung steht

Die fertige Begründung, sonst nichts. Sie sagt, **warum** die markierte Antwort
richtig ist, und **warum die Ablenker es nicht sind**.

**Keine Denkprotokolle.** Kein „warte", „hmm", „nochmal", „korrekte Antwort",
„ich denke", „vermutlich", „müsste wohl". Was du beim Rechnen gedacht hast,
steht nicht in der Musterlösung. Eine Erklärung, die den eigenen Rechenweg
korrigiert, wird abgewiesen — dann schreibst du die Frage neu.

**Steht in den Optionen eine Zahl, steht der Wert der richtigen Option auch in
der Erklärung.** Ein Rechenweg, der auf eine andere Zahl führt als die markierte
Antwort, ist eine falsche Musterlösung, und die ist schlimmer als gar keine: sie
sagt dem Lernenden, seine richtige Rechnung sei falsch.

### Formelsatz — nimm das Profil aus dem Auftrag

**Chemie (AC, OC, PC, BC): Unicode-Klartext, kein LaTeX.**
Richtig: `A = ε · c · d`, `c = 1×10⁻⁴ mol/L`, `λmax`, `H₂O`
Falsch: `$A = \epsilon c d$`, `A = epsilon*c*d`
Nutze: · × → ← ⇌ ≈ ≤ ≥ ° ⁻¹ ⁰¹²³⁴⁵⁶⁷⁸⁹ ₀₁₂₃₄₅₆₇₈₉ α β γ δ ε λ ν σ μ Δ Σ Ω
Summenformeln dürfen flach stehen (`H2SO4`), die App stellt sie selbst tief.

**Physik und Mathematik: LaTeX in `$…$`**, im Fließtext eingebettet.
Einheiten in `\mathrm{}` mit `\ ` davor: `$9{,}81\ \mathrm{m/s^2}$`.
Dezimalkomma als `{,}`. Vektoren als `$\vec{v}$`, Mengen als `$\mathbb{R}$`.

Halte dich strikt an **eine** Variante. Ein gemischter Satz ist schlimmer als
jede der beiden.

### Wie viele Fragen

Jedes im Auftrag genannte Thema bekommt **mindestens eine** Frage — ein Thema
ohne Prüfungsfrage kann in keiner Übungsrunde vorkommen.

Darüber hinaus gilt: Die Prüfungssimulation zieht je Gebiet eine feste Zahl
Fragen und ersetzt eine Lücke **nicht** aus einem anderen Gebiet. Ein Gebiet
braucht deshalb mindestens so viele Fragen, wie die Ordnung dort zieht, besser
das Doppelte — sonst zeigt die Simulation „nur 2 von 4 Fragen".

Höchstens ein Drittel `mc-multi`; der Rest `mc-single`.

### Der Nachspann

Am Ende der Antwort, und nur dort:

```
=== VERGEBEN ===
- 09-statische-magnetfelder (3 Fragen)
- 10-zeitlich-veraenderliche-felder (3 Fragen)
```

Sind noch Themen offen, darunter zusätzlich:

```
=== FORTSETZUNG FOLGT ===
```

Beide Blöcke sind Notizen für den nächsten Lauf; der Importer lässt sie fallen.

## PROMPT-ENDE

---

## Danach (wieder für dich)

Antwort als eigene `.md` in `.source/<kurs>/` legen, Dateiname sprechend
(`pool-kap-09-14.md`). Dann:

```bash
npm run import -- .source/<kurs>/ --dry-run   # nur prüfen, nichts schreiben
npm run import -- .source/<kurs>/             # schreiben
npm run fragen:aehnlich                       # sinnverwandte Dubletten, kursweit
npm run lint && npm test && npm run build
```

**Vor jedem echten Lauf den Probelauf lesen.** Der Unterschied-Block zeigt, was
passieren würde. Steht bei „Fragen … geändert" eine Zahl, die nicht zu dem passt,
was du gerade geschrieben hast, greift der Lauf den Bestand an — dann erst
klären, warum.

Alles, was das Modell mit `[UNSICHER]`, `[ERGÄNZT]` oder `[ZUORDNEN]` markiert
hat, landet in `<quellordner>/report.md` — diese Liste abarbeiten.

Zwei Dinge, die erst beim Testlauf auffallen:

- **`entwurf: nein`** im Kurskopf erst setzen, wenn jedes Thema eine
  Prüfungsfrage hat. Vorher meldet `inhalte.test.ts` den Mangel nur; danach
  weist es ihn ab.
- **`pruefer:`-Zeilen im Kurskopf** müssen, wenn es sie gibt, die
  Gebiets-Kennungen der Ordnung sein — eine Poolfrage trägt ihr Gebiet als
  Gruppe (`Bezugssysteme und Elektrostatik` → `bezugssysteme-und-elektrostatik`).
  Eine leere Liste ist der sichere Fall: dann prüft der Test nichts.

Zum Nachsehen, wie ein fertiger Pool aussieht:
`.source/experimentale-physik-2/pool-probe.md`.
