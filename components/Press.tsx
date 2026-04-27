import { site } from "@/content/site";

export default function Press() {
  if (!site.press.visible) return null;

  const { media, publications, speaking } = site.press;

  return (
    <section
      id="press"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="content-width">
        <p className="section-label">Press</p>
        <h2 className="section-heading mb-12">Press &amp; Publications.</h2>

        {media.length > 0 && (
          <div className="mb-10">
            <h3 className="section-label mb-6">Media Coverage</h3>
            <ul className="space-y-4">
              {media.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  {item.date && (
                    <span className="font-mono text-xs flex-shrink-0 pt-0.5 w-20" style={{ color: "var(--accent-2)" }}>
                      {item.date}
                    </span>
                  )}
                  <div className="flex-1">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm transition-colors hover:underline underline-offset-4"
                        style={{ color: "var(--text-soft)" }}
                      >
                        {item.label} ↗
                      </a>
                    ) : (
                      <span className="font-body text-sm" style={{ color: "var(--text-soft)" }}>
                        {item.label}
                      </span>
                    )}
                    {item.outlet && (
                      <p className="font-body text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {item.outlet}
                      </p>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.tags.map((t, j) => (
                          <span key={j} className="skill-tag" style={{ fontSize: 10 }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {publications.length > 0 && (
          <div className="mb-10">
            <h3 className="section-label mb-6">Publications</h3>
            <ul className="space-y-4">
              {publications.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  {item.date && (
                    <span className="font-mono text-xs flex-shrink-0 pt-0.5 w-20" style={{ color: "var(--accent-2)" }}>
                      {item.date}
                    </span>
                  )}
                  <div className="flex-1">
                    <span className="font-body text-sm" style={{ color: "var(--text-soft)" }}>
                      {item.label}
                    </span>
                    {item.outlet && (
                      <p className="font-body text-xs mt-0.5" style={{ color: "var(--muted)" }}>{item.outlet}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {speaking.length > 0 && (
          <div>
            <h3 className="section-label mb-6">Speaking &amp; Contributions</h3>
            <ul className="space-y-4">
              {speaking.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  {item.date && (
                    <span className="font-mono text-xs flex-shrink-0 pt-0.5 w-20" style={{ color: "var(--accent-2)" }}>
                      {item.date}
                    </span>
                  )}
                  <span className="font-body text-sm" style={{ color: "var(--text-soft)" }}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
