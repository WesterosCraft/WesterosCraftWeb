import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'location',
  title: 'Location',
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
      name: 'region',
      title: 'Region',
      type: 'reference',
      to: { type: 'region' },
      group: 'details',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'projectStatus',
      type: 'string',
      title: 'Project status',
      description: 'Current status of the project',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'inProgress' },
          { title: 'Not started', value: 'notStarted' },
          { title: 'Abandoned', value: 'abandoned' },
          { title: 'Redo in progress', value: 'redoInProgress' },
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'buildCategory',
      title: 'Build category',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'buildCategory' } }],
      group: 'details',
    }),
    defineField({
      name: 'projectLead',
      title: 'Project leader(s)',
      description: 'Leader(s) of the project',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'house',
      title: 'House',
      type: 'string',
      description: 'If destination has a House, list it here',
      group: 'details',
    }),
    defineField({
      name: 'warp',
      title: 'Warp',
      type: 'string',
      description: 'In game warp, if available',
      group: 'details',
    }),
    defineField({
      name: 'application',
      title: 'Application',
      type: 'string',
      description: 'Link to users project application, if available',
      group: 'details',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: ['details', 'media'],
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: ['details', 'media'],
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional images',
      type: 'imageGallery',
      group: ['details', 'media'],
    }),
    defineField({
      name: 'dateStarted',
      title: 'Date started',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'dateCompleted',
      title: 'Date completed',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'redoAvailable',
      title: 'Redo available',
      type: 'boolean',
      group: 'details',
    }),
    defineField({
      name: 'serverProject',
      title: 'Server project',
      type: 'boolean',
      group: 'details',
    }),
    defineField({
      name: 'dynmapZoom',
      title: 'Zoom level',
      type: 'string',
      group: 'dynmap',
    }),
    defineField({
      name: 'dynmapXcoord',
      title: 'X Coord',
      type: 'string',
      group: 'dynmap',
    }),
    defineField({
      name: 'dynmapYcoord',
      title: 'Y coord',
      type: 'string',
      group: 'dynmap',
    }),
    defineField({
      name: 'difficulty',
      type: 'string',
      title: 'Difficulty level',
      options: {
        list: [
          { title: '1', value: '1' },
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
          { title: '5', value: '5' },
          { title: '6', value: '6' },
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
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
      media: 'additionalImages',
      subtitle: 'region.name',
      projectStatus: 'projectStatus',
    },
    prepare(selection) {
      const STATUS = {
        completed: 'Completed',
        inProgress: 'In progress',
        notStarted: 'Not started',
        abandonded: 'Abandonded',
        redoInProgress: 'Redo in progress',
      };
      const { title, media, subtitle, projectStatus } = selection;
      return Object.assign({}, selection, {
        title: title,
        media: media?.images?.[0],
        subtitle: `${subtitle}${
          // @ts-ignore
          projectStatus ? ' - ' + STATUS[projectStatus] : 'Needs project status'
        }`,
      });
    },
  },
});
