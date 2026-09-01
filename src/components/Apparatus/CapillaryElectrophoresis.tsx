import { C } from './farben'
import { Frame, Detector, Caption, Tag, Cell } from './parts'

/** Kapillarelektrophorese: Hochspannung über eine dünne Kapillare zwischen zwei Puffergefäßen. */
export default function CapillaryElectrophoresis() {
  return (
    <Frame>
      <Cell x={14} y={72} w={30} h={34} label="Puffer" />
      <Cell x={156} y={72} w={30} h={34} label="Puffer" />

      {/* Kapillare als Bogen zwischen den Gefäßen */}
      <path d="M32 76 Q100 22 168 76" fill="none" stroke={C.accent} strokeWidth={2.4} />
      <Tag x={100} y={34} text="Kapillare, 50 µm" color={C.accent} size={6.5} />

      {/* Elektroden und Hochspannung */}
      <line x1={26} y1={70} x2={26} y2={96} stroke={C.warn} strokeWidth={3} strokeLinecap="round" />
      <line x1={174} y1={70} x2={174} y2={96} stroke={C.detect} strokeWidth={3} strokeLinecap="round" />
      <Tag x={26} y={64} text="+" color={C.warn} size={9} />
      <Tag x={174} y={64} text="−" color={C.detect} size={9} />
      <path d="M26 112 L100 128 L174 112" fill="none" stroke={C.muted} strokeWidth={1.4} />
      <Tag x={100} y={138} text="30 kV" color={C.muted} size={7} />

      {/* Detektionsfenster auf der Kapillare */}
      <circle cx={132} cy={46} r={6} fill="none" stroke={C.emit} strokeWidth={1.6} />
      <Detector x={140} y={24} w={30} h={18} label="UV" />
      <Caption text="Hochspannung statt Pumpe" />
    </Frame>
  )
}
