export default {
  name: 'featureGrid',
  title: 'Feature Grid',
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
              name: 'heading',
              type: 'string',
              title: 'Heading',
            },
            {
              name: 'subheading',
              title: 'Subheading',
              type: 'string',
            },
            {
              name: 'banner',
              title: 'Banner',
              type: 'image',
            },
          ],
        },
      ],
    },
  ],
};
