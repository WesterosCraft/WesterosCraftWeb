import alternatingFeature from '../objects/alternatingFeature';
import featureGrid from '../objects/featureGrid';
import hero from '../objects/hero';
import imageGridFeature from '../objects/imageGridFeature';
import seo from '../objects/seo';
import serverFeatureGrid from '../objects/serverFeatureGrid';
import testimonialGrid from '../objects/testimonialGrid';
import videoFeature from '../objects/videoFeature';

export default {
  title: 'Home',
  name: 'home',
  type: 'document',
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
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
    imageGridFeature,
    alternatingFeature,
    serverFeatureGrid,
    seo,
  ],
};
