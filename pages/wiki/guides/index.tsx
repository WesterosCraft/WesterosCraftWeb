import type { ReactElement } from 'react';
import {
  Text,
  VStack,
  Heading,
  Container,
  Box,
  SimpleGrid,
  Divider,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { sanityClient } from '../../../lib/sanity.server';
import groupBy from 'lodash/groupBy';
import { WikiLayout } from '../../../components/Layout/WikiLayout';
import { urlFor } from '../../../lib/sanity';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';

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
                  <GuideCard key={guide?._id}>
                    <LinkBox h="full">
                      <HStack spacing={4} w="full" align="flex-start" justify="flex-start">
                        <Image
                          width="12"
                          height="12"
                          src={urlFor(guide.icon.asset).url()}
                          alt={guide.title}
                        />
                        <NextLink href={`/wiki/guides/${guide?.slug?.current}`} passHref>
                          <LinkOverlay>
                            <Text fontSize="lg" fontWeight="medium">
                              {guide?.title}
                            </Text>
                          </LinkOverlay>
                        </NextLink>
                      </HStack>
                      <Text mt="2" fontSize="sm">
                        {guide?.description}
                      </Text>
                    </LinkBox>
                  </GuideCard>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        ))}
      </VStack>
    </>
  );
}

function GuideCard({ children }: any) {
  return (
    <VStack p={4} outline="1.5px solid black">
      {children}
    </VStack>
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
