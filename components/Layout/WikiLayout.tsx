import { Flex, Box } from '@chakra-ui/react';
import { Navbar } from '../Navbar';
import { Sidenav } from './Sidenav';

interface WikiLayoutProps {
  children: React.ReactNode;
  rightNav?: React.ReactNode;
}

export const WikiLayout = ({ children, rightNav }: WikiLayoutProps) => {
  return (
    <>
      <Navbar />

      <Flex className="wiki-layout" height="100vh" direction="row">
        <Flex
          className="no-bg-scrollbar"
          flexDirection={['row', null, null, 'column']}
          maxWidth={[null, null, null, 'xs']}
          overflowY={[null, null, null, 'scroll']}
          height={['auto', null, null, 'calc(100% - 40px)']}
          width="full"
          top={16}
          right={0}
          left={0}
          position="fixed"
          zIndex={100}
          background="primary"
        >
          <Sidenav />
        </Flex>
        <Flex flex="1 1" width="full" height="full" alignSelf="stretch">
          <Box width="full" minWidth={0}>
            <Flex
              as="main"
              mt={16}
              alignSelf="stretch"
              justifyContent="space-around"
              alignItems="flex-end"
              flexDirection="column"
              flex="1 1"
            >
              <Box
                as="article"
                width="full"
                height="full"
                position="relative"
                minWidth={0}
                mx="auto"
                mt={[28, null, null, 0]}
                pt={[8, 12, null, 0]}
              >
                <Box
                  className="content-wrapper"
                  pl={[0, null, null, 80]}
                  pr={!rightNav ? 0 : [0, null, null, null, null, 96]}
                  pt={[0, null, null, 10]}
                  pb={[24, null, null, 40]}
                >
                  {children}
                </Box>
                {rightNav && (
                  <Box
                    className="right-nav"
                    width="full"
                    display={['none', null, null, null, null, 'block']}
                    maxWidth={96}
                  >
                    {rightNav}
                  </Box>
                )}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
