import {
  Heading,
  useColorModeValue,
  Flex,
  Box,
  LinkBox,
  LinkOverlay,
  Divider,
  Text,
  VStack,
  SimpleGrid,
  Container,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { sanityClient } from '../../lib/sanity.server';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { WikiLayout } from '../../components/Layout/WikiLayout';
import { LocationCard } from '../../components/LocationCard';
import { urlFor } from '../../lib/sanity';
import { NextSeo } from 'next-seo';
import { Banner } from '../../components/Banner';
import Dropcap from '../../components/Dropcap';

export interface WikiPageData {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  copy: string;
  createdLocations: AtedLocation[];
  slug: Slug;
  title: string;
  updatedLocations: AtedLocation[];
}

export interface AtedLocation {
  extendedBuildCategory: ExtendedBuildCategory;
  extendedImage: ExtendedImage | null;
  house: string;
  projectStatus: string;
  region: Region;
  slug: Slug;
  title: string;
}

export interface ExtendedBuildCategory {
  title: string;
}

export interface ExtendedImage {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export interface Region {
  slug: Slug;
}

export interface Slug {
  _type: Type;
  current: string;
}

export enum Type {
  Slug = 'slug',
}

export default function Wiki({ pageData }: { pageData: WikiPageData }) {
  return (
    <>
      <NextSeo title={pageData?.title} description={pageData?.copy} />
      <Box>
        <Box textAlign={{ base: 'center', md: 'left' }}>
          <Heading size="2xl" fontWeight="bold" letterSpacing="3px">
            WesterosCraft Wiki
          </Heading>
        </Box>
        <Box maxW="2xl" mt={8} textAlign={{ base: 'center', md: 'left' }}>
          <Text>
            WesterosCraft is a Minecraft server dedicated to recreating the continent of Westeros.
            Westeros is part of the fictional world from the book series{' '}
            <i>A Song of Ice and Fire</i>, which was adapted into a TV show by HBO called{' '}
            <i>Game of Thrones</i>. In this Wiki you will find Information about our Projects,
            Rules, Guides and Tutorials. For the latest updates head to our homepage.
          </Text>
          <Text mt={4}>Join, explore, and enjoy!</Text>
        </Box>
        <Box mt="10">
          <Cards />
        </Box>
        <Box mt="12" mb="16">
          <Banner
            link="https://discord.com/invite/pBS5TH4"
            linkText="Connect with the WesterosCraft community on Discord!"
            isExternal
          />
        </Box>
        <VStack w="full" spacing="12">
          <Box w="full">
            <VStack align="flex-start">
              <Heading>Recently Created</Heading>
              <Divider borderColor="primaryDark" />
            </VStack>
            <SimpleGrid
              gridAutoRows="1fr"
              minChildWidth="298px"
              mt="8"
              columns={{ base: 1, md: 2, lg: 3 }}
              gap="4"
            >
              {pageData?.createdLocations.map(loc => (
                <LocationCard
                  key={loc?.title}
                  title={loc?.title}
                  category={loc?.extendedBuildCategory?.title}
                  image={loc.extendedImage?._rev ? urlFor(loc.extendedImage).url() : undefined}
                  blurDataURL={
                    loc.extendedImage?._rev ? loc.extendedImage?.metadata?.lqip : undefined
                  }
                  link={`/wiki/locations/${loc?.region?.slug?.current}/${loc?.slug?.current}`}
                  projectStatus={loc?.projectStatus}
                  house={loc?.house}
                />
              ))}
            </SimpleGrid>
          </Box>
          <Box w="full">
            <VStack align="flex-start">
              <Heading>Recently Updated</Heading>
              <Divider borderColor="primaryDark" />
            </VStack>
            <SimpleGrid
              gridAutoRows="1fr"
              minChildWidth="298px"
              mt="8"
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing="8"
            >
              {pageData?.updatedLocations.map(loc => (
                <LocationCard
                  key={loc?.title}
                  title={loc?.title}
                  category={loc?.extendedBuildCategory?.title}
                  image={loc.extendedImage?._rev ? urlFor(loc.extendedImage).url() : undefined}
                  blurDataURL={
                    loc.extendedImage?._rev ? loc.extendedImage.metadata.lqip : undefined
                  }
                  link={`${loc?.region?.slug?.current}/${loc?.slug?.current}`}
                  projectStatus={loc?.projectStatus}
                  house={loc?.house}
                />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>
    </>
  );
}

const Cards = () => (
  <SimpleGrid height="auto" gap={8} minChildWidth={['320px', '392px']}>
    {[
      {
        title: 'Guides',
        subtitle: 'View in depth guides on how to explore and play on our server.',
        href: '/wiki/guides',
        image:
          'https://cdn.sanity.io/images/1as7cn02/production/a1e3f84a67270e65cba4daee16005c5611639d65-1000x755.png',
      },
      {
        title: 'Locations',
        subtitle: 'View a single comprehensive list of every build we have to offer.',
        href: '/wiki/locations',
        image:
          'https://cdn.sanity.io/images/1as7cn02/production/6aa4f30c3b90f86ee2f16625f65531a0c041894d-1000x563.png',
      },
    ].map((i, n) => (
      <Card key={n} {...i} />
    ))}
  </SimpleGrid>
);

const Card = ({ title = '', href = '', subtitle = '', image = '' }) => {
  const borderColor = useColorModeValue('primaryDark', 'primaryLight');

  return (
    <LinkBox
      as={Flex}
      borderColor={borderColor}
      outline="1.5px solid"
      outlineColor="primaryDark"
      flexDirection="column"
      justifyContent="space-between"
      cursor="pointer"
      p={4}
      transition="all .3s ease"
      _hover={{
        bg: 'primaryGlare',
        outline: '1.5px solid black',
        cursor: 'pointer',
      }}
    >
      <LinkOverlay as={Link} href={href}>
        <Box>
          <VStack textAlign="center" width="full">
            <Heading size="lg" color={borderColor}>
              {title}
            </Heading>
            <Text>{subtitle}</Text>
          </VStack>
          <Divider borderBottomColor="primaryDark" mt={2} />
          <Flex
            height="300px"
            width="full"
            outline="1.5px solid black"
            bgColor="#fff8e0"
            mt={3}
            mb={2}
            overflow="hidden"
          >
            <Box
              alignSelf="flex-end"
              position="relative"
              width={362}
              maxHeight="300px"
              height="full"
            >
              <Image layout="fill" src={image} alt={title} />
            </Box>
          </Flex>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "page" && slug.current == "wiki"]{
    ...,
    "createdLocations": *[_type == 'location'] | order(dateCompleted desc)[0...6] {
      title,
      house,
      projectStatus,
      slug,
      region->{ slug },
      "extendedBuildCategory": buildCategory[0]-> { title },
      "extendedImage": additionalImages.images[0].asset->{
        _rev,
        _id,
        metadata {
          lqip
        }
      }
    },
    "updatedLocations": *[_type == 'location'] | order(_updatedAt desc)[0...6] {
      title,
      house,
      projectStatus,
      slug,
      region->{ slug },
      "extendedBuildCategory": buildCategory[0]-> { title },
      "extendedImage": additionalImages.images[0].asset->{
        _rev,
        _id,
        metadata {
          lqip
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
Wiki.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};
