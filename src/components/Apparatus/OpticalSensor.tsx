import { C } from './farben'
import { Frame, Lamp, Detector, Beam, Caption, Tag } from './parts'

/** Optischer Fasersensor: Indikatorschicht am Faserende, Signal läuft durch dieselbe Faser zurück. */
export default function OpticalSensor() {
  return (
    <Frame>
      <Lamp x={18} y={40} label="LED" r={12} />
      <Beam from={{ x: 30, y: 40 }} to={{ x: 54, y: 52 }} color={C.light} />
      {/* Y-Koppler */}
      <circle cx={64} cy={62} r={9} fill="none" stroke={C.optics} strokeWidth={1.8} />
      <Tag x={64} y={44} text="Y-Koppler" color={C.optics} size={6} />
      <Beam from={{ x: 58, y: 70 }} to={{ x: 32, y: 84 }} color={C.emit} />
      <Detector x={4} y={84} w={30} h={18} label="Det" />
      {/* Lichtwellenleiter als Doppellinie */}
      <path d="M73 62 L150 62" stroke={C.sample} strokeWidth={1.4} fill="none" />
      <path d="M73 70 L150 70" stroke={C.sample} strokeWidth={1.4} fill="none" />
      <Tag x={112} y={82} text="Lichtwellenleiter" color={C.sample} size={6} />
      {/* Indikatorschicht am distalen Ende */}
      <rect x={150} y={58} width={12} height={16} rx={2} fill={C.accent} opacity={0.85} />
      <Tag x={156} y={44} text="Indikator-" color={C.accent} size={6} />
      <Tag x={156} y={51} text="schicht" color={C.accent} size={6} />
      <Tag x={156} y={94} text="Probe" color={C.muted} size={6} />
      <Caption text="Messung am Faserende, Signal läuft zurück" />
    </Frame>
  )
}
