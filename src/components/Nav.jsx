import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '../data/content.js'

const NAV_LINKS = [
  { label: 'About',      id: 'about'      },
  { label: 'Experience', id: 'experience' },
  { label: 'Education',  id: 'education'  },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Contact',    id: 'contact'    },
]

export default function Nav() {
  const [active, setActive]     = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Blur backdrop appears after first scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.80)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="content-width flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl font-semibold transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}
            aria-label="Back to top"
          >
            {content.nameShort}
          </button>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative section-label transition-colors"
                style={{ color: active === id ? 'var(--accent)' : 'var(--muted)' }}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-1 transition-opacity hover:opacity-70"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-px w-6"
              style={{ background: 'var(--text)' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-6"
              style={{ background: 'var(--text)' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-px w-6"
              style={{ background: 'var(--text)' }}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b"
            style={{
              background: 'rgba(10,10,15,0.96)',
              backdropFilter: 'blur(12px)',
              borderColor: 'var(--border)',
            }}
          >
            <nav aria-label="Mobile navigation" className="content-width py-6 flex flex-col gap-5">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left section-label transition-colors"
                  style={{ color: active === id ? 'var(--accent)' : 'var(--muted)' }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
