export default {
  name: 'navigation.section',
  type: 'object',
  title: 'Section',
  fields: [
    {
      type: 'reference',
      name: 'target',
      title: 'Target page',
      to: [{ type: 'page' }, { type: 'home' }, { type: 'guide' }],
      // _weak: true // enable if you don't want reference integrity checks
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'boolean',
      name: 'isExternal',
      title: 'Is External?',
    },
    {
      type: 'url',
      name: 'externalLink',
      title: 'External Link',
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [{ type: 'navigation.link' }],
    },
  ],
};
