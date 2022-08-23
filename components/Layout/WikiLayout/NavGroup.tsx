import { Box, Text } from '@chakra-ui/react';
import * as React from 'react';

interface NavGroupProps {
  label: string;
  active?: boolean;
}

export const NavGroup = (props: NavGroupProps) => {
  const { label, active } = props;
  return (
    <Box>
      <Text
        px="3"
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="widest"
        color={active ? 'gray.200' : 'gray.300'}
      >
        {label}
      </Text>
    </Box>
  );
};
