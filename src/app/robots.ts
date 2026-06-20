import type { MetadataRoute } from "next";

// allow generation under `output: export`
export const dynamic = "force-static";

// Boty wyszukiwarek/asystentów AI — i retrieval (cytowanie na żywo), i trenujące.
// DrBlocks chce maksymalnej widoczności i cytowalności w ChatGPT, Perplexity,
// Gemini/AI Overviews, Claude i Copilot, oraz obecności w modelach, więc jawnie
// WPUSZCZAMY wszystkie. (`User-agent: *` i tak je obejmuje — jawne reguły to
// czytelny sygnał intencji dla GEO/AEO.)
const AI_BOTS = [
  // OpenAI / ChatGPT
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google / Apple (AI surfaces)
  "Google-Extended",
  "Applebot-Extended",
  "Applebot",
  // Microsoft / inne wyszukiwarki i modele
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
  // Common Crawl — zasila wiele modeli/LLM-ów
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://drblocks.pl/sitemap.xml",
    host: "https://drblocks.pl",
  };
}
