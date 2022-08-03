export default {
  name: "imageGallery",
  type: "object",
  title: "Image Gallery",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "metadata",
      title: "Metadata",
      type: "string",
      description:
        "Optional content associated with gallery, cause as a click on copy script",
    },
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string",
              isHighlighted: true,
            },
            {
              title: "Description",
              name: "description",
              type: "string",
              isHighlighted: true,
            },
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              isHighlighted: true,
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    },
  ],
  preview: {
    select: {
      images: "images",
      image: "images.0",
    },
    prepare(selection) {
      const { images, image } = selection;

      return {
        title: `Gallery block of ${Object.keys(images).length} images`,
        subtitle: `Alt text: ${image.alt}`,
        media: image,
      };
    },
  },
};
