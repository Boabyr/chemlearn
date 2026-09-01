export const FARBE: Record<string, string> = {
  accent: 'var(--c-accent)',
  success: 'var(--c-success)',
  warning: 'var(--c-warning)',
  danger: 'var(--c-danger)',
  subtle: 'var(--c-subtle)',
}

/** Farbe einer Kurve ohne eigene Angabe. Auch die Legende greift darauf zu. */
export function kurvenFarbe(i: number): string {
  return [FARBE.accent, FARBE.warning, FARBE.success, FARBE.subtle][i % 4]
}
