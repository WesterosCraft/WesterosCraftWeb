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
import { NavLink } from './NavLink';
import { NavMenu } from './NavMenu';
import { Submenu } from './Submenu';
import { ToggleButton } from './ToggleButton';
import { links } from './_data';
import { Logo } from './Logo';

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
          Join Server
        </Button>
      </NavMenu>
    </>
  );
};

const DesktopNavContent = (props: FlexProps) => {
  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <HStack spacing={8}>
        <NextLink href="/" passHref>
          <Box as="a" rel="home">
            <VisuallyHidden>WesterosCraft</VisuallyHidden>
            <Logo h="6" />
          </Box>
        </NextLink>
        <HStack as="ul" id="nav__primary-menu" aria-label="Main Menu" listStyleType="none">
          {links.map((link, idx) => (
            <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
              {link.links ? (
                <Submenu.Desktop key={idx} link={link} />
              ) : (
                <NavLink.Desktop key={idx} href={link?.slug?.current}>
                  {link.title}
                </NavLink.Desktop>
              )}
            </Box>
          ))}
        </HStack>
      </HStack>

      <NextLink href="/join" passHref>
        <Button bg="white" fontWeight="bold">
          Join Server
        </Button>
      </NextLink>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
