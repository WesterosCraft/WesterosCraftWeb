import type { ReactElement } from 'react';
import { Center, Box, Heading, VStack, Img, SimpleGrid } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { Hero } from '../components/Hero';
import { VideoFeature } from '../components/VideoFeature';
import { GetStaticProps } from 'next';
import { sanityClient } from '../lib/sanity.server';
import { FeatureGridProps, FeatureGrid } from '../components/FeatureGrid';
import { TestimonialGrid, Testimonials } from '../components/Testimonials';
import { Seo, SEOProps } from '../components/Seo';
import { Banner, BannerProps } from '../components/Banner';
import { ImageGridFeature, ImageGridFeatureProps } from '../components/ImageGridFeature';
import { ServerFeatureGrid } from '../components/ServerFeatureGrid';
import { AlternatingFeature, AlternatingFeatures } from '../components/AlternatingFeature';
import { LeafGrid } from '../components/LeafGrid';
import Longclaw from '../public/longclaw.png';

export interface HeroPageProps {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  banner: BannerProps;
  hero: Hero;
  title: string;
  videoFeature: VideoFeature;
  featureGrid: FeatureGridProps;
  testimonialGrid: TestimonialGrid;
  seo: SEOProps;
  imageGridFeature: ImageGridFeatureProps;
  alternatingGridFeature: AlternatingFeatures;
}

export interface Hero {
  copy: string;
  heading1: string;
  heading2: string;
  heroImageSlider: HeroImageSlider[];
  outlineButton: OutlineButton;
  solidButton: OutlineButton;
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
    <>
      <Seo title={pageData?.seo?.title} />
      <Center flexDir="column" w="full">
        <Hero {...{ ...pageData?.hero, images: pageData?.hero?.heroImageSlider }} />
        <Banner bannerData={pageData?.banner} />
        <Box w="full" bg="primaryDark">
          <Box maxW="7xl" mx="auto" px={[2, null, 4]}>
            <Center
              pt="14"
              pb="8"
              borderLeft="1px"
              borderRight="1px"
              borderBottom="1px"
              borderColor="primaryGold"
            >
              <VStack>
                <Heading color="white" size="2xl">
                  Start your journey
                </Heading>
              </VStack>
            </Center>
          </Box>
          <FeatureGrid features={pageData?.featureGrid.features} />

          <ServerFeatureGrid />
          <VideoFeature
            heading={pageData?.videoFeature.heading}
            subheading={pageData?.videoFeature.subheading}
            url={pageData?.videoFeature.videoLink}
            thumbnailUrl={pageData?.videoFeature.videoThumbnail?.url}
            thumbnailBlur={pageData?.videoFeature.videoThumbnail?.metadata?.lqip}
          />
        </Box>
        <Box w="full">
          <Box maxW="7xl" mx="auto" px={[2, null, 4]}>
            <Center
              pt="14"
              pb="8"
              borderLeft="1px"
              borderRight="1px"
              borderBottom="1px"
              borderColor="black"
            >
              <Heading size="2xl">Explore</Heading>
            </Center>
          </Box>
          <ImageGridFeature {...pageData?.imageGridFeature} />
          <LeafGrid />
          <AlternatingFeature {...pageData?.alternatingGridFeature} />
        </Box>
        <Testimonials testimonials={pageData?.testimonialGrid?.testimonials} />
      </Center>
    </>
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
            lqip
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
          lqip
        }
      }
    },
    imageGridFeature {
      ...,
      images[]{
        ...,
        asset->{
          ...,
          metadata {
            lqip
          }
        }
      },
      links[]{
        ...,
        linkUrl {
          linkText,
          internal->{ slug }
        }
      }
    }
  }[0]`);

  return { props: { pageData }, revalidate: 60 };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
