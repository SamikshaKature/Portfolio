import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-6xl font-semibold mb-4" style={{ color: "var(--accent)", opacity: 0.4 }}>
        404
      </p>
      <h1 className="section-heading mb-4">Page not found.</h1>
      <p className="font-body text-sm mb-10" style={{ color: "var(--muted)", maxWidth: 360, lineHeight: 1.8 }}>
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="btn-primary">← Home</Link>
        <Link href="/projects" className="btn-ghost">Projects</Link>
        <Link href="/notes" className="btn-ghost">Notes</Link>
      </div>
    </div>
  );
}
