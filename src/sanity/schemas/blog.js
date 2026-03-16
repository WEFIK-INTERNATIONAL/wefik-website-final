const blog = {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    },
    { name: "coverImage", title: "Cover Image", type: "image" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }], // portable text
    },
  ],
};

export default blog;
