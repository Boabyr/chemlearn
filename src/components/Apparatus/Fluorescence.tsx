import { C } from './farben'
import { Frame, Lamp, Monochromator, Cuvette, Detector, Beam, Caption, Tag } from './parts'

/** Fluoreszenzspektrometer: Emissionsarm steht 90° zum Anregungsarm. */
export default function Fluorescence() {
  return (
    <Frame>
      <Lamp x={18} y={58} label="Xe" />
      <Beam from={{ x: 30, y: 58 }} to={{ x: 42, y: 58 }} color={C.light} />
      <Monochromator x={42} y={38} w={28} h={40} label="λex" />
      <Beam from={{ x: 70, y: 58 }} to={{ x: 84, y: 58 }} />
      <Cuvette x={84} y={43} label="Probe" />
      {/* Emission senkrecht nach unten */}
      <Beam from={{ x: 99, y: 73 }} to={{ x: 99, y: 88 }} color={C.emit} />
      <Monochromator x={83} y={88} w={32} h={30} label="λem" />
      <Beam from={{ x: 99, y: 118 }} to={{ x: 99, y: 128 }} color={C.detect} />
      <Detector x={82} y={128} w={34} h={16} label="Det" />
      {/* Winkelmarkierung */}
      <path d="M114 58 L128 58 M114 58 L114 74" fill="none" stroke={C.accent}
        strokeWidth={1} strokeDasharray="2 2" />
      <Tag x={131} y={61} text="90°" color={C.accent} anchor="start" />
      <Caption text="Detektor im 90°-Winkel – misst Emission" />
    </Frame>
  )
}
