export default {
  name: 'imageGridFeature',
  title: 'Image Grid Feature',
  type: 'object',
  group: 'content',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          name: 'link',
          title: 'link',
          type: 'object',
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: 'Heading',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
            {
              name: 'linkUrl',
              title: 'URL',
              type: 'customUrl',
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              isHighlighted: true,
            },
            {
              title: 'Description',
              name: 'description',
              type: 'string',
              isHighlighted: true,
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              isHighlighted: true,
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
};
