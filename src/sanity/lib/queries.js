import { serverClient as client } from "./client";

export async function getAllBlogs() {
  return client.fetch(
    `*[_type == "blog"] | order(publishedAt desc){
      title, slug, excerpt, publishedAt,
      coverImage{
        asset->{
          _id,
          metadata{ lqip }
        },
        alt
      },
      "author": author->{ name, image },
      "categories": categories[]->{ title, slug }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getBlogBySlug(slug) {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title, slug, excerpt, publishedAt, body,
      coverImage{
        asset->{
          _id,
          metadata{ lqip }
        },
        alt
      },
      "author": author->{ name, image },
      "categories": categories[]->{ title, slug }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getAllWorks() {
  return client.fetch(
    `*[_type == "work"] | order(completedAt desc){
      _type,
      title, slug, description, tags, featured,
      "category": category->{ title, slug },
      coverImage{
        asset->{
          _id,
          metadata{ lqip }
        },
        alt
      }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getWorkBySlug(slug) {
  return client.fetch(
    `*[_type == "work" && slug.current == $slug][0]{
      title, slug, coverImage, images, description, tags, projectUrl, completedAt
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getHomeFeaturedWorks() {
  return client.fetch(
    `*[_type == "homeFeaturedWork"] | order(order asc){
      title, slug, category, coverImage{
        asset->{
          _id,
          metadata{ lqip }
        },
        alt
      }, tags, order
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getOpenJobs() {
  return client.fetch(
    `*[_type == "jobOpening" && isOpen == true] | order(postedAt desc){
      title, slug, type, location, description, responsibilities, requirements, applyUrl, postedAt
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getJobBySlug(slug) {
  return client.fetch(
    `*[_type == "jobOpening" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 60 } }
  );
}
