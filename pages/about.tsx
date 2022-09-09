/* eslint-disable react/no-unescaped-entities */
import type { ReactElement } from 'react';
import React from 'react';
import { GetStaticProps } from 'next';
import {
  Flex,
  VStack,
  Stack,
  Box,
  Heading,
  Img,
  Text,
  chakra,
  Center,
  Button,
} from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { sanityClient } from '../lib/sanity.server';
import { ContainerBorder } from '../components/ContainerBorder';
import Baratheon from '../public/banner-Lannister.png';
import Dropcap from '../components/Dropcap';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';
import NextImage from 'next/future/image';
import NextLink from 'next/link';

export interface AboutPageData {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  copy: Copy[];
  heading: string;
  slug: Slug;
  subheading: string;
  title: string;
}

export interface Copy {
  _key: string;
  _type: string;
  content: Content[];
  variant: string;
  topBorder?: boolean;
}

export interface Content {
  _key: string;
  _type: ContentType;
  children?: Child[];
  markDefs?: any[];
  style?: Style;
  alt?: string;
  caption?: string;
  height?: number;
  image?: Image;
  width?: number;
}

export enum ContentType {
  Block = 'block',
  Figure = 'figure',
}

export interface Child {
  _key: string;
  _type: ChildType;
  marks: string[];
  text: string;
}

export enum ChildType {
  Span = 'span',
}

export interface Image {
  _type: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export enum Style {
  H3 = 'h3',
  Normal = 'normal',
  Title = 'title',
}

export interface Slug {
  _type: string;
  current: string;
}

export default function AboutPage({ pageData }: { pageData: AboutPageData }) {
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
          <Img width={{ base: '100px', md: '120px' }} alt="Raven" src={Baratheon.src} />
          <Box maxW="2xl" textAlign={{ base: 'center', sm: 'left' }}>
            <Heading size={{ base: '2xl', sm: '3xl', lg: '4xl' }}>{pageData?.heading}</Heading>
            <Text fontSize={{ base: 'xl', sm: '2xl' }} maxW="3xl" mt="6">
              {pageData?.subheading}
            </Text>
          </Box>
        </Stack>
      </ContainerBorder>
      <Box w="full" bg="primaryDark">
        <ContainerBorder variant="dark" pt="14" pb="8" px="4" borderBottomWidth="1px">
          <Center>
            <Heading color="white" size="2xl">
              Our story
            </Heading>
          </Center>
        </ContainerBorder>
      </Box>
      {pageData?.copy?.map((item: any) => (
        <Box
          key={item?._key}
          width="full"
          bg={item?.variant === 'dark' ? 'primaryDark' : undefined}
        >
          <ContainerBorder
            variant={item?.variant === 'dark' ? 'dark' : 'light'}
            color={item?.variant === 'dark' ? 'white' : 'primaryDark'}
            borderTop={
              item?.topBorder
                ? `1px solid ${item?.variant === 'dark' ? 'white' : 'black'}`
                : undefined
            }
            pt={['20', '24']}
            pb={['24', '32']}
            px="4"
          >
            <Box maxW="3xl" mx="auto" textAlign="center">
              <PortableText
                value={item?.content}
                components={{
                  block: {
                    // Ex. 1: customizing common block types
                    title: ({ children }) => (
                      <Text fontSize="xl" mb="6">
                        {children}
                      </Text>
                    ),
                    normal: ({ children }) => (
                      <Text mb="6" fontSize={{ base: 'md', sm: 'lg' }}>
                        {children}
                      </Text>
                    ),
                    h3: ({ children }) => (
                      <Heading
                        mb="6"
                        color={item?.variant === 'dark' ? 'primaryGold' : 'primaryDark'}
                        fontSize={{ base: '3xl', sm: '4xl' }}
                      >
                        {children}
                      </Heading>
                    ),
                  },
                  marks: {
                    textCenter: ({ children }) => (
                      <chakra.span textAlign="center">{children}</chakra.span>
                    ),
                    dropcap: ({ children }) => <Dropcap>{children}</Dropcap>,
                  },
                  types: {
                    figure: ({ value }) => {
                      return (
                        <Center
                          flexDirection="column"
                          my="6"
                          // width={value?.width || 500}
                          // height={value?.height || 350}
                          mx="auto"
                        >
                          <NextImage
                            alt={value?.alt}
                            src={urlFor(value?.image?.asset).url()}
                            width={value?.width || 500}
                            height={value?.height || 350}
                            // style={{ maxWidth: '100%', height: 'auto' }}
                          />
                          {value?.caption && (
                            <Text mt="2" textAlign="center" fontSize="xs">
                              {value.caption}
                            </Text>
                          )}
                        </Center>
                      );
                    },
                  },
                }}
              />
            </Box>
          </ContainerBorder>
        </Box>
      ))}
      <ContainerBorder>
        <Box as="section">
          <Box
            maxW="2xl"
            mx="auto"
            px={{ base: '6', lg: '8' }}
            py={{ base: '16', sm: '20' }}
            textAlign="center"
          >
            <Heading as="h2" size="2xl" fontWeight="extrabold">
              Ready to Explore?
            </Heading>
            <Text mt="4" fontSize="lg">
              Westeros is home to over 500 cities, castles, and landmarks. Our goal is to construct
              them all. With over 300 completed so far, our community is well on our way to having a
              fully explorable map.
            </Text>
            <NextLink href="/join">
              <a>
                <Button
                  mt="8"
                  size="lg"
                  bg="primaryRed"
                  _hover={{ bg: 'red.800' }}
                  color="white"
                  height="14"
                  px="8"
                  fontSize="md"
                >
                  Join the Server
                </Button>
              </a>
            </NextLink>
          </Box>
        </Box>
      </ContainerBorder>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "about"]{
    ...
    }[0]`);

  return {
    props: {
      pageData,
    },
  };
};

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
