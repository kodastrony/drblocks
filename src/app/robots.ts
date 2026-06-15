import type { MetadataRoute } from "next";

// allow generation under `output: export`
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://drblocks.pl/sitemap.xml",
  };
}
