import { C } from './farben'
import { Frame, Cell, Electrode, Box, Beam, Caption } from './parts'

/** Zwei-Elektroden-Zelle: nur Mess- und Referenzelektrode, kein Potentiostat. */
export default function TwoElectrode() {
  return (
    <Frame>
      <Box x={68} y={12} w={64} h={24} color={C.detect} lines={['V']} rx={12} />
      <Beam from={{ x: 84, y: 36 }} to={{ x: 84, y: 52 }} color={C.detect} arrow={false} />
      <Beam from={{ x: 116, y: 36 }} to={{ x: 116, y: 52 }} color={C.detect} arrow={false} />
      <Cell x={54} y={62} w={92} h={58} />
      <Electrode x={84} top={52} bottom={104} label="ME" color={C.sample} />
      <Electrode x={116} top={52} bottom={104} label="RE" color={C.light} />
      <Caption text="Nur zwei Elektroden – Strom fließt über die RE" />
    </Frame>
  )
}
