import type { Thema } from '../../../content/schema'

export const topic = {
  id: "26-fresnel-zonen",
  title: "Fresnel-Zonen und Fresnel-Beugung",
  subtitle: "Zonenmodell der Wellenfront und Beiträge zur Feldstärke",
  icon: "🌀",
  estimatedMinutes: 75,
  theory: `
## Fresnel-Zonen: Grundidee

Die Fresnel-Zonen sind ein Konzept zur Beschreibung der Ausbreitung von Wellen nach dem Huygens-Fresnel-Prinzip.  
Jeder Punkt einer Wellenfront (WF) ist Ausgangspunkt einer Elementarwelle. Die fortgeschrittene Wellenfront ergibt sich aus der **Interferenz aller Elementarwellen**.

Um die Beiträge übersichtlich zu strukturieren, wird die Wellenfront in **Zonen** unterteilt, deren Beiträge sich charakteristisch überlagern.

## Geometrische Konstruktion

Eine Kugelwelle geht vom Punkt L aus. Ein Beobachtungspunkt P liegt in einiger Entfernung. Die Wellenfront befindet sich im Abstand R von L.

Für jeden Punkt Q der Wellenfront gilt:

- Abstand zu P: \\(r\\)
- Minimaler Abstand: \\(r_0\\) (auf der Verbindungslinie L–P)

Die Fresnel-Zonen werden durch Kreise definiert, deren Radien so gewählt sind, dass die Abstände zur Beobachtungsstelle P jeweils um \\(\\lambda/2\\) zunehmen:



\\[
r_m = r_0 + m\\frac{\\lambda}{2}.
\\]



Die **m‑te Fresnel-Zone** ist der Bereich zwischen:



\\[
r_{m-1} \\quad \\text{und} \\quad r_m.
\\]



Damit unterscheidet sich der optische Weg zwischen zwei benachbarten Zonen um genau \\(\\lambda/2\\).

## Physikalische Bedeutung

Für jeden Punkt \\(Q_i\\) in einer Zone gibt es einen Punkt \\(Q_k\\) in der benachbarten Zone, dessen Abstand sich um \\(\\lambda/2\\) unterscheidet.  
Die zugehörigen Elementarwellen haben daher eine **Phasendifferenz von \\(\\pi\\)**.

Das bedeutet:

- Beiträge benachbarter Zonen interferieren **destruktiv**.
- Die Beiträge der Zonen heben sich weitgehend gegenseitig auf.
- Nur die **erste Fresnel-Zone** trägt wesentlich zur Feldstärke bei.

## Beitrag der Fresnel-Zonen zur Feldstärke

Die elektrische Feldstärke im Punkt P ergibt sich aus der Summe der Beiträge aller Zonen:



\\[
E(P) = \\sum_{m=1}^{N} E_m.
\\]



Für die m‑te Zone gilt:



\\[
E_m \\propto K(\\theta_m) \\frac{E_0}{R+r_0} e^{-ik(R+r_0)}.
\\]



Der Faktor \\(K(\\theta_m)\\) hängt vom Beugungswinkel ab.  
Da sich die Winkel benachbarter Zonen kaum unterscheiden, sind die Faktoren nahezu gleich.

Wichtig ist:

- Die Beiträge der Zonen 2 und 3 löschen sich nahezu aus.  
- Ebenso die Beiträge 3 und 4, 4 und 5 usw.  
- Der Beitrag der letzten Zone ist wegen \\(\\cos\\theta_m \\approx 0\\) praktisch Null.

Daraus folgt:



\\[
E(P) \\approx \\frac{1}{2} E_1.
\\]



Die gesamte Feldstärke entspricht **der Hälfte des Beitrags der ersten Fresnel-Zone**.

## Fresnel-Beugung

Die Fresnel-Beugung beschreibt die Beugung im Nahfeld, bei der die Krümmung der Wellenfront berücksichtigt werden muss.

### Beispiel: Blende lässt nur die erste Fresnel-Zone durch

Wenn ein Schirm alle Zonen außer der ersten abdeckt:

- destruktive Interferenz wird verhindert  
- der Beitrag der ersten Zone bleibt vollständig erhalten  
- die Feldstärke verdoppelt sich gegenüber dem ungestörten Fall  
- die Intensität steigt um den Faktor 4

### Beispiel: Blende deckt die erste Fresnel-Zone ab

Wenn die erste Zone blockiert wird:

- die zweite Zone trägt nun allein bei  
- da sie im ungestörten Fall destruktiv mit der ersten interferiert hätte  
- ergibt sich dieselbe Intensität wie ohne Blende

Diese Effekte sind charakteristisch für Fresnel-Beugung und zeigen die Bedeutung der Zonenstruktur.

## Bedeutung

Fresnel-Zonen sind wichtig für:

- Nahfeldbeugung  
- optische Systeme mit begrenzten Öffnungen  
- Fresnel-Linsen  
- Analyse von Beugungsphänomenen im Übergang zwischen geometrischer Optik und Fraunhofer-Beugung
`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "fresnel-zone-radius",
        name: "Radius der Fresnel-Zonen",
        equation: "r_m = r0 + m * lambda / 2",
        variables: [
          { id: "r_m", label: "Radius der m-ten Zone", symbol: "r_m", unit: "m", description: "Abstand eines Punktes der m-ten Zone zu P" },
          { id: "r0", label: "Minimaler Abstand", symbol: "r_0", unit: "m", description: "Minimaler Abstand zwischen Wellenfront und P" },
          { id: "m", label: "Zonennummer", symbol: "m", unit: "—", description: "Nummer der Fresnel-Zone" },
          { id: "lambda", label: "Wellenlänge", symbol: "λ", unit: "m", description: "Wellenlänge der Welle" },
        ],
        umstellungen: [
          { solveFor: "r_m", expr: "r0 + m * lambda / 2" },
          { solveFor: "r0", expr: "r_m - m * lambda / 2" },
          { solveFor: "m", expr: "2 * (r_m - r0) / lambda" },
          { solveFor: "lambda", expr: "2 * (r_m - r0) / m" },
        ],
        hints: ["Jede Zone unterscheidet sich im Abstand um λ/2.", "Beiträge benachbarter Zonen interferieren destruktiv."],
      },
    },
  ],
  quiz: [
    { id: "q1", question: "Wie werden Fresnel-Zonen definiert?", options: ["Durch überall gleiche Intensität", "Durch Abstände, die um λ/2 wachsen", "Durch gleiche Winkel zur Achse", "Durch überall gleiche Amplituden"], correct: 1, explanation: "r_m = r_0 + mλ/2." },
    { id: "q2", question: "Warum löschen sich die Beiträge benachbarter Zonen aus?", options: ["Wegen Absorption im Medium", "Wegen Reflexion an der Blende", "Wegen Phasendifferenz von π", "Wegen Dispersion im Medium"], correct: 2, explanation: "Δs = λ/2 → Δφ = π → destruktive Interferenz." },
    { id: "q3", question: "Wie groß ist der Gesamtbeitrag aller Zonen?", options: ["Gleich dem Beitrag der ersten Zone", "Null, alle Zonen heben sich auf", "Doppelt so groß wie die erste Zone", "Halb so groß wie die erste Zone"], correct: 3, explanation: "E(P) ≈ ½ E₁." },
    { id: "q4", question: "Was passiert, wenn nur die erste Fresnel-Zone durchgelassen wird?", options: ["Intensität steigt um Faktor 4", "Intensität sinkt", "Intensität bleibt gleich", "Intensität wird Null"], correct: 0, explanation: "Verdopplung der Amplitude → Intensität ×4." },
    { id: "q5", question: "Was passiert, wenn die erste Zone blockiert wird?", options: ["Intensität steigt", "Intensität bleibt gleich", "Intensität sinkt auf Null", "Intensität verdoppelt sich"], correct: 1, explanation: "Die zweite Zone trägt allein bei → gleiche Intensität wie ohne Blende." },
    { id: "q6", question: "Wofür sind Fresnel-Zonen wichtig?", options: ["Fernfeldbeugung", "Reflexion", "Nahfeldbeugung", "Dispersion"], correct: 2, explanation: "Fresnel-Zonen beschreiben Nahfeldbeugung." },
  ],
  flashcards: [
    { id: "07e1y7e", front: "Definition Fresnel-Zonen", back: "r_m = r_0 + mλ/2. Jede Zone unterscheidet sich im Abstand um λ/2." },
    { id: "0t8p4kh", front: "Phasendifferenz", back: "Δs = λ/2 → Δφ = π. Führt zu destruktiver Interferenz benachbarter Zonen." },
    { id: "1k1jrn2", front: "Gesamtbeitrag", back: "E(P) ≈ ½ E₁. Beiträge höherer Zonen löschen sich weitgehend aus." },
    { id: "05n9w6i", front: "Fresnel-Beugung", back: "Nahfeldbeugung, bei der die Krümmung der Wellenfront berücksichtigt wird." },
    { id: "180rjhd", front: "Blendeffekt", back: "Nur erste Zone → Intensität ×4; erste Zone blockiert → gleiche Intensität wie ohne Blende." },
    { id: "1b8rx2b", front: "Bedeutung der Fresnel-Zonen", back: "Wichtig für Fresnel-Linsen, Nahfeldoptik und Übergangsbereich zur Fraunhofer-Beugung." },
  ],
} satisfies Thema;
