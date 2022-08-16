import {
  Box,
  Circle,
  Flex,
  Stack,
  TabList,
  Tabs,
  Tab,
  Input,
  TabPanels,
  TabPanel,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { Navbar } from '../../Navbar';
import { NavGroup } from './NavGroup';
import { NavItem } from './NavItem';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Sidenav } from '../Sidenav';
import { LOCATIONS } from '../../../constants/locations';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { WikiSidenav } from './WikiSidenav/WikiSidenav';

interface WikiLayoutProps {
  children: React.ReactNode;
  rightNav?: React.ReactNode;
}

export const WikiLayoutNew = ({ children, rightNav }: WikiLayoutProps) => {
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
