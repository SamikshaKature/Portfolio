"use client";

import { createContext, useContext, useState, useCallback } from "react";

type PaletteContextValue = {
  open: boolean;
  openPalette: () => void;
  closePalette: () => void;
};

const PaletteContext = createContext<PaletteContextValue>({
  open: false,
  openPalette: () => {},
  closePalette: () => {},
});

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openPalette  = useCallback(() => setOpen(true),  []);
  const closePalette = useCallback(() => setOpen(false), []);
  return (
    <PaletteContext.Provider value={{ open, openPalette, closePalette }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  return useContext(PaletteContext);
}
