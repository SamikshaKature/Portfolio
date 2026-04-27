import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMdx, listMdx } from "@/lib/mdx";
import MdxContent from "@/components/mdx/MdxContent";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

type Frontmatter = {
  title?: string;
  summary?: string;
  tags?: string[];
  status?: string;
  year?: number | string;
  metrics?: Array<{ label: string; value: string }>;
};

export async function generateStaticParams() {
  return listMdx("projects").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter: fm } = getMdx("projects", slug);
    const f = fm as Frontmatter;
    return {
      title: f.title ?? slug,
      description: f.summary,
      openGraph: {
        images: [`/api/og?title=${encodeURIComponent(f.title ?? slug)}&kind=project`],
      },
    };
  } catch {
    return { title: slug };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  let frontmatter: Frontmatter;
  let content: string;
  try {
    const result = getMdx("projects", slug);
    frontmatter  = result.frontmatter as Frontmatter;
    content      = result.content;
  } catch {
    notFound();
  }

  // Prev / next navigation
  const all   = listMdx("projects");
  const idx   = all.findIndex((p) => p.slug === slug);
  const prev  = idx > 0              ? all[idx - 1] : null;
  const next  = idx < all.length - 1 ? all[idx + 1] : null;

  // Find matching site.projects entry for status display
  const siteProject = site.projects.find((p) => p.slug === slug);

  return (
    <div className="section-pad">
      {/* Hero strip */}
      <div className="content-width mb-16">
        <Link href="/projects" className="section-label transition-colors hover:text-[var(--accent)] mb-8 inline-block" style={{ color: "var(--muted)" }}>
          ← Back to projects
        </Link>
        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.tags?.map((tag) => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
        <h1 className="section-heading mb-4" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
          {frontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          {frontmatter.year && (
            <span className="font-mono text-xs" style={{ color: "var(--accent-2)" }}>{frontmatter.year}</span>
          )}
          {siteProject && (
            <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{siteProject.status}</span>
          )}
        </div>
        {frontmatter.summary && (
          <p className="font-body text-lg mt-6" style={{ color: "var(--text-soft)", maxWidth: 640, lineHeight: 1.7 }}>
            {frontmatter.summary}
          </p>
        )}
      </div>

      {/* Metrics row */}
      {frontmatter.metrics && frontmatter.metrics.length > 0 && (
        <div className="content-width mb-16">
          <div
            className="grid gap-px rounded-lg overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${frontmatter.metrics.length}, 1fr)`,
              border: "1px solid var(--border)",
              background: "var(--border)",
            }}
          >
            {frontmatter.metrics.map((m) => (
              <div key={m.label} className="px-6 py-5" style={{ background: "var(--surface)" }}>
                <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>{m.label}</p>
                <p className="font-body text-base font-semibold" style={{ color: "var(--accent)" }}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MDX body */}
      <div className="prose-width">
        <MdxContent source={content} />
      </div>

      {/* Footer nav */}
      <div className="prose-width mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="font-body text-sm transition-colors hover:text-[var(--accent)]" style={{ color: "var(--muted)" }}>
              ← {(prev as { title?: string }).title ?? prev.slug}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="font-body text-sm transition-colors hover:text-[var(--accent)]" style={{ color: "var(--muted)" }}>
              {(next as { title?: string }).title ?? next.slug} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
