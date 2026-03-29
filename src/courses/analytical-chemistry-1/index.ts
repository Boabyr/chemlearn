export const course = {
  id: "analytical-chemistry-1",
  title: "Analytische Chemie 1",
  subtitle: "Spektrometrie, Elektrochemie & Sensorik",
  icon: "🔭",
  color: "#3b82f6",
  level: "Uni",
  description:
    "Spektrometrische und elektrochemische Analysemethoden: Lambert-Beer-Gesetz, FT-IR, Raman, Fluoreszenz, Röntgenspektroskopie, Potentiometrie, Voltammetrie und Chemosensoren.",
  topics: [
    "01-grundlagen-spektroskopie",
    "02-lambert-beer",
    "03-fluoreszenz-lumineszenz",
    "04-ftir-raman",
    "05-roentgenspektroskopie",
    "06-elektrochemische-grundlagen",
    "07-potentiometrie-nernst",
    "08-voltammetrie-coulometrie",
    "09-chemosensoren",
  ],
  totalTopics: 9,
  estimatedHours: 20,
  exam: {
    duration: "2h",
    points: 72,
    grading: { 1: "≥63", 2: "≥54", 3: "≥45", 4: "≥36" },
    note: "Min. 36 Gesamt UND min. 10 pro Prüfungsteil zum Bestehen",
  },
};
