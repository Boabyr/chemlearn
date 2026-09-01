/**
 * Setzt Summenformeln und Exponenten in gewöhnlichem Fließtext.
 *
 *   H2SO4   → H₂SO₄        10^-3  → 10⁻³
 *   Ca(OH)2 → Ca(OH)₂      Cu^2+  → Cu²⁺
 *
 * Absichtlich konservativ: umgeschrieben wird nur, was sich vollständig als
 * Summenformel aus echten Elementsymbolen lesen lässt. „Kapitel 2", „254 nm"
 * und „SM2" bleiben unangetastet. Kurskürzel wie „OC2" wären chemisch gültige
 * Formeln und stehen deshalb auf der Ausnahmeliste.
 */

const ELEMENTS = new Set(
  ('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn ' +
   'Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La ' +
   'Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po ' +
   'At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg ' +
   'Cn Nh Fl Mc Lv Ts Og').split(' '),
)

/** Kürzel, die wie Formeln aussehen, aber keine sind. */
const KEINE_FORMEL = new Set(['OC1', 'OC2', 'OC3', 'PC1', 'PC2', 'BC1', 'BC2'])

const SUB: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
}
const SUP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻',
}

/** Liest `s` vollständig als Summenformel? Verlangt mindestens eine Zahl. */
function istFormel(s: string): boolean {
  if (KEINE_FORMEL.has(s)) return false
  if (!/\d/.test(s)) return false

  let i = 0
  let gruppen = 0
  let tiefe = 0

  while (i < s.length) {
    const c = s[i]
    if (c === '(') { tiefe++; i++; continue }
    if (c === ')') {
      if (tiefe === 0) return false
      tiefe--
      i++
      while (/\d/.test(s[i])) i++
      continue
    }
    if (!/[A-Z]/.test(c)) return false

    // Zweibuchstabiges Symbol bevorzugen, sonst einbuchstabiges.
    const zwei = s.slice(i, i + 2)
    let symbol: string
    if (zwei.length === 2 && /[a-z]/.test(zwei[1]) && ELEMENTS.has(zwei)) symbol = zwei
    else if (ELEMENTS.has(c)) symbol = c
    else return false

    i += symbol.length
    while (/\d/.test(s[i])) i++
    gruppen++
  }

  return tiefe === 0 && gruppen > 0
}

function tiefstellen(s: string): string {
  return s.replace(/\d/g, d => SUB[d])
}

export function formatChemistry(text: string): string {
  const mitFormeln = text.replace(/[A-Za-z(][A-Za-z()\d]*/g, treffer =>
    istFormel(treffer) ? tiefstellen(treffer) : treffer,
  )

  return mitFormeln.replace(/\^(-?\d+[+-]?|[+-])/g, (_, exp: string) =>
    exp.replace(/./g, z => SUP[z] ?? z),
  )
}
