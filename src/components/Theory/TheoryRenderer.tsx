import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkChemistry from './remarkChemistry'
import { slugify, abschnitte } from './toc'
import 'katex/dist/katex.min.css'

function kindText(kinder: React.ReactNode): string {
  if (typeof kinder === 'string' || typeof kinder === 'number') return String(kinder)
  if (Array.isArray(kinder)) return kinder.map(kindText).join('')
  if (kinder && typeof kinder === 'object' && 'props' in kinder) {
    return kindText((kinder as { props: { children?: React.ReactNode } }).props.children)
  }
  return ''
}

interface Props {
  markdown: string
  /** Inhaltsübersicht über den Text setzen (ab zwei Abschnitten). */
  showToc?: boolean
}

export default function TheoryRenderer({ markdown, showToc = false }: Props) {
  const toc = useMemo(() => (showToc ? abschnitte(markdown) : []), [markdown, showToc])

  return (
    <div>
      {toc.length > 1 && (
        <nav aria-label="Inhalt des Themas"
          className="mb-8 rounded-xl border border-line bg-sunken p-4">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-subtle">Inhalt</p>
          <ul className="space-y-1">
            {toc.map(a => (
              <li key={a.anker}>
                <a href={`#${a.anker}`} className="text-sm text-accent hover:underline">{a.titel}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="leading-relaxed text-ink">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath, remarkChemistry]}
          rehypePlugins={[rehypeKatex]}
          components={{
            h1: ({ children }) => (
              <h2 id={slugify(kindText(children))}
                className="mt-8 mb-3 scroll-mt-20 text-xl font-semibold text-ink">{children}</h2>
            ),
            h2: ({ children }) => (
              <h2 id={slugify(kindText(children))}
                className="mt-8 mb-3 scroll-mt-20 text-xl font-semibold text-ink">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 id={slugify(kindText(children))}
                className="mt-6 mb-2 scroll-mt-20 text-lg font-medium text-accent">{children}</h3>
            ),
            p: ({ children }) => <p className="mb-4 text-muted">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
            em: ({ children }) => <em className="italic text-muted">{children}</em>,
            ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-muted marker:text-accent">{children}</ul>,
            ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-muted marker:text-accent">{children}</ol>,
            li: ({ children }) => <li className="pl-1">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="mb-4 border-l-4 border-accent bg-sunken py-2 pl-4 text-muted">{children}</blockquote>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-accent underline underline-offset-2">{children}</a>
            ),
            code: ({ children, className }) =>
              className?.includes('language-') ? (
                <code className="block overflow-x-auto rounded-lg bg-sunken p-3 font-mono text-sm text-ink">{children}</code>
              ) : (
                <code className="rounded bg-sunken px-1.5 py-0.5 font-mono text-[0.9em] text-ink">{children}</code>
              ),
            pre: ({ children }) => <pre className="mb-4">{children}</pre>,
            table: ({ children }) => (
              <div className="mb-6 overflow-x-auto rounded-xl border border-line">
                <table className="w-full border-collapse text-sm">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-sunken">{children}</thead>,
            th: ({ children }) => (
              <th className="border-b border-line px-3 py-2 text-left font-semibold text-ink">{children}</th>
            ),
            td: ({ children }) => (
              <td className="border-b border-line px-3 py-2 align-top text-muted">{children}</td>
            ),
            hr: () => <hr className="my-8 border-line" />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}
