import { Box, SimpleGrid, Text, Center } from '@chakra-ui/react';
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
          >
            {features.map(feature => (
              <Box
                p={6}
                display={['flex', null, 'block']}
                flexDirection="column"
                key={feature.heading}
                textAlign="center"
              >
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
              </Box>
            ))}
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
};
