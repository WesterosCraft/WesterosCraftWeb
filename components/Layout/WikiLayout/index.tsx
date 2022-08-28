import { Box, Flex, Spacer } from '@chakra-ui/react';
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
    <Flex direction="column" className="wiki-layout">
      <Navbar isWiki />
      <Flex
        h={{ base: 'calc(100vh - 56px)', lg: 'calc(100vh - 72px)' }}
        overflow="hidden"
        position="relative"
        borderTopWidth="1px"
        borderColor="gray.600"
      >
        <Flex id="app-container" h="full" w="full" flexDirection={{ base: 'column', lg: 'row' }}>
          <WikiSidenav.Desktop />
          <Box
            pr="20rem"
            className="wiki-content"
            flex="1 1 0%"
            px={{ base: 5, sm: 12 }}
            pt="10"
            overflowY="scroll"
            h="full"
          >
            <Flex direction="column" justifyContent="space-between" w="full" h="full">
              <Box w="full" maxW="5xl" mx="auto">
                {children}
                <Spacer h="20" />
              </Box>
              <Box>
                <Footer variant="wiki" mx={{ base: -5, sm: -12 }} />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
