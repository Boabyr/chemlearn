// Zwilling von src/content/kartenId.ts — src/content/kartenId.test.ts hält beide gleich.
export function kartenId(vorderseite) {
  const text = vorderseite.trim().replace(/\s+/g, ' ')

  let hash = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }

  return hash.toString(36).padStart(7, '0')
}
