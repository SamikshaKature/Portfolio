"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { fadeUp, stagger, item } from "@/lib/motion";
import type { Tier } from "@/content/site";

const TIER_LABELS: Record<Tier, string> = {
  1: "Daily",
  2: "Working",
  3: "Familiar",
};

function TierDots({ tier }: { tier: Tier }) {
  return (
    <span
      className="inline-flex gap-0.5 mr-1.5"
      title={TIER_LABELS[tier]}
      aria-label={`Proficiency: ${TIER_LABELS[tier]}`}
    >
      {([1, 2, 3] as Tier[]).map((t) => (
        <span
          key={t}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: t <= tier ? "var(--accent)" : "var(--border)",
          }}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function Skills() {
  const { technical, competencies, research } = site.skills;

  return (
    <section
      id="skills"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="content-width">
        <motion.div {...fadeUp()}>
          <p className="section-label">Capabilities</p>
          <h2 className="section-heading mb-12">Skills.</h2>
        </motion.div>

        {/* ── Block 1: Technical ── */}
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <h3 className="section-label mb-8">Technical</h3>
          <div className="space-y-8">
            {technical.map((group, gi) => (
              <div key={gi}>
                <p
                  className="font-body text-xs font-medium mb-4"
                  style={{ color: "var(--muted)", letterSpacing: "0.05em" }}
                >
                  {group.category}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  {...stagger(0.03)}
                >
                  {group.items.map((skill, si) => (
                    <motion.span
                      key={si}
                      variants={item}
                      className="skill-tag flex items-center"
                    >
                      <TierDots tier={skill.tier} />
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Block 2: Core Competencies ── */}
        <motion.div {...fadeUp(0.1)} className="mb-14">
          <h3 className="section-label mb-4">Core Competencies</h3>
          <p
            className="font-body text-sm italic mb-5"
            style={{ color: "var(--muted)" }}
          >
            Where I&apos;m strongest end-to-end:
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
            {competencies.map((c, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="font-body text-sm" style={{ color: "var(--text-soft)" }}>
                  {c}
                </span>
                {i < competencies.length - 1 && (
                  <span style={{ color: "var(--accent)" }} aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Block 3: Research Interests ── */}
        <motion.div {...fadeUp(0.15)}>
          <h3 className="section-label mb-6">Research Interests</h3>
          <ul className="space-y-2">
            {research.map((r, i) => (
              <li
                key={i}
                className="flex items-center gap-2 font-body text-sm italic"
                style={{ color: "var(--accent-2)" }}
              >
                <span aria-hidden="true" style={{ color: "var(--accent-2)" }}>◦</span>
                {r}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
