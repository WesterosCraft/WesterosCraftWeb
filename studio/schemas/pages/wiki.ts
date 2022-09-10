import seo from '../objects/seo';

export default {
  name: 'wiki',
  title: 'Wiki',
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
      name: 'copy',
      title: 'Copy',
      type: 'text',
    },
    {
      name: 'locationsImage',
      title: 'Locations Image',
      type: 'image',
    },
    {
      name: 'guidesImage',
      title: 'Guides Image',
      type: 'image',
    },

    seo,
  ],
};
