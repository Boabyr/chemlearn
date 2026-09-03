import type { Thema } from '../../../content/schema'

export const topic = {
  id: "29-mikroskop",
  title: "Mikroskop",
  subtitle: "Objektivvergrößerung, Tubuslänge und Okular",
  icon: "🔬",
  estimatedMinutes: 75,
  theory: `
## Aufbau des Mikroskops

Ein Mikroskop besteht aus zwei Sammellinsen:

1. **Objektiv** – erzeugt ein vergrößertes, reelles, umgekehrtes Zwischenbild.
2. **Okular** – wirkt als Lupe und vergrößert das Zwischenbild weiter.

Zwischen Objektiv und Okular liegt der **Tubus**, dessen Länge die Gesamtvergrößerung beeinflusst.

Das Mikroskop ist ein **Zwei-Stufen-Vergrößerer**:  
Objektivvergrößerung × Okularvergrößerung.

---

## Objektivvergrößerung

Ein Objekt der Größe \\(G\\) befindet sich in der Objektweite \\(g_{\\mathrm{obj}}\\).  
Typisch gilt:



\\[
g_{\\mathrm{obj}} \\approx f_{\\mathrm{obj}}.
\\]



Damit liegt das Objekt knapp außerhalb der Brennweite des Objektivs.  
Die Linsengleichung lautet:



\\[
\\frac{1}{g_{\\mathrm{obj}}} + \\frac{1}{b_{\\mathrm{obj}}}
= \\frac{1}{f_{\\mathrm{obj}}}.
\\]



Für \\(g_{\\mathrm{obj}} \\approx f_{\\mathrm{obj}}\\) folgt:



\\[
b_{\\mathrm{obj}} \\gg f_{\\mathrm{obj}}.
\\]



Die Objektivvergrößerung ist:



\\[
V_{\\mathrm{obj}} = \\frac{b_{\\mathrm{obj}}}{f_{\\mathrm{obj}}}.
\\]



Die **Tubuslänge** ist:



\\[
t = b_{\\mathrm{obj}} - f_{\\mathrm{obj}}.
\\]



---

## Okularvergrößerung

Das Okular wirkt wie eine Lupe:



\\[
V_{\\mathrm{ok}} = \\frac{s_0}{f_{\\mathrm{ok}}},
\\]



mit der Standardsehweite:



\\[
s_0 = 250\\,\\mathrm{mm}.
\\]



---

## Gesamtvergrößerung

Die Gesamtvergrößerung ist das Produkt:



\\[
V_M = V_{\\mathrm{obj}} \\cdot V_{\\mathrm{ok}}
= \\frac{b_{\\mathrm{obj}}}{f_{\\mathrm{obj}}} \\cdot \\frac{s_0}{f_{\\mathrm{ok}}}.
\\]



Mit der Näherung \\(b_{\\mathrm{obj}} \\approx t\\):



\\[
V_M = \\frac{t\\,s_0}{f_{\\mathrm{obj}} f_{\\mathrm{ok}}}.
\\]



### Bedingungen für große Vergrößerung

- **kleine Objektivbrennweite**  
- **kleine Okularbrennweite**  
- **große Tubuslänge**

---

## Bedeutung

Das Mikroskop ist ein zentrales Instrument in:

- Biologie  
- Medizin  
- Materialwissenschaft  
- Nanotechnologie  

Es ermöglicht die Untersuchung kleinster Strukturen weit unterhalb der Auflösungsgrenze des menschlichen Auges.

## Zahlenbeispiel

Mit $f_\\mathrm{obj} = 4\\,\\mathrm{mm}$, $f_\\mathrm{ok} = 25\\,\\mathrm{mm}$ und einer Tubuslänge $t = 160\\,\\mathrm{mm}$ folgt


\\[
V_M = \\frac{t\\,s_0}{f_\\mathrm{obj} f_\\mathrm{ok}}
= \\frac{160\\cdot250}{4\\cdot25} = 400.
\\]


Auf den Bauteilen steht das getrennt als „40×" auf dem Objektiv und „10×" auf dem Okular; multipliziert ergibt sich dieselbe Zahl. Die Tubuslänge von $160\\,\\mathrm{mm}$ war lange genormt, damit Objektive verschiedener Hersteller austauschbar bleiben.

## Leere Vergrößerung

Die Vergrößerung lässt sich rechnerisch beliebig steigern, die Auflösung nicht: Sie ist durch die Beugung an der Objektivöffnung festgelegt. Wird stärker vergrößert, als die numerische Apertur hergibt, erscheint das Bild größer, aber nicht detailreicher — es zeigt nur größere Beugungsscheibchen. Man spricht von leerer Vergrößerung. Als Faustregel bleibt die sinnvolle Gesamtvergrößerung unterhalb des etwa Tausendfachen der numerischen Apertur.

## Beleuchtung

Zur Vergrößerungsoptik gehört ein Beleuchtungsstrahlengang. Beim Köhlerschen Verfahren wird die Lichtquelle so abgebildet, dass das Präparat gleichmäßig ausgeleuchtet ist und die Struktur der Lampe nicht im Bild erscheint. Kondensorblende und Aperturblende steuern dabei Kontrast und ausgenutzte Apertur — eine zu weit geschlossene Blende kostet Auflösung, eine zu weit geöffnete den Kontrast.

## Unendlich-Optik

Moderne Mikroskope arbeiten meist nicht mehr mit fester Tubuslänge, sondern mit unendlich korrigierten Objektiven: Das Objektiv erzeugt ein paralleles Strahlenbündel, eine separate Tubuslinse formt daraus das Zwischenbild. Der Vorteil ist der parallele Raum zwischen beiden — dort lassen sich Filter, Strahlteiler und Polarisatoren einfügen, ohne die Bildlage zu verschieben. Die Objektivvergrößerung ergibt sich dann als Verhältnis von Tubuslinsen- zu Objektivbrennweite, das übrige Rechenschema bleibt unverändert.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "mikroskop-vergroesserung",
        name: "Gesamtvergrößerung Mikroskop",
        equation: "VM = t * s0 / (fobj * fok)",
        variables: [
          { id: "VM", label: "Gesamtvergrößerung", symbol: "V_M", unit: "—", description: "Gesamtvergrößerung des Mikroskops" },
          { id: "t", label: "Tubuslänge", symbol: "t", unit: "m", description: "Abstand zwischen Objektivbild und Okular" },
          { id: "s0", label: "Standardsehweite", symbol: "s0", unit: "m", description: "Standardsehweite (0.25 m)" },
          { id: "fobj", label: "Objektivbrennweite", symbol: "f_obj", unit: "m", description: "Brennweite des Objektivs" },
          { id: "fok", label: "Okularbrennweite", symbol: "f_ok", unit: "m", description: "Brennweite des Okulars" },
        ],
        umstellungen: [
          { solveFor: "VM", expr: "t * s0 / (fobj * fok)" },
          { solveFor: "t", expr: "VM * fobj * fok / s0" },
          { solveFor: "fobj", expr: "t * s0 / (VM * fok)" },
          { solveFor: "fok", expr: "t * s0 / (VM * fobj)" },
        ],
        hints: ["Große Vergrößerung durch kleine fobj und fok.", "Tubuslänge bestimmt bobj."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie lautet die Gesamtvergrößerung eines Mikroskops?", options: ["t·s0/(fobj·fok)", "s0·fok/(t·fobj)", "fobj·fok/(t·s0)", "t·fok/(s0·fobj)"], correct: 0, explanation: "Produkt aus Objektiv- und Okularvergrößerung." },
    { id: "q2", question: "Was ist die Tubuslänge?", options: ["Abstand zwischen Objekt und Objektiv", "Abstand zwischen Objektivbild und Okular", "Brennweite des Okulars", "Bildweite des Objektivs"], correct: 1, explanation: "t = bobj − fobj." },
    { id: "q3", question: "Wann ist die Vergrößerung groß?", options: ["Große fobj", "Große fok", "Kleine fobj und fok", "Kleine Tubuslänge"], correct: 2, explanation: "Kleine Brennweiten → große Vergrößerung." },
    { id: "q4", question: "Was erzeugt das Objektiv?", options: ["Virtuelles Bild", "Reelles verkleinertes Bild", "Kein Bild", "Reelles vergrößertes Bild"], correct: 3, explanation: "Objektiv erzeugt vergrößertes reelles Bild." },
    { id: "q5", question: "Was ist Vok?", options: ["s0/fok", "fok/s0", "fobj/fok", "fobj/s0"], correct: 0, explanation: "Okular wirkt wie Lupe." },
    { id: "q6", question: "Was gilt für gobj?", options: ["gobj ≫ fobj", "gobj ≈ fobj", "gobj ≪ fobj", "gobj = 0"], correct: 1, explanation: "Objekt liegt nahe der Brennweite." },
  ],
  flashcards: [
    { id: "0u17mu8", front: "Gesamtvergrößerung", back: "V_M = t s0 / (fobj fok). Produkt aus Objektiv und Okular." },
    { id: "1irecah", front: "Objektivvergrößerung", back: "Vobj = bobj/fobj. Große bobj → große Vergrößerung." },
    { id: "0w03bfd", front: "Okularvergrößerung", back: "Vok = s0/fok. Kleine fok → große Vergrößerung." },
    { id: "1aszpa2", front: "Tubuslänge", back: "t = bobj − fobj. Bestimmt die Objektivvergrößerung." },
    { id: "1xx6dnt", front: "Bild des Objektivs", back: "Reelles, vergrößertes, umgekehrtes Zwischenbild." },
    { id: "1k5mxcg", front: "Bedeutung des Mikroskops", back: "Zentrales Instrument für Biologie, Medizin und Materialwissenschaft." },
  ],
} satisfies Thema;
