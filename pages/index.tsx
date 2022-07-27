import type { ReactElement } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { Hero } from '../components/Hero';
import { VideoFeature } from '../components/VideoFeature';
import { GetStaticProps } from 'next';
import { sanityClient } from '../lib/sanity.server';

export interface HomePageData {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  heroCopy: string;
  heroHeading1: string;
  heroHeading2: string;
  heroImageSlider: HeroImageSlider[];
  heroOutlineButton: HeroButton;
  heroSolidButton: HeroButton;
  heroSubheading: string;
  title: string;
}

export interface HeroImageSlider {
  key: string;
  type: string;
  location: Location;
  slideImage: SlideImage;
}

export interface Location {
  title: string;
}

export interface SlideImage {
  metadata: Metadata;
  url: string;
}

export interface Metadata {
  lqip: string;
}

export interface Internal {
  slug: { current: string };
  type: string;
}

export interface SlideImage {
  type: string;
  asset: Internal;
}

export interface HeroButton {
  type: string;
  internal: Internal;
  linkText: string;
}

export default function Home({ pageData }: { pageData: HomePageData }) {
  return (
    <Center flexDir="column" w="full">
      <Hero
        copy={pageData?.heroCopy}
        subheading={pageData?.heroSubheading}
        heading1={pageData?.heroHeading1}
        outlineButton={pageData?.heroOutlineButton}
        solidButton={pageData?.heroSolidButton}
        heading2={pageData?.heroHeading2}
        images={pageData?.heroImageSlider}
      />
      <Center w="full" bg="primaryRed" px={4} py={6}>
        <Text color="white" fontSize="xl">
          The Summer 2022 Rookery is out!
        </Text>
      </Center>
      <VideoFeature />
    </Center>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "home"]{
    ...,
    heroOutlineButton {
      linkText,
      internal->{ slug }
    },
    heroImageSlider[]{
      ...,
      location->{
        title
      },
      "slideImage": slideImage.asset->{
        url,
        metadata {
          lqip,
        }
      }
    }
  }[0]`);

  return { props: { pageData }, revalidate: 60 };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
