"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Tag from "@/components/ui/Tag";
import { getHomeFeaturedWorks } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(useGSAP);

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="group bg-white/2 hover:bg-white/4 relative flex w-[300px] shrink-0 flex-col gap-6 overflow-hidden rounded-2xl border border-white/5 p-4 transition-colors md:w-[450px] md:p-6"
    >
      {/* Image Container */}
      <div className="aspect-4/3 relative overflow-hidden rounded-xl bg-neutral-900">
        {project.coverImage && (
          <Image
            src={urlFor(project.coverImage).url()}
            alt={project.coverImage.alt || project.title}
            fill
            placeholder="blur"
            blurDataURL={project.coverImage.asset.metadata.lqip}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}
        <div className="bg-linear-to-t absolute inset-0 from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Tag className="bg-accent/10">{project.category}</Tag>
          <span className="text-text-subtle text-[11px] font-medium tracking-widest uppercase">
            0{index + 1}
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-text-muted border-white/5 rounded-full border px-3 py-1 text-[10px] font-medium tracking-wide uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Arrow/Link */}
      <div className="absolute top-8 right-8 flex h-10 w-10 translate-x-4 translate-y-4 items-center justify-center rounded-full bg-accent text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
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

export default function SelectedWorks() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({ id: "", dataset: "", count: 0, raw: null, error: null });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHomeFeaturedWorks();
        setProjects(data);

        // Debug: Also check 'production' just in case
        const { createClient } = await import("next-sanity");
        const prodClient = createClient({
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: "production",
          apiVersion: "2024-01-01",
          useCdn: false
        });
        const prodData = await prodClient.fetch(`*[_type == "homeFeaturedWork"]`);

        setDebugInfo(prev => ({ 
          ...prev, 
          count: data?.length || 0,
          raw: JSON.stringify(data, null, 2),
          prodCount: prodData?.length || 0,
          id: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
        }));
      } catch (error) {
        console.error("Error fetching featured works:", error);
        setDebugInfo(prev => ({ ...prev, error: error.message }));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useGSAP(
    () => {
      if (loading || projects.length === 0) return;

      const carousel = carouselRef.current;
      const totalWidth = carousel.scrollWidth - carousel.offsetWidth;

      gsap.to(carousel, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          // markers: true,
        },
      });
    },
    { scope: containerRef, dependencies: [loading, projects] }
  );

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary relative w-full overflow-hidden py-24 md:py-32"
    >
      {/* Grid Lines - Plus style */}
      <div className="pointer-events-none absolute inset-0">
        <div className="border-border/30 absolute top-0 left-1/2 h-full w-px -translate-x-1/2 border-l border-dashed" />
        <div className="border-border/10 absolute top-[20%] left-0 h-px w-full border-t" />
        <div className="border-border/10 absolute top-[80%] left-0 h-px w-full border-t" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-accent/20" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Selected Works
            </span>
          </div>
          <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.9] tracking-tighter md:text-7xl lg:text-8xl">
            Transforming Concepts into <span className="text-accent">Digital Masterpieces</span>
          </h2>
          <p className="border-accent/10 text-text-muted mt-6 max-w-xl border-l-2 pl-6 text-lg">
            See how we transformed concepts into digital experiences
          </p>
        </div>

        {/* Project Carousel */}
        <div className="relative flex overflow-visible">
          <div
            ref={carouselRef}
            className="flex gap-8 will-change-transform"
          >
            {loading ? (
              // Skeleton loaders
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 h-[400px] w-[300px] animate-pulse rounded-2xl md:w-[450px]"
                />
              ))
            ) : projects.length > 0 ? (
              projects.map((project, i) => (
                <ProjectCard key={project._id || i} project={project} index={i} />
              ))
            ) : (
              <div className="flex flex-col items-center gap-4 py-10">
                <div className="text-text-muted text-center italic">
                  No featured projects found.
                </div>
                {/* Debug Info */}
                <div className="bg-neutral-900 border-white/5 mt-4 max-w-md overflow-hidden rounded-lg border text-left font-mono text-[10px] text-white/40">
                  <div className="bg-white/5 border-white/5 border-b px-3 py-1 font-bold text-white/60">
                    Sanity Debug
                  </div>
                  <div className="space-y-1 p-3">
                    <p>Project: {debugInfo.id || "MISSING"}</p>
                    <p>Dataset: {debugInfo.dataset || "MISSING"}</p>
                    <p>Status: {loading ? "Loading..." : "Done"}</p>
                    <p>Count ({debugInfo.dataset}): {debugInfo.count}</p>
                    <p>Count (production): {debugInfo.prodCount ?? "Checking..."}</p>
                    {debugInfo.error && <p className="text-red-400">Error: {debugInfo.error}</p>}
                    <details className="mt-2">
                      <summary className="cursor-pointer hover:text-white/60">View Raw Response</summary>
                      <pre className="mt-1 max-h-32 overflow-auto bg-black/30 p-2 text-[9px]">
                        {debugInfo.raw || "No response"}
                      </pre>
                    </details>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View All CTA */}
        {!loading && projects.length > 0 && (
          <div className="mt-20 flex justify-center">
            <button className="group text-text-muted flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:text-accent">
              <span>View All Projects</span>
              <div className="border-accent/30 flex h-10 w-10 items-center justify-center rounded-full border transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-black">
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
