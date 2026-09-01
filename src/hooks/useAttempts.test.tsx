import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

const abfragen = vi.fn()

/** Kettenbare Attrappe: select/eq/order/limit geben sich selbst zurück. */
function bauerAttrappe(tabelle: string) {
  const kette: Record<string, unknown> = {}
  for (const name of ['select', 'eq', 'order', 'limit']) {
    kette[name] = () => kette
  }
  kette.insert = () => Promise.resolve({ error: null })
  kette.upsert = () => Promise.resolve({ error: null })
  kette.then = (aufloesen: (wert: unknown) => void) => {
    abfragen(tabelle)
    return Promise.resolve({ data: [], error: null }).then(aufloesen)
  }
  return kette
}

vi.mock('../lib/supabase', () => ({
  supabase: { from: (tabelle: string) => bauerAttrappe(tabelle) },
}))

vi.mock('./useAuth', () => ({
  useAuth: () => ({ user: { id: 'nutzer-1' }, loading: false }),
}))

const { useAttempts } = await import('./useAttempts')

function Anzeige({ kurs }: { kurs: string }) {
  const { attempts, loading } = useAttempts(kurs)
  return <span>{loading ? 'laedt' : `${kurs}:${attempts.length}`}</span>
}

function Huelle({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

describe('useAttempts im Cache', () => {
  beforeEach(() => { abfragen.mockClear() })

  it('holt die Historie einmal, auch wenn drei Stellen sie brauchen', async () => {
    render(
      <Huelle>
        <Anzeige kurs="ac1" />
        <Anzeige kurs="ac1" />
        <Anzeige kurs="ac1" />
      </Huelle>,
    )

    await waitFor(() => expect(screen.getAllByText('ac1:0')).toHaveLength(3))
    expect(abfragen.mock.calls.filter(([t]) => t === 'attempts')).toHaveLength(1)
  })

  it('trennt Kurse voneinander', async () => {
    render(
      <Huelle>
        <Anzeige kurs="ac1" />
        <Anzeige kurs="oc" />
      </Huelle>,
    )

    await waitFor(() => {
      expect(screen.getByText('ac1:0')).toBeTruthy()
      expect(screen.getByText('oc:0')).toBeTruthy()
    })
    expect(abfragen.mock.calls.filter(([t]) => t === 'attempts')).toHaveLength(2)
  })
})
