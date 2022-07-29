import featureGrid from './featureGrid';
import hero from './hero';
import seo from './seo';
import testimonialGrid from './testimonialGrid';
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
    testimonialGrid,
    seo,
  ],
};
