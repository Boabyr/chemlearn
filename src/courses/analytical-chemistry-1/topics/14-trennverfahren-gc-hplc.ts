import type { Thema } from '../../../content/schema'

export const topic = {
  id: "14-trennverfahren-gc-hplc",
  title: "Trennverfahren: GC, HPLC, Elektrophorese",
  subtitle: "Gaschromatographie, Flüssigchromatographie, Kapillarelektrophorese",
  icon: "🔬",
  estimatedMinutes: 80,
  theory: `


## Gaschromatographie (GC)

**Einsatz:** Flüchtige, thermisch stabile Verbindungen
**Mobile Phase:** Trägergas (He, N₂, H₂)
**Stationäre Phase:** Flüssigfilm auf Kapillare oder Festbett

**Detektoren:**
- FID (Flammenionisationsdetektor): C-haltige Verbindungen, sehr empfindlich
- TCD (Wärmeleitfähigkeitsdetektor): universell, weniger empfindlich
- ECD (Elektroneneinfangdetektor): halogenierte Verbindungen, sehr selektiv
- MS (Massenspektrometer): Strukturidentifizierung

**Split-Injection:** Probe wird geteilt → nur Bruchteil gelangt auf Säule
→ Vorteil: scharfe Peaks, verhindert Überlastung

**Kapillarsäulen:** Innendurchmesser 0,1-0,5mm, Länge 10-100m, N > 100.000

## Hochleistungsflüssigchromatographie (HPLC)

**Einsatz:** Nicht-flüchtige, thermisch labile Verbindungen, Biomoleküle

**Normalphase:** Polare stat. Phase (SiO₂) + unpolare mobile Phase
→ unpolare Substanzen eluieren zuerst

**Umkehrphase (RP-HPLC, am häufigsten!):**
Unpolare stat. Phase (C18) + polare mobile Phase (Wasser/Acetonitril)
→ polare Substanzen eluieren zuerst

**Kieselgel deaktivieren:** OH-Gruppen der Oberfläche reagieren mit Silanreagenz → Silan-Gruppen
→ Verhindert unerwünschte Adsorption polarer Gruppen

**Pumpen:** isokratisch (konstante Zusammensetzung) oder Gradient

**UV-Detektor:** häufigster Detektor, Absorption bei definierter λ
**Dioden-Array-Detektor (DAD):** alle Wellenlängen gleichzeitig!

## Ionenaustauschchromatographie

Trennung geladener Moleküle durch Affinität zu entgegengesetzt geladener stationärer Phase.
- Kationentauscher: trennungsfähig für Kationen (z.B. Na⁺, K⁺, Aminosäuren)
- Anionentauscher: trennungsfähig für Anionen

## Kapillarelektrophorese (CE)

**Antrieb:** Elektroosmotischer Fluss (EOF) durch elektrisches Feld
**Trennung:** Wanderungsgeschwindigkeit abhängig von Ladung/Masse-Verhältnis

EOF tritt auf weil Kapillarwand bei pH > 3 negativ geladen → Wasserfilm wandert zur Kathode.

**Vorteil gegenüber HPLC:** keine mobile Phase nötig, hohe Auflösung, klein Probenmengen

## Western Blot

1. SDS-PAGE: Proteine nach Größe trennen (SDS = negativ geladen → wandern alle zur Anode)
2. Transfer auf Membran
3. Blockieren (BSA, Milchpulver)
4. Primärantikörper (spezifisch für Zielprotein)
5. Sekundärantikörper (mit Enzym/Fluoreszenz markiert)
6. Detektion

**Spezifität:** durch Antikörper-Antigen-Wechselwirkung

## Extraktion

**Nernstscher Verteilungskoeffizient K:**
K = c_org / c_aq

**Nach n Extraktionen verbleibt in wässriger Phase:**
m_n = m₀ · (V_aq / (V_aq + K·V_org))ⁿ

**Wichtig:** Mehrfache Extraktion mit kleinen Volumina ist effizienter als eine einmalige Extraktion mit großem Volumen!

**Prüfungsaufgabe:** Jod, K=85: 20ml 100mM Jod-Lösung, 3× mit je 10ml org. LM:
m_3 = m₀ · (20/(20+85×10))³ = m₀ · (20/870)³ = m₀ · 0,02299³ = m₀ · 1,22×10⁻⁵

Zum Vergleich die einmalige Extraktion mit dem gesamten Volumen von 30 ml:
m₁ = m₀ · 20/(20+85·30) = m₀ · 20/2570 = m₀ · 7,8×10⁻³.
Dreimal mit je 10 ml lässt also rund sechshundertmal weniger zurück als einmal mit 30 ml —
bei gleichem Lösungsmittelverbrauch. Der Grund steht im Exponenten: der Restanteil wird je
Schritt potenziert statt nur einmal angewendet.

## GC oder HPLC — die Entscheidung

| Frage | GC | HPLC |
|---|---|---|
| Flüchtig und thermisch stabil? | Voraussetzung | egal |
| Molmasse | bis etwa 500 g/mol | praktisch unbegrenzt |
| Mobile Phase | Trägergas, wirkt nicht auf die Trennung | wirkt mit, zweite Stellschraube |
| Trennstufenzahl | sehr hoch (10⁵) | mäßig (10⁴) |
| Proteine, Salze, Zucker | ungeeignet | Standardfall |

Der entscheidende Unterschied liegt in der mobilen Phase. In der GC transportiert das
Trägergas nur; die Selektivität kommt allein aus der stationären Phase und der Temperatur.
In der HPLC nimmt das Laufmittel an der Verteilung teil — Zusammensetzung, pH und
Gradient sind dort die wirksamsten Stellschrauben.

**Derivatisierung** verschiebt die Grenze: Eine Carbonsäure ist zu wenig flüchtig für die
GC, ihr Methylester nicht mehr. Zuckeranalytik per GC läuft nach Silylierung.

## Umkehrphase im Alltag

RP-HPLC an C18 ist der Normalfall. Die Elutionsreihenfolge ist umgekehrt zur
Normalphase: polare Substanzen kommen zuerst, unpolare bleiben hängen. Mehr Wasser im
Laufmittel bedeutet stärkere Retention, mehr Acetonitril oder Methanol schwächere. Ein
Gradient von wasserreich nach organikreich fächert deshalb ein breites Polaritätsspektrum
in einem Lauf auf — der Grund, warum fast jede Methodenentwicklung dort beginnt.


`,
  interactives: [
    {
      type: "formula-calculator",
      formula: {
        id: "mehrfachextraktion",
        name: "Restmenge nach n-facher Extraktion",
        equation: "mₙ = m₀ · (V_aq / (V_aq + K · V_org))ⁿ",
        variables: [
          { id: "mn", label: "Restmenge in der wässrigen Phase", symbol: "mₙ", unit: "mmol", description: "Was nach n Extraktionsschritten übrig bleibt" },
          { id: "m0", label: "Ausgangsmenge", symbol: "m₀", unit: "mmol", description: "Stoffmenge vor der ersten Extraktion" },
          { id: "Vaq", label: "Volumen der wässrigen Phase", symbol: "V_aq", unit: "mL", description: "Bleibt über alle Schritte gleich" },
          { id: "Vorg", label: "Volumen je Extraktionsschritt", symbol: "V_org", unit: "mL", description: "Organisches Lösungsmittel pro Schritt" },
          { id: "K", label: "Verteilungskoeffizient", symbol: "K", unit: "—", description: "Nernst-Koeffizient c_org / c_aq" },
          { id: "n", label: "Anzahl der Schritte", symbol: "n", unit: "—", description: "Wie oft ausgeschüttelt wird" },
        ],
        umstellungen: [
          { solveFor: "mn", expr: "m0 * (Vaq / (Vaq + K * Vorg)) ^ n" },
          { solveFor: "m0", expr: "mn / ((Vaq / (Vaq + K * Vorg)) ^ n)" },
        ],
        hints: ["Rechne den Klammerausdruck zuerst aus — er ist der Anteil, der pro Schritt zurückbleibt. Bei Vaq = 20 mL, Vorg = 10 mL und K = 85 sind das 20/870 = 0,023.", "Dreimal mit 10 mL schlägt einmal mit 30 mL deutlich, weil der Restanteil pro Schritt potenziert wird. Genau danach wird in der Prüfung gefragt."],
      },
    },
      {
      "type": "apparatus-matching",
      "title": "Drei Trenntechniken",
      "description": "Woran erkennt man, was die Probe durch die Trennstrecke treibt?",
      "explanation": "In der GC treibt ein Trägergas, die Säule ist eine dünne, meterlange Kapillare in einem Ofen — die Selektivität kommt allein aus stationärer Phase und Temperatur. In der HPLC presst eine Pumpe das Laufmittel durch eine kurze, dicht gepackte Säule; hier wirkt die mobile Phase mit. Die Kapillarelektrophorese braucht überhaupt keine Pumpe: der elektroosmotische Fluss im Hochspannungsfeld bewegt die Flüssigkeit.",
      "paare": [
        {
          "apparaturId": "gc",
          "label": "Gaschromatograph",
          "hinweis": "Trägergas, Kapillare im Ofen."
        },
        {
          "apparaturId": "hplc",
          "label": "HPLC",
          "hinweis": "Pumpe und kurze gepackte Säule."
        },
        {
          "apparaturId": "capillary-electrophoresis",
          "label": "Kapillarelektrophorese",
          "hinweis": "Hochspannung statt Pumpe."
        }
      ]
    },
  ],
  quiz: [
    { id: "q1", question: "Warum muss Kieselgel für die RP-HPLC deaktiviert werden?", options: ["Um die Partikelgröße des Materials weiter zu verringern", "Um freie Silanolgruppen der Oberfläche zu blockieren", "Um die Säule mechanisch stabiler zu machen", "Kieselgel wird für RP-HPLC nicht deaktiviert"], correct: 1, explanation: "Nach dem Aufbringen der C18-Ketten bleiben freie Si–OH-Gruppen übrig. Diese adsorbieren polare und basische Analyten zusätzlich zur eigentlichen Verteilung, was zu breiten und schiefen Peaks führt. Beim Endcapping werden sie mit kleinen Silanen abgesättigt." },
    { id: "q2", question: "In der Umkehrphasen-HPLC (RP-HPLC) mit C18-Säule und Wasser/Acetonitril: Welche Substanz eluiert zuerst?", options: ["Die unpolarste Substanz zuerst", "Die polarste Substanz zuerst", "Die Substanz mit der größten Molmasse", "Die Substanz mit dem höchsten Rf-Wert"], correct: 1, explanation: "Die stationäre Phase ist unpolar (C18), die mobile polar (Wasser/Acetonitril). Polare Analyten halten sich lieber in der mobilen Phase auf und eluieren früh, unpolare bleiben an der C18-Kette hängen. Mehr Acetonitril im Laufmittel beschleunigt alle Substanzen — das ist der Gradient." },
    { id: "q3", question: "Was ist Split-Injection in der GC?", options: ["Die Probe wird durch ein Ventil geteilt und zweimal nacheinander injiziert", "Nur ein Bruchteil gelangt auf die Säule, Split 1:10 bis 1:1000", "Zwei verschiedene Proben werden gleichzeitig injiziert", "Probe wird bei verschiedenen Temperaturen injiziert"], correct: 1, explanation: "Split-Injection: Trägergas + Probe → Injektor → Split: z.B. 1/100 geht auf Säule, Rest wird abgelassen. Vorteile: scharfe Peaks (keine Bandenverbreiterung durch Injektion), verhindert Überlastung der Kapillarsäule. Nachteil: Empfindlichkeit sinkt." },
    { id: "q4", question: "Wie viel von 20ml 100mM Jod-Lösung (K=85) bleibt nach 3 Extraktionen mit je 10ml org. LM übrig?", options: ["Etwa 0,001 %, praktisch nichts", "Etwa 2,3 % der Ausgangsmenge", "Etwa 50 % der Ausgangsmenge", "Etwa 85 % der Ausgangsmenge"], correct: 0, explanation: "Pro Schritt bleibt der Anteil V_aq/(V_aq + K·V_org) = 20/(20+850) = 0,023 zurück. Nach drei Schritten also 0,023³ = 1,2·10⁻⁵, das sind rund 0,001 %. Zum Vergleich: einmal mit 30 mL lässt 7,8·10⁻³ zurück — etwa sechshundertmal mehr bei gleichem Lösungsmittelverbrauch." },
    { id: "q5", question: "Worin besteht der Unterschied zwischen Normal- und Umkehrphasenchromatographie?", options: ["Normalphase heiß, Umkehrphase bei Raumtemperatur", "Normalphase polar stationär, Umkehrphase unpolar", "Normalphase gilt für GC, Umkehrphase für HPLC", "Es besteht kein wesentlicher Unterschied"], correct: 1, explanation: "Normalphase: polare stationäre Phase (Kieselgel), unpolare mobile Phase — unpolare Substanzen eluieren zuerst. Umkehrphase: unpolare stationäre Phase (C18), polare mobile Phase — polare Substanzen zuerst. Die Umkehrphase ist der Normalfall, weil wässrige Laufmittel billig, ungiftig und für biologische Proben passend sind." },
    { id: "q6", question: "Was treibt den Fluss in der Kapillarelektrophorese an?", options: ["Eine Pumpe wie in der HPLC", "Der elektroosmotische Fluss im elektrischen Feld", "Die Schwerkraft im senkrechten Aufbau", "Ein Temperaturunterschied entlang der Kapillare"], correct: 1, explanation: "Oberhalb von pH 3 ist die Kieselglaswand negativ geladen. Die Gegenionen in der Lösung wandern zur Kathode und ziehen die gesamte Flüssigkeitssäule mit — das ist der elektroosmotische Fluss. Weil er über den ganzen Querschnitt gleich schnell ist, entsteht ein flaches Strömungsprofil und damit sehr hohe Trennleistung." },
  ],
  flashcards: [
    { id: "1b898cz", front: "GC-Detektoren", back: "FID: C-haltige Substanzen, sehr empfindlich, zerstörend. TCD: universell, weniger empfindlich. ECD: Halogene, sehr selektiv. MS: Strukturidentifizierung (Goldstandard). FID am häufigsten." },
    { id: "18866hb", front: "RP-HPLC", back: "Umkehrphase: unpolare stat. Phase (C18, C8) + polare mob. Phase (H₂O/MeCN oder H₂O/MeOH). Polare Substanzen eluieren zuerst. >80% aller HPLC-Anwendungen. Kieselgel-Deaktivierung mit C18-Silanen." },
    { id: "1ssrw4o", front: "Extraktion – Mehrfachextraktion", back: "m_n = m₀·(Vaq/(Vaq+K·Vorg))ⁿ. K = c_org/c_aq. n× mit V_klein >> 1× mit n·V_klein. Beispiel: K=85, 3×10ml aus 20ml: verbleiben 0,001% in wässriger Phase." },
    { id: "00tlng0", front: "Kapillarelektrophorese (CE)", back: "Trennung: Ladung/Größe-Verhältnis. Antrieb: EOF (elektroosmotischer Fluss, Kapillarwand negativ → zieht Lösung zur Kathode). Vorteil: kein Lösungsmittelverbrauch, hohe Auflösung. Anwendung: DNA, Proteine, Ionen." },
    { id: "02ulbga", front: "Western Blot", back: "1. SDS-PAGE (Größentrennung). 2. Transfer auf Membran. 3. Blockieren. 4. Primär-AK (spezifisch). 5. Sekundär-AK (markiert). 6. Detektion. Spezifität: Antikörper-Antigen. Anwendung: Proteinnachweis." },
    { id: "0jo5u38", front: "Ionenaustauschchromatographie", back: "Trennung geladener Moleküle. Kationentauscher: -SO₃H, trennungsfähig für Kationen. Anionentauscher: -N(CH₃)₃⁺, trennungsfähig für Anionen. Anwendung: Aminosäuren, Zucker, Ionen in Wasser." },
  ],
} satisfies Thema;
