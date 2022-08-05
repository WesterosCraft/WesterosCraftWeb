import type { ReactElement } from 'react';
import { Center, Box, Heading, VStack, Img, SimpleGrid } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { Hero, HeroProps } from '../components/Hero';
import { VideoFeatureProps, VideoFeature } from '../components/VideoFeature';
import { GetStaticProps } from 'next';
import { sanityClient } from '../lib/sanity.server';
import { FeatureGridProps, FeatureGrid } from '../components/FeatureGrid';
import { TestimonialGrid, Testimonials } from '../components/Testimonials';
import { Seo, SEOProps } from '../components/Seo';
import { Banner, BannerProps } from '../components/Banner';
import { ImageGridFeature, ImageGridFeatureProps } from '../components/ImageGridFeature';
import { ServerFeatureGrid, ServerFeatureGridProps } from '../components/ServerFeatureGrid';
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
  hero: HeroProps;
  title: string;
  videoFeature: VideoFeatureProps;
  featureGrid: FeatureGridProps;
  testimonialGrid: TestimonialGrid;
  seo: SEOProps;
  imageGridFeature: ImageGridFeatureProps;
  alternatingGridFeature: AlternatingFeatures;
  serverFeatureGrid: ServerFeatureGridProps;
}

export default function Home({ pageData }: { pageData: HeroPageProps }) {
  console.log('👾 ~ Home ~ pageData', pageData);
  return (
    <>
      <Seo title={pageData?.seo?.title} />
      <Center flexDir="column" w="full">
        <Hero {...pageData?.hero} />
        <Banner {...pageData?.banner} />
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
          <FeatureGrid {...pageData?.featureGrid} />
          <ServerFeatureGrid {...pageData?.serverFeatureGrid} />
          <VideoFeature {...pageData?.videoFeature} />
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
          {/* <LeafGrid /> */}
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
          _id,
          _rev,
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
          _id,
          _rev,
          metadata {
            lqip
          }
        }
      }
    },
    videoFeature {
      ...,
      "videoThumbnail": videoThumbnail.asset->{
        _id,
        _rev,
        metadata {
          lqip
        }
      }
    },
    serverFeatureGrid {
      ...,
      image {
        asset->{
          _id,
          _rev,
          metadata {
            lqip
          }
        }
      }
    },
    imageGridFeature {
      ...,
      images[]{
        ...,
        asset->{
          _id,
          _rev,
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
