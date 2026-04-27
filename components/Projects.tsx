"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { fadeUp, stagger, item, dur, ease } from "@/lib/motion";
import type { ProjectItem } from "@/content/site";

const STATUS_CONFIG = {
  "live":        { label: "Live",        color: "#4ade80" },
  "in-progress": { label: "In progress", color: "var(--accent)" },
  "archived":    { label: "Archived",    color: "var(--muted)" },
} as const;

function StatusChip({ status }: { status: ProjectItem["status"] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full"
      style={{ border: "1px solid var(--border)", color: cfg.color, background: "transparent" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ background: cfg.color }}
        aria-hidden="true"
      />
      {cfg.label}
    </span>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -3, transition: { duration: dur.xs, ease } }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative block p-6 rounded-lg h-full transition-colors duration-200 group"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
          (e.currentTarget as HTMLElement).style.boxShadow  = "0 8px 32px rgba(201,168,76,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLElement).style.boxShadow  = "none";
        }}
        aria-label={`${project.title} — view case study`}
      >
        {/* Top row: status + external glyph */}
        <div className="flex items-center justify-between mb-4">
          <StatusChip status={project.status} />
          <span className="text-sm transition-colors" style={{ color: "var(--muted)" }} aria-hidden="true">↗</span>
        </div>

        <h3 className="font-body text-base font-semibold mb-3 pr-2" style={{ color: "var(--text)" }}>
          {project.title}
        </h3>

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
          {project.tags.map((tag, i) => (
            <span key={i} className="skill-tag">{tag}</span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const [featured, ...rest] = site.projects;

  return (
    <section
      id="projects"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="content-width">
        <motion.div {...fadeUp()}>
          <p className="section-label">Work</p>
          <h2 className="section-heading mb-12">Projects.</h2>
        </motion.div>

        {/* Featured card — full width */}
        <motion.div {...fadeUp(0.05)} className="mb-6">
          <Link
            href={`/projects/${featured.slug}`}
            className="relative block rounded-lg overflow-hidden group"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.boxShadow  = "0 12px 48px rgba(201,168,76,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.boxShadow  = "none";
            }}
            aria-label={`${featured.title} — view case study`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Text side */}
              <div className="flex-1 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="section-label px-2 py-0.5 rounded"
                    style={{ background: "rgba(201,168,76,0.08)", color: "var(--accent)", border: "1px solid var(--accent)" }}
                  >
                    Featured
                  </span>
                  <StatusChip status={featured.status} />
                </div>
                <h3
                  className="font-display font-semibold mb-4 leading-tight"
                  style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--text)" }}
                >
                  {featured.title}
                </h3>
                <p className="font-body text-sm mb-6" style={{ color: "var(--muted)", lineHeight: 1.7, maxWidth: 480 }}>
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map((tag, i) => (
                    <span key={i} className="skill-tag">{tag}</span>
                  ))}
                </div>
                <span
                  className="inline-flex items-center gap-1 font-body text-sm transition-colors group-hover:text-[var(--accent-hover)]"
                  style={{ color: "var(--accent)" }}
                >
                  View case study →
                </span>
              </div>

              {/* Image side */}
              <div
                className="relative md:w-72 h-48 md:h-auto flex-shrink-0 overflow-hidden"
                style={{ background: "var(--surface-2)" }}
              >
                {/* TODO(samiksha): replace with /public/projects/pixel/hero.jpg once image is available */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "var(--surface-2)" }}
                  aria-hidden="true"
                >
                  <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>pixel.jpg</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* 2-col grid for remaining projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          {...stagger(0.08)}
        >
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
