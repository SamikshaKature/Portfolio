"use client";

import dynamic from "next/dynamic";
import { PaletteProvider, usePalette } from "@/components/PaletteContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionCounter from "@/components/SectionCounter";

// Lazy-load heavy interactive components
const IntroScreen     = dynamic(() => import("@/components/IntroScreen"),     { ssr: false });
const CommandPalette  = dynamic(() => import("@/components/CommandPalette"),  { ssr: false });
const CustomCursor    = dynamic(() => import("@/components/CustomCursor"),    { ssr: false });

function Shell({ children }: { children: React.ReactNode }) {
  const { openPalette } = usePalette();
  return (
    <>
      <Nav onOpenPalette={openPalette} />
      <main id="main">{children}</main>
      <Footer />
      <SectionCounter />
      <IntroScreen />
      <CommandPalette />
      <CustomCursor />
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
