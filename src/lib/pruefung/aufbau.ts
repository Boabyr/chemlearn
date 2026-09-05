import type { Ordnung } from '../../content/schema'
import type { ExamStructure } from '../../data/exams'
import type { Ziehung } from './ziehung'

/**
 * Aus Ordnung und Ziehung eine Prüfungsstruktur bauen.
 *
 * Der Simulator kennt nur `ExamStructure` — Zeitgeber, Fortschritt,
 * Ergebnisseite und Nachrunde hängen daran. Die Ordnungsprüfung geht deshalb
 * denselben Weg, statt einen zweiten Ablauf danebenzustellen. Abschnitte sind
 * hier die Stoffgebiete.
 */
export function aufbauAusOrdnung(ordnung: Ordnung, ziehung: Ziehung): ExamStructure {
  const sections = ordnung.gebiete.map(gebiet => {
    const ids = ziehung.fragen.filter(f => f.gruppe === gebiet.id).map(f => f.id)
    return {
      gruppe: gebiet.id,
      points: Math.round(ids.length * ordnung.punkteJeFrage * 100) / 100,
      // Die Ordnung kennt keine Grenze je Gebiet, nur eine für die ganze Prüfung.
      passingPoints: 0,
      questionIds: ids,
    }
  })

  const gesamt = Math.round(ziehung.fragen.length * ordnung.punkteJeFrage * 100) / 100
  const untersteGrenze = ordnung.noten.length
    ? ordnung.noten[ordnung.noten.length - 1].ab
    : Math.ceil(gesamt / 2)

  return {
    id: 'ordnung',
    date: '',
    title: ordnung.titel,
    totalPoints: gesamt,
    passingPoints: untersteGrenze,
    sections,
  }
}
