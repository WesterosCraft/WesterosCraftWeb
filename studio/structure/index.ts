import { StructureBuilder as S } from '@sanity/structure';

import { RiPagesLine, RiPagesFill, RiPriceTag3Fill } from 'react-icons/ri';

const pageList = [
  'guide',
  'location',
  'media.tag',
  'rookery',
  'region',
  'category',
  'buildCategory',
  'home',
  'page',
  'join',
  'rookeryEdition',
  'about',
  'progress',
];

const hiddenDocTypes = (listItem: any) => !pageList.includes(listItem.getId());

const structure = () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .icon(RiPagesLine)
        .child(
          S.list()
            // Sets a title for our new list
            .title('Pages')
            .items([
              S.documentListItem().schemaType('home').id('8f0dcf71-3eb0-4032-a2c4-8f919aaa8908'),
              S.documentListItem().schemaType('join').id('ab27c7a8-6640-4afd-adf3-d9c4cc3d82d8'),
              S.documentListItem().schemaType('page').id('fa3f1012-af94-4d3b-aaf2-cc986c52d471'),
              S.documentListItem().schemaType('page').id('06cf936a-274f-4746-b210-b30f75b02074'),
              S.documentListItem().schemaType('about').id('732cd7ab-edd9-4380-b714-f142cea5092b'),
              S.documentListItem().schemaType('page').id('af51b184-4e59-4b48-b04f-862580eb88a9'),
              S.documentListItem().schemaType('rookery').id('e1eada00-e72d-44c2-8235-1c43b319bc81'),
              S.documentListItem()
                .schemaType('progress')
                .id('a9fbc1d3-6345-498d-82b2-c99989b5db1a'),
            ]),
        ),

      S.listItem()
        .title('Wiki Pages')
        .icon(RiPagesFill)
        .child(
          S.list()
            // Sets a title for our new list
            .title('Pages')
            .items([
              S.listItem()
                .title('Locations')
                // .icon(RiMapPin2Line)
                .child(
                  S.documentTypeList('location')
                    .title('Locations')
                    .filter('_type == $type')
                    .params({ type: 'location' }),
                ),
              S.listItem()
                .title('Guides')
                // .icon(RiMapPin2Line)
                .child(
                  S.documentTypeList('guide')
                    .title('Guides')
                    .filter('_type == $type')
                    .params({ type: 'guide' }),
                ),
            ]),
        ),
      S.listItem()
        .title('Tags & Categories')
        .icon(RiPriceTag3Fill)
        .child(
          S.list()
            // Sets a title for our new list
            .title('Tags')
            .items([
              S.listItem()
                .title('Media Tags')
                // .icon(RiMapPin2Line)
                .child(
                  S.documentTypeList('media.tag')
                    .title('Media Tags')
                    .filter('_type == $type')
                    .params({ type: 'media.tag' }),
                ),
              S.listItem()
                .title('Rookery Editions')
                // .icon(RiMapPin2Line)
                .child(
                  S.documentTypeList('rookeryEdition')
                    .title('Rookery Edition')
                    .filter('_type == $type')
                    .params({ type: 'rookeryEdition' }),
                ),
              S.listItem()
                .title('Regions')
                // .icon(RiMapPin2Line)
                .child(
                  S.documentTypeList('region')
                    .title('Regions')
                    .filter('_type == $type')
                    .params({ type: 'region' }),
                ),
              S.listItem()
                .title('Categories')
                // .icon(RiMapPin2Line)
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                    .filter('_type == $type')
                    .params({ type: 'category' }),
                ),
              S.listItem()
                .title('Build Types')
                // .icon(RiMapPin2Line)
                .child(
                  S.documentTypeList('buildCategory')
                    .title('Build Types')
                    .filter('_type == $type')
                    .params({ type: 'buildCategory' }),
                ),
            ]),
        ),
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);

export default structure;
