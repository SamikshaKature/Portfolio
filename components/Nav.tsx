"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";
import { usePalette } from "@/components/PaletteContext";

const HOME_SECTIONS = [
  { label: "About",      id: "about"      },
  { label: "Experience", id: "experience" },
  { label: "Education",  id: "education"  },
  { label: "Skills",     id: "skills"     },
  { label: "Projects",   id: "projects"   },
  { label: "Contact",    id: "contact"    },
];

export default function Nav({
  onOpenPalette: onOpenPaletteProp,
}: {
  onOpenPalette?: () => void;
}) {
  const { openPalette: openPaletteCtx } = usePalette();
  const onOpenPalette = onOpenPaletteProp ?? openPaletteCtx;
  const pathname  = usePathname();
  const isHome    = pathname === "/";
  const [active,   setActive]   = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Active-section highlighting via IntersectionObserver (home only)
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    HOME_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      {/* 1px scroll progress line */}
      <ScrollProgressLine />

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:    scrolled ? "rgba(10,10,15,0.80)" : "transparent",
          backdropFilter:scrolled ? "blur(12px)"          : "none",
          borderBottom:  scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="content-width flex items-center justify-between h-16">
          {/* Logo */}
          {isHome ? (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display text-xl font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
              aria-label="Back to top"
            >
              {site.meta.nameShort}
            </button>
          ) : (
            <Link
              href="/"
              className="font-display text-xl font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              {site.meta.nameShort}
            </Link>
          )}

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
            {isHome ? (
              HOME_SECTIONS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="relative section-label transition-colors"
                  style={{ color: active === id ? "var(--accent)" : "var(--muted)" }}
                >
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </button>
              ))
            ) : (
              <>
                <Link
                  href="/#about"
                  className="section-label transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--muted)" }}
                >
                  ← Home
                </Link>
                <Link href="/now"      className="section-label transition-colors hover:text-[var(--accent)]" style={{ color: "var(--muted)" }}>Now</Link>
                <Link href="/projects" className="section-label transition-colors hover:text-[var(--accent)]" style={{ color: "var(--muted)" }}>Projects</Link>
                <Link href="/notes"    className="section-label transition-colors hover:text-[var(--accent)]" style={{ color: "var(--muted)" }}>Notes</Link>
              </>
            )}

            {/* ⌘K chip */}
            <button
              onClick={onOpenPalette}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors"
              style={{
                border:  "1px solid var(--border)",
                color:   "var(--muted)",
                background: "transparent",
              }}
              aria-label="Open command palette (⌘K)"
            >
              <Kbd>⌘K</Kbd>
            </button>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-1 transition-opacity hover:opacity-70"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 }  : { rotate: 0, y: 0 }} className="block h-px w-6" style={{ background: "var(--text)" }} />
            <motion.span animate={menuOpen ? { opacity: 0 }        : { opacity: 1 }}       className="block h-px w-6" style={{ background: "var(--text)" }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 }: { rotate: 0, y: 0 }} className="block h-px w-6" style={{ background: "var(--text)" }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b"
            style={{ background: "rgba(10,10,15,0.96)", backdropFilter: "blur(12px)", borderColor: "var(--border)" }}
          >
            <nav aria-label="Mobile navigation" className="content-width py-6 flex flex-col gap-5">
              {isHome ? (
                HOME_SECTIONS.map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left section-label transition-colors"
                    style={{ color: active === id ? "var(--accent)" : "var(--muted)" }}
                  >
                    {label}
                  </button>
                ))
              ) : (
                <>
                  <Link href="/"         className="section-label" style={{ color: "var(--muted)" }}>← Home</Link>
                  <Link href="/now"      className="section-label" style={{ color: "var(--muted)" }}>Now</Link>
                  <Link href="/projects" className="section-label" style={{ color: "var(--muted)" }}>Projects</Link>
                  <Link href="/notes"    className="section-label" style={{ color: "var(--muted)" }}>Notes</Link>
                </>
              )}
              <button
                onClick={() => { onOpenPalette?.(); setMenuOpen(false); }}
                className="text-left section-label transition-colors"
                style={{ color: "var(--muted)" }}
              >
                ⌘K — Command palette
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Inline scroll-progress line so it shares the same fixed stacking context
function ScrollProgressLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-px transition-none"
      style={{ width: `${progress}%`, background: "var(--accent)" }}
      aria-hidden="true"
    />
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="font-mono text-[10px] px-1 py-0.5 rounded"
      style={{ background: "var(--surface-2)", color: "var(--muted)", border: "1px solid var(--border)" }}
    >
      {children}
    </kbd>
  );
}
