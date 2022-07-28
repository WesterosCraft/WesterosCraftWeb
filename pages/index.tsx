import type { ReactElement } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { Hero } from '../components/Hero';
import { VideoFeature } from '../components/VideoFeature';
import { GetStaticProps } from 'next';
import { sanityClient } from '../lib/sanity.server';
import { FeatureGridProps, FeatureGrid } from '../components/FeatureGrid';

export interface HeroPageProps {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  banner: Banner;
  hero: Hero;
  title: string;
  videoFeature: VideoFeature;
  featureGrid: FeatureGridProps;
}

export interface Banner {
  _type: string;
  linkText: string;
}

export interface Hero {
  copy: string;
  heading1: string;
  heading2: string;
  heroImageSlider: HeroImageSlider[];
  outlineButton: OutlineButton;
  solidButton: Banner;
  subheading: string;
}

export interface HeroImageSlider {
  _key: string;
  _type: string;
  location: Location;
  slideImage: VideoThumbnail;
}

export interface Location {
  title: string;
}

export interface VideoThumbnail {
  metadata: Metadata;
  url: string;
}

export interface Metadata {
  lqip: string;
}

export interface OutlineButton {
  internal: Internal;
  linkText: string;
}

export interface Internal {
  slug: Slug;
}

export interface Slug {
  _type: string;
  current: string;
}

export interface VideoFeature {
  heading: string;
  subheading: string;
  videoLink: string;
  videoThumbnail: VideoThumbnail;
}

export default function Home({ pageData }: { pageData: HeroPageProps }) {
  console.log('👾 ~ Home ~ pageData', pageData);
  return (
    <Center flexDir="column" w="full">
      <Hero {...{ ...pageData?.hero, images: pageData?.hero?.heroImageSlider }} />
      <Banner bannerData={pageData?.banner} />
      <FeatureGrid features={pageData?.featureGrid.features} />
      <VideoFeature
        heading={pageData?.videoFeature.heading}
        subheading={pageData?.videoFeature.subheading}
        url={pageData?.videoFeature.videoLink}
        thumbnailUrl={pageData?.videoFeature.videoThumbnail?.url}
        thumbnailBlur={pageData?.videoFeature.videoThumbnail?.metadata?.lqip}
      />
    </Center>
  );
}

function Banner({ bannerData }: { bannerData: Banner }) {
  return (
    <Center w="full" bg="primaryRed" px={4} py={6}>
      <Text color="white" fontSize="xl">
        {bannerData?.linkText}
      </Text>
    </Center>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "home"]{
    ...,
    hero {
      ...,
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
      },
      outlineButton {
        linkText,
        internal->{ slug }
      }
    },
    featureGrid {
      ...,
      features[]{
        ...,
        "banner": banner.asset->{
          url,
          metadata {
            lqip
          }
        }
      }
    },
    videoFeature {
      ...,
      "videoThumbnail": videoThumbnail.asset->{
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
