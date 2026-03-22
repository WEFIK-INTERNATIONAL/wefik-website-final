import { SEO, canonical } from "@/lib/seo";

export const metadata = {
  title: "About Us — Our Story & Values",
  description:
    "Learn about Wefik — a Kolkata-based digital agency with 3+ years of experience delivering premium web design, development, and branding for 60+ clients across India.",
  keywords: [
    "about wefik",
    "digital agency Kolkata",
    "web agency India",
    "Sk Shahinur Islam",
    "wefik team",
    "wefik agency story",
  ],
  alternates: { canonical: canonical("/agency") },
  openGraph: {
    type: "website",
    url: canonical("/agency"),
    title: `About Us | ${SEO.siteName}`,
    description:
      "3+ years. 60+ projects. 40+ happy clients. Meet the Wefik team and learn how we build digital experiences that matter.",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: `About WEFIK` },
    ],
  },
};

export default function AgencyLayout({ children }) {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SEO.domain}/agency/#webpage`,
    url: canonical("/agency"),
    name: `About Us | ${SEO.siteName}`,
    description:
      "Wefik is a Kolkata-based digital agency building premium web and brand experiences.",
    isPartOf: { "@id": `${SEO.domain}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SEO.domain },
        {
          "@type": "ListItem",
          position: 2,
          name: "Agency",
          item: canonical("/agency"),
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {children}
    </>
  );
}
