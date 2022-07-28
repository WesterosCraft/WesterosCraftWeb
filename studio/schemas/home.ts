import featureGrid from './featureGrid';
import hero from './hero';
import videoFeature from './videoFeature';

export default {
  title: 'Home',
  name: 'home',
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
      description: 'Title of the page',
      validation: (Rule: any) => Rule.required(),
    },
    hero,
    {
      name: 'banner',
      title: 'Banner',
      type: 'customUrl',
      group: 'content',
    },
    videoFeature,
    featureGrid,
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
