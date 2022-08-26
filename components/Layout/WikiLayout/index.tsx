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
    <Flex direction="column" height="100vh" className="wiki-layout">
      <Navbar isWiki />
      <Box
        height="100vh"
        overflow="hidden"
        position="relative"
        borderTopWidth="1px"
        borderColor="gray.600"
      >
        <Flex h="full" flexDirection={{ base: 'column', lg: 'row' }} id="app-container">
          <WikiSidenav.Desktop />
          <Box
            pr="20rem"
            className="wiki-content"
            flex="1"
            px={{ base: 5, sm: 12 }}
            pt="10"
            overflow="auto"
          >
            <Box w="full" h="full">
              <Container maxW="5xl" px={0}>
                {children}
                <Spacer h="20" />
              </Container>
              <Footer variant="wiki" mx={{ base: -5, sm: -12 }} />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
