import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Navbar } from '../../Navbar';
import { MobileWikiSidenav } from './WikiSidenav/MobileWikiSidenav';
import { WikiSidenav } from './WikiSidenav/WikiSidenav';

interface WikiLayoutProps {
  children: React.ReactNode;
  rightNav?: React.ReactNode;
}

export const WikiLayout = ({ children, rightNav }: WikiLayoutProps) => {
  return (
    <Flex direction="column" height="100vh" className="wiki-layout">
      <Navbar />
      <Box
        height="100vh"
        overflow="hidden"
        position="relative"
        borderTopWidth="1px"
        borderColor="gray.600"
      >
        <Flex h="full" id="app-container">
          <MobileWikiSidenav />
          <WikiSidenav />
          <Box flex="1" p="6" overflow="auto">
            <Box w="full" h="full">
              {children}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
