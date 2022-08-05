import { Box, SimpleGrid, Text, Center } from '@chakra-ui/react';
import NextImage from 'next/future/image';
import { urlFor } from '../lib/sanity';

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
          // maxW={['2xl', null, null, 'none']}
          mx="auto"
          px="4"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor="primaryGold"
          pt={['20', '24']}
          pb={['24', '32']}
        >
          <SimpleGrid columns={[1, null, 3]} rowGap="10" columnGap="8">
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
          </SimpleGrid>
          {/* <Img
            mx="auto"
            width={16}
            // h={400}
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9ImIiPgogICA8cGF0aCBkPSJtMzMxIDQxaDkwdjY3MGgtOTB6Ii8+CiAgPC9jbGlwUGF0aD4KICA8Y2xpcFBhdGggaWQ9ImEiPgogICA8cGF0aCBkPSJtNDEuMTI5IDM3NiAzMzQuODctMzM0Ljg3IDMzNC44NyAzMzQuODctMzM0Ljg3IDMzNC44N3oiLz4KICA8L2NsaXBQYXRoPgogPC9kZWZzPgogPGcgY2xpcC1wYXRoPSJ1cmwoI2IpIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjYSkiPgogICA8cGF0aCBkPSJtMzMxLjM1IDg1Ljc3MyAzNi43NTggMzYuNzU4djUwNi45M2wtMzYuNzU4IDM2Ljc1OCA0NC42NDggNDQuNjUyIDQ0LjY1Mi00NC42NTItMzYuNzU4LTM2Ljc1OHYtNTA2LjkzbDM2Ljc1OC0zNi43NTgtNDQuNjUyLTQ0LjY0OHoiIGZpbGw9IiNkOWI1MzYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg=="
          /> */}
        </Box>
      </Box>
    </Box>
  );
};
