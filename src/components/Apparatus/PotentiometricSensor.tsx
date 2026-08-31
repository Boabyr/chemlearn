import { Frame, Cell, Electrode, Box, Beam, Caption, Tag, C } from './parts'

/** Ionenselektive Elektrode: stromlose Spannungsmessung, Nernst-Verhalten. */
export default function PotentiometricSensor() {
  return (
    <Frame>
      <Box x={58} y={10} w={84} h={26} color={C.detect} lines={['V  hochohmig']} rx={12} />
      <Beam from={{ x: 80, y: 36 }} to={{ x: 80, y: 50 }} color={C.detect} arrow={false} />
      <Beam from={{ x: 122, y: 36 }} to={{ x: 122, y: 50 }} color={C.detect} arrow={false} />
      <Cell x={48} y={60} w={104} h={56} />
      {/* ISE mit selektiver Membran am Ende */}
      <line x1={80} y1={50} x2={80} y2={92} stroke={C.accent} strokeWidth={4} strokeLinecap="round" />
      <path d="M72 92 Q80 102 88 92 Z" fill="none" stroke={C.accent} strokeWidth={1.8} />
      <Tag x={80} y={46} text="ISE" color={C.accent} />
      <Tag x={62} y={110} text="Membran" color={C.accent} size={6} />
      <Electrode x={122} top={50} bottom={100} label="RE" color={C.light} />
      <Tag x={100} y={132} text="E = E₀ + (RT/zF)·ln a" color={C.muted} size={6} />
      <Caption text="Stromlose Spannungsmessung – Nernst" />
    </Frame>
  )
}
