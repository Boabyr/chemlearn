import type { Thema } from '../../../content/schema'

export const topic = {
  id: "28-fernrohre-kepler-galilei",
  title: "Fernrohre – Kepler und Galilei",
  subtitle: "Winkelvergrößerung durch Objektiv und Okular",
  icon: "🔭",
  estimatedMinutes: 75,
  theory: `
## Grundprinzip des Fernrohrs

Fernrohre vergrößern den **Sehwinkel** eines weit entfernten Objekts.  
Ein Objekt in großer Entfernung sendet nahezu **Parallelstrahlen** zum Objektiv.

Das Fernrohr besteht aus:

- **Objektiv** (Sammellinse)  
- **Okular** (Lupe)

Das Objektiv erzeugt ein Bild, das vom Okular betrachtet wird.

## Keplersches (astronomisches) Fernrohr

### Aufbau

- Objektiv: Sammellinse  
- Okular: Sammellinse  
- Bild ist **reell**, **verkleinert**, **umgekehrt**

Für ein weit entferntes Objekt (g >> 2 fobj) entsteht das Bild in der Brennebene des Objektivs.

Das Okular betrachtet dieses Bild wie eine Lupe.

### Winkelvergrößerung

Für das Objektiv gilt:



\\[
\\alpha_0 = \\frac{B}{f_{\\mathrm{obj}}}.
\\]



Für das Okular gilt:



\\[
\\alpha = \\frac{B}{f_{\\mathrm{ok}}}.
\\]



Damit folgt:



\\[
V_F = \\frac{\\alpha}{\\alpha_0}
= \\frac{f_{\\mathrm{obj}}}{f_{\\mathrm{ok}}}.
\\]



### Eigenschaften

- Bild ist **umgekehrt**  
- Große Objektivbrennweite → große Vergrößerung  
- Kleine Okularbrennweite → große Vergrößerung

## Galilei-Fernrohr

### Aufbau

- Objektiv: Sammellinse  
- Okular: **Zerstreuungslinse**  
- Bild ist **aufrecht**, **virtuell**

Das Bild des Objektivs wäre reell, wird aber durch das Okular „abgefangen“ und als virtueller Gegenstand genutzt.

### Winkelvergrößerung

Auch hier gilt:



\\[
V_F = \\frac{f_{\\mathrm{obj}}}{f_{\\mathrm{ok}}}.
\\]



### Eigenschaften

- Bild ist **aufrecht**  
- Kürzere Bauform als Kepler  
- Geringeres Gesichtsfeld

## Bedeutung

Fernrohre sind zentrale Instrumente in:

- Astronomie  
- Navigation  
- Beobachtung weit entfernter Objekte

## Der gemeinsame Brennpunkt

Beide Bauformen haben gemeinsam, dass die bildseitige Brennebene des Objektivs mit der objektseitigen Brennebene des Okulars zusammenfällt. Daraus folgt die Baulänge: Beim Kepler-Fernrohr ist sie $f_\\mathrm{obj} + f_\\mathrm{ok}$, beim Galilei-Fernrohr wegen der negativen Okularbrennweite $f_\\mathrm{obj} - |f_\\mathrm{ok}|$ — also deutlich kürzer. Ein Aufbau, bei dem paralleles Licht hineingeht und paralleles Licht herauskommt, heißt afokal; er vergrößert Winkel, ohne selbst abzubilden.

## Austrittspupille und Lichtstärke

Die Austrittspupille hat den Durchmesser


\\[
d_\\mathrm{AP} = \\frac{D}{V_F}.
\\]


Ein Fernglas „$8\\times30$" hat also eine Austrittspupille von $3{,}75\\,\\mathrm{mm}$. Sie sollte nicht kleiner sein als die Pupille des Auges, sonst wird das Bild dunkel — und nicht wesentlich größer, sonst geht Licht am Auge vorbei verloren. Bei Nacht öffnet sich die Augenpupille auf etwa $7\\,\\mathrm{mm}$, weshalb für die Astronomie große Objektive bei mäßiger Vergrößerung gewählt werden.

## Zahlenbeispiel und Bildlage

Mit $f_\\mathrm{obj} = 900\\,\\mathrm{mm}$ und $f_\\mathrm{ok} = 20\\,\\mathrm{mm}$ ergibt sich $V_F = 45$. Das Kepler-Bild steht dabei auf dem Kopf, was in der Astronomie ohne Belang ist. Für die terrestrische Beobachtung fügt man ein Umkehrprisma ein — genau das steckt in der geknickten Bauform eines Fernglases — oder greift zur Galilei-Anordnung, die das aufrechte Bild ohne Zusatzoptik liefert, dafür aber nur ein kleines Gesichtsfeld hat.

## Spiegelteleskope

Große Objektivlinsen sind schwer, teuer und zeigen unvermeidlich Farbfehler, weil jedes Glas dispergiert. Deshalb arbeiten alle großen Teleskope mit einem Hohlspiegel als Objektiv: Reflexion ist von der Wellenlänge unabhängig, der Spiegel lässt sich von hinten abstützen und kann beliebig groß gebaut werden. Die Vergrößerungsformel bleibt dieselbe, nur tritt die Spiegelbrennweite an die Stelle der Objektivbrennweite. Für die Bildqualität zählt am Ende ohnehin weniger die Vergrößerung als der Öffnungsdurchmesser, denn er bestimmt sowohl die gesammelte Lichtmenge als auch die beugungsbegrenzte Auflösung.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "fernrohr-vergroesserung",
        name: "Winkelvergrößerung Fernrohr",
        equation: "V = fobj / fok",
        variables: [
          { id: "V", label: "Vergrößerung", symbol: "V", unit: "—", description: "Winkelvergrößerung des Fernrohrs" },
          { id: "fobj", label: "Objektivbrennweite", symbol: "f_obj", unit: "m", description: "Brennweite des Objektivs" },
          { id: "fok", label: "Okularbrennweite", symbol: "f_ok", unit: "m", description: "Brennweite des Okulars" },
        ],
        umstellungen: [
          { solveFor: "V", expr: "fobj / fok" },
          { solveFor: "fobj", expr: "V * fok" },
          { solveFor: "fok", expr: "fobj / V" },
        ],
        hints: ["Große fobj → große Vergrößerung.", "Kepler: umgekehrtes Bild; Galilei: aufrechtes Bild."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie lautet die Winkelvergrößerung eines Fernrohrs?", options: ["V = fok / fobj", "V = fobj * fok", "V = fobj − fok", "V = fobj / fok"], correct: 3, explanation: "Verhältnis der Brennweiten." },
    { id: "q2", question: "Welches Fernrohr erzeugt ein aufrechtes Bild?", options: ["Galilei", "Kepler", "Beide", "Keines"], correct: 0, explanation: "Galilei verwendet Zerstreuungslinse." },
    { id: "q3", question: "Was entsteht beim Kepler-Fernrohr im Objektiv?", options: ["Virtuelles Bild", "Reelles umgekehrtes Bild", "Reelles aufrechtes Bild", "Kein Bild"], correct: 1, explanation: "Sammellinse erzeugt reelles Bild." },
    { id: "q4", question: "Was führt zu großer Vergrößerung?", options: ["Kleine Objektivbrennweite", "Große Okularbrennweite", "Große Objektivbrennweite", "Keine Brennweite"], correct: 2, explanation: "V = fobj/fok." },
    { id: "q5", question: "Was ist typisch für Galilei?", options: ["Umgekehrtes Bild", "Reelles Bild", "Kein Bild", "Aufrechtes Bild"], correct: 3, explanation: "Zerstreuungslinse erzeugt aufrechtes Bild." },
    { id: "q6", question: "Was ist g >> 2 fobj?", options: ["Objekt sehr weit entfernt", "Objekt sehr nah", "Objekt im Brennpunkt", "Objekt hinter dem Okular"], correct: 0, explanation: "Fernrohr betrachtet weit entfernte Objekte." },
  ],
  flashcards: [
    { id: "16gnzp1", front: "Winkelvergrößerung Fernrohr", back: "V = fobj/fok. Große fobj → große Vergrößerung." },
    { id: "1g5ocnh", front: "Kepler-Fernrohr", back: "Zwei Sammellinsen, reelles umgekehrtes Bild." },
    { id: "039ud47", front: "Galilei-Fernrohr", back: "Sammellinse + Zerstreuungslinse, aufrechtes Bild." },
    { id: "1lbf7tf", front: "Parallelstrahlen", back: "Fernrohre arbeiten mit nahezu parallelen Strahlen." },
    { id: "1g56miq", front: "Bedeutung der Fernrohre", back: "Astronomie, Navigation, Beobachtung weit entfernter Objekte." },
    { id: "0si3s43", front: "Bildlage", back: "Kepler: reell; Galilei: virtuell." },
  ],
} satisfies Thema;
