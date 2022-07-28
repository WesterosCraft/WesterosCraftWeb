import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { ChakraNextImage } from './ChakraNextImage';

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
  _type: string;
  url: string;
  metadata: {
    lqip: string;
  };
}

export interface Asset {
  _ref: string;
  _type: string;
}

export const FeatureGrid = ({ features }: { features: Feature[] }) => {
  return (
    <Box bg="primaryDark" w="full">
      <Box maxW="7xl" mx="auto" px={[2, null, 4]}>
        <Box
          maxW={['2xl', null, null, 'none']}
          mx="auto"
          px="4"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor="primaryGold"
          py={['32', '24']}
        >
          <SimpleGrid columns={[1, null, 3]} rowGap="10" columnGap="8">
            {features.map(feature => (
              <Box p={6} display={['flex', null, 'block']} key={feature.heading} textAlign="center">
                <Box flexShrink={0}>
                  <ChakraNextImage
                    src={feature.banner.url}
                    alt="Banner"
                    blurDataURL={feature?.banner?.metadata.lqip!}
                    width={75}
                    height={150}
                  />
                </Box>
                <Box color="white" mt={['0', '4', '6']} ml={['6', null, '0']}>
                  <Text fontWeight="semibold" color="primaryGold" fontSize="lg">
                    {feature.heading}
                  </Text>
                  <Text mt={2}>{feature.subheading}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
