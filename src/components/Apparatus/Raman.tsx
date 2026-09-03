import { C } from './farben'
import { Frame, Cuvette, Detector, Monochromator, Beam, Caption, Tag } from './parts'

/**
 * Raman-Spektrometer: monochromatischer Laser, Streulicht im rechten Winkel,
 * Notch-Filter gegen die Rayleigh-Linie. Kein Interferometer, keine Transmission.
 */
export default function Raman() {
  return (
    <Frame>
      {/* Laser statt Breitbandlampe */}
      <rect x={12} y={96} width={30} height={18} rx={3} fill="none" stroke={C.warn} strokeWidth={1.8} />
      <Tag x={27} y={108} text="Laser" color={C.warn} />
      <Tag x={27} y={92} text="monochromatisch" color={C.warn} size={5.5} />

      <Beam from={{ x: 42, y: 105 }} to={{ x: 66, y: 105 }} color={C.warn} />
      <Cuvette x={66} y={90} w={30} h={30} label="Probe" />

      {/* Streulicht im rechten Winkel zur Anregung */}
      <Beam from={{ x: 81, y: 88 }} to={{ x: 81, y: 66 }} color={C.emit} />
      <Tag x={96} y={78} text="Streulicht 90°" color={C.emit} anchor="start" size={6} />

      {/* Notch-Filter hält die Rayleigh-Linie zurück */}
      <rect x={61} y={50} width={40} height={16} rx={3} fill="none" stroke={C.accent} strokeWidth={2} />
      <Tag x={81} y={61} text="Notch-Filter" color={C.accent} size={6} />
      <Tag x={104} y={58} text="Rayleigh raus" color={C.accent} anchor="start" size={5.5} />

      <Beam from={{ x: 81, y: 50 }} to={{ x: 81, y: 40 }} color={C.emit} />
      <Monochromator x={65} y={12} w={32} h={26} label="Gitter" />
      <Beam from={{ x: 97, y: 25 }} to={{ x: 118, y: 25 }} color={C.detect} />
      <Detector x={118} y={14} w={34} h={22} label="CCD" />

      <Caption text="Laser + Notch-Filter – gestreutes Licht" />
    </Frame>
  )
}
