import { Box, BoxProps } from '@chakra-ui/react';
import * as React from 'react';

export const Card = (props: BoxProps) => (
  <Box
    maxW="4xl"
    mx="auto"
    border="1px solid black"
    padding="10"
    px={{ base: '6', md: '8' }}
    {...props}
  />
);
