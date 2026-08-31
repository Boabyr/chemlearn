import { Frame, Cell, Box, Beam, Caption, Tag, C } from './parts'

/** Amperometrischer Glucosesensor 1. Generation: GOD-Membran auf Pt, gemessen wird H₂O₂. */
export default function GlucoseSensor() {
  return (
    <Frame>
      <Box x={62} y={10} w={76} h={24} color={C.detect} lines={['A  (Strom)']} rx={12} />
      <Beam from={{ x: 100, y: 34 }} to={{ x: 100, y: 48 }} color={C.detect} arrow={false} />
      <Cell x={48} y={58} w={104} h={58} />
      {/* Pt-Elektrode mit Enzymmembran am unteren Ende */}
      <line x1={100} y1={48} x2={100} y2={92} stroke={C.sample} strokeWidth={4} strokeLinecap="round" />
      <Tag x={122} y={70} text="Pt" color={C.sample} anchor="start" />
      <rect x={86} y={92} width={28} height={8} rx={3} fill="none" stroke={C.accent} strokeWidth={1.8} />
      <Tag x={100} y={110} text="GOD-Membran" color={C.accent} size={6} />
      {/* Reaktionskette */}
      <Tag x={100} y={126} text="Glucose + O₂ → H₂O₂" color={C.light} size={6.5} />
      <Caption text="Pt-Elektrode oxidiert das H₂O₂" />
    </Frame>
  )
}
