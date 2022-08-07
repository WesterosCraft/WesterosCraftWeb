import {
  Box,
  Center,
  VStack,
  Stack,
  Text,
  Button,
  StackDivider,
  HStack,
  Img,
  Heading,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import NextImage from 'next/future/image';
import { urlFor } from '../lib/sanity';
import { MotionBox } from './MotionBox';
import { container, child } from '../constants/animation';

// import Longclaw from '../public/longclaw.png';
// import { ArrowRightIcon } from './Icons/ArrowRightIcon';

export interface ServerFeatureGridProps {
  heading: string;
  leftImage: TImage;
  rightImage: TImage;
  servers: Server[];
}

export interface TImage {
  asset: LeftImageAsset;
}

export interface LeftImageAsset {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export interface Server {
  _key: string;
  _type: string;
  description: string;
  heading: string;
  icon: Icon;
  leftButton?: TButton;
  rightButton: TButton;
  subheading: string;
}

export interface Icon {
  _type: string;
  asset: IconAsset;
}

export interface IconAsset {
  _ref: string;
  _type: string;
}

export interface TButton {
  _type: string;
  linkText: string;
}

export const ServerFeatureGrid = ({
  heading,
  leftImage,
  rightImage,
  servers,
}: ServerFeatureGridProps) => {
  return (
    <Box w="full" className="serverFeatureGrid">
      <Box position="relative" maxW="7xl" mx="auto" px={[2, null, 4]} className="container">
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor="primaryGold"
          spacing={8}
          mx="auto"
          w="full"
          px={4}
        >
          <Center ml={{ base: 0, '2xl': -24 }} minW={{ base: 'auto', xl: 750 }}>
            <Center>
              {leftImage && (
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  // @ts-ignore
                  transition={{ delay: 1 }}
                  alignSelf="flex-end"
                  mb="14"
                >
                  <NextImage
                    width={312}
                    height={386}
                    placeholder="blur"
                    blurDataURL={leftImage.asset.metadata.lqip}
                    src={urlFor(leftImage.asset).url()}
                    alt="Baratheon"
                  />
                </MotionBox>
              )}
              {rightImage && (
                <MotionBox
                  alignSelf="flex-end"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  // @ts-ignore
                  transition={{ delay: 0.5 }}
                >
                  <NextImage
                    width={312}
                    height={386}
                    placeholder="blur"
                    blurDataURL={rightImage.asset.metadata.lqip}
                    src={urlFor(rightImage.asset).url()}
                    alt="Targaryen"
                  />
                </MotionBox>
              )}
            </Center>
          </Center>
          <Box>
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              // @ts-ignore
              transition={{ delay: 0.3 }}
            >
              <Heading textAlign={{ base: 'center', lg: 'left' }} color="primaryGold">
                {heading ?? ''}
              </Heading>
            </MotionBox>
            <VStack
              as={motion.div}
              maxW="xl"
              justify="center"
              align="center"
              mt="8"
              mx="auto"
              color="white"
              divider={<StackDivider />}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              // @ts-ignore
              transition={{ delay: 0.3 }}
            >
              {servers.map((server, index) => (
                <MotionBox
                  variants={child}
                  viewport={{ once: true, margin: '-100px' }}
                  key={index}
                  w="full"
                  py={4}
                >
                  <HStack align="flex-start">
                    <Img src={urlFor(server.icon.asset).url()} />
                    <VStack align="flex-start" spacing={6}>
                      <VStack align="flex-start" spacing={1}>
                        <Text fontWeight="semibold" fontSize="2xl">
                          {server.heading}
                        </Text>
                        <Text fontSize="sm">{server.subheading}</Text>
                        <Box>
                          <Text mt="3">{server.description}</Text>
                        </Box>
                      </VStack>
                      <HStack w="full" spacing={4}>
                        {server.leftButton && (
                          <NextLink href="/" passHref>
                            <Button
                              fontWeight="md"
                              color="primaryGold"
                              variant="link"
                              fontSize="sm"
                              fill="primaryGold"
                            >
                              {server.leftButton.linkText}
                            </Button>
                          </NextLink>
                        )}
                        {server.rightButton && (
                          <NextLink href="/" passHref>
                            <Button
                              fontWeight="md"
                              color="primaryGold"
                              variant="link"
                              fontSize="sm"
                              fill="primaryGold"
                            >
                              {server.rightButton.linkText}
                            </Button>
                          </NextLink>
                        )}
                      </HStack>
                    </VStack>
                  </HStack>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
