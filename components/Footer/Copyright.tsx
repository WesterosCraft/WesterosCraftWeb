import { Text, TextProps } from '@chakra-ui/layout';
import * as React from 'react';

export const Copyright = (props: TextProps) => (
  <Text fontSize="sm" color="white" {...props}>
    WesterosCraft is a free, volunteer fan project not affiliated in any way with GRRM, Mojang, or
    HBO.
  </Text>
);
