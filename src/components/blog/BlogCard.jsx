"use client";

import React from "react";
import Image from "next/image";
import TransitionLink from "../ui/TransitionLink";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import Tag from "@/components/ui/Tag";
import ShareButton from "@/components/blog/ShareButton";
import { canonical } from "@/lib/seo";

export default function BlogCard({ post }) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : new Date();

  const postUrl = canonical(`/blogs/${post.slug.current}`);

  return (
    <div className="group bg-bg-card border-border/10 hover:border-accent/30 relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2">
      <TransitionLink
        href={`/blogs/${post.slug.current}`}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-video overflow-hidden bg-neutral-900">
          {post.coverImage?.asset && (
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.coverImage.alt || post.title}
              fill
              {...(post.coverImage?.asset?.metadata?.lqip
                ? {
                    placeholder: "blur",
                    blurDataURL: post.coverImage.asset.metadata.lqip,
                  }
                : {})}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

          {post.categories?.[0] && (
            <div className="absolute top-4 left-4">
              <Tag className="bg-accent/20 border-accent/20 text-[10px] backdrop-blur-md">
                {post.categories[0].title}
              </Tag>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-text-muted text-[10px] font-bold tracking-widest uppercase">
              <time dateTime={post.publishedAt}>
                {format(publishedDate, "MMMM dd, yyyy")}
              </time>
            </span>
            {post.author && (
              <span className="text-text-muted text-[10px] font-medium italic">
                By {post.author.name}
              </span>
            )}
          </div>

          <h3 className="font-display group-hover:text-accent text-text-primary mb-4 line-clamp-2 text-2xl font-bold tracking-tight transition-colors md:text-3xl">
            {post.title}
          </h3>

          <p className="text-text-muted mb-6 line-clamp-2 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          {/* Footer row: Read link + Share button */}
          <div className="mt-auto flex items-center justify-between">
            <span className="text-accent flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase transition-all group-hover:gap-2.5">
              Read
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>

            {/* Stop propagation so clicking share doesn't follow the card link */}
            <div onClick={(e) => e.preventDefault()}>
              <ShareButton
                url={postUrl}
                title={post.title}
                text={post.excerpt ?? ""}
                variant="icon"
                alwaysVisible
              />
            </div>
          </div>

          <div className="bg-accent/10 absolute -right-12 -bottom-12 h-24 w-24 opacity-0 blur-[60px] transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </TransitionLink>
    </div>
  );
}
