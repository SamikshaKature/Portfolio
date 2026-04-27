import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — Samiksha Kature",
    default: "Samiksha Kature — Commercial Analyst & Data Scientist",
  },
  description:
    "Personal portfolio of Samiksha Kature — Commercial Analyst, Data Scientist, and ML enthusiast at Johnson Matthey. Based in West Deptford, NJ.",
  metadataBase: new URL("https://samikshakature.xyz"),
  openGraph: {
    title: "Samiksha Kature",
    description: "Commercial Analyst · Data Scientist · Builder",
    url: "https://samikshakature.xyz",
    siteName: "Samiksha Kature",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samiksha Kature",
    description: "Commercial Analyst · Data Scientist · Builder",
    images: ["/api/og"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* Phase 3: Nav, ScrollProgress go here */}
        <main id="main">{children}</main>
        {/* Phase 3: Footer, CommandPalette, CustomCursor, IntroScreen, SectionCounter go here */}
        {/* Phase 7: Analytics, SpeedInsights go here */}
      </body>
    </html>
  );
}
