import type { Metadata } from "next";
import Link from "next/link";
import { listMdx, readTime, getMdx } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Notes",
  description: "Writing and notes by Samiksha Kature.",
};

type NoteEntry = {
  slug: string;
  title?: string;
  date?: string;
  tldr?: string;
  tags?: string[];
  readTime?: string;
};

export default function NotesPage() {
  const raw = listMdx("notes");

  const posts: NoteEntry[] = raw
    .filter((p) => p.title && p.date)
    .map((p) => {
      let rt = "";
      try {
        const { content } = getMdx("notes", p.slug);
        rt = readTime(content);
      } catch { /* ignore */ }
      return {
        slug:     p.slug,
        title:    p.title  as string | undefined,
        date:     p.date   as string | undefined,
        tldr:     p.tldr   as string | undefined,
        tags:     p.tags   as string[] | undefined,
        readTime: rt,
      };
    })
    .sort((a, b) =>
      new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
    );

  return (
    <div className="section-pad">
      <div className="content-width">
        <p className="section-label mb-4">Writing</p>
        <h1 className="section-heading mb-12">Notes.</h1>

        {posts.length === 0 ? (
          <p className="font-body text-sm" style={{ color: "var(--muted)" }}>
            No posts yet — check back soon.
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {posts.map((post) => (
              <li key={post.slug} className="py-6 first:pt-0">
                <Link href={`/notes/${post.slug}`} className="group flex items-start gap-6">
                  <span
                    className="font-mono text-xs flex-shrink-0 pt-1 w-20"
                    style={{ color: "var(--accent-2)" }}
                  >
                    {post.date
                      ? new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : ""}
                  </span>
                  <div className="flex-1">
                    <h2
                      className="font-body text-base font-medium mb-1 transition-colors group-hover:text-[var(--accent)]"
                      style={{ color: "var(--text)" }}
                    >
                      {post.title}
                    </h2>
                    {post.tldr && (
                      <p className="font-body text-sm" style={{ color: "var(--muted)" }}>
                        {post.tldr}
                      </p>
                    )}
                    {post.readTime && (
                      <p className="font-mono text-xs mt-2" style={{ color: "var(--muted)" }}>
                        {post.readTime}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
