import * as React from 'react';
import { AspectRatio, Box, Heading, Button, Icon, Link, Stack, Text } from '@chakra-ui/react';
import NextImage from 'next/future/image';
import { ArrowRightIcon } from './Icons/ArrowRightIcon';
import { urlFor } from '../lib/sanity';
import { MotionBox } from './MotionBox';
import { ContainerBorder } from './ContainerBorder';
import NextLink from 'next/link';

export interface AlternatingFeatureProps {
  features: Feature[];
}

export interface Feature {
  _key: string;
  _type: string;
  heading: string;
  image: Image;
  link: Link;
  subheading: string;
}

export interface Image {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export interface Link {
  _type: string;
  linkText: string;
  external?: string;
  internal?: any;
}

export const AlternatingFeature = ({ features }: AlternatingFeatureProps) => {
  return (
    <ContainerBorder
      spacing={{ base: '16', lg: '24' }}
      pb={{ base: '24', sm: '32' }}
      px={{ base: '4', md: '10' }}
    >
      {features.map((item, index) => (
        <Stack
          key={index}
          w="full"
          direction={
            index % 2 === 0
              ? { base: 'column-reverse', lg: 'row' }
              : { base: 'column-reverse', lg: 'row-reverse' }
          }
          spacing={{ base: '0', lg: '12' }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            // @ts-ignore
            transition={{ delay: 0.3 }}
            w="full"
            overflow="hidden"
          >
            <AspectRatio
              ratio={[4 / 3, null, 16 / 9]}
              maxH={{ base: '280', lg: '400' }}
              pointerEvents="none"
            >
              <NextImage
                src={urlFor(item.image).quality(100).url()}
                placeholder="blur"
                width={650}
                height={450}
                alt={item?.heading ?? ''}
                blurDataURL={item.image?.metadata?.lqip}
              />
            </AspectRatio>
          </MotionBox>
          <Box
            width={{ lg: 'lg' }}
            mx={{ base: '6', md: '8', lg: '0' }}
            px={{ base: '6', md: '8', lg: '0' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack spacing={{ base: '8', lg: '10' }}>
              <Stack spacing={{ base: '2', lg: '4' }}>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  // @ts-ignore
                  transition={{ delay: 0.3 }}
                >
                  <Heading size="xl">{item.heading}</Heading>
                </MotionBox>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  // @ts-ignore
                  transition={{ delay: 0.5 }}
                >
                  <Text>{item.subheading}</Text>
                </MotionBox>
              </Stack>
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                // @ts-ignore
                transition={{ delay: 0.5 }}
              >
                {item.link?.external ? (
                  <Button
                    href={item.link?.external}
                    as={Link}
                    color="primaryRed"
                    variant="link"
                    rightIcon={<Icon fill="primaryRed" as={ArrowRightIcon} />}
                    _hover={{
                      textDecor: 'none',
                      color: 'red.800',
                      fill: 'red.800',
                    }}
                  >
                    {item.link.linkText}
                  </Button>
                ) : (
                  <NextLink href={item.link?.internal?.slug?.current} passHref>
                    <a>
                      <Button
                        color="primaryRed"
                        variant="link"
                        rightIcon={<Icon fill="primaryRed" as={ArrowRightIcon} />}
                        _hover={{
                          textDecor: 'none',
                          color: 'red.800',
                          fill: 'red.800',
                        }}
                      >
                        {item.link.linkText}
                      </Button>
                    </a>
                  </NextLink>
                )}
              </MotionBox>
            </Stack>
          </Box>
        </Stack>
      ))}
    </ContainerBorder>
  );
};
