import { Frame, Box, Detector, Beam, Caption, Tag, C } from './parts'

/** Chemolumineszenz-Detektor: einfachster Aufbau, keine externe Lichtquelle. */
export default function Chemoluminescence() {
  return (
    <Frame>
      <Box x={42} y={48} w={62} h={54} color={C.accent} fill="#0d2e2a"
        lines={['Probe +', 'Reagenz']} />
      <Tag x={73} y={94} text="A + B → C*" color={C.light} size={7} />
      <Beam from={{ x: 104, y: 75 }} to={{ x: 126, y: 75 }} color={C.light} />
      <Tag x={115} y={68} text="hν" color={C.light} />
      <Detector x={126} y={64} label="Det" />
      {/* Der fehlende Teil wird ausdrücklich benannt */}
      <Box x={42} y={16} w={84} h={20} color={C.muted} lines={['keine Lichtquelle']} rx={10} />
      <Caption text="Nur Probe und Detektor" />
    </Frame>
  )
}
