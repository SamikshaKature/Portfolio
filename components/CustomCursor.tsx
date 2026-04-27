"use client";

import { useEffect, useRef, useState } from "react";

// Disabled on touch devices and prefers-reduced-motion.
// Uses RAF + CSS variables on the element itself — no React re-renders per frame.
export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "link" | "image" | "click">("default");

  useEffect(() => {
    const isTouch   = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReduced) return;

    setActive(true);
    document.body.style.cursor = "none";

    let outerX = 0, outerY = 0;
    let mouseX = 0, mouseY = 0;
    let rafId  = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      outerX = lerp(outerX, mouseX, 0.12);
      outerY = lerp(outerY, mouseY, 0.12);

      outerRef.current?.style.setProperty("--x", `${outerX}px`);
      outerRef.current?.style.setProperty("--y", `${outerY}px`);
      innerRef.current?.style.setProperty("--x", `${mouseX}px`);
      innerRef.current?.style.setProperty("--y", `${mouseY}px`);

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    const onDown  = () => setCursorState("click");
    const onUp    = () => setCursorState("default");

    const onEnterLink = () => setCursorState("link");
    const onLeaveLink = () => setCursorState("default");
    const onEnterImg  = () => setCursorState("image");
    const onLeaveImg  = () => setCursorState("default");

    const addListeners = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
      document.querySelectorAll("img, [data-cursor='image']").forEach((el) => {
        el.addEventListener("mouseenter", onEnterImg);
        el.addEventListener("mouseleave", onLeaveImg);
      });
    };

    window.addEventListener("mousemove",  onMove,    { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    addListeners();

    // Re-attach on DOM mutations (dynamic content)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      observer.disconnect();
      document.body.style.cursor = "";
    };
  }, []);

  if (!active) return null;

  const isLink  = cursorState === "link";
  const isImage = cursorState === "image";
  const isClick = cursorState === "click";

  return (
    <>
      {/* Outer ring — lerped */}
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width:  isImage ? 64 : 32,
          height: isImage ? 64 : 32,
          borderRadius: "50%",
          border: `1px solid ${isLink ? "var(--accent)" : "var(--accent)"}`,
          background: isLink
            ? "rgba(201,168,76,0.08)"
            : isImage
            ? "rgba(201,168,76,0.06)"
            : "transparent",
          transform: `translate(calc(var(--x, 0px) - 50%), calc(var(--y, 0px) - 50%)) scale(${isClick ? 0.85 : 1})`,
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.2s ease, height 0.2s ease, background 0.15s ease, transform 0.1s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          color: "var(--accent)",
          fontFamily: "var(--font-dm-sans)",
          overflow: "hidden",
        }}
      >
        {isImage && <span style={{ whiteSpace: "nowrap", fontSize: 9 }}>View ↗</span>}
      </div>

      {/* Inner dot — 1:1 */}
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          transform: "translate(calc(var(--x, 0px) - 50%), calc(var(--y, 0px) - 50%))",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
