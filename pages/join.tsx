import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Text, Box, Heading, Flex, Center, VStack, Img, HStack } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { sanityClient } from '../lib/sanity.server';
import { Seo } from '../components/Seo';
import Longclaw from '../public/longclaw.png';
import { ContainerBorder } from '../components/ContainerBorder';
import { PricingTiers } from '../components/PricingTiers/PricingTiers';
import { TwoTiers } from '../components/TwoTiers/TwoTiers';

export interface JoinPageData {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  guides: Guide[];
  heading: string;
  otherHeading: string;
  otherSubheading: string;
  startedHeading: string;
  startedSubheading: string;
  slug: Slug;
  subheading: string;
  title: string;
  seo: any;
  otherGuides: OtherGuides[];
}

export interface Guide {
  _key: string;
  _type: string;
  description: string;
  features: string;
  guideRef: GuideRef;
  isRecommended: boolean;
  name: string;
}

export interface GuideRef {
  slug: Slug;
  guideCategory: { title: string };
}

export interface Slug {
  _type: string;
  current: string;
}

export interface OtherGuides {
  description: string;
  guideCategory: GuideCategory;
  slug: Slug;
  title: string;
  icon: any;
}

export interface GuideCategory {
  title: string;
}

export interface Slug {
  _type: string;
  current: string;
}

export default function JoinPage({ pageData }: { pageData: JoinPageData }) {
  return (
    <>
      <Seo title={pageData?.seo?.title || pageData?.title} />
      <Flex flexDir="column" w="full">
        <ContainerBorder
          variant="light"
          as={VStack}
          w="full"
          mx="auto"
          py={{ base: '16', sm: '20' }}
        >
          <HStack spacing={{ base: 4, sm: 12 }}>
            <Img mt="12" width="80px" alt="Longclaw" src={Longclaw.src} />
            <Box maxW="2xl">
              <Heading size={{ base: '2xl', sm: '3xl', lg: '4xl' }}>{pageData?.heading}</Heading>
              <Text fontSize="2xl" maxW="3xl" mt="6">
                {pageData?.subheading}
              </Text>
            </Box>
          </HStack>
        </ContainerBorder>
        <Box w="full" bg="primaryDark">
          <ContainerBorder variant="dark" py={{ base: '24', sm: '32' }}>
            <Center
              px="4"
              textAlign="center"
              flexDirection="column"
              color="white"
              maxW="2xl"
              mx="auto"
            >
              <Heading size={{ base: 'xl', sm: '3xl' }} color="primaryGold">
                {pageData?.startedHeading}
              </Heading>
              <Text mt="6" fontSize="xl">
                {pageData?.startedSubheading}
              </Text>
            </Center>
          </ContainerBorder>
          <PricingTiers data={pageData?.guides} />
        </Box>
        <TwoTiers data={pageData?.otherGuides} />
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "join"]{
    ...,
    guides[] {
      ...,
      guideRef->{
        slug,
        guideCategory->{ title }
      }
    },
    otherGuides[]->{
      slug,
      guideCategory->{ title },
      description,
      title,
      icon {
        asset->{
          url
        }
      }
    }
  }[0]`);

  return {
    props: {
      pageData,
    },
  };
};

JoinPage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
