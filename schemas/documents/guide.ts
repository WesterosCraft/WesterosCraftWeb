import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'guide',
  title: 'Guide',
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
      name: 'description',
      title: 'Description',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'guideCategory',
      title: 'Guide category',
      type: 'reference',
      to: { type: 'category' },
      group: 'details',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'details',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'details',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: ['details', 'content'],
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [{ type: 'imageGallery' }, { type: 'accordion' }],
      group: ['details', 'content'],
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

  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, description } = selection;
      return Object.assign({}, selection, {
        title: title,
        subtitle: description,
      });
    },
  },
});
