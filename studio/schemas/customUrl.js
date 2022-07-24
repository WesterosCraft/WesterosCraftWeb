export default {
  name: 'customUrl',
  title: 'Custom URL',
  type: 'object',
  fields: [
    {
      name: 'linkText',
      type: 'string',
      title: 'Link Text',
      hidden: ({ parent, value }) => !value && parent?.internal,
    },
    {
      name: 'external',
      type: 'url',
      title: 'URL',
      hidden: ({ parent, value }) => !value && parent?.internal,
    },
    {
      name: 'internal',
      type: 'reference',
      to: [{ type: 'location' }, { type: 'guide' }, { type: 'page' }],
      hidden: ({ parent, value }) => !value && parent?.external,
    },
  ],
};
