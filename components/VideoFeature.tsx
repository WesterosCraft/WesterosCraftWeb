import { useState } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  Img,
  Heading,
  Text,
  AspectRatio,
  Center,
  Icon,
  Link,
  HStack,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

import NextImage from 'next/future/image';
import { PlayIcon } from './Icons/PlayIcon';
import { ChakraNextImage } from './ChakraNextImage';

const incentives = [
  {
    name: 'Powered By Minecraft',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description:
      'WesterosCraft is free to explore, and always will be! All you need is the Java edition of Minecraft.',
  },
  {
    name: 'Always Evolving',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description:
      'As Minecraft updates and evolves, so too does our server! From simple cobblestone shacks in 2011, to ornate cities in 2020, we have come a long way from our humble beginnings.',
  },
  {
    name: 'Crafting Connections',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "We're a truly global community, united by a common goal of creating one of the most detailed Minecraft worlds ever built.",
  },
];

export const VideoFeature = () => {
  return (
    <Box bg="primaryDark" w="full">
      <Box
        maxW="7xl"
        mx="auto"
        py={['32', '24']}
        px={[2, null, 4]}
        borderLeftWidth="1px"
        borderRightWidth="1px"
        borderColor="primaryGold"
      >
        <Box maxW={['2xl', null, null, 'none']} mx="auto" px="4">
          <Stack
            direction={{ base: 'column-reverse', lg: 'row' }}
            spacing={{ base: '0', lg: '20' }}
          >
            <Box
              width={{ lg: 'sm' }}
              transform={{ base: 'translateY(-50%)', lg: 'none' }}
              bg={{ base: useColorModeValue('red.50', 'gray.700'), lg: 'transparent' }}
              mx={{ base: '6', md: '8', lg: '0' }}
              px={{ base: '6', md: '8', lg: '0' }}
              py={{ base: '6', md: '8', lg: '12' }}
            >
              <Stack spacing={{ base: '8', lg: '10' }}>
                <Stack spacing={{ base: '2', lg: '4' }}>
                  <Heading size="xl" color="primaryGold">
                    10 years of WesterosCraft
                  </Heading>
                </Stack>
                <HStack color="white" spacing="3">
                  <Text mt={4}>
                    We've compiled our own custom modpack to help get you traveling the Kings Road
                    as easy as possible.
                  </Text>
                  {/* <Icon color={useColorModeValue('red.500', 'red.300')} as={FaArrowRight} /> */}
                </HStack>
              </Stack>
            </Box>
            <Flex flex="1" overflow="hidden">
              <YoutubePlayer />
            </Flex>
          </Stack>
          {/* <SimpleGrid alignItems="center" columns={[1, null, null, 2]} columnGap={16} rowGap={10}>
            <Box color="white">
              <Heading className="text-4xl font-extrabold tracking-tight text-gray-900">
                10 years of WesterosCraft
              </Heading>
              <Text mt={4}>
                We've compiled our own custom modpack to help get you traveling the Kings Road as
                easy as possible.
              </Text>
            </Box>
            <YoutubePlayer />
          </SimpleGrid> */}
          <SimpleGrid columns={[1, null, 3]} rowGap="10" columnGap="8" mt={16}>
            {incentives.map(incentive => (
              <Box
                display={['flex', null, 'block']}
                key={incentive.name}
                className="sm:flex lg:block"
              >
                <Box flexShrink={0}>
                  <ChakraNextImage
                    src="https://cdn.sanity.io/images/1as7cn02/production/5efefe0e5c56d8698d9d34961b02979e8f80212e-180x349.png"
                    alt={` Banner`}
                    placeholder="blur"
                    // blurDataURL={pageData?.bannerImage?.metadata.lqip!}
                    width={75}
                    height={150}
                  />
                  {/* https://cdn.sanity.io/images/1as7cn02/production/5efefe0e5c56d8698d9d34961b02979e8f80212e-180x349.png */}
                  {/* <Img w={16} h={16} src={incentive.imageSrc} alt="" /> */}
                </Box>
                <Box
                  color="white"
                  mt={['0', '4', '6']}
                  ml={['6', null, '0']}
                  className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0"
                >
                  <Text fontWeight="semibold" className="text-sm font-medium text-gray-900">
                    {incentive.name}
                  </Text>
                  <Text mt={2} className="mt-2 text-sm text-gray-500">
                    {incentive.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

const YoutubePlayer = () => {
  const [isPlaying, setPlaying] = useState(false);

  const thumbnailLoader = ({ src, width = 768 }: { src: string; width: number | string }) => {
    return `${src}?h=480&w=${width}&q=75`;
  };

  return (
    <Box
      className="youtube-player"
      // overflow="hidden"
      width="full"
      position="relative"
    >
      <AspectRatio ratio={16 / 9}>
        <ReactPlayer
          width="100%"
          height="100%"
          controls={true}
          playing={isPlaying}
          url="https://www.youtube.com/watch?v=fO_eKusKH60"
          className="youtubeContainer"
        />
      </AspectRatio>
      <Center
        className="play-button"
        borderRadius="full"
        bg="whiteAlpha.600"
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        mx="auto"
        left={0}
        right={0}
        bottom={0}
        zIndex="dropdown"
        width={88}
        height={88}
        display={isPlaying ? 'none' : 'flex'}
        onClick={() => setPlaying(!isPlaying)}
        cursor="pointer"
        transition="all 150ms linear 0s"
        _hover={{
          bg: 'whiteAlpha.800',
          '.thumbnail-icon': {
            color: 'blackAlpha.900',
          },
        }}
      >
        <PlayIcon boxSize="28px" color="blackAlpha.700" transition="all 150ms linear 0s" />
      </Center>
      <Box
        display={isPlaying ? 'none' : 'block'}
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex="base"
      >
        <AspectRatio ratio={16 / 9} maxH={480}>
          <NextImage
            // loader={thumbnailLoader}
            // layout="fill"
            // objectFit="cover"
            width={768}
            height={432}
            src="https://cdn.sanity.io/images/n9rqt6s5/production/48495c52fe0e3f8f904bbba681b998e3332aa445-1920x1080.jpg?h=480&w=3840&q=75"
            // placeholder="blur"
            // blurDataURL={thumbnailblur}
            alt="Youtube Video"
          />
        </AspectRatio>
      </Box>
    </Box>
  );
};
