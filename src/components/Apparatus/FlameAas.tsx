import { C } from './farben'
import { Frame, Lamp, Monochromator, Detector, Beam, Caption, Tag, Box } from './parts'

/** Flammen-AAS: Hohlkathodenlampe strahlt quer durch die Flamme. */
export default function FlameAas() {
  return (
    <Frame>
      <Lamp x={20} y={62} label="HKL" r={13} />
      <Beam from={{ x: 34, y: 62 }} to={{ x: 62, y: 62 }} color={C.light} />

      {/* Brenner mit langer Schlitzflamme im Strahlengang */}
      <path d="M62 52 Q78 40 94 52 Q110 40 126 52 Q110 74 94 62 Q78 74 62 52 Z"
        fill={C.warn} opacity={0.28} stroke={C.warn} strokeWidth={1.4} />
      <rect x={70} y={72} width={48} height={12} rx={2} fill="none" stroke={C.muted} strokeWidth={1.6} />
      <Tag x={94} y={81} text="Brenner" color={C.muted} size={6.5} />
      <line x1={94} y1={84} x2={94} y2={104} stroke={C.muted} strokeWidth={1.4} />
      <Tag x={94} y={114} text="Zerstäuber" color={C.muted} size={6.5} />

      <Beam from={{ x: 126, y: 62 }} to={{ x: 140, y: 62 }} color={C.light} />
      <Monochromator x={140} y={44} w={22} h={36} label="λ" />
      <Beam from={{ x: 162, y: 62 }} to={{ x: 172, y: 62 }} color={C.detect} />
      <Detector x={172} y={51} w={22} h={22} label="Det" />
      <Box x={8} y={118} w={0} h={0} />
      <Caption text="Lampe strahlt quer durch die Flamme" />
    </Frame>
  )
}
