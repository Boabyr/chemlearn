import type { ReactNode } from 'react'

// Geteilte SVG-Bausteine für alle Apparatur-Zeichnungen.
// Einheitliche Bühne: 200 × 160 Einheiten, Farben aus der Slate/Teal-Palette der App.

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

/** SVG-Bühne mit einheitlichem Seitenverhältnis und Pfeilspitzen-Definitionen. */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 160" width="100%" height="100%" role="img">
      <defs>
        {Object.entries(C).map(([name, color]) => (
          <marker key={name} id={`arw-${name}`} markerWidth="5" markerHeight="5"
            refX="4.5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5" fill={color} />
          </marker>
        ))}
      </defs>
      {children}
    </svg>
  )
}

type XY = { x: number; y: number }

/** Lichtquelle: Kreis mit Kürzel. */
export function Lamp({ x, y, label = 'L', color = C.light, r = 11 }:
  XY & { label?: string; color?: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={2} />
      <text x={x} y={y + 3} textAnchor="middle" fontSize={8} fill={color}>{label}</text>
    </g>
  )
}

/** Allgemeines Gerätemodul mit Rahmen und ein bis zwei Textzeilen. */
export function Box({ x, y, w, h, color = C.muted, lines = [], rx = 4, fill = 'none' }:
  XY & { w: number; h: number; color?: string; lines?: string[]; rx?: number; fill?: string }) {
  const start = y + h / 2 - (lines.length - 1) * 4.5 + 3
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={color} strokeWidth={1.8} />
      {lines.map((t, i) => (
        <text key={i} x={x + w / 2} y={start + i * 9} textAnchor="middle" fontSize={7} fill={color}>{t}</text>
      ))}
    </g>
  )
}

/** Monochromator / Gitter: Kasten mit schrägen Gitterlinien. */
export function Monochromator({ x, y, w = 32, h = 44, label = 'λ' }:
  XY & { w?: number; h?: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke={C.optics} strokeWidth={1.8} />
      {[0, 1, 2].map(i => (
        <line key={i} x1={x + 5 + i * 6} y1={y + 5} x2={x + 13 + i * 6} y2={y + h - 5}
          stroke={C.optics} strokeWidth={1.2} opacity={0.8} />
      ))}
      <text x={x + w / 2} y={y - 4} textAnchor="middle" fontSize={7} fill={C.optics}>{label}</text>
    </g>
  )
}

/** Küvette / Probenraum. */
export function Cuvette({ x, y, w = 30, h = 30, label = 'Probe', color = C.sample }:
  XY & { w?: number; h?: number; label?: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill="#1e3a5f" stroke={color} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={7} fill={color}>{label}</text>
    </g>
  )
}

/** Detektor. */
export function Detector({ x, y, w = 34, h = 22, label = 'Det' }:
  XY & { w?: number; h?: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill="none" stroke={C.detect} strokeWidth={1.8} />
      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={7} fill={C.detect}>{label}</text>
    </g>
  )
}

/** Strahlengang. `arrow` setzt eine Pfeilspitze, `dashed` zeichnet gestrichelt. */
export function Beam({ from, to, color = C.beam, arrow = true, dashed = false, width = 1.6 }: {
  from: XY; to: XY; color?: string; arrow?: boolean; dashed?: boolean; width?: number
}) {
  const key = (Object.keys(C) as (keyof typeof C)[]).find(k => C[k] === color) ?? 'beam'
  return (
    <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
      stroke={color} strokeWidth={width}
      strokeDasharray={dashed ? '3 3' : undefined}
      markerEnd={arrow ? `url(#arw-${key})` : undefined} />
  )
}

/** Elektrode: Stab mit Kopfbeschriftung, steckt von oben in eine Zelle. */
export function Electrode({ x, top, bottom, label, color = C.muted }: {
  x: number; top: number; bottom: number; label: string; color?: string
}) {
  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={bottom} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <text x={x} y={top - 4} textAnchor="middle" fontSize={7} fill={color}>{label}</text>
    </g>
  )
}

/** Becherglas mit Elektrolyt. */
export function Cell({ x, y, w, h, label }: XY & { w: number; h: number; label?: string }) {
  return (
    <g>
      <path d={`M${x} ${y} L${x} ${y + h} Q${x} ${y + h + 5} ${x + 6} ${y + h + 5}
        L${x + w - 6} ${y + h + 5} Q${x + w} ${y + h + 5} ${x + w} ${y + h} L${x + w} ${y}`}
        fill="#0f2b3d" stroke={C.muted} strokeWidth={1.6} />
      <line x1={x + 2} y1={y + 8} x2={x + w - 2} y2={y + 8} stroke={C.accent} strokeWidth={1} opacity={0.6} />
      {label && (
        <text x={x + w / 2} y={y + h - 4} textAnchor="middle" fontSize={7} fill={C.muted}>{label}</text>
      )}
    </g>
  )
}

/** Bildunterschrift: benennt das Merkmal, an dem man die Apparatur erkennt. */
export function Caption({ text }: { text: string }) {
  return <text x={100} y={152} textAnchor="middle" fontSize={7.5} fill={C.accent}>{text}</text>
}

/** Freistehende Beschriftung. */
export function Tag({ x, y, text, color = C.muted, anchor = 'middle', size = 7 }:
  XY & { text: string; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color}>{text}</text>
}
