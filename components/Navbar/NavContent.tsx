import * as React from 'react';
import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  useDisclosure,
  VisuallyHidden,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { NavLink } from './NavLink';
import { NavMenu } from './NavMenu';
import { Submenu } from './Submenu';
import { ToggleButton } from './ToggleButton';
import { links } from './_data';
import { Logo } from './Logo';
import { WikiSidenav } from '../Layout/WikiLayout/WikiSidenav/WikiSidenav';
import { useRouter } from 'next/router';
import { AlgoliaInput } from '../AlgoliaInput';

interface MobileNavContextProps extends FlexProps {
  isWiki?: boolean;
}

const MobileNavContext = ({ isWiki, ...rest }: MobileNavContextProps) => {
  const router = useRouter();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const isSmallestMobile = useBreakpointValue({ base: true, sm: false });

  React.useEffect(() => {
    if (!isMobile && isOpen) {
      onClose();
    }
  }, [isMobile, onClose, isOpen]);

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (
        url?.split?.('/').pop() !== 'locations' &&
        url?.split?.('/').pop() !== 'guides' &&
        url?.split?.('/').pop() !== 'blocks'
      ) {
        onClose();
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex align="center" justify="space-between" className="nav-content__mobile" {...rest}>
        <Box>
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <Box ml="4">
          <NextLink href="/">
            <Logo hideText={isWiki || isSmallestMobile} />
          </NextLink>
        </Box>
        {isWiki && (
          <>
            <Spacer />
            <AlgoliaInput
              display={{ base: 'none', sm: 'inherit' }}
              mr="6"
              ml={isWiki ? '6' : '0'}
            />
          </>
        )}
        <Box display={{ base: isWiki ? 'none' : 'inherit', sm: 'inherit' }}>
          <NextLink href="/join">
            <Button size={{ base: 'sm', md: 'md' }} bg="white">
              Get Started
            </Button>
          </NextLink>
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'} bg="primaryDark">
        {isWiki ? (
          <WikiSidenav.Mobile />
        ) : (
          links.map((link, idx) =>
            link.links ? (
              <Submenu.Mobile key={idx} link={link} />
            ) : (
              <NavLink.Mobile key={idx} href={link?.slug?.current}>
                {link.title}
              </NavLink.Mobile>
            ),
          )
        )}
        <NextLink href="/join" passHref>
          <Button bg="primaryRed" color="white" w="full" size="lg" mt="5">
            Join Server
          </Button>
        </NextLink>
      </NavMenu>
    </>
  );
};

const DesktopNavContent = (props: FlexProps) => {
  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <HStack spacing={8}>
        <NextLink href="/" passHref>
          <Box rel="home">
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
