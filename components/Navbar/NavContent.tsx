import * as React from 'react';
import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  useDisclosure,
  VisuallyHidden,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { NavMenu } from './NavMenu';
import { Submenu } from './Submenu';
import { ToggleButton } from './ToggleButton';
import { links } from './_data';

const MobileNavContext = (props: FlexProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex align="center" justify="space-between" className="nav-content__mobile" {...props}>
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <Box as="a" rel="home" mx="auto">
          <Logo h="24px" />
        </Box>
        <Box visibility={{ base: 'hidden', sm: 'visible' }}>
          <Button as="a" colorScheme="whiteAlpha">
            Get Started
          </Button>
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>
        {links.map((link, idx) =>
          link.links ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link?.slug?.current}>
              {link.title}
            </NavLink.Mobile>
          ),
        )}
        <Button colorScheme="blue" w="full" size="lg" mt="5">
          Try for free
        </Button>
      </NavMenu>
    </>
  );
};

const DesktopNavContent = (props: FlexProps) => {
  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <Box as="a" href="#" rel="home">
        <VisuallyHidden>WesterosCraft</VisuallyHidden>
        <NextLink href="/">
          <Logo h="6" />
        </NextLink>
      </Box>
      <HStack as="ul" id="nav__primary-menu" aria-label="Main Menu" listStyleType="none">
        {links.map((link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.links ? (
              <Submenu.Desktop link={link} />
            ) : (
              <NavLink.Desktop href={link?.slug?.current}>{link.title}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="240px" justify="space-between">
        <NextLink href="/wiki" passHref>
          <Button
            variant="ghost"
            _hover={{
              bg: 'whiteAlpha.200',
            }}
            color="white"
            fontWeight="bold"
          >
            Wiki
          </Button>
        </NextLink>
        <NextLink href="/join" passHref>
          <Button bg="white" fontWeight="bold">
            Explore Westeros
          </Button>
        </NextLink>
      </HStack>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
