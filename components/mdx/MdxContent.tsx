import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: false }],
    ],
  },
} as const;

// Shared MDX renderer with prose styles
export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="mdx-prose">
      {/* @ts-expect-error — next-mdx-remote/rsc types are async RSC */}
      <MDXRemote source={source} options={mdxOptions} />
    </div>
  );
}
