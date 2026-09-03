=== DATEI: 07-potentiometrie-nernst.md ===

# META
modus: ergaenzen

# INTERAKTIV
typ: apparatus-quiz
frage: pH-Einstabmesskette
ziel_id: ph-glass-electrode
optionen:
- id: ph-glass-electrode | label: pH-Einstabmesskette | beschreibung: Glasmembran unten, Bezugssystem im selben Schaft, Diaphragma seitlich | bauteile: Ag/AgCl-Ableitung → Innenpuffer → Glasmembran ‖ Bezugsteil → KCl → Diaphragma
- id: reference-electrode | label: Ag/AgCl-Bezugselektrode | beschreibung: Ein einziges Rohr, keine Membran, festes Potential | bauteile: Ag/AgCl-Draht → KCl gesättigt → Diaphragma
- id: potentiometric-sensor | label: Ionenselektive Elektrode mit getrennter Referenz | beschreibung: Zwei Elektroden nebeneinander in der Messlösung | bauteile: ISE + Referenzelektrode → hochohmiges Voltmeter
- id: two-electrode | label: Zweielektrodenzelle | beschreibung: Arbeits- und Gegenelektrode, Strom fließt | bauteile: Arbeitselektrode → Elektrolyt → Gegenelektrode
erklaerung: Die Einstabmesskette vereint beides in einem Schaft: innen die Messkette aus Ag/AgCl-Ableitung, Innenpuffer und Glasmembran, außen das Bezugssystem mit gesättigtem KCl, das über das Diaphragma Kontakt zur Messlösung hält. Gemessen wird die Spannung zwischen beiden Halbzellen — das Potential entsteht ausschließlich an der Glasmembran, weil dort die H⁺-Aktivität außen gegen den konstanten Innenpuffer steht.
hinweis1: Zwei Ableitungen, ein Schaft. Die eine taucht in den Innenpuffer, die andere in den Brückenelektrolyten.
hinweis2: Das Diaphragma ist der einzige Weg, auf dem der Bezugsteil die Messlösung berührt. Ist es verstopft, driftet der Messwert.

=== DATEI: 04-ftir-raman.md ===

# META
modus: ergaenzen

# INTERAKTIV
typ: apparatus-quiz
frage: Raman-Spektrometer
ziel_id: raman
optionen:
- id: raman | label: Raman-Spektrometer | beschreibung: Laser als Quelle, Streulicht im rechten Winkel, Notch-Filter | bauteile: Laser → Probe → Streulicht 90° → Notch-Filter → Gitter → CCD
- id: ftir | label: FT-IR-Spektrometer | beschreibung: Michelson-Interferometer mit beweglichem Spiegel statt Gitter | bauteile: IR-Quelle → Strahlteiler → Spiegel → Probe → Detektor
- id: uv-vis | label: UV/Vis-Spektrometer | beschreibung: Alles auf einer Achse, gemessen wird die Transmission | bauteile: Lampe → Gitter → Probe → Detektor
- id: fluorescence | label: Fluoreszenzspektrometer | beschreibung: Zwei Monochromatoren, Emission im 90°-Winkel | bauteile: Lampe → Anregungsmonochromator → Probe → Emissionsmonochromator (90°) → Detektor
erklaerung: Das Raman-Gerät ist am Laser und am Notch-Filter zu erkennen. Der Laser liefert eine einzige, scharfe Frequenz — Raman misst die Verschiebung dagegen, deshalb wäre eine Breitbandlampe nutzlos. Der Notch-Filter hält die um Größenordnungen stärkere Rayleigh-Streuung zurück, sonst überstrahlt sie die Raman-Linien. Das Fluoreszenzgerät misst zwar auch im rechten Winkel, hat aber einen Anregungsmonochromator statt eines Lasers und misst Emission, nicht Streuung.
hinweis1: Welches Gerät braucht eine Quelle mit genau einer Frequenz?
hinweis2: Ein Filter direkt hinter der Probe, der eine einzige Linie ausblendet, gehört zu keinem der anderen Aufbauten.

=== DATEI: 06-elektrochemische-grundlagen.md ===

# META
modus: ergaenzen

# INTERAKTIV
typ: apparatus-matching
titel: Vier Zellen, vier Aufgaben
beschreibung: Alle vier stecken Elektroden in eine Lösung — aber nur bei zweien fließt dabei Strom.
erklaerung: Die Einstabmesskette misst stromlos ein Potential an der Glasmembran. Die Bezugselektrode misst gar nichts, sie liefert nur den festen Vergleichspunkt. Die Dreielektrodenanordnung trennt die Aufgaben: die Referenz bleibt stromlos, den Strom trägt die Gegenelektrode, damit das Potential der Arbeitselektrode genau eingestellt bleibt. Die Leitfähigkeitszelle misst mit Wechselspannung zwischen zwei Platinblechen und interessiert sich für die Lösung als Ganzes, nicht für ein einzelnes Ion.
- apparatur: ph-glass-electrode | label: pH-Einstabmesskette | hinweis: Glasmembran unten, Diaphragma seitlich — beides in einem Schaft.
- apparatur: reference-electrode | label: Ag/AgCl-Bezugselektrode | hinweis: Ein Rohr, ein Draht, keine Membran.
- apparatur: three-electrode | label: Dreielektrodenanordnung | hinweis: Arbeits-, Gegen- und Referenzelektrode, Potentiostat.
- apparatur: conductivity | label: Leitfähigkeitszelle | hinweis: Zwei parallele Bleche, Wechselspannung.
