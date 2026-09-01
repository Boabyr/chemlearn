interface Props {
  titel: string
  wert: string
  zusatz?: string
}

/** Eine Zahl braucht kein Diagramm. */
export default function Kennzahl({ titel, wert, zusatz }: Props) {
  return (
    <div className="rounded-2xl border border-line bg-raised p-5">
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-subtle">{titel}</p>
      <p className="text-3xl font-light text-ink tabular-nums">{wert}</p>
      {zusatz && <p className="mt-1 text-xs text-subtle">{zusatz}</p>}
    </div>
  )
}
