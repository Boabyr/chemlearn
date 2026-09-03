import type { Thema } from '../../../content/schema'

export const topic = {
  id: "09-statische-magnetfelder",
  title: "Statische Magnetfelder",
  subtitle: "Magnetismus, Lorentzkraft, Leiterfelder, Hall-Effekt",
  icon: "🧲",
  estimatedMinutes: 85,
  theory: `
## Magnetfelder in Technik und Geschichte

Magnetfelder treten in vielen technischen Anwendungen auf. Moderne Fahrzeuge enthalten laut Quelle 20–30 Magnetfeldsensoren, etwa für ABS, Kurbelwellenposition, Airbagdruck oder Brushless‑Motoren. Auch in der Datenspeicherung spielen Magnetfelder eine zentrale Rolle: 80 % aller Daten wurden 2021 auf magnetischen Festplatten gespeichert.

Historisch war Magnetismus schon in der Antike bekannt. Magnetit („Magnetstein“) zieht Eisen an. Schriftliche Quellen belegen die Nutzung von Magneten zur Navigation bereits im 12. Jahrhundert. 1600 erkannte William Gilbert, dass die Erde selbst ein Magnet ist. Eine physikalisch korrekte Erklärung der Eigenschaften von Permanentmagneten wurde erst durch die Quantentheorie möglich.

## Feldlinien und Dipole

Experimentelle Befunde zeigen das typische Feldlinienbild eines Stabmagneten. Feldlinien sind geschlossene Kurven und enden nicht an den Polen. Eisenfeilspäne demonstrieren diese Struktur anschaulich. Gleichnamige Pole stoßen sich ab, ungleichnamige ziehen sich an — analog zur Elektrostatik.

Ein wesentlicher Unterschied zur Elektrostatik besteht darin, dass es keine isolierten magnetischen Monopole gibt. Beim Durchbrechen eines Stabmagneten entstehen stets wieder zwei Dipole. Nord- und Südpol treten in der Natur immer gemeinsam auf.

## Strom und Magnetismus – Ørsted

Die Wechselwirkung zwischen Strom und Magneten wurde 1820 von Hans Christian Ørsted entdeckt: Ein stromdurchflossener Leiter lenkt eine Kompassnadel ab. Eine stromdurchflossene Spule verhält sich ähnlich wie ein Permanentmagnet. Dies zeigt, dass Magnetismus und elektrische Ströme eng zusammenhängen.

Ströme in parallelen Leitern üben Kräfte aufeinander aus: Fließen die Ströme in die gleiche Richtung, ziehen sich die Leiter an; bei entgegengesetzten Richtungen stoßen sie sich ab.

## Lorentzkraft

Die magnetische Kraft auf ein geladenes Teilchen lautet:


\\[
F = q(\\vec{v} \\times \\vec{B}).
\\]


Falls zusätzlich ein elektrisches Feld vorhanden ist:


\\[
F = q(\\vec{E} + \\vec{v} \\times \\vec{B}).
\\]



Die Richtung der Kraft wird mit der Rechte‑Hand‑Regel bestimmt: Daumen = Geschwindigkeit, Zeigefinger = Magnetfeld, Mittelfinger = Kraft.

Die Einheit des Magnetfeldes ist Tesla:


\\[
1\\,\\mathrm{T} = 1\\,\\mathrm{N}/(\\mathrm{A\\,m}).
\\]



## Magnetismus als relativistisches Phänomen

Ein Gedankenexperiment zeigt, dass Magnetismus relativistisch erklärbar ist. Ein Beobachter im Laborsystem sieht einen stromdurchflossenen Leiter als elektrisch neutral. Ein Beobachter, der sich mit den Elektronen bewegt, sieht aufgrund der Lorentzkontraktion eine veränderte Ladungsdichte: Protonen erscheinen dichter gepackt, Elektronen weiter auseinander. Dadurch entsteht im bewegten System ein elektrisches Feld. Magnetismus ist somit die relativistische Betrachtung elektrischer Ströme in bewegten Bezugssystemen.

## Kreisbewegung im Magnetfeld – Zyklotron

Ein geladenes Teilchen, das sich senkrecht zu einem homogenen Magnetfeld bewegt, folgt einer Kreisbahn. Die Lorentzkraft wirkt als Zentripetalkraft:


\\[
\\frac{m v^2}{r} = q v B.
\\]


Daraus folgt:


\\[
r = \\frac{m v}{q B}.
\\]



## Hall-Effekt

Der Hall‑Effekt ermöglicht die Bestimmung von Magnetfeldern. Ein stromdurchflossener Streifen wird durch ein Magnetfeld seitlich abgelenkt. Die magnetische Kraft $q v_d B$ wird durch ein elektrisches Feld kompensiert, das sich durch Ladungstrennung bildet. Die Hallspannung lautet:


\\[
U_H = v_d B\\,b.
\\]


Mit $v_d = I/(q n A)$ ergibt sich:


\\[
U_H = \\frac{I\\,B\\,b}{q n d}.
\\]



Hall‑Sensoren werden in Smartphones und Messgeräten eingesetzt. Die Quelle beschreibt das „Spinning‑Current“-Verfahren zur Kompensation von Fertigungsfehlern.

## Magnetfeld eines Leiters

Das Magnetfeld eines langen geraden Leiters ist tangential gerichtet und hat den Betrag:


\\[
B = \\frac{\\mu_0 I}{2\\pi r}.
\\]


Die Richtung ergibt sich aus der Rechte‑Hand‑Regel: Daumen zeigt in Stromrichtung, die Finger geben die Feldrichtung an.

## Kraft zwischen parallelen Leitern

Aus dem Magnetfeld und der Lorentzkraft lässt sich die Kraft zwischen zwei parallelen Leitern bestimmen:


\\[
\\mathrm{d}F = \\frac{\\mu_0 I_1 I_2}{2\\pi r}\\,\\mathrm{d}L.
\\]


Dies ist die Grundlage der Definition des Ampere.

[UNSICHER: Der letzte Abschnitt der PDF scheint abgeschnitten zu sein.]
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "lorentzkraft",
        name: "Lorentzkraft",
        equation: "F = q * v * B",
        variables: [
          { id: "F", label: "Kraft", symbol: "F", unit: "N", description: "Magnetische Kraft auf das Teilchen" },
          { id: "q", label: "Ladung", symbol: "q", unit: "C", description: "Ladung des Teilchens" },
          { id: "v", label: "Geschwindigkeit", symbol: "v", unit: "m/s", description: "Geschwindigkeit senkrecht zum Magnetfeld" },
          { id: "B", label: "Magnetfeld", symbol: "B", unit: "T", description: "Magnetische Flussdichte" },
        ],
        umstellungen: [
          { solveFor: "F", expr: "q * v * B" },
          { solveFor: "q", expr: "F / (v * B)" },
          { solveFor: "v", expr: "F / (q * B)" },
          { solveFor: "B", expr: "F / (q * v)" },
        ],
        hints: ["Die Formel gilt nur für senkrechte Bewegung zum Magnetfeld.", "Die Richtung ergibt sich aus der Rechte‑Hand‑Regel."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum sind magnetische Feldlinien geschlossene Kurven?", options: ["Weil es keine magnetischen Monopole gibt", "Weil sie an den Polen enden", "Weil sie durch elektrische Ladungen erzeugt werden", "Weil sie nur im Inneren von Magneten existieren"], correct: 0, explanation: "Nord- und Südpol treten immer gemeinsam auf → Feldlinien sind geschlossen." },
    { id: "q2", question: "Was passiert laut Quelle beim Durchbrechen eines Stabmagneten?", options: ["Es entsteht ein Monopol", "Es entstehen zwei neue Dipole", "Der Magnet verliert seine Wirkung", "Das Magnetfeld verschwindet"], correct: 1, explanation: "Beim Brechen entstehen stets wieder Nord- und Südpol." },
    { id: "q3", question: "Welche Beobachtung führte zur Entdeckung der Wechselwirkung zwischen Strom und Magneten?", options: ["Erwärmung eines stromdurchflossenen Leiters", "Funkenbildung an den Kontakten einer Spule", "Ablenkung einer Kompassnadel neben einem Draht", "Änderung der Leitfähigkeit im Magnetfeld"], correct: 2, explanation: "Ørsted beobachtete die Ablenkung einer Kompassnadel." },
    { id: "q4", question: "Warum erscheint ein stromdurchflossener Leiter im bewegten System elektrisch geladen?", options: ["Wegen der Temperaturänderung im Draht", "Wegen Umkehr des äußeren Magnetfelds", "Wegen der Materialeigenschaften des Leiters", "Wegen Lorentzkontraktion der Ladungsdichten"], correct: 3, explanation: "Im bewegten System erscheinen Protonen dichter gepackt → Netto-Ladung." },
    { id: "q5", question: "Wie ändert sich der Radius $r = mv/(qB)$, wenn $B$ verdoppelt wird?", options: ["halbiert sich", "bleibt gleich", "verdoppelt sich", "wird null"], correct: 0, explanation: "$r \\propto 1/B$. Verdoppelt man $B$, halbiert sich $r$." },
    { id: "q6", question: "Ein Leiter führt $10\\,\\mathrm{A}$ im Abstand $1\\,\\mathrm{cm}$. Wie groß ist $B = \\mu_0 I/(2\\pi r)$ qualitativ?", options: ["mittel", "sehr klein", "sehr groß", "unendlich"], correct: 1, explanation: "Typische Leiterfelder liegen im Mikro‑ bis Millitesla‑Bereich → sehr klein." },
  ],
  flashcards: [
    { id: "198ms7e", front: "Lorentzkraft im Magnetfeld", back: "$F = q(\\vec{E} + \\vec{v} \\times \\vec{B})$. Richtung per Rechte‑Hand‑Regel." },
    { id: "0vupgx4", front: "Magnetfeld eines Leiters", back: "$B = \\mu_0 I/(2\\pi r)$. Tangential, Richtung per Daumenregel." },
    { id: "1pp4f5x", front: "Zyklotronradius", back: "$r = mv/(qB)$. Größere Felder → kleinerer Radius." },
    { id: "1udqxb4", front: "Hallspannung", back: "$U_H = I B b/(q n d)$. Grundlage vieler Magnetfeldsensoren." },
    { id: "1d0kywm", front: "Keine Monopole", back: "Beim Brechen entstehen immer neue Dipole." },
    { id: "0zs64hk", front: "Rechte‑Hand‑Regel", back: "Daumen = v, Zeigefinger = B, Mittelfinger = F." },
  ],
} satisfies Thema;
