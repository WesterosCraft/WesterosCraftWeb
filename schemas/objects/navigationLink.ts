export default {
  name: 'navigation.link',
  type: 'object',
  title: 'Link',
  preview: {
    select: {
      title: 'title',
      targetTitle: 'target.title',
    },
    prepare: ({ title, targetTitle }: any) => ({
      title: title || targetTitle,
    }),
  },
  fields: [
    {
      type: 'reference',
      name: 'target',
      title: 'Target link',
      to: [{ type: 'page' }, { type: 'home' }, { type: 'guide' }],
      // _weak: true // enable if you don't want reference integrity checks
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'Override title from the target link.',
    },
    {
      type: 'string',
      name: 'description',
      title: 'Description',
    },
  ],
};
