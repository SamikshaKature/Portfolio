"use client";

import Hero from "@/components/Hero";
import { usePalette } from "@/components/PaletteContext";

// Renders the Hero (client component) alongside the server-rendered sections.
// Using a slot prop keeps all the section components as pure Server Components.
export default function HomePageShell({
  sections,
}: {
  sections: React.ReactNode;
}) {
  const { openPalette } = usePalette();
  return (
    <>
      <Hero onOpenPalette={openPalette} />
      {sections}
    </>
  );
}
