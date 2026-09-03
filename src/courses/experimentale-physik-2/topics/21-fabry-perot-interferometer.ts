import type { Thema } from '../../../content/schema'

export const topic = {
  id: "21-fabry-perot-interferometer",
  title: "Fabry-Perot-Interferometer",
  subtitle: "Vielstrahlinterferenz an der planparallelen Platte",
  icon: "🪞📡",
  estimatedMinutes: 75,
  theory: `
## Prinzip der Vielstrahlinterferenz

Im Gegensatz zur Zweistrahlinterferenz (Michelson, Mach-Zehnder) entstehen beim Fabry‑Perot‑Interferometer **unendlich viele Teilstrahlen**, die durch wiederholte Reflexionen zwischen zwei planparallelen, teildurchlässigen Flächen erzeugt werden.

Eine planparallele Platte mit Brechungsindex \\(n\\), Dicke \\(d\\) und Reflexivität \\(R\\) erzeugt:

- eine Folge reflektierter Strahlen \\(A_1, A_2, A_3, \\dots\\)
- eine Folge transmittierter Strahlen \\(D_1, D_2, D_3, \\dots\\)

Jeder Strahl besitzt:

1. eine Amplitude, die durch Reflexions‑ und Transmissionskoeffizienten bestimmt ist  
2. eine Phasenverschiebung, die proportional zum optischen Wegunterschied ist

Der optische Wegunterschied zwischen zwei aufeinanderfolgenden Strahlen ist:



\\[
\\Delta s = 2d\\sqrt{n^2 - \\sin^2\\alpha}.
\\]



Die zugehörige Phasendifferenz lautet:



\\[
\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\Delta s.
\\]



## Komplexe Amplituden der Strahlen

Für die reflektierten Strahlen gilt:



\\[
A_1 = p E_0,
\\]





\\[
A_2 = tt' p' E_0 e^{i\\Delta\\phi},
\\]





\\[
A_3 = t t' (p')^3 E_0 e^{i2\\Delta\\phi},
\\]





\\[
A_m = t t' (p')^{2m-3} E_0 e^{i(m-1)\\Delta\\phi}.
\\]



Für die transmittierten Strahlen gilt analog:



\\[
D_1 = t t' E_0,
\\]





\\[
D_2 = t t' (p')^2 E_0 e^{i\\Delta\\phi},
\\]





\\[
D_m = t t' (p')^{2(m-1)} E_0 e^{i(m-1)\\Delta\\phi}.
\\]



Die Koeffizienten \\(p, p', t, t'\\) sind die Fresnel‑Koeffizienten.  
Für eine verlustfreie Platte gelten die Stokes‑Relationen:

- \\(p = -p'\\)
- \\(t t' + p^2 = 1\\)
- \\(p^2 = p'^2 = R\\)
- \\(t t' = T\\)

## Summation der unendlich vielen Strahlen

Die Gesamtamplitude der reflektierten Strahlen ist die Summe einer geometrischen Reihe:



\\[
A = \\frac{\\sqrt{R} E_0}{1 - R e^{i\\Delta\\phi}}.
\\]



Die reflektierte Intensität ist:



\\[
I_R = I_0 \\frac{4R \\sin^2(\\Delta\\phi/2)}{(1 - R)^2 + 4R \\sin^2(\\Delta\\phi/2)}.
\\]



Dies lässt sich schreiben als:



\\[
\\frac{I_R}{I_0} = \\frac{F \\sin^2(\\Delta\\phi/2)}{1 + F \\sin^2(\\Delta\\phi/2)},
\\]



mit dem **Finesse‑Parameter**:



\\[
F = \\frac{4R}{(1 - R)^2}.
\\]



Die transmittierte Intensität ist:



\\[
I_T = I_0 - I_R.
\\]



## Eigenschaften des Fabry‑Perot‑Interferometers

### Hohe Auflösung

Je größer die Reflexivität \\(R\\), desto größer ist die Finesse \\(F\\).  
Dies führt zu:

- schmaleren Maxima  
- höherem Kontrast  
- besserer spektraler Auflösung

### Bedingungen für Maxima



\\[
\\Delta\\phi = 2\\pi m
\\quad\\Rightarrow\\quad
\\Delta s = m\\lambda.
\\]



### Spektrale Selektivität

Das Fabry‑Perot‑Interferometer wirkt als **Spektralfilter**:

- nur Wellenlängen mit \\(\\Delta\\phi = 2\\pi m\\) werden maximal transmittiert  
- andere werden unterdrückt

## Anwendungen

- Spektralanalyse  
- Laserresonatoren  
- Wellenlängenstabilisierung  
- Interferenzfilter  
- Messung von Brechungsindexänderungen  
- Untersuchung dünner Schichten

## Finesse und Auflösungsvermögen

Neben dem Parameter $F$ ist die Finesse


\\[
\\mathcal{F} = \\frac{\\pi\\sqrt{R}}{1 - R}
\\]


gebräuchlich. Sie gibt an, wie viele Wellenlängen sich innerhalb eines freien Spektralbereichs noch trennen lassen — anschaulich das Verhältnis von Ordnungsabstand zur Halbwertsbreite eines Maximums. Bei $R = 0{,}95$ liegt die Finesse bereits über 60, das heißt: sehr schmale, sehr scharf getrennte Transmissionslinien. Der freie Spektralbereich begrenzt zugleich den Einsatz: Wellenlängen, die sich um eine ganze Ordnung unterscheiden, liefern dasselbe Bild und müssen durch einen Vorfilter getrennt werden.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "fabry-perot-intensitaet",
        name: "Intensität Fabry-Perot",
        equation: "IR = I0 * (F * sin(dphi/2) * sin(dphi/2)) / (1 + F * sin(dphi/2) * sin(dphi/2))",
        variables: [
          { id: "IR", label: "reflektierte Intensität", symbol: "I_R", unit: "—", description: "Intensität des reflektierten Strahls" },
          { id: "I0", label: "einfallende Intensität", symbol: "I_0", unit: "—", description: "Intensität des einfallenden Strahls" },
          { id: "F", label: "Finesse", symbol: "F", unit: "—", description: "Finesseparameter" },
          { id: "dphi", label: "Phasendifferenz", symbol: "Δφ", unit: "rad", description: "Phasenunterschied" },
        ],
        umstellungen: [
          { solveFor: "IR", expr: "I0 * (F * sin(dphi/2) * sin(dphi/2)) / (1 + F * sin(dphi/2) * sin(dphi/2))" },
          { solveFor: "dphi", expr: "2 * asin(sqrt(IR / (I0 * (F - IR * F))))" },
          { solveFor: "F", expr: "(IR / I0) / (sin(dphi/2) * sin(dphi/2) - IR / I0 * sin(dphi/2) * sin(dphi/2))" },
        ],
        hints: ["Maxima bei Δφ = 2πm.", "Große Finesse → schmale Maxima."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wann tritt ein Maximum der Transmission auf?", options: ["Δφ = 2πm", "Δφ = π", "Δφ = π/2", "Δφ = 0 nur für m=0"], correct: 0, explanation: "Maxima entstehen bei Δφ = 2πm." },
    { id: "q2", question: "Was beschreibt die Finesse F?", options: ["Die Dicke der Platte", "Die Reflexivität der Platte", "Die Anzahl der Strahlen", "Die Wellenlänge"], correct: 1, explanation: "F = 4R/(1−R)² hängt direkt von R ab." },
    { id: "q3", question: "Wie verhält sich die spektrale Breite bei großer Finesse?", options: ["Sie bleibt konstant", "Sie wird größer", "Sie wird kleiner", "Sie verschwindet"], correct: 2, explanation: "Große Finesse → schmale Maxima." },
    { id: "q4", question: "Was ist die Bedingung für Maxima der Reflexion?", options: ["Δs = (m+1/2)λ", "Δs = λ/4", "Δs = 2λ", "Δs = mλ"], correct: 3, explanation: "Δφ = 2πm → Δs = mλ." },
    { id: "q5", question: "Welche Größen bestimmen die Phasendifferenz Δφ im Fabry‑Perot‑Interferometer?", options: ["d, n, α und λ", "nur λ und R", "nur d und R", "nur α und R"], correct: 0, explanation: "Δs = 2d√(n² − sin²α) → Δφ = (2π/λ)Δs." },
    { id: "q6", question: "Was passiert bei R → 1?", options: ["Keine Interferenz", "Maxima werden extrem schmal", "Intensität wird konstant", "Δφ wird unabhängig von λ"], correct: 1, explanation: "Große Reflexivität → hohe Finesse → schmale Maxima." },
  ],
  flashcards: [
    { id: "0k9qd2i", front: "Finesse", back: "F = 4R/(1−R)². Große Finesse bedeutet hohe spektrale Auflösung." },
    { id: "1l4lllf", front: "Maxima Fabry-Perot", back: "Δφ = 2πm. Nur bestimmte Wellenlängen werden maximal transmittiert." },
    { id: "1bodp4s", front: "Gangunterschied", back: "Δs = 2d√(n² − sin²α). Bestimmt die Phasenverschiebung." },
    { id: "10655ca", front: "Reflexionsintensität", back: "I_R/I_0 = F sin²(Δφ/2)/(1 + F sin²(Δφ/2))." },
    { id: "1vk7stj", front: "Vielstrahlinterferenz", back: "Unendlich viele Teilstrahlen interferieren. Summation ergibt geometrische Reihe." },
    { id: "1qyexzt", front: "Anwendungen des Fabry-Perot-Interferometers", back: "Laserresonatoren, Spektralanalyse, Interferenzfilter, Brechungsindexmessung." },
  ],
} satisfies Thema;
