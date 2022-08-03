/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Divider,
  Text,
  AspectRatio,
  Center,
  HStack,
  Stack,
  Img,
} from '@chakra-ui/react';

import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

import NextImage from 'next/future/image';
import { PlayIcon } from './Icons/PlayIcon';

interface VideoFeatureProps {
  heading: string;
  subheading: string;
  url: string;
  thumbnailUrl: string;
  thumbnailBlur: string;
}

export const VideoFeature = ({
  heading,
  subheading,
  url,
  thumbnailUrl,
  thumbnailBlur,
}: VideoFeatureProps) => {
  return (
    <Box w="full" className="videoFeature">
      <Box maxW="7xl" mx="auto" px={[2, null, 4]} className="container">
        <Box
          maxW={{ base: '2xl', lg: 'none' }}
          mx="auto"
          px="4"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor="primaryGold"
          pt={['32', '24']}
          pb={['32', '24']}
          className="container-border"
        >
          <Stack direction="column" align="center">
            <Box
              className="text-wrapper"
              textAlign="center"
              width={{ lg: 'lg' }}
              px={{ base: '6', md: '8', lg: '0' }}
              py={{ base: '6', md: '8', lg: '12' }}
            >
              <Stack spacing={{ base: '4', lg: '6' }}>
                <Heading size="2xl" color="primaryGold">
                  {heading}
                </Heading>

                <Text color="white" fontSize="lg">
                  {subheading}
                </Text>
              </Stack>
            </Box>
            <Flex className="video-wrapper" flex="1" h="full" w="full" overflow="hidden" maxW={768}>
              <YoutubePlayer url={url} thumbnailUrl={thumbnailUrl} thumbnailBlur={thumbnailBlur} />
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

interface YoutubePlayerProps {
  url: string;
  thumbnailUrl: string;
  thumbnailBlur: string;
}

const YoutubePlayer = ({ url, thumbnailUrl, thumbnailBlur }: YoutubePlayerProps) => {
  const [isPlaying, setPlaying] = useState(false);

  const thumbnailLoader = ({ src, width = 768 }: { src: string; width: number | string }) => {
    return `${src}?h=480&w=${width}&q=75`;
  };

  return (
    <Box className="youtube-player" width="full" position="relative">
      <AspectRatio ratio={16 / 9}>
        <ReactPlayer
          width="100%"
          height="100%"
          controls={true}
          playing={isPlaying}
          url={url ?? 'https://www.youtube.com/watch?v=fO_eKusKH60'}
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
            loader={thumbnailLoader}
            // layout="fill"
            // objectFit="cover"
            width={768}
            height={432}
            src={thumbnailUrl}
            placeholder="blur"
            blurDataURL={thumbnailBlur}
            alt="Youtube Video"
          />
        </AspectRatio>
      </Box>
    </Box>
  );
};
