import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react';
import Image from 'next/future/image';
import * as React from 'react';
import camelCase from 'lodash/camelCase';

import NextLink from 'next/link';
import { Card } from './Card';

export const RegionCard = ({ name, heading, description, image, slug }) => (
  <Box as="section" py="4">
    <Card>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '3', md: '10' }}
        align="flex-start"
      >
        <Stack spacing="4">
          <Image src={image} width={300} height={225} alt={name} />
          <NextLink href={`/wiki/locations/${slug}`}>
            <Button
              width="full"
              bgColor={`${camelCase(slug)}.default`}
              display={{ base: 'none', md: 'initial' }}
            >
              View Locations
            </Button>
          </NextLink>
        </Stack>
        <Box>
          <Stack spacing={{ base: '1', md: '2' }} direction={{ base: 'column', md: 'row' }}>
            <Text as="h2" fontWeight="bold" fontSize="xl">
              {name}
            </Text>
          </Stack>
          <Text mt="2">{heading}</Text>
          <Wrap direction="column" shouldWrapChildren my="4" spacing="4">
            <HStack>
              {/* <Icon as={HiCash} fontSize="xl" color="gray.400" /> */}
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                <b>$2.5k</b> earned
              </Text>
            </HStack>

            <HStack spacing="1">
              {/* <Icon as={HiLocationMarker} color="gray.400" /> */}
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                Dubai, UAE
              </Text>
            </HStack>
          </Wrap>
          <Box fontSize="sm" noOfLines={2}>
            {description}
          </Box>
        </Box>
      </Stack>
    </Card>
  </Box>
);
