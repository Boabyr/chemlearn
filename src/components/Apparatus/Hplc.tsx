import { C } from './farben'
import { Frame, Box, Detector, Beam, Caption, Tag } from './parts'

/** HPLC: Pumpe presst das Laufmittel durch eine kurze gepackte Säule. */
export default function Hplc() {
  return (
    <Frame>
      {/* Vorratsflaschen */}
      <path d="M10 46 L10 74 Q10 79 15 79 L27 79 Q32 79 32 74 L32 46 Z"
        fill="#0f2b3d" stroke={C.muted} strokeWidth={1.5} />
      <Tag x={21} y={40} text="A / B" color={C.muted} size={6.5} />
      <Beam from={{ x: 32, y: 66 }} to={{ x: 44, y: 66 }} />

      <Box x={44} y={54} w={26} h={26} lines={['Pumpe', '400 bar']} color={C.warn} />
      <Beam from={{ x: 70, y: 66 }} to={{ x: 82, y: 66 }} />
      <Box x={82} y={56} w={20} h={22} lines={['Inj']} color={C.muted} />

      {/* Gepackte Säule: kurz, dick, mit Körnung */}
      <rect x={106} y={56} width={44} height={22} rx={4} fill="none" stroke={C.accent} strokeWidth={2} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <circle key={i} cx={112 + i * 7} cy={62 + (i % 2) * 8} r={2.4} fill={C.accent} opacity={0.6} />
      ))}
      <Tag x={128} y={92} text="C18, 15 cm" color={C.muted} size={6.5} />

      <Beam from={{ x: 150, y: 66 }} to={{ x: 162, y: 66 }} color={C.detect} />
      <Detector x={162} y={55} w={30} h={22} label="DAD" />
      <Caption text="Pumpe und kurze gepackte Säule" />
    </Frame>
  )
}
