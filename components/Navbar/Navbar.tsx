import { Box, Center } from '@chakra-ui/react';
import * as React from 'react';
import { NavContent } from './NavContent';

interface NavbarProps {
  isWiki?: boolean;
}

export const Navbar = ({ isWiki }: NavbarProps) => {
  return (
    <Center as="header" w="full" bg="primaryDark" position="relative" zIndex="10">
      <Box
        as="nav"
        aria-label="Main navigation"
        maxW="7xl"
        w="full"
        mx={{ base: '4', sm: '6', md: '8' }}
      >
        <NavContent.Mobile isWiki={isWiki} display={{ base: 'flex', lg: 'none' }} />
        <NavContent.Desktop display={{ base: 'none', lg: 'flex' }} />
      </Box>
    </Center>
  );
};
