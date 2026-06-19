import type { MetadataRoute } from "next";
import { getContent } from "@/i18n";
import { locales } from "@/i18n/config";

// allow generation under `output: export`
export const dynamic = "force-static";

const BASE = "https://drblocks.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Slugs are identical across locales — read once from the default dictionary.
  const { products, blog } = getContent("pl");

  // Locale-agnostic routes (paths relative to the locale prefix). The home
  // entry is "" → /<locale>.
  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/oferta", priority: 0.7, freq: "monthly" },
    { path: "/o-nas", priority: 0.7, freq: "monthly" },
    { path: "/zostan-partnerem", priority: 0.7, freq: "monthly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/blog", priority: 0.7, freq: "monthly" },
    { path: "/kontakt", priority: 0.7, freq: "monthly" },
  ];

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const r of staticRoutes) {
      routes.push({
        url: `${BASE}/${locale}${r.path}`,
        lastModified: now,
        changeFrequency: r.freq,
        priority: r.priority,
      });
    }
    for (const p of products.list) {
      routes.push({
        url: `${BASE}/${locale}/oferta/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const post of blog.posts) {
      routes.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return routes;
}
