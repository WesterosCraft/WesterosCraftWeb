import seo from '../objects/seo';

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'heading', title: 'Heading', type: 'string' },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'copy',
      title: 'Copy',
      type: 'array',
      of: [
        {
          name: 'body',
          title: 'Body',
          type: 'object',
          fields: [
            {
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'dark', value: 'dark' },
                  { title: 'light', value: 'light' },
                ],
              },
            },
            {
              name: 'topBorder',
              title: 'Top Border?',
              type: 'boolean',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            },
          ],
          // group: ['details', 'content'],
        },
      ],
    },
    seo,
  ],
};
