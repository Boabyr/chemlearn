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
- id: probe | label: Probeklausur | icon: 📄

=== DATEI: 01-gleichfoermige-bewegung.md ===

# META
titel: Gleichförmige und beschleunigte Bewegung
untertitel: Weg, Geschwindigkeit, Beschleunigung
icon: 🏃
dauer_minuten: 75
quelle: Beispieldatei — kein echtes Skript

# THEORIE

## Die Grundgrößen der Kinematik

Die Kinematik beschreibt Bewegungen, ohne nach ihren Ursachen zu fragen. Sie
kommt mit drei Größen aus: dem Ort, der Geschwindigkeit und der Beschleunigung,
jeweils als Funktion der Zeit. Kräfte spielen erst in der Dynamik eine Rolle.

Bei einer **gleichförmigen Bewegung** bleibt die Geschwindigkeit konstant. Der
zurückgelegte Weg wächst dann linear mit der Zeit, $s = v \cdot t$, und die
Geschwindigkeit ist der Quotient $v = \frac{s}{t}$. Im Weg-Zeit-Diagramm ergibt
das eine Gerade, deren Steigung die Geschwindigkeit ist. Im
Geschwindigkeit-Zeit-Diagramm ist es eine Waagrechte, und die Fläche unter ihr
ist wieder der Weg.

| Größe | Symbol | Einheit |
|---|---|---|
| Weg | s | m |
| Geschwindigkeit | v | m/s |
| Beschleunigung | a | m/s² |
| Zeit | t | s |

## Gleichmäßig beschleunigte Bewegung

Ändert sich die Geschwindigkeit gleichmäßig, spricht man von einer gleichmäßig
beschleunigten Bewegung. Die Beschleunigung ist dann die zeitliche Änderung der
Geschwindigkeit, $a = \frac{\Delta v}{\Delta t}$. Aus dem Ruhezustand heraus
gilt $v = a \cdot t$ und $s = \frac{1}{2} a t^2$. Der freie Fall ist der
wichtigste Sonderfall: dort ist die Beschleunigung die Fallbeschleunigung
$g = 9{,}81\ \mathrm{m/s^2}$, solange der Luftwiderstand vernachlässigt werden
darf.

Aus diesen beiden Gleichungen folgt durch Einsetzen die zeitfreie Form
$v^2 = 2 a s$. Sie ist praktisch, wenn die Zeit weder gegeben noch gesucht ist —
etwa bei der Frage, aus welcher Höhe ein Körper fallen muss, um eine bestimmte
Aufprallgeschwindigkeit zu erreichen.

## Bezugssysteme und Vorzeichen

Jede Angabe einer Geschwindigkeit gilt nur bezogen auf ein Bezugssystem. Ein
Fahrgast ruht gegenüber dem Zug und bewegt sich gegenüber dem Bahnsteig. Beide
Aussagen sind richtig; sie beantworten verschiedene Fragen.

Vorzeichen sind kein Nebenschauplatz. Wird die Richtung nach oben als positiv
gewählt, ist die Fallbeschleunigung negativ. Wer das Vorzeichen zweimal
umdreht, rechnet einen steigenden Körper als fallenden. Es lohnt sich, Achse
und Nullpunkt vor der ersten Zeile Rechnung hinzuschreiben.

Bei Messreihen bezeichnet man die einzelnen Wiederholungen oft mit V1, V2 und
V3, den Stichprobenumfang mit N2. Das sind Bezeichner, keine chemischen
Formeln — deshalb steht der Formelsatz dieses Kurses auf `aus`.

## Mittlere und momentane Geschwindigkeit

Die mittlere Geschwindigkeit ist der gesamte Weg geteilt durch die gesamte
Zeit. Sie sagt nichts darüber, was zwischendurch passiert ist: dieselbe mittlere
Geschwindigkeit kann aus einer ruhigen Fahrt stammen oder aus einer Folge von
Sprints und Pausen. Die momentane Geschwindigkeit ist dagegen der Grenzwert
dieses Quotienten für immer kürzere Zeitspannen, also die Ableitung des Ortes
nach der Zeit.

Im Weg-Zeit-Diagramm entspricht die mittlere Geschwindigkeit der Steigung der
Sekante zwischen Anfangs- und Endpunkt, die momentane der Steigung der Tangente
im betrachteten Punkt. Bei einer gleichförmigen Bewegung fallen beide zusammen,
weil Sekante und Tangente dieselbe Gerade sind. Genau deshalb ist sie der
einfachste Fall und der übliche Einstieg: alles, was später an Ableitungen und
Integralen dazukommt, lässt sich an ihr überprüfen, weil man das Ergebnis schon
kennt.

