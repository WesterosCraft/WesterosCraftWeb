import { Center, Text, Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { SquareTexture } from './SquareTexture';
export interface BannerProps {
  _type: string;
  linkText: string;
  external?: string;
}

export const Banner = ({ linkText, external }: BannerProps) => {
  return (
    <Center w="full" bg="primaryRed" px={4} py={6} position="relative">
      <SquareTexture />
      <Box position="relative" zIndex={5}>
        <NextLink href={external || ''} passHref>
          <Link
            color="white"
            isExternal={typeof external === 'string' ? true : false}
            _hover={{
              textDecor: 'none',
              color: 'gray.400',
            }}
          >
            <Text fontSize="xl">{linkText}</Text>
          </Link>
        </NextLink>
      </Box>
    </Center>
  );
};
