import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionProps {
  /** The always-visible trigger row */
  trigger: React.ReactNode
  /** Content revealed on expand */
  children: React.ReactNode
  defaultOpen?: boolean
}

/**
 * Single accordion item.
 * Uses Framer Motion AnimatePresence to smoothly animate height open/closed.
 * The `+` icon rotates to `×` when open.
 */
export default function Accordion({ trigger, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[#E8E6E3] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full py-5 flex items-start justify-between text-left group"
      >
        <div className="flex-1 min-w-0 pr-4">{trigger}</div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="font-mono text-base text-[#999] group-hover:text-[#0D0D0D] transition-colors flex-shrink-0 mt-0.5 leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
