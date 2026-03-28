// src/courses/organic-chemistry/index.ts
// Kurs-Metadaten – Organische Chemie / Heterocyclic Chemistry and Drug Synthesis
// Vorlesung: VO 270280, Dr. Saad Shaaban, Institute of Organic Chemistry

export const course = {
  id: "organic-chemistry",
  title: "Organische Chemie",
  subtitle: "Heterocyclic Chemistry and Drug Synthesis",
  icon: "⚗️",
  color: "#2dd4bf",
  level: "Uni",
  description:
    "Aromatische Heterocyclen – Nomenklatur, Elektronik, Synthese und Reaktivität. Fokus auf 5- und 6-Ring-Heteroaromaten, Reaktionsmechanismen und Wirkstoffsynthese.",
  topics: [
    "01-introduction",
    "02-pyridines",
    "03-five-ring-one-heteroatom",
    "04-five-ring-two-heteroatoms",
    "05-cycloadditions",
    "06-cyclocondensations",
    "07-sear-regioselectivity",
    "08-mechanisms",
    "09-bioisosteres-skeletal-editing",
  ],
  totalTopics: 9,
  estimatedHours: 18,
  exam: {
    duration: "2h",
    points: 100,
    grading: { 1: "90-100", 2: "77-89", 3: "63-76", 4: "50-62" },
  },
};
