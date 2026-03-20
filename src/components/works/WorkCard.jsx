"use client";

import React, { useRef } from "react";
import Image from "next/image";
import TransitionLink from "../ui/TransitionLink";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function WorkCard({ project }) {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const arrowRef = useRef(null);

  if (!project.slug?.current) return null;

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, {
      x: 10,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      x: 5,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      x: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <TransitionLink
      href={`/works/${project.slug.current}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col gap-6"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-neutral-900 md:aspect-3/2">
        {project.coverImage?.asset && (
          <Image
            ref={imageRef}
            src={urlFor(project.coverImage).width(1200).height(800).url()}
            alt={project.coverImage.alt || project.title}
            fill
            {...(project.coverImage?.asset?.metadata?.lqip
              ? {
                  placeholder: "blur",
                  blurDataURL: project.coverImage.asset.metadata.lqip,
                }
              : {})}
            className="object-cover transition-opacity duration-700 will-change-transform group-hover:opacity-80"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div ref={infoRef} className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-accent mb-1 text-[10px] font-black tracking-[0.25em] uppercase">
              {project.category?.title || "Project"}
            </span>
            <div className="flex items-center gap-4">
              <h3
                ref={titleRef}
                className="font-display text-text-primary text-4xl leading-none font-black tracking-tighter md:text-5xl lg:text-6xl"
              >
                {project.title}
              </h3>
              <div
                ref={arrowRef}
                className="text-accent opacity-0 transition-opacity"
              >
                <ArrowRight size={32} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex gap-3">
          {project.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-text-muted border-b border-white/5 pb-1 text-[10px] font-bold tracking-widest uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TransitionLink>
  );
}
