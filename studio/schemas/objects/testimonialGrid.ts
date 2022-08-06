export default {
  name: 'testimonialGrid',
  title: 'Testimonial Grid',
  type: 'object',
  group: 'content',
  fields: [
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          name: 'testimonial',
          title: 'Testimonial',
          type: 'object',
          fields: [
            {
              name: 'quote',
              type: 'string',
              title: 'Quote',
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};
