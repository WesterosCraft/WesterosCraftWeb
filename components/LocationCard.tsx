import { Flex, Text, Divider, LinkBox, HStack, LinkOverlay, Box, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/future/image';
import { nameFormatter } from '../utils';

export interface LocationCardProps {
  title: string;
  category: string;
  link: string;
  projectStatus: string;
  image?: string;
  blurDataURL?: string;
  house?: string;
}

export const LocationCard = ({
  title,
  category,
  link,
  image,
  blurDataURL,
  house,
  projectStatus,
}: LocationCardProps) => {
  const myLoader = ({ src = '' }) => {
    return `${src}?fit=crop&auto=format&crop=center&w=${352}&h=275&q=100`;
  };

  return (
    <LinkBox
      as={Flex}
      flexShrink={0}
      direction="column"
      maxW="sm"
      p={4}
      width="full"
      outline="1.5px solid black"
      _hover={{
        bg: 'primaryGlare',
        outline: '1.5px solid black',
        cursor: 'pointer',
      }}
    >
      <HStack>
        <Text letterSpacing={1.1} fontSize="lg" fontWeight="medium" width="full">
          {title}
        </Text>
        <Text>{category}</Text>
      </HStack>
      <Divider borderBottomColor="black" mt={2} />
      <LinkOverlay as={NextLink} passHref href={link}>
        <a>
          {image ? (
            <Flex
              mt={3}
              mb={2}
              width="full"
              height="auto"
              outline="1.5px solid black"
              position="relative"
              bgColor="primaryGlare"
            >
              <NextImage
                src={image}
                blurDataURL={blurDataURL || undefined}
                placeholder={blurDataURL ? 'blur' : undefined}
                width={352}
                height={275}
                loader={myLoader}
              />
            </Flex>
          ) : (
            <Spacer
              mt={3}
              mb={2}
              outline="1.5px solid black"
              position="relative"
              className="spacer"
              h={229}
              bgColor="primaryGlare"
            />
          )}
        </a>
      </LinkOverlay>
      <Spacer />
      <HStack justify="space-between">
        <Text fontSize="sm" color="gray.700">
          {house}
        </Text>
        <Text fontSize="sm" color="gray.700">
          {nameFormatter(projectStatus)}
        </Text>
      </HStack>
    </LinkBox>
  );
};
