import { C } from './farben'
import { Frame, Lamp, Monochromator, Detector, Beam, Caption, Tag } from './parts'

/** Graphitrohr-AAS: der Strahl läuft durch ein elektrisch geheiztes Rohr. */
export default function GraphiteFurnace() {
  return (
    <Frame>
      <Lamp x={18} y={70} label="HKL" r={12} />
      <Beam from={{ x: 31, y: 70 }} to={{ x: 60, y: 70 }} color={C.light} />

      {/* Graphitrohr, längs im Strahlengang, mit Stromkontakten */}
      <rect x={60} y={58} width={62} height={24} rx={12} fill="none" stroke={C.warn} strokeWidth={2.2} />
      <ellipse cx={60} cy={70} rx={4} ry={12} fill="none" stroke={C.warn} strokeWidth={1.6} />
      <ellipse cx={122} cy={70} rx={4} ry={12} fill="none" stroke={C.warn} strokeWidth={1.6} />
      <rect x={56} y={44} width={12} height={10} rx={2} fill={C.warn} opacity={0.5} />
      <rect x={114} y={44} width={12} height={10} rx={2} fill={C.warn} opacity={0.5} />
      <Tag x={91} y={40} text="2700 °C" color={C.warn} size={7} />
      <Tag x={91} y={98} text="Probe im Rohr" color={C.muted} size={6.5} />
      <line x1={91} y1={82} x2={91} y2={90} stroke={C.muted} strokeWidth={1.2} />

      <Beam from={{ x: 122, y: 70 }} to={{ x: 138, y: 70 }} color={C.light} />
      <Monochromator x={138} y={52} w={22} h={36} label="λ" />
      <Beam from={{ x: 160, y: 70 }} to={{ x: 170, y: 70 }} color={C.detect} />
      <Detector x={170} y={59} w={22} h={22} label="Det" />
      <Caption text="Alle Atome auf einmal im Strahlengang" />
    </Frame>
  )
}
