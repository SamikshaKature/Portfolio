import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ContentSectionProps {
  id: string
  title: string
  children: React.ReactNode
}

/**
 * Reusable section wrapper.
 * - Registers `id` as an anchor target for the nav
 * - Fades + slides in once when scrolled into view (fires only once)
 * - Renders a labelled divider above the content
 */
export default function ContentSection({ id, title, children }: ContentSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id={id}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Section label + rule */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-[#999] whitespace-nowrap">
            {title}
          </span>
          <div className="flex-1 h-px bg-[#E8E6E3]" />
        </div>

        {children}
      </motion.div>
    </section>
  )
}
