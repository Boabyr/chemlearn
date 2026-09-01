import { useState, useRef } from 'react'
import type { MechanismusStufe } from '../../content/schema'

type Stage = MechanismusStufe
/** Der Pfeil, den die lernende Person gerade gezogen hat. */
type Arrow = { from: string; to: string }

interface MechanismBuilderProps {
  title: string
  description: string
  stages: Stage[]
  onComplete?: () => void
}

const T = {
  bg: '#0b0f1a',
  teal: '#2dd4bf',
  tealDim: '#0d2e2a',
  tealGlow: '#2dd4bf33',
  amber: '#fbbf24',
  red: '#f87171',
  green: '#4ade80',
  greenDim: '#0d2d1a',
  redDim: '#2d0f0f',
  text: '#e2e8f0',
  muted: '#64748b',
  faint: '#1e293b',
  border: '#2a3a52',
}

export default function MechanismBuilder({ title, description, stages, onComplete }: MechanismBuilderProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const dragRef = useRef<{ fromId: string; x1: number; y1: number } | null>(null)
  const [stageIdx, setStageIdx] = useState(0)
  const [livePos, setLivePos] = useState<{ x: number; y: number } | null>(null)
  const [arrow, setArrow] = useState<Arrow | null>(null)
  const [fb, setFb] = useState<'ok' | 'wrong' | null>(null)
  const [hints, setHints] = useState(0)
  const [completed, setCompleted] = useState(false)

  const stage = stages[stageIdx]

  function svgPt(cx: number, cy: number) {
    const r = svgRef.current!.getBoundingClientRect()
    return { x: (cx - r.left) * 480 / r.width, y: (cy - r.top) * 260 / r.height }
  }

  function hit(x: number, y: number) {
    return stage.atoms.find(a => Math.hypot(a.x - x, a.y - y) < a.r + 12)
  }

  function clientXY(e: React.MouseEvent | React.TouchEvent) {
    const t = 'touches' in e ? e.touches[0] : e
    return { cx: t.clientX, cy: t.clientY }
  }

  function clientXYChanged(e: React.TouchEvent) {
    const t = e.changedTouches[0]
    return { cx: t.clientX, cy: t.clientY }
  }

  function onDown(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    const { cx, cy } = clientXY(e)
    const p = svgPt(cx, cy)
    const a = hit(p.x, p.y)
    if (a) {
      dragRef.current = { fromId: a.id, x1: a.x, y1: a.y }
      setLivePos(p)
    }
  }

  function onMove(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    if (!dragRef.current) return
    const { cx, cy } = clientXY(e)
    setLivePos(svgPt(cx, cy))
  }

  function onUp(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    if (!dragRef.current) return
    const { cx, cy } = 'changedTouches' in e ? clientXYChanged(e) : clientXY(e)
    const p = svgPt(cx, cy)
    const toA = hit(p.x, p.y)
    if (toA && toA.id !== dragRef.current.fromId) {
      const ok = dragRef.current.fromId === stage.correctArrow.from && toA.id === stage.correctArrow.to
      setArrow({ from: dragRef.current.fromId, to: toA.id })
      setFb(ok ? 'ok' : 'wrong')
      if (ok) {
        setTimeout(() => {
          if (stageIdx < stages.length - 1) {
            setStageIdx(i => i + 1)
            setArrow(null)
            setFb(null)
            setHints(0)
            setLivePos(null)
          } else {
            setCompleted(true)
            onComplete?.()
          }
        }, 900)
      }
    }
    dragRef.current = null
    setLivePos(null)
  }

  function curvedArrow(fromId: string, toId: string, color: string) {
    const a1 = stage.atoms.find(a => a.id === fromId)
    const a2 = stage.atoms.find(a => a.id === toId)
    if (!a1 || !a2) return null
    const dx = a2.x - a1.x, dy = a2.y - a1.y
    const len = Math.sqrt(dx * dx + dy * dy)
    const ux = dx / len, uy = dy / len
    const x1 = a1.x + ux * (a1.r + 5), y1 = a1.y + uy * (a1.r + 5)
    const x2 = a2.x - ux * (a2.r + 8), y2 = a2.y - uy * (a2.r + 8)
    const mx = (x1 + x2) / 2 - uy * 30, my = (y1 + y2) / 2 + ux * 30
    const mid = `arrowhead_${fromId}_${toId}`
    return (
      <g>
        <defs>
          <marker id={mid} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={color} />
          </marker>
        </defs>
        <path d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`}
          stroke={color} strokeWidth={3} fill="none" markerEnd={`url(#${mid})`} />
      </g>
    )
  }

  if (completed) return (
    <div className="text-center py-10">
      <div className="text-5xl mb-4">🎉</div>
      <h3 className="text-xl font-light text-accent mb-2">Mechanismus abgeschlossen!</h3>
      <p className="text-muted text-sm">Du hast alle Schritte korrekt gezeichnet.</p>
      <button
        onClick={() => { setStageIdx(0); setArrow(null); setFb(null); setHints(0); setCompleted(false) }}
        className="mt-6 px-6 py-2.5 bg-accent hover:bg-accent-strong text-on-accent font-semibold rounded-xl text-sm transition-colors"
      >
        Nochmal versuchen
      </button>
    </div>
  )

  const drag = dragRef.current

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-ink mb-1">{title}</h3>
        <p className="text-muted text-sm">{description}</p>
      </div>

      {/* Fortschritt */}
      <div className="flex gap-2 items-center">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
              i < stageIdx ? 'bg-accent border-accent text-on-accent' :
              i === stageIdx ? 'bg-accent/20 border-accent text-accent' :
              'bg-raised border-line text-subtle'
            }`}>
              {i < stageIdx ? '✓' : i + 1}
            </div>
            <span className={`text-xs ${i === stageIdx ? 'text-accent' : 'text-subtle'}`}>
              {s.label}
            </span>
            {i < stages.length - 1 && <span className="text-subtle text-xs mx-1">›</span>}
          </div>
        ))}
      </div>

      {/* Aufgabe */}
      <div className="bg-raised border border-line rounded-xl px-4 py-3 text-sm text-muted">
        <span className="text-accent font-semibold">Aufgabe: </span>
        {stage.description}
      </div>

      {/* SVG Canvas */}
      <div
        className="rounded-xl overflow-hidden border transition-colors"
        style={{
          borderColor: fb === 'ok' ? T.green : fb === 'wrong' ? T.red : T.border,
          background: T.bg,
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 480 260"
          width="100%"
          style={{ display: 'block', cursor: drag ? 'crosshair' : 'pointer', touchAction: 'none' }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
        >
          {/* Grid */}
          {Array.from({ length: 12 }, (_, i) =>
            Array.from({ length: 7 }, (_, j) => (
              <circle key={`${i}${j}`} cx={20 + i * 40} cy={20 + j * 36} r={1.2} fill={T.faint} />
            ))
          )}

          {/* Bindungen */}
          {stage.bonds.map((b, i) => {
            const a1 = stage.atoms.find(a => a.id === b.a)
            const a2 = stage.atoms.find(a => a.id === b.b)
            if (!a1 || !a2) return null
            return (
              <line key={i} x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y}
                stroke={b.color} strokeWidth={b.dash ? 1.5 : 2.5}
                strokeDasharray={b.dash ? '6,4' : 'none'} opacity={0.85} />
            )
          })}

          {/* Gezeichneter Pfeil */}
          {arrow && curvedArrow(arrow.from, arrow.to, fb === 'ok' ? T.green : T.red)}

          {/* Live-Drag Linie */}
          {drag && livePos && (
            <g>
              <defs>
                <marker id="drag_live" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill={T.teal} opacity={0.7} />
                </marker>
              </defs>
              <line
                x1={drag.x1} y1={drag.y1} x2={livePos.x} y2={livePos.y}
                stroke={T.teal} strokeWidth={2.5} strokeDasharray="7,4"
                opacity={0.8} markerEnd="url(#drag_live)"
              />
            </g>
          )}

          {/* Atome */}
          {stage.atoms.map(a => (
            <g key={a.id}>
              <circle cx={a.x} cy={a.y} r={a.r + 9}
                fill={drag?.fromId === a.id ? T.tealGlow : 'transparent'} />
              <circle cx={a.x} cy={a.y} r={a.r}
                fill={a.color + '22'} stroke={a.color}
                strokeWidth={drag?.fromId === a.id ? 2.5 : 1.5} />
              <text x={a.x} y={a.y} textAnchor="middle" dominantBaseline="central"
                fill={a.color} fontSize={a.r > 18 ? 12 : 10}
                fontWeight="600" fontFamily="monospace">
                {a.label}
              </text>
              {a.charge && (
                <text x={a.x + a.r} y={a.y - a.r + 2}
                  fill={a.color} fontSize={8} fontFamily="monospace">
                  {a.charge}
                </text>
              )}
              {a.sub && (
                <text x={a.x} y={a.y + a.r + 12}
                  textAnchor="middle" fill={a.color} fontSize={9} fontFamily="monospace">
                  {a.sub}
                </text>
              )}
            </g>
          ))}

          {!arrow && !drag && (
            <text x={240} y={250} textAnchor="middle"
              fill={T.muted} fontSize={10} fontFamily="sans-serif">
              Atom antippen → halten → zum Zielatom ziehen → loslassen
            </text>
          )}
        </svg>
      </div>

      {/* Feedback */}
      {fb && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${
          fb === 'ok'
            ? 'bg-success/10 border-success text-success'
            : 'bg-danger/10 border-danger text-danger'
        }`}>
          <span className="text-lg">{fb === 'ok' ? '✓' : '✗'}</span>
          <span>{fb === 'ok' ? 'Richtig! Weiter zum nächsten Schritt…' : 'Falscher Pfeil – versuch es nochmal.'}</span>
          {fb === 'wrong' && (
            <button
              onClick={() => { setArrow(null); setFb(null) }}
              className="ml-auto px-3 py-1 bg-sunken border border-line rounded-lg text-muted text-xs"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Hinweise */}
      <div className="flex gap-2 flex-wrap">
        {hints < 2 && (
          <button
            onClick={() => setHints(h => h + 1)}
            className="px-4 py-2 bg-warning/20 border border-warning text-warning rounded-lg text-xs"
          >
            💡 Hinweis {hints + 1}
          </button>
        )}
        {hints >= 1 && (
          <div className="flex-1 px-4 py-2 bg-warning/10 border border-warning rounded-lg text-xs text-warning leading-relaxed">
            {stage.hint1}
          </div>
        )}
      </div>
      {hints >= 2 && (
        <div className="px-4 py-2 bg-warning/10 border border-warning rounded-lg text-xs text-warning leading-relaxed">
          🔍 {stage.hint2}
        </div>
      )}
    </div>
  )
}
