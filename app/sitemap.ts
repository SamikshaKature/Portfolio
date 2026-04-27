import type { MetadataRoute } from "next";
import { listMdx } from "@/lib/mdx";

const BASE = "https://samikshakature.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = listMdx("projects").map(({ slug }) => slug);
  const noteSlugs    = listMdx("notes").map(({ slug }) => slug);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,             lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/now`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/notes`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const noteRoutes: MetadataRoute.Sitemap = noteSlugs.map((slug) => ({
    url: `${BASE}/notes/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}
