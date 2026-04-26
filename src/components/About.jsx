import { motion } from 'framer-motion'
import { content } from '../data/content.js'

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function About() {
  const { bio, photoPlaceholder, photoUrl, currently } = content.about

  return (
    <section id="about" className="section-pad">
      <div className="content-width">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          <p className="section-label">About</p>
          <h2 className="section-heading mb-12">Who I am.</h2>
        </motion.div>

        <div className="flex flex-col-reverse md:flex-row gap-12 items-start">
          {/* Text column — 60% */}
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
          >
            <p className="font-body text-[15px] leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              {bio}
            </p>

            {/* Currently */}
            <div className="mb-8">
              <p className="section-label mb-4">Currently</p>
              <ul className="space-y-2">
                {currently.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm" style={{ color: 'var(--muted)' }}>
                    <span style={{ color: 'var(--accent)' }} className="mt-0.5 flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${content.email}`}
                className="btn-ghost text-xs"
                aria-label="Send email"
              >
                ✉ {content.email}
              </a>
              <a
                href={content.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                LinkedIn ↗
              </a>
              <a
                href={content.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs"
                aria-label="GitHub profile (opens in new tab)"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>

          {/* Photo column — 40% */}
          <motion.div
            className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {photoPlaceholder || !photoUrl ? (
              <div
                className="w-56 h-56 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'var(--surface)',
                  border: '2px solid var(--accent)',
                }}
                aria-label="Profile photo placeholder"
              >
                <span
                  className="font-display text-5xl font-semibold"
                  style={{ color: 'var(--accent)' }}
                >
                  {content.nameShort}
                </span>
              </div>
            ) : (
              <img
                src={photoUrl}
                alt={`${content.name} profile photo`}
                className="w-56 h-56 rounded-full object-cover flex-shrink-0"
                style={{ border: '2px solid var(--accent)' }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
