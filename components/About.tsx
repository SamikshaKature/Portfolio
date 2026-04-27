"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { site } from "@/content/site";
import { fadeUp, stagger, item } from "@/lib/motion";

type IconName = keyof typeof LucideIcons;

function DynamicIcon({ name, size = 16 }: { name: string; size?: number }) {
  const Icon = LucideIcons[name as IconName] as React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: string }> | undefined;
  if (!Icon) return null;
  return <Icon size={size} className="flex-shrink-0" aria-hidden="true" />;
}

export default function About() {
  const { overview, beyondWork, currentlyTeaser, photoPlaceholder, photoUrl } = site.about;

  return (
    <section id="about" className="section-pad">
      <div className="content-width">
        <motion.div {...fadeUp()}>
          <p className="section-label">About</p>
          <h2 className="section-heading mb-12">Who I am.</h2>
        </motion.div>

        <div className="flex flex-col-reverse md:flex-row gap-12 items-start">
          {/* Text column */}
          <div className="flex-1 space-y-12">
            {/* Overview */}
            <motion.div {...fadeUp(0.05)}>
              <h3 className="section-label mb-4">Overview</h3>
              <p className="font-body text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {overview}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a href={`mailto:${site.meta.email}`} className="btn-ghost text-xs" aria-label="Send email">
                  ✉ {site.meta.email}
                </a>
                <a href={site.meta.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs" aria-label="LinkedIn (opens in new tab)">
                  LinkedIn ↗
                </a>
                <a href={site.meta.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs" aria-label="GitHub (opens in new tab)">
                  GitHub ↗
                </a>
              </div>
            </motion.div>

            {/* Beyond Work */}
            <motion.div {...fadeUp(0.1)}>
              <h3 className="section-label mb-4">Beyond Work</h3>
              <motion.ul className="space-y-3" {...stagger(0.07)}>
                {beyondWork.map((b, i) => (
                  <motion.li
                    key={i}
                    variants={item}
                    className="flex items-start gap-3 font-body text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    <span style={{ color: "var(--accent)" }} className="mt-0.5">
                      <DynamicIcon name={b.icon} size={15} />
                    </span>
                    <span>{b.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Currently */}
            <motion.div {...fadeUp(0.15)}>
              <h3 className="section-label mb-4">Currently</h3>
              <ul className="space-y-2 mb-4">
                {currentlyTeaser.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm" style={{ color: "var(--muted)" }}>
                    <span style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0">→</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/now"
                className="font-body text-sm transition-colors hover:text-[var(--accent-hover)]"
                style={{ color: "var(--accent)" }}
              >
                See full /now →
              </Link>
            </motion.div>
          </div>

          {/* Photo column */}
          <motion.div
            className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-56 h-56">
              {/* Orbital ring */}
              <div
                className="orbital-ring absolute inset-[-8px] rounded-full pointer-events-none"
                style={{ border: "1px dashed var(--border)" }}
                aria-hidden="true"
              />
              {photoPlaceholder || !photoUrl ? (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: "var(--surface)", border: "2px solid var(--accent)" }}
                  aria-label="Profile photo placeholder"
                >
                  <span className="font-display text-5xl font-semibold" style={{ color: "var(--accent)" }}>
                    {site.meta.nameShort}
                  </span>
                </div>
              ) : (
                <img
                  src={photoUrl}
                  alt={`${site.meta.name} profile photo`}
                  className="w-full h-full rounded-full object-cover"
                  style={{ border: "2px solid var(--accent)" }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
