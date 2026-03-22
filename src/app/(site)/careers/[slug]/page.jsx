import React from "react";
import { notFound } from "next/navigation";
import { getJobBySlug, getOpenJobs } from "@/sanity/lib/queries";
import { format } from "date-fns";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle2,
} from "lucide-react";
import TransitionLink from "@/components/ui/TransitionLink";
import ApplySection from "@/components/careers/ApplySection";
import { SEO, canonical } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};

  const url = canonical(`/careers/${slug}`);
  return {
    title: `${job.title} — We're Hiring`,
    description: job.description
      ? `${job.description.slice(0, 155)}…`
      : `Wefik is hiring a ${job.title} in ${job.location}. Join our Kolkata-based digital agency.`,
    keywords: [
      `${job.title} job India`,
      `${job.type} job Kolkata`,
      "digital agency jobs India",
      "wefik careers",
      "web design jobs Kolkata",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${job.title} | Careers at ${SEO.siteName}`,
      description: job.description ?? `Join Wefik as a ${job.title}.`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${job.title} at WEFIK`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const jobs = await getOpenJobs();
  return jobs.map((job) => ({ slug: job.slug.current }));
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const url = canonical(`/careers/${slug}`);

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${url}/#jobposting`,
    url,
    title: job.title,
    description: job.description ?? "",
    datePosted: job.postedAt,
    employmentType: job.type?.toUpperCase().replace(/\s/g, "_") ?? "FULL_TIME",
    hiringOrganization: { "@id": `${SEO.domain}/#organization` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location ?? "Kolkata",
        addressCountry: "IN",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
    jobLocationType: job.location?.toLowerCase().includes("remote")
      ? "TELECOMMUTE"
      : undefined,
    directApply: !!job.applyUrl,
    ...(job.applyUrl
      ? { applicationContact: { "@type": "ContactPoint", url: job.applyUrl } }
      : {}),
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
        { "@type": "ListItem", position: 3, name: job.title, item: url },
      ],
    },
  };

  return (
    <article className="bg-bg-primary min-h-screen pt-32 pb-32 md:pt-48">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      <div className="mx-auto max-w-4xl px-6">
        <TransitionLink
          href="/careers"
          className="text-accent mb-12 inline-flex items-center gap-2 text-xs font-black tracking-[0.3em] uppercase transition-transform hover:-translate-x-2"
        >
          <ArrowLeft size={16} strokeWidth={3} />
          Back to Careers
        </TransitionLink>

        <header className="mb-16">
          <h1 className="font-display text-text-primary text-5xl leading-tight font-black tracking-tighter md:text-8xl">
            {job.title}
          </h1>
          <div className="text-text-muted mt-12 flex flex-wrap gap-8 text-sm font-bold tracking-[0.2em] uppercase">
            <div className="flex items-center gap-3">
              <Briefcase size={20} className="text-accent" />
              {job.type}
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-accent" />
              {job.location}
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-accent" />
              Posted on {format(new Date(job.postedAt), "MMMM dd, yyyy")}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-16">
          <section>
            <h2 className="text-text-primary mb-8 text-3xl font-black tracking-tighter">
              About the role
            </h2>
            <p className="text-text-muted text-lg leading-relaxed md:text-xl">
              {job.description}
            </p>
          </section>

          {job.responsibilities?.length > 0 && (
            <section>
              <h2 className="text-text-primary mb-8 text-3xl font-black tracking-tighter">
                What you&apos;ll do
              </h2>
              <ul className="space-y-4">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="text-text-muted flex gap-4 text-lg">
                    <CheckCircle2
                      size={24}
                      className="text-accent mt-1 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {job.requirements?.length > 0 && (
            <section>
              <h2 className="text-text-primary mb-8 text-3xl font-black tracking-tighter">
                What you&apos;ll need
              </h2>
              <ul className="space-y-4">
                {job.requirements.map((item, idx) => (
                  <li key={idx} className="text-text-muted flex gap-4 text-lg">
                    <CheckCircle2
                      size={24}
                      className="text-accent mt-1 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <ApplySection jobTitle={job.title} applyUrl={job.applyUrl} />
        </div>
      </div>
    </article>
  );
}
