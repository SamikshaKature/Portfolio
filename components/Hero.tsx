"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { site } from "@/content/site";
import { dur, ease } from "@/lib/motion";

export default function Hero({
  onOpenPalette,
}: {
  onOpenPalette?: () => void;
}) {
  const [showIndicator, setShowIndicator] = useState(true);
  const [localTime, setLocalTime]         = useState("");
  const [dotPos, setDotPos]               = useState({ x: 0, y: 0 });
  const [mouseHighlight, setMouseHighlight] = useState({ x: 0, y: 0, visible: false });
  const [dotGrid, setDotGrid]             = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef     = useRef<number>(0);

  const typeSequence = site.rotatingTitles.flatMap((t) => [t, 2200]);

  // Local time, updates every minute
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: site.meta.locationTimezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
    setLocalTime(fmt());
    const id = setInterval(() => setLocalTime(fmt()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Scroll indicator disappears on first scroll
  useEffect(() => {
    const handler = () => setShowIndicator(false);
    window.addEventListener("scroll", handler, { once: true, passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Mouse parallax + radial highlight (skip on reduced-motion / touch)
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
  const isTouch =
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: coarse)").matches
      : false;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced || isTouch) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 → 0.5
        const cy = (e.clientY - rect.top)  / rect.height - 0.5;
        setDotGrid({ x: cx * 12, y: cy * 12 }); // max 12px parallax
        setMouseHighlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
      });
    },
    [prefersReduced, isTouch],
  );

  const handleMouseLeave = useCallback(() => {
    setMouseHighlight((p) => ({ ...p, visible: false }));
  }, []);

  // Pulsing dot animation
  useEffect(() => {
    let t = 0;
    const tick = () => {
      t += 0.04;
      setDotPos({ x: Math.sin(t) * 2, y: Math.cos(t * 0.7) * 2 });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="gradient-blob-1 absolute w-[600px] h-[600px] rounded-full -top-32 -right-32"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="gradient-blob-2 absolute w-[500px] h-[500px] rounded-full -bottom-24 -left-24"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
        />

        {/* Dot-grid SVG with parallax */}
        <svg
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          style={{
            opacity: 0.04,
            transform: `translate(${dotGrid.x}px, ${dotGrid.y}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="var(--accent)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>

        {/* Radial mouse highlight */}
        {!prefersReduced && !isTouch && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
              mixBlendMode: "screen",
              pointerEvents: "none",
              left: mouseHighlight.x - 300,
              top:  mouseHighlight.y - 300,
              opacity: mouseHighlight.visible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </div>

      <div className="content-width w-full text-center relative">
        {/* Top-left metadata strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.sm, ease, delay: 0.2 }}
          className="absolute top-0 left-0 hidden md:flex items-center gap-2 section-label"
          style={{ transform: "translateY(-120%)" }}
          aria-label="Location and local time"
        >
          <span>WEST DEPTFORD, NJ</span>
          {localTime && (
            <>
              <span style={{ color: "var(--border)" }}>·</span>
              <span style={{ color: "var(--accent-2)" }}>{localTime}</span>
            </>
          )}
        </motion.div>

        {/* Top-right status pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.sm, ease, delay: 0.2 }}
          className="absolute top-0 right-0 hidden md:flex items-center gap-2 section-label"
          style={{ transform: "translateY(-120%)" }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "#4ade80",
              boxShadow: "0 0 0 3px rgba(74,222,128,0.2)",
              animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
              transform: `translate(${dotPos.x}px, ${dotPos.y}px)`,
            }}
            aria-hidden="true"
          />
          <span style={{ color: "var(--text-soft)" }}>
            Open to data / strategy / product roles · H-1B sponsorship
          </span>
        </motion.div>

        {/* "Hi, I'm" */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.sm, ease }}
          className="section-label mb-4"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.md, ease, delay: 0.1 }}
          className="font-display font-semibold leading-none mb-6"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", color: "var(--text)" }}
        >
          {site.meta.name}
        </motion.h1>

        {/* Typed rotating title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.sm, delay: 0.8 }}
          className="font-body text-xl md:text-2xl mb-4"
          style={{ color: "var(--muted)" }}
        >
          I&apos;m a{" "}
          <TypeAnimation
            sequence={typeSequence}
            wrapper="span"
            speed={55}
            deletionSpeed={70}
            repeat={Infinity}
            style={{ color: "var(--accent)" }}
          />
        </motion.p>

        {/* Static tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.sm, delay: 0.9 }}
          className="section-label mb-10"
        >
          {site.meta.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.sm, delay: 1.2 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a href={site.meta.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label="Download resume PDF (opens in new tab)">
            Download Resume
          </a>
          <a
            href={site.meta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            LinkedIn ↗
          </a>
          <button
            onClick={onOpenPalette}
            className="btn-ghost"
            aria-label="Open command palette"
          >
            ⌘K to navigate
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: dur.md }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="block text-2xl select-none"
              style={{ color: "var(--muted)" }}
            >
              ↓
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
