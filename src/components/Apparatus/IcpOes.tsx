import { C } from './farben'
import { Frame, Monochromator, Detector, Beam, Caption, Tag } from './parts'

/** ICP-OES: Argonplasma in der Induktionsspule, Emission zur Seite ausgelesen. */
export default function IcpOes() {
  return (
    <Frame>
      {/* Torch: drei konzentrische Rohre */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={38 + i * 5} y={54 + i * 5} width={44 - i * 10} height={56 - i * 10}
          rx={4} fill="none" stroke={C.muted} strokeWidth={1.3} />
      ))}
      <Tag x={60} y={124} text="Torch (Ar)" color={C.muted} size={6.5} />

      {/* Induktionsspule */}
      {[0, 1, 2].map(i => (
        <ellipse key={i} cx={60} cy={62 + i * 9} rx={26} ry={5}
          fill="none" stroke={C.warn} strokeWidth={1.6} />
      ))}
      <Tag x={16} y={50} text="RF" color={C.warn} anchor="start" size={7} />

      {/* Plasma */}
      <path d="M52 54 Q60 26 68 54 Q60 44 52 54 Z" fill={C.emit} opacity={0.5} stroke={C.emit} strokeWidth={1.4} />
      <Tag x={60} y={22} text="8000 °C" color={C.emit} size={7} />

      <Beam from={{ x: 76, y: 44 }} to={{ x: 104, y: 44 }} color={C.emit} />
      <Monochromator x={104} y={26} w={24} h={38} label="Poly" />
      <Beam from={{ x: 128, y: 44 }} to={{ x: 142, y: 44 }} color={C.detect} />
      <Detector x={142} y={33} w={30} h={22} label="CCD" />
      <Caption text="Plasma strahlt selbst – kein Lampenwechsel" />
    </Frame>
  )
}
