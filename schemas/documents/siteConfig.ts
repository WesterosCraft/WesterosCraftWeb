import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteConfig',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({
      title: 'Main Navigation',
      name: 'mainNav',
      description: 'Select pages for the top menu',
      type: 'navigation',
    }),
  ],
});
