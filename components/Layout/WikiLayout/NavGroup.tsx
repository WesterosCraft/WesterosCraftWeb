import { Box, Text } from '@chakra-ui/react';
import * as React from 'react';

interface NavGroupProps {
  label: string;
}

export const NavGroup = (props: NavGroupProps) => {
  const { label } = props;
  return (
    <Box>
      <Text
        px="3"
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="widest"
        color="gray.300"
      >
        {label}
      </Text>
    </Box>
  );
};
