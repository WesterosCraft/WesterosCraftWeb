import type { ReactElement } from 'react';
import {
  Heading,
  VStack,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Img,
  Flex,
  Button,
  Center,
  Link,
} from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { GetStaticProps } from 'next';
import { sanityClient } from '../lib/sanity.server';
import NextImage from 'next/image';
import { urlFor } from '../lib/sanity';
import { ContainerBorder } from '../components/ContainerBorder';
import Raven from '../public/raven.png';

export interface RookeryPage {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  editions: Edition[];
  latestEdition: Edition;
  slug: Slug;
  subheading: string;
  title: string;
}

export interface Edition {
  link: string;
  thumbnail: Thumbnail;
  title: string;
}

export interface Thumbnail {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export interface Slug {
  _type: string;
  current: string;
}

export default function Rookery({ pageData }: { pageData: RookeryPage }) {
  return (
    <Flex flexDir="column" w="full">
      <ContainerBorder
        variant="light"
        as={VStack}
        w="full"
        mx="auto"
        py={{ base: '16', sm: '20' }}
        px="4"
      >
        <Stack direction={{ base: 'column', md: 'row' }} align="center" spacing={12}>
          <Img width={{ base: '100px', md: '120px' }} alt="Raven" src={Raven.src} />
          <Box maxW="2xl" textAlign={{ base: 'center', sm: 'left' }}>
            <Heading size={{ base: '2xl', sm: '3xl', lg: '4xl' }}>{pageData?.title}</Heading>
            <Text fontSize={{ base: 'xl', sm: '2xl' }} maxW="3xl" mt="6">
              {pageData?.subheading}
            </Text>
          </Box>
        </Stack>
      </ContainerBorder>
      <Box w="full" bg="primaryDark">
        <ContainerBorder variant="dark" py={{ base: '24', sm: '32' }} px="4">
          <Center w="full" maxW="5xl" mx="auto">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacingY={{ base: '12', md: undefined }}>
              <NextImage
                priority
                width={512}
                height={650}
                src={urlFor(pageData?.latestEdition?.thumbnail).url()}
                placeholder="blur"
                blurDataURL={pageData?.latestEdition?.thumbnail?.metadata?.lqip}
              />
              <VStack spacing="10" justify="center" align="center" color="white">
                <Box textAlign="center">
                  <Heading size="2xl">Latest Edition</Heading>
                  <Text fontSize="xl" mt="4">
                    {pageData?.latestEdition?.title}
                  </Text>
                </Box>
                <Box>
                  <a href={pageData?.latestEdition?.link} target="_blank" rel="noreferrer">
                    <Button size="lg" colorScheme="whiteAlpha">
                      Read It
                    </Button>
                  </a>
                </Box>
              </VStack>
            </SimpleGrid>
          </Center>
        </ContainerBorder>
      </Box>
      <ContainerBorder pt="14" pb="8" px="4" borderBottom="1px">
        <Center>
          <Heading size="2xl">Past Editions</Heading>
        </Center>
      </ContainerBorder>
      <Box>
        <ContainerBorder py={{ base: '16', sm: '20' }} px="4">
          <SimpleGrid spacingY="12" spacingX="6" columns={{ base: 1, md: 2, lg: 3 }}>
            {pageData?.editions.slice(1).map(edition => (
              <VStack key={edition.title} spacing="3">
                <NextImage
                  width={336}
                  height={435}
                  src={urlFor(edition.thumbnail).url()}
                  placeholder="blur"
                  blurDataURL={edition?.thumbnail?.metadata?.lqip}
                />
                <Flex maxW={336} flexDir="row" w="full" justify="space-between">
                  <Text fontSize="lg" fontWeight="medium">
                    {edition?.title}
                  </Text>
                  <Link
                    fontWeight="md"
                    textDecor="underline"
                    textDecorationColor="primaryRed"
                    textUnderlineOffset="3px"
                    href={edition?.link}
                    isExternal
                  >
                    Read Edition
                  </Link>
                </Flex>
              </VStack>
            ))}
          </SimpleGrid>
        </ContainerBorder>
      </Box>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "rookery"]{
    ...,
    "latestEdition": editions[0]->{
      link,
      "thumbnail": thumbnail.asset->{
        _id,
        _rev,
        metadata {
          lqip
        }
      },
      title
    },
    editions[]->{
      link,
      "thumbnail": thumbnail.asset->{
        _id,
        _rev,
        metadata {
          lqip
        }
      },
      title
    }
  }[0]`);

  return {
    props: {
      pageData,
    },
  };
};

Rookery.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
