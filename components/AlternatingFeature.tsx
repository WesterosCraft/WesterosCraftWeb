import {
  AspectRatio,
  Box,
  Heading,
  Button,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { ArrowRightIcon } from './Icons/ArrowRightIcon';

export interface AlternatingFeatures {
  features: Feature[];
}

export interface Feature {
  _key: string;
  _type: string;
  heading: string;
  imageLink?: string;
  link: Link;
  subheading: string;
}

export interface Link {
  _type: string;
  linkText: string;
}

export const AlternatingFeature = ({ features }: AlternatingFeatures) => {
  return (
    <Box w="full" className="AlternatingFeature">
      <Box w="full" maxW="7xl" mx="auto" px={[2, null, 4]}>
        <VStack
          w="full"
          spacing={{ base: '16', lg: '24' }}
          borderColor="black"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          pb={{ base: '24', sm: '32' }}
          px={{ base: '4', md: '10' }}
        >
          {features.map((item, index) => (
            <Stack
              key={index}
              w="full"
              direction={
                index % 2 === 0
                  ? { base: 'column-reverse', lg: 'row' }
                  : { base: 'column-reverse', lg: 'row-reverse' }
              }
              spacing={{ base: '0', lg: '12' }}
            >
              <Box w="full" overflow="hidden">
                <AspectRatio
                  ratio={[4 / 3, null, 21 / 9]}
                  maxH={{ base: '280', lg: '400' }}
                  pointerEvents="none"
                >
                  <iframe loading="lazy" src={item.imageLink} />
                </AspectRatio>
              </Box>
              <Box
                width={{ lg: 'lg' }}
                mx={{ base: '6', md: '8', lg: '0' }}
                px={{ base: '6', md: '8', lg: '0' }}
                py={{ base: '6', md: '8', lg: '12' }}
              >
                <Stack spacing={{ base: '8', lg: '10' }}>
                  <Stack spacing={{ base: '2', lg: '4' }}>
                    <Heading size="xl">{item.heading}</Heading>
                    <Text>{item.subheading}</Text>
                  </Stack>
                  <Box>
                    <Button
                      color="primaryRed"
                      variant="link"
                      rightIcon={<Icon fill="primaryRed" as={ArrowRightIcon} />}
                      _hover={{
                        textDecor: 'none',
                        color: 'red.800',
                        fill: 'red.800',
                      }}
                    >
                      {item.link.linkText}
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
