import React from "react";
import { getAllBlogs } from "@/sanity/lib/queries";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";

export const metadata = {
  title: "Blog | Wefik",
  description:
    "Explore our latest thoughts on digital innovation, design trends, and the future of web experiences.",
};

export default async function BlogListingPage() {
  const posts = await getAllBlogs();

  return (
    <main className="bg-bg-primary min-h-screen">
      <BlogHero />

      <section className="relative pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug.current} post={post} />
              ))}
            </div>
          ) : (
            <div className="border-border/10 flex min-h-[400px] flex-col items-center justify-center rounded-3xl border bg-white/2 px-6 text-center">
              <h2 className="text-text-primary text-2xl font-bold">
                No posts found yet.
              </h2>
              <p className="text-text-muted mt-4 max-w-md">
                We&apos;re crafting some amazing stories. Check back soon for
                our latest updates!
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="pointer-events-none fixed inset-0 z-0 opacity-20">
        <div className="border-border/10 absolute top-[10%] left-0 h-px w-full border-t" />
        <div className="border-border/10 absolute top-[90%] left-0 h-px w-full border-t" />
      </div>
    </main>
  );
}
