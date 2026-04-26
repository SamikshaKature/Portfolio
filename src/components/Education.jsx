import { motion } from 'framer-motion'
import { content } from '../data/content.js'

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Education() {
  const { degrees, certifications } = content.education

  return (
    <section id="education" className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="content-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">Academic</p>
          <h2 className="section-heading mb-12">Education.</h2>
        </motion.div>

        {/* Degree cards */}
        <div className="space-y-6 mb-12">
          {degrees.map((deg, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="p-6 rounded-lg"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
                    {deg.degree}
                  </h3>
                  <p className="font-body text-base font-medium" style={{ color: 'var(--accent)' }}>
                    {deg.school}
                  </p>
                </div>
                <div className="text-right">
                  <p className="section-label">{deg.dates}</p>
                  <p className="section-label mt-0.5">{deg.location}</p>
                </div>
              </div>

              {/* Minors */}
              {deg.minors?.length > 0 && (
                <p className="font-body text-sm mb-3" style={{ color: 'var(--muted)' }}>
                  Minors: {deg.minors.join(' · ')}
                </p>
              )}

              {/* Honor pills */}
              {deg.honors?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {deg.honors.map((h, j) => (
                    <span
                      key={j}
                      className="font-body text-xs px-3 py-1 rounded-full"
                      style={{
                        border: '1px solid var(--accent)',
                        color: 'var(--accent)',
                        background: 'rgba(201,168,76,0.06)',
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="section-label mb-6">Certifications</p>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-3 px-4 rounded"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
                >
                  <span className="text-base" aria-hidden="true">◎</span>
                  <div>
                    <p className="font-body text-sm font-medium" style={{ color: 'var(--text)' }}>
                      {cert.name}
                    </p>
                    <p className="font-body text-xs" style={{ color: 'var(--muted)' }}>
                      {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
