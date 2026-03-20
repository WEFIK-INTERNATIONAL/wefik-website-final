import React from "react";
import Image from "next/image";
import TransitionLink from "../ui/TransitionLink";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import Tag from "@/components/ui/Tag";

export default function BlogCard({ post }) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : new Date();

  return (
    <TransitionLink
      href={`/blogs/${post.slug.current}`}
      className="group bg-bg-card border-border/10 hover:border-accent/30 relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative aspect-16/9 overflow-hidden bg-neutral-900">
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
            {format(publishedDate, "MMMM dd, yyyy")}
          </span>
          {post.author && (
            <span className="text-text-muted text-[10px] font-medium italic">
              By {post.author.name}
            </span>
          )}
        </div>

        <h3 className="font-display group-hover:text-accent text-text-primary mb-4 text-2xl font-bold tracking-tight transition-colors md:text-3xl">
          {post.title}
        </h3>

        <p className="text-text-muted mt-auto line-clamp-2 text-sm leading-relaxed">
          {post.excerpt}
        </p>

        <div className="bg-accent/10 absolute -right-12 -bottom-12 h-24 w-24 opacity-0 blur-[60px] transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </TransitionLink>
  );
}
