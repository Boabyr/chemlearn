/**
 * Eine Stelle für die Ampel. Vorher stand dieselbe Hex-Kaskade viermal
 * als Inline-Style im JSX und ließ sich nicht mit dem Thema umschalten.
 */
export type Ampel = 'gut' | 'mittel' | 'schwach'

export function ampel(anteil: number): Ampel {
  if (anteil >= 0.75) return 'gut'
  if (anteil >= 0.5) return 'mittel'
  return 'schwach'
}

const TEXT: Record<Ampel, string> = {
  gut: 'text-success',
  mittel: 'text-warning',
  schwach: 'text-danger',
}

const FLAECHE: Record<Ampel, string> = {
  gut: 'bg-success',
  mittel: 'bg-warning',
  schwach: 'bg-danger',
}

export const ampelText = (anteil: number) => TEXT[ampel(anteil)]
export const ampelFlaeche = (anteil: number) => FLAECHE[ampel(anteil)]
