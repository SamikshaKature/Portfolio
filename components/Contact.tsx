"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { fadeUp } from "@/lib/motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="content-width">
        <motion.div
          className="text-center max-w-xl mx-auto"
          {...fadeUp()}
        >
          <p className="section-label mb-4">Get in touch</p>
          <h2 className="section-heading mb-6">Let&apos;s connect.</h2>
          <p className="font-body text-sm mb-12" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            I&apos;m open to data analytics, strategy, and product roles that offer H-1B sponsorship.
            Always happy to talk about ML, industrial systems, or building things.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`mailto:${site.meta.email}`} className="btn-ghost" aria-label="Send email">
              <span aria-hidden="true">✉</span> Email
            </a>
            <a
              href={site.meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <span aria-hidden="true">in</span> LinkedIn ↗
            </a>
            <a
              href={site.meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="GitHub profile (opens in new tab)"
            >
              <span aria-hidden="true">⌥</span> GitHub ↗
            </a>
            <a
              href={site.meta.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              aria-label="Download resume PDF (opens in new tab)"
            >
              Resume PDF ↓
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
