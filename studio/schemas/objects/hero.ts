export default {
  name: 'hero',
  title: 'Hero',
  type: 'object',
  group: 'content',
  fields: [
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'heading1',
      title: 'Heading 1',
      type: 'string',
    },
    {
      name: 'heading2',
      title: 'Heading 2',
      type: 'string',
    },
    {
      name: 'copy',
      title: 'Copy',
      type: 'string',
    },
    {
      name: 'solidButton',
      title: 'Solid Button',
      type: 'customUrl',
    },

    {
      name: 'outlineButton',
      title: 'Outline Button',
      type: 'customUrl',
    },
    {
      title: 'Hero Image Slider',
      name: 'heroImageSlider',
      type: 'array',

      of: [
        {
          title: 'Slide',
          name: 'slide',
          type: 'object',
          fields: [
            {
              type: 'reference',
              name: 'location',
              validation: (Rule: any) => Rule.required(),
              to: [
                {
                  type: 'location',
                },
              ],
            },
            {
              type: 'image',
              name: 'slideImage',
              title: 'Slide Image',
              validation: (Rule: any) => Rule.required(),
              options: {
                hotspot: true,
              },
            },
            {
              type: 'string',
              name: 'textColor',
              title: 'Text Color',
              options: {
                list: [
                  { title: 'dark', value: 'dark' },
                  { title: 'light', value: 'light' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'location.title',
              media: 'slideImage',
            },
          },
        },
      ],
    },
  ],
};
