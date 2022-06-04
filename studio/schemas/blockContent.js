import React from 'react';
import { ExternalLinkRenderer } from '../components/externalLinkRenderer';

import { FiAlignCenter } from 'react-icons/fa';
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

const highlightIcon = () => <span style={{ fontWeight: 'bold' }}>C</span>;

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Title', value: 'title' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {
            blockEditor: {
              icon: FiAlignCenter,
            },
            title: 'Text center',
            value: 'textCenter',
          },
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        // https://www.sanity.io/guides/portable-text-internal-and-external-links
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            blockEditor: {
              render: ExternalLinkRenderer,
            },
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean',
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            blockEditor: {
              icon: FiAlignCenter,
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'location' },
                  { type: 'guide' },
                  { type: 'region' },
                  // other types you may want to link to
                ],
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      name: 'figure',
      title: 'Image',
      type: 'object',
      fields: [
        {
          name: 'image',
          type: 'image',
        },
        {
          name: 'width',
          type: 'number',
        },
        {
          name: 'height',
          type: 'number',
        },
        {
          name: 'alt',
          type: 'string',
        },
        {
          name: 'caption',
          type: 'string',
        },
        {
          name: 'float',
          title: 'Float',
          type: 'string',
          options: {
            list: [
              { title: 'left', value: 'left' },
              { title: 'right', value: 'right' },
            ],
          },
        },
      ],
    },
    {
      name: 'callout',
      title: 'Callout',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'text',
        },
      ],
    },
    {
      name: 'file',
      title: 'File',
      type: 'object',
      fields: [{ name: 'fileField', title: 'File', type: 'internalFile' }],
    },
    {
      name: 'video',
      title: 'Youtube Embed',
      type: 'object',
      fields: [
        {
          name: 'url',
          type: 'url',
        },
      ],
    },
  ],
};
