import { Frame, Cell, Electrode, Box, Beam, Caption, Tag, C } from './parts'

/** Coulometrische Zelle: vollständiger Umsatz, gemessen wird die geflossene Ladung. */
export default function Coulometry() {
  return (
    <Frame>
      <Box x={56} y={10} w={88} h={26} color={C.detect} lines={['Q = ∫ i dt']} />
      <Beam from={{ x: 78, y: 36 }} to={{ x: 78, y: 52 }} color={C.detect} arrow={false} />
      <Beam from={{ x: 122, y: 36 }} to={{ x: 122, y: 52 }} color={C.detect} arrow={false} />
      <Cell x={48} y={62} w={104} h={56} />
      <Electrode x={78} top={52} bottom={104} label="Arb" color={C.sample} />
      <Electrode x={122} top={52} bottom={104} label="Gegen" color={C.warn} />
      {/* Rührfisch: Zeichen für erschöpfende Elektrolyse */}
      <ellipse cx={100} cy={112} rx={11} ry={3.5} fill={C.muted} opacity={0.85} />
      <Tag x={100} y={130} text="100 % Umsatz" color={C.accent} />
      <Caption text="Ladungsmessung statt Strommessung" />
    </Frame>
  )
}
