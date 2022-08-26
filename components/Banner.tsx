import { Center, Text, Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { SquareTexture } from './SquareTexture';
export interface BannerProps {
  _type?: string;
  linkText: string;
  link: string;
  isExternal?: boolean;
}

export const Banner = ({ linkText, link, isExternal }: BannerProps) => {
  return (
    <Center textAlign="center" w="full" bg="primaryRed" px={4} py={6} position="relative">
      <SquareTexture />
      <Box position="relative" zIndex={5}>
        {isExternal ? (
          <Link
            color="white"
            isExternal={isExternal}
            _hover={{
              textDecor: 'none',
              color: 'whiteAlpha.800',
            }}
          >
            <Text fontSize="xl">{linkText}</Text>
          </Link>
        ) : (
          <NextLink href={link}>
            <a>
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
            </a>
          </NextLink>
        )}
      </Box>
    </Center>
  );
};
