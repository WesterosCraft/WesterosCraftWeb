import type { ReactElement } from 'react';
import { VStack, Heading, Box, SimpleGrid, Divider } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { sanityClient } from '../../../lib/sanity.server';
import groupBy from 'lodash/groupBy';
import { WikiLayout } from '../../../components/Layout/WikiLayout';
import { NextSeo } from 'next-seo';
import { GuideCard } from '../../../components/GuideCard';

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

export enum GuideCategoryType {
  Category = 'category',
}

export enum Title {
  GettingStarted = 'Getting Started',
  HowTo = 'How To',
  Resources = 'Resources',
  RulesGuidelines = 'Rules And Guidelines',
}

export interface Icon {
  _type: IconType;
  asset: Asset;
}

export enum IconType {
  Image = 'image',
}

export interface Asset {
  _ref: string;
  _type: AssetType;
}

export enum AssetType {
  Reference = 'reference',
}

export interface Slug {
  _type: SlugType;
  current: string;
}

export enum SlugType {
  Slug = 'slug',
}

export default function GuidesPage({ pageData }: { pageData: GuidesPageData }) {
  // @ts-ignore
  const sortedGuideData = Object.entries(groupBy(pageData, o => o.guideCategory?.title)) as [
    string,
    GuidesPageData[],
  ][];

  return (
    <>
      <NextSeo title={pageData?.title ?? 'Guides'} />
      <Box mb={12} textAlign="center">
        <Heading size="2xl" mb={5}>
          Guides
        </Heading>
      </Box>
      <VStack w="full" spacing={12}>
        {/* @ts-ignore */}
        {sortedGuideData?.map(([title, guides]) => (
          <VStack w="full" align="flex-start" key={title}>
            <Heading>{title}</Heading>
            <Divider borderColor="primaryDark" />
            <Box w="full">
              <SimpleGrid
                gridAutoRows="1fr"
                minChildWidth="298px"
                mt="8"
                columns={{ base: 2, md: 3 }}
                gap="4"
              >
                {guides.map(guide => (
                  <GuideCard key={guide?._id} {...guide} />
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        ))}
      </VStack>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "guide"]{
      _id,
      title,
      description,
      guideCategory->{ title, _type },
      slug,
      icon
    }`);

  return {
    props: {
      pageData,
    },
  };
};

GuidesPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};
