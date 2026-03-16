const homeFeaturedWork = {
  name: "homeFeaturedWork",
  title: "Home Featured Work",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Fintech, E-Commerce, etc.",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Priority of the work (e.g., 1, 2, 3, 4)",
    },
  ],
};

export default homeFeaturedWork;
