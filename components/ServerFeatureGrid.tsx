import {
  Box,
  Flex,
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
import NextImage from 'next/future/image';
import { urlFor } from '../lib/sanity';
// import Longclaw from '../public/longclaw.png';
import { ArrowRightIcon } from './Icons/ArrowRightIcon';

export interface ServerFeatureGridProps {
  heading: string;
  image: Image;
  servers: Server[];
}

export interface Image {
  asset: ImageAsset;
}

export interface ImageAsset {
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

export const ServerFeatureGrid = ({ heading, image, servers }: ServerFeatureGridProps) => {
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
            <NextImage
              width={778}
              height={486}
              placeholder="blur"
              blurDataURL={image.asset.metadata.lqip}
              src={urlFor(image.asset).url()}
            />
          </Center>
          <Box>
            <Heading textAlign={{ base: 'center', lg: 'left' }} color="primaryGold">
              {heading}
            </Heading>
            <VStack
              maxW="xl"
              justify="center"
              align="center"
              mt="8"
              mx="auto"
              color="white"
              divider={<StackDivider />}
            >
              {servers.map(server => (
                <Box key={server.heading} w="full" py={4}>
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
                </Box>
              ))}
            </VStack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
