import { describe, it, expect, beforeEach } from 'vitest'
import 'fake-indexeddb/auto'
import { nachtragen, abholen, quittieren, anzahl, leeren } from './outbox'

describe('Ausgangskorb', () => {
  beforeEach(async () => { await leeren() })

  it('legt fehlgeschlagene Zeilen zurück und gibt sie wieder heraus', async () => {
    await nachtragen('attempts', [{ questionId: 'L001' }, { questionId: 'L002' }])
    const pakete = await abholen<{ questionId: string }>('attempts')
    expect(pakete).toHaveLength(1)
    expect(pakete[0].zeilen.map(z => z.questionId)).toEqual(['L001', 'L002'])
  })

  it('hält Arten auseinander', async () => {
    await nachtragen('attempts', [{ a: 1 }])
    await nachtragen('reviews', [{ b: 2 }])
    expect(await anzahl('attempts')).toBe(1)
    expect(await anzahl('reviews')).toBe(1)
    expect((await abholen('attempts'))[0].art).toBe('attempts')
  })

  it('gibt Pakete in der Reihenfolge ihres Eingangs zurück', async () => {
    await nachtragen('attempts', [{ n: 1 }])
    await nachtragen('attempts', [{ n: 2 }])
    await nachtragen('attempts', [{ n: 3 }])
    const pakete = await abholen<{ n: number }>('attempts')
    expect(pakete.map(p => p.zeilen[0].n)).toEqual([1, 2, 3])
  })

  it('vergisst quittierte Pakete, aber nur diese', async () => {
    await nachtragen('attempts', [{ n: 1 }])
    await nachtragen('attempts', [{ n: 2 }])
    const [erstes] = await abholen<{ n: number }>('attempts')
    await quittieren(erstes.id)
    const rest = await abholen<{ n: number }>('attempts')
    expect(rest).toHaveLength(1)
    expect(rest[0].zeilen[0].n).toBe(2)
  })

  it('ignoriert leere Listen', async () => {
    await nachtragen('attempts', [])
    expect(await anzahl('attempts')).toBe(0)
  })

  it('übersteht einen Neustart der Seite', async () => {
    await nachtragen('attempts', [{ n: 42 }])
    // Neuer Zugriff öffnet die Datenbank erneut — der Inhalt muss noch da sein.
    const pakete = await abholen<{ n: number }>('attempts')
    expect(pakete[0].zeilen[0].n).toBe(42)
  })
})
