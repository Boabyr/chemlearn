import { Frame, Box, Detector, Beam, Caption, Tag, C } from './parts'

/** ESCA/XPS: Röntgenanregung, aber gemessen wird die kinetische Energie der Photoelektronen. */
export default function Esca() {
  return (
    <Frame>
      {/* Vakuumkammer umschließt alles */}
      <rect x={8} y={12} width={184} height={122} rx={8} fill="none"
        stroke={C.muted} strokeWidth={1} strokeDasharray="4 3" opacity={0.7} />
      <Tag x={14} y={24} text="UHV" color={C.muted} anchor="start" size={6} />
      <Box x={16} y={44} w={36} h={26} color={C.warn} lines={['Al Kα']} />
      <Beam from={{ x: 52, y: 57 }} to={{ x: 78, y: 76 }} color={C.warn} />
      <Box x={68} y={80} w={52} h={20} color={C.sample} fill="#1e3a5f" lines={['Probe']} />
      {/* Photoelektronen */}
      <Beam from={{ x: 112, y: 78 }} to={{ x: 132, y: 58 }} color={C.accent} />
      <Tag x={128} y={50} text="e⁻" color={C.accent} size={9} />
      {/* Halbkugelanalysator */}
      <path d="M126 56 A 26 26 0 1 1 178 56" fill="none" stroke={C.optics} strokeWidth={2} />
      <path d="M136 56 A 16 16 0 1 1 168 56" fill="none" stroke={C.optics} strokeWidth={1.4} />
      <Tag x={152} y={26} text="Analysator" color={C.optics} size={6} />
      <Detector x={144} y={58} w={30} h={16} label="Det" />
      <Caption text="Misst kinetische Energie der Elektronen" />
    </Frame>
  )
}
