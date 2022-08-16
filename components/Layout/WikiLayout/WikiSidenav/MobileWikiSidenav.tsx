import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  useDisclosure,
  VisuallyHidden,
  Text,
  Center,
} from '@chakra-ui/react';
import { NavMenu } from '../../../Navbar/NavMenu';
import { ToggleButton } from '../../../Navbar/ToggleButton';

export const MobileWikiSidenav = () => {
  return (
    <Center maxH="12" as="header" w="full" bg="primaryDark" position="relative" zIndex="10">
      <Box as="nav" aria-label="Main navigation" maxW="7xl" w="full" mx={{ base: '6', md: '8' }}>
        <MobileNavContext display={{ base: 'flex', lg: 'none' }} />
      </Box>
    </Center>
  );
};

const MobileNavContext = (props: FlexProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex align="center" justify="space-between" className="nav-content__mobile" {...props}>
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        {/* <Box as="a" rel="home" mx="auto">
          <Logo h="24px" />
        </Box> */}
        {/* <Box visibility={{ base: 'hidden', sm: 'visible' }}>
          <Button as="a" colorScheme="whiteAlpha">
            Get Started
          </Button>
        </Box> */}
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>
        {/* {links.map((link, idx) =>
          link.links ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link?.slug?.current}>
              {link.title}
            </NavLink.Mobile>
          ),
        )} */}
      </NavMenu>
    </>
  );
};
