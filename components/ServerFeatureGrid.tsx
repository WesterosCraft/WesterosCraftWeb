import {
  Box,
  Img,
  Flex,
  Center,
  VStack,
  Stack,
  Text,
  Button,
  StackDivider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/future/image';
import { urlFor } from '../lib/sanity';
// import Longclaw from '../public/longclaw.png';

import { ArrowRightIcon } from './Icons/ArrowRightIcon';

const links = [
  {
    heading: 'Creative',
    description: 'Get started exploring Westeros and see the building process happen for yourself!',
  },
  {
    heading: 'Survival',
    description:
      'Join our vanilla Minecraft server and get to know our community while playing the game you know and love.',
  },
];

export const ServerFeatureGrid = ({ image }: any) => {
  return (
    <Box w="full" className="serverFeatureGrid">
      <Box position="relative" maxW="7xl" mx="auto" px={[2, null, 4]} className="container">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor="primaryGold"
          spacing={8}
          mx="auto"
          w="full"
          pr={4}
        >
          <Center ml={{ base: 0, '2xl': -24 }}>
            <NextImage
              width={778}
              height={486}
              style={{ minWidth: 750 }}
              placeholder="blur"
              blurDataURL={image.asset.metadata.lqip}
              src={urlFor(image.asset).url()}
            />
          </Center>
          <VStack justify="center" mt="12" color="white" divider={<StackDivider />}>
            {links.map(link => (
              <Box key={link.heading} w="full" py={4}>
                <Text fontWeight="semibold" fontSize="2xl">
                  {link.heading}
                </Text>
                <Text mt="2">{link.description}</Text>
                <Flex
                  mt="3"
                  mb="2"
                  justifyContent={{ base: 'flex-end', sm: 'flex-start' }}
                  w="full"
                >
                  <NextLink href={link.linkUrl?.internal?.slug.current ?? '/wiki'} passHref>
                    <Button
                      fontWeight="md"
                      color="primaryGold"
                      variant="link"
                      fontSize="sm"
                      fill="primaryGold"
                      _hover={{
                        textDecor: 'none',
                        color: 'red.800',
                        fill: 'red.800',
                      }}
                      rightIcon={<ArrowRightIcon />}
                    >
                      link text
                      {/* {link.linkUrl.linkText} */}
                    </Button>
                  </NextLink>
                </Flex>
              </Box>
            ))}
          </VStack>
          {/* <VStack w="full" spacing={12} divider={<StackDivider />}>
            <Box w="full" height={200}>
              <VStack align="flex-start" color="White">
                <Text fontSize="xl">WesterosCraft Creative Server</Text>
              </VStack>
            </Box>
            <Box w="full" height={200}>
              <VStack align="flex-start" color="White">
                <Text fontSize="xl">WesterosCraft Creative Server</Text>
              </VStack>
            </Box>
          </VStack> */}
        </Stack>
      </Box>
    </Box>
  );
};
