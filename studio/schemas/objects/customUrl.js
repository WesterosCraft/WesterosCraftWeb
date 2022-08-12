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
      title: 'External Url',
      hidden: ({ parent, value }) => !value && parent?.internal,
    },
    {
      name: 'internal',
      title: 'Internal Url',
      type: 'reference',
      to: [
        { type: 'location' },
        { type: 'guide' },
        { type: 'page' },
        { type: 'join' },
        { type: 'rookery' },
      ],
      hidden: ({ parent, value }) => !value && parent?.external,
    },
  ],
};
