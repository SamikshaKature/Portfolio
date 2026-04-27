import type { Metadata } from "next";
import { getMdxFile } from "@/lib/mdx";
import MdxContent from "@/components/mdx/MdxContent";

export const metadata: Metadata = {
  title: "Now",
  description: "What Samiksha Kature is doing right now.",
};

export default function NowPage() {
  const { frontmatter, content } = getMdxFile("now.mdx");
  const updatedAt = (frontmatter as { updatedAt?: string }).updatedAt;

  return (
    <div className="section-pad">
      <div className="prose-width">
        <p className="section-label mb-4">Now</p>
        <h1 className="section-heading mb-3">What I&apos;m doing now.</h1>
        {updatedAt && (
          <p className="font-mono text-xs mb-12" style={{ color: "var(--accent-2)" }}>
            Updated {updatedAt}
          </p>
        )}
        <MdxContent source={content} />
      </div>
    </div>
  );
}
