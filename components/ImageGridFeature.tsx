import { Box, Stack, Text, Img, SimpleGrid, Heading, VStack, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ArrowRightIcon } from './Icons/ArrowRightIcon';
/* This example requires Tailwind CSS v2.0+ */
const features = [
  {
    name: 'Locations',
    description: 'View a single comprehensive list of every build we have to offer.',
  },
  {
    name: 'Guides',
    description: 'View in depth guides on how to explore and play on our server.',
  },
  { name: 'Blocks', description: 'Check out a repository of all our custom designed blocks.' },
];

export const ImageGridFeature = () => {
  return (
    <Box w="full" className="imageGridFeature">
      <Box maxW="7xl" mx="auto" px={[2, null, 4]} className="container">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          borderColor="black"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          maxW={{ base: '2xl', lg: 'none' }}
          w="full"
          mx="auto"
          py={{ base: '24', sm: '32' }}
          px={{ base: '10' }}
          alignItems="center"
          justifyItems="center"
          rowGap="16"
          columnGap="8"
        >
          <Box maxW="sm">
            <Stack spacing={{ base: '4', lg: '6' }}>
              <Heading size={{ base: '2xl' }}>Over 400 locations to discover</Heading>
              <Text fontSize="lg">
                Our community is well on our way to having a fully explorable map. You can keep up
                with our progress in game anytime, or start exploring our expansive Wiki.
              </Text>
            </Stack>

            <VStack mt="12">
              {features.map(feature => (
                <Box key={feature.name} w="full" pt="4" borderTopWidth="1px" borderColor="gray.200">
                  <Text fontWeight="semibold">{feature.name}</Text>
                  <Text mt="2" fontSize="sm">
                    {feature.description}
                  </Text>
                  <NextLink href="/wiki" passHref>
                    <Button
                      fontWeight="md"
                      color="primaryRed"
                      variant="link"
                      mt="3"
                      fontSize="sm"
                      fill="primaryRed"
                      _hover={{
                        textDecor: 'none',
                        color: 'red.800',
                        fill: 'red.800',
                      }}
                      rightIcon={<ArrowRightIcon />}
                    >
                      Read More
                    </Button>
                  </NextLink>
                </Box>
              ))}
            </VStack>
          </Box>
          <SimpleGrid columns={2} gap={{ base: 4, sm: 6, lg: 8 }}>
            <Img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="bg-gray-100 rounded-lg"
            />
            <Img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="bg-gray-100 rounded-lg"
            />
            <Img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="bg-gray-100 rounded-lg"
            />
            <Img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="bg-gray-100 rounded-lg"
            />
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};
