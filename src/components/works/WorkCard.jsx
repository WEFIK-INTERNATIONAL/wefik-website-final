"use client";

import React from "react";
import Image from "next/image";
import TransitionLink from "../ui/TransitionLink";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";

export default function WorkCard({ project }) {
  if (!project.slug?.current) return null;

  return (
    <TransitionLink
      href={`/works/${project.slug.current}`}
      className="group border-border bg-bg-secondary flex h-full flex-col overflow-hidden rounded-4xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:rounded-4xl"
    >
      <div className="border-border relative aspect-4/3 w-full overflow-hidden border-b md:aspect-[1.1]">
        {project.coverImage?.asset && (
          <Image
            src={urlFor(project.coverImage).width(1200).height(800).url()}
            alt={project.coverImage.alt || project.title}
            fill
            {...(project.coverImage?.asset?.metadata?.lqip
              ? {
                  placeholder: "blur",
                  blurDataURL: project.coverImage.asset.metadata.lqip,
                }
              : {})}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
          />
        )}

        {/* Top-left category overlay exactly matching image */}
        <div className="absolute top-4 left-4 z-10 flex md:top-6 md:left-6">
          <span className="bg-accent/40 rounded-full border border-white/20 px-4 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-xl backdrop-blur-md sm:text-[11px]">
            {project.category?.title || "GENERAL"}
          </span>
        </div>
      </div>

      <div className="bg-bg-secondary flex flex-1 flex-col p-6 md:p-8">
        {/* Massive uppercase title matching the reference without wrapping */}
        <h3 className="font-big text-text-primary mb-4 text-6xl leading-[0.8] font-black tracking-[-0.02em] break-keep uppercase sm:text-7xl lg:text-[5.5rem]">
          {project.title}
        </h3>

        {/* Tags matching the pill style beneath title */}
        <div className="mb-8 flex flex-wrap gap-2 md:gap-3">
          {project.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-bg-primary text-text-primary border-border/50 rounded-full border px-4 py-1.5 text-[9px] font-black tracking-widest whitespace-nowrap uppercase shadow-sm sm:text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Clear separating footer exactly matching image */}
        <div className="border-border mt-auto flex items-center justify-between border-t pt-5 md:pt-6">
          <span className="font-accent text-text-primary text-[10px] font-bold tracking-[0.2em] uppercase md:text-[11px]">
            View Case Study
          </span>
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="text-text-primary transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </TransitionLink>
  );
}
