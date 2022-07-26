import { Box, Flex, SimpleGrid, Img, Heading, Text, AspectRatio } from '@chakra-ui/react';

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
      <Box maxW="7xl" mx="auto" py={['32', '24']} px={[2, null, 4]}>
        <Box maxW={['2xl', null, null, 'none']} mx="auto" px="4">
          <SimpleGrid alignItems="center" columns={[1, null, null, 2]} columnGap={16} rowGap={10}>
            <Box color="white">
              <Heading className="text-4xl font-extrabold tracking-tight text-gray-900">
                Explore Westeros with ease
              </Heading>
              <Text mt={4}>
                We've compiled our own custom modpack to help get you traveling the Kings Road as
                easy as possible.
              </Text>
            </Box>
            <AspectRatio ratio={16 / 9}>
              <img
                src="https://tailwindui.com/img/ecommerce-images/incentives-07-hero.jpg"
                alt=""
                className="object-center object-cover"
              />
            </AspectRatio>
          </SimpleGrid>
          <SimpleGrid columns={[1, null, 3]} rowGap="10" columnGap="8" mt={16}>
            {incentives.map(incentive => (
              <Box
                display={['flex', null, 'block']}
                key={incentive.name}
                className="sm:flex lg:block"
              >
                <Box flexShrink={0}>
                  <Img w={16} h={16} src={incentive.imageSrc} alt="" />
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

// import {
//   Box,
//   Flex,
//   Heading,
//   HStack,
//   Icon,
//   Image,
//   Link,
//   Skeleton,
//   Stack,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import * as React from 'react';
// //   import { FaArrowRight } from 'react-icons/fa'

// export const VideoFeature = () => (
//   <Box maxW="7xl" mx="auto" px={{ base: '0', lg: '12' }} py={{ base: '0', lg: '12' }}>
//     <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={{ base: '0', lg: '20' }}>
//       <Box
//         width={{ lg: 'sm' }}
//         transform={{ base: 'translateY(-50%)', lg: 'none' }}
//         bg={{ base: useColorModeValue('red.50', 'gray.700'), lg: 'transparent' }}
//         mx={{ base: '6', md: '8', lg: '0' }}
//         px={{ base: '6', md: '8', lg: '0' }}
//         py={{ base: '6', md: '8', lg: '12' }}
//       >
//         <Stack spacing={{ base: '8', lg: '10' }}>
//           <Stack spacing={{ base: '2', lg: '4' }}>
//             <Heading size="xl" color={useColorModeValue('red.500', 'red.300')}>
//               Misguided
//             </Heading>
//             <Heading size="xl" fontWeight="normal">
//               Refresh your wardrobe
//             </Heading>
//           </Stack>
//           <HStack spacing="3">
//             <Link color={useColorModeValue('red.500', 'red.300')} fontWeight="bold" fontSize="lg">
//               Discover now
//             </Link>
//             <Icon
//               color={useColorModeValue('red.500', 'red.300')}
//               //   as={FaArrowRight}
//             />
//           </HStack>
//         </Stack>
//       </Box>
//       <Flex flex="1" overflow="hidden">
//         <Image
//           src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
//           alt="Lovely Image"
//           fallback={<Skeleton />}
//           maxH="450px"
//           minW="300px"
//           objectFit="cover"
//           flex="1"
//         />
//         <Image
//           display={{ base: 'none', sm: 'initial' }}
//           src="https://images.unsplash.com/photo-1589156206699-bc21e38c8a7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
//           alt="Lovely Image"
//           fallback={<Skeleton />}
//           maxH="450px"
//           objectFit="cover"
//         />
//       </Flex>
//     </Stack>
//   </Box>
// );
