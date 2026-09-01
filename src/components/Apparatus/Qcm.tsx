import { C } from './farben'
import { Frame, Box, Beam, Caption, Tag } from './parts'

/** Quarzmikrowaage: Massenbeladung senkt die Resonanzfrequenz (Sauerbrey). */
export default function Qcm() {
  return (
    <Frame>
      <Box x={54} y={12} w={92} h={24} color={C.detect} lines={['Oszillator → Δf']} />
      <Beam from={{ x: 74, y: 36 }} to={{ x: 74, y: 56 }} color={C.detect} arrow={false} />
      <Beam from={{ x: 126, y: 36 }} to={{ x: 126, y: 56 }} color={C.detect} arrow={false} />
      {/* Quarzscheibe im Schnitt, Goldelektroden beidseitig */}
      <ellipse cx={100} cy={82} rx={52} ry={16} fill="#1e3a5f" stroke={C.optics} strokeWidth={2} />
      <rect x={70} y={64} width={60} height={4} rx={2} fill={C.light} />
      <rect x={70} y={96} width={60} height={4} rx={2} fill={C.light} />
      <Tag x={150} y={60} text="Au" color={C.light} anchor="start" />
      <Tag x={100} y={86} text="Quarz" color={C.optics} />
      {/* Angelagerte Masse */}
      {[84, 96, 108, 120].map(x => <circle key={x} cx={x} cy={59} r={3} fill={C.accent} />)}
      <Tag x={100} y={48} text="angelagerte Masse" color={C.accent} size={6} />
      <Caption text="Δf ∝ Δm – massenempfindlich" />
    </Frame>
  )
}
