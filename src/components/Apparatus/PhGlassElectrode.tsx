import { C } from './farben'
import { Frame, Caption, Tag } from './parts'

/**
 * pH-Einstabmesskette im Schnitt: Messkette und Bezugssystem stecken in einem
 * Schaft. Erkennbar an der Glasmembran unten und am Diaphragma seitlich.
 */
export default function PhGlassElectrode() {
  return (
    <Frame>
      {/* Kabel und Kopf */}
      <line x1={62} y1={6} x2={62} y2={14} stroke={C.detect} strokeWidth={2} />
      <rect x={44} y={14} width={36} height={10} rx={3} fill="none" stroke={C.muted} strokeWidth={1.6} />

      {/* Außenrohr: Bezugssystem mit Brückenelektrolyt */}
      <path d="M44 24 L44 112 Q44 122 52 126 L72 126 Q80 122 80 112 L80 24 Z"
        fill="#0f2b3d" stroke={C.muted} strokeWidth={1.8} />
      {/* KCl-Bodenkörper */}
      <circle cx={50} cy={104} r={2} fill={C.muted} opacity={0.7} />
      <circle cx={55} cy={108} r={1.6} fill={C.muted} opacity={0.7} />
      <circle cx={74} cy={106} r={1.8} fill={C.muted} opacity={0.7} />

      {/* Innenrohr: Innenpuffer, konstanter pH */}
      <rect x={54} y={30} width={16} height={78} rx={3} fill="#12324a" stroke={C.optics} strokeWidth={1.5} />

      {/* Innere Ag/AgCl-Ableitung */}
      <line x1={62} y1={34} x2={62} y2={98} stroke={C.warn} strokeWidth={2.4} strokeLinecap="round" />
      {/* Ableitung des Bezugsteils */}
      <line x1={48} y1={34} x2={48} y2={96} stroke={C.light} strokeWidth={2} strokeLinecap="round" />

      {/* Glasmembran: die Halbkugel, an der das Potential entsteht */}
      <path d="M54 108 Q62 136 70 108" fill="none" stroke={C.accent} strokeWidth={2.6} />
      <path d="M54 108 L70 108" stroke={C.accent} strokeWidth={1.2} opacity={0.6} />

      {/* Diaphragma: der Kontakt des Bezugsteils zur Messlösung */}
      <circle cx={80} cy={100} r={3.4} fill="none" stroke={C.light} strokeWidth={1.8} />

      {/* Beschriftung rechts, mit kurzen Führungslinien */}
      <line x1={62} y1={40} x2={98} y2={40} stroke={C.warn} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={42} text="Ag/AgCl-Ableitung" color={C.warn} anchor="start" size={6} />
      <line x1={62} y1={60} x2={98} y2={60} stroke={C.optics} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={62} text="Innenpuffer, pH konstant" color={C.optics} anchor="start" size={6} />
      <line x1={48} y1={80} x2={98} y2={80} stroke={C.light} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={82} text="KCl-Brückenelektrolyt" color={C.light} anchor="start" size={6} />
      <line x1={84} y1={100} x2={98} y2={100} stroke={C.light} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={102} text="Diaphragma" color={C.light} anchor="start" size={6} />
      <line x1={70} y1={126} x2={98} y2={126} stroke={C.accent} strokeWidth={0.7} opacity={0.6} />
      <Tag x={100} y={128} text="Glasmembran" color={C.accent} anchor="start" size={6} />

      <Caption text="Messkette und Bezug in einem Schaft" />
    </Frame>
  )
}
