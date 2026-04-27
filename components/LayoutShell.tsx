"use client";

import { useState, useCallback } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Thin client wrapper so layout.tsx stays a Server Component while Nav
// (which needs client hooks for IntersectionObserver + palette open state)
// and Footer live here.
// Phase 5 will add CommandPalette, CustomCursor, IntroScreen, SectionCounter.

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette  = useCallback(() => setPaletteOpen(true),  []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // paletteOpen / closePalette will be threaded into CommandPalette in Phase 5
  void closePalette; // TODO(samiksha): remove once CommandPalette is wired

  return (
    <>
      <Nav onOpenPalette={openPalette} />
      <main id="main">{children}</main>
      <Footer />
      {/* Phase 5: <CommandPalette open={paletteOpen} onClose={closePalette} /> */}
      {/* Phase 5: <CustomCursor /> */}
      {/* Phase 5: <IntroScreen /> */}
      {/* Phase 5: <SectionCounter /> */}
    </>
  );
}
