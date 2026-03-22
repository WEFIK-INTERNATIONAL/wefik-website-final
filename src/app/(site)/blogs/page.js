import React from "react";
import { getAllBlogs } from "@/sanity/lib/queries";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import { SEO, canonical } from "@/lib/seo";

export const metadata = {
  title: "Blog — Insights on Web Design, Development & Digital Marketing",
  description:
    "Read Wefik's latest articles on web design trends, web development, UI/UX, branding, Shopify, and digital marketing for businesses in India.",
  keywords: [
    "web design blog India",
    "digital agency blog Kolkata",
    "UI UX tips India",
    "web development insights",
    "Shopify tips India",
    "digital marketing blog India",
    "wefik blog",
  ],
  alternates: { canonical: canonical("/blogs") },
  openGraph: {
    type: "website",
    url: canonical("/blogs"),
    title: `Blog | ${SEO.siteName}`,
    description:
      "Thought leadership, design trends, and digital insights from Wefik — Kolkata's digital agency.",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "WEFIK Blog" },
    ],
  },
};

export default async function BlogListingPage() {
  const posts = await getAllBlogs();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SEO.domain}/blogs/#webpage`,
    url: canonical("/blogs"),
    name: `Blog | ${SEO.siteName}`,
    description:
      "Web design, development, and digital marketing insights from Wefik.",
    publisher: { "@id": `${SEO.domain}/#organization` },
    isPartOf: { "@id": `${SEO.domain}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SEO.domain },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: canonical("/blogs"),
        },
      ],
    },
  };

  return (
    <main className="bg-bg-primary min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

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
