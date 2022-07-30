import React, { useState, useEffect, useCallback } from 'react';
import NextImage from 'next/future/image';
import { chakra, Box, Button, Heading, Stack, Text, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { HeroImageSlider, OutlineButton } from '../pages';
import { ChevronRightIcon } from './Icons/ChevronRight';

interface HeroProps {
  copy: string;
  heading1: string;
  heading2: string;
  outlineButton: OutlineButton;
  solidButton: OutlineButton;
  subheading: string;
  images: HeroImageSlider[];
}

export const Hero = ({
  copy,
  subheading,
  heading1,
  heading2,
  outlineButton,
  solidButton,
  images,
}: HeroProps) => {
  return (
    <Box
      width="full"
      as="section"
      pb="24"
      pos="relative"
      px={{ base: '6', lg: '12' }}
      outlineColor="black"
      outline="1px"
    >
      <Box maxW="7xl" mx="auto">
        <Box
          maxW={{ lg: 'md', xl: 'xl' }}
          pt={{ base: '20', lg: '40' }}
          pb={{ base: '16', lg: '24' }}
        >
          <Text
            color="primaryRed"
            textTransform="uppercase"
            mb="8"
            fontWeight="semibold"
            letterSpacing="wide"
          >
            {subheading}
          </Text>

          <Heading as="h1" size="3xl" lineHeight="1.1" fontWeight="extrabold" letterSpacing="tight">
            {heading1}{' '}
            <Box as="mark" color="primaryRed" bg="transparent">
              {heading2}
            </Box>
          </Heading>
          <Text mt={4} fontSize="xl" fontWeight="medium" color="gray.600">
            {copy}
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" mt="8">
            <NextLink href={solidButton?.internal?.slug?.current ?? '/'}>
              <Button
                size="lg"
                bg="black"
                _hover={{ bg: 'blackAlpha.700' }}
                color="white"
                height="14"
                px="8"
                fontSize="md"
              >
                {solidButton?.linkText ?? ''}
              </Button>
            </NextLink>
            <NextLink href={outlineButton?.internal?.slug?.current} passHref>
              <Button
                variant="outline"
                size="lg"
                bg="transparent"
                color="gray.800"
                borderColor="black"
                _hover={{
                  backgroundColor: 'black',
                  color: 'white',
                }}
                height="14"
                px="8"
                shadow="base"
                fontSize="md"
              >
                {outlineButton?.linkText ?? ''}
              </Button>
            </NextLink>
          </Stack>
        </Box>
      </Box>
      <Box
        pos={{ lg: 'absolute' }}
        insetY={{ lg: '0' }}
        insetEnd={{ lg: '0' }}
        w={{ base: 'full', lg: '50%' }}
        height={{ base: '96', lg: 'full' }}
        sx={{
          clipPath: { lg: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' },
        }}
      >
        <HeroCarousel slides={images} />
      </Box>
    </Box>
  );
};

function HeroCarousel({ slides }: { slides: HeroImageSlider[] }) {
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    loop: true,
    containScroll: 'trimSnaps',
  });
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <Box className="embla" position="relative" mx="auto" height="full">
        <Box
          className="embla__viewport"
          ref={viewportRef}
          overflow="hidden"
          width="full"
          height="full"
        >
          <Box
            className="embla__container"
            display="flex"
            userSelect="none"
            height="full"
            marginLeft="-10px"
            sx={{
              KhtmlUserSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {slides?.map((slide, i) => (
              <Box className="embla__slide" key={slide._key} position="relative" minWidth="full">
                <Box
                  className="embla__slide__inner"
                  position="relative"
                  overflow="hidden"
                  height="full"
                >
                  <ChakraNextUnwrappedImage
                    className="embla__slide__img"
                    priority={i === 0}
                    placeholder="blur"
                    blurDataURL={slide?.slideImage?.metadata?.lqip}
                    top="50%"
                    left="50%"
                    position="absolute"
                    display="block"
                    minHeight="100%"
                    minWidth="100%"
                    maxWidth="none"
                    transform="translate(-50%, -50%)"
                    objectFit="cover"
                    src={slide?.slideImage?.url}
                    alt={slide?.location?.title ?? 'Westeros Location'}
                  />
                  <Heading size="lg" color="white" position="absolute" bottom="4" left="8">
                    {slide?.location?.title ?? ''}
                  </Heading>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <IconButton
          icon={<ChevronRightIcon />}
          borderRadius="full"
          colorScheme="whiteAlpha"
          aria-label="Next slide"
          onClick={scrollNext}
          isDisabled={!nextBtnEnabled}
          position="absolute"
          bottom="4"
          right="4"
        />
      </Box>
    </>
  );
}

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: prop =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader',
      'layout',
    ].includes(prop),
});
