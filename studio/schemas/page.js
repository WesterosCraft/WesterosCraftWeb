export default {
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    {
      name: "details",
      title: "Details",
      default: true,
    },
    {
      name: "content",
      title: "Content",
    },
    {
      name: "media",
      title: "Media",
    },
    {
      name: "dynmap",
      title: "Dynmap",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      group: "details",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "copy",
      title: "Copy",
      type: "text",
      group: "details",
    },
    { name: "seoTitle", title: "SEO title", type: "string", group: "seo" },
    { name: "seoKeywords", title: "Keywords", type: "string", group: "seo" },
    { name: "seoSlug", title: "Slug", type: "slug", group: "seo" },
    {
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      group: ["seo", "media"],
    },
  ],
};
