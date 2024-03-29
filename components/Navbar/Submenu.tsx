import * as React from 'react';
import {
  Box,
  Collapse,
  SimpleGrid,
  useDisclosure,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Links } from './_data';
import { NavLink } from './NavLink';
import { SubmenuItem as DesktopMenuItem } from './SubmenuItem';
import { ChevronDownIcon } from '../Icons/ChevronDown';

interface SubmenuProps {
  link: Links;
  isWiki?: boolean;
}

const DesktopSubmenu = ({ link }: SubmenuProps) => {
  return (
    <Popover trigger="hover" offset={[-1, -1]}>
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
          fontWeight="medium"
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
          {link.title}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        bg="primaryDark"
        w="sm"
        p={5}
        borderRadius="none"
        borderColor="primaryDarkGlare2"
      >
        <Box>
          <SimpleGrid spacing="4" columns={1}>
            {link?.links?.map((item, idx) =>
              item._type === 'externalLink' ? (
                <Link
                  key={idx}
                  color="white"
                  isExternal
                  _hover={{
                    textDecor: 'none',
                  }}
                  href={item.link?.slug?.current}
                >
                  <DesktopMenuItem title={item.title} icon={item.icon}>
                    {item.description}
                  </DesktopMenuItem>
                </Link>
              ) : (
                <NextLink key={idx} href={item.link?.slug?.current || `/${item.title}`}>
                  <DesktopMenuItem title={item.title} icon={item.icon}>
                    {item.description}
                  </DesktopMenuItem>
                </NextLink>
              ),
            )}
          </SimpleGrid>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

const MobileSubMenu = (props: SubmenuProps) => {
  const { link } = props;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box className="mobile-sub-menu">
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
          as={ChevronDownIcon}
          fill="white"
          transform={`rotate(${isOpen ? '180deg' : '0deg'})`}
        />
      </NavLink.Mobile>
      <Collapse in={isOpen}>
        <Box pl="5" w="full">
          {link.links?.map((item, idx) => (
            <NavLink.Mobile as={NextLink} key={idx} href={item.link?.slug?.current ?? '/'}>
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
