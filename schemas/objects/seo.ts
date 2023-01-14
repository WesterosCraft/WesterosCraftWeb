export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  group: 'seo',
  fields: [
    { name: 'title', title: 'title', type: 'string' },
    { name: 'description', title: 'description', type: 'string' },
    {
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
    },
  ],
};
