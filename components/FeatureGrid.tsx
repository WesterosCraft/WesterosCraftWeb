import { Box, Text, Center } from '@chakra-ui/react';
import NextImage from 'next/future/image';
import { urlFor } from '../lib/sanity';
import { MotionBox } from './MotionBox';

export interface FeatureGridProps {
  features: Feature[];
}

export interface Feature {
  _key: string;
  _type: string;
  banner: Banner;
  heading: string;
  subheading: string;
}

export interface Banner {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export const FeatureGrid = ({ features }: FeatureGridProps) => {
  // Variants for Container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { delay: 0.1, staggerChildren: 0.3, delayChildren: 0.4 * i },
    }),
  };

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      //   x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      //   x: -20,
      y: 15,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <Box w="full">
      <Box maxW="7xl" mx="auto" px={[2, null, 4]}>
        <Box
          mx="auto"
          px="4"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor="primaryGold"
          pt={['20', '24']}
          pb={['24', '32']}
        >
          <MotionBox
            display="grid"
            gridTemplateColumns={{
              base: 'repeat(1, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            }}
            gridRowGap="10"
            gridColumnGap="8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <MotionBox key={index} variants={child} p={6} textAlign="center">
                <Center>
                  <NextImage
                    src={urlFor(feature?.banner).url()}
                    alt="Banner"
                    blurDataURL={feature?.banner?.metadata.lqip!}
                    width={75}
                    height={150}
                  />
                </Center>
                <Box maxW="md" color="white" mt={['0', '4', '6']} mx="auto">
                  <Text fontWeight="semibold" color="primaryGold" fontSize="lg">
                    {feature.heading}
                  </Text>
                  <Text mt={2}>{feature.subheading}</Text>
                </Box>
              </MotionBox>
            ))}
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
};
