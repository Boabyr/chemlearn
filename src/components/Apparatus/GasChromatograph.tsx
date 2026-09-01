import { C } from './farben'
import { Frame, Box, Detector, Beam, Caption, Tag } from './parts'

/** GC: Trägergas, Injektor, aufgewickelte Kapillare im geheizten Ofen. */
export default function GasChromatograph() {
  return (
    <Frame>
      <Box x={8} y={62} w={26} h={26} lines={['He']} color={C.optics} />
      <Beam from={{ x: 34, y: 75 }} to={{ x: 46, y: 75 }} />

      <Box x={46} y={58} w={22} h={34} lines={['Inj']} color={C.muted} />
      <Tag x={57} y={104} text="Split" color={C.muted} size={6.5} />

      {/* Ofen mit aufgewickelter Kapillarsäule */}
      <rect x={74} y={38} width={62} height={74} rx={6} fill="none" stroke={C.warn} strokeWidth={1.8} strokeDasharray="4 3" />
      <Tag x={105} y={33} text="Ofen" color={C.warn} size={7} />
      {[0, 1, 2].map(i => (
        <ellipse key={i} cx={105} cy={75} rx={24 - i * 6} ry={30 - i * 8}
          fill="none" stroke={C.accent} strokeWidth={1.6} />
      ))}
      <Tag x={105} y={120} text="Kapillare, 30 m" color={C.muted} size={6.5} />

      <Beam from={{ x: 136, y: 75 }} to={{ x: 150, y: 75 }} color={C.detect} />
      <Detector x={150} y={64} w={30} h={22} label="FID" />
      <Caption text="Aufgewickelte Kapillare im Ofen" />
    </Frame>
  )
}
