import { client } from "./client";

// Blog
export async function getAllBlogs() {
  return client.fetch(
    `*[_type == "blog"] | order(publishedAt desc){
      title, slug, excerpt, publishedAt,
      coverImage{
        asset->{
          metadata{
            lqip
          }
        },
        alt
      },
      "author": author->{ name, image },
      "categories": categories[]->{ title, slug }
    }`
  );
}

export async function getBlogBySlug(slug) {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title, slug, excerpt, publishedAt, body,
      coverImage{
        asset->{
          metadata{
            lqip
          }
        },
        alt
      },
      "author": author->{ name, image },
      "categories": categories[]->{ title, slug }
    }`,
    { slug }
  );
}

// Work
export async function getAllWorks() {
  return client.fetch(
    `*[_type == "work"] | order(completedAt desc){
      title, slug, coverImage, description, tags, featured
    }`
  );
}

export async function getWorkBySlug(slug) {
  return client.fetch(
    `*[_type == "work" && slug.current == $slug][0]{
      title, slug, coverImage, images, description, tags, projectUrl, completedAt
    }`,
    { slug }
  );
}

export async function getHomeFeaturedWorks() {
  const { client } = await import("./client");
  
  // Debug: logs to help identify project mismatch
  console.log("Using Sanity Config:", {
    projectId: client.config().projectId,
    dataset: client.config().dataset
  });

  return client.fetch(
    `*[_type == "homeFeaturedWork"] | order(order asc){
      title, slug, category, coverImage{
        asset->{
          metadata{
            lqip
          }
        },
        alt
      }, tags, order
    }`
  );
}

// Jobs
export async function getOpenJobs() {
  return client.fetch(
    `*[_type == "jobOpening" && isOpen == true] | order(postedAt desc){
      title, slug, type, location, description, postedAt
    }`
  );
}

export async function getJobBySlug(slug) {
  return client.fetch(`*[_type == "jobOpening" && slug.current == $slug][0]`, {
    slug,
  });
}
