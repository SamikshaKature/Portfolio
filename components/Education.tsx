"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { fadeUp, stagger, item } from "@/lib/motion";

export default function Education() {
  const { degrees, honors, certifications } = site.education;

  return (
    <section
      id="education"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="content-width">
        <motion.div {...fadeUp()}>
          <p className="section-label">Academic</p>
          <h2 className="section-heading mb-12">Education.</h2>
        </motion.div>

        {/* ── Block 1: Academic Background ── */}
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <h3 className="section-label mb-6">Academic Background</h3>
          <div className="space-y-5">
            {degrees.map((deg, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.07)}
                className="p-6 rounded-lg"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h4
                      className="font-display text-2xl font-semibold mb-1"
                      style={{ color: "var(--text)" }}
                    >
                      {deg.degree}
                    </h4>
                    <p className="font-body text-base font-medium" style={{ color: "var(--accent)" }}>
                      {deg.school}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="section-label">{deg.dates}</p>
                    <p className="section-label mt-0.5">{deg.location}</p>
                  </div>
                </div>
                {deg.minors && deg.minors.length > 0 && (
                  <p className="font-body text-sm" style={{ color: "var(--muted)" }}>
                    Minors: {deg.minors.join(" · ")}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Block 2: Honors & Recognition ── */}
        <motion.div {...fadeUp(0.1)} className="mb-14">
          <h3 className="section-label mb-6">Honors &amp; Recognition</h3>
          <motion.ul className="space-y-3" {...stagger(0.07)}>
            {honors.map((h, i) => (
              <motion.li
                key={i}
                variants={item}
                className="flex items-center justify-between gap-4 py-2"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-start gap-3">
                  <span style={{ color: "var(--accent)" }} aria-hidden="true" className="text-xs mt-0.5">
                    ◆
                  </span>
                  <div>
                    <span className="font-body text-sm font-medium" style={{ color: "var(--text)" }}>
                      {h.label}
                    </span>
                    <span className="font-body text-xs ml-2" style={{ color: "var(--muted)" }}>
                      — {h.school}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs flex-shrink-0" style={{ color: "var(--accent-2)" }}>
                  {h.year}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── Block 3: Certifications (only if non-empty) ── */}
        {certifications.length > 0 && (
          <motion.div {...fadeUp(0.15)}>
            <h3 className="section-label mb-6">Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-3 px-4 rounded"
                  style={{
                    border: cert.inProgress
                      ? "1px dashed var(--border)"
                      : "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <span className="text-base" aria-hidden="true" style={{ color: "var(--muted)" }}>
                    ◎
                  </span>
                  <div className="flex-1">
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm font-medium transition-colors hover:text-[var(--accent)]"
                        style={{ color: "var(--text)" }}
                      >
                        {cert.name} ↗
                      </a>
                    ) : (
                      <p className="font-body text-sm font-medium" style={{ color: "var(--text)" }}>
                        {cert.name}
                      </p>
                    )}
                    <p className="font-body text-xs" style={{ color: "var(--muted)" }}>
                      {cert.issuer}
                      {cert.year ? ` · ${cert.year}` : ""}
                      {cert.inProgress && (
                        <span className="ml-2" style={{ color: "var(--accent)" }}>
                          In progress
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
