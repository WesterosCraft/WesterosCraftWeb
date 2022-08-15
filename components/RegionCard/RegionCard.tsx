import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Wrap,
  useToken,
  Progress,
  Center,
} from '@chakra-ui/react';
import Image from 'next/future/image';
import * as React from 'react';
import camelCase from 'lodash/camelCase';
import tinycolor from 'tinycolor2';
import NextLink from 'next/link';
import { Card } from './Card';

interface BuildDetail {
  title: string;
  link: string;
}

interface RegionCard {
  name: string;
  heading: string;
  description: string;
  image: string;
  slug: string;
  notableBuild: BuildDetail;
  recentlyUpdated: BuildDetail;
  percentComplete: number;
}

export const RegionCard = ({
  name,
  heading,
  description,
  image,
  slug,
  notableBuild,
  percentComplete,
  recentlyUpdated,
}: RegionCard) => {
  const resolvedColor = `${camelCase(slug)}.default`;
  const [token] = useToken('colors', [resolvedColor]);

  const color = tinycolor(token);
  const hoverColor = color.lighten().toString();

  return (
    <Box as="section" py="4">
      <Card>
        <Stack
          w="full"
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '3', md: '10' }}
          align="flex-start"
        >
          <Stack spacing="4">
            <Image src={image} width={300} height={225} alt={name} />
            <NextLink href={`/wiki/locations/${slug}`}>
              <Button
                width="full"
                bgColor={resolvedColor}
                _hover={{
                  bgColor: hoverColor,
                  color: color.isDark() ? 'white' : 'black',
                }}
                color={color.isDark() ? 'white' : 'black'}
                display={{ base: 'none', md: 'initial' }}
              >
                View Locations
              </Button>
            </NextLink>
          </Stack>
          <Center>
            <Box w="full" maxW="md">
              <Stack spacing={{ base: '1', md: '2' }} direction={{ base: 'column', md: 'row' }}>
                <Text as="h2" fontWeight="bold" fontSize="xl">
                  {name}
                </Text>
              </Stack>
              <Text mt="2">{heading}</Text>
              <Box fontSize="sm" noOfLines={2}>
                {description}
              </Box>
              <Wrap direction="column" shouldWrapChildren my="4" spacing="4">
                <Text>{`${percentComplete}% Complete`}</Text>
                <Box w="full">
                  <Progress variant={camelCase(slug)} size="sm" value={percentComplete} />
                </Box>
                <NextLink passHref href={notableBuild?.link}>
                  <HStack as="a" spacing={1}>
                    <Text fontWeight="semibold" fontSize="xs" textTransform="uppercase">
                      {`Notable Build: ${notableBuild?.title}`}
                    </Text>
                  </HStack>
                </NextLink>
                <NextLink passHref href={recentlyUpdated?.link}>
                  <HStack as="a" spacing={1}>
                    <Text fontWeight="semibold" fontSize="xs" textTransform="uppercase">
                      {`Recently Update: ${recentlyUpdated?.title}`}
                    </Text>
                  </HStack>
                </NextLink>
              </Wrap>
            </Box>
          </Center>
        </Stack>
      </Card>
    </Box>
  );
};
