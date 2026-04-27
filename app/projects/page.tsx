import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and project work by Samiksha Kature.",
};

const STATUS_LABELS = {
  "live":        "Live",
  "in-progress": "In progress",
  "archived":    "Archived",
} as const;

const STATUS_COLORS = {
  "live":        "#4ade80",
  "in-progress": "var(--accent)",
  "archived":    "var(--muted)",
} as const;

export default function ProjectsPage() {
  return (
    <div className="section-pad">
      <div className="content-width">
        <p className="section-label mb-4">Work</p>
        <h1 className="section-heading mb-12">Projects.</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {site.projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="relative block p-6 rounded-lg transition-colors duration-200"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.boxShadow   = "0 8px 32px rgba(201,168,76,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow   = "none";
              }}
              aria-label={`${project.title} — view case study`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full"
                  style={{ border: "1px solid var(--border)", color: STATUS_COLORS[project.status] }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: STATUS_COLORS[project.status] }}
                    aria-hidden="true"
                  />
                  {STATUS_LABELS[project.status]}
                </span>
                <span style={{ color: "var(--muted)", fontSize: 14 }} aria-hidden="true">↗</span>
              </div>
              <h2 className="font-body text-base font-semibold mb-3" style={{ color: "var(--text)" }}>
                {project.title}
              </h2>
              <p
                className="font-body text-sm mb-5"
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
