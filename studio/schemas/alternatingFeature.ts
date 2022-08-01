export default {
  name: 'alternatingGridFeature',
  title: 'Alternating Grid Feature',
  type: 'object',
  group: 'content',
  fields: [
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            {
              name: 'imageLink',
              title: 'Image Link',
              type: 'url',
            },
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
            {
              name: 'link',
              title: 'Link',
              type: 'customUrl',
            },
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
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
};
