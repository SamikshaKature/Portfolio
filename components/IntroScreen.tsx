"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { site } from "@/content/site";
import { Kbd } from "@/components/Nav";

const SESSION_KEY = "sk:intro:seen";

export default function IntroScreen() {
  const [visible, setVisible]           = useState(false);
  const [exiting, setExiting]           = useState(false);
  const [progress, setProgress]         = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    // Animate out, then fully unmount
    setTimeout(() => setVisible(false), 380);
  }, [exiting]);

  useEffect(() => {
    // Must run client-side only
    const seen    = sessionStorage.getItem(SESSION_KEY) === "1";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);

    if (seen) return;

    setVisible(true);

    if (reduced) {
      // Focus the close button immediately for reduced-motion users
      setTimeout(() => closeButtonRef.current?.focus(), 50);
      return;
    }

    // Fill progress bar over 3 s
    const start = Date.now();
    const DURATION = 3000;
    progressRef.current = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100 && progressRef.current) clearInterval(progressRef.current);
    }, 30);

    // Auto-dismiss at 3 s
    autoDismissRef.current = setTimeout(dismiss, DURATION);

    return () => {
      if (progressRef.current)  clearInterval(progressRef.current);
      if (autoDismissRef.current) clearTimeout(autoDismissRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Early-dismiss on scroll / click / keydown / swipe-up
  useEffect(() => {
    if (!visible) return;
    const handler = (e: Event) => {
      if (e.type === "keydown" && (e as KeyboardEvent).key !== "Escape" && (e as KeyboardEvent).key !== " ") return;
      dismiss();
    };
    window.addEventListener("scroll",   dismiss, { once: true, passive: true });
    window.addEventListener("click",    dismiss, { once: true });
    window.addEventListener("keydown",  handler, { once: true });
    return () => {
      window.removeEventListener("scroll",  dismiss);
      window.removeEventListener("click",   dismiss);
      window.removeEventListener("keydown", handler);
    };
  }, [visible, dismiss]);

  // Focus trap while visible
  useEffect(() => {
    if (!visible) return;
    const prev = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => { prev?.focus(); };
  }, [visible]);

  const typeSeq = site.rotatingTitles.flatMap((t) => [t, 1800]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Introduction"
          initial={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "var(--bg)" }}
        >
          {/* Progress bar */}
          {!reducedMotion && (
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border)" }} aria-hidden="true">
              <motion.div
                className="h-full"
                style={{ background: "var(--accent)", width: `${progress}%`, transition: "width 0.03s linear" }}
              />
            </div>
          )}

          {/* Content */}
          <div className="text-center px-6">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0 }}
              className="section-label mb-6"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="font-display font-semibold leading-none mb-6"
              style={{ fontSize: "clamp(64px, 10vw, 120px)", color: "var(--text)" }}
            >
              {site.meta.name}
            </motion.h1>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : 1.0 }}
              className="font-body text-xl md:text-2xl"
              style={{ color: "var(--muted)" }}
            >
              {reducedMotion ? (
                <span style={{ color: "var(--accent)" }}>
                  Commercial Analyst · Data Scientist · Builder
                </span>
              ) : (
                <TypeAnimation
                  sequence={typeSeq}
                  wrapper="span"
                  speed={60}
                  deletionSpeed={70}
                  repeat={Infinity}
                  style={{ color: "var(--accent)" }}
                />
              )}
            </motion.div>
          </div>

          {/* Bottom-right skip chip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.6 }}
            className="absolute bottom-8 right-8"
          >
            <button
              ref={closeButtonRef}
              onClick={dismiss}
              className="flex items-center gap-2 section-label transition-colors hover:text-[var(--text)]"
              style={{ color: "var(--muted)" }}
              aria-label="Skip introduction"
            >
              <Kbd>esc</Kbd>
              <span>to skip</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