# INTERAKTIV

typ: formula-calculator
formel_id: gleichfoermige-bewegung
formel_name: Gleichförmige Bewegung
gleichung: s = v · t
variablen:
- id: s | label: Weg | symbol: s | einheit: m | beschreibung: Zurückgelegte Strecke
- id: v | label: Geschwindigkeit | symbol: v | einheit: m/s | beschreibung: Konstante Geschwindigkeit
- id: t | label: Zeit | symbol: t | einheit: s | beschreibung: Dauer der Bewegung
umstellungen:
- s = v * t
- v = s / t
- t = s / v
hinweis1: Einheitenprobe: (m/s) · s = m ✓
hinweis2: Gilt nur bei konstanter Geschwindigkeit — sonst über den Mittelwert rechnen.

# QUIZ

F1: Ein Körper legt in 4 s gleichförmig 20 m zurück. Wie groß ist v?
- 5 m/s
- 80 m/s
- 0,2 m/s
- 24 m/s
RICHTIG: 1
ERKLÄRUNG: v = s/t = 20 m / 4 s = 5 m/s. Der häufigste Fehler ist die Multiplikation statt der Division.

F2: Woran erkennt man im Weg-Zeit-Diagramm eine gleichförmige Bewegung?
- An einer Parabel
- An einer Geraden
- An einer Waagrechten
- An einem Sprung
RICHTIG: 2
ERKLÄRUNG: Konstante Geschwindigkeit heißt linear wachsender Weg, also eine Gerade. Eine Waagrechte hieße Stillstand.

F3: Aus der Ruhe heraus gilt für den Weg bei konstanter Beschleunigung
- s = a · t
- s = a · t²
- s = ½ a t²
- s = 2 a t²
RICHTIG: 3
ERKLÄRUNG: Der Faktor ½ kommt aus der Integration von v = a·t über die Zeit. Ohne ihn wird der Weg doppelt so groß gerechnet.

F4: Ein Stein fällt 2 s lang frei. Welche Geschwindigkeit hat er dann etwa?
- 4,9 m/s
- 9,8 m/s
- 19,6 m/s
- 39,2 m/s
RICHTIG: 3
ERKLÄRUNG: v = g·t = 9,81 m/s² · 2 s ≈ 19,6 m/s. Wer 9,8 wählt, hat die Zeit vergessen.

F5: Was besagt die zeitfreie Form v² = 2 a s?
- Sie ersetzt die Beschleunigung durch die Zeit
- Sie verknüpft Geschwindigkeit und Weg ohne Zeit
- Sie gilt nur im Vakuum
- Sie gilt nur bei konstanter Geschwindigkeit
RICHTIG: 2
ERKLÄRUNG: Sie entsteht durch Einsetzen von t = v/a in s = ½at². Die Zeit fällt heraus, sie ist weder gegeben noch gesucht.

F6: Ein Fahrgast sitzt im fahrenden Zug. Welche Aussage stimmt?
- Er ruht absolut
- Er bewegt sich absolut
- Er ruht gegenüber dem Zug
- Er ruht gegenüber dem Bahnsteig
RICHTIG: 3
ERKLÄRUNG: Geschwindigkeit gilt nur bezogen auf ein Bezugssystem. Gegenüber dem Bahnsteig bewegt er sich, gegenüber dem Zug nicht.

# FLASHCARDS

V: Gleichförmige Bewegung
R: Bewegung mit konstanter Geschwindigkeit. Es gilt s = v·t, im Weg-Zeit-Diagramm eine Gerade mit der Steigung v.

V: Definition der Beschleunigung
R: Zeitliche Änderung der Geschwindigkeit, a = Δv/Δt, Einheit m/s². Konstantes a heißt gleichmäßig beschleunigte Bewegung.

V: Weg bei konstanter Beschleunigung aus der Ruhe
R: s = ½·a·t². Der Faktor ½ stammt aus der Integration von v = a·t; ohne ihn ist der Weg doppelt so groß.

V: Zeitfreie Form
R: v² = 2·a·s. Entsteht durch Einsetzen von t = v/a; nützlich, wenn die Zeit weder gegeben noch gesucht ist.

V: Fallbeschleunigung
R: g ≈ 9,81 m/s² auf der Erdoberfläche. Gilt für den freien Fall, solange der Luftwiderstand vernachlässigbar bleibt.

V: Bezugssystem
R: Bezug, auf den Ort und Geschwindigkeit angegeben werden. Ohne Bezugssystem ist eine Geschwindigkeitsangabe unvollständig.
