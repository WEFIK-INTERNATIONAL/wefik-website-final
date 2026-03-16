const jobSchema = {
  name: "jobOpening",
  title: "Job Opening",
  type: "document",
  fields: [
    { name: "title", title: "Job Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    {
      name: "type",
      title: "Job Type",
      type: "string",
      options: {
        list: ["Full-time", "Part-time", "Contract", "Internship"],
        layout: "radio",
      },
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: ["Remote", "On-site", "Hybrid"],
        layout: "radio",
      },
    },
    { name: "description", title: "Description", type: "text" },
    {
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "applyUrl", title: "Apply URL", type: "url" },
    { name: "postedAt", title: "Posted At", type: "datetime" },
    {
      name: "isOpen",
      title: "Is Open",
      type: "boolean",
      initialValue: true,
    },
  ],
};

export default jobSchema;
