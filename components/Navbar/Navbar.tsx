import { Box, Center } from '@chakra-ui/react';
import * as React from 'react';
import { NavContent } from './NavContent';

export const Navbar = () => {
  return (
    <Center as="header" w="full" bg="primaryDark" position="relative" zIndex="10">
      <Box as="nav" aria-label="Main navigation" maxW="7xl" w="full" mx={{ base: '6', md: '8' }}>
        <NavContent.Mobile display={{ base: 'flex', lg: 'none' }} />
        <NavContent.Desktop display={{ base: 'none', lg: 'flex' }} />
      </Box>
    </Center>
  );
};
