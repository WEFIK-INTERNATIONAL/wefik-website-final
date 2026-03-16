import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import Tag from "@/components/ui/Tag";

export default function BlogCard({ post }) {
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date();

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group bg-bg-card border-border/10 hover:border-accent/30 relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="aspect-16/9 relative overflow-hidden bg-neutral-900">
        {post.coverImage && (
          <Image
            src={urlFor(post.coverImage).url()}
            alt={post.coverImage.alt || post.title}
            fill
            placeholder="blur"
            blurDataURL={post.coverImage.asset.metadata.lqip}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="bg-linear-to-t absolute inset-0 from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Overlay */}
        {post.categories?.[0] && (
          <div className="absolute top-4 left-4">
            <Tag className="bg-accent/20 backdrop-blur-md border-accent/20 text-[10px]">
              {post.categories[0].title}
            </Tag>
          </div>
        )}
      </div>

      {/* Content */}
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
        
        <h3 className="font-display group-hover:text-accent mb-4 text-2xl font-bold tracking-tight text-text-primary transition-colors md:text-3xl">
          {post.title}
        </h3>
        
        <p className="text-text-muted line-clamp-2 mt-auto text-sm leading-relaxed">
          {post.excerpt}
        </p>

        {/* Brand Glow Effect */}
        <div className="absolute -right-12 -bottom-12 h-24 w-24 bg-accent/10 blur-[60px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </Link>
  );
}
