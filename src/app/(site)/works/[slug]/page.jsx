import React from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { notFound } from "next/navigation";
import { getWorkBySlug, getAllWorks } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Tag as TagIcon,
} from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getWorkBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Wefik`,
    description: project.description,
    openGraph: {
      images: [
        project.coverImage?.asset
          ? urlFor(project.coverImage).width(1200).height(630).url()
          : "",
      ],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getAllWorks();
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const project = await getWorkBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-bg-primary min-h-screen pb-32">
      <section className="relative h-[70vh] w-full overflow-hidden md:h-[85vh]">
        {project.coverImage?.asset && (
          <Image
            src={urlFor(project.coverImage).width(2400).height(1600).url()}
            alt={project.coverImage.alt || project.title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="from-bg-primary via-bg-primary/20 absolute inset-0 bg-linear-to-t to-transparent" />

        <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-24">
          <div className="mx-auto w-full max-w-7xl px-6">
            <TransitionLink
              href="/works"
              className="text-accent mb-8 inline-flex items-center gap-2 text-xs font-black tracking-[0.3em] uppercase transition-transform hover:-translate-x-2"
            >
              <ArrowLeft size={16} strokeWidth={3} />
              Back to Works
            </TransitionLink>
            <h1 className="font-display text-text-primary text-5xl leading-[0.8] font-black tracking-tighter md:text-9xl lg:text-[12rem]">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-6 md:mt-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr]">
          <aside className="flex flex-col gap-12 border-l border-white/5 pl-8 md:pl-12">
            {project.projectUrl && (
              <div className="flex flex-col gap-3">
                <span className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                  Website
                </span>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-text-primary hover:text-accent flex items-center gap-3 text-xl font-bold transition-colors"
                >
                  Live Preview
                  <ExternalLink
                    size={20}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <span className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                Year
              </span>
              <div className="text-text-primary flex items-center gap-3 text-xl font-bold">
                <Calendar size={20} className="text-accent" />
                {project.completedAt
                  ? new Date(project.completedAt).getFullYear()
                  : "2024"}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-text-muted text-[10px] font-black tracking-[0.2em] uppercase">
                Services
              </span>
              <div className="flex flex-wrap gap-4">
                {project.tags?.map((tag) => (
                  <div
                    key={tag}
                    className="text-text-primary flex items-center gap-2 text-lg font-bold"
                  >
                    <span className="bg-accent h-1.5 w-1.5 rounded-full" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-accent mb-6 text-xs font-black tracking-[0.4em] uppercase">
                Project Overview
              </h2>
              <p className="text-text-muted text-xl leading-relaxed md:text-3xl md:leading-snug">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {project.images && project.images.length > 0 && (
        <section className="mx-auto mt-32 max-w-7xl px-6 md:mt-48">
          <div className="flex flex-col gap-8 md:gap-16">
            {project.images.map((image, index) => (
              <div
                key={image._key || index}
                className={`relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl ${
                  index % 2 === 0
                    ? "self-start md:w-[90%]"
                    : "self-end md:w-[90%]"
                }`}
              >
                <Image
                  src={urlFor(image).width(2000).height(1200).url()}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-48 border-t border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-text-primary mb-16 text-5xl font-black tracking-tighter md:text-8xl">
            NEXT PROJECT.
          </h2>
          <TransitionLink
            href="/works"
            className="group inline-flex items-center gap-6"
          >
            <div className="group-hover:bg-accent group-hover:border-accent flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/10 transition-all">
              <ArrowLeft
                size={32}
                className="text-white transition-transform group-hover:-translate-x-2 group-hover:text-black"
              />
            </div>
            <span className="text-text-primary outline-text group-hover:text-accent text-3xl font-black tracking-tighter">
              VIEW ALL
            </span>
          </TransitionLink>
        </div>
      </section>
    </article>
  );
}
