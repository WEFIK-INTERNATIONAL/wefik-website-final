"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Tag from "@/components/ui/Tag";
import { urlFor } from "@/sanity/lib/image";
import { useViewTransition } from "@/hooks/useViewTransition";
import TransitionLink from "@/components/ui/TransitionLink";
import { useTheme } from "next-themes";

function ProjectCard({ project, index, onProjectClick }) {
  const cardRef = useRef(null);

  // Use a generic placeholder if there is no image
  const hasImage = !!project.coverImage?.asset;

  return (
    <div
      ref={cardRef}
      onClick={(e) => onProjectClick(e, project.slug?.current)}
      className="project-card group border-border/50 bg-bg-card hover:border-accent/40 hover:bg-bg-secondary relative flex h-full w-[300px] shrink-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-3xl border p-4 shadow-sm transition-all duration-500 hover:shadow-xl md:w-[450px] md:gap-6 md:p-6"
    >
      <div className="pointer-events-none relative aspect-4/3 overflow-hidden rounded-xl bg-neutral-900">
        {hasImage && (
          <Image
            src={urlFor(project.coverImage).url()}
            alt={project.coverImage.alt || project.title}
            fill
            unoptimized={true}
            {...(project.coverImage?.asset?.metadata?.lqip
              ? {
                  placeholder: "blur",
                  blurDataURL: project.coverImage.asset.metadata.lqip,
                }
              : {})}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            draggable={false}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="pointer-events-none flex grow flex-col gap-3">
        <div className="flex items-center justify-between">
          <Tag className="bg-accent/10">{project.category || "Work"}</Tag>
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

      <div className="bg-accent pointer-events-none absolute top-8 right-8 flex h-10 w-10 translate-x-4 translate-y-4 items-center justify-center rounded-full text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
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
  const { navigateWithTransition } = useViewTransition();

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = !mounted ? true : resolvedTheme === "dark";

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragThreshold = 5;

  useGSAP(
    () => {
      if (projects.length === 0) return;

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

  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // the multiplier determines drag speed
    if (Math.abs(walk) > dragThreshold) {
      setIsDragging(true);
    }
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 300 + 24 : 450 + 32;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 300 + 24 : 450 + 32;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const handleProjectClick = (e, slug) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (slug) {
      navigateWithTransition(`/works/${slug}`);
    }
  };

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
        <div className="mb-12 flex flex-col justify-between gap-8 px-6 md:mb-20 md:flex-row md:items-end md:px-0">
          <div>
            <div className="header-animate mb-10">
              <Tag>Selected Works</Tag>
            </div>
            <h2 className="header-animate mt-6 max-w-4xl text-3xl leading-[0.95] font-black tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl">
              Transforming Concepts into <br className="hidden sm:block" />
              <span className="text-accent">Digital Masterpieces</span>
            </h2>
            <p className="header-animate border-accent/10 text-text-muted mt-6 max-w-xl border-l-2 pl-6 text-base md:text-lg">
              See how we transformed concepts into digital experiences
            </p>
          </div>

          {projects.length > 0 && (
            <div className="header-animate flex items-center gap-4">
              <button
                onClick={scrollPrev}
                className="group border-border/50 hover:bg-accent flex h-14 w-14 items-center justify-center rounded-full border bg-transparent transition-all hover:scale-105 hover:text-black lg:h-16 lg:w-16"
                aria-label="Previous project"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="group border-border/50 hover:bg-accent flex h-14 w-14 items-center justify-center rounded-full border bg-transparent transition-all hover:scale-105 hover:text-black lg:h-16 lg:w-16"
                aria-label="Next project"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`scrollbar-hide flex cursor-grab gap-6 overflow-x-auto overflow-y-hidden pr-6 pb-[2vw] pl-6 active:cursor-grabbing md:gap-8 md:pl-0 ${!isDown ? "snap-x snap-mandatory" : ""}`}
            style={{ scrollBehavior: isDown ? "auto" : "smooth" }}
          >
            {projects.length > 0 ? (
              projects.map((project, i) => (
                <div
                  key={project._id || i}
                  className="flex shrink-0 snap-center sm:snap-start"
                >
                  <ProjectCard
                    project={project}
                    index={i}
                    onProjectClick={handleProjectClick}
                  />
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
            <TransitionLink
              href="/works"
              className="group text-text-muted hover:text-accent flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors"
            >
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
            </TransitionLink>
          </div>
        )}
      </div>
    </section>
  );
}
