import { C } from './farben'
import { Frame, Cell, Electrode, Box, Beam, Caption } from './parts'

/** Drei-Elektroden-Zelle: Potentiostat trennt Potentialmessung (RE) vom Stromfluss (CE). */
export default function ThreeElectrode() {
  return (
    <Frame>
      <Box x={52} y={10} w={96} h={26} color={C.accent} lines={['Potentiostat']} />
      <Beam from={{ x: 72, y: 36 }} to={{ x: 72, y: 50 }} color={C.accent} arrow={false} />
      <Beam from={{ x: 100, y: 36 }} to={{ x: 100, y: 50 }} color={C.accent} arrow={false} />
      <Beam from={{ x: 128, y: 36 }} to={{ x: 128, y: 50 }} color={C.accent} arrow={false} />
      <Cell x={44} y={60} w={112} h={58} />
      <Electrode x={72} top={50} bottom={102} label="WE" color={C.sample} />
      <Electrode x={100} top={50} bottom={102} label="RE" color={C.light} />
      <Electrode x={128} top={50} bottom={102} label="CE" color={C.warn} />
      <Caption text="WE + RE + CE – RE bleibt stromlos" />
    </Frame>
  )
}
