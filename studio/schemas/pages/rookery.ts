export default {
  name: 'rookery',
  title: 'Rookery',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'coverImage', type: 'image', title: 'Cover Image' },
    { name: 'link', type: 'customUrl', title: 'Link' },
  ],
};
