import type { Thema } from '../../../content/schema'

export const topic = {
  id: "23-beugung-reziprozitaet",
  title: "Beugung – Reziprozität und Parameterabhängigkeit",
  subtitle: "Einfluss von Spaltbreite und Wellenlänge auf die Beugungsfigur",
  icon: "📐",
  estimatedMinutes: 75,
  theory: `
## Reziprozitätsprinzip der Beugung

Die Beugung am Einzelspalt wird durch die Intensitätsverteilung



\\[
I(\\theta) = I_0 \\left(\\frac{\\sin x}{x}\\right)^2,
\\quad x = \\frac{\\pi b}{\\lambda}\\sin\\theta
\\]



beschrieben. Diese Funktion zeigt ein zentrales physikalisches Prinzip:

**Die Breite des Beugungsmusters ist indirekt proportional zur Spaltbreite und direkt proportional zur Wellenlänge.**

Das bedeutet:

- **Großer Spalt → schmale Beugungsfigur**  
- **Kleiner Spalt → breite Beugungsfigur**  
- **Große Wellenlänge → breite Beugungsfigur**  
- **Kleine Wellenlänge → schmale Beugungsfigur**

Dieses Verhalten nennt man **Reziprozität**.

## Einfluss der Spaltbreite

Für konstante Wellenlänge gilt:



\\[
\\sin\\theta_m = \\frac{m\\lambda}{b}.
\\]



Damit verschieben sich die Minima abhängig von \\(b\\):

- **kleines \\(b\\)** → große Winkel \\(\\theta_m\\) → breites Beugungsmuster  
- **großes \\(b\\)** → kleine Winkel \\(\\theta_m\\) → schmales Beugungsmuster

Die Folien zeigen dies anhand von drei Beispielen:

- \\(b = 2.2\\,\\mu\\mathrm{m}\\) → breites Muster  
- \\(b = 4.4\\,\\mu\\mathrm{m}\\) → engeres Muster  
- \\(b = 6.6\\,\\mu\\mathrm{m}\\) → sehr schmales Muster

Physikalisch: Ein breiter Spalt enthält viele Sekundärquellen → starke Auslöschung seitlicher Richtungen → schmale Hauptmaxima.

## Einfluss der Wellenlänge

Für konstante Spaltbreite gilt:



\\[
x = \\frac{\\pi b}{\\lambda}\\sin\\theta.
\\]



Damit gilt:

- **kleine Wellenlänge** → großer Wert von \\(x\\) → schmale Beugungsfigur  
- **große Wellenlänge** → kleiner Wert von \\(x\\) → breite Beugungsfigur

Die Folien zeigen:

- \\(\\lambda = 400\\,\\mathrm{nm}\\) → schmale Beugungsfigur  
- \\(\\lambda = 550\\,\\mathrm{nm}\\) → breiter  
- \\(\\lambda = 700\\,\\mathrm{nm}\\) → noch breiter

Physikalisch: Größere Wellenlängen führen zu weniger ausgeprägter Auslöschung seitlicher Richtungen.

## Zusammenfassung der Parameterabhängigkeit

### Spaltbreite \\(b\\)

- bestimmt die Winkelposition der Minima  
- große Spaltbreite → kleine Winkel → schmale Figur  
- kleine Spaltbreite → große Winkel → breite Figur

### Wellenlänge \\(\\lambda\\)

- bestimmt die Skalierung des Arguments \\(x\\)  
- große Wellenlänge → breite Figur  
- kleine Wellenlänge → schmale Figur

### Hauptmaximum

Das Hauptmaximum liegt immer bei \\(\\theta = 0\\), unabhängig von \\(b\\) und \\(\\lambda\\).

## Bedeutung

Diese Zusammenhänge sind entscheidend für:

- Auflösungsvermögen optischer Instrumente  
- Mikroskopie und Teleskopoptik  
- Bestimmung von Spaltbreiten  
- Analyse von Beugungsmustern  
- Konstruktion von Beugungsgittern

## Reziprozität als allgemeines Prinzip

Der Zusammenhang „schmal im Ort, breit im Winkel" ist kein Sonderfall des Spalts, sondern die Aussage der Fouriertransformation: Die Beugungsfigur im Fernfeld ist die Fouriertransformierte der Öffnungsfunktion, und eine Skalierung der Öffnung um den Faktor $a$ skaliert das Beugungsbild um $1/a$. Deshalb gilt derselbe Zusammenhang für Kreisblenden, Gitter und beliebige Aperturen, und deshalb taucht er auch außerhalb der Optik auf — etwa als Zusammenhang zwischen Pulsdauer und Frequenzbreite eines Signals.

## Babinetsches Theorem

Eng verwandt ist die Aussage, dass ein Hindernis und die dazu komplementäre Öffnung — also ein Draht und ein gleich breiter Spalt — außerhalb der direkten Strahlrichtung dasselbe Beugungsmuster erzeugen. Ein dünner Draht lässt sich deshalb ausmessen wie ein Spalt: Man bestimmt den Abstand der Minima und rechnet mit $b\\sin\\theta_m = m\\lambda$ zurück. Das ist ein gängiges Verfahren, um Drahtdurchmesser oder Haardicken berührungslos zu bestimmen.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "reziprozitaet-einzelspalt",
        name: "Minima Einzelspalt",
        equation: "sin_theta = m * lambda / b",
        variables: [
          { id: "sin_theta", label: "Sinus des Winkels", symbol: "sinθ", unit: "—", description: "Winkelposition des m-ten Minimums" },
          { id: "m", label: "Ordnungszahl", symbol: "m", unit: "—", description: "Ordnung des Minimums" },
          { id: "lambda", label: "Wellenlänge", symbol: "λ", unit: "m", description: "Wellenlänge des Lichts" },
          { id: "b", label: "Spaltbreite", symbol: "b", unit: "m", description: "Breite des Spalts" },
        ],
        umstellungen: [
          { solveFor: "sin_theta", expr: "m * lambda / b" },
          { solveFor: "m", expr: "sin_theta * b / lambda" },
          { solveFor: "lambda", expr: "sin_theta * b / m" },
          { solveFor: "b", expr: "m * lambda / sin_theta" },
        ],
        hints: ["Große Spaltbreite → kleine Winkel → schmale Beugungsfigur.", "Große Wellenlänge → große Winkel → breite Beugungsfigur."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie verändert sich das Beugungsmuster bei größerer Spaltbreite?", options: ["Es wird breiter", "Es bleibt gleich", "Es wird schmaler", "Es verschwindet"], correct: 2, explanation: "Große Spaltbreite → kleine Winkel der Minima → schmale Figur." },
    { id: "q2", question: "Ein Spalt hat b = 3 µm und λ = 600 nm. Wo liegt das erste Minimum?", options: ["sinθ = 0.1", "sinθ = 0.2", "sinθ = 0.0001", "sinθ = 0.0002"], correct: 3, explanation: "sinθ = λ/b = 6×10⁻⁷ / 3×10⁻⁶ = 2×10⁻⁴." },
    { id: "q3", question: "Was passiert bei größerer Wellenlänge?", options: ["Das Muster wird breiter", "Das Muster wird schmaler", "Die Intensität steigt", "Die Minima verschwinden"], correct: 0, explanation: "Große λ → breite Beugungsfigur." },
    { id: "q4", question: "Welche physikalische Bedeutung hat die Beziehung sinθ_m = mλ/b?", options: ["Sie beschreibt die Intensität des Hauptmaximums", "Sie beschreibt die Winkelposition der Minima", "Sie beschreibt die Kohärenzlänge", "Sie beschreibt die Spaltbreite direkt"], correct: 1, explanation: "Minima treten bei sinθ_m = mλ/b auf." },
    { id: "q5", question: "Was ist unabhängig von b und λ?", options: ["Position der Minima", "Breite des Musters", "Position des Hauptmaximums", "Intensität der Nebenmaxima"], correct: 2, explanation: "Hauptmaximum immer bei θ = 0." },
    { id: "q6", question: "Warum wird das Muster bei kleinem b breiter?", options: ["Mehr Sekundärwellen, stärkere Auslöschung", "Die Wellenlänge wird dabei größer", "Die Wellenlänge wird dabei kleiner", "Weniger Sekundärwellen, geringere Auslöschung"], correct: 3, explanation: "Wenige Quellen → weniger destruktive Interferenz." },
  ],
  flashcards: [
    { id: "0i30z1f", front: "Reziprozität der Spaltbreite", back: "Große b → schmale Beugungsfigur; kleine b → breite Figur. Bestimmt die Winkelposition der Minima." },
    { id: "1pknd7v", front: "Reziprozität der Wellenlänge", back: "Große λ → breite Figur; kleine λ → schmale Figur. Skalierung des Arguments x." },
    { id: "1a5k3jy", front: "Minima und Spaltbreite", back: "sinθ_m = mλ/b. Bestimmt die Winkelposition der Auslöschung." },
    { id: "0odmq23", front: "Lage des Hauptmaximums", back: "Immer bei θ = 0. Unabhängig von b und λ." },
    { id: "0ulxvyj", front: "Beugung als Interferenzerscheinung", back: "Interferenz der Sekundärwellen nach Huygens. Begrenzte Wellenfront erzeugt Winkelverteilung." },
    { id: "085ddw5", front: "Bedeutung der Reziprozität", back: "Wichtig für Auflösungsvermögen, Mikroskopie, Teleskopoptik und Beugungsgitter." },
  ],
} satisfies Thema;
