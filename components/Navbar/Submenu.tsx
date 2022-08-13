import {
  Box,
  Collapse,
  SimpleGrid,
  useDisclosure,
  Popover,
  PopoverTrigger,
  Button,
  Text,
  PopoverContent,
  PopoverArrow,
} from '@chakra-ui/react';
import * as React from 'react';
import { Links } from './_data';
import { NavLink } from './NavLink';
import { SubmenuItem as DesktopMenuItem } from './SubmenuItem';
import { ChevronDownIcon } from '../Icons/ChevronDown';

interface SubmenuProps {
  link: Links;
}

const DesktopSubmenu = ({ link }: SubmenuProps) => {
  return (
    <Popover trigger="hover" offset={[2, 2]}>
      <PopoverTrigger>
        <Button
          height="auto"
          variant="ghost"
          display="flex"
          alignItems="center"
          px="4"
          py="6"
          color="white"
          fill="white"
          _focus={{
            bg: 'inherit',
          }}
          _hover={{
            cursor: 'default',
            color: 'primaryGlare',
            fill: 'primaryGlare',
          }}
          rightIcon={<ChevronDownIcon boxSize={3} />}
        >
          <Text>{link.title}</Text>
        </Button>
      </PopoverTrigger>

      <PopoverContent bg="white" w="sm" p={5} borderRadius="none" borderColor="primaryDark">
        <PopoverArrow />

        <SimpleGrid spacing="4" columns={1}>
          {link?.links?.map((item, idx) => (
            <DesktopMenuItem
              key={idx}
              title={item.title}
              href={item.link?.slug?.current || '/'}
              isExternal={item._type === 'externalLink'}
              icon={item.icon}
              // icon={item.icon}
            >
              {item.description}
            </DesktopMenuItem>
          ))}
        </SimpleGrid>
      </PopoverContent>
    </Popover>
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
        <Box as={ChevronDownIcon} transform={`rotate(${isOpen ? '180deg' : '0deg'})`} />
      </NavLink.Mobile>
      <Collapse in={isOpen}>
        <Box pl="5">
          {link.links?.map((item, idx) => (
            <NavLink.Mobile key={idx} href={item.link?.slug.current}>
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
