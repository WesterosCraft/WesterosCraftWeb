import {
  Box,
  Button,
  Text,
  Wrap,
  useToken,
  Progress,
  Center,
  Link,
  Spacer,
  Img,
  HStack,
  Flex,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import * as React from 'react';
import camelCase from 'lodash/camelCase';
import tinycolor from 'tinycolor2';
import NextLink from 'next/link';

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
    <Box as="section" h="full">
      <Box maxW="lg" h="full" mx="auto" border="1px solid black" p={{ base: '6' }}>
        <Flex w="full" h="full" direction={{ base: 'column' }} align="center" justify="center">
          <HStack justify="center" w="full">
            {icon && <Img width="32px" src={icon} alt={name} />}
            <Text as="h2" fontWeight="bold" fontSize="2xl">
              {name}
            </Text>
          </HStack>
          <Box mt="4" h="full" w="full" maxW="sm" mx="auto">
            <NextImage
              loader={({ src, width = 384 }) => {
                return `${src}?w=${width}&q=100&fit=crop&crop=center`;
              }}
              src={image}
              width={384}
              height={200}
              alt={name}
              blurDataURL={blurDataURL}
              placeholder="blur"
              style={{ maxHeight: 200 }}
            />
          </Box>
          <Center flexDirection="column" mt="4">
            <Box maxW="md" mb="2">
              <Text>{heading}</Text>
              <Box mt="2" fontSize="sm" noOfLines={2}>
                {description}
              </Box>
              <Wrap direction="column" shouldWrapChildren my="4" spacing="4">
                <Link
                  as={NextLink}
                  href={notableBuild?.link}
                  textDecor="underline"
                  textDecorationColor="primaryRed"
                  textUnderlineOffset="3px"
                >{`Notable Build: ${notableBuild?.title}`}</Link>

                <Link
                  as={NextLink}
                  href={recentlyUpdated?.link}
                  textDecor="underline"
                  textDecorationColor="primaryRed"
                  textUnderlineOffset="3px"
                >{`Recently Update: ${recentlyUpdated?.title}`}</Link>
                <Spacer />
                <Box w="full">
                  <Text>{`${percentComplete}% Complete`}</Text>
                  <Progress variant={camelCase(slug)} size="sm" value={percentComplete} />
                </Box>
              </Wrap>
            </Box>
            <NextLink href={`/wiki/locations/${slug}`} passHref>
              <Button
                width="full"
                bgColor={resolvedColor}
                _hover={{
                  bgColor: hoverColor,
                  color: color.isDark() ? 'white' : 'black',
                }}
                color={color.isDark() ? 'white' : 'black'}
              >
                View Locations
              </Button>
            </NextLink>
          </Center>
        </Flex>
      </Box>
    </Box>
  );
};
