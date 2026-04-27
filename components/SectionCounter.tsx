"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SECTIONS = ["about", "experience", "education", "skills", "projects", "notes", "press", "contact"];

export default function SectionCounter() {
  const pathname  = usePathname();
  const isHome    = pathname === "/";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = SECTIONS.indexOf(e.target.id);
            if (idx !== -1) setCurrent(idx + 1);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  if (!isHome || current === 0) return null;

  const total = SECTIONS.length;
  const pad   = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="fixed bottom-8 right-6 z-40 hidden md:flex items-center gap-1 font-mono text-xs select-none"
      style={{ color: "var(--muted)" }}
      aria-label={`Section ${current} of ${total}`}
    >
      <span style={{ color: "var(--accent)" }}>{pad(current)}</span>
      <span style={{ color: "var(--border)" }}>/</span>
      <span>{pad(total)}</span>
    </div>
  );
}
