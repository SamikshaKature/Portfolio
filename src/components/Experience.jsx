import { motion } from 'framer-motion'
import { content } from '../data/content.js'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="content-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">Work</p>
          <h2 className="section-heading mb-16">Experience.</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] top-2 bottom-0 w-px"
            style={{ background: 'var(--accent)', opacity: 0.25 }}
            aria-hidden="true"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {content.experience.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="relative pl-10 pb-16 last:pb-0">
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-[6px] w-3.5 h-3.5 rounded-full"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 0 3px rgba(201,168,76,0.15)' }}
                  aria-hidden="true"
                />

                {/* Header */}
                <div className="mb-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <span className="font-body font-semibold text-base" style={{ color: 'var(--text)' }}>
                      {item.company}
                    </span>
                    {item.division && (
                      <span className="section-label" style={{ color: 'var(--muted)' }}>
                        {item.division}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-sm font-medium mb-1" style={{ color: 'var(--accent)' }}>
                    {item.role}
                  </p>
                  <p className="section-label" style={{ color: 'var(--muted)' }}>
                    {item.location} · {item.dates}
                  </p>
                </div>

                {/* Optional description */}
                {item.description && (
                  <p className="font-body text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                )}

                {/* Bullets */}
                <ul className="space-y-2.5 mb-4">
                  {item.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-3 font-body text-sm" style={{ color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--accent)' }} className="flex-shrink-0 mt-0.5 text-xs">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Upcoming rotation block */}
                {item.upcoming && (
                  <div
                    className="mt-5 p-4 rounded"
                    style={{ border: '1px dashed var(--accent)', background: 'rgba(201,168,76,0.04)' }}
                  >
                    <p className="section-label mb-1.5" style={{ color: 'var(--accent)' }}>
                      Upcoming Rotation
                    </p>
                    <p className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                      {item.upcoming}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
