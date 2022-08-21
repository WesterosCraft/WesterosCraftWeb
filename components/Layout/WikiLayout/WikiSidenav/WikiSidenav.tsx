import * as React from 'react';
import { Box, TabList, Tabs, Tab, Input, TabPanels, TabPanel, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NavItem } from '../NavItem';
import { WIKI_TABS } from '../../../../constants/tabs';
import { LocationsPanel } from './LocationsPanel';

const DesktopWikiSidenav = () => {
  return (
    <Box
      display={{ base: 'none', lg: 'block' }}
      w="72"
      bg="primaryDark"
      color="white"
      fontSize="sm"
      overflowY="scroll"
      className="no-bg-scrollbar"
    >
      <Box mx={4}>
        <Input
          focusBorderColor="primaryGold"
          border="none"
          bg="primaryDarkGlare2"
          color="white"
          _placeholder={{
            color: 'white',
          }}
          borderRadius="none"
          display={['none', null, null, 'inherit']}
          placeholder="Search"
          my={4}
        />
      </Box>
      <NextLink href="/wiki">
        <a>
          <NavItem label="Wiki" mb="4" />
        </a>
      </NextLink>
      <WikiNavTabs>
        <TabPanels>
          <TabPanel p={0}>
            <Text>guides</Text>
          </TabPanel>
          <TabPanel p={0} pt="6" mb="12">
            <LocationsPanel.Desktop />
          </TabPanel>
        </TabPanels>
      </WikiNavTabs>
    </Box>
  );
};

const MobileWikiSidenav = () => {
  return (
    <Box color="white" fontSize="sm" overflowY="scroll" className="no-bg-scrollbar">
      <Box mb="6">
        <NextLink href="/">
          <a>
            <NavItem label="Home" />
          </a>
        </NextLink>
        <NextLink href="/wiki">
          <a>
            <NavItem label="Wiki" />
          </a>
        </NextLink>
      </Box>

      <WikiNavTabs>
        <TabPanels>
          <TabPanel p={0}>
            <Text>guides</Text>
          </TabPanel>
          <TabPanel p={0} pt="6" mb="12">
            <LocationsPanel.Mobile />
          </TabPanel>
        </TabPanels>
      </WikiNavTabs>
    </Box>
  );
};

function WikiNavTabs({ children }: { children?: React.ReactNode }) {
  const router = useRouter();

  function getActiveTabIndex() {
    return WIKI_TABS.findIndex(tab => router.pathname.includes(tab.href));
  }

  return (
    <Tabs
      size={{ base: 'md', lg: 'sm' }}
      isFitted
      variant="enclosed"
      colorScheme="black"
      index={getActiveTabIndex() === -1 ? 0 : getActiveTabIndex()}
      isLazy
    >
      <TabList ml={{ base: '0', lg: '4' }}>
        {WIKI_TABS.map(tab => (
          <Tab
            key={tab.label}
            _selected={{
              borderColor: 'inherit',
              borderBottomColor: 'primaryDark',
            }}
            isDisabled={tab.label === 'Blocks'}
          >
            <NextLink href={tab.href}>
              <a>{tab.label}</a>
            </NextLink>
          </Tab>
        ))}
      </TabList>
      {children}
    </Tabs>
  );
}

export const WikiSidenav = {
  Desktop: DesktopWikiSidenav,
  Mobile: MobileWikiSidenav,
};
