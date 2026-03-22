import { SEO, canonical } from "@/lib/seo";

export const metadata = {
  title: "Our Services — Web Design, Development & More",
  description:
    "Explore Wefik's full range of digital services: Web Design, Web Development, UI/UX Design, Branding, Digital Marketing, Shopify Development, and WordPress Development — all under one roof in Kolkata, India.",
  keywords: [
    "web design services India",
    "web development services Kolkata",
    "UI UX design agency India",
    "branding services Kolkata",
    "Shopify development agency India",
    "WordPress development India",
    "digital marketing Kolkata",
    "wefik services",
  ],
  alternates: { canonical: canonical("/expertise") },
  openGraph: {
    type: "website",
    url: canonical("/expertise"),
    title: `Our Services | ${SEO.siteName}`,
    description:
      "Web Design, Development, UI/UX, Branding, Shopify, WordPress & Digital Marketing — Wefik delivers end-to-end digital solutions for businesses across India.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `WEFIK Services`,
      },
    ],
  },
};

export default function ExpertiseLayout({ children }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SEO.domain}/expertise/#webpage`,
    url: canonical("/expertise"),
    name: `Our Services | ${SEO.siteName}`,
    description:
      "End-to-end digital services from Wefik — Kolkata's premium digital agency.",
    isPartOf: { "@id": `${SEO.domain}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SEO.domain },
        {
          "@type": "ListItem",
          position: 2,
          name: "Expertise",
          item: canonical("/expertise"),
        },
      ],
    },

    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Web Design",
          url: canonical("/expertise"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Web Development",
          url: canonical("/expertise"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "UI/UX Design",
          url: canonical("/expertise"),
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Branding",
          url: canonical("/expertise"),
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Digital Marketing",
          url: canonical("/expertise"),
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Shopify Development",
          url: canonical("/expertise"),
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "WordPress Development",
          url: canonical("/expertise"),
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
