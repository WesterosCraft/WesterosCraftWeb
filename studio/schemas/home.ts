export default {
  title: 'Home',
  name: 'home',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  groups: [
    {
      name: 'details',
      title: 'Details',
      default: true,
    },
    {
      name: 'hero',
      title: 'Hero',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the page',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroHeading1',
      title: 'Hero Heading 1',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroHeading2',
      title: 'Hero Heading 2',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroCopy',
      title: 'Hero Copy',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroSolidButton',
      title: 'Hero Solid Button',
      type: 'customUrl',
      group: 'hero',
    },

    {
      name: 'heroOutlineButton',
      title: 'Hero Outline Button',
      type: 'customUrl',
      group: 'hero',
    },
    {
      title: 'Hero Image Slider',
      name: 'heroImageSlider',
      type: 'array',
      group: 'hero',
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
    { name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo' },
    { name: 'seoKeywords', title: 'Keywords', type: 'string', group: 'seo' },
    { name: 'seoSlug', title: 'Slug', type: 'slug', group: 'seo' },
    {
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      group: ['seo', 'media'],
    },
  ],
};
