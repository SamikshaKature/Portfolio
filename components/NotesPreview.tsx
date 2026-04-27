import Link from "next/link";
import { listMdx } from "@/lib/mdx";

// Server component — reads MDX at build time
export default function NotesPreview() {
  let posts: Array<{
    slug: string;
    title?: string;
    date?: string;
    tldr?: string;
    tags?: string[];
  }> = [];

  try {
    const raw = listMdx("notes");
    posts = raw
      .filter((p) => p.title && p.date)
      .sort((a, b) =>
        new Date(b.date as string).getTime() - new Date(a.date as string).getTime()
      )
      .slice(0, 3) as typeof posts;
  } catch {
    // content/notes/ may not exist yet — render nothing
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section
      id="notes"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="content-width">
        <p className="section-label">Writing</p>
        <h2 className="section-heading mb-10">Recent Notes.</h2>

        <ul className="space-y-6 mb-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/notes/${post.slug}`}
                className="group flex flex-col gap-1"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    className="font-body text-base font-medium transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text)" }}
                  >
                    {post.title}
                  </span>
                  {post.date && (
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: "var(--accent-2)" }}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
                {post.tldr && (
                  <p className="font-body text-sm" style={{ color: "var(--muted)" }}>
                    {post.tldr}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/notes"
          className="font-body text-sm transition-colors hover:text-[var(--accent-hover)]"
          style={{ color: "var(--accent)" }}
        >
          All notes →
        </Link>
      </div>
    </section>
  );
}
