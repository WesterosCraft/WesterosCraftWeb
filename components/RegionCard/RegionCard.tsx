import {
  Box,
  Button,
  Stack,
  Text,
  Wrap,
  useToken,
  Progress,
  Center,
  Link,
  Spacer,
  Img,
  HStack,
} from '@chakra-ui/react';
import Image from 'next/image';
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
  blurDataURL: string;
  icon?: string;
}

export const RegionCard = ({
  name,
  heading,
  description,
  image,
  slug,
  notableBuild,
  percentComplete,
  blurDataURL,
  recentlyUpdated,
  icon,
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
          h="full"
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '3', md: '10' }}
          align="center"
          justify="center"
        >
          <Stack h="full" w="full" spacing="6" maxW="xs">
            <Image
              loader={({ src, width = 320 }) => {
                return `${src}?&w=${width}&q=100&fit=crop&crop=center`;
              }}
              src={image}
              width={320}
              height={250}
              alt={name}
              blurDataURL={blurDataURL}
              placeholder="blur"
            />
            <NextLink href={`/wiki/locations/${slug}`} passHref>
              <a>
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
              </a>
            </NextLink>
          </Stack>
          <Center>
            <Box maxW="md">
              <HStack>
                {icon && <Img width="32px" src={icon} alt={name} />}
                <Text as="h2" fontWeight="bold" fontSize="2xl">
                  {name}
                </Text>
              </HStack>
              <Text mt="2">{heading}</Text>
              <Box mt="2" fontSize="sm" noOfLines={2}>
                {description}
              </Box>
              <Wrap direction="column" shouldWrapChildren my="4" spacing="4">
                <NextLink passHref href={notableBuild?.link}>
                  <Link
                    textDecor="underline"
                    textDecorationColor="primaryRed"
                    textUnderlineOffset="3px"
                  >{`Notable Build: ${notableBuild?.title}`}</Link>
                </NextLink>
                <NextLink passHref href={recentlyUpdated?.link}>
                  <Link
                    textDecor="underline"
                    textDecorationColor="primaryRed"
                    textUnderlineOffset="3px"
                  >{`Recently Update: ${recentlyUpdated?.title}`}</Link>
                </NextLink>
                <Spacer />
                <Box w="full">
                  <Text>{`${percentComplete}% Complete`}</Text>
                  <Progress variant={camelCase(slug)} size="sm" value={percentComplete} />
                </Box>
              </Wrap>
            </Box>
          </Center>
        </Stack>
      </Card>
    </Box>
  );
};
