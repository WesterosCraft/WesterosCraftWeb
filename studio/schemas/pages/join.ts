import seo from '../objects/seo';

export default {
  name: 'join',
  title: 'Join',
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'subheading', title: 'Subheading', type: 'text' },
    { name: 'startedHeading', title: 'Started Heading', type: 'string' },
    { name: 'startedSubheading', title: 'Started Subheading', type: 'text' },
    {
      name: 'guides',
      title: 'Guides',
      type: 'array',
      of: [
        {
          name: 'guide',
          title: 'guide',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'isRecommended',
              title: 'Is Recommended?',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
            {
              name: 'features',
              title: 'Features',
              description: 'Comma seperated list of features',
              type: 'text',
            },
            {
              name: 'guideRef',
              title: 'Guide Ref',
              type: 'reference',
              to: [{ type: 'guide' }],
            },
          ],
        },
      ],
    },
    { name: 'otherHeading', title: 'Other Heading', type: 'string' },
    { name: 'otherSubheading', title: 'Other Subheading', type: 'text' },
    {
      name: 'otherGuides',
      title: 'Other Guides',
      type: 'array',
      of: [
        {
          name: 'guideRef',
          title: 'Guide Ref',
          type: 'reference',
          to: [{ type: 'guide' }],
        },
      ],
    },
    seo,
  ],
};
