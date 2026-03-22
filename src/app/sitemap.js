import { getAllBlogs, getAllWorks, getOpenJobs } from "@/sanity/lib/queries";
import { SEO } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = SEO.domain;
  const now = new Date().toISOString();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/agency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/legal/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookiepolicy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/data-protection`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/imprint`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/refund-cancellation-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  let blogRoutes = [];
  let workRoutes = [];
  let careerRoutes = [];

  try {
    const [blogs, works, jobs] = await Promise.all([
      getAllBlogs(),
      getAllWorks(),
      getOpenJobs(),
    ]);

    blogRoutes = blogs.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug.current}`,
      lastModified: post.publishedAt ?? now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    workRoutes = works.map((work) => ({
      url: `${baseUrl}/works/${work.slug.current}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    careerRoutes = jobs.map((job) => ({
      url: `${baseUrl}/careers/${job.slug.current}`,
      lastModified: job.postedAt ?? now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (err) {
    console.error("[sitemap] Failed to fetch dynamic routes:", err);
  }

  return [...staticRoutes, ...blogRoutes, ...workRoutes, ...careerRoutes];
}
