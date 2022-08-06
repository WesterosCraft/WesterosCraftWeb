import { useNavMenu } from './useNavMenu';
import {
  Box,
  Collapse,
  SimpleGrid,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import * as React from 'react';
// import { FaChevronDown } from 'react-icons/fa'
import { Links } from './_data';
import { NavLink } from './NavLink';
import { NavMenu } from './NavMenu';
import { SubmenuItem as DesktopMenuItem } from './SubmenuItem';

interface SubmenuProps {
  link: Links;
}

const DesktopSubmenu = (props: SubmenuProps) => {
  const { link } = props;
  return (
    <Menu>
      <MenuButton
        display="flex"
        alignItems="center"
        px="4"
        fontWeight="semibold"
        color="white"
        _hover={{
          color: 'gray.500',
        }}
      >
        <Box>{link.title}</Box>
        <Box
          marginStart="2"
          // as={FaChevronDown}
          fontSize="xs"
        />
      </MenuButton>

      <MenuList bg="gray.700">
        <Box maxW="7xl" mx="auto" p="4">
          <SimpleGrid spacing="10" columns={2}>
            {link.links?.map((item, idx) => (
              <DesktopMenuItem
                key={idx}
                title={item.title}
                href={item.slug?.current as string}
                // icon={item.icon}
              >
                {item.description}
              </DesktopMenuItem>
            ))}
          </SimpleGrid>
        </Box>
      </MenuList>
    </Menu>
  );
};

const MobileSubMenu = (props: SubmenuProps) => {
  const { link } = props;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <NavLink.Mobile
        as="button"
        textAlign="start"
        type="button"
        cursor="pointer"
        onClick={onToggle}
        paddingEnd="4"
      >
        <Box flex="1">{link.title}</Box>
        <Box
          // as={FaChevronDown}
          transform={`rotate(${isOpen ? '180deg' : '0deg'})`}
        />
      </NavLink.Mobile>
      <Collapse in={isOpen}>
        <Box pl="5">
          {link.links?.map((item, idx) => (
            <NavLink.Mobile key={idx} href={item.slug?.current}>
              {item.title}
            </NavLink.Mobile>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export const Submenu = {
  Mobile: MobileSubMenu,
  Desktop: DesktopSubmenu,
};
