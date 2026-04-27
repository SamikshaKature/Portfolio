"use client";

import { PaletteProvider, usePalette } from "@/components/PaletteContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Thin client wrapper that keeps layout.tsx a pure Server Component.
// PaletteProvider owns open/close state; Nav and Hero consume it via
// usePalette() so ⌘K works from both places.
// Phase 5 will add CommandPalette, CustomCursor, IntroScreen, SectionCounter.

function Shell({ children }: { children: React.ReactNode }) {
  const { openPalette } = usePalette();
  return (
    <>
      <Nav onOpenPalette={openPalette} />
      <main id="main">{children}</main>
      <Footer />
      {/* Phase 5: <CommandPalette /> */}
      {/* Phase 5: <CustomCursor /> */}
      {/* Phase 5: <IntroScreen /> */}
      {/* Phase 5: <SectionCounter /> */}
    </>
  );
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <PaletteProvider>
      <Shell>{children}</Shell>
    </PaletteProvider>
  );
}
