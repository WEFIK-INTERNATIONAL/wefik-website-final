import { SEO } from "@/lib/seo";

export default function manifest() {
  return {
    name: `${SEO.siteName} — ${SEO.tagline}`,
    short_name: SEO.siteName,
    description: SEO.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#a3e635",
    orientation: "portrait-primary",
    lang: "en-IN",
    scope: "/",
    categories: ["business", "design", "technology"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    shortcuts: [
      {
        name: "Our Works",
        short_name: "Works",
        url: "/works",
        description: "Browse our portfolio",
      },
      {
        name: "Contact Us",
        short_name: "Contact",
        url: "/contact",
        description: "Get in touch with Wefik",
      },
      {
        name: "Careers",
        short_name: "Jobs",
        url: "/careers",
        description: "Join the Wefik team",
      },
    ],
  };
}
