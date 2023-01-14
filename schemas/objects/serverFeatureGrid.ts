export default {
  name: 'serverFeatureGrid',
  title: 'Server Feature Grid',
  type: 'object',
  group: 'content',
  fields: [
    {
      name: 'leftImage',
      type: 'image',
      title: 'Left Image',
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
      name: 'rightImage',
      type: 'image',
      title: 'Right Image',
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
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'servers',
      title: 'Servers',
      type: 'array',
      of: [
        {
          name: 'server',
          title: 'Server',
          type: 'object',
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
              name: 'description',
              title: 'Description',
              type: 'string',
            },
            {
              name: 'icon',
              type: 'image',
              title: 'Icon',
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
              name: 'leftButton',
              title: 'Left Button',
              type: 'customUrl',
            },
            {
              name: 'rightButton',
              title: 'Right Button',
              type: 'customUrl',
            },
          ],
        },
      ],
    },
  ],
};
