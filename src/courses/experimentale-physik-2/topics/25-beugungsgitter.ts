import type { Thema } from '../../../content/schema'

export const topic = {
  id: "25-beugungsgitter",
  title: "Beugungsgitter",
  subtitle: "Überlagerung von Vielstrahlinterferenz und Einzelspaltbeugung",
  icon: "🧩",
  estimatedMinutes: 75,
  theory: `
## Aufbau und Funktionsprinzip eines Beugungsgitters

Ein Beugungsgitter besteht aus vielen identen Spalten der Breite \\(b\\) und des Spaltabstands \\(d\\).  
Es erzeugt ein Beugungsmuster, das aus zwei überlagerten Effekten besteht:

1. **Einzelspaltbeugung** → Einhüllende  
2. **Interferenz der N Spalte** → scharfe Haupt- und Nebenmaxima

Die Gesamtintensität ergibt sich aus:



\\[
I(\\theta) = I_0
\\left( \\frac{\\sin\\left(\\frac{\\pi b}{\\lambda}\\sin\\theta\\right)}{\\frac{\\pi b}{\\lambda}\\sin\\theta} \\right)^2
\\cdot
\\left( \\frac{\\sin\\left(N\\frac{\\pi d}{\\lambda}\\sin\\theta\\right)}{\\sin\\left(\\frac{\\pi d}{\\lambda}\\sin\\theta\\right)} \\right)^2.
\\]



Der erste Faktor ist die **Einhüllende** (Einzelspalt).  
Der zweite Faktor erzeugt die **Haupt- und Nebenmaxima**.

## Interferenzterm der N Spalte

Für den Gangunterschied zwischen benachbarten Spalten gilt:



\\[
\\Delta s = d \\sin\\theta.
\\]



Die Phasendifferenz ist:



\\[
\\Delta\\phi = \\frac{2\\pi}{\\lambda} d \\sin\\theta.
\\]



Die Intensität des Interferenzterms ist:



\\[
I_{\\mathrm{int}}(\\theta)
= \\left( \\frac{\\sin\\left(N\\Delta\\phi/2\\right)}{\\sin\\left(\\Delta\\phi/2\\right)} \\right)^2.
\\]



### Hauptmaxima

Hauptmaxima treten auf, wenn der Gangunterschied ein Vielfaches der Wellenlänge ist:



\\[
d\\sin\\theta_m = m\\lambda.
\\]



Dies ist die **Gittergleichung**.

Die Ordnung \\(m\\) gibt an, wie viele Wellenlängen der Gangunterschied beträgt.

Die maximal mögliche Ordnung ist:



\\[
m_{\\max} \\le \\frac{d}{\\lambda}.
\\]



### Nebenmaxima

Zwischen zwei Hauptmaxima liegen \\(N - 2\\) Nebenmaxima.  
Ihre Positionen sind durch:



\\[
\\sin\\theta = \\frac{(2p+1)\\lambda}{2Nd}, \\quad p = 1,2,\\dots,N-2
\\]



gegeben.

Die Intensität der Nebenmaxima skaliert invers proportional zu \\(N^2\\).  
Große Spaltzahl → sehr schwache Nebenmaxima.

## Einzelspalt-Einhüllende

Der Einzelspalt erzeugt eine Einhüllende:



\\[
I_{\\mathrm{env}}(\\theta)
= I_0 \\left( \\frac{\\sin\\left(\\frac{\\pi b}{\\lambda}\\sin\\theta\\right)}{\\frac{\\pi b}{\\lambda}\\sin\\theta} \\right)^2.
\\]



Diese bestimmt die maximale Höhe der Hauptmaxima.

Reziprozität:

- große Spaltbreite \\(b\\) → schmale Einhüllende  
- kleine Spaltbreite \\(b\\) → breite Einhüllende

## Gesamtbild des Beugungsgitters

Ein Beugungsgitter erzeugt:

- **sehr scharfe Hauptmaxima** (durch N‑Spalt‑Interferenz)  
- **eine breite Einhüllende** (durch Einzelspaltbeugung)  
- **viele Nebenmaxima**, deren Intensität mit wachsender Spaltzahl stark abnimmt

Die Hauptmaxima liegen bei:



\\[
\\sin\\theta_m = \\frac{m\\lambda}{d}.
\\]



Die Breite der Hauptmaxima ist:

- indirekt proportional zu \\(N\\)  
- direkt proportional zu \\(\\lambda\\)

## Bedeutung

Beugungsgitter sind zentrale Elemente in:

- Spektrometern  
- Laseroptik  
- Wellenlängenmessung  
- Fourieroptik  
- Analyse von Spektrallinien  
- Auflösungsverbesserung gegenüber Einzelspalt

## Auflösungsvermögen des Gitters

Für die spektrale Trennung zählt nicht die Zahl der Striche pro Millimeter allein, sondern die Zahl der insgesamt beleuchteten Spalte. Zwei benachbarte Wellenlängen sind gerade noch trennbar, wenn


\\[
\\frac{\\lambda}{\\Delta\\lambda} = mN
\\]


gilt. Ein Gitter mit $10\\,000$ beleuchteten Strichen trennt in erster Ordnung also Linien, die sich um ein Zehntausendstel ihrer Wellenlänge unterscheiden. Höhere Ordnungen lösen besser auf, sind aber lichtschwächer und überlappen einander.

## Gitter gegen Prisma

Beide zerlegen weißes Licht, aber auf verschiedene Weise. Das Prisma nutzt die Dispersion des Materials; die Zuordnung von Farbe zu Winkel ist nichtlinear und hängt vom Glas ab. Das Gitter nutzt Interferenz; nach der Gittergleichung $d\\sin\\theta_m = m\\lambda$ ist der Ablenkwinkel unmittelbar mit der Wellenlänge verknüpft und für kleine Winkel nahezu proportional zu ihr. Deshalb sind Gitterspektrometer leichter zu kalibrieren. Nachteil ist die Aufteilung der Leistung auf mehrere Ordnungen — dem begegnet man mit geblazten Gittern, deren sägezahnförmige Furchen die Energie in eine gewünschte Ordnung lenken.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "gittergleichung",
        name: "Gittergleichung",
        equation: "sin_theta = m * lambda / d",
        variables: [
          { id: "sin_theta", label: "Sinus des Winkels", symbol: "sinθ", unit: "—", description: "Winkelposition des m-ten Hauptmaximums" },
          { id: "m", label: "Ordnung", symbol: "m", unit: "—", description: "Ordnung des Maximums" },
          { id: "lambda", label: "Wellenlänge", symbol: "λ", unit: "m", description: "Wellenlänge des Lichts" },
          { id: "d", label: "Spaltabstand", symbol: "d", unit: "m", description: "Abstand der Spalte" },
        ],
        umstellungen: [
          { solveFor: "sin_theta", expr: "m * lambda / d" },
          { solveFor: "m", expr: "sin_theta * d / lambda" },
          { solveFor: "lambda", expr: "sin_theta * d / m" },
          { solveFor: "d", expr: "m * lambda / sin_theta" },
        ],
        hints: ["Hauptmaxima bei d sinθ = mλ.", "Nebenmaxima liegen zwischen den Hauptmaxima und sind schwach für große N."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wann tritt ein Hauptmaximum des Beugungsgitters auf?", options: ["d sinθ = mλ", "b sinθ = mλ", "sinθ = λ/b", "sinθ = λ/(2d)"], correct: 0, explanation: "Gittergleichung: d sinθ = mλ." },
    { id: "q2", question: "Ein Gitter hat d = 2 µm und λ = 500 nm. Wo liegt das erste Maximum?", options: ["sinθ = 0.1", "sinθ = 0.25", "sinθ = 0.5", "sinθ = 0.05"], correct: 1, explanation: "sinθ = λ/d = 5×10⁻⁷ / 2×10⁻⁶ = 0.25." },
    { id: "q3", question: "Wie viele Nebenmaxima liegen zwischen zwei Hauptmaxima?", options: ["N−1", "N", "N−2", "2N"], correct: 2, explanation: "Zwischen Hauptmaxima liegen N−2 Nebenmaxima." },
    { id: "q4", question: "Welche physikalische Größe begrenzt die maximale Intensität der Hauptmaxima?", options: ["Interferenzterm der N Spalte", "Wellenlänge", "Kohärenzlänge", "Einzelspalt-Einhüllende"], correct: 3, explanation: "Die Einhüllende bestimmt die maximale Höhe." },
    { id: "q5", question: "Was passiert bei großer Spaltzahl N?", options: ["Nebenmaxima werden schwächer", "Nebenmaxima werden stärker", "Hauptmaxima verschwinden", "Wellenlänge ändert sich"], correct: 0, explanation: "Intensität der Nebenmaxima ∝ 1/N²." },
    { id: "q6", question: "Warum sind die Hauptmaxima scharf?", options: ["Wegen kleiner Spaltbreite", "Wegen Interferenz vieler Spalte", "Wegen großer Wellenlänge", "Wegen Reflexion"], correct: 1, explanation: "Viele Spalte → starke konstruktive Interferenz." },
  ],
  flashcards: [
    { id: "06s0gd8", front: "Gittergleichung", back: "d sinθ = mλ. Bestimmt die Position der Hauptmaxima." },
    { id: "1e3xfee", front: "Nebenmaxima", back: "Zwischen Hauptmaxima liegen N−2 Nebenmaxima, Intensität ∝ 1/N²." },
    { id: "0wx5l2c", front: "Einhüllende Einzelspalt", back: "Einzelspaltbeugung begrenzt die maximale Höhe der Hauptmaxima." },
    { id: "0dbtud2", front: "Gesamtintensität", back: "Produkt aus Einzelspaltterm und N‑Spalt‑Interferenzterm." },
    { id: "1f5u1wb", front: "Reziprozität von b und d", back: "Große d → kleine Winkelabstände; große b → schmale Einhüllende." },
    { id: "087vyf2", front: "Bedeutung des Beugungsgitters", back: "Zentrale Elemente in Spektrometern, Laseroptik und Wellenlängenmessung." },
  ],
} satisfies Thema;
