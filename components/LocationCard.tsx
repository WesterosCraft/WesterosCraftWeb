import { Flex, Heading, Text, Divider, LinkBox, HStack, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/future/image';
import { nameFormatter } from '../utils';
import { BuildCategory } from '../types';

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
    return `${src}?fit=crop&auto=format&crop=center&h=275&w=${352}&q=100`;
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
        <Heading letterSpacing={1.1} fontSize="md" width="full">
          {title}
        </Heading>
        <Text fontSize="sm">{category}</Text>
      </HStack>
      <Divider borderBottomColor="black" mt={2} />
      <LinkOverlay as={NextLink} passHref href={link}>
        <a>
          <Flex
            mt={3}
            mb={2}
            width="full"
            height={275}
            outline="1.5px solid black"
            position="relative"
            bgColor="primaryGlare"
          >
            {image && (
              <NextImage
                src={image}
                blurDataURL={blurDataURL || undefined}
                placeholder={blurDataURL ? 'blur' : undefined}
                width={300}
                height={300}
                // objectFit="cover"
                // objectPosition="center"
                // layout="fill"
                loader={myLoader}
              />
            )}
          </Flex>
        </a>
      </LinkOverlay>
      <HStack justify="space-between">
        <Text fontSize="xs" color="gray.700">
          {house}
        </Text>
        <Text fontSize="xs" color="gray.700">
          {nameFormatter(projectStatus)}
        </Text>
      </HStack>
    </LinkBox>
  );
};
