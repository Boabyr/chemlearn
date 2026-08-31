import { Frame, Lamp, Monochromator, Cuvette, Detector, Beam, Caption, C } from './parts'

/** UV/Vis-Absorptionsspektrometer: alles auf einer optischen Achse. */
export default function UvVis() {
  return (
    <Frame>
      <Lamp x={20} y={70} label="D₂/W" r={13} />
      <Beam from={{ x: 34, y: 70 }} to={{ x: 48, y: 70 }} color={C.light} />
      <Monochromator x={48} y={48} label="Gitter" />
      <Beam from={{ x: 80, y: 70 }} to={{ x: 96, y: 70 }} />
      <Cuvette x={96} y={55} label="Probe" />
      <Beam from={{ x: 126, y: 70 }} to={{ x: 142, y: 70 }} color={C.detect} />
      <Detector x={142} y={59} label="Det" />
      <Caption text="Detektor hinter der Probe – Transmission" />
    </Frame>
  )
}
