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
  Input,
  Heading,
  ButtonGroup,
} from '@chakra-ui/react';
import { NavMenu } from '../../../Navbar/NavMenu';
import { ToggleButton } from '../../../Navbar/ToggleButton';

export const MobileWikiSidenav = () => {
  return (
    <Center
      display={{ base: 'flex', lg: 'none' }}
      position="relative"
      //   maxH="12"
      as="header"
      w="full"
      bg="primaryDark"
    >
      <Box as="nav" aria-label="Wiki navigation" w="full" px="8" py="2">
        <MobileNavContext />
      </Box>
    </Center>
  );
};

const MobileNavContext = (props: FlexProps) => {
  const { isOpen: isGuidesOpen, onToggle: onGuidesToggle } = useDisclosure();
  const { isOpen: isLocationsOpen, onToggle: onLocationsToggle } = useDisclosure();

  return (
    <>
      <Flex
        w="full"
        align="center"
        justify="space-between"
        className="nav-content__mobile"
        {...props}
      >
        <ButtonGroup size="sm" variant="ghost" colorScheme="whiteAlpha">
          <Button onClick={onGuidesToggle}>Guides</Button>
          <Button onClick={onLocationsToggle}>Locations</Button>
        </ButtonGroup>
        <Input size="sm" ml="8" />
      </Flex>
      <NavMenu animate={isGuidesOpen || isLocationsOpen ? 'open' : 'closed'}>
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
