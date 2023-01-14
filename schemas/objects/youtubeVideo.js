export default {
  name: "youtubeVideo",
  type: "object",
  title: "YouTube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
    },
    {
      name: "thumbnail",
      type: "image",
      title: "Video Thumbnail",
    },
  ],
};
