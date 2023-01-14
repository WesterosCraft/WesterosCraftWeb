export default {
  name: "accordion",
  title: "Accordion",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "accordionContent",
      type: "array",
      of: [
        {
          name: "accordionContent",
          title: "Accordion Content",
          type: "object",

          fields: [
            {
              name: "heading",
              type: "string",
              title: "Heading",
            },
            {
              name: "copy",
              type: "blockContent",
            },
          ],
        },
      ],
    },
  ],
};
