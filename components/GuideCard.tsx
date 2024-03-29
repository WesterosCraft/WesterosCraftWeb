import { Text, VStack, HStack, Image, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import { urlForImage } from '../lib/sanity.image';
import { slugify } from '../utils';

export interface GuidesPageData {
  _id: string;
  description: null | string;
  guideCategory: GuideCategory;
  icon: Icon;
  slug: Slug;
  title: string;
}

export interface GuideCategory {
  _type: GuideCategoryType;
  title: Title;
}

export interface Icon {
  _type: IconType;
  asset: Asset;
}

export enum IconType {
  Image = 'image',
}

export enum AssetType {
  Reference = 'reference',
}

export interface Asset {
  _ref: string;
  _type: AssetType;
}

export enum GuideCategoryType {
  Category = 'category',
}

export enum Title {
  GettingStarted = 'Getting Started',
  HowTo = 'How To',
  Resources = 'Resources',
  RulesGuidelines = 'Rules And Guidelines',
}

export interface Slug {
  _type: SlugType;
  current: string;
}

export enum SlugType {
  Slug = 'slug',
}

export interface Slug {
  _type: SlugType;
  current: string;
}

export const GuideCard = (guide: GuidesPageData) => {
  return (
    <VStack p={4} outline="1.5px solid black">
      <LinkBox w="full" h="full">
        <HStack spacing={4} w="full" align="flex-start" justify="flex-start">
          <Image
            width="12"
            height="12"
            src={urlForImage(guide.icon.asset).url()}
            alt={guide.title}
          />
          <LinkOverlay
            as={NextLink}
            href={`/wiki/guides/${slugify(guide?.guideCategory?.title)}/${guide?.slug?.current}`}
          >
            <Text fontSize="lg" fontWeight="medium">
              {guide?.title}
            </Text>
          </LinkOverlay>
        </HStack>
        <Text mt="2" fontSize="sm">
          {guide?.description}
        </Text>
      </LinkBox>
    </VStack>
  );
};
