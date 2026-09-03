import { C } from './farben'
import { Frame, Caption, Tag } from './parts'

/**
 * Ag/AgCl-Bezugselektrode: liefert ein festes Potential, misst nichts. Kein
 * Innenrohr, keine Glasmembran — nur Draht, gesättigtes KCl und Diaphragma.
 */
export default function ReferenceElectrode() {
  return (
    <Frame>
      <line x1={62} y1={6} x2={62} y2={14} stroke={C.detect} strokeWidth={2} />
      <rect x={44} y={14} width={36} height={10} rx={3} fill="none" stroke={C.muted} strokeWidth={1.6} />

      {/* Ein einziges Rohr, unten spitz zulaufend */}
      <path d="M44 24 L44 106 L62 128 L80 106 L80 24 Z"
        fill="#0f2b3d" stroke={C.muted} strokeWidth={1.8} />

      {/* Ag-Draht mit AgCl-Belag */}
      <line x1={62} y1={30} x2={62} y2={92} stroke={C.muted} strokeWidth={2} strokeLinecap="round" />
      <line x1={62} y1={62} x2={62} y2={92} stroke={C.warn} strokeWidth={3.4} strokeLinecap="round" />

      {/* Bodenkörper: die Sättigung hält die Cl⁻-Aktivität konstant */}
      <circle cx={52} cy={96} r={2.2} fill={C.light} opacity={0.8} />
      <circle cx={58} cy={100} r={1.8} fill={C.light} opacity={0.8} />
      <circle cx={68} cy={97} r={2} fill={C.light} opacity={0.8} />

      {/* Diaphragma an der Spitze */}
      <circle cx={62} cy={124} r={3.4} fill="none" stroke={C.accent} strokeWidth={1.8} />

      <line x1={62} y1={40} x2={98} y2={40} stroke={C.muted} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={42} text="Ag-Draht" color={C.muted} anchor="start" size={6} />
      <line x1={64} y1={72} x2={98} y2={72} stroke={C.warn} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={74} text="AgCl-Belag" color={C.warn} anchor="start" size={6} />
      <line x1={70} y1={98} x2={98} y2={98} stroke={C.light} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={100} text="KCl gesättigt (Bodenkörper)" color={C.light} anchor="start" size={6} />
      <line x1={66} y1={124} x2={98} y2={124} stroke={C.accent} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={126} text="Diaphragma" color={C.accent} anchor="start" size={6} />

      <Caption text="Festes Potential – Bezug, kein Sensor" />
    </Frame>
  )
}
