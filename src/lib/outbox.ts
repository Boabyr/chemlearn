/**
 * Ausgangskorb für Schreibvorgänge, die gerade nicht durchgehen.
 *
 * `useAttempts.flush()` leerte den Puffer bisher *vor* dem `await`. Schlug der
 * Insert fehl — Funkloch, Tunnel, Serverfehler —, waren die Antworten weg und
 * es blieb ein `console.error`. Was nicht ankommt, landet jetzt hier und wird
 * beim nächsten erfolgreichen Schreiben mitgenommen.
 *
 * Grundlage für den Offline-Betrieb in Phase 6.
 */

export type Art = 'attempts' | 'reviews'

export interface Paket<T = unknown> {
  id: number
  art: Art
  zeilen: T[]
  erstellt: string
}

const DB_NAME = 'chemlearn-outbox'
const STORE = 'pakete'
const VERSION = 1

/** Rückfall, wenn IndexedDB fehlt (privater Modus, alte Browser, Tests ohne Shim). */
const speicher: Paket[] = []
let naechsteId = 1
let indexedDbNutzbar: boolean | null = null

function db(): Promise<IDBDatabase | null> {
  if (indexedDbNutzbar === false) return Promise.resolve(null)
  if (typeof indexedDB === 'undefined') { indexedDbNutzbar = false; return Promise.resolve(null) }

  return new Promise(erfuellen => {
    let anfrage: IDBOpenDBRequest
    try {
      anfrage = indexedDB.open(DB_NAME, VERSION)
    } catch {
      indexedDbNutzbar = false
      erfuellen(null)
      return
    }
    anfrage.onupgradeneeded = () => {
      const datenbank = anfrage.result
      if (!datenbank.objectStoreNames.contains(STORE)) {
        const store = datenbank.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
        store.createIndex('art', 'art', { unique: false })
      }
    }
    anfrage.onsuccess = () => { indexedDbNutzbar = true; erfuellen(anfrage.result) }
    anfrage.onerror = () => { indexedDbNutzbar = false; erfuellen(null) }
  })
}

function alsPromise<T>(anfrage: IDBRequest<T>): Promise<T> {
  return new Promise((erfuellen, ablehnen) => {
    anfrage.onsuccess = () => erfuellen(anfrage.result)
    anfrage.onerror = () => ablehnen(anfrage.error)
  })
}

/** Zeilen für später zurücklegen. Leere Listen werden ignoriert. */
export async function nachtragen<T>(art: Art, zeilen: T[]): Promise<void> {
  if (zeilen.length === 0) return
  const eintrag = { art, zeilen, erstellt: new Date().toISOString() }

  const datenbank = await db()
  if (!datenbank) { speicher.push({ id: naechsteId++, ...eintrag } as Paket); return }

  const tx = datenbank.transaction(STORE, 'readwrite')
  await alsPromise(tx.objectStore(STORE).add(eintrag))
  datenbank.close()
}

/** Alle wartenden Pakete einer Art, älteste zuerst. */
export async function abholen<T>(art: Art): Promise<Paket<T>[]> {
  const datenbank = await db()
  if (!datenbank) return speicher.filter(p => p.art === art) as Paket<T>[]

  const tx = datenbank.transaction(STORE, 'readonly')
  const alle = await alsPromise(tx.objectStore(STORE).index('art').getAll(art))
  datenbank.close()
  return (alle as Paket<T>[]).sort((a, b) => a.id - b.id)
}

/** Paket als erledigt abhaken. */
export async function quittieren(id: number): Promise<void> {
  const datenbank = await db()
  if (!datenbank) {
    const i = speicher.findIndex(p => p.id === id)
    if (i >= 0) speicher.splice(i, 1)
    return
  }
  const tx = datenbank.transaction(STORE, 'readwrite')
  await alsPromise(tx.objectStore(STORE).delete(id))
  datenbank.close()
}

export async function anzahl(art: Art): Promise<number> {
  return (await abholen(art)).length
}

/** Nur für Tests. */
export async function leeren(): Promise<void> {
  speicher.length = 0
  const datenbank = await db()
  if (!datenbank) return
  const tx = datenbank.transaction(STORE, 'readwrite')
  await alsPromise(tx.objectStore(STORE).clear())
  datenbank.close()
}
