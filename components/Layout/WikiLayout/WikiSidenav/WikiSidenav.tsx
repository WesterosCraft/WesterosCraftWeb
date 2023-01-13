import * as React from 'react';
import { Box, TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NavItem } from '../NavItem';
import { WIKI_TABS } from '../../../../constants/tabs';
import { LocationsPanel } from './LocationsPanel';
import { AlgoliaInput } from '../../../AlgoliaInput';
import { GuidesPanel } from './GuidesPanel';

const DesktopWikiSidenav = () => {
  const router = useRouter();
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
      <Box m="4" display={['none', null, null, 'inherit']}>
        <AlgoliaInput />
      </Box>
      <NextLink href="/wiki">
        <NavItem active={router.asPath === '/wiki'} label="Wiki" mb="4" />
      </NextLink>
      <WikiNavTabs>
        <TabPanels>
          <TabPanel p={0} pt="6" mb="12">
            <GuidesPanel.Desktop />
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
  const router = useRouter();

  return (
    <Box color="white" fontSize="sm" overflowY="scroll" className="no-bg-scrollbar">
      <Box mb="6">
        <NextLink href="/">
          <NavItem label="Home" />
        </NextLink>
        <NextLink href="/wiki">
          <NavItem active={router.asPath === '/wiki'} label="Wiki" />
        </NextLink>
      </Box>

      <WikiNavTabs>
        <TabPanels>
          <TabPanel p={0} pt="6" mb="12">
            <GuidesPanel.Mobile />
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
          <NextLink key={tab.label} href={tab.href} passHref>
            <Tab
              _selected={{
                borderColor: 'inherit',
                borderBottomColor: 'primaryDark',
              }}
              isDisabled={tab.label === 'Blocks'}
            >
              {tab.label}
            </Tab>
          </NextLink>
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
