import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title  = searchParams.get("title");
  const kind   = searchParams.get("kind") as "project" | "note" | null;

  // Default OG: name + tagline on dark with accent gradient
  if (!title) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
            padding: "80px",
            background: "#0A0A0F",
            fontFamily: "sans-serif",
          }}
        >
          {/* Accent gradient blob */}
          <div
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
            }}
          />
          <p style={{ fontSize: 18, color: "#888899", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            samikshakature.xyz
          </p>
          <h1 style={{ fontSize: 72, fontWeight: 700, color: "#F0F0F0", lineHeight: 1.1, margin: 0, marginBottom: 20 }}>
            Samiksha Kature
          </h1>
          <p style={{ fontSize: 26, color: "#C9A84C", margin: 0 }}>
            Commercial Analyst · Data Scientist · Builder
          </p>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }

  // Per-page OG: title + kind label
  const kindLabel = kind === "project" ? "Project" : kind === "note" ? "Note" : "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "#0A0A0F",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />
        {kindLabel && (
          <p style={{ fontSize: 16, color: "#C9A84C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            {kindLabel}
          </p>
        )}
        <h1 style={{ fontSize: 58, fontWeight: 700, color: "#F0F0F0", lineHeight: 1.15, margin: 0, marginBottom: 32, maxWidth: 900 }}>
          {title}
        </h1>
        <p style={{ fontSize: 18, color: "#888899", margin: 0 }}>
          Samiksha Kature · samikshakature.xyz
        </p>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
