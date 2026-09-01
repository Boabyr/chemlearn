import { C } from './farben'
import { Frame, Lamp, Cuvette, Detector, Beam, Caption, Tag } from './parts'

/** FT-IR: Michelson-Interferometer mit beweglichem Spiegel statt Monochromator. */
export default function Ftir() {
  return (
    <Frame>
      <Lamp x={16} y={62} label="IR" r={10} />
      <Beam from={{ x: 26, y: 62 }} to={{ x: 52, y: 62 }} color={C.light} />
      {/* Strahlteiler unter 45° */}
      <line x1={46} y1={76} x2={66} y2={48} stroke={C.optics} strokeWidth={2.2} />
      <Tag x={56} y={44} text="Strahlteiler" color={C.optics} size={6} />
      {/* Fester Spiegel oben */}
      <line x1={44} y1={16} x2={68} y2={16} stroke={C.muted} strokeWidth={3} />
      <Tag x={56} y={12} text="fester Spiegel" color={C.muted} size={6} />
      <Beam from={{ x: 56, y: 56 }} to={{ x: 56, y: 22 }} color={C.beam} arrow={false} />
      {/* Beweglicher Spiegel rechts */}
      <line x1={92} y1={50} x2={92} y2={74} stroke={C.accent} strokeWidth={3} />
      <Beam from={{ x: 62, y: 62 }} to={{ x: 88, y: 62 }} color={C.beam} arrow={false} />
      <Beam from={{ x: 98, y: 62 }} to={{ x: 112, y: 62 }} color={C.accent} />
      <Tag x={112} y={58} text="beweglich" color={C.accent} anchor="start" size={6} />
      {/* Probe und Detektor unterhalb */}
      <Beam from={{ x: 56, y: 68 }} to={{ x: 56, y: 92 }} color={C.beam} />
      <Cuvette x={41} y={92} w={30} h={24} label="Probe" />
      <Beam from={{ x: 56, y: 116 }} to={{ x: 56, y: 126 }} color={C.detect} />
      <Detector x={39} y={126} w={34} h={16} label="Det" />
      <Caption text="Michelson-Interferometer statt Gitter" />
    </Frame>
  )
}
