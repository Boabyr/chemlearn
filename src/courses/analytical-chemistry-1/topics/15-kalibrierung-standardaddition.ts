import type { Thema } from '../../../content/schema'

export const topic = {
  id: "15-kalibrierung-standardaddition",
  title: "Kalibrierung & Standardaddition",
  subtitle: "Kalibriergerade, Standardaddition, interne Standards, Definitionen",
  icon: "📏",
  estimatedMinutes: 60,
  theory: `
## Grundbegriffe (prüfungsrelevant!)

**Kalibrierung/Kalibration:**
Feststellung des Zusammenhangs zwischen Messgröße (Signal) und Konzentration des Analyten mittels Standards bekannter Konzentration.

**Eichung:** Amtliche Kalibrierung (gesetzlich geregelt), z.B. Waagen, Messgeräte.

**Kalibriergerade:** y = m·c + b
y = Messsignal, m = Steigung, b = Achsenabschnitt

## Methoden der Kalibrierung

### 1. Externe Kalibrierung
Standardlösungen bekannter Konzentration → Messsignal → Gerade → Unbekannte Probe einlesen.

**Voraussetzung:** Matrix der Standards ≈ Matrix der Probe (Matrixeffekte!)

### 2. Standardaddition
**Einsatz:** Wenn Probenmatrix das Signal beeinflusst (Matrixeffekte)!

**Prinzip:**
- Signal der Probe: y₀
- Signal nach Zugabe bekannter Menge Standard c_S: y₁
- Konzentration: c_x = c_S · y₀/(y₁ - y₀)

**Fluoreszenz-Beispiel (Quinin in Tonic Water):**
25ml Probe auf 100ml → Signal 553mV
+ 10ml Standard (35 ppm) → Signal 661mV

c_x = c_s · V_s/V_total · y₀/(y₁-y₀)

### 3. Interner Standard
Bekannte Menge einer Referenzsubstanz wird zur Probe zugegeben.
Verhältnis Analyt/Standard kompensiert Probenvorbereitung und Injektionsvolumen-Schwankungen.
→ Wichtig in GC und HPLC bei variablen Injektionsmengen.

## Verdünnungsreihe

Ausgehend von Stammstandard c₀ → Verdünnungsreihe:
c₁ · V₁ = c₂ · V₂

**Beispiel:** 1000 mg/L Blei-Stock auf 2-10 ppb für Kalibrierung:
Stufe 1: 1000 mg/L → 10 mg/L (Faktor 100): 0,1ml auf 10ml
Stufe 2: 10 mg/L → 0,1 mg/L = 100ppb (Faktor 100): 0,1ml auf 10ml
Stufe 3: 100ppb → 10ppb: 1ml auf 10ml

## Nachweisgrenze aus Kalibrierung

LOD = 3·s_y0 / m  (s_y0 = Standardabweichung des Signals bei c=0, m = Steigung)
LOQ = 10·s_y0 / m

## Additionsstandard – Berechnung

c_x / (c_x + c_S·V_S/V_total) = y₀/y₁

c_x = (c_S · V_S · y₀) / (V_total · (y₁ - y₀))

{{abbildung:standardaddition}}

## Die drei Kalibrierverfahren im Vergleich

| Verfahren | Kompensiert | Aufwand | Wann |
|---|---|---|---|
| Externe Kalibrierung | nichts | eine Gerade für viele Proben | Matrix bekannt und nachstellbar |
| Standardaddition | Matrixeffekte | mehrere Messungen **je Probe** | Matrix unbekannt oder variabel |
| Interner Standard | Volumen- und Aufarbeitungsfehler | eine Zugabe je Probe | GC, HPLC, ICP-MS |

Die Verfahren schließen einander nicht aus: In der ICP-MS ist die Kombination aus interner
Standardisierung (gegen Drift) und externer Kalibrierung der Normalfall.

**Auswertung der Standardaddition grafisch:** Man trägt das Signal gegen die zugesetzte
Konzentration auf und verlängert die Gerade nach links bis zur x-Achse. Der Betrag des
Achsenschnittpunkts ist die gesuchte Konzentration. Das ist dieselbe Rechnung wie die
Formel oben, nur ohne Umstellen — und es zeigt sofort, ob die Punkte überhaupt auf einer
Geraden liegen.

## Was einen internen Standard tauglich macht

- Er darf in der Probe nicht vorkommen
- Er muss sich chemisch ähnlich verhalten wie der Analyt, damit Verluste beide gleich
  treffen
- Er muss vom Analyten getrennt messbar sein
- Er wird **vor** der Probenvorbereitung zugegeben — sonst kompensiert er nur die
  Injektion und nicht die Aufarbeitung

In der Massenspektrometrie ist der Idealfall ein isotopenmarkierter Analyt: chemisch
identisch, im Massenspektrum unterscheidbar.

## Häufigster Fehler bei der Standardaddition

Der zugesetzte Standard verdünnt die Probe. Wird V_S/V_total weggelassen, kommt ein
systematisch zu hoher Gehalt heraus. Deshalb arbeitet man entweder mit sehr kleinen
Zugabevolumina hoch konzentrierter Standards, oder man rechnet die Verdünnung sauber mit.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "standardaddition",
        name: "Standardaddition (einfach)",
        equation: "cx = cS · y0 / (y1 - y0)",
        variables: [
          {
            id: "cx",
            label: "Konzentration Probe",
            symbol: "cx",
            unit: "ppb",
            description: "Gesuchte Konzentration"
          },
          {
            id: "cS",
            label: "Zugabe-Konzentration",
            symbol: "cS",
            unit: "ppb",
            description: "Konzentration des zugefügten Standards"
          },
          {
            id: "y0",
            label: "Signal ohne Standard",
            symbol: "y0",
            unit: "mV",
            description: "Messsignal der Originalprobe"
          },
          {
            id: "y1",
            label: "Signal mit Standard",
            symbol: "y1",
            unit: "mV",
            description: "Messsignal nach Standardzugabe"
          }
        ],
        umstellungen: [
          {
            solveFor: "cx",
            expr: "cS * y0 / (y1 - y0)"
          },
          {
            solveFor: "cS",
            expr: "cx * (y1 - y0) / y0"
          }
        ],
        hints: [
          "Standardaddition: cx = cS · y0/(y1-y0). Voraussetzung: lineares Signal. Matrixeffekte werden kompensiert!",
          "Achtung Volumenverhältnisse: Wenn Standardvolumen VS zu Probenvolumen VP zugefügt: cx = cS·VS/(VP+VS) · y0/(y1-y0)."
        ]
      }
    },
  ],
  abbildungen: [
    {
      art: "diagramm",
      id: "standardaddition",
      titel: "Standardaddition: die Antwort steht links von null",
      beschreibung: "Gemessen wird nur rechts von der y-Achse. Die Gerade wird nach links verlängert; der Betrag ihres Schnittpunkts mit der x-Achse ist die gesuchte Konzentration.",
      xAchse: { titel: "zugesetzter Standard (ppm)", min: -7, max: 3.5 },
      yAchse: { titel: "Signal (mV)", min: 0, max: 900 },
      kurven: [
        { beschriftung: "Messpunkte und ihre Gerade", punkte: [{ x: -5.12, y: 0 }, { x: 0, y: 553 }, { x: 1, y: 661 }, { x: 2, y: 769 }, { x: 3, y: 877 }], farbe: "accent" },
      ],
      marker: [
        { x: 0, y: 553, beschriftung: "y₀ ohne Zugabe", hilfslinien: true },
        { x: -5.12, y: 0, beschriftung: "−c_x" },
      ],
    },
  ],
  quiz: [
    { id: "q1", question: "Was ist der Unterschied zwischen Kalibrierung und Eichung?", options: ["Beide Begriffe bedeuten dasselbe", "Eichung ist grundsätzlich genauer", "Kalibrierung gilt nur in der Spektroskopie", "Eichung ist die amtlich geregelte Kalibrierung"], correct: 3, explanation: "Kalibrierung ist der allgemeine Vorgang: den Zusammenhang zwischen Messsignal und Konzentration feststellen. Eichung ist derselbe Vorgang unter gesetzlicher Regelung, etwa bei Waagen und Füllmengen im Handel. Mathematisch führen beide zum selben Ergebnis, rechtlich nicht." },
    { id: "q2", question: "Wann verwendet man Standardaddition statt externer Kalibrierung?", options: ["Wenn die Probenmatrix das Signal beeinflusst", "Immer, weil sie genauer arbeitet", "Nur bei sehr niedrigen Konzentrationen", "Nur in der Atomspektrometrie"], correct: 0, explanation: "Externe Kalibrierung setzt voraus, dass Standards und Probe dieselbe Matrix haben. Ist die Matrix unbekannt oder von Probe zu Probe verschieden, wird der Standard direkt in die Probe gegeben — dann sehen Analyt und Standard dieselbe Umgebung. Der Preis sind mehrere Messungen je Probe." },
    { id: "q3", question: "Standardaddition: Die Probe ergibt 553 mV, nach Zugabe des Standards 661 mV. Um welchen Faktor ist die Analytkonzentration größer als der effektive Beitrag des zugesetzten Standards?", options: ["Faktor 0,84 — die Probe liegt niedriger", "Faktor 5,1 — Probensignal geteilt durch den Zuwachs", "Faktor 1,20 — das Verhältnis der beiden Signale", "Faktor 108 — die Differenz der Signale"], correct: 1, explanation: "Der Zuwachs von 108 mV stammt allein vom zugesetzten Standard, die 553 mV allein vom Analyten. Weil das Signal der Konzentration proportional ist, gilt c_x/c_S,eff = y₀/(y₁ − y₀) = 553/108 = 5,1. Wichtig ist das Wort effektiv: c_S,eff ist nicht die Konzentration der Standardlösung, sondern ihr Beitrag in der Messlösung — dafür braucht man die Volumina. Ohne sie lässt sich nur dieser Faktor angeben, nicht der Gehalt in mg/L." },
    { id: "q4", question: "Wie stellt man 10 ppb aus einer 1000 ppm Stammlösung her (2 Schritte)?", options: ["Direkte Verdünnung 1:100000", "Schritt 1: 1000ppm → 100ppb (Faktor 1:10000); Schritt 2: 100ppb → 10ppb (Faktor 1:10)", "Schritt 1: 1:100 → 10ppm; Schritt 2: 1:1000 → 10ppb", "Zwei Schritte je 1:316 (√100000)"], correct: 2, explanation: "1000 ppm = 1000 mg/L. Schritt 1: 0,01ml auf 1000ml → 1:100000 direkt, oder: 1ml auf 100ml → 10ppm; dann 1ml auf 1000ml → 10ppb. Wichtig: intermediäre Verdünnung vermeidet zu kleine Volumina!" },
    { id: "q5", question: "Was kompensiert ein interner Standard?", options: ["Matrixeffekte in der Probenlösung", "Temperatureffekte während der Messung", "Fehler in der Kalibriergeraden selbst", "Schwankungen bei Aufarbeitung und Injektion"], correct: 3, explanation: "Ausgewertet wird das Verhältnis Analytsignal zu Standardsignal. Geht bei der Aufarbeitung etwas verloren oder schwankt das Injektionsvolumen, trifft das beide gleich und kürzt sich heraus. Wichtig: Der interne Standard muss vor der Probenvorbereitung zugegeben werden, sonst kompensiert er nur die Injektion." },
    { id: "q6", question: "Bei der Standardaddition wird die Volumenkorrektur vergessen. Wie wirkt sich das aus?", options: ["Der berechnete Gehalt fällt systematisch zu hoch aus", "Der berechnete Gehalt fällt systematisch zu niedrig aus", "Es macht keinen Unterschied, solange dasselbe Volumen zugegeben wird", "Die Kalibriergerade wird nichtlinear"], correct: 0, explanation: "Der zugesetzte Standard verdünnt die Probe mit. Richtig lautet die Beziehung c_x = c_S · V_S/V_gesamt · y₀/(y₁−y₀). Lässt man den Faktor V_S/V_gesamt weg, rechnet man mit einer zu großen zugesetzten Konzentration und erhält einen systematisch zu hohen Analytgehalt. Abhilfe: kleine Volumina hoch konzentrierter Standards zugeben, oder sauber mitrechnen." },
    { id: "q7", question: "Wie viele Kalibrierpunkte sollte eine brauchbare Kalibriergerade mindestens haben?", options: ["Einen, wenn er genau gemessen wird", "Zwei, Nullpunkt und ein Standard", "Fünf bis sechs über den Arbeitsbereich verteilt", "Zwanzig, sonst ist sie statistisch wertlos"], correct: 2, explanation: "Fünf bis sechs Punkte über den erwarteten Bereich verteilt erlauben eine belastbare Regression und zeigen, ob der Zusammenhang wirklich linear ist. Zwei Punkte lassen sich immer durch eine Gerade verbinden, ohne dass eine Krümmung auffiele — und ein einzelner Punkt setzt voraus, dass die Gerade durch den Nullpunkt geht." },
    { id: "q8", question: "Was bedeutet ein Achsenabschnitt der Kalibriergerade deutlich über null?", options: ["Die Methode ist besonders empfindlich", "Es liegt ein Blindwert oder eine systematische Störung vor", "Die Probe war zu hoch konzentriert", "Der Korrelationskoeffizient ist schlecht"], correct: 1, explanation: "Ein Signal bei der Konzentration null muss eine Ursache haben: Verunreinigung der Reagenzien, Untergrundabsorption oder eine falsch gesetzte Basislinie. Solange der Achsenabschnitt in die Auswertung eingeht, bleibt das Ergebnis brauchbar — die Ursache sollte man dennoch kennen, weil ein Blindwert schwanken kann." },
    { id: "q9", question: "Warum wird eine Kalibriergerade nicht über den gemessenen Bereich hinaus verlängert?", options: ["Weil die Regressionsgleichung dort ungültig wird", "Weil der Korrelationskoeffizient dadurch sinkt", "Weil oberhalb keine Standards mehr erhältlich sind", "Weil dort niemand geprüft hat, ob der Zusammenhang noch linear ist"], correct: 3, explanation: "Die Gerade beschreibt nur, was gemessen wurde. Oberhalb des höchsten Standards biegt der Zusammenhang typischerweise ab, weil der Detektor sättigt oder Lambert-Beer nicht mehr gilt — die Extrapolation liefert dann zu niedrige Werte. Proben außerhalb werden verdünnt, nicht hochgerechnet." },
    { id: "q10", question: "Welchen Nachteil hat die Standardaddition gegenüber der externen Kalibrierung?", options: ["Sie liefert keine linearen Zusammenhänge", "Sie erfordert je Probe eine eigene Messreihe", "Sie erfasst Matrixeffekte nicht", "Sie benötigt zwingend einen mitgeführten internen Standard"], correct: 1, explanation: "Jede Probe wird mehrfach aufgestockt und gemessen; bei Serien wächst der Aufwand entsprechend. Zudem muss der Zusammenhang im gesamten genutzten Bereich linear sein, weil extrapoliert wird — und Extrapolation ist grundsätzlich unsicherer als Interpolation. Matrixeffekte sind gerade ihre Stärke." },
    { id: "q11", question: "Welche Eigenschaft muss ein interner Standard erfüllen?", options: ["Er muss in der Probe bereits enthalten sein", "Er muss dieselbe Retentionszeit haben wie der Analyt", "Er muss ähnlich, aber getrennt messbar sein", "Er muss in deutlich höherer Konzentration vorliegen als der Analyt"], correct: 2, explanation: "Ähnlichkeit sorgt dafür, dass er Verluste und Schwankungen mitmacht; die getrennte Messbarkeit sorgt dafür, dass beide Signale unterscheidbar bleiben. In der Probe vorhanden sein darf er gerade nicht, sonst ist die zugesetzte Menge unbekannt. In der Massenspektrometrie sind isotopenmarkierte Analoga der Idealfall." },
    { id: "q12", question: "Was ist der Arbeitsbereich einer Methode?", options: ["Der Konzentrationsbereich zwischen Bestimmungsgrenze und oberem Ende der Linearität", "Der Bereich, in dem die Absorption unter 2 liegt", "Der Bereich zwischen Blindwert und Nachweisgrenze", "Der Bereich, in dem der Detektor überhaupt anspricht"], correct: 0, explanation: "Unten begrenzt die Bestimmungsgrenze, ab der quantifiziert werden darf; oben endet er dort, wo der Zusammenhang krumm wird. Proben außerhalb werden verdünnt oder angereichert — extrapoliert wird nicht." },
  ],
  flashcards: [
    { id: "1budcvm", front: "Kalibrierung vs. Eichung", back: "Kalibrierung: allgemeiner Begriff, Zusammenhang Signal-Konzentration. Eichung: amtliche/gesetzliche Kalibrierung (Handelsmessgeräte). Beide mathematisch gleich: y = m·c + b." },
    { id: "1pmoffs", front: "Standardaddition", back: "cx = cS · y0/(y1-y0). Kompensiert Matrixeffekte! Anwendung: wenn Probenmatrix das Signal beeinflusst. Standard wird direkt in Probe zugegeben. Voraussetzung: lineares Signal." },
    { id: "1m72vlf", front: "Interner Standard", back: "Bekannte Menge Referenzsubstanz zur Probe zugeben. Verhältnis Analyt/IS kompensiert: Injektionsschwankungen, Verdampfungsverluste, Probenaufbereitungsverluste. Häufig in GC, HPLC, ICP-MS." },
    { id: "18pr0xq", front: "Verdünnungsreihe", back: "c1·V1 = c2·V2. Schrittweise Verdünnung aus Stammstandard. Nie zu kleine Volumina (Pipettierfehler). Konzentration der Kalibrierlösungen: LOQ bis obere Linearitätsgrenze, Probenkonzentration muss im Bereich liegen." },
    { id: "0hm8anc", front: "Volumenkorrektur bei der Standardaddition", back: "Der zugesetzte Standard verdünnt die Probe mit. Deshalb gilt nicht c_x = c_S · y₀/(y₁−y₀), sondern c_x = c_S · V_S/V_gesamt · y₀/(y₁−y₀). Wer die Verdünnung vergisst, bekommt einen systematisch zu hohen Analytgehalt." },
    { id: "09sq3kk", front: "Wann Standardaddition statt externer Kalibrierung", back: "Wenn die Probenmatrix das Signal beeinflusst und sich nicht nachstellen lässt. Der Standard wird direkt in die Probe gegeben, Signal und Standard sehen dieselbe Matrix. Preis: mehr Messaufwand je Probe, kein gemeinsamer Kalibriersatz." },
  ],
} satisfies Thema;
