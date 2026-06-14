import type { MetadataRoute } from "next";
import { products, blog } from "@/lib/content";

const BASE = "https://drblocks.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/oferta", "/o-nas", "/faq", "/kontakt", "/blog"];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));

  for (const p of products) {
    routes.push({ url: `${BASE}/oferta/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const post of blog) {
    routes.push({ url: `${BASE}/blog/${post.slug}`, lastModified: now, changeFrequency: "yearly", priority: 0.5 });
  }
  return routes;
}
