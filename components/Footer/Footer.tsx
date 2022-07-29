import { Box, Spacer, Stack, StackDivider } from '@chakra-ui/react';
import * as React from 'react';
import { Logo } from '../Navbar/Logo';
import { Copyright } from './Copyright';
import { LinkGrid } from './LinkGrid';
import { SocialMediaLinks } from './SocialMediaLinks';

export const Footer = () => (
  <Box bg="primaryDark" as="footer" role="contentinfo" py="12" px={{ base: '4', md: '8' }}>
    <Stack maxW="7xl" mx="auto" spacing="10" divider={<StackDivider />}>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '10', lg: '28' }}>
        <Box>
          <Logo />
        </Box>
        <Spacer />
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '10', md: '20' }}>
          <LinkGrid spacing={{ base: '10', md: '20', lg: '28' }} flex="1" />
        </Stack>
      </Stack>
      <Stack
        direction={{ base: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Stack>
  </Box>
);
