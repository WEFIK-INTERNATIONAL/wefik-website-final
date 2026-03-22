import { SEO, canonical } from "@/lib/seo";

export const metadata = {
  title: "Contact Us — Let's Build Something Together",
  description:
    "Get in touch with Wefik — Kolkata's digital agency. Start your next web design, development, or branding project today. Email: info@wefik.in | Phone: +91 9609653522.",
  keywords: [
    "contact wefik",
    "hire digital agency Kolkata",
    "web design quote India",
    "start a project wefik",
    "wefik contact",
  ],
  alternates: { canonical: canonical("/contact") },
  openGraph: {
    type: "website",
    url: canonical("/contact"),
    title: `Contact Us | ${SEO.siteName}`,
    description:
      "Ready to bring your idea to life? Contact Wefik — Kolkata's digital agency for web design, development, and branding.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `Contact WEFIK`,
      },
    ],
  },
};

export default function ContactLayout({ children }) {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SEO.domain}/contact/#webpage`,
    url: canonical("/contact"),
    name: `Contact Us | ${SEO.siteName}`,
    description: "Get in touch with Wefik.",
    isPartOf: { "@id": `${SEO.domain}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SEO.domain },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: canonical("/contact"),
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
