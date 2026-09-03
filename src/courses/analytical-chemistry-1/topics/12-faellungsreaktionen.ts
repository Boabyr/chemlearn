import type { Thema } from '../../../content/schema'

export const topic = {
  id: "12-faellungsreaktionen",
  title: "Fällungsreaktionen & Gravimetrie",
  subtitle: "Löslichkeitsprodukt, Fällung, Gravimetrie, Sulfidtrenngang",
  icon: "🧪",
  estimatedMinutes: 65,
  theory: `
## Löslichkeitsprodukt Ksp

Für schwerlösliches Salz AB:
AB(s) ⇌ A⁺(aq) + B⁻(aq)
Ksp = [A⁺][B⁻]

Löslichkeit s: [A⁺] = [B⁻] = s → Ksp = s²

**Beispiel AgCl:** Ksp = 1,8×10⁻¹⁰
s = √(1,8×10⁻¹⁰) = 1,34×10⁻⁵ mol/L

## Fällung und gemeinsamer Ioneneffekt

Zugabe eines gemeinsamen Ions verringert die Löslichkeit!

**Beispiel:** AgNO₃ zu AgCl:
[Ag⁺] erhöht → [Cl⁻] muss sinken → AgCl fällt aus.

**Fällungsbedingung:** [A⁺]·[B⁻] > Ksp

## Sulfidtrenngang (prüfungsrelevant!)

H₂S-Fällung aus saurer Lösung (pH = 3):

**Gruppe 1 (fällen bei pH 3):** Cu²⁺, Cd²⁺, Hg²⁺ → sehr kleines Ksp
**Gruppe 2 (fällen erst bei neutral/basisch):** Mn²⁺, Fe²⁺ → größeres Ksp
**Nicht gefällt:** Mg²⁺, Ca²⁺, Na⁺, K⁺

**Prüfungsaufgabe-Typ:**
Cu, Cd, Fe, Mn in pH 3 + H₂S:
- CuS (Ksp = 6×10⁻³⁶): FÄLLT
- CdS (Ksp = 8×10⁻²⁷): FÄLLT
- FeS (Ksp = 6×10⁻¹⁸): FÄLLT NICHT bei pH 3
- MnS (Ksp = 3×10⁻¹⁴): FÄLLT NICHT bei pH 3

## Gravimetrie

**Prinzip:** Analyt wird als schwerlöslicher Niederschlag gefällt, abfiltriert und als definierte Verbindung gewogen.

**Schritte:**
1. Auflösung der Probe
2. Fällung (gezielt, quantitativ)
3. Verdauen (Kristalle wachsen lassen)
4. Filtrieren + Waschen
5. Glühen (→ definierte Zusammensetzung)
6. Wägen

**Beispiel:** Fe³⁺ → Fe₂O₃
n(Fe) = 2 · n(Fe₂O₃)
m(Fe) = n · M(Fe) = [m(Fe₂O₃)/M(Fe₂O₃)] · 2 · M(Fe)

**Vorteile:** absolutes Verfahren, keine Kalibrierung
**Nachteile:** zeitaufwendig, nur für Hauptbestandteile geeignet

## Löslichkeitsprodukt und analytische Anwendungen

**Fällungstitration (Argentometrie):**
Ag⁺ + Cl⁻ → AgCl↓
Nachweis über Potentiometrie oder Indikator (Mohr, Volhard, Fajans)

**Berechnung der Löslichkeit:**
Ksp(CaF₂) = [Ca²⁺][F⁻]² = s · (2s)² = 4s³
s = ∛(Ksp/4)

## Warum die Stöchiometrie als Exponent auftaucht

Der häufigste Fehler bei Löslichkeitsrechnungen ist, aus Ksp einfach die Wurzel zu ziehen.
Das gilt nur für Salze vom Typ AB. Sobald ein Ion mehrfach vorkommt, geht sein
Koeffizient zweimal ein: einmal als Faktor vor s, einmal als Exponent.

| Typ | Beispiel | Zusammenhang | Löslichkeit |
|---|---|---|---|
| AB | AgCl | Ksp = s² | s = √Ksp |
| AB₂ | CaF₂ | Ksp = 4s³ | s = ∛(Ksp/4) |
| A₂B | Ag₂CrO₄ | Ksp = 4s³ | s = ∛(Ksp/4) |
| AB₃ | Fe(OH)₃ | Ksp = 27s⁴ | s = ⁴√(Ksp/27) |

Daraus folgt auch, dass sich Löslichkeitsprodukte verschiedener Typen **nicht** direkt
vergleichen lassen. Ag₂CrO₄ hat mit 1,1×10⁻¹² ein kleineres Ksp als AgCl mit 1,8×10⁻¹⁰,
ist aber die besser lösliche Verbindung — weil bei drei Ionen je Formeleinheit aus einem
kleineren Produkt eine größere Löslichkeit folgt.

## Fällen, aber vollständig

Als quantitativ gilt eine Fällung, wenn weniger als 0,1 % des Analyten in Lösung bleiben.
Erreicht wird das über den gemeinsamen Ioneneffekt: ein Überschuss des Fällungsreagenzes
drückt die Restkonzentration.

Zu viel Überschuss schadet allerdings. Manche Niederschläge lösen sich als Komplex wieder
auf — AgCl geht bei hohem Chloridüberschuss als [AgCl₂]⁻ in Lösung zurück. Dazwischen
liegt das Optimum, meist beim etwa 1,1-fachen der stöchiometrischen Menge.

**Verdauen (Digerieren):** Der frische Niederschlag wird in der Mutterlauge stehen
gelassen oder erwärmt. Kleine Kristalle lösen sich, große wachsen; die Oberfläche sinkt
und mit ihr die Menge an mitgerissenen Fremdionen. Ohne diesen Schritt ist ein
gravimetrisches Ergebnis systematisch zu hoch.
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "loeslichkeitsprodukt",
        name: "Löslichkeitsprodukt eines 1:1-Salzes",
        equation: "Ksp = s²",
        variables: [
          {
            id: "Ksp",
            label: "Löslichkeitsprodukt",
            symbol: "Ksp",
            unit: "mol²/L²",
            description: "Ionenprodukt der gesättigten Lösung"
          },
          {
            id: "s",
            label: "Löslichkeit",
            symbol: "s",
            unit: "mol/L",
            description: "Molare Löslichkeit des Salzes"
          }
        ],
        umstellungen: [
          {
            solveFor: "Ksp",
            expr: "s ^ 2"
          },
          {
            solveFor: "s",
            expr: "sqrt(Ksp)"
          }
        ],
        hints: [
          "Gilt nur für Salze vom Typ AB, bei denen [A⁺] = [B⁻] = s ist. AgCl: Ksp = 1,8·10⁻¹⁰ führt auf s = 1,34·10⁻⁵ mol/L.",
          "Bei CaF₂ (Typ AB₂) gilt Ksp = 4s³, also s = ∛(Ksp/4). Die Stöchiometrie geht als Exponent ein — nicht einfach die Wurzel ziehen."
        ]
      }
    },
  ],
  quiz: [
    { id: "q1", question: "Welche Ionen werden aus einer Lösung mit Cu²⁺, Cd²⁺, Fe²⁺, Mn²⁺ bei pH 3 durch H₂S quantitativ gefällt?", options: ["Alle vier Ionen fallen aus", "Nur Cu²⁺ und Cd²⁺ fallen aus", "Nur Fe²⁺ und Mn²⁺ fallen aus", "Bei pH 3 fällt keines der Ionen"], correct: 1, explanation: "Bei pH 3 liefert H₂S nur sehr wenig S²⁻. Das reicht, um die winzigen Löslichkeitsprodukte von CuS (6·10⁻³⁶) und CdS (8·10⁻²⁷) zu überschreiten, nicht aber die von FeS (6·10⁻¹⁸) und MnS (3·10⁻¹⁴). Genau darauf beruht der Sulfidtrenngang: erst sauer fällen, dann neutral bis basisch." },
    { id: "q2", question: "Was ist das Löslichkeitsprodukt Ksp?", options: ["Die Konzentration eines gesättigten Salzes in Wasser", "Das Produkt der Reagenzkonzentrationen", "Die Gleichgewichtskonstante Ksp = [Kation]·[Anion]", "Der pH-Wert, bei dem die Fällung einsetzt"], correct: 2, explanation: "Ksp ist die Gleichgewichtskonstante des Lösevorgangs eines schwerlöslichen Salzes. Übersteigt das Ionenprodukt in der Lösung diesen Wert, fällt der Feststoff aus. Die Koeffizienten der Formel gehen als Exponenten ein: für CaF₂ gilt Ksp = [Ca²⁺][F⁻]² = 4s³, nicht s²." },
    { id: "q3", question: "Welches Verfahren ist die Gravimetrie?", options: ["Eine elektrochemische Bestimmung", "Eine spektroskopische Messung", "Eine chromatographische Trennung", "Fällen, filtrieren, glühen und wägen"], correct: 3, explanation: "Der Analyt wird als schwerlöslicher Niederschlag gefällt, abfiltriert, gewaschen, geglüht und als definierte Verbindung gewogen. Aus der Molmasse folgt die Stoffmenge unmittelbar. Der Preis ist der Zeitaufwand — und die Methode taugt nur für Hauptbestandteile, nicht für Spuren." },
    { id: "q4", question: "Wie beeinflusst der gemeinsame Ioneneffekt die Löslichkeit eines Salzes?", options: ["Er verringert sie, das Gleichgewicht wandert zur Fällung", "Er erhöht die Löslichkeit des Salzes in jedem Fall", "Er hat auf die Löslichkeit keinen Einfluss", "Die Wirkung hängt allein von der Temperatur ab"], correct: 0, explanation: "Ksp bleibt konstant. Erhöht man ein Ion, muss das andere sinken — der Feststoff fällt aus. Deshalb fällt man mit leichtem Überschuss des Reagenzes. Zu viel schadet allerdings: AgCl geht bei hohem Chloridüberschuss als Komplex [AgCl₂]⁻ wieder in Lösung." },
    { id: "q5", question: "Wie berechnet man aus 0,5g Fe₂O₃ die Masse an Fe?", options: ["m(Fe) = m(Fe₂O₃)", "m(Fe) = m(Fe₂O₃) · 2·M(Fe)/M(Fe₂O₃)", "m(Fe) = m(Fe₂O₃) · M(Fe)/M(Fe₂O₃)", "m(Fe) = m(Fe₂O₃)/2"], correct: 1, explanation: "n(Fe₂O₃) = 0,5/159,7 = 0,00313 mol. n(Fe) = 2 × n(Fe₂O₃) = 0,00626 mol. m(Fe) = 0,00626 × 55,85 = 0,350g. Oder: m(Fe) = m(Fe₂O₃) × 2×55,85/159,7." },
    { id: "q6", question: "Warum ist Gravimetrie ein 'absolutes' Verfahren?", options: ["Weil das Verfahren immer exakt misst", "Weil der Fehler dabei am kleinsten ist", "Weil keine Kalibrierung mit Standards nötig ist", "Weil es sich auf alle Elemente anwenden lässt"], correct: 2, explanation: "Gewogen wird eine Verbindung bekannter Zusammensetzung; der Weg von der Masse zur Stoffmenge führt allein über die Molmasse. Es gibt keine Kalibriergerade und keine Standardlösung, deren Gehalt seinerseits unsicher wäre. Dieselbe Eigenschaft hat die Coulometrie über die Faraday-Konstante." },
    { id: "q7", question: "Wie groß ist die Löslichkeit von AgCl in reinem Wasser (Ksp = 1,8×10⁻¹⁰)?", options: ["1,3×10⁻⁵ mol/L", "1,8×10⁻¹⁰ mol/L", "1,3×10⁻³ mol/L", "9,0×10⁻¹¹ mol/L"], correct: 0, explanation: "Für ein 1:1-Salz ist s = √Ksp = √(1,8×10⁻¹⁰) = 1,34×10⁻⁵ mol/L. Wer die Wurzel vergisst, gibt das Löslichkeitsprodukt selbst als Löslichkeit an — ein Fehler um fünf Zehnerpotenzen." },
    { id: "q8", question: "Wie wirkt sich der Zusatz von NaCl auf die Löslichkeit von AgCl aus?", options: ["Sie steigt, weil die Ionenstärke zunimmt", "Sie bleibt unverändert", "Sie sinkt wegen des gemeinsamen Ioneneffekts", "Das Salz fällt vollständig aus"], correct: 2, explanation: "Zusätzliches Chlorid verschiebt das Gleichgewicht nach Le Chatelier auf die Seite des Feststoffs, [Ag⁺] muss sinken, damit das Produkt konstant bleibt. Genau deshalb wird gravimetrisch mit einem leichten Überschuss an Fällungsmittel gearbeitet. In sehr großem Überschuss kehrt sich der Effekt allerdings um, weil sich lösliche Chlorokomplexe bilden." },
    { id: "q9", question: "Was geschieht beim Altern (Digerieren) eines frisch gefällten Niederschlags?", options: ["Er löst sich langsam wieder auf", "Kleine Kristalle gehen zugunsten großer in Lösung", "Er nimmt Wasser auf und quillt", "Seine chemische Zusammensetzung ändert sich dabei"], correct: 1, explanation: "Kleine Kristalle haben ein größeres Verhältnis von Oberfläche zu Volumen und sind deshalb löslicher; über die Lösung wandert Material zu den großen. Die Kristalle werden gröber, eingeschlossene Fremdionen werden dabei frei, und der Niederschlag lässt sich besser filtrieren." },
    { id: "q10", question: "Warum wird ein gravimetrischer Niederschlag mit verdünnter Elektrolytlösung statt mit reinem Wasser gewaschen?", options: ["Weil reines Wasser nicht benetzt", "Weil der zugesetzte Elektrolyt den Niederschlag chemisch stabilisiert", "Weil reines Wasser den Niederschlag peptisieren würde", "Weil so schneller getrocknet wird"], correct: 2, explanation: "Ohne Elektrolyt geht die Ladungsabschirmung an den Teilchen verloren, das Kolloid zerfällt wieder und läuft durchs Filter. Ein flüchtiger Elektrolyt wie Ammoniumnitrat hält den Niederschlag zusammen und verschwindet beim späteren Glühen rückstandsfrei." },
    { id: "q11", question: "Welcher Umrechnungsfaktor führt in der Gravimetrie von der Wägeform BaSO₄ auf den Schwefelgehalt?", options: ["M(S)/M(BaSO₄)", "M(BaSO₄)/M(S)", "2·M(S)/M(BaSO₄)", "M(S)/(2·M(BaSO₄))"], correct: 0, explanation: "Der gravimetrische Faktor ist das Verhältnis der gesuchten zur gewogenen Molmasse, mit der Stöchiometrie gewichtet. In BaSO₄ steckt genau ein Schwefelatom, also f = 32,07/233,4 = 0,1374. Ein Faktor 2 wäre nur bei zwei Atomen im Molekül nötig, wie bei Fe₂O₃." },
    { id: "q12", question: "Ab wann fällt ein Niederschlag aus einer Lösung aus?", options: ["Sobald das Ionenprodukt das Löslichkeitsprodukt übersteigt", "Sobald das Ionenprodukt kleiner als Ksp ist", "Sobald die Lösung gesättigt ist und gerührt wird", "Sobald der pH über 7 steigt"], correct: 0, explanation: "Erst wenn das aktuelle Ionenprodukt über Ksp liegt, ist die Lösung übersättigt und der Feststoff thermodynamisch begünstigt. In der Praxis kann sich die Fällung verzögern — übersättigte Lösungen sind haltbar, bis ein Kristallisationskeim oder eine geritzte Gefäßwand den Anstoß gibt." },
  ],
  flashcards: [
    { id: "0jwdyrb", front: "Löslichkeitsprodukt Ksp", back: "AB ⇌ A⁺ + B⁻: Ksp = [A⁺][B⁻]. Fällung wenn [A⁺][B⁻] > Ksp. Löslichkeit: s=√Ksp (für 1:1-Salz). AgCl: Ksp=1,8×10⁻¹⁰, s=1,34×10⁻⁵ mol/L." },
    { id: "1mrtmjs", front: "Sulfidtrenngang", back: "H₂S bei pH 3: Cu²⁺, Cd²⁺, Hg²⁺ (Ksp sehr klein) → FÄLLT. Fe²⁺, Mn²⁺, Ni²⁺, Co²⁺ (Ksp größer) → fällt NICHT bei pH 3 (erst bei neutral/basisch). Mg²⁺, Ca²⁺, Na⁺ → kein Sulfid." },
    { id: "1jp4bgx", front: "Gravimetrie – Schritte", back: "1. Auflösung. 2. Fällung. 3. Verdauen (Ostwald-Reifung). 4. Filtrieren+Waschen. 5. Glühen (→ definierte Verbindung). 6. Wägen. Absolutes Verfahren, keine Kalibrierung." },
    { id: "0fcqxnk", front: "Gemeinsamer Ioneneffekt", back: "Zugabe eines gemeinsamen Ions → Löslichkeit sinkt. Ksp = konstant: [Ag⁺] steigt → [Cl⁻] sinkt → AgCl fällt aus. Anwendung: quantitative Fällung durch Reagenzüberschuss." },
    { id: "1akzsky", front: "Fe gravimetrisch bestimmen", back: "Fe³⁺ → Fe₂O₃ (nach Fällung als Fe(OH)₃ + Glühen). n(Fe) = 2·n(Fe₂O₃). m(Fe) = n·55,85. Umrechnungsfaktor: 2×55,85/159,7 = 0,6994." },
    { id: "1kw37bw", front: "Warum CuS bei pH 3 fällt und FeS nicht", back: "H₂S liefert bei pH 3 nur sehr wenig S²⁻. Das reicht, um das winzige Ksp von CuS (6·10⁻³⁶) zu überschreiten, aber nicht das von FeS (6·10⁻¹⁸). Genau darauf beruht der Sulfidtrenngang: erst sauer fällen (Cu, Cd, Hg), dann neutral bis basisch (Mn, Fe)." },
  ],
} satisfies Thema;
