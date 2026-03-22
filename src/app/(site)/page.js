import HeroSection from "@/components/home/HeroSection";
import TechTicker from "@/components/home/TechTicker";
import Introduction from "@/components/home/Introduction";
import SelectedWorks from "@/components/home/SelectedWorks";
import Process from "@/components/home/Process";
import Expertise from "@/components/home/Expertise";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import React from "react";
import { getHomeFeaturedWorks } from "@/sanity/lib/queries";
import { SEO, canonical } from "@/lib/seo";

export const metadata = {
  title: {
    absolute: `${SEO.siteName} — ${SEO.tagline}`,
  },
  description:
    "Wefik is Kolkata's leading digital agency. We design & build premium websites, brands, UI/UX, Shopify stores, and digital experiences for startups and businesses across India.",
  keywords: [
    "digital agency Kolkata",
    "web design agency Kolkata",
    "web development company India",
    "UI UX design Kolkata",
    "branding agency India",
    "Shopify development India",
    "wefik",
    "real life genie",
  ],
  alternates: {
    canonical: SEO.domain,
  },
  openGraph: {
    type: "website",
    url: SEO.domain,
    title: `${SEO.siteName} — ${SEO.tagline}`,
    description:
      "Wefik is Kolkata's leading digital agency. Premium web design, development, branding & digital marketing for startups and businesses across India.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SEO.siteName} — ${SEO.tagline}`,
      },
    ],
  },
  twitter: {
    title: `${SEO.siteName} — ${SEO.tagline}`,
    description:
      "Wefik is Kolkata's leading digital agency. Premium web design, development, branding & digital marketing across India.",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SEO.domain}/#website`,
  url: SEO.domain,
  name: SEO.siteName,
  description: SEO.description,
  publisher: { "@id": `${SEO.domain}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SEO.domain}/blogs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SEO.domain}/#localbusiness`,
  name: SEO.siteName,
  image: `${SEO.domain}/opengraph-image`,
  url: SEO.domain,
  telephone: SEO.contact.phone,
  email: SEO.contact.email,
  description: SEO.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.5744,
    longitude: 88.3629,
  },
  areaServed: [
    { "@type": "City", name: "Kolkata" },
    { "@type": "State", name: "West Bengal" },
    { "@type": "Country", name: "India" },
  ],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    SEO.social.linkedin,
    SEO.social.instagram,
    SEO.social.twitter,
    SEO.social.facebook,
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SEO.domain,
    },
  ],
};

export default async function Home() {
  const projects = await getHomeFeaturedWorks();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HeroSection />
      <TechTicker />
      <Introduction />
      <SelectedWorks projects={projects} />
      <Process />
      <Expertise />
      <Testimonials />
      <CTA />
    </>
  );
}
