import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { fehler: Error | null }

/**
 * Fängt Renderfehler ab, damit ein Fehler in einem Thema nicht die ganze App
 * durch einen roten Stacktrace ersetzt (so lief es bis hierher über einen
 * Debug-Handler in index.html — im Produktionsbuild).
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { fehler: null }

  static getDerivedStateFromError(fehler: Error): State {
    return { fehler }
  }

  componentDidCatch(fehler: Error, info: ErrorInfo) {
    console.error('Renderfehler:', fehler, info.componentStack)
  }

  render() {
    if (!this.state.fehler) return this.props.children

    return (
      <div className="flex min-h-screen items-center justify-center bg-surface p-6">
        <div className="w-full max-w-md rounded-2xl border border-line bg-raised p-6 text-center">
          <p className="mb-2 text-4xl">🧪</p>
          <h1 className="mb-2 text-lg font-semibold text-ink">Da ist etwas übergekocht</h1>
          <p className="mb-6 text-sm text-muted">
            Die Seite konnte nicht dargestellt werden. Dein Fortschritt ist gespeichert.
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={() => this.setState({ fehler: null })}
              className="rounded-lg border border-line px-4 py-2 text-sm text-ink hover:bg-sunken">
              Nochmal versuchen
            </button>
            <a href="/" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent">
              Zur Übersicht
            </a>
          </div>
          {import.meta.env.DEV && (
            <pre className="mt-6 overflow-x-auto rounded-lg bg-sunken p-3 text-left font-mono text-xs text-danger">
              {this.state.fehler.message}
            </pre>
          )}
        </div>
      </div>
    )
  }
}
