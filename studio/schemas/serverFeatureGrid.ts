export default {
  name: 'serverFeatureGrid',
  title: 'Server Feature Grid',
  type: 'object',
  group: 'content',
  fields: [
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
};
