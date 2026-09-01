// Farben der Apparatur-Zeichnungen. Eigene Datei, damit parts.tsx nur
// Komponenten ausgibt und Fast Refresh nicht ausfällt.
export const C = {
  light: '#fbbf24',   // Lichtquellen, Strahlung
  optics: '#60a5fa',  // Monochromator, Spiegel, Kristall
  beam: '#818cf8',    // Strahlengang nach der Optik
  emit: '#a855f7',    // Emittiertes Licht
  sample: '#e2e8f0',  // Probe, Küvette
  detect: '#4ade80',  // Detektoren
  accent: '#2dd4bf',  // Hervorhebung des Schlüsselmerkmals
  warn: '#f87171',    // Elektroden, Hitze, Anode
  muted: '#94a3b8',   // Beschriftung, Hilfslinien
} as const
