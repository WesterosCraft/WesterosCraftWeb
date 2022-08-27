import { Box, Container, Flex, Spacer } from '@chakra-ui/react';
import * as React from 'react';
import { Footer } from '../../Footer/Footer';
import { Navbar } from '../../Navbar';
import { WikiSidenav } from './WikiSidenav/WikiSidenav';

interface WikiLayoutProps {
  children: React.ReactNode;
  rightNav?: React.ReactNode;
}

export const WikiLayout = ({ children, rightNav }: WikiLayoutProps) => {
  return (
    <Flex direction="column" className="wiki-layout" h="100vh">
      <Navbar isWiki />
      <Box
        h="full"
        overflow="hidden"
        position="relative"
        borderTopWidth="1px"
        borderColor="gray.600"
      >
        <Flex h="full" flexDirection={{ base: 'column', lg: 'row' }} id="app-container">
          <WikiSidenav.Desktop />
          <Flex
            flexDirection="column"
            alignSelf="stretch"
            pr="20rem"
            className="wiki-content"
            flex="1"
            px={{ base: 5, sm: 12 }}
            pt="10"
            overflow="auto"
            h="full"
          >
            <Box w="full" h="full">
              <Box maxW="5xl" px={0} h="full">
                {children}
                <Spacer h="20" />
                <Footer variant="wiki" mx={{ base: -5, sm: -12 }} />
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
