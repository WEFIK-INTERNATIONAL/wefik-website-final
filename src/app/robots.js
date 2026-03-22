import { SEO } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/_next/", "/studio"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omgilibot",
          "FacebookBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${SEO.domain}/sitemap.xml`,
    host: SEO.domain,
  };
}
