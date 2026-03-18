const jobApplication = {
  name: "jobApplication",
  title: "Job Applications",
  type: "document",
  fields: [
    {
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      readOnly: true,
    },
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "portfolioUrl",
      title: "Portfolio/LinkedIn URL",
      type: "url",
    },
    {
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
      description: "Link to Google Drive or Dropbox resume",
    },
    {
      name: "message",
      title: "Cover Letter / Message",
      type: "text",
    },
    {
      name: "status",
      title: "Application Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Shortlisted", value: "shortlisted" },
          { title: "Rejected", value: "rejected" },
          { title: "Interviewing", value: "interviewing" },
          { title: "Hired", value: "hired" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    },
    {
      name: "appliedAt",
      title: "Applied At",
      type: "datetime",
      initialValue: new Date().toISOString(),
      readOnly: true,
    },
  ],
};

export default jobApplication;
