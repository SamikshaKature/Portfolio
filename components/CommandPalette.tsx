"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { site } from "@/content/site";
import { usePalette } from "@/components/PaletteContext";

const NAV_ITEMS = [
  { label: "Home",     href: "/"         },
  { label: "Now",      href: "/now"      },
  { label: "Projects", href: "/projects" },
  { label: "Notes",    href: "/notes"    },
  { label: "Contact",  href: "/#contact" },
];

const PROJECT_ITEMS = site.projects.map((p) => ({
  label: p.title,
  href:  `/projects/${p.slug}`,
}));

export default function CommandPalette() {
  const { open, closePalette } = usePalette();
  const router = useRouter();

  // ⌘K / Ctrl+K global listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Toggle: if open, close; if closed, open is handled by PaletteContext
        // We only need to handle the "open" direction here since Nav/Hero handle it
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navigate = useCallback((href: string) => {
    closePalette();
    router.push(href);
  }, [closePalette, router]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(site.meta.email).catch(() => {});
    closePalette();
  }, [closePalette]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80]"
        style={{ background: "rgba(10,10,15,0.7)", backdropFilter: "blur(4px)" }}
        onClick={closePalette}
        aria-hidden="true"
      />

      {/* Palette */}
      <div
        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[90] w-full"
        style={{ maxWidth: 560 }}
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
      >
        <Command
          className="rounded-lg overflow-hidden"
          style={{
            background: "var(--surface-2)",
            border:     "1px solid var(--accent)",
            boxShadow:  "0 24px 80px rgba(0,0,0,0.5)",
          }}
          onKeyDown={(e) => { if (e.key === "Escape") closePalette(); }}
        >
          <Command.Input
            placeholder="Type a command or search…"
            autoFocus
            style={{
              width: "100%",
              padding: "14px 16px",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 14,
              outline: "none",
            }}
          />

          <Command.List
            style={{ maxHeight: 360, overflowY: "auto", padding: "8px 0" }}
          >
            <Command.Empty
              style={{ padding: "16px", textAlign: "center", color: "var(--muted)", fontFamily: "var(--font-dm-sans)", fontSize: 13 }}
            >
              No results found.
            </Command.Empty>

            {/* Go to */}
            <Command.Group
              heading="Go to"
              style={{ padding: "4px 0" }}
            >
              {NAV_ITEMS.map((nav) => (
                <PaletteItem key={nav.href} onSelect={() => navigate(nav.href)}>
                  {nav.label}
                </PaletteItem>
              ))}
            </Command.Group>

            {/* Projects */}
            <Command.Group heading="Projects">
              {PROJECT_ITEMS.map((p) => (
                <PaletteItem key={p.href} onSelect={() => navigate(p.href)}>
                  {p.label}
                </PaletteItem>
              ))}
            </Command.Group>

            {/* Actions */}
            <Command.Group heading="Actions">
              <PaletteItem onSelect={() => { window.open(site.meta.resumeUrl, "_blank"); closePalette(); }}>
                Download Resume ↓
              </PaletteItem>
              <PaletteItem onSelect={copyEmail}>
                Copy Email
              </PaletteItem>
              <PaletteItem onSelect={() => { window.open(site.meta.linkedin, "_blank"); closePalette(); }}>
                Open LinkedIn ↗
              </PaletteItem>
              <PaletteItem onSelect={() => { window.open(site.meta.github, "_blank"); closePalette(); }}>
                Open GitHub ↗
              </PaletteItem>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </>
  );
}

function PaletteItem({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      style={{
        padding: "10px 16px",
        cursor: "pointer",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 13,
        color: "var(--text-soft)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderRadius: 4,
        margin: "0 4px",
      }}
      className="cmd-item"
    >
      {children}
    </Command.Item>
  );
}
