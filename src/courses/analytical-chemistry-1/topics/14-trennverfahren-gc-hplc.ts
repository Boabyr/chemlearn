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
`,
  quiz: [
    { id: "q1", question: "Warum muss Kieselgel für die RP-HPLC deaktiviert werden?", options: ["Um die Partikelgröße zu verringern", "Um polare OH-Gruppen der SiO₂-Oberfläche durch Reaktion mit Silanen zu blockieren – verhindert unerwünschte Adsorption", "Um die Säule stabiler zu machen", "Kieselgel wird gar nicht deaktiviert"], correct: 1, explanation: "Kieselgel hat viele OH-Gruppen (Silanole) an der Oberfläche → polare Wechselwirkungen mit polaren Gruppen → schlechte Peaks, Tailing. Deaktivierung: Reaktion mit Chlorsilanen (z.B. C18-Silane) → hydrophobe C18-Gruppen. Restliche OH-Gruppen: End-Capping." },
    { id: "q2", question: "In der Umkehrphasen-HPLC (RP-HPLC) mit C18-Säule und Wasser/Acetonitril: Welche Substanz eluiert zuerst?", options: ["Die unpolarste Substanz", "Die polarste Substanz (geringste Affinität zur unpolaren C18-Phase)", "Die schwerste Substanz", "Die Substanz mit höchstem Rf-Wert"], correct: 1, explanation: "RP-HPLC: unpolare stat. Phase (C18) + polare mob. Phase (Wasser/MeCN). Polare Substanzen: geringe Affinität zu C18 → kleines k' → eluieren zuerst. Unpolare Substanzen: hohe Affinität → großes k' → eluieren zuletzt." },
    { id: "q3", question: "Was ist Split-Injection in der GC?", options: ["Probe wird durch ein Ventil geteilt und zweimal injiziert", "Probe wird aufgeteilt: nur Bruchteil (Split ratio 1:10 bis 1:1000) gelangt auf die Säule", "Zwei verschiedene Proben werden gleichzeitig injiziert", "Probe wird bei verschiedenen Temperaturen injiziert"], correct: 1, explanation: "Split-Injection: Trägergas + Probe → Injektor → Split: z.B. 1/100 geht auf Säule, Rest wird abgelassen. Vorteile: scharfe Peaks (keine Bandenverbreiterung durch Injektion), verhindert Überlastung der Kapillarsäule. Nachteil: Empfindlichkeit sinkt." },
    { id: "q4", question: "Wie viel von 20ml 100mM Jod-Lösung (K=85) bleibt nach 3 Extraktionen mit je 10ml org. LM übrig?", options: ["~0,001% (vernachlässigbar wenig)", "~2,3% der ursprünglichen Menge", "~50%", "~85%"], correct: 0, explanation: "m_n = m₀·(V_aq/(V_aq+K·V_org))ⁿ = m₀·(20/(20+85·10))³ = m₀·(20/870)³ = m₀·(0,023)³ = m₀·1,22×10⁻⁵ ≈ 0,001%. Fast vollständige Extraktion! 3× kleine Portionen >> 1× große Portion." },
    { id: "q5", question: "Worin besteht der Unterschied zwischen Normal- und Umkehrphasenchromatographie?", options: ["Normalphase: höhere Temperatur; Umkehrphase: Raumtemperatur", "Normalphase: polare stat. Phase, unpolare mob. Phase (unpolare Substanzen zuerst); Umkehrphase: umgekehrt (polare zuerst)", "Normalphase ist für GC, Umkehrphase für HPLC", "Kein wesentlicher Unterschied"], correct: 1, explanation: "Normalphase: polare stat. Phase (SiO₂), unpolare mob. Phase (Hexan) → polare Substanzen retardiert → unpolare eluieren zuerst. Umkehrphase: unpolare stat. (C18), polare mob. (Wasser/MeCN) → polare eluieren zuerst. RP > 80% aller HPLC-Anwendungen." },
    { id: "q6", question: "Was treibt den Fluss in der Kapillarelektrophorese an?", options: ["Pumpe wie in der HPLC", "Elektroosmotischer Fluss (EOF) durch elektrisches Feld – negativ geladene Kapillarwand zieht Wasserfilm mit", "Schwerkraft", "Temperaturunterschied"], correct: 1, explanation: "CE: Kapillarwand bei pH>3 negativ geladen (Si-O⁻-Gruppen) → diffuse Doppelschicht aus Kationen → elektrisches Feld treibt diese zur Kathode → nimmt gesamtes Lösungsmittel mit (EOF). Kein mechanischer Pumpe nötig!" },
  ],
  flashcards: [
    { front: "GC-Detektoren", back: "FID: C-haltige Substanzen, sehr empfindlich, zerstörend. TCD: universell, weniger empfindlich. ECD: Halogene, sehr selektiv. MS: Strukturidentifizierung (Goldstandard). FID am häufigsten." },
    { front: "RP-HPLC", back: "Umkehrphase: unpolare stat. Phase (C18, C8) + polare mob. Phase (H₂O/MeCN oder H₂O/MeOH). Polare Substanzen eluieren zuerst. >80% aller HPLC-Anwendungen. Kieselgel-Deaktivierung mit C18-Silanen." },
    { front: "Extraktion – Mehrfachextraktion", back: "m_n = m₀·(Vaq/(Vaq+K·Vorg))ⁿ. K = c_org/c_aq. n× mit V_klein >> 1× mit n·V_klein. Beispiel: K=85, 3×10ml aus 20ml: verbleiben 0,001% in wässriger Phase." },
    { front: "Kapillarelektrophorese (CE)", back: "Trennung: Ladung/Größe-Verhältnis. Antrieb: EOF (elektroosmotischer Fluss, Kapillarwand negativ → zieht Lösung zur Kathode). Vorteil: kein Lösungsmittelverbrauch, hohe Auflösung. Anwendung: DNA, Proteine, Ionen." },
    { front: "Western Blot", back: "1. SDS-PAGE (Größentrennung). 2. Transfer auf Membran. 3. Blockieren. 4. Primär-AK (spezifisch). 5. Sekundär-AK (markiert). 6. Detektion. Spezifität: Antikörper-Antigen. Anwendung: Proteinnachweis." },
    { front: "Ionenaustauschchromatographie", back: "Trennung geladener Moleküle. Kationentauscher: -SO₃H, trennungsfähig für Kationen. Anionentauscher: -N(CH₃)₃⁺, trennungsfähig für Anionen. Anwendung: Aminosäuren, Zucker, Ionen in Wasser." },
  ],
};
