import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMdx, listMdx, readTime } from "@/lib/mdx";
import MdxContent from "@/components/mdx/MdxContent";

type Props = { params: Promise<{ slug: string }> };

type Frontmatter = {
  title?: string;
  date?: string;
  tldr?: string;
  tags?: string[];
};

export async function generateStaticParams() {
  return listMdx("notes").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter: fm } = getMdx("notes", slug);
    const f = fm as Frontmatter;
    return {
      title: f.title ?? slug,
      description: f.tldr,
      openGraph: {
        images: [`/api/og?title=${encodeURIComponent(f.title ?? slug)}&kind=note`],
      },
    };
  } catch {
    return { title: slug };
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  let frontmatter: Frontmatter;
  let content: string;
  try {
    const result = getMdx("notes", slug);
    frontmatter  = result.frontmatter as Frontmatter;
    content      = result.content;
  } catch {
    notFound();
  }

  const rt = readTime(content);

  return (
    <div className="section-pad">
      <div className="prose-width">
        <Link
          href="/notes"
          className="section-label transition-colors hover:text-[var(--accent)] mb-8 inline-block"
          style={{ color: "var(--muted)" }}
        >
          ← Notes
        </Link>

        {frontmatter.date && (
          <p className="font-mono text-xs mb-3" style={{ color: "var(--accent-2)" }}>
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              day: "numeric", month: "long", year: "numeric",
            })}
            {" · "}{rt}
          </p>
        )}

        <h1 className="section-heading mb-4">{frontmatter.title}</h1>

        {frontmatter.tldr && (
          <p
            className="font-body text-base italic mb-10 pb-8"
            style={{ color: "var(--text-soft)", borderBottom: "1px solid var(--border)" }}
          >
            {frontmatter.tldr}
          </p>
        )}

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="skill-tag">{tag}</span>
            ))}
          </div>
        )}

        <MdxContent source={content} />
      </div>
    </div>
  );
}
