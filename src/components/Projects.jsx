import { motion } from 'framer-motion'
import { content } from '../data/content.js'

export default function Projects() {
  return (
    <section id="projects" className="section-pad" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="content-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">Work</p>
          <h2 className="section-heading mb-12">Projects.</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {content.projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const Wrapper = project.link ? 'a' : 'div'
  const linkProps = project.link
    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      <Wrapper
        {...linkProps}
        className="relative block p-6 rounded-lg h-full transition-all duration-200 group"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,76,0.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
        aria-label={project.link ? `${project.title} (opens in new tab)` : project.title}
      >
        {/* External link indicator */}
        {project.link && (
          <span
            className="absolute top-4 right-4 text-sm transition-colors"
            style={{ color: 'var(--muted)' }}
            aria-hidden="true"
          >
            ↗
          </span>
        )}

        {/* Title */}
        <h3 className="font-body text-base font-semibold mb-3 pr-6" style={{ color: 'var(--text)' }}>
          {project.title}
        </h3>

        {/* Description — 3-line clamp */}
        <p
          className="font-body text-sm mb-5"
          style={{
            color: 'var(--muted)',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, j) => (
            <span key={j} className="skill-tag">
              {tag}
            </span>
          ))}
        </div>
      </Wrapper>
    </motion.div>
  )
}
