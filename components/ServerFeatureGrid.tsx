import {
  Box,
  Center,
  VStack,
  Stack,
  Text,
  StackDivider,
  HStack,
  Img,
  Heading,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import NextImage from 'next/future/image';
import { urlFor } from '../lib/sanity';
import { MotionBox } from './MotionBox';
import { container, child } from '../constants/animation';
import { ContainerBorder } from './ContainerBorder';

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
  internal?: any;
  external?: any;
}

export const ServerFeatureGrid = ({
  heading,
  leftImage,
  rightImage,
  servers,
}: ServerFeatureGridProps) => {
  return (
    <ContainerBorder
      variant="dark"
      spacing={8}
      px={4}
      direction={{ base: 'column-reverse', lg: 'row' }}
    >
      <Center ml={{ base: 0, '2xl': -32 }} minW={{ base: 'auto', xl: 750 }}>
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
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={{ base: 'center', sm: 'flex-start' }}
              >
                <Img src={urlFor(server.icon.asset).url()} />
                <VStack align={{ base: 'center', sm: 'flex-start' }} spacing={6}>
                  <VStack
                    align={{ base: 'center', sm: 'flex-start' }}
                    textAlign={{ base: 'center', sm: 'left' }}
                    spacing={1}
                  >
                    <Text fontWeight="semibold" fontSize="2xl">
                      {server.heading}
                    </Text>
                    <Text fontSize="sm">{server.subheading}</Text>

                    <Text mt="3">{server.description}</Text>
                  </VStack>
                  <HStack justify={{ base: 'center', sm: 'flex-start' }} w="full" spacing={4}>
                    {server.leftButton ? (
                      server.leftButton?.internal ? (
                        <NextLink href={server.leftButton.internal?.slug?.current} passHref>
                          <Link
                            fontWeight="md"
                            color="white"
                            textDecor="underline"
                            textDecorationColor="primaryRed"
                            textUnderlineOffset="3px"
                          >
                            {server.leftButton.linkText}
                          </Link>
                        </NextLink>
                      ) : (
                        <Link
                          isExternal
                          href={server.leftButton?.external ?? ''}
                          fontWeight="md"
                          color="white"
                          textDecor="underline"
                          textDecorationColor="primaryRed"
                          textUnderlineOffset="3px"
                        >
                          {server.leftButton?.linkText}
                        </Link>
                      )
                    ) : null}
                    {server.rightButton ? (
                      server.rightButton?.internal ? (
                        <NextLink href="/" passHref>
                          <Link
                            fontWeight="md"
                            color="white"
                            textDecor="underline"
                            textDecorationColor="primaryRed"
                            textUnderlineOffset="3px"
                          >
                            {server.rightButton.linkText}
                          </Link>
                        </NextLink>
                      ) : (
                        <Link
                          isExternal
                          href={server.rightButton?.external ?? ''}
                          fontWeight="md"
                          color="white"
                          textDecor="underline"
                          textDecorationColor="primaryRed"
                          textUnderlineOffset="3px"
                        >
                          {server.rightButton?.linkText}
                        </Link>
                      )
                    ) : null}
                  </HStack>
                </VStack>
              </Stack>
            </MotionBox>
          ))}
        </VStack>
      </Box>
    </ContainerBorder>
  );
};
