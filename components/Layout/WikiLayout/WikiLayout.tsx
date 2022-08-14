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
import NextLink from 'next/link';
import { useRouter } from 'next/router';

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

interface WikiLayoutProps {
  children: React.ReactNode;
  rightNav?: React.ReactNode;
}

export const WikiLayoutNew = ({ children, rightNav }: WikiLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Box
        height="100vh"
        overflow="hidden"
        position="relative"
        borderTopWidth="1px"
        borderColor="gray.600"
      >
        <Flex h="full" id="app-container">
          <Box w="72" bg="gray.800" color="white" fontSize="sm">
            <Input
              bg="gray.700"
              color="gray.400"
              // borderColor="primaryGold"
              borderRadius="none"
              display={['none', null, null, 'inherit']}
              placeholder="Search"
              my={4}
            />
            <Tabs
              isFitted
              variant="enclosed"
              colorScheme="black"
              defaultIndex={tabs.findIndex(tab => router.pathname.includes(tab.href))}
            >
              <TabList>
                {tabs.map(tab => (
                  <Tab key={tab.label}>
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
                <TabPanel p={0}>
                  <Flex h="full" direction="column" px="4" py="4">
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
                    <Box>
                      <Stack spacing="1">
                        <NavItem subtle label="Settings" />
                        <NavItem
                          subtle
                          label="Help & Support"
                          endElement={<Circle size="2" bg="blue.400" />}
                        />
                      </Stack>
                    </Box>
                  </Flex>
                </TabPanel>
                <TabPanel p={0}>
                  <Text>blocks</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Box flex="1" p="6">
            <Box w="full" h="full">
              {children}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
