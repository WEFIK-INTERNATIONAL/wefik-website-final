"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Tag from "@/components/ui/Tag";
import { urlFor } from "@/sanity/lib/image";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="project-card group border-border/50 bg-bg-card hover:border-accent/40 hover:bg-bg-secondary relative flex h-full w-[300px] shrink-0 flex-col gap-4 overflow-hidden rounded-3xl border p-4 shadow-sm transition-all duration-500 hover:shadow-xl md:w-[450px] md:gap-6 md:p-6"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-neutral-900">
        {project.coverImage?.asset && (
          <Image
            src={urlFor(project.coverImage).url()}
            alt={project.coverImage.alt || project.title}
            fill
            {...(project.coverImage?.asset?.metadata?.lqip
              ? {
                  placeholder: "blur",
                  blurDataURL: project.coverImage.asset.metadata.lqip,
                }
              : {})}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex grow flex-col gap-3">
        <div className="flex items-center justify-between">
          <Tag className="bg-accent/10">{project.category}</Tag>
          <span className="text-text-subtle text-[11px] font-medium tracking-widest uppercase">
            0{index + 1}
          </span>
        </div>
        <h3 className="font-display text-text-primary text-2xl font-bold tracking-tight md:text-3xl">
          {project.title}
        </h3>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-text-muted border-border/40 bg-bg-primary/50 group-hover:bg-bg-primary rounded-full border px-3 py-1 text-[10px] font-medium tracking-wide uppercase transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-accent absolute top-8 right-8 flex h-10 w-10 translate-x-4 translate-y-4 items-center justify-center rounded-full text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </div>
  );
}

export default function SelectedWorks({ projects = [] }) {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);

  useGSAP(
    () => {
      if (projects.length === 0) return;

      // 1. Entrance Animations for Header Elements
      gsap.fromTo(
        ".header-animate",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Simple Slide-up Animations for Project Cards
      const cards = gsap.utils.toArray(".project-card");
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [projects] }
  );

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary relative w-full overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="border-border/30 absolute top-0 left-1/2 h-full w-px -translate-x-1/2 border-l border-dashed" />
        <div className="border-border/10 absolute top-[20%] left-0 h-px w-full border-t" />
        <div className="border-border/10 absolute top-[80%] left-0 h-px w-full border-t" />
      </div>

      <div className="relative mx-auto max-w-7xl pt-10">
        <div className="mb-12 px-6 md:mb-20 md:px-0">
          <div className="header-animate flex items-center gap-4">
            <div className="bg-accent/20 h-px w-16" />
            <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase sm:text-xs">
              Selected Works
            </span>
          </div>
          <h2 className="header-animate mt-6 max-w-4xl text-3xl leading-[0.95] font-black tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl">
            Transforming Concepts into <br className="hidden sm:block" />
            <span className="text-accent">Digital Masterpieces</span>
          </h2>
          <p className="header-animate border-accent/10 text-text-muted mt-6 max-w-xl border-l-2 pl-6 text-base md:text-lg">
            See how we transformed concepts into digital experiences
          </p>
        </div>

        <div className="relative w-full">
          <div
            ref={carouselRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden pr-6 pb-[2vw] pl-6 md:gap-8 md:pl-0"
          >
            {projects.length > 0 ? (
              projects.map((project, i) => (
                <div
                  key={project._id || i}
                  className="flex shrink-0 snap-center sm:snap-start"
                >
                  <ProjectCard project={project} index={i} />
                </div>
              ))
            ) : (
              <div className="text-text-muted w-full py-10 text-center italic">
                No featured projects found.
              </div>
            )}
          </div>
        </div>

        {projects.length > 0 && (
          <div className="mt-20 flex justify-center">
            <button className="group text-text-muted hover:text-accent flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors">
              <span>View All Projects</span>
              <div className="border-accent/30 group-hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border transition-all group-hover:scale-110 group-hover:text-black">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
