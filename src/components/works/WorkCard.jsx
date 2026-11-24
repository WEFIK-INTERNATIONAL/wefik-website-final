"use client";

import React from "react";
import Image from "next/image";
import TransitionLink from "../ui/TransitionLink";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight } from "lucide-react";

export default function WorkCard({ project }) {
  if (!project.slug?.current) return null;

  const year = project.completedAt
    ? new Date(project.completedAt).getFullYear()
    : null;
  const tags = project.tags?.slice(0, 3) ?? [];

  return (
    <TransitionLink
      href={`/works/${project.slug.current}`}
      className="group border-text-primary/10 bg-bg-card hover:border-accent/50 flex h-full flex-col rounded-3xl border p-3 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_var(--color-accent)]"
    >
      {/* Screenshot in a small browser frame */}
      <div className="bg-bg-primary border-text-primary/10 overflow-hidden rounded-2xl border">
        <div className="border-text-primary/10 flex items-center gap-1.5 border-b px-3 py-2">
          <span className="bg-text-primary/15 h-2 w-2 rounded-full" />
          <span className="bg-text-primary/15 h-2 w-2 rounded-full" />
          <span className="bg-text-primary/15 h-2 w-2 rounded-full" />
        </div>
        <div className="relative aspect-16/10 w-full overflow-hidden">
          {project.coverImage?.asset ? (
            <Image
              src={urlFor(project.coverImage)
                .width(1200)
                .height(750)
                .auto("format")
                .url()}
              alt={project.coverImage.alt || project.title}
              fill
              {...(project.coverImage?.asset?.metadata?.lqip
                ? {
                    placeholder: "blur",
                    blurDataURL: project.coverImage.asset.metadata.lqip,
                  }
                : {})}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="bg-accent/5 absolute inset-0" />
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-accent truncate text-xs font-bold tracking-[0.12em] uppercase">
            {project.category?.title || "Project"}
          </span>
          {year && (
            <span className="text-text-subtle shrink-0 text-xs font-semibold tabular-nums">
              {year}
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-text-primary line-clamp-2 text-3xl leading-[0.95] tracking-tight md:text-[2rem]">
            {project.title}
          </h3>
          <span className="border-text-primary/15 text-text-primary group-hover:bg-accent group-hover:border-accent group-hover:text-bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
        </div>

        {project.description && (
          <p className="text-text-muted mt-3 line-clamp-2 text-sm leading-relaxed">
            {project.description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-text-primary/5 text-text-muted rounded-md px-2 py-1 text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </TransitionLink>
  );
}
