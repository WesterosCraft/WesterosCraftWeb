import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {
      name: 'details',
      title: 'Details',
      default: true,
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'dynmap',
      title: 'Dynmap',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'details',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'text',
      group: 'details',
    }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoKeywords', title: 'Keywords', type: 'string', group: 'seo' }),
    defineField({ name: 'seoSlug', title: 'Slug', type: 'slug', group: 'seo' }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      group: ['seo', 'media'],
    }),
  ],
});
