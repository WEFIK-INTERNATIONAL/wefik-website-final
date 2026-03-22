import React from "react";
import { getAllWorks } from "@/sanity/lib/queries";
import WorksGallery from "@/components/works/WorksGallery";
import WorksHero from "@/components/works/WorksHero";
import { SEO, canonical } from "@/lib/seo";

export const metadata = {
  title: "Our Works — Selected Projects & Case Studies",
  description:
    "Browse Wefik's portfolio of 60+ projects — premium web design, web development, branding, Shopify stores, and digital experiences delivered for clients across India.",
  keywords: [
    "wefik portfolio",
    "web design portfolio India",
    "web development projects Kolkata",
    "digital agency portfolio",
    "Shopify store design India",
    "branding portfolio India",
  ],
  alternates: { canonical: canonical("/works") },
  openGraph: {
    type: "website",
    url: canonical("/works"),
    title: `Our Works | ${SEO.siteName}`,
    description:
      "60+ projects delivered. Explore Wefik's portfolio of premium web design, development, and branding work.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WEFIK Portfolio",
      },
    ],
  },
};

export default async function WorksPage() {
  const works = await getAllWorks();

  const categories = works.reduce(
    (acc, work) => {
      if (work.category?.title && !acc.includes(work.category.title)) {
        acc.push(work.category.title);
      }
      return acc;
    },
    ["All"]
  );

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SEO.domain}/works/#webpage`,
    url: canonical("/works"),
    name: `Our Works | ${SEO.siteName}`,
    description: "Wefik's portfolio of premium digital projects.",
    isPartOf: { "@id": `${SEO.domain}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SEO.domain },
        {
          "@type": "ListItem",
          position: 2,
          name: "Works",
          item: canonical("/works"),
        },
      ],
    },
  };

  return (
    <main className="bg-bg-primary min-h-screen pt-32 pb-24 md:pt-48">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <WorksHero />
      </div>

      <WorksGallery initialWorks={works} categories={categories} />

      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="bg-accent/5 absolute -top-[10%] -left-[5%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-purple-500/5 blur-[150px]" />
      </div>
    </main>
  );
}
