// We import object and document schemas
import blockContent from './objects/blockContent';
import location from './documents/location';
import region from './documents/region';
import guide from './documents/guide';
import customUrl from './objects/customUrl';
import imageGallery from './objects/imageGallery';
import buildCategory from './objects/buildCategory';
// import callout from './objects/callout';
import youtubeVideo from './objects/youtubeVideo';
import accordion from './objects/accordion';
// import file from './objects/file';
import page from './documents/page';
import category from './objects/category';
import home from './pages/home';
import join from './pages/join';
import wiki from './pages/wiki';
import rookery from './pages/rookery';
import progress from './pages/progress';
import about from './pages/about';
import siteConfig from './documents/siteConfig';
import navigation from './objects/navigation';
import navigationSection from './objects/navigationSection';
import navigationLink from './objects/navigationLink';
import rookeryEdition from './objects/rookeryEdition';

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [
  page,
  about,
  location,
  region,
  wiki,
  buildCategory,
  rookeryEdition,
  guide,
  // callout,
  youtubeVideo,
  progress,
  home,
  rookery,
  join,
  blockContent,
  customUrl,
  imageGallery,
  accordion,
  // file,
  category,
  siteConfig,
  navigation,
  navigationSection,
  navigationLink,
];
