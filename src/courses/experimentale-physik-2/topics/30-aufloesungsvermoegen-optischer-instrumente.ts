import type { Thema } from '../../../content/schema'

export const topic = {
  id: "30-aufloesungsvermoegen-optischer-instrumente",
  title: "Auflösungsvermögen optischer Instrumente",
  subtitle: "Beugungsbegrenzung, Rayleigh-Kriterium und numerische Apertur",
  icon: "🎯",
  estimatedMinutes: 75,
  theory: `
## Beugungsbegrenzte Auflösung

Optische Instrumente können zwei nahe beieinander liegende Punkte nur dann getrennt darstellen, wenn ihr **Winkelabstand** größer ist als ein beugungsbedingter Grenzwert.

Grund:  
Die Öffnung des Objektivs (typisch kreisförmig) erzeugt ein **Airy-Muster**:

- zentrales Maximum  
- ringförmige Nebenmaxima  
- erste Nullstelle bei  
  

\\[
  \\sin\\alpha = 1.22 \\frac{\\lambda}{D}
  \\]



mit:

- \\(D\\): Durchmesser der Öffnung  
- \\(f\\): Brennweite  
- \\(x = f \\sin\\alpha\\): Abstand in der Bildebene

---

## Auflösung des Fernrohrs

Zwei Sterne S1 und S2 sind gerade noch auflösbar, wenn der Abstand ihrer Maxima gleich dem Abstand der ersten Nullstelle ist.

**Rayleigh-Kriterium:**



\\[
\\alpha_{\\mathrm{auf}} = 1.22 \\frac{\\lambda}{D}.
\\]



Für kleine Winkel gilt \\(\\sin\\alpha \\approx \\alpha\\).

### Bedeutung

- große Öffnung \\(D\\) → kleine \\(\\alpha_{\\mathrm{auf}}\\) → hohe Auflösung  
- große Wellenlänge → schlechtere Auflösung  

Dies ist das **Reziprozitätsprinzip der Beugung**.

---

## Auflösung des Mikroskops

In der Objektebene eines Mikroskops werden zwei Punkte P1 und P2 aufgelöst, wenn ihr Abstand \\(A_x\\) größer ist als der beugungsbedingte Grenzwert.

In der Bildebene entsteht ein Airy-Muster mit erster Nullstelle bei \\(x_b\\).  
Der minimale Abstand in der Objektebene ist:



\\[
A_{x,\\mathrm{auf}} = 0.61 \\frac{\\lambda}{\\sin\\alpha},
\\]



mit dem **Aperturwinkel**:



\\[
\\tan\\alpha = \\frac{0.5 D}{a},
\\]



wobei \\(a\\) die Objektweite ist.

### Immersionsmedium

Befindet sich ein Medium mit Brechungsindex \\(n > 1\\) zwischen Objekt und Objektiv, wird die effektive Wellenlänge:



\\[
\\lambda_{\\mathrm{eff}} = \\frac{\\lambda}{n}.
\\]



Damit folgt:



\\[
A_{x,\\mathrm{auf}} = 0.61 \\frac{\\lambda}{n \\sin\\alpha}.
\\]



Die Größe \\(n\\sin\\alpha\\) heißt **numerische Apertur (NA)**:



\\[
\\mathrm{NA} = n \\sin\\alpha.
\\]



Damit:



\\[
A_{x,\\mathrm{auf}} = \\frac{0.61\\lambda}{\\mathrm{NA}}.
\\]



### Bedeutung

- große NA → hohe Auflösung  
- Immersionsobjektive verbessern die Auflösung deutlich  
- kurze Wellenlängen → bessere Auflösung  

---

## Bedeutung für optische Instrumente

- Fernrohre: Auflösung begrenzt durch Objektivdurchmesser  
- Mikroskope: Auflösung begrenzt durch NA  
- Kameras: Auflösung begrenzt durch Blendenöffnung  
- Teleskope: Auflösung begrenzt durch Spiegeldurchmesser  

Beugung ist die fundamentale Grenze aller optischen Systeme.

## Rayleigh-Kriterium und seine Grenzen

Das Rayleigh-Kriterium ist eine Konvention, keine scharfe physikalische Schranke: Es legt fest, dass zwei Punkte als getrennt gelten, wenn das Maximum des einen Airy-Musters auf das erste Minimum des anderen fällt. Bei diesem Abstand sinkt die Intensität zwischen den beiden Maxima auf rund $74\\%$ des Maximalwerts — ein Einbruch, der bei gutem Signal-Rausch-Verhältnis noch erkennbar ist. Mit rauscharmen Detektoren und bekannter Punktbildfunktion lassen sich auch engere Paare trennen; bei starkem Rauschen dagegen nicht einmal weiter entfernte.

## Zahlenbeispiel

Das menschliche Auge hat bei Tageslicht eine Pupille von etwa $D = 3\\,\\mathrm{mm}$. Mit $\\lambda = 550\\,\\mathrm{nm}$ folgt


\\[
\\alpha_\\mathrm{auf} = 1{,}22\\frac{\\lambda}{D} \\approx 2{,}2\\cdot10^{-4}\\,\\mathrm{rad},
\\]


also knapp eine Bogenminute. Das entspricht rund $0{,}15\\,\\mathrm{mm}$ in $50\\,\\mathrm{cm}$ Abstand und passt gut zum tatsächlichen Auflösungsvermögen: Der Abstand der Sehzellen auf der Netzhaut ist so gewählt, dass er die Beugungsgrenze gerade ausnutzt.

## Jenseits der Beugungsgrenze

Die Grenze gilt für die klassische Abbildung im Fernfeld. Umgehen lässt sie sich, indem man das Nahfeld abtastet oder die Probe zeitlich getrennt leuchten lässt: Verfahren wie STED und die Einzelmolekül-Lokalisierung erreichen so Auflösungen weit unterhalb von $\\lambda/2$. Sie verletzen die Beugungstheorie nicht — sie messen etwas anderes als eine gewöhnliche Abbildung.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "aufloesung-mikroskop",
        name: "Auflösung Mikroskop",
        equation: "Ax = 0.61 * lambda / (n * sin_alpha)",
        variables: [
          { id: "Ax", label: "Auflösungsgrenze", symbol: "A_x", unit: "m", description: "Minimaler Abstand zweier Punkte" },
          { id: "lambda", label: "Wellenlänge", symbol: "λ", unit: "m", description: "Wellenlänge des Lichts" },
          { id: "n", label: "Brechungsindex", symbol: "n", unit: "—", description: "Brechungsindex des Mediums" },
          { id: "sin_alpha", label: "Sinus des Aperturwinkels", symbol: "sinα", unit: "—", description: "Sinus des Aperturwinkels" },
        ],
        umstellungen: [
          { solveFor: "Ax", expr: "0.61 * lambda / (n * sin_alpha)" },
          { solveFor: "lambda", expr: "Ax * n * sin_alpha / 0.61" },
          { solveFor: "n", expr: "0.61 * lambda / (Ax * sin_alpha)" },
          { solveFor: "sin_alpha", expr: "0.61 * lambda / (Ax * n)" },
        ],
        hints: ["NA = n sinα.", "Kleine Ax → hohe Auflösung."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie lautet das Rayleigh-Kriterium für Fernrohre?", options: ["α = λ/D", "α = 1.22 λ/D", "α = 0.61 λ/D", "α = 2 λ/D"], correct: 1, explanation: "Erste Nullstelle des Airy-Musters." },
    { id: "q2", question: "Was verbessert die Auflösung eines Mikroskops?", options: ["Große Wellenlänge", "Kleine NA", "Große NA", "Kleiner Objektivdurchmesser"], correct: 2, explanation: "NA = n sinα." },
    { id: "q3", question: "Was ist NA?", options: ["n + sinα", "n/ sinα", "λ/n", "n sinα"], correct: 3, explanation: "Numerische Apertur." },
    { id: "q4", question: "Wie lautet die Auflösung des Mikroskops?", options: ["Ax = 0.61 λ/NA mit NA = n sinα", "Ax = λ/D mit Öffnung D", "Ax = NA/λ mit NA = n sinα", "Ax = λ/2 unabhängig von NA"], correct: 0, explanation: "Ax = 0.61 λ/NA." },
    { id: "q5", question: "Was passiert bei Immersion?", options: ["λ wird größer", "λ wird kleiner", "NA wird kleiner", "Auflösung wird schlechter"], correct: 1, explanation: "λ_eff = λ/n." },
    { id: "q6", question: "Was begrenzt die Auflösung eines Fernrohrs?", options: ["Tubuslänge", "Okularbrennweite", "Objektivdurchmesser", "Immersionsmedium"], correct: 2, explanation: "α ∝ λ/D." },
  ],
  flashcards: [
    { id: "1iei1pl", front: "Rayleigh-Kriterium", back: "α = 1.22 λ/D. Beugungsbegrenzte Auflösung des Fernrohrs." },
    { id: "0k2zwp3", front: "Auflösung Mikroskop", back: "Ax = 0.61 λ/NA. NA = n sinα." },
    { id: "1n2bdz0", front: "Immersion", back: "λ_eff = λ/n → bessere Auflösung." },
    { id: "0ms48gy", front: "Airy-Muster als Auflösungsgrenze", back: "Zentrales Maximum + ringförmige Nebenmaxima." },
    { id: "0rupi57", front: "Reziprozität", back: "Große Öffnung → hohe Auflösung; große λ → schlechte Auflösung." },
    { id: "00zpjm0", front: "Bedeutung der Beugungsgrenze", back: "Fundamentale Grenze aller optischen Systeme." },
  ],
} satisfies Thema;
