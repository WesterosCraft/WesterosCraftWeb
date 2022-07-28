export default {
  name: 'videoFeature',
  title: 'Video Feature',
  type: 'object',
  group: 'content',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'videoLink',
      title: 'Video Link',
      type: 'url',
    },
    {
      name: 'videoThumbnail',
      title: 'Video Thumbnail',
      type: 'image',
    },
  ],
};
