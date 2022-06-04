export default {
  name: "guide",
  title: "Guide",
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
      name: "description",
      title: "Description",
      type: "string",
      group: "details",
    },
    {
      name: "guideCategory",
      type: "string",
      title: "Guide category",
      options: {
        list: [
          { title: "Getting Started", value: "gettingStarted" },
          { title: "New Builders", value: "newBuilders" },
          { title: "Project Planning", value: "projectPlanning" },
        ],
      },
      group: "details",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "details",
    },
    {
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "details",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      group: ["details", "content"],
    },
    {
      name: "pageBuilder",
      type: "array",
      title: "Page builder",
      of: [{ type: "imageGallery" }, { type: "accordion" }],
      group: ["details", "content"],
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

  preview: {
    select: {
      title: "title",
      description: "description",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, description } = selection;
      return Object.assign({}, selection, {
        title: title,
        subtitle: description,
      });
    },
  },
};
