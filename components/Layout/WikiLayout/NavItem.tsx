import { Box, HStack } from '@chakra-ui/react';
import * as React from 'react';

interface NavItemProps {
  href?: string;
  label: string;
  subtle?: boolean;
  active?: boolean;
  endElement?: React.ReactElement;
  children?: React.ReactNode;
}

export const NavItem = (props: NavItemProps) => {
  const { active, subtle, children, label, endElement } = props;
  return (
    <HStack
      w="full"
      px="3"
      py="2"
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
      _hover={{ bg: 'gray.700' }}
      _active={{ bg: 'gray.600' }}
    >
      <Box flex="1" fontWeight="inherit" color={subtle ? 'gray.400' : undefined}>
        {label}
      </Box>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} />}
    </HStack>
  );
};
