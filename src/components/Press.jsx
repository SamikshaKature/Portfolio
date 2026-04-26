import { content } from '../data/content.js'

// Press section only renders when content.press.visible === true
export default function Press() {
  if (!content.press.visible) return null

  const { media, publications, speaking } = content.press

  return (
    <section id="press" className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="content-width">
        <p className="section-label">Press</p>
        <h2 className="section-heading mb-12">Press & Publications.</h2>

        {media.length > 0 && (
          <div className="mb-10">
            <p className="section-label mb-5">Media Coverage</p>
            <ul className="space-y-3">
              {media.map((item, i) => (
                <li key={i}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm transition-colors hover:underline underline-offset-4"
                      style={{ color: 'var(--muted)' }}
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <span className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {publications.length > 0 && (
          <div className="mb-10">
            <p className="section-label mb-5">Publications</p>
            <ul className="space-y-3">
              {publications.map((item, i) => (
                <li key={i} className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {speaking.length > 0 && (
          <div>
            <p className="section-label mb-5">Speaking & Contributions</p>
            <ul className="space-y-3">
              {speaking.map((item, i) => (
                <li key={i} className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
