import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import { CardBadge } from './CardBadge';

export interface CardProps extends BoxProps {
  isRecommended?: boolean;
}

export const Card = (props: CardProps) => {
  const { children, isRecommended, ...rest } = props;
  return (
    <Box
      borderColor="primaryGold"
      borderWidth="1px"
      bg="primaryDarkGlare"
      position="relative"
      px="6"
      pb="6"
      pt="16"
      overflow="hidden"
      shadow="lg"
      maxW="md"
      width="100%"
      color="white"
      {...rest}
    >
      {isRecommended && <CardBadge>RECOMMENDED</CardBadge>}
      {children}
    </Box>
  );
};
