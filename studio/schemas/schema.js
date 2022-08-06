// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './objects/blockContent';
import location from './documents/location';
import region from './documents/region';
import guide from './documents/guide';
import customUrl from './objects/customUrl';
import imageGallery from './objects/imageGallery';
import buildCategory from './objects/buildCategory';
import callout from './objects/callout';
import youtubeVideo from './objects/youtubeVideo';
import accordion from './objects/accordion';
import file from './objects/file';
import page from './documents/page';
import category from './objects/category';
import home from './pages/home';
import rookery from './pages/rookery';
import siteConfig from './documents/siteConfig';
import navigation from './objects/navigation';
import navigationSection from './objects/navigationSection';
import navigationLink from './objects/navigationLink';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    page,
    location,
    region,
    buildCategory,
    guide,
    callout,
    youtubeVideo,
    home,
    rookery,
    blockContent,
    customUrl,
    imageGallery,
    accordion,
    file,
    category,
    siteConfig,
    navigation,
    navigationSection,
    navigationLink,
  ]),
});
