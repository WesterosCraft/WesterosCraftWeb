import React, { useState, useEffect, useCallback } from 'react';
import NextImage from 'next/future/image';
import { Box, Button, Heading, Stack, Text, IconButton, Flex, Divider } from '@chakra-ui/react';
import NextLink from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRightIcon } from './Icons/ChevronRight';
import { urlFor } from '../lib/sanity';
import { MotionBox } from './MotionBox';

export interface HeroProps {
  copy: string;
  heading1: string;
  heading2: string;
  heroImageSlider: HeroImageSlider[];
  outlineButton: OutlineButton;
  solidButton: SolidButton;
  subheading: string;
}

export interface HeroImageSlider {
  _key: string;
  _type: string;
  textColor: string;
  location: Location;
  slideImage: SlideImage;
}

export interface Location {
  title: string;
}

export interface SlideImage {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export interface OutlineButton {
  internal: Internal;
  linkText: string;
}

export interface Internal {
  slug: Slug;
}

export interface Slug {
  _type: string;
  current: string;
}

export interface SolidButton {
  internal: Internal;
  linkText: string;
}

export const Hero = ({
  copy,
  subheading,
  heading1,
  heading2,
  outlineButton,
  solidButton,
  heroImageSlider,
}: HeroProps) => {
  return (
    <Flex
      height={{ base: 550, sm: 600, md: 750 }}
      position="relative"
      // bgColor="primaryDarkGlare"
      width="full"
      justify="center"
      flexWrap="wrap"
      align={{ base: 'flex-end', lg: 'center' }}
      gridAutoColumns="1fr"
      gridColumnGap="4"
      gridRowGap="4"
      gridTemplateColumns="1fr 1fr"
      gridTemplateRows="auto auto"
      pb={{ base: '60px', lg: 'none' }}
    >
      <Box
        className="text-container"
        display={{ base: 'flex' }}
        justifyContent={{ base: 'center' }}
        alignItems={{ base: 'center' }}
        position="absolute"
        left="auto"
        top="auto"
        right="0"
        bottom={{ base: '60px', sm: 'auto' }}
        zIndex={{ base: '500', lg: '10' }}
        width={{ base: '95%', sm: '92%', lg: '43%' }}
        height={{ base: 'auto', lg: '400px' }}
        bgColor="primary"
        border="1px solid"
        borderColor="primaryDark"
        borderRightWidth="0"
        padding={{ base: '20px 40px 30px 20px', sm: '30px' }}
      >
        <Box display={{ base: 'flex', lg: 'none' }} flexWrap="wrap" className="mobile-content">
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // @ts-ignore
            transition={{ delay: 0.5 }}
            maxW="lg"
          >
            <Heading
              as="h1"
              size="2xl"
              lineHeight="1.1"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              {heading1}
              {'  '}{' '}
              <Box as="mark" color="primaryRed" bg="transparent">
                {heading2}
              </Box>
            </Heading>
            <Divider borderColor="primaryDark" display={{ base: 'none', sm: 'block' }} mt="6" />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // @ts-ignore
            transition={{ delay: 0.7 }}
          >
            <Text
              mt={4}
              fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
              fontWeight="medium"
              color="gray.600"
            >
              An open world, creative Minecraft server
            </Text>
            <Stack direction={{ base: 'row' }} spacing="4" mt={{ base: '4', sm: '8' }}>
              <NextLink href={solidButton?.internal?.slug?.current}>
                <a>
                  <Button size="md" bg="black" _hover={{ bg: 'blackAlpha.700' }} color="white">
                    {solidButton?.linkText ?? ''}
                  </Button>
                </a>
              </NextLink>
              <NextLink href={outlineButton?.internal?.slug?.current} passHref>
                <a>
                  <Button
                    variant="outline"
                    size="md"
                    bg="transparent"
                    color="gray.800"
                    borderColor="black"
                    _hover={{
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                    shadow="base"
                  >
                    {outlineButton?.linkText ?? ''}
                  </Button>
                </a>
              </NextLink>
            </Stack>
          </MotionBox>
        </Box>
      </Box>
      <Box
        className="hero-image"
        position="absolute"
        left="0"
        top="0"
        right="auto"
        bottom="0"
        width={{ base: '100%', lg: '75%' }}
        height={{ base: '50%', md: '75%', lg: 'auto' }}
      >
        <HeroCarousel slides={heroImageSlider} />
      </Box>
      <Flex justify="flex-end" align="center" zIndex="10" width="85%" maxWidth="1350px" py="52px">
        <Box display={{ base: 'none', lg: 'block' }} width="36%">
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // @ts-ignore
            transition={{ delay: 0.5 }}
          >
            <Heading
              as="h1"
              size={{ base: 'xl', xl: '2xl' }}
              lineHeight="1.1"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              {heading1}
              {'  '}{' '}
              <Box as="mark" color="primaryRed" bg="transparent">
                {heading2}
              </Box>
            </Heading>
            <Divider mt="6" borderColor="primaryDark" />
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // @ts-ignore
            transition={{ delay: 0.7 }}
          >
            <Text mt={4} fontSize={{ base: 'lg', sm: 'xl' }} fontWeight="medium" color="gray.600">
              An open world, creative Minecraft server
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" mt="8">
              <NextLink href={solidButton?.internal?.slug?.current}>
                <a>
                  <Button
                    size="lg"
                    bg="black"
                    _hover={{ bg: 'blackAlpha.700' }}
                    color="white"
                    px="8"
                    fontSize="md"
                  >
                    {solidButton?.linkText ?? ''}
                  </Button>
                </a>
              </NextLink>
              <NextLink href={outlineButton?.internal?.slug?.current} passHref>
                <a>
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
                    px="8"
                    shadow="base"
                    fontSize="md"
                  >
                    {outlineButton?.linkText ?? ''}
                  </Button>
                </a>
              </NextLink>
            </Stack>
          </MotionBox>
        </Box>
      </Flex>
      <Box
        className="texture"
        position="absolute"
        height={{ base: '50%' }}
        left={{ base: '0' }}
        right={{ base: '0' }}
        bottom={{ base: '0' }}
        width={{ base: 'full', lg: '25%' }}
        top={{ base: 'auto' }}
      />
    </Flex>
  );
};

// export const Hero = ({
//   copy,
//   subheading,
//   heading1,
//   heading2,
//   outlineButton,
//   solidButton,
//   heroImageSlider,
// }: HeroProps) => {
//   return (
//     <Box
//       width="full"
//       as="section"
//       pb="24"
//       pos="relative"
//       px={{ base: '6', lg: '12' }}
//       outlineColor="black"
//       outline="1px"
//     >
//       <Box maxW="7xl" mx="auto">
//         <Box
//           maxW={{ lg: 'md', xl: 'xl' }}
//           pt={{ base: '20', lg: '40' }}
//           pb={{ base: '16', lg: '24' }}
//         >
//           <MotionBox
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             // @ts-ignore
//             transition={{ delay: 0.3 }}
//           >
//             <Text
//               color="primaryRed"
//               textTransform="uppercase"
//               mb="8"
//               fontWeight="semibold"
//               letterSpacing="wide"
//             >
//               {subheading}
//             </Text>
//           </MotionBox>
//           <MotionBox
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             // @ts-ignore
//             transition={{ delay: 0.5 }}
//           >
//             <Heading
//               as="h1"
//               size="3xl"
//               lineHeight="1.1"
//               fontWeight="extrabold"
//               letterSpacing="tight"
//             >
//               {heading1}
//               {'  '}{' '}
//               <Box as="mark" color="primaryRed" bg="transparent">
//                 {heading2}
//               </Box>
//             </Heading>
//           </MotionBox>
//           <MotionBox
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             // @ts-ignore
//             transition={{ delay: 0.7 }}
//           >
//             <Text mt={4} fontSize={{ base: 'lg', sm: 'xl' }} fontWeight="medium" color="gray.600">
//               {copy}
//             </Text>
//             <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" mt="8">
//               <NextLink href={solidButton?.internal?.slug?.current}>
//                 <a>
//                   <Button
//                     size="lg"
//                     bg="black"
//                     _hover={{ bg: 'blackAlpha.700' }}
//                     color="white"
//                     height="14"
//                     px="8"
//                     fontSize="md"
//                   >
//                     {solidButton?.linkText ?? ''}
//                   </Button>
//                 </a>
//               </NextLink>
//               <NextLink href={outlineButton?.internal?.slug?.current} passHref>
//                 <a>
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     bg="transparent"
//                     color="gray.800"
//                     borderColor="black"
//                     _hover={{
//                       backgroundColor: 'black',
//                       color: 'white',
//                     }}
//                     height="14"
//                     px="8"
//                     shadow="base"
//                     fontSize="md"
//                   >
//                     {outlineButton?.linkText ?? ''}
//                   </Button>
//                 </a>
//               </NextLink>
//             </Stack>
//           </MotionBox>
//         </Box>
//       </Box>
//       <Box
//         pos={{ lg: 'absolute' }}
//         insetY={{ lg: '0' }}
//         insetEnd={{ lg: '0' }}
//         w={{ base: 'full', lg: '50%' }}
//         height={{ base: '96', lg: 'full' }}
//         sx={{
//           clipPath: { lg: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' },
//         }}
//       >
//         <HeroCarousel slides={heroImageSlider} />
//       </Box>
//     </Box>
//   );
// };

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
                  <NextImage
                    className="embla__slide__img"
                    priority={i === 0}
                    placeholder="blur"
                    blurDataURL={slide?.slideImage?.metadata?.lqip}
                    fill
                    style={{ objectFit: 'cover' }}
                    src={urlFor(slide?.slideImage).url()}
                    alt={slide?.location?.title ?? 'Westeros Location'}
                    sizes="80vw"
                    quality={100}
                  />
                  <Heading
                    size="lg"
                    color={slide?.textColor === 'dark' ? 'primaryDark' : 'white'}
                    position="absolute"
                    bottom="5"
                    right="20"
                  >
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
