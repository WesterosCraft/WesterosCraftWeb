import type { ReactElement } from 'react';
import { Center, Box, Heading } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { Hero, HeroProps } from '../components/Hero';
import { VideoFeatureProps, VideoFeature } from '../components/VideoFeature';
import { GetStaticProps } from 'next';
import { sanityClient } from '../lib/sanity.server';
import { FeatureGridProps, FeatureGrid } from '../components/FeatureGrid';
import { TestimonialsProps, Testimonials } from '../components/Testimonials';
import { Seo, SEOProps } from '../components/Seo';
import { Banner, BannerProps } from '../components/Banner';
import { ImageGridFeature, ImageGridFeatureProps } from '../components/ImageGridFeature';
import { ServerFeatureGrid, ServerFeatureGridProps } from '../components/ServerFeatureGrid';
import { AlternatingFeature, AlternatingFeatureProps } from '../components/AlternatingFeature';
import { AnimatedLetters } from '../components/AnimatedLetters';
import { ContainerBorder } from '../components/ContainerBorder';

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
  testimonialGrid: TestimonialsProps;
  imageGridFeature: ImageGridFeatureProps;
  alternatingGridFeature: AlternatingFeatureProps;
  serverFeatureGrid: ServerFeatureGridProps;
  seo: SEOProps;
}

export default function HomePage({ pageData }: { pageData: HeroPageProps }) {
  return (
    <>
      <Seo title={pageData?.seo?.title} />
      <Center flexDir="column" w="full">
        <Hero {...pageData?.hero} />
        <Banner {...pageData?.banner} />
        <Box w="full" bg="primaryDark">
          <ContainerBorder variant="dark" pt="14" pb="8" px="4" borderBottomWidth="1px">
            <Center>
              <Heading color="white" size="2xl">
                <AnimatedLetters text="Start your journey" />
              </Heading>
            </Center>
          </ContainerBorder>
          <FeatureGrid {...pageData?.featureGrid} />
          <ServerFeatureGrid {...pageData?.serverFeatureGrid} />
          <VideoFeature {...pageData?.videoFeature} />
        </Box>
        <Box w="full">
          <ContainerBorder pt="14" pb="8" px="4" borderBottom="1px">
            <Center>
              <Heading size="2xl">
                <AnimatedLetters text="Explore the Realm" />
              </Heading>
            </Center>
          </ContainerBorder>
          <ImageGridFeature {...pageData?.imageGridFeature} />
          <AlternatingFeature {...pageData?.alternatingGridFeature} />
        </Box>
        <Testimonials {...pageData?.testimonialGrid} />
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
      },
      solidButton {
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
      leftImage {
        asset->{
          _id,
          _rev,
          metadata {
            lqip
          }
        }
      },
      rightImage {
        asset->{
          _id,
          _rev,
          metadata {
            lqip
          }
        }
      },
      servers[] {
        ...,
        leftButton {
          ...,
          internal->{
            slug
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
    },
    alternatingGridFeature {
      ...,
      features[]{
        ...,
        link {
          linkText,
          external,
          internal->{ slug }
        },
        "image": image.asset->{
          _id,
          _rev,
          metadata {
            lqip
          }
        }
      }
    }
  }[0]`);

  return { props: { pageData }, revalidate: 60 };
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
