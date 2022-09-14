import type { ReactElement } from 'react';
import {
  VStack,
  Heading,
  Box,
  SimpleGrid,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { sanityClient } from '../../../lib/sanity.server';
import groupBy from 'lodash/groupBy';
import { WikiLayout } from '../../../components/Layout/WikiLayout';
import { NextSeo } from 'next-seo';
import { GuideCard } from '../../../components/GuideCard';
import NextLink from 'next/link';

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
      <Alert
        maxWidth="2xl"
        mx="auto"
        mb={12}
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Please read the rules!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          We expect visitors to follow to follow a set of rules in order to maintain a healthy and
          friendly community. Please read them{' '}
          <NextLink href="/wiki/guides/rules-and-guidelines/server-rules" passHref>
            <Link textDecor="underline" textDecorationColor="primaryRed" textUnderlineOffset="3px">
              here.
            </Link>
          </NextLink>
        </AlertDescription>
      </Alert>
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
