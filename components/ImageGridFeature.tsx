import {
  Box,
  Stack,
  Text,
  useHighlight,
  SimpleGrid,
  Heading,
  VStack,
  Button,
  Flex,
  chakra,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from './Icons/ArrowRightIcon';
import NextImage from 'next/future/image';
import { urlFor } from '../lib/sanity';
import { MotionBox } from './MotionBox';
import { child, container } from '../constants/animation';

export interface ImageGridFeatureProps {
  heading: string;
  images: Image[];
  links: Link[];
  subheading: string;
}

export interface Image {
  _key: string;
  _type: string;
  asset: Asset;
}

export interface Asset {
  metadata: Metadata;
  url: string;
}

export interface Metadata {
  lqip: string;
}

export interface Link {
  _key: string;
  _type: string;
  description: string;
  heading: string;
  linkUrl: LinkURL;
}

export interface LinkURL {
  internal: Internal | null;
  linkText: string;
}

export interface Internal {
  slug: Slug;
}

export interface Slug {
  _type: string;
  current: string;
}

export const ImageGridFeature = ({ heading, images, links, subheading }: ImageGridFeatureProps) => {
  const chunks = useHighlight({
    text: heading,
    query: ['400 locations'],
  });
  return (
    <Box w="full" className="imageGridFeature">
      <Box maxW="7xl" mx="auto" px={[2, null, 4]} className="container">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          borderColor="black"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          w="full"
          mx="auto"
          py={{ base: '24', sm: '32' }}
          px={{ base: '4', md: '10' }}
          alignItems="center"
          justifyItems="center"
          rowGap="16"
          columnGap="8"
        >
          <Box maxW="sm">
            <Stack spacing={{ base: '4', lg: '6' }}>
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                // @ts-ignore
                transition={{ delay: 0.3 }}
              >
                <Heading size={{ base: '2xl' }}>
                  {chunks.map(({ match, text }, i) => {
                    if (!match) return text;
                    return (
                      <chakra.span key={i} color="primaryRed">
                        {text}
                      </chakra.span>
                    );
                  })}
                </Heading>
              </MotionBox>
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                // @ts-ignore
                transition={{ delay: 0.5 }}
              >
                <Text fontSize="lg">{subheading}</Text>
              </MotionBox>
            </Stack>

            <VStack
              as={motion.div}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              // @ts-ignore
              transition={{ delay: 0.3 }}
              mt="12"
            >
              {links.map((link, index) => (
                <MotionBox
                  variants={child}
                  viewport={{ once: true, margin: '-100px' }}
                  key={index}
                  w="full"
                  pt="4"
                  borderTopWidth="1px"
                  borderColor="gray.200"
                >
                  <Text fontWeight="semibold">{link.heading}</Text>
                  <Text mt="2" fontSize="sm">
                    {link.description}
                  </Text>
                  <Flex
                    mt="3"
                    mb="2"
                    justifyContent={{ base: 'flex-end', sm: 'flex-start' }}
                    w="full"
                  >
                    <NextLink
                      href={`/wiki/${link.linkUrl.internal?.slug.current}` ?? '/wiki'}
                      passHref
                    >
                      <Button
                        isDisabled={link.linkUrl.linkText === 'Coming Soon'}
                        fontWeight="md"
                        color="primaryRed"
                        variant="link"
                        fontSize="sm"
                        fill="primaryRed"
                        _hover={{
                          textDecor: 'none',
                          color: 'red.800',
                          fill: 'red.800',
                        }}
                        rightIcon={<ArrowRightIcon />}
                      >
                        {link.linkUrl.linkText}
                      </Button>
                    </NextLink>
                  </Flex>
                </MotionBox>
              ))}
            </VStack>
          </Box>
          <SimpleGrid
            as={motion.div}
            columns={2}
            gap={{ base: 4, sm: 6, lg: 8 }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            // @ts-ignore
            transition={{ delay: 0.3 }}
          >
            {images.map(image => (
              <MotionBox
                variants={child}
                viewport={{ once: true, margin: '-100px' }}
                key={image._key}
              >
                <NextImage
                  loader={({ src, width = 355 }) => {
                    return `${src}?h=355&w=${width}&q=100&fit=crop&crop=center`;
                  }}
                  alt={image._key}
                  src={urlFor(image.asset).url()}
                  width={355}
                  height={355}
                  placeholder="blur"
                  quality={100}
                  blurDataURL={image.asset.metadata.lqip}
                />
              </MotionBox>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};
