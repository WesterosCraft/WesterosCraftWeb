import { Box, Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

interface ContainerBorderProps extends StackProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export const ContainerBorder = ({
  className,
  children,
  variant = 'light',
  ...rest
}: ContainerBorderProps) => {
  return (
    <Box as="section" w="full" className={className || 'container-border'}>
      <Box maxW="7xl" mx="auto" px={[2, null, 5]}>
        <Stack
          w="full"
          mx="auto"
          borderLeftWidth={{ base: '0', sm: '1.5px' }}
          borderRightWidth={{ base: '0', sm: '1.5px' }}
          borderColor={variant === 'light' ? 'primaryDark' : 'primaryGold'}
          {...rest}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
};
