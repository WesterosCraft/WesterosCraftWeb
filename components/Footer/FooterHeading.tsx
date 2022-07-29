import { HeadingProps } from '@chakra-ui/layout';
import { Heading, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';

export const FooterHeading = (props: HeadingProps) => (
  <Heading
    as="h4"
    color="whiteAlpha.900"
    fontSize="sm"
    fontWeight="semibold"
    textTransform="uppercase"
    letterSpacing="wider"
    {...props}
  />
);
