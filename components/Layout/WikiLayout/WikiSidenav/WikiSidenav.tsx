import {
  Box,
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
import { NavGroup } from '../NavGroup';
import { NavItem } from '../NavItem';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LocationsAccordion } from './Locations';

const tabs = [
  {
    href: '/wiki/guides',
    label: 'Guides',
  },
  {
    href: '/wiki/locations',
    label: 'Locations',
  },
  {
    href: '/wiki/blocks',
    label: 'Blocks',
  },
];

export const WikiSidenav = () => {
  const router = useRouter();

  return (
    <Box w="72" bg="primaryDark" color="white" fontSize="sm">
      <Box mx={4}>
        <Input
          bg="gray.700"
          color="gray.400"
          borderRadius="none"
          display={['none', null, null, 'inherit']}
          placeholder="Search"
          my={4}
        />
      </Box>
      <Tabs
        size="sm"
        isFitted
        variant="enclosed"
        colorScheme="black"
        defaultIndex={tabs.findIndex(tab => router.pathname.includes(tab.href))}
      >
        <TabList>
          {tabs.map(tab => (
            <Tab
              key={tab.label}
              _selected={{
                borderColor: 'inherit',
                borderBottomColor: 'primaryDark',
              }}
            >
              <NextLink href={tab.href} passHref>
                {tab.label}
              </NextLink>
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Text>guides</Text>
          </TabPanel>
          <TabPanel p={0} pt="6">
            <LocationsAccordion />
            {/* <Flex h="full" direction="column" px="4" py="4">
              <Stack spacing="8" flex="1" overflow="auto" pt="8">
                <Stack spacing="1">
                  <NavItem active label="Get Started" />
                  <NavItem label="Inbox" />
                </Stack>
                <NavGroup label="Your Business">
                  <NavItem label="Transactions" />
                  <NavItem label="Customers" />
                  <NavItem label="Income" />
                  <NavItem label="Transfer" />
                </NavGroup>

                <NavGroup label="Seller Tools">
                  <NavItem label="Payment Pages" />
                  <NavItem label="Invoices" />
                  <NavItem label="Plans" />
                  <NavItem label="Subsription" />
                </NavGroup>
              </Stack>
            </Flex> */}
          </TabPanel>
          <TabPanel p={0}>
            <Text>blocks</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
