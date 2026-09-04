import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  leseOrdnung, leseOrdnungAusIndex, kursIndexAlsTypeScript, standardKursMeta,
} from '../../scripts/import-content.mjs'

/**
 * Der Importer gegen echtes Nicht-Chemie-Material.
 *
 * Zwei Dinge sind hier schon schiefgegangen: der Kurskopf wurde beim zweiten
 * Lauf aus dem erzeugten Index zurückgelesen und verlor dabei jedes Feld, das
 * das Rücklesen nicht kannte (`sprache` stellte organic-chemistry still auf
 * Deutsch); und die Stundenangabe blieb stehen, während die Themen wuchsen —
 * was die Kursangaben-Prüfung in `inhalte.test.ts` zwangsläufig reißt.
 *
 * Der Lauf schreibt in einen Wegwerfordner, nicht in `src/courses`.
 */
describe('Importer', () => {
  const WURZEL = process.cwd()
  let arbeit: string

  const importiere = (...flags: string[]) =>
    execFileSync(
      process.execPath,
      [join(WURZEL, 'scripts/import-content.mjs'), '.source/beispiel-physik', ...flags],
      { cwd: arbeit, encoding: 'utf8' },
    )

  const index = () =>
    readFileSync(join(arbeit, 'src/courses/beispiel-physik/index.ts'), 'utf8')

  beforeAll(() => {
    arbeit = mkdtempSync(join(tmpdir(), 'chemlearn-import-'))
    mkdirSync(join(arbeit, 'src/courses'), { recursive: true })
    mkdirSync(join(arbeit, 'src/components/Apparatus'), { recursive: true })
    cpSync(join(WURZEL, '.source/beispiel-physik'), join(arbeit, '.source/beispiel-physik'), { recursive: true })
    cpSync(join(WURZEL, 'src/components/Apparatus/registry.ts'), join(arbeit, 'src/components/Apparatus/registry.ts'))
    importiere()
  })

  afterAll(() => rmSync(arbeit, { recursive: true, force: true }))

  it('nimmt den Kurskopf aus der Quelle statt aus dem Ordnernamen', () => {
    expect(index()).toContain('title: "Physik 1"')
    expect(index()).toContain('icon: "🪐"')
    expect(index()).toContain('{ id: "uebung", label: "Übungsfragen", icon: "📝" }')
    expect(index()).toContain('{ id: "probe", label: "Probeklausur", icon: "📄" }')
  })

  it('schreibt Formelsatz und Entwurfskennzeichen mit', () => {
    expect(index()).toContain('formelsatz: "aus"')
    expect(index()).toContain('entwurf: true')
    expect(index()).toContain('sprache: "de"')
  })

  it('rechnet die Stundenangabe aus den Themenzeiten', () => {
    // 75 Minuten in einem Thema — 1,25 h, gerundet 1,3.
    expect(index()).toContain('estimatedHours: 1.3')
  })

  it('lässt den Nachspann für den nächsten Lauf fallen', () => {
    // Die Quell-LLM schließt jede Antwort mit der Liste der vergebenen Slugs
    // ab. Ohne eigene Behandlung landete sie im letzten Abschnitt des letzten
    // Themas — hier in den Karteikarten.
    const quelle = join(arbeit, '.source/beispiel-physik/01-kinematik.md')
    const original = readFileSync(quelle, 'utf8')
    writeFileSync(quelle, original +
      '\n=== VERGEBEN ===\n- 01-gleichfoermige-bewegung\n\n=== FORTSETZUNG FOLGT ===\n')

    importiere('--force')
    const thema = readFileSync(
      join(arbeit, 'src/courses/beispiel-physik/topics/01-gleichfoermige-bewegung.ts'), 'utf8')
    expect(thema).not.toContain('VERGEBEN')
    expect(thema).not.toContain('FORTSETZUNG')

    writeFileSync(quelle, original)
  })

  it('bestätigt jede Quelldatei einzeln', () => {
    // Ohne Einzelbestätigung fällt nicht auf, wenn eine Datei stumm
    // übersprungen wird — genau so ging Kapitel 15 der Physik verloren.
    const ausgabe = importiere('--dry-run')
    expect(ausgabe).toContain('Quelldateien:')
    expect(ausgabe).toMatch(/01-kinematik\.md\s+.*Thema/)
  })

  it('bestätigt am Ende, dass nichts zu beanstanden war', () => {
    const ausgabe = importiere('--dry-run')
    expect(ausgabe).toContain('Alles geprüft')
    expect(ausgabe).toContain('keine Beanstandungen')
  })

  it('meldet eine Quelldatei, aus der nichts gelesen wurde', () => {
    const stumm = join(arbeit, '.source/beispiel-physik/99-ohne-kopf.md')
    writeFileSync(stumm, '# META\ntitel: Ohne Dateikopf\n')

    const ausgabe = importiere('--dry-run')
    expect(ausgabe).toContain('99-ohne-kopf.md')
    expect(ausgabe).toContain('nichts erkannt')
    expect(ausgabe).not.toContain('keine Beanstandungen')

    rmSync(stumm)
  })

  it('meldet ein Thema unter der Sollstärke', () => {
    // Die Physik-Kapitel 1 bis 14 kamen ohne QUIZ und FLASHCARDS an. Der Lauf
    // schrieb sie klaglos — erst die Tests der App fielen darüber.
    const duenn = join(arbeit, '.source/beispiel-physik/98-duenn.md')
    writeFileSync(duenn,
      '=== DATEI: 98-duenn.md ===\n\n# META\ntitel: Dünnes Thema\n\n# THEORIE\n\nZu kurz.\n')

    const ausgabe = importiere('--dry-run')
    expect(ausgabe).toContain('98-duenn')
    expect(ausgabe).toContain('keine Quizfragen')
    expect(ausgabe).toContain('keine Karteikarten')
    expect(ausgabe).not.toContain('keine Beanstandungen')

    rmSync(duenn)
  })

  it('behält den Kurskopf, wenn die Quelle keinen mehr mitbringt', () => {
    // Der Fall aus organic-chemistry: ein späterer Lauf bringt nur Themen mit.
    // Was im Index steht, muss den Lauf überleben.
    const quelle = join(arbeit, '.source/beispiel-physik/01-kinematik.md')
    const ohneKopf = readFileSync(quelle, 'utf8').replace(/^=== KURS ===[\s\S]*?(?==== DATEI:)/m, '')
    expect(ohneKopf).not.toContain('=== KURS ===')
    writeFileSync(quelle, ohneKopf)

    importiere('--force')
    expect(index()).toContain('title: "Physik 1"')
    expect(index()).toContain('sprache: "de"')
    expect(index()).toContain('formelsatz: "aus"')
    expect(index()).toContain('entwurf: true')
    expect(index()).toContain('{ id: "uebung", label: "Übungsfragen", icon: "📝" }')
    expect(index()).toContain('{ id: "probe", label: "Probeklausur", icon: "📄" }')
  })
})

