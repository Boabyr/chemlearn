import { Frame, Box, Detector, Beam, Caption, Tag, C } from './parts'

/** Röntgendiffraktometer: θ-2θ-Geometrie, Detektor fährt auf dem Messkreis. */
export default function Xrd() {
  return (
    <Frame>
      {/* Messkreis */}
      <path d="M28 96 A 72 72 0 0 1 172 96" fill="none" stroke={C.muted}
        strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
      <Box x={6} y={44} w={38} h={26} color={C.warn} lines={['Röntgen']} />
      <Beam from={{ x: 44, y: 62 }} to={{ x: 86, y: 92 }} color={C.warn} />
      {/* Flache Probe in der Kreismitte */}
      <line x1={74} y1={96} x2={126} y2={96} stroke={C.sample} strokeWidth={3.5} />
      <Tag x={100} y={108} text="Probe (flach)" color={C.sample} />
      {/* Gebeugter Strahl */}
      <Beam from={{ x: 114, y: 92 }} to={{ x: 152, y: 60 }} color={C.emit} />
      <Detector x={148} y={40} w={32} h={18} label="Det" />
      {/* Winkel */}
      <path d="M86 96 A 14 14 0 0 1 92 84" fill="none" stroke={C.accent} strokeWidth={1} />
      <Tag x={78} y={86} text="θ" color={C.accent} />
      <path d="M114 96 A 18 18 0 0 0 121 82" fill="none" stroke={C.accent} strokeWidth={1} />
      <Tag x={126} y={84} text="2θ" color={C.accent} />
      <Caption text="θ-2θ-Geometrie – Beugung am Kristallgitter" />
    </Frame>
  )
}
