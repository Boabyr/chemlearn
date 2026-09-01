import { describe, it, expect } from 'vitest'
import {
  tagesverlauf, eckdaten, faelligkeitsVorschau, reifePrognose, tageBis,
  type StatistikVersuch, type TagesWert,
} from './statistik'

const jetzt = new Date('2026-03-10T12:00:00Z')
const tag = (n: number) => new Date(jetzt.getTime() + n * 86_400_000).toISOString()

const versuch = (teil: Partial<StatistikVersuch>): StatistikVersuch => ({
  topicId: 't1', questionId: 'q1', correct: true, answeredAt: tag(0), ...teil,
})

describe('tagesverlauf', () => {
  it('füllt Tage ohne Antwort mit null-Quote auf', () => {
    const verlauf = tagesverlauf([versuch({ answeredAt: tag(0) })], 5, jetzt, 'UTC')
    expect(verlauf).toHaveLength(5)
    expect(verlauf[4].datum).toBe('2026-03-10')
    expect(verlauf[4].quote).toBe(1)
    expect(verlauf[0].quote).toBeNull()
    expect(verlauf[0].gesamt).toBe(0)
  })

  it('rechnet Trefferquote und Zeit je Tag zusammen', () => {
    const verlauf = tagesverlauf([
      versuch({ correct: true, msTaken: 20_000 }),
      versuch({ correct: false, msTaken: 40_000 }),
    ], 1, jetzt, 'UTC')
    expect(verlauf[0].gesamt).toBe(2)
    expect(verlauf[0].richtig).toBe(1)
    expect(verlauf[0].quote).toBe(0.5)
    expect(verlauf[0].sekunden).toBe(60)
  })

  it('deckelt unsinnig lange Einzelzeiten', () => {
    // Wer die Seite offen liegen lässt, produziert sonst Stunden „Lernzeit".
    const verlauf = tagesverlauf([versuch({ msTaken: 9_000_000 })], 1, jetzt, 'UTC')
    expect(verlauf[0].sekunden).toBe(300)
  })

  it('lässt Antworten außerhalb des Zeitraums weg', () => {
    const verlauf = tagesverlauf([versuch({ answeredAt: tag(-40) })], 7, jetzt, 'UTC')
    expect(verlauf.every(t => t.gesamt === 0)).toBe(true)
  })
})

describe('eckdaten', () => {
  it('zählt Antworten, Treffer, Zeit und Lerntage', () => {
    const werte = eckdaten([
      versuch({ correct: true, msTaken: 10_000, answeredAt: tag(0) }),
      versuch({ correct: false, msTaken: 10_000, answeredAt: tag(0) }),
      versuch({ correct: true, msTaken: 10_000, answeredAt: tag(-1) }),
    ], 'UTC')
    expect(werte.antworten).toBe(3)
    expect(werte.richtig).toBe(2)
    expect(werte.quote).toBeCloseTo(2 / 3)
    expect(werte.sekunden).toBe(30)
    expect(werte.lerntage).toBe(2)
  })

  it('bleibt bei leerer Historie bei null', () => {
    expect(eckdaten([], 'UTC')).toEqual({ antworten: 0, richtig: 0, quote: 0, sekunden: 0, lerntage: 0 })
  })
})

describe('faelligkeitsVorschau', () => {
  it('legt alles Überfällige auf den heutigen Tag', () => {
    const vorschau = faelligkeitsVorschau(
      [{ dueAt: tag(-9) }, { dueAt: tag(-2) }, { dueAt: tag(1) }], 7, jetzt, 'UTC',
    )
    expect(vorschau[0].anzahl).toBe(2)
    expect(vorschau[0].ueberfaellig).toBe(true)
    expect(vorschau[1].anzahl).toBe(1)
  })

  it('zeigt genau so viele Tage wie gewünscht', () => {
    const vorschau = faelligkeitsVorschau([], 14, jetzt, 'UTC')
    expect(vorschau).toHaveLength(14)
    expect(vorschau[0].datum).toBe('2026-03-10')
    expect(vorschau[13].datum).toBe('2026-03-23')
  })

  it('lässt Fälligkeiten hinter dem Zeitraum weg', () => {
    const vorschau = faelligkeitsVorschau([{ dueAt: tag(60) }], 7, jetzt, 'UTC')
    expect(vorschau.every(t => t.anzahl === 0)).toBe(true)
  })
})

describe('reifePrognose', () => {
  const verlauf = (quoten: (number | null)[]): TagesWert[] =>
    quoten.map((q, i) => ({
      datum: `2026-03-${String(i + 1).padStart(2, '0')}`,
      gesamt: q === null ? 0 : 10,
      richtig: q === null ? 0 : Math.round(q * 10),
      quote: q,
      sekunden: 0,
    }))

  it('sagt bei erreichtem Ziel null Tage', () => {
    expect(reifePrognose(verlauf([0.5, 0.6, 0.7]), 0.85)).toEqual({ tage: 0, erreichbar: true })
  })

  it('gibt ohne genug Lerntage keine Aussage', () => {
    expect(reifePrognose(verlauf([0.5, null, null]), 0.5)).toBeNull()
  })

  it('meldet stehenden Fortschritt als nicht erreichbar', () => {
    expect(reifePrognose(verlauf([0.5, 0.5, 0.5, 0.5]), 0.5)).toEqual({ tage: 0, erreichbar: false })
  })

  it('rechnet aus steigender Quote eine Tageszahl aus', () => {
    const p = reifePrognose(verlauf([0.4, 0.5, 0.6, 0.7]), 0.6, 0.8)
    expect(p?.erreichbar).toBe(true)
    expect(p!.tage).toBeGreaterThan(0)
  })
})

describe('tageBis', () => {
  it('zählt Tage bis zum Termin', () => {
    expect(tageBis('2026-03-20', jetzt, 'UTC')).toBe(10)
    expect(tageBis('2026-03-10', jetzt, 'UTC')).toBe(0)
    expect(tageBis('2026-03-05', jetzt, 'UTC')).toBe(-5)
  })
})
