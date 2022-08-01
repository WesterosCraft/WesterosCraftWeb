import { Box, Link, SimpleGrid, SimpleGridProps, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { FooterHeading } from './FooterHeading';

export const LinkGrid = (props: SimpleGridProps) => (
  <SimpleGrid columns={{ base: 2, sm: 3 }} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">About</FooterHeading>
      <Stack color="white">
        <Link>About Us</Link>
        <Link>Progress</Link>
        <Link>The Rookery</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Community</FooterHeading>
      <Stack color="white">
        <Link>Forums</Link>
        <Link>Apply</Link>
        <Link>Discord</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Resources</FooterHeading>
      <Stack color="white">
        <Link>Wiki</Link>
        <Link>Map</Link>
        <Link>Donate</Link>
        <Link>Contact</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
