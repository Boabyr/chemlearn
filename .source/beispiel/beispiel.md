=== DATEI: 01-testthema.md ===

# META
titel: Testthema
untertitel: Zum Prüfen des Importers
icon: 🧪
dauer_minuten: 45
quelle: Handprobe

# THEORIE

## Überschrift

Fließtext mit Formel A = ε · c · d und einer Tabelle:

| Symbol | Größe |
|---|---|
| A | Absorption |

# INTERAKTIV

typ: formula-calculator
formel_id: test-formel
formel_name: Testformel
gleichung: A = ε · c · d
variablen:
- id: A | label: Absorption | symbol: A | einheit: — | beschreibung: Extinktion
- id: eps | label: Koeffizient | symbol: ε | einheit: L·mol⁻¹·cm⁻¹ | beschreibung: molar
- id: c | label: Konzentration | symbol: c | einheit: mol/L | beschreibung: Molarität
- id: d | label: Schichtdicke | symbol: d | einheit: cm | beschreibung: Küvette
umstellungen:
- A = eps * c * d
- c = A / (eps * d)
- eps = A / (c * d)
hinweis1: Erster Hinweis.
hinweis2: Zweiter Hinweis.

# QUIZ

F1: Wie lautet die Beziehung zwischen A und T?
- A = T
- A = 1 - T
- A = -log(T)
- A = log(T)
RICHTIG: 3
ERKLÄRUNG: A = -log(T). Bei T = 1 ist A = 0.

F2: Bei welcher Absorption ist die Kalibriergerade am linearsten?
- A = 0.001–0.01
- A = 0.1–1.5
- A = 2–3
- A > 3
RICHTIG: 2
ERKLÄRUNG: Linearer Bereich A = 0.1–1.5, optimal etwa 0.4.

# FLASHCARDS

V: Lambert-Beer
R: A = ε · c · d, gilt für verdünnte Lösungen. [UNSICHER: Grenzwert aus Skript nicht lesbar]

V: Transmission
R: T = I/I₀, Bereich 0 bis 1.

=== PRÜFUNG ===
quelle: 2019-05-Lieberzeit
pruefer: lieberzeit
kurs: analytical-chemistry-1

--- FRAGE ---
typ: numeric
punkte: 4
thema: 02-lambert-beer
frage: Blindprobe 11,97 V, Probe 4,24 V. Transmission in Prozent?
richtig: 35.42
toleranz: 0.5
einheit: %
erklaerung: T = 4,24/11,97 = 35,42 %.

--- FRAGE ---
typ: mc-single
punkte: 2
thema: 01-grundlagen-spektroskopie
frage: Welche Aussage zur Transmission trifft zu?
- T liegt zwischen 0 und 1
- T ist immer größer als 1
- T hat die Einheit mol/L
- T ist gleich der Absorption
richtig: 1
erklaerung: T = I/I₀ liegt zwischen 0 und 1, ist also dimensionslos.
