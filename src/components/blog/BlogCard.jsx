"use client";

import React from "react";
import Image from "next/image";
import TransitionLink from "../ui/TransitionLink";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import ShareButton from "@/components/blog/ShareButton";
import { canonical } from "@/lib/seo";

function AuthorMeta({ author, date, dateTime }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {author?.image?.asset ? (
        <Image
          src={urlFor(author.image).width(80).height(80).auto("format").url()}
          alt={author.name}
          width={32}
          height={32}
          className="border-text-primary/10 h-8 w-8 shrink-0 rounded-full border object-cover"
        />
      ) : (
        <span className="bg-accent/15 text-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">
          {(author?.name || "W").charAt(0)}
        </span>
      )}
      <div className="min-w-0 leading-tight">
        <div className="text-text-primary truncate text-sm font-semibold">
          {author?.name || "Wefik Team"}
        </div>
        <time dateTime={dateTime} className="text-text-subtle text-xs">
          {date}
        </time>
      </div>
    </div>
  );
}

export default function BlogCard({ post, featured = false }) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : new Date();
  const date = format(publishedDate, "MMM d, yyyy");
  const href = `/blogs/${post.slug.current}`;
  const postUrl = canonical(href);
  const category = post.categories?.[0]?.title;

  const cover = post.coverImage?.asset ? (
    <Image
      src={urlFor(post.coverImage)
        .width(featured ? 1400 : 900)
        .height(featured ? 875 : 563)
        .auto("format")
        .url()}
      alt={post.coverImage.alt || post.title}
      fill
      {...(post.coverImage?.asset?.metadata?.lqip
        ? {
            placeholder: "blur",
            blurDataURL: post.coverImage.asset.metadata.lqip,
          }
        : {})}
      sizes={
        featured
          ? "(max-width: 1024px) 100vw, 60vw"
          : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      }
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
  ) : (
    <div className="bg-accent/5 absolute inset-0" />
  );

  const share = (
    <div onClick={(e) => e.preventDefault()}>
      <ShareButton
        url={postUrl}
        title={post.title}
        text={post.excerpt ?? ""}
        variant="icon"
        alwaysVisible
      />
    </div>
  );

  if (featured) {
    return (
      <TransitionLink
        href={href}
        className="group border-text-primary/10 bg-bg-card hover:border-accent/50 grid overflow-hidden rounded-3xl border p-3 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_24px_60px_-30px_var(--color-accent)] lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="relative aspect-16/10 overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[420px]">
          {cover}
          <span className="bg-bg-primary/85 text-text-primary absolute top-4 left-4 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase backdrop-blur-md">
            Latest
          </span>
        </div>

        <div className="flex flex-col px-3 pt-6 pb-3 lg:px-8 lg:py-8">
          {category && (
            <span className="text-accent mb-4 text-xs font-bold tracking-[0.12em] uppercase">
              {category}
            </span>
          )}
          <h2 className="text-text-primary text-4xl leading-[0.95] tracking-tight md:text-5xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-text-muted mt-5 line-clamp-4 text-base leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="border-text-primary/10 mt-auto flex items-center justify-between gap-4 border-t pt-6">
            <AuthorMeta
              author={post.author}
              date={date}
              dateTime={post.publishedAt}
            />
            <div className="flex items-center gap-2">
              {share}
              <span className="bg-accent text-bg-primary flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </TransitionLink>
    );
  }

  return (
    <TransitionLink
      href={href}
      className="group border-text-primary/10 bg-bg-card hover:border-accent/50 flex h-full flex-col rounded-2xl border p-2.5 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_var(--color-accent)]"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl">
        {cover}
      </div>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        {category && (
          <span className="text-accent mb-2 text-[11px] font-bold tracking-[0.12em] uppercase">
            {category}
          </span>
        )}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-text-primary line-clamp-2 text-2xl leading-[0.95] tracking-tight">
            {post.title}
          </h3>
          <span className="border-text-primary/15 text-text-primary group-hover:bg-accent group-hover:border-accent group-hover:text-bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
        </div>
        {post.excerpt && (
          <p className="text-text-muted mt-2 mb-4 line-clamp-2 text-[13px] leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="border-text-primary/10 mt-auto flex items-center justify-between gap-3 border-t pt-3">
          <AuthorMeta
            author={post.author}
            date={date}
            dateTime={post.publishedAt}
          />
          {share}
        </div>
      </div>
    </TransitionLink>
  );
}
