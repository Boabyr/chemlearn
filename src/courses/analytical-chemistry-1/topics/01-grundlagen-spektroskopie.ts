import type { Thema } from '../../../content/schema'

export const topic = {
  id: "01-grundlagen-spektroskopie",
  title: "Grundlagen der Spektroskopie",
  subtitle: "Elektromagnetisches Spektrum, Wechselwirkung Strahlung–Materie",
  icon: "🌈",
  estimatedMinutes: 60,
  theory: `
## Spektroskopie als Rückgrat der Analytik

Spektroskopie, Chromatographie und Elektroanalytik bilden das "Rückgrat" der modernen Analytischen Chemie. Spektroskopische Methoden beruhen auf der Wechselwirkung von elektromagnetischer Strahlung mit Materie.

## Elektromagnetische Strahlung

Elektromagnetische Strahlung lässt sich als Welle oder als Teilchen beschreiben:

- **Wellennatur:** erklärt Wellenlänge (λ), Frequenz (ν), Amplitude, Ausbreitungsgeschwindigkeit
- **Teilchennatur (Photonen):** erklärt Absorption und Emission

Grundlegende Beziehungen:
- c = λ · ν  (c = 3×10⁸ m/s, Lichtgeschwindigkeit)
- E = h · ν  (h = 6.626×10⁻³⁴ J·s, Planck'sches Wirkungsquantum)
- E = h · c / λ

## Das elektromagnetische Spektrum

| Spektroskopieart | Spektralbereich | Art der Anregung |
|---|---|---|
| γ-Strahlenemission | 0,005–1,4 Å | Kern |
| Röntgenspektroskopie | 0,1–100 Å | Elektronen innerer Schalen |
| UV-Spektroskopie | 180–400 nm | Valenzelektronen |
| Sichtbar (Vis) | 400–780 nm | Valenzelektronen |
| NIR | 780–2500 nm | Kombinations-/Oberschwingungen |
| IR (MIR) | 400–4000 cm⁻¹ | Rotationen und Schwingungen |
| Mikrowelle | 0,75–3,75 mm | Rotation von Molekülen |
| ESR | 3 cm | Elektronenspin im Magnetfeld |
| NMR | 0,6–10 m | Kernspin im Magnetfeld |

## Wichtige Fragen bei jeder Spektroskopie

1. In welchem **Wellenlängenbereich** wird gearbeitet?
2. Welchem **Anregungsmechanismus** entspricht das?
3. Wie ist das **Spektrometer aufgebaut**?

## Allgemeiner Aufbau eines Spektrometers

**Dispersives Spektrometer:**
Lichtquelle → Monochromator → Probe → Detektor → Recorder

**FT-Spektrometer (Fourier-Transform):**
Breitbandlichtquelle → Interferometer (Michelson) → Probe → Detektor → Fourier-Transformation → Spektrum

## Wechselwirkung Strahlung–Materie

**Absorption:** Photon wird vom Molekül aufgenommen → Anregung in höheren Energiezustand
**Emission:** Angeregtes Molekül gibt Photon ab → Relaxation
**Streuung:** Strahlung wird in anderen Richtungen abgelenkt (elastisch: Rayleigh; inelastisch: Raman)

**Lambert-Beer'sches Gesetz (Grundlage der Absorptionsspektrometrie):**
A = ε · c · d
(wird in Thema 02 detailliert behandelt)

## Warum jede Messung einen Bezugswert braucht

Ein Detektor misst eine Lichtintensität, keine Absorption. Die Absorption entsteht erst
aus dem Verhältnis zweier Intensitäten — mit und ohne Probe. Deshalb gehört zu jeder
Absorptionsmessung ein Blindwert: dieselbe Küvette, dasselbe Lösungsmittel, nur ohne
Analyt. Alles, was Lösungsmittel und Glas an Licht schlucken, fällt damit heraus.

**Einstrahlgerät:** Blind und Probe werden nacheinander gemessen. Driftet die Lampe
zwischen beiden Messungen, geht das direkt in das Ergebnis ein.

**Zweistrahlgerät:** Ein Strahlteiler schickt Licht gleichzeitig durch Probe und
Referenz. Lampendrift trifft beide Wege gleich und kürzt sich heraus — der Grund, warum
Zweistrahlgeräte für lange Messreihen der Standard sind.

## Auflösung, Empfindlichkeit und der Kompromiss dazwischen

Ein Monochromator schneidet aus dem Licht ein Band heraus. Ein schmaler Spalt liefert
eine gute spektrale Auflösung, lässt aber wenig Licht durch — das Signal wird kleiner und
das Rauschen relativ größer. Ein breiter Spalt kehrt beides um. Jede Einstellung an einem
dispersiven Gerät ist ein Handel zwischen Auflösung und Signal-Rausch-Verhältnis.

## Warum Fourier-Transform-Geräte gewonnen haben

Ein FT-Spektrometer misst nicht Wellenlänge für Wellenlänge, sondern alle gleichzeitig als
Interferogramm.

- **Multiplex-Vorteil (Fellgett):** alle Wellenlängen werden die ganze Messzeit über
  erfasst statt jede nur einen Bruchteil davon → besseres Signal-Rausch-Verhältnis oder
  dieselbe Qualität in kürzerer Zeit
- **Durchsatz-Vorteil (Jacquinot):** kein enger Spalt nötig, es kommt deutlich mehr Licht
  zum Detektor
- **Wellenzahlgenauigkeit:** ein Referenzlaser eicht die Spiegelposition mit

Deshalb ist die IR-Spektroskopie heute praktisch vollständig FT-IR, während im UV/Vis —
wo Lichtquellen stark und Detektoren empfindlich sind — dispersive Geräte und
Dioden-Array-Detektoren weiterhin genügen.
`,
  interactives: [
    {
      type: "apparatus-quiz",
      question: "Fluoreszenzspektrometer",
      targetId: "fluorescence",
      explanation: "Das Fluoreszenzspektrometer hat einen sehr einfachen Aufbau: Die Probe selbst emittiert Licht nach Anregung. Daher wird nur die Probe und ein Detektor (senkrecht zur Anregungsrichtung) benötigt – kein Referenzstrahl nötig. Das macht die Methode sehr empfindlich (kein Hintergrundsignal).",
      hint1: "Fluoreszenzspektrometer messen emittiertes Licht, nicht transmittiertes. Der Detektor steht daher im 90°-Winkel zur Anregungsquelle.",
      hint2: "Beim Fluoreszenzspektrometer: Lichtquelle → Probe → Detektor (90°). Kein Referenzstrahl nötig, weil kein Licht durch die Probe 'hindurchgeht'.",
      options: [
        {
          id: "fluorescence",
          label: "Fluoreszenzspektrometer",
          description: "Detektor im 90°-Winkel, misst Emission"
        },
        {
          id: "uv-vis",
          label: "UV/Vis-Absorptionsspektrometer",
          description: "Detektor hinter der Probe, misst Transmission"
        },
        {
          id: "chemoluminescence",
          label: "Chemolumineszenz-Detektor",
          description: "Einfachster Aufbau: nur Probe und Detektor"
        },
        {
          id: "ftir",
          label: "FT-IR Spektrometer",
          description: "Mit Michelson-Interferometer"
        }
      ]
    },
    {
      type: "apparatus-matching",
      title: "Vier Spektrometer, vier Aufbauten",
      description: "Ordne jedem Gerät seine Skizze zu. Achte darauf, wo der Detektor steht und ob es überhaupt eine Lichtquelle gibt.",
      explanation: "Die drei Merkmale, an denen man die Aufbauten auseinanderhält: Das UV/Vis-Photometer setzt den Detektor hinter die Probe — gemessen wird, was durchkommt. Das Fluoreszenzspektrometer stellt ihn im rechten Winkel dazu, damit der Anregungsstrahl nicht mitgemessen wird. Die Chemolumineszenz braucht gar keine Lichtquelle, das Licht entsteht in der Probe. Das FT-IR ersetzt den Monochromator durch ein Interferometer und misst alle Wellenlängen gleichzeitig.",
      paare: [
        {
          apparaturId: "uv-vis",
          label: "UV/Vis-Photometer",
          hinweis: "Detektor direkt hinter der Probe."
        },
        {
          apparaturId: "fluorescence",
          label: "Fluoreszenzspektrometer",
          hinweis: "Detektor im 90°-Winkel."
        },
        {
          apparaturId: "chemoluminescence",
          label: "Chemolumineszenz-Detektor",
          hinweis: "Keine Lichtquelle im Bild."
        },
        {
          apparaturId: "ftir",
          label: "FT-IR-Spektrometer",
          hinweis: "Interferometer statt Monochromator."
        }
      ]
    },
  ],
  quiz: [
    { id: "q1", question: "Welche Gleichung beschreibt den Zusammenhang zwischen Energie eines Photons und seiner Frequenz?", options: ["E = mc²", "E = ε · c · d", "E = h · ν", "E = λ · ν"], correct: 2, explanation: "E = h · ν (Planck'sche Gleichung). h = 6.626×10⁻³⁴ J·s (Planck'sches Wirkungsquantum), ν = Frequenz. Höhere Frequenz = höhere Energie = kürzere Wellenlänge." },
    { id: "q2", question: "IR-Strahlung regt in Molekülen welche Art von Übergängen an?", options: ["Elektronenübergänge in inneren Schalen", "Kernspinübergänge", "Kernübergänge", "Rotations- und Schwingungsübergänge"], correct: 3, explanation: "IR (400–4000 cm⁻¹) regt Rotations- und Schwingungsübergänge in Molekülen an. UV/Vis regt Valenzelektronen an, Röntgen innere Elektronen, NMR den Kernspin." },
    { id: "q3", question: "Was erklärt die Wellennatur der elektromagnetischen Strahlung?", options: ["Wellenlänge, Frequenz und Amplitude", "Absorption und Emission einzelner Photonen", "Die Quantisierung der Energieniveaus", "Der photoelektrische Effekt"], correct: 0, explanation: "Die Wellenbeschreibung erfasst alles Periodische: Wellenlänge λ, Frequenz ν, Amplitude und die Ausbreitungsgeschwindigkeit c, verknüpft über c = λ·ν. Absorption, Emission und der photoelektrische Effekt lassen sich damit nicht erklären — dafür braucht es die Teilchenbeschreibung mit E = h·ν. Beide Bilder werden nebeneinander gebraucht." },
    { id: "q4", question: "Welchen Wellenlängenbereich deckt die sichtbare Spektroskopie (Vis) ab?", options: ["10–180 nm", "180–400 nm", "400–780 nm", "780–2500 nm"], correct: 2, explanation: "Vis: 400–780 nm. UV: 180–400 nm. NIR: 780–2500 nm. Das sichtbare Licht entspricht den Farben des Regenbogens (400 nm violett bis 780 nm rot)." },
    { id: "q5", question: "Was ist der Hauptunterschied zwischen einem dispersiven Spektrometer und einem FT-Spektrometer?", options: ["Das FT-Gerät kommt ohne eigene Lichtquelle aus", "Dispersive Geräte lösen grundsätzlich besser auf", "Ein Interferometer statt eines Monochromators", "Das FT-Gerät arbeitet nur im IR-Bereich"], correct: 2, explanation: "Das dispersive Gerät schneidet mit einem Monochromator eine Wellenlänge nach der anderen heraus. Das FT-Gerät schickt alle gleichzeitig durch ein Michelson-Interferometer und rechnet das Interferogramm anschließend in ein Spektrum um. Daraus folgen der Multiplex-Vorteil (alle Wellenlängen die ganze Messzeit über) und der Durchsatz-Vorteil (kein enger Spalt nötig)." },
    { id: "q6", question: "Welche der folgenden Spektroskopiearten hat den niedrigsten Energiebedarf pro Photon?", options: ["Röntgenspektroskopie", "UV-Spektroskopie", "IR-Spektroskopie", "NMR-Spektroskopie"], correct: 3, explanation: "NMR arbeitet im Radiowellenbereich (0,6–10 m Wellenlänge) → niedrigste Frequenz → niedrigste Photonenenergie (E = h·ν). Röntgen hat die höchste Energie." },
    { id: "q7", question: "Ein Photon hat die Wellenlänge 500 nm. Welche Wellenzahl entspricht dem?", options: ["500 cm⁻¹", "2000 cm⁻¹", "20000 cm⁻¹", "200000 cm⁻¹"], correct: 2, explanation: "ṽ = 1/λ, mit λ in Zentimetern: 500 nm = 5×10⁻⁵ cm, also ṽ = 1/5×10⁻⁵ = 20000 cm⁻¹. Der häufigste Fehler ist, die Umrechnung nm → cm zu vergessen und um Zehnerpotenzen danebenzuliegen." },
    { id: "q8", question: "Warum sitzt der Monochromator in einem Absorptionsphotometer vor der Küvette und nicht dahinter?", options: ["Weil der Detektor sonst überstrahlt würde", "Weil Lambert-Beer monochromatisches Licht voraussetzt", "Weil das Gitter im Dunkeln arbeiten muss", "Weil die Probe sonst nicht durchleuchtet wird"], correct: 1, explanation: "Bei polychromatischem Licht gilt das Gesetz nicht mehr streng, weil ε wellenlängenabhängig ist und die Kalibriergerade krumm wird. Zusätzlich wird die Probe geschont, weil sie nur die Messwellenlänge abbekommt. Am Detektor käme das Licht ohnehin an — die Reihenfolge betrifft die Gültigkeit der Auswertung, nicht die Messbarkeit." },
    { id: "q9", question: "Welche Spektroskopieart regt Elektronenübergänge der Valenzelektronen an?", options: ["Mikrowellenspektroskopie", "IR-Spektroskopie", "Röntgenspektroskopie", "UV/Vis-Spektroskopie"], correct: 3, explanation: "UV/Vis-Photonen tragen einige Elektronenvolt und heben Valenzelektronen in höhere Orbitale. Infrarot reicht nur für Schwingungen, Mikrowellen für Rotationen, und Röntgenphotonen greifen die kernnahen Elektronen an. Die Energieleiter Rotation < Schwingung < Valenzelektron < Rumpfelektron ordnet die Methoden vollständig." },
    { id: "q10", question: "Was gibt die Auflösung eines Spektrometers an?", options: ["Den kleinsten noch trennbaren Wellenlängenabstand zweier Linien", "Die kleinste noch messbare Konzentration", "Die Zahl der Messpunkte je Sekunde", "Die Breite des zugänglichen Spektralbereichs"], correct: 0, explanation: "Auflösung ist ein spektrales Trennvermögen, üblich als λ/Δλ angegeben. Die kleinste messbare Konzentration ist die Nachweisgrenze, eine ganz andere Kenngröße — ein hochauflösendes Gerät kann durchaus unempfindlich sein." },
    { id: "q11", question: "Ein Gerät misst mit einer spektralen Bandbreite, die breiter ist als die Absorptionsbande der Probe. Welche Folge hat das?", options: ["Die Absorption wird zu hoch gemessen", "Die Absorption fällt zu niedrig aus", "Die Wellenlängenskala verschiebt sich zu kürzeren Wellen", "Die Transmission übersteigt rechnerisch 100 Prozent"], correct: 1, explanation: "Neben der stark absorbierten Wellenlänge gelangt auch schwach absorbiertes Licht zum Detektor; dieser Anteil täuscht Durchlässigkeit vor. Das Ergebnis ist eine zu kleine Absorption, und weil der Effekt mit der Konzentration wächst, biegt sich die Kalibriergerade zur Abszisse — eine der klassischen Abweichungen von Lambert-Beer." },
    { id: "q12", question: "Welche Größe bleibt beim Übergang eines Lichtstrahls von Luft in Glas unverändert?", options: ["Die Wellenlänge", "Die Ausbreitungsgeschwindigkeit", "Die Frequenz", "Die Richtung"], correct: 2, explanation: "Die Frequenz ist durch die Quelle festgelegt und ändert sich beim Medienwechsel nicht. Geschwindigkeit und Wellenlänge sinken um den Brechungsindex, die Richtung ändert sich durch Brechung. Deshalb ist die Energie E = h·ν im Glas dieselbe wie in Luft." },
  ],
  flashcards: [
    { id: "0r9xh85", front: "Lambert-Beer-Gesetz (Kurzform)", back: "A = ε · c · d. A = Absorption (dimensionslos), ε = molarer Extinktionskoeffizient (L·mol⁻¹·cm⁻¹), c = Konzentration (mol/L), d = Schichtdicke (cm)." },
    { id: "1wahz4s", front: "Elektromagnetisches Spektrum – Reihenfolge", back: "γ-Strahlung → Röntgen → UV → Vis → NIR → IR → Mikrowelle → Radiowellen. Mit zunehmender Wellenlänge nimmt die Energie ab." },
    { id: "1i7e5ou", front: "c = λ · ν", back: "Lichtgeschwindigkeit c = 3×10⁸ m/s = Wellenlänge λ × Frequenz ν. Kurze Wellenlänge = hohe Frequenz = hohe Energie." },
    { id: "0jll9w1", front: "Dispersives vs. FT-Spektrometer", back: "Dispersiv: Monochromator trennt Wellenlängen, sequentielle Messung. FT: Michelson-Interferometer, alle λ gleichzeitig (Multiplex-Vorteil), Fourier-Transformation gibt Spektrum." },
    { id: "1iyunxu", front: "Anregungsarten im elektromagnetischen Spektrum", back: "Röntgen: innere Elektronen. UV/Vis: Valenzelektronen. IR: Schwingungen/Rotationen. Mikrowelle: Rotationen. NMR: Kernspin. ESR: Elektronenspin." },
    { id: "0d4yobt", front: "Warum der Detektor beim Photometer in Strahlrichtung steht", back: "Beim Absorptionsphotometer misst man das Licht, das die Probe durchgelassen hat — Detektor also in der Achse Lichtquelle–Küvette. Bei der Fluoreszenz misst man dagegen neu ausgesandtes Licht und stellt den Detektor im rechten Winkel, damit das Anregungslicht nicht mitgemessen wird." },
  ],
} satisfies Thema;
