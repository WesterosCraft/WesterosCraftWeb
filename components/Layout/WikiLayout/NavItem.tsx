import { Box, HStack, StackProps } from '@chakra-ui/react';
import * as React from 'react';

interface NavItemProps extends StackProps {
  href?: string;
  label: string;
  subtle?: boolean;
  active?: boolean;
  endElement?: React.ReactElement;
  children?: React.ReactNode;
}

export const NavItem = (props: NavItemProps) => {
  const { active, subtle, children, label, endElement, ...rest } = props;
  return (
    <HStack
      w="full"
      pr="3"
      pl="5"
      py="2"
      cursor="pointer"
      userSelect="none"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
      _hover={{ bg: 'gray.700' }}
      _active={{ bg: 'gray.600' }}
      {...rest}
    >
      <Box flex="1" fontWeight="inherit" color={subtle ? 'gray.400' : undefined}>
        {label}
      </Box>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} />}
    </HStack>
  );
};
