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
`,
  interactive: {
    type: "apparatus-quiz",
    question: "Drei-Elektroden-Aufbau für Voltammetrie",
    mode: "name-to-image",
    targetId: "three-electrode",
    explanation: "Der Drei-Elektroden-Aufbau (Arbeitselektrode WE + Referenzelektrode RE + Gegenelektrode CE) ist notwendig, damit die Referenzelektrode keinen Strom führt und ihr Potential stabil bleibt. Der Strom fließt zwischen WE und CE, die Spannung wird zwischen WE und RE gemessen.",
    hint1: "Zwei-Elektroden: RE führt Strom → Potential ändert sich. Drei-Elektroden: Potentiostat hält E(WE-RE) konstant, Strom fließt über CE.",
    hint2: "Arbeitselektrode (WE): klein, Reaktion findet hier statt. Referenzelektrode (RE): konstantes Potential, kein Strom. Gegenelektrode (CE): groß, Strom fließt hier.",
    options: [
      {
        id: "three-electrode",
        label: "Drei-Elektroden-Voltammetrie-Zelle",
        description: "WE + RE + CE + Potentiostat",
        svg: `<svg viewBox="0 0 300 170" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="80" y="60" width="140" height="80" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="150" y="115" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe</text>
          <rect x="95" y="30" width="30" height="30" rx="3" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="110" y="48" textAnchor="middle" fill="#60a5fa" fontSize="6">WE</text>
          <line x1="110" y1="60" x2="110" y2="90" stroke="#60a5fa" strokeWidth="1.5"/>
          <rect x="135" y="25" width="30" height="35" rx="3" fill="#312e81" stroke="#a78bfa" strokeWidth="1.5"/>
          <text x="150" y="45" textAnchor="middle" fill="#a78bfa" fontSize="6">RE</text>
          <line x1="150" y1="60" x2="150" y2="85" stroke="#a78bfa" strokeWidth="1.5"/>
          <rect x="175" y="30" width="30" height="30" rx="3" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="190" y="48" textAnchor="middle" fill="#f87171" fontSize="6">CE</text>
          <line x1="190" y1="60" x2="190" y2="90" stroke="#f87171" strokeWidth="1.5"/>
          <rect x="10" y="5" width="80" height="25" rx="3" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="50" y="20" textAnchor="middle" fill="#fbbf24" fontSize="7">Potentiostat</text>
          <line x1="90" y1="17" x2="110" y2="30" stroke="#60a5fa" strokeWidth="1"/>
          <line x1="90" y1="17" x2="150" y2="25" stroke="#a78bfa" strokeWidth="1"/>
          <line x1="90" y1="17" x2="190" y2="30" stroke="#f87171" strokeWidth="1"/>
        </svg>`
      },
      {
        id: "two-electrode",
        label: "Zwei-Elektroden-Zelle",
        description: "Nur Mess- und Referenzelektrode",
        svg: `<svg viewBox="0 0 300 150" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="80" y="55" width="140" height="75" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="150" y="100" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe</text>
          <rect x="100" y="25" width="35" height="30" rx="3" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="117" y="43" textAnchor="middle" fill="#60a5fa" fontSize="6">WE</text>
          <line x1="117" y1="55" x2="117" y2="85" stroke="#60a5fa" strokeWidth="1.5"/>
          <rect x="165" y="25" width="35" height="30" rx="3" fill="#312e81" stroke="#a78bfa" strokeWidth="1.5"/>
          <text x="182" y="43" textAnchor="middle" fill="#a78bfa" fontSize="6">RE</text>
          <line x1="182" y1="55" x2="182" y2="85" stroke="#a78bfa" strokeWidth="1.5"/>
          <text x="150" y="135" textAnchor="middle" fill="#64748b" fontSize="7">Problem: RE führt Strom!</text>
        </svg>`
      },
      {
        id: "coulometry",
        label: "Coulometrische Zelle",
        description: "Vollständiger Umsatz, Ladungsmessung",
        svg: `<svg viewBox="0 0 300 150" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="60" y="50" width="180" height="80" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="150" y="95" textAnchor="middle" fill="#2dd4bf" fontSize="8">Probe (vollst. Umsatz)</text>
          <rect x="70" y="20" width="40" height="30" rx="3" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="90" y="38" textAnchor="middle" fill="#60a5fa" fontSize="6">Anode</text>
          <rect x="190" y="20" width="40" height="30" rx="3" fill="#2d0f0f" stroke="#f87171" strokeWidth="1.5"/>
          <text x="210" y="38" textAnchor="middle" fill="#f87171" fontSize="6">Kathode</text>
          <rect x="120" y="5" width="60" height="15" rx="3" fill="#2d1f00" stroke="#fbbf24" strokeWidth="1.5"/>
          <text x="150" y="15" textAnchor="middle" fill="#fbbf24" fontSize="6">Coulometer Q=I·t</text>
        </svg>`
      },
      {
        id: "conductivity",
        label: "Leitfähigkeitsmesszelle",
        description: "Zwei Pt-Elektroden, Wechselstrom",
        svg: `<svg viewBox="0 0 300 140" width="100%" style="display:block;background:#0f172a;border-radius:8px;padding:8px">
          <rect x="60" y="45" width="180" height="75" rx="4" fill="#0d2e2a" stroke="#2dd4bf" strokeWidth="1.5"/>
          <text x="150" y="90" textAnchor="middle" fill="#2dd4bf" fontSize="8">Elektrolytlösung</text>
          <rect x="80" y="30" width="15" height="70" rx="2" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2"/>
          <text x="87" y="20" textAnchor="middle" fill="#60a5fa" fontSize="6">Pt</text>
          <rect x="205" y="30" width="15" height="70" rx="2" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2"/>
          <text x="212" y="20" textAnchor="middle" fill="#60a5fa" fontSize="6">Pt</text>
          <text x="150" y="130" textAnchor="middle" fill="#64748b" fontSize="7">AC-Signal, κ = 1/(R·Z)</text>
        </svg>`
      },
    ],
  },
  quiz: [
    { id: "q1", question: "Warum verwendet man in der Voltammetrie drei Elektroden statt zwei?", options: ["Drei Elektroden sind günstiger", "Damit die Referenzelektrode keinen Strom führt und ihr Potential stabil bleibt", "Um mehr Strom zu erzeugen", "Aus Sicherheitsgründen"], correct: 1, explanation: "Bei zwei Elektroden: Strom fließt durch RE → elektrolytische Reaktion an RE → ihr Potential ändert sich → unzuverlässige Messung. Bei drei Elektroden: Potentiostat hält E(WE vs. RE) konstant, Strom fließt über CE. RE misst nur Potential, kein Strom." },
    { id: "q2", question: "Was ist das Halbstufenpotential E_1/2 in der Polarographie?", options: ["Das Potential bei dem der Strom null ist", "Das Potential bei dem der Strom gleich der Hälfte des Grenzstroms ist – charakteristisch für den Analyten", "Das Standardpotential der Reaktion", "Das Potential der Referenzelektrode"], correct: 1, explanation: "E_1/2 ist das Potential bei i = i_d/2 (halber Grenzstrom). E_1/2 ≈ E°' (Formalpotential) → charakteristisch für das Ion → qualitative Identifizierung möglich. Verschiedene Ionen: verschiedene E_1/2-Werte." },
    { id: "q3", question: "Was ist das Faraday'sche Gesetz in der Coulometrie?", options: ["Q = C·U", "m = M·Q/(n·F) – die Masse ist proportional zur übertragenen Ladung", "i = dQ/dt", "E = Q/C"], correct: 1, explanation: "m = M·Q/(n·F) = M·I·t/(n·F). M = Molmasse, Q = Ladung (C) = I·t, n = Elektronen/Mol, F = 96485 C/mol. Coulometrie ist ein absolutes Verfahren – keine Kalibrierung nötig!" },
    { id: "q4", question: "Was macht die Stripping-Voltammetrie so empfindlich?", options: ["Sie verwendet sehr starke Lichtquellen", "Der Analyt wird zunächst angereichert (konzentriert) an der Elektrode, dann rückgestrippen", "Sie misst bei sehr kleinen Potentialen", "Drei-Elektroden-Aufbau"], correct: 1, explanation: "Stripping-Voltammetrie: 1. Anreicherungsphase: Analyt wird bei konstantem Potential elektrochemisch an WE abgeschieden (z.B. 5 min). 2. Rückstrippung: Potential geändert → Analyt gelöst → scharfer Strompeak. Anreicherung = Voranreicherung → ppb bis ppt messbar." },
    { id: "q5", question: "Welches Kriterium zeigt ein reversibles System im Cyclovoltammogramm?", options: ["Nur ein Peak sichtbar", "i_pc/i_pa ≈ 1 und E_pa − E_pc = 57/n mV (bei 25°C)", "E_pa = E_pc", "Kein Rückpeak vorhanden"], correct: 1, explanation: "Reversibler Prozess (Nernst'sches Gleichgewicht): i_pc/i_pa = 1 (gleiche Peakhöhen), E_pa − E_pc = 59/n mV (25°C). Irreversibel: i_pc << i_pa, Peakseparation >> 59/n mV. E_1/2 = (E_pa + E_pc)/2 = Formalpotential E°'." },
    { id: "q6", question: "Wozu dient die Karl-Fischer-Titration?", options: ["Bestimmung von Schwermetallen", "Coulometrische Bestimmung von Wasser in Proben mit hoher Präzision", "pH-Messung in nichtwässrigen Systemen", "Bestimmung von Halogeniden"], correct: 1, explanation: "Karl-Fischer-Titration: coulometrische Wasserbestimmung. Reagenz (I₂, SO₂, Pyridin/Imidazol, MeOH) reagiert stöchiometrisch mit H₂O. Elektrolytisch erzeugte I₂-Menge ∝ H₂O-Gehalt. Sehr präzise (μg H₂O), wichtig für Pharma, Lebensmittel, Petroleumprodukte." },
  ],
  flashcards: [
    { front: "Drei-Elektroden-Aufbau", back: "WE (Arbeitselektrode, klein, Reaktion hier), RE (Referenz, kein Strom, stabiles E), CE (Gegenelektrode, groß, Strom fließt hier). Potentiostat hält E(WE vs. RE) konstant." },
    { front: "Halbstufenpotential E_1/2", back: "E_1/2 = Potential bei i = i_d/2 (halber Grenzstrom). Charakteristisch für Analyt-Ion (≈ Formalpotential E°'). Qualitative Identifizierung möglich. Verschiedene Ionen → verschiedene E_1/2." },
    { front: "Faraday'sches Gesetz", back: "m = M·Q/(n·F) = M·I·t/(n·F). Q [C] = I [A] × t [s]. F = 96485 C/mol. n = Elektronen/Mol. Coulometrie: absolutes Verfahren, keine Kalibrierung nötig!" },
    { front: "Stripping-Voltammetrie", back: "1. Anreicherung: Analyt bei konst. E abgeschieden (typ. 1–5 min). 2. Rückstrippung: E geändert → Strompeak. Sehr empfindlich: ng/L bis pg/L. Anwendung: Schwermetalle (Pb, Cd, Cu) in Wasser." },
    { front: "Cyclovoltammetrie (CV)", back: "Dreieck-Potential. Reversibel: i_pc/i_pa = 1, ΔE_p = 59/n mV. Irreversibel: nur ein Peak oder asymmetrisch. E°' = (E_pa + E_pc)/2. Informationen über Kinetik und Mechanismus." },
    { front: "Karl-Fischer-Titration", back: "Coulometrische H₂O-Bestimmung. H₂O + I₂ + SO₂ + MeOH + Base → Reaktion. I₂ wird elektrolytisch erzeugt. n(I₂) ∝ n(H₂O). Präzision: μg. Anwendung: Pharma, Lebensmittel, Öle." },
  ],
};
