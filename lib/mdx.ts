import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getMdx(dir: "projects" | "notes", slug: string) {
  const file = fs.readFileSync(
    path.join(process.cwd(), "content", dir, `${slug}.mdx`),
    "utf8",
  );
  const { data, content } = matter(file);
  return { frontmatter: data as Record<string, unknown>, content };
}

// For top-level MDX files like content/now.mdx
export function getMdxFile(relativePath: string) {
  const file = fs.readFileSync(
    path.join(process.cwd(), "content", relativePath),
    "utf8",
  );
  const { data, content } = matter(file);
  return { frontmatter: data as Record<string, unknown>, content };
}

export function listMdx(dir: "projects" | "notes"): Array<{ slug: string } & Record<string, unknown>> {
  const d = path.join(process.cwd(), "content", dir);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({
      slug: f.replace(/\.mdx$/, ""),
      ...(matter(fs.readFileSync(path.join(d, f), "utf8")).data as Record<string, unknown>),
    }));
}

// Rough read-time estimate: words / 200 wpm, minimum 1 min
export function readTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const mins  = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}
