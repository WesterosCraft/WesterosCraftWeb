import seo from '../objects/seo';

export default {
  name: 'rookery',
  title: 'Rookery',
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
    {
      type: 'array',
      name: 'editions',
      title: 'Editions',
      of: [
        {
          type: 'reference',
          name: 'edition',
          title: 'Edition',
          to: [{ type: 'rookeryEdition' }],
        },
      ],
      // _weak: true // enable if you don't want reference integrity checks
    },
    seo,
  ],
};
