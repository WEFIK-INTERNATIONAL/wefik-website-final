const work = {
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    { name: "coverImage", title: "Cover Image", type: "image" },
    {
      name: "images",
      title: "Gallery",
      type: "array",
      of: [{ type: "image" }],
    },
    { name: "description", title: "Description", type: "text" },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    { name: "projectUrl", title: "Project URL", type: "url" },
    { name: "completedAt", title: "Completed At", type: "date" },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
  ],
};

export default work;
