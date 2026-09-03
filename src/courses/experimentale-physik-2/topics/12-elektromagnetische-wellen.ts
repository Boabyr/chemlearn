import type { Thema } from '../../../content/schema'

export const topic = {
  id: "12-elektromagnetische-wellen",
  title: "Elektromagnetische Schwingungen und die Entstehung elektromagnetischer Wellen",
  subtitle: "Vom Schwingkreis zur Antenne, Maxwell-Gleichungen, Dipolstrahlung",
  icon: "📡",
  estimatedMinutes: 85,
  theory: `
## Vom RLC-Schwingkreis zur Antenne

Ein RLC-Schwingkreis erzeugt elektrische Schwingungen nahe seiner Resonanzfrequenz. Werden Spule und Kondensator geometrisch geöffnet, sodass die Felder nicht mehr in den Bauteilen konzentriert sind, entsteht ein **offener Schwingkreis** — die Grundlage einer Antenne.

Die Maxwell-Gleichungen koppeln elektrische und magnetische Felder: Zeitlich veränderliche elektrische Felder erzeugen magnetische Felder und umgekehrt. Dadurch breiten sich die Felder eines offenen Schwingkreises räumlich aus.

## Entstehung einer Stabantenne

Ein geschlossener Schwingkreis besteht aus Spule und Kondensator. Öffnet man den Kondensator zu zwei getrennten Leitern, entsteht eine **Stabantenne**. Die Ladungen schwingen entlang der Leiter, wodurch ein zeitlich veränderliches elektrisches Dipolmoment entsteht:


\\[
p(t) = p_0\\cos(\\omega t).
\\]



Die elektrischen Feldlinien einer Stabantenne sind rotationssymmetrisch. Bei Wechselspannung entstehen zwei Phasen, die um $180^\\circ$ verschoben sind: In einer Phase sammeln sich Elektronen am oberen Ende, in der anderen am unteren. Dadurch entstehen zeitlich veränderliche elektrische Felder, die sich vom Leiter lösen und in den Raum ausbreiten.

## Resonanzfrequenz und hohe Frequenzen

Durch das Öffnen des Schwingkreises sinken Induktivität $L$ und Kapazität $C$. Die Resonanzfrequenz steigt:


\\[
\\omega_0 = \\frac{1}{\\sqrt{LC}}.
\\]



Bei hohen Frequenzen kann die Ausbreitungszeit der Felder nicht mehr vernachlässigt werden. Die Felder breiten sich als elektromagnetische Wellen aus.

## Kopplung von E- und B-Feldern

Ein zeitlich veränderliches elektrisches Feld erzeugt ein magnetisches Feld:


\\[
\\operatorname{rot}\\vec{B} = \\mu_0\\vec{j} + \\mu_0\\varepsilon_0\\frac{\\partial\\vec{E}}{\\partial t}.
\\]



Ein zeitlich veränderliches magnetisches Feld erzeugt ein elektrisches Feld:


\\[
\\operatorname{rot}\\vec{E} = -\\frac{\\partial\\vec{B}}{\\partial t}.
\\]



Die Quelle zeigt anschaulich, wie sich Feldlinien bei Phasenwechsel verbinden und zu geschlossenen Schleifen formen. Alte Feldlinien verschwinden nicht sofort, sondern bewegen sich nach außen — die Welle löst sich von der Antenne.

## Hertz’scher Dipol

Der einfachste Antennentyp ist der **Hertz’sche Dipol**. Er besitzt ein oszillierendes Dipolmoment:


\\[
p(t) = p_0\\cos(\\omega t).
\\]



Die Felder bestehen aus:
- **Nahfeld** (stark gekrümmt, fällt schnell ab),
- **Fernfeld** (ebene Wellen, fällt mit $1/r$).

Im Fernfeld gilt:
- E- und B-Feld sind senkrecht zueinander,
- beide sind senkrecht zur Ausbreitungsrichtung,
- die Welle bewegt sich mit Lichtgeschwindigkeit:


\\[
c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}.
\\]



## Empfang elektromagnetischer Wellen

Es gibt zwei grundlegende Empfangsarten:

### 1. Dipolantenne (E-Feld-Empfang)
Das elektrische Feld der Welle erzeugt einen Wechselstrom im Leiter.

### 2. Ringantenne (B-Feld-Empfang)
Das zeitlich veränderliche Magnetfeld induziert einen Strom durch Flussänderung.

Beide Prinzipien beruhen direkt auf dem Induktionsgesetz und den Maxwell-Gleichungen.

## Historischer Kontext

James Clerk Maxwell formulierte 1861 die Theorie elektromagnetischer Felder und führte den Verschiebungsstrom ein. 1865 sagte er die Existenz elektromagnetischer Wellen voraus. Heinrich Hertz erzeugte 1886 erstmals freie elektromagnetische Wellen und wies sie experimentell nach.

Damit war klar: **Licht ist eine elektromagnetische Welle.**
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "resonanzfrequenz",
        name: "Resonanzfrequenz eines Schwingkreises",
        equation: "omega_0 = 1 / sqrt(L * C)",
        variables: [
          { id: "omega_0", label: "Resonanzfrequenz", symbol: "omega_0", unit: "1/s", description: "Kreisfrequenz des Schwingkreises" },
          { id: "L", label: "Induktivität", symbol: "L", unit: "H", description: "Induktivität des Schwingkreises" },
          { id: "C", label: "Kapazität", symbol: "C", unit: "F", description: "Kapazität des Schwingkreises" },
        ],
        umstellungen: [
          { solveFor: "omega_0", expr: "1 / sqrt(L * C)" },
          { solveFor: "L", expr: "1 / (omega_0^2 * C)" },
          { solveFor: "C", expr: "1 / (omega_0^2 * L)" },
        ],
        hints: ["Öffnen des Schwingkreises reduziert L und C → Resonanzfrequenz steigt.", "Hohe Frequenzen führen zur Abstrahlung elektromagnetischer Wellen."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Warum führt das Öffnen eines Schwingkreises zu einer Antenne?", options: ["Weil die Induktivität steigt", "Weil der Strom konstant bleibt", "Weil das Magnetfeld verschwindet", "Weil die Ladungen entlang offener Leiter schwingen"], correct: 3, explanation: "Offene Leiter ermöglichen ein schwingendes Dipolmoment → Antennenwirkung." },
    { id: "q2", question: "Warum steigt die Resonanzfrequenz eines offenen Schwingkreises?", options: ["Weil L und C kleiner werden", "Weil die Spannung größer wird", "Weil der Strom größer wird", "Weil das Magnetfeld stärker wird"], correct: 0, explanation: "$\\omega_0 = 1/\\sqrt{LC}$ → kleinere Werte von L und C erhöhen die Frequenz." },
    { id: "q3", question: "Wie entstehen elektromagnetische Wellen aus zeitlich veränderlichen Feldern?", options: ["Durch zeitlich konstante Ströme im Leiter", "Durch die Kopplung von E- und B-Feld", "Durch Erwärmung des Leitermaterials", "Durch mechanische Schwingungen der Antenne"], correct: 1, explanation: "Zeitlich veränderliche Felder erzeugen sich gegenseitig → Wellen breiten sich aus." },
    { id: "q4", question: "Warum lösen sich die Felder einer Antenne vom Leiter und breiten sich aus?", options: ["Weil die Ladungen verschwinden", "Weil die Frequenz zu klein ist", "Weil alte Feldlinien nach außen wandern", "Weil das Material leitfähig ist"], correct: 2, explanation: "Feldlinien bewegen sich nach außen und bilden die elektromagnetische Welle." },
    { id: "q5", question: "Welche Eigenschaften besitzen E- und B-Feld im Fernfeld?", options: ["Sie schwingen stets parallel zueinander", "Sie sind im Fernfeld zeitlich konstant", "Sie hängen nicht von der Frequenz ab", "Sie stehen senkrecht zueinander und zur Ausbreitung"], correct: 3, explanation: "Fernfeld: E ⟂ B ⟂ Ausbreitungsrichtung." },
    { id: "q6", question: "Wie empfängt eine Ringantenne elektromagnetische Wellen?", options: ["Durch Induktion eines Stroms bei Flussänderung", "Durch Erwärmung des Antennendrahts", "Durch mechanische Schwingungen des Rings", "Durch Reflexion der Welle am Ring"], correct: 0, explanation: "Zeitlich veränderliches B-Feld induziert Strom in der Ringantenne." },
  ],
  flashcards: [
    { id: "10he9lq", front: "Resonanzfrequenz beim offenen Schwingkreis", back: "$\\omega_0 = 1/\\sqrt{LC}$. Öffnen des Schwingkreises → höhere Frequenz." },
    { id: "1ff3v9l", front: "Maxwell-Gleichung der Wellenentstehung", back: "$\\operatorname{rot}E = -\\partial B/\\partial t$. Zeitlich veränderliches B-Feld erzeugt E-Feld." },
    { id: "19ojtw1", front: "Dipolmoment", back: "$p(t) = p_0\\cos(\\omega t)$. Grundlage des Hertz’schen Dipols." },
    { id: "1h7tagx", front: "Fernfeld", back: "E ⟂ B ⟂ Ausbreitungsrichtung. Welle breitet sich mit Lichtgeschwindigkeit aus." },
    { id: "0yuvwis", front: "Lichtgeschwindigkeit", back: "$c = 1/\\sqrt{\\mu_0\\varepsilon_0}$. Fundamentale Konstante." },
    { id: "18xmm08", front: "Dipolantenne", back: "E-Feld der Welle erzeugt Wechselstrom im Leiter." },
  ],
} satisfies Thema;
