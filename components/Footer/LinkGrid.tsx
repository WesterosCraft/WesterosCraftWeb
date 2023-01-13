import { Box, Link, SimpleGrid, SimpleGridProps, Stack } from '@chakra-ui/react';
import * as React from 'react';
import NextLink from 'next/link';
import { FooterHeading } from './FooterHeading';

export const LinkGrid = (props: SimpleGridProps) => (
  <SimpleGrid columns={{ base: 2, sm: 3 }} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">About</FooterHeading>
      <Stack color="white">
        <Link as={NextLink} href="/about">
          About Us
        </Link>
        <Link as={NextLink} href="/progress">
          Progress
        </Link>
        <Link as={NextLink} href="/rookery">
          The Rookery
        </Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Community</FooterHeading>
      <Stack color="white">
        <Link href="https://forum.westeroscraft.com/forum/">Forums</Link>

        <Link href="https://forum.westeroscraft.com/form/builder-application-form.3/select">
          Apply
        </Link>
        <Link href="https://discord.com/invite/pBS5TH4">Discord</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Resources</FooterHeading>
      <Stack color="white">
        <Link as={NextLink} href="/wiki">
          Wiki
        </Link>

        <Link href="http://mc.westeroscraft.com/">Map</Link>
        <Link href="https://ko-fi.com/westeroscraft">Donate</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
