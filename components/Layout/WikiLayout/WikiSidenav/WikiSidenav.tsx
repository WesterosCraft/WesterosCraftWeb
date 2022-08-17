import * as React from 'react';
import {
  Box,
  Stack,
  TabList,
  Tabs,
  Tab,
  Input,
  TabPanels,
  TabPanel,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LOCATIONS } from '../../../../constants/locations';
import { NavItem } from '../NavItem';
import { NavGroup } from '../NavGroup';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';

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

  const locationsByRegion = LOCATIONS.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.region.slug.current]) {
      acc[value.region.slug.current] = [];
    }

    // Grouping
    acc[value.region.slug.current].push(value);

    return acc;
  }, {} as any);

  const sortedLocations = Object.entries(locationsByRegion).sort();

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
      <Tabs
        size="sm"
        isFitted
        variant="enclosed"
        colorScheme="black"
        defaultIndex={tabs.findIndex(tab => router.pathname.includes(tab.href))}
        isLazy
      >
        <TabList>
          {tabs.map(tab => (
            <Tab
              key={tab.label}
              _selected={{
                borderColor: 'inherit',
                borderBottomColor: 'primaryDark',
              }}
              isDisabled={tab.label === 'Blocks'}
            >
              {tab.label === 'Blocks' ? (
                tab.label
              ) : (
                <NextLink href={tab.href}>
                  <a>{tab.label}</a>
                </NextLink>
              )}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Text>guides</Text>
          </TabPanel>
          <TabPanel p={0} pt="6" mb="12">
            <Accordion
              allowToggle
              index={sortedLocations.findIndex(loc => router.asPath?.includes(loc?.[0]))}
            >
              {sortedLocations.map(([key, value], i) => (
                <AccordionItem key={i} border={0}>
                  <NextLink href={`/wiki/locations/${key}`}>
                    <a>
                      <AccordionButton _hover={{ bg: 'primaryDarkGlare' }}>
                        <NavGroup label={startCase(toLower(key))} />
                      </AccordionButton>
                    </a>
                  </NextLink>
                  <AccordionPanel px={4}>
                    <Stack spacing="1">
                      {/* @ts-ignore */}
                      {value?.map((loc: any, i) => (
                        <NextLink key={i} href={`/wiki/locations/${key}/${loc?.slug?.current}`}>
                          <a>
                            <NavItem label={loc.title} />
                          </a>
                        </NextLink>
                      ))}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </TabPanel>
          <TabPanel p={0}>
            <Text>blocks</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
