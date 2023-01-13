import { Center, Text, Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { SquareTexture } from './SquareTexture';
export interface BannerProps {
  _type?: string;
  linkText: string;
  link: string;
  isExternal?: boolean;
  external?: string;
}

export const Banner = ({ linkText, link, isExternal, external }: BannerProps) => {
  return (
    <Center textAlign="center" w="full" bg="primaryRed" px={4} py={6} position="relative">
      <SquareTexture />
      <Box position="relative" zIndex={5}>
        {isExternal || typeof external === 'string' ? (
          <Link
            color="white"
            isExternal={isExternal || typeof external === 'string'}
            href={external}
            _hover={{
              textDecor: 'none',
              color: 'whiteAlpha.800',
            }}
          >
            <Text fontSize="xl">{linkText}</Text>
          </Link>
        ) : (
          <NextLink href={link}>
            <Text
              color="white"
              _hover={{
                textDecor: 'none',
                color: 'whiteAlpha.800',
              }}
              fontSize="xl"
            >
              {linkText}
            </Text>
          </NextLink>
        )}
      </Box>
    </Center>
  );
};
