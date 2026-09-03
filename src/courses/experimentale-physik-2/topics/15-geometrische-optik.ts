import type { Thema } from '../../../content/schema'

export const topic = {
  id: "15-geometrische-optik",
  title: "Geometrische Optik",
  subtitle: "Strahlen, Fermat, Spiegel & Linsen",
  icon: "🔭",
  estimatedMinutes: 75,
  theory: `
## Näherung der geometrischen Optik
Die geometrische Optik beschreibt Licht als **Strahlen**, die **senkrecht auf Wellenfronten** stehen. Diese Näherung gilt, wenn die Strukturgrößen im Medium **viel größer als die Wellenlänge** sind, sodass **Beugungseffekte vernachlässigt** werden können. In optisch homogenen Medien verlaufen Strahlen **geradlinig**. An Grenzflächen gelten **Reflexions- und Brechungsgesetz**. Strahlenbündel beeinflussen einander nicht, außer durch Interferenz.

## Eikonal und optische Weglänge
Für eine elektromagnetische Welle im Medium gilt der Ansatz
$$E(x,t)=A(x)e^{-i\\omega t}e^{-ikS(x)}.$$
Die Funktion $S(x)$ heißt **Eikonal**. Ihre Gradienten bestimmen die Richtung der Wellenfronten:
$$|\\nabla S| = n.$$
Die optische Weglänge zwischen zwei Punkten ist
$$S(B)-S(A)=\\int_A^B n(x)\\,dl.$$

## Fermatsches Prinzip
Ein Lichtstrahl zwischen zwei Punkten folgt dem Weg mit **extremaler optischer Weglänge**:
$$\\delta\\int n(x)\\,dl = 0.$$
In homogener Materie entspricht dies dem Weg **minimaler Laufzeit**. Aus dem Prinzip folgen direkt:
- **Reflexionsgesetz:** Einfallswinkel = Ausfallswinkel.
- **Brechungsgesetz (Snellius):** $n_1\\sin\\alpha = n_2\\sin\\beta$.

## Abbildung durch Spiegel
Ein **sphärischer Hohlspiegel** besitzt die Brennweite
$$f=\\frac{R}{2}.$$
Achsnahe Strahlen treffen sich im Brennpunkt, achsferne Strahlen zeigen **sphärische Aberration**. Die Abbildungsgleichung lautet
$$\\frac{1}{g}+\\frac{1}{b}=\\frac{1}{f}.$$
Je nach Gegenstandsweite entstehen reelle oder virtuelle Bilder.

## Parabolspiegel
Ein Parabolspiegel mit Gleichung $y=\\frac{x^2}{4f}$ vereinigt **alle achsparallelen Strahlen** exakt im Brennpunkt. Er vermeidet sphärische Aberration vollständig.

## Prismen
Ein Lichtstrahl wird im Prisma zweimal gebrochen. Die Ablenkung hängt von der Wellenlänge ab:
$$\\frac{d\\delta}{d\\lambda}<0.$$
Dies führt zu **Dispersion**. Für den symmetrischen Strahlengang gilt:
$$\\delta_{\\min}=2\\alpha - \\gamma.$$

## Brechung an sphärisch gekrümmten Flächen
Für eine Grenzfläche mit Radius $R$ gilt:
$$\\frac{n_2}{b}-\\frac{n_1}{g}=\\frac{n_2-n_1}{R}.$$

## Dünne Linsen
Für eine dünne Linse mit Radien $R_1$ und $R_2$ gilt:
$$\\frac{1}{f}=(n-1)\\left(\\frac{1}{R_1}-\\frac{1}{R_2}\\right).$$
Die Abbildungsgleichung bleibt:
$$\\frac{1}{g}+\\frac{1}{b}=\\frac{1}{f}.$$

## Linsensysteme
Für zwei dünne Linsen im Abstand $x$:
$$\\frac{1}{f}=\\frac{1}{f_1}+\\frac{1}{f_2}-\\frac{x}{f_1f_2}.$$

## Linsenfehler
### Chromatische Aberration
Brechungsindex abhängig von $\\lambda$ → unterschiedliche Brennweiten → Farbsäume.

### Sphärische Aberration
Achsferne Strahlen haben andere Brennweite als achsnahe.

### Astigmatismus
Strahlen außerhalb der optischen Achse besitzen zwei Brennweiten (sagittal, meridional).

### Koma & Bildfeldwölbung
Schräg einfallende Strahlen → asymmetrische Bildpunkte (Koma). Bildfläche ist gekrümmt (Bildfeldwölbung).

## Abbildungsmaßstab und Vorzeichen

Neben der Abbildungsgleichung braucht man den Abbildungsmaßstab


\\[
\\beta = \\frac{B}{G} = -\\frac{b}{g},
\\]


der angibt, wie groß und wie orientiert das Bild ist. Das Minuszeichen gehört zur Vorzeichenkonvention: Gegenstandsweiten links der Linse und reelle Bildweiten rechts zählen positiv, ein negatives $b$ bedeutet ein virtuelles Bild auf der Gegenstandsseite, ein negatives $\\beta$ ein umgekehrtes Bild. Erst mit einer durchgehaltenen Konvention beschreibt eine einzige Gleichung Sammel- und Zerstreuungslinse, reelles und virtuelles Bild.

## Blende, Schärfentiefe und Grenzen der Näherung

Eine Blende schneidet die achsfernen Strahlen weg. Das mindert sphärische Aberration und Koma und vergrößert die Schärfentiefe, kostet aber Licht — und ab einer gewissen Verkleinerung setzt die Beugung an der Blendenöffnung die Auflösungsgrenze, die die geometrische Optik gerade nicht kennt. Genau dort endet die Strahlnäherung: Sie beschreibt, wohin das Licht läuft, nicht, wie fein ein Bild überhaupt sein kann. Achromate aus zwei Glassorten mit unterschiedlicher Dispersion korrigieren zusätzlich die chromatische Aberration, indem sich die Farbfehler der beiden Linsen weitgehend aufheben.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "linsengleichung",
        name: "Linsengleichung",
        equation: "1/g+1/b=1/f",
        variables: [
          { id: "g", label: "Gegenstandsweite", symbol: "g", unit: "m", description: "Abstand des Gegenstands von der Linse" },
          { id: "b", label: "Bildweite", symbol: "b", unit: "m", description: "Abstand des Bildes von der Linse" },
          { id: "f", label: "Brennweite", symbol: "f", unit: "m", description: "Brennweite der Linse" },
        ],
        umstellungen: [
          { solveFor: "f", expr: "1/(1/g+1/b)" },
          { solveFor: "g", expr: "1/(1/f-1/b)" },
          { solveFor: "b", expr: "1/(1/f-1/g)" },
        ],
        hints: ["Die Linsengleichung gilt für dünne Linsen im paraxialen Bereich.", "Einheitenprobe: 1/m + 1/m = 1/m."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Ein Gegenstand steht 2 m vor einer Linse mit f = 0,5 m. Wo entsteht das Bild?", options: ["2,0 m", "1,0 m", "0,67 m", "0,4 m"], correct: 2, explanation: "1/g + 1/b = 1/f → 1/2 + 1/b = 2 → b = 0,67 m. Häufiger Fehler: 1/f falsch als 0,5 statt 2 eingesetzt." },
    { id: "q2", question: "Welche Aussage zur geometrischen Optik ist korrekt?", options: ["Strahlen verlaufen nur in Medien mit $n>2$ geradlinig.", "Strahlen beeinflussen einander durch Druckkräfte.", "Strahlen gelten ausschließlich für Laserlicht.", "Strahlen stehen senkrecht auf den Wellenfronten."], correct: 3, explanation: "Strahlen sind Normalen auf Wellenfronten. Ablenker: falsche Einschränkungen oder physikalisch falsche Effekte." },
    { id: "q3", question: "Welche Linse oder welcher Spiegel vermeidet sphärische Aberration vollständig?", options: ["Parabolspiegel mit achsparallelem Strahlengang", "Sammellinse mit großem Durchmesser", "Zerstreuungslinse mit kurzer Brennweite", "Sphärischer Hohlspiegel mit kleinem Öffnungswinkel"], correct: 0, explanation: "Nur der Parabolspiegel vereinigt achsparallele Strahlen exakt im Brennpunkt. Ablenker: sphärische Elemente erzeugen Aberration." },
    { id: "q4", question: "Was verursacht chromatische Aberration?", options: ["Temperaturabhängige Dichteänderung des Glases", "Wellenlängenabhängiger Brechungsindex des Glases", "Reflexionsverluste an der Linsenoberfläche", "Streuung an Einschlüssen im Linsenmaterial"], correct: 1, explanation: "n(λ) variiert → Brennweite variiert → Farbsäume. Ablenker: Effekte, die keine Brennweitenänderung erzeugen." },
    { id: "q5", question: "Ein Prisma zeigt stärkere Ablenkung für…", options: ["Wellenlängen, bei denen n besonders klein ist", "alle Wellenlängen gleich stark", "kürzere Wellenlängen, da n dort größer ist", "nur infrarotes Licht"], correct: 2, explanation: "Normale Dispersion: kürzere λ → größerer Brechungsindex → stärkere Ablenkung." },
    { id: "q6", question: "Welche Aussage zu Astigmatismus ist korrekt?", options: ["Er entsteht nur bei perfekt zentrierten Linsen.", "Es gibt genau eine Brennweite für alle Strahlen.", "Er tritt ausschließlich bei Hohlspiegeln auf.", "Sagittale und meridionale Brennweite unterscheiden sich."], correct: 3, explanation: "Astigmatismus erzeugt zwei Brennweiten. Ablenker: falsche Einschränkungen oder Verwechslung mit sphärischer Aberration." },
  ],
  flashcards: [
    { id: "0yrvyt2", front: "Fermatsches Prinzip", back: "Licht wählt den Weg extremaler optischer Weglänge. Daraus folgen Reflexions- und Brechungsgesetz. Gilt für alle optischen Medien." },
    { id: "12p1qas", front: "Linsengleichung", back: "1/g + 1/b = 1/f. Gilt für dünne Linsen im paraxialen Bereich. Ermöglicht Berechnung von Bild- und Gegenstandsweiten." },
    { id: "150ty8k", front: "Chromatische Aberration", back: "Der Brechungsindex hängt von der Wellenlänge ab. Dadurch entstehen unterschiedliche Brennweiten und Farbsäume im Bild." },
    { id: "1kp3jo9", front: "Sphärische Aberration", back: "Achsferne Strahlen haben andere Brennweite als achsnahe. Das Bild wird unscharf und zeigt eine Scheibenstruktur." },
    { id: "1s83yxm", front: "Astigmatismus", back: "Strahlen außerhalb der optischen Achse besitzen zwei Brennweiten (sagittal, meridional). Bildpunkte erscheinen als Linien." },
    { id: "03trz6r", front: "Parabolspiegel", back: "Vereinigt achsparallele Strahlen exakt im Brennpunkt. Vermeidet sphärische Aberration vollständig." },
  ],
} satisfies Thema;
