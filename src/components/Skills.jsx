import { motion } from 'framer-motion'
import { content } from '../data/content.js'

export default function Skills() {
  const { technical, competencies, research } = content.skills

  return (
    <section id="skills" className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="content-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">Capabilities</p>
          <h2 className="section-heading mb-12">Skills.</h2>
        </motion.div>

        {/* Technical skills by category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="section-label mb-8">Technical</p>
          <div className="space-y-8">
            {technical.map((group, gi) => (
              <div key={gi}>
                <p
                  className="font-body text-xs font-medium mb-4"
                  style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}
                >
                  {group.category}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03 } } }}
                >
                  {group.items.map((item, ii) => (
                    <motion.span
                      key={ii}
                      variants={{
                        hidden:  { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                      }}
                      className="skill-tag"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Core competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="section-label mb-6">Core Competencies</p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
            {competencies.map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                  {item}
                </span>
                {i < competencies.length - 1 && (
                  <span style={{ color: 'var(--accent)' }} aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Research interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="section-label mb-6">Research Interests</p>
          <ul className="space-y-2">
            {research.map((item, i) => (
              <li key={i} className="flex items-center gap-2 font-body text-sm italic" style={{ color: 'var(--muted)' }}>
                <span style={{ color: 'var(--muted)' }} aria-hidden="true">◦</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
