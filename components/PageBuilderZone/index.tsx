import { Accordion, PageBuilderAccordion } from './Accordion';
import { ImageGallery, PageBuilderImageGallery } from './ImageGallery';

export const PageBuilderZone = (props: ImageGallery | Accordion) => {
  if (props?._type === 'imageGallery') {
    return <PageBuilderImageGallery {...props} />;
  }

  if (props?._type === 'accordion') {
    return <PageBuilderAccordion {...props} />;
  }

  return null;
};
