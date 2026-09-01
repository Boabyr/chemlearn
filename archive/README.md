# Archiv — nicht ausführen

Diese fünf Skripte haben den Kurs- und Seitenbestand ursprünglich erzeugt.
Jedes besteht aus `cat > datei << 'EOF'`-Blöcken und **überschreibt seine
Zieldateien vollständig**. Ein Aufruf macht jede Handarbeit an
`src/courses/`, `src/pages/` oder `src/data/` rückgängig — ohne Rückfrage.

Sie liegen hier, weil sie die Entstehung dokumentieren. Neue Inhalte kommen
über `npm run import` (siehe `CONTENT-PROMPT.md`), nicht über diese Skripte.

| Datei | Was es damals geschrieben hat |
|---|---|
| `setup-ac1-part2.sh` | AC1-Themen 10–18, Kursindex, `courseRegistry.ts` |
| `setup-exam-mode.sh` | Prüfungsmodus: Fragenkatalog, PracticeMode, ExamSimulator, Dashboard |
| `setup-restructure.sh` | Dashboard, CoursePage, TopicPage, `useProgress` |
| `translate-organic-chemistry.sh` | alle 9 OC-Themen auf Englisch |
| `tutor-system.sh` | Rollen-SQL, TutorDashboard, Report-/Suggest-Knöpfe |
