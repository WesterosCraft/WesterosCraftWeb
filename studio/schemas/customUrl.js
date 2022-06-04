export default {
  name: "customUrl",
  title: "Custom URL",
  type: "object",
  fields: [
    {
      name: "external",
      type: "url",
      title: "URL",
      hidden: ({ parent, value }) => !value && parent?.internal,
    },
    {
      name: "internal",
      type: "reference",
      to: [{ type: "location" }, { type: "guide" }],
      hidden: ({ parent, value }) => !value && parent?.external,
    },
  ],
};
