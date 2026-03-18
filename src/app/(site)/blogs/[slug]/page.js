import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getBlogBySlug, getAllBlogs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PortableTextContent from "@/components/blog/PortableTextContent";
import Tag from "@/components/ui/Tag";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Wefik Blog`,
    description: post.excerpt,
    openGraph: {
      images: [
        post.coverImage?.asset
          ? urlFor(post.coverImage).width(1200).height(630).url()
          : "",
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : new Date();

  return (
    <article className="bg-bg-primary min-h-screen">
      <header className="relative w-full overflow-hidden pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="border-border/30 absolute top-0 left-1/2 h-full w-px -translate-x-1/2 border-l border-dashed" />
          <div className="border-border/10 absolute top-[30%] left-0 h-px w-full border-t" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Link
            href="/blog"
            className="text-accent hover:text-accent/80 mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase transition-colors"
          >
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
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </Link>

          <div className="mx-auto mb-6 flex flex-wrap justify-center gap-2 text-center">
            {post.categories?.map((cat) => (
              <Tag
                key={cat.slug.current}
                className="bg-accent/10 border-accent/20"
              >
                {cat.title}
              </Tag>
            ))}
          </div>

          <h1 className="font-display text-text-primary text-4xl leading-tight font-black tracking-tighter md:text-7xl lg:text-8xl">
            {post.title}
          </h1>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
            <div className="flex items-center gap-3">
              {post.author?.image?.asset && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-text-muted text-sm font-medium italic">
                By{" "}
                <span className="text-text-primary font-bold not-italic">
                  {post.author?.name || "Anonymous"}
                </span>
              </span>
            </div>
            <div className="hidden h-1 w-1 rounded-full bg-white/20 md:block" />
            <span className="text-text-muted text-sm font-medium tracking-widest uppercase">
              {format(publishedDate, "MMMM dd, yyyy")}
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto mb-24 max-w-7xl px-6">
        <div className="relative aspect-21/9 overflow-hidden rounded-3xl border border-white/5 bg-neutral-900 shadow-2xl">
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
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent opacity-40" />
        </div>
      </section>

      <section className="relative pb-32">
        <div className="relative mx-auto max-w-3xl px-6">
          <PortableTextContent value={post.body} />
        </div>

        <div className="bg-accent/5 pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 blur-[120px]" />
      </section>

      <footer className="border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-text-primary mb-12 text-3xl font-bold tracking-tight">
            Ready to build something together?
          </h2>
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent/90 inline-flex h-16 items-center justify-center rounded-full px-12 text-sm font-bold tracking-[0.2em] text-black uppercase transition-all hover:scale-105 active:scale-95"
          >
            Start a Project
          </Link>
        </div>
      </footer>
    </article>
  );
}
