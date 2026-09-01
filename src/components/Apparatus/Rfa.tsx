import { C } from './farben'
import { Frame, Box, Detector, Beam, Caption, Tag } from './parts'

/** Röntgenfluoreszenz: Primärstrahl regt die Probe an, Analysatorkristall zerlegt die Sekundärstrahlung. */
export default function Rfa() {
  return (
    <Frame>
      <Box x={10} y={30} w={40} h={30} color={C.warn} lines={['Röntgen-', 'röhre']} />
      <Beam from={{ x: 50, y: 45 }} to={{ x: 78, y: 62 }} color={C.warn} />
      <Tag x={60} y={40} text="primär" color={C.warn} size={6} />
      <Box x={70} y={64} w={54} h={22} color={C.sample} fill="#1e3a5f" lines={['Probe']} />
      {/* Sekundäre Fluoreszenzstrahlung nach rechts oben */}
      <Beam from={{ x: 118, y: 64 }} to={{ x: 140, y: 46 }} color={C.emit} />
      <Tag x={104} y={56} text="sekundär" color={C.emit} anchor="start" size={6} />
      {/* Analysatorkristall */}
      <line x1={134} y1={44} x2={158} y2={30} stroke={C.optics} strokeWidth={3} />
      <Tag x={146} y={16} text="Analysator-" color={C.optics} size={6} />
      <Tag x={146} y={23} text="kristall" color={C.optics} size={6} />
      <Beam from={{ x: 150, y: 40 }} to={{ x: 156, y: 62 }} color={C.detect} />
      <Detector x={139} y={64} w={34} h={18} label="Det" />
      <Caption text="Probe strahlt selbst – Analysatorkristall" />
    </Frame>
  )
}
