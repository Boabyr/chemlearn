#!/usr/bin/env node
/**
 * Listet Quizfragen-Paare mit hoher Wortüberlappung — zum Drüberschauen, bevor
 * neue Fragen dazukommen.
 *
 * Bewusst kein Test: echte Dubletten lagen bei 67 bis 100 % Überlappung,
 * Fehlalarme bei 60 bis 71 %. Die Bereiche überlappen, eine Schwelle kann
 * deshalb nicht entscheiden. Dieses Werkzeug zeigt die Kandidaten, urteilen
 * muss ein Mensch.
 *
 *   npm run fragen:aehnlich            alle Kurse, ab 60 %
 *   npm run fragen:aehnlich -- 0.5     andere Schwelle
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const KURSE_DIR = 'src/courses'
const schwelle = Number(process.argv.find(a => /^0?\.\d+$/.test(a)) ?? 0.6)

function fragenDesKurses(kursId) {
  const dir = join(KURSE_DIR, kursId, 'topics')
  if (!existsSync(dir)) return []
  const alle = []
  for (const datei of readdirSync(dir).sort()) {
    const quelle = readFileSync(join(dir, datei), 'utf8')
    const thema = quelle.match(/^  id: "([^"]+)"/m)?.[1] ?? datei
    const block = quelle.slice(quelle.indexOf('  quiz: ['), quelle.indexOf('  flashcards:'))
    for (const treffer of block.matchAll(/id: "(q\d+)",\s*\n?\s*question: "((?:[^"\\]|\\.)*)"/g)) {
      alle.push({ thema, id: treffer[1], frage: JSON.parse(`"${treffer[2]}"`) })
    }
  }
  return alle
}

/** Inhaltswörter, kurze Füllwörter fliegen raus. */
const woerter = text =>
  new Set(text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(' ').filter(w => w.length > 3))

function ueberlappung(a, b) {
  const A = woerter(a), B = woerter(b)
  if (!A.size || !B.size) return 0
  let gemeinsam = 0
  for (const wort of A) if (B.has(wort)) gemeinsam++
  return gemeinsam / Math.min(A.size, B.size)
}

const kurse = readdirSync(KURSE_DIR).filter(k => existsSync(join(KURSE_DIR, k, 'topics')))
let gesamt = 0

for (const kursId of kurse) {
  const fragen = fragenDesKurses(kursId)
  const paare = []
  for (let i = 0; i < fragen.length; i++) {
    for (let j = i + 1; j < fragen.length; j++) {
      const wert = ueberlappung(fragen[i].frage, fragen[j].frage)
      if (wert >= schwelle) paare.push({ wert, a: fragen[i], b: fragen[j] })
    }
  }
  paare.sort((x, y) => y.wert - x.wert)
  gesamt += paare.length

  console.log(`\n=== ${kursId} — ${fragen.length} Fragen, ${paare.length} Paare ab ${Math.round(schwelle * 100)} %`)
  for (const paar of paare) {
    console.log(`  ${(paar.wert * 100).toFixed(0).padStart(3)} %  ${paar.a.thema}:${paar.a.id}  <->  ${paar.b.thema}:${paar.b.id}`)
    console.log(`         ${paar.a.frage}`)
    console.log(`         ${paar.b.frage}`)
  }
}

console.log(`\n${gesamt} Paare zum Durchsehen. Ein hoher Wert ist ein Verdacht, kein Urteil —`)
console.log('verschiedene Moleküle können dieselben Wörter tragen.')
