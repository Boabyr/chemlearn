import type { Thema } from '../../../content/schema'

export const topic = {
  id: "27-winkelvergroesserung-und-lupe",
  title: "Winkelvergrößerung und Lupe",
  subtitle: "Sehwinkel, Standardsehweite und Brennweite",
  icon: "🔍",
  estimatedMinutes: 60,
  theory: `
## Sehwinkel und Winkelvergrößerung

Der **Sehwinkel** α eines Objekts der Größe G im Abstand s zum Auge ist definiert durch:



\\[
\\tan\\alpha = \\frac{G}{s}.
\\]



Für kleine Winkel gilt die Näherung:



\\[
\\alpha \\approx \\frac{G}{s}.
\\]



Die **Winkelvergrößerung** eines optischen Instruments ist:



\\[
V = \\frac{\\alpha}{\\alpha_0},
\\]



wobei α der Sehwinkel **mit** Instrument und α₀ der Sehwinkel **ohne** Instrument ist.

Die Standardsehweite beträgt:



\\[
s_0 = 250\\,\\mathrm{mm}.
\\]



Damit gilt ohne Instrument:



\\[
\\alpha_0 \\approx \\frac{G}{s_0}.
\\]



## Lupe

Eine Lupe ist eine Sammellinse, die das Objekt vergrößert erscheinen lässt, indem sie das Objekt in die Nähe der Brennebene bringt. Das Auge betrachtet das Bild unter einem größeren Sehwinkel.

### Objekt in der Brennebene

Liegt das Objekt im Abstand der Brennweite f zur Lupe, entsteht ein **Parallelstrahlbündel**, das das Auge entspannt betrachten kann.

Der Sehwinkel mit Lupe ist:



\\[
\\alpha \\approx \\frac{G}{f}.
\\]



Damit folgt die Winkelvergrößerung:



\\[
V_L = \\frac{\\alpha}{\\alpha_0}
= \\frac{G/f}{G/s_0}
= \\frac{s_0}{f}.
\\]



### Bedingungen

- **VL > 1**, wenn **f < s₀**  
- Je kleiner die Brennweite, desto größer die Vergrößerung  
- Die Lupe erzeugt ein **virtuelles, vergrößertes Bild**

## Bedeutung

Die Lupe ist das einfachste vergrößernde optische Instrument und bildet die Grundlage für:

- Okulare in Fernrohren  
- Okulare in Mikroskopen  
- Vergrößerung kleiner Strukturen im Alltag

## Zahlenbeispiel

Eine Lupe mit $f = 25\\,\\mathrm{mm}$ liefert


\\[
V_L = \\frac{s_0}{f} = \\frac{250\\,\\mathrm{mm}}{25\\,\\mathrm{mm}} = 10.
\\]


Das ist die auf Lupen aufgedruckte Zahl „10×". Sie ist keine Materialeigenschaft, sondern eine Konvention: Sie enthält die willkürlich festgelegte Bezugssehweite von $250\\,\\mathrm{mm}$. Wer ein Objekt näher als $s_0$ ans Auge bringen kann, sieht es auch ohne Lupe größer — nur bleibt es dann unscharf, weil das Auge nicht beliebig nah akkommodieren kann. Genau diese Grenze hebt die Lupe auf.

## Bild in der Standardsehweite

Legt man das Objekt etwas innerhalb der Brennweite, entsteht das virtuelle Bild nicht im Unendlichen, sondern in der Standardsehweite. Dann gilt


\\[
V_L = \\frac{s_0}{f} + 1.
\\]


Der Gewinn von eins ist klein, das Auge muss dafür aber dauernd akkommodieren und ermüdet schneller. Für längeres Arbeiten wird deshalb die entspannte Betrachtung mit dem Bild im Unendlichen bevorzugt.

## Grenzen der Vergrößerung

Kleine Brennweiten bedeuten stark gekrümmte Flächen und damit wachsende Abbildungsfehler, vor allem sphärische Aberration und Farbsäume. Einfache Einzellinsen sind praktisch bis etwa 10× brauchbar; darüber setzt man mehrlinsige Lupen ein oder geht zum Mikroskop über, das die Vergrößerung auf zwei Stufen verteilt.

## Lupe und Auge als System

Streng genommen vergrößert die Lupe nicht das Objekt, sondern das Netzhautbild. Die Kette ist: Objekt, Lupe, Auge. Nur weil die Lupe das Licht so aufbereitet, dass das Auge ein nahes Objekt scharf sehen kann, wächst der Sehwinkel. Deshalb hängt der praktische Nutzen auch vom Betrachter ab: Ein kurzsichtiges Auge kann von Natur aus näher heranrücken und gewinnt durch dieselbe Lupe weniger als ein weitsichtiges. Die aufgedruckte Vergrößerung bezieht sich immer auf das normalsichtige Auge.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "lupe-vergroesserung",
        name: "Winkelvergrößerung Lupe",
        equation: "V = s0 / f",
        variables: [
          { id: "V", label: "Vergrößerung", symbol: "V", unit: "—", description: "Winkelvergrößerung der Lupe" },
          { id: "s0", label: "Standardsehweite", symbol: "s0", unit: "m", description: "Standardsehweite (0.25 m)" },
          { id: "f", label: "Brennweite", symbol: "f", unit: "m", description: "Brennweite der Lupe" },
        ],
        umstellungen: [
          { solveFor: "V", expr: "s0 / f" },
          { solveFor: "f", expr: "s0 / V" },
          { solveFor: "s0", expr: "V * f" },
        ],
        hints: ["VL > 1 für f < s0.", "Objekt in Brennebene → entspannte Betrachtung."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie lautet die Winkelvergrößerung einer Lupe?", options: ["V = f / s0", "V = G / s0", "V = s0 / f", "V = G / f"], correct: 2, explanation: "Objekt in Brennebene → α ≈ G/f → V = s0/f." },
    { id: "q2", question: "Wann ist VL > 1?", options: ["Wenn f > s0", "Wenn f = s0", "Wenn f = G", "Wenn f < s0"], correct: 3, explanation: "Kleine Brennweite → große Vergrößerung." },
    { id: "q3", question: "Was ist s0?", options: ["Standardsehweite", "Brennweite der Lupe", "Bildweite", "Tubuslänge"], correct: 0, explanation: "s0 = 250 mm." },
    { id: "q4", question: "Was entsteht bei Objekt in Brennebene?", options: ["Divergentes Bündel", "Parallelstrahlbündel", "Konvergentes Bündel", "Kein Bild"], correct: 1, explanation: "Lupe erzeugt parallele Strahlen." },
    { id: "q5", question: "Wovon hängt α ab?", options: ["Nur von f", "Nur von G", "Von G und s", "Nur von s"], correct: 2, explanation: "α ≈ G/s." },
    { id: "q6", question: "Was erzeugt die Lupe?", options: ["Reelles Bild", "Umgekehrtes Bild", "Kein Bild", "Virtuelles Bild"], correct: 3, explanation: "Lupe erzeugt ein virtuelles vergrößertes Bild." },
  ],
  flashcards: [
    { id: "0o7ddo9", front: "Winkelvergrößerung Lupe", back: "V = s0/f. Kleine Brennweite → große Vergrößerung." },
    { id: "0yhf4mt", front: "Sehwinkel", back: "α ≈ G/s für kleine Winkel. Bestimmt die wahrgenommene Größe." },
    { id: "13tn2qk", front: "Standardsehweite", back: "s0 = 250 mm. Referenz für α₀." },
    { id: "1i11ajd", front: "Objekt in Brennebene", back: "Führt zu Parallelstrahlen → entspannte Betrachtung." },
    { id: "08uhm6l", front: "Virtuelles Bild", back: "Lupe erzeugt ein vergrößertes virtuelles Bild." },
    { id: "0g6ncan", front: "Bedeutung der Lupe", back: "Grundlage für Okulare in Fernrohr und Mikroskop." },
  ],
} satisfies Thema;
