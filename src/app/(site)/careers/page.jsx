import React from "react";
import { getOpenJobs } from "@/sanity/lib/queries";
import { SEO, canonical } from "@/lib/seo";
import CareersHero from "@/components/careers/CareersHero";
import CultureSection from "@/components/careers/CultureSection";
import JobList from "@/components/careers/JobList";
import ContactCTA from "@/components/ui/ContactCTA";
import {
  Target,
  Heart,
  Monitor,
  Coffee,
  TrendingUp,
  Shield,
} from "lucide-react";
import Tag from "@/components/ui/Tag";

export const metadata = {
  title: "Careers — Join the Wefik Team",
  description:
    "Explore open roles at Wefik — Kolkata's digital agency. Join our team and help build premium web experiences, brands, and digital products for clients across India.",
  keywords: [
    "wefik jobs",
    "digital agency jobs Kolkata",
    "web designer jobs India",
    "web developer jobs Kolkata",
    "UI UX designer jobs India",
    "branding jobs India",
    "digital marketing jobs Kolkata",
  ],
  alternates: { canonical: canonical("/careers") },
  openGraph: {
    type: "website",
    url: canonical("/careers"),
    title: `Careers | ${SEO.siteName}`,
    description:
      "Join Wefik — Kolkata's digital agency. Explore open roles and help shape the future of digital experiences in India.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Careers at WEFIK",
      },
    ],
  },
};

export default async function CareersPage() {
  const jobs = await getOpenJobs();

  const careersPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SEO.domain}/careers/#webpage`,
    url: canonical("/careers"),
    name: `Careers | ${SEO.siteName}`,
    description: "Open roles at Wefik — Kolkata's digital agency.",
    isPartOf: { "@id": `${SEO.domain}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SEO.domain },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: canonical("/careers"),
        },
      ],
    },
  };

  const perks = [
    {
      title: "Health & Wellness",
      body: "Comprehensive premium health coverage for you and your family.",
      icon: Heart,
    },
    {
      title: "Learning Budget",
      body: "Annual stipend for courses, conferences, and certifications.",
      icon: TrendingUp,
    },
    {
      title: "Tech Setup",
      body: "We provide $3k for your ideal home office and latest gear.",
      icon: Monitor,
    },
    {
      title: "Flexible Hours",
      body: "Results-driven culture. Work when you are most productive.",
      icon: Coffee,
    },
    {
      title: "Success Sharing",
      body: "Quarterly bonuses tied to company milestones and growth.",
      icon: Target,
    },
    {
      title: "Insurance",
      body: "Full dental, vision, and life insurance coverage globally.",
      icon: Shield,
    },
  ];

  return (
    <main className="bg-bg-primary min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersPageSchema) }}
      />
      <CareersHero />

      {}
      <CultureSection />

      {}
      <div className="bg-bg-secondary/30">
        <JobList jobs={jobs} />
      </div>

      {}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-40">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-6 text-center">
            <Tag>The Benefits</Tag>
            <h2 className="font-big text-text-primary text-4xl leading-none font-black tracking-tight uppercase md:text-6xl lg:text-7xl">
              Perks of Joining.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="group border-border bg-bg-secondary hover:bg-bg-primary flex flex-col gap-6 rounded-[2rem] border p-8 transition-all"
              >
                <div className="bg-accent/5 text-accent group-hover:bg-accent flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:text-black">
                  <perk.icon size={20} />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-big text-text-primary text-xl font-bold tracking-tight uppercase">
                    {perk.title}
                  </h4>
                  <p className="font-body text-text-muted text-sm leading-relaxed">
                    {perk.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
