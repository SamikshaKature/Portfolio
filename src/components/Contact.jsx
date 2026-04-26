import { motion } from 'framer-motion'
import { content } from '../data/content.js'

export default function Contact() {
  return (
    <section id="contact" className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="content-width">
        <motion.div
          className="text-center max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-4">Get in touch</p>
          <h2 className="section-heading mb-6">Let's connect.</h2>
          <p className="font-body text-sm mb-12" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            I'm open to data analytics, strategy, and product roles that offer H-1B sponsorship.
            Always happy to talk about ML, industrial systems, or building things.
          </p>

          {/* Icon link row */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${content.email}`}
              className="btn-ghost"
              aria-label="Send email"
            >
              <span aria-hidden="true">✉</span> Email
            </a>
            <a
              href={content.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <span aria-hidden="true">in</span> LinkedIn ↗
            </a>
            <a
              href={content.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="GitHub profile (opens in new tab)"
            >
              <span aria-hidden="true">⌥</span> GitHub ↗
            </a>
            <a
              href={content.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              aria-label="Download resume PDF (opens in new tab)"
            >
              Resume PDF ↓
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <p
          className="text-center font-body mt-24"
          style={{ color: 'var(--muted)', fontSize: '13px' }}
        >
          © {new Date().getFullYear()} {content.name}
        </p>
      </div>
    </section>
  )
}
