import { Flex, Text, Divider, LinkBox, HStack, LinkOverlay } from '@chakra-ui/react';
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
    return `${src}?fit=crop&auto=format&crop=center&w=${350}&q=100`;
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
                width={350}
                height={275}
                loader={myLoader}
              />
            )}
          </Flex>
        </a>
      </LinkOverlay>
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
