"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { fadeUp, stagger, item } from "@/lib/motion";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="content-width">
        <motion.div {...fadeUp()}>
          <p className="section-label">Work</p>
          <h2 className="section-heading mb-16">Experience.</h2>
        </motion.div>

        <div className="relative">
          {/* Scroll-driven accent line */}
          <motion.div
            className="absolute left-[7px] top-2 bottom-0 w-px origin-top"
            style={{
              background: "var(--accent)",
              opacity: 0.25,
              scaleY: lineScale,
            }}
            aria-hidden="true"
          />

          <motion.div {...stagger(0.1)}>
            {site.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={item}
                className="relative pl-10 pb-16 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-[6px] w-3.5 h-3.5 rounded-full"
                  style={{ background: "var(--accent)", boxShadow: "0 0 0 3px rgba(201,168,76,0.15)" }}
                  aria-hidden="true"
                />

                {/* Header */}
                <div className="mb-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <span className="font-body font-semibold text-base" style={{ color: "var(--text)" }}>
                      {exp.company}
                    </span>
                    {exp.division && (
                      <span className="section-label" style={{ color: "var(--muted)" }}>
                        {exp.division}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-sm font-medium mb-1" style={{ color: "var(--accent)" }}>
                    {exp.role}
                  </p>
                  <p className="section-label" style={{ color: "var(--muted)" }}>
                    {exp.location} · {exp.dates}
                  </p>
                </div>

                {exp.description && (
                  <p className="font-body text-sm mb-4" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                    {exp.description}
                  </p>
                )}

                {/* Bullets */}
                <ul className="space-y-2.5 mb-4">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-3 font-body text-sm" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "var(--accent)" }} className="flex-shrink-0 mt-0.5 text-xs">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                {exp.tags && exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag, k) => (
                      <span key={k} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Case study link */}
                {exp.caseStudySlug && (
                  <Link
                    href={`/projects/${exp.caseStudySlug}`}
                    className="inline-flex items-center gap-1 font-body text-sm transition-colors hover:text-[var(--accent-hover)]"
                    style={{ color: "var(--accent)" }}
                  >
                    View case study →
                  </Link>
                )}

                {/* Upcoming rotation */}
                {exp.upcoming && (
                  <div
                    className="mt-5 p-4 rounded"
                    style={{ border: "1px dashed var(--accent)", background: "rgba(201,168,76,0.04)" }}
                  >
                    <p className="section-label mb-1.5" style={{ color: "var(--accent)" }}>
                      Upcoming Rotation
                    </p>
                    <p className="font-body text-sm" style={{ color: "var(--muted)" }}>
                      {exp.upcoming}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
