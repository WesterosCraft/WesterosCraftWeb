import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas/schema';
import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';
import { projectId, dataset } from './lib/sanity.api';
// import { structure } from './plugins/structure';

// https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/blob/main/sanity.config.ts

export default defineConfig({
  name: 'default',
  title: 'WesterosCraft',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    deskTool(),
    //   {
    //   structure: structure(),
    // }
    media(),
    visionTool({
      // Note: These are both optional
      defaultApiVersion: 'v2021-10-21',
      defaultDataset: dataset,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
