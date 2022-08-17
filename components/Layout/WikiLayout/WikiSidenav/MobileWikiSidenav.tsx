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
      bg="primaryDarkGlare"
    >
      <Box as="nav" aria-label="Wiki navigation" w="full" px="8" py="1">
        <MobileNavContext />
      </Box>
    </Center>
  );
};

const MobileNavContext = (props: FlexProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex
        w="full"
        align="center"
        justify="space-between"
        className="nav-content__mobile"
        {...props}
      >
        <Box>
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <Heading color="white" mx="6">
          Wiki
        </Heading>
        <Input size="sm" />
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
