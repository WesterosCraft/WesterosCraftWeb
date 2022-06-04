import { useRef, useCallback } from 'react';
import {
  Box,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Tab,
  Heading,
  Text,
  Input,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  HStack,
  Image,
} from '@chakra-ui/react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LocationsAccordion } from './LocationsAccordion';
import { MagnifyingGlassIcon } from '../../Icons/MagnifyingGlass';
import { PipeIcon } from '../../Icons/Pipe';
// import Image from "next/image";

const tabs = [
  {
    href: '/guides',
    label: 'Guides',
  },
  {
    href: '/locations',
    label: 'Locations',
  },
  {
    href: '/blocks',
    label: 'Blocks',
  },
];

export const Sidenav = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: false,
  });
  const tabsSize = useBreakpointValue({ base: 'sm', sm: 'md' });
  const tabsVariant = useBreakpointValue({ base: 'line', lg: 'enclosed' });
  const tabAlignment = useBreakpointValue({ base: 'center', lg: 'start' });
  const tabFitted = useBreakpointValue({ base: true, lg: false });
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const menuRef = useRef(null);

  const showSidebar = useCallback(() => {
    onOpen();
    if (menuRef.current != null) {
      disableBodyScroll(menuRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideSidebar = useCallback(() => {
    onClose();
    if (menuRef.current != null) {
      enableBodyScroll(menuRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      hideSidebar();
    } else {
      showSidebar();
    }
  }, [showSidebar, hideSidebar, isOpen]);

  return (
    <>
      <Tabs
        as="nav"
        position="sticky"
        top={0}
        width="full"
        zIndex={100}
        defaultIndex={tabs.findIndex((tab) => router.pathname.includes(tab.href))}
        align={tabAlignment as 'start' | 'end' | 'center'}
        isFitted={tabFitted}
        boxShadow={['lg', null, null, 'none']}
        ref={menuRef}
        colorScheme="black"
        variant={tabsVariant}
        size={tabsSize}
        isLazy
      >
        <Box>
          <HStack
            justify="space-between"
            spacing={4}
            pt={[4, null, null, 10]}
            pb={[4, null, null, 0]}
            px={5}
          >
            <Link href="/" passHref>
              <HStack spacing={0} minWidth={120}>
                <Image
                  src="/shield-logomark.png"
                  width={'36px'}
                  height={44.3}
                  alt="Shield Logomark"
                  className="logomark"
                />
                <PipeIcon boxSize={6} />
                <Heading whiteSpace="nowrap" cursor="pointer" fontSize="3xl">
                  Wiki
                </Heading>
              </HStack>
            </Link>
            <IconButton
              display={['inherit', null, 'none']}
              variant="unstyled"
              aria-label="open search"
              size="md"
              p={1}
              icon={<MagnifyingGlassIcon />}
            />
            <Input
              borderRadius="none"
              display={['none', null, 'inherit', 'none']}
              placeholder="Search"
              my={4}
            />
          </HStack>

          <>
            <Box px={5}>
              <TabList mt={[0, null, null, 5]}>
                {tabs.map((tab, i) =>
                  isMobile ? (
                    <Tab id={`tab-${i}`} borderColor="primary" key={tab.label} onClick={toggleOpen}>
                      {tab.label}
                    </Tab>
                  ) : (
                    <Link key={tab.label} href={tab.href} passHref>
                      <Tab id={`tab-${i}`}>{tab.label}</Tab>
                    </Link>
                  )
                )}
              </TabList>
              <Input
                borderColor="text"
                borderRadius="none"
                display={['none', null, null, 'inherit']}
                placeholder="Search"
                my={4}
              />
            </Box>
            {(isOpen || !isMobile) && (
              <TabPanels
                pt={[2, null, null, 0]}
                overflowY={['auto', null, null, 'initial']}
                height={['calc(100vh - 24px - 40px - 40px)', null, null, 'auto']}
                mb={12}
              >
                <TabPanel p={0}>
                  <Text>guides</Text>
                </TabPanel>
                <TabPanel p={0}>
                  <LocationsAccordion onNavigate={hideSidebar} />
                </TabPanel>
                <TabPanel p={0}>
                  <Text>blocks</Text>
                </TabPanel>
              </TabPanels>
            )}
          </>
        </Box>
      </Tabs>
    </>
  );
};
