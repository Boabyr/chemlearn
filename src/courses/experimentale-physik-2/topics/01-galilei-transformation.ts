import type { Thema } from '../../../content/schema'

export const topic = {
  id: "01-galilei-transformation",
  title: "Galilei-Transformation",
  subtitle: "Bewegungen im Alltag",
  icon: "🚆",
  estimatedMinutes: 60,
  theory: `
## Inertialsysteme und Bezugssysteme

Die Galilei-Transformation beschreibt, wie sich Raum- und Zeitkoordinaten zwischen zwei Inertialsystemen verhalten, die sich mit konstanter Geschwindigkeit relativ zueinander bewegen. In der Quelle werden die Systeme als $S$ (Bahnsteig) und $S'$ (Zug) bezeichnet. Das System $S'$ bewegt sich mit der Geschwindigkeit $v_x$ relativ zu $S$. Ein Inertialsystem ist ein Bezugssystem, in dem die Newtonschen Axiome gelten und keine beschleunigten Bewegungen des gesamten Systems auftreten.

Die klassische Mechanik nimmt an, dass die Zeit in allen Inertialsystemen gleich vergeht. Das bedeutet, dass Beobachter in $S$ und $S'$ dieselbe Zeitkoordinate verwenden können: $t = t'$. Diese **absolute Zeit** entspricht der Alltagserfahrung, in der Uhren unabhängig vom Bewegungszustand gleich laufen.

## Galilei-Transformation der Koordinaten

Die Quelle gibt die Transformation zwischen $S$ und $S'$ wie folgt an:


\\[
x = x' + v_x t,\\quad y = y',\\quad z = z',\\quad t = t'.
\\]



Die $x$-Koordinate im ruhenden System $S$ ergibt sich aus der Koordinate $x'$ im bewegten System $S'$ plus dem Verschiebungsterm $v_x t$. Die Koordinaten $y$ und $z$ bleiben unverändert, da die Relativbewegung nur entlang der $x$-Achse erfolgt.

Diese Beziehung entspricht der gewöhnlichen Erfahrung: Sitzt man im Zug und wirft einen Ball, so beschreibt man seine Bewegung relativ zum Zug mit $x'$, während ein Beobachter am Bahnsteig dieselbe Bewegung mit $x$ beschreibt. Die Differenz ist genau die Strecke, die der Zug in der Zeit $t$ zurückgelegt hat.

## Geschwindigkeitsaddition nach Galilei

Durch Ableitung der Transformationsgleichung nach der Zeit erhält man die Beziehung der Geschwindigkeiten. Aus $x = x' + v_x t$ folgt:


\\[
\\frac{\\mathrm{d}x}{\\mathrm{d}t} = \\frac{\\mathrm{d}x'}{\\mathrm{d}t} + v_x.
\\]


Mit $t = t'$ und damit $\\mathrm{d}t = \\mathrm{d}t'$ ergibt sich:


\\[
v_x = v'_x + v_x,\\quad v_y = v'_y,\\quad v_z = v'_z.
\\]



Die Quelle fasst dies als „Addition der Geschwindigkeiten“ zusammen: Die Geschwindigkeit eines Objekts im System $S$ ergibt sich aus der Geschwindigkeit im System $S'$ plus der Relativgeschwindigkeit der Systeme.

Beispiel aus der Quelle:
- Zuggeschwindigkeit: $v_{x,\\mathrm{Zug}} = 100\\,\\mathrm{m/s}$
- Ballgeschwindigkeit relativ zum Zug: $v_b = 50\\,\\mathrm{m/s}$

Nach hinten:


\\[
v_{x,h} = -v_b + v_{x,\\mathrm{Zug}} = -50 + 100 = 50\\,\\mathrm{m/s}.
\\]



Nach vorne:


\\[
v_{x,v} = v_b + v_{x,\\mathrm{Zug}} = 50 + 100 = 150\\,\\mathrm{m/s}.
\\]



## Grenzen der Galilei-Transformation

Die Quelle zeigt anschließend ein Beispiel mit einer Lichtkugel. In $S'$ gilt:


\\[
x'^2 + y'^2 + z'^2 = c^2 t'^2.
\\]



Transformiert man diese Gleichung nach $S$, erhält man:


\\[
(x - v_x t)^2 + y^2 + z^2 = c^2 t^2.
\\]



Die Form der Gleichung ändert sich. Das bedeutet: Die Galilei-Transformation erhält die Lichtgeschwindigkeit nicht. Die Ausbreitung des Lichts sieht in verschiedenen Inertialsystemen unterschiedlich aus, wenn man klassische Koordinatentransformationen verwendet.

Dies ist der Grund, warum die klassische Mechanik nicht mit elektromagnetischen Phänomenen kompatibel ist. Die Quelle betont, dass die Galilei-Transformation der gewöhnlichen Erfahrung entspricht, aber bei Lichtgeschwindigkeit scheitert.

## Fluss-Beispiel und Michelson-Morley-Experiment

Als Analogie führt die Quelle ein Fluss-Beispiel ein: Ein Boot fährt einmal parallel und einmal senkrecht zur Strömung. In einem Medium unterscheiden sich die Zeiten für parallele und senkrechte Wege.

Überträgt man diese Idee auf Licht, erwartet man in einem „Lichtäther“ unterschiedliche Laufzeiten je nach Richtung zur Erdbewegung. Die klassische Physik hätte daher im Michelson-Morley-Experiment einen Unterschied im Interferenzmuster erwartet. Das Experiment zeigt jedoch keinen solchen Unterschied.

Dies markiert den Übergang zur speziellen Relativitätstheorie, in der die Lichtgeschwindigkeit in allen Inertialsystemen gleich ist und die Galilei-Transformation durch die Lorentz-Transformation ersetzt wird.

## Physikalische Bedeutung

Die Galilei-Transformation ist gültig für:
- kleine Geschwindigkeiten gegenüber der Lichtgeschwindigkeit,
- klassische Mechanik,
- Situationen mit absoluter Zeit.

Sie bildet den mathematischen Rahmen für Bewegungen im Alltag und ist der Ausgangspunkt für die spezielle Relativitätstheorie.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "galilei-transformation",
        name: "Galilei-Transformation in x-Richtung",
        equation: "x = x_prime + v_x * t",
        variables: [
          { id: "x", label: "Position im System S", symbol: "x", unit: "m", description: "Ort des Objekts im ruhenden System S" },
          { id: "x_prime", label: "Position im System S'", symbol: "x'", unit: "m", description: "Ort des Objekts im bewegten System S'" },
          { id: "v_x", label: "Relativgeschwindigkeit", symbol: "v_x", unit: "m/s", description: "Geschwindigkeit von S' relativ zu S entlang der x-Achse" },
          { id: "t", label: "Zeit", symbol: "t", unit: "s", description: "Gemeinsame Zeitkoordinate beider Systeme" },
        ],
        umstellungen: [
          { solveFor: "x", expr: "x_prime + v_x * t" },
          { solveFor: "x_prime", expr: "x - v_x * t" },
          { solveFor: "v_x", expr: "(x - x_prime) / t" },
          { solveFor: "t", expr: "(x - x_prime) / v_x" },
        ],
        hints: ["Die Galilei-Transformation setzt voraus, dass die Zeit in beiden Systemen gleich ist (t = t').", "Mit der Gleichung lässt sich aus Relativgeschwindigkeit und Zeit die Verschiebung zwischen den Koordinaten berechnen."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Welche Beziehung besteht laut Quelle zwischen den Koordinaten $x$ und $x'$?", options: ["$x = x' + v_x t$", "$x = x' - v_x t$", "$x' = x + v_x t$", "$x = v_x x' t$"], correct: 0, explanation: "Die Quelle gibt explizit $x = x' + v_x t$ an." },
    { id: "q2", question: "Warum kommen laut Quelle zwei geworfene Tennisbälle im Zug gleichzeitig an?", options: ["Weil die Zeit im Zug langsamer vergeht", "Weil die Galilei-Transformation die Zeit gleich setzt ($t = t'$)", "Weil die Geschwindigkeiten der Bälle im Zug unterschiedlich sind", "Weil der Bahnsteig kein Inertialsystem ist"], correct: 1, explanation: "Die Galilei-Transformation nimmt absolute Zeit an, daher bleibt Gleichzeitigkeit erhalten." },
    { id: "q3", question: "Welche Bedingung wird zur Herleitung der Geschwindigkeitsaddition verwendet?", options: ["$x = x'$", "$y = y'$", "$t = t'$", "$z = z'$"], correct: 2, explanation: "Für die Ableitung wird $\\mathrm{d}t = \\mathrm{d}t'$ verwendet." },
    { id: "q4", question: "Warum verändert sich die Gleichung einer Lichtkugel unter der Galilei-Transformation?", options: ["Weil die Lichtgeschwindigkeit im Zug größer ist", "Weil die Zeit im System $S'$ schneller vergeht", "Weil die Koordinate $y$ mittransformiert wird", "Weil sie die Lichtgeschwindigkeit nicht invariant lässt"], correct: 3, explanation: "Die Form der Gleichung ändert sich, die Lichtgeschwindigkeit bleibt nicht erhalten." },
    { id: "q5", question: "Ein Zug fährt mit $100\\,\\mathrm{m/s}$. Ein Ball wird mit $50\\,\\mathrm{m/s}$ nach hinten geworfen. Welche Geschwindigkeit hat der Ball im System $S$?", options: ["$50\\,\\mathrm{m/s}$", "$-150\\,\\mathrm{m/s}$", "$-50\\,\\mathrm{m/s}$", "$150\\,\\mathrm{m/s}$"], correct: 0, explanation: "Nach Quelle: $v_{x,h} = -50 + 100 = 50\\,\\mathrm{m/s}$." },
    { id: "q6", question: "Ein Ball wird mit $50\\,\\mathrm{m/s}$ nach vorne geworfen. Zuggeschwindigkeit: $100\\,\\mathrm{m/s}$. Welche Geschwindigkeit hat der Ball im System $S$?", options: ["$50\\,\\mathrm{m/s}$", "$150\\,\\mathrm{m/s}$", "$100\\,\\mathrm{m/s}$", "$200\\,\\mathrm{m/s}$"], correct: 1, explanation: "Nach Quelle: $v_{x,v} = 50 + 100 = 150\\,\\mathrm{m/s}$." },
  ],
  flashcards: [
    { id: "0qho3dq", front: "Definition der Galilei-Transformation", back: "Beziehung der Koordinaten zwischen zwei Inertialsystemen: $x = x' + v_x t$, $y = y'$, $z = z'$, $t = t'$." },
    { id: "0qwstfc", front: "Absolute Zeit", back: "Die Zeit ist in beiden Systemen gleich ($t = t'$). Gleichzeitigkeit bleibt erhalten." },
    { id: "0aucwkz", front: "Geschwindigkeitsaddition", back: "Aus $x = x' + v_x t$ folgt $v_x = v'_x + v_x$. Geschwindigkeiten werden linear addiert." },
    { id: "01pjxyj", front: "Beispiel Ballwurf", back: "Zug: $100\\,\\mathrm{m/s}$, Ball: $50\\,\\mathrm{m/s}$. Nach hinten: $50\\,\\mathrm{m/s}$, nach vorne: $150\\,\\mathrm{m/s}$." },
    { id: "1isu1c4", front: "Lichtkugel in $S'$ und $S$", back: "$x'^2 + y'^2 + z'^2 = c^2 t'^2$ wird zu $(x - v_x t)^2 + y^2 + z^2 = c^2 t^2$. Form ändert sich → Lichtgeschwindigkeit nicht invariant." },
    { id: "037phjl", front: "Übergang zur Relativitätstheorie", back: "Galilei gilt für kleine Geschwindigkeiten. Da Lichtgeschwindigkeit nicht invariant ist, folgt die Lorentz-Transformation." },
  ],
} satisfies Thema;
