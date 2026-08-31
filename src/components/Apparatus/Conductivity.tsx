import { Frame, Cell, Box, Beam, Caption, Tag, C } from './parts'

/** Leitfähigkeitsmesszelle: zwei planparallele Pt-Bleche, Wechselspannung gegen Polarisation. */
export default function Conductivity() {
  return (
    <Frame>
      <Box x={64} y={10} w={72} h={26} color={C.light} lines={['~ AC']} rx={12} />
      <Beam from={{ x: 82, y: 36 }} to={{ x: 82, y: 54 }} color={C.light} arrow={false} />
      <Beam from={{ x: 118, y: 36 }} to={{ x: 118, y: 54 }} color={C.light} arrow={false} />
      <Cell x={52} y={62} w={96} h={56} />
      {/* Planparallele Platten statt Stäbe */}
      <rect x={76} y={54} width={6} height={50} fill={C.sample} rx={1} />
      <rect x={114} y={54} width={6} height={50} fill={C.sample} rx={1} />
      <Tag x={79} y={50} text="Pt" color={C.sample} />
      <Tag x={117} y={50} text="Pt" color={C.sample} />
      {/* Feldlinien zwischen den Platten */}
      {[70, 82, 94].map(y => (
        <line key={y} x1={84} y1={y} x2={112} y2={y} stroke={C.accent}
          strokeWidth={0.9} strokeDasharray="2 3" opacity={0.7} />
      ))}
      <Tag x={98} y={130} text="Zellkonstante K = l/A" color={C.muted} size={6} />
      <Caption text="Zwei Pt-Platten, Wechselstrom" />
    </Frame>
  )
}