describe('Ordnungsblock', () => {
  it('rechnet die Fragen je Gebiet aus und schreibt sie in den Kurskopf', () => {
    const quelle = [
      '=== ORDNUNG ===',
      'titel: Schriftliche Prüfung',
      'fragen: 4',
      'punkte_je_frage: 1.6',
      'regel: streng',
      'zeit_minuten: 120',
      'noten: 29 sehr gut | 17 genügend',
      'gebiet: Erstes Gebiet | 01-eins, 02-zwei',
      'gebiet: Zweites Gebiet | 03-drei, 04-vier',
      '',
    ].join('\n')

    const ordnung = leseOrdnung(quelle, 'Prüfung')
    expect(ordnung.fragen).toBe(4)
    expect(ordnung.punkteJeFrage).toBe(1.6)
    expect(ordnung.regel).toBe('streng')
    expect(ordnung.zeitMinuten).toBe(120)
    expect(ordnung.noten).toEqual([{ ab: 29, note: 'sehr gut' }, { ab: 17, note: 'genügend' }])
    expect(ordnung.gebiete.map((g: { id: string; fragen: number }) => [g.id, g.fragen])).toEqual([
      ['erstes-gebiet', 2], ['zweites-gebiet', 2],
    ])
    expect(ordnung.gebiete[0].topics).toEqual(['01-eins', '02-zwei'])
  })

  // Die Vorrangregel gilt wie beim KURS-Block: eine Quelle ohne ORDNUNG darf
  // eine schon eingespielte Ordnung nicht wegwerfen. Genau das ging bei den
  // Prüfern einmal schief (`gruppen`), als der Rückleser fehlte.
  const BEISPIEL_ORDNUNG = {
    titel: 'Schriftliche Prüfung',
    fragen: 4,
    punkteJeFrage: 1.6,
    regel: 'streng',
    zeitMinuten: 120,
    noten: [{ ab: 29, note: 'sehr gut' }, { ab: 17, note: 'genügend' }],
    gebiete: [
      { id: 'erstes-gebiet', titel: 'Erstes Gebiet', fragen: 2, topics: ['01-eins', '02-zwei'] },
      { id: 'zweites-gebiet', titel: 'Zweites Gebiet', fragen: 2, topics: ['03-drei', '04-vier'] },
    ],
  }

  it('behält die Ordnung, wenn ein Lauf ohne Ordnungsblock kommt', () => {
    const index = kursIndexAlsTypeScript(
      { ...standardKursMeta('kurs'), ordnung: BEISPIEL_ORDNUNG }, 'kurs', ['01-eins'])
    expect(leseOrdnungAusIndex(index)).toEqual(BEISPIEL_ORDNUNG)
  })
})
