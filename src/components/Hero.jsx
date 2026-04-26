import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { content } from '../data/content.js'

export default function Hero() {
  const [showIndicator, setShowIndicator] = useState(true)

  useEffect(() => {
    const handler = () => setShowIndicator(false)
    window.addEventListener('scroll', handler, { once: true, passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Build sequence: each title + 2200ms pause
  const typeSequence = content.rotatingTitles.flatMap((title) => [title, 2200])

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      aria-label="Introduction"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="gradient-blob-1 absolute w-[600px] h-[600px] rounded-full -top-32 -right-32"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="gradient-blob-2 absolute w-[500px] h-[500px] rounded-full -bottom-24 -left-24"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="content-width w-full text-center">
        {/* "Hi, I'm" label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="section-label mb-4"
        >
          Hi, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="font-display font-semibold leading-none mb-6"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--text)' }}
        >
          {content.name}
        </motion.h1>

        {/* Typed rotating title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="font-body text-xl md:text-2xl mb-4"
          style={{ color: 'var(--muted)' }}
        >
          I'm a{' '}
          <TypeAnimation
            sequence={typeSequence}
            wrapper="span"
            speed={55}
            deletionSpeed={70}
            repeat={Infinity}
            style={{ color: 'var(--accent)' }}
          />
        </motion.p>

        {/* Static tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="section-label mb-10"
        >
          {content.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href={content.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Download Resume
          </a>
          <a
            href={content.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="block text-2xl select-none"
              style={{ color: 'var(--muted)' }}
            >
              ↓
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
