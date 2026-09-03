import type { Thema } from '../../../content/schema'

export const topic = {
  id: "08-voltammetrie-coulometrie",
  title: "Voltammetrie & Coulometrie",
  subtitle: "Strom-Spannungs-Methoden und Faraday'sche Gesetze",
  icon: "📊",
  estimatedMinutes: 70,
  theory: `
## Voltammetrie – Grundprinzip

Voltammetrie misst den Strom als Funktion der angelegten Spannung.

**Drei-Elektroden-Aufbau:**
- **Arbeitselektrode (WE):** Kleine Elektrode, an der Reaktion stattfindet
- **Referenzelektrode (RE):** Konstantes Potential (z.B. Ag/AgCl, SCE)
- **Gegenelektrode (CE):** Strom fließt zwischen WE und CE

**Warum drei Elektroden?**
Zwei-Elektroden: Referenz führt auch Strom → ihr Potential ändert sich.
Drei-Elektroden: RE misst nur Potential (kein Strom) → stabiles Referenzpotential.

## Diffusionsstrom und Grenzstrom

Bei ausreichend negativem Potential (für Reduktion):
Der Analyt wird an der Elektrode reduziert so schnell er diffundieren kann.

**Grenzstrom i_d (Ilkovič-Gleichung für DME):**
i_d = 708 · n · D^(1/2) · m^(2/3) · t^(1/6) · c

**Halbstufenpotential E_1/2:**
Charakteristisch für das Analyt-Ion → qualitative Information.
Bei E_1/2: i = i_d/2

## Wichtige Voltammetrie-Varianten

**Klassische Polarographie (DME):**
Quecksilber-Tropf-Elektrode → Stufenstrom-Kurven

**Differenz-Puls-Voltammetrie (DPV):**
Pulssignal überlagert → Differenzstrom gemessen → sehr empfindlich

**Stripping-Voltammetrie:**
1. Anreicherung: Analyt wird elektrochemisch an der WE abgeschieden
2. Rückstrippung: Potential erhöht → Analyt gelöst → Strompeak

Sehr empfindlich: Nachweisgrenzen im ng/L-Bereich!

## Cyclovoltammetrie (CV)

Potential wird hin- und hergefahren (Dreieck):
- Hinfahrt: Oxidation oder Reduktion
- Rückfahrt: Rückreaktion

**Auswertekriterien:**
- i_pc/i_pa ≈ 1: reversibles System
- E_pa − E_pc = 57/n mV: reversibles System (25°C)
- E_1/2 = (E_pa + E_pc)/2: Formalpotential

## Coulometrie

**Prinzip:** Messung der elektrischen Ladung Q beim vollständigen Umsatz des Analyten.

**Faraday'sche Gesetze:**
m = (M · Q)/(n · F) = (M · I · t)/(n · F)

| Symbol | Bedeutung |
|---|---|
| m | Masse des umgesetzten Stoffs (g) |
| M | Molmasse (g/mol) |
| Q | Ladung (C) = I · t |
| n | Elektronen pro Mol |
| F | Faraday-Konstante (96485 C/mol) |

**Vorteil Coulometrie:** Absolutes Verfahren (keine Kalibrierung nötig)!

**Karl-Fischer-Titration:** Coulometrische Wasserbestimmung – sehr präzise, μg-Bereich.

## Warum drei Elektroden und nicht zwei

In der Potentiometrie fließt kein Strom, deshalb genügen zwei Elektroden. In der
Voltammetrie fließt Strom — und ein stromdurchflossener Bezugspunkt ist keiner mehr: Die
Referenzelektrode würde sich polarisieren und ihr Potential verlieren.

Die Aufgaben werden deshalb aufgeteilt:
- **Arbeitselektrode:** hier läuft die interessierende Reaktion, hier wird das Potential
  vorgegeben
- **Referenzelektrode:** legt den Bezugspunkt fest, praktisch stromlos
- **Gegenelektrode (Hilfselektrode):** schließt den Stromkreis und nimmt den gesamten
  Strom auf

Damit bleibt das Potential der Arbeitselektrode genau definiert, während beliebig viel
Strom fließen darf.

## Woher der Grenzstrom kommt

Wird das Potential so weit vorgegeben, dass jedes ankommende Analytmolekül sofort umgesetzt
wird, ist die Konzentration direkt an der Elektrode null. Der Strom wird dann nicht mehr
von der Elektrodenreaktion begrenzt, sondern von der **Diffusion** aus der Lösung zur
Oberfläche — er läuft in ein Plateau.

Dieser Diffusionsgrenzstrom ist der Konzentration proportional und damit die analytische
Messgröße. Zwei Folgerungen für die Praxis:

- **Nicht rühren während der Messung**, sonst ändert sich die Diffusionsschicht und mit
  ihr der Strom.
- **Leitsalz im Überschuss zugeben** (etwa 0,1 M KCl). Sonst wandert der Analyt zusätzlich
  im elektrischen Feld, und dieser Migrationsanteil verfälscht den Zusammenhang zwischen
  Strom und Konzentration.

## Coulometrie: Zählen statt Vergleichen

Die Coulometrie misst die Ladung, die für den vollständigen Umsatz nötig war. Weil die
Faraday-Konstante eine Naturkonstante ist, führt der Weg von der Ladung zur Stoffmenge
ohne Kalibriergerade — deshalb ein Absolutverfahren. Voraussetzung ist eine
**Stromausbeute von 100 %**: jedes Elektron muss den Analyten umsetzen und keine
Nebenreaktion. Genau das prüft man mit einem Blindversuch.
`,
  interactives: [
    {
      type: "apparatus-quiz",
      question: "Drei-Elektroden-Aufbau für Voltammetrie",
      targetId: "three-electrode",
      explanation: "Der Drei-Elektroden-Aufbau (Arbeitselektrode WE + Referenzelektrode RE + Gegenelektrode CE) ist notwendig, damit die Referenzelektrode keinen Strom führt und ihr Potential stabil bleibt. Der Strom fließt zwischen WE und CE, die Spannung wird zwischen WE und RE gemessen.",
      hint1: "Zwei-Elektroden: RE führt Strom → Potential ändert sich. Drei-Elektroden: Potentiostat hält E(WE-RE) konstant, Strom fließt über CE.",
      hint2: "Arbeitselektrode (WE): klein, Reaktion findet hier statt. Referenzelektrode (RE): konstantes Potential, kein Strom. Gegenelektrode (CE): groß, Strom fließt hier.",
      options: [
        {
          id: "three-electrode",
          label: "Drei-Elektroden-Voltammetrie-Zelle",
          description: "WE + RE + CE + Potentiostat"
        },
        {
          id: "two-electrode",
          label: "Zwei-Elektroden-Zelle",
          description: "Nur Mess- und Referenzelektrode"
        },
        {
          id: "coulometry",
          label: "Coulometrische Zelle",
          description: "Vollständiger Umsatz, Ladungsmessung"
        },
        {
          id: "conductivity",
          label: "Leitfähigkeitsmesszelle",
          description: "Zwei Pt-Elektroden, Wechselstrom"
        }
      ]
    },
    {
      type: "apparatus-matching",
      title: "Vier elektrochemische Zellen",
      description: "Zähle die Elektroden und schau, was gemessen wird.",
      explanation: "Die Zwei-Elektroden-Anordnung genügt, solange kein Strom fließt — sobald er fließt, polarisiert sich die Referenz. Deshalb die Drei-Elektroden-Zelle: Arbeits-, Referenz- und Gegenelektrode teilen sich die Aufgaben. Die Coulometrie misst die Ladung bis zum vollständigen Umsatz, die Leitfähigkeitsmessung arbeitet mit Wechselstrom zwischen zwei inerten Platten, damit sich nichts abscheidet.",
      paare: [
        {
          apparaturId: "two-electrode",
          label: "Zwei-Elektroden-Anordnung",
          hinweis: "Nur sinnvoll, wenn kein Strom fließt."
        },
        {
          apparaturId: "three-electrode",
          label: "Drei-Elektroden-Zelle",
          hinweis: "Referenz bleibt stromlos."
        },
        {
          apparaturId: "coulometry",
          label: "Coulometrische Zelle",
          hinweis: "Gemessen wird die Ladung."
        },
        {
          apparaturId: "conductivity",
          label: "Leitfähigkeitsmesszelle",
          hinweis: "Zwei Platten, Wechselstrom."
        }
      ]
    },
  ],
  quiz: [
    { id: "q1", question: "Warum verwendet man in der Voltammetrie drei Elektroden statt zwei?", options: ["Damit die Referenzelektrode stromlos bleibt", "Drei Elektroden sind in der Anschaffung günstiger", "Um einen höheren Messstrom zu erreichen", "Aus Gründen des Arbeitsschutzes"], correct: 0, explanation: "In der Voltammetrie fließt Strom, und eine stromdurchflossene Referenzelektrode polarisiert sich und verliert ihr Potential. Deshalb die Aufteilung: Die Arbeitselektrode trägt die Reaktion, die Gegenelektrode nimmt den gesamten Strom auf, und die Referenz bleibt praktisch stromlos und behält ihren Bezugswert." },
    { id: "q2", question: "Was ist das Halbstufenpotential E_1/2 in der Polarographie?", options: ["Das Potential, bei dem der Strom null wird", "Das Potential beim halben Grenzstrom", "Das Standardpotential der Redoxreaktion", "Das Potential der Referenzelektrode"], correct: 1, explanation: "Auf der polarographischen Stufe ist E₁/₂ der Punkt, an dem der Strom die Hälfte des Diffusionsgrenzstroms erreicht. Der Wert hängt vom Analyten ab, nicht von seiner Konzentration — deshalb dient er der qualitativen Identifizierung, während die Stufenhöhe die Menge angibt." },
    { id: "q3", question: "Was ist das Faraday'sche Gesetz in der Coulometrie?", options: ["Q = C·U (die Ladung eines Kondensators)", "i = dQ/dt (Strom als Ladungsänderung)", "m = M·Q/(n·F): Masse proportional zur Ladung", "E = Q/C (Spannung am Kondensator)"], correct: 2, explanation: "Die umgesetzte Stoffmenge folgt direkt aus der geflossenen Ladung Q = I·t, geteilt durch n·F. Weil die Faraday-Konstante eine Naturkonstante ist, braucht die Coulometrie keine Kalibriergerade — vorausgesetzt, die Stromausbeute beträgt 100 %, jedes Elektron setzt also den Analyten um." },
    { id: "q4", question: "Was macht die Stripping-Voltammetrie so empfindlich?", options: ["Sie arbeitet mit besonders intensiven Lichtquellen", "Sie misst bei besonders kleinen Potentialen", "Sie nutzt einen Drei-Elektroden-Aufbau", "Der Analyt wird erst angereichert, dann abgelöst"], correct: 3, explanation: "In der Anreicherungsphase wird der Analyt über Minuten auf der Elektrode abgeschieden. Erst danach wird er in einem schnellen Potentialdurchlauf wieder aufgelöst, und das gesammelte Material liefert auf einmal seinen Strom. Diese Vorkonzentrierung bringt die Nachweisgrenze in den ng/L-Bereich." },
    { id: "q5", question: "Welches Kriterium zeigt ein reversibles System im Cyclovoltammogramm?", options: ["Peakverhältnis nahe 1 und Abstand 57/n mV", "Es ist nur ein einziger Peak sichtbar", "Hin- und Rückpeak liegen bei gleichem Potential", "Es fehlt ein Rückpeak vollständig"], correct: 0, explanation: "Beim reversiblen System sind kathodischer und anodischer Peakstrom etwa gleich groß, und die beiden Peakpotentiale liegen 57/n mV auseinander. Fehlt der Rückpeak oder wächst der Abstand mit der Vorschubgeschwindigkeit, ist das System quasireversibel oder irreversibel." },
    { id: "q6", question: "Wozu dient die Karl-Fischer-Titration?", options: ["Der Bestimmung von Schwermetallen", "Der coulometrischen Wasserbestimmung", "Der pH-Messung in nichtwässrigen Medien", "Der Bestimmung von Halogeniden"], correct: 1, explanation: "Wasser wird mit Iod umgesetzt, das coulometrisch erzeugt wird. Aus der dafür nötigen Ladung folgt die Wassermenge unmittelbar — ohne Kalibrierung und bis in den Mikrogrammbereich. Das Verfahren ist der Standard für Restfeuchte in Arzneimitteln, Lösungsmitteln und Ölen." },
    { id: "q7", question: "Wie hängt der Grenzstrom in der Voltammetrie mit der Konzentration zusammen?", options: ["Er ist ihr direkt proportional", "Er wächst mit dem Quadrat der Konzentration", "Er ist von ihr unabhängig", "Er nimmt mit steigender Konzentration ab"], correct: 0, explanation: "Der diffusionsbegrenzte Grenzstrom folgt der Ilkovič- beziehungsweise Cottrell-Beziehung und ist der Konzentration proportional — darauf beruht die Quantifizierung. Das Halbstufenpotential dagegen ist konzentrationsunabhängig und dient der qualitativen Zuordnung." },
    { id: "q8", question: "Warum wird die Lösung vor einer voltammetrischen Messung mit Stickstoff gespült?", options: ["Um die Lösung zu durchmischen", "Um gelösten Sauerstoff zu entfernen, der selbst reduziert wird", "Um die Temperatur der Messzelle zu stabilisieren", "Um den pH konstant zu halten"], correct: 1, explanation: "Sauerstoff wird in zwei Stufen zu H₂O₂ und weiter zu Wasser reduziert und überlagert mit diesen Wellen den interessierenden Bereich. Einige Minuten Spülen mit Stickstoff oder Argon beseitigen das Problem; während der Messung bleibt eine Schutzgasdecke über der Lösung." },
    { id: "q9", question: "Welche Rolle spielt das Leitsalz in der Voltammetrie?", options: ["Es erhöht die Löslichkeit des Analyten", "Es senkt das Halbstufenpotential", "Es dient in der Auswertung als innerer Standard", "Es trägt den Strom, der Analyt kommt nur noch per Diffusion"], correct: 3, explanation: "Im Überschuss zugesetzt, übernimmt es praktisch den gesamten Ladungstransport. Der Analyt erreicht die Elektrode dann nur noch durch Diffusion, und genau diese Bedingung setzen die Auswertegleichungen voraus. Zusätzlich sinkt der Lösungswiderstand und damit der ohmsche Spannungsabfall." },
    { id: "q10", question: "Was zeigt ein Cyclovoltammogramm mit einem Peakabstand von 59 mV bei einem Einelektronenprozess?", options: ["Ein irreversibles System", "Einen reinen Adsorptionsvorgang", "Ein reversibles System", "Eine misslungene Messung"], correct: 2, explanation: "Bei Reversibilität gilt ΔEp = 59/z mV, unabhängig von der Vorschubgeschwindigkeit, und die Peakströme von Hin- und Rücklauf sind gleich groß. Wächst der Abstand mit steigender Vorschubgeschwindigkeit, ist der Elektronentransfer gehemmt — das System ist quasireversibel oder irreversibel." },
    { id: "q11", question: "Was besagt das Faradaysche Gesetz in der Coulometrie?", options: ["Die abgeschiedene Stoffmenge ist der geflossenen Ladung proportional", "Der Strom ist der Spannung proportional", "Die Ladung ist dem Elektrodenpotential proportional", "Die Abscheidung ist von der Zeit unabhängig"], correct: 0, explanation: "n = Q/(z·F), mit Q = I·t bei konstantem Strom. Deshalb ist die Coulometrie ein absolutes Verfahren: gemessen werden Strom und Zeit, eine Kalibrierung mit Standards entfällt. Voraussetzung ist eine Stromausbeute von 100 %, also keine Nebenreaktion." },
    { id: "q12", question: "Wozu dient bei der coulometrischen Karl-Fischer-Titration die Generatorelektrode?", options: ["Sie misst den Wassergehalt direkt", "Sie hält die Temperatur konstant", "Sie erzeugt das Titriermittel Iod elektrochemisch aus Iodid", "Sie trocknet die Zelle vor der Messung"], correct: 2, explanation: "Statt eine Iodlösung zuzudosieren, wird Iod im Takt des Stroms aus Iodid erzeugt und sofort vom Wasser verbraucht. Die geflossene Ladung ist damit ein direktes Maß für die Wassermenge — so werden noch Mikrogramm bestimmt, was volumetrisch nicht gelänge." },
  ],
  flashcards: [
    { id: "1ef2p8y", front: "Drei-Elektroden-Aufbau", back: "WE (Arbeitselektrode, klein, Reaktion hier), RE (Referenz, kein Strom, stabiles E), CE (Gegenelektrode, groß, Strom fließt hier). Potentiostat hält E(WE vs. RE) konstant." },
    { id: "0m35yuh", front: "Halbstufenpotential E_1/2", back: "E_1/2 = Potential bei i = i_d/2 (halber Grenzstrom). Charakteristisch für Analyt-Ion (≈ Formalpotential E°'). Qualitative Identifizierung möglich. Verschiedene Ionen → verschiedene E_1/2." },
    { id: "1s609ou", front: "Faraday'sches Gesetz", back: "m = M·Q/(n·F) = M·I·t/(n·F). Q [C] = I [A] × t [s]. F = 96485 C/mol. n = Elektronen/Mol. Coulometrie: absolutes Verfahren, keine Kalibrierung nötig!" },
    { id: "0b5zlpr", front: "Stripping-Voltammetrie", back: "1. Anreicherung: Analyt bei konst. E abgeschieden (typ. 1–5 min). 2. Rückstrippung: E geändert → Strompeak. Sehr empfindlich: ng/L bis pg/L. Anwendung: Schwermetalle (Pb, Cd, Cu) in Wasser." },
    { id: "1f5wafc", front: "Cyclovoltammetrie (CV)", back: "Dreieck-Potential. Reversibel: i_pc/i_pa = 1, ΔE_p = 59/n mV. Irreversibel: nur ein Peak oder asymmetrisch. E°' = (E_pa + E_pc)/2. Informationen über Kinetik und Mechanismus." },
    { id: "1jt9ck3", front: "Karl-Fischer-Titration", back: "Coulometrische H₂O-Bestimmung. H₂O + I₂ + SO₂ + MeOH + Base → Reaktion. I₂ wird elektrolytisch erzeugt. n(I₂) ∝ n(H₂O). Präzision: μg. Anwendung: Pharma, Lebensmittel, Öle." },
  ],
} satisfies Thema;
