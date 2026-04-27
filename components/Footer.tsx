import Link from "next/link";
import { site } from "@/content/site";

const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE ?? "—";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="section-pad border-t"
      style={{ borderColor: "var(--border)" }}
      aria-label="Site footer"
    >
      <div className="content-width">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
          {/* Sitemap */}
          <div>
            <p className="section-label mb-4">Sitemap</p>
            <ul className="space-y-2">
              {[
                { label: "Home",     href: "/"         },
                { label: "Now",      href: "/now"      },
                { label: "Projects", href: "/projects" },
                { label: "Notes",    href: "/notes"    },
                { label: "Uses",     href: "/uses",    todo: true },
              ].map(({ label, href, todo }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: todo ? "var(--muted)" : "var(--text-soft)" }}
                    aria-label={todo ? `${label} (coming soon)` : label}
                  >
                    {label}
                    {todo && (
                      <span className="ml-2 text-[10px] font-mono" style={{ color: "var(--muted)" }}>
                        soon
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <p className="section-label mb-4">Elsewhere</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={site.meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-soft)" }}
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={site.meta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-soft)" }}
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.meta.email}`}
                  className="font-body text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-soft)" }}
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={site.meta.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-soft)" }}
                >
                  Resume PDF ↓
                </a>
              </li>
            </ul>
          </div>

          {/* Meta */}
          <div>
            <p className="section-label mb-4">Meta</p>
            <ul className="space-y-2">
              <li className="font-body text-sm" style={{ color: "var(--muted)" }}>
                © {year} {site.meta.name}
              </li>
              <li className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                Last updated: {buildDate}
              </li>
              <li className="font-body text-sm" style={{ color: "var(--muted)" }}>
                Built with Next.js &amp; care
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
