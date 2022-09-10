import { Box, BoxProps, Spacer, Stack, StackDivider, VStack, Link } from '@chakra-ui/react';
import * as React from 'react';
import { Logo } from '../Navbar/Logo';
import { Copyright } from './Copyright';
import { LinkGrid } from './LinkGrid';
import { SocialMediaLinks } from './SocialMediaLinks';

export interface FooterProps extends BoxProps {
  variant?: 'wiki';
}

export const Footer = ({ variant, ...rest }: FooterProps) => (
  <Box
    bg="primaryDark"
    as="footer"
    role="contentinfo"
    py="12"
    px={{ base: '4', md: '8' }}
    {...rest}
  >
    <Stack maxW="7xl" mx="auto" spacing="10" divider={<StackDivider />}>
      <Stack
        direction={
          variant === 'wiki' ? { base: 'column', xl: 'row' } : { base: 'column', lg: 'row' }
        }
        spacing={variant === 'wiki' ? { base: '10', xl: '20' } : { base: '10', lg: '28' }}
      >
        <VStack align="flex-start" spacing="4">
          <Logo />
          <Link color="white" href="mailto:westeroscraft@gmail.com">
            westeroscraft@gmail.com
          </Link>
        </VStack>
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
